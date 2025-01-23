package build

import (
	argo "github.com/wso2-enterprise/choreo-cp-declarative-api/internal/kubernetes/types/argoproj.io/workflow/v1alpha1"
)

type ConditionType string

const (
	Initialized               ConditionType = "Initialized"
	CloneSucceeded            ConditionType = "CloneSucceeded"
	BuildSucceeded            ConditionType = "BuildSucceeded"
	PushSucceeded             ConditionType = "PushSucceeded"
	Completed                 ConditionType = "Completed"
	DeployableArtifactCreated ConditionType = "DeployableArtifactCreated"
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
