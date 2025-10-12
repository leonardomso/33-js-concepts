/**
 * ==========================================
 * CONCEPT 4: IMPLICIT, EXPLICIT, NOMINAL, STRUCTURING AND DUCK TYPING
 * ==========================================
 * 
 * Type Coercion and Type Systems in JavaScript:
 * - Implicit Coercion: Automatic type conversion
 * - Explicit Coercion: Manual type conversion
 * - Nominal Typing: Types by name (not used in JS)
 * - Structural Typing: Types by structure (TypeScript)
 * - Duck Typing: "If it walks like a duck..."
 */

// ==========================================
// EXAMPLE 1: Implicit Coercion
// ==========================================

// String coercion
console.log('5' + 3); // '53' - number to string
console.log('5' - 3); // 2 - string to number
console.log('5' * '2'); // 10 - both strings to numbers

// Boolean coercion
if ('hello') {
  console.log('Truthy string'); // Runs
}

if (0) {
  console.log('This will not run'); // 0 is falsy
}

// Equality coercion
console.log(5 == '5'); // true - type coercion
console.log(5 === '5'); // false - no coercion

// ==========================================
// EXAMPLE 2: Explicit Coercion
// ==========================================

// To String
const num = 123;
const str1 = String(num); // '123'
const str2 = num.toString(); // '123'
const str3 = '' + num; // '123' (implicit but intentional)

// To Number
const str = '123';
const num1 = Number(str); // 123
const num2 = parseInt(str); // 123
const num3 = parseFloat('123.45'); // 123.45
const num4 = +str; // 123 (unary plus operator)

// To Boolean
const bool1 = Boolean(1); // true
const bool2 = Boolean(0); // false
const bool3 = Boolean('hello'); // true
const bool4 = !!('hello'); // true (double negation)

// ==========================================
// EXAMPLE 3: Falsy Values
// ==========================================

const falsyValues = [
  false,
  0,
  -0,
  0n,
  '',
  null,
  undefined,
  NaN
];

falsyValues.forEach(value => {
  if (!value) {
    console.log(`${value} is falsy`);
  }
});

// Everything else is truthy!
console.log(!![]); // true (empty array is truthy!)
console.log(!!{}); // true (empty object is truthy!)
console.log(!!'false'); // true (string 'false' is truthy!)

// ==========================================
// EXAMPLE 4: Duck Typing
// ==========================================

// "If it walks like a duck and quacks like a duck..."
function processAnimal(animal) {
  if (typeof animal.speak === 'function') {
    animal.speak();
  }
}

const dog = {
  name: 'Buddy',
  speak() {
    console.log('Woof!');
  }
};

const cat = {
  name: 'Whiskers',
  speak() {
    console.log('Meow!');
  }
};

processAnimal(dog); // Works!
processAnimal(cat); // Works!

// Duck typing: We don't care about the type, just the interface

// ==========================================
// EXAMPLE 5: Type Checking Patterns
// ==========================================

// typeof operator
console.log(typeof 42); // 'number'
console.log(typeof 'hello'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof null); // 'object' (quirk!)
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object' (quirk!)
console.log(typeof function() {}); // 'function'

// instanceof operator
console.log([] instanceof Array); // true
console.log({} instanceof Object); // true
console.log(new Date() instanceof Date); // true

// Array.isArray()
console.log(Array.isArray([])); // true
console.log(Array.isArray({})); // false

// Object.prototype.toString
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

console.log(getType([])); // 'Array'
console.log(getType({})); // 'Object'
console.log(getType(null)); // 'Null'

// ==========================================
// EXAMPLE 6: Strict vs Loose Equality
// ==========================================

// Loose equality (==) with type coercion
console.log(1 == '1'); // true
console.log(true == 1); // true
console.log(false == 0); // true
console.log(null == undefined); // true
console.log('' == 0); // true

// Strict equality (===) without coercion
console.log(1 === '1'); // false
console.log(true === 1); // false
console.log(false === 0); // false
console.log(null === undefined); // false
console.log('' === 0); // false

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/**
 * Exercise 1: Predict the output
 */
function exercise1() {
  console.log('10' + 20); // ?
  console.log('10' - 20); // ?
  console.log(true + true); // ?
  console.log(true + false); // ?
  console.log('5' * '5'); // ?
  console.log('hello' - 1); // ?
}

/**
 * Exercise 2: Create a strict type checking function
 */
function strictTypeCheck(value, type) {
  // TODO: Implement strict type checking
  // Should return true if value is exactly of the given type
  // Handle: 'string', 'number', 'boolean', 'object', 'array', 'null', 'undefined'
}

// Test cases:
// console.log(strictTypeCheck('hello', 'string')); // true
// console.log(strictTypeCheck(123, 'number')); // true
// console.log(strictTypeCheck([], 'array')); // true
// console.log(strictTypeCheck(null, 'null')); // true
// console.log(strictTypeCheck({}, 'object')); // true

/**
 * Exercise 3: Implement a safe coercion function
 */
function safeToNumber(value) {
  // TODO: Convert value to number safely
  // Return null if conversion is not valid
  // Handle edge cases like NaN, Infinity
}

/**
 * Exercise 4: Duck typing exercise
 * Create a function that works with any object that has certain methods
 */
function createLogger(output) {
  // TODO: output should have a write() method
  // If it doesn't, throw an error
  // Use duck typing to check
}

// Test with different "ducks":
// const consoleOutput = { write: (msg) => console.log(msg) };
// const arrayOutput = { write: (msg) => arr.push(msg) };

// ==========================================
// COMMON PITFALLS
// ==========================================

/**
 * Pitfall 1: Truthy/Falsy confusion
 */
const users = [];
if (users) {
  console.log('Has users'); // Runs even though array is empty!
}

// Better:
if (users.length > 0) {
  console.log('Has users');
}

/**
 * Pitfall 2: NaN comparisons
 */
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
// Use Number.isNaN() instead

/**
 * Pitfall 3: Object to primitive coercion
 */
console.log([1, 2] + [3, 4]); // '1,23,4' (both converted to strings)
console.log({} + []); // Different results in different contexts!

/**
 * Pitfall 4: String concatenation vs addition
 */
console.log(1 + 2 + '3'); // '33'
console.log('1' + 2 + 3); // '123'

/**
 * Pitfall 5: typeof null
 */
console.log(typeof null); // 'object' - historical bug
// Check null explicitly: value === null

// ==========================================
// BEST PRACTICES
// ==========================================

/**
 * 1. Use === instead of ==
 */
// Always use strict equality unless you have a specific reason not to

/**
 * 2. Be explicit about type conversions
 */
const explicitConversion = String(123); // Good
const implicitConversion = 123 + ''; // Unclear intent

/**
 * 3. Check types before operations
 */
function safeDivide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Both arguments must be numbers');
  }
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

/**
 * 4. Use TypeScript for larger projects
 */
// TypeScript provides static type checking and prevents many coercion issues

/**
 * 5. Validate user input
 */
function processUserInput(input) {
  // Always validate and sanitize user input
  const normalized = String(input).trim();
  // ... process normalized input
}

// ==========================================
// NOTES
// ==========================================
// - JavaScript is dynamically typed
// - Type coercion can be helpful but also dangerous
// - Use === for equality checks
// - Understand truthy/falsy values
// - Duck typing is common in JavaScript
// - Consider TypeScript for type safety
// - Always validate external data
