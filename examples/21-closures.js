console.log('=== Example 1: Basic Closure ===');
function outerFunction() {
  const outerVariable = 'I am from outer scope';
  
  function innerFunction() {
    console.log(outerVariable);
  }
  
  return innerFunction;
}

const closure = outerFunction();
closure();

console.log('\n=== Example 2: Private Variables ===');
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

console.log('\n=== Example 3: Function Factory ===');
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5));
console.log(triple(5));

console.log('\n=== Example 4: Closure in Loops ===');

for (var i = 1; i <= 3; i++) {
  setTimeout(function() {
    console.log('var i:', i);
  }, i * 100);
}

for (let j = 1; j <= 3; j++) {
  setTimeout(function() {
    console.log('let j:', j);
  }, j * 100 + 500);
}

for (var k = 1; k <= 3; k++) {
  (function(num) {
    setTimeout(function() {
      console.log('IIFE k:', num);
    }, num * 100 + 1000);
  })(k);
}

console.log('\n=== Example 5: Data Privacy ===');
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        return `Deposited: $${amount}. New balance: $${balance}`;
      }
      return 'Invalid amount';
    },
    withdraw: function(amount) {
      if (amount > 0 && amount <= balance) {
        balance -= amount;
        return `Withdrawn: $${amount}. New balance: $${balance}`;
      }
      return 'Invalid amount or insufficient funds';
    },
    getBalance: function() {
      return `Current balance: $${balance}`;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50));
console.log(account.withdraw(30));
console.log(account.getBalance());

console.log('\n=== Example 6: Memoization ===');
function memoize(fn) {
  const cache = {};
  
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      console.log('Returning cached result');
      return cache[key];
    }
    console.log('Computing result');
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveOperation = memoize((n) => {
  return n * n;
});

console.log(expensiveOperation(5));
console.log(expensiveOperation(5));
console.log(expensiveOperation(10));

console.log('\n=== Example 7: Event Handlers ===');
function createButton(label) {
  let clickCount = 0;
  
  return {
    click: function() {
      clickCount++;
      console.log(`${label} clicked ${clickCount} times`);
    },
    getClickCount: function() {
      return clickCount;
    }
  };
}

const button1 = createButton('Button 1');
const button2 = createButton('Button 2');

button1.click();
button1.click();
button2.click();
console.log('Button 1 clicks:', button1.getClickCount());
console.log('Button 2 clicks:', button2.getClickCount());

console.log('\n=== Example 8: Partial Application ===');
function partial(fn, ...fixedArgs) {
  return function(...remainingArgs) {
    return fn(...fixedArgs, ...remainingArgs);
  };
}

function greet(greeting, name) {
  return `${greeting}, ${name}!`;
}

const sayHello = partial(greet, 'Hello');
const sayHi = partial(greet, 'Hi');

console.log(sayHello('Alice'));
console.log(sayHi('Bob'));

console.log('\n=== Example 9: Module Pattern ===');
const TodoModule = (function() {
  let todos = [];
  let nextId = 1;
  
  function add(text) {
    const todo = { id: nextId++, text, completed: false };
    todos.push(todo);
    return todo;
  }
  
  function remove(id) {
    todos = todos.filter(todo => todo.id !== id);
  }
  
  function getAll() {
    return [...todos];
  }
  
  return { add, remove, getAll };
})();

TodoModule.add('Learn closures');
TodoModule.add('Practice JavaScript');
console.log(TodoModule.getAll());

console.log('\n=== Example 10: Closure Scope Chain ===');
const globalVar = 'global';

function outer() {
  const outerVar = 'outer';
  
  function middle() {
    const middleVar = 'middle';
    
    function inner() {
      const innerVar = 'inner';
      console.log(globalVar, outerVar, middleVar, innerVar);
    }
    
    return inner;
  }
  
  return middle();
}

const closureChain = outer();
closureChain();
