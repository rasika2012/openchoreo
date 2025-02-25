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

package controller

import (
	"context"

	"k8s.io/apimachinery/pkg/api/meta"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"sigs.k8s.io/controller-runtime/pkg/client"
)

// This file contains the types and functions to manage the conditions in the Kubernetes objects.

// ConditionType represents the type of condition describing a specific state of the resource.
// Use CamelCase format (e.g., Ready, Available).
type ConditionType string

// String returns the string representation of the condition type.
func (c ConditionType) String() string {
	return string(c)
}

// ConditionReason represents the machine-readable reason for a condition's status.
// Use CamelCase format (e.g., MinimumReplicasUnavailable, MinimumReplicasMet).
type ConditionReason string

// ConditionedObject describes a Kubernetes resource that has a mutable
// Conditions field in its Status
type ConditionedObject interface {
	client.Object

	GetConditions() []metav1.Condition
	SetConditions(conditions []metav1.Condition)
}

// NewCondition creates a new condition with the last transition time set to the current time.
func NewCondition(conditionType ConditionType, status metav1.ConditionStatus, reason ConditionReason,
	message string, observedGeneration int64) metav1.Condition {
	return metav1.Condition{
		Type:               string(conditionType),
		Status:             status,
		Reason:             string(reason),
		Message:            message,
		LastTransitionTime: metav1.Now(),
		ObservedGeneration: observedGeneration,
	}
}

// NeedConditionUpdate checks if the conditions need to be updated based on the current and updated conditions.
func NeedConditionUpdate(currentConditions, updatedConditions []metav1.Condition) bool {
	// If the number of conditions is different, an update is needed
	if len(currentConditions) != len(updatedConditions) {
		return true
	}

	// Track seen conditions
	seenConditions := make(map[string]bool)

	// Check for changes in existing conditions and new conditions
	for _, updated := range updatedConditions {
		current := meta.FindStatusCondition(currentConditions, updated.Type)
		if current == nil {
			// New condition added
			return true
		}

		if current.Status != updated.Status ||
			current.Reason != updated.Reason ||
			current.Message != updated.Message ||
			current.ObservedGeneration != updated.ObservedGeneration {
			return true
		}

		seenConditions[updated.Type] = true
	}

	// Check for removed conditions
	for _, current := range currentConditions {
		if _, ok := seenConditions[current.Type]; !ok {
			// Condition removed
			return true
		}
	}

	return false
}

// UpdateStatusConditions will compare the current and updated conditions and update the status conditions if needed.
func UpdateStatusConditions[T ConditionedObject](
	ctx context.Context,
	c client.Client,
	current, updated T,
) error {
	// Update the conditions if needed
	if NeedConditionUpdate(current.GetConditions(), updated.GetConditions()) {
		// Create a copy of the object to avoid modifying the original object to avoid updating
		// other status fields that might have been updated in the updated object.
		newObj := current.DeepCopyObject().(ConditionedObject)
		newObj.SetConditions(updated.GetConditions())
		return c.Status().Update(ctx, newObj)
	}
	return nil
}
