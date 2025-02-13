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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

const (
	stateOrgSelect = iota
	stateEnvSelect
)

// environmentListModel now embeds BaseModel to reuse Organizations, OrgCursor,
// Environments, and EnvCursor along with common helper functions.
type environmentListModel struct {
	interactive.BaseModel // Provides Organizations, OrgCursor, Environments, EnvCursor, etc.
	selected              bool
	errorMsg              string
	state                 int
}

func (m environmentListModel) Init() tea.Cmd {
	return nil
}

func (m environmentListModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
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
			environments, err := m.FetchEnvironments() // Defined in BaseModel.
			if err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			if len(environments) == 0 {
				m.errorMsg = fmt.Sprintf("No environments found for organization: %s", m.Organizations[m.OrgCursor])
				return m, nil
			}
			m.Environments = environments
			m.state = stateEnvSelect
			m.errorMsg = ""
			return m, nil
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	case stateEnvSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.EnvCursor = interactive.ProcessListCursor(keyMsg, m.EnvCursor, len(m.Environments))
	}

	return m, nil
}

func (m environmentListModel) View() string {
	var progress string
	if m.state > stateOrgSelect {
		progress += fmt.Sprintf("Organization: %s\n", m.Organizations[m.OrgCursor])
	}

	var view string
	switch m.state {
	case stateOrgSelect:
		view = interactive.RenderListPrompt("Select organization:", m.Organizations, m.OrgCursor)
	case stateEnvSelect:
		view = interactive.RenderListPrompt("Select environment:", m.Environments, m.EnvCursor)
	default:
		view = ""
	}

	if m.errorMsg != "" {
		view += "\nError: " + m.errorMsg
	}

	return progress + view
}

func listEnvironmentInteractive(config constants.CRDConfig) error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}

	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := environmentListModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
		state: stateOrgSelect,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(environmentListModel)
	if !ok || !m.selected {
		return errors.NewError("environment listing cancelled")
	}

	return listEnvironments(api.ListEnvironmentParams{
		Organization: m.Organizations[m.OrgCursor],
	}, config)
}
