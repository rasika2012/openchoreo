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
	"strings"

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

	var err error
	switch {
	case m.state <= stateCompSelect:
		m, err = m.handleResourceSelection(keyMsg)
	case m.state <= stateBuildpackVersionInput:
		m, err = m.handleBuildConfig(keyMsg)
	default:
		m = m.handlePathConfig(keyMsg)
	}

	if err != nil {
		m.errorMsg = err.Error()
		return m, nil
	}

	return m, nil
}

func (m buildModel) handleResourceSelection(keyMsg tea.KeyMsg) (buildModel, error) {
	switch m.state {
	case stateOrgSelect:
		if interactive.IsEnterKey(keyMsg) {
			projects, err := m.FetchProjects()
			if err != nil {
				return m, err
			}
			m.Projects = projects
			m.state = stateProjSelect
		} else {
			m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))
		}
	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			components, err := m.FetchComponents()
			if err != nil {
				return m, err
			}
			if len(components) == 0 {
				return m, fmt.Errorf("no components found in project '%s'. Please create a component first using 'choreoctl create component'", m.Projects[m.ProjCursor])
			}
			m.Components = components
			m.state = stateCompSelect
		} else {
			m.ProjCursor = interactive.ProcessListCursor(keyMsg, m.ProjCursor, len(m.Projects))
		}
	case stateCompSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateNameInput
		} else {
			m.CompCursor = interactive.ProcessListCursor(keyMsg, m.CompCursor, len(m.Components))
		}
	}
	return m, nil
}

func (m buildModel) handleBuildConfig(keyMsg tea.KeyMsg) (buildModel, error) {
	switch m.state {
	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateResourceName("build", m.name); err != nil {
				return m, err
			}
			builds, err := m.FetchBuildNames()
			if err != nil {
				return m, fmt.Errorf("failed to check build existence: %w", err)
			}
			for _, b := range builds {
				if b == m.name {
					return m, fmt.Errorf("build '%s' already exists in component '%s'", m.name, m.Components[m.CompCursor])
				}
			}
			m.state = stateBuildTypeSelect
		} else {
			m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))
		}
	case stateBuildTypeSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.buildType = m.buildTypes[m.buildCursor]
			if m.buildType == constants.Docker {
				m.state = stateDockerContextInput
			} else {
				m.state = stateBuildpackNameInput
			}
		} else {
			m.buildCursor = interactive.ProcessListCursor(keyMsg, m.buildCursor, len(m.buildTypes))
		}
	case stateBuildpackNameInput:
		if interactive.IsEnterKey(keyMsg) {
			m.buildpackName = m.buildpacks[m.buildpackCursor]
			m.buildpackVersions = choreov1.SupportedVersions[choreov1.BuildpackName(m.buildpackName)]
			if len(m.buildpackVersions) == 0 {
				return m, fmt.Errorf("no versions available for selected buildpack")
			}
			m.state = stateBuildpackVersionInput
		} else {
			m.buildpackCursor = interactive.ProcessListCursor(keyMsg, m.buildpackCursor, len(m.buildpacks))
		}
	case stateBuildpackVersionInput:
		if interactive.IsEnterKey(keyMsg) {
			m.buildpackVer = m.buildpackVersions[m.versionCursor]
			m.selected = true
			return m, nil
		} else {
			m.versionCursor = interactive.ProcessListCursor(keyMsg, m.versionCursor, len(m.buildpackVersions))
		}
	}
	return m, nil
}

func (m buildModel) handlePathConfig(keyMsg tea.KeyMsg) buildModel {
	switch m.state {
	case stateDockerContextInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateDockerfilePathInput
		} else {
			m.dockerContext, _ = interactive.EditTextInputField(keyMsg, m.dockerContext, len(m.dockerContext))
		}
	case stateDockerfilePathInput:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m
		} else {
			m.dockerFile, _ = interactive.EditTextInputField(keyMsg, m.dockerFile, len(m.dockerFile))
		}
	}
	return m
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
	baseModel, err := interactive.NewBaseModel()
	if err != nil {
		return err
	}

	model := buildModel{
		BaseModel:  *baseModel,
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
		if m.errorMsg != "" {
			return fmt.Errorf("%s", m.errorMsg)
		}
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

func (m buildModel) RenderProgress() string {
	var progress strings.Builder
	progress.WriteString("Selected inputs:\n")

	if len(m.Organizations) > 0 {
		progress.WriteString(fmt.Sprintf("- organization: %s\n", m.Organizations[m.OrgCursor]))
	}

	if len(m.Projects) > 0 {
		progress.WriteString(fmt.Sprintf("- project: %s\n", m.Projects[m.ProjCursor]))
	}

	if len(m.Components) > 0 {
		progress.WriteString(fmt.Sprintf("- component: %s\n", m.Components[m.CompCursor]))
	}

	if m.name != "" {
		progress.WriteString(fmt.Sprintf("- name: %s\n", m.name))
	}

	if m.buildType != "" {
		progress.WriteString(fmt.Sprintf("- build type: %s\n", m.buildType))

		// Show Docker configuration with defaults
		if m.buildType == constants.Docker {
			context := "/"
			if m.dockerContext != "" {
				context = m.dockerContext
			}
			dockerfile := "Dockerfile"
			if m.dockerFile != "" {
				dockerfile = m.dockerFile
			}
			progress.WriteString(fmt.Sprintf("- docker context: %s\n", context))
			progress.WriteString(fmt.Sprintf("- dockerfile path: %s\n", dockerfile))
		}

		// Show buildpack configuration
		if m.buildType == constants.Buildpack && m.buildpackName != "" {
			progress.WriteString(fmt.Sprintf("- buildpack: %s\n", m.buildpackName))
			if m.buildpackVer != "" {
				progress.WriteString(fmt.Sprintf("- buildpack version: %s\n", m.buildpackVer))
			}
		}
	}

	return progress.String()
}
