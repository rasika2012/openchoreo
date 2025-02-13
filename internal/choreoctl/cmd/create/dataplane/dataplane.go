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
	"context"
	"fmt"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	corev1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type CreateDataPlaneImpl struct {
	config constants.CRDConfig
}

func NewCreateDataPlaneImpl(config constants.CRDConfig) *CreateDataPlaneImpl {
	return &CreateDataPlaneImpl{
		config: config,
	}
}

func (i *CreateDataPlaneImpl) CreateDataPlane(params api.CreateDataPlaneParams) error {
	if params.Interactive {
		return createDataPlaneInteractive()
	}

	if err := util.ValidateParams(util.CmdCreate, util.ResourceDataPlane, params); err != nil {
		return err
	}

	return createDataPlane(params)
}

func createDataPlane(params api.CreateDataPlaneParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	ctx := context.Background()

	dp := &corev1.DataPlane{
		ObjectMeta: metav1.ObjectMeta{
			Name:      params.Name,
			Namespace: params.Organization,
			Annotations: map[string]string{
				"core.choreo.dev/display-name": params.DisplayName,
				"core.choreo.dev/description":  params.Description,
			},
			Labels: map[string]string{
				"core.choreo.dev/organization": params.Organization,
				"core.choreo.dev/name":         params.Name,
			},
		},
		Spec: corev1.DataPlaneSpec{
			KubernetesCluster: corev1.KubernetesClusterSpec{
				Name:                params.KubernetesClusterName,
				ConnectionConfigRef: params.ConnectionConfigRef,
				FeatureFlags: corev1.FeatureFlagsSpec{
					Cilium:      params.EnableCilium,
					ScaleToZero: params.EnableScaleToZero,
					GatewayType: params.GatewayType,
				},
			},
			Gateway: corev1.GatewaySpec{
				PublicVirtualHost:       params.PublicVirtualHost,
				OrganizationVirtualHost: params.OrganizationVirtualHost,
			},
		},
	}

	if err := k8sClient.Create(ctx, dp); err != nil {
		return errors.NewError("failed to create data plane: %v", err)
	}

	fmt.Printf("Data plane '%s' created successfully in organization '%s'\n", params.Name, params.Organization)

	return nil
}
