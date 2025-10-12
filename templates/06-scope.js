/**
 * ==========================================
 * CONCEPT 6: FUNCTION SCOPE, BLOCK SCOPE, AND LEXICAL SCOPE
 * ==========================================
 * 
 * Scope determines the accessibility of variables:
 * - Function Scope: var (visible within function)
 * - Block Scope: let/const (visible within block {})
 * - Lexical Scope: Inner functions access outer variables
 */

// ==========================================
// EXAMPLE 1: Function Scope (var)
// ==========================================

function functionScopeExample() {
  var x = 10;
  
  if (true) {
    var x = 20; // Same variable! var is function-scoped
    console.log(x); // 20
  }
  
  console.log(x); // 20 (modified in if block)
}

// var is hoisted to the top of the function
function hoistingExample() {
  console.log(x); // undefined (not ReferenceError!)
  var x = 5;
  console.log(x); // 5
}

// ==========================================
// EXAMPLE 2: Block Scope (let/const)
// ==========================================

function blockScopeExample() {
  let x = 10;
  
  if (true) {
    let x = 20; // Different variable! let is block-scoped
    console.log(x); // 20
  }
  
  console.log(x); // 10 (unchanged)
}

// let/const in loops
for (let i = 0; i < 3; i++) {
  // i is scoped to this loop
  console.log(i);
}
// console.log(i); // ReferenceError: i is not defined

// Temporal Dead Zone (TDZ)
function temporalDeadZone() {
  // console.log(x); // ReferenceError (can't access before declaration)
  let x = 5;
  console.log(x); // 5
}

// ==========================================
// EXAMPLE 3: Lexical Scope
// ==========================================

function outer() {
  const outerVar = 'I am outer';
  
  function inner() {
    // inner() can access outerVar due to lexical scoping
    console.log(outerVar);
    
    const innerVar = 'I am inner';
    
    function deepInner() {
      // deepInner() can access both outerVar and innerVar
      console.log(outerVar);
      console.log(innerVar);
    }
    
    deepInner();
  }
  
  inner();
  // console.log(innerVar); // ReferenceError: can't access inner scope
}

// ==========================================
// EXAMPLE 4: Global Scope
// ==========================================

// Global variable (avoid in production code!)
var globalVar = 'I am global';

function accessGlobal() {
  console.log(globalVar); // Accessible
}

// Without var/let/const, creates global variable
function createAccidentalGlobal() {
  // accidentalGlobal = 'Oops!'; // Creates global (don't do this!)
}

// ==========================================
// EXAMPLE 5: Closures and Scope
// ==========================================

function createCounter() {
  let count = 0; // Private variable due to scope
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount()); // 2
// console.log(count); // ReferenceError: count is private

// ==========================================
// EXAMPLE 6: Classic var Loop Problem
// ==========================================

// Problem with var
function varLoopProblem() {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i); // Prints 3, 3, 3
    }, 100);
  }
}

// Solution with let
function letLoopSolution() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(i); // Prints 0, 1, 2
    }, 100);
  }
}

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/**
 * Exercise 1: Predict the output
 */
function exercise1() {
  var a = 1;
  let b = 2;
  const c = 3;
  
  if (true) {
    var a = 4;
    let b = 5;
    const c = 6;
    console.log(a, b, c); // ?
  }
  
  console.log(a, b, c); // ?
}

/**
 * Exercise 2: Fix the scope issue
 */
function exercise2() {
  // This function has scope issues
  // TODO: Fix it so each button logs its correct index
  
  const buttons = ['Button 1', 'Button 2', 'Button 3'];
  
  for (var i = 0; i < buttons.length; i++) {
    setTimeout(() => {
      console.log(`Clicked ${buttons[i]}`);
    }, 100);
  }
}

/**
 * Exercise 3: Create a private variable pattern
 */
function createBankAccount(initialBalance) {
  // TODO: Create private balance variable
  // TODO: Return methods to deposit, withdraw, and check balance
  // TODO: Balance should not be directly accessible
}

// Test:
// const account = createBankAccount(100);
// account.deposit(50);
// account.withdraw(25);
// console.log(account.getBalance()); // 125
// console.log(account.balance); // undefined (private)

/**
 * Exercise 4: Understand hoisting
 */
function exercise4() {
  // TODO: Explain what happens in each case
  
  // Case 1
  console.log(x);
  var x = 5;
  
  // Case 2
  // console.log(y);
  // let y = 5;
  
  // Case 3
  test();
  function test() {
    console.log('Function hoisting works!');
  }
}

// ==========================================
// COMMON PITFALLS
// ==========================================

/**
 * Pitfall 1: Accidentally creating globals
 */
function pitfall1() {
  // x = 5; // Creates global variable (no var/let/const)
  // Always use var/let/const
}

/**
 * Pitfall 2: var in loops
 */
function pitfall2() {
  for (var i = 0; i < 5; i++) {
    // All iterations share the same i
  }
  console.log(i); // 5 - i is still accessible!
}

/**
 * Pitfall 3: Temporal Dead Zone confusion
 */
function pitfall3() {
  // This is in TDZ
  // console.log(x); // ReferenceError
  let x = 5;
}

/**
 * Pitfall 4: Thinking const means immutable
 */
const obj = { value: 1 };
obj.value = 2; // This works! const prevents reassignment, not mutation

// ==========================================
// BEST PRACTICES
// ==========================================

/**
 * 1. Use const by default, let when needed, avoid var
 */
const constantValue = 42; // Can't be reassigned
let variableValue = 10; // Can be reassigned
// var oldStyle = 5; // Avoid

/**
 * 2. Declare variables at the top of their scope
 */
function goodPractice() {
  const x = 1;
  let y = 2;
  
  // Use x and y...
}

/**
 * 3. Keep scope as narrow as possible
 */
function narrowScope() {
  // Only declare variables where they're needed
  
  if (condition) {
    const temp = calculate(); // Only exists in this block
    process(temp);
  }
}

/**
 * 4. Use IIFE for isolation (older pattern)
 */
(function() {
  // Variables here don't pollute global scope
  const privateVar = 'private';
})();

/**
 * 5. Use modules for better scope management
 */
// In modern JavaScript, use ES6 modules
// Each module has its own scope

// ==========================================
// NOTES
// ==========================================
// - var: function-scoped, hoisted
// - let/const: block-scoped, TDZ
// - Prefer const > let > never var
// - Lexical scope allows closures
// - Scope chains: inner → outer → global
// - Use modules for namespace management
