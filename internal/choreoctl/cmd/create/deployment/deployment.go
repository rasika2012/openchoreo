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
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type CreateDeploymentImpl struct {
	config constants.CRDConfig
}

func NewCreateDeploymentImpl(config constants.CRDConfig) *CreateDeploymentImpl {
	return &CreateDeploymentImpl{
		config: config,
	}
}

func (i *CreateDeploymentImpl) CreateDeployment(params api.CreateDeploymentParams) error {
	if params.Interactive {
		return createDeploymentInteractive()
	}

	if err := util.ValidateParams(util.CmdCreate, util.ResourceDeployment, params); err != nil {
		return err
	}

	return createDeployment(params)
}

func createDeployment(params api.CreateDeploymentParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	deployment := &corev1.Deployment{
		ObjectMeta: metav1.ObjectMeta{
			Name:      params.Name,
			Namespace: params.Organization,
			Labels: map[string]string{
				constants.LabelOrganization:    params.Organization,
				constants.LabelProject:         params.Project,
				constants.LabelComponent:       params.Component,
				constants.LabelEnvironment:     params.Environment,
				constants.LabelDeploymentTrack: params.DeploymentTrack,
				constants.LabelName:            params.Name,
			},
		},
		Spec: corev1.DeploymentSpec{
			DeploymentArtifactRef: params.DeployableArtifact,
		},
	}

	if params.ConfigOverrides != nil {
		deployment.Spec.ConfigurationOverrides = params.ConfigOverrides
	}

	ctx := context.Background()

	if err := k8sClient.Create(ctx, deployment); err != nil {
		return errors.NewError("failed to create deployment: %v", err)
	}

	fmt.Printf("Deployment '%s' created successfully in component '%s' of project '%s' in organization '%s'\n",
		params.Name, params.Component, params.Project, params.Organization)

	return nil
}
