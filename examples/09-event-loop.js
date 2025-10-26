console.log('=== Example 1: Basic Event Loop ===');
console.log('Start');

setTimeout(() => {
  console.log('Timeout callback');
}, 0);

console.log('End');

console.log('\n=== Example 2: Call Stack vs Task Queue ===');
function first() {
  console.log('First');
  second();
}

function second() {
  console.log('Second');
  setTimeout(() => {
    console.log('Async task');
  }, 0);
  console.log('Third');
}

first();
console.log('Fourth');

console.log('\n=== Example 3: Multiple Timeouts ===');
setTimeout(() => console.log('Timeout 1'), 0);
setTimeout(() => console.log('Timeout 2'), 0);
setTimeout(() => console.log('Timeout 3'), 0);
console.log('Synchronous');

console.log('\n=== Example 4: Microtasks vs Macrotasks ===');
console.log('Script start');

setTimeout(() => {
  console.log('setTimeout (macrotask)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('Promise 1 (microtask)');
  })
  .then(() => {
    console.log('Promise 2 (microtask)');
  });

console.log('Script end');

console.log('\n=== Example 5: Nested Timeouts ===');
setTimeout(() => {
  console.log('Outer timeout');
  setTimeout(() => {
    console.log('Inner timeout');
  }, 0);
}, 0);
console.log('Main thread');

console.log('\n=== Example 6: Promise Chain ===');
console.log('Start');

Promise.resolve()
  .then(() => {
    console.log('Promise 1');
    return 'Result 1';
  })
  .then(result => {
    console.log('Promise 2:', result);
    return 'Result 2';
  })
  .then(result => {
    console.log('Promise 3:', result);
  });

console.log('End');

console.log('\n=== Example 7: Mixing Promises and Timeouts ===');
setTimeout(() => console.log('Timeout 1'), 0);

Promise.resolve().then(() => console.log('Promise 1'));

setTimeout(() => console.log('Timeout 2'), 0);

Promise.resolve().then(() => console.log('Promise 2'));

console.log('Sync');

console.log('\n=== Example 8: Event Loop Phases ===');
console.log('1. Synchronous code');

setTimeout(() => {
  console.log('4. Macrotask (setTimeout)');
}, 0);

Promise.resolve().then(() => {
  console.log('3. Microtask (Promise)');
});

console.log('2. More synchronous code');

console.log('\n=== Example 9: Async/Await ===');
async function asyncFunction() {
  console.log('Async function start');
  
  await Promise.resolve();
  console.log('After await (microtask)');
  
  setTimeout(() => {
    console.log('Inside async setTimeout (macrotask)');
  }, 0);
}

console.log('Before async call');
asyncFunction();
console.log('After async call');

console.log('\n=== Example 10: Blocking Event Loop (Demo) ===');
console.log('Start heavy computation');

setTimeout(() => {
  console.log('This will be delayed if event loop is blocked');
}, 0);


console.log('Heavy computation done (simulated)');

console.log('\n=== Example 11: Task Priority ===');

setTimeout(() => console.log('setTimeout'), 0);
Promise.resolve().then(() => console.log('Promise'));
console.log('Synchronous');

console.log('\n=== Example 12: Multiple Microtasks ===');
Promise.resolve().then(() => {
  console.log('Promise 1');
  Promise.resolve().then(() => {
    console.log('Nested Promise 1');
  });
});

Promise.resolve().then(() => {
  console.log('Promise 2');
  Promise.resolve().then(() => {
    console.log('Nested Promise 2');
  });
});

console.log('Sync end');

console.log('\n=== Example 13: Error Handling ===');
setTimeout(() => {
  try {
    throw new Error('Error in timeout');
  } catch (e) {
    console.log('Caught:', e.message);
  }
}, 0);

Promise.reject('Promise error')
  .catch(err => console.log('Caught promise error:', err));

console.log('Main thread continues');
