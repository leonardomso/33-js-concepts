// Test runner
const { expectOutput } = require('./test-utils');

// Run all example tests
async function runTests() {
  const tests = [
    require('./call-stack.test.js'),
    require('./primitives-vs-references.test.js'),
    require('./closures.test.js'),
    require('./map-filter-reduce.test.js'),
    require('./event-loop.test.js'),
    require('./this-call-bind.test.js'),
    require('./promises-async-await.test.js'),
  ];

  console.log('\nRunning tests...\n');
  
  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await test();
    if (result) passed++;
    else failed++;
  }

  console.log(`\nResults: ${passed} passed, ${failed} failed\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch(console.error);