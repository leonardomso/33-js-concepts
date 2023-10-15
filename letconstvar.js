So we always encounter "let" and "const" and "var" when we work in JavaScript. But they behave very differently.
Let’s discuss:💻🧑‍💻

1) "let" and "const" also hoisted, but very differently in comparison to "var".
Example:😉
Console.log(a); // error ❌
Console.log(b); // prints the value of b.
let a=10;
var b=110;
Let’s see why this error occurs: 🤔

Even before executing the Js engine, allocate memory to "a" with undefind. In case of "b" it is in the global scope, but in the case of "a" it is somewhere inside a script that is not in the global scope, i.e., a separate memory space.
So here comes a concept called "temporal dead zone".

What is the temporal dead zone?

It is the time since when the "let" variable was hoisted and till it initializes with some value.
   Whenever we try to access a variable in the temporal dead zone,💀 it gives a (reference error).
  Here in the above example, "b" is attached to the "this" keyword and window object, i.e., window.b = 100 (o/p)
   But window.a throws an error since it is not in global scope.
   We can’t re-declare the same values with "var" and "let" i.e., let a=100; let a=20; this will give an error similar to "var" also.
  "const" also follows the same property as "let" i.e., it also follows the concept of the temporal dead zone.
  Example->
let a;
a=10;
console.log(a); // works fine o/p 10
but
const a;
a=10;
console.log(a); // error (syntax error)
So we have to assign the value on the same line as we declare the variable in the case of "const"
const b=10;
b=10;
console.log(b); // error (type error)
We can’t reassign the values in the case of const in the same variable.

