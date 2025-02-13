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

package deploymenttrack

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

type ListDeploymentTrackImpl struct {
	config constants.CRDConfig
}

func NewListDeploymentTrackImpl(config constants.CRDConfig) *ListDeploymentTrackImpl {
	return &ListDeploymentTrackImpl{
		config: config,
	}
}

func (i *ListDeploymentTrackImpl) ListDeploymentTrack(params api.ListDeploymentTrackParams) error {
	if params.Organization == "" || params.Project == "" || params.Component == "" {
		return listDeploymentTrackInteractive(i.config)
	}
	return listDeploymentTracks(params, i.config)
}

func listDeploymentTracks(params api.ListDeploymentTrackParams, config constants.CRDConfig) error {
	var tracks []corev1.DeploymentTrack

	if params.Name != "" {
		track, err := util.GetDeploymentTrack(params.Organization, params.Project, params.Component, params.Name)
		if err != nil {
			return err
		}
		tracks = []corev1.DeploymentTrack{*track}
	} else {
		trackList, err := util.GetAllDeploymentTracks(params.Organization, params.Project, params.Component)
		if err != nil {
			return err
		}
		tracks = trackList.Items
	}

	if len(tracks) == 0 {
		return errors.NewError("No deployment tracks found")
	}

	if params.OutputFormat == constants.OutputFormatYAML {
		return printDeploymentTrackYAML(tracks, params.Organization, config)
	}
	return printDeploymentTrackTable(tracks, params.Organization)
}

func printDeploymentTrackTable(tracks []corev1.DeploymentTrack, orgName string) error {
	w := tabwriter.NewWriter(os.Stdout, 0, 0, 3, ' ', 0)
	fmt.Fprintln(w, "NAME\tAPI VERSION\tAUTO DEPLOY\tAGE\tORGANIZATION")

	for _, track := range tracks {
		age := util.FormatAge(track.CreationTimestamp.Time)

		fmt.Fprintf(w, "%s\t%s\t%v\t%s\n",
			track.Name,
			track.APIVersion,
			age,
			orgName)
	}

	return w.Flush()
}

func printDeploymentTrackYAML(tracks []corev1.DeploymentTrack, orgName string, config constants.CRDConfig) error {
	for _, track := range tracks {
		yamlStr, err := util.GetK8sObjectYAMLFromCRD(
			config.Group,
			string(config.Version),
			config.Kind,
			track.Name,
			orgName,
		)
		if err != nil {
			return err
		}
		fmt.Printf("---\n%s\n", yamlStr)
	}
	return nil
}
