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

package api

import (
	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
)

// ListParams defines common parameters for listing resources
type ListParams struct {
	OutputFormat string
	Name         string
}

// ListProjectParams defines parameters for listing projects
type ListProjectParams struct {
	Organization string
	OutputFormat string
	Interactive  bool
	Name         string
}

// ListComponentParams defines parameters for listing components
type ListComponentParams struct {
	Organization string
	Project      string
	OutputFormat string
	Name         string
	Interactive  bool // Add this field
}

// CreateOrganizationParams defines parameters for creating organizations
type CreateOrganizationParams struct {
	Name        string
	DisplayName string
	Description string
	Interactive bool
}

// CreateProjectParams defines parameters for creating projects
type CreateProjectParams struct {
	Organization string
	Name         string
	DisplayName  string
	Description  string
	Interactive  bool
}

// CreateComponentParams contains parameters for component creation
type CreateComponentParams struct {
	Name             string
	DisplayName      string
	Type             choreov1.ComponentType
	Organization     string
	Project          string
	Description      string
	GitRepositoryURL string
	Branch           string
	Context          string
	DockerFile       string
	BuildConfig      string
	Image            string
	Tag              string
	Port             int
	Endpoint         string
	Interactive      bool
}

// ApplyParams defines parameters for applying configuration files
type ApplyParams struct {
	FilePath string
}

// LoginParams defines parameters for login
type LoginParams struct {
	KubeconfigPath string
	Kubecontext    string
}

type LogParams struct {
	Organization string
	Project      string
	Component    string
	Build        string
	Type         string
	Environment  string
	Follow       bool
	TailLines    int64
}

// CreateBuildParams contains parameters for build creation
type CreateBuildParams struct {
	// Basic metadata
	Name         string
	Organization string
	Project      string
	Component    string
	Interactive  bool
	// Build configuration
	Docker    *choreov1.DockerConfiguration
	Buildpack *choreov1.BuildpackConfiguration
}

// ListBuildParams defines parameters for listing builds
type ListBuildParams struct {
	Organization string
	Project      string
	Component    string
	OutputFormat string
	Interactive  bool
	Name         string
}

// CreateDeployableArtifactParams defines parameters for creating a deployable artifact
type CreateDeployableArtifactParams struct {
	Name            string
	Organization    string
	Project         string
	Component       string
	DeploymentTrack string
	DisplayName     string
	Description     string
	FromBuildRef    *choreov1.FromBuildRef
	FromImageRef    *choreov1.FromImageRef
	Configuration   *choreov1.Configuration
	Interactive     bool
}

// ListDeployableArtifactParams defines parameters for listing deployable artifacts
type ListDeployableArtifactParams struct {
	// Standard resource filters
	Organization string
	Project      string
	Component    string

	// Artifact-specific filters
	DeploymentTrack string
	Build           string
	DockerImage     string

	// Display options
	OutputFormat string
	Name         string

	// Optional filters
	GitRevision  string
	DisabledOnly bool
	Interactive  bool
}

// ListDeploymentParams defines parameters for listing deployments
type ListDeploymentParams struct {
	// Standard resource filters
	Organization string
	Project      string
	Component    string

	// Deployment specific filters
	Environment     string
	DeploymentTrack string
	ArtifactRef     string

	// Display options
	OutputFormat string
	Name         string
	Interactive  bool
}

// CreateDeploymentParams defines parameters for creating a deployment
type CreateDeploymentParams struct {
	Name               string
	Organization       string
	Project            string
	Component          string
	Environment        string
	DeploymentTrack    string
	DeployableArtifact string
	ConfigOverrides    *choreov1.ConfigurationOverrides
	Interactive        bool
}

// CreateDeploymentTrackParams defines parameters for creating a deployment track
type CreateDeploymentTrackParams struct {
	Name              string
	Organization      string
	Project           string
	Component         string
	DisplayName       string
	Description       string
	APIVersion        string
	AutoDeploy        bool
	BuildTemplateSpec *choreov1.BuildTemplateSpec
	Interactive       bool
}

// ListDeploymentTrackParams defines parameters for listing deployment tracks
type ListDeploymentTrackParams struct {
	Organization string
	Project      string
	Component    string
	OutputFormat string
	Interactive  bool
	Name         string
}

// CreateEnvironmentParams defines parameters for creating an environment
type CreateEnvironmentParams struct {
	Name         string
	Organization string
	DisplayName  string
	Description  string
	DataPlaneRef string
	IsProduction bool
	DNSPrefix    string
	Interactive  bool
}

// ListEnvironmentParams defines parameters for listing environments
type ListEnvironmentParams struct {
	Organization string
	OutputFormat string
	Interactive  bool
	Name         string
}

// CreateDataPlaneParams defines parameters for creating a data plane
type CreateDataPlaneParams struct {
	Name                    string
	Organization            string
	DisplayName             string
	Description             string
	KubernetesClusterName   string
	ConnectionConfigRef     string
	EnableCilium            bool
	EnableScaleToZero       bool
	GatewayType             string
	PublicVirtualHost       string
	OrganizationVirtualHost string
	Interactive             bool
}

// ListDataPlaneParams defines parameters for listing data planes
type ListDataPlaneParams struct {
	Organization string
	OutputFormat string
	Interactive  bool
	Name         string
}

// ListEndpointParams defines parameters for listing endpoints
type ListEndpointParams struct {
	Organization string
	Project      string
	Component    string
	Environment  string
	OutputFormat string
	Interactive  bool
	Name         string
}

type SetContextParams struct {
	Name           string
	Organization   string
	Project        string
	Component      string
	Environment    string
	DataPlane      string
	ClusterRef     string
	KubeconfigPath string
	KubeContext    string
}

type UseContextParams struct {
	Name string
}
