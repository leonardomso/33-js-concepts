// Example: closures + loop differences (var vs let)
// This script prints expected outputs and exposes behavior for tests.

function runVarLoop() {
  const results = [];
  for (var i = 0; i < 3; i++) {
    // emulate async callbacks by pushing functions and calling later
    results.push(() => i);
  }
  // call callbacks
  return results.map(fn => fn());
}

function runLetLoop() {
  const results = [];
  for (let j = 0; j < 3; j++) {
    results.push(() => j);
  }
  return results.map(fn => fn());
}

if (require.main === module) {
  console.log('var loop:', runVarLoop());
  console.log('let loop:', runLetLoop());
}

module.exports = { runVarLoop, runLetLoop };