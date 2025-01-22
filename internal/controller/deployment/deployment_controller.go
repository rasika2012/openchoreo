/*
 * Copyright (c) 2025, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package deployment

import (
	"context"
	"fmt"

	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/tools/record"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"
	"sigs.k8s.io/controller-runtime/pkg/reconcile"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
	k8sintegrations "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations/kubernetes"
)

// Reconciler reconciles a Deployment object
type Reconciler struct {
	client.Client
	Scheme   *runtime.Scheme
	recorder record.EventRecorder
}

// +kubebuilder:rbac:groups=core.choreo.dev,resources=deployments,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core.choreo.dev,resources=deployments/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core.choreo.dev,resources=deployments/finalizers,verbs=update
// +kubebuilder:rbac:groups=cilium.io,resources=ciliumnetworkpolicies,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=batch,resources=cronjobs,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=apps,resources=deployments,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=gateway.networking.k8s.io,resources=httproutes,verbs=get;list;watch;create;update;patch;delete

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Deployment object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.19.1/pkg/reconcile
func (r *Reconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	// Fetch the Deployment instance for this reconcile request
	deployment := &choreov1.Deployment{}
	if err := r.Get(ctx, req.NamespacedName, deployment); err != nil {
		if apierrors.IsNotFound(err) {
			// The Deployment resource may have been deleted since it triggered the reconcile
			logger.Info("Deployment resource not found. Ignoring since it must be deleted.")
			return ctrl.Result{}, nil
		}
		// Error reading the object
		logger.Error(err, "Failed to get Deployment")
		return ctrl.Result{}, err
	}

	previousCondition := meta.FindStatusCondition(deployment.Status.Conditions, controller.TypeReady)

	// Check if the labels are set
	if deployment.Labels == nil {
		logger.Info("Deployment labels not set. Ignoring since it is not valid.")
		return ctrl.Result{}, nil
	}

	// Create a new deployment context for the deployment with relevant hierarchy objects
	deploymentCtx, err := r.makeDeploymentContext(ctx, deployment)
	if err != nil {
		logger.Error(err, "Error creating deployment context")
		return ctrl.Result{}, err
	}

	// Find and reconcile all the external resources
	externalResourceHandlers := r.makeExternalResourceHandlers()
	if err := r.reconcileExternalResources(ctx, externalResourceHandlers, deploymentCtx); err != nil {
		logger.Error(err, "Error reconciling external resources")
		return ctrl.Result{}, err
	}

	// TODO: Update the status of the deployment and emit events

	if err := controller.UpdateCondition(
		ctx,
		r.Status(),
		deployment,
		&deployment.Status.Conditions,
		controller.TypeReady,
		metav1.ConditionTrue,
		"DeploymentReady",
		"Deployment is ready",
	); err != nil {
		return ctrl.Result{}, err
	} else {
		if previousCondition == nil {
			r.recorder.Event(deployment, corev1.EventTypeNormal, "ReconcileComplete", "Successfully created "+deployment.Name)
		}
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *Reconciler) SetupWithManager(mgr ctrl.Manager) error {
	if r.recorder == nil {
		r.recorder = mgr.GetEventRecorderFor("deployment-controller")
	}

	// Create a field index for the deployment artifact reference so that we can list deployments by the deployment artifact reference
	err := mgr.GetFieldIndexer().IndexField(
		context.Background(),
		&choreov1.Deployment{},
		"spec.deploymentArtifactRef",
		func(obj client.Object) []string {
			deployment := obj.(*choreov1.Deployment)
			return []string{deployment.Spec.DeploymentArtifactRef}
		},
	)
	if err != nil {
		return err
	}

	return ctrl.NewControllerManagedBy(mgr).
		For(&choreov1.Deployment{}).
		Named("deployment").
		Watches(
			&choreov1.DeployableArtifact{},
			handler.EnqueueRequestsFromMapFunc(r.deployableArtifactToDeploymentRequest),
		).
		Complete(r)
}

func (r *Reconciler) deployableArtifactToDeploymentRequest(ctx context.Context, obj client.Object) []reconcile.Request {
	deployableArtifact, ok := obj.(*choreov1.DeployableArtifact)
	if !ok {
		// Ideally, this should not happen as obj is always expected to be a DeployableArtifact from the Watch
		return nil
	}

	// List all the deployments that have .spec.deploymentArtifactRef equal to the name of the deployable artifact
	deploymentList := &choreov1.DeploymentList{}
	if err := r.List(
		ctx,
		deploymentList,
		client.MatchingFields{"spec.deploymentArtifactRef": deployableArtifact.Name},
	); err != nil {
		return nil
	}

	// Enqueue all the deployments that have the deployable artifact as the deployment artifact
	requests := make([]reconcile.Request, len(deploymentList.Items))
	for i, deployment := range deploymentList.Items {
		requests[i] = reconcile.Request{
			NamespacedName: client.ObjectKey{
				Namespace: deployment.Namespace,
				Name:      deployment.Name,
			},
		}
	}

	// Enqueue the deployment if the deployable artifact is updated
	return requests
}

func (r *Reconciler) findDeployableArtifact(ctx context.Context, deployment *choreov1.Deployment) (*choreov1.DeployableArtifact, error) {
	// Find the DeployableArtifact that the Deployment is referring to within the hierarchy
	deployableArtifactList := &choreov1.DeployableArtifactList{}
	listOpts := []client.ListOption{
		client.InNamespace(deployment.Namespace),
		client.MatchingLabels(makeHierarchyLabelsForDeploymentTrack(deployment.ObjectMeta)),
	}
	if err := r.Client.List(ctx, deployableArtifactList, listOpts...); err != nil {
		return nil, err
	}

	// Find the target deployable artifact
	var targetDeployableArtifact *choreov1.DeployableArtifact
	for _, deployableArtifact := range deployableArtifactList.Items {
		if deployableArtifact.Name == deployment.Spec.DeploymentArtifactRef {
			targetDeployableArtifact = &deployableArtifact
			break
		}
	}

	if targetDeployableArtifact == nil {
		return nil, fmt.Errorf("deployable artifact %q is not found for deployment: %s/%s", deployment.Spec.DeploymentArtifactRef, deployment.Namespace, deployment.Name)
	}

	return targetDeployableArtifact, nil
}

func makeHierarchyLabelsForDeploymentTrack(objMeta metav1.ObjectMeta) map[string]string {
	// Hierarchical labels to be used for DeploymentTrack
	keys := []string{
		controller.LabelKeyOrganizationName,
		controller.LabelKeyProjectName,
		controller.LabelKeyComponentName,
		controller.LabelKeyDeploymentTrackName,
	}

	// Prepare a new map to hold the extracted labels.
	hierarchyLabelMap := make(map[string]string, len(keys))

	for _, key := range keys {
		// We need to assign an empty string if the label is not present.
		// Otherwise, the k8s listing will return all the objects.
		val := ""
		if objMeta.Labels != nil {
			val = objMeta.Labels[key]
		}
		hierarchyLabelMap[key] = val
	}

	return hierarchyLabelMap
}

// TODO: move this logic to the resource handler implementation as figuring out the container image is specific to the external resource
func (r *Reconciler) findContainerImage(ctx context.Context, deployableArtifact *choreov1.DeployableArtifact) (string, error) {
	if buildRef := deployableArtifact.Spec.TargetArtifact.FromBuildRef; buildRef != nil {
		if buildRef.Name != "" {
			// Find the build that the deployable artifact is referring to
			buildList := &choreov1.BuildList{}
			listOpts := []client.ListOption{
				client.InNamespace(deployableArtifact.Namespace),
				client.MatchingLabels(makeHierarchyLabelsForDeploymentTrack(deployableArtifact.ObjectMeta)),
			}
			if err := r.Client.List(ctx, buildList, listOpts...); err != nil {
				return "", fmt.Errorf("findContainerImage: failed to list builds: %w", err)
			}

			for _, build := range buildList.Items {
				if build.Name == buildRef.Name {
					return build.Status.ImageStatus.Image, nil
				}
			}
			return "", fmt.Errorf("build %q is not found for deployable artifact: %s/%s", buildRef.Name, deployableArtifact.Namespace, deployableArtifact.Name)
		} else if buildRef.GitRevision != "" {
			// TODO: Search for the build by git revision
			return "", fmt.Errorf("search by git revision is not supported")
		}
		return "", fmt.Errorf("one of the build name or git revision should be provided")
	} else if deployableArtifact.Spec.TargetArtifact.FromImageRef != nil {
		// TODO: BYOI image search
		return "", fmt.Errorf("BYOI image target is not supported")
	}
	return "", fmt.Errorf("one of the build or image reference should be provided")
}

// makeDeploymentContext creates a deployment context for the given deployment by retrieving the
// parent objects that this deployment is associated with.
func (r *Reconciler) makeDeploymentContext(ctx context.Context, deployment *choreov1.Deployment) (*integrations.DeploymentContext, error) {
	project, err := controller.GetProject(ctx, r.Client, deployment)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the project: %w", err)
	}

	component, err := controller.GetComponent(ctx, r.Client, deployment)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the component: %w", err)
	}

	deploymentTrack, err := controller.GetDeploymentTrack(ctx, r.Client, deployment)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the deployment track: %w", err)
	}

	environment, err := controller.GetEnvironment(ctx, r.Client, deployment)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the environment: %w", err)
	}

	targetDeployableArtifact, err := r.findDeployableArtifact(ctx, deployment)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the deployable artifact: %w", err)
	}

	containerImage, err := r.findContainerImage(ctx, targetDeployableArtifact)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the container image: %w", err)
	}
	return &integrations.DeploymentContext{
		Project:            project,
		Component:          component,
		DeploymentTrack:    deploymentTrack,
		DeployableArtifact: targetDeployableArtifact,
		Deployment:         deployment,
		Environment:        environment,
		ContainerImage:     containerImage,
	}, nil
}

// makeExternalResourceHandlers creates the chain of external resource handlers that are used to
// bring the external resources to the desired state.
func (r *Reconciler) makeExternalResourceHandlers() []integrations.ResourceHandler {
	var handlers []integrations.ResourceHandler

	// IMPORTANT: The order of the handlers is important when reconciling the resources.
	// For example, the namespace handler should be reconciled before creating resources that depend on the namespace.
	handlers = append(handlers, k8sintegrations.NewNamespaceHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewCiliumNetworkPolicyHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewCronJobHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewDeploymentHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewServiceHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewHTTPRouteHandler(r.Client))

	return handlers
}

// reconcileExternalResources reconciles the provided external resources based on the deployment context.
func (r *Reconciler) reconcileExternalResources(
	ctx context.Context,
	resourceHandlers []integrations.ResourceHandler,
	deploymentCtx *integrations.DeploymentContext) error {
	handlerNameLogKey := "resourceHandler"
	for _, resourceHandler := range resourceHandlers {
		logger := log.FromContext(ctx).WithValues(handlerNameLogKey, resourceHandler.Name())
		// Delete the external resource if it is not configured
		if !resourceHandler.IsRequired(deploymentCtx) {
			if err := resourceHandler.Delete(ctx, deploymentCtx); err != nil {
				logger.Error(err, "Error deleting external resource")
				return err
			}
			// No need to reconcile the external resource if it is not required
			logger.Info("Deleted external resource")
			continue
		}

		// Check if the external resource exists
		currentState, err := resourceHandler.GetCurrentState(ctx, deploymentCtx)
		if err != nil {
			logger.Error(err, "Error retrieving current state of the external resource")
			return err
		}

		exists := currentState != nil
		if !exists {
			// Create the external resource if it does not exist
			if err := resourceHandler.Create(ctx, deploymentCtx); err != nil {
				logger.Error(err, "Error creating external resource")
				return err
			}
		} else {
			// Update the external resource if it exists
			if err := resourceHandler.Update(ctx, deploymentCtx, currentState); err != nil {
				logger.Error(err, "Error updating external resource")
				return err
			}
		}

		logger.Info("Reconciled external resource")
	}

	return nil
}
