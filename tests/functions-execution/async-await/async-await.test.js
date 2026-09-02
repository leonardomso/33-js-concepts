import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('async/await', () => {
  
  // ============================================================
  // THE async KEYWORD
  // ============================================================
  
  describe('The async Keyword', () => {
    it('should make a function return a Promise', () => {
      // From: async function always returns a Promise
      async function getValue() {
        return 42
      }
      
      const result = getValue()
      
      expect(result).toBeInstanceOf(Promise)
    })
    
    it('should wrap return values in Promise.resolve()', async () => {
      // From: return values are wrapped in Promise.resolve()
      async function getValue() {
        return 42
      }
      
      const result = await getValue()
      
      expect(result).toBe(42)
    })
    
    it('should convert thrown errors to rejected Promises', async () => {
      // From: when you throw in an async function, it becomes a rejected Promise
      async function failingFunction() {
        throw new Error('Something went wrong!')
      }
      
      await expect(failingFunction()).rejects.toThrow('Something went wrong!')
    })
    
    it('should not double-wrap returned Promises', async () => {
      // From: return a Promise? No double-wrapping
      async function getPromise() {
        return Promise.resolve(42)
      }
      
      const result = await getPromise()
      
      // If it double-wrapped, result would be a Promise, not 42
      expect(result).toBe(42)
      expect(typeof result).toBe('number')
    })
    
    it('should work with async arrow functions', async () => {
      // From: async arrow function
      const getData = async () => {
        return 'data'
      }
      
      expect(await getData()).toBe('data')
    })
    
    it('should work with async methods in objects', async () => {
      // From: async method in an object
      const api = {
        async fetchData() {
          return 'fetched'
        }
      }
      
      expect(await api.fetchData()).toBe('fetched')
    })
    
    it('should work with async methods in classes', async () => {
      // From: async method in a class
      class DataService {
        async getData() {
          return 'class data'
        }
      }
      
      const service = new DataService()
      expect(await service.getData()).toBe('class data')
    })
  })
  
  // ============================================================
  // THE await KEYWORD
  // ============================================================
  
  describe('The await Keyword', () => {
    it('should pause execution until Promise resolves', async () => {
      const order = []
      
      async function example() {
        order.push('before await')
        await Promise.resolve()
        order.push('after await')
      }
      
      await example()
      
      expect(order).toEqual(['before await', 'after await'])
    })
    
    it('should return the resolved value of a Promise', async () => {
      async function example() {
        const value = await Promise.resolve(42)
        return value
      }
      
      expect(await example()).toBe(42)
    })
    
    it('should work with non-Promise values (though pointless)', async () => {
      // From: awaiting a non-Promise value
      async function example() {
        const num = await 42
        return num
      }
      
      expect(await example()).toBe(42)
    })
    
    it('should work with thenable objects', async () => {
      // From: awaiting a thenable
      const thenable = {
        then(resolve) {
          resolve('thenable value')
        }
      }
      
      async function example() {
        return await thenable
      }
      
      expect(await example()).toBe('thenable value')
    })
    
    it('should not block the main thread - other code runs while waiting', async () => {
      // From: await pauses the function, not the thread
      const order = []
      
      async function slowOperation() {
        order.push('Starting slow operation')
        await Promise.resolve()
        order.push('Slow operation complete')
      }
      
      order.push('Before calling slowOperation')
      const promise = slowOperation()
      order.push('After calling slowOperation')
      
      // At this point, slowOperation is paused at await
      expect(order).toEqual([
        'Before calling slowOperation',
        'Starting slow operation',
        'After calling slowOperation'
      ])
      
      await promise
      
      expect(order).toEqual([
        'Before calling slowOperation',
        'Starting slow operation',
        'After calling slowOperation',
        'Slow operation complete'
      ])
    })
  })
  
  // ============================================================
  // HOW await WORKS UNDER THE HOOD
  // ============================================================
  
  describe('How await Works Under the Hood', () => {
    it('should run code before await synchronously', async () => {
      // From: code before await is synchronous
      const order = []
      
      async function example() {
        order.push('1. Before await')
        await Promise.resolve()
        order.push('2. After await')
      }
      
      order.push('A. Before call')
      example()
      order.push('B. After call')
      
      // Before microtasks run
      expect(order).toEqual([
        'A. Before call',
        '1. Before await',
        'B. After call'
      ])
      
      // Let microtasks run
      await Promise.resolve()
      
      expect(order).toEqual([
        'A. Before call',
        '1. Before await',
        'B. After call',
        '2. After await'
      ])
    })
    
    it('should treat code after await as a microtask', async () => {
      // From: await splits the function diagram
      const order = []
      
      async function asyncFn() {
        order.push('async start')
        await Promise.resolve()
        order.push('async after await')
      }
      
      order.push('script start')
      asyncFn()
      order.push('script end')
      
      // Await hasn't resolved yet
      expect(order).toEqual(['script start', 'async start', 'script end'])
      
      await Promise.resolve()
      
      expect(order).toEqual(['script start', 'async start', 'script end', 'async after await'])
    })
    
    it('should handle multiple await statements', async () => {
      const order = []
      
      async function multipleAwaits() {
        order.push('start')
        await Promise.resolve()
        order.push('after first await')
        await Promise.resolve()
        order.push('after second await')
      }
      
      multipleAwaits()
      order.push('sync after call')
      
      expect(order).toEqual(['start', 'sync after call'])
      
      await Promise.resolve()
      expect(order).toEqual(['start', 'sync after call', 'after first await'])
      
      await Promise.resolve()
      expect(order).toEqual(['start', 'sync after call', 'after first await', 'after second await'])
    })
  })
  
  // ============================================================
  // ERROR HANDLING WITH try/catch
  // ============================================================
  
  describe('Error Handling with try/catch', () => {
    it('should catch rejected Promises with try/catch', async () => {
      // From: Basic try/catch pattern
      async function fetchData() {
        try {
          await Promise.reject(new Error('Network error'))
          return 'success'
        } catch (error) {
          return `caught: ${error.message}`
        }
      }
      
      expect(await fetchData()).toBe('caught: Network error')
    })
    
    it('should catch errors thrown in async functions', async () => {
      async function mightFail(shouldFail) {
        if (shouldFail) {
          throw new Error('Failed!')
        }
        return 'Success'
      }
      
      expect(await mightFail(false)).toBe('Success')
      await expect(mightFail(true)).rejects.toThrow('Failed!')
    })
    
    it('should run finally block regardless of success or failure', async () => {
      // From: The finally block
      const results = []
      
      async function withFinally(shouldFail) {
        try {
          if (shouldFail) {
            throw new Error('error')
          }
          results.push('success')
        } catch (error) {
          results.push('caught')
        } finally {
          results.push('finally')
        }
      }
      
      await withFinally(false)
      expect(results).toEqual(['success', 'finally'])
      
      results.length = 0
      await withFinally(true)
      expect(results).toEqual(['caught', 'finally'])
    })
    
    it('should demonstrate the swallowed error mistake', async () => {
      // From: The Trap - if you catch but don't re-throw, Promise resolves with undefined
      async function swallowsError() {
        try {
          throw new Error('Oops')
        } catch (error) {
          console.error('Error:', error)
          // Missing: throw error
        }
      }
      
      // This resolves (not rejects!) with undefined
      const result = await swallowsError()
      expect(result).toBeUndefined()
    })
    
    it('should propagate errors when re-thrown', async () => {
      async function rethrowsError() {
        try {
          throw new Error('Oops')
        } catch (error) {
          throw error  // Re-throw
        }
      }
      
      await expect(rethrowsError()).rejects.toThrow('Oops')
    })
    
    it('should catch errors from nested async calls', async () => {
      // From: Interview Question 3 - Error Handling
      async function inner() {
        throw new Error('Oops!')
      }
      
      async function outer() {
        try {
          await inner()
          return 'success'
        } catch (e) {
          return `caught: ${e.message}`
        }
      }
      
      expect(await outer()).toBe('caught: Oops!')
    })
  })
  
  // ============================================================
  // SEQUENTIAL VS PARALLEL EXECUTION
  // ============================================================
  
  describe('Sequential vs Parallel Execution', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should demonstrate slow sequential execution', async () => {
      // From: The Problem - Unnecessary Sequential Execution
      const delay = (ms, value) => new Promise(resolve => 
        setTimeout(() => resolve(value), ms)
      )
      
      async function sequential() {
        const start = Date.now()
        const a = await delay(100, 'a')
        const b = await delay(100, 'b')
        const c = await delay(100, 'c')
        return { a, b, c, time: Date.now() - start }
      }
      
      const promise = sequential()
      
      // Advance through all three delays
      await vi.advanceTimersByTimeAsync(100)
      await vi.advanceTimersByTimeAsync(100)
      await vi.advanceTimersByTimeAsync(100)
      
      const result = await promise
      expect(result.a).toBe('a')
      expect(result.b).toBe('b')
      expect(result.c).toBe('c')
      expect(result.time).toBeGreaterThanOrEqual(300)  // Sequential: 100+100+100
    })
    
    it('should demonstrate fast parallel execution with Promise.all', async () => {
      // From: The Solution - Promise.all for Parallel Execution
      const delay = (ms, value) => new Promise(resolve => 
        setTimeout(() => resolve(value), ms)
      )
      
      async function parallel() {
        const start = Date.now()
        const [a, b, c] = await Promise.all([
          delay(100, 'a'),
          delay(100, 'b'),
          delay(100, 'c')
        ])
        return { a, b, c, time: Date.now() - start }
      }
      
      const promise = parallel()
      
      // All three start at once, so only need 100ms total
      await vi.advanceTimersByTimeAsync(100)
      
      const result = await promise
      expect(result.a).toBe('a')
      expect(result.b).toBe('b')
      expect(result.c).toBe('c')
      expect(result.time).toBe(100)  // Parallel: max(100,100,100) = 100
    })
    
    it('should fail fast with Promise.all when any Promise rejects', async () => {
      // From: Promise.all - fails fast
      const results = await Promise.allSettled([
        Promise.resolve('success'),
        Promise.reject(new Error('fail')),
        Promise.resolve('also success')
      ])
      
      expect(results[0]).toEqual({ status: 'fulfilled', value: 'success' })
      expect(results[1].status).toBe('rejected')
      expect(results[1].reason.message).toBe('fail')
      expect(results[2]).toEqual({ status: 'fulfilled', value: 'also success' })
    })
    
    it('should get all results with Promise.allSettled', async () => {
      // From: Promise.allSettled - waits for all
      const results = await Promise.allSettled([
        Promise.resolve('a'),
        Promise.reject(new Error('b failed')),
        Promise.resolve('c')
      ])
      
      const successful = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value)
        
      const failed = results
        .filter(r => r.status === 'rejected')
        .map(r => r.reason.message)
      
      expect(successful).toEqual(['a', 'c'])
      expect(failed).toEqual(['b failed'])
    })
  })
  
  // ============================================================
  // COMMON MISTAKES
  // ============================================================
  
  describe('Common Mistakes', () => {
    it('Mistake #1: Forgetting await gives Promise instead of value', async () => {
      // From: Without await, you get a Promise object instead of the resolved value
      async function withoutAwait() {
        const value = Promise.resolve(42)  // Missing await!
        return value
      }
      
      async function withAwait() {
        const value = await Promise.resolve(42)
        return value
      }
      
      const withoutResult = await withoutAwait()
      const withResult = await withAwait()
      
      // Both eventually resolve to 42, but withoutAwait returns a Promise
      expect(withoutResult).toBe(42)  // Works because we await the function
      expect(withResult).toBe(42)
    })
    
    it('Mistake #2: forEach does not wait for async callbacks', async () => {
      // From: forEach doesn't wait for async callbacks
      const order = []
      const items = [1, 2, 3]
      
      // This is the WRONG way
      async function wrongWay() {
        items.forEach(async (item) => {
          await Promise.resolve()
          order.push(item)
        })
        order.push('done')
      }
      
      await wrongWay()
      // 'done' appears before the items because forEach doesn't wait
      expect(order[0]).toBe('done')
      
      // Let microtasks complete
      await Promise.resolve()
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['done', 1, 2, 3])
    })
    
    it('Mistake #2 Fix: Use for...of for sequential processing', async () => {
      // From: Use for...of for sequential
      const order = []
      const items = [1, 2, 3]
      
      async function rightWay() {
        for (const item of items) {
          await Promise.resolve()
          order.push(item)
        }
        order.push('done')
      }
      
      await rightWay()
      expect(order).toEqual([1, 2, 3, 'done'])
    })
    
    it('Mistake #2 Fix: Use Promise.all with map for parallel processing', async () => {
      // From: Use Promise.all for parallel
      const results = []
      const items = [1, 2, 3]
      
      async function parallelWay() {
        await Promise.all(
          items.map(async (item) => {
            await Promise.resolve()
            results.push(item)
          })
        )
        results.push('done')
      }
      
      await parallelWay()
      // Items may be in any order (parallel), but 'done' is always last
      expect(results).toContain(1)
      expect(results).toContain(2)
      expect(results).toContain(3)
      expect(results[results.length - 1]).toBe('done')
    })
    
    it('Mistake #4: Not handling errors leads to unhandled rejections', async () => {
      // From: Not Handling Errors
      async function riskyOperation() {
        throw new Error('Unhandled!')
      }
      
      // Without error handling, this would be an unhandled rejection
      await expect(riskyOperation()).rejects.toThrow('Unhandled!')
    })
  })
  
  // ============================================================
  // ADVANCED PATTERNS
  // ============================================================
  
  describe('Advanced Patterns', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should implement retry with exponential backoff', async () => {
      // From: Retry with Exponential Backoff
      let attempts = 0
      
      async function flakyOperation() {
        attempts++
        if (attempts < 3) {
          throw new Error('Temporary failure')
        }
        return 'success'
      }
      
      async function withRetry(operation, retries = 3, backoff = 100) {
        for (let attempt = 0; attempt < retries; attempt++) {
          try {
            return await operation()
          } catch (error) {
            if (attempt === retries - 1) throw error
            await new Promise(resolve => setTimeout(resolve, backoff * Math.pow(2, attempt)))
          }
        }
      }
      
      const promise = withRetry(flakyOperation, 3, 100)
      
      // First attempt fails, wait 100ms
      await vi.advanceTimersByTimeAsync(0)
      expect(attempts).toBe(1)
      
      // Second attempt after 100ms, fails, wait 200ms
      await vi.advanceTimersByTimeAsync(100)
      expect(attempts).toBe(2)
      
      // Third attempt after 200ms, succeeds
      await vi.advanceTimersByTimeAsync(200)
      
      const result = await promise
      expect(result).toBe('success')
      expect(attempts).toBe(3)
    })
    
    it('should implement timeout wrapper', async () => {
      // From: Timeout Wrapper
      async function withTimeout(promise, ms) {
        const timeout = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
        })
        return Promise.race([promise, timeout])
      }
      
      // Test successful case
      const fastPromise = withTimeout(Promise.resolve('fast'), 1000)
      expect(await fastPromise).toBe('fast')
      
      // Test timeout case
      const slowPromise = new Promise(resolve => setTimeout(() => resolve('slow'), 2000))
      const timeoutPromise = withTimeout(slowPromise, 100)
      
      // Advance time to trigger timeout
      vi.advanceTimersByTime(100)
      
      await expect(timeoutPromise).rejects.toThrow('Timeout after 100ms')
    })
    
    it('should implement cancellation with AbortController', async () => {
      // From: Cancellation with AbortController
      async function fetchWithCancellation(signal) {
        return new Promise((resolve, reject) => {
          const timeoutId = setTimeout(() => resolve('data'), 1000)
          
          signal.addEventListener('abort', () => {
            clearTimeout(timeoutId)
            reject(new DOMException('Aborted', 'AbortError'))
          })
        })
      }
      
      const controller = new AbortController()
      const promise = fetchWithCancellation(controller.signal)
      
      // Cancel before it completes
      controller.abort()
      
      await expect(promise).rejects.toThrow('Aborted')
    })
    
    it('should convert callback API to async/await', async () => {
      // From: Converting Callback APIs to async/await
      function callbackApi(value, callback) {
        setTimeout(() => {
          if (value < 0) {
            callback(new Error('Negative value'))
          } else {
            callback(null, value * 2)
          }
        }, 100)
      }
      
      // Promisified version
      function asyncApi(value) {
        return new Promise((resolve, reject) => {
          callbackApi(value, (err, result) => {
            if (err) reject(err)
            else resolve(result)
          })
        })
      }
      
      // Test success
      const successPromise = asyncApi(21)
      await vi.advanceTimersByTimeAsync(100)
      expect(await successPromise).toBe(42)
      
      // Test failure - must attach handler BEFORE advancing time
      const failPromise = asyncApi(-1)
      const failHandler = expect(failPromise).rejects.toThrow('Negative value')
      await vi.advanceTimersByTimeAsync(100)
      await failHandler
    })
  })
  
  // ============================================================
  // INTERVIEW QUESTIONS
  // ============================================================
  
  describe('Interview Questions', () => {
    it('Question 1: What is the output order?', async () => {
      // From: Interview Question 1
      const order = []
      
      async function test() {
        order.push('1')
        await Promise.resolve()
        order.push('2')
      }
      
      order.push('A')
      test()
      order.push('B')
      
      // Before microtasks
      expect(order).toEqual(['A', '1', 'B'])
      
      await Promise.resolve()
      
      // After microtasks
      expect(order).toEqual(['A', '1', 'B', '2'])
    })
    
    it('Question 2: Sequential vs Parallel timing', async () => {
      // From: Interview Question 2
      vi.useFakeTimers()
      
      function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      
      // Version A - Sequential
      async function versionA() {
        const start = Date.now()
        await delay(100)
        await delay(100)
        return Date.now() - start
      }
      
      // Version B - Parallel
      async function versionB() {
        const start = Date.now()
        await Promise.all([delay(100), delay(100)])
        return Date.now() - start
      }
      
      const promiseA = versionA()
      await vi.advanceTimersByTimeAsync(200)
      const timeA = await promiseA
      
      const promiseB = versionB()
      await vi.advanceTimersByTimeAsync(100)
      const timeB = await promiseB
      
      expect(timeA).toBe(200)  // Sequential: 100 + 100
      expect(timeB).toBe(100)  // Parallel: max(100, 100)
      
      vi.useRealTimers()
    })
    
    it('Question 4: The forEach trap', async () => {
      // From: Interview Question 4 - The forEach Trap
      vi.useFakeTimers()
      
      const order = []
      
      async function processItems() {
        const items = [1, 2, 3]
        
        items.forEach(async (item) => {
          await new Promise(resolve => setTimeout(resolve, 100))
          order.push(item)
        })
        
        order.push('Done')
      }
      
      processItems()
      
      // 'Done' appears immediately because forEach doesn't wait
      expect(order).toEqual(['Done'])
      
      // After delays complete
      await vi.advanceTimersByTimeAsync(100)
      await Promise.resolve()
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['Done', 1, 2, 3])
      
      vi.useRealTimers()
    })
    
    it('Question 5: Unnecessary await before return', async () => {
      // From: Interview Question 5 - What is wrong here?
      
      // This await is unnecessary (but not wrong)
      async function unnecessaryAwait() {
        return await Promise.resolve(42)
      }
      
      // This is equivalent and cleaner
      async function noAwait() {
        return Promise.resolve(42)
      }
      
      expect(await unnecessaryAwait()).toBe(42)
      expect(await noAwait()).toBe(42)
    })
    
    it('Question 6: Complex output order with async/await, Promises, and setTimeout', async () => {
      // From: Test Your Knowledge Question 6
      vi.useFakeTimers()
      
      const order = []
      
      order.push('1')
      setTimeout(() => order.push('2'), 0)
      Promise.resolve().then(() => order.push('3'))
      
      async function test() {
        order.push('4')
        await Promise.resolve()
        order.push('5')
      }
      
      test()
      order.push('6')
      
      // Synchronous code completes: 1, 4, 6
      expect(order).toEqual(['1', '4', '6'])
      
      // Microtasks run: 3, 5
      await Promise.resolve()
      await Promise.resolve()
      expect(order).toEqual(['1', '4', '6', '3', '5'])
      
      // Macrotask runs: 2
      await vi.advanceTimersByTimeAsync(0)
      expect(order).toEqual(['1', '4', '6', '3', '5', '2'])
      
      vi.useRealTimers()
    })
  })
  
  // ============================================================
  // ASYNC/AWAIT WITH PROMISES INTEROPERABILITY
  // ============================================================
  
  describe('async/await and Promises Interoperability', () => {
    it('should work with .then() on async function results', async () => {
      async function getData() {
        return 42
      }
      
      const result = await getData().then(x => x * 2)
      expect(result).toBe(84)
    })
    
    it('should work with .catch() on async function results', async () => {
      async function failingFn() {
        throw new Error('failed')
      }
      
      const result = await failingFn().catch(err => `caught: ${err.message}`)
      expect(result).toBe('caught: failed')
    })
    
    it('should allow mixing async/await and Promise chains', async () => {
      async function step1() {
        return 'step1'
      }
      
      function step2(prev) {
        return Promise.resolve(`${prev} -> step2`)
      }
      
      async function step3(prev) {
        return `${prev} -> step3`
      }
      
      const result = await step1()
        .then(step2)
        .then(step3)
      
      expect(result).toBe('step1 -> step2 -> step3')
    })
    
    it('should handle Promise.race with async functions', async () => {
      vi.useFakeTimers()
      
      async function fast() {
        await new Promise(resolve => setTimeout(resolve, 50))
        return 'fast'
      }
      
      async function slow() {
        await new Promise(resolve => setTimeout(resolve, 200))
        return 'slow'
      }
      
      const racePromise = Promise.race([fast(), slow()])
      
      await vi.advanceTimersByTimeAsync(50)
      
      expect(await racePromise).toBe('fast')
      
      vi.useRealTimers()
    })
  })
  
  // ============================================================
  // EDGE CASES
  // ============================================================
  
  describe('Edge Cases', () => {
    it('should handle async function that returns undefined', async () => {
      async function returnsNothing() {
        await Promise.resolve()
        // No return statement
      }
      
      const result = await returnsNothing()
      expect(result).toBeUndefined()
    })
    
    it('should handle async function that returns null', async () => {
      async function returnsNull() {
        return null
      }
      
      const result = await returnsNull()
      expect(result).toBeNull()
    })
    
    it('should handle nested async functions', async () => {
      async function outer() {
        async function inner() {
          return await Promise.resolve('inner value')
        }
        return await inner()
      }
      
      expect(await outer()).toBe('inner value')
    })
    
    it('should handle async IIFE', async () => {
      const result = await (async () => {
        return 'IIFE result'
      })()
      
      expect(result).toBe('IIFE result')
    })
    
    it('should handle await in conditional', async () => {
      async function conditionalAwait(condition) {
        if (condition) {
          return await Promise.resolve('true branch')
        } else {
          return await Promise.resolve('false branch')
        }
      }
      
      expect(await conditionalAwait(true)).toBe('true branch')
      expect(await conditionalAwait(false)).toBe('false branch')
    })
    
    it('should handle await in try-catch-finally', async () => {
      const order = []
      
      async function withTryCatchFinally() {
        try {
          order.push('try start')
          await Promise.resolve()
          order.push('try end')
          throw new Error('test')
        } catch (e) {
          order.push('catch')
          await Promise.resolve()
          order.push('catch after await')
        } finally {
          order.push('finally')
          await Promise.resolve()
          order.push('finally after await')
        }
      }
      
      await withTryCatchFinally()
      
      expect(order).toEqual([
        'try start',
        'try end',
        'catch',
        'catch after await',
        'finally',
        'finally after await'
      ])
    })
    
    it('should handle await in loop', async () => {
      async function loopWithAwait() {
        const results = []
        for (let i = 0; i < 3; i++) {
          results.push(await Promise.resolve(i))
        }
        return results
      }
      
      expect(await loopWithAwait()).toEqual([0, 1, 2])
    })
    
    it('should handle rejected Promise without await in try block', async () => {
      // This is a subtle bug - the catch won't catch the rejection
      // because the Promise is returned, not awaited
      async function subtleBug() {
        try {
          return Promise.reject(new Error('not caught'))
        } catch (e) {
          return 'caught'
        }
      }
      
      // The error is NOT caught by the try-catch
      await expect(subtleBug()).rejects.toThrow('not caught')
    })
    
    it('should catch rejected Promise when awaited in try block', async () => {
      async function fixedVersion() {
        try {
          return await Promise.reject(new Error('is caught'))
        } catch (e) {
          return 'caught'
        }
      }
      
      // Now the error IS caught
      expect(await fixedVersion()).toBe('caught')
    })
  })
})
