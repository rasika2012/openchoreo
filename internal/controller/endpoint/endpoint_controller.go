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

package endpoint

import (
	"context"
	"fmt"

	"k8s.io/apimachinery/pkg/api/meta"
	"k8s.io/apimachinery/pkg/runtime"
	ctrl "sigs.k8s.io/controller-runtime"
	"sigs.k8s.io/controller-runtime/pkg/client"
	"sigs.k8s.io/controller-runtime/pkg/log"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/endpoint/integrations/kubernetes"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// Reconciler reconciles a Endpoint object
type Reconciler struct {
	client.Client
	Scheme *runtime.Scheme
}

// Definitions to manage status conditions
const (
	// typeAvailable represents the status of the Deployment reconciliation
	typeAvailable = "Available"
	// typeDegraded represents the status used when the custom resource is deleted and the finalizer operations are yet to occur.
	// typeDegraded = "Degraded"
)

// +kubebuilder:rbac:groups=core.choreo.dev,resources=endpoints,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core,resources=services,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=gateway.networking.k8s.io,resources=httproutes,verbs=get;list;watch;create;update;patch;delete
// +kubebuilder:rbac:groups=core.choreo.dev,resources=endpoints/status,verbs=get;update;patch
// +kubebuilder:rbac:groups=core.choreo.dev,resources=endpoints/finalizers,verbs=update

// Reconcile is part of the main kubernetes reconciliation loop which aims to
// move the current state of the cluster closer to the desired state.
// TODO(user): Modify the Reconcile function to compare the state specified by
// the Endpoint object against the actual cluster state, and then
// perform operations to make the cluster state reflect the state specified by
// the user.
//
// For more details, check Reconcile and its Result here:
// - https://pkg.go.dev/sigs.k8s.io/controller-runtime@v0.20.0/pkg/reconcile
func (r *Reconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
	logger := log.FromContext(ctx)

	// Get Endpoint CR
	endpoint := &choreov1.Endpoint{}

	if err := r.Get(ctx, req.NamespacedName, endpoint); err != nil {
		return ctrl.Result{}, client.IgnoreNotFound(err)
	}

	// Implement Finalizer for route deletion

	// Set status to unknown if conditions are not set
	if endpoint.Status.Conditions != nil || len(endpoint.Status.Conditions) == 0 {
		condition := metav1.Condition{
			Type:    typeAvailable,
			Status:  metav1.ConditionUnknown,
			Reason:  "Reconciling",
			Message: "Starting reconciliation",
		}

		meta.SetStatusCondition(&endpoint.Status.Conditions, condition)

		if err := r.Status().Update(ctx, endpoint); err != nil {
			logger.Error(err, "Failed to update Endpoint status")
			return ctrl.Result{}, err
		}

		if err := r.Get(ctx, req.NamespacedName, endpoint); err != nil {
			logger.Error(err, "Failed to re-fetch Endpoint")
			return ctrl.Result{}, err
		}
	}

	if endpoint.Labels == nil {
		logger.Info("Endpoint labels not set.")
		return ctrl.Result{}, nil
	}

	endpointCtx, err := r.makeEndpointContext(ctx, endpoint)
	if err != nil {
		logger.Error(err, "Failed to create endpoint context")
		return ctrl.Result{}, err
	}

	if err = r.reconcileExternalResources(ctx, r.makeExternalResourceHandlers(), endpointCtx); err != nil {
		logger.Error(err, "Failed to reconcile external resources")
		return ctrl.Result{}, err
	}

	if err := controller.UpdateCondition(
		ctx,
		r.Status(),
		endpoint,
		&endpoint.Status.Conditions,
		controller.TypeReady,
		metav1.ConditionTrue,
		"EndpointReady",
		"Endpoint is ready",
	); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// makeEndpointContext creates a endpoint context for the given deployment by retrieving the
// parent objects that this deployment is associated with.
func (r *Reconciler) makeEndpointContext(ctx context.Context, endpoint *choreov1.Endpoint) (*dataplane.EndpointContext, error) {
	project, err := controller.GetProject(ctx, r.Client, endpoint)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the project: %w", err)
	}

	component, err := controller.GetComponent(ctx, r.Client, endpoint)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the component: %w", err)
	}

	deploymentTrack, err := controller.GetDeploymentTrack(ctx, r.Client, endpoint)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the deployment track: %w", err)
	}

	environment, err := controller.GetEnvironment(ctx, r.Client, endpoint)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the environment: %w", err)
	}

	deployment, err := controller.GetDeployment(ctx, r.Client, endpoint)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the deployment: %w", err)
	}

	targetDeployableArtifact, err := controller.GetDeployableArtifact(ctx, r.Client, endpoint)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the deployable artifact: %w", err)
	}

	return &dataplane.EndpointContext{
		Project:            project,
		Component:          component,
		DeploymentTrack:    deploymentTrack,
		DeployableArtifact: targetDeployableArtifact,
		Deployment:         deployment,
		Environment:        environment,
		Endpoint:           endpoint,
	}, nil
}

func (r *Reconciler) makeExternalResourceHandlers() []dataplane.ResourceHandler[dataplane.EndpointContext] {
	// Define the resource handlers for the external resources
	resourceHandlers := []dataplane.ResourceHandler[dataplane.EndpointContext]{
		kubernetes.NewHTTPRouteHandler(r.Client),
	}

	return resourceHandlers
}

// reconcileExternalResources reconciles the provided external resources based on the deployment context.
func (r *Reconciler) reconcileExternalResources(
	ctx context.Context,
	resourceHandlers []dataplane.ResourceHandler[dataplane.EndpointContext],
	endpointCtx *dataplane.EndpointContext) error {
	handlerNameLogKey := "resourceHandler"
	for _, resourceHandler := range resourceHandlers {
		logger := log.FromContext(ctx).WithValues(handlerNameLogKey, resourceHandler.Name())
		// Delete the external resource if it is not configured
		if !resourceHandler.IsRequired(endpointCtx) {
			if err := resourceHandler.Delete(ctx, endpointCtx); err != nil {
				logger.Error(err, "Error deleting external resource")
				return err
			}
			// No need to reconcile the external resource if it is not required
			logger.Info("Deleted external resource")
			continue
		}

		// Check if the external resource exists
		currentState, err := resourceHandler.GetCurrentState(ctx, endpointCtx)
		if err != nil {
			logger.Error(err, "Error retrieving current state of the external resource")
			return err
		}

		exists := currentState != nil
		if !exists {
			// Create the external resource if it does not exist
			if err := resourceHandler.Create(ctx, endpointCtx); err != nil {
				logger.Error(err, "Error creating external resource")
				return err
			}
		} else {
			// Update the external resource if it exists
			if err := resourceHandler.Update(ctx, endpointCtx, currentState); err != nil {
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
		For(&choreov1.Endpoint{}).
		Named("endpoint").
		Complete(r)
}
