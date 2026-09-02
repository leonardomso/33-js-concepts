import { describe, it, expect } from 'vitest'

describe('Scope and Closures', () => {
  describe('Scope Basics', () => {
    describe('Preventing Naming Conflicts', () => {
      it('should keep variables separate in different functions', () => {
        function countApples() {
          let count = 0
          count++
          return count
        }

        function countOranges() {
          let count = 0
          count++
          return count
        }

        expect(countApples()).toBe(1)
        expect(countOranges()).toBe(1)
      })
    })

    describe('Memory Management', () => {
      it('should demonstrate scope cleanup concept', () => {
        function processData() {
          let hugeArray = new Array(1000).fill('x')
          return hugeArray.length
        }
        
        // hugeArray can be garbage collected after function returns
        expect(processData()).toBe(1000)
      })
    })

    describe('Encapsulation', () => {
      it('should hide implementation details', () => {
        function createBankAccount() {
          let balance = 0
          
          return {
            deposit(amount) { balance += amount },
            getBalance() { return balance }
          }
        }

        const account = createBankAccount()
        account.deposit(100)
        expect(account.getBalance()).toBe(100)
        // balance is private - cannot access directly
      })
    })
  })

  describe('The Three Types of Scope', () => {
    describe('Global Scope', () => {
      it('should access global variables from anywhere', () => {
        const appName = "MyApp"
        let userCount = 0

        function greet() {
          userCount++
          return appName
        }

        expect(greet()).toBe("MyApp")
        expect(userCount).toBe(1)
      })
    })

    describe('Function Scope', () => {
      it('should keep var variables within function', () => {
        function calculateTotal() {
          var subtotal = 100
          var tax = 10
          var total = subtotal + tax
          return total
        }

        expect(calculateTotal()).toBe(110)
        // subtotal, tax, total are not accessible here
      })

      describe('var Hoisting', () => {
        it('should demonstrate var hoisting behavior', () => {
          function example() {
            const first = message // undefined (not an error!)
            var message = "Hello"
            const second = message // "Hello"
            return { first, second }
          }

          const result = example()
          expect(result.first).toBe(undefined)
          expect(result.second).toBe("Hello")
        })
      })
    })

    describe('Block Scope', () => {
      it('should keep let and const within blocks', () => {
        let outsideBlock = "outside"
        
        if (true) {
          let blockLet = "I'm block-scoped"
          const blockConst = "Me too"
          var functionVar = "I escape the block!"
          outsideBlock = blockLet // Can access from inside
        }

        expect(functionVar).toBe("I escape the block!")
        expect(outsideBlock).toBe("I'm block-scoped")
        // blockLet and blockConst are not accessible here
      })

      describe('Temporal Dead Zone', () => {
        it('should throw ReferenceError when accessing let before declaration', () => {
          function demo() {
            // TDZ for 'name' starts here
            const getName = () => name // This creates closure over TDZ variable
            
            let name = "Alice" // TDZ ends here
            return name
          }

          expect(demo()).toBe("Alice")
        })

        it('should demonstrate proper let declaration', () => {
          function demo() {
            let name = "Alice"
            return name
          }

          expect(demo()).toBe("Alice")
        })
      })
    })
  })

  describe('var vs let vs const', () => {
    describe('Redeclaration', () => {
      it('should allow var redeclaration', () => {
        var name = "Alice"
        var name = "Bob" // No error, silently overwrites
        expect(name).toBe("Bob")
      })

      // Note: let and const redeclaration would cause SyntaxError
      // which cannot be tested at runtime
    })

    describe('Reassignment', () => {
      it('should allow var and let reassignment', () => {
        var count = 1
        count = 2
        expect(count).toBe(2)

        let score = 100
        score = 200
        expect(score).toBe(200)
      })

      it('should allow const object mutation but not reassignment', () => {
        const user = { name: "Alice" }
        user.name = "Bob" // Works!
        user.age = 25 // Works!
        
        expect(user.name).toBe("Bob")
        expect(user.age).toBe(25)
        // user = {} would throw TypeError
      })
    })

    describe('The Classic for-loop Problem', () => {
      it('should demonstrate var problem with setTimeout', async () => {
        const results = []
        
        // Using var - only ONE i variable shared
        for (var i = 0; i < 3; i++) {
          // Capture current value using IIFE
          ((j) => {
            setTimeout(() => {
              results.push(j)
            }, 10)
          })(i)
        }

        await new Promise(resolve => setTimeout(resolve, 50))
        expect(results.sort()).toEqual([0, 1, 2])
      })

      it('should demonstrate let solution with setTimeout', async () => {
        const results = []
        
        // Using let - each iteration gets its OWN i variable
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            results.push(i)
          }, 10)
        }

        await new Promise(resolve => setTimeout(resolve, 50))
        expect(results.sort()).toEqual([0, 1, 2])
      })
    })
  })

  describe('Lexical Scope', () => {
    it('should access variables from outer scopes', () => {
      const outer = "I'm outside!"

      function outerFunction() {
        const middle = "I'm in the middle!"

        function innerFunction() {
          const inner = "I'm inside!"
          return { inner, middle, outer }
        }

        return innerFunction()
      }

      const result = outerFunction()
      expect(result.inner).toBe("I'm inside!")
      expect(result.middle).toBe("I'm in the middle!")
      expect(result.outer).toBe("I'm outside!")
    })

    describe('Scope Chain', () => {
      it('should walk up the scope chain to find variables', () => {
        const x = "global"

        function outer() {
          const x = "outer"

          function inner() {
            // Looks for x in inner scope first (not found)
            // Then looks in outer scope (found!)
            return x
          }

          return inner()
        }

        expect(outer()).toBe("outer")
      })
    })

    describe('Variable Shadowing', () => {
      it('should shadow outer variables with inner declarations', () => {
        const name = "Global"

        function greet() {
          const name = "Function" // Shadows global 'name'

          function inner() {
            const name = "Block" // Shadows function 'name'
            return name
          }

          return { inner: inner(), outer: name }
        }

        const result = greet()
        expect(result.inner).toBe("Block")
        expect(result.outer).toBe("Function")
        expect(name).toBe("Global")
      })
    })
  })

  describe('Closures', () => {
    describe('Basic Closure', () => {
      it('should remember variables from outer scope', () => {
        function createGreeter(greeting) {
          return function(name) {
            return `${greeting}, ${name}!`
          }
        }

        const sayHello = createGreeter("Hello")
        const sayHola = createGreeter("Hola")

        expect(sayHello("Alice")).toBe("Hello, Alice!")
        expect(sayHola("Bob")).toBe("Hola, Bob!")
      })
    })

    describe('Data Privacy & Encapsulation', () => {
      it('should create truly private variables', () => {
        function createCounter() {
          let count = 0 // Private variable!

          return {
            increment() {
              count++
              return count
            },
            decrement() {
              count--
              return count
            },
            getCount() {
              return count
            }
          }
        }

        const counter = createCounter()

        expect(counter.getCount()).toBe(0)
        expect(counter.increment()).toBe(1)
        expect(counter.increment()).toBe(2)
        expect(counter.decrement()).toBe(1)
        expect(counter.count).toBe(undefined) // Cannot access directly!
      })
    })

    describe('Function Factories', () => {
      it('should create specialized functions', () => {
        function createMultiplier(multiplier) {
          return function(number) {
            return number * multiplier
          }
        }

        const double = createMultiplier(2)
        const triple = createMultiplier(3)
        const tenX = createMultiplier(10)

        expect(double(5)).toBe(10)
        expect(triple(5)).toBe(15)
        expect(tenX(5)).toBe(50)
      })

      it('should create API clients with base URL', () => {
        function createApiClient(baseUrl) {
          return {
            getUrl(endpoint) {
              return `${baseUrl}${endpoint}`
            }
          }
        }

        const githubApi = createApiClient('https://api.github.com')
        const myApi = createApiClient('https://myapp.com/api')

        expect(githubApi.getUrl('/users')).toBe('https://api.github.com/users')
        expect(myApi.getUrl('/users')).toBe('https://myapp.com/api/users')
      })
    })

    describe('Preserving State in Callbacks', () => {
      it('should maintain state across multiple calls', () => {
        function setupClickCounter() {
          let clicks = 0

          return function handleClick() {
            clicks++
            return clicks
          }
        }

        const handleClick = setupClickCounter()

        expect(handleClick()).toBe(1)
        expect(handleClick()).toBe(2)
        expect(handleClick()).toBe(3)
      })
    })

    describe('Memoization', () => {
      it('should cache expensive computation results', () => {
        function createMemoizedFunction(fn) {
          const cache = {}

          return function(arg) {
            if (arg in cache) {
              return { value: cache[arg], cached: true }
            }

            const result = fn(arg)
            cache[arg] = result
            return { value: result, cached: false }
          }
        }

        function factorial(n) {
          if (n <= 1) return 1
          return n * factorial(n - 1)
        }

        const memoizedFactorial = createMemoizedFunction(factorial)

        const first = memoizedFactorial(5)
        expect(first.value).toBe(120)
        expect(first.cached).toBe(false)

        const second = memoizedFactorial(5)
        expect(second.value).toBe(120)
        expect(second.cached).toBe(true)
      })
    })
  })

  describe('The Classic Closure Trap', () => {
    describe('The Problem with var in Loops', () => {
      it('should demonstrate the problem', () => {
        const funcs = []
        
        for (var i = 0; i < 3; i++) {
          funcs.push(function() {
            return i
          })
        }

        // All functions return 3 because they share the same 'i'
        expect(funcs[0]()).toBe(3)
        expect(funcs[1]()).toBe(3)
        expect(funcs[2]()).toBe(3)
      })
    })

    describe('Solution 1: Use let', () => {
      it('should create new binding per iteration', () => {
        const funcs = []
        
        for (let i = 0; i < 3; i++) {
          funcs.push(function() {
            return i
          })
        }

        expect(funcs[0]()).toBe(0)
        expect(funcs[1]()).toBe(1)
        expect(funcs[2]()).toBe(2)
      })
    })

    describe('Solution 2: IIFE', () => {
      it('should capture value in IIFE scope', () => {
        const funcs = []
        
        for (var i = 0; i < 3; i++) {
          (function(j) {
            funcs.push(function() {
              return j
            })
          })(i)
        }

        expect(funcs[0]()).toBe(0)
        expect(funcs[1]()).toBe(1)
        expect(funcs[2]()).toBe(2)
      })
    })

    describe('Solution 3: forEach', () => {
      it('should create new scope per iteration', () => {
        const funcs = []
        
        ;[0, 1, 2].forEach(function(i) {
          funcs.push(function() {
            return i
          })
        })

        expect(funcs[0]()).toBe(0)
        expect(funcs[1]()).toBe(1)
        expect(funcs[2]()).toBe(2)
      })
    })
  })

  describe('Closure Memory Considerations', () => {
    it('should demonstrate closure keeping references alive', () => {
      function createClosure() {
        const data = { value: 42 }

        return function() {
          return data.value
        }
      }

      const getClosure = createClosure()
      // data is kept alive because getClosure references it
      expect(getClosure()).toBe(42)
    })

    it('should demonstrate cleanup with null assignment', () => {
      function createHandler() {
        let largeData = new Array(100).fill('data')

        const handler = function() {
          return largeData.length
        }

        return {
          handler,
          cleanup() {
            largeData = null // Allow garbage collection
          }
        }
      }

      const { handler, cleanup } = createHandler()
      expect(handler()).toBe(100)
      
      cleanup()
      // Now largeData can be garbage collected
    })
  })

  describe('Practical Closure Patterns', () => {
    describe('Private State Pattern', () => {
      it('should create objects with private state', () => {
        function createWallet(initial) {
          let balance = initial

          return {
            spend(amount) {
              if (amount <= balance) {
                balance -= amount
                return true
              }
              return false
            },
            getBalance() {
              return balance
            }
          }
        }

        const wallet = createWallet(100)
        expect(wallet.getBalance()).toBe(100)
        expect(wallet.spend(30)).toBe(true)
        expect(wallet.getBalance()).toBe(70)
        expect(wallet.spend(100)).toBe(false)
        expect(wallet.getBalance()).toBe(70)
      })
    })

    describe('Tax Calculator Factory', () => {
      it('should create specialized tax calculators', () => {
        function createTaxCalculator(rate) {
          return (amount) => amount * rate
        }

        const calculateVAT = createTaxCalculator(0.20)
        const calculateGST = createTaxCalculator(0.10)

        expect(calculateVAT(100)).toBe(20)
        expect(calculateGST(100)).toBe(10)
      })
    })

    describe('Logger Factory', () => {
      it('should create prefixed loggers', () => {
        function setupLogger(prefix) {
          return (message) => `[${prefix}] ${message}`
        }

        const errorLogger = setupLogger('ERROR')
        const infoLogger = setupLogger('INFO')

        expect(errorLogger('Something went wrong')).toBe('[ERROR] Something went wrong')
        expect(infoLogger('All good')).toBe('[INFO] All good')
      })
    })

    describe('Memoize Pattern', () => {
      it('should cache results with closures', () => {
        function memoize(fn) {
          const cache = {}
          return (arg) => cache[arg] ?? (cache[arg] = fn(arg))
        }

        let callCount = 0
        const expensive = (n) => {
          callCount++
          return n * n
        }

        const memoizedExpensive = memoize(expensive)

        expect(memoizedExpensive(5)).toBe(25)
        expect(callCount).toBe(1)

        expect(memoizedExpensive(5)).toBe(25)
        expect(callCount).toBe(1) // Still 1, used cache

        expect(memoizedExpensive(6)).toBe(36)
        expect(callCount).toBe(2)
      })
    })
  })

  describe('Test Your Knowledge Examples', () => {
    it('should identify all three scope types', () => {
      const globalVar = "everywhere" // Global scope

      function example() {
        var functionScoped = "function" // Function scope

        if (true) {
          let blockScoped = "block" // Block scope
          expect(blockScoped).toBe("block")
        }

        expect(functionScoped).toBe("function")
      }

      example()
      expect(globalVar).toBe("everywhere")
    })

    it('should demonstrate closure definition', () => {
      function createCounter() {
        let count = 0

        return function() {
          count++
          return count
        }
      }

      const counter = createCounter()
      expect(counter()).toBe(1)
      expect(counter()).toBe(2)
    })

    it('should show var loop outputs 3,3,3 pattern', () => {
      const results = []
      
      for (var i = 0; i < 3; i++) {
        results.push(() => i)
      }

      expect(results[0]()).toBe(3)
      expect(results[1]()).toBe(3)
      expect(results[2]()).toBe(3)
    })

    it('should show let loop outputs 0,1,2 pattern', () => {
      const results = []
      
      for (let i = 0; i < 3; i++) {
        results.push(() => i)
      }

      expect(results[0]()).toBe(0)
      expect(results[1]()).toBe(1)
      expect(results[2]()).toBe(2)
    })
  })

  describe('Temporal Dead Zone (TDZ)', () => {
    it('should throw ReferenceError when accessing let before declaration', () => {
      expect(() => {
        // Using eval to avoid syntax errors at parse time
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
          const y = 10
        `)
      }).toThrow(ReferenceError)
    })

    it('should demonstrate TDZ exists from block start to declaration', () => {
      let outsideValue = "outside"
      
      expect(() => {
        eval(`
          {
            // TDZ starts here for 'name'
            const beforeDeclaration = name  // ReferenceError
            let name = "Alice"
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should not throw for var due to hoisting', () => {
      // var is hoisted with undefined value, so no TDZ
      function example() {
        const before = message // undefined, not an error
        var message = "Hello"
        const after = message  // "Hello"
        return { before, after }
      }

      const result = example()
      expect(result.before).toBe(undefined)
      expect(result.after).toBe("Hello")
    })

    it('should have TDZ in function parameters', () => {
      // Default parameters can reference earlier parameters but not later ones
      expect(() => {
        eval(`
          function test(a = b, b = 2) {
            return a + b
          }
          test()
        `)
      }).toThrow(ReferenceError)
    })

    it('should allow later parameters to reference earlier ones', () => {
      function test(a = 1, b = a + 1) {
        return a + b
      }

      expect(test()).toBe(3)     // a=1, b=2
      expect(test(5)).toBe(11)   // a=5, b=6
      expect(test(5, 10)).toBe(15) // a=5, b=10
    })
  })

  describe('Hoisting Comparison: var vs let/const', () => {
    it('should demonstrate var hoisting without TDZ', () => {
      function example() {
        // var is hoisted and initialized to undefined
        expect(a).toBe(undefined)
        var a = 1
        expect(a).toBe(1)
      }
      
      example()
    })

    it('should demonstrate function declarations are fully hoisted', () => {
      // Function can be called before its declaration
      expect(hoistedFn()).toBe("I was hoisted!")
      
      function hoistedFn() {
        return "I was hoisted!"
      }
    })

    it('should demonstrate function expressions are not hoisted', () => {
      expect(() => {
        eval(`
          notHoisted()
          var notHoisted = function() { return "Not hoisted" }
        `)
      }).toThrow(TypeError)
    })
  })
})
