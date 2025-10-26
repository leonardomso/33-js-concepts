console.log('=== Example 1: Global Scope ===');
var globalVar = 'I am global';
let globalLet = 'I am also global';

function accessGlobal() {
  console.log(globalVar);
  console.log(globalLet);
}
accessGlobal();

console.log('\n=== Example 2: Function Scope ===');
function functionScope() {
  var functionVar = 'I am function scoped';
  let functionLet = 'I am also function scoped';
  console.log(functionVar);
  console.log(functionLet);
}
functionScope();
console.log('Variables inside function are not accessible outside');

console.log('\n=== Example 3: Block Scope ===');
if (true) {
  var varVariable = 'var is NOT block scoped';
  let letVariable = 'let IS block scoped';
  const constVariable = 'const IS block scoped';
}
console.log(varVariable);
console.log('let and const variables are not accessible outside the block');

console.log('\n=== Example 4: Block Scope in Loops ===');

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log('var i:', i), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log('let j:', j), 200);
}

console.log('\n=== Example 5: Lexical Scope ===');
function outer() {
  const outerVar = 'I am from outer';
  
  function inner() {
    const innerVar = 'I am from inner';
    console.log(outerVar);
    console.log(innerVar);
  }
  
  inner();
  console.log('Cannot access innerVar from outer function');
}
outer();

console.log('\n=== Example 6: Nested Lexical Scope ===');
const global = 'global';

function level1() {
  const level1Var = 'level1';
  
  function level2() {
    const level2Var = 'level2';
    
    function level3() {
      const level3Var = 'level3';
      console.log(global, level1Var, level2Var, level3Var);
    }
    
    level3();
  }
  
  level2();
}
level1();

console.log('\n=== Example 7: Scope Chain ===');
const name = 'Global';

function first() {
  const name = 'First';
  
  function second() {
    const name = 'Second';
    
    function third() {
      console.log(name);
    }
    
    third();
  }
  
  second();
}
first();

console.log('\n=== Example 8: Hoisting ===');
console.log(hoistedVar);
var hoistedVar = 'I am hoisted';
console.log(hoistedVar);

console.log('let/const cannot be accessed before initialization (TDZ)');
let notHoistedLet = 'I am not hoisted';

console.log('\n=== Example 9: Temporal Dead Zone ===');
{
  console.log('Cannot access variable before declaration');
  let tdz = 'TDZ ends here';
  console.log(tdz);
}

console.log('\n=== Example 10: IIFE for Scope ===');
(function() {
  var privateVar = 'I am private';
  console.log(privateVar);
})();
console.log('privateVar is not accessible outside IIFE');

console.log('\n=== Example 11: Closure and Scope ===');
function createCounter() {
  let count = 0;
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment());
console.log(counter.increment());
console.log(counter.getCount());
console.log('count variable is private and not accessible directly');
