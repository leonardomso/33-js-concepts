// ❓ Question: What is destructuring and how does it work?

const user = { name: "Bob", age: 25, city: "Delhi" };

const { name, age } = user;
console.log(name, age);

const arr = [10, 20, 30];
const [x, , y] = arr;
console.log(x, y);

/*
🧩 Output:
Bob 25
10 30

🧠 Explanation:
Destructuring allows unpacking properties or array items into variables easily.
*/
