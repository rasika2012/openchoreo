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

package dataplane

import (
	tea "github.com/charmbracelet/bubbletea"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/interactive"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/constants"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

// stateOrgSelect is used for organization selection.
// const (
// 	stateOrgSelect = iota
// )

type dataPlaneListModel struct {
	interactive.BaseModel // Reuses Organizations and OrgCursor.
	selected              bool
	errorMsg              string
}

func (m dataPlaneListModel) Init() tea.Cmd {
	return nil
}

func (m dataPlaneListModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}

	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	if interactive.IsEnterKey(keyMsg) {
		m.selected = true
		return m, tea.Quit
	}

	// Process organization cursor updates.
	m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))
	return m, nil
}

func (m dataPlaneListModel) View() string {
	view := ""
	if m.errorMsg != "" {
		view += m.errorMsg + "\n"
	}
	view += interactive.RenderListPrompt("Select organization:", m.Organizations, m.OrgCursor)
	return view
}

func listDataPlaneInteractive(config constants.CRDConfig) error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}

	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := dataPlaneListModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(dataPlaneListModel)
	if !ok || !m.selected {
		return errors.NewError("data plane listing cancelled")
	}

	return listDataPlanes(api.ListDataPlaneParams{
		Organization: m.Organizations[m.OrgCursor],
	}, config)
}
