// Example: Closures — a function that remembers its lexical scope
function makeCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = makeCounter();
console.log('closure:', counter()); // 1
console.log('closure:', counter()); // 2
