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
	"fmt"

	tea "github.com/charmbracelet/bubbletea"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/errors"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/interactive"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/internal/choreoctl/util"
	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/types/api"
)

const (
	dpStateOrgSelect = iota
	dpStateNameInput
	dpStateDisplayNameInput
	dpStateDescriptionInput
	dpStateKubeClusterInput
	dpStateConnConfigInput
	dpStateCiliumInput
	dpStateScaleToZeroInput
	dpStateGatewayTypeInput
	dpStatePublicVirtualHostInput
	dpStateOrgVirtualHostInput
)

type dataPlaneModel struct {
	interactive.BaseModel // Reuse organization (and optionally project) selection

	// DataPlane-specific fields.
	name                  string
	displayName           string
	description           string
	kubernetesClusterName string
	connectionConfigRef   string
	enableCilium          bool
	enableScaleToZero     bool
	gatewayType           string
	publicVirtualHost     string
	orgVirtualHost        string

	selected bool
	errorMsg string
	state    int
}

func (m dataPlaneModel) Init() tea.Cmd {
	return nil
}

func (m dataPlaneModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}

	// Allow quitting at any state.
	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	switch m.state {
	case dpStateOrgSelect:
		// Use BaseModel's Org selection helper.
		if interactive.IsEnterKey(keyMsg) {
			cmd := m.UpdateOrgSelect(keyMsg)
			// When BaseModel sets state to project selection,
			// for dataplane we transition to the name input.
			if m.State == interactive.StateProjSelect {
				m.state = dpStateNameInput
			}
			m.errorMsg = ""
			return m, cmd
		}
		m.OrgCursor = interactive.ProcessListCursor(keyMsg, m.OrgCursor, len(m.Organizations))

	case dpStateNameInput:
		if interactive.IsEnterKey(keyMsg) {
			// (Validation can be added here.)
			m.state = dpStateDisplayNameInput
			m.errorMsg = ""
			return m, nil
		}
		m.name, _ = interactive.EditTextInputField(keyMsg, m.name, len(m.name))

	case dpStateDisplayNameInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = dpStateDescriptionInput
			m.errorMsg = ""
			return m, nil
		}
		m.displayName, _ = interactive.EditTextInputField(keyMsg, m.displayName, len(m.displayName))

	case dpStateDescriptionInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = dpStateKubeClusterInput
			m.errorMsg = ""
			return m, nil
		}
		m.description, _ = interactive.EditTextInputField(keyMsg, m.description, len(m.description))

	case dpStateKubeClusterInput:
		if interactive.IsEnterKey(keyMsg) {
			// Optionally validate Kubernetes cluster name.
			m.state = dpStateConnConfigInput
			m.errorMsg = ""
			return m, nil
		}
		m.kubernetesClusterName, _ = interactive.EditTextInputField(keyMsg, m.kubernetesClusterName, len(m.kubernetesClusterName))

	case dpStateConnConfigInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = dpStateCiliumInput
			m.errorMsg = ""
			return m, nil
		}
		m.connectionConfigRef, _ = interactive.EditTextInputField(keyMsg, m.connectionConfigRef, len(m.connectionConfigRef))

	case dpStateCiliumInput:
		// Toggle flag with space key.
		if keyMsg.String() == " " {
			m.enableCilium = !m.enableCilium
			return m, nil
		}
		if interactive.IsEnterKey(keyMsg) {
			m.state = dpStateScaleToZeroInput
			m.errorMsg = ""
			return m, nil
		}

	case dpStateScaleToZeroInput:
		// Toggle flag with space key.
		if keyMsg.String() == " " {
			m.enableScaleToZero = !m.enableScaleToZero
			return m, nil
		}
		if interactive.IsEnterKey(keyMsg) {
			m.state = dpStateGatewayTypeInput
			m.errorMsg = ""
			return m, nil
		}

	case dpStateGatewayTypeInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = dpStatePublicVirtualHostInput
			m.errorMsg = ""
			return m, nil
		}
		m.gatewayType, _ = interactive.EditTextInputField(keyMsg, m.gatewayType, len(m.gatewayType))

	case dpStatePublicVirtualHostInput:
		if interactive.IsEnterKey(keyMsg) {
			m.state = dpStateOrgVirtualHostInput
			m.errorMsg = ""
			return m, nil
		}
		m.publicVirtualHost, _ = interactive.EditTextInputField(keyMsg, m.publicVirtualHost, len(m.publicVirtualHost))

	case dpStateOrgVirtualHostInput:
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			m.errorMsg = ""
			return m, tea.Quit
		}
		m.orgVirtualHost, _ = interactive.EditTextInputField(keyMsg, m.orgVirtualHost, len(m.orgVirtualHost))
	}

	return m, nil
}

