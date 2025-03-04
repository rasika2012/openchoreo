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

package login

import (
	"fmt"
	"os"

	tea "github.com/charmbracelet/bubbletea"
	"k8s.io/client-go/tools/clientcmd"

	"github.com/choreo-idp/choreo/internal/choreoctl/errors"
	"github.com/choreo-idp/choreo/internal/choreoctl/interactive"
	"github.com/choreo-idp/choreo/internal/choreoctl/util"
)

const (
	stateKubeconfigInput = iota
	stateContextSelect
)

type loginModel struct {
	state          int
	kubeconfigPath string
	contexts       []string
	cursor         int
	selected       bool
	errorMsg       string
}

func (m loginModel) Init() tea.Cmd {
	return nil
}

func (m loginModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	keyMsg, ok := msg.(tea.KeyMsg)
	if !ok {
		return m, nil
	}

	if interactive.IsQuitKey(keyMsg) {
		m.selected = false
		return m, tea.Quit
	}

	if m.state == stateKubeconfigInput {
		if interactive.IsEnterKey(keyMsg) {
			return m.handleKubeconfigSelection()
		}
		newPath, _ := interactive.EditTextInputField(keyMsg, m.kubeconfigPath, len(m.kubeconfigPath))
		m.kubeconfigPath = newPath
		m.errorMsg = ""
		return m, nil
	}

	if m.state == stateContextSelect {
		if interactive.IsEnterKey(keyMsg) {
			m.selected = true
			return m, tea.Quit
		}
		m.cursor = interactive.ProcessListCursor(keyMsg, m.cursor, len(m.contexts))
	}

	return m, nil
}

func (m loginModel) View() string {
	var defaultPath string
	var err error

	if m.state == stateKubeconfigInput {
		defaultPath, err = util.GetDefaultKubeconfigPath()
		if err != nil {
			m.errorMsg = fmt.Sprintf("failed to get default kubeconfig path: %v", err)
			defaultPath = ""
		}

		return interactive.RenderInputPrompt(
			"Enter kubeconfig path:",
			defaultPath,
			m.kubeconfigPath,
			m.errorMsg,
		)
	}

	if len(m.contexts) == 0 {
		return "No contexts found"
	}

	return interactive.RenderListPrompt(
		"Select context:",
		m.contexts,
		m.cursor,
	)
}

func (m loginModel) handleKubeconfigSelection() (tea.Model, tea.Cmd) {
	if _, err := os.Stat(m.kubeconfigPath); os.IsNotExist(err) {
		m.errorMsg = fmt.Sprintf("File does not exist: %s", m.kubeconfigPath)
		return m, nil
	}

	config, err := clientcmd.LoadFromFile(m.kubeconfigPath)
	if err != nil {
		m.errorMsg = "Failed to load kubeconfig: " + err.Error()
		return m, nil
	}

	m.contexts = util.GetKubeContextNames(config)
	if len(m.contexts) == 0 {
		m.errorMsg = fmt.Sprintf("No contexts found in kubeconfig: %s", m.kubeconfigPath)
		return m, nil
	}

	m.state = stateContextSelect
	m.cursor = 0
	return m, nil
}

func loginInteractive() error {
	kubeconfigPath, err := util.GetDefaultKubeconfigPath()
	if err != nil {
		return err
	}

	model := loginModel{
		state:          stateKubeconfigInput,
		kubeconfigPath: kubeconfigPath,
	}

	finalModel, err := interactive.RunInteractiveModel(model)
	if err != nil {
		return err
	}

	m, ok := finalModel.(loginModel)
	if !ok || !m.selected {
		return errors.NewError("login cancelled")
	}

	return performLogin(m.kubeconfigPath, m.contexts[m.cursor])
}
