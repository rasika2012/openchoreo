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
	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/util/intstr"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

type serviceHandler struct {
	kubernetesClient client.Client
}

var _ integrations.ResourceHandler = (*serviceHandler)(nil)

func NewServiceHandler(kubernetesClient client.Client) integrations.ResourceHandler {
	return &serviceHandler{
		kubernetesClient: kubernetesClient,
	}
}

func (h *serviceHandler) Name() string {
	return "KubernetesServiceHandler"
}

func (h *serviceHandler) IsRequired(deployCtx integrations.DeploymentContext) bool {
	// Services are required for Web Applications
	return deployCtx.Component.Spec.Type == choreov1.ComponentTypeWebApplication
}

func (h *serviceHandler) GetCurrentState(ctx context.Context, deployCtx integrations.DeploymentContext) (interface{}, error) {
	namespace := makeNamespaceName(deployCtx)
	name := makeServiceName(deployCtx)
	out := &corev1.Service{}
	err := h.kubernetesClient.Get(ctx, client.ObjectKey{Name: name, Namespace: namespace}, out)
	if apierrors.IsNotFound(err) {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return out, nil
}

func (h *serviceHandler) Create(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	service := makeService(deployCtx)
	return h.kubernetesClient.Create(ctx, service)
}

func (h *serviceHandler) Update(ctx context.Context, deployCtx integrations.DeploymentContext, currentState interface{}) error {
	currentService, ok := currentState.(*corev1.Service)
	if !ok {
		return errors.New("failed to cast current state to Service")
	}

	newService := makeService(deployCtx)

	if h.shouldUpdate(currentService, newService) {
		newService.ResourceVersion = currentService.ResourceVersion
		// Preserve the cluster IP which is immutable
		newService.Spec.ClusterIP = currentService.Spec.ClusterIP
		return h.kubernetesClient.Update(ctx, newService)
	}

	return nil
}

func (h *serviceHandler) Delete(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	service := makeService(deployCtx)
	err := h.kubernetesClient.Delete(ctx, service)
	if apierrors.IsNotFound(err) {
		return nil
	}
	return err
}

func makeServiceName(deployCtx integrations.DeploymentContext) string {
	componentName := deployCtx.Component.Name
	deploymentTrackName := deployCtx.DeploymentTrack.Name
	// Limit the name to 253 characters to comply with the K8s name length limit
	return GenerateK8sNameWithLengthLimit(253, componentName, deploymentTrackName)
}

func makeService(deployCtx integrations.DeploymentContext) *corev1.Service {
	return &corev1.Service{
		ObjectMeta: metav1.ObjectMeta{
			Name:      makeServiceName(deployCtx),
			Namespace: makeNamespaceName(deployCtx),
			Labels:    makeWorkloadLabels(deployCtx),
		},
		Spec: makeServiceSpec(deployCtx),
	}
}

func makeServiceSpec(deployCtx integrations.DeploymentContext) corev1.ServiceSpec {
	return corev1.ServiceSpec{
		Selector: makeWorkloadLabels(deployCtx),
		Ports: []corev1.ServicePort{
			{
				Port:       8080, // Hard-coded ports, needs to be dynamic
				TargetPort: intstr.FromInt(80),
				Protocol:   corev1.ProtocolTCP,
			},
		},
		Type: corev1.ServiceTypeClusterIP,
	}
}

func (h *serviceHandler) shouldUpdate(current, new *corev1.Service) bool {
	// Compare the labels
	if !cmp.Equal(extractManagedLabels(current.Labels), extractManagedLabels(new.Labels)) {
		return true
	}

	// Compare spec excluding the ClusterIP field which is immutable
	currentSpec := current.Spec.DeepCopy()
	currentSpec.ClusterIP = ""
	newSpec := new.Spec.DeepCopy()
	newSpec.ClusterIP = ""

	return !cmp.Equal(currentSpec, newSpec, cmpopts.EquateEmpty())
}
