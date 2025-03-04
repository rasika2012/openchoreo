package component

import (
	"fmt"
	"strings"

	tea "github.com/charmbracelet/bubbletea"

	choreov1 "github.com/choreo-idp/choreo/api/v1"
	"github.com/choreo-idp/choreo/internal/choreoctl/errors"
	"github.com/choreo-idp/choreo/internal/choreoctl/interactive"
	"github.com/choreo-idp/choreo/internal/choreoctl/util"
	"github.com/choreo-idp/choreo/pkg/cli/types/api"
)

const (
	stateOrgSelect = iota
	stateProjSelect
	stateNameInput
	stateTypeSelect
	stateURLInput
)

type componentModel struct {
	interactive.BaseModel // Reuses common organization/project selection logic
	types                 []choreov1.ComponentType
	typeCursor            int

	name     string
	url      string
	selected bool
	errorMsg string
	state    int
}

func (m componentModel) Init() tea.Cmd {
	return nil
}

func (m componentModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}

	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	switch m.state {
	case stateOrgSelect:
		if interactive.IsEnterKey(keyMsg) {
			projects, err := m.FetchProjects()
			if err != nil {
				m.errorMsg = err.Error()
				m.selected = false
				return m, tea.Quit
			}
			if len(projects) == 0 {
				m.errorMsg = fmt.Sprintf("No projects found in organization '%s'. Please create a project first using 'choreoctl create project'",
					m.Organizations[m.OrgCursor])
				m.selected = false
				return m, tea.Quit
			}
			m.Projects = projects
			m.state = stateProjSelect
			m.errorMsg = ""
			return m, nil
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.ProjCursor = interactive.ProcessListCursor(keyMsg, m.ProjCursor, len(m.Projects))

	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			// First validate the component name format
			if err := util.ValidateComponent(m.name); err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}

			// Check if component already exists
			components, err := m.FetchComponents()
			if err != nil {
				m.errorMsg = fmt.Sprintf("Failed to check component existence: %v", err)
				return m, nil
			}

			// Check for duplicate component name
			for _, c := range components {
				if c == m.name {
					m.errorMsg = fmt.Sprintf("Component '%s' already exists in project '%s'",
						m.name, m.Projects[m.ProjCursor])
					return m, nil
				}
			}

			m.state = stateTypeSelect
			m.errorMsg = ""
			return m, nil
		}
		m.errorMsg = ""
		m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))

	case stateTypeSelect:
		if interactive.IsEnterKey(keyMsg) {
			// Validate that a component type is selected.
			if m.typeCursor < 0 || m.typeCursor >= len(m.types) {
				m.errorMsg = "Invalid component type selected"
				return m, nil
			}
			m.state = stateURLInput
			m.errorMsg = ""
			return m, nil
		}
		m.typeCursor = interactive.ProcessListCursor(keyMsg, m.typeCursor, len(m.types))

	case stateURLInput:
		m.url, _ = interactive.EditTextInputField(keyMsg, m.url, len(m.url))
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateURL(m.url); err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			m.selected = true
			m.errorMsg = ""
			return m, tea.Quit
		}
	}

	return m, nil
}

func (m componentModel) View() string {
	progress := m.RenderProgress()
	var view string
	switch m.state {
	case stateOrgSelect:
		view = m.RenderOrgSelection()
	case stateProjSelect:
		view = m.RenderProjSelection()
	case stateNameInput:
		view = interactive.RenderInputPrompt("Enter component name:", "", m.name, m.errorMsg)
	case stateTypeSelect:
		typeOptions := make([]string, len(m.types))
		for i, t := range m.types {
			typeOptions[i] = string(t)
		}
		view = interactive.RenderListPrompt("Select component type:", typeOptions, m.typeCursor)
	case stateURLInput:
		view = interactive.RenderInputPrompt("Enter git repository URL:", "", m.url, m.errorMsg)
	default:
		view = ""
	}
	return progress + view
}

func createComponentInteractive() error {
	baseModel, err := interactive.NewBaseModel()
	if err != nil {
		return err
	}

	model := componentModel{
		BaseModel: *baseModel,
		state:     stateOrgSelect,
		types: []choreov1.ComponentType{
			choreov1.ComponentTypeWebApplication,
			choreov1.ComponentTypeScheduledTask,
		},
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(componentModel)
	if !ok || !m.selected {
		if m.errorMsg != "" {
			return fmt.Errorf("%s", m.errorMsg)
		}
		return errors.NewError("component creation cancelled")
	}

	return createComponent(api.CreateComponentParams{
		Organization:     m.Organizations[m.OrgCursor],
		Project:          m.Projects[m.ProjCursor],
		Name:             m.name,
		Type:             m.types[m.typeCursor],
		GitRepositoryURL: m.url,
	})
}

func (m componentModel) RenderProgress() string {
	var progress strings.Builder
	progress.WriteString("Selected inputs:\n")

	if len(m.Organizations) > 0 {
		progress.WriteString(fmt.Sprintf("- organization: %s\n", m.Organizations[m.OrgCursor]))
	}

	if len(m.Projects) > 0 {
		progress.WriteString(fmt.Sprintf("- project: %s\n", m.Projects[m.ProjCursor]))
	}

	if m.name != "" {
		progress.WriteString(fmt.Sprintf("- name: %s\n", m.name))
	}

	if m.state > stateTypeSelect && m.typeCursor < len(m.types) {
		progress.WriteString(fmt.Sprintf("- type: %s\n", m.types[m.typeCursor]))
	}

	if m.url != "" {
		progress.WriteString(fmt.Sprintf("- git repository: %s\n", m.url))
	}

	return progress.String()
}
