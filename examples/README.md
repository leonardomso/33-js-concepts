# JavaScript Concepts - Code Examples

This directory contains practical code examples for each of the 33 JavaScript concepts. Each file demonstrates the concept with multiple examples and explanations.

## How to Use

You can run these examples using Node.js:

```bash
node examples/01-call-stack.js
node examples/02-primitive-types.js
# ... and so on
```

Or include them in your HTML file:

```html
<script src="examples/01-call-stack.js"></script>
```

## Examples Index

### Fundamentals (1-10)
1. **[Call Stack](./01-call-stack.js)** - Understanding the JavaScript call stack and execution context
2. **[Primitive Types](./02-primitive-types.js)** - All 7 primitive types with examples
3. **[Value vs Reference](./03-value-vs-reference.js)** - How JavaScript handles value and reference types
4. **[Type Coercion](./04-type-coercion.js)** - Implicit and explicit type conversion
5. **[Equality Comparison](./05-equality-comparison.js)** - == vs === and typeof operator
6. **[Scope](./06-scope.js)** - Function, block, and lexical scope
7. **[Expression vs Statement](./07-expression-vs-statement.js)** - Understanding expressions and statements
8. **[IIFE & Modules](./08-iife-modules.js)** - Immediately Invoked Function Expressions and module patterns
9. **[Event Loop](./09-event-loop.js)** - Message queue and event loop mechanics
10. **[Timers](./10-timers.js)** - setTimeout, setInterval, and timing functions

### Intermediate Concepts (11-20)
11. JavaScript Engines
12. Bitwise Operators
13. DOM and Layout Trees
14. Factories and Classes
15. this, call, apply and bind
16. new, Constructor, instanceof
17. Prototype Inheritance
18. Object.create and Object.assign
19. map, reduce, filter
20. Pure Functions and Side Effects

### Advanced Concepts (21-33)
21. Closures
22. High Order Functions
23. Recursion
24. Collections and Generators
25. Promises
26. async/await
27. Data Structures
28. Big O Notation
29. Algorithms
30. Inheritance and Polymorphism
31. Design Patterns
32. Currying and Compose
33. Clean Code

## Contributing

Feel free to improve these examples or add new ones! Make sure your code:
- Is well-commented
- Includes multiple examples per concept
- Demonstrates both basic and advanced usage
- Follows consistent formatting

## Running All Examples

To run all examples sequentially:

```bash
for file in examples/*.js; do node "$file"; done
```

## Notes

- Some examples use `console.log` for demonstration purposes
- Browser-specific APIs (like `requestAnimationFrame`) may not work in Node.js
- Examples are designed to be educational and may not represent production-ready code
