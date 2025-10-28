// ❓ Question: What is the order of output?

console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

/*
🧩 Output:
Start
End
Promise
Timeout

🧠 Explanation:
- JS executes synchronous code first.
- Then, microtasks (Promises).
- Finally, macrotasks (setTimeout).
*/
