const conceptsData = [
    {
        id: 1,
        title: "Call Stack",
        description: "The call stack is a mechanism that the JavaScript interpreter uses to keep track of function execution. It follows the Last In, First Out (LIFO) principle.",
        example: `// Understanding Call Stack
function first() {
    console.log('First function');
    second();
    console.log('First function ends');
}

function second() {
    console.log('Second function');
    third();
    console.log('Second function ends');
}

function third() {
    console.log('Third function');
}

// Call the first function
first();

// The call stack executes functions in order:
// 1. first() is pushed to stack
// 2. second() is pushed to stack
// 3. third() is pushed to stack
// 4. third() completes and pops off
// 5. second() completes and pops off
// 6. first() completes and pops off`
    },
    {
        id: 2,
        title: "Primitive Types",
        description: "JavaScript has 7 primitive data types: string, number, bigint, boolean, undefined, symbol, and null.",
        example: `// Primitive Types in JavaScript
console.log('String:', typeof "Hello");
console.log('Number:', typeof 42);
console.log('BigInt:', typeof 9007199254740991n);
console.log('Boolean:', typeof true);
console.log('Undefined:', typeof undefined);
console.log('Symbol:', typeof Symbol('id'));
console.log('Null:', typeof null); // Known bug - returns 'object'

// Primitives are immutable
let str = "hello";
str[0] = "H"; // This doesn't work
console.log('String after attempt to modify:', str);

// Creating primitives
const num = 100;
const bool = false;
const sym = Symbol('unique');
console.log('Created primitives:', num, bool, sym);`
    },
    {
        id: 3,
        title: "Value Types and Reference Types",
        description: "Value types (primitives) are copied by value, while reference types (objects, arrays) are copied by reference.",
        example: `// Value Types (Primitives)
let a = 10;
let b = a; // Copy by value
b = 20;
console.log('a:', a); // 10 (unchanged)
console.log('b:', b); // 20

// Reference Types (Objects)
let obj1 = { name: 'John' };
let obj2 = obj1; // Copy by reference
obj2.name = 'Jane';
console.log('obj1.name:', obj1.name); // 'Jane' (changed!)
console.log('obj2.name:', obj2.name); // 'Jane'

// Arrays are also reference types
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log('arr1:', arr1); // [1, 2, 3, 4]
console.log('arr2:', arr2); // [1, 2, 3, 4]

// To copy by value, use spread operator or other methods
let obj3 = { ...obj1 };
obj3.name = 'Bob';
console.log('obj1.name:', obj1.name); // 'Jane' (unchanged)
console.log('obj3.name:', obj3.name); // 'Bob'`
    },
    {
        id: 4,
        title: "Implicit, Explicit, Nominal, Structuring and Duck Typing",
        description: "Different ways JavaScript performs type conversion and type checking.",
        example: `// Implicit Type Coercion
console.log('5' + 5); // '55' (string concatenation)
console.log('5' - 5); // 0 (numeric subtraction)
console.log(true + 1); // 2 (boolean to number)

// Explicit Type Conversion
console.log(Number('42')); // 42
console.log(String(42)); // '42'
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true

// Duck Typing - "If it walks like a duck..."
function quack(duck) {
    if (duck.quack) {
        duck.quack();
    }
}

const realDuck = {
    quack: () => console.log('Quack!')
};

const fakeDuck = {
    quack: () => console.log('I can quack too!')
};

quack(realDuck);
quack(fakeDuck);`
    },
    {
        id: 5,
        title: "== vs === vs typeof",
        description: "Understanding equality operators and type checking in JavaScript.",
        example: `// == (loose equality) vs === (strict equality)
console.log('5' == 5);   // true (type coercion)
console.log('5' === 5);  // false (no type coercion)

console.log(null == undefined);  // true
console.log(null === undefined); // false

console.log(0 == false);  // true
console.log(0 === false); // false

// typeof operator
console.log(typeof 42);        // 'number'
console.log(typeof 'hello');   // 'string'
console.log(typeof true);      // 'boolean'
console.log(typeof undefined); // 'undefined'
console.log(typeof {});        // 'object'
console.log(typeof []);        // 'object' (arrays are objects)
console.log(typeof null);      // 'object' (historical bug)
console.log(typeof function(){}); // 'function'

// Best practices
const value = '5';
if (value === '5') {
    console.log('Always use === for comparison');
}`
    },
    {
        id: 6,
        title: "Function Scope, Block Scope and Lexical Scope",
        description: "Understanding different types of scope in JavaScript.",
        example: `// Function Scope (var)
function functionScope() {
    var x = 10;
    if (true) {
        var x = 20; // Same variable
        console.log('Inside if:', x); // 20
    }
    console.log('Outside if:', x); // 20
}
functionScope();

// Block Scope (let and const)
function blockScope() {
    let y = 10;
    if (true) {
        let y = 20; // Different variable
        console.log('Inside if:', y); // 20
    }
    console.log('Outside if:', y); // 10
}
blockScope();

// Lexical Scope
function outer() {
    const outerVar = 'I am outer';
    
    function inner() {
        console.log(outerVar); // Accesses outer scope
    }
    
    inner();
}
outer();

// Global scope
const globalVar = 'I am global';
function accessGlobal() {
    console.log(globalVar);
}
accessGlobal();`
    },
    {
        id: 7,
        title: "Expression vs Statement",
        description: "Expressions produce values, statements perform actions.",
        example: `// Expressions - produce a value
const sum = 5 + 10; // Expression
console.log('Expression result:', sum);

const isTrue = (5 > 3); // Expression
console.log('Boolean expression:', isTrue);

// Statement - performs an action
if (isTrue) {
    console.log('This is a statement');
}

// Function Expression
const add = function(a, b) {
    return a + b;
};
console.log('Function expression:', add(5, 3));

// Function Statement (Declaration)
function multiply(a, b) {
    return a * b;
}
console.log('Function statement:', multiply(5, 3));

// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log('IIFE executed!');
})();

// Ternary operator (expression)
const result = (10 > 5) ? 'Greater' : 'Smaller';
console.log('Ternary result:', result);`
    },
    {
        id: 8,
        title: "IIFE, Modules and Namespaces",
        description: "Patterns for organizing and encapsulating JavaScript code.",
        example: `// IIFE (Immediately Invoked Function Expression)
(function() {
    const private = 'I am private';
    console.log('IIFE executed with private variable');
})();

// Module Pattern
const myModule = (function() {
    let privateVar = 'I am private';
    
    return {
        publicMethod: function() {
            console.log('Public method accessing:', privateVar);
        },
        setPrivate: function(value) {
            privateVar = value;
        }
    };
})();

myModule.publicMethod();
myModule.setPrivate('New value');
myModule.publicMethod();

// Namespace Pattern
const MyApp = MyApp || {};
MyApp.utilities = {
    formatDate: function(date) {
        return date.toISOString();
    },
    log: function(message) {
        console.log('[MyApp]', message);
    }
};

MyApp.utilities.log('Namespace pattern example');

// Modern ES6 Module (simulation)
const Calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b
};

console.log('Calculator.add(10, 5):', Calculator.add(10, 5));`
    },
    {
        id: 9,
        title: "Message Queue and Event Loop",
        description: "Understanding how JavaScript handles asynchronous operations.",
        example: `// Event Loop demonstration
console.log('1. Start');

setTimeout(() => {
    console.log('3. Timeout callback (from message queue)');
}, 0);

Promise.resolve().then(() => {
    console.log('2. Promise callback (from microtask queue)');
});

console.log('4. End');

// The output order demonstrates:
// 1. Synchronous code runs first
// 2. Microtasks (Promises) run before macrotasks
// 3. Macrotasks (setTimeout) run last

// More complex example
console.log('\\n--- Complex Example ---');
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve()
    .then(() => console.log('C'))
    .then(() => console.log('D'));

console.log('E');

// Order: A, E, C, D, B`
    },
    {
        id: 10,
        title: "setTimeout, setInterval and requestAnimationFrame",
        description: "Timing functions in JavaScript for delayed and repeated execution.",
        example: `// setTimeout - executes once after delay
console.log('setTimeout example:');
const timeoutId = setTimeout(() => {
    console.log('Executed after 1 second');
}, 1000);

// You can cancel it
// clearTimeout(timeoutId);

// setInterval - executes repeatedly
console.log('\\nsetInterval example:');
let count = 0;
const intervalId = setInterval(() => {
    count++;
    console.log('Interval execution:', count);
    if (count >= 3) {
        clearInterval(intervalId);
        console.log('Interval stopped');
    }
}, 500);

// requestAnimationFrame - for smooth animations
console.log('\\nrequestAnimationFrame example:');
let frame = 0;
function animate() {
    frame++;
    console.log('Animation frame:', frame);
    if (frame < 3) {
        requestAnimationFrame(animate);
    }
}
// Uncomment to see animation (may be performance intensive)
// requestAnimationFrame(animate);

console.log('\\nNote: Timers are asynchronous and non-blocking');`
    },
    {
        id: 11,
        title: "JavaScript Engines",
        description: "JavaScript engines (like V8, SpiderMonkey) parse and execute JavaScript code.",
        example: `// JavaScript Engine optimizations
console.log('JavaScript Engine Concepts:');

// 1. JIT (Just-In-Time) Compilation
function hotFunction(n) {
    // This function will be optimized if called frequently
    return n * n;
}

console.log('Calling hot function:', hotFunction(5));

// 2. Inline Caching
const obj = { x: 1, y: 2 };
console.log('Property access:', obj.x); // Engine caches property location

// 3. Hidden Classes
class Point {
    constructor(x, y) {
        this.x = x; // Properties added in same order
        this.y = y; // create same hidden class
    }
}

const p1 = new Point(1, 2);
const p2 = new Point(3, 4);
console.log('Points created with same hidden class');

// 4. Garbage Collection
let temp = { data: 'temporary' };
temp = null; // Now eligible for garbage collection
console.log('Object dereferenced for GC');

// Engine-specific features
console.log('\\nEngine info available through:');
console.log('- Performance API');
console.log('- Memory management');
console.log('- Optimization hints');`
    },
    {
        id: 12,
        title: "Bitwise Operators, Type Arrays and Array Buffers",
        description: "Low-level operations for binary data manipulation.",
        example: `// Bitwise Operators
console.log('Bitwise AND:', 5 & 1);    // 0101 & 0001 = 0001 (1)
console.log('Bitwise OR:', 5 | 1);     // 0101 | 0001 = 0101 (5)
console.log('Bitwise XOR:', 5 ^ 1);    // 0101 ^ 0001 = 0100 (4)
console.log('Bitwise NOT:', ~5);       // ~0101 = 1010 (-6)
console.log('Left shift:', 5 << 1);    // 0101 << 1 = 1010 (10)
console.log('Right shift:', 5 >> 1);   // 0101 >> 1 = 0010 (2)

// Practical uses
function isEven(n) {
    return (n & 1) === 0;
}
console.log('\\n5 is even?', isEven(5)); // false
console.log('8 is even?', isEven(8));   // true

// Typed Arrays
const buffer = new ArrayBuffer(16); // 16 bytes
const int32View = new Int32Array(buffer);
int32View[0] = 42;
console.log('\\nTyped Array value:', int32View[0]);

// Different views of same buffer
const int8View = new Int8Array(buffer);
console.log('Int8 view of first byte:', int8View[0]);

// Use cases: binary data, image processing, WebGL
console.log('\\nTyped Arrays are useful for:');
console.log('- Binary file handling');
console.log('- Graphics processing');
console.log('- Audio processing');`
    },
    {
        id: 13,
        title: "DOM and Layout Trees",
        description: "The Document Object Model and how browsers render web pages.",
        example: `// DOM Manipulation examples
console.log('DOM Concepts (browser environment):');

// DOM Tree structure
console.log('Document structure:');
console.log('- Document (root)');
console.log('  - HTML');
console.log('    - Head');
console.log('    - Body');

// Layout/Render Tree
console.log('\\nLayout Tree includes:');
console.log('- Visible elements only');
console.log('- Computed styles');
console.log('- Position and size');

// Critical Rendering Path
console.log('\\nRendering steps:');
console.log('1. Parse HTML -> DOM Tree');
console.log('2. Parse CSS -> CSSOM Tree');
console.log('3. Combine -> Render Tree');
console.log('4. Layout (reflow)');
console.log('5. Paint');
console.log('6. Composite');

// Performance tips
console.log('\\nOptimization tips:');
console.log('- Minimize reflows (batch DOM changes)');
console.log('- Use document fragments');
console.log('- Avoid forced synchronous layouts');
console.log('- Use CSS transforms for animations');

// This code works in browser console:
// document.createElement('div')
// document.querySelector('.class')
// element.classList.add('active')`
    },
    {
        id: 14,
        title: "Factories and Classes",
        description: "Different patterns for creating objects in JavaScript.",
        example: `// Factory Function
function createPerson(name, age) {
    return {
        name: name,
        age: age,
        greet: function() {
            console.log(\`Hello, I'm \${this.name}\`);
        }
    };
}

const person1 = createPerson('Alice', 30);
person1.greet();

// Class (ES6+)
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        console.log(\`Hello, I'm \${this.name}\`);
    }
    
    static species() {
        return 'Homo Sapiens';
    }
}

const person2 = new Person('Bob', 25);
person2.greet();
console.log('Species:', Person.species());

// Constructor Function (Old way)
function Animal(name) {
    this.name = name;
}

Animal.prototype.speak = function() {
    console.log(\`\${this.name} makes a sound\`);
};

const dog = new Animal('Dog');
dog.speak();

console.log('\\nFactory vs Class:');
console.log('Factory: More flexible, no "new" keyword');
console.log('Class: Better inheritance, familiar syntax');`
    },
    {
        id: 15,
        title: "this, call, apply and bind",
        description: "Understanding the 'this' keyword and methods to control its context.",
        example: `// 'this' in different contexts
const obj = {
    name: 'Object',
    regularFunc: function() {
        console.log('Regular function this:', this.name);
    },
    arrowFunc: () => {
        console.log('Arrow function this:', this.name);
    }
};

obj.regularFunc(); // 'Object'
obj.arrowFunc();   // undefined (lexical this)

// call() - invokes function with specific 'this' and arguments
function greet(greeting, punctuation) {
    console.log(\`\${greeting}, \${this.name}\${punctuation}\`);
}

const person = { name: 'Alice' };
greet.call(person, 'Hello', '!');

// apply() - like call but takes array of arguments
greet.apply(person, ['Hi', '?']);

// bind() - creates new function with bound 'this'
const boundGreet = greet.bind(person);
boundGreet('Hey', '.');

// Practical example
const button = {
    clicked: 0,
    click: function() {
        this.clicked++;
        console.log('Button clicked:', this.clicked, 'times');
    }
};

button.click();
button.click();

// Binding for callbacks
setTimeout(button.click.bind(button), 100);`
    },
    {
        id: 16,
        title: "new, Constructor, instanceof and Instances",
        description: "Object creation and type checking in JavaScript.",
        example: `// Constructor function
function Car(make, model) {
    this.make = make;
    this.model = model;
}

Car.prototype.display = function() {
    console.log(\`\${this.make} \${this.model}\`);
};

// Using 'new' keyword
const car1 = new Car('Toyota', 'Camry');
car1.display();

// What 'new' does:
// 1. Creates new empty object
// 2. Sets prototype
// 3. Binds 'this' to new object
// 4. Returns the object

// instanceof operator
console.log('\\ninstanceof checks:');
console.log('car1 instanceof Car:', car1 instanceof Car);
console.log('car1 instanceof Object:', car1 instanceof Object);
console.log('car1 instanceof Array:', car1 instanceof Array);

// ES6 Class example
class Animal {
    constructor(name) {
        this.name = name;
    }
}

const dog = new Animal('Rex');
console.log('\\ndog instanceof Animal:', dog instanceof Animal);

// Multiple instances
const car2 = new Car('Honda', 'Civic');
console.log('\\nMultiple instances:');
console.log('car1 !== car2:', car1 !== car2);
console.log('Both are Car instances:', 
    car1 instanceof Car && car2 instanceof Car);`
    },
    {
        id: 17,
        title: "Prototype Inheritance and Prototype Chain",
        description: "JavaScript's prototypal inheritance system.",
        example: `// Prototype chain
const animal = {
    eats: true,
    walk() {
        console.log('Animal walks');
    }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

console.log('rabbit.eats:', rabbit.eats); // Inherited
console.log('rabbit.jumps:', rabbit.jumps); // Own property

// Prototype chain lookup
console.log('\\nPrototype chain:');
console.log('rabbit -> animal -> Object.prototype -> null');

// Constructor and prototype
function Dog(name) {
    this.name = name;
}

Dog.prototype.bark = function() {
    console.log(\`\${this.name} barks!\`);
};

const dog1 = new Dog('Rex');
const dog2 = new Dog('Max');

dog1.bark();
dog2.bark();

// Shared prototype
console.log('\\nShared prototype:');
console.log('dog1.bark === dog2.bark:', dog1.bark === dog2.bark);

// Inheritance with classes
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(\`\${this.name} makes a sound\`);
    }
}

class Cat extends Animal {
    speak() {
        console.log(\`\${this.name} meows\`);
    }
}

const cat = new Cat('Whiskers');
cat.speak();`
    },
    {
        id: 18,
        title: "Object.create and Object.assign",
        description: "Methods for object creation and property copying.",
        example: `// Object.create() - creates object with specified prototype
const personPrototype = {
    greet() {
        console.log(\`Hello, I'm \${this.name}\`);
    }
};

const person = Object.create(personPrototype);
person.name = 'Alice';
person.greet();

console.log('\\nPrototype chain:');
console.log('person.__proto__ === personPrototype:', 
    Object.getPrototypeOf(person) === personPrototype);

// Object.assign() - copies properties
const target = { a: 1, b: 2 };
const source = { b: 3, c: 4 };

const result = Object.assign(target, source);
console.log('\\nObject.assign result:', result);
console.log('target modified:', target);

// Shallow copy
const original = { x: 1, nested: { y: 2 } };
const copy = Object.assign({}, original);

copy.x = 10;
copy.nested.y = 20;

console.log('\\nShallow copy behavior:');
console.log('original.x:', original.x); // 1 (not changed)
console.log('original.nested.y:', original.nested.y); // 20 (changed!)

// Merging objects
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = { c: 3 };

const merged = Object.assign({}, obj1, obj2, obj3);
console.log('\\nMerged object:', merged);

// Modern alternative: spread operator
const spread = { ...obj1, ...obj2, ...obj3 };
console.log('Spread operator:', spread);`
    },
    {
        id: 19,
        title: "map, reduce, filter",
        description: "Essential array methods for functional programming.",
        example: `// map() - transforms each element
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log('map - doubled:', doubled);

const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 }
];
const names = users.map(user => user.name);
console.log('map - names:', names);

// filter() - selects elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log('\\nfilter - evens:', evens);

const adults = users.filter(user => user.age >= 18);
console.log('filter - adults:', adults);

// reduce() - reduces to single value
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('\\nreduce - sum:', sum);

const product = numbers.reduce((acc, n) => acc * n, 1);
console.log('reduce - product:', product);

// Chaining methods
const result = numbers
    .filter(n => n > 2)
    .map(n => n * 2)
    .reduce((acc, n) => acc + n, 0);
console.log('\\nChained result:', result);

// Real-world example
const cart = [
    { item: 'Book', price: 10, qty: 2 },
    { item: 'Pen', price: 2, qty: 5 }
];

const total = cart
    .map(item => item.price * item.qty)
    .reduce((sum, cost) => sum + cost, 0);
console.log('\\nCart total:', total);`
    },
    {
        id: 20,
        title: "Pure Functions, Side Effects, State Mutation and Event Propagation",
        description: "Functional programming concepts and their importance.",
        example: `// Pure Function - same input, same output, no side effects
function purePure(x, y) {
    return x + y;
}
console.log('Pure function:', purePure(2, 3)); // Always 5

// Impure Function - has side effects
let total = 0;
function impure(x) {
    total += x; // Modifies external state
    return total;
}
console.log('Impure function:', impure(5)); // 5
console.log('Impure function:', impure(5)); // 10 (different!)

// Avoiding State Mutation
const original = [1, 2, 3];

// Mutating (bad)
// original.push(4);

// Non-mutating (good)
const newArray = [...original, 4];
console.log('\\nOriginal unchanged:', original);
console.log('New array:', newArray);

// Object immutability
const person = { name: 'Alice', age: 25 };

// Mutating (bad)
// person.age = 26;

// Non-mutating (good)
const updatedPerson = { ...person, age: 26 };
console.log('\\nOriginal person:', person);
console.log('Updated person:', updatedPerson);

// Benefits of pure functions:
console.log('\\nPure function benefits:');
console.log('- Easy to test');
console.log('- Predictable');
console.log('- Cacheable');
console.log('- Parallelizable');
console.log('- Easy to reason about');`
    },
    {
        id: 21,
        title: "Closures",
        description: "A closure gives you access to an outer function's scope from an inner function.",
        example: `// Basic closure
function outer() {
    const message = 'Hello';
    
    function inner() {
        console.log(message); // Accesses outer scope
    }
    
    return inner;
}

const closureFunc = outer();
closureFunc(); // Still has access to 'message'

// Practical example: Counter
function createCounter() {
    let count = 0; // Private variable
    
    return {
        increment() {
            count++;
            console.log('Count:', count);
        },
        decrement() {
            count--;
            console.log('Count:', count);
        },
        getCount() {
            return count;
        }
    };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
console.log('Current count:', counter.getCount());

// Function factory
function multiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = multiplier(2);
const triple = multiplier(3);

console.log('\\ndouble(5):', double(5)); // 10
console.log('triple(5):', triple(5));   // 15

// Module pattern with closure
const calculator = (function() {
    let result = 0;
    
    return {
        add: (n) => { result += n; return result; },
        subtract: (n) => { result -= n; return result; },
        getResult: () => result
    };
})();

console.log('\\nCalculator add(10):', calculator.add(10));`
    },
    {
        id: 22,
        title: "High Order Functions",
        description: "Functions that operate on other functions, either by taking them as arguments or returning them.",
        example: `// Higher-order function that takes a function
function repeat(n, action) {
    for (let i = 0; i < n; i++) {
        action(i);
    }
}

console.log('Repeat example:');
repeat(3, (i) => console.log(\`Iteration \${i}\`));

// Higher-order function that returns a function
function greaterThan(n) {
    return (m) => m > n;
}

const greaterThan10 = greaterThan(10);
console.log('\\ngreaterThan10(11):', greaterThan10(11)); // true
console.log('greaterThan10(9):', greaterThan10(9));     // false

// Built-in higher-order functions
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log('\\nmap (HOF):', doubled);

const filtered = numbers.filter(n => n > 2);
console.log('filter (HOF):', filtered);

// Function composition
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

const add1 = x => x + 1;
const times2 = x => x * 2;

const add1ThenTimes2 = compose(times2, add1);
console.log('\\nComposed function(5):', add1ThenTimes2(5)); // (5+1)*2 = 12

// Practical example: Array sorting
const users = [
    { name: 'Charlie', age: 30 },
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 35 }
];

const sortedByAge = users.sort((a, b) => a.age - b.age);
console.log('\\nSorted by age:', sortedByAge.map(u => u.name));`
    },
    {
        id: 23,
        title: "Recursion",
        description: "A function that calls itself until it reaches a base case.",
        example: `// Basic recursion: Factorial
function factorial(n) {
    // Base case
    if (n <= 1) return 1;
    // Recursive case
    return n * factorial(n - 1);
}

console.log('factorial(5):', factorial(5)); // 120

// Fibonacci sequence
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log('\\nFibonacci sequence:');
for (let i = 0; i < 8; i++) {
    console.log(\`fib(\${i}) = \${fibonacci(i)}\`);
}

// Sum of array
function sumArray(arr) {
    if (arr.length === 0) return 0;
    return arr[0] + sumArray(arr.slice(1));
}

console.log('\\nsumArray([1,2,3,4]):', sumArray([1, 2, 3, 4]));

// Countdown
function countdown(n) {
    if (n < 0) return;
    console.log(n);
    countdown(n - 1);
}

console.log('\\nCountdown from 5:');
countdown(5);

// Nested object traversal
function findValue(obj, key) {
    if (obj[key] !== undefined) {
        return obj[key];
    }
    for (let k in obj) {
        if (typeof obj[k] === 'object') {
            const result = findValue(obj[k], key);
            if (result !== undefined) return result;
        }
    }
    return undefined;
}

const data = { a: { b: { c: 'found!' } } };
console.log('\\nNested search:', findValue(data, 'c'));`
    },
    {
        id: 24,
        title: "Collections and Generators",
        description: "Advanced iteration patterns including Sets, Maps, and Generator functions.",
        example: `// Set - unique values
const set = new Set([1, 2, 3, 3, 4]);
console.log('Set:', Array.from(set)); // [1, 2, 3, 4]

set.add(5);
set.delete(2);
console.log('Set has 3:', set.has(3));
console.log('Set size:', set.size);

// Map - key-value pairs
const map = new Map();
map.set('name', 'Alice');
map.set('age', 25);
map.set(1, 'number key');

console.log('\\nMap get name:', map.get('name'));
console.log('Map size:', map.size);

// Iterate over Map
console.log('\\nMap entries:');
for (let [key, value] of map) {
    console.log(\`\${key}: \${value}\`);
}

// Generator function
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

console.log('\\nGenerator:');
const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }

// Infinite generator
function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

console.log('\\nInfinite generator (first 5):');
const infinite = infiniteSequence();
for (let i = 0; i < 5; i++) {
    console.log(infinite.next().value);
}

// Generator with fibonacci
function* fibonacciGen() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

console.log('\\nFibonacci generator (first 7):');
const fib = fibonacciGen();
for (let i = 0; i < 7; i++) {
    console.log(fib.next().value);
}`
    },
    {
        id: 25,
        title: "Promises",
        description: "Objects representing the eventual completion or failure of an asynchronous operation.",
        example: `// Creating a Promise
const promise = new Promise((resolve, reject) => {
    const success = true;
    
    if (success) {
        resolve('Promise resolved!');
    } else {
        reject('Promise rejected!');
    }
});

promise
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Simulating async operation
function delay(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(\`Waited \${ms}ms\`), ms);
    });
}

console.log('\\nAsync delay:');
delay(1000).then(result => console.log(result));

// Chaining promises
Promise.resolve(5)
    .then(x => x * 2)
    .then(x => x + 3)
    .then(x => console.log('Chained result:', x)); // 13

// Promise.all - wait for all
const promises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
];

Promise.all(promises)
    .then(results => console.log('\\nPromise.all:', results));

// Promise.race - first to complete
Promise.race([
    delay(100).then(() => 'fast'),
    delay(200).then(() => 'slow')
]).then(result => console.log('\\nPromise.race:', result));

// Error handling
Promise.reject('Error occurred')
    .catch(error => console.log('\\nCaught error:', error))
    .finally(() => console.log('Cleanup in finally'));

console.log('\\nPromises are non-blocking!');`
    },
    {
        id: 26,
        title: "async/await",
        description: "Syntactic sugar over Promises for writing asynchronous code that looks synchronous.",
        example: `// async function always returns a Promise
async function basicAsync() {
    return 'Hello from async';
}

basicAsync().then(result => console.log(result));

// await pauses execution until Promise resolves
async function waitExample() {
    console.log('\\nStart waiting...');
    
    const result = await new Promise(resolve => {
        setTimeout(() => resolve('Waited!'), 1000);
    });
    
    console.log(result);
    console.log('Done waiting!');
}

waitExample();

// Error handling with try/catch
async function withErrorHandling() {
    try {
        const result = await Promise.reject('Error!');
        console.log(result);
    } catch (error) {
        console.log('\\nCaught error:', error);
    }
}

withErrorHandling();

// Multiple awaits
async function sequential() {
    console.log('\\nSequential execution:');
    const result1 = await Promise.resolve('First');
    console.log(result1);
    const result2 = await Promise.resolve('Second');
    console.log(result2);
}

sequential();

// Parallel execution
async function parallel() {
    console.log('\\nParallel execution:');
    const [result1, result2] = await Promise.all([
        Promise.resolve('First'),
        Promise.resolve('Second')
    ]);
    console.log(result1, result2);
}

parallel();

// Real-world pattern
async function fetchUserData(userId) {
    try {
        // Simulated API call
        const user = await Promise.resolve({ 
            id: userId, 
            name: 'Alice' 
        });
        console.log('\\nFetched user:', user);
        return user;
    } catch (error) {
        console.error('Failed to fetch user:', error);
    }
}

fetchUserData(1);`
    },
    {
        id: 27,
        title: "Data Structures",
        description: "Fundamental ways to organize and store data efficiently.",
        example: `// Array - ordered collection
const array = [1, 2, 3, 4, 5];
console.log('Array:', array);
console.log('Access by index:', array[2]);

// Stack - LIFO (Last In, First Out)
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) { this.items.push(item); }
    pop() { return this.items.pop(); }
    peek() { return this.items[this.items.length - 1]; }
    isEmpty() { return this.items.length === 0; }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
console.log('\\nStack peek:', stack.peek()); // 2
console.log('Stack pop:', stack.pop());      // 2

// Queue - FIFO (First In, First Out)
class Queue {
    constructor() {
        this.items = [];
    }
    enqueue(item) { this.items.push(item); }
    dequeue() { return this.items.shift(); }
    front() { return this.items[0]; }
    isEmpty() { return this.items.length === 0; }
}

const queue = new Queue();
queue.enqueue('A');
queue.enqueue('B');
console.log('\\nQueue front:', queue.front());   // 'A'
console.log('Queue dequeue:', queue.dequeue()); // 'A'

// Linked List
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }
    append(data) {
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            return;
        }
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }
}

const list = new LinkedList();
list.append(1);
list.append(2);
console.log('\\nLinked list created');

// Hash Table (Map)
const hashTable = new Map();
hashTable.set('key1', 'value1');
console.log('\\nHash table:', hashTable.get('key1'));`
    },
    {
        id: 28,
        title: "Expensive Operation and Big O Notation",
        description: "Understanding algorithm complexity and performance.",
        example: `// O(1) - Constant time
function constantTime(arr) {
    return arr[0]; // Always takes same time
}
console.log('O(1) example:', constantTime([1, 2, 3]));

// O(n) - Linear time
function linearTime(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}
console.log('O(n) example:', linearTime([1, 2, 3, 4, 5]));

// O(n²) - Quadratic time
function quadraticTime(arr) {
    const pairs = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            pairs.push([arr[i], arr[j]]);
        }
    }
    return pairs.length;
}
console.log('O(n²) example:', quadraticTime([1, 2, 3]));

// O(log n) - Logarithmic time
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
console.log('\\nO(log n) binary search:', 
    binarySearch([1, 2, 3, 4, 5], 3));

// Performance comparison
console.log('\\nComplexity comparison:');
console.log('O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ)');

// Space complexity
console.log('\\nSpace complexity:');
console.log('O(1): Constant space');
console.log('O(n): Linear space (e.g., copying array)');

// Practical tips
console.log('\\nOptimization tips:');
console.log('- Avoid nested loops when possible');
console.log('- Use hash tables for O(1) lookups');
console.log('- Use binary search on sorted data');`
    },
    {
        id: 29,
        title: "Algorithms",
        description: "Common algorithms and problem-solving techniques.",
        example: `// Sorting: Bubble Sort
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

console.log('Bubble Sort:', bubbleSort([64, 34, 25, 12, 22]));

// Searching: Binary Search
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

console.log('\\nBinary Search:', 
    binarySearch([1, 2, 3, 4, 5], 3));

// Recursion: Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) return arr;
    
    const pivot = arr[arr.length - 1];
    const left = arr.filter((x, i) => x < pivot && i < arr.length - 1);
    const right = arr.filter((x, i) => x >= pivot && i < arr.length - 1);
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log('Quick Sort:', quickSort([3, 6, 8, 10, 1, 2, 1]));

// Finding max/min
function findMax(arr) {
    return Math.max(...arr);
}

console.log('\\nFind Max:', findMax([1, 5, 3, 9, 2]));

// Reverse string
function reverseString(str) {
    return str.split('').reverse().join('');
}

console.log('Reverse String:', reverseString('hello'));

// Check palindrome
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

console.log('\\nIs Palindrome "racecar":', isPalindrome('racecar'));

// FizzBuzz
function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 15 === 0) console.log('FizzBuzz');
        else if (i % 3 === 0) console.log('Fizz');
        else if (i % 5 === 0) console.log('Buzz');
        else console.log(i);
    }
}

console.log('\\nFizzBuzz to 15:');
fizzBuzz(15);`
    },
    {
        id: 30,
        title: "Inheritance, Polymorphism and Code Reuse",
        description: "Object-oriented programming principles in JavaScript.",
        example: `// Inheritance with classes
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        console.log(\`\${this.name} makes a sound\`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name); // Call parent constructor
        this.breed = breed;
    }
    
    speak() {
        console.log(\`\${this.name} barks\`);
    }
    
    fetch() {
        console.log(\`\${this.name} fetches the ball\`);
    }
}

const dog = new Dog('Rex', 'German Shepherd');
dog.speak(); // Polymorphism - overridden method
dog.fetch();

// Polymorphism example
class Cat extends Animal {
    speak() {
        console.log(\`\${this.name} meows\`);
    }
}

const animals = [
    new Dog('Rex', 'Husky'),
    new Cat('Whiskers'),
    new Animal('Generic')
];

console.log('\\nPolymorphism in action:');
animals.forEach(animal => animal.speak());

// Composition over inheritance
const canEat = {
    eat() {
        console.log(\`\${this.name} is eating\`);
    }
};

const canWalk = {
    walk() {
        console.log(\`\${this.name} is walking\`);
    }
};

function createPerson(name) {
    return Object.assign(
        { name },
        canEat,
        canWalk
    );
}

const person = createPerson('Alice');
person.eat();
person.walk();

console.log('\\nOOP Principles:');
console.log('- Inheritance: reuse parent class code');
console.log('- Polymorphism: same interface, different implementations');
console.log('- Encapsulation: hide internal details');
console.log('- Abstraction: hide complexity');`
    },
    {
        id: 31,
        title: "Design Patterns",
        description: "Common solutions to recurring problems in software design.",
        example: `// 1. Singleton Pattern
const Singleton = (function() {
    let instance;
    
    function createInstance() {
        return { data: 'I am the instance' };
    }
    
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log('Singleton:', instance1 === instance2); // true

// 2. Factory Pattern
function createVehicle(type) {
    if (type === 'car') {
        return { type: 'car', wheels: 4 };
    } else if (type === 'bike') {
        return { type: 'bike', wheels: 2 };
    }
}

const car = createVehicle('car');
console.log('\\nFactory created:', car);

// 3. Observer Pattern
class Subject {
    constructor() {
        this.observers = [];
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const subject = new Subject();
subject.subscribe(data => console.log('Observer 1:', data));
subject.subscribe(data => console.log('Observer 2:', data));
subject.notify('Event occurred!');

// 4. Module Pattern
const Calculator = (function() {
    let result = 0;
    
    return {
        add: (x) => { result += x; return result; },
        subtract: (x) => { result -= x; return result; },
        getResult: () => result
    };
})();

console.log('\\nModule pattern:', Calculator.add(10));

// 5. Decorator Pattern
function Coffee() {
    this.cost = function() { return 5; };
}

function withMilk(coffee) {
    const cost = coffee.cost();
    coffee.cost = function() { return cost + 2; };
}

const coffee = new Coffee();
console.log('\\nCoffee cost:', coffee.cost());
withMilk(coffee);
console.log('Coffee with milk:', coffee.cost());`
    },
    {
        id: 32,
        title: "Partial Applications, Currying, Compose and Pipe",
        description: "Advanced functional programming techniques.",
        example: `// Currying - transforms f(a,b,c) into f(a)(b)(c)
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...args2) {
            return curried.apply(this, args.concat(args2));
        }
    };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log('Currying:');
console.log('curriedAdd(1)(2)(3):', curriedAdd(1)(2)(3));
console.log('curriedAdd(1, 2)(3):', curriedAdd(1, 2)(3));

// Partial Application
function multiply(a, b, c) {
    return a * b * c;
}

function partial(fn, ...fixedArgs) {
    return function(...remainingArgs) {
        return fn(...fixedArgs, ...remainingArgs);
    };
}

const double = partial(multiply, 2);
console.log('\\nPartial: double(3, 4):', double(3, 4)); // 2 * 3 * 4 = 24

// Compose - right to left
const compose = (...fns) => x => 
    fns.reduceRight((acc, fn) => fn(acc), x);

const add1 = x => x + 1;
const times2 = x => x * 2;
const square = x => x * x;

const composed = compose(square, times2, add1);
console.log('\\nCompose (5+1)*2²:', composed(5)); // ((5+1)*2)² = 144

// Pipe - left to right
const pipe = (...fns) => x => 
    fns.reduce((acc, fn) => fn(acc), x);

const piped = pipe(add1, times2, square);
console.log('Pipe ((5+1)*2)²:', piped(5)); // ((5+1)*2)² = 144

// Real-world example
const data = [1, 2, 3, 4, 5];

const filterEven = arr => arr.filter(x => x % 2 === 0);
const sumArray = arr => arr.reduce((a, b) => a + b, 0);
const multiplyBy3 = x => x * 3;

const process = pipe(
    filterEven,
    sumArray,
    multiplyBy3
);

console.log('\\nPipeline result:', process(data)); // (2+4)*3 = 18`
    },
    {
        id: 33,
        title: "Clean Code",
        description: "Best practices for writing readable, maintainable code.",
        example: `// 1. Meaningful Names
// Bad
const d = new Date();
// Good
const currentDate = new Date();

// 2. Function should do one thing
// Bad
function processUserData(user) {
    // validates, saves, and sends email
}
// Good
function validateUser(user) { /* ... */ }
function saveUser(user) { /* ... */ }
function sendWelcomeEmail(user) { /* ... */ }

// 3. Small functions
function calculateTotal(items) {
    return items.reduce((sum, item) => sum + item.price, 0);
}
console.log('Small function example:', 
    calculateTotal([{price: 10}, {price: 20}]));

// 4. DRY (Don't Repeat Yourself)
function greet(name) {
    return \`Hello, \${name}!\`;
}
console.log('\\n' + greet('Alice'));
console.log(greet('Bob'));

// 5. Comments for why, not what
// Why: Performance optimization for large datasets
const useOptimizedAlgorithm = true;

// 6. Error handling
function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}

try {
    console.log('\\nDivision:', divide(10, 2));
} catch (error) {
    console.error('Error:', error.message);
}

// 7. Consistent formatting
const user = {
    name: 'Alice',
    age: 25,
    email: 'alice@example.com'
};

// 8. Single Responsibility
class User {
    constructor(name) {
        this.name = name;
    }
    
    getName() {
        return this.name;
    }
}

console.log('\\nClean code principles:');
console.log('- Meaningful names');
console.log('- Single responsibility');
console.log('- DRY principle');
console.log('- Small focused functions');
console.log('- Proper error handling');
console.log('- Clear and simple');`
    }
];
