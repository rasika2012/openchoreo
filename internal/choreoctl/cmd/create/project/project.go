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
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type CreateProjImpl struct {
	config constants.CRDConfig
}

func NewCreateProjImpl(config constants.CRDConfig) *CreateProjImpl {
	return &CreateProjImpl{
		config: config,
	}
}

func (i *CreateProjImpl) CreateProject(params api.CreateProjectParams) error {
	if params.Organization == "" || params.Name == "" {
		return createProjectInteractive()
	}

	if err := util.ValidateProject(params.Name); err != nil {
		return err
	}

	return createProject(params)
}

func createProject(params api.CreateProjectParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	project := &corev1.Project{
		ObjectMeta: metav1.ObjectMeta{
			Name:      params.Name,
			Namespace: params.Organization,
			Annotations: map[string]string{
				constants.AnnotationDisplayName: params.DisplayName,
				constants.AnnotationDescription: params.Description,
			},
			Labels: map[string]string{
				constants.LabelName:         params.Name,
				constants.LabelOrganization: params.Organization,
			},
		},
		Spec: corev1.ProjectSpec{
			DeploymentPipelineRef: "default-deployment-pipeline",
		},
	}

	ctx := context.Background()
	if err := k8sClient.Create(ctx, project); err != nil {
		return errors.NewError("Failed to create project '%s' in organization '%s': %v", params.Name, params.Organization, err)
	}

	fmt.Printf("Project '%s' created in organization '%s'\n", params.Name, params.Organization)
	return nil
}
