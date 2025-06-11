# Choreo Console Application

This is the main console application for Choreo, built using React and the Choreo Design System.

## 📋 Prerequisites

- Node.js (v18 or higher)
- Rush CLI installed globally (`npm install -g @microsoft/rush`)

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies:
   ```bash
   rush update
   ```

3. Build all packages:
   ```bash
   rush build
   ```

4. Start the development server:
   ```bash
   cd workspaces/apps/console
   rushx start
   ```

## 🏗️ Project Structure

```
workspaces/apps/console/
├── src/               # Source code
├── public/           # Static assets
├── tests/            # Test files
└── package.json      # Package configuration
```

## 🔧 Development

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run `rush change` to document your changes
4. Ensure all tests pass with `rushx test`
5. Submit a pull request

### Available Scripts

- `rushx start` - Start development server
- `rushx build` - Build the application
- `rushx test` - Run tests
- `rushx lint` - Run linting

## 🎨 Design System Integration

This application uses the Choreo Design System. When working with components:

- Import components from `@choreo/design-system` and `@choreo/view`
- Follow the design system's theme and styling guidelines
- Use design tokens for colors, spacing, and typography
- Ensure dark mode compatibility

## 📚 Documentation

- [Design System Documentation](../../../workspaces/libs/design-system/README.md)
- [Component Library](../../../workspaces/libs/views/README.md)

## 🧪 Testing

- Write unit tests for new components and features
- Use React Testing Library for component testing
- Follow the testing guidelines from the design system
- Ensure accessibility testing is included

## 🔍 Code Quality

- Follow TypeScript strict mode
- Use ESLint and Prettier for code formatting
- Follow React best practices
- Optimize for performance

## 🤝 Contributing

1. Follow the monorepo's contributing guidelines
2. Ensure your code follows the established patterns
3. Document any new features or changes
4. Update tests as needed
5. Submit changes through the proper channels

## 🐛 Troubleshooting

Common issues and solutions:

1. **Build failures**
   - Run `rush update` to ensure dependencies are up to date
   - Clear Rush's build cache: `rush clean`

2. **Dependency issues**
   - Check the Rush configuration in `rush.json`
   - Verify package versions in `package.json`

3. **Type errors**
   - Run `rushx type-check` to identify issues
   - Ensure all dependencies are properly typed

## 📝 License

[Add License Information]

## 🤝 Support

For support and questions:
- Check the documentation
- Raise an issue in the repository
- Contact the development team
