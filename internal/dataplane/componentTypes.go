package dataplane

import choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"

// Config represents the root configuration structure
type Config struct {
	SchemaVersion string     `yaml:"schemaVersion"`
	Endpoints     []Endpoint `yaml:"endpoints"`
}

// Endpoint represents an individual service endpoint configuration
type Endpoint struct {
	Name                string   `yaml:"name"`
	DisplayName         string   `yaml:"displayName,omitempty"`
	Service             Service  `yaml:"service"`
	NetworkVisibilities []string `yaml:"networkVisibilities,omitempty"`
}

// Service contains the service-specific configuration
type Service struct {
	BasePath       string                `yaml:"basePath,omitempty"`
	Port           int32                 `yaml:"port"`
	Type           choreov1.EndpointType `yaml:"type"`
	SchemaFilePath string                `yaml:"schemaFilePath,omitempty"`
}
