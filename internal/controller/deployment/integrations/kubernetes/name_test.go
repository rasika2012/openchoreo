/*
 * Copyright (c) 2025, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
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
