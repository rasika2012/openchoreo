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

package controller

import (
	"context"
	"fmt"

	"sigs.k8s.io/controller-runtime/pkg/client"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

// This file contains the helper functions to get the Choreo specific parent objects from the Kubernetes objects.

func GetProject(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Project, error) {
	projectList := &choreov1.ProjectList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			LabelKeyOrganizationName: GetOrganizationName(obj),
		},
	}
	// TODO: possible to use the index to get the project directly instead of listing all projects
	if err := c.List(ctx, projectList, listOpts...); err != nil {
		return nil, fmt.Errorf("failed to list projects: %w", err)
	}

	for _, project := range projectList.Items {
		if project.Labels == nil {
			// Ideally, this should not happen as the project should have the organization label
			continue
		}
		if GetName(&project) == GetProjectName(obj) {
			return &project, nil
		}
	}

	return nil, fmt.Errorf("cannot find a project with the name %s", GetProjectName(obj))
}

func GetComponent(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Component, error) {
	componentList := &choreov1.ComponentList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			LabelKeyOrganizationName: GetOrganizationName(obj),
			LabelKeyProjectName:      GetProjectName(obj),
		},
	}
	if err := c.List(ctx, componentList, listOpts...); err != nil {
		return nil, fmt.Errorf("failed to list components: %w", err)
	}

	for _, component := range componentList.Items {
		if component.Labels == nil {
			// Ideally, this should not happen as the Choreo object should have the hierarchy labels.
			continue
		}
		if GetName(&component) == GetComponentName(obj) {
			return &component, nil
		}
	}

	return nil, fmt.Errorf("cannot find a component with the name %s", GetComponentName(obj))
}

func GetDeploymentTrack(ctx context.Context, c client.Client, obj client.Object) (*choreov1.DeploymentTrack, error) {
	deploymentTrackList := &choreov1.DeploymentTrackList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			LabelKeyOrganizationName: GetOrganizationName(obj),
			LabelKeyProjectName:      GetProjectName(obj),
			LabelKeyComponentName:    GetComponentName(obj),
		},
	}
	if err := c.List(ctx, deploymentTrackList, listOpts...); err != nil {
		return nil, fmt.Errorf("failed to list deployment tracks: %w", err)
	}

	for _, deploymentTrack := range deploymentTrackList.Items {
		if deploymentTrack.Labels == nil {
			// Ideally, this should not happen as the deployment track should have the organization, project and component labels
			continue
		}
		if GetName(&deploymentTrack) == GetDeploymentTrackName(obj) {
			return &deploymentTrack, nil
		}
	}

	return nil, fmt.Errorf("cannot find a deployment track with the name %s", GetDeploymentTrackName(obj))
}

func GetEnvironment(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Environment, error) {
	environmentList := &choreov1.EnvironmentList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			LabelKeyOrganizationName: GetOrganizationName(obj),
		},
	}
	if err := c.List(ctx, environmentList, listOpts...); err != nil {
		return nil, fmt.Errorf("failed to list environments: %w", err)
	}

	for _, environment := range environmentList.Items {
		if environment.Labels == nil {
			// Ideally, this should not happen as the environment should have the organization, project, component and deployment track labels
			continue
		}
		if GetName(&environment) == GetEnvironmentName(obj) {
			return &environment, nil
		}
	}

	return nil, fmt.Errorf("cannot find an environment with the name %s", GetEnvironmentName(obj))

}

func GetDeployment(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Deployment, error) {
	deploymentList := &choreov1.DeploymentList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			LabelKeyOrganizationName:    GetOrganizationName(obj),
			LabelKeyProjectName:         GetProjectName(obj),
			LabelKeyComponentName:       GetComponentName(obj),
			LabelKeyDeploymentTrackName: GetDeploymentTrackName(obj),
		},
	}
	if err := c.List(ctx, deploymentList, listOpts...); err != nil {
		return nil, fmt.Errorf("failed to list deployments: %w", err)
	}

	for _, deployment := range deploymentList.Items {
		if deployment.Labels == nil {
			// Ideally, this should not happen as the deployment should have the organization, project, component and deployment track labels
			continue
		}
		if deployment.Name == GetDeploymentName(obj) {
			return &deployment, nil
		}
	}

	return nil, fmt.Errorf("cannot find a deployment with the name %s", GetDeploymentName(obj))
}

func GetDeployableArtifact(ctx context.Context, c client.Client, obj client.Object) (*choreov1.DeployableArtifact, error) {
	deployableArtifactList := &choreov1.DeployableArtifactList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			LabelKeyOrganizationName: GetOrganizationName(obj),
			LabelKeyProjectName:      GetProjectName(obj),
			LabelKeyComponentName:    GetComponentName(obj),
		},
	}
	if err := c.List(ctx, deployableArtifactList, listOpts...); err != nil {
		return nil, fmt.Errorf("failed to list deployable artifacts: %w", err)
	}

	deployableArtifactName := GetDeployableArtifactName(obj)

	for _, deployableArtifact := range deployableArtifactList.Items {
		if deployableArtifact.Name == deployableArtifactName {
			return &deployableArtifact, nil
		}
	}

	return nil, fmt.Errorf("cannot find a deployable artifact with the name %s", deployableArtifactName)
}
