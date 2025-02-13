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

package deployment

import (
	"fmt"
	"os"
	"text/tabwriter"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type ListDeploymentImpl struct {
	config constants.CRDConfig
}

func NewListDeploymentImpl(config constants.CRDConfig) *ListDeploymentImpl {
	return &ListDeploymentImpl{
		config: config,
	}
}

func (i *ListDeploymentImpl) ListDeployment(params api.ListDeploymentParams) error {
	if params.Interactive {
		return listDeploymentInteractive(i.config)
	}

	if err := util.ValidateParams(util.CmdGet, util.ResourceDeployment, params); err != nil {
		return err
	}

	return listDeployments(params, i.config)
}

func listDeployments(params api.ListDeploymentParams, config constants.CRDConfig) error {
	var deployments []corev1.Deployment

	if params.Name != "" {
		// Get specific deployment
		deployment, err := util.GetDeployment(params.Organization, params.Project, params.Component, params.Name)
		if err != nil {
			return err
		}
		deployments = []corev1.Deployment{*deployment}
	} else {
		// List all deployments
		deploymentList, err := util.GetAllDeployments(params.Organization, params.Project, params.Component)
		if err != nil {
			return err
		}
		deployments = deploymentList.Items
	}

	if len(deployments) == 0 {
		fmt.Printf("No deployments found for organization: %s, project: %s, component: %s\n",
			params.Organization, params.Project, params.Component)
		return nil
	}

	if params.OutputFormat == constants.OutputFormatYAML {
		return printDeploymentYAML(deployments, params.Organization, config)
	}
	return printDeploymentTable(deployments, params.Organization, params.Project, params.Component)
}

func printDeploymentYAML(deployments []corev1.Deployment, orgName string, config constants.CRDConfig) error {
	for _, deployment := range deployments {
		yamlStr, err := util.GetK8sObjectYAMLFromCRD(
			config.Group,
			string(config.Version),
			config.Kind,
			deployment.Name,
			orgName,
		)
		if err != nil {
			return err
		}
		fmt.Printf("---\n%s\n", yamlStr)
	}
	return nil
}

func printDeploymentTable(deployments []corev1.Deployment, orgName, projectName, componentName string) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tDEPLOYABLE ARTIFACT\tENVIRONMENT\tREADY\tAGE\tCOMPONENT\tPROJECT\tORGANIZATION")

	for _, deployment := range deployments {
		ready := util.GetStatus(deployment.Status.Conditions, "Ready")
		age := util.FormatAge(deployment.CreationTimestamp.Time)
		environment := deployment.Labels["core.choreo.dev/environment"]

		fmt.Fprintf(w, "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n",
			deployment.Name,
			deployment.Spec.DeploymentArtifactRef,
			environment,
			ready,
			age,
			componentName,
			projectName,
			orgName)
	}

	return w.Flush()
}
