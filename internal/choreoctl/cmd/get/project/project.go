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

package project

import (
	"fmt"
	"os"
	"text/tabwriter"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type ListProjImpl struct {
	config constants.CRDConfig
}

func NewListProjImpl(config constants.CRDConfig) *ListProjImpl {
	return &ListProjImpl{
		config: config,
	}
}

func (i *ListProjImpl) ListProject(params api.ListProjectParams) error {
	if params.Organization == "" {
		return listProjectsInteractive(i.config)
	}

	return listProjects(params, i.config)
}

func listProjects(params api.ListProjectParams, config constants.CRDConfig) error {
	var projects []choreov1.Project

	if params.Name != "" {
		project, err := util.GetProject(params.Organization, params.Name)
		if err != nil {
			return err
		}
		projects = []choreov1.Project{*project}
	} else {
		projectList, err := util.GetProjects(params.Organization)
		if err != nil {
			return err
		}
		projects = projectList.Items
	}

	if len(projects) == 0 {
		return errors.NewError("No projects found for organization: %s, project: %s", params.Organization, params.Name)
	}

	if params.OutputFormat == constants.OutputFormatYAML {
		return printProjectYAML(projects, params.Organization, config)
	}
	return printProjectTable(projects, params.Organization)
}

func printProjectYAML(projects []choreov1.Project, orgName string, config constants.CRDConfig) error {
	for _, project := range projects {
		yamlStr, err := util.GetK8sObjectYAMLFromCRD(
			config.Group,
			string(config.Version),
			config.Kind,
			project.Name,
			orgName,
		)
		if err != nil {
			return err
		}
		fmt.Printf("---\n%s\n", yamlStr)
	}
	return nil
}

func printProjectTable(projects []choreov1.Project, orgName string) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tSTATUS\tAGE\tORGANIZATION")

	for _, project := range projects {
		age := util.FormatAge(project.CreationTimestamp.Time)
		status := util.GetStatus(project.Status.Conditions, "Created")
		fmt.Fprintf(w, "%s\t%s\t%s\t%s\n",
			project.Name,
			status,
			age,
			orgName)
	}

	return w.Flush()
}
