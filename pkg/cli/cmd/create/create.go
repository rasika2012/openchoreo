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

package create

import (
	"github.com/spf13/cobra"

	v1api "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/builder"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/flags"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

func NewCreateCmd(impl api.CommandImplementationInterface) *cobra.Command {
	createCmd := (&builder.CommandBuilder{
		Command: constants.Create,
	}).Build()

	createCmd.AddCommand(
		newCreateOrganizationCmd(impl),
		newCreateProjectCmd(impl),
		newCreateComponentCmd(impl),
		newCreateBuildCmd(impl),
		newCreateDeploymentCmd(impl),
		newCreateDataPlaneCmd(impl),
		newCreateDeploymentTrackCmd(impl),
		newCreateEnvironmentCmd(impl),
		newCreateDeployableArtifactCmd(impl),
	)

	return createCmd
}

func newCreateOrganizationCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateOrganization,
		Flags:   []flags.Flag{flags.Name, flags.DisplayName, flags.Description},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateOrganization(api.CreateOrganizationParams{
				Name:        fg.GetString(flags.Name),
				DisplayName: fg.GetString(flags.DisplayName),
				Description: fg.GetString(flags.Description),
			})
		},
	}).Build()
}

func newCreateProjectCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateProject,
		Flags:   []flags.Flag{flags.Organization, flags.Name, flags.DisplayName, flags.Description},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateProject(api.CreateProjectParams{
				Organization: fg.GetString(flags.Organization),
				Name:         fg.GetString(flags.Name),
				DisplayName:  fg.GetString(flags.DisplayName),
				Description:  fg.GetString(flags.Description),
			})
		},
	}).Build()
}

func newCreateComponentCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateComponent,
		Flags: []flags.Flag{
			flags.Organization,
			flags.Project,
			flags.Name,
			flags.GitRepositoryURL,
			flags.ComponentType,
			flags.DisplayName,
		},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateComponent(api.CreateComponentParams{
				Organization:     fg.GetString(flags.Organization),
				Project:          fg.GetString(flags.Project),
				Name:             fg.GetString(flags.Name),
				DisplayName:      fg.GetString(flags.DisplayName),
				GitRepositoryURL: fg.GetString(flags.GitRepositoryURL),
				Type:             v1api.ComponentType(fg.GetString(flags.ComponentType)),
			})
		},
	}).Build()
}

func newCreateBuildCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateBuild,
		Flags: []flags.Flag{
			flags.Organization,
			flags.Project,
			flags.Component,
			flags.Name,
			flags.DockerContext,
			flags.DockerfilePath,
			flags.BuildpackName,
			flags.BuildpackVersion,
		},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateBuild(api.CreateBuildParams{
				Name:         fg.GetString(flags.Name),
				Organization: fg.GetString(flags.Organization),
				Project:      fg.GetString(flags.Project),
				Component:    fg.GetString(flags.Component),
				Docker: &v1api.DockerConfiguration{
					Context:        fg.GetString(flags.DockerContext),
					DockerfilePath: fg.GetString(flags.DockerfilePath),
				},
				Buildpack: &v1api.BuildpackConfiguration{
					Name:    v1api.BuildpackName(fg.GetString(flags.BuildpackName)),
					Version: fg.GetString(flags.BuildpackVersion),
				},
			})
		},
	}).Build()
}

func newCreateDeploymentCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateDeployment,
		Flags: []flags.Flag{
			flags.Organization,
			flags.Project,
			flags.Component,
			flags.Name,
			flags.Environment,
			flags.DeployableArtifact,
			flags.DeploymentTrack,
		},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateDeployment(api.CreateDeploymentParams{
				Name:               fg.GetString(flags.Name),
				Organization:       fg.GetString(flags.Organization),
				Project:            fg.GetString(flags.Project),
				Component:          fg.GetString(flags.Component),
				Environment:        fg.GetString(flags.Environment),
				DeployableArtifact: fg.GetString(flags.DeployableArtifact),
				DeploymentTrack:    fg.GetString(flags.DeploymentTrack),
			})
		},
	}).Build()
}

func newCreateDataPlaneCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateDataPlane,
		Flags: []flags.Flag{
			flags.Organization,
			flags.Name,
			flags.KubernetesClusterName,
			flags.ConnectionConfigRef,
			flags.EnableCilium,
			flags.EnableScaleToZero,
			flags.GatewayType,
			flags.PublicVirtualHost,
			flags.OrgVirtualHost,
		},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateDataPlane(api.CreateDataPlaneParams{
				Name:                    fg.GetString(flags.Name),
				Organization:            fg.GetString(flags.Organization),
				KubernetesClusterName:   fg.GetString(flags.KubernetesClusterName),
				ConnectionConfigRef:     fg.GetString(flags.ConnectionConfigRef),
				EnableCilium:            fg.GetBool(flags.EnableCilium),
				EnableScaleToZero:       fg.GetBool(flags.EnableScaleToZero),
				GatewayType:             fg.GetString(flags.GatewayType),
				PublicVirtualHost:       fg.GetString(flags.PublicVirtualHost),
				OrganizationVirtualHost: fg.GetString(flags.OrgVirtualHost),
			})
		},
	}).Build()
}

func newCreateDeploymentTrackCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateDeploymentTrack,
		Flags: []flags.Flag{
			flags.Organization,
			flags.Project,
			flags.Component,
			flags.Name,
			flags.APIVersion,
			flags.AutoDeploy,
		},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateDeploymentTrack(api.CreateDeploymentTrackParams{
				Name:         fg.GetString(flags.Name),
				Organization: fg.GetString(flags.Organization),
				Project:      fg.GetString(flags.Project),
				Component:    fg.GetString(flags.Component),
				APIVersion:   fg.GetString(flags.APIVersion),
				AutoDeploy:   fg.GetBool(flags.AutoDeploy),
			})
		},
	}).Build()
}

func newCreateEnvironmentCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateEnvironment,
		Flags: []flags.Flag{
			flags.Organization,
			flags.Name,
			flags.DisplayName,
			flags.Description,
			flags.DataPlaneRef,
			flags.IsProduction,
			flags.DNSPrefix,
		},
		RunE: func(fg *builder.FlagGetter) error {
			return impl.CreateEnvironment(api.CreateEnvironmentParams{
				Name:         fg.GetString(flags.Name),
				Organization: fg.GetString(flags.Organization),
				DisplayName:  fg.GetString(flags.DisplayName),
				Description:  fg.GetString(flags.Description),
				DataPlaneRef: fg.GetString(flags.DataPlaneRef),
				IsProduction: fg.GetBool(flags.IsProduction),
				DNSPrefix:    fg.GetString(flags.DNSPrefix),
			})
		},
	}).Build()
}

func newCreateDeployableArtifactCmd(impl api.CommandImplementationInterface) *cobra.Command {
	return (&builder.CommandBuilder{
		Command: constants.CreateDeployableArtifact,
		Flags: []flags.Flag{
			flags.Organization,
			flags.Project,
			flags.Component,
			flags.Name,
			flags.DeploymentTrack,
			flags.BuildRef,
		},
		RunE: func(fg *builder.FlagGetter) error {
			var fromBuildRef *v1api.FromBuildRef
			if buildRef := fg.GetString(flags.BuildRef); buildRef != "" {
				fromBuildRef = &v1api.FromBuildRef{Name: buildRef}
			}
			return impl.CreateDeployableArtifact(api.CreateDeployableArtifactParams{
				Name:            fg.GetString(flags.Name),
				Organization:    fg.GetString(flags.Organization),
				Project:         fg.GetString(flags.Project),
				Component:       fg.GetString(flags.Component),
				DeploymentTrack: fg.GetString(flags.DeploymentTrack),
				FromBuildRef:    fromBuildRef,
			})
		},
	}).Build()
}
