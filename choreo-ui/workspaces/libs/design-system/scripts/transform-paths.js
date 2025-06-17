import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

// Find all JS and d.ts files in dist
const files = glob.sync('**/*.{js,d.ts}', { cwd: distDir });

files.forEach((file) => {
  const filePath = join(distDir, file);
  let content = readFileSync(filePath, 'utf8');

  // Calculate relative path from current file to dist root
  const relativePath =
    dirname(file)
      .split('/')
      .map(() => '..')
      .join('/') || '.';

  // Replace @design-system imports with relative paths
  content = content.replace(
    /from ['"]@design-system\/(.*?)['"]/g,
    (match, path) => `from '${relativePath}/${path}'`
  );

  writeFileSync(filePath, content);
});
