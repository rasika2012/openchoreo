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
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

// projectListModel embeds BaseModel to reuse organization list and cursor.
type projectListModel struct {
	interactive.BaseModel // Provides Organizations and OrgCursor.
	selected              bool
}

func (m projectListModel) Init() tea.Cmd {
	return nil
}

func (m projectListModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}

	// Quit if needed.
	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	// Confirm selection on Enter.
	if interactive.IsEnterKey(keyMsg) {
		m.selected = true
		return m, tea.Quit
	}

	// Update the organization cursor.
	m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))
	return m, nil
}

func (m projectListModel) View() string {
	return interactive.RenderListPrompt("Select organization:", m.Organizations, m.OrgCursor)
}

func listProjectsInteractive(config constants.CRDConfig) error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}
	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := projectListModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
	}
	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(projectListModel)
	if !ok || !m.selected {
		return errors.NewError("project listing cancelled")
	}

	return listProjects(api.ListProjectParams{
		Organization: m.Organizations[m.OrgCursor],
	}, config)
}
