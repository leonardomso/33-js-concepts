// Example: Event Loop ordering (macrotasks vs microtasks)
console.log('script start');

setTimeout(() => console.log('timeout callback (macrotask)'), 0);

Promise.resolve().then(() => console.log('promise callback (microtask)'));

console.log('script end');

// Expected order:
// script start
// script end
// promise callback (microtask)
// timeout callback (macrotask)
