// Simple test runner using Node's assert
const assert = require('assert');
const { runVarLoop, runLetLoop } = require('./example-closures-loop-var-let');
const { hoistingVar, hoistingLet } = require('./example-hoisting-tdz');
const { recordOrder } = require('./example-event-loop-micro-macro');
const { obj, plainGetX, boundGetX } = require('./example-this-binding');

function testClosures() {
  const varResults = runVarLoop();
  // since functions return current i which after loop is 3
  assert.deepStrictEqual(varResults, [3,3,3], 'var loop should give [3,3,3]');

  const letResults = runLetLoop();
  assert.deepStrictEqual(letResults, [0,1,2], 'let loop should give [0,1,2]');
}

function testHoisting() {
  const v = hoistingVar();
  assert.strictEqual(v.before, undefined, 'var before should be undefined');
  assert.strictEqual(v.after, 1, 'var after should be 1');

  const l = hoistingLet();
  // we expect a ReferenceError name
  assert.strictEqual(l.error, 'ReferenceError', 'let before access should throw ReferenceError');
}

async function testEventLoop() {
  const order = await recordOrder();
  // expected: script start, script end, promise, timeout
  assert.deepStrictEqual(order, ['script start','script end','promise','timeout']);
}

function testThis() {
  assert.strictEqual(obj.getX(), 10, 'method call returns 10');
  assert.strictEqual(plainGetX()(), undefined, 'plain function call returns undefined (strict mode)');
  assert.strictEqual(boundGetX()(), 10, 'bound function returns 10');
}

async function runAll() {
  console.log('Running tests...');
  try {
    testClosures();
    console.log('Closures tests passed');
    testHoisting();
    console.log('Hoisting tests passed');
    await testEventLoop();
    console.log('Event loop test passed');
    testThis();
    console.log('this binding tests passed');
    console.log('All tests passed ✅');
  } catch (err) {
    console.error('Test failed:', err.message);
    process.exitCode = 1;
  }
}

if (require.main === module) runAll();

module.exports = { runAll };