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
)

type buildListModel struct {
	state         int
	organizations []string
	projects      []string
	components    []string
	orgCursor     int
	projCursor    int
	compCursor    int
	selected      bool
	errorMsg      string
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
			projects, err := util.GetProjectNames(m.organizations[m.orgCursor])
			if err != nil {
				m.errorMsg = err.Error()
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
			components, err := util.GetComponentNames(m.organizations[m.orgCursor], m.projects[m.projCursor])
			if err != nil {
				fmt.Print(err)
				m.errorMsg = err.Error()
				return m, nil
			}
			m.components = components
			m.state = stateCompSelect
			m.errorMsg = ""
			return m, nil
		}
		m.projCursor = interactive.ProcessListCursor(keyMsg, m.projCursor, len(m.projects))

	case stateCompSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.compCursor = interactive.ProcessListCursor(keyMsg, m.compCursor, len(m.components))
	}

	return m, nil
}

func (m buildListModel) View() string {
	switch m.state {
	case stateOrgSelect:
		return interactive.RenderListPrompt(
			"Select organization:",
			m.organizations,
			m.orgCursor,
		)
	case stateProjSelect:
		return interactive.RenderListPrompt(
			"Select project:",
			m.projects,
			m.projCursor,
		)
	default:
		return interactive.RenderListPrompt(
			"Select component:",
			m.components,
			m.compCursor,
		)
	}
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
		organizations: orgs,
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
		Organization: m.organizations[m.orgCursor],
		Project:      m.projects[m.projCursor],
		Component:    m.components[m.compCursor],
	}, config)
}
