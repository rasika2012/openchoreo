/**
 * Script to create a new plugin with all necessary files.
 * @module create-plugin-rush
 */

const fs = require('fs');
const path = require('path');
const {
    generatePackageJson,
    generateTsConfig,
    generateEslintConfig,
    generateMainIndex,
    generateSrcIndex,
    generatePanelIndex,
    generatePanelComponent,
    generateGitignore
} = require('./plugin-generators.cjs');

/**
 * @typedef {Object} PluginConfig
 * @property {string} name - The name of the plugin
 */

/**
 * Validates command line arguments and returns plugin configuration
 * @returns {PluginConfig}
 * @throws {Error} If required arguments are missing
 */
function parseCommandLineArgs() {
    const nameIndex = process.argv.findIndex((arg) => arg === '--name' || arg === '-n');

    if (nameIndex === -1) {
        throw new Error(
            'Missing required arguments.\n' +
            'Usage: rushx create-plugin --name <pluginName>\n' +
            'Example: rushx create-plugin --name MyPlugin'
        );
    }

    const name = process.argv[nameIndex + 1];

    if (!name) {
        throw new Error('Plugin name argument is required.');
    }

    // Validate plugin name format (PascalCase)
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(name)) {
        throw new Error('Plugin name must be in PascalCase format (e.g., MyPlugin, DataAnalyzer)');
    }

    return { name };
}

/**
 * Converts PascalCase to kebab-case
 * @param {string} str - PascalCase string
 * @returns {string} kebab-case string
 */
function toKebabCase(str) {
    return str.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
}

/**
 * Creates directory if it doesn't exist
 * @param {string} dirPath - Directory path to create
 * @throws {Error} If directory creation fails
 */
function createDirectory(dirPath) {
    try {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    } catch (error) {
        throw new Error(`Failed to create directory ${dirPath}: ${error.message}`);
    }
}

/**
 * Gets the plugins directory path
 * @returns {string} Path to the plugins directory
 */
function getPluginsPath() {
    const pluginsPath = path.resolve(__dirname, '../../workspaces/plugins');
    if (!fs.existsSync(pluginsPath)) {
        throw new Error('Plugins directory does not exist. Please ensure you are in the correct directory.');
    }
    return pluginsPath;
}

/**
 * Updates rush.json to include the new plugin project
 * @param {string} pluginName - Name of the plugin
 * @param {string} pluginFolder - Folder name for the plugin
 */
function updateRushJson(pluginName, pluginFolder) {
    try {
        const rushJsonPath = path.resolve(__dirname, '../../rush.json');
        const rushJsonContent = fs.readFileSync(rushJsonPath, 'utf8');
        
        // Create the new project entry
        const projectEntry = `    {
      "packageName": "@open-choreo/${toKebabCase(pluginName)}",
      "projectFolder": "workspaces/plugins/${pluginFolder}"
    }`;
    
        // Find the projects array closing bracket
        const projectsEndIndex = rushJsonContent.lastIndexOf('  ]');
        if (projectsEndIndex === -1) {
            throw new Error('Could not find projects section in rush.json');
        }
        
        // Find the last project entry before the closing bracket
        const beforeProjectsEnd = rushJsonContent.substring(0, projectsEndIndex);
        const afterProjectsEnd = rushJsonContent.substring(projectsEndIndex);
        
        // Check if there are existing projects (not just empty array)
        const hasExistingProjects = beforeProjectsEnd.includes('"packageName"');
        
        let updatedContent;
        if (hasExistingProjects) {
            // Add comma to the last existing project and insert our new project
            updatedContent = beforeProjectsEnd + ',\n' + projectEntry + afterProjectsEnd;
        } else {
            // No existing projects, just add our project
            updatedContent = beforeProjectsEnd + '\n' + projectEntry + afterProjectsEnd;
        }
        
        // Write back to file
        fs.writeFileSync(rushJsonPath, updatedContent);
        
        console.log(`📝 Updated rush.json to include ${pluginName} plugin.`);
    } catch (error) {
        console.warn(`⚠️  Warning: Could not update rush.json: ${error.message}`);
        console.warn(`   You may need to manually add the plugin to rush.json`);
    }
}

/**
 * Creates a new plugin with all necessary files
 * @param {PluginConfig} config - Plugin configuration
 */
function createPlugin({ name }) {
    try {
        // Setup paths
        const pluginsDir = getPluginsPath();
        const pluginFolder = toKebabCase(name);
        const pluginDir = path.join(pluginsDir, pluginFolder);
        const srcDir = path.join(pluginDir, 'src');
        const panelDir = path.join(srcDir, 'panel');

        // Create directories
        createDirectory(pluginDir);
        createDirectory(srcDir);
        createDirectory(panelDir);

        // Define file paths
        const files = {
            packageJson: path.join(pluginDir, 'package.json'),
            tsConfig: path.join(pluginDir, 'tsconfig.json'),
            eslintConfig: path.join(pluginDir, 'eslint.config.js'),
            mainIndex: path.join(pluginDir, 'index.ts'),
            srcIndex: path.join(srcDir, 'index.ts'),
            panelIndex: path.join(panelDir, 'index.tsx'),
            panelComponent: path.join(panelDir, `${name}Panel.tsx`),
            gitignore: path.join(pluginDir, '.gitignore'),
        };

        // Write files
        fs.writeFileSync(files.packageJson, generatePackageJson(name));
        fs.writeFileSync(files.tsConfig, generateTsConfig());
        fs.writeFileSync(files.eslintConfig, generateEslintConfig());
        fs.writeFileSync(files.mainIndex, generateMainIndex());
        fs.writeFileSync(files.srcIndex, generateSrcIndex(name));
        fs.writeFileSync(files.panelIndex, generatePanelIndex(name));
        fs.writeFileSync(files.panelComponent, generatePanelComponent(name));
        fs.writeFileSync(files.gitignore, generateGitignore());

        // Update rush.json
        updateRushJson(name, pluginFolder);

        console.log(`✨ Successfully created ${name} plugin.`);
        console.log(`📁 Plugin location: ${pluginDir}`);
        console.log(`🚀 Next steps:`);
        console.log(`   1. rush install`);
        console.log(`   2. rush build`);

    } catch (error) {
        console.error('❌ Error creating plugin:', error.message);
        process.exit(1);
    }
}

// Execute the script
try {
    const config = parseCommandLineArgs();
    createPlugin(config);
} catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
} 