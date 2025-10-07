/**
 * Implicit, Explicit, Nominal, Structuring and Duck Typing Example
 * 
 * JavaScript is dynamically typed with various typing approaches:
 * - Implicit Typing (Type Coercion): JavaScript automatically converts types
 * - Explicit Typing: Manual conversion using functions like Number(), String(), Boolean()
 * - Duck Typing: If it walks like a duck and quacks like a duck, it's a duck
 */

// Implicit Typing (Type Coercion) examples
console.log("=== Implicit Typing (Type Coercion) ===");

// String concatenation with number
let result1 = "5" + 3; // "53" (number 3 is converted to string)
console.log('"5" + 3 =', result1, typeof result1); // "53" string

// Arithmetic operation with string
let result2 = "10" - 5; // 5 (string "10" is converted to number)
console.log('"10" - 5 =', result2, typeof result2); // 5 number

// Boolean conversion in conditionals
let result3 = "hello" && 42; // 42 (non-empty string is truthy)
console.log('"hello" && 42 =', result3); // 42

let result4 = "" && 42; // "" (empty string is falsy)
console.log('"" && 42 =', result4); // ""

// Loose equality comparison
console.log('5 == "5":', 5 == "5"); // true (values are converted before comparison)
console.log('0 == false:', 0 == false); // true (both convert to 0)
console.log('null == undefined:', null == undefined); // true (special case)

// Strict equality comparison
console.log('5 === "5":', 5 === "5"); // false (no type conversion)
console.log('0 === false:', 0 === false); // false (different types)

// Explicit Typing examples
console.log("\n=== Explicit Typing ===");

// Converting to number
let strNum = "42";
let num = Number(strNum);
console.log('Number("42"):', num, typeof num); // 42 number

let parsedNum = parseInt("42.7");
console.log('parseInt("42.7"):', parsedNum, typeof parsedNum); // 42 number

let floatNum = parseFloat("42.7");
console.log('parseFloat("42.7"):', floatNum, typeof floatNum); // 42.7 number

// Converting to string
let numToConvert = 123;
let str = String(numToConvert);
console.log('String(123):', str, typeof str); // "123" string

let boolToConvert = true;
let strBool = boolToConvert.toString();
console.log('true.toString():', strBool, typeof strBool); // "true" string

// Converting to boolean
let truthyValue = Boolean("hello");
console.log('Boolean("hello"):', truthyValue, typeof truthyValue); // true boolean

let falsyValue = Boolean(0);
console.log('Boolean(0):', falsyValue, typeof falsyValue); // false boolean

// Duck Typing examples
console.log("\n=== Duck Typing ===");

// Objects with similar interfaces can be used interchangeably
function makeSound(animal) {
    // Duck typing: if it has a makeSound method, treat it as an animal
    if (typeof animal.makeSound === 'function') {
        animal.makeSound();
    } else {
        console.log("This animal doesn't know how to make a sound");
    }
}

// Different objects with the same interface (duck typing)
let dog = {
    name: "Rex",
    makeSound: function() {
        console.log("Woof!");
    }
};

let cat = {
    name: "Whiskers",
    makeSound: function() {
        console.log("Meow!");
    }
};

let robot = {
    name: "Robo",
    makeSound: function() {
        console.log("Beep!");
    }
};

// All can be used with the same function due to duck typing
makeSound(dog);   // Woof!
makeSound(cat);   // Meow!
makeSound(robot); // Beep!

// Array-like object (duck typing)
let arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    // Add a method that works with array-like objects
    forEach: function(callback) {
        for (let i = 0; i < this.length; i++) {
            callback(this[i], i, this);
        }
    }
};

console.log("Array-like object:");
arrayLike.forEach(item => console.log(item)); // 'a', 'b', 'c'

// Structural Typing (objects are compatible if they share the same structure)
console.log("\n=== Structural Typing ===");

// Functions that expect objects with specific structure
function printName(person) {
    console.log(`Name: ${person.name}`);
}

// Objects with the same structure can be used interchangeably
let person1 = {
    name: "Alice",
    age: 30
};

let person2 = {
    name: "Bob",
    occupation: "Developer"
};

let person3 = {
    name: "Charlie",
    height: 180
};

// All of these work because they have the 'name' property
printName(person1); // Name: Alice
printName(person2); // Name: Bob
printName(person3); // Name: Charlie

// Falsy and truthy values conversion
console.log("\n=== Falsy and Truthy Values ===");

let values = [0, -0, "", "hello", null, undefined, NaN, [], [1, 2], {}, {a: 1}, false, true];

values.forEach(value => {
    console.log(`${JSON.stringify(value)} is ${Boolean(value) ? 'truthy' : 'falsy'} (type: ${typeof value})`);
});

// Complex coercion examples
console.log("\n=== Complex Coercion Examples ===");

// Comparing arrays
console.log('[1, 2, 3] == [1, 2, 3]:', [1, 2, 3] == [1, 2, 3]); // false (different objects)
console.log('[1, 2, 3] === [1, 2, 3]:', [1, 2, 3] === [1, 2, 3]); // false (different objects)

// Comparing objects
let obj1 = { a: 1 };
let obj2 = { a: 1 };
console.log('obj1 == obj2:', obj1 == obj2); // false (different objects in memory)
console.log('obj1 === obj2:', obj1 === obj2); // false (different objects in memory)

// Comparing same object reference
let obj3 = obj1;
console.log('obj1 == obj3:', obj1 == obj3); // true (same object in memory)
console.log('obj1 === obj3:', obj1 === obj3); // true (same object in memory)

// Comparing with valueOf and toString
let objA = {
    valueOf: function() { return 42; },
    toString: function() { return "forty-two"; }
};

let objB = {
    valueOf: function() { return 42; },
    toString: function() { return "forty-two"; }
};

console.log('objA == 42:', objA == 42); // true (objA.valueOf() is called)
console.log('objA == "forty-two":', objA == "forty-two"); // true (objA.toString() is called in some contexts)

// Demonstration of truthiness in conditional contexts
console.log("\n=== Truthiness in Conditionals ===");

let valueToCheck = "hello";
if (valueToCheck) {
    console.log("String 'hello' is truthy, so this runs");
}

let emptyString = "";
if (!emptyString) {
    console.log("Empty string is falsy, so this runs");
}

let zero = 0;
if (!zero) {
    console.log("Zero is falsy, so this runs");
}