func (m dataPlaneModel) View() string {
	progress := m.RenderProgress()
	var view string
	switch m.state {
	case dpStateOrgSelect:
		view = m.RenderOrgSelection()
	case dpStateNameInput:
		view = interactive.RenderInputPrompt("Enter data plane name:", "", m.name, m.errorMsg)
	case dpStateDisplayNameInput:
		view = interactive.RenderInputPrompt("Enter display name:", "", m.displayName, m.errorMsg)
	case dpStateDescriptionInput:
		view = interactive.RenderInputPrompt("Enter description:", "", m.description, m.errorMsg)
	case dpStateKubeClusterInput:
		view = interactive.RenderInputPrompt("Enter Kubernetes cluster name:", "", m.kubernetesClusterName, m.errorMsg)
	case dpStateConnConfigInput:
		view = interactive.RenderInputPrompt("Enter connection config ref:", "", m.connectionConfigRef, m.errorMsg)
	case dpStateCiliumInput:
		view = interactive.RenderInputPrompt("Enable Cilium (press space to toggle):", "", fmt.Sprintf("%v", m.enableCilium), m.errorMsg)
	case dpStateScaleToZeroInput:
		view = interactive.RenderInputPrompt("Enable ScaleToZero (press space to toggle):", "", fmt.Sprintf("%v", m.enableScaleToZero), m.errorMsg)
	case dpStateGatewayTypeInput:
		view = interactive.RenderInputPrompt("Enter gateway type:", "", m.gatewayType, m.errorMsg)
	case dpStatePublicVirtualHostInput:
		view = interactive.RenderInputPrompt("Enter public virtual host:", "", m.publicVirtualHost, m.errorMsg)
	case dpStateOrgVirtualHostInput:
		view = interactive.RenderInputPrompt("Enter organization virtual host:", "", m.orgVirtualHost, m.errorMsg)
	default:
		view = ""
	}
	return progress + view
}

func createDataPlaneInteractive() error {
	orgs, err := util.GetOrganizationNames()
	if err != nil {
		return err
	}
	if len(orgs) == 0 {
		return errors.NewError("no organizations found")
	}

	model := dataPlaneModel{
		BaseModel: interactive.BaseModel{
			Organizations: orgs,
		},
		state: dpStateOrgSelect,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return errors.NewError("interactive mode failed: %v", err)
	}

	m, ok := finalModel.(dataPlaneModel)
	if !ok || !m.selected {
		return errors.NewError("data plane creation cancelled")
	}

	params := api.CreateDataPlaneParams{
		Organization:            m.Organizations[m.OrgCursor],
		Name:                    m.name,
		DisplayName:             m.displayName,
		Description:             m.description,
		KubernetesClusterName:   m.kubernetesClusterName,
		ConnectionConfigRef:     m.connectionConfigRef,
		EnableCilium:            m.enableCilium,
		EnableScaleToZero:       m.enableScaleToZero,
		GatewayType:             m.gatewayType,
		PublicVirtualHost:       m.publicVirtualHost,
		OrganizationVirtualHost: m.orgVirtualHost,
	}

	return createDataPlane(params)
}
