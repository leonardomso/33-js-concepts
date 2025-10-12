/**
 * ==========================================
 * CONCEPT 2: PRIMITIVE TYPES
 * ==========================================
 * 
 * JavaScript has 7 primitive data types:
 * 1. String
 * 2. Number
 * 3. BigInt
 * 4. Boolean
 * 5. Undefined
 * 6. Null
 * 7. Symbol
 * 
 * Primitives are immutable and stored by value.
 */

// ==========================================
// EXAMPLE 1: String
// ==========================================

const stringExample = 'Hello, World!';
const stringWithTemplate = `Template literal: ${stringExample}`;

console.log(typeof stringExample); // 'string'

// Strings are immutable
let str = 'hello';
str[0] = 'H'; // This doesn't change the string
console.log(str); // Still 'hello'

// ==========================================
// EXAMPLE 2: Number
// ==========================================

const integer = 42;
const float = 3.14;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;

console.log(typeof integer); // 'number'
console.log(typeof NaN); // 'number' (surprising!)

// Number precision
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false!

// ==========================================
// EXAMPLE 3: BigInt
// ==========================================

const bigInt = 9007199254740991n;
const anotherBigInt = BigInt(9007199254740991);

console.log(typeof bigInt); // 'bigint'

// BigInt operations
const result = bigInt + 1n;
// Note: Cannot mix BigInt with regular numbers
// const mixed = bigInt + 1; // TypeError!

// ==========================================
// EXAMPLE 4: Boolean
// ==========================================

const isTrue = true;
const isFalse = false;

console.log(typeof isTrue); // 'boolean'

// Truthy and Falsy values
// Falsy: false, 0, '', null, undefined, NaN
// Everything else is truthy

if (0) {
  console.log('This will not run');
}

if ('hello') {
  console.log('This will run');
}

// ==========================================
// EXAMPLE 5: Undefined
// ==========================================

let undefinedVariable;
console.log(undefinedVariable); // undefined
console.log(typeof undefinedVariable); // 'undefined'

function noReturn() {
  // No return statement
}
console.log(noReturn()); // undefined

// ==========================================
// EXAMPLE 6: Null
// ==========================================

const nullValue = null;
console.log(nullValue); // null
console.log(typeof nullValue); // 'object' (this is a known bug in JavaScript!)

// null vs undefined
console.log(null == undefined); // true
console.log(null === undefined); // false

// ==========================================
// EXAMPLE 7: Symbol
// ==========================================

const symbol1 = Symbol('description');
const symbol2 = Symbol('description');

console.log(typeof symbol1); // 'symbol'
console.log(symbol1 === symbol2); // false (each symbol is unique)

// Symbols are often used as unique property keys
const obj = {
  [symbol1]: 'value1'
};

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/**
 * Exercise 1: Identify the type
 * For each value, write what typeof will return
 */
function exercise1() {
  const values = [
    42,
    'hello',
    true,
    undefined,
    null,
    Symbol('test'),
    10n,
    NaN,
    Infinity
  ];
  
  // TODO: Use typeof to check each value
  // Which ones might surprise you?
}

/**
 * Exercise 2: Type coercion
 * Predict the output of these comparisons
 */
function exercise2() {
  console.log(1 == '1'); // ?
  console.log(1 === '1'); // ?
  console.log(true == 1); // ?
  console.log(false == 0); // ?
  console.log(null == undefined); // ?
  console.log(null === undefined); // ?
}

/**
 * Exercise 3: Immutability
 * Demonstrate that primitives are immutable
 */
function exercise3() {
  let num = 5;
  let numCopy = num;
  numCopy = 10;
  
  // TODO: What is the value of num?
  console.log(num); // ?
  
  // TODO: Explain why this behavior occurs
}

/**
 * Exercise 4: Create a function that checks if a value is a primitive
 */
function isPrimitive(value) {
  // TODO: Implement this function
  // Return true if value is a primitive, false otherwise
  // Hint: typeof and checking for null
}

// Test cases:
// console.log(isPrimitive(42)); // true
// console.log(isPrimitive('hello')); // true
// console.log(isPrimitive({})); // false
// console.log(isPrimitive([])); // false
// console.log(isPrimitive(null)); // true

// ==========================================
// COMMON PITFALLS
// ==========================================

/**
 * Pitfall 1: typeof null returns 'object'
 */
console.log(typeof null); // 'object' - This is a bug that can't be fixed!

/**
 * Pitfall 2: NaN is not equal to itself
 */
console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // Use this instead

/**
 * Pitfall 3: Floating point arithmetic
 */
console.log(0.1 + 0.2 === 0.3); // false
// Use methods like toFixed() or compare with epsilon

/**
 * Pitfall 4: String numbers
 */
console.log('5' + 3); // '53' (concatenation)
console.log('5' - 3); // 2 (coercion to number)

// ==========================================
// NOTES
// ==========================================
// - Primitives are immutable (cannot be changed)
// - Primitives are compared by value
// - Objects (including arrays and functions) are NOT primitives
// - typeof is useful but has quirks (null, NaN)
// - Use === for strict equality checks
