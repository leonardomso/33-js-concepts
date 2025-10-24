// Example: Primitive vs Reference types
// Primitives are copied by value
let a = 1;
let b = a;
b = 2;
console.log('primitives:', { a, b }); // a stays 1, b is 2

// Objects are copied by reference
const obj1 = { x: 1 };
const obj2 = obj1;
obj2.x = 2;
console.log('references:', { obj1, obj2 }); // both reflect the change
