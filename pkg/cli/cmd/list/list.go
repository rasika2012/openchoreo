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

package list

import (
	"github.com/spf13/cobra"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/flags"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

func NewListCmd(impl api.CommandImplementationInterface) *cobra.Command {
	listCmd := &cobra.Command{
		Use:   constants.List.Use,
		Short: constants.List.Short,
	}

	// Subcommand: list organization
	orgCmd := &cobra.Command{
		Use:     constants.ListOrganization.Use,
		Aliases: constants.ListOrganization.Aliases,
		Short:   constants.ListOrganization.Short,
		// ValidArgsFunction: impl.ValidateListOrgArgs,

		RunE: func(cmd *cobra.Command, args []string) error {
			outputFormat, _ := cmd.Flags().GetString(flags.Output.Name)

			// Get organization name from args if provided
			var orgName string
			if len(args) > 0 {
				orgName = args[0]
			}

			return impl.ListOrganization(api.ListParams{
				OutputFormat: outputFormat,
				Name:         orgName,
			})
		},
	}
	flags.AddFlags(orgCmd, flags.Output)
	listCmd.AddCommand(orgCmd)

	// Subcommand: list project
	projectCmd := &cobra.Command{
		Use:     constants.ListProject.Use,
		Aliases: constants.ListProject.Aliases,
		Short:   constants.ListProject.Short,
		// ValidArgsFunction: impl.ValidateListProjectArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			org, _ := cmd.Flags().GetString(flags.Organization.Name)
			outputFormat, _ := cmd.Flags().GetString(flags.Output.Name)
			// Get project name from args if provided
			var projectName string
			if len(args) > 0 {
				projectName = args[0]
			}
			return impl.ListProject(api.ListProjectParams{
				Organization: org,
				OutputFormat: outputFormat,
				Name:         projectName,
			})
		},
	}
	flags.AddFlags(projectCmd, flags.Organization, flags.Output)
	listCmd.AddCommand(projectCmd)

	// Subcommand: list component
	componentCmd := &cobra.Command{
		Use:     constants.ListComponent.Use,
		Aliases: constants.ListComponent.Aliases,
		Short:   constants.ListComponent.Short,
		// ValidArgsFunction: impl.ValidateListComponentArgs,
		RunE: func(cmd *cobra.Command, args []string) error {
			org, _ := cmd.Flags().GetString(flags.Organization.Name)
			project, _ := cmd.Flags().GetString(flags.Project.Name)
			outputFormat, _ := cmd.Flags().GetString(flags.Output.Name)
			// Get project name from args if provided
			var componentName string
			if len(args) > 0 {
				componentName = args[0]
			}
			return impl.ListComponent(api.ListComponentParams{
				Organization: org,
				Project:      project,
				OutputFormat: outputFormat,
				Name:         componentName,
			})
		},
	}
	flags.AddFlags(componentCmd, flags.Organization, flags.Project, flags.Output)
	listCmd.AddCommand(componentCmd)

	return listCmd
}
