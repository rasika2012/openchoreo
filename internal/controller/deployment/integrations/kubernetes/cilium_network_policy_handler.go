/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
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

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
	ciliumv2 "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/kubernetes/types/cilium.io/v2"
)

type ciliumNetworkPolicyHandler struct {
	kubernetesClient client.Client
}

var _ integrations.ResourceHandler = (*ciliumNetworkPolicyHandler)(nil)

func NewCiliumNetworkPolicyHandler(kubernetesClient client.Client) integrations.ResourceHandler {
	return &ciliumNetworkPolicyHandler{
		kubernetesClient: kubernetesClient,
	}
}

func (h *ciliumNetworkPolicyHandler) Name() string {
	return "KubernetesCiliumNetworkPolicy"
}

func (h *ciliumNetworkPolicyHandler) IsRequired(deployCtx integrations.DeploymentContext) bool {
	// CiliumNetworkPolicy is always required and the deletion of this should be handled by the project deletion
	// This will ensure the CiliumNetworkPolicy is lazily created during the first deployment for a namespace
	return true
}

func (h *ciliumNetworkPolicyHandler) GetCurrentState(ctx context.Context, deployCtx integrations.DeploymentContext) (interface{}, error) {
	namespace := makeNamespaceName(deployCtx)
	name := makeCiliumNetworkPolicyName(deployCtx)
	out := &ciliumv2.CiliumNetworkPolicy{}
	err := h.kubernetesClient.Get(ctx, client.ObjectKey{Name: name, Namespace: namespace}, out)
	if apierrors.IsNotFound(err) {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return out, nil
}

func (h *ciliumNetworkPolicyHandler) Create(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	cnp := makeCiliumNetworkPolicy(deployCtx)
	return h.kubernetesClient.Create(ctx, cnp)
}

func (h *ciliumNetworkPolicyHandler) Update(ctx context.Context, deployCtx integrations.DeploymentContext, currentState interface{}) error {
	currentCNP, ok := currentState.(*ciliumv2.CiliumNetworkPolicy)
	if !ok {
		return errors.New("failed to cast current state to CiliumNetworkPolicy")
	}
	newCNP := makeCiliumNetworkPolicy(deployCtx)

	if h.shouldUpdate(currentCNP, newCNP) {
		newCNP.ResourceVersion = currentCNP.ResourceVersion
		return h.kubernetesClient.Update(ctx, newCNP)
	}

	return nil
}

func (h *ciliumNetworkPolicyHandler) Delete(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	cnp := makeCiliumNetworkPolicy(deployCtx)
	err := h.kubernetesClient.Delete(ctx, cnp)
	if apierrors.IsNotFound(err) {
		return nil
	}
	return err
}

func (h *ciliumNetworkPolicyHandler) shouldUpdate(current, new *ciliumv2.CiliumNetworkPolicy) bool {
	// Compare the labels
	if !cmp.Equal(extractManagedLabels(current.Labels), extractManagedLabels(new.Labels)) {
		return true
	}

	if !cmp.Equal(current.Spec, new.Spec, cmpopts.EquateEmpty()) {
		return true
	}
	return false
}

func makeCiliumNetworkPolicyName(deployCtx integrations.DeploymentContext) string {
	return "default-policy"
}

func makeCiliumNetworkPolicy(deployCtx integrations.DeploymentContext) *ciliumv2.CiliumNetworkPolicy {
	return &ciliumv2.CiliumNetworkPolicy{
		TypeMeta: metav1.TypeMeta{
			APIVersion: "cilium.io/v2",
			Kind:       "CiliumNetworkPolicy",
		},
		ObjectMeta: metav1.ObjectMeta{
			Name:      makeCiliumNetworkPolicyName(deployCtx),
			Namespace: makeNamespaceName(deployCtx),
			Labels:    makeLabels(deployCtx),
		},
		Spec: makeRuleAllowCommunicationWithinNamespaceOnly(),
	}
}

// TODO: Unit test me
func makeRuleAllowCommunicationWithinNamespaceOnly() *ciliumv2.Rule {
	allEndpoints := ciliumv2.EndpointSelector{
		MatchLabels: map[string]string{},
	}

	return &ciliumv2.Rule{
		EndpointSelector: &ciliumv2.EndpointSelector{},
		Egress: []ciliumv2.EgressRule{
			{
				ToEndpoints: []ciliumv2.EndpointSelector{allEndpoints},
			},
		},
		Ingress: []ciliumv2.IngressRule{
			{
				FromEndpoints: []ciliumv2.EndpointSelector{allEndpoints},
			},
		},
	}
}
