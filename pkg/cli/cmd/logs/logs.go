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

package logs

import (
	"github.com/spf13/cobra"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/flags"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

func NewLogsCmd(impl api.CommandImplementationInterface) *cobra.Command {
	logsCmd := &cobra.Command{
		Use:   constants.Logs.Use,
		Short: constants.Logs.Short,
		RunE: func(cmd *cobra.Command, args []string) error {
			logType, _ := cmd.Flags().GetString(flags.LogType.Name)
			organization, _ := cmd.Flags().GetString(flags.Organization.Name)
			project, _ := cmd.Flags().GetString(flags.Project.Name)
			component, _ := cmd.Flags().GetString(flags.Component.Name)
			build, _ := cmd.Flags().GetString(flags.Build.Name)
			follow, _ := cmd.Flags().GetBool(flags.Follow.Name)
			tail, _ := cmd.Flags().GetInt64(flags.Tail.Name)

			return impl.GetLogs(api.LogParams{
				Type:         logType,
				Organization: organization,
				Project:      project,
				Component:    component,
				Build:        build,
				Follow:       follow,
				TailLines:    tail,
			})
		},
	}
	flags.AddFlags(logsCmd, flags.Organization, flags.Project, flags.Component, flags.Build,
		flags.LogType, flags.Follow, flags.Tail)
	return logsCmd
}
