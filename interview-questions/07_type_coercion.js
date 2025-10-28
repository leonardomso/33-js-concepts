// ❓ Question: What will be the output?

console.log(1 + "2" + "2");
console.log(1 + +"2" + "2");
console.log(1 + -"1" + "2");
console.log(+"1" + "1" + "2");
console.log("A" - "B" + "2");
console.log("A" - "B" + 2);

/*
🧩 Output:
122
32
02
112
NaN2
NaN

🧠 Explanation:
- JS automatically converts types in expressions.
- `"A" - "B"` gives NaN because strings can't be subtracted.
*/
