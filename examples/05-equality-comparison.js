console.log('=== Example 1: Strict Equality (===) ===');
console.log(5 === 5);
console.log(5 === '5');
console.log(true === 1);
console.log(null === undefined);
console.log(NaN === NaN);

console.log('\n=== Example 2: Loose Equality (==) ===');
console.log(5 == 5);
console.log(5 == '5');
console.log(true == 1);
console.log(false == 0);
console.log(null == undefined);
console.log('' == 0);
console.log(' ' == 0);

console.log('\n=== Example 3: typeof Operator ===');
console.log(typeof 42);
console.log(typeof 'hello');
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null);
console.log(typeof {});
console.log(typeof []);
console.log(typeof function() {});
console.log(typeof Symbol('sym'));
console.log(typeof 123n);

console.log('\n=== Example 4: Comparing Objects ===');
const obj1 = { a: 1 };
const obj2 = { a: 1 };
const obj3 = obj1;

console.log(obj1 === obj2);
console.log(obj1 === obj3);
console.log(obj1 == obj2);

console.log('\n=== Example 5: Comparing Arrays ===');
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const arr3 = arr1;

console.log(arr1 === arr2);
console.log(arr1 === arr3);
console.log(JSON.stringify(arr1) === JSON.stringify(arr2));

console.log('\n=== Example 6: Special Cases ===');
console.log(0 === -0);
console.log(Object.is(0, -0));
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));
console.log(Number.isNaN(NaN));

console.log('\n=== Example 7: Type Checking Best Practices ===');

function checkType(value) {
  if (value === null) {
    return 'null';
  }
  
  if (Array.isArray(value)) {
    return 'array';
  }
  
  if (typeof value === 'number' && isNaN(value)) {
    return 'NaN';
  }
  
  return typeof value;
}

console.log(checkType(null));
console.log(checkType([]));
console.log(checkType(NaN));
console.log(checkType(42));
console.log(checkType('hello'));

console.log('\n=== Example 8: Common Comparisons ===');
const comparisons = [
  ['5', 5, '5 == 5', 5 == '5', '5 === 5', 5 === '5'],
  ['0', false, '0 == false', 0 == false, '0 === false', 0 === false],
  ['""', 0, '"" == 0', '' == 0, '"" === 0', '' === 0],
  ['null', undefined, 'null == undefined', null == undefined, 'null === undefined', null === undefined],
  ['[]', false, '[] == false', [] == false, '[] === false', [] === false],
];

comparisons.forEach(([val1, val2, desc1, result1, desc2, result2]) => {
  console.log(`${desc1}: ${result1}, ${desc2}: ${result2}`);
});

console.log('\n=== Example 9: When to Use == vs === ===');

function strictCheck(value) {
  if (value === null || value === undefined) {
    return 'No value';
  }
  return value;
}

function looseCheck(value) {
  if (value == null) {
    return 'No value';
  }
  return value;
}

console.log(strictCheck(null));
console.log(strictCheck(undefined));
console.log(looseCheck(null));
console.log(looseCheck(undefined));
console.log(looseCheck(0));
