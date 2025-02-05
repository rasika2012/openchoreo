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

package component

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

type CreateCompImpl struct {
	config constants.CRDConfig
}

func NewCreateCompImpl(config constants.CRDConfig) *CreateCompImpl {
	return &CreateCompImpl{
		config: config,
	}
}

func (i *CreateCompImpl) CreateComponent(params api.CreateComponentParams) error {
	if params.Organization == "" || params.Project == "" || params.Type == "" ||
		params.Name == "" || params.GitRepositoryURL == "" {
		return createComponentInteractive()
	}

	if err := util.ValidateComponent(params.Name); err != nil {
		return err
	}

	if err := util.ValidateURL(params.GitRepositoryURL); err != nil {
		return err
	}

	return createComponent(params)
}

func createComponent(params api.CreateComponentParams) error {
	k8sClient, err := util.GetKubernetesClient()
	if err != nil {
		return err
	}

	// Base component metadata
	component := &corev1.Component{
		ObjectMeta: metav1.ObjectMeta{
			Name:      params.Name,
			Namespace: params.Organization,
			Annotations: map[string]string{
				"core.choreo.dev/display-name": params.DisplayName,
			},
			Labels: map[string]string{
				"core.choreo.dev/name":         params.Name,
				"core.choreo.dev/organization": params.Organization,
				"core.choreo.dev/project":      params.Project,
				"core.choreo.dev/type":         string(params.Type),
			},
		},
		Spec: corev1.ComponentSpec{
			Type: params.Type,
		},
	}
	if err := validateGitParams(params); err != nil {
		return err
	}
	component.Spec.Source = corev1.ComponentSource{
		GitRepository: corev1.GitRepository{
			URL: params.GitRepositoryURL,
		},
	}

	ctx := context.Background()
	if err := k8sClient.Create(ctx, component); err != nil {
		return err
	}

	fmt.Printf("Component '%s' created successfully in project '%s' of organization '%s'\n",
		params.Name, params.Project, params.Organization)
	return nil
}

func validateGitParams(params api.CreateComponentParams) error {
	if params.GitRepositoryURL == "" {
		return errors.NewError("git repository URL is required")
	}

	return nil
}
