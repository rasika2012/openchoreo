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

package deploymenttrack

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
	stateProjSelect
	stateCompSelect
	stateNameInput
	stateDisplayNameInput
	stateDescriptionInput
	stateAPIVersionInput
	stateAutoDeployInput
	stateBuildTemplateInput
)

type deploymentTrackModel struct {
	state         int
	organizations []string
	projects      []string
	components    []string
	orgCursor     int
	projCursor    int
	compCursor    int
	name          string
	nameCursor    int
	displayName   string
	displayCursor int
	description   string
	descCursor    int
	apiVersion    string
	apiCursor     int
	autoDeploy    bool
	buildTemplate string
	buildCursor   int
	selected      bool
	errorMsg      string
}

func (m deploymentTrackModel) Init() tea.Cmd {
	return nil
}

func (m deploymentTrackModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
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
				m.errorMsg = "No projects found. Please create a project first."
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
				m.errorMsg = err.Error()
				return m, nil
			}
			if len(components) == 0 {
				m.errorMsg = "No components found. Please create a component first."
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
			m.state = stateNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.compCursor = interactive.ProcessListCursor(keyMsg, m.compCursor, len(m.components))

	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateResourceName("deployment track", m.name); err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			m.state = stateDisplayNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.name, m.nameCursor = interactive.EditTextInputField(keyMsg, m.name, m.nameCursor)

	case stateDisplayNameInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateDescriptionInput
			m.errorMsg = ""
			return m, nil
		}
		m.displayName, m.displayCursor = interactive.EditTextInputField(keyMsg, m.displayName, m.displayCursor)

	case stateDescriptionInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateAPIVersionInput
			m.errorMsg = ""
			return m, nil
		}
		m.description, m.descCursor = interactive.EditTextInputField(keyMsg, m.description, m.descCursor)

	case stateAPIVersionInput:
		if interactive.IsEnterKey(keyMsg) {
			if m.apiVersion == "" {
				m.errorMsg = "API version is required"
				return m, nil
			}
			m.state = stateAutoDeployInput
			m.errorMsg = ""
			return m, nil
		}
		m.apiVersion, m.apiCursor = interactive.EditTextInputField(keyMsg, m.apiVersion, m.apiCursor)

	case stateAutoDeployInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateBuildTemplateInput
			m.errorMsg = ""
			return m, nil
		}
		switch keyMsg.String() {
		case "y", "Y":
			m.autoDeploy = true
		case "n", "N":
			m.autoDeploy = false
		}

	case stateBuildTemplateInput:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.buildTemplate, m.buildCursor = interactive.EditTextInputField(keyMsg, m.buildTemplate, m.buildCursor)
	}

	return m, nil
}

func (m deploymentTrackModel) View() string {
	if m.errorMsg != "" {
		return m.errorMsg + "\n"
	}

	progress := ""
	if m.state > stateOrgSelect {
		progress += fmt.Sprintf("Organization: %s\n", m.organizations[m.orgCursor])
	}
	if m.state > stateProjSelect {
		progress += fmt.Sprintf("Project: %s\n", m.projects[m.projCursor])
	}
	if m.state > stateCompSelect {
		progress += fmt.Sprintf("Component: %s\n", m.components[m.compCursor])
	}
	if m.state > stateNameInput {
		progress += fmt.Sprintf("Name: %s\n", m.name)
	}
	if m.state > stateDisplayNameInput && m.displayName != "" {
		progress += fmt.Sprintf("Display Name: %s\n", m.displayName)
	}
	if m.state > stateDescriptionInput && m.description != "" {
		progress += fmt.Sprintf("Description: %s\n", m.description)
	}
	if m.state > stateAPIVersionInput {
		progress += fmt.Sprintf("API Version: %s\n", m.apiVersion)
	}
	if m.state > stateAutoDeployInput {
		progress += fmt.Sprintf("Auto Deploy: %v\n", m.autoDeploy)
	}

	switch m.state {
	case stateOrgSelect:
		return progress + interactive.RenderListPrompt("Select organization:", m.organizations, m.orgCursor)
	case stateProjSelect:
		return progress + interactive.RenderListPrompt("Select project:", m.projects, m.projCursor)
	case stateCompSelect:
		return progress + interactive.RenderListPrompt("Select component:", m.components, m.compCursor)
	case stateNameInput:
		return progress + interactive.RenderInputPrompt("Enter deployment track name:", "", m.name, m.errorMsg)
	case stateDisplayNameInput:
		return progress + interactive.RenderInputPrompt("Enter display name (optional):", "", m.displayName, m.errorMsg)
	case stateDescriptionInput:
		return progress + interactive.RenderInputPrompt("Enter description (optional):", "", m.description, m.errorMsg)
	case stateAPIVersionInput:
		return progress + interactive.RenderInputPrompt("Enter API version:", "v1", m.apiVersion, m.errorMsg)
	case stateAutoDeployInput:
		return progress + interactive.RenderInputPrompt("Enable auto deploy? (y/n):", "n", "", m.errorMsg)
	case stateBuildTemplateInput:
		return progress + interactive.RenderInputPrompt("Enter build template (optional):", "", m.buildTemplate, m.errorMsg)
	}
	return ""
}

func createDeploymentTrackInteractive() error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}

	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := deploymentTrackModel{
		organizations: orgs,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(deploymentTrackModel)
	if !ok || !m.selected {
		return errors.NewError("deployment track creation cancelled")
	}

	return createDeploymentTrack(api.CreateDeploymentTrackParams{
		Name:         m.name,
		Organization: m.organizations[m.orgCursor],
		Project:      m.projects[m.projCursor],
		Component:    m.components[m.compCursor],
		DisplayName:  m.displayName,
		Description:  m.description,
		APIVersion:   m.apiVersion,
		AutoDeploy:   m.autoDeploy,
	})
}
