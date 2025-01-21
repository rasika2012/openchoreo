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

type BuildEnvironmentVariable struct {
	Name  string `json:"name"`
	Value string `json:"value"`
}

type BuildEnvironmentFrom struct {
	SecretRef string `json:"secretRef"`
}

type BuildEnvironment struct {
	Env     []BuildEnvironmentVariable `json:"env,omitempty"`
	EnvFrom []BuildEnvironmentFrom     `json:"envFrom,omitempty"`
}

type BuildpackName string

const (
	BuildpackBallerina  BuildpackName = "Ballerina"
	BuildpackGo         BuildpackName = "Go"
	BuildpackJava       BuildpackName = "Java"
	BuildpackNodeJS     BuildpackName = "NodeJS"
	BuildpackPython     BuildpackName = "Python"
	BuildpackRuby       BuildpackName = "Ruby"
	BuildpackPHP        BuildpackName = "PHP"
	BuildpackDotNET     BuildpackName = ".NET"
	BuildpackSpringBoot BuildpackName = "SpringBoot"
)

type DockerConfiguration struct {
	// Context specifies the build context path
	Context string `json:"context"`
	// DockerfilePath specifies the path to the Dockerfile
	DockerfilePath string `json:"dockerfilePath"`
}

type BuildpackConfiguration struct {
	Name    BuildpackName `json:"name"`
	Version string        `json:"version,omitempty"`
}

// BuildConfiguration specifies the build configuration details
type BuildConfiguration struct {
	// Docker specifies the Docker-specific build configuration
	Docker *DockerConfiguration `json:"docker,omitempty"`
	// Buildpack specifies the buildpack to use
	Buildpack *BuildpackConfiguration `json:"buildpack,omitempty"`
}

// BuildSpec defines the desired state of Build.
type BuildSpec struct {
	Branch             string             `json:"branch,omitempty"`
	Path               string             `json:"path,omitempty"`
	AutoBuild          bool               `json:"autoBuild,omitempty"`
	BuildConfiguration BuildConfiguration `json:"buildConfiguration"`
	BuildEnvironment   BuildEnvironment   `json:"buildEnvironment,omitempty"`
}

type Image struct {
	Image string `json:"image"`
}

// BuildStatus defines the observed state of Build.
type BuildStatus struct {
	// INSERT ADDITIONAL STATUS FIELD - define observed state of cluster
	// Important: Run "make" to regenerate code after modifying this file

	// Conditions represent the latest available observations of an object's current state.
	Conditions  []metav1.Condition `json:"conditions,omitempty"`
	ImageStatus Image              `json:"imageStatus,omitempty"`
}

// +kubebuilder:object:root=true
// +kubebuilder:subresource:status

// Build is the Schema for the builds API.
type Build struct {
	metav1.TypeMeta   `json:",inline"`
	metav1.ObjectMeta `json:"metadata,omitempty"`

	Spec   BuildSpec   `json:"spec"`
	Status BuildStatus `json:"status,omitempty"`
}

// +kubebuilder:object:root=true

// BuildList contains a list of Build.
type BuildList struct {
	metav1.TypeMeta `json:",inline"`
	metav1.ListMeta `json:"metadata,omitempty"`
	Items           []Build `json:"items"`
}

func init() {
	SchemeBuilder.Register(&Build{}, &BuildList{})
}
