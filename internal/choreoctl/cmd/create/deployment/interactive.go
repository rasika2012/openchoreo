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

package deployment

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
	stateEnvSelect
	stateDeployArtifactSelect
	stateNameInput
)

type deploymentModel struct {
	interactive.BaseModel // Reuse common organization, project, and component selection

	environments        []string
	deployableArtifacts []string

	envCursor      int
	artifactCursor int

	name     string
	selected bool
	errorMsg string
	state    int
}

func (m deploymentModel) Init() tea.Cmd {
	return nil
}

func (m deploymentModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}

	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	switch m.state {
	// Use BaseModel helper to select the Organization.
	case stateOrgSelect:
		if interactive.IsEnterKey(keyMsg) {
			cmd := m.UpdateOrgSelect(keyMsg)
			// If BaseModel sets state to project selection, update local state.
			if m.State == interactive.StateProjSelect {
				m.state = stateProjSelect
			}
			m.errorMsg = ""
			return m, cmd
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	// Use BaseModel helper to select the Project.
	case stateProjSelect:
		if interactive.IsEnterKey(keyMsg) {
			cmd, err := m.UpdateProjSelect(keyMsg)
			if err != nil {
				m.errorMsg = err.Error()
				return m, tea.Quit
			}
			// Transition to component selection.
			m.state = stateCompSelect
			m.errorMsg = ""
			return m, cmd
		}
		m.ProjCursor = interactive.ProcessListCursor(keyMsg, m.ProjCursor, len(m.Projects))

	// Use BaseModel helper to select the Component.
	case stateCompSelect:
		if interactive.IsEnterKey(keyMsg) {
			// After component selection, fetch environments for the organization
			environments, err := m.FetchEnvironments() // Using BaseModel's FetchEnvironments
			if err != nil {
				m.errorMsg = fmt.Sprintf("Failed to fetch environments: %v", err)
				return m, nil
			}
			// Missing component selection validation before fetching environments
			if m.CompCursor >= len(m.Components) {
				m.errorMsg = "Invalid component selection"
				return m, nil
			}
			if len(environments) == 0 {
				m.errorMsg = fmt.Sprintf("No environments found for organization: %s", m.Organizations[m.OrgCursor])
				return m, nil
			}

			// Store environments in the model
			m.environments = environments
			m.state = stateEnvSelect
			m.errorMsg = ""
			return m, nil
		}
		m.CompCursor = interactive.ProcessListCursor(keyMsg, m.CompCursor, len(m.Components))

	// Select the Environment.
	case stateEnvSelect:
		if interactive.IsEnterKey(keyMsg) {
			// Validate environment selection
			if m.envCursor >= len(m.environments) {
				m.errorMsg = "Invalid environment selection"
				return m, nil
			}

			// When environment is selected, fetch deployable artifacts.
			artifacts, err := util.GetDeployableArtifactNames(
				m.Organizations[m.OrgCursor],
				m.Projects[m.ProjCursor],
				m.Components[m.CompCursor],
			)
			if err != nil {
				m.errorMsg = fmt.Sprintf("Failed to fetch deployable artifacts: %v", err)
				return m, nil
			}
			if len(artifacts) == 0 {
				m.errorMsg = "No deployable artifacts found. Please create one first using 'choreoctl create deployableartifact'"
				return m, nil
			}
			m.deployableArtifacts = artifacts
			m.state = stateDeployArtifactSelect
			m.errorMsg = ""
			return m, nil
		}
		m.envCursor = interactive.ProcessListCursor(keyMsg, m.envCursor, len(m.environments))

	// Select the Deployable Artifact.
	case stateDeployArtifactSelect:
		if interactive.IsEnterKey(keyMsg) {
			if m.artifactCursor >= len(m.deployableArtifacts) {
				m.errorMsg = "Invalid deployable artifact selection"
				return m, nil
			}
			m.state = stateNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.artifactCursor = interactive.ProcessListCursor(keyMsg, m.artifactCursor, len(m.deployableArtifacts))

	// Enter the Deployment name.
	case stateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			if err := util.ValidateResourceName("deployment", m.name); err != nil {
				m.errorMsg = err.Error()
				return m, nil
			}
			m.selected = true
			return m, tea.Quit
		}
		m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))
	}

	return m, nil
}

func (m deploymentModel) View() string {
	progress := m.RenderProgress()
	var view string

	switch m.state {
	case stateOrgSelect:
		view = m.RenderOrgSelection()
	case stateProjSelect:
		view = m.RenderProjSelection()
	case stateCompSelect:
		view = m.RenderComponentSelection()
	case stateEnvSelect:
		view = interactive.RenderListPrompt("Select environment:", m.environments, m.envCursor)
	case stateDeployArtifactSelect:
		view = m.RenderDeployableArtifactSelection()
	case stateNameInput:
		view = interactive.RenderInputPrompt("Enter deployment name:", "", m.name, m.errorMsg)
	default:
		view = ""
	}

	if m.errorMsg != "" {
		view += "\nError: " + m.errorMsg
	}

	return progress + view
}

func createDeploymentInteractive() error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return errors.NewError("failed to get organizations: %v", err)
	}
	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	// Initialize the model with BaseModel.
	model := deploymentModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
		state: stateOrgSelect,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(deploymentModel)
	if !ok || !m.selected {
		return errors.NewError("deployment creation cancelled")
	}

	// Build the deployment parameters.
	params := api.CreateDeploymentParams{
		Organization:       m.Organizations[m.OrgCursor],
		Project:            m.Projects[m.ProjCursor],
		Component:          m.Components[m.CompCursor],
		Environment:        m.environments[m.envCursor],
		DeployableArtifact: m.deployableArtifacts[m.artifactCursor],
		Name:               m.name,
	}

	return createDeployment(params)
}
