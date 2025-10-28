// ❓ Question: Explain async/await behavior.

async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}
test();
console.log("3");

/*
🧩 Output:
1
3
2

🧠 Explanation:
- `await` pauses only the async function, not the whole script.
- The rest of the code (`console.log("3")`) runs first.
*/
