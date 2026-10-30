// Each build folder declares its own module system, so Node reads dist/esm as ESM and dist/cjs as CommonJS
// regardless of the "type" field of the root package.json.
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');

fs.writeFileSync(path.join(dist, 'esm', 'package.json'), '{ "type": "module" }\n');
fs.writeFileSync(path.join(dist, 'cjs', 'package.json'), '{ "type": "commonjs" }\n');
