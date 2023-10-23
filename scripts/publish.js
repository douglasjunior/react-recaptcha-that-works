const path = require('path');
const fs = require('fs');
const child_process = require('child_process');

const packageJson = require('../package.json');

const packageJsonPath = path.resolve(__dirname, '..', 'package.json');

try {
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
