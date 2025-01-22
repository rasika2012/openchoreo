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
