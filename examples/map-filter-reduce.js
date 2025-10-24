// Example: map, filter and reduce
const arr = [1, 2, 3, 4, 5];

const squares = arr.map(n => n * n);
const evens = arr.filter(n => n % 2 === 0);
const sum = arr.reduce((acc, n) => acc + n, 0);

console.log('map -> squares:', squares); // [1,4,9,16,25]
console.log('filter -> evens:', evens); // [2,4]
console.log('reduce -> sum:', sum); // 15
