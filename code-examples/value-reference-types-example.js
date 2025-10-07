/**
 * Value Types and Reference Types Example
 * 
 * Value types (primitives) are stored directly in the location that the variable accesses.
 * These include types like number, string, boolean, undefined, bigint, symbol, and null.
 * 
 * Reference types (objects) are stored in the heap. Variables assigned to reference types
 * actually store references (pointers) to the objects, not the objects themselves.
 */

// Value types (primitives) - stored by value
let num1 = 10;
let num2 = num1; // num2 gets a copy of the value

console.log("Before modification:");
console.log("num1:", num1); // 10
console.log("num2:", num2); // 10

num2 = 20; // Changing num2 doesn't affect num1

console.log("After modifying num2:");
console.log("num1:", num1); // Still 10
console.log("num2:", num2); // Now 20

// String example
let str1 = "Hello";
let str2 = str1; // str2 gets a copy of the value

str2 = "World"; // Changing str2 doesn't affect str1

console.log("str1:", str1); // Still "Hello"
console.log("str2:", str2); // Now "World"

// Boolean example
let bool1 = true;
let bool2 = bool1; // bool2 gets a copy of the value

bool2 = false; // Changing bool2 doesn't affect bool1

console.log("bool1:", bool1); // Still true
console.log("bool2:", bool2); // Now false

// Reference types (objects) - stored by reference
let obj1 = { name: "John", age: 30 };
let obj2 = obj1; // obj2 gets a reference to the same object

console.log("Before modification:");
console.log("obj1:", obj1); // { name: "John", age: 30 }
console.log("obj2:", obj2); // { name: "John", age: 30 }

obj2.age = 35; // Changing obj2 affects obj1 since they reference the same object

console.log("After modifying obj2.age:");
console.log("obj1:", obj1); // { name: "John", age: 35 } - obj1 is also changed!
console.log("obj2:", obj2); // { name: "John", age: 35 }

// Array example (arrays are objects in JavaScript)
let arr1 = [1, 2, 3];
let arr2 = arr1; // arr2 gets a reference to the same array

console.log("Before modification:");
console.log("arr1:", arr1); // [1, 2, 3]
console.log("arr2:", arr2); // [1, 2, 3]

arr2.push(4); // Changing arr2 affects arr1 since they reference the same array

console.log("After pushing to arr2:");
console.log("arr1:", arr1); // [1, 2, 3, 4] - arr1 is also changed!
console.log("arr2:", arr2); // [1, 2, 3, 4]

// Function example (functions are objects in JavaScript)
function originalFunction() {
    return "Original function";
}

let func1 = originalFunction;
let func2 = func1; // func2 gets a reference to the same function

console.log("func1 === func2:", func1 === func2); // true - they reference the same function

// Demonstrating how to copy objects instead of referencing them
let originalObj = { name: "Alice", details: { age: 25, city: "New York" } };

// Shallow copy using Object.assign
let shallowCopy = Object.assign({}, originalObj);

// Shallow copy using spread operator
let shallowCopy2 = { ...originalObj };

// Deep copy using JSON methods (has limitations with functions, dates, etc.)
let deepCopy = JSON.parse(JSON.stringify(originalObj));

console.log("Original object:", originalObj);
console.log("Shallow copy:", shallowCopy);
console.log("Deep copy:", deepCopy);

// Modifying the original object
originalObj.name = "Bob";
originalObj.details.age = 30;

console.log("After modifying original object:");
console.log("Original object:", originalObj);      // { name: "Bob", details: { age: 30, city: "New York" } }
console.log("Shallow copy:", shallowCopy);         // { name: "Alice", details: { age: 30, city: "New York" } } - nested object is still referenced
console.log("Deep copy:", deepCopy);               // { name: "Alice", details: { age: 25, city: "New York" } } - completely independent

// Demonstrating the difference with arrays
let originalArray = [1, [2, 3], 4];
let arrayCopy = [...originalArray]; // Shallow copy

originalArray[1][0] = 99; // Modifying nested array affects both arrays

console.log("Original array:", originalArray); // [1, [999, 3], 4]
console.log("Array copy:", arrayCopy);        // [1, [999, 3], 4] - nested array is still referenced

// Pass by value vs pass by reference in functions
function changePrimitive(primitive) {
    primitive = 100;
    console.log("Inside function (primitive):", primitive); // 100
}

function changeObject(obj) {
    obj.name = "Changed inside function";
    console.log("Inside function (object):", obj); // { name: "Changed inside function" }
}

let primitiveValue = 50;
let objectValue = { name: "Original" };

console.log("Before function calls:");
console.log("primitiveValue:", primitiveValue); // 50
console.log("objectValue:", objectValue);       // { name: "Original" }

changePrimitive(primitiveValue);
changeObject(objectValue);

console.log("After function calls:");
console.log("primitiveValue:", primitiveValue); // Still 50 - unchanged
console.log("objectValue:", objectValue);       // { name: "Changed inside function" } - changed!
