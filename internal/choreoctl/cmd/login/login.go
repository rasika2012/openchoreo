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

package login

import (
	"fmt"
	"path/filepath"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

type AuthImpl struct{}

var _ api.LoginAPI = &AuthImpl{}

func NewAuthImpl() *AuthImpl {
	return &AuthImpl{}
}

func (i *AuthImpl) Login(params api.LoginParams) error {
	return handleLogin(params)
}

func (i *AuthImpl) IsLoggedIn() bool {
	return util.IsLoginConfigFileExists()
}

func (i *AuthImpl) GetLoginPrompt() string {
	return "Please login using 'choreoctl login' command"
}

func performLogin(kubeconfigPath, context string) error {
	absPath, err := filepath.Abs(kubeconfigPath)
	if err != nil {
		return err
	}

	if err := util.SaveLoginConfig(absPath, context); err != nil {
		return err
	}

	if err := util.LoginWithContext(absPath, context); err != nil {
		if cleanupErr := util.CleanupLoginConfig(); cleanupErr != nil {
			return errors.NewError("failed to login and cleanup login config: %v", cleanupErr)
		}
		return errors.NewError("failed to login: %v", err)
	}

	fmt.Println("Successfully logged in")
	return nil
}

func handleLogin(params api.LoginParams) error {
	if params.KubeconfigPath == "" || params.Kubecontext == "" {
		return loginInteractive()
	}
	return performLogin(params.KubeconfigPath, params.Kubecontext)
}
