// ❓ Question: What is a closure? Explain with example.

function outer() {
  let counter = 0;
  return function inner() {
    counter++;
    console.log(counter);
  };
}

const fn = outer();
fn(); // 1
fn(); // 2
fn(); // 3

/*
🧩 Output:
1
2
3

🧠 Explanation:
- A closure is created when a function retains access to its parent scope even after that parent has finished executing.
- Here, `inner` remembers `counter` from `outer`.
*/
