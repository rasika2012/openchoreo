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

package build

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
	stateProjSelect
	stateCompSelect
	stateBuildSelect
)

type buildListModel struct {
	interactive.BaseModel // Reuses Organizations, Projects, Components, and their cursors.
	state                 int
	selected              bool
	errorMsg              string

	// Build-specific fields.
	builds      []string
	buildCursor int
}

func (m buildListModel) Init() tea.Cmd {
	return nil
}

func (m buildListModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
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
			projects, err := m.FetchProjects() // Reusable function from BaseModel.
			if err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			m.Projects = projects
			m.state = stateProjSelect
			m.errorMsg = ""
			return m, nil
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			components, err := m.FetchComponents() // Reusable function from BaseModel.
			if err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			m.Components = components
			m.state = stateCompSelect
			m.errorMsg = ""
			return m, nil
		}
		m.ProjCursor = interactive.ProcessListCursor(keyMsg, m.ProjCursor, len(m.Projects))

	case stateCompSelect:
		if interactive.IsEnterKey(keyMsg) {
			builds, err := m.FetchBuildNames() // Reusable function from BaseModel.
			if err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			if len(builds) == 0 {
				m.errorMsg = fmt.Sprintf("No builds found for component: %s", m.Components[m.CompCursor])
				m.selected = true
				return m, tea.Quit
			}
			m.builds = builds
			m.state = stateBuildSelect
			m.errorMsg = ""
			return m, nil
		}
		m.CompCursor = interactive.ProcessListCursor(keyMsg, m.CompCursor, len(m.Components))

	case stateBuildSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.buildCursor = interactive.ProcessListCursor(keyMsg, m.buildCursor, len(m.builds))
	}

	return m, nil
}

func (m buildListModel) View() string {
	var view string
	switch m.state {
	case stateOrgSelect:
		view = m.RenderOrgSelection()
	case stateProjSelect:
		view = m.RenderProjSelection()
	case stateCompSelect:
		view = m.RenderComponentSelection()
	case stateBuildSelect:
		view = interactive.RenderListPrompt("Select build:", m.builds, m.buildCursor)
	default:
		view = ""
	}
	return m.RenderProgress() + view
}

func listBuildInteractive(config constants.CRDConfig) error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}
	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := buildListModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
		state: stateOrgSelect,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(buildListModel)
	if !ok || !m.selected {
		return errors.NewError("build listing cancelled")
	}

	return listBuilds(api.ListBuildParams{
		Organization: m.Organizations[m.OrgCursor],
		Project:      m.Projects[m.ProjCursor],
		Component:    m.Components[m.CompCursor],
	}, config)
}
