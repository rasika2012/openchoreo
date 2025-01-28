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
	integrations "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/endpoint/integrations"
	dpkubernetes "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/dataplane/kubernetes"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/ptr"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	gatewayv1 "sigs.k8s.io/gateway-api/apis/v1"
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
	typeDegraded = "Degraded"
)

// Gateway Types
const (
	gatewayExternal = "gateway-external"
	gatewayInternal = "gateway-internal"
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
		meta.SetStatusCondition(&endpoint.Status.Conditions,
			metav1.Condition{Type: typeAvailable, Status: metav1.ConditionUnknown, Reason: "Reconciling", Message: "Starting reconciliation"})
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

	found := &gatewayv1.HTTPRoute{}

	endpointCtx, err := r.makeEndpointContext(ctx, endpoint)

	if err != nil {
		return ctrl.Result{}, err
	}
	new := makeHTTPRoute(endpointCtx)

	err = r.Get(ctx, client.ObjectKey{Name: makeHTTPRouteName(endpointCtx), Namespace: makeNamespaceName(endpointCtx)}, found)

	if err != nil {
		if apierrors.IsNotFound(err) {
			// Create HTTPRoute
			if err = r.Create(ctx, new); err != nil {
				return ctrl.Result{}, err
			}
		}
		return ctrl.Result{}, err
	}
	// Update HTTPRoute
	new.SetResourceVersion(found.GetResourceVersion())
	if err := r.Update(ctx, new); err != nil {
		return ctrl.Result{}, err
	}

	return ctrl.Result{}, nil
}

// SetupWithManager sets up the controller with the Manager.
func (r *Reconciler) SetupWithManager(mgr ctrl.Manager) error {
	return ctrl.NewControllerManagedBy(mgr).
		For(&choreov1.Endpoint{}).
		Named("endpoint").
		Complete(r)
}

func makeHTTPRoute(endpointCtx *integrations.EndpointContext) *gatewayv1.HTTPRoute {
	return &gatewayv1.HTTPRoute{
		ObjectMeta: metav1.ObjectMeta{
			Name:      makeHTTPRouteName(endpointCtx),
			Namespace: makeNamespaceName(endpointCtx),
			Labels:    makeWorkloadLabels(endpointCtx),
		},
		Spec: makeHTTPRouteSpec(endpointCtx),
	}
}

func makeHTTPRouteName(endpointCtx *integrations.EndpointContext) string {
	componentName := endpointCtx.Component.Name
	endpointName := endpointCtx.Endpoint.Name
	return dpkubernetes.GenerateK8sName(componentName, endpointName)
}

func makeHTTPRouteSpec(endpointCtx *integrations.EndpointContext) gatewayv1.HTTPRouteSpec {
	// If there are no endpoint templates, return an empty spec.
	// This should be validated from the admission controller.x
	// if len(deployCtx.DeployableArtifact.Spec.Configuration.EndpointTemplates) == 0 {
	// 	return gatewayv1.HTTPRouteSpec{}
	// }

	pathType := gatewayv1.PathMatchPathPrefix
	hostname := gatewayv1.Hostname(endpointCtx.Component.Name + "-" + endpointCtx.Environment.Name + ".choreo.local")
	port := gatewayv1.PortNumber(endpointCtx.Endpoint.Spec.Service.Port)
	return gatewayv1.HTTPRouteSpec{
		CommonRouteSpec: gatewayv1.CommonRouteSpec{
			ParentRefs: []gatewayv1.ParentReference{
				{
					Name:      gatewayv1.ObjectName(gatewayExternal),                  // Internal / external
					Namespace: (*gatewayv1.Namespace)(ptr.String("choreo-system-dp")), // Change NS based on where envoy gateway is deployed
				},
			},
		},
		Hostnames: []gatewayv1.Hostname{hostname},
		Rules: []gatewayv1.HTTPRouteRule{
			{
				Matches: []gatewayv1.HTTPRouteMatch{
					{
						Path: &gatewayv1.HTTPPathMatch{
							Type:  &pathType,
							Value: ptr.String(endpointCtx.Endpoint.Spec.Service.BasePath),
						},
					},
				},
				BackendRefs: []gatewayv1.HTTPBackendRef{
					{
						BackendRef: gatewayv1.BackendRef{
							BackendObjectReference: gatewayv1.BackendObjectReference{
								Name: gatewayv1.ObjectName(makeServiceName(endpointCtx)),
								Port: &port,
							},
						},
					},
				},
			},
		},
	}
}

// NamespaceName has the format dp-<organization-name>-<project-name>-<environment-name>-<hash>
func makeNamespaceName(endpointCtx *integrations.EndpointContext) string {
	organizationName := controller.GetOrganizationName(endpointCtx.Project)
	projectName := controller.GetName(endpointCtx.Project)
	environmentName := controller.GetName(endpointCtx.Environment)
	return dpkubernetes.GenerateK8sName("dp", organizationName, projectName, environmentName)
}

func makeServiceName(deployCtx *integrations.EndpointContext) string {
	componentName := deployCtx.Component.Name
	deploymentTrackName := deployCtx.DeploymentTrack.Name
	// Limit the name to 253 characters to comply with the K8s name length limit for Deployments
	return dpkubernetes.GenerateK8sName(componentName, deploymentTrackName)
}

// makeDeploymentContext creates a deployment context for the given deployment by retrieving the
// parent objects that this deployment is associated with.
func (r *Reconciler) makeEndpointContext(ctx context.Context, endpoint *choreov1.Endpoint) (*integrations.EndpointContext, error) {
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

	targetDeployableArtifact, err := controller.GetDeployableArtifact(ctx, r.Client, endpoint)
	if err != nil {
		return nil, fmt.Errorf("cannot retrieve the deployable artifact: %w", err)
	}

	return &integrations.EndpointContext{
		Project:            project,
		Component:          component,
		DeploymentTrack:    deploymentTrack,
		DeployableArtifact: targetDeployableArtifact,
		Environment:        environment,
		Endpoint:           endpoint,
	}, nil
}
