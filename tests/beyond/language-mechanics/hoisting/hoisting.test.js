import { describe, it, expect } from 'vitest'

describe('Hoisting', () => {
  describe('Variable Hoisting with var', () => {
    it('should hoist var declarations and initialize to undefined', () => {
      function example() {
        const before = greeting
        var greeting = "Hello"
        const after = greeting
        return { before, after }
      }

      const result = example()
      expect(result.before).toBe(undefined)
      expect(result.after).toBe("Hello")
    })

    it('should hoist var to function scope, not block scope', () => {
      function example() {
        if (true) {
          var message = "Inside block"
        }
        return message
      }

      expect(example()).toBe("Inside block")
    })

    it('should hoist multiple var declarations', () => {
      function example() {
        const first = x
        var x = 1
        const second = x
        var x = 2
        const third = x
        return { first, second, third }
      }

      const result = example()
      expect(result.first).toBe(undefined)
      expect(result.second).toBe(1)
      expect(result.third).toBe(2)
    })

    it('should allow var redeclaration without error', () => {
      var name = "Alice"
      var name = "Bob"
      var name = "Charlie"
      
      expect(name).toBe("Charlie")
    })
  })

  describe('let and const: Temporal Dead Zone', () => {
    it('should throw ReferenceError when accessing let before declaration', () => {
      expect(() => {
        eval(`
          const before = x
          let x = 10
        `)
      }).toThrow(ReferenceError)
    })

    it('should throw ReferenceError when accessing const before declaration', () => {
      expect(() => {
        eval(`
          const before = y
          const y = 20
        `)
      }).toThrow(ReferenceError)
    })

    it('should demonstrate that let IS hoisted by shadowing outer variable', () => {
      const outer = "outer"
      
      expect(() => {
        eval(`
          {
            // If inner 'x' wasn't hoisted, this would access outer 'x'
            // But we get ReferenceError, proving inner 'x' shadows outer from block start
            const value = outer
            let outer = "inner"
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should work after declaration line is reached', () => {
      let x
      x = 10
      expect(x).toBe(10)
      
      const y = 20
      expect(y).toBe(20)
    })

    it('should have separate TDZ for each block', () => {
      let x = "outer"
      
      {
        // New TDZ for this block's x
        let x = "inner1"
        expect(x).toBe("inner1")
      }
      
      {
        // Another new TDZ for this block's x
        let x = "inner2"
        expect(x).toBe("inner2")
      }
      
      expect(x).toBe("outer")
    })
  })

  describe('Function Declaration Hoisting', () => {
    it('should fully hoist function declarations', () => {
      // Can call before declaration
      const result = add(2, 3)
      
      function add(a, b) {
        return a + b
      }
      
      expect(result).toBe(5)
    })

    it('should hoist function declarations in any order', () => {
      // Both functions can reference each other
      function isEven(n) {
        if (n === 0) return true
        return isOdd(n - 1)
      }
      
      function isOdd(n) {
        if (n === 0) return false
        return isEven(n - 1)
      }
      
      expect(isEven(4)).toBe(true)
      expect(isOdd(3)).toBe(true)
      expect(isEven(3)).toBe(false)
      expect(isOdd(4)).toBe(false)
    })

    it('should hoist function inside blocks (in non-strict mode behavior)', () => {
      // Function declared inside block
      function example() {
        if (true) {
          function inner() {
            return "inner"
          }
          return inner()
        }
      }
      
      expect(example()).toBe("inner")
    })
  })

  describe('Function Expression Hoisting', () => {
    it('should throw TypeError for var function expression called before assignment', () => {
      expect(() => {
        eval(`
          greet()
          var greet = function() { return "Hello" }
        `)
      }).toThrow(TypeError)
    })

    it('should throw ReferenceError for let/const function expression in TDZ', () => {
      expect(() => {
        eval(`
          greet()
          const greet = function() { return "Hello" }
        `)
      }).toThrow(ReferenceError)
    })

    it('should work after assignment for var function expression', () => {
      var greet
      expect(greet).toBe(undefined)
      
      greet = function() {
        return "Hello"
      }
      
      expect(greet()).toBe("Hello")
    })

    it('should work after declaration for const function expression', () => {
      const greet = function() {
        return "Hello"
      }
      
      expect(greet()).toBe("Hello")
    })
  })

  describe('Arrow Function Hoisting', () => {
    it('should throw ReferenceError for arrow function in TDZ', () => {
      expect(() => {
        eval(`
          sayHi()
          const sayHi = () => "Hi"
        `)
      }).toThrow(ReferenceError)
    })

    it('should work after declaration', () => {
      const sayHi = () => "Hi"
      expect(sayHi()).toBe("Hi")
    })

    it('should follow same rules as function expressions', () => {
      // Arrow functions are always expressions
      const multiply = (a, b) => a * b
      const add = function(a, b) { return a + b }
      
      expect(multiply(3, 4)).toBe(12)
      expect(add(3, 4)).toBe(7)
    })
  })

  describe('Class Hoisting', () => {
    it('should throw ReferenceError when using class before declaration', () => {
      expect(() => {
        eval(`
          const dog = new Animal("Buddy")
          class Animal {
            constructor(name) {
              this.name = name
            }
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should work after class declaration', () => {
      class Animal {
        constructor(name) {
          this.name = name
        }
      }
      
      const dog = new Animal("Buddy")
      expect(dog.name).toBe("Buddy")
    })

    it('should throw ReferenceError for class expression before declaration', () => {
      expect(() => {
        eval(`
          new MyClass()
          const MyClass = class {}
        `)
      }).toThrow(ReferenceError)
    })
  })

  describe('Hoisting Precedence and Order', () => {
    it('should have function declarations win over var initially', () => {
      function example() {
        const typeAtStart = typeof myValue
        
        var myValue = "string"
        
        function myValue() {
          return "function"
        }
        
        const typeAtEnd = typeof myValue
        
        return { typeAtStart, typeAtEnd }
      }
      
      const result = example()
      // Function is hoisted over var initially
      expect(result.typeAtStart).toBe("function")
      // But var assignment overwrites it
      expect(result.typeAtEnd).toBe("string")
    })

    it('should merge multiple var declarations', () => {
      var x = 1
      expect(x).toBe(1)
      
      var x = 2
      expect(x).toBe(2)
      
      var x = 3
      expect(x).toBe(3)
    })

    it('should hoist var without value if only declared later', () => {
      function example() {
        const first = x
        var x
        const second = x
        x = 5
        const third = x
        return { first, second, third }
      }
      
      const result = example()
      expect(result.first).toBe(undefined)
      expect(result.second).toBe(undefined)
      expect(result.third).toBe(5)
    })
  })

  describe('Common Hoisting Pitfalls', () => {
    it('should demonstrate the function expression trap', () => {
      // This is the #1 hoisting mistake
      function example() {
        try {
          return sum(2, 3)
        } catch (e) {
          return e.name
        } finally {
          // eslint-disable-next-line no-unused-vars
          var sum = function(a, b) {
            return a + b
          }
        }
      }
      
      expect(example()).toBe("TypeError")
    })

    it('should work when using function declaration instead', () => {
      function example() {
        return sum(2, 3)
        
        function sum(a, b) {
          return a + b
        }
      }
      
      expect(example()).toBe(5)
    })

    it('should demonstrate var loop problem with closures', () => {
      const funcs = []
      
      for (var i = 0; i < 3; i++) {
        funcs.push(function() {
          return i
        })
      }
      
      // All return 3 because they share the same hoisted 'i'
      expect(funcs[0]()).toBe(3)
      expect(funcs[1]()).toBe(3)
      expect(funcs[2]()).toBe(3)
    })

    it('should fix loop problem with let', () => {
      const funcs = []
      
      for (let i = 0; i < 3; i++) {
        funcs.push(function() {
          return i
        })
      }
      
      // Each iteration gets its own 'i'
      expect(funcs[0]()).toBe(0)
      expect(funcs[1]()).toBe(1)
      expect(funcs[2]()).toBe(2)
    })
  })

  describe('Test Your Knowledge Examples', () => {
    it('Question 1: var hoisting returns undefined then value', () => {
      function example() {
        const results = []
        results.push(x)
        var x = 10
        results.push(x)
        return results
      }
      
      const [first, second] = example()
      expect(first).toBe(undefined)
      expect(second).toBe(10)
    })

    it('Question 2: let throws ReferenceError', () => {
      expect(() => {
        eval(`
          console.log(y)
          let y = 20
        `)
      }).toThrow(ReferenceError)
    })

    it('Question 3: var function expression throws TypeError', () => {
      expect(() => {
        eval(`
          sayHi()
          var sayHi = function() { console.log("Hi!") }
        `)
      }).toThrow(TypeError)
    })

    it('Question 4: function declaration works before definition', () => {
      function example() {
        return sayHello()
        
        function sayHello() {
          return "Hello!"
        }
      }
      
      expect(example()).toBe("Hello!")
    })

    it('Question 5: function vs var same name', () => {
      function example() {
        var a = 1
        function a() { return 2 }
        return typeof a
      }
      
      expect(example()).toBe("number")
    })

    it('Question 6: inner const shadows outer due to hoisting', () => {
      const x = "outer"
      
      function test() {
        // The const x below IS hoisted and creates TDZ from start of function
        // So accessing x here tries to access the inner x which is in TDZ
        try {
          // eslint-disable-next-line no-unused-vars
          const result = x  // This x refers to inner x (TDZ!)
          const x = "inner"
          return result
        } catch (e) {
          return e.name
        }
      }
      
      // The const x inside the try block shadows outer x due to hoisting
      expect(test()).toBe("ReferenceError")
    })
  })

  describe('Edge Cases', () => {
    it('should handle nested function hoisting', () => {
      function outer() {
        const result = inner()
        
        function inner() {
          return deepest()
          
          function deepest() {
            return "deep"
          }
        }
        
        return result
      }
      
      expect(outer()).toBe("deep")
    })

    it('should handle var in catch block', () => {
      try {
        throw new Error("test")
      } catch (e) {
        var caught = e.message
      }
      
      // var escapes the catch block
      expect(caught).toBe("test")
    })

    it('should not hoist variables from eval in strict mode', () => {
      // In strict mode, eval has its own scope
      "use strict"
      eval('var evalVar = "from eval"')
      
      // evalVar is not accessible outside eval in strict mode
      expect(typeof evalVar).toBe("undefined")
    })

    it('should hoist function parameters like var', () => {
      function example(a) {
        const typeAtStart = typeof a
        var a = "reassigned"
        const typeAfter = typeof a
        return { typeAtStart, typeAfter }
      }
      
      const result = example(42)
      expect(result.typeAtStart).toBe("number")
      expect(result.typeAfter).toBe("string")
    })

    it('should handle default parameter TDZ', () => {
      // Earlier parameters can be used in later defaults
      function test(a = 1, b = a + 1) {
        return a + b
      }
      
      expect(test()).toBe(3)       // a=1, b=2
      expect(test(5)).toBe(11)     // a=5, b=6
      expect(test(5, 10)).toBe(15) // a=5, b=10
    })

    it('should throw for later parameter used in earlier default', () => {
      expect(() => {
        eval(`
          function test(a = b, b = 2) {
            return a + b
          }
          test()
        `)
      }).toThrow(ReferenceError)
    })
  })

  describe('Real-World Patterns', () => {
    it('should enable module pattern with hoisted functions', () => {
      function createCounter() {
        // Variables must be declared before return (let/const don't hoist values)
        // But functions ARE fully hoisted, so we can reference them before definition
        let count = 0
        
        return {
          increment,
          decrement,
          getValue
        }
        
        // Function implementations below - these ARE hoisted
        function increment() {
          return ++count
        }
        
        function decrement() {
          return --count
        }
        
        function getValue() {
          return count
        }
      }
      
      const counter = createCounter()
      expect(counter.increment()).toBe(1)
      expect(counter.increment()).toBe(2)
      expect(counter.decrement()).toBe(1)
      expect(counter.getValue()).toBe(1)
    })

    it('should demonstrate readable code structure with hoisting', () => {
      // Public API at the top
      function processUser(user) {
        validate(user)
        const formatted = format(user)
        return save(formatted)
        
        // Implementation details below
        function validate(u) {
          if (!u.name) throw new Error("Name required")
        }
        
        function format(u) {
          return { ...u, name: u.name.toUpperCase() }
        }
        
        function save(u) {
          return { ...u, saved: true }
        }
      }
      
      const result = processUser({ name: "alice", age: 30 })
      expect(result.name).toBe("ALICE")
      expect(result.saved).toBe(true)
    })
  })

  describe('Documentation Examples', () => {
    describe('Why TDZ Exists (MDX lines 220-225)', () => {
      it('should throw ReferenceError when inner let shadows outer, not access outer value', () => {
        // This demonstrates WHY the TDZ exists - to prevent confusing behavior
        // where you might accidentally reference an outer variable
        const x = "outer"
        
        function example() {
          // Without TDZ, this might confusingly print "outer"
          // With TDZ, JavaScript tells you something is wrong
          try {
            // eslint-disable-next-line no-unused-vars
            const value = x  // Tries to access inner x which is in TDZ
            // eslint-disable-next-line no-unused-vars
            let x = "inner"
            return value
          } catch (e) {
            return e.name
          }
        }
        
        // The inner let x shadows outer x from the start of the function
        // so we get ReferenceError instead of "outer"
        expect(example()).toBe("ReferenceError")
        // But outer x is still accessible outside the function
        expect(x).toBe("outer")
      })
    })

    describe('Best Practices', () => {
      describe('1. Declare variables at top of scope (MDX lines 542-554)', () => {
        // This tests the processUser example from Best Practice 1
        function processUser(user) {
          // All declarations at the top
          const name = user.name
          const email = user.email
          let isValid = false
          
          // Logic follows
          if (name && email) {
            isValid = true
          }
          
          return isValid
        }

        it('should validate user with name and email', () => {
          expect(processUser({ name: "Alice", email: "alice@example.com" })).toBe(true)
        })

        it('should invalidate user without email', () => {
          expect(processUser({ name: "Alice" })).toBe(false)
        })

        it('should invalidate user without name', () => {
          expect(processUser({ email: "alice@example.com" })).toBe(false)
        })
      })

      describe('2. Prefer const > let > var (MDX lines 562-567)', () => {
        it('should not allow const reassignment', () => {
          expect(() => {
            eval(`
              const API_URL = 'https://api.example.com'
              API_URL = 'https://other.com'
            `)
          }).toThrow(TypeError)
        })

        it('should allow let reassignment', () => {
          let currentUser = null
          currentUser = { name: "Alice" }
          currentUser = { name: "Bob" }
          
          expect(currentUser.name).toBe("Bob")
        })

        it('should allow var reassignment and redeclaration', () => {
          var counter = 0
          counter = 1
          var counter = 2  // Redeclaration allowed with var
          
          expect(counter).toBe(2)
        })
      })

      describe('3. Use function declarations for named functions (MDX lines 577-583)', () => {
        it('should hoist function declaration (calculateTotal can be called before definition)', () => {
          // Function declaration is fully hoisted
          const items = [{ price: 10 }, { price: 20 }, { price: 30 }]
          const result = calculateTotal(items)
          
          function calculateTotal(items) {
            return items.reduce((sum, item) => sum + item.price, 0)
          }
          
          expect(result).toBe(60)
        })

        it('should work with arrow function after declaration (calculateTax)', () => {
          const calculateTax = (amount) => amount * 0.1
          
          expect(calculateTax(100)).toBe(10)
          expect(calculateTax(250)).toBe(25)
        })

        it('should throw ReferenceError if arrow function called before declaration', () => {
          expect(() => {
            eval(`
              calculateTax(100)
              const calculateTax = (amount) => amount * 0.1
            `)
          }).toThrow(ReferenceError)
        })
      })

      describe('5. Don\'t rely on hoisting for variable values (MDX lines 605-615)', () => {
        it('should show bad pattern: var x is undefined before assignment', () => {
          function bad() {
            const valueBeforeAssignment = x  // undefined - works but confusing
            var x = 5
            const valueAfterAssignment = x
            return { before: valueBeforeAssignment, after: valueAfterAssignment }
          }
          
          const result = bad()
          expect(result.before).toBe(undefined)
          expect(result.after).toBe(5)
        })

        it('should show good pattern: const x is properly defined', () => {
          function good() {
            const x = 5
            return x  // 5 - clear and predictable
          }
          
          expect(good()).toBe(5)
        })
      })
    })
  })
})
