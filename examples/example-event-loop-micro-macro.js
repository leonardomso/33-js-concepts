// Example: event loop order (microtasks vs macrotasks)
// This example returns the order of operations by instrumentation.

function recordOrder() {
  const out = [];
  out.push('script start');
  setTimeout(() => out.push('timeout'), 0);
  Promise.resolve().then(() => out.push('promise'));
  out.push('script end');
  // we need to return a promise that resolves after macrotask runs
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(out);
    }, 10);
  });
}

if (require.main === module) {
  recordOrder().then(order => console.log(order));
}

module.exports = { recordOrder };