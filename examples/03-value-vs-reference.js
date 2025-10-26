console.log('=== Example 1: Value Types ===');
let a = 10;
let b = a;
b = 20;
console.log('a:', a);
console.log('b:', b);

console.log('\n=== Example 2: Reference Types ===');
let obj1 = { name: 'John', age: 30 };
let obj2 = obj1;
obj2.age = 31;
console.log('obj1.age:', obj1.age);
console.log('obj2.age:', obj2.age);

console.log('\n=== Example 3: Arrays ===');
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log('arr1:', arr1);
console.log('arr2:', arr2);

console.log('\n=== Example 4: Comparing References ===');
let person1 = { name: 'Alice' };
let person2 = { name: 'Alice' };
let person3 = person1;

console.log(person1 === person2);
console.log(person1 === person3);

console.log('\n=== Example 5: Function Parameters ===');

function changePrimitive(num) {
  num = 100;
  console.log('Inside function:', num);
}

function changeObject(obj) {
  obj.name = 'Changed';
  console.log('Inside function:', obj.name);
}

let number = 50;
changePrimitive(number);
console.log('Outside function:', number);

let person = { name: 'Original' };
changeObject(person);
console.log('Outside function:', person.name);

console.log('\n=== Example 6: Reassignment vs Mutation ===');

function reassignObject(obj) {
  obj = { name: 'New Object' };
  console.log('Inside (reassigned):', obj.name);
}

let original = { name: 'Original' };
reassignObject(original);
console.log('Outside:', original.name);

console.log('\n=== Example 7: Creating True Copies ===');

let original1 = { name: 'John', age: 30 };
let copy1 = { ...original1 };
let copy2 = Object.assign({}, original1);

copy1.age = 31;
console.log('original1.age:', original1.age);
console.log('copy1.age:', copy1.age);

let nested = { name: 'John', address: { city: 'NYC' } };
let shallowCopy = { ...nested };
let deepCopy = JSON.parse(JSON.stringify(nested));

shallowCopy.address.city = 'LA';
console.log('nested.address.city:', nested.address.city);

deepCopy.address.city = 'Chicago';
console.log('nested.address.city:', nested.address.city);

console.log('\n=== Example 8: Const with Reference Types ===');

const constPrimitive = 10;
console.log('constPrimitive cannot be reassigned');

const constObject = { value: 10 };
constObject.value = 20;
console.log('constObject.value:', constObject.value);
console.log('constObject cannot be reassigned, but properties can be mutated');
