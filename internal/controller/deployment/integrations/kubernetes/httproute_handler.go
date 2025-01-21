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

package kubernetes

import (
	"context"
	"errors"

	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/client"
	gatewayv1 "sigs.k8s.io/gateway-api/apis/v1"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
)

type httpRouteHandler struct {
	kubernetesClient client.Client
}

var _ integrations.ResourceHandler = (*httpRouteHandler)(nil)

func NewHTTPRouteHandler(kubernetesClient client.Client) integrations.ResourceHandler {
	return &httpRouteHandler{
		kubernetesClient: kubernetesClient,
	}
}

func (h *httpRouteHandler) Name() string {
	return "KubernetesHTTPRouteHandler"
}

func (h *httpRouteHandler) IsRequired(deployCtx integrations.DeploymentContext) bool {
	// HTTPRoutes are required for Web Applications
	return deployCtx.Component.Spec.Type == choreov1.ComponentTypeWebApplication
}

func (h *httpRouteHandler) GetCurrentState(ctx context.Context, deployCtx integrations.DeploymentContext) (interface{}, error) {
	namespace := makeNamespaceName(deployCtx)
	name := makeHTTPRouteName(deployCtx)
	out := &gatewayv1.HTTPRoute{}
	err := h.kubernetesClient.Get(ctx, client.ObjectKey{Name: name, Namespace: namespace}, out)
	if apierrors.IsNotFound(err) {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return out, nil
}

func (h *httpRouteHandler) Create(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	httpRoute := makeHTTPRoute(deployCtx)
	return h.kubernetesClient.Create(ctx, httpRoute)
}

func (h *httpRouteHandler) Update(ctx context.Context, deployCtx integrations.DeploymentContext, currentState interface{}) error {
	currentHTTPRoute, ok := currentState.(*gatewayv1.HTTPRoute)
	if !ok {
		return errors.New("failed to cast current state to HTTPRoute")
	}

	newHTTPRoute := makeHTTPRoute(deployCtx)

	if h.shouldUpdate(currentHTTPRoute, newHTTPRoute) {
		newHTTPRoute.ResourceVersion = currentHTTPRoute.ResourceVersion
		return h.kubernetesClient.Update(ctx, newHTTPRoute)
	}

	return nil
}

func (h *httpRouteHandler) Delete(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	httpRoute := makeHTTPRoute(deployCtx)
	err := h.kubernetesClient.Delete(ctx, httpRoute)
	if apierrors.IsNotFound(err) {
		return nil
	}
	return err
}

func makeHTTPRouteName(deployCtx integrations.DeploymentContext) string {
	componentName := deployCtx.Component.Name
	deploymentTrackName := deployCtx.DeploymentTrack.Name
	// Limit the name to 253 characters to comply with the K8s name length limit
	return GenerateK8sNameWithLengthLimit(253, componentName, deploymentTrackName)
}

func makeHTTPRoute(deployCtx integrations.DeploymentContext) *gatewayv1.HTTPRoute {
	return &gatewayv1.HTTPRoute{
		ObjectMeta: metav1.ObjectMeta{
			Name:      makeHTTPRouteName(deployCtx),
			Namespace: makeNamespaceName(deployCtx),
			Labels:    makeWorkloadLabels(deployCtx),
		},
		Spec: makeHTTPRouteSpec(deployCtx),
	}
}

func makeHTTPRouteSpec(deployCtx integrations.DeploymentContext) gatewayv1.HTTPRouteSpec {
	// If there are no endpoint templates, return an empty spec.
	// This should be validated from the admission controller.x
	if len(deployCtx.DeployableArtifact.Spec.Configuration.EndpointTemplates) == 0 {
		return gatewayv1.HTTPRouteSpec{}
	}

	pathType := gatewayv1.PathMatchPathPrefix
	hostname := gatewayv1.Hostname(deployCtx.Component.Name + "-" + deployCtx.Environment.Name + ".choreo.local")
	port := gatewayv1.PortNumber(deployCtx.DeployableArtifact.Spec.Configuration.EndpointTemplates[0].Service.Port) // Hard-coded ports, needs to be dynamic

	return gatewayv1.HTTPRouteSpec{
		CommonRouteSpec: gatewayv1.CommonRouteSpec{
			ParentRefs: []gatewayv1.ParentReference{
				{
					Name:      "gateway-external",                                    // Internal / external
					Namespace: (*gatewayv1.Namespace)(PtrString("choreo-system-dp")), // Change NS based on where envoy gateway is deployed
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
							Value: PtrString("/"),
						},
					},
				},
				BackendRefs: []gatewayv1.HTTPBackendRef{
					{
						BackendRef: gatewayv1.BackendRef{
							BackendObjectReference: gatewayv1.BackendObjectReference{
								Name: gatewayv1.ObjectName(makeServiceName(deployCtx)),
								Port: &port,
							},
						},
					},
				},
			},
		},
	}
}

func (h *httpRouteHandler) shouldUpdate(current, new *gatewayv1.HTTPRoute) bool {
	// Compare the labels
	if !cmp.Equal(extractManagedLabels(current.Labels), extractManagedLabels(new.Labels)) {
		return true
	}

	return !cmp.Equal(current.Spec, new.Spec, cmpopts.EquateEmpty())
}
