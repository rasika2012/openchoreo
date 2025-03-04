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

package organization

import (
	"fmt"
	"os"
	"text/tabwriter"

	corev1 "github.com/choreo-idp/choreo/api/v1"
	"github.com/choreo-idp/choreo/internal/choreoctl/errors"
	"github.com/choreo-idp/choreo/internal/choreoctl/util"
	"github.com/choreo-idp/choreo/pkg/cli/common/constants"
	"github.com/choreo-idp/choreo/pkg/cli/types/api"
)

type ListOrgImpl struct {
	config constants.CRDConfig
}

func NewListOrgImpl(config constants.CRDConfig) *ListOrgImpl {
	return &ListOrgImpl{
		config: config,
	}
}

func (i *ListOrgImpl) ListOrganization(params api.ListParams) error {
	var organizations []corev1.Organization

	if params.Name != "" {
		// If name is specified, get only that specific organization
		org, err := util.GetOrganization(params.Name)
		if err != nil {
			return errors.NewError("organization %q not found", params.Name)
		}
		organizations = []corev1.Organization{*org}
	} else {
		// Otherwise get all organizations
		orgList, err := util.GetOrganizations()
		if err != nil {
			return err
		}
		organizations = orgList.Items
	}

	if len(organizations) == 0 {
		return errors.NewError("no organizations found")
	}

	if params.OutputFormat == constants.OutputFormatYAML {
		return printOrganizationYAML(organizations, i.config)
	}
	return printOrganizationTable(organizations)
}

func printOrganizationYAML(orgs []corev1.Organization, config constants.CRDConfig) error {
	for _, org := range orgs {
		yamlOutput, err := util.GetK8sObjectYAMLFromCRD(config.Group, string(config.Version),
			config.Kind, org.Name, "")
		if err != nil {
			return err
		}
		fmt.Printf("---\n%s\n", yamlOutput)
	}
	return nil
}

func printOrganizationTable(organizations []corev1.Organization) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tSTATUS\tAGE")

	for _, org := range organizations {
		age := util.FormatAge(org.CreationTimestamp.Time)
		status := util.GetStatus(org.Status.Conditions, "Ready")
		fmt.Fprintf(w, "%s\t%s\t%s\n",
			org.Name,
			status,
			age)
	}

	return w.Flush()
}
