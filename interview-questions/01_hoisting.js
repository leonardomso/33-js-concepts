// ❓ Question: What is hoisting in JavaScript?

console.log(a); // ?
var a = 10;

hoistedFunction(); // ?

function hoistedFunction() {
  console.log("I am hoisted!");
}

/*
🧩 Output:
undefined
I am hoisted!

🧠 Explanation:
- Variable declarations using `var` are hoisted to the top but not their assignments (so `a` is undefined).
- Function declarations are fully hoisted — both definition and declaration.
*/
