/*
 * Copyright (c) 2024, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
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
	corev1 "k8s.io/api/core/v1"
	apierrors "k8s.io/apimachinery/pkg/api/errors"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/client"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
)

type namespaceHandler struct {
	kubernetesClient client.Client
}

var _ integrations.ResourceHandler = (*namespaceHandler)(nil)

func NewNamespaceHandler(kubernetesClient client.Client) integrations.ResourceHandler {
	return &namespaceHandler{
		kubernetesClient: kubernetesClient,
	}
}

func (h *namespaceHandler) Name() string {
	return "KubernetesNamespace"
}

func (h *namespaceHandler) IsRequired(deployCtx integrations.DeploymentContext) bool {
	// Namespace is always required and the deletion of a namespace should be handled by the project deletion
	// This will ensure the namespace is lazily created during the first deployment
	return true
}

func (h *namespaceHandler) GetCurrentState(ctx context.Context, deployCtx integrations.DeploymentContext) (interface{}, error) {
	name := makeNamespaceName(deployCtx)
	out := &corev1.Namespace{}
	err := h.kubernetesClient.Get(ctx, client.ObjectKey{Name: name}, out)
	if apierrors.IsNotFound(err) {
		return nil, nil
	} else if err != nil {
		return nil, err
	}
	return out, nil
}

func (h *namespaceHandler) Create(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	namespace := makeNamespace(deployCtx)
	return h.kubernetesClient.Create(ctx, namespace)
}

func (h *namespaceHandler) Update(ctx context.Context, deployCtx integrations.DeploymentContext, currentState interface{}) error {
	currentNamespace, ok := currentState.(*corev1.Namespace)
	if !ok {
		return errors.New("failed to cast the current state to a Namespace")
	}
	newNamespace := makeNamespace(deployCtx)

	if h.shouldUpdate(currentNamespace, newNamespace) {
		return h.kubernetesClient.Update(ctx, newNamespace)
	}

	return nil
}

func (h *namespaceHandler) Delete(ctx context.Context, deployCtx integrations.DeploymentContext) error {
	namespace := makeNamespace(deployCtx)
	err := h.kubernetesClient.Delete(ctx, namespace)
	if apierrors.IsNotFound(err) {
		return nil
	}
	return err
}

func (h *namespaceHandler) shouldUpdate(current, new *corev1.Namespace) bool {
	// Compare only the labels
	return !cmp.Equal(extractManagedLabels(current.Labels), extractManagedLabels(new.Labels))
}

// NamespaceName has the format dp-<organization-name>-<project-name>-<environment-name>-<hash>
func makeNamespaceName(deployCtx integrations.DeploymentContext) string {
	organizationName := controller.GetOrganizationName(deployCtx.Project)
	projectName := controller.GetName(deployCtx.Project)
	environmentName := controller.GetName(deployCtx.Environment)
	return GenerateK8sName("dp", organizationName, projectName, environmentName)
}

func makeNamespace(deployCtx integrations.DeploymentContext) *corev1.Namespace {
	return &corev1.Namespace{
		ObjectMeta: metav1.ObjectMeta{
			Name:   makeNamespaceName(deployCtx),
			Labels: makeLabels(deployCtx),
		},
	}
}
