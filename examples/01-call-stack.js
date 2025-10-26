console.log('=== Example 1: Basic Call Stack ===');

function firstFunction() {
  console.log('Inside firstFunction');
  secondFunction();
  console.log('Back to firstFunction');
}

function secondFunction() {
  console.log('Inside secondFunction');
  thirdFunction();
  console.log('Back to secondFunction');
}

function thirdFunction() {
  console.log('Inside thirdFunction');
}

firstFunction();

console.log('\n=== Example 2: Stack Overflow (Demonstration) ===');
console.log('Infinite recursion would cause: RangeError: Maximum call stack size exceeded');
console.log('Example: A function calling itself without a base case');

console.log('\n=== Example 3: Visualizing Call Stack ===');
console.log('\n=== Example 3: Visualizing Call Stack ===');

function multiply(a, b) {
  return a * b;
}

function square(n) {
  return multiply(n, n);
}

function printSquare(n) {
  const result = square(n);
  console.log(`Square of ${n} is ${result}`);
}

printSquare(5);

console.log('\n=== Example 4: Error Stack Trace ===');
console.log('\n=== Example 4: Error Stack Trace ===');

function functionA() {
  functionB();
}

function functionB() {
  functionC();
}

function functionC() {
  console.log('Call stack at this point:');
  console.log(new Error().stack);
}

functionA();
