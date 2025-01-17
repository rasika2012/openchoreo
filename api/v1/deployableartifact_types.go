/*
Copyright 2025.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

package v1

import (
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

// EDIT THIS FILE!  THIS IS SCAFFOLDING FOR YOU TO OWN!
// NOTE: json tags are required.  Any new fields you add must have json tags for the fields to be serialized.

// DeployableArtifactSpec defines the desired state of DeployableArtifact.
type DeployableArtifactSpec struct {
	// INSERT ADDITIONAL SPEC FIELDS - desired state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// DeployableArtifactSpec defines the spec section of DeployableArtifact.
	TargetArtifact TargetArtifact `json:"targetArtifact"`
}

// TargetArtifact defines the details of the target artifact.
type TargetArtifact struct {
	FromBuildRef FromBuildRef `json:"fromBuildRef"`
}

// FromBuildRef holds the reference to the build.
type FromBuildRef struct {
	Name string `json:"name"`
}

// DeployableArtifactStatus defines the observed state of DeployableArtifact.
type DeployableArtifactStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file
}

// +kubebuilder:object:root=true
// +kubebuilder:subresource:status

// DeployableArtifact is the Schema for the deployableartifacts API.
type DeployableArtifact struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   DeployableArtifactSpec   `json:"spec,omitempty"`
	Status DeployableArtifactStatus `json:"status,omitempty"`
}

// +kubebuilder:object:root=true

// DeployableArtifactList contains a list of DeployableArtifact.
type DeployableArtifactList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []DeployableArtifact `json:"items"`
}

func init() {
	SchemeBuilder.Register(&DeployableArtifact{}, &DeployableArtifactList{})
}
