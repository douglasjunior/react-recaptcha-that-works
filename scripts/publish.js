import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import { fileURLToPath } from 'url';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const packageJson = loadJSON('../package.json');

packageJson.main = 'dist';
packageJson.types = 'dist';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '..', 'package.json');

const content = JSON.stringify(packageJson, null, 2) + '\n';

child_process.execSync('npm run build');

fs.writeFileSync(packageJsonPath, content, {
  encoding: 'utf-8',
});

try {
  child_process.execSync('npm publish');
} catch (err) {
  console.error(err);
}

child_process.execSync('git checkout -- "' + packageJsonPath + '"');
