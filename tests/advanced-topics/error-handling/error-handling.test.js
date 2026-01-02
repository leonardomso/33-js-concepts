import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Error Handling', () => {
  
  // ============================================================
  // TRY/CATCH/FINALLY BASICS
  // ============================================================
  
  describe('try/catch/finally Basics', () => {
    it('should catch errors thrown in try block', () => {
      // From: The try block contains code that might throw an error
      let caught = false
      
      try {
        throw new Error('Test error')
      } catch (error) {
        caught = true
        expect(error.message).toBe('Test error')
      }
      
      expect(caught).toBe(true)
    })
    
    it('should skip catch block if no error occurs', () => {
      const order = []
      
      try {
        order.push('try')
      } catch (error) {
        order.push('catch')
      }
      
      expect(order).toEqual(['try'])
    })
    
    it('should stop try block execution at the error', () => {
      // From: If an error occurs, execution immediately jumps to the catch block
      const order = []
      
      try {
        order.push('before error')
        throw new Error('stop')
        order.push('after error')  // Never runs
      } catch (error) {
        order.push('catch')
      }
      
      expect(order).toEqual(['before error', 'catch'])
    })
    
    it('should always run finally block - success case', () => {
      // From: The finally block always runs
      const order = []
      
      try {
        order.push('try')
      } catch (error) {
        order.push('catch')
      } finally {
        order.push('finally')
      }
      
      expect(order).toEqual(['try', 'finally'])
    })
    
    it('should always run finally block - error case', () => {
      const order = []
      
      try {
        order.push('try')
        throw new Error('test')
      } catch (error) {
        order.push('catch')
      } finally {
        order.push('finally')
      }
      
      expect(order).toEqual(['try', 'catch', 'finally'])
    })
    
    it('should run finally even with return in try', () => {
      // From: finally runs even with return
      const order = []
      
      function example() {
        try {
          order.push('try')
          return 'from try'
        } finally {
          order.push('finally')
        }
      }
      
      const result = example()
      
      expect(result).toBe('from try')
      expect(order).toEqual(['try', 'finally'])
    })
    
    it('should run finally even with return in catch', () => {
      const order = []
      
      function example() {
        try {
          throw new Error('test')
        } catch (error) {
          order.push('catch')
          return 'from catch'
        } finally {
          order.push('finally')
        }
      }
      
      const result = example()
      
      expect(result).toBe('from catch')
      expect(order).toEqual(['catch', 'finally'])
    })
    
    it('should support optional catch binding (ES2019+)', () => {
      // From: Optional catch binding
      let result = 'default'
      
      try {
        JSON.parse('{ invalid json }')
      } catch {
        // No error parameter needed
        result = 'caught'
      }
      
      expect(result).toBe('caught')
    })
  })
  
  // ============================================================
  // THE ERROR OBJECT
  // ============================================================
  
  describe('The Error Object', () => {
    it('should have name, message, and stack properties', () => {
      // From: Error Properties table
      try {
        undefinedVariable
      } catch (error) {
        expect(error.name).toBe('ReferenceError')
        expect(error.message).toContain('undefinedVariable')
        expect(typeof error.stack).toBe('string')
        expect(error.stack).toContain('ReferenceError')
      }
    })
    
    it('should convert error to string as "name: message"', () => {
      const error = new Error('Something went wrong')
      
      expect(String(error)).toBe('Error: Something went wrong')
    })
    
    it('should support error cause (ES2022+)', () => {
      // From: Error chaining with cause
      const originalError = new Error('Original error')
      const wrappedError = new Error('Wrapped error', { cause: originalError })
      
      expect(wrappedError.message).toBe('Wrapped error')
      expect(wrappedError.cause).toBe(originalError)
      expect(wrappedError.cause.message).toBe('Original error')
    })
  })
  
  // ============================================================
  // BUILT-IN ERROR TYPES
  // ============================================================
  
  describe('Built-in Error Types', () => {
    it('should throw TypeError for wrong type operations', () => {
      // From: TypeError - calling method on null
      expect(() => {
        const obj = null
        obj.method()
      }).toThrow(TypeError)
      
      // Calling non-function
      expect(() => {
        const notAFunction = 42
        notAFunction()
      }).toThrow(TypeError)
    })
    
    it('should throw ReferenceError for undefined variables', () => {
      // From: ReferenceError - using undefined variable
      expect(() => {
        undefinedVariableName
      }).toThrow(ReferenceError)
    })
    
    it('should throw SyntaxError for invalid JSON', () => {
      // From: SyntaxError - invalid JSON
      expect(() => {
        JSON.parse('{ name: "John" }')  // Missing quotes around key
      }).toThrow(SyntaxError)
      
      expect(() => {
        JSON.parse('')  // Empty string
      }).toThrow(SyntaxError)
    })
    
    it('should throw RangeError for out-of-range values', () => {
      // From: RangeError - value out of range
      expect(() => {
        new Array(-1)
      }).toThrow(RangeError)
      
      expect(() => {
        (1.5).toFixed(200)  // Max is 100
      }).toThrow(RangeError)
      
      // From: 'x'.repeat(Infinity) example
      expect(() => {
        'x'.repeat(Infinity)
      }).toThrow(RangeError)
    })
    
    it('should use optional chaining to avoid TypeError', () => {
      // From: Fix for TypeError - Check if values exist before using them
      const user = null
      
      // Without optional chaining - throws TypeError
      expect(() => {
        user.name
      }).toThrow(TypeError)
      
      // With optional chaining - returns undefined (no error)
      expect(user?.name).toBeUndefined()
    })
    
    it('should throw URIError for bad URI encoding', () => {
      // From: URIError - bad URI encoding
      expect(() => {
        decodeURIComponent('%')
      }).toThrow(URIError)
    })
    
    it('should throw AggregateError when all promises reject', async () => {
      // From: AggregateError - Promise.any() all reject
      await expect(
        Promise.any([
          Promise.reject(new Error('Error 1')),
          Promise.reject(new Error('Error 2')),
          Promise.reject(new Error('Error 3'))
        ])
      ).rejects.toThrow(AggregateError)
      
      try {
        await Promise.any([
          Promise.reject(new Error('Error 1')),
          Promise.reject(new Error('Error 2'))
        ])
      } catch (error) {
        expect(error.name).toBe('AggregateError')
        expect(error.errors).toHaveLength(2)
      }
    })
  })
  
  // ============================================================
  // THE THROW STATEMENT
  // ============================================================
  
  describe('The throw Statement', () => {
    it('should throw and catch custom errors', () => {
      // From: The throw statement lets you create your own errors
      function divide(a, b) {
        if (b === 0) {
          throw new Error('Cannot divide by zero')
        }
        return a / b
      }
      
      expect(divide(10, 2)).toBe(5)
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero')
    })
    
    it('should demonstrate throwing non-Error types (bad practice)', () => {
      // From: Always Throw Error Objects - BAD examples
      // These all work but lack stack traces for debugging
      
      // Throwing a string - no stack trace
      try {
        throw 'Something went wrong'
      } catch (error) {
        expect(typeof error).toBe('string')
        expect(error).toBe('Something went wrong')
        expect(error.stack).toBeUndefined()
      }
      
      // Throwing a number - no stack trace
      try {
        throw 404
      } catch (error) {
        expect(typeof error).toBe('number')
        expect(error).toBe(404)
        expect(error.stack).toBeUndefined()
      }
      
      // Throwing an object - no stack trace
      try {
        throw { message: 'Error' }
      } catch (error) {
        expect(typeof error).toBe('object')
        expect(error.message).toBe('Error')
        expect(error.stack).toBeUndefined()
      }
    })
    
    it('should throw errors with proper type', () => {
      // From: Always throw Error objects
      function validateAge(age) {
        if (typeof age !== 'number') {
          throw new TypeError(`Expected number but got ${typeof age}`)
        }
        if (age < 0 || age > 150) {
          throw new RangeError(`Age must be between 0 and 150, got ${age}`)
        }
        return true
      }
      
      expect(validateAge(25)).toBe(true)
      expect(() => validateAge('25')).toThrow(TypeError)
      expect(() => validateAge(-5)).toThrow(RangeError)
    })
    
    it('should include stack trace when throwing Error objects', () => {
      try {
        throw new Error('Test')
      } catch (error) {
        expect(error.stack).toBeDefined()
        expect(error.stack).toContain('Error: Test')
      }
    })
    
    it('should create meaningful error messages with context', () => {
      // From: Creating Meaningful Error Messages
      
      // Specific error message with details
      const email = 'invalid-email'
      const emailError = new Error(`Email address is invalid: missing @ symbol`)
      expect(emailError.message).toBe('Email address is invalid: missing @ symbol')
      
      // TypeError with actual type in message
      const value = 42
      const typeError = new TypeError(`Expected string but got ${typeof value}`)
      expect(typeError.message).toBe('Expected string but got number')
      expect(typeError.name).toBe('TypeError')
      
      // RangeError with actual value in message
      const age = 200
      const rangeError = new RangeError(`Age must be between 0 and 150, got ${age}`)
      expect(rangeError.message).toBe('Age must be between 0 and 150, got 200')
      expect(rangeError.name).toBe('RangeError')
    })
  })
  
  // ============================================================
  // CUSTOM ERROR CLASSES
  // ============================================================
  
  describe('Custom Error Classes', () => {
    it('should create custom error classes', () => {
      // From: Custom error classes for better categorization
      class ValidationError extends Error {
        constructor(message) {
          super(message)
          this.name = 'ValidationError'
        }
      }
      
      const error = new ValidationError('Invalid email')
      
      expect(error.name).toBe('ValidationError')
      expect(error.message).toBe('Invalid email')
      expect(error instanceof ValidationError).toBe(true)
      expect(error instanceof Error).toBe(true)
    })
    
    it('should support auto-naming pattern', () => {
      // From: The Auto-Naming Pattern
      class AppError extends Error {
        constructor(message, options) {
          super(message, options)
          this.name = this.constructor.name
        }
      }
      
      class ValidationError extends AppError {}
      class NetworkError extends AppError {}
      
      const validationError = new ValidationError('Bad input')
      const networkError = new NetworkError('Connection failed')
      
      expect(validationError.name).toBe('ValidationError')
      expect(networkError.name).toBe('NetworkError')
    })
    
    it('should add custom properties to error classes', () => {
      class NetworkError extends Error {
        constructor(message, statusCode) {
          super(message)
          this.name = 'NetworkError'
          this.statusCode = statusCode
        }
      }
      
      const error = new NetworkError('Not found', 404)
      
      expect(error.message).toBe('Not found')
      expect(error.statusCode).toBe(404)
    })
    
    it('should use instanceof for error type checking', () => {
      // From: Using instanceof for Error Handling
      class ValidationError extends Error {
        constructor(message) {
          super(message)
          this.name = 'ValidationError'
        }
      }
      
      class NetworkError extends Error {
        constructor(message) {
          super(message)
          this.name = 'NetworkError'
        }
      }
      
      const errors = [
        new ValidationError('Bad input'),
        new NetworkError('Offline'),
        new Error('Unknown')
      ]
      
      const results = errors.map(error => {
        if (error instanceof ValidationError) return 'validation'
        if (error instanceof NetworkError) return 'network'
        return 'unknown'
      })
      
      expect(results).toEqual(['validation', 'network', 'unknown'])
    })
    
    it('should chain errors with cause', () => {
      // From: Error Chaining with cause
      class DataLoadError extends Error {
        constructor(message, options) {
          super(message, options)
          this.name = 'DataLoadError'
        }
      }
      
      const originalError = new Error('Network timeout')
      const wrappedError = new DataLoadError('Failed to load user data', { 
        cause: originalError 
      })
      
      expect(wrappedError.cause).toBe(originalError)
      expect(wrappedError.cause.message).toBe('Network timeout')
    })
  })
  
  // ============================================================
  // ASYNC ERROR HANDLING
  // ============================================================
  
  describe('Async Error Handling', () => {
    it('should catch Promise rejections with .catch()', async () => {
      // From: With Promises: .catch()
      const result = await Promise.reject(new Error('Failed'))
        .catch(error => `Caught: ${error.message}`)
      
      expect(result).toBe('Caught: Failed')
    })
    
    it('should catch async/await errors with try/catch', async () => {
      // From: With async/await: try/catch
      async function failingOperation() {
        throw new Error('Async failure')
      }
      
      let caught = null
      
      try {
        await failingOperation()
      } catch (error) {
        caught = error.message
      }
      
      expect(caught).toBe('Async failure')
    })
    
    it('should run .finally() regardless of outcome', async () => {
      const order = []
      
      // Success case
      await Promise.resolve('success')
        .then(v => { order.push('then') })
        .finally(() => { order.push('finally-success') })
      
      // Failure case
      await Promise.reject(new Error('fail'))
        .catch(e => { order.push('catch') })
        .finally(() => { order.push('finally-fail') })
      
      expect(order).toEqual(['then', 'finally-success', 'catch', 'finally-fail'])
    })
    
    it('should demonstrate try/catch only catches synchronous errors', async () => {
      // From: try/catch Only Works Synchronously
      const order = []
      
      try {
        setTimeout(() => {
          order.push('timeout executed')
          // If we threw here, try/catch wouldn't catch it
        }, 0)
        order.push('after setTimeout')
      } catch (error) {
        order.push('catch')
      }
      
      expect(order).toEqual(['after setTimeout'])
      
      // Let setTimeout execute
      await new Promise(resolve => setTimeout(resolve, 10))
      
      expect(order).toEqual(['after setTimeout', 'timeout executed'])
    })
  })
  
  // ============================================================
  // GLOBAL ERROR HANDLERS (Not Tested - Browser-Specific)
  // ============================================================
  // 
  // The following patterns from the concept page are browser-specific
  // and cannot be tested in a Node.js/Vitest environment:
  // 
  // - window.onerror = function(message, source, lineno, colno, error) { ... }
  //   Catches uncaught synchronous errors in the browser
  // 
  // - window.addEventListener('unhandledrejection', event => { ... })
  //   Catches unhandled Promise rejections in the browser
  // 
  // These are documented in the concept page (lines 531-557) for browser usage.
  // In production, these are typically used for:
  //   - Logging errors to services like Sentry or LogRocket
  //   - Showing generic "something went wrong" messages
  //   - Tracking errors in production environments
  // 
  // They should be used as a safety net, not as primary error handling.
  // ============================================================
  
  // ============================================================
  // COMMON MISTAKES
  // ============================================================
  
  describe('Common Mistakes', () => {
    it('Mistake 1: Empty catch blocks swallow errors', () => {
      // From: Empty catch Blocks (Swallowing Errors)
      let errorLogged = false
      
      // Bad: error is silently swallowed
      try {
        throw new Error('Silent error')
      } catch (error) {
        // Empty - bad practice
      }
      
      // Good: at least log the error
      try {
        throw new Error('Logged error')
      } catch (error) {
        errorLogged = true
        // console.error('Error:', error) in real code
      }
      
      expect(errorLogged).toBe(true)
    })
    
    it('Mistake 2: Catching too broadly hides bugs', () => {
      // From: Catching Too Broadly
      function parseWithBugHidden(input) {
        try {
          const result = JSON.parse(input)
          // Bug: typo in variable name would be hidden
          return result
        } catch (error) {
          return 'Something went wrong'
        }
      }
      
      function parseCorrectly(input) {
        try {
          return JSON.parse(input)
        } catch (error) {
          if (error instanceof SyntaxError) {
            return null  // Expected case
          }
          throw error  // Unexpected: re-throw
        }
      }
      
      expect(parseWithBugHidden('{ invalid }')).toBe('Something went wrong')
      expect(parseCorrectly('{ invalid }')).toBe(null)
      expect(parseCorrectly('{"valid": true}')).toEqual({ valid: true })
    })
    
    it('Mistake 3: Throwing strings instead of Error objects', () => {
      // From: Throwing Strings Instead of Errors
      
      // Bad: no stack trace
      try {
        throw 'String error'
      } catch (error) {
        expect(typeof error).toBe('string')
        expect(error.stack).toBeUndefined()
      }
      
      // Good: has stack trace
      try {
        throw new Error('Error object')
      } catch (error) {
        expect(error instanceof Error).toBe(true)
        expect(error.stack).toBeDefined()
      }
    })
    
    it('Mistake 4: Not re-throwing when needed', async () => {
      // From: Not Re-throwing When Needed
      
      // Bad: returns undefined, caller thinks success
      async function badFetch() {
        try {
          throw new Error('Network error')
        } catch (error) {
          // Just logs, doesn't re-throw or return meaningful value
        }
      }
      
      // Good: re-throws for caller to handle
      async function goodFetch() {
        try {
          throw new Error('Network error')
        } catch (error) {
          throw error  // Let caller decide what to do
        }
      }
      
      const badResult = await badFetch()
      expect(badResult).toBeUndefined()  // Silent failure!
      
      await expect(goodFetch()).rejects.toThrow('Network error')
    })
    
    it('Mistake 5: Expecting try/catch to catch async callback errors', async () => {
      // From: Forgetting try/catch is Synchronous
      let syncCaughtError = null
      let callbackError = null
      
      // This catch won't catch the setTimeout error
      try {
        setTimeout(() => {
          try {
            throw new Error('Callback error')
          } catch (e) {
            callbackError = e.message
          }
        }, 0)
      } catch (error) {
        syncCaughtError = error.message
      }
      
      expect(syncCaughtError).toBeNull()  // Sync catch doesn't catch async
      
      await new Promise(resolve => setTimeout(resolve, 10))
      
      expect(callbackError).toBe('Callback error')  // Inner catch works
    })
  })
  
  // ============================================================
  // REAL-WORLD PATTERNS
  // ============================================================
  
  describe('Real-World Patterns', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should implement retry pattern', async () => {
      // From: Retry Pattern
      let attempts = 0
      
      async function flakyOperation() {
        attempts++
        if (attempts < 3) {
          throw new Error('Temporary failure')
        }
        return 'success'
      }
      
      async function fetchWithRetry(operation, retries = 3) {
        for (let i = 0; i < retries; i++) {
          try {
            return await operation()
          } catch (error) {
            if (i === retries - 1) throw error
            await new Promise(r => setTimeout(r, 100 * Math.pow(2, i)))
          }
        }
      }
      
      const promise = fetchWithRetry(flakyOperation, 3)
      
      // First attempt fails
      await vi.advanceTimersByTimeAsync(0)
      expect(attempts).toBe(1)
      
      // Wait for first retry (100ms)
      await vi.advanceTimersByTimeAsync(100)
      expect(attempts).toBe(2)
      
      // Wait for second retry (200ms)
      await vi.advanceTimersByTimeAsync(200)
      expect(attempts).toBe(3)
      
      const result = await promise
      expect(result).toBe('success')
    })
    
    it('should implement validation error pattern', () => {
      // From: Validation Error Pattern
      class ValidationError extends Error {
        constructor(errors) {
          super('Validation failed')
          this.name = 'ValidationError'
          this.errors = errors
        }
      }
      
      function validateUser(data) {
        const errors = {}
        
        if (!data.email?.includes('@')) {
          errors.email = 'Invalid email address'
        }
        if (data.age < 0) {
          errors.age = 'Age must be positive'
        }
        
        if (Object.keys(errors).length > 0) {
          throw new ValidationError(errors)
        }
        
        return true
      }
      
      // Valid data
      expect(validateUser({ email: 'test@example.com', age: 25 })).toBe(true)
      
      // Invalid data
      try {
        validateUser({ email: 'invalid', age: -5 })
      } catch (error) {
        expect(error instanceof ValidationError).toBe(true)
        expect(error.errors.email).toBe('Invalid email address')
        expect(error.errors.age).toBe('Age must be positive')
      }
    })
    
    it('should implement graceful degradation', async () => {
      // From: Graceful Degradation
      let apiCalled = false
      let cacheCalled = false
      
      async function fetchFromApi() {
        apiCalled = true
        throw new Error('API unavailable')
      }
      
      async function loadFromCache() {
        cacheCalled = true
        return { cached: true }
      }
      
      async function loadUserPreferences() {
        try {
          return await fetchFromApi()
        } catch (apiError) {
          try {
            return await loadFromCache()
          } catch (cacheError) {
            return { theme: 'light', language: 'en' }  // Defaults
          }
        }
      }
      
      const result = await loadUserPreferences()
      
      expect(apiCalled).toBe(true)
      expect(cacheCalled).toBe(true)
      expect(result).toEqual({ cached: true })
    })
  })
  
  // ============================================================
  // RETHROWING ERRORS
  // ============================================================
  
  describe('Rethrowing Errors', () => {
    it('should rethrow errors you cannot handle', () => {
      // From: Catch should only process errors that it knows
      function parseUserData(json) {
        try {
          return JSON.parse(json)
        } catch (error) {
          if (error instanceof SyntaxError) {
            // We know how to handle this
            return null
          }
          // Unknown error, rethrow
          throw error
        }
      }
      
      expect(parseUserData('{"name": "John"}')).toEqual({ name: 'John' })
      expect(parseUserData('invalid')).toBeNull()
    })
    
    it('should wrap errors with additional context', () => {
      function processOrder(order) {
        try {
          if (!order.items) {
            throw new Error('Order has no items')
          }
          return { processed: true }
        } catch (error) {
          throw new Error(`Failed to process order ${order.id}`, { cause: error })
        }
      }
      
      try {
        processOrder({ id: '123' })
      } catch (error) {
        expect(error.message).toBe('Failed to process order 123')
        expect(error.cause.message).toBe('Order has no items')
      }
    })
  })
  
  // ============================================================
  // SCOPING IN TRY/CATCH
  // ============================================================
  
  describe('Variable Scoping in try/catch', () => {
    it('should demonstrate variable scoping issue', () => {
      // From: Test Your Knowledge Question 6
      
      // Wrong: result is scoped to try block
      let wrongResult
      try {
        const result = 'value'
        wrongResult = result
      } catch (e) {
        // handle error
      }
      // console.log(result) would throw ReferenceError
      
      // Correct: declare outside try block
      let correctResult
      try {
        correctResult = 'value'
      } catch (e) {
        correctResult = 'fallback'
      }
      
      expect(correctResult).toBe('value')
    })
    
    it('should use fallback value when error occurs', () => {
      let result
      
      try {
        result = JSON.parse('invalid')
      } catch (e) {
        result = { fallback: true }
      }
      
      expect(result).toEqual({ fallback: true })
    })
  })
})
