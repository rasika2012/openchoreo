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
	"errors"
	"fmt"
	"reflect"
	"strings"

	"sigs.k8s.io/controller-runtime/pkg/client"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/labels"
)

// This file contains the helper functions to get the Choreo specific parent objects from the Kubernetes objects.

// HierarchyNotFoundError is an error type that is used to indicate that a parent object in the hierarchy is not found.
type HierarchyNotFoundError struct {
	objInfo    string
	parentInfo string

	parentHierarchyInfos []string
}

func (e *HierarchyNotFoundError) Error() string {
	return fmt.Sprintf("%s refers to a non-existent %s on %s", e.objInfo, e.parentInfo, strings.Join(e.parentHierarchyInfos, " -> "))
}

// NewHierarchyNotFoundError creates a new error with the given object and parent object details.
// The parentObj is the immediate parent of the obj
// The parentHierarchyObjs are the hierarchy of objects from the parentObj to the top level object starting from the top level object.
// Example: NewHierarchyNotFoundError(deployment, deploymentTrack, organization, project, component)
func NewHierarchyNotFoundError(obj client.Object, parentObj client.Object, parentHierarchyObjs ...client.Object) error {
	getKindFn := func(obj client.Object) string {
		if !obj.GetObjectKind().GroupVersionKind().Empty() {
			return obj.GetObjectKind().GroupVersionKind().Kind
		}
		// If the object is initialized without setting the GVK, use the type name.
		return reflect.TypeOf(obj).Elem().Name()
	}

	genInfoFn := func(obj client.Object) string {
		return fmt.Sprintf("%s '%s'", strings.ToLower(getKindFn(obj)), obj.GetName())
	}

	parentHierarchyInfos := make([]string, 0, len(parentHierarchyObjs))
	for _, parentHierarchyObj := range parentHierarchyObjs {
		parentHierarchyInfos = append(parentHierarchyInfos, genInfoFn(parentHierarchyObj))
	}

	return &HierarchyNotFoundError{
		objInfo:              genInfoFn(obj),
		parentInfo:           genInfoFn(parentObj),
		parentHierarchyInfos: parentHierarchyInfos,
	}
}

// IgnoreHierarchyNotFoundError returns nil if the given error is a HierarchyNotFoundError.
// This is useful during the reconciliation process to ignore the error if the parent object is not found and avoid retrying.
func IgnoreHierarchyNotFoundError(err error) error {
	if err == nil {
		return nil
	}
	var notFoundErr *HierarchyNotFoundError
	if errors.As(err, &notFoundErr) {
		return nil
	}
	return err
}

// objWithName is a helper functions to set the name of the object.
// Use this function to only set the name of a newly created object as it directly modifies the object.
func objWithName(obj client.Object, name string) client.Object {
	obj.SetName(name)
	return obj
}

func GetProject(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Project, error) {
	projectList := &choreov1.ProjectList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			labels.LabelKeyOrganizationName: GetOrganizationName(obj),
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

	return nil, NewHierarchyNotFoundError(obj, objWithName(&choreov1.Project{}, GetProjectName(obj)),
		objWithName(&choreov1.Organization{}, GetOrganizationName(obj)),
	)
}

func GetComponent(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Component, error) {
	componentList := &choreov1.ComponentList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			labels.LabelKeyOrganizationName: GetOrganizationName(obj),
			labels.LabelKeyProjectName:      GetProjectName(obj),
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

	return nil, NewHierarchyNotFoundError(obj, objWithName(&choreov1.Component{}, GetComponentName(obj)),
		objWithName(&choreov1.Organization{}, GetOrganizationName(obj)),
		objWithName(&choreov1.Project{}, GetProjectName(obj)),
	)
}

func GetDeploymentTrack(ctx context.Context, c client.Client, obj client.Object) (*choreov1.DeploymentTrack, error) {
	deploymentTrackList := &choreov1.DeploymentTrackList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			labels.LabelKeyOrganizationName: GetOrganizationName(obj),
			labels.LabelKeyProjectName:      GetProjectName(obj),
			labels.LabelKeyComponentName:    GetComponentName(obj),
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

	return nil, NewHierarchyNotFoundError(obj, objWithName(&choreov1.DeploymentTrack{}, GetDeploymentTrackName(obj)),
		objWithName(&choreov1.Organization{}, GetOrganizationName(obj)),
		objWithName(&choreov1.Project{}, GetProjectName(obj)),
		objWithName(&choreov1.Component{}, GetComponentName(obj)),
	)
}

func GetEnvironment(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Environment, error) {
	environmentList := &choreov1.EnvironmentList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			labels.LabelKeyOrganizationName: GetOrganizationName(obj),
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

	return nil, NewHierarchyNotFoundError(obj, objWithName(&choreov1.Environment{}, GetEnvironmentName(obj)),
		objWithName(&choreov1.Organization{}, GetOrganizationName(obj)),
	)
}

func GetDeployment(ctx context.Context, c client.Client, obj client.Object) (*choreov1.Deployment, error) {
	deploymentList := &choreov1.DeploymentList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			labels.LabelKeyOrganizationName:    GetOrganizationName(obj),
			labels.LabelKeyProjectName:         GetProjectName(obj),
			labels.LabelKeyComponentName:       GetComponentName(obj),
			labels.LabelKeyDeploymentTrackName: GetDeploymentTrackName(obj),
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

	return nil, NewHierarchyNotFoundError(obj, objWithName(&choreov1.Deployment{}, GetDeploymentName(obj)),
		objWithName(&choreov1.Organization{}, GetOrganizationName(obj)),
		objWithName(&choreov1.Project{}, GetProjectName(obj)),
		objWithName(&choreov1.Component{}, GetComponentName(obj)),
		objWithName(&choreov1.DeploymentTrack{}, GetDeploymentTrackName(obj)),
	)
}

func GetDeployableArtifact(ctx context.Context, c client.Client, obj client.Object) (*choreov1.DeployableArtifact, error) {
	deployableArtifactList := &choreov1.DeployableArtifactList{}
	listOpts := []client.ListOption{
		client.InNamespace(obj.GetNamespace()),
		client.MatchingLabels{
			labels.LabelKeyOrganizationName:    GetOrganizationName(obj),
			labels.LabelKeyProjectName:         GetProjectName(obj),
			labels.LabelKeyComponentName:       GetComponentName(obj),
			labels.LabelKeyDeploymentTrackName: GetDeploymentTrackName(obj),
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

	return nil, NewHierarchyNotFoundError(obj, objWithName(&choreov1.DeployableArtifact{}, deployableArtifactName),
		objWithName(&choreov1.Organization{}, GetOrganizationName(obj)),
		objWithName(&choreov1.Project{}, GetProjectName(obj)),
		objWithName(&choreov1.Component{}, GetComponentName(obj)),
		objWithName(&choreov1.DeploymentTrack{}, GetDeploymentTrackName(obj)),
	)
}
