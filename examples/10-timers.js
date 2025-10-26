console.log('=== Example 1: Basic setTimeout ===');
console.log('Start');

setTimeout(() => {
  console.log('Executed after 1 second');
}, 1000);

console.log('End (setTimeout is async)');

console.log('\n=== Example 2: setTimeout with 0 delay ===');
console.log('First');

setTimeout(() => {
  console.log('Third (even with 0ms delay)');
}, 0);

console.log('Second');

console.log('\n=== Example 3: Clearing setTimeout ===');
const timeoutId = setTimeout(() => {
  console.log('This will not execute');
}, 1000);

clearTimeout(timeoutId);
console.log('Timeout cleared');

console.log('\n=== Example 4: Basic setInterval ===');
let counter = 0;
const intervalId = setInterval(() => {
  counter++;
  console.log(`Interval tick: ${counter}`);
  
  if (counter >= 3) {
    clearInterval(intervalId);
    console.log('Interval stopped');
  }
}, 500);

console.log('\n=== Example 5: Passing Arguments ===');
function greet(name, message) {
  console.log(`${message}, ${name}!`);
}

setTimeout(greet, 500, 'Alice', 'Hello');

console.log('\n=== Example 6: Debouncing ===');
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const debouncedLog = debounce((msg) => {
  console.log('Debounced:', msg);
}, 500);

debouncedLog('Call 1');
debouncedLog('Call 2');
debouncedLog('Call 3');

console.log('\n=== Example 7: Throttling ===');
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

const throttledLog = throttle((msg) => {
  console.log('Throttled:', msg);
}, 500);

throttledLog('Call 1');
throttledLog('Call 2');
