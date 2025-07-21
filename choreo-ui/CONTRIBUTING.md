# Contributing Guidelines

Welcome to the Open Choreo UI project! This guide will help you understand how to contribute to the project, especially around plugin development.

## Prerequisites

Before you start, make sure you have:
- Node.js 18.20.3+ or 20.14.0+ (LTS versions)
- pnpm package manager
- Rush CLI installed globally: `npm install -g @microsoft/rush`

## Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd choreo-ui

# Install dependencies
rush update --purge

# Build all packages
rush build
```

# Plugin Development

## Overview

Open Choreo uses a plugin-based architecture where functionality is distributed across independent modules. Each plugin can provide multiple extensions that integrate with specific extension points in the application.

## Plugin

A plugin is a conceptual set of extensions that work together to provide a cohesive feature set.

### Plugin Manifest

The plugin manifest contains metadata and the entry point of the plugin. It defines:
- Plugin name and description
- List of extensions provided by the plugin

```typescript
interface PluginManifest {
  name: string;
  description: string;
  extensions: PluginExtension[];
}
```

## Extension

An extension is a piece of functionality that integrates with the application at specific extension points.

### Extension Types

There are four types of extensions:

1. **NAVIGATION**: Adds navigation items to sidebars
2. **ROUTE**: Provides route components for specific paths
3. **PANEL**: Adds UI components to designated panel areas
4. **PROVIDER**: Provides React context providers

### Extension Manifest

Extensions contain metadata and entry points, including:
- Extension point where it should be mounted or executed
- Component to render or function to be executed
- Additional metadata (like paths for navigation)

## Extension Mount Points/Extension Execution Points

Extension mount points are predefined places in the application where extensions can be loaded. The available core extension points are:

### Route Extension Points
- `globalPage`: Global application pages
- `componentLevelPage`: Component-level pages
- `projectLevelPage`: Project-level pages  
- `orgLevelPage`: Organization-level pages

### Panel Extension Points
- `headerLeft`: Left side of the header
- `headerRight`: Right side of the header
- `sidebarRight`: Right sidebar
- `footer`: Application footer

### Navigation Extension Points
- `componentNavigation`: Component-level navigation
- `projectNavigation`: Project-level navigation
- `orgNavigation`: Organization-level navigation

### Provider Extension Points
- `globalProvider`: Global context providers

# Create Your First Plugin

## Quick Start

The easiest way to create a plugin is using the built-in Rush command:

```bash
rush create-plugin -n YourPluginName
```

This command will:
1. Create the complete plugin directory structure
2. Generate all necessary configuration files
3. Create template files for your plugin
4. Update `rush.json` to include your plugin
5. Set up TypeScript and ESLint configurations

## Plugin Structure

After creation, your plugin will have this structure:

```
workspaces/plugins/your-plugin-name/
├── src/
│   ├── panel/
│   │   ├── index.tsx           # Panel extension entry point
│   │   └── YourPluginPanel.tsx # Main panel component
│   └── index.ts                # Plugin exports and manifest
├── package.json                # Plugin dependencies and scripts
├── tsconfig.json              # TypeScript configuration
├── eslint.config.js           # ESLint configuration
└── .gitignore                 # Git ignore patterns
```

## Manual Plugin Development

If you want to create a plugin manually or understand the structure better:

### 1. Create Plugin Directory

```bash
mkdir workspaces/plugins/my-plugin
cd workspaces/plugins/my-plugin
```

### 2. Create package.json

```json
{
  "name": "@open-choreo/my-plugin",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "dependencies": {
    "@open-choreo/design-system": "workspace:*",
    "@open-choreo/common-views": "workspace:*",
    "@open-choreo/plugin-core": "workspace:*",
    "react": "^19.1.0",
    "react-dom": "^19.1.0"
  },
  "scripts": {
    "build": "rushx clean && rushx lint --fix && tsc -project tsconfig.json",
    "clean": "rm -rf dist",
    "lint": "eslint --config ./eslint.config.js"
  }
}
```

### 3. Create Plugin Manifest (src/index.ts)

```typescript
import { type PluginManifest } from "@open-choreo/plugin-core";
import { panel } from "./panel";

export const myPlugin = {
  name: "My Plugin",
  description: "Description of my plugin functionality",
  extensions: [panel],
} as PluginManifest;
```

### 4. Create Extension (src/panel/index.tsx)

```typescript
import {
  type PluginExtension,
  coreExtensionPoints,
} from "@open-choreo/plugin-core";
import React from "react";

const MyPluginPanel = React.lazy(() => import("./MyPluginPanel"));

export const panel: PluginExtension = {
  extensionPoint: coreExtensionPoints.headerRight,
  key: "my-plugin-panel",
  component: MyPluginPanel,
};
```

### 5. Create Component (src/panel/MyPluginPanel.tsx)

```typescript
import React from "react";
import { Box, Typography } from "@open-choreo/design-system";

export const myPluginPanelExtensionPoint: PluginExtensionPoint = {
  id: "my-plugin-ep",
  type: PluginExtensionType.PANEL,
};

