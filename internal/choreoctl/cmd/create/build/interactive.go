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

	choreov1 "github.com/wso2-enterprise/choreo-cp-declarative-api/api/v1"
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
	stateNameInput
	stateBuildTypeSelect
	stateDockerContextInput
	stateDockerfilePathInput
	stateBuildpackNameInput
	stateBuildpackVersionInput
)

type buildModel struct {
	state           int
	organizations   []string
	projects        []string
	components      []string
	buildTypes      []string
	buildpacks      []string
	orgCursor       int
	projCursor      int
	compCursor      int
	buildCursor     int
	buildpackCursor int
	name            string
	buildType       string
	dockerContext   string
	dockerFile      string
	buildpackName   string
	buildpackVer    string
	selected        bool
	errorMsg        string
}

func (m buildModel) Init() tea.Cmd {
	return nil
}

func (m buildModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
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
				return m, tea.Quit
			}
			if len(projects) == 0 {
				m.errorMsg = fmt.Sprintf("No projects found in organization '%s'. Please create a project first using 'choreoctl create project'",
					m.organizations[m.orgCursor])
				return m, tea.Quit
			}
			m.projects = projects
			m.state = stateProjSelect
			m.errorMsg = ""
			return m, nil
		}
		m.orgCursor = interactive.ProcessListCursor(keyMsg, m.orgCursor, len(m.organizations))

	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			components, err := util.GetComponentNames(
				m.organizations[m.orgCursor],
				m.projects[m.projCursor],
			)
			if err != nil {
				m.errorMsg = err.Error()
				return m, tea.Quit
			}

			if len(components) == 0 {
				m.errorMsg = fmt.Sprintf(
					"No components found in project '%s'. Please create a component first using 'choreoctl create component'",
					m.projects[m.projCursor],
				)
				return m, tea.Quit
			}

			m.components = components
			m.state = stateCompSelect
			m.errorMsg = ""
			return m, nil
		}

		// Simple cursor movement like component creation
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
			m.state = stateBuildTypeSelect
			m.errorMsg = ""
			return m, nil
		}
		m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))

	case stateBuildTypeSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.buildType = m.buildTypes[m.buildCursor]
			if m.buildType == constants.Docker {
				m.state = stateDockerContextInput
			} else {
				m.state = stateBuildpackNameInput
			}
			m.errorMsg = ""
			return m, nil
		}
		m.buildCursor = interactive.ProcessListCursor(keyMsg, m.buildCursor, len(m.buildTypes))

	case stateDockerContextInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateDockerfilePathInput
			m.errorMsg = ""
			return m, nil
		}
		m.dockerContext, _ = interactive.EditTextInputField(keyMsg, m.dockerContext, len(m.dockerContext))

	case stateDockerfilePathInput:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.dockerFile, _ = interactive.EditTextInputField(keyMsg, m.dockerFile, len(m.dockerFile))

	case stateBuildpackNameInput:
		if interactive.IsEnterKey(keyMsg) {
			m.buildpackName = m.buildpacks[m.buildpackCursor]
			m.state = stateBuildpackVersionInput
			m.errorMsg = ""
			return m, nil
		}
		m.buildpackCursor = interactive.ProcessListCursor(keyMsg, m.buildpackCursor, len(m.buildpacks))

	case stateBuildpackVersionInput:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.buildpackVer, _ = interactive.EditTextInputField(keyMsg, m.buildpackVer, len(m.buildpackVer))
	}

	return m, nil
}

