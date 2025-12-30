import { describe, it, expect } from 'vitest'

describe('this, call, apply and bind', () => {
  
  describe('The 5 Binding Rules', () => {
    
    describe('Rule 1: new Binding', () => {
      it('should bind this to new object with constructor function', () => {
        function Person(name) {
          this.name = name
        }
        
        const alice = new Person('Alice')
        expect(alice.name).toBe('Alice')
      })
      
      it('should bind this to new object with ES6 class', () => {
        class Person {
          constructor(name) {
            this.name = name
          }
        }
        
        const bob = new Person('Bob')
        expect(bob.name).toBe('Bob')
      })
      
      it('should create separate instances with their own this', () => {
        class Counter {
          constructor() {
            this.count = 0
          }
          increment() {
            this.count++
          }
        }
        
        const counter1 = new Counter()
        const counter2 = new Counter()
        
        counter1.increment()
        counter1.increment()
        counter2.increment()
        
        expect(counter1.count).toBe(2)
        expect(counter2.count).toBe(1)
      })
      
      it('should allow this to reference instance methods', () => {
        class Calculator {
          constructor(value) {
            this.value = value
          }
          add(n) {
            this.value += n
            return this
          }
          multiply(n) {
            this.value *= n
            return this
          }
        }
        
        const calc = new Calculator(5)
        calc.add(3).multiply(2)
        
        expect(calc.value).toBe(16)
      })
      
      it('should return the new object unless function returns an object', () => {
        function ReturnsNothing(name) {
          this.name = name
        }
        
        function ReturnsObject(name) {
          this.name = name
          return { customName: 'Custom' }
        }
        
        function ReturnsPrimitive(name) {
          this.name = name
          return 42  // Primitive return is ignored
        }
        
        const obj1 = new ReturnsNothing('Alice')
        const obj2 = new ReturnsObject('Bob')
        const obj3 = new ReturnsPrimitive('Charlie')
        
        expect(obj1.name).toBe('Alice')
        expect(obj2.customName).toBe('Custom')
        expect(obj2.name).toBeUndefined()
        expect(obj3.name).toBe('Charlie')  // Primitive ignored
      })
      
      it('should set up prototype chain correctly', () => {
        class Animal {
          speak() {
            return 'Some sound'
          }
        }
        
        class Dog extends Animal {
          speak() {
            return 'Woof!'
          }
        }
        
        const dog = new Dog()
        expect(dog.speak()).toBe('Woof!')
        expect(dog instanceof Dog).toBe(true)
        expect(dog instanceof Animal).toBe(true)
      })
      
      it('should have new binding override explicit binding', () => {
        function Person(name) {
          this.name = name
        }
        
        const boundPerson = Person.bind({ name: 'Bound' })
        const alice = new boundPerson('Alice')
        
        // new overrides bind
        expect(alice.name).toBe('Alice')
      })
    })
    
    describe('Rule 2: Explicit Binding (call/apply/bind)', () => {
      it('should set this with call()', () => {
        function greet() {
          return `Hello, ${this.name}`
        }
        
        const alice = { name: 'Alice' }
        expect(greet.call(alice)).toBe('Hello, Alice')
      })
      
      it('should set this with apply()', () => {
        function greet() {
          return `Hello, ${this.name}`
        }
        
        const bob = { name: 'Bob' }
        expect(greet.apply(bob)).toBe('Hello, Bob')
      })
      
      it('should set this with bind()', () => {
        function greet() {
          return `Hello, ${this.name}`
        }
        
        const charlie = { name: 'Charlie' }
        const boundGreet = greet.bind(charlie)
        expect(boundGreet()).toBe('Hello, Charlie')
      })
      
      it('should have explicit binding override implicit binding', () => {
        const alice = {
          name: 'Alice',
          greet() {
            return `Hi, I'm ${this.name}`
          }
        }
        
        const bob = { name: 'Bob' }
        
        // Even though called on alice, we force this to be bob
        expect(alice.greet.call(bob)).toBe("Hi, I'm Bob")
      })
      
      it('should handle null/undefined thisArg in strict mode', () => {
        function getThis() {
          return this
        }
        
        // In strict mode with null/undefined, this remains null/undefined
        expect(getThis.call(null)).toBe(null)
        expect(getThis.call(undefined)).toBe(undefined)
      })
    })
    
    describe('Rule 3: Implicit Binding (Method Call)', () => {
      it('should bind this to the object before the dot', () => {
        const user = {
          name: 'Alice',
          getName() {
            return this.name
          }
        }
        
        expect(user.getName()).toBe('Alice')
      })
      
      it('should use the immediate object for nested objects', () => {
        const company = {
          name: 'TechCorp',
          department: {
            name: 'Engineering',
            getName() {
              return this.name
            }
          }
        }
        
        // this is department, not company
        expect(company.department.getName()).toBe('Engineering')
      })
      
      it('should allow method chaining with this', () => {
        const calculator = {
          value: 0,
          add(n) {
            this.value += n
            return this
          },
          subtract(n) {
            this.value -= n
            return this
          },
          getResult() {
            return this.value
          }
        }
        
        const result = calculator.add(10).subtract(3).add(5).getResult()
        expect(result).toBe(12)
      })
      
      it('should lose implicit binding when method is extracted', () => {
        const user = {
          name: 'Alice',
          getName() {
            return this?.name
          }
        }
        
        const getName = user.getName
        // Lost binding - this is undefined in strict mode
        expect(getName()).toBeUndefined()
      })
      
      it('should lose implicit binding in callbacks', () => {
        const user = {
          name: 'Alice',
          getName() {
            return this?.name
          }
        }
        
        function executeCallback(callback) {
          return callback()
        }
        
        // Passing method as callback loses binding
        expect(executeCallback(user.getName)).toBeUndefined()
      })
      
      it('should work with computed property access', () => {
        const obj = {
          name: 'Object',
          method() {
            return this.name
          }
        }
        
        const methodName = 'method'
        expect(obj[methodName]()).toBe('Object')
      })
    })
    
    describe('Rule 4: Default Binding', () => {
      it('should have undefined this in strict mode for plain function calls', () => {
        function getThis() {
          return this
        }
        
        // Vitest runs in strict mode
        expect(getThis()).toBeUndefined()
      })
      
      it('should have undefined this in IIFE in strict mode', () => {
        const result = (function() {
          return this
        })()
        
        expect(result).toBeUndefined()
      })
      
      it('should have undefined this in nested function calls', () => {
        const obj = {
          name: 'Object',
          method() {
            function inner() {
              return this
            }
            return inner()
          }
        }
        
        // Inner function uses default binding
        expect(obj.method()).toBeUndefined()
      })
    })
    
    describe('Rule 5: Arrow Functions (Lexical this)', () => {
      it('should inherit this from enclosing scope', () => {
        const obj = {
          name: 'Object',
          method() {
            const arrow = () => this.name
            return arrow()
          }
        }
        
        expect(obj.method()).toBe('Object')
      })
      
      it('should not change this with call/apply/bind on arrow functions', () => {
        const obj = {
          name: 'Original',
          getArrow() {
            return () => this.name
          }
        }
        
        const arrow = obj.getArrow()
        const other = { name: 'Other' }
        
        // Arrow function ignores explicit binding
        expect(arrow()).toBe('Original')
        expect(arrow.call(other)).toBe('Original')
        expect(arrow.apply(other)).toBe('Original')
        expect(arrow.bind(other)()).toBe('Original')
      })
      
      it('should preserve this in callbacks with arrow functions', () => {
        class Counter {
          constructor() {
            this.count = 0
          }
          
          incrementWithArrow() {
            [1, 2, 3].forEach(() => {
              this.count++
            })
          }
        }
        
        const counter = new Counter()
        counter.incrementWithArrow()
        
        expect(counter.count).toBe(3)
      })
      
      it('should work with arrow function class fields', () => {
        class Button {
          constructor(label) {
            this.label = label
          }
          
          // Arrow function as class field
          handleClick = () => {
            return `Clicked: ${this.label}`
          }
        }
        
        const btn = new Button('Submit')
        const handler = btn.handleClick  // Extract method
        
        // Still works because arrow binds lexically
        expect(handler()).toBe('Clicked: Submit')
      })
      
      it('should not have arrow functions work as object methods', () => {
        const user = {
          name: 'Alice',
          // Arrow function as method - BAD!
          greet: () => {
            return this?.name
          }
        }
        
        // this is not user, it's the enclosing scope (undefined in strict mode)
        expect(user.greet()).toBeUndefined()
      })
      
      it('should capture this at definition time, not call time', () => {
        function createArrow() {
          return () => this
        }
        
        const obj1 = { name: 'obj1' }
        const obj2 = { name: 'obj2' }
        
        // Arrow is created with obj1 as this
        const arrow = createArrow.call(obj1)
        
        // Calling with obj2 doesn't change anything
        expect(arrow.call(obj2)).toBe(obj1)
      })
    })
  })
  
  describe('call() Method', () => {
    it('should invoke function immediately with specified this', () => {
      function greet() {
        return `Hello, ${this.name}`
      }
      
      expect(greet.call({ name: 'World' })).toBe('Hello, World')
    })
    
    it('should pass arguments individually', () => {
      function introduce(greeting, punctuation) {
        return `${greeting}, I'm ${this.name}${punctuation}`
      }
      
      const alice = { name: 'Alice' }
      expect(introduce.call(alice, 'Hi', '!')).toBe("Hi, I'm Alice!")
    })
    
    it('should allow method borrowing', () => {
      const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
      
      const result = Array.prototype.slice.call(arrayLike)
      expect(result).toEqual(['a', 'b', 'c'])
    })
    
    it('should allow borrowing join method', () => {
      const arrayLike = { 0: 'a', 1: 'b', 2: 'c', length: 3 }
      
      const result = Array.prototype.join.call(arrayLike, '-')
      expect(result).toBe('a-b-c')
    })
    
    it('should work with prototype methods', () => {
      const obj = {
        0: 1,
        1: 2,
        2: 3,
        length: 3
      }
      
      const sum = Array.prototype.reduce.call(obj, (acc, val) => acc + val, 0)
      expect(sum).toBe(6)
    })
    
    it('should allow calling parent class methods', () => {
      class Animal {
        speak() {
          return `${this.name} makes a sound`
        }
      }
      
      class Dog extends Animal {
        constructor(name) {
          super()
          this.name = name
        }
        speak() {
          const parentSays = Animal.prototype.speak.call(this)
          return `${parentSays}. Woof!`
        }
      }
      
      const dog = new Dog('Rex')
      expect(dog.speak()).toBe('Rex makes a sound. Woof!')
    })
    
    it('should work with no arguments after thisArg', () => {
      function getThisName() {
        return this.name
      }
      
      expect(getThisName.call({ name: 'Test' })).toBe('Test')
    })
    
    it('should keep primitives as-is in strict mode when passed as thisArg', () => {
      function getThis() {
        return this
      }
      
      // In strict mode, primitives are NOT converted to wrapper objects
      const result = getThis.call(42)
      expect(result).toBe(42)
      expect(typeof result).toBe('number')
    })
  })
  
  describe('apply() Method', () => {
    it('should invoke function immediately with specified this', () => {
      function greet() {
        return `Hello, ${this.name}`
      }
      
      expect(greet.apply({ name: 'World' })).toBe('Hello, World')
    })
    
    it('should pass arguments as an array', () => {
      function introduce(greeting, punctuation) {
        return `${greeting}, I'm ${this.name}${punctuation}`
      }
      
      const bob = { name: 'Bob' }
      expect(introduce.apply(bob, ['Hey', '?'])).toBe("Hey, I'm Bob?")
    })
    
    it('should work with Math.max', () => {
      const numbers = [5, 2, 9, 1, 7]
      
      const max = Math.max.apply(null, numbers)
      expect(max).toBe(9)
    })
    
    it('should work with Math.min', () => {
      const numbers = [5, 2, 9, 1, 7]
      
      const min = Math.min.apply(null, numbers)
      expect(min).toBe(1)
    })
    
    it('should work with array-like arguments', () => {
      function sum() {
        return Array.prototype.reduce.call(arguments, (acc, n) => acc + n, 0)
      }
      
      const numbers = [1, 2, 3, 4, 5]
      expect(sum.apply(null, numbers)).toBe(15)
    })
    
    it('should work with empty array', () => {
      function returnArgs() {
        return Array.prototype.slice.call(arguments)
      }
      
      expect(returnArgs.apply(null, [])).toEqual([])
    })
    
    it('should work with null/undefined args array', () => {
      function noArgs() {
        return 'called'
      }
      
      expect(noArgs.apply(null, null)).toBe('called')
      expect(noArgs.apply(null, undefined)).toBe('called')
    })
    
    it('should allow combining arrays with concat-like behavior', () => {
      const arr1 = [1, 2, 3]
      const arr2 = [4, 5, 6]
      
      Array.prototype.push.apply(arr1, arr2)
      expect(arr1).toEqual([1, 2, 3, 4, 5, 6])
    })
  })
  
  describe('bind() Method', () => {
    it('should return a new function', () => {
      function greet() {
        return `Hello, ${this.name}`
      }
      
      const alice = { name: 'Alice' }
      const boundGreet = greet.bind(alice)
      
      expect(typeof boundGreet).toBe('function')
      expect(boundGreet).not.toBe(greet)
    })
    
    it('should not invoke the function immediately', () => {
      let called = false
      function setFlag() {
        called = true
      }
      
      const bound = setFlag.bind({})
      expect(called).toBe(false)
      
      bound()
      expect(called).toBe(true)
    })
    
    it('should permanently bind this', () => {
      function getName() {
        return this.name
      }
      
      const alice = { name: 'Alice' }
      const bob = { name: 'Bob' }
      
      const boundToAlice = getName.bind(alice)
      
      expect(boundToAlice()).toBe('Alice')
      expect(boundToAlice.call(bob)).toBe('Alice')  // call ignored
      expect(boundToAlice.apply(bob)).toBe('Alice') // apply ignored
    })
    
    it('should not allow rebinding with another bind', () => {
      function getName() {
        return this.name
      }
      
      const alice = { name: 'Alice' }
      const bob = { name: 'Bob' }
      
      const boundToAlice = getName.bind(alice)
      const triedRebind = boundToAlice.bind(bob)
      
      expect(triedRebind()).toBe('Alice')  // Still Alice!
    })
    
    it('should support partial application', () => {
      function multiply(a, b) {
        return a * b
      }
      
      const double = multiply.bind(null, 2)
      const triple = multiply.bind(null, 3)
      
      expect(double(5)).toBe(10)
      expect(triple(5)).toBe(15)
    })
    
    it('should support partial application with multiple arguments', () => {
      function greet(greeting, punctuation, name) {
        return `${greeting}, ${name}${punctuation}`
      }
      
      const sayHello = greet.bind(null, 'Hello', '!')
      
      expect(sayHello('Alice')).toBe('Hello, Alice!')
      expect(sayHello('Bob')).toBe('Hello, Bob!')
    })
    
    it('should work with event handler pattern', () => {
      class Button {
        constructor(label) {
          this.label = label
          this.handleClick = this.handleClick.bind(this)
        }
        
        handleClick() {
          return `${this.label} clicked`
        }
      }
      
      const btn = new Button('Submit')
      const handler = btn.handleClick
      
      expect(handler()).toBe('Submit clicked')
    })
    
    it('should work with setTimeout pattern', () => {
      class Delayed {
        constructor(message) {
          this.message = message
        }
        
        getMessage() {
          return this.message
        }
      }
      
      const delayed = new Delayed('Hello')
      const boundGetMessage = delayed.getMessage.bind(delayed)
      
      // Simulating what setTimeout would do
      const callback = boundGetMessage
      expect(callback()).toBe('Hello')
    })
    
    it('should preserve the length property minus bound args', () => {
      function fn(a, b, c) {
        return a + b + c
      }
      
      const bound0 = fn.bind(null)
      const bound1 = fn.bind(null, 1)
      const bound2 = fn.bind(null, 1, 2)
      
      expect(fn.length).toBe(3)
      expect(bound0.length).toBe(3)
      expect(bound1.length).toBe(2)
      expect(bound2.length).toBe(1)
    })
    
    it('should work with new even when bound', () => {
      function Person(name) {
        this.name = name
      }
      
      const BoundPerson = Person.bind({ name: 'Ignored' })
      const alice = new BoundPerson('Alice')
      
      // new overrides the bound this
      expect(alice.name).toBe('Alice')
    })
  })
  
  describe('Common Patterns', () => {
    describe('Method Borrowing', () => {
      it('should borrow array methods for array-like objects', () => {
        const arrayLike = {
          0: 'first',
          1: 'second',
          2: 'third',
          length: 3
        }
        
        const mapped = Array.prototype.map.call(arrayLike, item => item.toUpperCase())
        expect(mapped).toEqual(['FIRST', 'SECOND', 'THIRD'])
      })
      
      it('should borrow methods between similar objects', () => {
        const logger = {
          prefix: '[LOG]',
          log(message) {
            return `${this.prefix} ${message}`
          }
        }
        
        const errorLogger = {
          prefix: '[ERROR]'
        }
        
        expect(logger.log.call(errorLogger, 'Something failed')).toBe('[ERROR] Something failed')
      })
      
      it('should use hasOwnProperty safely', () => {
        const obj = Object.create(null)  // No prototype
        obj.name = 'test'
        
        // obj.hasOwnProperty would fail, but we can borrow it
        const hasOwn = Object.prototype.hasOwnProperty.call(obj, 'name')
        expect(hasOwn).toBe(true)
      })
    })
    
    describe('Partial Application', () => {
      it('should create specialized functions', () => {
        function log(level, timestamp, message) {
          return `[${level}] ${timestamp}: ${message}`
        }
        
        const logError = log.bind(null, 'ERROR')
        const logInfo = log.bind(null, 'INFO')
        
        expect(logError('2024-01-15', 'Failed')).toBe('[ERROR] 2024-01-15: Failed')
        expect(logInfo('2024-01-15', 'Started')).toBe('[INFO] 2024-01-15: Started')
      })
      
      it('should allow creating multiplier functions', () => {
        function multiply(a, b) {
          return a * b
        }
        
        const double = multiply.bind(null, 2)
        const triple = multiply.bind(null, 3)
        const quadruple = multiply.bind(null, 4)
        
        expect(double(10)).toBe(20)
        expect(triple(10)).toBe(30)
        expect(quadruple(10)).toBe(40)
      })
      
      it('should work with more complex functions', () => {
        function createUrl(protocol, domain, path) {
          return `${protocol}://${domain}${path}`
        }
        
        const httpUrl = createUrl.bind(null, 'https')
        const apiUrl = httpUrl.bind(null, 'api.example.com')
        
        expect(apiUrl('/users')).toBe('https://api.example.com/users')
        expect(apiUrl('/posts')).toBe('https://api.example.com/posts')
      })
    })
    
    describe('Preserving Context in Classes', () => {
      it('should preserve context with bind in constructor', () => {
        class Timer {
          constructor() {
            this.seconds = 0
            this.tick = this.tick.bind(this)
          }
          
          tick() {
            this.seconds++
            return this.seconds
          }
        }
        
        const timer = new Timer()
        const tick = timer.tick
        
        expect(tick()).toBe(1)
        expect(tick()).toBe(2)
      })
      
      it('should preserve context with arrow class fields', () => {
        class Timer {
          seconds = 0
          
          tick = () => {
            this.seconds++
            return this.seconds
          }
        }
        
        const timer = new Timer()
        const tick = timer.tick
        
        expect(tick()).toBe(1)
        expect(tick()).toBe(2)
      })
    })
  })
  
  describe('Gotchas and Edge Cases', () => {
    describe('Lost Context Scenarios', () => {
      it('should demonstrate lost context in forEach without arrow', () => {
        const calculator = {
          value: 10,
          addAll(numbers) {
            const self = this  // Old-school workaround
            numbers.forEach(function(n) {
              self.value += n
            })
            return this.value
          }
        }
        
        expect(calculator.addAll([1, 2, 3])).toBe(16)
      })
      
      it('should fix lost context with arrow function', () => {
        const calculator = {
          value: 10,
          addAll(numbers) {
            numbers.forEach((n) => {
              this.value += n
            })
            return this.value
          }
        }
        
        expect(calculator.addAll([1, 2, 3])).toBe(16)
      })
      
      it('should fix lost context with thisArg parameter', () => {
        const calculator = {
          value: 10,
          addAll(numbers) {
            numbers.forEach(function(n) {
              this.value += n
            }, this)  // Pass this as second argument
            return this.value
          }
        }
        
        expect(calculator.addAll([1, 2, 3])).toBe(16)
      })
    })
    
    describe('this in Different Contexts', () => {
      it('should have correct this in nested methods', () => {
        const outer = {
          name: 'Outer',
          inner: {
            name: 'Inner',
            getOuterName() {
              // Can't access outer.name via this
              return this.name
            }
          }
        }
        
        expect(outer.inner.getOuterName()).toBe('Inner')
      })
      
      it('should demonstrate closure workaround for nested this', () => {
        const outer = {
          name: 'Outer',
          createInner() {
            const outerThis = this
            return {
              name: 'Inner',
              getOuterName() {
                return outerThis.name
              }
            }
          }
        }
        
        const inner = outer.createInner()
        expect(inner.getOuterName()).toBe('Outer')
      })
    })
    
    describe('Binding Priority', () => {
      it('should have new override bind', () => {
        function Foo(value) {
          this.value = value
        }
        
        const BoundFoo = Foo.bind({ value: 'bound' })
        const instance = new BoundFoo('new')
        
        expect(instance.value).toBe('new')
      })
      
      it('should have explicit override implicit', () => {
        const obj1 = {
          name: 'obj1',
          getName() {
            return this.name
          }
        }
        
        const obj2 = { name: 'obj2' }
        
        expect(obj1.getName()).toBe('obj1')
        expect(obj1.getName.call(obj2)).toBe('obj2')
      })
      
      it('should have implicit override default', () => {
        function getName() {
          return this?.name
        }
        
        const obj = { name: 'obj', getName }
        
        expect(getName()).toBeUndefined()  // Default binding
        expect(obj.getName()).toBe('obj')   // Implicit binding
      })
    })
  })
  
  describe('Quiz Questions from Documentation', () => {
    it('Question 1: extracted method loses context', () => {
      const user = {
        name: 'Alice',
        greet() {
          return `Hi, I'm ${this?.name}`
        }
      }
      
      const greet = user.greet
      expect(greet()).toBe("Hi, I'm undefined")
    })
    
    it('Question 2: arrow function class fields preserve context', () => {
      class Counter {
        count = 0
        
        increment = () => {
          this.count++
        }
      }
      
      const counter = new Counter()
      const inc = counter.increment
      inc()
      inc()
      
      expect(counter.count).toBe(2)
    })
    
    it('Question 3: bind cannot be overridden by call', () => {
      function greet() {
        return `Hello, ${this.name}!`
      }
      
      const alice = { name: 'Alice' }
      const bob = { name: 'Bob' }
      
      const greetAlice = greet.bind(alice)
      expect(greetAlice.call(bob)).toBe('Hello, Alice!')
    })
    
    it('Question 4: nested object uses immediate parent as this', () => {
      const obj = {
        name: 'Outer',
        inner: {
          name: 'Inner',
          getName() {
            return this.name
          }
        }
      }
      
      expect(obj.inner.getName()).toBe('Inner')
    })
  })
})
