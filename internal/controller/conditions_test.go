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
	"testing"

	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

func TestNeedConditionUpdate(t *testing.T) {
	tests := []struct {
		name              string
		currentConditions []metav1.Condition
		updatedConditions []metav1.Condition
		want              bool
	}{
		{
			name:              "Both conditions empty -> No update needed",
			currentConditions: []metav1.Condition{},
			updatedConditions: []metav1.Condition{},
			want:              false,
		},
		{
			name:              "Different lengths -> Update needed (current is empty, updated has 1)",
			currentConditions: []metav1.Condition{},
			updatedConditions: []metav1.Condition{
				{
					Type:   "Ready",
					Status: "True",
				},
			},
			want: true,
		},
		{
			name: "Different lengths -> Update needed (current has 1, updated is empty)",
			currentConditions: []metav1.Condition{
				{
					Type:   "Ready",
					Status: "True",
				},
			},
			updatedConditions: []metav1.Condition{},
			want:              true,
		},
		{
			name: "Same conditions -> No update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is okay",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is okay",
					ObservedGeneration: 1,
				},
			},
			want: false,
		},
		{
			name: "Status changed -> Update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "False",
					Reason:             "NotReady",
					Message:            "Some issue",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is okay now",
					ObservedGeneration: 1,
				},
			},
			want: true,
		},
		{
			name: "Reason changed -> Update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "OldReason",
					Message:            "No updates",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "NewReason",
					Message:            "No updates",
					ObservedGeneration: 1,
				},
			},
			want: true,
		},
		{
			name: "Message changed -> Update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Old message",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "New message",
					ObservedGeneration: 1,
				},
			},
			want: true,
		},
		{
			name: "ObservedGeneration changed -> Update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "No changes",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "No changes",
					ObservedGeneration: 2,
				},
			},
			want: true,
		},
		{
			name: "New condition added -> Update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is fine",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is fine",
					ObservedGeneration: 1,
				},
				{
					Type:               "Healthy",
					Status:             "True",
					Reason:             "DiagnosticsPassed",
					Message:            "Diagnostics look good",
					ObservedGeneration: 1,
				},
			},
			want: true,
		},
		{
			name: "Condition removed -> Update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is fine",
					ObservedGeneration: 1,
				},
				{
					Type:               "Healthy",
					Status:             "True",
					Reason:             "DiagnosticsPassed",
					Message:            "Diagnostics look good",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is fine",
					ObservedGeneration: 1,
				},
			},
			want: true,
		},
		{
			name: "Unchanged multiple conditions -> No update needed",
			currentConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is fine",
					ObservedGeneration: 1,
				},
				{
					Type:               "Healthy",
					Status:             "True",
					Reason:             "DiagnosticsPassed",
					Message:            "Diagnostics look good",
					ObservedGeneration: 1,
				},
			},
			updatedConditions: []metav1.Condition{
				{
					Type:               "Ready",
					Status:             "True",
					Reason:             "AllGood",
					Message:            "Everything is fine",
					ObservedGeneration: 1,
				},
				{
					Type:               "Healthy",
					Status:             "True",
					Reason:             "DiagnosticsPassed",
					Message:            "Diagnostics look good",
					ObservedGeneration: 1,
				},
			},
			want: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NeedConditionUpdate(tt.currentConditions, tt.updatedConditions); got != tt.want {
				t.Errorf("NeedConditionUpdate() = %v, want %v", got, tt.want)
			}
		})
	}
}
