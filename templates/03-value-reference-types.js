/**
 * ==========================================
 * CONCEPT 3: VALUE TYPES AND REFERENCE TYPES
 * ==========================================
 * 
 * Value Types (Primitives): Stored directly, copied by value
 * Reference Types (Objects): Stored as reference, copied by reference
 * 
 * Key Difference:
 * - Primitives: Each variable holds its own copy
 * - Objects: Variables hold references to the same object
 */

// ==========================================
// EXAMPLE 1: Value Types (Primitives)
// ==========================================

let a = 10;
let b = a; // b gets a COPY of a's value

b = 20;

console.log(a); // 10 (unchanged)
console.log(b); // 20

// Each variable has its own independent value

// ==========================================
// EXAMPLE 2: Reference Types (Objects)
// ==========================================

let obj1 = { name: 'Alice' };
let obj2 = obj1; // obj2 gets a REFERENCE to the same object

obj2.name = 'Bob';

console.log(obj1.name); // 'Bob' (changed!)
console.log(obj2.name); // 'Bob'

// Both variables point to the same object in memory

// ==========================================
// EXAMPLE 3: Arrays (Reference Type)
// ==========================================

let arr1 = [1, 2, 3];
let arr2 = arr1; // Reference copy

arr2.push(4);

console.log(arr1); // [1, 2, 3, 4] (modified!)
console.log(arr2); // [1, 2, 3, 4]

// ==========================================
// EXAMPLE 4: Copying Objects (Shallow Copy)
// ==========================================

// Using spread operator
let original = { x: 1, y: 2 };
let copy = { ...original };

copy.x = 10;

console.log(original.x); // 1 (unchanged)
console.log(copy.x); // 10

// Using Object.assign
let anotherCopy = Object.assign({}, original);

// ==========================================
// EXAMPLE 5: Deep vs Shallow Copy
// ==========================================

// Shallow copy - nested objects still share references
let nested = {
  a: 1,
  b: {
    c: 2
  }
};

let shallowCopy = { ...nested };
shallowCopy.b.c = 20;

console.log(nested.b.c); // 20 (changed!)

// Deep copy - all levels are independent
let deepCopy = JSON.parse(JSON.stringify(nested));
deepCopy.b.c = 100;

console.log(nested.b.c); // 20 (unchanged)

// ==========================================
// EXAMPLE 6: Function Parameters
// ==========================================

// Primitives passed by value
function modifyPrimitive(num) {
  num = 100;
}

let x = 10;
modifyPrimitive(x);
console.log(x); // 10 (unchanged)

// Objects passed by reference
function modifyObject(obj) {
  obj.value = 100;
}

let myObj = { value: 10 };
modifyObject(myObj);
console.log(myObj.value); // 100 (changed!)

// But reassigning the parameter doesn't affect the original
function reassignObject(obj) {
  obj = { value: 100 };
}

let anotherObj = { value: 10 };
reassignObject(anotherObj);
console.log(anotherObj.value); // 10 (unchanged!)

// ==========================================
// PRACTICE EXERCISES
// ==========================================

/**
 * Exercise 1: Predict the output
 */
function exercise1() {
  let a = { x: 1 };
  let b = a;
  let c = { x: 1 };
  
  console.log(a === b); // ?
  console.log(a === c); // ?
  
  // TODO: Explain why these comparisons produce these results
}

/**
 * Exercise 2: Fix the bug
 * The following function should not modify the original array
 */
function doubleValues(arr) {
  // BUG: This modifies the original array
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
  }
  return arr;
}

// TODO: Fix this function to not modify the original
function doubleValuesFixed(arr) {
  // Your code here
}

// Test:
// let numbers = [1, 2, 3];
// let doubled = doubleValuesFixed(numbers);
// console.log(numbers); // Should still be [1, 2, 3]
// console.log(doubled); // Should be [2, 4, 6]

/**
 * Exercise 3: Implement a deep clone function
 */
function deepClone(obj) {
  // TODO: Implement deep cloning without JSON.parse/stringify
  // Handle objects, arrays, and primitives
  // Bonus: Handle dates, functions, and circular references
}

/**
 * Exercise 4: Understanding equality
 */
function exercise4() {
  const obj1 = { a: 1 };
  const obj2 = { a: 1 };
  const obj3 = obj1;
  
  // TODO: Predict and test these comparisons
  console.log(obj1 == obj2); // ?
  console.log(obj1 === obj2); // ?
  console.log(obj1 === obj3); // ?
  
  // How would you check if two objects have the same properties?
}

// ==========================================
// COMMON PITFALLS
// ==========================================

/**
 * Pitfall 1: Thinking spread operator creates deep copies
 */
let nested1 = { a: 1, b: { c: 2 } };
let nested2 = { ...nested1 };
nested2.b.c = 20;
console.log(nested1.b.c); // 20 - nested objects still share reference!

/**
 * Pitfall 2: Comparing objects by value instead of reference
 */
console.log({ a: 1 } === { a: 1 }); // false - different references
console.log([1, 2] === [1, 2]); // false - different references

/**
 * Pitfall 3: JSON.parse/stringify limitations
 */
let objWithFunction = {
  func: function() { return 1; },
  date: new Date(),
  undef: undefined
};
let cloned = JSON.parse(JSON.stringify(objWithFunction));
console.log(cloned);
// Lost: function, undefined
// Changed: Date becomes string

/**
 * Pitfall 4: Modifying function parameters
 */
function addProperty(obj) {
  obj.newProp = 'added'; // Modifies the original!
}

let myObject = { prop: 'value' };
addProperty(myObject);
console.log(myObject); // { prop: 'value', newProp: 'added' }

// ==========================================
// BEST PRACTICES
// ==========================================

/**
 * 1. Use const for object references to prevent reassignment
 */
const config = { setting: true };
// config = {}; // Error!
config.setting = false; // OK - modifying properties is allowed

/**
 * 2. Create copies when you need to modify
 */
function processArray(arr) {
  const copy = [...arr];
  // Work with copy instead of original
  return copy;
}

/**
 * 3. Use Object.freeze for immutability
 */
const immutable = Object.freeze({ value: 1 });
// immutable.value = 2; // Silently fails in non-strict mode

/**
 * 4. Consider using libraries for deep cloning
 */
// lodash: _.cloneDeep(obj)
// Or structuredClone() in modern JavaScript

// ==========================================
// NOTES
// ==========================================
// - Primitives are compared by value
// - Objects are compared by reference
// - Understand the difference to avoid bugs
// - Be careful with nested objects
// - Use appropriate cloning techniques
// - Consider immutability for complex applications
