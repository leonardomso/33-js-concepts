console.log('=== Example 1: Basic IIFE ===');
(function() {
  const privateVar = 'I am private';
  console.log('IIFE executed!');
  console.log(privateVar);
})();
console.log('privateVar is not accessible outside IIFE');

console.log('\n=== Example 2: IIFE with Parameters ===');
(function(name, age) {
  console.log(`Name: ${name}, Age: ${age}`);
})('Alice', 30);

console.log('\n=== Example 3: IIFE with Return Value ===');
const result = (function() {
  const a = 5;
  const b = 10;
  return a + b;
})();
console.log('Result:', result);

console.log('\n=== Example 4: Module Pattern ===');
const Calculator = (function() {
  let result = 0;
  
  function log(operation, value) {
    console.log(`${operation}: ${value}`);
  }
  
  return {
    add: function(num) {
      result += num;
      log('Add', num);
      return this;
    },
    subtract: function(num) {
      result -= num;
      log('Subtract', num);
      return this;
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
      log('Reset', 0);
      return this;
    }
  };
})();

Calculator.add(10).add(5).subtract(3);
console.log('Final result:', Calculator.getResult());

console.log('\n=== Example 5: Revealing Module Pattern ===');
const UserModule = (function() {
  let users = [];
  
  function validateUser(user) {
    return user && user.name && user.email;
  }
  
  function addUser(user) {
    if (validateUser(user)) {
      users.push(user);
      return true;
    }
    return false;
  }
  
  function getUsers() {
    return [...users];
  }
  
  function getUserCount() {
    return users.length;
  }
  
  return {
    add: addUser,
    getAll: getUsers,
    count: getUserCount
  };
})();

UserModule.add({ name: 'John', email: 'john@example.com' });
UserModule.add({ name: 'Jane', email: 'jane@example.com' });
console.log('Users:', UserModule.getAll());
console.log('Count:', UserModule.count());

console.log('\n=== Example 6: Namespace Pattern ===');
const MyApp = MyApp || {};

MyApp.utils = {
  formatDate: function(date) {
    return date.toISOString().split('T')[0];
  },
  capitalize: function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
};

MyApp.config = {
  apiUrl: 'https://api.example.com',
  timeout: 5000
};

console.log(MyApp.utils.capitalize('hello'));
console.log(MyApp.utils.formatDate(new Date()));
console.log(MyApp.config.apiUrl);

console.log('\n=== Example 7: ES6 Modules ===');



console.log('ES6 modules use import/export syntax');

console.log('\n=== Example 8: Singleton Pattern ===');
const DatabaseConnection = (function() {
  let instance;
  
  function createInstance() {
    return {
      connect: function() {
        console.log('Database connected');
      },
      query: function(sql) {
        console.log('Executing:', sql);
      }
    };
  }
  
  return {
    getInstance: function() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log('Same instance?', db1 === db2);

console.log('\n=== Example 9: Private Variables ===');
const Counter = (function() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count
  };
})();

console.log(Counter.increment());
console.log(Counter.increment());
console.log(Counter.value());

console.log('\n=== Example 10: Arrow Function IIFE ===');
(() => {
  console.log('Arrow function IIFE');
})();

const arrowResult = (x => x * 2)(5);
console.log('Arrow IIFE result:', arrowResult);

console.log('\n=== Example 11: Async IIFE ===');
(async function() {
  console.log('Async IIFE started');
  await new Promise(resolve => setTimeout(resolve, 100));
  console.log('Async IIFE completed');
})();

(async () => {
  console.log('Async arrow IIFE');
})();
