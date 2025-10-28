// ❓ Question: Why does object comparison return false?

const a = { x: 1 };
const b = { x: 1 };

console.log(a == b);  // ?
console.log(a === b); // ?

/*
🧩 Output:
false
false

🧠 Explanation:
Objects are compared by reference, not by value.
Each `{ x: 1 }` creates a new object at a different memory address.
*/
