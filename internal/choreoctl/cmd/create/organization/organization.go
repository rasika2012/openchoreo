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
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	corev1 "github.com/choreo-idp/choreo/api/v1"
	"github.com/choreo-idp/choreo/internal/choreoctl/errors"
	"github.com/choreo-idp/choreo/internal/choreoctl/util"
	"github.com/choreo-idp/choreo/pkg/cli/common/constants"
	"github.com/choreo-idp/choreo/pkg/cli/types/api"
)

type CreateOrgImpl struct {
	config constants.CRDConfig
}

func NewCreateOrgImpl(config constants.CRDConfig) *CreateOrgImpl {
	return &CreateOrgImpl{
		config: config,
	}
}

func (i *CreateOrgImpl) CreateOrganization(params api.CreateOrganizationParams) error {
	if params.Interactive {
		return createOrganizationInteractive()
	}

	if err := util.ValidateParams(util.CmdCreate, util.ResourceOrganization, params); err != nil {
		return err
	}

	if err := util.ValidateOrganization(params.Name); err != nil {
		return err
	}

	return createOrganization(params)
}

func createOrganization(params api.CreateOrganizationParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	organization := &corev1.Organization{
		ObjectMeta: metav1.ObjectMeta{
			Name: params.Name,
			Annotations: map[string]string{
				constants.AnnotationDisplayName: params.DisplayName,
				constants.AnnotationDescription: params.Description,
			},
			Labels: map[string]string{
				constants.LabelName: params.Name,
			},
		},
	}

	ctx := context.Background()
	if err := k8sClient.Create(ctx, organization); err != nil {
		return errors.NewError("Failed to create organization: %v", err)
	}

	fmt.Printf("Organization %s created successfully\n", params.Name)
	return nil
}
