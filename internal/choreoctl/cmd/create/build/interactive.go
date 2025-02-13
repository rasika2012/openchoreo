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
	interactive.BaseModel // Embeds common fields:
	// Organizations, OrgCursor, Projects, ProjCursor, Components, CompCursor

	// Build-specific fields.
	buildTypes        []string
	buildpacks        []string
	buildpackVersions []string

	// Cursors for selections.
	buildCursor     int
	buildpackCursor int
	versionCursor   int

	// Build details.
	name          string
	buildType     string
	dockerContext string
	dockerFile    string
	buildpackName string
	buildpackVer  string

	selected bool
	errorMsg string
	state    int
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
			// Delegate organization selection to BaseModel helper.
			cmd := m.UpdateOrgSelect(keyMsg)

			// Transition to project selection.
			m.state = stateProjSelect
			m.errorMsg = ""
			return m, cmd
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			comps, err := util.GetComponentNames(
				m.Organizations[m.OrgCursor],
				m.Projects[m.ProjCursor],
			)
			if err != nil {
				m.errorMsg = "Failed to fetch components: " + err.Error()
				return m, nil
			}
			if len(comps) == 0 {
				m.errorMsg = "No components found in this project"
				return m, nil
			}
			// Store the components in the BaseModel field and move to component selection.
			m.Components = comps
			m.state = stateCompSelect
			return m, nil
		}
		// Move the cursor if Up/Down arrow is pressed.
		m.ProjCursor = interactive.ProcessListCursor(keyMsg, m.ProjCursor, len(m.Projects))

	case stateCompSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.CompCursor = interactive.ProcessListCursor(keyMsg, m.CompCursor, len(m.Components))

	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateResourceName("build", m.name); err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
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
			// Fetch available versions for the selected buildpack.
			m.buildpackVersions = choreov1.SupportedVersions[choreov1.BuildpackName(m.buildpackName)]
			if len(m.buildpackVersions) == 0 {
				m.errorMsg = "No versions available for selected buildpack"
				return m, nil
			}
			m.state = stateBuildpackVersionInput
			m.errorMsg = ""
			return m, nil
		}
		m.buildpackCursor = interactive.ProcessListCursor(keyMsg, m.buildpackCursor, len(m.buildpacks))

	case stateBuildpackVersionInput:
		if interactive.IsEnterKey(keyMsg) {
			m.buildpackVer = m.buildpackVersions[m.versionCursor]
			m.selected = true
			return m, tea.Quit
		}
		m.versionCursor = interactive.ProcessListCursor(keyMsg, m.versionCursor, len(m.buildpackVersions))
	}

	return m, nil
}

func (m buildModel) View() string {
	progress := m.RenderProgress()
	switch m.state {
	case stateOrgSelect:
		return progress + m.RenderOrgSelection()
	case stateProjSelect:
		return progress + m.RenderProjSelection()
	case stateCompSelect:
		return progress + m.RenderComponentSelection()
	case stateNameInput:
		return progress + interactive.RenderInputPrompt("Enter build name:", "", m.name, m.errorMsg)
	case stateBuildTypeSelect:
		return progress + interactive.RenderListPrompt("Select build type:", m.buildTypes, m.buildCursor)
	case stateDockerContextInput:
		return progress + interactive.RenderInputPrompt("Enter Docker context path:", "/", m.dockerContext, m.errorMsg)
	case stateDockerfilePathInput:
		return progress + interactive.RenderInputPrompt("Enter Dockerfile path:", "Dockerfile", m.dockerFile, m.errorMsg)
	case stateBuildpackNameInput:
		return progress + interactive.RenderListPrompt("Select buildpack type:", m.buildpacks, m.buildpackCursor)
	case stateBuildpackVersionInput:
		return progress + interactive.RenderListPrompt("Select buildpack version:", m.buildpackVersions, m.versionCursor)
	}
	return progress
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
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
		state:      stateOrgSelect,
		buildTypes: []string{constants.Docker, constants.Buildpack},
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
		Organization: m.Organizations[m.OrgCursor],
		Project:      m.Projects[m.ProjCursor],
		Component:    m.Components[m.CompCursor],
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