export default function MyPluginPanel() {
  return (
    <Box p={2}>
      <Typography variant="h6">My Plugin Panel</Typography>
      <Typography>This is my custom plugin panel!</Typography>
      <PanelExtensionMounter
        extensionPoint={myPluginPanelExtensionPoint}
      />
    </Box>
  );
}
```

## Extension Examples

### Navigation Extension

```typescript
import { type PluginExtensionNavigation, coreExtensionPoints } from "@open-choreo/plugin-core";
import { HomeIcon, HomeIconSelected } from "@open-choreo/design-system";

export const navigationExtension: PluginExtensionNavigation = {
  extensionPoint: coreExtensionPoints.projectNavigation,
  name: "My Feature",
  icon: HomeIcon,
  iconSelected: HomeIconSelected,
  path: "/my-feature",
  pathPattern: "/my-feature/*",
  submenu: [
    {
      name: "Sub Feature",
      icon: HomeIcon,
      iconSelected: HomeIconSelected,
      path: "/sub-feature",
      pathPattern: "/sub-feature/*"
    }
  ]
};
```

### Route Extension

```typescript
import { type PluginExtensionRoute, coreExtensionPoints } from "@open-choreo/plugin-core";
import React from "react";

const MyFeaturePage = React.lazy(() => import("./MyFeaturePage"));

export const routeExtension: PluginExtensionRoute = {
  extensionPoint: coreExtensionPoints.projectLevelPage,
  pathPattern: "/my-sub-path/:some-id/my-feature/*",
  component: MyFeaturePage,
};
```

### Provider Extension

```typescript
import { type PluginExtensionProvider, coreExtensionPoints } from "@open-choreo/plugin-core";
import React from "react";

const MyContextProvider = React.lazy(() => import("./MyContextProvider"));

export const providerExtension: PluginExtensionProvider = {
  extensionPoint: coreExtensionPoints.globalProvider,
  key: "my-context-provider",
  component: MyContextProvider,
};
```

## Development Workflow

### 1. Create and Build Plugin

```bash
# Create plugin
rush create-plugin -n MyAwesomePlugin

# Install dependencies
rush update

# Build plugin
rush build
```

### 2. Register Plugin in Console

Add your plugin to the console application:

1. Install the plugin in console's package.json:


```sh
cd workspaces/app/console
rush add -p @open-choreo/my-awesome-plugin
```

2. Add to plugin registry (`workspaces/apps/console/src/plugins/index.ts`):
```typescript
const myAwesomePlugin = () => import('@open-choreo/my-awesome-plugin').then(module => module.myAwesomePlugin);

export const getPluginRegistry = async (): Promise<PluginManifest[]> => {
  const [/* other plugins */, myAwesome] = await Promise.all([
    // ... other plugin imports
    myAwesomePlugin(),
  ]);
  
  return [
    // ... other plugins
    myAwesome,
  ];
};
```

### 3. Development Commands

```bash
# Start development server
cd workspaces/apps/console
rushx dev

# Build specific plugin
cd workspaces/plugins/my-plugin  
rushx build

# Run linting
rushx lint
```

## Best Practices

### TypeScript
- Use strict TypeScript mode
- Define proper interfaces for your components
- Import types from `@open-choreo/plugin-core` or `@open-choreo/definitios`

### Component Development
- Use React.lazy() for code splitting
- Follow the existing component patterns from `@open-choreo/design-system`
- Implement proper error boundaries

### Plugin Organization
- Keep related functionality in a single plugin
- Use clear, descriptive names for extensions
- Group related extensions together
- Add extension mount/execution points when you develop plugins

### Testing
- Write unit tests for your components
- Test extension registration and mounting
- Use the design system's testing utilities

## Code Quality

### ESLint
- Follow the established ESLint configuration
- Fix linting errors before committing
- Use consistent import ordering

### Naming Conventions
- Use PascalCase for component names
- Use camelCase for plugin and extension names
- Use kebab-case for package names

### Git Workflow
- Create feature branches for new plugins
- Write descriptive commit messages
- Submit pull requests for review

## Available Extension Points

Here's a complete reference of available extension points:

### Global Level
- `globalProvider`: For application-wide context providers
- `globalPage`: For global application pages

### Organization Level  
- `orgLevelPage`: For organization-scoped pages
- `orgNavigation`: For organization-level navigation items

### Project Level
- `projectLevelPage`: For project-scoped pages  
- `projectNavigation`: For project-level navigation items

### Component Level
- `componentLevelPage`: For component-scoped pages
- `componentNavigation`: For component-level navigation items

### UI Areas
- `headerLeft`: Left side of the main header
- `headerRight`: Right side of the main header
- `sidebarRight`: Right sidebar area
- `footer`: Application footer area

## Getting Help

- Check the existing plugins in `workspaces/plugins/` for examples
- Review the plugin-core types in `workspaces/plugins/plugin-core/src/plugin-types/`
- Look at the console application structure in `workspaces/apps/console/`
- Create an issue on the repository for questions or bugs

## Troubleshooting

### Common Issues

1. **Plugin not loading**: Check that it's registered in the console's plugin registry
2. **TypeScript errors**: Ensure you're using the correct types from plugin-core
3. **Build failures**: Run `rush update` and `rush build` from the project root
4. **Extension not mounting**: Verify the extension point ID matches exactly

### Debug Commands

```bash
# Clean and rebuild everything
rush update --purge
rush build

# Check plugin registration
cd workspaces/apps/console
rushx dev

# View build errors
rushx build --verbose
```
