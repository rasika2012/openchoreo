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

package v1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// TargetEnvironmentRef defines a reference to a target environment with approval settings
type TargetEnvironmentRef struct {
	// Name of the target environment
	Name string `json:"name"`
	// RequiresApproval indicates if promotion to this environment requires approval
	// +optional
	RequiresApproval bool `json:"requiresApproval,omitempty"`
	// IsManualApprovalRequired indicates if manual approval is needed for promotion
	// +optional
	IsManualApprovalRequired bool `json:"isManualApprovalRequired,omitempty"`
}

// PromotionPath defines a path for promoting between environments
type PromotionPath struct {
	// SourceEnvironmentRef is the reference to the source environment
	SourceEnvironmentRef string `json:"sourceEnvironmentRef"`
	// TargetEnvironmentRefs is the list of target environments and their approval requirements
	TargetEnvironmentRefs []TargetEnvironmentRef `json:"targetEnvironmentRefs"`
}

// DeploymentPipelineSpec defines the desired state of DeploymentPipeline.
type DeploymentPipelineSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// PromotionPaths defines the available paths for promotion between environments
	PromotionPaths []PromotionPath `json:"promotionPaths,omitempty"`
}

// DeploymentPipelineStatus defines the observed state of DeploymentPipeline.
type DeploymentPipelineStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// ObservedGeneration represents the .metadata.generation that the condition was set based upon
	ObservedGeneration int64 `json:"observedGeneration,omitempty"`
	// Conditions represent the latest available observations of an object's state
	Conditions []metav1.Condition `json:"conditions,omitempty"`
}

// +kubebuilder:object:root=true
// +kubebuilder:subresource:status
// +kubebuilder:resource:scope=Namespaced,shortName=deppipe;deppipes

// DeploymentPipeline is the Schema for the deploymentpipelines API.
type DeploymentPipeline struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   DeploymentPipelineSpec   `json:"spec,omitempty"`
	Status DeploymentPipelineStatus `json:"status,omitempty"`
}

// +kubebuilder:object:root=true

// DeploymentPipelineList contains a list of DeploymentPipeline.
type DeploymentPipelineList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []DeploymentPipeline `json:"items"`
}

func init() {
	SchemeBuilder.Register(&DeploymentPipeline{}, &DeploymentPipelineList{})
}
