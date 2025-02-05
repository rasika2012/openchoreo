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

// Package interactive provides interactive command line interface utilities.
package interactive

import (
	"fmt"

	tea "github.com/charmbracelet/bubbletea"
)

// RunInteractiveModel starts a Bubble Tea program with the given model
// and returns the final model state after program completion.
// It handles program initialization, running, and cleanup.
func RunInteractiveModel(model tea.Model) (tea.Model, error) {
	p := tea.NewProgram(model)
	return p.Run()
}

// RenderInputPrompt formats and returns a text input prompt with optional
// default value and error message. The prompt includes the current input
// text and any validation errors.
func RenderInputPrompt(prompt, defaultText, currentText, errorMsg string) string {
	out := prompt
	if defaultText != "" {
		out += fmt.Sprintf(" (default: %s)", defaultText)
	}
	out += fmt.Sprintf("\n> %s", currentText)
	if errorMsg != "" {
		out += fmt.Sprintf("\nError: %s", errorMsg)
	}
	return out + "\n"
}

// RenderListPrompt returns a simple list selection prompt.
func RenderListPrompt(header string, items []string, cursor int) string {
	out := header + "\n"
	for i, item := range items {
		prefix := "   "
		if i == cursor {
			prefix = "> "
		}
		out += fmt.Sprintf("%s%s\n", prefix, item)
	}
	out += "\nUse arrow keys to navigate and press [enter] to select."
	return out
}

// EditTextInputField processes a key press to edit the current input string.
// This function allows the user to type new characters, move the cursor left/right,
// delete characters, and correct the input as needed.
// It returns the updated input string and the new cursor position.
func EditTextInputField(msg tea.KeyMsg, input string, cursor int) (string, int) {
	switch msg.String() {
	case "left", "←":
		if cursor > 0 {
			cursor--
		}
	case "right", "→":
		if cursor < len(input) {
			cursor++
		}
	case "backspace", "delete":
		if cursor > 0 && len(input) > 0 {
			input = input[:cursor-1] + input[cursor:]
			cursor--
		}
	default:
		// For any other key, insert its string value.
		s := msg.String()
		if s != "" {
			input = input[:cursor] + s + input[cursor:]
			cursor += len(s)
		}
	}
	return input, cursor
}

// ProcessListCursor updates the cursor position based on navigation keys.
func ProcessListCursor(msg tea.KeyMsg, cursor, listLength int) int {
	switch msg.String() {
	case "j", "down":
		if cursor < listLength-1 {
			cursor++
		}
	case "k", "up":
		if cursor > 0 {
			cursor--
		}
	}
	return cursor
}

// IsQuitKey returns true if the key indicates a quit action.
func IsQuitKey(msg tea.KeyMsg) bool {
	k := msg.String()
	return k == "ctrl+c" || k == "esc"
}

// IsLeftKey returns true if the message represents a left navigation key.
func IsLeftKey(msg tea.KeyMsg) bool {
	k := msg.String()
	return k == "left" || k == "←"
}

// IsRightKey returns true if the message represents a right navigation key.
func IsRightKey(msg tea.KeyMsg) bool {
	k := msg.String()
	return k == "right" || k == "→"
}

// IsUpKey returns true if the message represents an upward navigation key.
func IsUpKey(msg tea.KeyMsg) bool {
	k := msg.String()
	return k == "up" || k == "k"
}

// IsDownKey returns true if the message represents a downward navigation key.
func IsDownKey(msg tea.KeyMsg) bool {
	k := msg.String()
	return k == "down" || k == "j"
}

// IsEnterKey returns true if the message represents the enter key.
func IsEnterKey(msg tea.KeyMsg) bool {
	return msg.String() == "enter"
}
