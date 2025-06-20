import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the plugins directory
const pluginsRoot = path.resolve(__dirname, '../../../../plugins');
const tmpDir = path.resolve(__dirname, 'tmp');

// Create tmp directory if it doesn't exist
if (!fs.existsSync(tmpDir)) {
  fs.mkdirSync(tmpDir, { recursive: true });
}

// Read all plugin directories
const pluginDirs = fs.readdirSync(pluginsRoot, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('Setting up symlinks for plugins:', pluginDirs);

pluginDirs.forEach(pluginName => {
  const distPath = path.join(pluginsRoot, pluginName, 'dist');
  const symlinkPath = path.join(tmpDir, pluginName);

  // Remove existing symlink or directory if it exists
  if (fs.existsSync(symlinkPath)) {
    fs.rmSync(symlinkPath, { recursive: true, force: true });
  }

  // Create symlink for the whole dist directory
  if (fs.existsSync(distPath)) {
    fs.symlinkSync(distPath, symlinkPath, 'dir');
    console.log(`Created symlink: ${pluginName} -> ${distPath}`);
  } else {
    console.warn(`Warning: Dist directory not found for plugin ${pluginName}: ${distPath}`);
  }
});

// Create index.ts file with exports for each plugin
const indexContent = pluginDirs
  .map(pluginName => `export * from "./${pluginName}";`)
  .join('\n');

const indexPath = path.join(tmpDir, 'index.ts');
fs.writeFileSync(indexPath, indexContent);

console.log('Created index.ts file with exports for all plugins');
console.log('Symlink setup complete!'); 