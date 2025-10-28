// ❓ Question: What happens to variable scope?

function test() {
  var a = 10;
  if (true) {
    let b = 20;
    var c = 30;
  }
  console.log(a); // ?
  // console.log(b); // ?
  console.log(c); // ?
}
test();

/*
🧩 Output:
10
30
Error if b is logged

🧠 Explanation:
- `var` is function-scoped.
- `let` and `const` are block-scoped.
*/
