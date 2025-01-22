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

func makeLabels(deployCtx *integrations.DeploymentContext) map[string]string {
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

func makeWorkloadLabels(deployCtx *integrations.DeploymentContext) map[string]string {
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
