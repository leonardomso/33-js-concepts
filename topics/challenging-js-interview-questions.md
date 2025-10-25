## Challenging JavaScript Interview Questions (with solutions)

This topic collects often-asked, tricky JavaScript questions with short solutions and clear explanations. Each entry shows the code, expected output, and a brief explanation of why the result occurs.

---

### 1) Closures & loops (var vs let)
Code:

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0);
}
```

Expected output:

- First loop (var): 3, 3, 3
- Second loop (let): 0, 1, 2

Explanation:

- `var` is function-scoped; the same `i` is shared and after the loop finishes it's 3. The callbacks run later and see `i === 3`.
- `let` is block-scoped and creates a fresh binding per iteration, so each callback captures its own value.

Solution / tip:

- Use `let` for per-iteration bindings or create a closure: `((i) => setTimeout(() => console.log(i),0))(i)`.

---

### 2) Hoisting and temporal dead zone
Code:

```js
console.log(a);
var a = 1;

console.log(b);
let b = 2;
```

Expected output:

- `undefined` then a ReferenceError for `b` (access before initialization)

Explanation:

- `var` declarations are hoisted and initialized to `undefined` at top of their scope.
- `let`/`const` are hoisted but not initialized — they live in the Temporal Dead Zone (TDZ) until their declaration is evaluated, so accessing them before throws.

---

### 3) `this` in different contexts
Code:

```js
const obj = {
  x: 10,
  getX() { return this.x; }
};

const fn = obj.getX;
console.log(obj.getX()); // ?
console.log(fn());       // ?

const bound = fn.bind(obj);
console.log(bound());    // ?
```

Expected output:

- `10`
- `undefined` (or global/window.x in non-strict browsers)
- `10`

Explanation:

- Method call `obj.getX()` sets `this` to `obj`.
- `fn()` is a plain function call; `this` is `undefined` in strict mode or global object in sloppy mode.
- `bind` permanently sets `this` to the provided object.

Tip:

- Use arrow functions when you want lexical `this` (they don't rebind `this`). Use `bind`/`call`/`apply` to set `this` explicitly.

---

### 4) Event loop — microtasks vs macrotasks
Code:

```js
console.log('script start');

setTimeout(() => console.log('timeout'), 0);

Promise.resolve().then(() => console.log('promise'));

console.log('script end');
```

Expected output:

- script start
- script end
- promise
- timeout

Explanation:

- Synchronous code runs first.
- Microtasks (Promises `.then`) run after the current stack completes but before macrotasks (setTimeout callbacks).

Tip:

- Use microtasks for high-priority async follow-ups (Promises, queueMicrotask); macrotasks for lower priority scheduling.

---

### 5) Promise chaining and error propagation
Code:

```js
Promise.resolve(1)
  .then(x => x + 1)
  .then(x => { throw new Error('fail'); })
  .then(x => console.log('will not run', x))
  .catch(err => console.log('caught', err.message));
```

Expected output:

- caught fail

Explanation:

- An error thrown in a `.then` handler turns into a rejected promise and flows down the chain until a `.catch` (or second argument to `.then`) handles it.

Tip:

- Always return or throw explicitly inside `.then` handlers; use a final `.catch` for top-level handling.

---

### 6) Async/await and try/catch
Code:

```js
async function f() {
  try {
    const r = await Promise.reject('bad');
    console.log('won't run', r);
  } catch (e) {
    console.log('caught', e);
  }
}
f();
```

Expected output:

- caught bad

Explanation:

- `await` will reject if the awaited promise rejects. Use try/catch inside the async function to handle it.

Tip:

- Alternatively handle errors with `.catch` on the awaited promise or at the caller side by catching the returned promise.

---

### 7) Prototypes and property shadowing
Code:

```js
function A() { this.x = 1 }
A.prototype.x = 2;
const a = new A();
console.log(a.x); // ?
delete a.x;
console.log(a.x); // ?
```

Expected output:

- `1`
- `2`

Explanation:

- Instance property `x` shadows prototype `x`. Deleting the instance property reveals the prototype property.

Tip:

- Use prototypes for shared behavior, instance properties for per-object state.

---

### 8) Function currying and partial application
Code:

```js
function add(a) {
  return function(b) { return a + b; };
}
console.log(add(2)(3)); // ?
```

Expected output:

- `5`

Explanation:

- Currying transforms a function of multiple args into nested single-arg functions. Each inner function keeps the previous args in closure.

Tip:

- Useful for partial application and composing utilities.

---

### 9) `==` vs `===` and surprising coercions
Code:

```js
console.log(0 == '');    // ?
console.log(0 == '\n'); // ?
console.log([] == false);// ?
```

Expected output:

- true
- true
- true

Explanation:

- `==` performs type coercion with complex rules (ToPrimitive, ToNumber, etc.). `''` and `'\n'` coerce to 0 when compared to number 0. `[]` coerces to `''` then to 0 so `[] == false` is true.

Tip:

- Prefer `===` and avoid relying on `==` coercion rules in production code.

---

### 10) Immediately-invoked function expressions (IIFE) & module pattern
Code:

```js
const counter = (function () {
  let count = 0;
  return { inc: () => ++count, get: () => count };
})();

console.log(counter.get());
counter.inc();
console.log(counter.get());
```

Expected output:

- 0
- 1

Explanation:

- The IIFE creates a private scope. `count` is private and accessible only via returned methods — a simple module pattern.

---

### 11) `new` operator basics
Code:

```js
function Person(name) { this.name = name; }
Person.prototype.say = function() { return this.name; };
const p = Person('Sam');
console.log(typeof p, globalThis.name); // ?

const q = new Person('Amy');
console.log(q.name); // ?
```

Expected output (strict-mode dependent):

- `undefined` (or thrown) and `Sam` on the global object in non-strict mode
- `Amy`

Explanation:

- Calling a constructor without `new` executes the function as a normal call. `this` then refers to global object in sloppy mode (or `undefined` in strict mode) — bug-prone. `new` creates a fresh object and sets `this` to it.

Tip:

- Always use `new` with constructors or write factories that don't require `new`.

---

### 12) Short-circuit evaluation & default values
Code:

```js
function greet(name) {
  name = name || 'Guest';
  console.log('Hello', name);
}

greet('Alice');
greet(0);
```

Expected output:

- Hello Alice
- Hello Guest

Explanation:

- `||` treats falsy values (0, '', null, undefined, false) the same. If a valid falsy value like `0` is valid in your domain, using `??` (nullish coalescing) is safer: `name = name ?? 'Guest'`.

---

## Next steps / practice
- Turn several examples into runnable Node scripts or interactive HTML pages.
- Add unit tests for functions (where applicable) to lock expected behavior.
- Add more advanced topics: generators, WeakMap for private state, Symbol, proxies, and performance traps.

---

If you'd like, I can:
- add runnable examples under `examples/` and small tests,
- convert these to interactive snippets (HTML + playground), or
- generate flashcards from these Q/A pairs for practice.

Happy to proceed with any of those.
