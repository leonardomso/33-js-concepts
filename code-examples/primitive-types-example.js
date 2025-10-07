/**
 * Primitive Types Example
 * 
 * JavaScript has six primitive data types: string, number, bigint, boolean, undefined, and symbol.
 * There's also a special primitive type called null, which represents the intentional absence of any object value.
 * These types are immutable, meaning their values cannot be altered.
 */

// String primitive type
let name = "JavaScript";
console.log("String:", name, "Type:", typeof name);

// Number primitive type
let age = 25;
console.log("Number:", age, "Type:", typeof age);

// BigInt primitive type
let bigNumber = 123456789012345678901234567890n;
console.log("BigInt:", bigNumber, "Type:", typeof bigNumber);

// Boolean primitive type
let isLearning = true;
console.log("Boolean:", isLearning, "Type:", typeof isLearning);

// Undefined primitive type
let notDefined;
console.log("Undefined:", notDefined, "Type:", typeof notDefined);

// Symbol primitive type
let symbol1 = Symbol('description');
let symbol2 = Symbol('description');
console.log("Symbol 1:", symbol1, "Type:", typeof symbol1);
console.log("Symbol 2:", symbol2, "Are they equal?", symbol1 === symbol2); // false, symbols are always unique

// Null primitive type
let emptyValue = null;
console.log("Null:", emptyValue, "Type:", typeof emptyValue); // Note: typeof null returns "object" (this is a historical bug in JavaScript)

// Demonstrating immutability of primitives
let originalString = "Hello";
let modifiedString = originalString.toUpperCase(); // Creates a new string

console.log("Original:", originalString); // Still "Hello"
console.log("Modified:", modifiedString);  // "HELLO"

// Primitive values are copied by value, not by reference
let a = 10;
let b = a; // b gets a copy of the value
b = 20;    // Changing b doesn't affect a

console.log("a:", a); // Still 10
console.log("b:", b); // 20

// Primitive types don't have properties or methods, but JavaScript temporarily wraps them with objects when needed
console.log("Length of string:", name.length); // JavaScript temporarily wraps the string primitive in a String object to access the length property

// Example of how primitives are immutable
let greeting = "Hello";
greeting[0] = "h"; // This operation has no effect on the original string
console.log("Greeting after trying to modify:", greeting); // Still "Hello", not "hello"

// Demonstrating automatic wrapping with String object when calling methods
let upperGreeting = greeting.toUpperCase(); // JavaScript wraps greeting in String object to call toUpperCase()
console.log("Uppercase greeting:", upperGreeting); // "HELLO"

// Different ways to create primitives vs objects
let primitiveStr = "Hello";        // String primitive
let objectStr = new String("Hello"); // String object

console.log("Primitive:", primitiveStr, "Type:", typeof primitiveStr); // "Hello", "string"
console.log("Object:", objectStr, "Type:", typeof objectStr);         // String object, "object"

// Equality comparison
console.log("Are they equal?", primitiveStr == objectStr);  // true (loose equality)
console.log("Are they strictly equal?", primitiveStr === objectStr); // false (strict equality)