func (m buildModel) View() string {
	if m.errorMsg != "" {
		return m.errorMsg + "\n"
	}
	progress := ""
	if m.state > stateOrgSelect && m.orgCursor < len(m.organizations) {
		progress += fmt.Sprintf("Organization: %s\n", m.organizations[m.orgCursor])
	}
	if m.state > stateProjSelect && m.projCursor < len(m.projects) {
		progress += fmt.Sprintf("Project: %s\n", m.projects[m.projCursor])
	}
	if m.state > stateCompSelect && m.compCursor < len(m.components) {
		progress += fmt.Sprintf("Component: %s\n", m.components[m.compCursor])
	}
	if m.state > stateNameInput && m.name != "" {
		progress += fmt.Sprintf("Build Name: %s\n", m.name)
	}
	if m.state > stateBuildTypeSelect && m.buildType != "" {
		progress += fmt.Sprintf("Build Type: %s\n", m.buildType)

		if m.buildType == constants.Docker {
			if m.state > stateDockerContextInput && m.dockerContext != "" {
				progress += fmt.Sprintf("Docker Context: %s\n", m.dockerContext)
			}
			if m.state > stateDockerfilePathInput && m.dockerFile != "" {
				progress += fmt.Sprintf("Dockerfile Path: %s\n", m.dockerFile)
			}
		} else {
			if m.state > stateBuildpackNameInput && m.buildpackName != "" {
				progress += fmt.Sprintf("Buildpack: %s\n", m.buildpackName)
			}
			if m.state > stateBuildpackVersionInput && m.buildpackVer != "" {
				progress += fmt.Sprintf("Version: %s\n", m.buildpackVer)
			}
		}
	}
	progress += "\n"

	switch m.state {
	case stateOrgSelect:
		return progress + interactive.RenderListPrompt(
			"Select organization:",
			m.organizations,
			m.orgCursor,
		)

	case stateProjSelect:
		return progress + interactive.RenderListPrompt(
			"Select project:",
			m.projects,
			m.projCursor,
		)

	case stateCompSelect:
		return progress + interactive.RenderListPrompt(
			"Select component:",
			m.components,
			m.compCursor,
		)

	case stateNameInput:
		return progress + interactive.RenderInputPrompt(
			"Enter build name:",
			"",
			m.name,
			m.errorMsg,
		)

	case stateBuildTypeSelect:
		return progress + interactive.RenderListPrompt(
			"Select build type:",
			m.buildTypes,
			m.buildCursor,
		)

	case stateDockerContextInput:
		return progress + interactive.RenderInputPrompt(
			"Enter Docker context path:",
			"/",
			m.dockerContext,
			m.errorMsg,
		)

	case stateDockerfilePathInput:
		return progress + interactive.RenderInputPrompt(
			"Enter Dockerfile path:",
			"Dockerfile",
			m.dockerFile,
			m.errorMsg,
		)

	case stateBuildpackNameInput:
		return progress + interactive.RenderListPrompt(
			"Select buildpack type:",
			m.buildpacks,
			m.buildpackCursor,
		)

	case stateBuildpackVersionInput:
		return progress + interactive.RenderInputPrompt(
			"Enter buildpack version:",
			"",
			m.buildpackVer,
			m.errorMsg,
		)
	}
	return ""
}

func createBuildInteractive() error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return err
	}

	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := buildModel{
		state:         stateOrgSelect,
		organizations: orgs,
		buildTypes:    []string{constants.Docker, constants.Buildpack},
		buildpacks: func() []string {
			keys := make([]string, 0, len(choreov1.SupportedVersions))
			for k := range choreov1.SupportedVersions {
				keys = append(keys, string(k))
			}
			return keys
		}(),
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(buildModel)
	if !ok || !m.selected {
		return errors.NewError("build creation cancelled")
	}

	params := api.CreateBuildParams{
		Organization: m.organizations[m.orgCursor],
		Project:      m.projects[m.projCursor],
		Component:    m.components[m.compCursor],
		Name:         m.name,
	}

	if m.buildType == constants.Docker {
		params.Docker = &choreov1.DockerConfiguration{
			Context:        m.dockerContext,
			DockerfilePath: m.dockerFile,
		}
	} else {
		params.Buildpack = &choreov1.BuildpackConfiguration{
			Name:    choreov1.BuildpackName(m.buildpackName),
			Version: m.buildpackVer,
		}
	}

	return createBuild(params)
}
