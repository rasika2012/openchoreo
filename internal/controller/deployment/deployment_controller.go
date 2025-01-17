/*
Copyright 2025.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package deployment

import (
	"context"
	"fmt"

	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
	k8sintegrations "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations/kubernetes"
)

// Reconciler reconciles a Deployment object
type Reconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// +kubebuilder:rbac:groups=core.choreo.dev,resources=deployments,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core.choreo.dev,resources=deployments/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core.choreo.dev,resources=deployments/finalizers,verbs=update

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

	// Fetch the Deployment instance
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

	targetDeployableArtifact, err := r.findDeployableArtifact(ctx, deployment)
	if err != nil {
		logger.Error(err, "Error getting deployable artifact")
		// TODO: Emit an event
		// No point in retrying as the deployable artifact is not found
		return ctrl.Result{}, nil
	}

	containerImage, err := r.findContainerImage(ctx, targetDeployableArtifact)
	if err != nil {
		logger.Error(err, "Error getting container image")
		return ctrl.Result{}, err
	}

	project, err := r.getProject(ctx, deployment)
	if err != nil {
		logger.Error(err, "Error getting project")
		return ctrl.Result{}, err
	}

	component, err := r.getComponent(ctx, deployment)
	if err != nil {
		logger.Error(err, "Error getting component")
		return ctrl.Result{}, err
	}

	deploymentTrack, err := r.getDeploymentTrack(ctx, deployment)
	if err != nil {
		logger.Error(err, "Error getting deployment track")
		return ctrl.Result{}, err
	}

	environment, err := r.getEnvironment(ctx, deployment)
	if err != nil {
		logger.Error(err, "Error getting environment")
		return ctrl.Result{}, err
	}

	deploymentCtx := integrations.DeploymentContext{
		Project:            project,
		Component:          component,
		DeploymentTrack:    deploymentTrack,
		DeployableArtifact: targetDeployableArtifact,
		Deployment:         deployment,
		Environment:        environment,
		ContainerImage:     containerImage,
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
	}

	return ctrl.Result{}, nil
}

// reconcileExternalResources reconciles the provided external resources based on the deployment context.
func (r *Reconciler) reconcileExternalResources(
	ctx context.Context,
	resourceHandlers []integrations.ResourceHandler,
	deploymentCtx integrations.DeploymentContext) error {

	handlerNameLogKey := "resourceHandler"
	for _, handler := range resourceHandlers {
		logger := log.FromContext(ctx).WithValues(handlerNameLogKey, handler.Name())
		// Delete the external resource if it is not configured
		if !handler.IsRequired(deploymentCtx) {
			if err := handler.Delete(ctx, deploymentCtx); err != nil {
				logger.Error(err, "Error deleting external resource")
				return err
			}
			// No need to reconcile the external resource if it is not required
			logger.Info("Deleted external resource")
			continue
		}

		// Check if the external resource exists
		currentState, err := handler.GetCurrentState(ctx, deploymentCtx)
		if err != nil {
			logger.Error(err, "Error retrieving current state of the external resource")
			return err
		}

		exists := currentState != nil
		if !exists {
			// Create the external resource if it does not exist
			if err := handler.Create(ctx, deploymentCtx); err != nil {
				logger.Error(err, "Error creating external resource")
				return err
			}
		} else {
			// Update the external resource if it exists
			if err := handler.Update(ctx, deploymentCtx, currentState); err != nil {
				logger.Error(err, "Error updating external resource")
				return err
			}
		}

		logger.Info("Reconciled external resource")
	}

	return nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *Reconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&choreov1.Deployment{}).
		Named("deployment").
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

func (r *Reconciler) findContainerImage(_ context.Context, deployableArtifact *choreov1.DeployableArtifact) (string, error) {
	if buildRef := deployableArtifact.Spec.TargetArtifact.FromBuildRef; buildRef != nil {
		if buildRef.Name != "" {

			// TODO: Fix this once the build resource is available
			return "mirage20/sample-task-report-generator:v1", nil
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

// TODO: Find a way to bring this to a common place. Ex: Get object by given hierarchy labels
func (r *Reconciler) getProject(ctx context.Context, deployment *choreov1.Deployment) (*choreov1.Project, error) {
	projectList := &choreov1.ProjectList{}
	listOpts := []client.ListOption{
		client.InNamespace(deployment.Namespace),
		client.MatchingLabels{
			controller.LabelKeyOrganizationName: deployment.Labels[controller.LabelKeyOrganizationName],
		},
	}
	if err := r.Client.List(ctx, projectList, listOpts...); err != nil {
		return nil, err
	}

	for _, project := range projectList.Items {
		if project.Labels == nil {
			// Ideally, this should not happen as the project should have the organization label
			continue
		}
		if project.Labels[controller.LabelKeyName] == deployment.Labels[controller.LabelKeyProjectName] {
			return &project, nil
		}
	}

	return nil, fmt.Errorf("project not found")
}

func (r *Reconciler) getComponent(ctx context.Context, deployment *choreov1.Deployment) (*choreov1.Component, error) {
	componentList := &choreov1.ComponentList{}
	listOpts := []client.ListOption{
		client.InNamespace(deployment.Namespace),
		client.MatchingLabels{
			controller.LabelKeyOrganizationName: deployment.Labels[controller.LabelKeyOrganizationName],
			controller.LabelKeyProjectName:      deployment.Labels[controller.LabelKeyProjectName],
		},
	}
	if err := r.Client.List(ctx, componentList, listOpts...); err != nil {
		return nil, err
	}

	for _, component := range componentList.Items {
		if component.Labels == nil {
			// Ideally, this should not happen as the component should have the organization and project labels
			continue
		}
		if component.Labels[controller.LabelKeyName] == deployment.Labels[controller.LabelKeyComponentName] {
			return &component, nil
		}
	}

	return nil, fmt.Errorf("component not found")
}

func (r *Reconciler) getDeploymentTrack(ctx context.Context, deployment *choreov1.Deployment) (*choreov1.DeploymentTrack, error) {
	deploymentTrackList := &choreov1.DeploymentTrackList{}
	listOpts := []client.ListOption{
		client.InNamespace(deployment.Namespace),
		client.MatchingLabels{
			controller.LabelKeyOrganizationName: deployment.Labels[controller.LabelKeyOrganizationName],
			controller.LabelKeyProjectName:      deployment.Labels[controller.LabelKeyProjectName],
			controller.LabelKeyComponentName:    deployment.Labels[controller.LabelKeyComponentName],
		},
	}
	if err := r.Client.List(ctx, deploymentTrackList, listOpts...); err != nil {
		return nil, err
	}

	for _, deploymentTrack := range deploymentTrackList.Items {
		if deploymentTrack.Labels == nil {
			// Ideally, this should not happen as the deployment track should have the organization, project and component labels
			continue
		}
		if deploymentTrack.Labels[controller.LabelKeyName] == deployment.Labels[controller.LabelKeyDeploymentTrackName] {
			return &deploymentTrack, nil
		}
	}

	return nil, fmt.Errorf("deployment track not found")
}

func (r *Reconciler) getEnvironment(ctx context.Context, deployment *choreov1.Deployment) (*choreov1.Environment, error) {
	environmentList := &choreov1.EnvironmentList{}
	listOpts := []client.ListOption{
		client.InNamespace(deployment.Namespace),
		client.MatchingLabels{
			controller.LabelKeyOrganizationName: deployment.Labels[controller.LabelKeyOrganizationName],
		},
	}
	if err := r.Client.List(ctx, environmentList, listOpts...); err != nil {
		return nil, err
	}

	for _, environment := range environmentList.Items {
		if environment.Labels == nil {
			// Ideally, this should not happen as the environment should have the organization, project, component and deployment track labels
			continue
		}
		if environment.Labels[controller.LabelKeyName] == deployment.Labels[controller.LabelKeyEnvironmentName] {
			return &environment, nil
		}
	}

	return nil, fmt.Errorf("environment not found")
}

func (r *Reconciler) makeExternalResourceHandlers() []integrations.ResourceHandler {
	var handlers []integrations.ResourceHandler

	// IMPORTANT: The order of the handlers is important when reconciling the resources.
	// For example, the namespace handler should be reconciled before creating resources that depend on the namespace.
	handlers = append(handlers, k8sintegrations.NewNamespaceHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewCiliumNetworkPolicyHandler(r.Client))
	handlers = append(handlers, k8sintegrations.NewCronJobHandler(r.Client))

	return handlers
}
