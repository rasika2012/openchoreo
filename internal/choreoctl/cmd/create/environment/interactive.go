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

package environment

import (
	"fmt"

	tea "github.com/charmbracelet/bubbletea"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/interactive"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

const (
	stateOrgSelect = iota
	stateNameInput
	stateDisplayNameInput
	stateDescriptionInput
	stateDataPlaneSelect
	stateIsProductionInput
	stateDNSPrefixInput
)

type environmentModel struct {
	interactive.BaseModel // Embeds common organization selection logic

	// Environment-specific fields.
	state        int
	dataPlanes   []string
	dpCursor     int
	name         string
	displayName  string
	description  string
	isProduction bool
	dnsPrefix    string
	selected     bool
	errorMsg     string
}

func (m environmentModel) Init() tea.Cmd {
	return nil
}

func (m environmentModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
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
		// Use BaseModel's organization selection.
		if interactive.IsEnterKey(keyMsg) {
			cmd := m.UpdateOrgSelect(keyMsg)
			// When organization selection is complete, move to name input.
			if m.State == interactive.StateProjSelect {
				m.state = stateNameInput
			}
			return m, cmd
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateResourceName("environment", m.name); err != nil {
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
			// Fetch available data planes for the selected organization.
			dataPlanes, err := util.GetDataPlaneNames(m.Organizations[m.OrgCursor])
			if err != nil {
				m.errorMsg = fmt.Sprintf("failed to get data planes: %v", err)
				return m, nil
			}
			if len(dataPlanes) == 0 {
				m.errorMsg = "no data planes found; please create one first"
				return m, nil
			}
			m.dataPlanes = dataPlanes
			m.state = stateDataPlaneSelect
			m.errorMsg = ""
			return m, nil
		}
		m.description, _ = interactive.EditTextInputField(keyMsg, m.description, len(m.description))

	case stateDataPlaneSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateIsProductionInput
			m.errorMsg = ""
			return m, nil
		}
		m.dpCursor = interactive.ProcessListCursor(keyMsg, m.dpCursor, len(m.dataPlanes))

	case stateIsProductionInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateDNSPrefixInput
			m.errorMsg = ""
			return m, nil
		}
		// Toggle isProduction with simple key input ("y" for yes, "n" for no)
		switch keyMsg.String() {
		case "y", "Y":
			m.isProduction = true
		case "n", "N":
			m.isProduction = false
		}

	case stateDNSPrefixInput:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.dnsPrefix, _ = interactive.EditTextInputField(keyMsg, m.dnsPrefix, len(m.dnsPrefix))
	}

	return m, nil
}

func (m environmentModel) View() string {
	progress := m.RenderProgress()

	switch m.state {
	case stateOrgSelect:
		return progress + m.RenderOrgSelection()
	case stateNameInput:
		return progress + interactive.RenderInputPrompt("Enter environment name:", "", m.name, m.errorMsg)
	case stateDisplayNameInput:
		return progress + interactive.RenderInputPrompt("Enter display name (optional):", "", m.displayName, m.errorMsg)
	case stateDescriptionInput:
		return progress + interactive.RenderInputPrompt("Enter environment description:", "", m.description, m.errorMsg)
	case stateDataPlaneSelect:
		return progress + interactive.RenderListPrompt("Select data plane:", m.dataPlanes, m.dpCursor)
	case stateIsProductionInput:
		return progress + interactive.RenderInputPrompt("Is this a production environment? (y/n):", "", fmt.Sprintf("%v", m.isProduction), m.errorMsg)
	case stateDNSPrefixInput:
		return progress + interactive.RenderInputPrompt("Enter DNS prefix:", "", m.dnsPrefix, m.errorMsg)
	default:
		return progress
	}
}

func createEnvironmentInteractive() error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}

	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := environmentModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
		state: stateOrgSelect,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(environmentModel)
	if !ok || !m.selected {
		return errors.NewError("environment creation cancelled")
	}

	return createEnvironment(api.CreateEnvironmentParams{
		Name:         m.name,
		Organization: m.Organizations[m.OrgCursor],
		DisplayName:  m.displayName,
		Description:  m.description,
		DataPlaneRef: m.dataPlanes[m.dpCursor],
		IsProduction: m.isProduction,
		DNSPrefix:    m.dnsPrefix,
	})
}
