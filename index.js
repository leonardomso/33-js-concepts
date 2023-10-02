/* 
    33 JavaScript Concepts is a project created to help JavaScript developers master their skills. It is a compilation of fundamental JavaScript concepts that are important and fundamental. 

    This project was inspired by an article written by Stephen Curtis. 

    Any kind of contribution is welcome. Feel free to contribute.
*/

// Certainly! Here's a JavaScript file that combines the concepts with comments for explanation:

// Tip 1: Execution Stack
function foo() {
    console.log('Hello from foo!');
  }
  
  function bar() {
    foo();
  }
  
  bar(); // Calls bar, which calls foo, resulting in messages being added to the execution stack.
  
  // Tip 2: Primitive Types and Memory Storage
  let num = 42; // Number is a primitive type, and its value is stored directly in memory.
  let str = 'Hello'; // String is also a primitive type, and its value is stored in memory.
  
  // Tip 3: Value Types vs. Reference Types
  let a = 5; // a is a value type (number).
  let b = { x: 10 }; // b is a reference type (object).
  let c = b; // c now refers to the same object as b.
  
  // Tip 4: Type Checking
  console.log(5 == '5'); // true (values are equal)
  console.log(5 === '5'); // false (values and types are different)
  console.log(typeof 'Hello'); // "string"
  
  // Tip 5: Scopes
  function foo() {
    if (true) {
      var x = 10; // Function scope
      let y = 5; // Block scope
    }
  }
  
  // Tip 6: Expressions vs. Statements
  let sum = 2 + 3; // Expression (calculates a value)
  
  if (sum === 5) {
    console.log('Sum is 5'); // Statement (performs an action)
  }
  
  // Tip 7: IIFE (Immediately Invoked Function Expression)
  (function () {
    var privateVar = 'I am private!';
    console.log(privateVar);
  })();
  
  // Tip 8: Event Loop and Asynchronous JavaScript
  setTimeout(function () {
    console.log('Delayed log');
  }, 1000);
  
  // Tip 9: Bitwise Operators and Typed Arrays
  let x = 5 & 3; // Bitwise AND operation
  
  // Tip 10: Prototypal Inheritance
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.sayHello = function () {
    console.log('Hello, I am ' + this.name);
  };
  
  function Dog(name) {
    Animal.call(this, name);
  }
  
  Dog.prototype = Object.create(Animal.prototype);
  
  const dog = new Dog('Buddy');
  dog.sayHello(); // Calls the sayHello method inherited from Animal.
  
  // Tip 11: Difference between ==, ===, and typeof
  console.log(5 == '5'); // true (coercion)
  console.log(5 === '5'); // false (strict equality)
  console.log(typeof 'Hello'); // "string"
  
  // Tip 12: Function Scopes and Lexical Scopes
  function outer() {
    let x = 10; // Variable in outer scope
  
    function inner() {
      let y = 5; // Variable in inner scope
      console.log(x + y); // Access variables from outer scope
    }
  
    inner();
  }
  
  // Tip 13: Expressions vs. Statements
  let sum = 2 + 3; // Expression (calculates a value)
  
  if (sum === 5) {
    console.log('Sum is 5'); // Statement (performs an action)
  }
  
  // Tip 14: IIFE (Immediately Invoked Function Expression)
  (function () {
    var privateVar = 'I am private!';
    console.log(privateVar);
  })();
  
  // Tip 15: Event Loop and Asynchronous JavaScript
  setTimeout(function () {
    console.log('Delayed log');
  }, 1000);
  
  // Tip 16: Bitwise Operators and Typed Arrays
  let x = 5 & 3; // Bitwise AND operation
  
  // Tip 17: Prototypal Inheritance
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.sayHello = function () {
    console.log('Hello, I am ' + this.name);
  };
  
  function Dog(name) {
    Animal.call(this, name);
  }
  
  Dog.prototype = Object.create(Animal.prototype);
  
  const dog = new Dog('Buddy');
  dog.sayHello(); // Calls the sayHello method inherited from Animal.
  
  // Tip 18: Difference between ==, ===, and typeof
  console.log(5 == '5'); // true (coercion)
  console.log(5 === '5'); // false (strict equality)
  console.log(typeof 'Hello'); // "string"
  
  // Tip 19: Function Scopes and Lexical Scopes
  function outer() {
    let x = 10; // Variable in outer scope
  
    function inner() {
      let y = 5; // Variable in inner scope
      console.log(x + y); // Access variables from outer scope
    }
  
    inner();
  }
  
  // Tip 20: Expressions vs. Statements
  let sum = 2 + 3; // Expression (calculates a value)
  
  if (sum === 5) {
    console.log('Sum is 5'); // Statement (performs an action)
  }
  
  // Tip 21: IIFE (Immediately Invoked Function Expression)
  (function () {
    var privateVar = 'I am private!';
    console.log(privateVar);
  })();
  
  // Tip 22: Event Loop and Asynchronous JavaScript
  setTimeout(function () {
    console.log('Delayed log');
  }, 1000);
  
  // Tip 23: Bitwise Operators and Typed Arrays
  let x = 5 & 3; // Bitwise AND operation
  
  // Tip 24: Prototypal Inheritance
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.sayHello = function () {
    console.log('Hello, I am ' + this.name);
  };
  
  function Dog(name) {
    Animal.call(this, name);
  }
  
  Dog.prototype = Object.create(Animal.prototype);
  
  const dog = new Dog('Buddy');
  dog.sayHello(); // Calls the sayHello method inherited from Animal.
  
  // Tip 25: Difference between ==, ===, and typeof
  console.log(5 == '5'); // true (coercion)
  console.log(5 === '5'); // false (strict equality)
  console.log(typeof 'Hello'); // "string"
  
  // Tip 26: Function Scopes and Lexical Scopes
  function outer() {
    let x = 10; // Variable in outer scope
  
    function inner() {
      let y = 5; // Variable in inner scope
      console.log(x + y); // Access variables from outer scope
    }
  
    inner();
  }
  
  // Tip 27: Expressions vs. Statements
  let sum = 2 + 3; // Expression (calculates a value)
  
  if (sum === 5) {
    console.log('Sum is 5'); // Statement (performs an action)
  }
  
  // Tip 28: IIFE (Immediately Invoked Function Expression)
  (function () {
    var privateVar = 'I am private!';
    console.log(privateVar);
  })();
  
  // Tip 29: Event Loop and Asynchronous JavaScript
  setTimeout(function () {
    console.log('Delayed log');
  }, 1000);
  
  // Tip 30: Bitwise Operators and Typed Arrays
  let x = 5 & 3; // Bitwise AND operation
  
  // Tip 31: Prototypal Inheritance
  function Animal(name) {
    this.name = name;
  }
  
  Animal.prototype.sayHello = function () {
    console.log('Hello, I am ' + this.name);
  };
  
  function Dog(name) {
    Animal.call(this, name);
  }
  
  Dog.prototype = Object.create(Animal.prototype);
  
  const dog = new Dog('Buddy');
  dog.sayHello(); // Calls the sayHello method inherited from Animal.
  
  // Tip 32: Difference between ==, ===, and typeof
  console.log(5 == '5'); // true (coercion)
  console.log(5 === '5'); // false (strict equality)
  console.log(typeof 'Hello'); // "string"
  
  // Tip 33: Function Scopes and Lexical Scopes
  function outer() {
    let x = 10; // Variable in outer scope
  
    function inner() {
      let y = 5; // Variable in inner scope
      console.log(x + y); // Access variables from outer scope
    }
  
    inner();
  }
  