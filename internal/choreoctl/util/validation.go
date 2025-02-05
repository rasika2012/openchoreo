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

package util

import (
	"fmt"
	"net/url"
	"regexp"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
)

const (
	RegexResourceName = "^[a-z0-9][a-z0-9-]*[a-z0-9]$"
)

var namePattern = regexp.MustCompile(RegexResourceName)

func ValidateResourceName(resource string, val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return errors.NewError("invalid type for resource name")
	}

	if str == "" {
		return errors.NewError("empty field for resource name")
	}
	if !namePattern.MatchString(str) {
		errMsg := fmt.Sprintf("invalid %s name format, expected: %s", resource, RegexResourceName)
		return errors.NewError("%s", errMsg)
	}

	return nil
}

func ValidateOrganization(val interface{}) error {
	return ValidateResourceName("organization", val)
}

func ValidateProject(val interface{}) error {
	return ValidateResourceName("project", val)
}

func ValidateComponent(val interface{}) error {
	return ValidateResourceName("component", val)
}

func ValidateURL(val interface{}) error {
	str, ok := val.(string)
	if !ok {
		return errors.NewError("invalid type for URL")
	}

	if str == "" {
		return errors.NewError("empty field for URL")
	}

	if _, err := url.Parse(str); err != nil {
		return errors.NewError("invalid URL format")
	}

	return nil
}
