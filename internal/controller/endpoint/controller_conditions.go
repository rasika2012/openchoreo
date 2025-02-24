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

package endpoint

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/controller"
)

// Constants for condition types

const (
	// ConditionReady represents whether the endpoint is ready
	ConditionReady controller.ConditionType = "Ready"
)

// Constants for condition reasons

const (
	// ReasonEndpointReady the endpoint is ready
	ReasonEndpointReady controller.ConditionReason = "EndpointReady"
)

func NewEndpointReadyCondition(generation int64, accepted bool, message string) metav1.Condition {
	switch accepted {
	case true:
		return controller.NewCondition(
			controller.TypeReady,
			metav1.ConditionTrue,
			ReasonEndpointReady,
			message,
			generation,
		)
	default:
		return controller.NewCondition(
			controller.TypeReady,
			metav1.ConditionFalse,
			ReasonEndpointReady,
			message,
			generation,
		)
	}
}
