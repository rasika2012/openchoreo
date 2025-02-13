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

package choreoctl

import (
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/apply"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/config"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/build"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/component"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/dataplane"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/deployableartifact"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/deployment"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/deploymenttrack"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/environment"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/organization"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/project"
	getbuild "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/build"
	getcomponent "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/component"
	getdataplane "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/dataplane"
	getdeployartifcat "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/deployableartifact"
	getdeploy "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/deployment"
	getdeploymenttrack "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/deploymenttrack"
	getendpoint "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/endpoint"
	getenv "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/environment"
	getorganization "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/organization"
	getproject "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/get/project"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/login"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/logout"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/logs"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type CommandImplementation struct{}

var _ api.CommandImplementationInterface = &CommandImplementation{}

func NewCommandImplementation() *CommandImplementation {
	return &CommandImplementation{}
}

// List Operations

func (c *CommandImplementation) ListOrganization(params api.ListParams) error {
	orgImpl := getorganization.NewListOrgImpl(constants.OrganizationV1Config)
	return orgImpl.ListOrganization(params)
}

func (c *CommandImplementation) ListProject(params api.ListProjectParams) error {
	projImpl := getproject.NewListProjImpl(constants.ProjectV1Config)
	return projImpl.ListProject(params)
}

func (c *CommandImplementation) ListComponent(params api.ListComponentParams) error {
	compImpl := getcomponent.NewListCompImpl(constants.ComponentV1Config)
	return compImpl.ListComponent(params)
}

func (c *CommandImplementation) ListBuild(params api.ListBuildParams) error {
	buildImpl := getbuild.NewListBuildImpl(constants.BuildV1Config)
	return buildImpl.ListBuild(params)
}

func (c *CommandImplementation) ListDeployableArtifact(params api.ListDeployableArtifactParams) error {
	deployableArtifactImpl := getdeployartifcat.NewListDeployableArtifactImpl(constants.DeployableArtifactV1Config)
	return deployableArtifactImpl.ListDeployableArtifact(params)
}

func (c *CommandImplementation) ListDeployment(params api.ListDeploymentParams) error {
	deploymentImpl := getdeploy.NewListDeploymentImpl(constants.DeploymentV1Config)
	return deploymentImpl.ListDeployment(params)
}

func (c *CommandImplementation) ListEnvironment(params api.ListEnvironmentParams) error {
	envImpl := getenv.NewListEnvironmentImpl(constants.EnvironmentV1Config)
	return envImpl.ListEnvironment(params)
}

func (c *CommandImplementation) ListDataPlane(params api.ListDataPlaneParams) error {
	dpImpl := getdataplane.NewListDataPlaneImpl(constants.DataPlaneV1Config)
	return dpImpl.ListDataPlane(params)
}

func (c *CommandImplementation) ListDeploymentTrack(params api.ListDeploymentTrackParams) error {
	trackImpl := getdeploymenttrack.NewListDeploymentTrackImpl(constants.DeploymentTrackV1Config)
	return trackImpl.ListDeploymentTrack(params)
}

func (c *CommandImplementation) ListEndpoint(params api.ListEndpointParams) error {
	endpointImpl := getendpoint.NewListEndpointImpl(constants.EndpointV1Config)
	return endpointImpl.ListEndpoint(params)
}

// Create Operations

func (c *CommandImplementation) CreateOrganization(params api.CreateOrganizationParams) error {
	orgImpl := organization.NewCreateOrgImpl(constants.OrganizationV1Config)
	return orgImpl.CreateOrganization(params)
}

func (c *CommandImplementation) CreateProject(params api.CreateProjectParams) error {
	projImpl := project.NewCreateProjImpl(constants.ProjectV1Config)
	return projImpl.CreateProject(params)
}

func (c *CommandImplementation) CreateComponent(params api.CreateComponentParams) error {
	compImpl := component.NewCreateCompImpl(constants.ComponentV1Config)
	return compImpl.CreateComponent(params)
}

func (c *CommandImplementation) CreateBuild(params api.CreateBuildParams) error {
	buildImpl := build.NewCreateBuildImpl(constants.ComponentV1Config)
	return buildImpl.CreateBuild(params)
}

func (c *CommandImplementation) CreateDeployment(params api.CreateDeploymentParams) error {
	deployImpl := deployment.NewCreateDeploymentImpl(constants.DeploymentV1Config)
	return deployImpl.CreateDeployment(params)
}

func (c *CommandImplementation) CreateEnvironment(params api.CreateEnvironmentParams) error {
	envImpl := environment.NewCreateEnvironmentImpl(constants.EnvironmentV1Config)
	return envImpl.CreateEnvironment(params)
}

func (c *CommandImplementation) CreateDataPlane(params api.CreateDataPlaneParams) error {
	dpImpl := dataplane.NewCreateDataPlaneImpl(constants.DataPlaneV1Config)
	return dpImpl.CreateDataPlane(params)
}

func (c *CommandImplementation) CreateDeploymentTrack(params api.CreateDeploymentTrackParams) error {
	trackImpl := deploymenttrack.NewCreateDeploymentTrackImpl(constants.DeploymentTrackV1Config)
	return trackImpl.CreateDeploymentTrack(params)
}

func (c *CommandImplementation) CreateDeployableArtifact(params api.CreateDeployableArtifactParams) error {
	daImpl := deployableartifact.NewCreateDeployableArtifactImpl(constants.DeployableArtifactV1Config)
	return daImpl.CreateDeployableArtifact(params)
}

// Authentication Operations

func (c *CommandImplementation) Login(params api.LoginParams) error {
	loginImpl := login.NewAuthImpl()
	return loginImpl.Login(params)
}

func (c *CommandImplementation) IsLoggedIn() bool {
	loginImpl := login.NewAuthImpl()
	return loginImpl.IsLoggedIn()
}

func (c *CommandImplementation) GetLoginPrompt() string {
	loginImpl := login.NewAuthImpl()
	return loginImpl.GetLoginPrompt()
}

func (c *CommandImplementation) Logout() error {
	logoutImpl := logout.NewLogoutImpl()
	return logoutImpl.Logout()
}

// Configuration Operations

func (c *CommandImplementation) Apply(params api.ApplyParams) error {
	applyImpl := apply.NewApplyImpl()
	return applyImpl.Apply(params)
}

// Logs Operations

func (c *CommandImplementation) GetLogs(params api.LogParams) error {
	logsImpl := logs.NewLogsImpl()
	return logsImpl.GetLogs(params)
}

// Config Context Operations

func (c *CommandImplementation) GetContexts() error {
	configContextImpl := config.NewConfigContextImpl()
	return configContextImpl.GetContexts()
}

func (c *CommandImplementation) GetCurrentContext() error {
	configContextImpl := config.NewConfigContextImpl()
	return configContextImpl.GetCurrentContext()
}

func (c *CommandImplementation) SetContext(params api.SetContextParams) error {
	configContextImpl := config.NewConfigContextImpl()
	return configContextImpl.SetContext(params)
}

func (c *CommandImplementation) UseContext(params api.UseContextParams) error {
	configContextImpl := config.NewConfigContextImpl()
	return configContextImpl.UseContext(params)
}
