<h1 align="center">
<br>
  <a href="https://travis-ci.com/leonardomso/33-js-concepts">
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/512px-GraphQL_Logo.svg.png" alt="33 Concepts Every GraphQL Developer Should Know" width=200"></a>
  <br>
    <br>
  33 Concepts Every GraphQL Developer Should Know
  <br><br>
</h1>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square" alt="License MIT">
  </a>
  <a href="https://travis-ci.com/leonardomso/33-js-concepts">
    <img src="https://img.shields.io/travis/leonardomso/33-js-concepts/master.svg?style=flat-square&label=build&logo=travis" alt="Build Status">
  </a>
</p>

## Introduction

This repository was created with the intention of helping developers master their concepts in JavaScript. It is not a requirement, but a guide for future studies. It is based on an article written by [Stephen Curtis](https://twitter.com/stephenthecurt) and you can read it [here](https://medium.com/@stephenthecurt/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1).

**🚀 Considered by GitHub as one of the [top open source projects of 2018!](https://blog.github.com/2018-12-13-new-open-source-projects/)**

## Community

Feel free to submit a PR adding a link to your own recaps or reviews. If you want to translate the repo into your native language, please feel free to do so.

All the translations for this repo will be listed below:

---

## Table of Contents

1. **[Caching](#1-caching)**
2. **[Setting up a server](#2-setting-up-a-server)**
3. **[Context](#3-context)**
4. **[Databases](#4-databases)**
5. **[Dataloader](#5-dataloader)**
6. **[Function Scope, Block Scope and Lexical Scope](#6-function-scope-block-scope-and-lexical-scope)**
7. **[Expression vs Statement](#7-expression-vs-statement)**
8. **[IIFE, Modules and Namespaces](#8-iife-modules-and-namespaces)**
9. **[Message Queue and Event Loop](#9-message-queue-and-event-loop)**
10. **[setTimeout, setInterval and requestAnimationFrame](#10-settimeout-setinterval-and-requestanimationframe)**
11. **[JavaScript Engines](#11-javascript-engines)**
12. **[Bitwise Operators, Type Arrays and Array Buffers](#12-bitwise-operators-type-arrays-and-array-buffers)**
13. **[DOM and Layout Trees](#13-dom-and-layout-trees)**
14. **[Factories and Classes](#14-factories-and-classes)**
15. **[this, call, apply and bind](#15-this-call-apply-and-bind)**
16. **[new, Constructor, instanceof and Instances](#16-new-constructor-instanceof-and-instances)**
17. **[Prototype Inheritance and Prototype Chain](#17-prototype-inheritance-and-prototype-chain)**
18. **[Object.create and Object.assign](#18-objectcreate-and-objectassign)**
19. **[map, reduce, filter](#19-map-reduce-filter)**
20. **[Pure Functions, Side Effects and State Mutation](#20-pure-functions-side-effects-and-state-mutation)**
21. **[Closures](#21-closures)**
22. **[High Order Functions](#22-high-order-functions)**
23. **[Recursion](#23-recursion)**
24. **[Collections and Generators](#24-collections-and-generators)**
25. **[Promises](#25-promises)**
26. **[async/await](#26-asyncawait)**
27. **[Data Structures](#27-data-structures)**
28. **[Expensive Operation and Big O Notation](#28-expensive-operation-and-big-o-notation)**
29. **[Algorithms](#29-algorithms)**
30. **[Inheritance, Polymorphism and Code Reuse](#30-inheritance-polymorphism-and-code-reuse)**
31. **[Design Patterns](#31-design-patterns)**
32. **[Partial Applications, Currying, Compose and Pipe](#32-partial-applications-currying-compose-and-pipe)**
33. **[Clean Code](#33-clean-code)**


---

## 1. Caching

### Articles

 * 📜 [Understanding Caching - Weblab Technology](https://medium.com/p/58756ff253d8#9388)
 * 📜 [Caching with GraphQL - What are the best options? - Will Howard](https://blog.usejournal.com/caching-with-graphql-what-are-the-best-options-e161b0f20e59)
 * 📜 [GraphQL VS Rest: Caching - Phil Sturgeon](https://philsturgeon.uk/api/2017/01/26/graphql-vs-rest-caching/)
 * 📜 [Learn Caching - GraphQL](https://graphql.org/learn/caching/)

### Videos

 * 🎥 [GraphQL Caching using DataLoader — Fun Fun Function](https://www.youtube.com/watch?v=--AguZ20lLA)
 * 🎥 [Feature: GraphQL Caching with DataLoader — Ben Awad](https://www.youtube.com/watch?v=tSQ7WuAcAbU)


**[⬆ Back to Top](#table-of-contents)**

---

## 2. Setting Up a Server

### Articles

 * 📜 [Building a server with Apollo - Apollo GraphQL](https://www.apollographql.com/docs/apollo-server/essentials/server.html)
 * 📜 [Your First GraphQL Server — Clay Allsopp](https://medium.com/the-graphqlhub/your-first-graphql-server-3c766ab4f0a2)
 * 📜 [Learn to build a GraphQL server with minimal effort — Ian Wilson](https://medium.freecodecamp.org/learn-to-build-a-graphql-server-with-minimal-effort-fc7fcabe8ebd)
 * 📜 [Building a GraphQL Server with Node.js — Angus Croll](https://itnext.io/building-a-graphql-server-with-node-js-and-express-f8ea78e831f9)


### Videos

 * 🎥 [Building a GraphQL Server [Part 1] — Traversy Media](https://www.youtube.com/watch?v=PEcJxkylcRM)
 * 🎥 [Building a GraphQL Server with TypeScript](https://www.youtube.com/watch?v=20zGexpEitc)
 * 🎥 [Learn how to build an API using GraphQL with Apollo Server 2.0 — Fireship](https://www.youtube.com/watch?v=8D9XnnjFGMs)
 * 🎥 [GraphQL server tutorial for Node.js with SQL, MongoDB and REST — Apollo GraphQL](https://www.youtube.com/watch?v=PHabPhgRUuU)


**[⬆ Back to Top](#table-of-contents)**

---

## 3. Context

### Articles

 * 📜 [GraphQL Context and Services - Eric Clemmons](https://medium.com/@ericclemmons/graphql-context-services-6510269ef5a1)
 * 📜 [Learning about Execution and Context - GraphQL](https://graphql.org/learn/execution/)

**[⬆ Back to Top](#table-of-contents)**

---

## 4. Databases

### Articles

 * 📜 [Selecting database as data source for GraphQL Server — Wojciech Trocki](https://medium.com/@wtr/selecting-database-as-data-source-for-graphql-server-e3281fcefb2)
 * 📜 [Connecting Server and Database with the Prisma Client — Prisma](https://www.howtographql.com/graphql-js/5-connecting-server-and-database/)
 * 📜 [Using a GraphQL API for Database Administration — Michael Hunger](https://medium.freecodecamp.org/using-a-graphql-api-for-database-administration-1a5039b43c8f)
 * 📜 [GraphQL as a database query language - Predrag Gruevski](https://blog.kensho.com/compiled-graphql-as-a-database-query-language-72e106844282)
 * 📜 [Use all the databases — Loren Sands-Ramshaw](https://www.compose.com/articles/use-all-the-databases-part-1/)

 ### Videos

 * 🎥 [Build a GraphQL Server with Node.js and MongoDB - Ben Awad](https://www.youtube.com/watch?v=291i04TfGb0)
 * 🎥 [Build a GraphQL server for Node.js, using PostgreSQL/MySQL - Lee Benson](https://www.youtube.com/watch?v=DNPVqK_woRQ&t=3s)

**[⬆ Back to Top](#table-of-contents)**

---

## 5. Dataloader

### Articles

 * 📜 [Using dataloader with GraphQL: A Concrete Example — John Tucker](https://codeburst.io/using-dataloader-with-graphql-a-concrete-example-9b21352f1676)


### Videos

 * 🎥 [DataLoader – Source code walkthrough — Lee Byron](https://www.youtube.com/watch?v=OQTnXNCDywA&feature=youtu.be)
 * 🎥 [DataLoader and the Problem it solves in GraphQL — knowthen](https://www.youtube.com/watch?v=ld2_AS4l19g)

**[⬆ Back to Top](#table-of-contents)**

---

## 6. Endpoints

### Articles

 * 📜 [3 Methods to resolve Graphql Endpoints - Nicholas Hagen](https://www.contentful.com/blog/2018/09/25/3-methods-resolve-graphql-endpoints/)
 

### Videos

 * 🎥 [What Makes Javascript Weird ... and Awesome pt. 4 — LearnCode.academy](https://www.youtube.com/watch?v=SBwoFkRjZvE)
 * 🎥 [Variable Scope in JavaScript — Kirupa Chinnathambi](https://www.youtube.com/watch?v=dhp57T3p760)
 * 🎥 [JavaScript Block Scope and Function Scope — mmtuts](https://www.youtube.com/watch?v=aK_nuUAdr8E)
 * 🎥 [What the Heck is Lexical Scope? — NWCalvank](https://www.youtube.com/watch?v=GhNA0r10MmA)

**[⬆ Back to Top](#table-of-contents)**

---

## 7. Entry Points

### Articles

 * 📜 [All you need to know about Javascript's Expressions, Statements and Expression Statements — Promise Tochi](https://www.howtographql.com/advanced/2-more-graphql-concepts/)
 * 📜 [Function Expressions vs Function Declarations — Paul Wilkins](https://www.sitepoint.com/function-expressions-vs-declarations/)
 * 📜 [JavaScript Function — Declaration vs Expression — Ravi Roshan](https://medium.com/@raviroshan.talk/javascript-function-declaration-vs-expression-f5873b8c7b38)
 * 📜 [Function Declarations vs. Function Expressions — Mandeep Singh](https://medium.com/@mandeep1012/function-declarations-vs-function-expressions-b43646042052)
 * 📜 [Function Declarations vs. Function Expressions — Anguls Croll](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)

### Videos

 * 🎥 [Expressions vs. Statements in JavaScript — Hexlet](https://www.youtube.com/watch?v=WVyCrI1cHi8)
 * 🎥 [JavaScript - Expression vs. Statement — WebTunings](https://www.youtube.com/watch?v=3jDpNGJkupA)
 * 🎥 [Function Statements and Function Expressions — Codeacademy](https://www.youtube.com/watch?v=oB5rH_9bqAI)

**[⬆ Back to Top](#table-of-contents)**

---

## 8. IIFE, Modules and Namespaces

### Articles

 * 📜 [Mastering Immediately-Invoked Function Expressions ― Chandra Gundamaraju](https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)
 * 📜 [Do ES6 Modules make the case of IIFEs obsolete?](https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0)
 * 📜 [A 10 minute primer to JavaScript modules, module formats, module loaders and module bundlers ― Jurgen Van de Moere](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/)
 * 📜 [Modules ― Exploring JS](http://exploringjs.com/es6/ch_modules.html)
 * 📜 [ES modules: A cartoon deep-dive — Lin Clark](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
 * 📜 [Understanding ES6 Modules — Craig Buckler](https://www.sitepoint.com/understanding-es6-modules/)
 * 📜 [An overview of ES6 Modules in JavaScript — Brent Graham](https://blog.cloud66.com/an-overview-of-es6-modules-in-javascript/)
 * 📜 [ES6 Modules in Depth — Nicolás Bevacqua](https://ponyfoo.com/articles/es6-modules-in-depth)
 * 📜 [ES6 modules, Node.js and the Michael Jackson Solution — Alberto Gimeno](https://medium.com/dailyjs/es6-modules-node-js-and-the-michael-jackson-solution-828dc244b8b)
 * 📜 [JavaScript Modules: A Beginner’s Guide — Preethi Kasireddy](https://medium.freecodecamp.org/javascript-modules-a-beginner-s-guide-783f7d7a5fcc)
 * 📜 [Using JavaScript modules on the web](https://developers.google.com/web/fundamentals/primers/modules)

### Videos

 * 🎥 [Immediately Invoked Function Expression - Beau teaches JavaScript — freeCodeCamp](https://www.youtube.com/watch?v=3cbiZV4H22c)
 * 🎥 [Understanding JavaScript IIFE](https://www.youtube.com/watch?v=I5EntfMeIIQ)
 * 🎥 [JavaScript Modules: ES6 Import and Export — Kyle Robinson](https://www.youtube.com/watch?v=_3oSWwapPKQ)
 * 🎥 [ES6 - Modules — Ryan Christiani](https://www.youtube.com/watch?v=aQr2bV1BPyE)
 * 🎥 [ES6 Modules in the Real World — Sam Thorogood](https://www.youtube.com/watch?v=fIP4pjAqCtQ)
 * 🎥 [ES6 Modules — TempleCoding](https://www.youtube.com/watch?v=5P04OK6KlXA)

**[⬆ Back to Top](#table-of-contents)**

---

## 9. Message Queue and Event Loop

### Articles

 * 📜 [JavaScript Event Loop Explained — Anoop Raveendran](https://medium.com/front-end-hacking/javascript-event-loop-explained-4cd26af121d4)
 * 📜 [The JavaScript Event Loop: Explained — Erin Sweson-Healey](https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/)
 * 📜 [What is the Event Loop in Javascript — WP Tutor.io](https://www.wptutor.io/web/js/javascript-event-loop)
 * 📜 [Understanding JS: The Event Loop — Alexander Kondov](https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40)
 * 📜 [Understanding the JavaScript Event Loop — Ashish Gupta](https://www.zeolearn.com/magazine/understanding-the-javascript-event-loop)
 * 📜 [Event Loop in Javascript — Manjula Dube](https://code.likeagirl.io/what-the-heck-is-event-loop-1e414fccef49)
 * 📜 [The JavaScript Event Loop — Flavio Copes](https://flaviocopes.com/javascript-event-loop/)
 * 📜 [How JavaScript works: Event loop — Alexander Zlatkov](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)
 * 📜 [Tasks, microtasks, queues and schedules — Jake Archibald](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)
 * 📜 [Visualising the JavaScript Event Loop with a Pizza Restaurant analogy — Priyansh Jain](https://dev.to/presto412/visualising-the-javascript-event-loop-with-a-pizza-restaurant-analogy-47a8)

### Videos

 * 🎥 [What the heck is the event loop anyway? | JSConf EU — Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
 * 🎥 [JavaScript Event Loop — ComScience Simplified](https://www.youtube.com/watch?v=XzXIMZMN9k4)
 * 🎥 [I'm stuck in an Event Loop — Philip Roberts](https://www.youtube.com/watch?v=6MXRNXXgP_0)
 * 🎥 [In The Loop - Jake Archibald | JSConf.Asia 2018](https://www.youtube.com/watch?v=cCOL7MC4Pl0)
 * 🎥 [Desmitificando el Event Loop (Spanish)](https://www.youtube.com/watch?v=Eqq2Rb7LzYE)


**[⬆ Back to Top](#table-of-contents)**

---

## 10. setTimeout, setInterval and requestAnimationFrame

### Articles

 * 📜 [setTimeout and setInterval — JavaScript.Info](https://javascript.info/settimeout-setinterval)
 * 📜 [Why not to use setInterval — Akanksha Sharma](https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9)
 * 📜 [setTimeout VS setInterval — Develoger](https://develoger.com/settimeout-vs-setinterval-cff85142555b)
 * 📜 [Using requestAnimationFrame — Chris Coyier](https://css-tricks.com/using-requestanimationframe/)
 * 📜 [Understanding JavaScript's requestAnimationFrame() — JavaScript Kit](http://www.javascriptkit.com/javatutors/requestanimationframe.shtml)
 * 📜 [Handling time intervals in JavaScript - Amit Merchant](https://www.amitmerchant.com/Handling-Time-Intervals-In-Javascript/)

### Videos

 * 🎥 [Javascript: How setTimeout and setInterval works — Coding Blocks India](https://www.youtube.com/watch?v=6bPKyl8WYWI)
 * 🎥 [setTimeout and setInterval in JavaScript — techsith](https://www.youtube.com/watch?v=TbCgGWe8LN8)
 * 🎥 [JavaScript Timers — Steve Griffith](https://www.youtube.com/watch?v=0VVJSvlUgtg)
 * 🎥 [JavaScript setTimeout, setInterval & clearInterval — DoingITeasyChannel](https://www.youtube.com/watch?v=BVALvvy5bZY)
 * 🎥 [JavaScript setTimeOut and setInterval Explained — Theodore Anderson](https://www.youtube.com/watch?v=mVKfrWCOB60)

**[⬆ Back to Top](#table-of-contents)**

---

## 11. JavaScript Engines

### Articles

 * 📜 [JavaScript Engines — Jen Looper](http://www.softwaremag.com/javascript-engines/)
 * 📜 [Understanding How the Chrome V8 Engine Translates JavaScript into Machine Code — DroidHead](https://medium.freecodecamp.org/understanding-the-core-of-nodejs-the-powerful-chrome-v8-engine-79e7eb8af964)
 * 📜 [Understanding V8’s Bytecode — Franziska Hinkelmann](https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775)
 * 📜 [How the V8 engine works? — Thibault Laurens](http://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/)
 * 📜 [A Brief History of Google’s V8 Javascript Engine — Clair Smith](https://www.mediacurrent.com/blog/brief-history-googles-v8-javascript-engine/)
 * 📜 [JavaScript essentials: why you should know how the engine works - Rainer Hahnekamp](https://medium.freecodecamp.org/javascript-essentials-why-you-should-know-how-the-engine-works-c2cc0d321553)
 * 📜 [JavaScript engine fundamentals: Shapes and Inline Caches](https://mathiasbynens.be/notes/shapes-ics)
 * 📜 [JavaScript engine fundamentals: optimizing prototypes](https://mathiasbynens.be/notes/prototypes)
 * 📜 [How V8 optimizes array operations](https://v8.dev/blog/elements-kinds)


### Videos

 * 🎥 [JavaScript Engines: The Good Parts™ — Mathias Bynens & Benedikt Meurer](https://www.youtube.com/watch?v=5nmpokoRaZI)

**[⬆ Back to Top](#table-of-contents)**

---

## 12. Bitwise Operators, Type Arrays and Array Buffers

### Articles

 * 📜 [Programming with JS: Bitwise Operations — Alexander Kondov](https://hackernoon.com/programming-with-js-bitwise-operations-393eb0745dc4)
 * 📜 [Using JavaScript’s Bitwise Operators in Real Life — ian m](https://codeburst.io/using-javascript-bitwise-operators-in-real-life-f551a731ff5)
 * 📜 [JavaScript Bitwise Operators — w3resource](https://www.w3resource.com/javascript/operators/bitwise-operator.php)
 * 📜 [Bitwise Operators in Javascript — Joe Cha](https://medium.com/bother7-blog/bitwise-operators-in-javascript-65c4c69be0d3)
 * 📜 [A Comprehensive Primer on Binary Computation and Bitwise Operators in Javascript — Paul Brown](https://medium.com/techtrument/a-comprehensive-primer-on-binary-computation-and-bitwise-operators-in-javascript-81acf8341f04)

 ### Videos

 * 🎥 [JavaScript Bitwise Operators — Programming with Mosh](https://www.youtube.com/watch?v=mesu75PTDC8)

**[⬆ Back to Top](#table-of-contents)**

---

## 13. Endpoints

### Articles

 * 📜 [3 Methods to Resolve GraphQL Endpoints - Nicholas Hagen](https://www.contentful.com/blog/2018/09/25/3-methods-resolve-graphql-endpoints/)
 * 📜 [Adding a GraphQL endpoint - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/v1/setup.html)
 * 📜 [FakerQL — The ultimate GraphQL endpoint for fake data - Jamie Barton](https://medium.com/@notrab/fakerql-is-ultimate-graphql-endpoint-for-fake-data-bd83f4cd6ad1)
 * 📜 [Running a scalable & reliable GraphQL endpoint with Serverless - Siddharth Gupta](https://serverless.com/blog/running-scalable-reliable-graphql-endpoint-with-serverless/)

 ### Videos

 * 🎥 [GraphQL with your REST endpoints with RestLink - Leigh Halli](https://www.youtube.com/watch?v=yvoGCY7N_fg)
 
**[⬆ Back to Top](#table-of-contents)**

---

## 14. Entry Points

### Articles

 * 📜 [More GraphQL Concepts - How to Graphql](https://www.howtographql.com/advanced/2-more-graphql-concepts/)
 * 📜 [Entry Points - Graphql.org](https://graphql.org/graphql-js/graphql/#entry-point)

 ### Videos

 * 🎥 [The GraphQL entry points - Mateu](https://www.youtube.com/watch?v=7eLsfIZYuvU)
**[⬆ Back to Top](#table-of-contents)**

---

## 15. Fetching

### Articles

 * 📜 [4 simple ways to call a GraphQL API - Sashko Stubailo](https://blog.apollographql.com/4-simple-ways-to-call-a-graphql-api-a6807bcdb355)

  ### Videos

 * 🎥 [Fetching data from an API in GraphQL - Ben Awad](https://www.youtube.com/watch?v=RDQyAcvmbpM)
 * 🎥 [Building a GraphQL Server, RootQuery & Fetching Data - Traversy Media](https://www.youtube.com/watch?v=e9Zxzr7sy60)
 
**[⬆ Back to Top](#table-of-contents)**

---

## 16. Field

### Articles

 * 📜 [Class: GraphQL::Field - rubydoc.info](https://www.rubydoc.info/gems/graphql/GraphQL/Field)
 * 📜 (https://graphql-ruby.org/fields/introduction.html)
 * 📜 [Fields: Introduction - graphql-ruby.org](https://graphql-ruby.org/fields/introduction.html)

 ### Videos

 * 🎥 [Your GraphQL field guide - Bojan Tomić](https://www.youtube.com/watch?v=ROwICdehlb0)

**[⬆ Back to Top](#table-of-contents)**

---

## 17. Fragment

### Articles

 * 📜 [Using fragments - Apollo](https://www.apollographql.com/docs/react/advanced/fragments.html)
 * 📜 [How to query your schema with GraphQL fragments - David Mráz](https://medium.com/graphql-mastery/graphql-fragments-and-how-to-use-them-8ee30b44f59e)
 * 📜 [GraphQL Fragments are the Best Match for UI Components - Samer Buna](https://www.manifold.co/blog/graphql-fragments-are-the-best-match-for-ui-components-72b8f61c20fe)

 ### Videos

 * 🎥 [How GraphQL Fragments Work - Ben Awad](https://www.youtube.com/watch?v=AAHR7eBKLU8)

**[⬆ Back to Top](#table-of-contents)**

---

## 18. Mutations

### Articles

 * 📜 [Understanding schema concepts - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/essentials/schema.html)
 * 📜 [Mutations in GraphQL - Alexander Kondov](https://hackernoon.com/mutations-in-graphql-9ac6a28202a2)

 ### Videos

 * 🎥 [GraphQL Tutorial #18 - Mutations - The Net Ninja](https://www.youtube.com/watch?v=DU77lbBPfBI)
 * 🎥 [GraphQL Tutorial #19 - More on Mutations - The Net Ninja](https://www.youtube.com/watch?v=H8oRezNak2s)

**[⬆ Back to Top](#table-of-contents)**

---

## 19. Nested Info

### Articles

 * 📜 [GraphQL Schema Language Cheat Sheet - Hafiz Ismail](https://wehavefaces.net/graphql-shorthand-notation-cheatsheet-17cd715861b6)
 * 📜 [Advanced querying with GraphQL and Express - Alexander Kondov](https://hackernoon.com/advanced-querying-with-graphql-and-express-8cf2fd05f5ea)

 ### Videos

 * 🎥 [Nesting GraphQL - Ben Awad](https://www.youtube.com/watch?v=Ffl1oWjSUF4)

**[⬆ Back to Top](#table-of-contents)**

---

## 20. Polling

### Articles

 * 📜 [Dynamic GraphQL polling with React and Apollo Client - David Glasser](https://blog.apollographql.com/dynamic-graphql-polling-with-react-and-apollo-client-fb36e390d250)
 * 📜 [Introducing Schema Polling - Novvum ](https://www.novvum.io/post/graphql-playground-v1-8-8-introducing-schema-polling)
 

**[⬆ Back to Top](#table-of-contents)**

---

## 21. Queries

### Articles

 * 📜 [Queries and Mutations - Graphql.org](https://graphql.org/learn/queries/)
 * 📜 [The Anatomy of a Graphql Query — Sashko Stubailo](https://blog.apollographql.com/the-anatomy-of-a-graphql-query-6dffa9e9e747)
 * 📜 [Fetch data with queries - Apollo Documentation](https://www.apollographql.com/docs/tutorial/queries.html)

 ### Videos

 * 🎥 [GraphQL Tutorial #4 - Making Queries - The Net Ninja](https://www.youtube.com/watch?v=bX2e4FILf78)
 
**[⬆ Back to Top](#table-of-contents)**

---

## 22. Relationships

### Articles

 * 📜 [Explaining GraphQL Connections - Caleb Meredith](https://blog.apollographql.com/explaining-graphql-connections-c48b7c3d6976)
 * 📜 [Relations - Graphql Documentation](https://www.howtographql.com/graphql-scala/7-relations/)

 ### Videos

 * 🎥 [Type Relations - The Net Ninja](https://www.youtube.com/watch?v=-aQ_Io9m1GQ)
 * 🎥 [GraphQL Data Relationships - MicroUrb](https://www.youtube.com/watch?v=9EzZJz0QeEI)

**[⬆ Back to Top](#table-of-contents)**

---

## 23. Resolver

### Articles

 * 📜 [GraphQL Resolvers: Best Practices - Mark Stuart](https://medium.com/paypal-engineering/graphql-resolvers-best-practices-cd36fdbcef55)
 * 📜 [Overview of Resolvers - Graphcool Documentation](https://www.graph.cool/docs/reference/functions/resolvers-su6wu3yoo2)

 ### Videos

 * 🎥 [GraphQL Tutorial #9, The Resolve Function - The Net Ninja](https://www.youtube.com/watch?v=NWod5SFW13s)

**[⬆ Back to Top](#table-of-contents)**

---

## 24. Root Field

### Articles

 * 📜 [Root Fields & Resolvers - Graphql.org ](https://graphql.org/learn/execution/)

 ### Videos

 * 🎥 [GraphQL Tutorial, Root Query — The Net Ninja](https://www.youtube.com/watch?v=ALqNbTik44o)

**[⬆ Back to Top](#table-of-contents)**

---

## 25. Schema

### Articles

 * 📜 [Understanding schema concepts - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/essentials/schema.html)
 * 📜 [Graphql Server Basics: Schemas Explained - Prisma Documentation](https://www.prisma.io/blog/graphql-server-basics-the-schema-ac5e2950214e)
 

 ### Videos

 * 🎥 [GraphQL Schema - The Net Ninja](https://www.youtube.com/watch?v=A8vtRvz-lK0)

**[⬆ Back to Top](#table-of-contents)**

---

## 26. Schema Definition Language

### Articles

 * 📜 [GraphQL SDL, Schema Definition Language - Prisma Documentation](https://www.prisma.io/blog/graphql-sdl-schema-definition-language-6755bcb9ce51)
 * 📜 [Three ways to represent your GraphQL schema - Sashko Stubailo](https://blog.apollographql.com/three-ways-to-represent-your-graphql-schema-a41f4175100d)

**[⬆ Back to Top](#table-of-contents)**

---

## 27. Schema Design

### Articles

 * 📜 [GraphQL best practices for GraphQL schema design - David Mraz](https://graphqlmastery.com/blog/graphql-best-practices-for-graphql-schema-design)
 * 📜 [GraphQL Schema Design: Building Evolvable Schemas - Marc-André Giroux](https://blog.apollographql.com/graphql-schema-design-building-evolvable-schemas-1501f3c59ed5)
 * 📜 [Writing a Graphql Schema - Eitan Frailich](https://github.com/davidyaha/graphql-workshop/blob/master/manuals/step-2-writing-a-schema.md)

**[⬆ Back to Top](#table-of-contents)**

---

## 28. Schema Stiching

### Articles

 * 📜 [The ultimate guide to Schema Stitching in GraphQL - Rishichandra Wawhal](https://blog.hasura.io/the-ultimate-guide-to-schema-stitching-in-graphql-f30178ac0072/)
 * 📜 [Schema Stitching - Apollo Documentation](https://www.apollographql.com/docs/graphql-tools/schema-stitching.html)
 * 📜 [GraphQL Remote Schema Stitching in a Multi-Service Architecture - Suciu Vlad](https://medium.com/provablyfair/graphql-remote-schema-stitching-in-a-multi-service-architecture-ac329037f082)

### Videos

 * 🎥 [API mashup: Combining APIs using GraphQL schema stitching - GitHub](https://www.youtube.com/watch?v=90JWZnuf7xQ)
 * 🎥 [GraphQL Schema Stitching - Ben Awad](https://www.youtube.com/watch?v=4i3W6g_u1Nw)
 * 🎥 [GraphQL Schema Stitching with Prisma and Contentful - Nikolas Burk(Contentful)](https://www.youtube.com/watch?v=w1loiyLD4eY)

**[⬆ Back to Top](#table-of-contents)**

---

## 29. Subscriptions

### Articles

 * 📜 [Graphql Subscriptions Example - jedwards1211](https://github.com/apollographql/graphql-subscriptions)
 * 📜 [Make web real-time with GraphQL subscriptions - David Qorashi](https://medium.com/@hpux/make-web-real-time-with-graphql-subscriptions-5a59ac1b010c)
 * 📜 [Subscriptions in Graphql and Relay - Dan Schafer](https://graphql.org/blog/subscriptions-in-graphql-and-relay/)
 * 📜 [From Zero to Graphql Subscriptions - Robert Zhu](https://hackernoon.com/from-zero-to-graphql-subscriptions-416b9e0284f3)

 ### Videos

 * 🎥 [What is a Graphql Subscription - Ben Awad](https://www.youtube.com/watch?v=Tp8UPgmhyTs)

**[⬆ Back to Top](#table-of-contents)**

---

## 30. Types

### Articles

 * 📜 [Constructing Types — Graphql.org](https://graphql.org/graphql-js/constructing-types/)
 * 📜 [Object Types — Graphql.org](https://graphql.org/graphql-js/object-types/)

  ### Videos

 * 🎥 [Type Relations — The Net Ninja](https://www.youtube.com/watch?v=-aQ_Io9m1GQ)

**[⬆ Back to Top](#table-of-contents)**

---

## 31. Union Types
### Articles

 * 📜 [How to write add unions and interfaces to a schema - Apollo Documentation](https://www.apollographql.com/docs/apollo-server/features/unions-interfaces.html)
 * 📜 [Graphql Tour Interfaces and Unions — Clay Allsopp](https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d)
 * 📜 [Graphql Interfaces and Unions-How to design a Graphql Schema — David Mraz](https://graphqlmastery.com/blog/graphql-interfaces-and-unions-how-to-design-graphql-schema)
 * 📜 [Interfaces and Unions in GraphQL — AWS Documentation](https://docs.aws.amazon.com/appsync/latest/devguide/interfaces-and-unions.html)

  ### Videos

 * 🎥 [Typescript Union and Intersection Types- Interface vs Type Aliases - Angular University](https://www.youtube.com/watch?v=76io0UBS6fA)

 **[⬆ Back to Top](#table-of-contents)**

---
