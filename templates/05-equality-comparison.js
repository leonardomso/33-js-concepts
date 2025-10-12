/**
 * ==========================================
 * CONCEPT 5: == vs === vs typeof
 * ==========================================
 * 
 * Understanding equality operators and type checking:
 * - == (loose equality): performs type coercion
 * - === (strict equality): no type coercion
 * - typeof: returns string describing the type
 */

// ==========================================
// EXAMPLE 1: Loose Equality (==)
// ==========================================

console.log(5 == 5); // true
console.log(5 == '5'); // true (type coercion)
console.log(true == 1); // true
console.log(false == 0); // true
console.log(null == undefined); // true
console.log('' == 0); // true
console.log([1] == 1); // true

// ==========================================
// EXAMPLE 2: Strict Equality (===)
// ==========================================

console.log(5 === 5); // true
console.log(5 === '5'); // false (different types)
console.log(true === 1); // false
console.log(false === 0); // false
console.log(null === undefined); // false
console.log('' === 0); // false

// ==========================================
// EXAMPLE 3: typeof Operator
// ==========================================

// Primitives
console.log(typeof 42); // 'number'
console.log(typeof 'hello'); // 'string'
console.log(typeof true); // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof Symbol('id')); // 'symbol'
console.log(typeof 123n); // 'bigint'

// Objects
console.log(typeof {}); // 'object'
console.log(typeof []); // 'object' (arrays are objects)
console.log(typeof null); // 'object' (known bug!)
console.log(typeof function() {}); // 'function'

// ==========================================
// EXAMPLE 4: Special Cases
// ==========================================

// NaN
console.log(NaN == NaN); // false
console.log(NaN === NaN); // false
console.log(Object.is(NaN, NaN)); // true
console.log(Number.isNaN(NaN)); // true (recommended)

// -0 vs +0
console.log(-0 == 0); // true
console.log(-0 === 0); // true
console.log(Object.is(-0, 0)); // false

// null and undefined
console.log(null == undefined); // true
console.log(null === undefined); // false
console.log(typeof null); // 'object'
console.log(typeof undefined); // 'undefined'

// ==========================================
// EXAMPLE 5: Object.is()
// ==========================================

// Object.is() is similar to === but handles special cases better
console.log(Object.is(5, 5)); // true
console.log(Object.is(5, '5')); // false
console.log(Object.is(NaN, NaN)); // true (unlike ===)
console.log(Object.is(-0, 0)); // false (unlike ===)

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/**
 * Exercise 1: Predict the results
 */
function exercise1() {
  console.log('0' == 0); // ?
  console.log('0' === 0); // ?
  console.log([] == false); // ?
  console.log([] === false); // ?
  console.log('' == false); // ?
  console.log('' === false); // ?
}

/**
 * Exercise 2: Create a type checking utility
 */
function getDetailedType(value) {
  // TODO: Return accurate type for any value
  // Handle: primitives, null, arrays, objects, functions, dates, regex, etc.
}

// Test cases:
// console.log(getDetailedType([])); // 'array'
// console.log(getDetailedType(null)); // 'null'
// console.log(getDetailedType(new Date())); // 'date'

/**
 * Exercise 3: Implement a safe equality check
 */
function safeEquals(a, b, strict = true) {
  // TODO: Implement equality check with option for strict or loose
  // Handle NaN specially (NaN should equal NaN)
}

/**
 * Exercise 4: Find the bugs
 */
function hasBugs() {
  // Bug 1
  if (typeof value == 'undefined') { // value is not defined!
    console.log('Value is undefined');
  }
  
  // Bug 2
  const arr = [];
  if (arr) { // Always truthy, even if empty
    console.log('Array has items');
  }
  
  // Bug 3
  const num = '123';
  if (typeof num == 'number') { // This is false!
    console.log('Is a number');
  }
  
  // TODO: Fix these bugs
}

// ==========================================
// COMMON PITFALLS
// ==========================================

/**
 * Pitfall 1: Array and object equality
 */
console.log([] == []); // false
console.log([] === []); // false
console.log({} == {}); // false
// Objects compare by reference, not value!

/**
 * Pitfall 2: typeof null
 */
if (typeof value === 'object') {
  // This includes null!
  // value.property; // Could throw error if value is null
}

// Better:
if (value !== null && typeof value === 'object') {
  // Safe to access properties
}

/**
 * Pitfall 3: typeof arrays
 */
const arr = [];
console.log(typeof arr); // 'object', not 'array'
// Use Array.isArray(arr) instead

/**
 * Pitfall 4: Truthy/falsy with ==
 */
console.log('false' == false); // false
console.log('false' == true); // false
// String 'false' is truthy!

/**
 * Pitfall 5: Comparing with true/false
 */
const value = 'hello';
if (value == true) { // false - don't do this!
  console.log('Not what you expect');
}

// Better:
if (value) { // Use truthiness
  console.log('Value is truthy');
}

// ==========================================
// BEST PRACTICES
// ==========================================

/**
 * 1. Always use === unless you have a specific reason
 */
const goodComparison = (x === y);
const badComparison = (x == y); // Avoid

/**
 * 2. Check for null and undefined explicitly
 */
if (value === null || value === undefined) {
  // Handle null/undefined
}
// Or use nullish coalescing
const result = value ?? 'default';

/**
 * 3. Use appropriate type checking methods
 */
Array.isArray(value); // For arrays
Number.isNaN(value); // For NaN
value === null; // For null
typeof value === 'string'; // For strings

/**
 * 4. Be careful with typeof
 */
function safeTypeCheck(value) {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

/**
 * 5. Use Object.is() for special cases
 */
function areValuesSame(a, b) {
  return Object.is(a, b); // Handles NaN and -0/+0 correctly
}

// ==========================================
// NOTES
// ==========================================
// - Prefer === over ==
// - typeof has quirks (null, arrays)
// - Objects compare by reference
// - NaN is special (not equal to itself)
// - Use appropriate checking methods for each type
// - Object.is() is most precise but less common
