import { describe, it, expect, vi } from 'vitest'

describe('IIFE, Modules and Namespaces', () => {
  // ===========================================
  // Part 1: IIFE — The Self-Running Function
  // ===========================================

  describe('Part 1: IIFE — The Self-Running Function', () => {
    describe('What is an IIFE?', () => {
      it('should require calling a normal function manually', () => {
        let called = false

        function greet() {
          called = true
        }

        // Function is defined but not called yet
        expect(called).toBe(false)

        greet() // You have to call it
        expect(called).toBe(true)
      })

      it('should run IIFE immediately without manual call', () => {
        let called = false

        // An IIFE — it runs immediately, no calling needed
        ;(function () {
          called = true
        })() // Runs right away!

        expect(called).toBe(true)
      })

      it('should demonstrate IIFE executes during definition', () => {
        const results = []

        results.push('before IIFE')
        ;(function () {
          results.push('inside IIFE')
        })()
        results.push('after IIFE')

        expect(results).toEqual(['before IIFE', 'inside IIFE', 'after IIFE'])
      })
    })

    describe('IIFE Variations', () => {
      it('should work with classic style', () => {
        let executed = false

        // Classic style
        ;(function () {
          executed = true
        })()

        expect(executed).toBe(true)
      })

      it('should work with alternative parentheses placement', () => {
        let executed = false

        // Alternative parentheses placement
        ;(function () {
          executed = true
        })()

        expect(executed).toBe(true)
      })

      it('should work with arrow function IIFE (modern)', () => {
        let executed = false

        // Arrow function IIFE (modern)
        ;(() => {
          executed = true
        })()

        expect(executed).toBe(true)
      })

      it('should work with parameters', () => {
        let greeting = ''

        // With parameters
        ;((name) => {
          greeting = `Hello, ${name}!`
        })('Alice')

        expect(greeting).toBe('Hello, Alice!')
      })

      it('should work with named IIFE (useful for debugging)', () => {
        let executed = false

        // Named IIFE (useful for debugging)
        ;(function myIIFE() {
          executed = true
        })()

        expect(executed).toBe(true)
      })

      it('should allow named IIFE to call itself recursively', () => {
        const result = (function factorial(n) {
          if (n <= 1) return 1
          return n * factorial(n - 1)
        })(5)

        expect(result).toBe(120)
      })
    })

    describe('Why Were IIFEs Invented? (Global Scope Problem)', () => {
      it('should demonstrate var variables can be overwritten in same scope', () => {
        // Simulating file1.js
        var userName = 'Alice'
        var count = 0

        // Simulating file2.js (loaded after file1.js)
        var userName = 'Bob' // Overwrites the first userName
        var count = 100 // Overwrites the first count

        // Now file1.js's code is broken because its variables were replaced
        expect(userName).toBe('Bob')
        expect(count).toBe(100)
      })

      it('should demonstrate IIFE creates private scope', () => {
        let file1UserName
        let file2UserName

        // file1.js — wrapped in an IIFE
        ;(function () {
          var userName = 'Alice' // Private to this IIFE
          file1UserName = userName
        })()

        // file2.js — also wrapped in an IIFE
        ;(function () {
          var userName = 'Bob' // Different variable, no conflict!
          file2UserName = userName
        })()

        expect(file1UserName).toBe('Alice')
        expect(file2UserName).toBe('Bob')
      })

      it('should keep IIFE variables inaccessible from outside', () => {
        ;(function () {
          var privateVar = 'secret'
          // privateVar exists here
          expect(privateVar).toBe('secret')
        })()

        // privateVar is not accessible here
        expect(typeof privateVar).toBe('undefined')
      })
    })

    describe('Practical Example: Creating Private Variables (Module Pattern)', () => {
      it('should create counter with private state', () => {
        const counter = (function () {
          // Private variable — can't be accessed directly
          let count = 0

          // Return public interface
          return {
            increment() {
              count++
            },
            decrement() {
              count--
            },
            getCount() {
              return count
            }
          }
        })()

        // Using the counter
        counter.increment()
        expect(counter.getCount()).toBe(1)

        counter.increment()
        expect(counter.getCount()).toBe(2)

        counter.decrement()
        expect(counter.getCount()).toBe(1)
      })

      it('should keep count private (not accessible directly)', () => {
        const counter = (function () {
          let count = 0

          return {
            increment() {
              count++
            },
            getCount() {
              return count
            }
          }
        })()

        counter.increment()
        counter.increment()

        // Trying to access private variables
        expect(counter.count).toBe(undefined) // it's private!
      })

      it('should throw TypeError when calling non-existent private function', () => {
        const counter = (function () {
          let count = 0

          // Private function — also hidden
          function log(message) {
            return `[Counter] ${message}`
          }

          return {
            increment() {
              count++
              return log(`Incremented to ${count}`)
            },
            getCount() {
              return count
            }
          }
        })()

        // Private log function works internally
        expect(counter.increment()).toBe('[Counter] Incremented to 1')

        // But not accessible from outside
        expect(counter.log).toBe(undefined)
        expect(() => counter.log('test')).toThrow(TypeError)
      })

      it('should create multiple independent counter instances', () => {
        function createCounter() {
          let count = 0

          return {
            increment() {
              count++
            },
            getCount() {
              return count
            }
          }
        }

        const counter1 = createCounter()
        const counter2 = createCounter()

        counter1.increment()
        counter1.increment()
        counter1.increment()

        counter2.increment()

        expect(counter1.getCount()).toBe(3)
        expect(counter2.getCount()).toBe(1)
      })
    })

    describe('IIFE with Parameters', () => {
      it('should pass parameters into IIFE', () => {
        const result = (function (a, b) {
          return a + b
        })(10, 20)

        expect(result).toBe(30)
      })

      it('should create local aliases for global objects', () => {
        const globalObj = { name: 'Global' }

        const result = (function (obj) {
          // Inside here, obj is a local reference
          return obj.name
        })(globalObj)

        expect(result).toBe('Global')
      })

      it('should preserve parameter values even if outer variable changes', () => {
        let value = 'original'

        const getOriginalValue = (function (capturedValue) {
          return function () {
            return capturedValue
          }
        })(value)

        value = 'changed'

        expect(getOriginalValue()).toBe('original')
        expect(value).toBe('changed')
      })
    })

    describe('When to Use IIFEs Today', () => {
      describe('One-time initialization code', () => {
        it('should create config object with computed values', () => {
          const config = (() => {
            const env = 'production' // simulating process.env.NODE_ENV
            const apiUrl =
              env === 'production'
                ? 'https://api.example.com'
                : 'http://localhost:3000'

            return { env, apiUrl }
          })()

          expect(config.env).toBe('production')
          expect(config.apiUrl).toBe('https://api.example.com')
        })

        it('should use development URL when not in production', () => {
          const config = (() => {
            const env = 'development'
            const apiUrl =
              env === 'production'
                ? 'https://api.example.com'
                : 'http://localhost:3000'

            return { env, apiUrl }
          })()

          expect(config.env).toBe('development')
          expect(config.apiUrl).toBe('http://localhost:3000')
        })
      })

      describe('Creating async IIFEs', () => {
        it('should execute async IIFE', async () => {
          let result = null

          await (async () => {
            result = await Promise.resolve('data loaded')
          })()

          expect(result).toBe('data loaded')
        })

        it('should handle async operations in IIFE', async () => {
          const data = await (async () => {
            const response = await Promise.resolve({ json: () => ({ id: 1, name: 'Test' }) })
            return response.json()
          })()

          expect(data).toEqual({ id: 1, name: 'Test' })
        })
      })
    })
  })

  // ===========================================
  // Part 2: Namespaces — Organizing Under One Name
  // ===========================================

  describe('Part 2: Namespaces — Organizing Under One Name', () => {
    describe('What is a Namespace?', () => {
      it('should demonstrate variables without namespace can conflict', () => {
        // Without namespace — variables everywhere
        var userName = 'Alice'
        var userAge = 25

        // These could easily conflict with other code
        var userName = 'Bob' // Overwrites!

        expect(userName).toBe('Bob')
      })

      it('should organize data under one namespace object', () => {
        // With namespace — everything organized under one name
        const User = {
          name: 'Alice',
          age: 25,
          email: 'alice@example.com',

          login() {
            return `${this.name} logged in`
          },
          logout() {
            return `${this.name} logged out`
          }
        }

        // Access with the namespace prefix
        expect(User.name).toBe('Alice')
        expect(User.age).toBe(25)
        expect(User.login()).toBe('Alice logged in')
        expect(User.logout()).toBe('Alice logged out')
      })
    })

    describe('Creating a Namespace', () => {
      it('should create simple namespace and add properties', () => {
        // Simple namespace
        const MyApp = {}

        // Add things to it
        MyApp.version = '1.0.0'
        MyApp.config = {
          apiUrl: 'https://api.example.com',
          timeout: 5000
        }

        expect(MyApp.version).toBe('1.0.0')
        expect(MyApp.config.apiUrl).toBe('https://api.example.com')
        expect(MyApp.config.timeout).toBe(5000)
      })

      it('should add utility methods to namespace', () => {
        const MyApp = {}

        MyApp.utils = {
          formatDate(date) {
            return date.toLocaleDateString()
          },
          capitalize(str) {
            return str.charAt(0).toUpperCase() + str.slice(1)
          }
        }

        expect(MyApp.utils.capitalize('hello')).toBe('Hello')
        expect(MyApp.utils.capitalize('world')).toBe('World')

        const testDate = new Date('2024-01-15')
        expect(typeof MyApp.utils.formatDate(testDate)).toBe('string')
      })
    })

    describe('Nested Namespaces', () => {
      it('should create nested namespace structure', () => {
        // Create the main namespace
        const MyApp = {
          // Nested namespaces
          Models: {},
          Views: {},
          Controllers: {},
          Utils: {}
        }

        expect(MyApp.Models).toEqual({})
        expect(MyApp.Views).toEqual({})
        expect(MyApp.Controllers).toEqual({})
        expect(MyApp.Utils).toEqual({})
      })

      it('should add functionality to nested namespaces', () => {
        const MyApp = {
          Models: {},
          Views: {},
          Utils: {}
        }

        // Add to nested namespaces
        MyApp.Models.User = {
          create(name) {
            return { name, id: Date.now() }
          },
          find(id) {
            return { id, name: 'Found User' }
          }
        }

        MyApp.Views.UserList = {
          render(users) {
            return users.map((u) => u.name).join(', ')
          }
        }

        MyApp.Utils.Validation = {
          isEmail(str) {
            return str.includes('@')
          }
        }

        // Use nested namespaces
        const user = MyApp.Models.User.create('Alice')
        expect(user.name).toBe('Alice')
        expect(typeof user.id).toBe('number')

        const found = MyApp.Models.User.find(123)
        expect(found.id).toBe(123)

        const rendered = MyApp.Views.UserList.render([{ name: 'Alice' }, { name: 'Bob' }])
        expect(rendered).toBe('Alice, Bob')

        expect(MyApp.Utils.Validation.isEmail('test@example.com')).toBe(true)
        expect(MyApp.Utils.Validation.isEmail('invalid')).toBe(false)
      })
    })

    describe('Combining Namespaces with IIFEs', () => {
      it('should create namespace with IIFE for private variables', () => {
        const MyApp = {}

        // Use IIFE to add features with private variables
        MyApp.Counter = (function () {
          // Private
          let count = 0

          // Public
          return {
            increment() {
              count++
            },
            decrement() {
              count--
            },
            getCount() {
              return count
            }
          }
        })()

        MyApp.Counter.increment()
        MyApp.Counter.increment()
        expect(MyApp.Counter.getCount()).toBe(2)

        MyApp.Counter.decrement()
        expect(MyApp.Counter.getCount()).toBe(1)

        // Private count is not accessible
        expect(MyApp.Counter.count).toBe(undefined)
      })

      it('should create Logger with private logs array', () => {
        const MyApp = {}

        MyApp.Logger = (function () {
          // Private
          const logs = []

          // Public
          return {
            log(message) {
              logs.push({ message, time: new Date() })
              return message // Return for testing
            },
            getLogs() {
              return [...logs] // Return a copy
            },
            getLogCount() {
              return logs.length
            }
          }
        })()

        MyApp.Logger.log('First message')
        MyApp.Logger.log('Second message')

        expect(MyApp.Logger.getLogCount()).toBe(2)

        const allLogs = MyApp.Logger.getLogs()
        expect(allLogs[0].message).toBe('First message')
        expect(allLogs[1].message).toBe('Second message')

        // Returned array is a copy, modifying it doesn't affect internal logs
        allLogs.push({ message: 'Fake log' })
        expect(MyApp.Logger.getLogCount()).toBe(2)
      })

      it('should combine Counter and Logger in same namespace', () => {
        const MyApp = {}

        MyApp.Counter = (function () {
          let count = 0
          return {
            increment() {
              count++
              return count
            },
            getCount() {
              return count
            }
          }
        })()

        MyApp.Logger = (function () {
          const logs = []
          return {
            log(message) {
              logs.push(message)
            },
            getLogs() {
              return [...logs]
            }
          }
        })()

        // Usage
        const newCount = MyApp.Counter.increment()
        MyApp.Logger.log(`Counter incremented to ${newCount}`)

        expect(MyApp.Counter.getCount()).toBe(1)
        expect(MyApp.Logger.getLogs()).toEqual(['Counter incremented to 1'])
      })
    })
  })

  // ===========================================
  // Part 3: ES6 Modules — The Modern Solution (Patterns)
  // ===========================================

  describe('Part 3: ES6 Modules — Pattern Testing', () => {
    describe('Named Export Patterns', () => {
      it('should test function that would be named export', () => {
        // These functions would be: export function add(a, b) { ... }
        function add(a, b) {
          return a + b
        }

        function subtract(a, b) {
          return a - b
        }

        const PI = 3.14159

        expect(add(2, 3)).toBe(5)
        expect(subtract(10, 4)).toBe(6)
        expect(PI).toBe(3.14159)
      })

      it('should test square and cube functions', () => {
        // export function square(x) { return x * x; }
        function square(x) {
          return x * x
        }

        // function cube(x) { return x * x * x; }
        // export { cube };
        function cube(x) {
          return x * x * x
        }

        expect(square(4)).toBe(16)
        expect(square(5)).toBe(25)
        expect(cube(3)).toBe(27)
        expect(cube(4)).toBe(64)
      })

      it('should test Calculator class', () => {
        // export class Calculator { ... }
        class Calculator {
          add(a, b) {
            return a + b
          }
          subtract(a, b) {
            return a - b
          }
          multiply(a, b) {
            return a * b
          }
          divide(a, b) {
            return a / b
          }
        }

        const calc = new Calculator()
        expect(calc.add(5, 3)).toBe(8)
        expect(calc.subtract(10, 4)).toBe(6)
        expect(calc.multiply(3, 4)).toBe(12)
        expect(calc.divide(20, 5)).toBe(4)
      })

      it('should test math constants', () => {
        const PI = 3.14159
        const E = 2.71828

        expect(PI).toBeCloseTo(3.14159, 5)
        expect(E).toBeCloseTo(2.71828, 5)
      })
    })

    describe('Default Export Patterns', () => {
      it('should test greet function (default export pattern)', () => {
        // export default function greet(name) { ... }
        function greet(name) {
          return `Hello, ${name}!`
        }

        expect(greet('World')).toBe('Hello, World!')
        expect(greet('Alice')).toBe('Hello, Alice!')
      })

      it('should test User class (default export pattern)', () => {
        // export default class User { ... }
        class User {
          constructor(name) {
            this.name = name
          }

          greet() {
            return `Hi, I'm ${this.name}`
          }
        }

        const user = new User('Alice')
        expect(user.name).toBe('Alice')
        expect(user.greet()).toBe("Hi, I'm Alice")

        const bob = new User('Bob')
        expect(bob.greet()).toBe("Hi, I'm Bob")
      })
    })

    describe('Module Privacy Pattern', () => {
      it('should demonstrate unexported variables are private', () => {
        // In a real module:
        // let currentUser = null;  // Private to this module
        // export function login() { currentUser = ... }
        // export function getCurrentUser() { return currentUser }

        // Simulating with closure
        const authModule = (function () {
          let currentUser = null // Private to this module

          return {
            login(email) {
              currentUser = { email, loggedInAt: new Date() }
              return currentUser
            },
            getCurrentUser() {
              return currentUser
            },
            logout() {
              currentUser = null
            }
          }
        })()

        expect(authModule.getCurrentUser()).toBe(null)

        authModule.login('user@example.com')
        expect(authModule.getCurrentUser().email).toBe('user@example.com')

        authModule.logout()
        expect(authModule.getCurrentUser()).toBe(null)

        // currentUser is not directly accessible
        expect(authModule.currentUser).toBe(undefined)
      })
    })

    describe('Re-export Pattern (Barrel Files)', () => {
      it('should demonstrate re-export concept', () => {
        // utils/format.js
        const formatModule = {
          formatDate(date) {
            return date.toLocaleDateString()
          },
          formatCurrency(amount) {
            return `$${amount.toFixed(2)}`
          }
        }

        // utils/validate.js
        const validateModule = {
          isEmail(str) {
            return str.includes('@')
          },
          isPhone(str) {
            return /^\d{10}$/.test(str)
          }
        }

        // utils/index.js — re-exports everything
        const Utils = {
          ...formatModule,
          ...validateModule
        }

        expect(Utils.formatCurrency(19.99)).toBe('$19.99')
        expect(Utils.isEmail('test@example.com')).toBe(true)
        expect(Utils.isPhone('1234567890')).toBe(true)
        expect(Utils.isPhone('123')).toBe(false)
      })
    })
  })

  // ===========================================
  // The Evolution: From IIFEs to Modules
  // ===========================================

  describe('The Evolution: From IIFEs to Modules', () => {
    describe('Era 1: Global (Bad)', () => {
      it('should demonstrate global variable problem', () => {
        // Everything pollutes global scope
        var counter = 0

        function increment() {
          counter++
        }

        function getCount() {
          return counter
        }

        increment()
        expect(getCount()).toBe(1)

        // Problem: Anyone can do this
        counter = 999 // Oops, state corrupted!
        expect(getCount()).toBe(999)
      })
    })

    describe('Era 2: IIFE (Better)', () => {
      it('should demonstrate IIFE protects state', () => {
        // Uses closure to hide counter
        var Counter = (function () {
          var counter = 0 // Private!

          return {
            increment: function () {
              counter++
            },
            getCount: function () {
              return counter
            }
          }
        })()

        Counter.increment()
        expect(Counter.getCount()).toBe(1)
        expect(Counter.counter).toBe(undefined) // private!
      })

      it('should prevent external modification of private state', () => {
        var Counter = (function () {
          var counter = 0

          return {
            increment: function () {
              counter++
            },
            getCount: function () {
              return counter
            }
          }
        })()

        Counter.increment()
        Counter.increment()
        Counter.increment()

        // Cannot directly set counter
        Counter.counter = 999
        expect(Counter.getCount()).toBe(3) // Still 3, not 999!
      })
    })

    describe('Era 3: ES6 Modules (Best) - Pattern', () => {
      it('should demonstrate module pattern (simulated)', () => {
        // Simulating:
        // counter.js
        // let counter = 0;  // Private (not exported)
        // export function increment() { counter++; }
        // export function getCount() { return counter; }

        const counterModule = (function () {
          let counter = 0 // Private (not exported)

          return {
            increment() {
              counter++
            },
            getCount() {
              return counter
            }
          }
        })()

        // Simulating: import { increment, getCount } from './counter.js';
        const { increment, getCount } = counterModule

        increment()
        expect(getCount()).toBe(1)

        // counter variable is not accessible at all
        expect(counterModule.counter).toBe(undefined)
      })
    })
  })

  // ===========================================
  // Common Patterns and Best Practices
  // ===========================================

  describe('Common Patterns and Best Practices', () => {
    describe('Avoid Circular Dependencies', () => {
      it('should demonstrate shared module pattern to avoid circular deps', () => {
        // Instead of A importing B and B importing A...
        // Create a third module for shared code

        // shared.js
        const sharedModule = {
          sharedThing: 'shared',
          helperFunction() {
            return 'helper result'
          }
        }

        // a.js - imports from shared
        const moduleA = {
          fromA: 'A',
          useShared() {
            return sharedModule.sharedThing
          }
        }

        // b.js - also imports from shared
        const moduleB = {
          fromB: 'B',
          useShared() {
            return sharedModule.sharedThing
          }
        }

        // No circular dependency!
        expect(moduleA.useShared()).toBe('shared')
        expect(moduleB.useShared()).toBe('shared')
      })
    })
  })

  // ===========================================
  // Test Your Knowledge Examples
  // ===========================================

  describe('Test Your Knowledge Examples', () => {
    describe('Question 1: What does IIFE stand for?', () => {
      it('should demonstrate Immediately Invoked Function Expression', () => {
        const results = []

        // Immediately - runs right now
        // Invoked - called/executed
        // Function Expression - a function written as an expression

        results.push('before')
        ;(function () {
          results.push('immediately invoked')
        })()
        results.push('after')

        expect(results).toEqual(['before', 'immediately invoked', 'after'])
      })
    })

    describe('Question 3: How to create private variable in IIFE?', () => {
      it('should create private variable inside IIFE', () => {
        const module = (function () {
          // Private variable
          let privateCounter = 0

          // Return public methods that can access it
          return {
            increment() {
              privateCounter++
            },
            getCount() {
              return privateCounter
            }
          }
        })()

        module.increment()
        expect(module.getCount()).toBe(1)
        expect(module.privateCounter).toBe(undefined) // private!
      })
    })

    describe('Question 4: Static vs Dynamic imports', () => {
      it('should demonstrate dynamic import returns a Promise', async () => {
        // Dynamic imports return Promises
        // const module = await import('./module.js')

        // Simulating dynamic import behavior
        const dynamicImport = () =>
          Promise.resolve({
            default: function () {
              return 'loaded'
            },
            namedExport: 'value'
          })

        const module = await dynamicImport()
        expect(module.default()).toBe('loaded')
        expect(module.namedExport).toBe('value')
      })
    })

    describe('Question 6: When to use IIFE today', () => {
      it('should use IIFE for async initialization', async () => {
        let data = null

        await (async () => {
          data = await Promise.resolve({ loaded: true })
        })()

        expect(data).toEqual({ loaded: true })
      })

      it('should use IIFE for one-time calculations', () => {
        const config = (() => {
          // Complex setup that runs once
          const computed = 2 + 2
          return { computed, ready: true }
        })()

        expect(config.computed).toBe(4)
        expect(config.ready).toBe(true)
      })
    })
  })

  // ===========================================
  // Additional Edge Cases
  // ===========================================

  describe('Edge Cases and Additional Tests', () => {
    describe('IIFE Return Values', () => {
      it('should return primitive values from IIFE', () => {
        const number = (function () {
          return 42
        })()

        const string = (function () {
          return 'hello'
        })()

        const boolean = (function () {
          return true
        })()

        expect(number).toBe(42)
        expect(string).toBe('hello')
        expect(boolean).toBe(true)
      })

      it('should return undefined when no return statement', () => {
        const result = (function () {
          const x = 1 + 1 // no return
        })()

        expect(result).toBe(undefined)
      })

      it('should return arrays and objects from IIFE', () => {
        const arr = (function () {
          return [1, 2, 3]
        })()

        const obj = (function () {
          return { a: 1, b: 2 }
        })()

        expect(arr).toEqual([1, 2, 3])
        expect(obj).toEqual({ a: 1, b: 2 })
      })
    })

    describe('Nested IIFEs', () => {
      it('should support nested IIFEs', () => {
        const result = (function () {
          const outer = 'outer'

          return (function () {
            const inner = 'inner'
            return outer + '-' + inner
          })()
        })()

        expect(result).toBe('outer-inner')
      })
    })

    describe('IIFE with this context', () => {
      it('should demonstrate arrow IIFE inherits this from enclosing scope', () => {
        // Arrow functions don't have their own this binding
        // They inherit this from the enclosing lexical scope
        const obj = {
          name: 'TestObject',
          getThisArrow: (() => {
            // In module scope, this may be undefined or global depending on environment
            return typeof this
          })(),
          getNameWithRegular: function() {
            return (function() {
              // Regular function IIFE in strict mode has undefined this
              return this
            })()
          }
        }

        // Arrow IIFE inherits this from module scope (not the object)
        expect(typeof obj.getThisArrow).toBe('string')
        
        // Regular function IIFE called without context has undefined this in strict mode
        expect(obj.getNameWithRegular()).toBe(undefined)
      })

      it('should show regular function IIFE has undefined this in strict mode', () => {
        const result = (function() {
          'use strict'
          return this
        })()

        expect(result).toBe(undefined)
      })
    })

    describe('Namespace Extension', () => {
      it('should extend existing namespace safely', () => {
        // Create or extend namespace
        const MyApp = {}

        // Safely extend (pattern used in large apps)
        MyApp.Utils = MyApp.Utils || {}
        MyApp.Utils.String = MyApp.Utils.String || {}

        MyApp.Utils.String.reverse = function (str) {
          return str.split('').reverse().join('')
        }

        expect(MyApp.Utils.String.reverse('hello')).toBe('olleh')

        // Extend again without overwriting
        MyApp.Utils.String = MyApp.Utils.String || {}
        MyApp.Utils.String.uppercase = function (str) {
          return str.toUpperCase()
        }

        // Both functions exist
        expect(MyApp.Utils.String.reverse('test')).toBe('tset')
        expect(MyApp.Utils.String.uppercase('test')).toBe('TEST')
      })
    })

    describe('Closure over Loop Variables', () => {
      it('should demonstrate IIFE fixing var loop problem', () => {
        const funcs = []

        for (var i = 0; i < 3; i++) {
          ;(function (j) {
            funcs.push(function () {
              return j
            })
          })(i)
        }

        expect(funcs[0]()).toBe(0)
        expect(funcs[1]()).toBe(1)
        expect(funcs[2]()).toBe(2)
      })

      it('should show problem without IIFE', () => {
        const funcs = []

        for (var i = 0; i < 3; i++) {
          funcs.push(function () {
            return i
          })
        }

        // All return 3 because they share the same i
        expect(funcs[0]()).toBe(3)
        expect(funcs[1]()).toBe(3)
        expect(funcs[2]()).toBe(3)
      })
    })

    describe('Module Pattern Variations', () => {
      it('should implement revealing module pattern', () => {
        const RevealingModule = (function () {
          // Private variables and functions
          let privateVar = 'private'
          let publicVar = 'public'

          function privateFunction() {
            return privateVar
          }

          function publicFunction() {
            return publicVar
          }

          function setPrivate(val) {
            privateVar = val
          }

          // Reveal public pointers to private functions
          return {
            publicVar,
            publicFunction,
            setPrivate,
            getPrivate: privateFunction
          }
        })()

        expect(RevealingModule.publicVar).toBe('public')
        expect(RevealingModule.publicFunction()).toBe('public')
        expect(RevealingModule.getPrivate()).toBe('private')

        RevealingModule.setPrivate('updated')
        expect(RevealingModule.getPrivate()).toBe('updated')

        // Private function not accessible directly
        expect(RevealingModule.privateFunction).toBe(undefined)
      })

      it('should implement singleton pattern with IIFE', () => {
        const Singleton = (function () {
          let instance

          function createInstance() {
            return {
              id: Math.random(),
              getName() {
                return 'Singleton Instance'
              }
            }
          }

          return {
            getInstance() {
              if (!instance) {
                instance = createInstance()
              }
              return instance
            }
          }
        })()

        const instance1 = Singleton.getInstance()
        const instance2 = Singleton.getInstance()

        expect(instance1).toBe(instance2) // Same instance
        expect(instance1.id).toBe(instance2.id)
      })
    })
  })
})
