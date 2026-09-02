import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Memoization', () => {
  // ============================================================
  // WHAT IS MEMOIZATION?
  // From memoization.mdx lines 37-58
  // ============================================================

  describe('What is Memoization?', () => {
    // From lines 37-58: Basic memoizedDouble example
    it('should cache results and return cached value on subsequent calls', () => {
      function memoizedDouble(n) {
        if (memoizedDouble.cache[n] !== undefined) {
          return memoizedDouble.cache[n]
        }
        
        const result = n * 2
        memoizedDouble.cache[n] = result
        return result
      }
      memoizedDouble.cache = {}

      // First call - calculates
      const result1 = memoizedDouble(5)
      expect(result1).toBe(10)
      expect(memoizedDouble.cache[5]).toBe(10)

      // Second call - from cache
      const result2 = memoizedDouble(5)
      expect(result2).toBe(10)

      // Different input - calculates
      const result3 = memoizedDouble(7)
      expect(result3).toBe(14)
      expect(memoizedDouble.cache[7]).toBe(14)
    })
  })

  // ============================================================
  // HOW TO BUILD A MEMOIZE FUNCTION
  // From memoization.mdx lines 94-195
  // ============================================================

  describe('How to Build a Memoize Function', () => {
    // From lines 102-114: Step 1 - Basic Structure
    describe('Step 1: Basic Structure', () => {
      it('should memoize single argument functions', () => {
        function memoize(fn) {
          const cache = new Map()
          
          return function(arg) {
            if (cache.has(arg)) {
              return cache.get(arg)
            }
            
            const result = fn(arg)
            cache.set(arg, result)
            return result
          }
        }

        let callCount = 0
        const double = memoize((n) => {
          callCount++
          return n * 2
        })

        expect(double(5)).toBe(10)
        expect(callCount).toBe(1)
        
        expect(double(5)).toBe(10)
        expect(callCount).toBe(1) // Not called again
        
        expect(double(7)).toBe(14)
        expect(callCount).toBe(2)
      })
    })

    // From lines 118-141: Step 2 - Handle Multiple Arguments
    describe('Step 2: Handle Multiple Arguments', () => {
      it('should memoize functions with multiple arguments', () => {
        function memoize(fn) {
          const cache = new Map()
          
          return function(...args) {
            const key = JSON.stringify(args)
            
            if (cache.has(key)) {
              return cache.get(key)
            }
            
            const result = fn.apply(this, args)
            cache.set(key, result)
            return result
          }
        }

        let callCount = 0
        const add = memoize((a, b) => {
          callCount++
          return a + b
        })

        expect(add(2, 3)).toBe(5)
        expect(callCount).toBe(1)
        
        expect(add(2, 3)).toBe(5)
        expect(callCount).toBe(1) // Cached
        
        expect(add(3, 2)).toBe(5)
        expect(callCount).toBe(2) // Different key: "[3,2]" vs "[2,3]"
      })
    })

    // From lines 145-162: Step 3 - Preserve this Context
    describe('Step 3: Preserve this Context', () => {
      it('should preserve this context when used as method', () => {
        function memoize(fn) {
          const cache = new Map()
          
          return function(...args) {
            const key = JSON.stringify(args)
            
            if (cache.has(key)) {
              return cache.get(key)
            }
            
            const result = fn.apply(this, args)
            cache.set(key, result)
            return result
          }
        }

        const calculator = {
          multiplier: 10,
          
          calculate: memoize(function(n) {
            return n * this.multiplier
          })
        }

        expect(calculator.calculate(5)).toBe(50)
        expect(calculator.calculate(5)).toBe(50) // Cached
      })
    })

    // From lines 166-181: Complete Implementation
    describe('Complete Implementation', () => {
      it('should work with the complete memoize function', () => {
        function memoize(fn) {
          const cache = new Map()
          
          return function memoized(...args) {
            const key = JSON.stringify(args)
            
            if (cache.has(key)) {
              return cache.get(key)
            }
            
            const result = fn.apply(this, args)
            cache.set(key, result)
            return result
          }
        }

        const multiply = memoize((a, b, c) => a * b * c)
        
        expect(multiply(2, 3, 4)).toBe(24)
        expect(multiply(2, 3, 4)).toBe(24)
        expect(multiply(1, 2, 3)).toBe(6)
      })
    })
  })

  // ============================================================
  // MEMOIZING RECURSIVE FUNCTIONS
  // From memoization.mdx lines 199-262
  // ============================================================

  describe('Memoizing Recursive Functions', () => {
    // Helper memoize function for this section
    function memoize(fn) {
      const cache = new Map()
      
      return function memoized(...args) {
        const key = JSON.stringify(args)
        
        if (cache.has(key)) {
          return cache.get(key)
        }
        
        const result = fn.apply(this, args)
        cache.set(key, result)
        return result
      }
    }

    // From lines 203-217: The Problem - Exponential Time Complexity
    describe('Naive Fibonacci', () => {
      it('should calculate fibonacci correctly (but slowly)', () => {
        function fibonacci(n) {
          if (n <= 1) return n
          return fibonacci(n - 1) + fibonacci(n - 2)
        }

        expect(fibonacci(0)).toBe(0)
        expect(fibonacci(1)).toBe(1)
        expect(fibonacci(5)).toBe(5)
        expect(fibonacci(10)).toBe(55)
      })
    })

    // From lines 221-237: The Solution - Memoized Fibonacci
    describe('Memoized Fibonacci', () => {
      it('should calculate fibonacci correctly and efficiently', () => {
        const fibonacci = memoize(function fib(n) {
          if (n <= 1) return n
          return fibonacci(n - 1) + fibonacci(n - 2)
        })

        expect(fibonacci(0)).toBe(0)
        expect(fibonacci(1)).toBe(1)
        expect(fibonacci(5)).toBe(5)
        expect(fibonacci(10)).toBe(55)
        expect(fibonacci(40)).toBe(102334155)
        expect(fibonacci(50)).toBe(12586269025)
      })

      it('should reuse cached values for larger inputs', () => {
        let callCount = 0
        
        const fibonacci = memoize(function fib(n) {
          callCount++
          if (n <= 1) return n
          return fibonacci(n - 1) + fibonacci(n - 2)
        })

        fibonacci(10)
        const callsFor10 = callCount

        callCount = 0
        fibonacci(11) // Should only need to calculate fib(11) and fib(10)
        
        // With memoization, fib(11) reuses fib(10) and fib(9) from cache
        expect(callCount).toBeLessThan(callsFor10)
      })
    })
  })

  // ============================================================
  // WHEN MEMOIZATION HELPS
  // From memoization.mdx lines 268-335
  // ============================================================

  describe('When Memoization Helps', () => {
    function memoize(fn) {
      const cache = new Map()
      return function memoized(...args) {
        const key = JSON.stringify(args)
        if (cache.has(key)) return cache.get(key)
        const result = fn.apply(this, args)
        cache.set(key, result)
        return result
      }
    }

    // From lines 277-295: Expensive Computations
    describe('Expensive Computations', () => {
      it('should benefit from caching prime calculations', () => {
        let callCount = 0
        
        const calculatePrimes = memoize(function(limit) {
          callCount++
          const primes = []
          for (let i = 2; i <= limit; i++) {
            let isPrime = true
            for (let j = 2; j <= Math.sqrt(i); j++) {
              if (i % j === 0) {
                isPrime = false
                break
              }
            }
            if (isPrime) primes.push(i)
          }
          return primes
        })

        const result1 = calculatePrimes(100)
        expect(callCount).toBe(1)
        expect(result1).toContain(2)
        expect(result1).toContain(97)

        const result2 = calculatePrimes(100)
        expect(callCount).toBe(1) // Not called again
        expect(result2).toEqual(result1)
      })
    })

    // From lines 299-314: Recursive with overlapping subproblems
    describe('Recursive Functions with Overlapping Subproblems', () => {
      it('should optimize climbStairs problem', () => {
        const climbStairs = memoize(function(n) {
          if (n <= 2) return n
          return climbStairs(n - 1) + climbStairs(n - 2)
        })

        expect(climbStairs(1)).toBe(1)
        expect(climbStairs(2)).toBe(2)
        expect(climbStairs(3)).toBe(3)
        expect(climbStairs(4)).toBe(5)
        expect(climbStairs(5)).toBe(8)
        expect(climbStairs(50)).toBe(20365011074)
      })
    })

    // From lines 340-355: Pure Functions Only
    describe('Pure Functions Only', () => {
      it('should work correctly with pure functions', () => {
        const square = memoize(n => n * n)
        
        expect(square(5)).toBe(25)
        expect(square(5)).toBe(25)
        expect(square(10)).toBe(100)
      })

      it('should demonstrate memoization failure with impure functions', () => {
        let multiplier = 2
        const multiply = memoize(n => n * multiplier)
        
        expect(multiply(5)).toBe(10)
        
        multiplier = 3
        // BUG: Still returns 10 from cache, should be 15
        expect(multiply(5)).toBe(10) // This demonstrates the problem
      })
    })
  })

  // ============================================================
  // WHEN MEMOIZATION HURTS
  // From memoization.mdx lines 345-408
  // ============================================================

  describe('When Memoization Hurts', () => {
    function memoize(fn) {
      const cache = new Map()
      return function memoized(...args) {
        const key = JSON.stringify(args)
        if (cache.has(key)) return cache.get(key)
        const result = fn.apply(this, args)
        cache.set(key, result)
        return result
      }
    }

    // From lines 361-371: Functions with Side Effects
    describe('Functions with Side Effects', () => {
      it('should skip side effects on cache hits', () => {
        const logs = []
        
        const logAndDouble = memoize(function(n) {
          logs.push(`Doubling ${n}`)
          return n * 2
        })

        expect(logAndDouble(5)).toBe(10)
        expect(logs).toEqual(['Doubling 5'])

        expect(logAndDouble(5)).toBe(10)
        // Side effect NOT executed again - this is the problem!
        expect(logs).toEqual(['Doubling 5'])
      })
    })
  })

  // ============================================================
  // WEAKMAP FOR OBJECT ARGUMENTS
  // From memoization.mdx lines 414-494
  // ============================================================

  describe('WeakMap for Object Arguments', () => {
    // From lines 416-430: Problem with JSON.stringify
    describe('JSON.stringify Problems', () => {
      it('should show that different objects with same content create same key', () => {
        const obj1 = { a: 1 }
        const obj2 = { a: 1 }
        
        expect(JSON.stringify(obj1)).toBe(JSON.stringify(obj2))
        // But they are different objects!
        expect(obj1).not.toBe(obj2)
      })
    })

    // From lines 434-456: WeakMap solution
    describe('WeakMap-based Memoization', () => {
      it('should cache based on object identity', () => {
        function memoizeWithWeakMap(fn) {
          const cache = new WeakMap()
          
          return function(obj) {
            if (cache.has(obj)) {
              return cache.get(obj)
            }
            
            const result = fn(obj)
            cache.set(obj, result)
            return result
          }
        }

        let callCount = 0
        const processUser = memoizeWithWeakMap(function(user) {
          callCount++
          return { ...user, processed: true }
        })

        const user = { name: 'Alice' }
        
        const result1 = processUser(user)
        expect(callCount).toBe(1)
        expect(result1).toEqual({ name: 'Alice', processed: true })

        const result2 = processUser(user)
        expect(callCount).toBe(1) // Same object reference - cached

        const sameData = { name: 'Alice' }
        const result3 = processUser(sameData)
        expect(callCount).toBe(2) // Different object - not cached
      })
    })

    // From lines 477-494: Hybrid approach
    describe('Hybrid Approach', () => {
      it('should handle both primitives and objects', () => {
        function memoizeHybrid(fn) {
          const primitiveCache = new Map()
          const objectCache = new WeakMap()
          
          return function(arg) {
            const cache = typeof arg === 'object' && arg !== null 
              ? objectCache 
              : primitiveCache
            
            if (cache.has(arg)) {
              return cache.get(arg)
            }
            
            const result = fn(arg)
            cache.set(arg, result)
            return result
          }
        }

        let callCount = 0
        const process = memoizeHybrid((val) => {
          callCount++
          return typeof val === 'object' ? { ...val, processed: true } : val * 2
        })

        // Primitive handling
        expect(process(5)).toBe(10)
        expect(callCount).toBe(1)
        expect(process(5)).toBe(10)
        expect(callCount).toBe(1) // Cached

        // Object handling
        const obj = { x: 1 }
        process(obj)
        expect(callCount).toBe(2)
        process(obj)
        expect(callCount).toBe(2) // Cached
      })
    })
  })

  // ============================================================
  // COMMON MEMOIZATION MISTAKES
  // From memoization.mdx lines 500-575
  // ============================================================

  describe('Common Memoization Mistakes', () => {
    function memoize(fn) {
      const cache = new Map()
      return function memoized(...args) {
        const key = JSON.stringify(args)
        if (cache.has(key)) return cache.get(key)
        const result = fn.apply(this, args)
        cache.set(key, result)
        return result
      }
    }

    // From lines 504-523: Mistake 1 - Memoizing Impure Functions
    describe('Mistake 1: Memoizing Impure Functions', () => {
      it('should demonstrate correct approach - make dependency an argument', () => {
        const calculateTax = memoize(function(price, rate) {
          return price * rate
        })

        expect(calculateTax(100, 0.08)).toBe(8)
        expect(calculateTax(100, 0.10)).toBe(10)
        // Different rates = different cache keys = correct results
      })
    })

    // From lines 527-542: Mistake 2 - Argument Order Matters
    describe('Mistake 2: Forgetting Argument Order Matters', () => {
      it('should create different cache entries for different argument order', () => {
        let callCount = 0
        const add = memoize((a, b) => {
          callCount++
          return a + b
        })

        add(1, 2)
        expect(callCount).toBe(1)
        
        add(2, 1) // Different key: "[2,1]" vs "[1,2]"
        expect(callCount).toBe(2) // Calculates again even though result is same
      })

      it('should handle commutative operations with sorted keys', () => {
        function memoizeCommutative(fn) {
          const cache = new Map()
          
          return function(...args) {
            const key = JSON.stringify(args.slice().sort())
            if (cache.has(key)) return cache.get(key)
            const result = fn.apply(this, args)
            cache.set(key, result)
            return result
          }
        }

        let callCount = 0
        const add = memoizeCommutative((a, b) => {
          callCount++
          return a + b
        })

        add(1, 2)
        expect(callCount).toBe(1)
        
        add(2, 1) // Same sorted key: "[1,2]"
        expect(callCount).toBe(1) // Uses cache
      })
    })

    // From lines 546-567: Mistake 3 - Not Handling this Context
    describe('Mistake 3: Not Handling this Context', () => {
      it('should fail without proper this handling', () => {
        function badMemoize(fn) {
          const cache = new Map()
          return function(...args) {
            const key = JSON.stringify(args)
            if (cache.has(key)) return cache.get(key)
            const result = fn(...args) // 'this' is lost!
            cache.set(key, result)
            return result
          }
        }

        const obj = {
          value: 10,
          compute: badMemoize(function(n) {
            return n * this.value
          })
        }

        // This will fail or return NaN because 'this' is not the object
        expect(() => obj.compute(5)).toThrow()
      })

      it('should work with proper this handling', () => {
        function goodMemoize(fn) {
          const cache = new Map()
          return function(...args) {
            const key = JSON.stringify(args)
            if (cache.has(key)) return cache.get(key)
            const result = fn.apply(this, args) // 'this' preserved
            cache.set(key, result)
            return result
          }
        }

        const obj = {
          value: 10,
          compute: goodMemoize(function(n) {
            return n * this.value
          })
        }

        expect(obj.compute(5)).toBe(50)
      })
    })

    // From lines 571-587: Mistake 4 - Recursive Function References Wrong Version
    describe('Mistake 4: Recursive Function References Wrong Version', () => {
      it('should reference the memoized version in recursive calls', () => {
        let callCount = 0
        
        // CORRECT: References 'factorial' (the memoized version)
        const factorial = memoize(function(n) {
          callCount++
          if (n <= 1) return 1
          return n * factorial(n - 1)
        })

        expect(factorial(5)).toBe(120)
        const callsFor5 = callCount

        callCount = 0
        expect(factorial(6)).toBe(720)
        // Should only call factorial(6) since 5! is cached
        expect(callCount).toBe(1)
      })
    })
  })

  // ============================================================
  // ADVANCED: LRU CACHE FOR BOUNDED MEMORY
  // From memoization.mdx lines 595-630
  // ============================================================

  describe('Advanced: LRU Cache', () => {
    // From lines 599-626: LRU Cache Implementation
    it('should evict least recently used entries when at capacity', () => {
      function memoizeLRU(fn, maxSize = 3) {
        const cache = new Map()
        
        return function(...args) {
          const key = JSON.stringify(args)
          
          if (cache.has(key)) {
            // Move to end (most recently used)
            const value = cache.get(key)
            cache.delete(key)
            cache.set(key, value)
            return value
          }
          
          const result = fn.apply(this, args)
          
          // Evict oldest entry if at capacity
          if (cache.size >= maxSize) {
            const oldestKey = cache.keys().next().value
            cache.delete(oldestKey)
          }
          
          cache.set(key, result)
          return result
        }
      }

      let callCount = 0
      const double = memoizeLRU((n) => {
        callCount++
        return n * 2
      }, 3)

      // Fill cache
      double(1) // cache: [1]
      double(2) // cache: [1, 2]
      double(3) // cache: [1, 2, 3]
      expect(callCount).toBe(3)

      // Access cached value
      double(1) // cache: [2, 3, 1] (1 moved to end)
      expect(callCount).toBe(3)

      // Add new value, evicts oldest (2)
      double(4) // cache: [3, 1, 4]
      expect(callCount).toBe(4)

      // 2 was evicted, needs recalculation
      double(2) // cache: [1, 4, 2]
      expect(callCount).toBe(5)

      // 1 is still cached
      double(1)
      expect(callCount).toBe(5)
    })
  })
})
