console.log('=== Example 1: String ===');
const str1 = 'Hello World';
const str2 = "JavaScript";
const str3 = `Template literal: ${str1}`;
console.log(typeof str1);
console.log(str3);

console.log('\n=== Example 2: Number ===');
console.log('\n=== Example 2: Number ===');
const integer = 42;
const float = 3.14;
const negative = -10;
const infinity = Infinity;
const notANumber = NaN;
console.log(typeof integer);
console.log(typeof NaN);
console.log(Number.MAX_SAFE_INTEGER);

console.log('\n=== Example 3: BigInt ===');
console.log('\n=== Example 3: BigInt ===');
const bigInt1 = 9007199254740991n;
const bigInt2 = BigInt(9007199254740991);
console.log(typeof bigInt1);
console.log(bigInt1 + 1n);
console.log('Note: Cannot mix BigInt and other types in operations');

console.log('\n=== Example 4: Boolean ===');
console.log('\n=== Example 4: Boolean ===');
const isTrue = true;
const isFalse = false;
console.log(typeof isTrue);
console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean('text'));

console.log('\n=== Example 5: Undefined ===');
console.log('\n=== Example 5: Undefined ===');
let undefinedVar;
console.log(typeof undefinedVar);
console.log(undefinedVar === undefined);

function noReturn() {}
console.log(noReturn());

console.log('\n=== Example 6: Symbol ===');
console.log('\n=== Example 6: Symbol ===');
const sym1 = Symbol('description');
const sym2 = Symbol('description');
console.log(typeof sym1);
console.log(sym1 === sym2);
console.log(sym1.description);

console.log('\n=== Example 7: Null ===');
console.log('\n=== Example 7: Null ===');
const nullVar = null;
console.log(typeof nullVar);
console.log(nullVar === null);
console.log(null == undefined);
console.log(null === undefined);

console.log('\n=== Example 8: Immutability ===');
console.log('\n=== Example 8: Immutability ===');
let str = 'hello';
str[0] = 'H';
console.log(str);

str = str.toUpperCase();
console.log(str);

console.log('\n=== Example 9: Primitive vs Object Wrapper ===');
console.log('\n=== Example 9: Primitive vs Object Wrapper ===');
const primitive = 'hello';
const object = new String('hello');
console.log(typeof primitive);
console.log(typeof object);
console.log(primitive === object);
console.log(primitive == object);

console.log('hello'.toUpperCase());
