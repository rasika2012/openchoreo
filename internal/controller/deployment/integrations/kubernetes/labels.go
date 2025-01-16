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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller/deployment/integrations"
)

const (
	LabelKeyOrganizationName    = "organization-name"
	LabelKeyProjectName         = "project-name"
	LabelKeyProjectID           = "project-id"
	LabelKeyComponentName       = "component-name"
	LabelKeyComponentID         = "component-id"
	LabelKeyDeploymentTrackName = "deployment-track-name"
	LabelKeyDeploymentTrackID   = "deployment-track-id"
	LabelKeyEnvironmentName     = "environment-name"
	LabelKeyEnvironmentID       = "environment-id"
	LabelKeyDeploymentName      = "deployment-name"
	LabelKeyDeploymentID        = "deployment-id"
	LabelKeyManagedBy           = "managed-by"
	LabelKeyBelongTo            = "belong-to"
	LabelKeyComponentType       = "component-type"

	LabelValueManagedBy = "choreo-deployment-controller"
	LabelValueBelongTo  = "user-workloads"
)

func makeLabels(deployCtx integrations.DeploymentContext) map[string]string {
	return map[string]string{
		LabelKeyOrganizationName:    controller.GetOrganizationName(deployCtx.Project),
		LabelKeyProjectName:         controller.GetName(deployCtx.Project),
		LabelKeyProjectID:           string(deployCtx.Project.UID),
		LabelKeyComponentName:       controller.GetName(deployCtx.Component),
		LabelKeyComponentID:         string(deployCtx.Component.UID),
		LabelKeyDeploymentTrackName: controller.GetName(deployCtx.DeploymentTrack),
		LabelKeyDeploymentTrackID:   string(deployCtx.DeploymentTrack.UID),
		LabelKeyEnvironmentName:     controller.GetName(deployCtx.Environment),
		LabelKeyEnvironmentID:       string(deployCtx.Environment.UID),
		LabelKeyDeploymentName:      controller.GetName(deployCtx.Deployment),
		LabelKeyDeploymentID:        string(deployCtx.Deployment.UID),
		LabelKeyManagedBy:           LabelValueManagedBy,
		LabelKeyBelongTo:            LabelValueBelongTo,
	}
}

func makeWorkloadLabels(deployCtx integrations.DeploymentContext) map[string]string {
	labels := makeLabels(deployCtx)
	labels[LabelKeyComponentType] = string(deployCtx.Component.Spec.Type)
	return labels
}

func extractManagedLabels(labels map[string]string) map[string]string {
	return map[string]string{
		LabelKeyOrganizationName:    labels[LabelKeyOrganizationName],
		LabelKeyProjectName:         labels[LabelKeyProjectName],
		LabelKeyProjectID:           labels[LabelKeyProjectID],
		LabelKeyComponentName:       labels[LabelKeyComponentName],
		LabelKeyComponentID:         labels[LabelKeyComponentID],
		LabelKeyDeploymentTrackName: labels[LabelKeyDeploymentTrackName],
		LabelKeyDeploymentTrackID:   labels[LabelKeyDeploymentTrackID],
		LabelKeyEnvironmentName:     labels[LabelKeyEnvironmentName],
		LabelKeyEnvironmentID:       labels[LabelKeyEnvironmentID],
		LabelKeyDeploymentName:      labels[LabelKeyDeploymentName],
		LabelKeyDeploymentID:        labels[LabelKeyDeploymentID],
		LabelKeyManagedBy:           labels[LabelKeyManagedBy],
		LabelKeyBelongTo:            labels[LabelKeyBelongTo],
		LabelKeyComponentType:       labels[LabelKeyComponentType],
	}
}
