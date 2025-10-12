/**
 * ==========================================
 * CONCEPT 1: CALL STACK
 * ==========================================
 * 
 * The call stack is a mechanism that the JavaScript interpreter uses to keep track 
 * of function execution. It follows the Last In, First Out (LIFO) principle.
 * 
 * Key Points:
 * - Functions are added to the stack when called
 * - Functions are removed from the stack when they return
 * - Stack overflow occurs when the stack size limit is exceeded
 */

// ==========================================
// EXAMPLE 1: Basic Call Stack
// ==========================================

function firstFunction() {
  console.log('First function called');
  secondFunction();
  console.log('First function finished');
}

function secondFunction() {
  console.log('Second function called');
  thirdFunction();
  console.log('Second function finished');
}

function thirdFunction() {
  console.log('Third function called');
}

// Uncomment to run:
// firstFunction();

// Call Stack Order:
// 1. firstFunction() is pushed
// 2. secondFunction() is pushed
// 3. thirdFunction() is pushed
// 4. thirdFunction() is popped
// 5. secondFunction() is popped
// 6. firstFunction() is popped

// ==========================================
// EXAMPLE 2: Stack Overflow
// ==========================================

function recursiveFunction() {
  // This will cause a stack overflow error
  // recursiveFunction();
}

// Uncomment to see stack overflow (don't run this):
// recursiveFunction();

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/**
 * Exercise 1: Trace the call stack
 * Determine the order of console.log outputs
 */
function exercise1() {
  console.log('1');
  exercise1Helper();
  console.log('4');
}

function exercise1Helper() {
  console.log('2');
  console.log('3');
}

// TODO: Before running, predict the output order
// Uncomment to test:
// exercise1();

/**
 * Exercise 2: Create a function that demonstrates call stack depth
 * Write a function that counts how deep the call stack can go before overflow
 */
function countStackDepth() {
  let depth = 0;
  
  function recurse() {
    depth++;
    try {
      recurse();
    } catch (e) {
      console.log(`Stack depth reached: ${depth}`);
    }
  }
  
  // TODO: Implement this safely
  // Hint: Use try-catch to prevent actual overflow
}

/**
 * Exercise 3: Debug the call stack
 * The following function has a logical error. Use your understanding
 * of the call stack to identify and fix it.
 */
function calculate(num) {
  if (num <= 0) return 0;
  return num + calculate(num - 1);
}

// TODO: Test this function and verify it works correctly
// Uncomment to test:
// console.log(calculate(5)); // Should return 15 (5+4+3+2+1)

// ==========================================
// COMMON PITFALLS
// ==========================================

/**
 * Pitfall 1: Infinite recursion
 * Always ensure recursive functions have a proper base case
 */
function badRecursion(n) {
  // Missing base case!
  // return badRecursion(n - 1);
}

/**
 * Pitfall 2: Forgetting function execution context
 * Remember that each function call creates a new execution context
 */
function pitfall2Example() {
  let counter = 0;
  
  function increment() {
    counter++;
  }
  
  increment();
  increment();
  console.log(counter); // What will this output?
}

// ==========================================
// NOTES
// ==========================================
// - The call stack has a size limit (varies by browser/environment)
// - Stack overflow errors occur when limit is exceeded
// - Debugging tools show the current call stack
// - Understanding the call stack helps debug complex code
