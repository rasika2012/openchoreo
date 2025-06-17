# Contributing Guidelines

This guide outlines the process for contributing to the OpenChoreo Console and related libraries.

## Project Structure

This is a Rush monorepo containing the OpenChoreo Console, related libraries, and applications. The repository is organized as follows:

### Key Directories

```
workspaces/
├── libs/                    # Library packages
│   ├── design-system/      # Core design system package
│   └── views/              # Shared view components
├── apps/                   # Application packages
│   └── console/           # Main console application
common/                     # Shared configuration and tooling
```

## Important Files

- `rush.json` - Rush monorepo configuration
- `.gitignore` - Git ignore patterns for the repository
- `eslint.config.cjs` - ESLint configuration

## Development Workflow

The repository uses Rush for managing the monorepo. Key commands:

```bash
rush update     # Install dependencies
rush build      # Build all packages
rush change     # Generate change files
rush publish    # Publish packages
rush create     # Create New Element in code (Component / View / Layout)
```

## Development Guidelines

1. Setup:
   ```bash
   rush update    # Install dependencies
   rush build     # Build all packages
   ```

2. Development:
   - Work in the appropriate workspace directory (libs or apps)
   - Run Storybook for component/view development
   - Follow TypeScript strict mode
   - Ensure all tests pass


4. Making Changes:
   - Create a feature branch from `main`
   - Make atomic commits with clear messages
   - Update documentation as needed
   - Add or update tests as required

5. Before Submitting:
   - Run `rush change` to document changes
   - Ensure all tests pass
   - Verify Storybook documentation
   - Check for lint and type errors

## Quality Guidelines

1. Code Quality:
   - Follow established patterns
   - Write clean, maintainable code
   - Add appropriate comments
   - Use TypeScript features effectively

2. Testing:
   - Write unit tests for new components
   - Include edge cases
   - Test accessibility features
   - Verify responsive behavior

3. Documentation:
   - Update component stories
   - Document props and usage
   - Include practical examples
   - Note any breaking changes

4. Performance:
   - Optimize bundle size
   - Consider render performance
   - Follow React best practices
   - Profile when necessary 