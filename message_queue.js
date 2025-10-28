/*
📘 Concept: Message Queue (Task Queue or Callback Queue)
--------------------------------------------------------
The Message Queue, also known as the Task Queue or Callback Queue, works
in conjunction with the Event Loop to handle asynchronous operations in JavaScript.

When asynchronous operations like `setTimeout`, HTTP requests, or DOM events complete,
their callback functions are placed into the Message Queue.

The Event Loop continuously monitors both the Call Stack and the Message Queue.
When the Call Stack is empty, the Event Loop takes the first callback from the
Message Queue and pushes it onto the Call Stack for execution.

This mechanism ensures that JavaScript can handle asynchronous operations
without blocking the main thread, allowing the browser to remain responsive
to user interactions while waiting for time-consuming operations to complete.

Additionally, ES6 introduced the concept of *Microtasks* (Promise callbacks and
async/await operations), which have higher priority than regular tasks in the
Message Queue and are processed immediately after the current script finishes
executing but before any tasks from the Message Queue are handled.
*/

// 🧩 Example: Message Queue vs Microtask Queue

console.log("1️⃣ Start");

setTimeout(() => console.log("2️⃣ setTimeout callback (Message Queue)"), 0);

Promise.resolve().then(() => console.log("3️⃣ Promise callback (Microtask Queue)"));

console.log("4️⃣ End");

/*
Expected Output Order:
1️⃣ Start
4️⃣ End
3️⃣ Promise callback (Microtask Queue executes first)
2️⃣ setTimeout callback (Message Queue executes after)
*/

/*
🧠 Quiz:
1️⃣ What role does the Message Queue play in JavaScript's concurrency model?
2️⃣ When does the Event Loop move a callback from the Message Queue to the Call Stack?
3️⃣ Which executes first — Microtasks or tasks in the Message Queue?

💻 Exercise:
1️⃣ Create a script that includes:
   - Two setTimeout callbacks
   - Two Promise callbacks
   - A synchronous log

   Try to predict and then verify the exact execution order.

2️⃣ Use `queueMicrotask()` to manually add a microtask.
   Compare its execution timing with `setTimeout()`.
*/
