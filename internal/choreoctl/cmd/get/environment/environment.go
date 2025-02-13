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

package environment

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

type ListEnvironmentImpl struct {
	config constants.CRDConfig
}

func NewListEnvironmentImpl(config constants.CRDConfig) *ListEnvironmentImpl {
	return &ListEnvironmentImpl{
		config: config,
	}
}

func (i *ListEnvironmentImpl) ListEnvironment(params api.ListEnvironmentParams) error {
	if params.Interactive {
		return listEnvironmentInteractive(i.config)
	}

	if params.Organization == "" {
		return errors.NewError("organization is required")
	}

	return listEnvironments(params, i.config)
}

func listEnvironments(params api.ListEnvironmentParams, config constants.CRDConfig) error {
	var environments []corev1.Environment

	if params.Name != "" {
		env, err := util.GetEnvironment(params.Organization, params.Name)
		if err != nil {
			return err
		}
		environments = []corev1.Environment{*env}
	} else {
		envList, err := util.GetAllEnvironments(params.Organization)
		if err != nil {
			return err
		}
		environments = envList.Items
	}

	if len(environments) == 0 {
		fmt.Printf("No environments found for organization: %s\n", params.Organization)
		return nil
	}

	if params.OutputFormat == constants.OutputFormatYAML {
		return printEnvironmentYAML(environments, params.Organization, config)
	}
	return printEnvironmentTable(environments, params.Organization)
}

func printEnvironmentYAML(environments []corev1.Environment, orgName string, config constants.CRDConfig) error {
	for _, env := range environments {
		yamlStr, err := util.GetK8sObjectYAMLFromCRD(
			config.Group,
			string(config.Version),
			config.Kind,
			env.Name,
			orgName,
		)
		if err != nil {
			return err
		}
		fmt.Printf("---\n%s\n", yamlStr)
	}
	return nil
}

func printEnvironmentTable(environments []corev1.Environment, orgName string) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tDATA PLANE\tPRODUCTION\tDNS PREFIX\tAGE\tORGANIZATION")

	for _, env := range environments {
		age := util.FormatAge(env.CreationTimestamp.Time)

		fmt.Fprintf(w, "%s\t%s\t%t\t%v\t%s\t%s\n",
			env.Name, env.Spec.DataPlaneRef, env.Spec.IsProduction, env.Spec.DNSPrefix,
			age, orgName)
	}

	return w.Flush()
}
