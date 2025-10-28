// ❓ Question: Predict the output of chained Promises

Promise.resolve()
  .then(() => {
    console.log("1");
    return "2";
  })
  .then((data) => {
    console.log(data);
    throw new Error("Something went wrong");
  })
  .catch(() => console.log("3"))
  .then(() => console.log("4"));

/*
🧩 Output:
1
2
3
4

🧠 Explanation:
- `.catch()` handles the error and then continues with the next `.then()`.
*/
