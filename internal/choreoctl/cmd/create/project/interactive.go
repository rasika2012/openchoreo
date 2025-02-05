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

package project

import (
	tea "github.com/charmbracelet/bubbletea"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/interactive"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

const (
	stateOrgSelect = iota
	stateNameInput
	stateDesplayNameInput
)

type projectModel struct {
	state         int
	organizations []string
	orgCursor     int
	name          string
	displayName   string
	selected      bool
	errorMsg      string
}

func (m projectModel) Init() tea.Cmd {
	return nil
}

func (m projectModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
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
			m.state = stateNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.orgCursor = interactive.ProcessListCursor(keyMsg, m.orgCursor, len(m.organizations))

	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateProject(m.name); err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			m.state = stateDesplayNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))

	case stateDesplayNameInput:
		switch keyMsg.Type {
		case tea.KeyEnter:
			m.selected = true
			return m, tea.Quit
		case tea.KeyEsc:
			m.selected = false
			return m, tea.Quit
		default:
			m.displayName += keyMsg.String()
		}
	}

	return m, nil
}

func (m projectModel) View() string {
	switch m.state {
	case stateOrgSelect:
		return interactive.RenderListPrompt(
			"Select an organization:",
			m.organizations,
			m.orgCursor,
		)

	case stateNameInput:
		return interactive.RenderInputPrompt(
			"Enter project name:",
			"",
			m.name,
			m.errorMsg,
		) + "\n"

	case stateDesplayNameInput:
		return interactive.RenderInputPrompt(
			"Enter project display name (optional):",
			"",
			m.displayName,
			m.errorMsg,
		)
	}
	return ""
}

func createProjectInteractive() error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return err
	}

	if len(orgs) == 0 {
		return errors.NewError("No organizations found. Please create an organization first before creating a project.")
	}

	model := projectModel{
		state:         stateOrgSelect,
		organizations: orgs,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return err
	}

	m, ok := finalModel.(projectModel)
	if !ok || !m.selected {
		return errors.NewError("Project creation cancelled")
	}

	return createProject(api.CreateProjectParams{
		Organization: m.organizations[m.orgCursor],
		Name:         m.name,
		Description:  m.displayName,
	})
}
