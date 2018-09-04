<h1 align="center">
<br>
  <a href="https://github.com/thedaviddias/Front-End-Performance-Checklist"><img src="https://i.imgur.com/dsHmk6H.jpg" alt="33 Concepts Every JS Developer Should Know" width=200"></a>
  <br>
    <br>
  33 Concepts Every JavaScript Developer Should Know
  <br>
</h1>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="Licence MIT">
  </a>
</p>

## Introduction

This repository was created with the intention of helping developers master their concepts in JavaScript. It is not a requirement, but a guide for future studies. Feel free to contribute.

---

## Table of Contents

1. **[Call Stack](#call-stack)**
2. **[Primitive Types](#primitive-types)**
3. **[Value Types & Reference Types](#html)**
4. **[Implicit, Explicit, Nominal, Structuring & Duck Typing](#css)**
5. **[== vs === vs typeof](#html)**
6. **[Function Scope, Block Scope & Lexical Scope](#css)**
7. **[Expression vs Statement](#html)**
8. **[Call Stack & Expressions](#images)**
9. **[IIFE, Modules & Namespaces](#javascript)**
10. **[Message Queue & Event Loop](#css)**
11. **[setTimeout, setInterval & requestAnimationFrame](#html)**
12. **[Expensive Operation & Big O Notation](#images)**
13. **[JavaScript Engines](#javascript)**
14. **[Binary, Hex, Dec, Scientific Notation](#html)**
15. **[Bitwise Operators, Type Arrays & Array Buffers](#html)**
16. **[DOM & Layout Trees](#images)**
17. **[new, Constructor, instanceof & Instances](#javascript)**
18. **[Prototype Inheritance & Prototype Chain](#server)**
19. **[Object.create & Object.assign](#performances-and-js-frameworks)**
20. **[Factories & Classes](#images)**
21. **[Member Properties & Properties on the Prototype](#javascript)**
22. **[for, while vs map, reduce, filter](#server)**
23. **[map, reduce, filter](#performances-and-js-frameworks)**
24. **[Closures](#server)**
25. **[High Order Functions](#performances-and-js-frameworks)**
26. **[Abstract Data Structures in JavaScript](#images)**
27. **[Recursion](#javascript)**
28. **[Algorithms](#server)**
29. **[Inheritance, Polymorphism & Code Reuse](#performances-and-js-frameworks)**
30. **[Design Patterns](#images)**
31. **[Partial Functions, Currying, Compose, and Pipe](#javascript)**
32. **[this, call, apply & bind](#server)**
33. **[Clean Code](#performances-and-js-frameworks)**


---

## Call Stack

### Articles

 * 📜 [Understanding Javascript Call Stack, Event Loops — Gaurav Pandvia](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)
 * 📜 [Understanding the JavaScript Call Stack — Charles Freeborn](https://medium.freecodecamp.org/understanding-the-javascript-call-stack-861e41ae61d4)
 * 📜 [Javascript: What Is The Execution Context? What Is The Call Stack? — Valentino Gagliardi](https://www.valentinog.com/blog/js-execution-context-call-stack/)
 * 📜 [What is the JS Event Loop and Call Stack? — Jess Telford](https://gist.github.com/jesstelford/9a35d20a2aa044df8bf241e00d7bc2d0)
 * 📜 [Call Stack — MDN](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)
 * 📜 [Understanding Execution Context and Execution Stack in Javascript — Sukhjinder Arora](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
 * 📜 [How JavaScript Works: An Overview of the Engine, the Runtime, and the Call Stack — Alexander Zlatkov](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)

### Videos

 * 🎥 [Javascript: the Call Stack explained — Coding Blocks India](https://www.youtube.com/watch?v=w6QGEiQceOM)
 * 🎥 [The JS Call Stack Explained In 9 Minutes — Colt Steele](https://www.youtube.com/watch?v=W8AeMrVtFLY)
 * 🎥 [JavaScript Execution Stack — Codecademy](https://www.youtube.com/watch?v=jT0USJeNFEA)
 * 🎥 [What is the Call Stack? — Eric Traub](https://www.youtube.com/watch?v=w7QWQlkLY_s)
 * 🎥 [The Call Stack — Kevin Drumm](https://www.youtube.com/watch?v=Q2sFmqvpBe0)
 * 🎥 [Understanding JavaScript Execution — Codesmith](https://www.youtube.com/watch?v=Z6a1cLyq7Ac&list=PLWrQZnG8l0E4kd1T_nyuVoxQUaYEWFgcD)
 * 🎥 [Call Stack & Event Loop — movies com](https://www.youtube.com/watch?v=mk0lu9MKBto)

**[⬆ back to top](#table-of-contents)**

---

## Primitive Types

### Articles

 * 📜 [How numbers are encoded in JavaScript — Dr. Axel Rauschmayer](http://2ality.com/2012/04/number-encoding.html)
 * 📜 [What You Need to Know About JavaScript Number Type — Max Wizard K](https://medium.com/dailyjs/javascripts-number-type-8d59199db1b6)
 * 📜 [What Every JavaScript Developer Should Know About Floating Point Numbers — Chewxy](https://blog.chewxy.com/2014/02/24/what-every-javascript-developer-should-know-about-floating-point-numbers/)
 * 📜 [The Secret Life of JavaScript Primitives — Angus Croll](https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/)
 * 📜 [Primitive Types — Flow](https://flow.org/en/docs/types/primitives/)

### Videos

 * 🎥 [JavaScript Reference vs Primitive Types — Academind](https://www.youtube.com/watch?v=9ooYYRLdg_g)
 * 🎥 [JavaScript Primitive Types — Simon Sez IT](https://www.youtube.com/watch?v=HsbWQsSCE5Y)
 * 🎥 [Javascript Primitive and Reference Types — Baljeet Singh](https://www.youtube.com/watch?v=F7YbhKbpFic)
 * 🎥 [Value Types and Reference Types in JavaScript — Programming with Mosh](https://www.youtube.com/watch?v=e-_mDyqm2oU)
 * 🎥 [JavaScript Primitive Data Types — Avelx](https://www.youtube.com/watch?v=qw3j0A3DIzQ)
 
**[⬆ back to top](#table-of-contents)**

---
