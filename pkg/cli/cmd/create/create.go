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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/flags"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

// NewCreateCmd returns "create" + its resource subcommands ("project", "component").
func NewCreateCmd(impl api.CommandImplementationInterface) *cobra.Command {
	createCmd := &cobra.Command{
		Use:   constants.Create.Use,
		Short: constants.Create.Short,
	}

	// Subcommand: create organization
	orgCmd := &cobra.Command{
		Use:     constants.CreateOrganization.Use,
		Aliases: constants.CreateOrganization.Aliases,
		Short:   constants.CreateOrganization.Short,
		RunE: func(cmd *cobra.Command, args []string) error {
			name, _ := cmd.Flags().GetString(flags.Name.Name)
			displayName, _ := cmd.Flags().GetString(flags.DisplayName.Name)
			description, _ := cmd.Flags().GetString(flags.Description.Name)

			return impl.CreateOrganization(api.CreateOrganizationParams{
				Name:        name,
				DisplayName: displayName,
				Description: description,
			})
		},
	}
	flags.AddFlags(orgCmd, flags.Name, flags.DisplayName, flags.Description)
	createCmd.AddCommand(orgCmd)

	// Subcommand: create project
	projectCmd := &cobra.Command{
		Use:     constants.CreateProject.Use,
		Aliases: constants.CreateProject.Aliases,
		Short:   constants.CreateProject.Short,
		RunE: func(cmd *cobra.Command, args []string) error {
			org, _ := cmd.Flags().GetString(flags.Organization.Name)
			name, _ := cmd.Flags().GetString(flags.Name.Name)
			displayName, _ := cmd.Flags().GetString(flags.DisplayName.Name)
			description, _ := cmd.Flags().GetString(flags.Description.Name)

			return impl.CreateProject(api.CreateProjectParams{
				Organization: org,
				Name:         name,
				DisplayName:  displayName,
				Description:  description,
			})
		},
	}
	flags.AddFlags(projectCmd, flags.Organization, flags.Name, flags.DisplayName, flags.Description)
	createCmd.AddCommand(projectCmd)

	// Subcommand: create component
	componentCmd := &cobra.Command{
		Use:     constants.CreateComponent.Use,
		Aliases: constants.CreateComponent.Aliases,
		Short:   constants.CreateComponent.Short,
		RunE: func(cmd *cobra.Command, args []string) error {
			org, _ := cmd.Flags().GetString(flags.Organization.Name)
			project, _ := cmd.Flags().GetString(flags.Project.Name)
			name, _ := cmd.Flags().GetString(flags.Name.Name)
			displayName, _ := cmd.Flags().GetString(flags.DisplayName.Name)
			componentType, _ := cmd.Flags().GetString(flags.ComponentType.Name)
			url, _ := cmd.Flags().GetString(flags.GitRepositoryURL.Name)

			return impl.CreateComponent(api.CreateComponentParams{
				Organization:     org,
				Project:          project,
				Name:             name,
				DisplayName:      displayName,
				GitRepositoryURL: url,
				Type:             v1api.ComponentType(componentType),
			})
		},
	}
	flags.AddFlags(componentCmd, flags.Organization, flags.Project, flags.Name, flags.GitRepositoryURL,
		flags.ComponentType, flags.DisplayName)
	createCmd.AddCommand(componentCmd)

	return createCmd
}
