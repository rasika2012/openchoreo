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

package logout

import (
	"fmt"
	"os"

	"github.com/choreo-idp/choreo/internal/choreoctl/errors"
	"github.com/choreo-idp/choreo/internal/choreoctl/util"
)

type LogoutImpl struct{}

func NewLogoutImpl() *LogoutImpl {
	return &LogoutImpl{}
}

func (i *LogoutImpl) Logout() error {
	if !util.IsLoginConfigFileExists() {
		return errors.NewError("You are not logged in")
	}

	configPath, err := util.GetLoginConfigFilePath()
	if err != nil {
		return err
	}

	if err := os.Remove(configPath); err != nil {
		return errors.NewError("Error occurred while logging out %v", err)
	}

	fmt.Println("Successfully logged out")
	return nil
}
