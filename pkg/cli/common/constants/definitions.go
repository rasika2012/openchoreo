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

package constants

import (
	"fmt"

	"github.com/wso2-enterprise/choreo-cp-declarative-api/pkg/cli/common/messages"
)

type Command struct {
	Use     string
	Aliases []string
	Short   string
	Long    string
}

var (
	Login = Command{
		Use:   "login",
		Short: "Login to Choreo",
		Long:  "Login to Choreo using your kubeconfig file's context.",
	}

	Logout = Command{
		Use:   "logout",
		Short: "Logout from Choreo",
	}

	Create = Command{
		Use:   "create",
		Short: "Create resources like organizations, projects, components, etc.",
		Long: fmt.Sprintf(`Create Choreo resources like organizations, projects, and components.

Examples:
  # Create an organization interactively
  %[1]s create org

  # Create a project in an organization
  %[1]s create project --organization myorg --name myproject

  # Create a component in a project
  %[1]s create component --organization myorg --project myproject --name mycomponent --url https://github.com/org/repo`,
			messages.DefaultCLIName),
	}

	List = Command{
		Use:   "list",
		Short: "List resources like organizations, projects, components, etc.",
		Long: fmt.Sprintf(`List Choreo resources like organizations, projects, and components.

Examples:
  # List all organizations
  %[1]s list org

  # List projects in an organization
  %[1]s list project --organization myorg

  # List components in a project
  %[1]s list component --organization myorg --project myproject

  # Get YAML output
  %[1]s list org -o yaml`,
			messages.DefaultCLIName),
	}

	Apply = Command{
		Use:   "apply",
		Short: "Apply a configuration to a resource by file name",
		Long: fmt.Sprintf(`Apply a configuration file to create or update Choreo resources.

	Examples:
	  # Apply an organization configuration
	  %[1]s apply -f organization.yaml`,
			messages.DefaultCLIName),
	}

	CreateProject = Command{
		Use:     "project",
		Aliases: []string{"proj", "projects"},
		Short:   "Create a project",
		Long: fmt.Sprintf(`Create a new project in an organization.

Examples:
  # Create a project interactively
  %[1]s create project

  # Create a project in a specific organization
  %[1]s create project --organization myorg --name myproject`,
			messages.DefaultCLIName),
	}

	CreateComponent = Command{
		Use:     "component",
		Aliases: []string{"comp", "components"},
		Short:   "Create a component",
	}

	CreateOrganization = Command{
		Use:     "organization",
		Aliases: []string{"org", "orgs"},
		Short:   "Create an organization",
		Long: fmt.Sprintf(`Create a new organization in Choreo.

Examples:
  # Create an organization interactively
  %[1]s create org

  # Create an organization with specific details
  %[1]s create org --name myorg --display-name "My Organization" --description "My organization description"`,
			messages.DefaultCLIName),
	}

	ListOrganization = Command{
		Use:     "organization",
		Aliases: []string{"org", "orgs"},
		Short:   "List organizations",
		Long: fmt.Sprintf(`List all organizations or get details of a specific organization.

Examples:
  # List all organizations
  %[1]s list org

  # List a specific organization
  %[1]s list org myorg

  # Output organization details in YAML format
  %[1]s list org -o yaml

  # Output specific organization in YAML format
  %[1]s list org myorg -o yaml`,
			messages.DefaultCLIName),
	}

	ListProject = Command{
		Use:     "project",
		Aliases: []string{"proj", "projects"},
		Short:   "List projects",
		Long: fmt.Sprintf(`List all projects in an organization or get details of a specific project.

Examples:
  # List all projects in the current organization
  %[1]s list project

  # List all projects in a specific organization
  %[1]s list project --organization myorg

  # List a specific project
  %[1]s list project myproject --organization myorg

  # Output project details in YAML format
  %[1]s list project -o yaml --organization myorg

  # Output specific project in YAML format
  %[1]s list project myproject -o yaml --organization myorg`,
			messages.DefaultCLIName),
	}

	ListComponent = Command{
		Use:     "component",
		Aliases: []string{"comp", "components"},
		Short:   "List components",
		Long: fmt.Sprintf(`List all components in a project or get details of a specific component.

Examples:
  # List all components in the current project
  %[1]s list component --organization myorg --project myproject

  # List a specific component
  %[1]s list component mycomponent --organization myorg --project myproject

  # Output component details in YAML format
  %[1]s list component -o yaml --organization myorg --project myproject

  # Output specific component in YAML format
  %[1]s list component mycomponent -o yaml --organization myorg --project myproject`,
			messages.DefaultCLIName),
	}

	Logs = Command{
		Use:   "logs",
		Short: "Get logs from a pod",
		Long:  "Get logs from a pod in the current namespace.",
	}
)
