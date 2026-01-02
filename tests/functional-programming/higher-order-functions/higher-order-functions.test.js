import { describe, it, expect, vi } from 'vitest'

describe('Higher-Order Functions', () => {
  describe('Functions that accept functions as arguments', () => {
    it('should execute the passed function', () => {
      const mockFn = vi.fn()
      
      function doTwice(action) {
        action()
        action()
      }
      
      doTwice(mockFn)
      
      expect(mockFn).toHaveBeenCalledTimes(2)
    })

    it('should repeat an action n times', () => {
      const results = []
      
      function repeat(times, action) {
        for (let i = 0; i < times; i++) {
          action(i)
        }
      }
      
      repeat(5, i => results.push(i))
      
      expect(results).toEqual([0, 1, 2, 3, 4])
    })

    it('should apply different logic with the same structure', () => {
      function calculate(numbers, operation) {
        const result = []
        for (const num of numbers) {
          result.push(operation(num))
        }
        return result
      }
      
      const numbers = [1, 2, 3, 4, 5]
      
      const doubled = calculate(numbers, n => n * 2)
      const squared = calculate(numbers, n => n * n)
      const incremented = calculate(numbers, n => n + 1)
      
      expect(doubled).toEqual([2, 4, 6, 8, 10])
      expect(squared).toEqual([1, 4, 9, 16, 25])
      expect(incremented).toEqual([2, 3, 4, 5, 6])
    })

    it('should implement unless as a control flow abstraction', () => {
      const results = []
      
      function unless(condition, action) {
        if (!condition) {
          action()
        }
      }
      
      for (let i = 0; i < 5; i++) {
        unless(i % 2 === 1, () => results.push(i))
      }
      
      expect(results).toEqual([0, 2, 4])
    })

    it('should calculate circle properties using formulas', () => {
      function calculate(radii, formula) {
        const result = []
        for (const radius of radii) {
          result.push(formula(radius))
        }
        return result
      }
      
      const area = r => Math.PI * r * r
      const circumference = r => 2 * Math.PI * r
      const diameter = r => 2 * r
      const volume = r => (4/3) * Math.PI * r * r * r
      
      const radii = [1, 2, 3]
      
      // Test area: π * r²
      const areas = calculate(radii, area)
      expect(areas[0]).toBeCloseTo(Math.PI, 5)           // π * 1² = π
      expect(areas[1]).toBeCloseTo(4 * Math.PI, 5)       // π * 2² = 4π
      expect(areas[2]).toBeCloseTo(9 * Math.PI, 5)       // π * 3² = 9π
      
      // Test circumference: 2πr
      const circumferences = calculate(radii, circumference)
      expect(circumferences[0]).toBeCloseTo(2 * Math.PI, 5)     // 2π * 1
      expect(circumferences[1]).toBeCloseTo(4 * Math.PI, 5)     // 2π * 2
      expect(circumferences[2]).toBeCloseTo(6 * Math.PI, 5)     // 2π * 3
      
      // Test diameter: 2r
      const diameters = calculate(radii, diameter)
      expect(diameters).toEqual([2, 4, 6])
      
      // Test volume: (4/3)πr³
      const volumes = calculate(radii, volume)
      expect(volumes[0]).toBeCloseTo((4/3) * Math.PI, 5)        // (4/3)π * 1³
      expect(volumes[1]).toBeCloseTo((4/3) * Math.PI * 8, 5)    // (4/3)π * 2³
      expect(volumes[2]).toBeCloseTo((4/3) * Math.PI * 27, 5)   // (4/3)π * 3³
    })
  })

  describe('Functions that return functions', () => {
    it('should create a greaterThan comparator', () => {
      function greaterThan(n) {
        return function(m) {
          return m > n
        }
      }
      
      const greaterThan10 = greaterThan(10)
      const greaterThan100 = greaterThan(100)
      
      expect(greaterThan10(11)).toBe(true)
      expect(greaterThan10(5)).toBe(false)
      expect(greaterThan10(10)).toBe(false)
      expect(greaterThan100(150)).toBe(true)
      expect(greaterThan100(50)).toBe(false)
    })

    it('should create multiplier functions', () => {
      function multiplier(factor) {
        return number => number * factor
      }
      
      const double = multiplier(2)
      const triple = multiplier(3)
      const tenX = multiplier(10)
      
      expect(double(5)).toBe(10)
      expect(triple(5)).toBe(15)
      expect(tenX(5)).toBe(50)
      expect(double(0)).toBe(0)
      expect(triple(-3)).toBe(-9)
    })

    it('should wrap functions with logging behavior', () => {
      const logs = []
      
      function noisy(fn) {
        return function(...args) {
          logs.push({ type: 'call', args })
          const result = fn(...args)
          logs.push({ type: 'return', result })
          return result
        }
      }
      
      const noisyMax = noisy(Math.max)
      const result = noisyMax(3, 1, 4, 1, 5)
      
      expect(result).toBe(5)
      expect(logs).toEqual([
        { type: 'call', args: [3, 1, 4, 1, 5] },
        { type: 'return', result: 5 }
      ])
    })

    it('should wrap Math.floor with noisy', () => {
      const logs = []
      
      function noisy(fn) {
        return function(...args) {
          logs.push({ type: 'call', args })
          const result = fn(...args)
          logs.push({ type: 'return', result })
          return result
        }
      }
      
      const noisyFloor = noisy(Math.floor)
      const result = noisyFloor(4.7)
      
      expect(result).toBe(4)
      expect(logs).toEqual([
        { type: 'call', args: [4.7] },
        { type: 'return', result: 4 }
      ])
    })

    it('should create greeting functions with createGreeter', () => {
      function createGreeter(greeting) {
        return function(name) {
          return `${greeting}, ${name}!`
        }
      }
      
      const sayHello = createGreeter('Hello')
      const sayGoodbye = createGreeter('Goodbye')
      
      expect(sayHello('Alice')).toBe('Hello, Alice!')
      expect(sayHello('Bob')).toBe('Hello, Bob!')
      expect(sayGoodbye('Alice')).toBe('Goodbye, Alice!')
    })

    it('should allow direct factory invocation', () => {
      function multiplier(factor) {
        return number => number * factor
      }
      
      // Direct invocation without storing intermediate function
      expect(multiplier(7)(3)).toBe(21)
      expect(multiplier(2)(10)).toBe(20)
      expect(multiplier(0.5)(100)).toBe(50)
    })
  })

  describe('Function factories', () => {
    it('should create validator functions', () => {
      function createValidator(min, max) {
        return function(value) {
          return value >= min && value <= max
        }
      }
      
      const isValidAge = createValidator(0, 120)
      const isValidPercentage = createValidator(0, 100)
      
      expect(isValidAge(25)).toBe(true)
      expect(isValidAge(150)).toBe(false)
      expect(isValidAge(-5)).toBe(false)
      expect(isValidPercentage(50)).toBe(true)
      expect(isValidPercentage(101)).toBe(false)
    })

    it('should create formatter functions', () => {
      function createFormatter(prefix, suffix) {
        return function(value) {
          return `${prefix}${value}${suffix}`
        }
      }
      
      const formatDollars = createFormatter('$', '')
      const formatPercent = createFormatter('', '%')
      const formatParens = createFormatter('(', ')')
      
      expect(formatDollars(99.99)).toBe('$99.99')
      expect(formatPercent(75)).toBe('75%')
      expect(formatParens('aside')).toBe('(aside)')
    })

    it('should implement partial application', () => {
      function partial(fn, ...presetArgs) {
        return function(...laterArgs) {
          return fn(...presetArgs, ...laterArgs)
        }
      }
      
      function greet(greeting, punctuation, name) {
        return `${greeting}, ${name}${punctuation}`
      }
      
      const sayHello = partial(greet, 'Hello', '!')
      const askHowAreYou = partial(greet, 'How are you', '?')
      
      expect(sayHello('Alice')).toBe('Hello, Alice!')
      expect(sayHello('Bob')).toBe('Hello, Bob!')
      expect(askHowAreYou('Charlie')).toBe('How are you, Charlie?')
    })

    it('should create rating validator', () => {
      function createValidator(min, max) {
        return function(value) {
          return value >= min && value <= max
        }
      }
      
      // Rating from 1 to 5 stars
      const isValidRating = createValidator(1, 5)
      
      expect(isValidRating(3)).toBe(true)
      expect(isValidRating(1)).toBe(true)    // At min
      expect(isValidRating(5)).toBe(true)    // At max
      expect(isValidRating(0)).toBe(false)   // Below min
      expect(isValidRating(6)).toBe(false)   // Above max
    })
  })

  describe('Closures with higher-order functions', () => {
    it('should create independent counters', () => {
      function createCounter(start = 0) {
        let count = start
        return function() {
          count++
          return count
        }
      }
      
      const counter1 = createCounter()
      const counter2 = createCounter(100)
      
      expect(counter1()).toBe(1)
      expect(counter1()).toBe(2)
      expect(counter1()).toBe(3)
      
      expect(counter2()).toBe(101)
      expect(counter2()).toBe(102)
      
      // counter1 should not be affected by counter2
      expect(counter1()).toBe(4)
    })

    it('should create private state with closures', () => {
      function createBankAccount(initialBalance) {
        let balance = initialBalance
        
        return {
          deposit(amount) {
            if (amount > 0) {
              balance += amount
              return balance
            }
            return balance
          },
          withdraw(amount) {
            if (amount > 0 && amount <= balance) {
              balance -= amount
              return balance
            }
            return 'Insufficient funds'
          },
          getBalance() {
            return balance
          }
        }
      }
      
      const account = createBankAccount(100)
      
      expect(account.getBalance()).toBe(100)
      expect(account.deposit(50)).toBe(150)
      expect(account.withdraw(30)).toBe(120)
      expect(account.withdraw(200)).toBe('Insufficient funds')
      expect(account.getBalance()).toBe(120)
      
      // balance is not directly accessible
      expect(account.balance).toBeUndefined()
    })
  })

  describe('Common mistakes', () => {
    it('should demonstrate the parseInt gotcha with map', () => {
      // This is the WRONG way - demonstrates the bug
      const buggyResult = ['1', '2', '3'].map(parseInt)
      
      // parseInt receives (string, index) from map
      // parseInt('1', 0) → 1 (radix 0 is treated as 10)
      // parseInt('2', 1) → NaN (radix 1 is invalid)
      // parseInt('3', 2) → NaN (3 is not valid in binary)
      expect(buggyResult).toEqual([1, NaN, NaN])
      
      // The CORRECT way
      const correctResult = ['1', '2', '3'].map(str => parseInt(str, 10))
      expect(correctResult).toEqual([1, 2, 3])
      
      // Alternative correct way using Number
      const alternativeResult = ['1', '2', '3'].map(Number)
      expect(alternativeResult).toEqual([1, 2, 3])
    })

    it('should demonstrate losing this context', () => {
      const user = {
        name: 'Alice',
        greet() {
          // Using optional chaining to handle undefined 'this' safely
          return `Hello, I'm ${this?.name ?? 'undefined'}`
        }
      }
      
      // Direct call works
      expect(user.greet()).toBe("Hello, I'm Alice")
      
      // Passing as callback loses 'this'
      function callLater(fn) {
        return fn()
      }
      
      // This fails because 'this' is lost (undefined in strict mode)
      const lostThis = callLater(user.greet)
      expect(lostThis).toBe("Hello, I'm undefined")
      
      // Fix with bind
      const boundGreet = callLater(user.greet.bind(user))
      expect(boundGreet).toBe("Hello, I'm Alice")
      
      // Fix with arrow function wrapper
      const wrappedGreet = callLater(() => user.greet())
      expect(wrappedGreet).toBe("Hello, I'm Alice")
    })

    it('should show difference between map and forEach return values', () => {
      const numbers = [1, 2, 3]
      
      // map returns a new array
      const mapResult = numbers.map(n => n * 2)
      expect(mapResult).toEqual([2, 4, 6])
      
      // forEach returns undefined
      const forEachResult = numbers.forEach(n => n * 2)
      expect(forEachResult).toBeUndefined()
    })
  })

  describe('First-class functions', () => {
    it('should allow assigning functions to variables', () => {
      const greet = function(name) {
        return `Hello, ${name}!`
      }
      
      const add = (a, b) => a + b
      
      expect(greet('Alice')).toBe('Hello, Alice!')
      expect(add(2, 3)).toBe(5)
    })

    it('should allow passing functions as arguments', () => {
      function callWith5(fn) {
        return fn(5)
      }
      
      expect(callWith5(n => n * 2)).toBe(10)
      expect(callWith5(n => n + 3)).toBe(8)
      expect(callWith5(Math.sqrt)).toBeCloseTo(2.236, 2)
    })

    it('should allow returning functions from functions', () => {
      function createAdder(x) {
        return function(y) {
          return x + y
        }
      }
      
      const add5 = createAdder(5)
      const add10 = createAdder(10)
      
      expect(add5(3)).toBe(8)
      expect(add10(3)).toBe(13)
    })
  })

  describe('Built-in higher-order functions (overview)', () => {
    const numbers = [1, 2, 3, 4, 5]

    it('should use forEach for side effects', () => {
      const results = []
      const returnValue = numbers.forEach(n => results.push(n * 2))
      
      expect(results).toEqual([2, 4, 6, 8, 10])
      expect(returnValue).toBeUndefined()
    })

    it('should use map for transformations', () => {
      const doubled = numbers.map(n => n * 2)
      
      expect(doubled).toEqual([2, 4, 6, 8, 10])
      expect(numbers).toEqual([1, 2, 3, 4, 5]) // Original unchanged
    })

    it('should use filter for selection', () => {
      const evens = numbers.filter(n => n % 2 === 0)
      const greaterThan3 = numbers.filter(n => n > 3)
      
      expect(evens).toEqual([2, 4])
      expect(greaterThan3).toEqual([4, 5])
    })

    it('should use reduce for accumulation', () => {
      const sum = numbers.reduce((acc, n) => acc + n, 0)
      const product = numbers.reduce((acc, n) => acc * n, 1)
      
      expect(sum).toBe(15)
      expect(product).toBe(120)
    })

    it('should use find to get first matching element', () => {
      const firstEven = numbers.find(n => n % 2 === 0)
      const firstGreaterThan10 = numbers.find(n => n > 10)
      
      expect(firstEven).toBe(2)
      expect(firstGreaterThan10).toBeUndefined()
    })

    it('should use some to test if any element matches', () => {
      const hasEven = numbers.some(n => n % 2 === 0)
      const hasNegative = numbers.some(n => n < 0)
      
      expect(hasEven).toBe(true)
      expect(hasNegative).toBe(false)
    })

    it('should use every to test if all elements match', () => {
      const allPositive = numbers.every(n => n > 0)
      const allEven = numbers.every(n => n % 2 === 0)
      
      expect(allPositive).toBe(true)
      expect(allEven).toBe(false)
    })

    it('should use sort with a comparator function', () => {
      const unsorted = [3, 1, 4, 1, 5, 9, 2, 6]
      
      // Ascending order
      const ascending = [...unsorted].sort((a, b) => a - b)
      expect(ascending).toEqual([1, 1, 2, 3, 4, 5, 6, 9])
      
      // Descending order
      const descending = [...unsorted].sort((a, b) => b - a)
      expect(descending).toEqual([9, 6, 5, 4, 3, 2, 1, 1])
    })
  })
})
