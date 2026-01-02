<h1 align="center">
<br>
  <a href="https://github.com/leonardomso/33-js-concepts"><img src="github-image.png" alt="33 Concepts Every JS Developer Should Know"></a>
  <br>
    <br>
  <strong>33 Concepts Every JavaScript Developer Should Know</strong>
  <br><br>
</h1>

<p align="center">
  <a href="https://33jsconcepts.com">Read the Full Guide</a> •
  <a href="#concepts">Concepts</a> •
  <a href="TRANSLATIONS.md">Translations</a> •
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

<div align="center">
  <strong>Recognized by GitHub as one of the <a href="https://github.blog/news-insights/octoverse/new-open-source-projects/#top-projects-of-2018">top open source projects of 2018!</a></strong>
</div>

---

## About

This repository helps developers master core JavaScript concepts. Each concept includes clear explanations, practical code examples, and curated resources.

**[Start learning at 33jsconcepts.com →](https://33jsconcepts.com)**

---

## Concepts

### Fundamentals

- **[Primitive Types](https://33jsconcepts.com/concepts/primitive-types)**  
  Learn JavaScript's 7 primitive types: string, number, bigint, boolean, undefined, null, and symbol. Understand immutability, typeof quirks, and autoboxing.

- **[Value vs Reference Types](https://33jsconcepts.com/concepts/value-reference-types)**  
  Learn how value types and reference types work in JavaScript. Understand how primitives and objects are stored, why copying objects shares references, and how to avoid mutation bugs.

- **[Type Coercion](https://33jsconcepts.com/concepts/type-coercion)**  
  Learn JavaScript type coercion and implicit conversion. Understand how values convert to strings, numbers, and booleans, the 8 falsy values, and how to avoid common coercion bugs.

- **[Equality Operators](https://33jsconcepts.com/concepts/equality-operators)**  
  Learn JavaScript equality operators == vs ===, typeof quirks, and Object.is(). Understand type coercion, why NaN !== NaN, and why typeof null returns 'object'.

- **[Scope and Closures](https://33jsconcepts.com/concepts/scope-and-closures)**  
  Learn JavaScript scope and closures. Understand the three types of scope, var vs let vs const, lexical scoping, the scope chain, and closure patterns for data privacy.

- **[Call Stack](https://33jsconcepts.com/concepts/call-stack)**  
  Learn how the JavaScript call stack tracks function execution. Understand stack frames, LIFO ordering, execution contexts, stack overflow errors, and debugging with stack traces.

### Functions & Execution

- **[Event Loop](https://33jsconcepts.com/concepts/event-loop)**  
  Learn how the JavaScript event loop handles async code. Understand the call stack, task queue, microtasks, and why Promises always run before setTimeout().

- **[IIFE, Modules & Namespaces](https://33jsconcepts.com/concepts/iife-modules)**  
  Learn how to organize JavaScript code with IIFEs, namespaces, and ES6 modules. Understand private scope, exports, dynamic imports, and common module mistakes.

### Web Platform

- **[DOM](https://33jsconcepts.com/concepts/dom)**  
  Learn how the DOM works in JavaScript. Understand how browsers represent HTML as a tree, select and manipulate elements, traverse nodes, and optimize rendering performance.

- **[Fetch API](https://33jsconcepts.com/concepts/http-fetch)**  
  Learn how to make HTTP requests with the JavaScript Fetch API. Understand GET, POST, response handling, JSON parsing, error patterns, and AbortController for cancellation.

- **[Web Workers](https://33jsconcepts.com/concepts/web-workers)**  
  Learn Web Workers in JavaScript for running code in background threads. Understand postMessage, Dedicated and Shared Workers, and transferable objects.

### Object-Oriented JavaScript

- **[Factories and Classes](https://33jsconcepts.com/concepts/factories-classes)**  
  Learn JavaScript factory functions and ES6 classes. Understand constructors, prototypes, private fields, inheritance, and when to use each pattern.

- **[this, call, apply, bind](https://33jsconcepts.com/concepts/this-call-apply-bind)**  
  Learn how JavaScript's 'this' keyword works and how to control context binding. Understand the 5 binding rules, call/apply/bind methods, arrow functions, and common pitfalls.

- **[Object Creation & Prototypes](https://33jsconcepts.com/concepts/object-creation-prototypes)**  
  Learn JavaScript's prototype chain and object creation. Understand how inheritance works, the new operator's 4 steps, Object.create(), Object.assign(), and prototype methods.

- **[Inheritance & Polymorphism](https://33jsconcepts.com/concepts/inheritance-polymorphism)**  
  Learn inheritance and polymorphism in JavaScript — extending classes, prototype chains, method overriding, and code reuse patterns.

### Async JavaScript

- **[Callbacks](https://33jsconcepts.com/concepts/callbacks)**  
  Learn JavaScript callbacks, functions passed to other functions to be called later. Understand sync vs async callbacks, error-first patterns, callback hell, and why Promises were invented.

- **[Promises](https://33jsconcepts.com/concepts/promises)**  
  Learn JavaScript Promises for handling async operations. Understand how to create, chain, and combine Promises, handle errors properly, and avoid common pitfalls.

- **[async/await](https://33jsconcepts.com/concepts/async-await)**  
  Learn async/await in JavaScript. Syntactic sugar over Promises that makes async code readable. Covers error handling with try/catch, parallel execution with Promise.all, and common pitfalls.

- **[Generators & Iterators](https://33jsconcepts.com/concepts/generators-iterators)**  
  Learn JavaScript generators and iterators. Understand yield, the iteration protocol, lazy evaluation, infinite sequences, and async generators with for await...of.

### Functional Programming

- **[Higher-Order Functions](https://33jsconcepts.com/concepts/higher-order-functions)**  
  Learn higher-order functions in JavaScript. Understand functions that accept or return other functions, create reusable abstractions, and write cleaner code.

- **[Pure Functions](https://33jsconcepts.com/concepts/pure-functions)**  
  Learn pure functions in JavaScript. Understand the two rules of purity, avoid side effects, and write testable, predictable code with immutable patterns.

- **[map, reduce, filter](https://33jsconcepts.com/concepts/map-reduce-filter)**  
  Learn map, reduce, and filter in JavaScript. Transform, filter, and combine arrays without mutation. Includes method chaining and common pitfalls.

- **[Recursion](https://33jsconcepts.com/concepts/recursion)**  
  Learn recursion in JavaScript. Understand base cases, recursive calls, the call stack, and patterns like factorial, tree traversal, and memoization.

- **[Currying & Composition](https://33jsconcepts.com/concepts/currying-composition)**  
  Learn currying and function composition in JavaScript. Build reusable functions from simple pieces using curry, compose, and pipe for cleaner, modular code.

### Advanced Topics

- **[JavaScript Engines](https://33jsconcepts.com/concepts/javascript-engines)**  
  Learn how JavaScript engines work. Understand V8's architecture, parsing, compilation, JIT optimization, hidden classes, inline caching, and garbage collection.

- **[Error Handling](https://33jsconcepts.com/concepts/error-handling)**  
  Learn JavaScript error handling with try/catch/finally. Understand Error types, custom errors, async error patterns, and best practices for robust code.

- **[Regular Expressions](https://33jsconcepts.com/concepts/regular-expressions)**  
  Learn regular expressions in JavaScript. Covers pattern syntax, character classes, quantifiers, flags, capturing groups, and methods like test, match, and replace.

- **[Modern JS Syntax](https://33jsconcepts.com/concepts/modern-js-syntax)**  
  Learn modern JavaScript ES6+ syntax. Covers destructuring, spread/rest operators, arrow functions, optional chaining, nullish coalescing, and template literals.

- **[ES Modules](https://33jsconcepts.com/concepts/es-modules)**  
  Learn ES Modules in JavaScript. Understand import/export syntax, why ESM beats CommonJS, live bindings, dynamic imports, top-level await, and how modules enable tree-shaking.

- **[Data Structures](https://33jsconcepts.com/concepts/data-structures)**  
  Learn JavaScript data structures from built-in Arrays, Objects, Maps, and Sets to implementing Stacks, Queues, and Linked Lists. Understand when to use each structure.

- **[Algorithms & Big O](https://33jsconcepts.com/concepts/algorithms-big-o)**  
  Learn Big O notation and algorithms in JavaScript. Understand time complexity, implement searching and sorting algorithms, and recognize common interview patterns.

- **[Design Patterns](https://33jsconcepts.com/concepts/design-patterns)**  
  Learn JavaScript design patterns like Module, Singleton, Observer, Factory, Proxy, and Decorator. Understand when to use each pattern and avoid common pitfalls.

- **[Clean Code](https://33jsconcepts.com/concepts/clean-code)**  
  Learn clean code principles for JavaScript. Covers meaningful naming, small functions, DRY, avoiding side effects, and best practices to write maintainable code.

---

## Translations

This project has been translated into 40+ languages by our amazing community!

**[View all translations →](TRANSLATIONS.md)**

---

## Contributing

We welcome contributions! See our [Contributing Guidelines](CONTRIBUTING.md) for details.

---

## License

MIT © [Leonardo Maldonado](https://github.com/leonardomso)

---

<div align="center">
  <strong>If you find this helpful, please star the repo!</strong>
</div>
