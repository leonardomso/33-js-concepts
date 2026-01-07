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

- **[Primitives vs Objects](https://33jsconcepts.com/concepts/primitives-objects)**  
  Learn how JavaScript primitives and objects differ in behavior. Understand immutability, call-by-sharing semantics, why mutation works but reassignment doesn't, and how V8 actually stores values.

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

## Beyond 33: Extended Concepts

Ready to go deeper? These advanced topics build on the fundamentals above.

### Language Mechanics

- **[Hoisting](https://33jsconcepts.com/concepts/hoisting)**  
  Learn how JavaScript hoists variable and function declarations. Understand why `var` behaves differently from `let` and `const`, function hoisting order, and how to avoid common bugs.

- **[Temporal Dead Zone](https://33jsconcepts.com/concepts/temporal-dead-zone)**  
  Learn the Temporal Dead Zone (TDZ) in JavaScript. Understand why accessing `let` and `const` before declaration throws errors, and how TDZ differs from `var` hoisting.

- **[Strict Mode](https://33jsconcepts.com/concepts/strict-mode)**  
  Learn JavaScript strict mode and how `'use strict'` catches common mistakes. Understand silent errors it prevents, forbidden syntax, and when to use it.

### Type System

- **[JavaScript Type Nuances](https://33jsconcepts.com/concepts/javascript-type-nuances)**  
  Learn advanced JavaScript type behavior. Understand null vs undefined, short-circuit evaluation, typeof quirks, instanceof and Symbol.hasInstance, Symbols, and BigInt for large numbers.

### Objects & Properties

- **[Property Descriptors](https://33jsconcepts.com/concepts/property-descriptors)**  
  Learn JavaScript property descriptors. Understand writable, enumerable, and configurable attributes, Object.defineProperty(), and how to create immutable object properties.

- **[Getters & Setters](https://33jsconcepts.com/concepts/getters-setters)**  
  Learn JavaScript getters and setters. Understand how to define computed properties with `get` and `set`, validate data on assignment, and create reactive object behavior.

- **[Object Methods](https://33jsconcepts.com/concepts/object-methods)**  
  Learn essential JavaScript Object methods. Master Object.keys(), Object.values(), Object.entries(), Object.fromEntries(), Object.freeze(), Object.seal(), and object cloning patterns.

- **[Proxy & Reflect](https://33jsconcepts.com/concepts/proxy-reflect)**  
  Learn JavaScript Proxy and Reflect APIs. Understand how to intercept object operations, create reactive systems, implement validation, and build powerful metaprogramming patterns.

- **[WeakMap & WeakSet](https://33jsconcepts.com/concepts/weakmap-weakset)**  
  Learn JavaScript WeakMap and WeakSet. Understand weak references, automatic garbage collection, private data patterns, and when to use them over Map and Set.

### Memory & Performance

- **[Memory Management](https://33jsconcepts.com/concepts/memory-management)**  
  Learn JavaScript memory management. Understand the memory lifecycle, stack vs heap allocation, memory leaks, and how to profile memory usage in DevTools.

- **[Garbage Collection](https://33jsconcepts.com/concepts/garbage-collection)**  
  Learn how JavaScript garbage collection works. Understand mark-and-sweep, reference counting, generational GC, and how to write memory-efficient code.

- **[Debouncing & Throttling](https://33jsconcepts.com/concepts/debouncing-throttling)**  
  Learn debouncing and throttling in JavaScript. Understand how to optimize event handlers, reduce API calls, improve scroll performance, and implement both patterns from scratch.

- **[Memoization](https://33jsconcepts.com/concepts/memoization)**  
  Learn memoization in JavaScript. Understand how to cache function results, optimize expensive computations, implement memoization patterns, and when caching hurts performance.

### Modern Syntax & Operators

- **[Tagged Template Literals](https://33jsconcepts.com/concepts/tagged-template-literals)**  
  Learn JavaScript tagged template literals. Understand how to create custom string processing functions, build DSLs, sanitize HTML, and use popular libraries like styled-components.

- **[Computed Property Names](https://33jsconcepts.com/concepts/computed-property-names)**  
  Learn JavaScript computed property names. Understand how to use dynamic keys in object literals, create objects from variables, and leverage Symbol keys.

### Browser Storage

- **[localStorage & sessionStorage](https://33jsconcepts.com/concepts/localstorage-sessionstorage)**  
  Learn Web Storage APIs in JavaScript. Understand localStorage vs sessionStorage, storage limits, JSON serialization, storage events, and security considerations.

- **[IndexedDB](https://33jsconcepts.com/concepts/indexeddb)**  
  Learn IndexedDB for client-side storage in JavaScript. Understand how to store large amounts of structured data, create indexes, perform transactions, and handle versioning.

- **[Cookies](https://33jsconcepts.com/concepts/cookies)**  
  Learn JavaScript cookies. Understand how to read, write, and delete cookies, cookie attributes like HttpOnly and SameSite, security best practices, and when to use cookies vs Web Storage.

### Events

- **[Event Bubbling & Capturing](https://33jsconcepts.com/concepts/event-bubbling-capturing)**  
  Learn JavaScript event bubbling and capturing. Understand the three phases of event propagation, stopPropagation(), event flow direction, and when to use each phase.

- **[Event Delegation](https://33jsconcepts.com/concepts/event-delegation)**  
  Learn event delegation in JavaScript. Understand how to handle events efficiently using bubbling, manage dynamic elements, reduce memory usage, and implement common delegation patterns.

- **[Custom Events](https://33jsconcepts.com/concepts/custom-events)**  
  Learn JavaScript custom events. Understand how to create, dispatch, and listen for CustomEvent, pass data between components, and build decoupled event-driven architectures.

### Observer APIs

- **[Intersection Observer](https://33jsconcepts.com/concepts/intersection-observer)**  
  Learn the Intersection Observer API. Understand how to detect element visibility, implement lazy loading, infinite scroll, and animate elements on scroll efficiently.

- **[Mutation Observer](https://33jsconcepts.com/concepts/mutation-observer)**  
  Learn the Mutation Observer API. Understand how to watch DOM changes, detect attribute modifications, observe child elements, and replace deprecated mutation events.

- **[Resize Observer](https://33jsconcepts.com/concepts/resize-observer)**  
  Learn the Resize Observer API. Understand how to respond to element size changes, build responsive components, and replace inefficient window resize listeners.

- **[Performance Observer](https://33jsconcepts.com/concepts/performance-observer)**  
  Learn the Performance Observer API. Understand how to measure page performance, track Long Tasks, monitor layout shifts, and collect Core Web Vitals metrics.

### Data Handling

- **[JSON Deep Dive](https://33jsconcepts.com/concepts/json-deep-dive)**  
  Learn advanced JSON in JavaScript. Understand JSON.stringify() replacers, JSON.parse() revivers, handling circular references, BigInt serialization, and custom toJSON methods.

- **[Typed Arrays & ArrayBuffers](https://33jsconcepts.com/concepts/typed-arrays-arraybuffers)**  
  Learn JavaScript Typed Arrays and ArrayBuffers. Understand binary data handling, DataView, working with WebGL, file processing, and network protocol implementation.

- **[Blob & File API](https://33jsconcepts.com/concepts/blob-file-api)**  
  Learn JavaScript Blob and File APIs. Understand how to create, read, and manipulate binary data, handle file uploads, generate downloads, and work with FileReader.

- **[requestAnimationFrame](https://33jsconcepts.com/concepts/requestanimationframe)**  
  Learn requestAnimationFrame in JavaScript. Understand how to create smooth 60fps animations, sync with browser repaint cycles, and optimize animation performance.

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
