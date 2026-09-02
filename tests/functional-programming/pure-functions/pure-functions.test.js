import { describe, it, expect } from 'vitest'

describe('Pure Functions', () => {
  describe('Rule 1: Same Input → Same Output', () => {
    it('should always return the same result for the same inputs', () => {
      // Pure function: deterministic
      function add(a, b) {
        return a + b
      }

      expect(add(2, 3)).toBe(5)
      expect(add(2, 3)).toBe(5)
      expect(add(2, 3)).toBe(5)
      // Always 5, no matter how many times we call it
    })

    it('should demonstrate Math.max as a pure function', () => {
      // Math.max is pure: same inputs always give same output
      expect(Math.max(2, 8, 5)).toBe(8)
      expect(Math.max(2, 8, 5)).toBe(8)
      expect(Math.max(-1, -5, -2)).toBe(-1)
    })

    it('should show how external state breaks purity', () => {
      // Impure: depends on external state
      let taxRate = 0.08

      function calculateTotalImpure(price) {
        return price + price * taxRate
      }

      expect(calculateTotalImpure(100)).toBe(108)

      // Changing external state changes the result
      taxRate = 0.10
      expect(calculateTotalImpure(100)).toBe(110) // Different!

      // Pure version: all dependencies are parameters
      function calculateTotalPure(price, rate) {
        return price + price * rate
      }

      expect(calculateTotalPure(100, 0.08)).toBe(108)
      expect(calculateTotalPure(100, 0.08)).toBe(108) // Always the same
      expect(calculateTotalPure(100, 0.10)).toBe(110) // Different input = different output (that's fine)
    })

    it('should demonstrate that Math.random makes functions impure', () => {
      // ❌ IMPURE: Output depends on randomness
      function randomDouble(x) {
        return x * Math.random()
      }

      // Same input but (almost certainly) different outputs
      const results = new Set()
      for (let i = 0; i < 10; i++) {
        results.add(randomDouble(5))
      }

      // With random, we get multiple different results for the same input
      expect(results.size).toBeGreaterThan(1)
    })

    it('should demonstrate that Date makes functions impure', () => {
      // ❌ IMPURE: Output depends on when you call it
      function getGreeting(name) {
        const hour = new Date().getHours()
        if (hour < 12) return `Good morning, ${name}`
        return `Good afternoon, ${name}`
      }

      // The function works, but its output depends on external state (time)
      const result = getGreeting('Alice')
      expect(result).toMatch(/Good (morning|afternoon), Alice/)

      // To make it pure, pass the hour as a parameter
      function getGreetingPure(name, hour) {
        if (hour < 12) return `Good morning, ${name}`
        return `Good afternoon, ${name}`
      }

      // Now it's deterministic
      expect(getGreetingPure('Alice', 9)).toBe('Good morning, Alice')
      expect(getGreetingPure('Alice', 9)).toBe('Good morning, Alice') // Always same
      expect(getGreetingPure('Alice', 14)).toBe('Good afternoon, Alice')
    })
  })

  describe('Rule 2: No Side Effects', () => {
    it('should demonstrate addToTotal impure pattern from docs', () => {
      // ❌ IMPURE: Breaks rule 2 (has a side effect)
      let total = 0

      function addToTotal(x) {
        total += x // Modifies external variable!
        return total
      }

      expect(addToTotal(5)).toBe(5)
      expect(addToTotal(5)).toBe(10) // Different result because total changed
      expect(addToTotal(5)).toBe(15) // Keeps changing!

      // The function modifies external state, making it impure
      expect(total).toBe(15)
    })

    it('should demonstrate mutation as a side effect', () => {
      // Impure: mutates the input
      function addItemImpure(cart, item) {
        cart.push(item)
        return cart
      }

      const myCart = ['apple', 'banana']
      const result = addItemImpure(myCart, 'orange')

      expect(myCart).toEqual(['apple', 'banana', 'orange']) // Original mutated!
      expect(result).toBe(myCart) // Same reference
    })

    it('should show pure alternative that returns new array', () => {
      // Pure: returns new array, original unchanged
      function addItemPure(cart, item) {
        return [...cart, item]
      }

      const myCart = ['apple', 'banana']
      const newCart = addItemPure(myCart, 'orange')

      expect(myCart).toEqual(['apple', 'banana']) // Original unchanged!
      expect(newCart).toEqual(['apple', 'banana', 'orange'])
      expect(myCart).not.toBe(newCart) // Different references
    })

    it('should demonstrate external variable modification as a side effect', () => {
      let counter = 0

      // Impure: modifies external variable
      function incrementImpure() {
        counter++
        return counter
      }

      expect(incrementImpure()).toBe(1)
      expect(incrementImpure()).toBe(2) // Different result for same (no) input!
      expect(incrementImpure()).toBe(3)

      // Pure alternative
      function incrementPure(value) {
        return value + 1
      }

      expect(incrementPure(0)).toBe(1)
      expect(incrementPure(0)).toBe(1) // Always the same
      expect(incrementPure(5)).toBe(6)
    })

    it('should demonstrate processUser impure vs pure from docs', () => {
      // ❌ IMPURE: Multiple side effects
      let userCount = 0
      const loginTime = new Date('2025-01-01T10:00:00')

      function processUserImpure(user) {
        user.lastLogin = loginTime // Side effect: mutates input
        userCount++ // Side effect: modifies external variable
        return user
      }

      const user1 = { name: 'Alice' }
      const result1 = processUserImpure(user1)

      expect(user1.lastLogin).toEqual(loginTime) // Original mutated!
      expect(userCount).toBe(1) // External state changed!
      expect(result1).toBe(user1) // Same reference

      // ✓ PURE: Returns new data, no side effects
      function processUserPure(user, loginTime) {
        return {
          ...user,
          lastLogin: loginTime
        }
      }

      const user2 = { name: 'Bob' }
      const result2 = processUserPure(user2, loginTime)

      expect(user2.lastLogin).toBe(undefined) // Original unchanged!
      expect(result2.lastLogin).toEqual(loginTime)
      expect(result2).not.toBe(user2) // Different reference
      expect(result2.name).toBe('Bob')
    })
  })

  describe('Identifying Pure vs Impure Functions', () => {
    it('should identify pure mathematical functions', () => {
      function double(x) {
        return x * 2
      }

      function square(x) {
        return x * x
      }

      function hypotenuse(a, b) {
        return Math.sqrt(a * a + b * b)
      }

      // All pure: same inputs always give same outputs
      expect(double(5)).toBe(10)
      expect(square(4)).toBe(16)
      expect(hypotenuse(3, 4)).toBe(5)
    })

    it('should identify pure string functions', () => {
      function formatName(name) {
        return name.trim().toLowerCase()
      }

      function greet(name, greeting) {
        return `${greeting}, ${name}!`
      }

      expect(formatName('  ALICE  ')).toBe('alice')
      expect(formatName('  ALICE  ')).toBe('alice') // Same result
      expect(greet('Bob', 'Hello')).toBe('Hello, Bob!')
    })

    it('should identify pure validation functions', () => {
      function isValidEmail(email) {
        return email.includes('@') && email.includes('.')
      }

      function isPositive(num) {
        return num > 0
      }

      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('invalid')).toBe(false)
      expect(isPositive(5)).toBe(true)
      expect(isPositive(-3)).toBe(false)
    })
  })

  describe('Immutable Object Patterns', () => {
    it('should update object properties without mutation', () => {
      const user = { name: 'Alice', age: 25 }

      // Pure: returns new object
      function updateAge(user, newAge) {
        return { ...user, age: newAge }
      }

      const updatedUser = updateAge(user, 26)

      expect(user.age).toBe(25) // Original unchanged
      expect(updatedUser.age).toBe(26)
      expect(user).not.toBe(updatedUser)
    })

    it('should add properties without mutation', () => {
      const product = { name: 'Widget', price: 10 }

      function addDiscount(product, discount) {
        return { ...product, discount }
      }

      const discountedProduct = addDiscount(product, 0.1)

      expect(product.discount).toBe(undefined) // Original unchanged
      expect(discountedProduct.discount).toBe(0.1)
    })

    it('should remove properties without mutation', () => {
      const user = { name: 'Alice', age: 25, password: 'secret' }

      function removePassword(user) {
        const { password, ...rest } = user
        return rest
      }

      const safeUser = removePassword(user)

      expect(user.password).toBe('secret') // Original unchanged
      expect(safeUser.password).toBe(undefined)
      expect(safeUser).toEqual({ name: 'Alice', age: 25 })
    })
  })

  describe('Immutable Array Patterns', () => {
    it('should add items without mutation', () => {
      const todos = ['Learn JS', 'Build app']

      // Pure: returns new array
      function addTodo(todos, newTodo) {
        return [...todos, newTodo]
      }

      const newTodos = addTodo(todos, 'Deploy')

      expect(todos).toEqual(['Learn JS', 'Build app']) // Original unchanged
      expect(newTodos).toEqual(['Learn JS', 'Build app', 'Deploy'])
    })

    it('should remove items without mutation', () => {
      const numbers = [1, 2, 3, 4, 5]

      // Pure: filter creates new array
      function removeItem(arr, index) {
        return arr.filter((_, i) => i !== index)
      }

      const result = removeItem(numbers, 2) // Remove item at index 2

      expect(numbers).toEqual([1, 2, 3, 4, 5]) // Original unchanged
      expect(result).toEqual([1, 2, 4, 5])
    })

    it('should update items without mutation', () => {
      const todos = [
        { id: 1, text: 'Learn JS', done: false },
        { id: 2, text: 'Build app', done: false }
      ]

      function completeTodo(todos, id) {
        return todos.map((todo) => (todo.id === id ? { ...todo, done: true } : todo))
      }

      const updated = completeTodo(todos, 1)

      expect(todos[0].done).toBe(false) // Original unchanged
      expect(updated[0].done).toBe(true)
      expect(updated[1].done).toBe(false)
    })

    it('should sort without mutation using spread', () => {
      const numbers = [3, 1, 4, 1, 5, 9, 2, 6]

      // Impure: sort mutates the original
      function sortImpure(arr) {
        return arr.sort((a, b) => a - b)
      }

      // Pure: copy first
      function sortPure(arr) {
        return [...arr].sort((a, b) => a - b)
      }

      const sorted = sortPure(numbers)

      expect(numbers).toEqual([3, 1, 4, 1, 5, 9, 2, 6]) // Original unchanged
      expect(sorted).toEqual([1, 1, 2, 3, 4, 5, 6, 9])
    })

    it('should use toSorted for non-mutating sort (ES2023)', () => {
      const numbers = [3, 1, 4, 1, 5]

      const sorted = numbers.toSorted((a, b) => a - b)

      expect(numbers).toEqual([3, 1, 4, 1, 5]) // Original unchanged
      expect(sorted).toEqual([1, 1, 3, 4, 5])
    })

    it('should use toReversed for non-mutating reverse (ES2023)', () => {
      const letters = ['a', 'b', 'c', 'd']

      const reversed = letters.toReversed()

      expect(letters).toEqual(['a', 'b', 'c', 'd']) // Original unchanged
      expect(reversed).toEqual(['d', 'c', 'b', 'a'])
    })
  })

  describe('Deep Copy for Nested Objects', () => {
    it('should demonstrate shallow copy problem with nested objects', () => {
      const user = {
        name: 'Alice',
        address: { city: 'NYC', zip: '10001' }
      }

      // Shallow copy - nested object is shared!
      const shallowCopy = { ...user }

      shallowCopy.address.city = 'LA'

      expect(user.address.city).toBe('LA') // Original changed!
    })

    it('should use structuredClone for deep copy', () => {
      const user = {
        name: 'Alice',
        address: { city: 'NYC', zip: '10001' }
      }

      const deepCopy = structuredClone(user)

      deepCopy.address.city = 'LA'

      expect(user.address.city).toBe('NYC') // Original unchanged!
      expect(deepCopy.address.city).toBe('LA')
    })

    it('should safely update nested properties in pure function', () => {
      const user = {
        name: 'Alice',
        address: { city: 'NYC', zip: '10001' }
      }

      // Pure function using structuredClone
      function updateCity(user, newCity) {
        const copy = structuredClone(user)
        copy.address.city = newCity
        return copy
      }

      // Alternative: spread at each level
      function updateCitySpread(user, newCity) {
        return {
          ...user,
          address: {
            ...user.address,
            city: newCity
          }
        }
      }

      const updated1 = updateCity(user, 'LA')
      const updated2 = updateCitySpread(user, 'Boston')

      expect(user.address.city).toBe('NYC') // Original unchanged
      expect(updated1.address.city).toBe('LA')
      expect(updated2.address.city).toBe('Boston')
    })
  })

  describe('Common Mistakes', () => {
    it('should avoid mutating function parameters', () => {
      // Bad: mutates the parameter
      function processUserBad(user) {
        user.processed = true
        user.name = user.name.toUpperCase()
        return user
      }

      // Good: returns new object
      function processUserGood(user) {
        return {
          ...user,
          processed: true,
          name: user.name.toUpperCase()
        }
      }

      const user = { name: 'alice', age: 25 }

      const result = processUserGood(user)

      expect(user.processed).toBe(undefined) // Original unchanged
      expect(user.name).toBe('alice')
      expect(result.processed).toBe(true)
      expect(result.name).toBe('ALICE')
    })

    it('should avoid relying on external mutable state', () => {
      // Bad: relies on external config
      const config = { multiplier: 2 }

      function calculateBad(value) {
        return value * config.multiplier
      }

      // Good: config passed as parameter
      function calculateGood(value, multiplier) {
        return value * multiplier
      }

      expect(calculateGood(5, 2)).toBe(10)
      expect(calculateGood(5, 2)).toBe(10) // Always predictable
    })

    it('should be careful with array methods that mutate', () => {
      const numbers = [3, 1, 2]

      // These methods MUTATE the original array:
      // sort(), reverse(), splice(), push(), pop(), shift(), unshift(), fill()

      // Safe alternatives:
      const sorted = [...numbers].sort((a, b) => a - b) // Copy first
      const reversed = [...numbers].reverse() // Copy first
      const withNew = [...numbers, 4] // Spread instead of push

      expect(numbers).toEqual([3, 1, 2]) // Original unchanged
      expect(sorted).toEqual([1, 2, 3])
      expect(reversed).toEqual([2, 1, 3])
      expect(withNew).toEqual([3, 1, 2, 4])
    })
  })

  describe('Practical Pure Function Examples', () => {
    it('should calculate shopping cart total purely', () => {
      function calculateTotal(items, taxRate) {
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const tax = subtotal * taxRate
        return {
          subtotal,
          tax,
          total: subtotal + tax
        }
      }

      const items = [
        { name: 'Widget', price: 10, quantity: 2 },
        { name: 'Gadget', price: 25, quantity: 1 }
      ]

      const result = calculateTotal(items, 0.08)

      expect(result.subtotal).toBe(45)
      expect(result.tax).toBeCloseTo(3.6)
      expect(result.total).toBeCloseTo(48.6)

      // Original items unchanged
      expect(items[0].name).toBe('Widget')
    })

    it('should filter and transform data purely', () => {
      function getActiveUserNames(users) {
        return users.filter((user) => user.active).map((user) => user.name.toLowerCase())
      }

      const users = [
        { name: 'ALICE', active: true },
        { name: 'BOB', active: false },
        { name: 'CHARLIE', active: true }
      ]

      const result = getActiveUserNames(users)

      expect(result).toEqual(['alice', 'charlie'])
      expect(users[0].name).toBe('ALICE') // Original unchanged
    })

    it('should compose pure functions', () => {
      const trim = (str) => str.trim()
      const toLowerCase = (str) => str.toLowerCase()
      const removeSpaces = (str) => str.replace(/\s+/g, '-')

      function slugify(title) {
        return removeSpaces(toLowerCase(trim(title)))
      }

      expect(slugify('  Hello World  ')).toBe('hello-world')
      expect(slugify('  JavaScript Is Fun  ')).toBe('javascript-is-fun')
    })

    it('should validate data purely', () => {
      function validateUser(user) {
        const errors = []

        if (!user.name || user.name.length < 2) {
          errors.push('Name must be at least 2 characters')
        }

        if (!user.email || !user.email.includes('@')) {
          errors.push('Valid email is required')
        }

        if (!user.age || user.age < 0) {
          errors.push('Age must be a positive number')
        }

        return {
          isValid: errors.length === 0,
          errors
        }
      }

      const validUser = { name: 'Alice', email: 'alice@example.com', age: 25 }
      const invalidUser = { name: 'A', email: 'invalid', age: -5 }

      expect(validateUser(validUser).isValid).toBe(true)
      expect(validateUser(validUser).errors).toEqual([])

      expect(validateUser(invalidUser).isValid).toBe(false)
      expect(validateUser(invalidUser).errors).toHaveLength(3)
    })
  })

  describe('Benefits of Pure Functions', () => {
    it('should be easy to test (no setup needed)', () => {
      // Pure functions are trivial to test
      function add(a, b) {
        return a + b
      }

      // No mocking, no setup, no cleanup
      expect(add(1, 2)).toBe(3)
      expect(add(-1, 1)).toBe(0)
      expect(add(0.1, 0.2)).toBeCloseTo(0.3)
    })

    it('should be safe to memoize', () => {
      let callCount = 0

      // Pure function - safe to cache
      function expensiveCalculation(n) {
        callCount++
        let result = 0
        for (let i = 0; i < n; i++) {
          result += i
        }
        return result
      }

      // Simple memoization
      function memoize(fn) {
        const cache = new Map()
        return function (arg) {
          if (cache.has(arg)) {
            return cache.get(arg)
          }
          const result = fn(arg)
          cache.set(arg, result)
          return result
        }
      }

      const memoizedCalc = memoize(expensiveCalculation)

      // First call computes
      expect(memoizedCalc(1000)).toBe(499500)
      expect(callCount).toBe(1)

      // Second call returns cached result
      expect(memoizedCalc(1000)).toBe(499500)
      expect(callCount).toBe(1) // Not called again!

      // Different input computes again
      expect(memoizedCalc(500)).toBe(124750)
      expect(callCount).toBe(2)
    })

    it('should demonstrate fibonacci as a pure function safe for memoization', () => {
      // Expensive calculation - safe to cache because it's pure
      function fibonacci(n) {
        if (n <= 1) return n
        return fibonacci(n - 1) + fibonacci(n - 2)
      }

      // Pure: same input always gives same output
      expect(fibonacci(0)).toBe(0)
      expect(fibonacci(1)).toBe(1)
      expect(fibonacci(2)).toBe(1)
      expect(fibonacci(3)).toBe(2)
      expect(fibonacci(4)).toBe(3)
      expect(fibonacci(5)).toBe(5)
      expect(fibonacci(10)).toBe(55)

      // Call multiple times - always same result
      expect(fibonacci(10)).toBe(55)
      expect(fibonacci(10)).toBe(55)
    })
  })

  describe('Examples from Q&A Section', () => {
    it('should demonstrate multiply as a pure function', () => {
      // Pure: follows both rules
      function multiply(a, b) {
        return a * b
      }

      expect(multiply(3, 4)).toBe(12)
      expect(multiply(3, 4)).toBe(12) // Always the same
      expect(multiply(-2, 5)).toBe(-10)
      expect(multiply(0, 100)).toBe(0)
    })

    it('should demonstrate greet impure vs pure', () => {
      // ❌ IMPURE: Uses new Date() - output varies with time
      function greetImpure(name) {
        return `Hello, ${name}! The time is ${new Date().toLocaleTimeString()}`
      }

      // The impure version includes time, making results unpredictable
      const result1 = greetImpure('Alice')
      expect(result1).toContain('Hello, Alice!')
      expect(result1).toContain('The time is')

      // ✓ PURE: Pass time as a parameter
      function greetPure(name, time) {
        return `Hello, ${name}! The time is ${time}`
      }

      expect(greetPure('Alice', '10:00:00 AM')).toBe('Hello, Alice! The time is 10:00:00 AM')
      expect(greetPure('Alice', '10:00:00 AM')).toBe('Hello, Alice! The time is 10:00:00 AM') // Always same
      expect(greetPure('Bob', '3:00:00 PM')).toBe('Hello, Bob! The time is 3:00:00 PM')
    })

    it('should demonstrate calculateTax as a pure function', () => {
      // If calculateTax(100, 0.08) returns the wrong value,
      // the bug MUST be inside calculateTax.
      // No need to check what other code ran before it.
      function calculateTax(amount, rate) {
        return amount * rate
      }

      expect(calculateTax(100, 0.08)).toBe(8)
      expect(calculateTax(100, 0.08)).toBe(8) // Always the same
      expect(calculateTax(250, 0.1)).toBe(25)
      expect(calculateTax(0, 0.08)).toBe(0)
    })

    it('should demonstrate formatPrice as a pure function', () => {
      // You can understand this function completely by reading it
      function formatPrice(cents, currency = 'USD') {
        const dollars = cents / 100
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency
        }).format(dollars)
      }

      expect(formatPrice(1999)).toBe('$19.99')
      expect(formatPrice(1999)).toBe('$19.99') // Always the same
      expect(formatPrice(500)).toBe('$5.00')
      expect(formatPrice(9999, 'USD')).toBe('$99.99')
      expect(formatPrice(1000, 'EUR')).toBe('€10.00')
    })

    it('should demonstrate addToCart fix from Q&A', () => {
      // ❌ WRONG: This function mutates its input
      function addToCartBad(cart, item) {
        cart.push(item)
        return cart
      }

      const cart1 = ['apple']
      const result1 = addToCartBad(cart1, 'banana')
      expect(cart1).toEqual(['apple', 'banana']) // Original mutated!
      expect(result1).toBe(cart1) // Same reference

      // ✓ CORRECT: Fix it by returning a new array
      function addToCartGood(cart, item) {
        return [...cart, item]
      }

      const cart2 = ['apple']
      const result2 = addToCartGood(cart2, 'banana')
      expect(cart2).toEqual(['apple']) // Original unchanged!
      expect(result2).toEqual(['apple', 'banana'])
      expect(result2).not.toBe(cart2) // Different reference
    })

    it('should demonstrate updateCity with structuredClone from Q&A', () => {
      const user = {
        name: 'Alice',
        address: { city: 'NYC', zip: '10001' }
      }

      // Option 1: structuredClone (simplest)
      function updateCityClone(user, newCity) {
        const copy = structuredClone(user)
        copy.address.city = newCity
        return copy
      }

      const updated1 = updateCityClone(user, 'LA')
      expect(user.address.city).toBe('NYC') // Original unchanged
      expect(updated1.address.city).toBe('LA')

      // Option 2: Spread at each level
      function updateCitySpread(user, newCity) {
        return {
          ...user,
          address: {
            ...user.address,
            city: newCity
          }
        }
      }

      const updated2 = updateCitySpread(user, 'Boston')
      expect(user.address.city).toBe('NYC') // Original still unchanged
      expect(updated2.address.city).toBe('Boston')
    })
  })

  describe('Examples from Accordion Sections', () => {
    it('should demonstrate testing pure functions is trivial', () => {
      // Testing a pure function - simple and straightforward
      function add(a, b) {
        return a + b
      }

      function formatName(name) {
        return name.trim().toLowerCase()
      }

      function isValidEmail(email) {
        return email.includes('@') && email.includes('.')
      }

      // No mocking, no setup - just input and expected output
      expect(add(2, 3)).toBe(5)
      expect(formatName('  ALICE  ')).toBe('alice')
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('invalid')).toBe(false)
    })
  })
})
