console.log('=== Example 1: Expressions ===');
5 + 3;
'Hello' + ' World';
true && false;
myFunction();

console.log(5 + 3);
console.log('Hello' + ' World');
console.log(2 > 1);

console.log('\n=== Example 2: Statements ===');
let x = 5;
if (x > 0) {
  console.log('Positive');
}
for (let i = 0; i < 3; i++) {
  console.log(i);
}

console.log('\n=== Example 3: Function Declaration ===');
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('Alice'));

console.log(hoistedFunction());
function hoistedFunction() {
  return 'I am hoisted';
}

console.log('\n=== Example 4: Function Expression ===');
const greetExpression = function(name) {
  return `Hi, ${name}!`;
};
console.log(greetExpression('Bob'));

console.log('Function expressions cannot be called before declaration');
const notHoisted = function() {
  return 'I am not hoisted';
};

console.log('\n=== Example 5: Arrow Function Expression ===');
const add = (a, b) => a + b;
const square = x => x * x;
const greetArrow = name => `Hey, ${name}!`;

console.log(add(5, 3));
console.log(square(4));
console.log(greetArrow('Charlie'));

console.log('\n=== Example 6: Expression Statements ===');
5 + 3;
console.log('Hello');
x = 10;

console.log('\n=== Example 7: Ternary Operator ===');
const age = 20;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status);

console.log(age >= 18 ? 'Can vote' : 'Cannot vote');
console.log('Note: if statements cannot be used in expression context');

console.log('\n=== Example 8: IIFE ===');
(function() {
  console.log('IIFE executed!');
})();

(() => {
  console.log('Arrow IIFE executed!');
})();

const result = (function() {
  return 'IIFE result';
})();
console.log(result);

console.log('\n=== Example 9: Object and Array Literals ===');
const person = { name: 'John', age: 30 };
const numbers = [1, 2, 3, 4, 5];

console.log({ x: 1, y: 2 });
console.log([10, 20, 30]);

console.log('\n=== Example 10: Named Function Expressions ===');
const factorial = function fact(n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
};
console.log(factorial(5));
console.log('Note: fact is only accessible inside the function');

console.log('\n=== Example 11: Statements vs Expressions ===');

const value1 = 5 + 3;

console.log('Statements cannot be assigned to variables');
console.log('Use ternary operator instead of if statement');

const value2 = true ? 5 : 0;
console.log(value2);

console.log('\n=== Example 12: Block Statement ===');
{
  const blockScoped = 'I am in a block';
  console.log(blockScoped);
}
console.log('blockScoped is not accessible outside the block');

console.log('\n=== Example 13: Return Statement ===');
function multiply(a, b) {
  return a * b;
}
console.log(multiply(4, 5));

const multiplyArrow = (a, b) => a * b;
console.log(multiplyArrow(4, 5));
