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

package component

import (
	tea "github.com/charmbracelet/bubbletea"

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/interactive"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

const (
	stateOrgSelect = iota
	stateProjSelect
	stateNameInput
	stateDisplayNameInput // Remove
	stateTypeSelect
	stateURLInput
)

type componentModel struct {
	interactive.BaseModel // Reuses common organization/project selection logic
	types                 []choreov1.ComponentType
	typeCursor            int

	name        string
	displayName string
	url         string
	selected    bool
	errorMsg    string
	state       int
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
			// Use BaseModel helper to update organization selection.
			cmd := m.UpdateOrgSelect(keyMsg)
			if m.State == interactive.StateProjSelect {
				m.state = stateProjSelect
			}
			m.errorMsg = ""
			return m, cmd
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			// Delegate project selection to BaseModel helper.
			cmd, err := m.UpdateProjSelect(keyMsg)
			if err != nil {
				m.errorMsg = err.Error()
				return m, tea.Quit
			}
			m.state = stateNameInput
			m.errorMsg = ""
			return m, cmd
		}
		m.ProjCursor = interactive.ProcessListCursor(keyMsg, m.ProjCursor, len(m.Projects))

	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateComponent(m.name); err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			m.state = stateDisplayNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))

	case stateDisplayNameInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateTypeSelect
			m.errorMsg = ""
			return m, nil
		}
		m.displayName, _ = interactive.EditTextInputField(keyMsg, m.displayName, len(m.displayName))

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
	case stateDisplayNameInput:
		view = interactive.RenderInputPrompt("Enter display name (optional):", "", m.displayName, m.errorMsg)
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
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return err
	}
	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := componentModel{
		state:     stateOrgSelect,
		BaseModel: interactive.BaseModel{Organizations: orgs},
		types: []choreov1.ComponentType{
			choreov1.ComponentTypeWebApplication,
			choreov1.ComponentTypeScheduledTask,
		},
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return err
	}

	m, ok := finalModel.(componentModel)
	if !ok || !m.selected {
		return errors.NewError("component creation cancelled")
	}

	params := api.CreateComponentParams{
		Organization:     m.Organizations[m.OrgCursor],
		Project:          m.Projects[m.ProjCursor],
		Name:             m.name,
		DisplayName:      m.displayName,
		Type:             m.types[m.typeCursor],
		GitRepositoryURL: m.url,
	}
	return createComponent(params)
}
