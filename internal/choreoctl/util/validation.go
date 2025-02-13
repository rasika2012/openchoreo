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

package util

import (
	"fmt"
	"net/url"
	"regexp"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

const (
	RegexResourceName = "^[a-z0-9][a-z0-9-]*[a-z0-9]$"
)

type CommandType string

const (
	CmdCreate CommandType = "create"
	CmdGet    CommandType = "get"
)

type ResourceType string

const (
	ResourceProject            ResourceType = "project"
	ResourceComponent          ResourceType = "component"
	ResourceBuild              ResourceType = "build"
	ResourceDeployment         ResourceType = "deployment"
	ResourceDeploymentTrack    ResourceType = "deploymenttrack"
	ResourceEnvironment        ResourceType = "environment"
	ResourceDeployableArtifact ResourceType = "deployableartifact"
	ResourceEndpoint           ResourceType = "endpoint"
	ResourceOrganization       ResourceType = "organization"
	ResourceDataPlane          ResourceType = "dataplane"
)

var namePattern = regexp.MustCompile(RegexResourceName)

// Helper function to check required fields
func checkRequiredFields(fields map[string]string) bool {
	for _, v := range fields {
		if v == "" {
			return false
		}
	}
	return true
}

// DeploymentTrack validation
func validateDeploymentTrackParams(cmdType CommandType, params interface{}) error {
	switch cmdType {
	case CmdCreate:
		if p, ok := params.(api.CreateDeploymentTrackParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceDeploymentTrack)
			}
		}
	case CmdGet:
		if p, ok := params.(api.ListDeploymentTrackParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceDeploymentTrack)
			}
		}
	}
	return nil
}

// Helper to generate consistent error messages
func generateHelpError(cmdType CommandType, resource ResourceType) error {
	return errors.NewError(
		"missing required parameter(s)\n\n"+
			"To see how to use this command, run:\n"+
			"  choreoctl %s %s -h\n\n"+
			"To use interactive mode, run:\n"+
			"  choreoctl %s %s --interactive",
		cmdType, resource, cmdType, resource)
}

// Project validation
func validateProjectParams(cmdType CommandType, params interface{}) error {
	switch cmdType {
	case CmdCreate:
		if p, ok := params.(api.CreateProjectParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"name":         p.Name,
			}) {
				return generateHelpError(cmdType, ResourceProject)
			}
		}
	case CmdGet:
		if p, ok := params.(api.ListProjectParams); ok {
			if p.Organization == "" {
				return generateHelpError(cmdType, ResourceProject)
			}
		}
	}
	return nil
}

// Component validation
func validateComponentParams(cmdType CommandType, params interface{}) error {
	switch cmdType {
	case CmdCreate:
		if p, ok := params.(api.CreateComponentParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"name":         p.Name,
			}) {
				return generateHelpError(cmdType, ResourceComponent)
			}
		}
	case CmdGet:
		if p, ok := params.(api.ListComponentParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
			}) {
				return generateHelpError(cmdType, ResourceComponent)
			}
		}
	}
	return nil
}

// Build validation
func validateBuildParams(cmdType CommandType, params interface{}) error {
	switch cmdType {
	case CmdCreate:
		if p, ok := params.(api.CreateBuildParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceBuild)
			}
		}
	case CmdGet:
		if p, ok := params.(api.ListBuildParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceBuild)
			}
		}
	}
	return nil
}

// Deployment validation
func validateDeploymentParams(cmdType CommandType, params interface{}) error {
	switch cmdType {
	case CmdCreate:
		if p, ok := params.(api.CreateDeploymentParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceDeployment)
			}
		}
	case CmdGet:
		if p, ok := params.(api.ListDeploymentParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceDeployment)
			}
		}
	}
	return nil
}

// Environment validation
func validateEnvironmentParams(cmdType CommandType, params interface{}) error {
	switch cmdType {
	case CmdCreate:
		if p, ok := params.(api.CreateEnvironmentParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"name":         p.Name,
			}) {
				return generateHelpError(cmdType, ResourceEnvironment)
			}
		}
	case CmdGet:
		if p, ok := params.(api.ListEnvironmentParams); ok {
			if p.Organization == "" {
				return generateHelpError(cmdType, ResourceEnvironment)
			}
		}
	}
	return nil
}

// DeployableArtifact validation
func validateDeployableArtifactParams(cmdType CommandType, params interface{}) error {
	switch cmdType {
	case CmdCreate:
		if p, ok := params.(api.CreateDeployableArtifactParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceDeployableArtifact)
			}
		}
	case CmdGet:
		if p, ok := params.(api.ListDeployableArtifactParams); ok {
			if !checkRequiredFields(map[string]string{
				"organization": p.Organization,
				"project":      p.Project,
				"component":    p.Component,
			}) {
				return generateHelpError(cmdType, ResourceDeployableArtifact)
			}
		}
	}
	return nil
}

func ValidateParams(cmdType CommandType, resource ResourceType, params interface{}) error {
	switch resource {
	case ResourceProject:
		return validateProjectParams(cmdType, params)
	case ResourceComponent:
		return validateComponentParams(cmdType, params)
	case ResourceBuild:
		return validateBuildParams(cmdType, params)
	case ResourceDeployment:
		return validateDeploymentParams(cmdType, params)
	case ResourceDeploymentTrack:
		return validateDeploymentTrackParams(cmdType, params)
	case ResourceEnvironment:
		return validateEnvironmentParams(cmdType, params)
	case ResourceDeployableArtifact:
		return validateDeployableArtifactParams(cmdType, params)
	default:
		return errors.NewError("unknown resource type: %s", resource)
	}
}

func ValidateResourceName(resource string, val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return errors.NewError("invalid type for resource name")
	}

	if str == "" {
		return errors.NewError("empty field for resource name")
	}
	if !namePattern.MatchString(str) {
		errMsg := fmt.Sprintf("invalid %s name format, expected: %s", resource, RegexResourceName)
		return errors.NewError("%s", errMsg)
	}

	return nil
}

func ValidateOrganization(val interface{}) error {
	return ValidateResourceName("organization", val)
}

func ValidateProject(val interface{}) error {
	return ValidateResourceName("project", val)
}

func ValidateComponent(val interface{}) error {
	return ValidateResourceName("component", val)
}

func ValidateURL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return errors.NewError("invalid type for URL")
	}

	if str == "" {
		return errors.NewError("empty field for URL")
	}

	if _, err := url.Parse(str); err != nil {
		return errors.NewError("invalid URL format")
	}

	return nil
}
