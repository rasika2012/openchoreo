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

package build

import (
	"fmt"
	"os"
	"text/tabwriter"

	"k8s.io/apimachinery/pkg/api/meta"

	corev1 "github.com/choreo-idp/choreo/api/v1"
	"github.com/choreo-idp/choreo/internal/choreoctl/util"
	"github.com/choreo-idp/choreo/pkg/cli/common/constants"
	"github.com/choreo-idp/choreo/pkg/cli/types/api"
)

const (
	// Status Types
	statusTypeCompleted      = "Completed"
	statusTypeBuildSucceeded = "BuildSucceeded"
	statusTypeCloneSucceeded = "CloneSucceeded"
	statusTypePushSucceeded  = "PushSucceeded"
	statusTypeInitialized    = "Initialized"

	// Status Values
	statusValueTrue  = "True"
	statusValueFalse = "False"

	// Status Messages
	statusMsgCompleted    = "Completed"
	statusMsgBuildFailed  = "BuildFailed"
	statusMsgCloneFailed  = "CloneFailed"
	statusMsgPushFailed   = "PushFailed"
	statusMsgFailed       = "Failed"
	statusMsgBuilding     = "Building"
	statusMsgInitializing = "Initializing"
	statusMsgUnknown      = "Unknown"
)

type ListBuildImpl struct {
	config constants.CRDConfig
}

func NewListBuildImpl(config constants.CRDConfig) *ListBuildImpl {
	return &ListBuildImpl{
		config: config,
	}
}

func (i *ListBuildImpl) ListBuild(params api.ListBuildParams) error {
	if params.Interactive {
		return listBuildInteractive(i.config)
	}

	if err := util.ValidateParams(util.CmdGet, util.ResourceBuild, params); err != nil {
		return err
	}

	return listBuilds(params, i.config)
}

func listBuilds(params api.ListBuildParams, config constants.CRDConfig) error {
	var builds []corev1.Build

	if params.Name != "" {
		// Get specific build
		build, err := util.GetBuild(params.Organization, params.Project, params.Component, params.Name)
		if err != nil {
			return err
		}
		builds = []corev1.Build{*build}
	} else {
		// List all builds
		buildList, err := util.GetAllBuilds(params.Organization, params.Project, params.Component)
		if err != nil {
			return err
		}
		builds = buildList.Items
	}

	if len(builds) == 0 {
		fmt.Printf("No builds found for organization: %s, project: %s, component: %s\n",
			params.Organization, params.Project, params.Component)
		return nil
	}

	// Output format handling
	if params.OutputFormat == constants.OutputFormatYAML {
		return printBuildYAML(builds, params.Organization, config)
	}
	return printBuildTable(builds, params.Component, params.Project, params.Organization)
}

func printBuildYAML(builds []corev1.Build, orgName string, config constants.CRDConfig) error {
	for _, build := range builds {
		yamlStr, err := util.GetK8sObjectYAMLFromCRD(
			config.Group,
			string(config.Version),
			config.Kind,
			build.Name,
			orgName,
		)
		if err != nil {
			return err
		}
		fmt.Printf("---\n%s\n", yamlStr)
	}
	return nil
}

func printBuildTable(builds []corev1.Build, componentName, projectName, orgName string) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tTYPE\tSTATUS\tAGE\tPROJECT\tCOMPONENT\tORGANIZATION")

	for _, build := range builds {
		buildType := "docker"
		if build.Spec.BuildConfiguration.Buildpack != nil {
			buildType = "buildpack"
		}

		age := util.FormatAge(build.CreationTimestamp.Time)
		status := getBuildStatus(build)

		fmt.Fprintf(w, "%s\t%s\t%s\t%s\t%s\t%s\t%s\n",
			build.Name,
			buildType,
			status,
			age,
			projectName,
			componentName,
			orgName,
		)
	}

	return w.Flush()
}

func getBuildStatus(build corev1.Build) string {
	for _, condition := range build.Status.Conditions {
		switch {
		case condition.Type == statusTypeCompleted && condition.Status == statusValueTrue:
			return statusMsgCompleted
		case condition.Type == statusTypeCompleted && condition.Status == statusValueFalse:
			if buildFailed := meta.FindStatusCondition(build.Status.Conditions, statusTypeBuildSucceeded); buildFailed != nil && buildFailed.Status == statusValueFalse {
				return statusMsgBuildFailed
			}
			if cloneFailed := meta.FindStatusCondition(build.Status.Conditions, statusTypeCloneSucceeded); cloneFailed != nil && cloneFailed.Status == statusValueFalse {
				return statusMsgCloneFailed
			}
			if pushFailed := meta.FindStatusCondition(build.Status.Conditions, statusTypePushSucceeded); pushFailed != nil && pushFailed.Status == statusValueFalse {
				return statusMsgPushFailed
			}
			return statusMsgFailed
		}
	}

	for _, condition := range build.Status.Conditions {
		switch {
		case condition.Type == statusTypeBuildSucceeded && condition.Status == statusValueTrue:
			return statusMsgBuilding
		case condition.Type == statusTypeCloneSucceeded && condition.Status == statusValueTrue:
			return statusMsgBuilding
		case condition.Type == statusTypeInitialized && condition.Status == statusValueTrue:
			return statusMsgInitializing
		}
	}

	return statusMsgUnknown
}
