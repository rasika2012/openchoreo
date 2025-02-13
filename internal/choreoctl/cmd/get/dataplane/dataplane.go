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

package dataplane

import (
	"fmt"
	"os"
	"text/tabwriter"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type ListDataPlaneImpl struct {
	config constants.CRDConfig
}

func NewListDataPlaneImpl(config constants.CRDConfig) *ListDataPlaneImpl {
	return &ListDataPlaneImpl{
		config: config,
	}
}

func (i *ListDataPlaneImpl) ListDataPlane(params api.ListDataPlaneParams) error {
	if params.Interactive {
		return listDataPlaneInteractive(i.config)
	}

	if err := util.ValidateParams(util.CmdGet, util.ResourceDataPlane, params); err != nil {
		return err
	}

	return listDataPlanes(params, i.config)
}

func listDataPlanes(params api.ListDataPlaneParams, config constants.CRDConfig) error {
	var dataPlanes []corev1.DataPlane

	if params.Name != "" {
		dp, err := util.GetDataPlane(params.Organization, params.Name)
		if err != nil {
			return err
		}
		dataPlanes = []corev1.DataPlane{*dp}
	} else {
		dpList, err := util.GetDataPlanes(params.Organization)
		if err != nil {
			return err
		}
		dataPlanes = dpList.Items
	}

	if len(dataPlanes) == 0 {
		fmt.Printf("No data planes found for organization: %s\n", params.Organization)
		return nil
	}

	if params.OutputFormat == constants.OutputFormatYAML {
		return printDataPlaneYAML(dataPlanes, params.Organization, config)
	}
	return printDataPlaneTable(dataPlanes, params.Organization)
}

func printDataPlaneTable(dataPlanes []corev1.DataPlane, orgName string) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tCLUSTER\tORGANIZATION\tAGE")

	for _, dp := range dataPlanes {
		age := util.FormatAge(dp.CreationTimestamp.Time)
		fmt.Fprintf(w, "%s\t%s\t%s\t%s\n",
			dp.Name, dp.Spec.KubernetesCluster.Name, orgName, age)
	}

	return w.Flush()
}

func printDataPlaneYAML(dataPlanes []corev1.DataPlane, orgName string, config constants.CRDConfig) error {
	for i, dp := range dataPlanes {
		yamlStr, err := util.GetK8sObjectYAMLFromCRD(
			config.Group,
			string(config.Version),
			config.Kind,
			dp.Name,
			orgName,
		)
		if err != nil {
			return err
		}
		if i > 0 {
			fmt.Println("---")
		}
		fmt.Println(yamlStr)
	}
	return nil
}
