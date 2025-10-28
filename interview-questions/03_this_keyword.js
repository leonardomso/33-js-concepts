// ❓ Question: What does `this` refer to in different contexts?

const obj = {
  name: "Alice",
  show: function () {
    console.log(this.name);
  },
};

obj.show(); // ?
const fn = obj.show;
fn(); // ?

/*
🧩 Output:
Alice
undefined

🧠 Explanation:
- Inside `obj.show()`, `this` refers to `obj`.
- When detached (`fn()`), `this` refers to the global object (or undefined in strict mode).
*/
