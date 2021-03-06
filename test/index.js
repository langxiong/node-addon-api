'use strict';

let testModules = [
  'arraybuffer',
  'asyncworker',
  'buffer',
  'error',
  'external',
  'function',
  'name',
  'object',
  'typedarray',
];

if (typeof global.gc === 'function') {
  console.log('Starting test suite\n');

  // Requiring each module runs tests in the module.
  testModules.forEach(name => {
    console.log(`Running test '${name}'`);
    require('./' + name);
  });

  console.log('\nAll tests passed!');
} else {
  // Make it easier to run with the correct (version-dependent) command-line args.
  const args = [ '--expose-gc', __filename ];
  if (require('../index').isNodeApiBuiltin) {
    args.splice(0, 0, '--napi-modules');
  }
  const child = require('child_process').spawnSync(process.argv[0], args, {
    stdio: 'inherit',
  });
  process.exitCode = child.status;
}
