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

package organization

import (
	tea "github.com/charmbracelet/bubbletea"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/interactive"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

const (
	stateNameInput = iota
	stateDisplayNameInput
	stateDescriptionInput
)

type organizationModel struct {
	state       int
	name        string
	displayName string
	description string
	selected    bool
	errorMsg    string
}

func (m organizationModel) Init() tea.Cmd {
	return nil
}

func (m organizationModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}

	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	switch m.state {
	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateOrganization(m.name); err != nil {
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
			m.state = stateDescriptionInput
			m.errorMsg = ""
			return m, nil
		}
		m.displayName, _ = interactive.EditTextInputField(keyMsg, m.displayName, len(m.displayName))

	case stateDescriptionInput:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.description, _ = interactive.EditTextInputField(keyMsg, m.description, len(m.description))
	}

	return m, nil
}

func (m organizationModel) View() string {
	switch m.state {
	case stateNameInput:
		return interactive.RenderInputPrompt(
			"Enter organization name:",
			"",
			m.name,
			m.errorMsg,
		) + "\n" + "Name must consist of lowercase letters, numbers, or hyphens (e.g., my-org)"

	case stateDisplayNameInput:
		return interactive.RenderInputPrompt(
			"Enter display name for the organization:",
			"",
			m.displayName,
			m.errorMsg,
		) + "\n" + "A human-friendly name (e.g., My Organization)"
	default:
		return interactive.RenderInputPrompt(
			"Enter description (optional):",
			"",
			m.description,
			m.errorMsg,
		) + "\n"
	}
}

func createOrganizationInteractive() error {
	model := organizationModel{
		state: stateNameInput,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return err
	}

	m, ok := finalModel.(organizationModel)
	if !ok || !m.selected {
		return errors.NewError("organization creation cancelled")
	}

	return createOrganization(api.CreateOrganizationParams{
		Name:        m.name,
		DisplayName: m.displayName,
		Description: m.description,
	})
}
