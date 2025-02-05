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
	"fmt"

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
	stateDisplayNameInput
	stateTypeSelect
	stateURLInput
)

type componentModel struct {
	state         int
	organizations []string
	projects      []string
	types         []choreov1.ComponentType
	orgCursor     int
	projCursor    int
	typeCursor    int
	name          string
	displayName   string
	url           string
	selected      bool
	errorMsg      string
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
			projects, err := util.GetProjectNames(m.organizations[m.orgCursor])
			if err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			if len(projects) == 0 {
				m.errorMsg = fmt.Sprintf("no projects found in organization '%s'", m.organizations[m.orgCursor])
				return m, nil
			}
			m.projects = projects
			m.state = stateProjSelect
			m.errorMsg = ""
			return m, nil
		}
		m.orgCursor = interactive.ProcessListCursor(keyMsg, m.orgCursor, len(m.organizations))

	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.projCursor = interactive.ProcessListCursor(keyMsg, m.projCursor, len(m.projects))

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
			m.types = []choreov1.ComponentType{
				choreov1.ComponentTypeWebApplication,
				choreov1.ComponentTypeScheduledTask,
			}
			m.errorMsg = ""
			return m, nil
		}
		m.displayName, _ = interactive.EditTextInputField(keyMsg, m.displayName, len(m.displayName))

	case stateTypeSelect:
		if interactive.IsEnterKey(keyMsg) {
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
			return m, tea.Quit
		}
	}

	return m, nil
}

func (m componentModel) View() string {
	switch m.state {
	case stateOrgSelect:
		return interactive.RenderListPrompt(
			"Select an organization:",
			m.organizations,
			m.orgCursor,
		)

	case stateProjSelect:
		return interactive.RenderListPrompt(
			"Select project:",
			m.projects,
			m.projCursor,
		)

	case stateNameInput:
		return interactive.RenderInputPrompt(
			"Enter component name:",
			"",
			m.name,
			m.errorMsg,
		) + "\n" + "Name must consist of lowercase letters, numbers, or hyphens (e.g., my-service)"

	case stateDisplayNameInput:
		return interactive.RenderInputPrompt(
			"Enter display name (optional):",
			"",
			m.displayName,
			m.errorMsg,
		)

	case stateTypeSelect:
		return interactive.RenderListPrompt(
			"Select component type:",
			formatComponentTypes(m.types),
			m.typeCursor,
		)

	case stateURLInput:
		return interactive.RenderInputPrompt(
			"Enter git repository URL:",
			"",
			m.url,
			m.errorMsg,
		)

	default:
		return ""
	}
}

func formatComponentTypes(types []choreov1.ComponentType) []string {
	formatted := make([]string, len(types))
	for i, t := range types {
		formatted[i] = string(t)
	}
	return formatted
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
		state:         stateOrgSelect,
		organizations: orgs,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return err
	}

	m, ok := finalModel.(componentModel)
	if !ok || !m.selected {
		return errors.NewError("component creation cancelled")
	}

	return createComponent(api.CreateComponentParams{
		Organization:     m.organizations[m.orgCursor],
		Project:          m.projects[m.projCursor],
		Name:             m.name,
		DisplayName:      m.displayName,
		Type:             m.types[m.typeCursor],
		GitRepositoryURL: m.url,
	})
}
