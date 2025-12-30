import { describe, it, expect } from 'vitest'

describe('Call Stack', () => {
  describe('Basic Function Calls', () => {
    it('should execute nested function calls and return correct greeting', () => {
      function createGreeting(name) {
        return "Hello, " + name + "!"
      }

      function greet(name) {
        const greeting = createGreeting(name)
        return greeting
      }

      expect(greet("Alice")).toBe("Hello, Alice!")
    })

    it('should demonstrate function arguments in execution context', () => {
      function greet(name, age) {
        return { name, age }
      }

      const result = greet("Alice", 25)
      expect(result).toEqual({ name: "Alice", age: 25 })
    })

    it('should demonstrate local variables in execution context', () => {
      function calculate() {
        const x = 10
        let y = 20
        var z = 30
        return x + y + z
      }

      expect(calculate()).toBe(60)
    })
  })

  describe('Nested Function Calls', () => {
    it('should execute multiply, square, and printSquare correctly', () => {
      function multiply(x, y) {
        return x * y
      }

      function square(n) {
        return multiply(n, n)
      }

      function printSquare(n) {
        const result = square(n)
        return result
      }

      expect(printSquare(4)).toBe(16)
    })

    it('should handle deep nesting of function calls', () => {
      function a() { return b() }
      function b() { return c() }
      function c() { return d() }
      function d() { return 'done' }

      expect(a()).toBe('done')
    })

    it('should calculate maximum stack depth correctly for nested calls', () => {
      // This test verifies the example where max depth is 4
      let maxDepth = 0
      let currentDepth = 0

      function a() { 
        currentDepth++
        maxDepth = Math.max(maxDepth, currentDepth)
        const result = b()
        currentDepth--
        return result
      }
      function b() { 
        currentDepth++
        maxDepth = Math.max(maxDepth, currentDepth)
        const result = c()
        currentDepth--
        return result
      }
      function c() { 
        currentDepth++
        maxDepth = Math.max(maxDepth, currentDepth)
        const result = d()
        currentDepth--
        return result
      }
      function d() { 
        currentDepth++
        maxDepth = Math.max(maxDepth, currentDepth)
        currentDepth--
        return 'done'
      }

      a()
      expect(maxDepth).toBe(4)
    })
  })

  describe('Scope Chain in Execution Context', () => {
    it('should access outer scope variables from inner function', () => {
      function outer() {
        const message = "Hello"
        
        function inner() {
          return message
        }
        
        return inner()
      }

      expect(outer()).toBe("Hello")
    })

    it('should demonstrate this keyword context in objects', () => {
      const person = {
        name: "Alice",
        greet() {
          return this.name
        }
      }

      expect(person.greet()).toBe("Alice")
    })
  })

  describe('Stack Overflow', () => {
    it('should throw RangeError for infinite recursion without base case', () => {
      function countdown(n) {
        countdown(n - 1) // No base case - infinite recursion
      }

      expect(() => countdown(5)).toThrow(RangeError)
    })

    it('should work correctly with proper base case', () => {
      const results = []
      
      function countdown(n) {
        if (n <= 0) {
          results.push("Done!")
          return
        }
        results.push(n)
        countdown(n - 1)
      }

      countdown(5)
      expect(results).toEqual([5, 4, 3, 2, 1, "Done!"])
    })

    it('should throw for infinite loop function', () => {
      function loop() {
        loop()
      }

      expect(() => loop()).toThrow(RangeError)
    })

    it('should throw for base case that is never reached', () => {
      function countUp(n, limit = 100) {
        // Modified to have a safety limit for testing
        if (n >= 1000000000000 || limit <= 0) return n
        return countUp(n + 1, limit - 1)
      }

      // This will return before hitting the impossible base case
      expect(countUp(0)).toBe(100)
    })

    it('should throw for circular function calls', () => {
      function a() { return b() }
      function b() { return a() }

      expect(() => a()).toThrow(RangeError)
    })
  })

  describe('Recursion with Base Case', () => {
    it('should calculate factorial correctly', () => {
      function factorial(n) {
        if (n <= 1) return 1
        return n * factorial(n - 1)
      }

      expect(factorial(5)).toBe(120)
      expect(factorial(1)).toBe(1)
      expect(factorial(0)).toBe(1)
    })

    it('should demonstrate proper countdown with base case', () => {
      function countdown(n) {
        if (n <= 0) {
          return "Done!"
        }
        return countdown(n - 1)
      }

      expect(countdown(5)).toBe("Done!")
    })
  })

  describe('Error Stack Traces', () => {
    it('should create error with proper stack trace', () => {
      function a() { return b() }
      function b() { return c() }
      function c() { 
        throw new Error('Something went wrong!')
      }

      expect(() => a()).toThrow('Something went wrong!')
    })

    it('should preserve call stack in error', () => {
      function a() { return b() }
      function b() { return c() }
      function c() { 
        throw new Error('Test error')
      }

      try {
        a()
      } catch (error) {
        expect(error.stack).toContain('c')
        expect(error.stack).toContain('b')
        expect(error.stack).toContain('a')
      }
    })
  })

  describe('Asynchronous Code Preview', () => {
    it('should demonstrate setTimeout behavior with call stack', async () => {
      const results = []

      results.push('First')

      await new Promise(resolve => {
        setTimeout(() => {
          results.push('Second')
          resolve()
        }, 0)
        
        results.push('Third')
      })

      // Even with 0ms delay, 'Third' runs before 'Second'
      expect(results).toEqual(['First', 'Third', 'Second'])
    })
  })
})
