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

	apierrors "k8s.io/apimachinery/pkg/api/errors"
	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	"k8s.io/client-go/tools/record"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/handler"
	"sigs.k8s.io/controller-runtime/pkg/log"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	k8sintegrations "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations/kubernetes"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/labels"
)

// Reconciler reconciles a Deployment object
type Reconciler struct {
	client.Client
	Scheme   *runtime.Scheme
	recorder record.EventRecorder
}

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

	// Check if the labels are set
	if deployment.Labels == nil {
		logger.Info("Deployment labels not set. Ignoring since it is not valid.")
		return ctrl.Result{}, nil
	}

	old := deployment.DeepCopy()

	// Mark the deployment as progressing so that any non-terminating paths will persist the progressing status
	meta.SetStatusCondition(&deployment.Status.Conditions, NewDeploymentProgressingCondition(deployment.Generation))

	// Create a new deployment context for the deployment with relevant hierarchy objects
	deploymentCtx, err := r.makeDeploymentContext(ctx, deployment)
	if err != nil {
		logger.Error(err, "Error creating deployment context")
		if err := controller.UpdateStatusConditions(ctx, r.Client, old, deployment); err != nil {
			return ctrl.Result{}, err
		}
		return ctrl.Result{}, err
	}

	// Find and reconcile all the external resources
	externalResourceHandlers := r.makeExternalResourceHandlers()
	if err := r.reconcileExternalResources(ctx, externalResourceHandlers, deploymentCtx); err != nil {
		logger.Error(err, "Error reconciling external resources")
		return ctrl.Result{}, err
	}

	if err := r.reconcileChoreoEndpoints(ctx, deploymentCtx); err != nil {
		logger.Error(err, "Error reconciling endpoints")
		return ctrl.Result{}, err
	}

	// TODO: Update the status of the deployment and emit events

	// Mark the deployment as ready. Reaching this point means the deployment is successfully reconciled.
	meta.SetStatusCondition(&deployment.Status.Conditions, NewDeploymentReadyCondition(deployment.Generation))

	if err := controller.UpdateStatusConditions(ctx, r.Client, old, deployment); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *Reconciler) SetupWithManager(mgr ctrl.Manager) error {
	if r.recorder == nil {
		r.recorder = mgr.GetEventRecorderFor("deployment-controller")
	}

	// Set up the index for the deployment artifact reference
	if err := r.setupDeploymentArtifactRefIndex(context.Background(), mgr); err != nil {
		return fmt.Errorf("failed to setup deployment artifact reference index: %w", err)
	}

	return ctrl.NewControllerManagedBy(mgr).
		For(&choreov1.Deployment{}).
		Named("deployment").
		// Watch for DeployableArtifact changes to reconcile the deployments
		Watches(
			&choreov1.DeployableArtifact{},
			handler.EnqueueRequestsFromMapFunc(r.listDeploymentsForDeployableArtifact),
		).
		Owns(&choreov1.Endpoint{}).
		Complete(r)
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
		labels.LabelKeyOrganizationName,
		labels.LabelKeyProjectName,
		labels.LabelKeyComponentName,
		labels.LabelKeyDeploymentTrackName,
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
func (r *Reconciler) findContainerImage(ctx context.Context, component *choreov1.Component,
	deployableArtifact *choreov1.DeployableArtifact, deployment *choreov1.Deployment) (string, error) {
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
					// TODO: Make local registry configurable and move to build controller
					return fmt.Sprintf("%s/%s", "localhost:30003", build.Status.ImageStatus.Image), nil
				}
			}
			meta.SetStatusCondition(&deployment.Status.Conditions,
				NewArtifactBuildNotFoundCondition(deployment.Spec.DeploymentArtifactRef, buildRef.Name, deployment.Generation))
			return "", fmt.Errorf("build %q is not found for deployable artifact: %s/%s", buildRef.Name, deployableArtifact.Namespace, deployableArtifact.Name)
		} else if buildRef.GitRevision != "" {
			// TODO: Search for the build by git revision
			return "", fmt.Errorf("search by git revision is not supported")
		}
		return "", fmt.Errorf("one of the build name or git revision should be provided")
	} else if imageRef := deployableArtifact.Spec.TargetArtifact.FromImageRef; imageRef != nil {
		if imageRef.Tag == "" {
			return "", fmt.Errorf("image tag is not provided")
		}
		containerRegistry := component.Spec.Source.ContainerRegistry
		if containerRegistry == nil {
			return "", fmt.Errorf("container registry is not provided for the component %s/%s", component.Namespace, component.Name)
		}
		return fmt.Sprintf("%s:%s", containerRegistry.ImageName, imageRef.Tag), nil
	}
	return "", fmt.Errorf("one of the build or image reference should be provided")
}

// makeDeploymentContext creates a deployment context for the given deployment by retrieving the
// parent objects that this deployment is associated with.
func (r *Reconciler) makeDeploymentContext(ctx context.Context, deployment *choreov1.Deployment) (*dataplane.DeploymentContext, error) {
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
		meta.SetStatusCondition(&deployment.Status.Conditions,
			NewArtifactNotFoundCondition(deployment.Spec.DeploymentArtifactRef, deployment.Generation))
		return nil, fmt.Errorf("cannot retrieve the deployable artifact: %w", err)
	}

	containerImage, err := r.findContainerImage(ctx, component, targetDeployableArtifact, deployment)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the container image: %w", err)
	}

	meta.SetStatusCondition(&deployment.Status.Conditions, NewArtifactResolvedCondition(deployment.Generation))

	return &dataplane.DeploymentContext{
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
func (r *Reconciler) makeExternalResourceHandlers() []dataplane.ResourceHandler[dataplane.DeploymentContext] {
	var handlers []dataplane.ResourceHandler[dataplane.DeploymentContext]

	// IMPORTANT: The order of the handlers is important when reconciling the resources.
	// For example, the namespace handler should be reconciled before creating resources that depend on the namespace.
	handlers = append(handlers, k8sintegrations.NewNamespaceHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewCiliumNetworkPolicyHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewCronJobHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewDeploymentHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewServiceHandler(r.Client))

	return handlers
}

// reconcileExternalResources reconciles the provided external resources based on the deployment context.
func (r *Reconciler) reconcileExternalResources(
	ctx context.Context,
	resourceHandlers []dataplane.ResourceHandler[dataplane.DeploymentContext],
	deploymentCtx *dataplane.DeploymentContext) error {
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
