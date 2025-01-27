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

package kubernetes

import (
	"fmt"
	"strings"
	"testing"
)

func TestGenerateK8sName(t *testing.T) {
	tests := []struct {
		name    string
		input   []string
		want    string
		wantLen int
	}{
		{
			name:    "normal-names",
			input:   []string{"project", "component"},
			want:    "project-component-932d1646",
			wantLen: 26,
		},
		{
			name:  "names-with-special-characters",
			input: []string{"My_Project$", "Component@Name"},
			want:  "my-project-component-name-40314333",
		},
		{
			name:    "very-long-names",
			input:   []string{strings.Repeat("a", 300), "component"},
			want:    fmt.Sprintf("%s-component-a250aee3", strings.Repeat("a", 122)),
			wantLen: 141,
		},
		{
			name:  "names-starting-ending-with-invalid-characters",
			input: []string{"-invalid-start", "invalid-end-"},
			want:  "invalid-start-invalid-end-f124257d",
		},
		{
			name:  "empty-names",
			input: []string{"", ""},
			want:  "3973e022", // Only the hash will be generated
		},
		{
			name:  "names-with-only-invalid-characters",
			input: []string{"!!!", "###"},
			want:  "606b424e",
		},
		{
			name:    "name-exceeding-max-length-after-sanitization",
			input:   []string{strings.Repeat("a", 260), strings.Repeat("b", 260)},
			want:    fmt.Sprintf("%s-%s-654ba7cd", strings.Repeat("a", 122), strings.Repeat("b", 121)),
			wantLen: 253,
		},
		{
			name:  "names-with-uppercase-letters",
			input: []string{"ProjectName", "ComponentName"},
			want:  "projectname-componentname-755d4ced",
		},
		{
			name:  "names-with-dots",
			input: []string{"project.name", "component.name"},
			want:  "project.name-component.name-851db5b2",
		},
		{
			name:  "names-with-underscores-and-spaces",
			input: []string{"project_name with spaces", "component_name"},
			want:  "project-name-with-spaces-component-name-101f1326",
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := GenerateK8sName(test.input...)

			if test.want != got {
				t.Errorf("Incorrect name, want '%s', got '%s'", test.want, got)
			}

			if test.wantLen > 0 && len(got) != test.wantLen {
				t.Errorf("Incorrect length, want %d, got %d", test.wantLen, len(got))
			}
		})
	}
}
