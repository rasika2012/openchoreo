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

package deployableartifact

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
	stateDeploymentTrackSelect
	stateNameInput
	stateBuildRefSelect
)

type deployableArtifactModel struct {
	interactive.BaseModel // Reuse common organization, project and component selection

	// Artifact-specific fields.
	tracks      []string
	builds      []string
	trackCursor int
	buildCursor int
	name        string
	selected    bool
	errorMsg    string
	state       int
}

func (m deployableArtifactModel) Init() tea.Cmd {
	return nil
}

func (m deployableArtifactModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}
	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	switch m.state {
	// Update organization selection using BaseModel.
	case stateOrgSelect:
		if interactive.IsEnterKey(keyMsg) {
			cmd := m.UpdateOrgSelect(keyMsg)
			if m.State == interactive.StateProjSelect {
				m.state = stateProjSelect
			}
			m.errorMsg = ""
			return m, cmd
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	// Update project selection via BaseModel helper
	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			cmd, err := m.UpdateProjSelect(keyMsg)
			if err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			// Explicitly set state after getting components
			m.state = stateCompSelect
			m.errorMsg = ""
			return m, cmd
		}
		m.ProjCursor = interactive.ProcessListCursor(keyMsg, m.ProjCursor, len(m.Projects))

	// Component selection state
	case stateCompSelect:
		if interactive.IsEnterKey(keyMsg) {
			tracks, err := util.GetDeploymentTrackNames(
				m.Organizations[m.OrgCursor],
				m.Projects[m.ProjCursor],
				m.Components[m.CompCursor],
			)
			if err != nil {
				m.errorMsg = fmt.Sprintf("Failed to fetch deployment tracks: %v", err)
				return m, nil
			}
			if len(tracks) == 0 {
				m.errorMsg = "No deployment tracks found. Please create a deployment track first using 'choreoctl create deploymenttrack'"
				// Don't quit - stay on the same screen to show the error
				return m, nil
			}
			m.tracks = tracks
			m.state = stateDeploymentTrackSelect
			m.errorMsg = ""
			return m, nil
		}
		m.CompCursor = interactive.ProcessListCursor(keyMsg, m.CompCursor, len(m.Components))

	// Deployment track selection state
	case stateDeploymentTrackSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.state = stateNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.trackCursor = interactive.ProcessListCursor(keyMsg, m.trackCursor, len(m.tracks))

	// Enter deployable artifact name.
	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			// Validate the artifact name.
			// if (err := util.ValidateResourceName("deployableartifact", m.name); err != nil) {
			// 	m.errorMsg = err.Error()
			// 	return m, nil
			// }
			// Fetch builds using BaseModel helper.
			builds, err := m.FetchBuildNames()
			if err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			if len(builds) == 0 {
				m.errorMsg = "No builds found. Please create a build first."
				return m, nil
			}
			m.builds = builds
			m.state = stateBuildRefSelect
			m.errorMsg = ""
			return m, nil
		}
		m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))

	// Select build reference.
	case stateBuildRefSelect:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.buildCursor = interactive.ProcessListCursor(keyMsg, m.buildCursor, len(m.builds))
	}

	return m, nil
}

func (m deployableArtifactModel) View() string {
	progress := m.RenderProgress()
	var view string
	switch m.state {
	case stateOrgSelect:
		view = m.RenderOrgSelection()
	case stateProjSelect:
		view = m.RenderProjSelection()
	case stateCompSelect:
		view = m.RenderComponentSelection()
	case stateDeploymentTrackSelect:
		view = m.RenderDeploymentTrackSelection()
	case stateNameInput:
		view = interactive.RenderInputPrompt("Enter deployable artifact name:", "", m.name, m.errorMsg)
	case stateBuildRefSelect:
		view = interactive.RenderListPrompt("Select build reference:", m.builds, m.buildCursor)
	default:
		view = ""
	}
	return progress + view
}

func createDeployableArtifactInteractive() error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}
	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	// Initialize the model with BaseModel.
	model := deployableArtifactModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
		state: stateOrgSelect,
	}

	// Run the interactive model.
	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(deployableArtifactModel)
	if !ok || !m.selected {
		return errors.NewError("deployable artifact creation cancelled")
	}

	// Build the parameters using the selected values.
	params := api.CreateDeployableArtifactParams{
		Name:            m.name,
		Organization:    m.Organizations[m.OrgCursor],
		Project:         m.Projects[m.ProjCursor],
		Component:       m.Components[m.CompCursor],
		DeploymentTrack: m.tracks[m.trackCursor],
	}

	return createDeployableArtifact(params)
}
