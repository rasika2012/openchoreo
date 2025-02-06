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

package flags

import (
	"github.com/spf13/cobra"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/messages"
)

type Flag struct {
	Name       string
	Shorthand  string
	Usage      string
	Deprecated bool
	Alias      string
}

var (
	Kubeconfig = Flag{
		Name:  "kubeconfig",
		Usage: messages.KubeconfigFlagDesc,
	}

	Kubecontext = Flag{
		Name:  "kubecontext",
		Usage: messages.KubecontextFlagDesc,
	}

	Organization = Flag{
		Name:       "organization",
		Usage:      messages.FlagOrgDesc,
		Deprecated: false,
		Alias:      "org",
	}

	Project = Flag{
		Name:  "project",
		Usage: messages.FlagProjDesc,
	}

	Component = Flag{
		Name:  "component",
		Usage: messages.FlagCompDesc,
	}
	Build = Flag{
		Name:  "build",
		Usage: messages.FlagBuildDesc,
	}

	Name = Flag{
		Name:  "name",
		Usage: messages.FlagNameDesc,
	}

	GitRepositoryURL = Flag{
		Name:  "gitRepositoryURL",
		Usage: messages.FlagURLDesc,
	}

	SecretRef = Flag{
		Name:  "secretRef",
		Usage: messages.FlagSecretRefDesc,
	}

	ComponentType = Flag{
		Name:  "type",
		Usage: messages.FlagTypeDesc,
	}

	Output = Flag{
		Name:      "output",
		Shorthand: "o", // Keep shorthand for output as it's a common convention
		Usage:     messages.FlagOutputDesc,
	}

	DisplayName = Flag{
		Name:  "display-name",
		Usage: messages.FlagDisplayDesc,
	}

	Description = Flag{
		Name:  "description",
		Usage: messages.FlagDescriptionDesc,
	}

	ApplyFileFlag = Flag{
		Name:      "file",
		Shorthand: "f",
		Usage:     messages.ApplyFileFlag,
	}

	LogType = Flag{
		Name:  "log-type",
		Usage: messages.FlagLogTypeDesc,
	}

	Tail = Flag{
		Name:  "tail",
		Usage: messages.FlagTailDesc,
	}
	Follow = Flag{
		Name:  "follow",
		Usage: messages.FlagFollowDesc,
	}
	BuildTypeName = Flag{
		Name:  "type",
		Usage: messages.FlagBuildTypeDesc,
	}

	DockerContext = Flag{
		Name:  "docker-context",
		Usage: messages.FlagDockerContext,
	}
	DockerfilePath = Flag{
		Name:  "dockerfile-path",
		Usage: messages.FlagDockerfilePath,
	}
	BuildpackName = Flag{
		Name:  "buildpack-name",
		Usage: messages.FlagBuildpackName,
	}
	BuildpackVersion = Flag{
		Name:  "buildpack-version",
		Usage: messages.FlagBuildpackVersion,
	}
)

// AddFlags adds the specified flags to the given command.
func AddFlags(cmd *cobra.Command, flags ...Flag) {
	for _, flag := range flags {
		cmd.Flags().StringP(flag.Name, flag.Shorthand, "", flag.Usage)
		if flag.Deprecated {
			cmd.Flags().String(flag.Alias, "", flag.Usage+" (deprecated)")
		}
	}
}
