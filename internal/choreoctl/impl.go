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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/build"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/component"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/organization"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/create/project"
	listbuild "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/list/build"
	listcomp "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/list/component"
	listorg "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/list/organization"
	listproj "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/cmd/list/project"
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
	orgImpl := listorg.NewListOrgImpl(constants.OrganizationV1Config)
	return orgImpl.ListOrganization(params)
}

func (c *CommandImplementation) ListProject(params api.ListProjectParams) error {
	projImpl := listproj.NewListProjImpl(constants.ProjectV1Config)
	return projImpl.ListProject(params)
}

func (c *CommandImplementation) ListComponent(params api.ListComponentParams) error {
	compImpl := listcomp.NewListCompImpl(constants.ComponentV1Config)
	return compImpl.ListComponent(params)
}

func (c *CommandImplementation) ListBuild(params api.ListBuildParams) error {
	buildImpl := listbuild.NewListBuildImpl(constants.BuildV1Config)
	return buildImpl.ListBuild(params)
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
