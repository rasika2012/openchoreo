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

// CommandImplementationInterface combines all APIs
type CommandImplementationInterface interface {
	OrganizationAPI
	ProjectAPI
	ComponentAPI
	BuildAPI
	DeployableArtifactAPI
	DeploymentAPI
	ApplyAPI
	LoginAPI
	LogoutAPI
	LogAPI
	EnvironmentAPI
	DataPlaneAPI
	DeploymentTrackAPI
	EndpointAPI
	ConfigContextAPI
}

// OrganizationAPI defines organization-related operations
type OrganizationAPI interface {
	CreateOrganization(params CreateOrganizationParams) error
	ListOrganization(params ListParams) error
}

// ProjectAPI defines project-related operations
type ProjectAPI interface {
	CreateProject(params CreateProjectParams) error
	ListProject(params ListProjectParams) error
}

// ComponentAPI defines component-related operations
type ComponentAPI interface {
	CreateComponent(params CreateComponentParams) error
	ListComponent(params ListComponentParams) error
}

// BuildAPI defines methods for building configurations
type BuildAPI interface {
	CreateBuild(params CreateBuildParams) error
	ListBuild(params ListBuildParams) error
}

type DeployableArtifactAPI interface {
	CreateDeployableArtifact(params CreateDeployableArtifactParams) error
	ListDeployableArtifact(params ListDeployableArtifactParams) error
}

type DeploymentAPI interface {
	CreateDeployment(params CreateDeploymentParams) error
	ListDeployment(params ListDeploymentParams) error
}

// ApplyAPI defines methods for applying configurations
type ApplyAPI interface {
	Apply(params ApplyParams) error
}

// LoginAPI defines methods for authentication
type LoginAPI interface {
	Login(params LoginParams) error
	IsLoggedIn() bool
	GetLoginPrompt() string
}

// LogoutAPI defines methods for ending sessions
type LogoutAPI interface {
	Logout() error
}

type LogAPI interface {
	GetLogs(params LogParams) error
}

type EnvironmentAPI interface {
	CreateEnvironment(params CreateEnvironmentParams) error
	ListEnvironment(params ListEnvironmentParams) error
}

type DataPlaneAPI interface {
	CreateDataPlane(params CreateDataPlaneParams) error
	ListDataPlane(params ListDataPlaneParams) error
}

type DeploymentTrackAPI interface {
	CreateDeploymentTrack(params CreateDeploymentTrackParams) error
	ListDeploymentTrack(params ListDeploymentTrackParams) error
}

type EndpointAPI interface {
	ListEndpoint(params ListEndpointParams) error
}

type ConfigContextAPI interface {
	GetContexts() error
	GetCurrentContext() error
	UseContext(params UseContextParams) error
	SetContext(params SetContextParams) error
}
