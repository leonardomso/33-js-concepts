import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Callbacks', () => {
  
  // ============================================================
  // OPENING EXAMPLES
  // From callbacks.mdx lines 9-22, 139-155
  // ============================================================
  
  describe('Opening Examples', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    // From lines 9-22: Why doesn't JavaScript wait?
    it('should demonstrate setTimeout non-blocking behavior', async () => {
      const output = []
      
      output.push('Before timer')
      
      setTimeout(function() {
        output.push('Timer fired!')
      }, 1000)
      
      output.push('After timer')
      
      // Before timer advances, only sync code has run
      expect(output).toEqual(['Before timer', 'After timer'])
      
      // After 1 second
      await vi.advanceTimersByTimeAsync(1000)
      
      // Output:
      // Before timer
      // After timer
      // Timer fired! (1 second later)
      expect(output).toEqual(['Before timer', 'After timer', 'Timer fired!'])
    })
    
    // From lines 139-155: Restaurant buzzer analogy
    it('should demonstrate restaurant buzzer analogy with eatBurger callback', async () => {
      const output = []
      
      // You place your order (start async operation)
      setTimeout(function eatBurger() {
        output.push('Eating my burger!')  // This is the callback
      }, 5000)
      
      // You go sit down (your code continues)
      output.push('Sitting down, checking my phone...')
      output.push('Chatting with friends...')
      output.push('Reading the menu...')
      
      // Before timer fires
      expect(output).toEqual([
        'Sitting down, checking my phone...',
        'Chatting with friends...',
        'Reading the menu...'
      ])
      
      // After 5 seconds
      await vi.advanceTimersByTimeAsync(5000)
      
      // Output:
      // Sitting down, checking my phone...
      // Chatting with friends...
      // Reading the menu...
      // Eating my burger! (5 seconds later)
      expect(output).toEqual([
        'Sitting down, checking my phone...',
        'Chatting with friends...',
        'Reading the menu...',
        'Eating my burger!'
      ])
    })
  })
  
  // ============================================================
  // WHAT IS A CALLBACK
  // From callbacks.mdx lines 48-91
  // ============================================================
  
  describe('What is a Callback', () => {
    // From lines 48-61: greet and processUserInput example
    it('should execute greet callback passed to processUserInput', () => {
      const output = []
      
      // greet is a callback function
      function greet(name) {
        output.push(`Hello, ${name}!`)
      }
      
      // processUserInput accepts a callback
      function processUserInput(callback) {
        const name = 'Alice'
        callback(name)  // "calling back" the function we received
      }
      
      processUserInput(greet)  // "Hello, Alice!"
      
      expect(output).toEqual(['Hello, Alice!'])
    })
    
    // From lines 73-91: Callbacks can be anonymous
    it('should work with anonymous function callbacks', () => {
      const output = []
      
      // Simulating addEventListener behavior for testing
      function simulateAddEventListener(event, callback) {
        callback()
      }
      
      // Named function as callback
      function handleClick() {
        output.push('Clicked!')
      }
      simulateAddEventListener('click', handleClick)
      
      // Anonymous function as callback
      simulateAddEventListener('click', function() {
        output.push('Clicked!')
      })
      
      // Arrow function as callback
      simulateAddEventListener('click', () => {
        output.push('Clicked!')
      })
      
      // All three do the same thing
      expect(output).toEqual(['Clicked!', 'Clicked!', 'Clicked!'])
    })
  })
  
  // ============================================================
  // CALLBACKS AND HIGHER-ORDER FUNCTIONS
  // From callbacks.mdx lines 166-198
  // ============================================================
  
  describe('Callbacks and Higher-Order Functions', () => {
    // From lines 166-176: forEach is a higher-order function
    it('should demonstrate forEach as a higher-order function', () => {
      const output = []
      
      // forEach is a HIGHER-ORDER FUNCTION (it accepts a function)
      // The arrow function is the CALLBACK (it's being passed in)
      
      const numbers = [1, 2, 3]
      
      numbers.forEach((num) => {    // <- This is the callback
        output.push(num * 2)
      })
      // 2, 4, 6
      
      expect(output).toEqual([2, 4, 6])
    })
    
    // From lines 180-198: filter, map, find, sort with users array
    it('should demonstrate filter, map, find, sort with users array', () => {
      const users = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 17 },
        { name: 'Charlie', age: 30 }
      ]
      
      // filter accepts a callback that returns true/false
      const adults = users.filter(user => user.age >= 18)
      expect(adults).toEqual([
        { name: 'Alice', age: 25 },
        { name: 'Charlie', age: 30 }
      ])
      
      // map accepts a callback that transforms each element
      const names = users.map(user => user.name)
      expect(names).toEqual(['Alice', 'Bob', 'Charlie'])
      
      // find accepts a callback that returns true when found
      const bob = users.find(user => user.name === 'Bob')
      expect(bob).toEqual({ name: 'Bob', age: 17 })
      
      // sort accepts a callback that compares two elements
      const byAge = [...users].sort((a, b) => a.age - b.age)
      expect(byAge).toEqual([
        { name: 'Bob', age: 17 },
        { name: 'Alice', age: 25 },
        { name: 'Charlie', age: 30 }
      ])
    })
  })
  
  // ============================================================
  // SYNCHRONOUS VS ASYNCHRONOUS CALLBACKS
  // From callbacks.mdx lines 214-310
  // ============================================================
  
  describe('Synchronous Callbacks', () => {
    // From lines 214-236: Synchronous callbacks execute immediately
    it('should execute map callbacks synchronously and in order', () => {
      const output = []
      
      const numbers = [1, 2, 3, 4, 5]
      
      output.push('Before map')
      
      const doubled = numbers.map(num => {
        output.push(`Doubling ${num}`)
        return num * 2
      })
      
      output.push('After map')
      output.push(JSON.stringify(doubled))
      
      // Output (all synchronous, in order):
      // Before map
      // Doubling 1
      // Doubling 2
      // Doubling 3
      // Doubling 4
      // Doubling 5
      // After map
      // [2, 4, 6, 8, 10]
      expect(output).toEqual([
        'Before map',
        'Doubling 1',
        'Doubling 2',
        'Doubling 3',
        'Doubling 4',
        'Doubling 5',
        'After map',
        '[2,4,6,8,10]'
      ])
      
      expect(doubled).toEqual([2, 4, 6, 8, 10])
    })
    
    // From lines 287-295: Synchronous callback - try/catch WORKS
    it('should catch errors in synchronous callbacks with try/catch', () => {
      let caughtMessage = null
      
      // Synchronous callback - try/catch WORKS
      try {
        [1, 2, 3].forEach(num => {
          if (num === 2) throw new Error('Found 2!')
        })
      } catch (error) {
        caughtMessage = error.message  // "Caught: Found 2!"
      }
      
      expect(caughtMessage).toBe('Found 2!')
    })
  })
  
  describe('Asynchronous Callbacks', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    // From lines 249-262: Even with 0ms delay, callback runs after sync code
    it('should execute setTimeout callbacks after synchronous code even with 0ms delay', async () => {
      const output = []
      
      output.push('Before setTimeout')
      
      setTimeout(() => {
        output.push('Inside setTimeout')
      }, 0)  // Even with 0ms delay!
      
      output.push('After setTimeout')
      
      // Before timer fires
      expect(output).toEqual(['Before setTimeout', 'After setTimeout'])
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Output:
      // Before setTimeout
      // After setTimeout
      // Inside setTimeout (runs AFTER all sync code)
      expect(output).toEqual([
        'Before setTimeout',
        'After setTimeout',
        'Inside setTimeout'
      ])
    })
    
    // From lines 297-306: Asynchronous callback - try/catch DOES NOT WORK!
    it('should demonstrate that try/catch cannot catch async callback errors', async () => {
      // This test verifies the concept that try/catch doesn't work for async callbacks
      // In real code, the error would crash the program
      
      let tryCatchRan = false
      const asyncCallback = vi.fn()
      
      // Asynchronous callback - try/catch DOES NOT WORK!
      try {
        setTimeout(() => {
          asyncCallback()
          // throw new Error('Async error!')  // This error escapes!
        }, 100)
      } catch (error) {
        // This will NEVER run
        tryCatchRan = true
      }
      
      // The try/catch completes immediately, before the callback even runs
      expect(tryCatchRan).toBe(false)
      expect(asyncCallback).not.toHaveBeenCalled()
      
      await vi.advanceTimersByTimeAsync(100)
      
      // Now the callback has run, but the try/catch is long gone
      expect(asyncCallback).toHaveBeenCalled()
    })
  })
  
  // ============================================================
  // HOW CALLBACKS WORK WITH THE EVENT LOOP
  // From callbacks.mdx lines 355-393
  // ============================================================
  
  describe('Event Loop Examples', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    // From lines 355-387: Event loop trace example
    it('should demonstrate event loop execution order', async () => {
      const output = []
      
      output.push('1: Script start')
      
      setTimeout(function first() {
        output.push('2: First timeout')
      }, 0)
      
      setTimeout(function second() {
        output.push('3: Second timeout')
      }, 0)
      
      output.push('4: Script end')
      
      // Execution order:
      // 1. console.log('1: Script start') - runs immediately
      // 2. setTimeout(first, 0) - registers first callback with Web APIs
      // 3. setTimeout(second, 0) - registers second callback with Web APIs
      // 4. console.log('4: Script end') - runs immediately
      // 5. Call stack is now empty
      // 6. Event Loop checks Task Queue - finds first
      // 7. first() runs -> "2: First timeout"
      // 8. Event Loop checks Task Queue - finds second
      // 9. second() runs -> "3: Second timeout"
      
      // Before timers fire - only sync code has run
      expect(output).toEqual(['1: Script start', '4: Script end'])
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Output:
      // 1: Script start
      // 4: Script end
      // 2: First timeout
      // 3: Second timeout
      expect(output).toEqual([
        '1: Script start',
        '4: Script end',
        '2: First timeout',
        '3: Second timeout'
      ])
    })
  })
  
  // ============================================================
  // COMMON CALLBACK PATTERNS
  // From callbacks.mdx lines 397-537
  // ============================================================
  
  describe('Common Callback Patterns', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    // Pattern 2: Timers (lines 436-479)
    
    // From lines 440-447: setTimeout runs once after delay
    it('should run setTimeout callback once after delay', async () => {
      const output = []
      
      // setTimeout - runs once after delay
      const timeoutId = setTimeout(function() {
        output.push('This runs once after 2 seconds')
      }, 2000)
      
      expect(output).toEqual([])
      
      await vi.advanceTimersByTimeAsync(2000)
      
      expect(output).toEqual(['This runs once after 2 seconds'])
    })
    
    // From lines 447: Cancel timeout before it runs
    it('should cancel setTimeout with clearTimeout', async () => {
      const callback = vi.fn()
      
      // Cancel it before it runs
      const timeoutId = setTimeout(function() {
        callback()
      }, 2000)
      
      clearTimeout(timeoutId)
      
      await vi.advanceTimersByTimeAsync(2000)
      
      expect(callback).not.toHaveBeenCalled()
    })
    
    // From lines 449-459: setInterval runs repeatedly
    it('should run setInterval callback repeatedly until cleared', async () => {
      const output = []
      
      // setInterval - runs repeatedly
      let count = 0
      const intervalId = setInterval(function() {
        count++
        output.push(`Count: ${count}`)
        
        if (count >= 5) {
          clearInterval(intervalId)  // Stop after 5 times
          output.push('Done!')
        }
      }, 1000)
      
      await vi.advanceTimersByTimeAsync(5000)
      
      expect(output).toEqual([
        'Count: 1',
        'Count: 2',
        'Count: 3',
        'Count: 4',
        'Count: 5',
        'Done!'
      ])
    })
    
    // From lines 464-479: Passing arguments to timer callbacks
    it('should pass arguments to setTimeout callbacks using closure', async () => {
      const output = []
      
      // Method 1: Closure (most common)
      const name = 'Alice'
      setTimeout(function() {
        output.push(`Hello, ${name}!`)
      }, 1000)
      
      await vi.advanceTimersByTimeAsync(1000)
      
      expect(output).toEqual(['Hello, Alice!'])
    })
    
    it('should pass arguments to setTimeout callbacks using extra arguments', async () => {
      const output = []
      
      // Method 2: setTimeout's extra arguments
      setTimeout(function(greeting, name) {
        output.push(`${greeting}, ${name}!`)
      }, 1000, 'Hello', 'Bob')  // Extra args passed to callback
      
      await vi.advanceTimersByTimeAsync(1000)
      
      expect(output).toEqual(['Hello, Bob!'])
    })
    
    it('should pass arguments to setTimeout callbacks using arrow function with closure', async () => {
      const output = []
      
      // Method 3: Arrow function with closure
      const user = { name: 'Charlie' }
      setTimeout(() => output.push(`Hi, ${user.name}!`), 1000)
      
      await vi.advanceTimersByTimeAsync(1000)
      
      expect(output).toEqual(['Hi, Charlie!'])
    })
    
    // Pattern 3: Array Iteration (lines 481-512)
    
    // From lines 485-512: products array examples
    it('should demonstrate array iteration callbacks with products array', () => {
      const products = [
        { name: 'Laptop', price: 999, inStock: true },
        { name: 'Phone', price: 699, inStock: false },
        { name: 'Tablet', price: 499, inStock: true }
      ]
      
      // forEach - do something with each item
      const forEachOutput = []
      products.forEach(product => {
        forEachOutput.push(`${product.name}: $${product.price}`)
      })
      expect(forEachOutput).toEqual([
        'Laptop: $999',
        'Phone: $699',
        'Tablet: $499'
      ])
      
      // map - transform each item into something new
      const productNames = products.map(product => product.name)
      // ['Laptop', 'Phone', 'Tablet']
      expect(productNames).toEqual(['Laptop', 'Phone', 'Tablet'])
      
      // filter - keep only items that pass a test
      const available = products.filter(product => product.inStock)
      // [{ name: 'Laptop', ... }, { name: 'Tablet', ... }]
      expect(available).toEqual([
        { name: 'Laptop', price: 999, inStock: true },
        { name: 'Tablet', price: 499, inStock: true }
      ])
      
      // find - get the first item that passes a test
      const phone = products.find(product => product.name === 'Phone')
      // { name: 'Phone', price: 699, inStock: false }
      expect(phone).toEqual({ name: 'Phone', price: 699, inStock: false })
      
      // reduce - combine all items into a single value
      const totalValue = products.reduce((sum, product) => sum + product.price, 0)
      // 2197
      expect(totalValue).toBe(2197)
    })
    
    // Pattern 4: Custom Callbacks (lines 514-537)
    
    // From lines 518-537: fetchUserData custom callback
    it('should demonstrate custom callback pattern with fetchUserData', async () => {
      const output = []
      
      // A function that does something and then calls you back
      function fetchUserData(userId, callback) {
        // Simulate async operation
        setTimeout(function() {
          const user = { id: userId, name: 'Alice', email: 'alice@example.com' }
          callback(user)
        }, 1000)
      }
      
      // Using the function
      fetchUserData(123, function(user) {
        output.push(`Got user: ${user.name}`)
      })
      output.push('Fetching user...')
      
      // Before timer fires
      expect(output).toEqual(['Fetching user...'])
      
      await vi.advanceTimersByTimeAsync(1000)
      
      // Output:
      // Fetching user...
      // Got user: Alice (1 second later)
      expect(output).toEqual(['Fetching user...', 'Got user: Alice'])
    })
  })
  
  // ============================================================
  // THE ERROR-FIRST CALLBACK PATTERN
  // From callbacks.mdx lines 541-654
  // ============================================================
  
  describe('Error-First Callback Pattern', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    // From lines 547-553: Error-first callback signature
    it('should demonstrate error-first callback signature', () => {
      // Error-first callback signature
      // function callback(error, result) {
      //   // error: null/undefined if success, Error object if failure
      //   // result: the data if success, usually undefined if failure
      // }
      
      let receivedError = 'not called'
      let receivedResult = 'not called'
      
      function callback(error, result) {
        receivedError = error
        receivedResult = result
      }
      
      // Success case
      callback(null, 'success data')
      expect(receivedError).toBeNull()
      expect(receivedResult).toBe('success data')
      
      // Error case
      callback(new Error('something failed'), undefined)
      expect(receivedError).toBeInstanceOf(Error)
      expect(receivedError.message).toBe('something failed')
      expect(receivedResult).toBeUndefined()
    })
    
    // From lines 586-622: divideAsync error-first example
    it('should demonstrate divideAsync error-first callback pattern', async () => {
      function divideAsync(a, b, callback) {
        // Simulate async operation
        setTimeout(function() {
          // Check for errors
          if (typeof a !== 'number' || typeof b !== 'number') {
            callback(new Error('Both arguments must be numbers'))
            return
          }
          
          if (b === 0) {
            callback(new Error('Cannot divide by zero'))
            return
          }
          
          // Success! Error is null, result is the value
          const result = a / b
          callback(null, result)
        }, 100)
      }
      
      // Test success case
      let successError = 'not called'
      let successResult = 'not called'
      
      divideAsync(10, 2, function(error, result) {
        successError = error
        successResult = result
      })
      
      await vi.advanceTimersByTimeAsync(100)
      
      expect(successError).toBeNull()
      expect(successResult).toBe(5)  // Result: 5
      
      // Test error case - divide by zero
      let errorError = 'not called'
      let errorResult = 'not called'
      
      divideAsync(10, 0, function(error, result) {
        errorError = error
        errorResult = result
      })
      
      await vi.advanceTimersByTimeAsync(100)
      
      expect(errorError).toBeInstanceOf(Error)
      expect(errorError.message).toBe('Cannot divide by zero')
    })
    
    // From lines 627-650: Common Mistake - Forgetting to Return
    it('should demonstrate the importance of returning after error callback', () => {
      const results = []
      
      // Wrong - doesn't return after error
      function processDataWrong(data, callback) {
        if (!data) {
          callback(new Error('No data provided'))
          // Oops! Execution continues...
        }
        
        // This runs even when there's an error!
        results.push('This should not run if error')
        callback(null, 'processed')
      }
      
      // Correct - return after error callback
      function processDataCorrect(data, callback) {
        if (!data) {
          return callback(new Error('No data provided'))
          // Or: callback(new Error(...)); return;
        }
        
        // This only runs if data exists
        results.push('This only runs on success')
        callback(null, 'processed')
      }
      
      // Test wrong way
      processDataWrong(null, () => {})
      expect(results).toContain('This should not run if error')  // Bug!
      
      results.length = 0  // Clear results
      
      // Test correct way
      processDataCorrect(null, () => {})
      expect(results).not.toContain('This only runs on success')  // Correct!
    })
  })
  
  // ============================================================
  // CALLBACK HELL: THE PYRAMID OF DOOM
  // From callbacks.mdx lines 658-757
  // ============================================================
  
  describe('Callback Hell', () => {
    // From lines 674-715: Nested callback example
    it('should demonstrate the pyramid of doom pattern', () => {
      return new Promise((resolve) => {
        const steps = []
        
        // Simulated async operations
        function getUser(userId, callback) {
          setTimeout(() => {
            steps.push('getUser')
            callback(null, { id: userId, name: 'Alice' })
          }, 0)
        }
        
        function verifyPassword(user, password, callback) {
          setTimeout(() => {
            steps.push('verifyPassword')
            callback(null, password === 'correct')
          }, 0)
        }
        
        function getProfile(userId, callback) {
          setTimeout(() => {
            steps.push('getProfile')
            callback(null, { bio: 'Developer' })
          }, 0)
        }
        
        function getSettings(userId, callback) {
          setTimeout(() => {
            steps.push('getSettings')
            callback(null, { theme: 'dark' })
          }, 0)
        }
        
        function renderDashboard(user, profile, settings, callback) {
          setTimeout(() => {
            steps.push('renderDashboard')
            callback(null)
          }, 0)
        }
        
        function handleError(error) {
          steps.push(`Error: ${error.message}`)
        }
        
        const userId = 123
        const password = 'correct'
        
        // Callback hell - nested callbacks (pyramid of doom)
        getUser(userId, function(error, user) {
          if (error) {
            handleError(error)
            return
          }
          
          verifyPassword(user, password, function(error, isValid) {
            if (error) {
              handleError(error)
              return
            }
            
            if (!isValid) {
              handleError(new Error('Invalid password'))
              return
            }
            
            getProfile(user.id, function(error, profile) {
              if (error) {
                handleError(error)
                return
              }
              
              getSettings(user.id, function(error, settings) {
                if (error) {
                  handleError(error)
                  return
                }
                
                renderDashboard(user, profile, settings, function(error) {
                  if (error) {
                    handleError(error)
                    return
                  }
                  
                  steps.push('Dashboard rendered!')
                  
                  expect(steps).toEqual([
                    'getUser',
                    'verifyPassword',
                    'getProfile',
                    'getSettings',
                    'renderDashboard',
                    'Dashboard rendered!'
                  ])
                  resolve()
                })
              })
            })
          })
        })
      })
    })
  })
  
  // ============================================================
  // ESCAPING CALLBACK HELL
  // From callbacks.mdx lines 761-970
  // ============================================================
  
  describe('Escaping Callback Hell', () => {
    // From lines 769-801: Strategy 1 - Named Functions
    it('should demonstrate named functions to escape callback hell', () => {
      return new Promise((resolve) => {
        const steps = []
        let rejected = false
        
        function getData(callback) {
          setTimeout(() => {
            steps.push('getData')
            callback(null, 'data')
          }, 0)
        }
        
        function processData(data, callback) {
          setTimeout(() => {
            steps.push(`processData: ${data}`)
            callback(null, 'processed')
          }, 0)
        }
        
        function saveData(processed, callback) {
          setTimeout(() => {
            steps.push(`saveData: ${processed}`)
            callback(null)
          }, 0)
        }
        
        function handleError(err) {
          steps.push(`Error: ${err.message}`)
          rejected = true
        }
        
        // After: Named functions
        function handleData(err, data) {
          if (err) return handleError(err)
          processData(data, handleProcessed)
        }
        
        function handleProcessed(err, processed) {
          if (err) return handleError(err)
          saveData(processed, handleSaved)
        }
        
        function handleSaved(err) {
          if (err) return handleError(err)
          steps.push('Done!')
          
          expect(steps).toEqual([
            'getData',
            'processData: data',
            'saveData: processed',
            'Done!'
          ])
          resolve()
        }
        
        // Start the chain
        getData(handleData)
      })
    })
    
    // From lines 813-847: Strategy 2 - Early Returns
    it('should demonstrate early returns to reduce nesting', () => {
      return new Promise((resolve) => {
        const results = []
        
        function validateUser(user, callback) {
          setTimeout(() => {
            callback(null, user.name !== '')
          }, 0)
        }
        
        function saveUser(user, callback) {
          setTimeout(() => {
            callback(null, { ...user, saved: true })
          }, 0)
        }
        
        // Use early returns
        function processUser(user, callback) {
          validateUser(user, function(err, isValid) {
            if (err) return callback(err)
            if (!isValid) return callback(new Error('Invalid user'))
            
            saveUser(user, function(err, savedUser) {
              if (err) return callback(err)
              callback(null, savedUser)
            })
          })
        }
        
        processUser({ name: 'Alice' }, function(err, result) {
          expect(err).toBeNull()
          expect(result).toEqual({ name: 'Alice', saved: true })
          
          // Test invalid user
          processUser({ name: '' }, function(err, result) {
            expect(err).toBeInstanceOf(Error)
            expect(err.message).toBe('Invalid user')
            resolve()
          })
        })
      })
    })
    
    // From lines 853-888: Strategy 3 - Modularization
    it('should demonstrate modularization to break up callback hell', () => {
      return new Promise((resolve) => {
        const steps = []
        
        // auth.js
        function getUser(email, callback) {
          setTimeout(() => callback(null, { id: 1, email }), 0)
        }
        
        function verifyPassword(user, password, callback) {
          setTimeout(() => callback(null, password === 'secret'), 0)
        }
        
        function authenticateUser(credentials, callback) {
          getUser(credentials.email, function(err, user) {
            if (err) return callback(err)
            
            verifyPassword(user, credentials.password, function(err, isValid) {
              if (err) return callback(err)
              if (!isValid) return callback(new Error('Invalid password'))
              callback(null, user)
            })
          })
        }
        
        // profile.js
        function getProfile(userId, callback) {
          setTimeout(() => callback(null, { bio: 'Developer' }), 0)
        }
        
        function getSettings(userId, callback) {
          setTimeout(() => callback(null, { theme: 'dark' }), 0)
        }
        
        function loadUserProfile(userId, callback) {
          getProfile(userId, function(err, profile) {
            if (err) return callback(err)
            
            getSettings(userId, function(err, settings) {
              if (err) return callback(err)
              callback(null, { profile, settings })
            })
          })
        }
        
        function handleError(err) {
          steps.push(`Error: ${err.message}`)
        }
        
        function renderDashboard(user, profile, settings) {
          steps.push(`Rendered dashboard for ${user.email}`)
        }
        
        // main.js
        const credentials = { email: 'alice@example.com', password: 'secret' }
        
        authenticateUser(credentials, function(err, user) {
          if (err) return handleError(err)
          
          loadUserProfile(user.id, function(err, data) {
            if (err) return handleError(err)
            renderDashboard(user, data.profile, data.settings)
            
            expect(steps).toEqual(['Rendered dashboard for alice@example.com'])
            resolve()
          })
        })
      })
    })
  })
  
  // ============================================================
  // COMMON CALLBACK MISTAKES
  // From callbacks.mdx lines 974-1121
  // ============================================================
  
  describe('Common Callback Mistakes', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    // From lines 981-1001: Mistake 1 - Calling a Callback Multiple Times
    it('should demonstrate the problem of calling callbacks multiple times', () => {
      const results = []
      
      // Wrong - callback called multiple times!
      function fetchDataWrong(url, callback) {
        // Simulating the wrong pattern from the docs
        callback(null, 'response')   // Called on success
        // In the wrong code, .finally() would also call callback
        callback(null, 'done')       // Called ALWAYS - even after success or error!
      }
      
      fetchDataWrong('http://example.com', (err, data) => {
        results.push(data)
      })
      
      // Bug: callback was called twice!
      expect(results).toEqual(['response', 'done'])
      expect(results.length).toBe(2)
    })
    
    // From lines 1003-1041: Mistake 2 - Zalgo (sync/async inconsistency)
    it('should demonstrate the Zalgo problem (inconsistent sync/async)', async () => {
      const cache = new Map()
      const order = []
      
      // Wrong - sometimes sync, sometimes async (Zalgo!)
      function getData(key, callback) {
        if (cache.has(key)) {
          callback(null, cache.get(key))  // Sync!
          return
        }
        
        setTimeout(() => {
          const data = `data for ${key}`
          cache.set(key, data)
          callback(null, data)  // Async!
        }, 0)
      }
      
      // This causes unpredictable behavior:
      let value = 'initial'
      getData('key1', function(err, data) {
        value = data
      })
      order.push(`After first call: ${value}`)
      
      await vi.advanceTimersByTimeAsync(0)
      order.push(`After timer: ${value}`)
      
      // Second call - from cache (sync)
      getData('key1', function(err, data) {
        value = 'from cache'
      })
      order.push(`After second call: ${value}`)
      
      // Inconsistent! First call: value changed after timer
      // Second call: value changed immediately
      expect(order).toEqual([
        'After first call: initial',        // First call was async
        'After timer: data for key1',       // Value updated after timer
        'After second call: from cache'     // Second call was sync - immediate!
      ])
    })
    
    // From lines 1027-1041: Solution to Zalgo - always be async
    it('should demonstrate the solution to Zalgo - always async', async () => {
      const cache = new Map()
      const order = []
      
      // Correct - always async
      function getData(key, callback) {
        if (cache.has(key)) {
          // Use setTimeout to make it async even when cached
          setTimeout(function() {
            callback(null, cache.get(key))
          }, 0)
          return
        }
        
        setTimeout(() => {
          const data = `data for ${key}`
          cache.set(key, data)
          callback(null, data)
        }, 0)
      }
      
      let value = 'initial'
      
      // First call
      getData('key1', function(err, data) {
        value = data
        order.push(`callback1: ${value}`)
      })
      order.push('after first call')
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Second call (from cache, but still async)
      getData('key1', function(err, data) {
        value = 'from cache'
        order.push(`callback2: ${value}`)
      })
      order.push('after second call')
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Consistent ordering! Both callbacks run after their respective calls
      expect(order).toEqual([
        'after first call',
        'callback1: data for key1',
        'after second call',
        'callback2: from cache'
      ])
    })
    
    // From lines 1043-1092: Mistake 3 - Losing `this` Context
    it('should demonstrate losing this context with regular function callbacks', async () => {
      // Wrong - this is undefined/global
      const user = {
        name: 'Alice',
        greetLater: function() {
          return new Promise(resolve => {
            setTimeout(function() {
              // 'this' is undefined in strict mode
              resolve(this?.name)  // this.name is undefined!
            }, 1000)
          })
        }
      }
      
      const promise = user.greetLater()
      await vi.advanceTimersByTimeAsync(1000)
      const result = await promise
      
      expect(result).toBeUndefined()  // "Hello, undefined!"
    })
    
    it('should preserve this context with arrow function callbacks', async () => {
      // Correct - Use arrow function (inherits this)
      const user = {
        name: 'Alice',
        greetLater: function() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(`Hello, ${this.name}!`)  // Arrow function keeps this
            }, 1000)
          })
        }
      }
      
      const promise = user.greetLater()
      await vi.advanceTimersByTimeAsync(1000)
      const result = await promise
      
      expect(result).toBe('Hello, Alice!')
    })
    
    it('should preserve this context with bind', async () => {
      // Correct - Use bind
      const user = {
        name: 'Alice',
        greetLater: function() {
          return new Promise(resolve => {
            setTimeout(function() {
              resolve(`Hello, ${this.name}!`)
            }.bind(this), 1000)  // Explicitly bind this
          })
        }
      }
      
      const promise = user.greetLater()
      await vi.advanceTimersByTimeAsync(1000)
      const result = await promise
      
      expect(result).toBe('Hello, Alice!')
    })
    
    it('should preserve this context by saving reference', async () => {
      // Correct - Save reference to this
      const user = {
        name: 'Alice',
        greetLater: function() {
          const self = this  // Save reference
          return new Promise(resolve => {
            setTimeout(function() {
              resolve(`Hello, ${self.name}!`)
            }, 1000)
          })
        }
      }
      
      const promise = user.greetLater()
      await vi.advanceTimersByTimeAsync(1000)
      const result = await promise
      
      expect(result).toBe('Hello, Alice!')
    })
  })
  
  // ============================================================
  // TEST YOUR KNOWLEDGE
  // From callbacks.mdx lines 1260-1371
  // ============================================================
  
  describe('Test Your Knowledge', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    // From lines 1260-1285: Question 3 - What's the output of this code?
    it('Question 3: What is the output order? A, C, E, B, D', async () => {
      const output = []
      
      output.push('A')
      
      setTimeout(() => output.push('B'), 0)
      
      output.push('C')
      
      setTimeout(() => output.push('D'), 0)
      
      output.push('E')
      
      // Before timers: A, C, E
      expect(output).toEqual(['A', 'C', 'E'])
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Answer: A, C, E, B, D
      //
      // Explanation:
      // 1. console.log('A') - sync, runs immediately -> "A"
      // 2. setTimeout(..., 0) - registers callback B, continues
      // 3. console.log('C') - sync, runs immediately -> "C"
      // 4. setTimeout(..., 0) - registers callback D, continues
      // 5. console.log('E') - sync, runs immediately -> "E"
      // 6. Call stack empty -> event loop runs callback B -> "B"
      // 7. Event loop runs callback D -> "D"
      //
      // Even with 0ms delay, setTimeout callbacks run after all sync code.
      expect(output).toEqual(['A', 'C', 'E', 'B', 'D'])
    })
    
    // From lines 1287-1316: Question 4 - How can you preserve `this` context?
    it('Question 4: Three ways to preserve this context', async () => {
      // 1. Arrow functions (recommended)
      const obj1 = {
        name: 'Alice',
        greet() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(this.name)  // "Alice"
            }, 100)
          })
        }
      }
      
      // 2. Using bind()
      const obj2 = {
        name: 'Alice',
        greet() {
          return new Promise(resolve => {
            setTimeout(function() {
              resolve(this.name)
            }.bind(this), 100)
          })
        }
      }
      
      // 3. Saving a reference
      const obj3 = {
        name: 'Alice',
        greet() {
          const self = this
          return new Promise(resolve => {
            setTimeout(function() {
              resolve(self.name)
            }, 100)
          })
        }
      }
      
      const promise1 = obj1.greet()
      const promise2 = obj2.greet()
      const promise3 = obj3.greet()
      
      await vi.advanceTimersByTimeAsync(100)
      
      expect(await promise1).toBe('Alice')
      expect(await promise2).toBe('Alice')
      expect(await promise3).toBe('Alice')
    })
    
    // From lines 1318-1342: Question 5 - Why can't you use try/catch with async callbacks?
    it('Question 5: try/catch cannot catch async callback errors', async () => {
      // The try/catch block executes synchronously. By the time an async
      // callback runs, the try/catch is long gone - it's on a different
      // "turn" of the event loop.
      
      let tryCatchExecuted = false
      const callbackExecuted = vi.fn()
      
      try {
        setTimeout(() => {
          callbackExecuted()
          // throw new Error('Async error!')  // This escapes!
        }, 100)
      } catch (e) {
        // This NEVER catches the error
        tryCatchExecuted = true
      }
      
      // The error crashes the program because:
      // 1. try/catch runs immediately
      // 2. setTimeout registers callback and returns
      // 3. try/catch completes (nothing thrown yet!)
      // 4. 100ms later, callback runs and throws
      // 5. No try/catch exists at that point
      
      expect(tryCatchExecuted).toBe(false)
      expect(callbackExecuted).not.toHaveBeenCalled()
      
      await vi.advanceTimersByTimeAsync(100)
      
      // Callback ran, but try/catch is long gone
      expect(callbackExecuted).toHaveBeenCalled()
      expect(tryCatchExecuted).toBe(false)  // Still false!
    })
    
    // From lines 1344-1370: Question 6 - Three ways to avoid callback hell
    it('Question 6: Three ways to avoid callback hell', async () => {
      const steps = []
      
      function getUser(userId, callback) {
        setTimeout(() => callback(null, { id: userId, name: 'Alice' }), 0)
      }
      
      function getProfile(userId, callback) {
        setTimeout(() => callback(null, { bio: 'Developer' }), 0)
      }
      
      function handleError(err) {
        steps.push(`Error: ${err.message}`)
      }
      
      // 1. Named functions - Extract callbacks into named functions
      function handleUser(err, user) {
        if (err) return handleError(err)
        getProfile(user.id, handleProfile)
      }
      
      function handleProfile(err, profile) {
        if (err) return handleError(err)
        steps.push(`Got profile: ${profile.bio}`)
      }
      
      // Start the chain
      getUser(123, handleUser)
      
      // Advance timers to let callbacks execute
      // Need to run all pending timers (nested setTimeouts)
      await vi.runAllTimersAsync()
      
      expect(steps).toEqual(['Got profile: Developer'])
      
      // Other approaches mentioned in docs:
      // 2. Modularization - Split into separate modules/functions
      // 3. Promises/async-await - Use modern async patterns
    })
  })
  
  // ============================================================
  // ADDITIONAL EDGE CASES
  // ============================================================
  
  describe('Additional Edge Cases', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should handle nested setTimeout callbacks', async () => {
      const order = []
      
      setTimeout(() => {
        order.push('first')
        setTimeout(() => {
          order.push('second')
          setTimeout(() => {
            order.push('third')
          }, 100)
        }, 100)
      }, 100)
      
      await vi.advanceTimersByTimeAsync(100)
      expect(order).toEqual(['first'])
      
      await vi.advanceTimersByTimeAsync(100)
      expect(order).toEqual(['first', 'second'])
      
      await vi.advanceTimersByTimeAsync(100)
      expect(order).toEqual(['first', 'second', 'third'])
    })
    
    it('should demonstrate callback with multiple array methods chained', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      
      // Each method accepts a callback
      const result = numbers
        .filter(n => n % 2 === 0)     // Keep evens: [2, 4, 6, 8, 10]
        .map(n => n * 2)              // Double: [4, 8, 12, 16, 20]
        .reduce((sum, n) => sum + n, 0) // Sum: 60
      
      expect(result).toBe(60)
    })
    
    it('should demonstrate once-only callback pattern', () => {
      function once(callback) {
        let called = false
        return function(...args) {
          if (called) return
          called = true
          return callback.apply(this, args)
        }
      }
      
      let callCount = 0
      const onceCallback = once(() => {
        callCount++
        return 'result'
      })
      
      expect(onceCallback()).toBe('result')
      expect(onceCallback()).toBeUndefined()
      expect(onceCallback()).toBeUndefined()
      expect(callCount).toBe(1)
    })
    
    it('should demonstrate closure issues with var in loops', async () => {
      const results = []
      
      // Wrong with var - all callbacks see final value
      for (var i = 0; i < 3; i++) {
        setTimeout(() => results.push(`var: ${i}`), 100)
      }
      
      await vi.advanceTimersByTimeAsync(100)
      
      // All see i = 3 (the final value after loop completes)
      expect(results).toEqual(['var: 3', 'var: 3', 'var: 3'])
    })
    
    it('should demonstrate closure fix with let in loops', async () => {
      const results = []
      
      // Correct with let - each iteration gets its own i
      for (let i = 0; i < 3; i++) {
        setTimeout(() => results.push(`let: ${i}`), 100)
      }
      
      await vi.advanceTimersByTimeAsync(100)
      
      expect(results).toEqual(['let: 0', 'let: 1', 'let: 2'])
    })
  })
})
