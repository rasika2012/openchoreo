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
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type CreateDeployableArtifactImpl struct {
	config constants.CRDConfig
}

func NewCreateDeployableArtifactImpl(config constants.CRDConfig) *CreateDeployableArtifactImpl {
	return &CreateDeployableArtifactImpl{
		config: config,
	}
}

func (i *CreateDeployableArtifactImpl) CreateDeployableArtifact(params api.CreateDeployableArtifactParams) error {
	if params.Interactive {
		return createDeployableArtifactInteractive()
	}

	if err := util.ValidateParams(util.CmdCreate, util.ResourceDeployableArtifact, params); err != nil {
		return err
	}

	return createDeployableArtifact(params)
}

func createDeployableArtifact(params api.CreateDeployableArtifactParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	deployableArtifact := &corev1.DeployableArtifact{
		ObjectMeta: metav1.ObjectMeta{
			Name:      params.Name,
			Namespace: params.Organization,
			Annotations: map[string]string{
				"core.choreo.dev/display-name": params.DisplayName,
				"core.choreo.dev/description":  params.Description,
			},
			Labels: map[string]string{
				"core.choreo.dev/organization":     params.Organization,
				"core.choreo.dev/project":          params.Project,
				"core.choreo.dev/component":        params.Component,
				"core.choreo.dev/deployment-track": params.DeploymentTrack,
				"core.choreo.dev/name":             params.Name,
			},
		},
		Spec: corev1.DeployableArtifactSpec{
			TargetArtifact: corev1.TargetArtifact{
				FromBuildRef: params.FromBuildRef,
				FromImageRef: params.FromImageRef,
			},
			Configuration: params.Configuration,
		},
	}

	ctx := context.Background()
	if err := k8sClient.Create(ctx, deployableArtifact); err != nil {
		return errors.NewError("failed to create deployable artifact: %v", err)
	}

	fmt.Printf("Deployable artifact '%s' created successfully in component '%s' of project '%s' in organization '%s'\n",
		params.Name, params.Component, params.Project, params.Organization)
	return nil
}
