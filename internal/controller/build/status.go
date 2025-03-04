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
	"github.com/choreo-idp/choreo/internal/controller"
	argo "github.com/choreo-idp/choreo/internal/dataplane/kubernetes/types/argoproj.io/workflow/v1alpha1"
)

const (
	Initialized               controller.ConditionType = "Initialized"
	CloneSucceeded            controller.ConditionType = "CloneSucceeded"
	BuildSucceeded            controller.ConditionType = "BuildSucceeded"
	PushSucceeded             controller.ConditionType = "PushSucceeded"
	Completed                 controller.ConditionType = "Completed"
	DeployableArtifactCreated controller.ConditionType = "DeployableArtifactCreated"
	DeploymentApplied         controller.ConditionType = "DeploymentApplied"
)

type WorkflowStep string

const (
	CloneStep WorkflowStep = "clone-step"
	BuildStep WorkflowStep = "build-step"
	PushStep  WorkflowStep = "push-step"
)

type StepPhase string

// Workflow and node statuses
const (
	Running   StepPhase = "Running"
	Succeeded StepPhase = "Succeeded"
	Failed    StepPhase = "Failed"
)

func getStepPhase(phase argo.NodePhase) StepPhase {
	switch phase {
	case argo.NodeRunning, argo.NodePending:
		return Running
	case argo.NodeFailed, argo.NodeError, argo.NodeSkipped:
		return Failed
	default:
		return Succeeded
	}
}

func GetStepByTemplateName(nodes argo.Nodes, step WorkflowStep) (*argo.NodeStatus, bool) {
	for _, node := range nodes {
		if node.TemplateName == string(step) {
			return &node, true
		}
	}
	return nil, false
}
