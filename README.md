<h1 align="center">
<br>
  <a href="https://github.com/leonardomso/33"><img src="https://i.imgur.com/dsHmk6H.jpg" alt="33 Concepts Every JS Developer Should Know" width=200"></a>
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

This repository was created with the intention of helping developers master their concepts in JavaScript. It is not a requirement, but a guide for future studies. It is based on an article written by [Stephen Curtis](https://twitter.com/stephenthecurt) and you can read it [here](https://medium.com/@stephenthecurt/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1). Feel free to contribute.

---

## Table of Contents

1. **[Call Stack](#call-stack)**
2. **[Primitive Types](#primitive-types)**
3. **[Value Types & Reference Types](#value-types-&-reference-types)**
4. **[Implicit, Explicit, Nominal, Structuring & Duck Typing](#implicit-explicit-nominal-structuring-&-duck-typing)**
5. **[== vs === vs typeof](#double-triple-equals)**
6. **[Function Scope, Block Scope & Lexical Scope](#scope)**
7. **[Expression vs. Statement](#expression)**
8. **[Hoisting](#hoisting)**
9. **[IIFE, Modules & Namespaces](#modules)**
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

## 1. Call Stack

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

## 2. Primitive Types

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

## 3. Value Types & Reference Types

### Articles

 * 📜 [Explaining Value vs. Reference in Javascript — Arnav Aggarwal](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0)
 * 📜 [Understand Value and Reference Types in JavaScript — Zsolt Nagy](https://www.zsoltnagy.eu/understand-value-and-reference-types-in-javascript/)
 * 📜 [Primitive Types & Reference Types in JavaScript — Bran van der Meer](https://gist.github.com/branneman/7fb06d8a74d7e6d4cbcf75c50fec599c)
 * 📜 [Value Types, Reference Types and Scope in JavaScript — Ben Aston](https://medium.com/@benastontweet/lesson-1b-javascript-fundamentals-380f601ba851)
 * 📜 [Back to roots: JavaScript Value vs Reference — Miro Koczka](https://medium.com/dailyjs/back-to-roots-javascript-value-vs-reference-8fb69d587a18)
 * 📜 [Grasp “By Value” and “By Reference” in JavaScript — Léna Faure](https://hackernoon.com/grasp-by-value-and-by-reference-in-javascript-7ed75efa1293)
 * 📜 [JavaScript Reference and Copy Variables — Vítor Capretz](https://hackernoon.com/javascript-reference-and-copy-variables-b0103074fdf0)
 * 📜 [JavaScript Primitive vs Reference Values](http://www.javascripttutorial.net/javascript-primitive-vs-reference-values/)

### Videos

 * 🎥 [Javascript Pass by Value vs Pass by Reference — techsith](https://www.youtube.com/watch?v=E-dAnFdq8k8)
 * 🎥 [JavaScript Value vs Reference Types — Programming with Mosh](https://www.youtube.com/watch?v=fD0t_DKREbE)

**[⬆ back to top](#table-of-contents)**

---

## 4. Implicit, Explicit, Nominal, Structuring & Duck Typing

### Articles

 * 📜 [What you need to know about Javascript's Implicit Coercion — Promise Tochi](https://dev.to/promhize/what-you-need-to-know-about-javascripts-implicit-coercion-e23)
 * 📜 [JavaScript Type Coercion Explained — Alexey Samoshkin](https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839)
 * 📜 [Javascript Coercion Explained — Ben Garrison](https://hackernoon.com/javascript-coercion-explained-545c895213d3)
 * 📜 [What exactly is Type Coercion in Javascript? - Stack Overflow](https://stackoverflow.com/questions/19915688/what-exactly-is-type-coercion-in-javascript)
 * 📜 [You Don't Know JS: Types & Grammar [Book] — Kyle Simpson](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)

**[⬆ back to top](#table-of-contents)**

---

## 5. == vs. === vs. typeof

### Articles

 * 📜 [JavaScript Double Equals vs. Triple Equals — Brandon Morelli](https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a)
 * 📜 [What is the difference between =, ==, and === in JS? — Codecademy](https://www.codecademy.com/en/forum_questions/558ea4f5e39efed371000508)
 * 📜 [Should I use === or == equality comparison operator in JavaScript? — Panu Pitkamaki](https://bytearcher.com/articles/equality-comparison-operator-javascript/)
 * 📜 [== vs === JavaScript: Double Equals and Coercion — AJ Meyghani](https://www.codementor.io/javascript/tutorial/double-equals-and-coercion-in-javascript)
 * 📜 [Why Use the Triple-Equals Operator in JavaScript? — Louis Lazaris](https://www.impressivewebs.com/why-use-triple-equals-javascipt/)
 * 📜 [What is the difference between == and === in JavaScript? — Craig Buckler](https://www.oreilly.com/learning/what-is-the-difference-between-and-in-javascript)
 * 📜 [Why javascript's typeof always return "object"? — Stack Overflow](https://stackoverflow.com/questions/3787901/why-javascripts-typeof-always-return-object)
 * 📜 [Checking Types in Javascript — Toby Ho](http://tobyho.com/2011/01/28/checking-types-in-javascript/)
 * 📜 [How to better check data types in JavaScript — Webbjocke](https://webbjocke.com/javascript-check-data-types/)

### Videos

 * 🎥 [JavaScript - The typeof operator — Java Brains](https://www.youtube.com/watch?v=ol_su88I3kw)
 * 🎥 [Javascript typeof operator — DevDelight](https://www.youtube.com/watch?v=qPYhTPt_SbQ)

**[⬆ back to top](#table-of-contents)**

---

## 6. Function Scope, Block Scope & Lexical Scope

### Articles

 * 📜 [You Don't Know JS: Scope & Closures [Book] — Kyle Simpson](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch3.md)
 * 📜 [The battle between Function Scope and Block Scope — Marius Herring](http://www.deadcoderising.com/2017-04-11-es6-var-let-and-const-the-battle-between-function-scope-and-block-scope/)
 * 📜 [Emulating Block Scope in JavaScript — Josh Clanton](http://adripofjavascript.com/blog/drips/emulating-block-scope-in-javascript.html)
 * 📜 [The Difference Between Function and Block Scope in JavaScript — Joseph Cardillo](https://medium.com/@josephcardillo/the-difference-between-function-and-block-scope-in-javascript-4296b2322abe)
 * 📜 [Function Scopes and Block Scopes in JavaScript — Samer Buna](https://edgecoders.com/function-scopes-and-block-scopes-in-javascript-25bbd7f293d7)
 * 📜 [Understanding Scope and Context in JavaScript | Ryan Morr](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)
 * 📜 [JavaScript Scope and Closures — Zell Liew](https://css-tricks.com/javascript-scope-closures/)
 * 📜 [Understanding Scope in JavaScript — Wissam Abirached](https://developer.telerik.com/topics/web-development/understanding-scope-in-javascript/)
 * 📜 [Speaking JavaScript - Variables: Scopes, Environments, and Closures — Dr. Axel Rauschmayer](http://speakingjs.com/es5/ch16.html)
 * 📜 [Understanding Scope in JavaScript ― Hammad Ahmed](https://scotch.io/tutorials/understanding-scope-in-javascript)

### Videos

 * 🎥 [What Makes Javascript Weird ... and Awesome pt. 4 — LearnCode.academy](https://www.youtube.com/watch?v=SBwoFkRjZvE)
 * 🎥 [Variable Scope in JavaScript — Kirupa Chinnathambi](https://www.youtube.com/watch?v=dhp57T3p760)
 * 🎥 [JavaScript Block Scope and Function Scope — mmtuts](https://www.youtube.com/watch?v=aK_nuUAdr8E)
 * 🎥 [What the Heck is Lexical Scope? — NWCalvank](https://www.youtube.com/watch?v=GhNA0r10MmA)

**[⬆ back to top](#table-of-contents)**

---

## 7. Expression vs. Statement

### Articles

 * 📜 [All you need to know about Javascript's Expressions, Statements and Expression Statements — Promise Tochi](https://dev.to/promhize/javascript-in-depth-all-you-need-to-know-about-expressions-statements-and-expression-statements-5k2)
 * 📜 [Function Expressions vs Function Declarations — Paul Wilkins](https://www.sitepoint.com/function-expressions-vs-declarations/)
 * 📜 [JavaScript Function — Declaration vs Expression — Ravi Roshan](https://medium.com/@raviroshan.talk/javascript-function-declaration-vs-expression-f5873b8c7b38)
 * 📜 [Function Declarations vs. Function Expressions — Mandeep Singh](https://medium.com/@mandeep1012/function-declarations-vs-function-expressions-b43646042052)
 * 📜 [Function Declarations vs. Function Expressions — Anguls Croll](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)

### Videos

 * 🎥 [Expressions vs. Statements in JavaScript — Hexlet](https://www.youtube.com/watch?v=WVyCrI1cHi8)
 * 🎥 [JavaScript - Expression vs. Statement — WebTunings](https://www.youtube.com/watch?v=3jDpNGJkupA)

**[⬆ back to top](#table-of-contents)**

---

## 8. Hoisting

### Articles

 * 📜 [Understanding Hoisting in JavaScript ― Elizabeth Mabishi](https://scotch.io/tutorials/understanding-hoisting-in-javascript)
 * 📜 [JavaScript: What is Hoisting? ― Brandon Morelli](https://codeburst.io/javascript-what-is-hoisting-dfa84512dd28)
 * 📜 [Understanding Hoisting in JavaScript ― Victor Ofoegbu](https://codeburst.io/understanding-hoisting-in-javascript-c8d35d5db2c2)
 * 📜 [Scoping and Hoisting in JavaScript ― Naveen Karippai](https://medium.com/@naveenkarippai/scoping-and-hoisting-in-javascript-2c2e82107427)
 * 📜 [Hoisting in JavaScript ― Ankush Chatterjee](https://medium.com/front-end-hacking/hoisting-in-javascript-f4a600a02a78)
 * 📜 [Hoisting in JavaScript: a Quick Guide ― Léna Faure](https://hackernoon.com/hoisting-in-javascript-a-quick-guide-cc4d9597bbd7)
 * 📜 [A guide to JavaScript variable hoisting 🚩 with let and const ― Bhuvan Malik](https://medium.freecodecamp.org/what-is-variable-hoisting-differentiating-between-var-let-and-const-in-es6-f1a70bb43d)
 * 📜 [Function Hoisting & Hoisting Interview Questions ― Bhuvan Malik](https://medium.freecodecamp.org/function-hoisting-hoisting-interview-questions-b6f91dbc2be8)
 * 📜 [Understanding Variables, Scope, and Hoisting in JavaScript ― Tania Rascia](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript)
 * 📜 [Javascript hoisting, var, let and const variables ― Vojtech Ruzicka](https://www.vojtechruzicka.com/javascript-hoisting-var-let-const-variables/)

### Videos

 * 🎥 [Hoisting in JavaScript Explained ― mmtuts](https://www.youtube.com/watch?v=ppMlvGMT2qE)
 * 🎥 [Hoisting - Beau teaches JavaScript ― freeCodeCamp](https://www.youtube.com/watch?v=C1PZh_ea-7I)
 * 🎥 [Hoisting in JavaScript Explained in (About) 5 Minutes ― 5-Minute Web Dev](https://www.youtube.com/watch?v=AplVrrwY1TI)
 * 🎥 [JavaScript Hoisting Explained ―Pretty Printed](https://www.youtube.com/watch?v=Ln4nXoGVno8)
 * 🎥 [JavaScript is Easy: What is Hoisting? ― MakingDevelopers](https://www.youtube.com/watch?v=shj5aYdlU3E)

**[⬆ back to top](#table-of-contents)**

---

## 9. IIFE, Modules & Namespaces

### Articles

 * 📜 [Mastering Immediately-Invoked Function Expressions ― Chandra Gundamaraju](https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)
 * 📜 [Do ES6 Modules make the case of IIFEs obsolete?](https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0)
 * 📜 [A 10 minute primer to JavaScript modules, module formats, module loaders and module bundlers ― Jurgen Van de Moere](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/)
 * 📜 [16. Modules ― Exploring JS](http://exploringjs.com/es6/ch_modules.html)
 * 📜 [ES modules: A cartoon deep-dive — Lin Clark](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
 * 📜 [Understanding ES6 Modules — Craig Buckler](https://www.sitepoint.com/understanding-es6-modules/)
 * 📜 [An overview of ES6 Modules in JavaScript — Brent Graham](https://blog.cloud66.com/an-overview-of-es6-modules-in-javascript/)
 * 📜 [ES6 Modules in Depth —Nicolás Bevacqua](https://ponyfoo.com/articles/es6-modules-in-depth)
 * 📜 [ES6 modules, Node.js and the Michael Jackson Solution — Alberto Gimeno](https://medium.com/dailyjs/es6-modules-node-js-and-the-michael-jackson-solution-828dc244b8b)

### Videos

 * 🎥 [Immediately Invoked Function Expression - Beau teaches JavaScript — freeCodeCamp](https://www.youtube.com/watch?v=3cbiZV4H22c)
 * 🎥 [Understanding JavaScript IIFE](https://www.youtube.com/watch?v=I5EntfMeIIQ)
 * 🎥 [JavaScript Modules: ES6 Import and Export — Kyle Robinson](https://www.youtube.com/watch?v=_3oSWwapPKQ)
 * 🎥 [ES6 - Modules — Ryan Christiani](https://www.youtube.com/watch?v=aQr2bV1BPyE)
 * 🎥 [ES6 Modules in the Real World — Sam Thorogood](https://www.youtube.com/watch?v=fIP4pjAqCtQ)
 * 🎥 [ES6 Modules — TempleCoding](https://www.youtube.com/watch?v=5P04OK6KlXA)

**[⬆ back to top](#table-of-contents)**

---
