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

package deployableartifact

import (
	"fmt"
	"os"
	"text/tabwriter"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type ListDeployableArtifactImpl struct {
	config constants.CRDConfig
}

func NewListDeployableArtifactImpl(config constants.CRDConfig) *ListDeployableArtifactImpl {
	return &ListDeployableArtifactImpl{
		config: config,
	}
}

func (i *ListDeployableArtifactImpl) ListDeployableArtifact(params api.ListDeployableArtifactParams) error {
	if params.Organization == "" || params.Project == "" || params.Component == "" {
		return listDeployableArtifactInteractive(i.config)
	}
	return listDeployableArtifacts(params, i.config)
}

func listDeployableArtifacts(params api.ListDeployableArtifactParams, config constants.CRDConfig) error {
	var artifacts []corev1.DeployableArtifact

	if params.Name != "" {
		// Get specific deployable artifact
		artifact, err := util.GetDeployableArtifact(params.Organization, params.Project, params.Component, params.Name)
		if err != nil {
			return err
		}
		artifacts = []corev1.DeployableArtifact{*artifact}
	} else {
		// List all deployable artifacts
		artifactList, err := util.GetAllDeployableArtifacts(params.Organization, params.Project, params.Component)
		if err != nil {
			return err
		}
		artifacts = artifactList.Items
	}

	if len(artifacts) == 0 {
		return errors.NewError("No deployable artifacts found for organization: %s, project: %s, component: %s",
			params.Organization, params.Project, params.Component)
	}

	if params.OutputFormat == constants.OutputFormatYAML {
		return printDeployableArtifactYAML(artifacts, params.Organization, config)
	}
	return printDeployableArtifactTable(artifacts, params.Organization, params.Project, params.Component)
}

func printDeployableArtifactYAML(artifacts []corev1.DeployableArtifact, orgName string, config constants.CRDConfig) error {
	for _, artifact := range artifacts {
		yamlStr, err := util.GetK8sObjectYAMLFromCRD(
			config.Group,
			string(config.Version),
			config.Kind,
			artifact.Name,
			orgName,
		)
		if err != nil {
			return err
		}
		fmt.Printf("---\n%s\n", yamlStr)
	}
	return nil
}

func printDeployableArtifactTable(artifacts []corev1.DeployableArtifact, orgName, projectName, componentName string) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tSOURCE\tAGE\tCOMPONENT\tPROJECT\tORGANIZATION")

	for _, artifact := range artifacts {
		source := "unknown"
		if artifact.Spec.TargetArtifact.FromBuildRef != nil {
			source = "build:" + artifact.Spec.TargetArtifact.FromBuildRef.Name
		} else if artifact.Spec.TargetArtifact.FromImageRef != nil {
			source = "image:" + artifact.Spec.TargetArtifact.FromImageRef.Tag
		}

		age := util.FormatAge(artifact.CreationTimestamp.Time)

		fmt.Fprintf(w, "%s\t%s\t%s\t%s\t%s\t%s\n",
			artifact.Name, source, age, componentName, projectName, orgName)
	}

	return w.Flush()
}
