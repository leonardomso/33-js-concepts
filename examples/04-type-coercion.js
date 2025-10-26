console.log('=== Example 1: Implicit Coercion ===');
console.log('5' + 3);
console.log('5' - 3);
console.log('5' * '2');
console.log(true + 1);
console.log(false + 1);
console.log('hello' - 1);

console.log('\n=== Example 2: Explicit Coercion ===');
console.log(Number('123'));
console.log(String(123));
console.log(Boolean(1));
console.log(Boolean(0));
console.log(parseInt('123.45'));
console.log(parseFloat('123.45'));

console.log('\n=== Example 3: Truthy and Falsy ===');
console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(''));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));

console.log(Boolean('0'));
console.log(Boolean([]));
console.log(Boolean({}));
console.log(Boolean('false'));

console.log('\n=== Example 4: Comparison Coercion ===');
console.log(5 == '5');
console.log(5 === '5');
console.log(null == undefined);
console.log(null === undefined);
console.log(0 == false);
console.log(0 === false);

console.log('\n=== Example 5: Duck Typing ===');

function makeItQuack(duck) {
  if (typeof duck.quack === 'function') {
    duck.quack();
  }
}

const realDuck = {
  quack: () => console.log('Quack!')
};

const fakeDuck = {
  quack: () => console.log('I can quack too!')
};

makeItQuack(realDuck);
makeItQuack(fakeDuck);

console.log('\n=== Example 6: Structural Typing ===');

function greet(person) {
  console.log(`Hello, ${person.name}!`);
}

const user = { name: 'Alice', age: 30 };
const animal = { name: 'Buddy', species: 'Dog' };

greet(user);
greet(animal);

console.log('\n=== Example 7: Type Checking ===');

function processValue(value) {
  if (typeof value === 'string') {
    console.log('String:', value.toUpperCase());
  } else if (typeof value === 'number') {
    console.log('Number:', value * 2);
  } else if (Array.isArray(value)) {
    console.log('Array:', value.length);
  } else if (value === null) {
    console.log('Null value');
  } else if (typeof value === 'object') {
    console.log('Object:', Object.keys(value));
  }
}

processValue('hello');
processValue(42);
processValue([1, 2, 3]);
processValue(null);
processValue({ key: 'value' });

console.log('\n=== Example 8: Coercion Gotchas ===');
console.log([] + []);
console.log([] + {});
console.log({} + []);
console.log(true + true + true);
console.log(true - true);
console.log('5' + + '5');
console.log('5' - - '5');

console.log('\n=== Example 9: Safe Type Conversion ===');

function toNumber(value) {
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

function toString(value) {
  return value == null ? '' : String(value);
}

console.log(toNumber('123'));
console.log(toNumber('abc'));
console.log(toString(null));
console.log(toString(123));
