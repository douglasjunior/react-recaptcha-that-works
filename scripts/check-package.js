// Resolves the package by its own name, the way a consumer does, through both entry points of "exports",
// and checks that each one returns the component itself (a React forwardRef) as the default export.
const assert = require('assert');

const forwardRef = Symbol.for('react.forward_ref');

async function main() {
  const required = require('react-recaptcha-that-works');
  assert.strictEqual(required.__esModule, true, 'CommonJS build must be flagged as an ES module');
  assert.strictEqual(required.default.$$typeof, forwardRef, 'require(): default export is not the component');

  const imported = await import('react-recaptcha-that-works');
  assert.strictEqual(imported.default.$$typeof, forwardRef, 'import(): default export is not the component');

  console.log('react-recaptcha-that-works: require() and import() both expose the component');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
