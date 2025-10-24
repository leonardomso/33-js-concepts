// Example: this, call, apply and bind
const person = {
  name: 'Alice',
  greet() {
    return `Hello ${this.name}`;
  }
};

const greet = person.greet;
console.log('direct method:', person.greet()); // Hello Alice
console.log('extracted function (this lost):', greet()); // undefined or global
console.log('call ->', greet.call({ name: 'Bob' })); // Hello Bob
console.log('bind ->', greet.bind({ name: 'Carol' })()); // Hello Carol
