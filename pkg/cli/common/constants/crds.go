package constants

const (
	ChoreoGroup = "core.choreo.dev"
)

type APIVersion string

const (
	V1 APIVersion = "v1"
)

const (
	OutputFormatYAML = "yaml"
	OrganizationKind = "Organization"
	ProjectKind      = "Project"
	ComponentKind    = "Component"
)

type CRDConfig struct {
	Group   string
	Version APIVersion
	Kind    string
}

var (
	OrganizationV1Config = CRDConfig{
		Group:   ChoreoGroup,
		Version: V1,
		Kind:    OrganizationKind,
	}
	ProjectV1Config = CRDConfig{
		Group:   ChoreoGroup,
		Version: V1,
		Kind:    ProjectKind,
	}
	ComponentV1Config = CRDConfig{
		Group:   ChoreoGroup,
		Version: V1,
		Kind:    ComponentKind,
	}
)
