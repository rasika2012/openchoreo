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

package build

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

type CreateBuildImpl struct {
	config constants.CRDConfig
}

func NewCreateBuildImpl(config constants.CRDConfig) *CreateBuildImpl {
	return &CreateBuildImpl{
		config: config,
	}
}

func (i *CreateBuildImpl) CreateBuild(params api.CreateBuildParams) error {
	if params.Interactive {
		return createBuildInteractive()
	}

	if err := util.ValidateParams(util.CmdCreate, util.ResourceBuild, params); err != nil {
		return err
	}

	return createBuild(params)
}

func createBuild(params api.CreateBuildParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	build := &corev1.Build{
		ObjectMeta: metav1.ObjectMeta{
			Name:      params.Name,
			Namespace: params.Organization,
			Labels: map[string]string{
				constants.LabelName:         params.Name,
				constants.LabelOrganization: params.Organization,
				constants.LabelProject:      params.Project,
				constants.LabelComponent:    params.Component,
			},
		},
		Spec: corev1.BuildSpec{
			BuildConfiguration: corev1.BuildConfiguration{},
		},
	}

	// Add docker configuration if provided
	if params.Docker != nil {
		build.Spec.BuildConfiguration.Docker = &corev1.DockerConfiguration{
			Context:        params.Docker.Context,
			DockerfilePath: params.Docker.DockerfilePath,
		}
	}

	// Add buildpack configuration if provided
	if params.Buildpack != nil {
		build.Spec.BuildConfiguration.Buildpack = &corev1.BuildpackConfiguration{
			Name:    params.Buildpack.Name,
			Version: params.Buildpack.Version,
		}
	}

	ctx := context.Background()
	if err := k8sClient.Create(ctx, build); err != nil {
		return errors.NewError("Failed to create build '%s' in organization '%s': %v",
			params.Name, params.Organization, err)
	}

	fmt.Printf("Build '%s' created successfully in project '%s' of organization '%s'\n",
		params.Name, params.Project, params.Organization)
	return nil
}
