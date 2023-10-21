import path from 'path';
import fs from 'fs';
import child_process from 'child_process';
import { fileURLToPath } from 'url';

const loadJSON = (filePath) => JSON.parse(fs.readFileSync(filePath));

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const packageJsonPath = path.resolve(__dirname, '..', 'package.json');

try {
  const packageJson = loadJSON(packageJsonPath);
  
  packageJson.main = 'dist';
  packageJson.types = 'dist';
  
  const content = JSON.stringify(packageJson, null, 2) + '\n';
  
  child_process.execSync('npm run build');
  
  fs.writeFileSync(packageJsonPath, content, {
    encoding: 'utf-8',
  });

  child_process.execSync('npm publish');
} catch (err) {
  console.error(err);
} finally {
  child_process.execSync('git checkout -- "' + packageJsonPath + '"');
}
