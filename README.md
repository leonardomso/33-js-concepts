<h1 align="center">
<br>
  <a href="https://github.com/leonardomso/33"><img src="https://i.imgur.com/dsHmk6H.jpg" alt="33 Concepts Every JS Developer Should Know" width=200"></a>
  <br>
    <br>
  모든 자바스크립트 개발자가 알아야 하는 33가지 개념
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

## 소개

이 레포지토리는 개발자들이 자바스크립트의 개념을 마스터하는 것을 돕기 위해 만들어졌습니다. 필수적인 것은 아니지만 나중의 공부에 있어서 지침서가 될 수 있을 것입니다. [Stephen Curtis](https://twitter.com/stephenthecurt)의 저서를 기반으로 만들어졌으며, [이곳](https://medium.com/@stephenthecurt/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1)에서 해당 저서를 읽을 수 있습니다.

## 목차

1. **[호출 스택](#1-call-stack)**
2. **[원시 자료형](#2-primitive-types)**
3. **[값 타입(Value Type)과 참조 타입(Refecrence Type)](#3-value-types-and-reference-types)**
4. **[명시적 변환, 암시적 변환, Nominal, 구조화, 덕 타이핑](#4-implicit-explicit-nominal-structuring-and-duck-typing)**
5. **[== vs === vs typeof](#5--vs--vs-typeof)**
6. **[함수 범위, 블록 범위, 렉시컬(lexical) 범위](#6-function-scope-block-scope-and-lexical-scope)**
7. **[식(expression) vs 문(statement)](#7-expression-vs-statement)**
8. **[IIFE, Modules, Namespaces](#8-iife-modules-and-namespaces)**
9. **[메시지 큐와 이벤트 루프](#9-message-queue-and-event-loop)**
10. **[setTimeout, setInterval, requestAnimationFrame](#10-settimeout-setinterval-and-requestanimationframe)**
11. **[자바스크립트 엔진](#11-javascript-engines)**
12. **[비트 연산자, 형식화 배열, 버퍼(배열)](#12-bitwise-operators-type-arrays-and-array-buffers)*
13. **[DOM과 Layout Trees](#13-dom-and-layout-trees)**
14. **[팩토리와 클래스](#14-factories-and-classes)**
15. **[this, call, apply, bind](#15-this-call-apply-and-bind)**
16. **[new, 생성자, instanceof, 인스턴스](#16-new-constructor-instanceof-and-instances)**
17. **[프로토타입의 상속과 체인](#17-prototype-inheritance-and-prototype-chain)**
18. **[Object.create와 Object.assign](#18-objectcreate-and-objectassign)**
19. **[map, reduce, filter](#19-map-reduce-filter)**
20. **[순수함수, 부수효과, 상태변이](#20-pure-functions-side-effects-and-state-mutation)**
21. **[클로저(Closures)](#21-closures)**
22. **[고차함수](#22-high-order-functions)**
23. **[재귀](#23-recursion)**
24. **[컬렉션과 생성기](#24-collections-and-generators)**
25. **[Promises](#25-promises)**
26. **[async/await](#26-asyncawait)**
27. **[자료 구조](#27-data-structures)**
28. **[함수 성능과 빅 오(Big-O) 표기법](#28-expensive-operation-and-big-o-notation)**
29. **[알고리즘](#29-algorithms)**
30. **[상속, 다형성, 코드의 재사용성](#30-inheritance-polymorphism-and-code-reuse)**
31. **[설계 패턴](#31-design-patterns)**
32. **[부분 어플리케이션, 커링(Currying), Compose, Pipe](#32-partial-applications-currying-compose-and-pipe)**
33. **[클린 코드](#33-clean-code)**


---

## 1. 호출 스택

### 글

 * �윋� [Understanding Javascript Call Stack, Event Loops �� Gaurav Pandvia](https://medium.com/@gaurav.pandvia/understanding-javascript-function-executions-tasks-event-loop-call-stack-more-part-1-5683dea1f5ec)
 * �윋� [Understanding the JavaScript Call Stack �� Charles Freeborn](https://medium.freecodecamp.org/understanding-the-javascript-call-stack-861e41ae61d4)
 * �윋� [Javascript: What Is The Execution Context? What Is The Call Stack? �� Valentino Gagliardi](https://www.valentinog.com/blog/js-execution-context-call-stack/)
 * �윋� [What is the JS Event Loop and Call Stack? �� Jess Telford](https://gist.github.com/jesstelford/9a35d20a2aa044df8bf241e00d7bc2d0)
 * �윋� [Call Stack �� MDN](https://developer.mozilla.org/en-US/docs/Glossary/Call_stack)
 * �윋� [Understanding Execution Context and Execution Stack in Javascript �� Sukhjinder Arora](https://blog.bitsrc.io/understanding-execution-context-and-execution-stack-in-javascript-1c9ea8642dd0)
 * �윋� [How JavaScript Works: An Overview of the Engine, the Runtime, and the Call Stack �� Alexander Zlatkov](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf)
 * �윋� [The Ultimate Guide to Execution Contexts, Hoisting, Scopes, and Closures in JavaScript �� Tyler McGinnis](https://tylermcginnis.com/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/)

### 영상

 * �윃� [Javascript: the Call Stack explained �� Coding Blocks India](https://www.youtube.com/watch?v=w6QGEiQceOM)
 * �윃� [The JS Call Stack Explained In 9 Minutes �� Colt Steele](https://www.youtube.com/watch?v=W8AeMrVtFLY)
 * �윃� [JavaScript Execution Stack �� Codecademy](https://www.youtube.com/watch?v=jT0USJeNFEA)
 * �윃� [What is the Call Stack? �� Eric Traub](https://www.youtube.com/watch?v=w7QWQlkLY_s)
 * �윃� [The Call Stack �� Kevin Drumm](https://www.youtube.com/watch?v=Q2sFmqvpBe0)
 * �윃� [Understanding JavaScript Execution �� Codesmith](https://www.youtube.com/watch?v=Z6a1cLyq7Ac&list=PLWrQZnG8l0E4kd1T_nyuVoxQUaYEWFgcD)
 * �윃� [Call Stack & Event Loop �� movies com](https://www.youtube.com/watch?v=mk0lu9MKBto)
 * �윃� [The Ultimate Guide to Execution Contexts, Hoisting, Scopes, and Closures in JavaScript �� Tyler McGinnis](https://www.youtube.com/watch?v=Nt-qa_LlUH0)

**[燧� Back to Top](#table-of-contents)**

---

## 2. 원시 자료형

### 글

 * �윋� [How numbers are encoded in JavaScript �� Dr. Axel Rauschmayer](http://2ality.com/2012/04/number-encoding.html)
 * �윋� [What You Need to Know About JavaScript Number Type �� Max Wizard K](https://medium.com/dailyjs/javascripts-number-type-8d59199db1b6)
 * �윋� [What Every JavaScript Developer Should Know About Floating Point Numbers �� Chewxy](https://blog.chewxy.com/2014/02/24/what-every-javascript-developer-should-know-about-floating-point-numbers/)
 * �윋� [The Secret Life of JavaScript Primitives �� Angus Croll](https://javascriptweblog.wordpress.com/2010/09/27/the-secret-life-of-javascript-primitives/)
 * �윋� [Primitive Types �� Flow](https://flow.org/en/docs/types/primitives/)
 * �윋� [(Not) Everything in JavaScript is an Object - Daniel Li](http://blog.brew.com.hk/not-everything-in-javascript-is-an-object/)
 * �윋� [JavaScript data types and data structures - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Primitive_values)

### 영상

 * �윃� [JavaScript Reference vs Primitive Types �� Academind](https://www.youtube.com/watch?v=9ooYYRLdg_g)
 * �윃� [JavaScript Primitive Types �� Simon Sez IT](https://www.youtube.com/watch?v=HsbWQsSCE5Y)
 * �윃� [Javascript Primitive and Reference Types �� Baljeet Singh](https://www.youtube.com/watch?v=F7YbhKbpFic)
 * �윃� [Value Types and Reference Types in JavaScript �� Programming with Mosh](https://www.youtube.com/watch?v=e-_mDyqm2oU)
 * �윃� [JavaScript Primitive Data Types �� Avelx](https://www.youtube.com/watch?v=qw3j0A3DIzQ)
 * �윃� [Everything you never wanted to know about JavaScript numbers �� Bartek Szopka](https://www.youtube.com/watch?v=MqHDDtVYJRI)

**[燧� Back to Top](#table-of-contents)**

---

## 3. 값 타입(Value Type)과 참조 타입(Refecrence Type)

### 글

 * �윋� [Explaining Value vs. Reference in Javascript �� Arnav Aggarwal](https://codeburst.io/explaining-value-vs-reference-in-javascript-647a975e12a0)
 * �윋� [Understand Value and Reference Types in JavaScript �� Zsolt Nagy](https://www.zsoltnagy.eu/understand-value-and-reference-types-in-javascript/)
 * �윋� [Primitive Types & Reference Types in JavaScript �� Bran van der Meer](https://gist.github.com/branneman/7fb06d8a74d7e6d4cbcf75c50fec599c)
 * �윋� [Value Types, Reference Types and Scope in JavaScript �� Ben Aston](https://medium.com/@benastontweet/lesson-1b-javascript-fundamentals-380f601ba851)
 * �윋� [Back to roots: JavaScript Value vs Reference �� Miro Koczka](https://medium.com/dailyjs/back-to-roots-javascript-value-vs-reference-8fb69d587a18)
 * �윋� [Grasp �쏝y Value�� and �쏝y Reference�� in JavaScript �� L챕na Faure](https://hackernoon.com/grasp-by-value-and-by-reference-in-javascript-7ed75efa1293)
 * �윋� [JavaScript Reference and Copy Variables �� V챠tor Capretz](https://hackernoon.com/javascript-reference-and-copy-variables-b0103074fdf0)
 * �윋� [JavaScript Primitive vs Reference Values](http://www.javascripttutorial.net/javascript-primitive-vs-reference-values/)

### 영상

 * �윃� [Javascript Pass by Value vs Pass by Reference �� techsith](https://www.youtube.com/watch?v=E-dAnFdq8k8)
 * �윃� [JavaScript Value vs Reference Types �� Programming with Mosh](https://www.youtube.com/watch?v=fD0t_DKREbE)

**[燧� Back to Top](#table-of-contents)**

---

## 4. 명시적 변환, 암시적 변환, Nominal, 구조화, 덕 타이핑

### 글

 * �윋� [What you need to know about Javascript's Implicit Coercion �� Promise Tochi](https://dev.to/promhize/what-you-need-to-know-about-javascripts-implicit-coercion-e23)
 * �윋� [JavaScript Type Coercion Explained �� Alexey Samoshkin](https://medium.freecodecamp.org/js-type-coercion-explained-27ba3d9a2839)
 * �윋� [Javascript Coercion Explained �� Ben Garrison](https://hackernoon.com/javascript-coercion-explained-545c895213d3)
 * �윋� [What exactly is Type Coercion in Javascript? - Stack Overflow](https://stackoverflow.com/questions/19915688/what-exactly-is-type-coercion-in-javascript)
 * �윋� [You Don't Know JS: Types & Grammar [Book] �� Kyle Simpson](https://www.oreilly.com/library/view/you-dont-know/9781491905159/ch04.html)
 * �윋� [(Not) Everything in JavaScript is an Object - Daniel Li](http://blog.brew.com.hk/not-everything-in-javascript-is-an-object/)
 * �윋� [Type Coercion in JavaScript, and why everyone gets it wrong.](https://thedevs.network/blog/type-coercion-in-javascript-and-why-everyone-gets-it-wrong)

### 영상

 * �윃� [== ? === ??? ...#@^% - Shirmung Bielefeld](https://www.youtube.com/watch?v=qGyqzN0bjhc&t)
 * �윃� [Coercion in Javascript - Hitesh Choudhary](https://www.youtube.com/watch?v=b04Q_vyqEG8)
 * �윃� [JavaScript Questions: What is Coercion? - Steven Hancock](https://www.youtube.com/watch?v=z4-8wMSPJyI)

**[燧� Back to Top](#table-of-contents)**

---

## 5. == vs === vs typeof

### 글

 * �윋� [JavaScript Double Equals vs. Triple Equals �� Brandon Morelli](https://codeburst.io/javascript-double-equals-vs-triple-equals-61d4ce5a121a)
 * �윋� [What is the difference between =, ==, and === in JS? �� Codecademy](https://www.codecademy.com/en/forum_questions/558ea4f5e39efed371000508)
 * �윋� [Should I use === or == equality comparison operator in JavaScript? �� Panu Pitkamaki](https://bytearcher.com/articles/equality-comparison-operator-javascript/)
 * �윋� [== vs === JavaScript: Double Equals and Coercion �� AJ Meyghani](https://www.codementor.io/javascript/tutorial/double-equals-and-coercion-in-javascript)
 * �윋� [Why Use the Triple-Equals Operator in JavaScript? �� Louis Lazaris](https://www.impressivewebs.com/why-use-triple-equals-javascipt/)
 * �윋� [What is the difference between == and === in JavaScript? �� Craig Buckler](https://www.oreilly.com/learning/what-is-the-difference-between-and-in-javascript)
 * �윋� [Why javascript's typeof always return "object"? �� Stack Overflow](https://stackoverflow.com/questions/3787901/why-javascripts-typeof-always-return-object)
 * �윋� [Checking Types in Javascript �� Toby Ho](http://tobyho.com/2011/01/28/checking-types-in-javascript/)
 * �윋� [How to better check data types in JavaScript �� Webbjocke](https://webbjocke.com/javascript-check-data-types/)
 * �윋� [Checking for the Absence of a Value in JavaScript �� Tomer Aberbach](https://tomeraberba.ch/html/post/checking-for-the-absence-of-a-value-in-javascript.html)

### 영상

 * �윃� [JavaScript - The typeof operator �� Java Brains](https://www.youtube.com/watch?v=ol_su88I3kw)
 * �윃� [Javascript typeof operator �� DevDelight](https://www.youtube.com/watch?v=qPYhTPt_SbQ)

**[燧� Back to Top](#table-of-contents)**

---

## 6. 함수 범위, 블록 범위, 렉시컬(lexical) 범위

### 글

 * �윋� [You Don't Know JS: Scope & Closures [Book] �� Kyle Simpson](https://github.com/getify/You-Dont-Know-JS/blob/master/scope%20%26%20closures/ch3.md)
 * �윋� [The battle between Function Scope and Block Scope �� Marius Herring](http://www.deadcoderising.com/2017-04-11-es6-var-let-and-const-the-battle-between-function-scope-and-block-scope/)
 * �윋� [Emulating Block Scope in JavaScript �� Josh Clanton](http://adripofjavascript.com/blog/drips/emulating-block-scope-in-javascript.html)
 * �윋� [The Difference Between Function and Block Scope in JavaScript �� Joseph Cardillo](https://medium.com/@josephcardillo/the-difference-between-function-and-block-scope-in-javascript-4296b2322abe)
 * �윋� [Function Scopes and Block Scopes in JavaScript �� Samer Buna](https://edgecoders.com/function-scopes-and-block-scopes-in-javascript-25bbd7f293d7)
 * �윋� [Understanding Scope and Context in JavaScript | Ryan Morr](http://ryanmorr.com/understanding-scope-and-context-in-javascript/)
 * �윋� [JavaScript Scope and Closures �� Zell Liew](https://css-tricks.com/javascript-scope-closures/)
 * �윋� [Understanding Scope in JavaScript �� Wissam Abirached](https://developer.telerik.com/topics/web-development/understanding-scope-in-javascript/)
 * �윋� [Speaking JavaScript - Variables: Scopes, Environments, and Closures �� Dr. Axel Rauschmayer](http://speakingjs.com/es5/ch16.html)
 * �윋� [Understanding Scope in JavaScript �� Hammad Ahmed](https://scotch.io/tutorials/understanding-scope-in-javascript)

### 영상

 * �윃� [What Makes Javascript Weird ... and Awesome pt. 4 �� LearnCode.academy](https://www.youtube.com/watch?v=SBwoFkRjZvE)
 * �윃� [Variable Scope in JavaScript �� Kirupa Chinnathambi](https://www.youtube.com/watch?v=dhp57T3p760)
 * �윃� [JavaScript Block Scope and Function Scope �� mmtuts](https://www.youtube.com/watch?v=aK_nuUAdr8E)
 * �윃� [What the Heck is Lexical Scope? �� NWCalvank](https://www.youtube.com/watch?v=GhNA0r10MmA)

**[燧� Back to Top](#table-of-contents)**

---

## 7. 식(expression) vs 문(statement)

### 글

 * �윋� [All you need to know about Javascript's Expressions, Statements and Expression Statements �� Promise Tochi](https://dev.to/promhize/javascript-in-depth-all-you-need-to-know-about-expressions-statements-and-expression-statements-5k2)
 * �윋� [Function Expressions vs Function Declarations �� Paul Wilkins](https://www.sitepoint.com/function-expressions-vs-declarations/)
 * �윋� [JavaScript Function �� Declaration vs Expression �� Ravi Roshan](https://medium.com/@raviroshan.talk/javascript-function-declaration-vs-expression-f5873b8c7b38)
 * �윋� [Function Declarations vs. Function Expressions �� Mandeep Singh](https://medium.com/@mandeep1012/function-declarations-vs-function-expressions-b43646042052)
 * �윋� [Function Declarations vs. Function Expressions �� Anguls Croll](https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/)

### 영상

 * �윃� [Expressions vs. Statements in JavaScript �� Hexlet](https://www.youtube.com/watch?v=WVyCrI1cHi8)
 * �윃� [JavaScript - Expression vs. Statement �� WebTunings](https://www.youtube.com/watch?v=3jDpNGJkupA)
 * �윃� [Function Statements and Function Expressions �� Codeacademy](https://www.youtube.com/watch?v=oB5rH_9bqAI)

**[燧� Back to Top](#table-of-contents)**

---

## 8. IIFE, Modules, Namespaces

### 글

 * �윋� [Mastering Immediately-Invoked Function Expressions �� Chandra Gundamaraju](https://medium.com/@vvkchandra/essential-javascript-mastering-immediately-invoked-function-expressions-67791338ddc6)
 * �윋� [Do ES6 Modules make the case of IIFEs obsolete?](https://hashnode.com/post/do-es6-modules-make-the-case-of-iifes-obsolete-civ96wet80scqgc538un20es0)
 * �윋� [A 10 minute primer to JavaScript modules, module formats, module loaders and module bundlers �� Jurgen Van de Moere](https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/)
 * �윋� [Modules �� Exploring JS](http://exploringjs.com/es6/ch_modules.html)
 * �윋� [ES modules: A cartoon deep-dive �� Lin Clark](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
 * �윋� [Understanding ES6 Modules �� Craig Buckler](https://www.sitepoint.com/understanding-es6-modules/)
 * �윋� [An overview of ES6 Modules in JavaScript �� Brent Graham](https://blog.cloud66.com/an-overview-of-es6-modules-in-javascript/)
 * �윋� [ES6 Modules in Depth �� Nicol찼s Bevacqua](https://ponyfoo.com/articles/es6-modules-in-depth)
 * �윋� [ES6 modules, Node.js and the Michael Jackson Solution �� Alberto Gimeno](https://medium.com/dailyjs/es6-modules-node-js-and-the-michael-jackson-solution-828dc244b8b)

### 영상

 * �윃� [Immediately Invoked Function Expression - Beau teaches JavaScript �� freeCodeCamp](https://www.youtube.com/watch?v=3cbiZV4H22c)
 * �윃� [Understanding JavaScript IIFE](https://www.youtube.com/watch?v=I5EntfMeIIQ)
 * �윃� [JavaScript Modules: ES6 Import and Export �� Kyle Robinson](https://www.youtube.com/watch?v=_3oSWwapPKQ)
 * �윃� [ES6 - Modules �� Ryan Christiani](https://www.youtube.com/watch?v=aQr2bV1BPyE)
 * �윃� [ES6 Modules in the Real World �� Sam Thorogood](https://www.youtube.com/watch?v=fIP4pjAqCtQ)
 * �윃� [ES6 Modules �� TempleCoding](https://www.youtube.com/watch?v=5P04OK6KlXA)

**[燧� Back to Top](#table-of-contents)**

---

## 9. 메시지 큐와 이벤트 루프

### 글

 * �윋� [JavaScript Event Loop Explained �� Anoop Raveendran](https://medium.com/front-end-hacking/javascript-event-loop-explained-4cd26af121d4)
 * �윋� [The JavaScript Event Loop: Explained �� Erin Sweson-Healey](https://blog.carbonfive.com/2013/10/27/the-javascript-event-loop-explained/)
 * �윋� [What is the Event Loop in Javascript �� WP Tutor.io](https://www.wptutor.io/web/js/javascript-event-loop)
 * �윋� [Understanding JS: The Event Loop �� Alexander Kondov](https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40)
 * �윋� [Understanding the JavaScript Event Loop �� Ashish Gupta](https://www.zeolearn.com/magazine/understanding-the-javascript-event-loop)
 * �윋� [Event Loop in Javascript �� Manjula Dube](https://code.likeagirl.io/what-the-heck-is-event-loop-1e414fccef49)
 * �윋� [The JavaScript Event Loop �� Flavio Copes](https://flaviocopes.com/javascript-event-loop/)
 * �윋� [How JavaScript works: Event loop �� Alexander Zlatkov](https://blog.sessionstack.com/how-javascript-works-event-loop-and-the-rise-of-async-programming-5-ways-to-better-coding-with-2f077c4438b5)

### 영상

 * �윃� [What the heck is the event loop anyway? | JSConf EU �� Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
 * �윃� [JavaScript Event Loop �� ComScience Simplified](https://www.youtube.com/watch?v=XzXIMZMN9k4)
 * �윃� [I'm stuck in an Event Loop �� Philip Roberts](https://www.youtube.com/watch?v=6MXRNXXgP_0)
 * �윃� [In The Loop - Jake Archibald | JSConf.Asia 2018](https://www.youtube.com/watch?v=cCOL7MC4Pl0)


**[燧� Back to Top](#table-of-contents)**

---

## 10. setTimeout, setInterval, requestAnimationFrame

### 글

 * �윋� [setTimeout and setInterval �� JavaScript.Info](https://javascript.info/settimeout-setinterval)
 * �윋� [Why not to use setInterval �� Akanksha Sharma](https://dev.to/akanksha_9560/why-not-to-use-setinterval--2na9)
 * �윋� [setTimeout VS setInterval �� Develoger](https://develoger.com/settimeout-vs-setinterval-cff85142555b)
 * �윋� [Using requestAnimationFrame �� Chris Coyier](https://css-tricks.com/using-requestanimationframe/)
 * �윋� [Understanding JavaScript's requestAnimationFrame() �� JavaScript Kit](http://www.javascriptkit.com/javatutors/requestanimationframe.shtml)
 * �윋� [Handling time intervals in JavaScript - Amit Merchant](https://www.amitmerchant.com/Handling-Time-Intervals-In-Javascript/)

### 영상

 * �윃� [Javascript: How setTimeout and setInterval works �� Coding Blocks India](https://www.youtube.com/watch?v=6bPKyl8WYWI)
 * �윃� [setTimeout and setInterval in JavaScript �� techsith](https://www.youtube.com/watch?v=TbCgGWe8LN8)
 * �윃� [JavaScript Timers �� Steve Griffith](https://www.youtube.com/watch?v=0VVJSvlUgtg)
 * �윃� [JavaScript setTimeout, setInterval & clearInterval �� DoingITeasyChannel](https://www.youtube.com/watch?v=BVALvvy5bZY)
 * �윃� [JavaScript setTimeOut and setInterval Explained �� Theodore Anderson](https://www.youtube.com/watch?v=mVKfrWCOB60)

**[燧� Back to Top](#table-of-contents)**

---

## 11. 자바스크립트 엔진

### 글

 * �윋� [JavaScript Engines �� Jen Looper](http://www.softwaremag.com/javascript-engines/)
 * �윋� [Understanding How the Chrome V8 Engine Translates JavaScript into Machine Code �� DroidHead](https://medium.freecodecamp.org/understanding-the-core-of-nodejs-the-powerful-chrome-v8-engine-79e7eb8af964)
 * �윋� [Understanding V8�셲 Bytecode �� Franziska Hinkelmann](https://medium.com/dailyjs/understanding-v8s-bytecode-317d46c94775)
 * �윋� [How the V8 engine works? �� Thibault Laurens](http://thibaultlaurens.github.io/javascript/2013/04/29/how-the-v8-engine-works/)
 * �윋� [A Brief History of Google�셲 V8 Javascript Engine �� Clair Smith](https://www.mediacurrent.com/blog/brief-history-googles-v8-javascript-engine/)
 * �윋� [JavaScript essentials: why you should know how the engine works - Rainer Hahnekamp](https://medium.freecodecamp.org/javascript-essentials-why-you-should-know-how-the-engine-works-c2cc0d321553)


### 영상

 * �윃� [JavaScript Engines: The Good Parts�꽓 �� Mathias Bynens & Benedikt Meurer](https://www.youtube.com/watch?v=5nmpokoRaZI)

**[燧� Back to Top](#table-of-contents)**

---

## 12. 비트 연산자, 형식화 배열, 버퍼(배열)

### 글

 * �윋� [Programming with JS: Bitwise Operations �� Alexander Kondov](https://hackernoon.com/programming-with-js-bitwise-operations-393eb0745dc4)
 * �윋� [Using JavaScript�셲 Bitwise Operators in Real Life �� ian m](https://codeburst.io/using-javascript-bitwise-operators-in-real-life-f551a731ff5)
 * �윋� [JavaScript Bitwise Operators �� w3resource](https://www.w3resource.com/javascript/operators/bitwise-operator.php)
 * �윋� [Bitwise Operators in Javascript �� Joe Cha](https://medium.com/bother7-blog/bitwise-operators-in-javascript-65c4c69be0d3)
 * �윋� [A Comprehensive Primer on Binary Computation and Bitwise Operators in Javascript �� Paul Brown](https://medium.com/techtrument/a-comprehensive-primer-on-binary-computation-and-bitwise-operators-in-javascript-81acf8341f04)

 ### 영상

 * �윃� [JavaScript Bitwise Operators �� Programming with Mosh](https://www.youtube.com/watch?v=mesu75PTDC8)

**[燧� Back to Top](#table-of-contents)**

---

## 13. DOM과 Layout Trees

### 글

 * �윋� [How To Understand and Modify the DOM in JavaScript �� Tania Rascia](https://www.digitalocean.com/community/tutorials/introduction-to-the-dom)
 * �윋� [JavaScript DOM Tutorial with Example �� Guru99](https://www.guru99.com/how-to-use-dom-and-events-in-javascript.html)
 * �윋� [What is the DOM? �� Chris Coyier](https://css-tricks.com/dom/)
 * �윋� [Traversing the DOM with JavaScript �� Zell Liew](https://zellwk.com/blog/dom-traversals/)
 * �윋� [Eloquent JavaScript [Book] �� The Document Object Model](https://eloquentjavascript.net/14_dom.html)
 * �윋� [DOM Tree](https://javascript.info/dom-nodes)
 * �윋� [Render Tree Construction �� Ilya Grigorik](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)

 ### 영상

 * �윃� [JavaScript DOM �� The Net Ninja](https://www.youtube.com/watch?v=FIORjGvT0kk)
 * �윃� [JavaScript DOM Crash Course �� Traversy Media](https://www.youtube.com/watch?v=0ik6X4DJKCc)

**[燧� Back to Top](#table-of-contents)**

---

## 14. 팩토리와 클래스

### 글

 * �윋� [How To Use Classes in JavaScript �� Tania Rascia](https://www.digitalocean.com/community/tutorials/understanding-classes-in-javascript)
 * �윋� [Javascript Classes �� Under The Hood �� Majid](https://medium.com/tech-tajawal/javascript-classes-under-the-hood-6b26d2667677)
 * �윋� [ES6 Classes �� Nathaniel Foster](https://www.javascriptjanuary.com/blog/es6-classes)
 * �윋� [Better JavaScript with ES6, Pt. II: A Deep Dive into Classes �� Peleke Sengstacke](https://scotch.io/tutorials/better-javascript-with-es6-pt-ii-a-deep-dive-into-classes)
 * �윋� [Understand the Factory Design Pattern in Plain JavaScript �� Aditya Agarwal](https://medium.com/front-end-hacking/understand-the-factory-design-pattern-in-plain-javascript-20b348c832bd)
 * �윋� [JavaScript Factory Functions vs Constructor Functions vs Classes �� Eric Elliott](https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e)
 * �윋� [JavaScript Factory Functions with ES6+ �� Eric Elliott](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1)
 * �윋� [Factory Functions in JavaScript �� Josh Miller](https://atendesigngroup.com/blog/factory-functions-javascript)
 * �윋� [The Factory Pattern in JS ES6 �� SnstsDev](https://medium.com/@SntsDev/the-factory-pattern-in-js-es6-78f0afad17e9)
 * �윋� [Class vs Factory function: exploring the way forward �� Cristi Salcescu](https://medium.freecodecamp.org/class-vs-factory-function-exploring-the-way-forward-73258b6a8d15)

 ### 영상

 * �윃� [JavaScript Factory Functions �� Programming with Mosh](https://www.youtube.com/watch?v=jpegXpQpb3o)
 * �윃� [Factory Functions in JavaScript �� Fun Fun Function](https://www.youtube.com/watch?v=ImwrezYhw4w)
 * �윃� [Javascript Tutorial Function Factories �� Crypto Chan](https://www.youtube.com/watch?v=R7-IwpH80UE)

**[燧� Back to Top](#table-of-contents)**

---

## 15. this, call, apply, bind

### 글

 * �윋� [How-to: call() , apply() and bind() in JavaScript �� Niladri Sekhar Dutta](https://www.codementor.io/niladrisekhardutta/how-to-call-apply-and-bind-in-javascript-8i1jca6jp)
 * �윋� [JavaScript�셲 Apply, Call, and Bind Methods are Essential for JavaScript Professionals �� Richard Bovell](http://javascriptissexy.com/javascript-apply-call-and-bind-methods-are-essential-for-javascript-professionals/)
 * �윋� [WTF is this - Understanding the this keyword, call, apply, and bind in JavaScript �� Tyler McGinnis](https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/)
 * �윋� [Javascript: call(), apply() and bind() �� Omer Goldberg](https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb)
 * �윋� [The difference between call / apply / bind �� Ivan Sifrim](https://medium.com/@ivansifrim/the-differences-between-call-apply-bind-276724bb825b)
 * �윋� [call(), apply() and bind() methods in JavaScript](https://tech.io/playgrounds/9799/learn-solve-call-apply-and-bind-methods-in-javascript)
 * �윋� [Mastering 'this' in JavaScript: Callbacks and bind(), apply(), call() �� Michelle Gienow](https://thenewstack.io/mastering-javascript-callbacks-bind-apply-call/)
 * �윋� [JavaScript�셲 apply, call, and bind explained by hosting a cookout �� Kevin Kononenko](https://dev.to/kbk0125/javascripts-apply-call-and-bind-explained-by-hosting-a-cookout-32jo)
 * �윋� [How AND When to use bind, call, and apply in Javascript �� Eigen X](https://www.eigenx.com/blog/https/mediumcom/eigen-x/how-and-when-to-use-bind-call-and-apply-in-javascript-77b6f42898fb)
 * �윋� [JavaScript .bind() vs .apply() and .call() �� Hack Sparrow](https://www.hacksparrow.com/javascript-bind-vs-apply-and-call.html)
 * �윋� [call() �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
 * �윋� [bind() �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)
 * �윋� [apply() �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
 * �윋� [What is 'this' in JavaScript? �� Daniel Li](http://blog.brew.com.hk/what-is-this-in-javascript/)
 * �윋� [Let me explain to you what is `this`. (Javascript) �� Jason Yu](https://dev.to/ycmjason/let-me-explain-to-you-what-is-this-javascript-44ja)

  ### 영상

 * �윃� [JavaScript call, apply and bind �� techsith](https://www.youtube.com/watch?v=c0mLRpw-9rI)
 * �윃� [JavaScript Practical Applications of Call, Apply and Bind functions�� techsith](https://www.youtube.com/watch?v=AYVYxezrMWA)
 * �윃� [JavaScript (call, bind, apply) �� curious aatma](https://www.youtube.com/watch?v=Uy0NOXLBraE)
 * �윃� [Understanding Functions and 'this' In The World of ES2017 �� Bryan Hughes](https://www.youtube.com/watch?v=AOSYY1_np_4)
 * �윃� [bind and this - Object Creation in JavaScript - FunFunFunction](https://www.youtube.com/watch?v=GhbhD1HR5vk)

**[燧� Back to Top](#table-of-contents)**

---

## 16. new, 생성자, instanceof, 인스턴스

### 글

 * �윋� [JavaScript For Beginners: the �쁭ew�� operator �� Brandon Morelli](https://codeburst.io/javascript-for-beginners-the-new-operator-cee35beb669e)
 * �윋� [Let�셲 demystify JavaScript�셲 �쁭ew�� keyword �� Cynthia Lee](https://medium.freecodecamp.org/demystifying-javascripts-new-keyword-874df126184c)
 * �윋� [Constructor, operator "new" �� JavaScript.Info](https://javascript.info/constructor-new)
 * �윋� [Understanding JavaScript Constructors �� Faraz Kelhini](https://css-tricks.com/understanding-javascript-constructors/)
 * �윋� [Use Constructor Functions �� Openclassrooms](https://openclassrooms.com/en/courses/3523231-learn-to-code-with-javascript/4379006-use-constructor-functions)
 * �윋� [Beyond `typeof` and `instanceof`: simplifying dynamic type checks �� Dr. Axel Rauschmayer](http://2ality.com/2017/08/type-right.html)
 * �윋� [What Is the Instanceof Operator in JavaScript �� appendTo](https://appendto.com/2016/10/what-is-the-instanceof-operator-in-javascript/)
 * �윋� [JavaScript instanceof vs typeof �� Gary Rafferty](http://garyrafferty.com/2012/12/07/JavaScript-instanceof-vs-typeof.html)
 * �윋� [Function and Object, instances of each other �� Kiro Risk](https://javascriptrefined.io/function-and-object-instances-of-each-other-1e1095d5faac)

**[燧� Back to Top](#table-of-contents)**

---

## 17. 프로토타입의 상속과 체인

### 글

 * �윋� [Javascript : Prototype vs Class �� Valentin PARSY](https://medium.com/@parsyval/javascript-prototype-vs-class-a7015d5473b)
 * �윋� [JavaScript engine fundamentals: optimizing prototypes �� Mathias Bynens](https://mathiasbynens.be/notes/prototypes)
 * �윋� [JavaScript Prototype �� NC Patro](https://codeburst.io/javascript-prototype-cb29d82b8809)
 * �윋� [Prototype in Javascript �� Sandeep Ranjan](https://www.codementor.io/sandeepranjan2007/prototype-in-javascipt-knbve0lqo)
 * �윋� [Prototypes in JavaScript �� Rupesh Mishra](https://hackernoon.com/prototypes-in-javascript-5bba2990e04b)
 * �윋� [Prototype in JavaScript: it�셲 quirky, but here�셲 how it works �� Pranav Jindal](https://medium.freecodecamp.org/prototype-in-js-busted-5547ec68872)
 * �윋� [Inheritance and the prototype chain �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
 * �윋� [Master the JavaScript Interview: What�셲 the Difference Between Class & Prototypal Inheritance? �� Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-s-the-difference-between-class-prototypal-inheritance-e4cd0a7562e9)
 * �윋� [Understanding JavaScript: Prototype and Inheritance �� Alexander Kondov](https://hackernoon.com/understanding-javascript-prototype-and-inheritance-d55a9a23bde2)
 * �윋� [Prototypal Inheritance �� JavaScript.Info](https://javascript.info/prototype-inheritance)
 * �윋� [How To Work with Prototypes and Inheritance in JavaScript �� Tania Rascia](https://www.digitalocean.com/community/tutorials/understanding-prototypes-and-inheritance-in-javascript)
 * �윋� [Master JavaScript Prototypes & Inheritance �� Arnav Aggarwal](https://codeburst.io/master-javascript-prototypes-inheritance-d0a9a5a75c4e)
 * �윋� [You Don't Know JS [Book] Chapter 5: Prototypes �� Kyle Simpson](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch5.md)
 * �윋� [JavaScript�셲 Prototypal Inheritance Explained Using CSS �� Nash Vail](https://medium.freecodecamp.org/understanding-prototypal-inheritance-in-javascript-with-css-93b2fcda75e4)
 * �윋� [Prototypal Inheritance in JavaScript �� Jannis Redmann](https://gist.github.com/derhuerst/a585c4916b1c361cc6f0)
 * �윋� [Classical and Prototypical Inheritance in JavaScript �� Danny Cornelisse](http://www.competa.com/blog/classical-prototypical-inheritance-javascript/)
 * �윋� [Demystifying ES6 Classes And Prototypal Inheritance �� Neo Ighodaro](https://scotch.io/tutorials/demystifying-es6-classes-and-prototypal-inheritance)
 * �윋� [Intro To Prototypal Inheritance �� Dharani Jayakanthan](https://dev.to/danny/intro-to-prototypal-inheritance---js-9di)
 * �윋� [Classes in JavaScript - Explained �� Daniel Li](http://blog.brew.com.hk/classes-in-javascript-explained/)
 * �윋� [You Don't Know JS: this & Object Prototypes �� Kyle Simpson](https://github.com/getify/You-Dont-Know-JS/blob/master/this%20%26%20object%20prototypes/ch4.md)

 ### 영상

 * �윃� [Javascript Prototype Inheritance �� Avelx](https://www.youtube.com/watch?v=sOrtAjyk4lQ)
 * �윃� [JavaScript Prototype Inheritance Explained pt. I �� techsith](https://www.youtube.com/watch?v=7oNWNlMrkpc)
 * �윃� [JavaScript Prototype Inheritance Explained pt. II �� techsith](https://www.youtube.com/watch?v=uIlj6_z_wL8)
 * �윃� [JavaScript Prototype Inheritance Explained �� Kyle Robinson](https://www.youtube.com/watch?v=qMO-LTOrJaE)
 * �윃� [Advanced Javascript - Prototypal Inheritance In 1 Minute](https://www.youtube.com/watch?v=G6l5CHl67HQ)
 * �윃� [An Overview Of Classical Javascript Classes and Prototypal Inheritance �� Pentacode](https://www.youtube.com/watch?v=phwzuiJJPpQ)
 * �윃� [Object Oriented JavaScript - Prototype �� The Net Ninja](https://www.youtube.com/watch?v=4jb4AYEyhRc)
 * �윃� [Prototype in JavaScript �� kudvenkat](https://www.youtube.com/watch?v=2rkEbcptR64)
 * �윃� [JavaScript Using Prototypes �� O'Reilly](https://www.youtube.com/watch?v=oCwCcNvaXAQ)
 * �윃� [A Beginner's Guide to Javascript's Prototype �� Tyler Mcginnis](https://www.youtube.com/watch?v=XskMWBXNbp0)


**[燧� Back to Top](#table-of-contents)**

---

## 18. Object.create와 Object.assign

### 글

 * �윋� [Object.create() �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
 * �윋� [Object.create in JavaScript �� Rupesh Mishra](https://hackernoon.com/object-create-in-javascript-fa8674df6ed2)
 * �윋� [Object.create(): the New Way to Create Objects in JavaScript �� Rob Gravelle](https://www.htmlgoodies.com/beyond/javascript/object.create-the-new-way-to-create-objects-in-javascript.html)
 * �윋� [Basic Inheritance with Object.create �� Joshua Clanton](http://adripofjavascript.com/blog/drips/basic-inheritance-with-object-create.html)
 * �윋� [Object.create() In JavaScript �� GeeksforGeeks](https://www.geeksforgeeks.org/object-create-javascript/)
 * �윋� [Understanding the difference between Object.create() and the new operator �� Jonathan Voxland](https://medium.com/@jonathanvox01/understanding-the-difference-between-object-create-and-the-new-operator-b2a2f4749358)
 * �윋� [JavaScript Object Creation: Patterns and Best Practices �� Jeff Mott](https://www.sitepoint.com/javascript-object-creation-patterns-best-practises/)
 * �윋� [Dealing With Objects in JavaScript With Object.assign, Object.keys and hasOwnProperty](https://alligator.io/js/dealing-with-objects/)
 * �윋� [Copying Objects in JavaScript �� Orinami Olatunji](https://scotch.io/bar-talk/copying-objects-in-javascript)
 * �윋� [Object.assign() �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
 * �윋� [JavaScript: Object.assign() �� Thiago S. Adriano](https://codeburst.io/javascript-object-assign-bc9696dcbb6e)

 ### 영상

 * �윃� [Object.assign() explained �� Aaron Writes Code](https://www.youtube.com/watch?v=aw7NfYhR5rc)
 * �윃� [Object.assign() Method �� techsith](https://www.youtube.com/watch?v=9Ky4X6inpi4)

**[燧� Back to Top](#table-of-contents)**

---

## 19. map, reduce, filter

### 글

 * �윋� [JavaScript Functional Programming �� map, filter and reduce �� Bojan Gvozderac](https://medium.com/jsguru/javascript-functional-programming-map-filter-and-reduce-846ff9ba492d)
 * �윋� [Learn map, filter and reduce in Javascript �� Jo찾o Miguel Cunha](https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4)
 * �윋� [JavaScript�셲 Map, Reduce, and Filter �� Dan Martensen](https://danmartensen.svbtle.com/javascripts-map-reduce-and-filter)
 * �윋� [How to Use Map, Filter, & Reduce in JavaScript �� Peleke Sengstacke](https://code.tutsplus.com/tutorials/how-to-use-map-filter-reduce-in-javascript--cms-26209)
 * �윋� [JavaScript �� Learn to Chain Map, Filter, and Reduce �� Brandon Morelli](https://codeburst.io/javascript-learn-to-chain-map-filter-and-reduce-acd2d0562cd4)
 * �윋� [Javascript data structure with map, reduce, filter and ES6 �� Deepak Gupta](https://codeburst.io/write-beautiful-javascript-with-%CE%BB-fp-es6-350cd64ab5bf)
 * �윋� [Understanding map, filter and reduce in Javascript �� Luuk Gruijs](https://hackernoon.com/understanding-map-filter-and-reduce-in-javascript-5df1c7eee464)
 * �윋� [Functional Programming in JS: map, filter, reduce (Pt. 5) �� Omer Goldberg](https://hackernoon.com/functional-programming-in-js-map-filter-reduce-pt-5-308a205fdd5f)
 * �윋� [JavaScript: Map, Filter, Reduce �� William S. Vincent](https://wsvincent.com/functional-javascript-map-filter-reduce/)
 * �윋� [Arrow Functions: Fat and Concise Syntax in JavaScript �� Kyle Pennell](https://www.sitepoint.com/es6-arrow-functions-new-fat-concise-syntax-javascript/)
 * �윋� [JavaScript: Arrow Functions for Beginners �� Brandon Morelli](https://codeburst.io/javascript-arrow-functions-for-beginners-926947fc0cdc)
 * �윋� [When (and why) you should use ES6 arrow functions �� and when you shouldn�셳 �� Cynthia Lee](https://medium.freecodecamp.org/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26)
 * �윋� [JavaScript �� Learn & Understand Arrow Functions �� Brandon Morelli](https://codeburst.io/javascript-learn-understand-arrow-functions-fe2083533946)
 * �윋� [(JavaScript )=> Arrow functions �� sigu](https://medium.com/podiihq/javascript-arrow-functions-27d4c3334b83)
 * �윋� [A possibility to use Async/Await for filter(), find(), forEach(), map() and reduce() methods in Array - Ruwan Geeganage](https://www.linkedin.com/pulse/possibility-use-asyncawait-filter-find-foreach-map-reduce-geeganage/)

 ### 영상

 * �윃� [Map, Filter and Reduce �� Lydia Hallie](https://www.youtube.com/watch?v=UXiYii0Y7Nw)
 * �윃� [Functional JavaScript: Map, forEach, Reduce, Filter �� Theodore Anderson](https://www.youtube.com/watch?v=vytzLlY_wmU)
 * �윃� [JavaScript Array superpowers: Map, Filter, Reduce (part I) �� Michael Rosata](https://www.youtube.com/watch?v=qTeeVd8hOFY)
 * �윃� [JavaScript Array superpowers: Map, Filter, Reduce (part 2) �� Michael Rosata](https://www.youtube.com/watch?v=gIm9xLYudL0)
 * �윃� [JavaScript Higher Order Functions - Filter, Map, Sort & Reduce �� Epicop](https://www.youtube.com/watch?v=zYBeEPxNSbw)
 * �윃� [[Array Methods 2/3] .filter + .map + .reduce �� CodeWithNick](https://www.youtube.com/watch?v=4qWlqD0yYTU)
 * �윃� [Arrow functions in JavaScript - What, Why and How �� Fun Fun Function](https://www.youtube.com/watch?v=6sQDTgOqh-I)
 * �윃� [Learning Functional Programming with JavaScript �� Anjana Vakil - JSUnconf](https://www.youtube.com/watch?v=e-5obm1G_FY&t=1521s)


**[燧� Back to Top](#table-of-contents)**

---

## 20. 순수함수, 부수효과, 상태변이

### 글

 * �윋� [Javascript and Functional Programming �� Pure Functions �� Omer Goldberg](https://hackernoon.com/javascript-and-functional-programming-pt-3-pure-functions-d572bb52e21c)
 * �윋� [Master the JavaScript Interview: What is a Pure Function? �� Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976)
 * �윋� [JavaScript: What Are Pure Functions And Why Use Them? �� James Jeffery](https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c)
 * �윋� [Pure functions in JavaScript �� @nicoespeon](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/)
 * �윋� [Functional Programming: Pure Functions �� Arne Brasseur](https://www.sitepoint.com/functional-programming-pure-functions/)
 * �윋� [Pure Functions In Javascript �� Krunal](https://appdividend.com/2017/04/10/pure-functions-in-javascript/)
 * �윋� [Making your JavaScript Pure �� Jack Franklin](https://alistapart.com/article/making-your-javascript-pure)
 * �윋� [To mutate, or not to mutate, in JavaScript](https://slemgrim.com/mutate-or-not-to-mutate/)
 * �윋� [Arrays, Objects and Mutations �� Federico Kn체ssel](https://medium.com/@fknussel/arrays-objects-and-mutations-6b23348b54aa)
 * �윋� [The State of Immutability �� Maciej Sikora](https://medium.com/dailyjs/the-state-of-immutability-169d2cd11310)
 * �윋� [How to deal with dirty side effects in your pure functional JavaScript �� James Sinclair](https://jrsinclair.com/articles/2018/how-to-deal-with-dirty-side-effects-in-your-pure-functional-javascript/)
 * �윋� [Preventing Side Effects in JavaScript �� David Walsh](https://davidwalsh.name/preventing-sideeffects-javascript)

 ### 영상

 * �윃� [Pure Functions �� Hexlet](https://www.youtube.com/watch?v=dZ41D6LDSBg)
 * �윃� [Pure Functions - Functional Programming in JavaScript �� Paul McBride](https://www.youtube.com/watch?v=Jh_Uzqzz_wM)
 * �윃� [JavaScript Pure Functions �� Seth Alexander](https://www.youtube.com/watch?v=frT3H-eBmPc)


**[燧� Back to Top](#table-of-contents)**

---

## 21. 클로저(Closures)

### 글

 * �윋� [Closures �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
 * �윋� [I never understood JavaScript closures �� Olivier De Meulder](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)
 * �윋� [Closure �� JavaScript.Info](https://javascript.info/closure)
 * �윋� [Understand JavaScript Closures With Ease �� Richard Bovell](http://javascriptissexy.com/understand-javascript-closures-with-ease/)
 * �윋� [Understanding JavaScript Closures �� Codesmith](https://codeburst.io/understanding-javascript-closures-da6aab330302)
 * �윋� [Understand Closures in JavaScript �� Brandon Morelli](https://codeburst.io/understand-closures-in-javascript-d07852fa51e7)
 * �윋� [A simple guide to help you understand closures in JavaScript �� Prashant Ram](https://medium.freecodecamp.org/javascript-closures-simplified-d0d23fa06ba4)
 * �윋� [Understanding JavaScript Closures: A Practical Approach �� Paul Upendo](https://scotch.io/tutorials/understanding-javascript-closures-a-practical-approach)
 * �윋� [Understanding JavaScript: Closures �� Alexander Kondov](https://hackernoon.com/understanding-javascript-closures-4188edf5ea1b)
 * �윋� [How to use JavaScript closures with confidence �� L챕na Faure](https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b)
 * �윋� [JavaScript closures by example �� tyler](https://howchoo.com/g/mge2mji2mtq/javascript-closures-by-example)

 ### 영상

 * �윃� [Javascript Closure �� techsith](https://www.youtube.com/watch?v=71AtaJpJHw0)
 * �윃� [Closures �� Fun Fun Function](https://www.youtube.com/watch?v=CQqwU2Ixu-U)
 * �윃� [Closures in JavaScript �� techsith](https://www.youtube.com/watch?v=-xqJo5VRP4A)
 * �윃� [JavaScript Closures 101: What is a closure? �� JavaScript Tutorials](https://www.youtube.com/watch?v=yiEeiMN2Khs)
 * �윃� [Closures �� freeCodeCamp](https://www.youtube.com/watch?v=1JsJx1x35c0)
 * �윃� [JavaScript Closures �� CodeWorkr](https://www.youtube.com/watch?v=-rLrGAXK8WE)

**[燧� Back to Top](#table-of-contents)**

---

## 22. 고차함수

### 글

 * �윋� [Higher-Order Functions �� Eloquent JavaScript [Book]](https://eloquentjavascript.net/05_higher_order.html)
 * �윋� [Higher-Order Functions in JavaScript �� M. David Green](https://www.sitepoint.com/higher-order-functions-javascript/)
 * �윋� [Higher Order Functions: Using Filter, Map and Reduce for More Maintainable Code �� Guido Schmitz](https://medium.freecodecamp.org/higher-order-functions-in-javascript-d9101f9cf528)
 * �윋� [First-class and Higher Order Functions: Effective Functional JavaScript �� Hugo Di Francesco](https://hackernoon.com/effective-functional-javascript-first-class-and-higher-order-functions-713fde8df50a)
 * �윋� [Higher Order Functions in JavaScript �� John Hannah](https://www.lullabot.com/articles/higher-order-functions-in-javascript)
 * �윋� [Higher-order Functions �� Richard Bovell](http://javascriptissexy.com/tag/higher-order-functions/)
 * �윋� [Higher Order Functions in JavaScript �� Zsolt Nagy](http://www.zsoltnagy.eu/higher-order-functions-in-javascript/)
 * �윋� [Fun With Higher Order Functions In JavaScript �� Derick](https://derickbailey.com/2015/10/21/fun-with-higher-order-functions-in-javascript/)
 * �윋� [Just a reminder on how to use high order functions �� Pedro Filho](https://github.com/pedroapfilho/high-order-functions)
 * �윋� [How to use JavaScript closures with confidence �� L챕na Faure](https://hackernoon.com/how-to-use-javascript-closures-with-confidence-85cd1f841a6b)
 * �윋� [JavaScript closures by example �� tyler](https://howchoo.com/g/mge2mji2mtq/javascript-closures-by-example)

 ### 영상

 * �윃� [JavaScript Higher Order Functions & Arrays �� Traversy Media](https://www.youtube.com/watch?v=rRgD1yVwIvE)
 * �윃� [Higher Order Functions �� Fun Fun Function](https://www.youtube.com/watch?v=BMUiFMZr7vk)
 * �윃� [Higher Order Functions in Javascript �� Raja Yogan](https://www.youtube.com/watch?v=dTlpYnmBW9I)
 * �윃� [Higher Order Iterators in JavaScript �� Fun Fun Function](https://www.youtube.com/watch?v=GYRMNp1SKXA)
 * �윃� [Higher Order Functions in JavaScript �� The Coding Train](https://www.youtube.com/watch?v=H4awPsyugS0)

**[燧� Back to Top](#table-of-contents)**

---

## 23. 재귀

### 글

 * �윋� [Recursion in JavaScript �� Kevin Ennis](https://medium.freecodecamp.org/recursion-in-javascript-1608032c7a1f)
 * �윋� [Understanding Recursion in JavaScript �� Zak Frisch](https://medium.com/@zfrisch/understanding-recursion-in-javascript-992e96449e03)
 * �윋� [Learn and Understand Recursion in JavaScript �� Brandon Morelli](https://codeburst.io/learn-and-understand-recursion-in-javascript-b588218e87ea)
 * �윋� [Recursion in Functional JavaScript �� M. David Green](https://www.sitepoint.com/recursion-functional-javascript/)
 * �윋� [Programming with JS: Recursion �� Alexander Kondov](https://hackernoon.com/programming-with-js-recursion-31371e2bf808)
 * �윋� [Anonymous Recursion in JavaScript �� simo](https://dev.to/simov/anonymous-recursion-in-javascript)
 * �윋� [Recursion, iteration and tail calls in JS �� loverajoel](http://www.jstips.co/en/javascript/recursion-iteration-and-tail-calls-in-js/)
 * �윋� [Understanding Recursion in JavaScript with Confidence �� Jay](https://www.thecodingdelight.com/understanding-recursion-javascript/)

 ### 영상

 * �윃� [Recursion In JavaScript �� techsith](https://www.youtube.com/watch?v=VtG0WAUvq2w)
 * �윃� [Recursion �� Fun Fun Function](https://www.youtube.com/watch?v=k7-N8R0-KY4)
 * �윃� [Recursion and Recursive Functions �� Hexlet](https://www.youtube.com/watch?v=vLhHyGTkjCs)
 * �윃� [Recursion: Recursion() �� JS Monthly �� Lucas da Costa](https://www.youtube.com/watch?v=kGXVsd8pBLw)
 * �윃� [Recursive Function in JavaScript �� kudvenkat](https://www.youtube.com/watch?v=uyjsR9eNTIw)
 * �윃� [What on Earth is Recursion? �� Computerphile](https://www.youtube.com/watch?v=Mv9NEXX1VHc)

**[燧� Back to Top](#table-of-contents)**

---

## 24. 컬렉션과 생성기

### 글

 * �윋� [ES6 In Depth: Collections �� Jason Orendorff](https://hacks.mozilla.org/2015/06/es6-in-depth-collections/)
 * �윋� [ES6 Collections: Using Map, Set, WeakMap, WeakSet �� Kyle Pennell](https://www.sitepoint.com/es6-collections-map-set-weakmap-weakset/)
 * �윋� [ES6 WeakMaps, Sets, and WeakSets in Depth �� Nicol찼s Bevacqua](https://ponyfoo.com/articles/es6-weakmaps-sets-and-weaksets-in-depth)
 * �윋� [Introduction to Sets in JavaScript �� Alligator.io](https://alligator.io/js/sets-introduction/)
 * �윋� [Introduction to Maps in JavaScript �� Alligator.io](https://alligator.io/js/maps-introduction/)
 * �윋� [Map, Set, WeakMap and WeakSet �� JavaScript.Info](https://javascript.info/map-set-weakmap-weakset)
 * �윋� [Maps in ES6 - A Quick Guide �� Ben Mildren](https://dev.to/mildrenben/maps-in-es6---a-quick-guide-35pk)
 * �윋� [ES6 �� Set vs Array �� What and when? �� Maya Shavin](https://medium.com/front-end-hacking/es6-set-vs-array-what-and-when-efc055655e1a)
 * �윋� [ES6 �� Map vs Object �� What and when? �� Maya Shavin](https://medium.com/front-end-hacking/es6-map-vs-object-what-and-when-b80621932373)
 * �윋� [ES6: Working with Sets in JavaScript �� Dead Code Rising](http://www.deadcoderising.com/es6-working-with-sets-in-javascript/)
 * �윋� [Array vs Set vs Map vs Object �� Real-time use cases in Javascript (ES6/ES7) �� Rajesh Babu](https://codeburst.io/array-vs-set-vs-map-vs-object-real-time-use-cases-in-javascript-es6-47ee3295329b)
 * �윋� [How to create an array of unique values in JavaScript using Sets �� Claire Parker-Jones](https://dev.to/claireparker/how-to-create-an-array-of-unique-values-in-javascript-using-sets-5dg6)
 * �윋� [What You Should Know About ES6 Maps �� Just Chris](https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e)
 * �윋� [ES6 Maps in Depth �� Nicol찼s Bevacqua](https://ponyfoo.com/articles/es6-maps-in-depth)
 * �윋� [Generator �� MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
* �윋� [What are JavaScript Generators and how to use them �� Vladislav Stepanov](https://codeburst.io/what-are-javascript-generators-and-how-to-use-them-c6f2713fd12e)
* �윋� [Understanding JavaScript Generators With Examples  �� Arfat Salman](https://codeburst.io/understanding-generators-in-es6-javascript-with-examples-6728834016d5)
* �윋� [The Basics of ES6 Generators �� Kyle Simpson](https://davidwalsh.name/es6-generators)



 ### 영상

 * �윃� [JavaScript ES6 / ES2015 Set, Map, WeakSet and WeakMap �� Traversy Media](https://www.youtube.com/watch?v=ycohYSx5h9w)
 * �윃� [The Differences between ES6 Maps and Sets �� Steve Griffith](https://www.youtube.com/watch?v=m4abICrldQI)
 * �윃� [Javascript Generators - THEY CHANGE EVERYTHING - ES6 Generators Harmony Generators �� LearnCode.academy](https://www.youtube.com/watch?v=QO07THdLWQo)

**[燧� Back to Top](#table-of-contents)**

---

## 25. Promises

### 글

 * �윋� [Promise �� MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
 * �윋� [JavaScript Promises for Dummies �� Jecelyn Yeen](https://scotch.io/tutorials/javascript-promises-for-dummies)
 * �윋� [Understanding promises in JavaScript �� Gokul N K](https://hackernoon.com/understanding-promises-in-javascript-13d99df067c1)
 * �윋� [Master the JavaScript Interview: What is a Promise? �� Eric Elliott](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261)
 * �윋� [An Overview of JavaScript Promises �� Sandeep Panda](https://www.sitepoint.com/overview-javascript-promises/)
 * �윋� [How to use Promises in JavaScript �� Prashant Ram](https://medium.freecodecamp.org/promises-in-javascript-explained-277b98850de)
 * �윋� [Implementing Promises In JavaScript �� Maciej Cieslar](https://medium.freecodecamp.org/how-to-implement-promises-in-javascript-1ce2680a7f51)
 * �윋� [JavaScript: Promises explained with simple real life analogies �� Shruti Kapoor](https://codeburst.io/javascript-promises-explained-with-simple-real-life-analogies-dd6908092138)
 * �윋� [Promises for Asynchronous Programming �� Exploring JS](http://exploringjs.com/es6/ch_promises.html)
 * �윋� [JavaScript Promises Explained By Gambling At A Casino �� Kevin Kononenko](https://blog.codeanalogies.com/2018/08/26/javascript-promises-explained-by-gambling-at-a-casino/)
 * �윋� [ES6 Promises: Patterns and Anti-Patterns �� Bobby Brennan](https://medium.com/datafire-io/es6-promises-patterns-and-anti-patterns-bbb21a5d0918)
 * �윋� [A Simple Guide to ES6 Promises �� Brandon Morelli](https://codeburst.io/a-simple-guide-to-es6-promises-d71bacd2e13a)
 * �윋� [The ES6 Promises �� Manoj Singh Negi](https://codeburst.io/the-es6-promises-87a979ab27e4)
 * �윋� [ES6 Promises in Depth �� Nicol찼s Bevacqua](https://ponyfoo.com/articles/es6-promises-in-depth)

 ### 영상

 * �윃� [Let's Learn ES6 - Promises �� Ryan Christiani](https://www.youtube.com/watch?v=vQ3MoXnKfuQ)
 * �윃� [JavaScript ES6 / ES2015 Promises �� Traversy Media](https://www.youtube.com/watch?v=XJEHuBZQ5dU)
 * �윃� [Promises �� Fun Fun Function](https://www.youtube.com/watch?v=2d7s3spWAzo)
 * �윃� [Error Handling Promises in JavaScript �� Fun Fun Function](https://www.youtube.com/watch?v=f8IgdnYIwOU)
 * �윃� [Promises Part 1 - Topics of JavaScript/ES6 �� The Coding Train](https://www.youtube.com/watch?v=QO4NXhWo_NM)
 
**[燧� Back to Top](#table-of-contents)**

---

## 26. async/await

### 글

 * �윋� [async/await �� JavaScript.Info](https://javascript.info/async-await)
 * �윋� [Understanding async/await in Javascript �� Gokul N K](https://hackernoon.com/understanding-async-await-in-javascript-1d81bb079b2c)
 * �윋� [Asynchronous Programming �� Eloquent JavaScript](https://eloquentjavascript.net/11_async.html)
 * �윋� [Exploring Async/Await Functions in JavaScript �� Alligator.io](https://alligator.io/js/async-functions/)
 * �윋� [Asynchronous Javascript using async/await �� Joy Warugu](https://scotch.io/tutorials/asynchronous-javascript-using-async-await)
 * �윋� [Modern Asynchronous JavaScript with async/await �� Flavio Copes](https://flaviocopes.com/javascript-async-await/)
 * �윋� [Asynchronous JavaScript: From Callback Hell to Async and Await �� Demir Selmanovic](https://www.toptal.com/javascript/asynchronous-javascript-async-await-tutorial)
 * �윋� [Javascript �� ES8 Introducing async/await Functions �� Ben Garrison](https://medium.com/@_bengarrison/javascript-es8-introducing-async-await-functions-7a471ec7de8a)
 * �윋� [How to escape async/await hell �� Aditya Agarwal](https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c)
 * �윋� [Understanding JavaScript�셲 async await �� Nicol찼s Bevacqua](https://ponyfoo.com/articles/understanding-javascript-async-await)
 * �윋� [JavaScript Async/Await: Serial, Parallel and Complex Flow �� TechBrij](https://techbrij.com/javascript-async-await-parallel-sequence)
 * �윋� [Asynchronous Programming �� Exploring JS](http://exploringjs.com/es6/ch_async.html)
 * �윋� [From JavaScript Promises to Async/Await: why bother? �� Chris Nwamba](https://blog.pusher.com/promises-async-await/)
 * �윋� [Flow Control in Modern JS: Callbacks to Promises to Async/Await �� Craig Buckler](https://www.sitepoint.com/flow-control-callbacks-promises-async-await/)
 * �윋� [JavaScript: Promises and Why Async/Await Wins the Battle �� Nick Parsons](https://dzone.com/articles/javascript-promises-and-why-asyncawait-wins-the-ba)

 ### 영상

 * �윃� [Async + Await �� Wes Bos](https://www.youtube.com/watch?v=9YkUCxvaLEk)
 * �윃� [Asynchrony: Under the Hood �� Shelley Vohr](https://www.youtube.com/watch?v=SrNQS8J67zc)
 * �윃� [async/await in JavaScript - What, Why and How �� Fun Fun Function](https://www.youtube.com/watch?v=568g8hxJJp4&index=3&list=PL0zVEGEvSaeHJppaRLrqjeTPnCH6)

**[燧� Back to Top](#table-of-contents)**

---

## 27. 자료 구조

### 글

 * �윋� [Data Structures in JavaScript �� Thon Ly](https://medium.com/siliconwat/data-structures-in-javascript-1b9aed0ea17c)
 * �윋� [Algorithms and Data Structures in JavaScript �� Oleksii Trekhleb](https://itnext.io/algorithms-and-data-structures-in-javascript-a71548f902cb)
 * �윋� [Data Structures: Objects and Arrays �� Chris Nwamba](https://scotch.io/courses/10-need-to-know-javascript-concepts/data-structures-objects-and-arrays)
 * �윋� [Data structures in JavaScript �� Benoit Vallon](http://blog.benoitvallon.com/data-structures-in-javascript/data-structures-in-javascript/)
 * �윋� [Playing with Data Structures in Javascript �� Anish K.](https://blog.cloudboost.io/playing-with-data-structures-in-javascript-stack-a55ebe50f29d)
 * �윋� [The Little Guide of Queue in JavaScript �� Germ찼n Cutraro](https://hackernoon.com/the-little-guide-of-queue-in-javascript-4f67e79260d9)
 * �윋� [All algorithms writing with JavaScript in the book 'Algorithms Fourth Edition'](https://github.com/barretlee/algorithms)
 * �윋� [Collection of classic computer science paradigms in JavaScript](https://github.com/nzakas/computer-science-in-javascript)
 * �윋� [All the things you didn't know you wanted to know about data structures](https://github.com/jamiebuilds/itsy-bitsy-data-structures)

 ### 영상

 * �윃� [Algorithms in JavaScript �� Seth Koch](https://www.youtube.com/watch?v=PylQlISSH8U&list=PLujX4CIdBGCa-65N3uN8CDbUMrYsHBrz-)
 * �윃� [Algorithms In Javascript | Ace Your Interview �� Eduonix Learning Solutions](https://www.youtube.com/watch?v=H_EBPZgiAas&list=PLDmvslp_VR0zYUSth_8O69p4_cmvZEgLa)
 * �윃� [Data Structures and Algorithms in JavaScript �� freeCodeCamp](https://www.youtube.com/watch?v=Gj5qBheGOEo&list=PLWKjhJtqVAbkso-IbgiiP48n-O-JQA9PJ)

**[燧� Back to Top](#table-of-contents)**

---

## 28. 함수 성능과 빅 오(Big-O) 표기법

### 글

 * �윋� [Big O Notation in Javascript �� C챕sar Ant처n Dorantes](https://medium.com/cesars-tech-insights/big-o-notation-javascript-25c79f50b19b)
 * �윋� [Time Complexity/Big O Notation �� Tim Roberts](https://medium.com/javascript-scene/time-complexity-big-o-notation-1a4310c3ee4b)
 * �윋� [Big O in JavaScript �� Gabriela Medina](https://medium.com/@gmedina229/big-o-in-javascript-36ff67766051)
 * �윋� [Big O Search Algorithms in JavaScript �� Bradley Braithwaite](http://www.bradoncode.com/blog/2012/04/big-o-algorithm-examples-in-javascript.html)
 * �윋� [Time Complexity Analysis in JavaScript �� Jennifer Bland](https://www.jenniferbland.com/time-complexity-analysis-in-javascript/)
 * �윋� [Algorithms in plain English: time complexity and Big-O Notation �� Michael Olorunnisola](https://medium.freecodecamp.org/time-is-complex-but-priceless-f0abd015063c)

### 영상

 * �윃� [JavaScript: Intro to Big O Notation and Function Runtime �� Eric Traub](https://www.youtube.com/watch?v=HgA5VOFan5E)
 * �윃� [Essential Big O for JavaScript Developers �� Dave Smith](https://www.youtube.com/watch?v=KatlvCFHPRo)
 * �윃� [Big O Notation - Time Complexity Analysis �� WebTunings](https://www.youtube.com/watch?v=ALl86xJiTD8)

**[燧� Back to Top](#table-of-contents)**

---

## 29. 알고리즘

### 글

 * �윋� [Data Structures and Algorithms using ES6](https://github.com/Crizstian/data-structure-and-algorithms-with-ES6)
 * �윋� [Algorithms and data structures implemented in JavaScript with explanations and links to further readings](https://github.com/trekhleb/javascript-algorithms)
 * �윋� [JS: Interview Algorithm](http://www.thatjsdude.com/interview/js1.html)
 * �윋� [Algorithms in JavaScript �� Thon Ly](https://medium.com/siliconwat/algorithms-in-javascript-b0bed68f4038)
 * �윋� [JavaScript Objects, Square Brackets and Algorithms �� Dmitri Grabov](https://medium.freecodecamp.org/javascript-objects-square-brackets-and-algorithms-e9a2916dc158)
 * �윋� [Atwood's Law applied to CS101 - Classic algorithms and data structures implemented in JavaScript](https://github.com/felipernb/algorithms.js)
 * �윋� [Data Structures and Algorithms library in JavaScript](https://github.com/yangshun/lago)
 * �윋� [Collection of computer science algorithms and data structures written in JavaScript](https://github.com/idosela/algorithms-in-javascript)

**[燧� Back to Top](#table-of-contents)**

---

## 30. 상속, 다형성, 코드의 재사용성

### 글

 * �윋� [Class inheritance, super �� JavaScript.Info](https://javascript.info/class-inheritance)
 * �윋� [Inheritance in JavaScript �� MDN](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance)
 * �윋� [Inheritance in JavaScript �� Rupesh Mishra](https://hackernoon.com/inheritance-in-javascript-21d2b82ffa6f)
 * �윋� [Simple Inheritance with JavaScript �� David Catuhe](https://www.sitepoint.com/simple-inheritance-javascript/)
 * �윋� [JavaScript �� Inheritance, delegation patterns and Object linking �� NC Patro](https://codeburst.io/javascript-inheritance-25fe61ab9f85)
 * �윋� [Object Oriented JavaScript: Polymorphism with examples �� Knoldus Blogs](https://blog.knoldus.com/object-oriented-javascript-polymorphism-with-examples/)
 * �윋� [Program Like Proteus �� A beginner�셲 guide to polymorphism in Javascript �� Sam Galson](https://medium.com/yld-engineering-blog/program-like-proteus-a-beginners-guide-to-polymorphism-in-javascript-867bea7c8be2)
 * �윋� [Object-oriented JavaScript: A Deep Dive into ES6 Classes �� Jeff Mott](https://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/)

  ### 영상

 * �윃� [Inheritance in JavaScript �� kudvenkat](https://www.youtube.com/watch?v=yXlFR81tDBM)
 * �윃� [JavaScript ES6 Classes and Inheritance �� Traversy Media](https://www.youtube.com/watch?v=RBLIm5LMrmc)
 * �윃� [Polymorphism in JavaScript �� kudvenkat](https://www.youtube.com/watch?v=zdovG9cuEBA)

**[燧� Back to Top](#table-of-contents)**

---

## 31. 설계 패턴

### 글

 * �윋� [4 JavaScript Design Patterns You Should Know �� Devan Patel](https://scotch.io/bar-talk/4-javascript-design-patterns-you-should-know)
 * �윋� [JavaScript Design Patterns �� Beginner's Guide to Mobile Web Development �� Soumyajit Pathak](https://medium.com/beginners-guide-to-mobile-web-development/javascript-design-patterns-25f0faaaa15)
 * �윋� [JavaScript Design Patterns �� Akash Pal](https://medium.com/front-end-hacking/javascript-design-patterns-ed9d4c144c81)
 * �윋� [Javascript Design Patterns: What They Are & How To Use Them �� Patrick Simpson](https://seesparkbox.com/foundry/javascript_design_patterns)
 * �윋� [All the 23 (GoF) design patterns implemented in Javascript �� Felipe Beline](https://github.com/fbeline/Design-Patterns-JS)
 * �윋� [Learning JavaScript Design Patterns �� Addy Osmani ](https://addyosmani.com/resources/essentialjsdesignpatterns/book/)

  ### 영상

 * �윃� [JavaScript Design Patterns �� Udacity](https://www.udacity.com/course/javascript-design-patterns--ud989)
 * �윃� [JavaScript Patterns for 2017 �� Scott Allen](https://www.youtube.com/watch?v=hO7mzO83N1Q)

 **[燧� Back to Top](#table-of-contents)**

---

## 32. 부분 어플리케이션, 커링(Currying), Compose, Pipe

### 글

 * �윋� [Use function composition in JavaScript �� R챕mi](https://www.codementor.io/michelre/use-function-composition-in-javascript-gkmxos5mj)
 * �윋� [Currying in JavaScript ES6 �� Adam Bene](https://blog.benestudio.co/currying-in-javascript-es6-540d2ad09400)
 * �윋� [Composition and Currying Elegance in JavaScript �� Pragyan Das](https://medium.com/@pragyan88/writing-middleware-composition-and-currying-elegance-in-javascript-8b15c98a541b)
 * �윋� [Functional JavaScript: Function Composition For Every Day Use �� Joel Thoms](https://hackernoon.com/javascript-functional-composition-for-every-day-use-22421ef65a10)
 * �윋� [Functional Composition: compose() and pipe() �� Anton Paras](https://medium.com/@acparas/what-i-learned-today-july-2-2017-ab9a46dbf85f)
 * �윋� [Why The Hipsters Compose Everything: Functional Composing In JavaScript �� A. Sharif](http://busypeoples.github.io/post/functional-composing-javascript/)
 * �윋� [A Gentle Introduction to Functional JavaScript pt III: Functions for making functions �� James Sinclair](https://jrsinclair.com/articles/2016/gentle-introduction-to-functional-javascript-functions/)
 * �윋� [Curry And Compose (why you should be using something like ramda in your code) �� jsanchesleao](https://jsleao.wordpress.com/2015/02/22/curry-and-compose-why-you-should-be-using-something-like-ramda-in-your-code/)
 * �윋� [Function Composition in JavaScript with Pipe �� Andy Van Slaars](https://vanslaars.io/post/create-pipe-function/)
 * �윋� [Practical Functional JavaScript with Ramda �� Andrew D'Amelio, Yuri Takhteyev](https://developer.telerik.com/featured/practical-functional-javascript-ramda/)
 * �윋� [The beauty in Partial Application, Currying, and Function Composition �� Joel Thoms](https://hackernoon.com/the-beauty-in-partial-application-currying-and-function-composition-d885bdf0d574)
 * �윋� [Curry or Partial Application? �� Eric Elliott](https://medium.com/javascript-scene/curry-or-partial-application-8150044c78b8)
 * �윋� [Partial Application in JavaScript �� Ben Alman](http://benalman.com/news/2012/09/partial-application-in-javascript/)
 * �윋� [Partial Application of Functions �� Functional Reactive Ninja](https://hackernoon.com/partial-application-of-functions-dbe7d9b80760)
 * �윋� [Currying vs Partial Application �� Deepak Gupta](https://codeburst.io/javascript-currying-vs-partial-application-4db5b2442be8)
 * �윋� [Partial Application in ECMAScript 2015 �� Ragan Wald](http://raganwald.com/2015/04/01/partial-application.html)
 * �윋� [Functional Composition in Javascript �� Joe Cortopassi](https://joecortopassi.com/articles/functional-composition-in-javascript/)
 * �윋� [So You Want to be a Functional Programmer pt. I �� Charles Scalfani](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-1-1f15e387e536)
 * �윋� [So You Want to be a Functional Programmer pt. II �� Charles Scalfani](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-2-7005682cec4a)
 * �윋� [So You Want to be a Functional Programmer pt. III �� Charles Scalfani](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-3-1b0fd14eb1a7)
 * �윋� [So You Want to be a Functional Programmer pt. IV �� Charles Scalfani](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-4-18fbe3ea9e49)
 * �윋� [So You Want to be a Functional Programmer pt. V �� Charles Scalfani](https://medium.com/@cscalfani/so-you-want-to-be-a-functional-programmer-part-5-c70adc9cf56a)
 * �윋� [Functional-Light JavaScript Chapter 3: Managing Function Inputs �� Kyle Simpson](https://github.com/getify/Functional-Light-JS/blob/master/manuscript/ch3.md)

  ### 영상

 * �윃� [Compose vs Pipe: Functional Programming in JavaScript �� Chyld Studios](https://www.youtube.com/watch?v=Wl2ejJOqHUU)
 * �윃� [JavaScript Functional Programing: Compose �� Theodore Anderson](https://www.youtube.com/watch?v=jigHxo9YR30)
 * �윃� [Function Composition - Functional JavaScript �� NWCalvank](https://www.youtube.com/watch?v=mth5WpEc4Qs)
 * �윃� [JavaScript Function Composition Explained �� Theodore Anderson](https://www.youtube.com/watch?v=Uam37AlzPYw)
 * �윃� [Let's code with function composition �� Fun Fun Function](https://www.youtube.com/watch?v=VGB9HbL1GHk)
 * �윃� [Partial Application vs. Currying �� NWCalvank](https://www.youtube.com/watch?v=DzLkRsUN2vE)
 * �윃� [JavaScript Partial Application �� Theodore Anderson](https://www.youtube.com/watch?v=jkebgHEcvac)

**[燧� Back to Top](#table-of-contents)**

---

## 33. 클린 코드

### 글

 * �윋� [Clean Code concepts adapted for JavaScript �� Ryan McDermott](https://github.com/ryanmcdermott/clean-code-javascript)
 * �윋� [JavaScript Clean Coding Best Practices �� Andr찼s T처th](https://blog.risingstack.com/javascript-clean-coding-best-practices-node-js-at-scale/)
 * �윋� [Function parameters in JavaScript Clean Code �� Kevin Peters](https://medium.com/@kevin_peters/function-parameters-in-javascript-clean-code-4caac109159b)
 * �윋� [Clean Code JavaScript �� Sarah Drasner](https://css-tricks.com/clean-code-javascript/)
 * �윋� [Keeping your code clean �� Samuel James](https://codeburst.io/keeping-your-code-clean-d30bcffd1a10)
 * �윋� [Best Practices for Using Modern JavaScript Syntax �� M. David Green](https://www.sitepoint.com/modern-javascript-best-practices/)

### 영상
*  �윃� [JavaScript Pro Tips - Code This, NOT That](https://www.youtube.com/watch?v=Mus_vwhTCq0)

 **[燧� Back to Top](#table-of-contents)**
