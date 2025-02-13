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
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type CreateDeploymentTrackImpl struct {
	config constants.CRDConfig
}

func NewCreateDeploymentTrackImpl(config constants.CRDConfig) *CreateDeploymentTrackImpl {
	return &CreateDeploymentTrackImpl{
		config: config,
	}
}

func (i *CreateDeploymentTrackImpl) CreateDeploymentTrack(params api.CreateDeploymentTrackParams) error {
	if params.Organization == "" || params.Project == "" || params.Component == "" {
		return createDeploymentTrackInteractive()
	}
	return createDeploymentTrack(params)
}

func createDeploymentTrack(params api.CreateDeploymentTrackParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	deploymentTrack := &corev1.DeploymentTrack{
		ObjectMeta: metav1.ObjectMeta{
			Name:      params.Name,
			Namespace: params.Organization,
			Annotations: map[string]string{
				"core.choreo.dev/display-name": params.DisplayName,
				"core.choreo.dev/description":  params.Description,
			},
			Labels: map[string]string{
				"core.choreo.dev/organization": params.Organization,
				"core.choreo.dev/project":      params.Project,
				"core.choreo.dev/component":    params.Component,
				"core.choreo.dev/name":         params.Name,
			},
		},
		Spec: corev1.DeploymentTrackSpec{
			BuildTemplateSpec: params.BuildTemplateSpec,
		},
	}

	if err := k8sClient.Create(context.Background(), deploymentTrack); err != nil {
		return errors.NewError("failed to create deployment track: %v", err)
	}

	fmt.Printf("Deployment track '%s' created successfully in project '%s' of organization '%s'\n",
		params.Name, params.Project, params.Organization)

	return nil
}
