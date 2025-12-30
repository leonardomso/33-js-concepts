import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Event Loop, Timers and Scheduling', () => {
  
  // ============================================================
  // SYNCHRONOUS EXECUTION
  // ============================================================
  
  describe('Synchronous Execution', () => {
    it('should execute code one line at a time in order', () => {
      // From lines 99-104: JavaScript executes these ONE AT A TIME, in order
      const order = []
      
      order.push('First')   // 1. This runs
      order.push('Second')  // 2. Then this
      order.push('Third')   // 3. Then this
      
      expect(order).toEqual(['First', 'Second', 'Third'])
    })
    
    it('should execute nested function calls correctly (multiply, square, printSquare)', () => {
      // From lines 210-224: Call Stack example
      function multiply(a, b) {
        return a * b
      }
      
      function square(n) {
        return multiply(n, n)
      }
      
      function printSquare(n) {
        const result = square(n)
        return result
      }
      
      expect(printSquare(4)).toBe(16)
      expect(square(5)).toBe(25)
      expect(multiply(3, 4)).toBe(12)
    })
    
    it('should store objects and arrays in the heap', () => {
      // From lines 243-245: Heap example
      const user = { name: 'Alice' }  // Object stored in heap
      const numbers = [1, 2, 3]       // Array stored in heap
      
      expect(user).toEqual({ name: 'Alice' })
      expect(numbers).toEqual([1, 2, 3])
    })
  })
  
  // ============================================================
  // setTimeout BASICS
  // ============================================================
  
  describe('setTimeout Basics', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should run callback after specified delay', async () => {
      const callback = vi.fn()
      
      setTimeout(callback, 2000)
      
      expect(callback).not.toHaveBeenCalled()
      
      await vi.advanceTimersByTimeAsync(2000)
      
      expect(callback).toHaveBeenCalledTimes(1)
    })
    
    it('should pass arguments to the callback', async () => {
      // From lines 562-566: Pass arguments to the callback
      let result = ''
      
      setTimeout((name, greeting) => {
        result = `${greeting}, ${name}!`
      }, 1000, 'Alice', 'Hello')
      
      await vi.advanceTimersByTimeAsync(1000)
      
      expect(result).toBe('Hello, Alice!')
    })
    
    it('should cancel timeout with clearTimeout', async () => {
      // From lines 569-577: Canceling a timeout
      const callback = vi.fn()
      
      const timerId = setTimeout(callback, 5000)
      
      // Cancel it before it fires
      clearTimeout(timerId)
      
      await vi.advanceTimersByTimeAsync(5000)
      
      expect(callback).not.toHaveBeenCalled()
    })
    
    it('should demonstrate the zero delay myth - setTimeout(fn, 0) does NOT run immediately', async () => {
      // From lines 580-589: Zero delay myth
      const order = []
      
      order.push('A')
      setTimeout(() => order.push('B'), 0)
      order.push('C')
      
      // Before advancing timers, only sync code has run
      expect(order).toEqual(['A', 'C'])
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Output: A, C, B (NOT A, B, C!)
      expect(order).toEqual(['A', 'C', 'B'])
    })
    
    it('should run synchronous code first, then setTimeout callback', async () => {
      // From lines 313-323: Basic setTimeout example
      const order = []
      
      order.push('Start')
      
      setTimeout(() => {
        order.push('Timeout')
      }, 0)
      
      order.push('End')
      
      // Before microtasks/timers run
      expect(order).toEqual(['Start', 'End'])
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Output: Start, End, Timeout
      expect(order).toEqual(['Start', 'End', 'Timeout'])
    })
    
    it('should run multiple setTimeout callbacks in order of their delays', async () => {
      const order = []
      
      setTimeout(() => order.push('200ms'), 200)
      setTimeout(() => order.push('100ms'), 100)
      setTimeout(() => order.push('300ms'), 300)
      
      await vi.advanceTimersByTimeAsync(300)
      
      expect(order).toEqual(['100ms', '200ms', '300ms'])
    })
    
    it('should run setTimeout callbacks with same delay in registration order', async () => {
      const order = []
      
      setTimeout(() => order.push('first'), 100)
      setTimeout(() => order.push('second'), 100)
      setTimeout(() => order.push('third'), 100)
      
      await vi.advanceTimersByTimeAsync(100)
      
      expect(order).toEqual(['first', 'second', 'third'])
    })
    
    it('should demonstrate the 4ms minimum delay after nested timeouts', async () => {
      // From lines 601-615: After 5 nested timeouts, browsers enforce a minimum 4ms delay
      // Note: Vitest fake timers don't enforce the 4ms minimum, so we test the pattern
      const times = []
      let start = Date.now()
      
      function run() {
        times.push(Date.now() - start)
        if (times.length < 10) {
          setTimeout(run, 0)
        }
      }
      
      setTimeout(run, 0)
      
      // Run all nested timeouts
      await vi.runAllTimersAsync()
      
      // Should have 10 timestamps recorded
      expect(times.length).toBe(10)
      
      // In fake timers, all execute at 0ms intervals
      // In real browsers, after 5 nested calls, minimum becomes 4ms
      // Pattern: [1, 1, 1, 1, 4, 9, 14, 19, 24, 29] approximately
    })
  })
  
  // ============================================================
  // DEBOUNCE PATTERN
  // ============================================================
  
  describe('Debounce Pattern', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should cancel previous timeout when implementing debounce', async () => {
      // From lines 1341-1349: Cancel previous timeout (debounce)
      const searchResults = []
      let timeoutId
      
      function handleInput(value) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          searchResults.push(`search: ${value}`)
        }, 300)
      }
      
      // Simulate rapid typing
      handleInput('a')
      await vi.advanceTimersByTimeAsync(100)
      
      handleInput('ab')
      await vi.advanceTimersByTimeAsync(100)
      
      handleInput('abc')
      await vi.advanceTimersByTimeAsync(100)
      
      // At this point, 300ms hasn't passed since last input
      expect(searchResults).toEqual([])
      
      // Wait for debounce delay
      await vi.advanceTimersByTimeAsync(300)
      
      // Only the last input should trigger a search
      expect(searchResults).toEqual(['search: abc'])
    })
    
    it('should execute immediately if enough time passes between inputs', async () => {
      const searchResults = []
      let timeoutId
      
      function handleInput(value) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          searchResults.push(`search: ${value}`)
        }, 300)
      }
      
      handleInput('first')
      await vi.advanceTimersByTimeAsync(300)
      expect(searchResults).toEqual(['search: first'])
      
      handleInput('second')
      await vi.advanceTimersByTimeAsync(300)
      expect(searchResults).toEqual(['search: first', 'search: second'])
    })
  })
  
  // ============================================================
  // SETINTERVAL WITH ASYNC PROBLEM
  // ============================================================
  
  describe('setInterval with Async Problem', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should demonstrate overlapping requests with setInterval and async', async () => {
      // From lines 1521-1526: If fetch takes longer than interval, multiple requests overlap
      const requestsStarted = []
      const requestsCompleted = []
      let requestCount = 0
      
      // Simulate a slow fetch that takes 1500ms
      async function slowFetch() {
        const id = ++requestCount
        requestsStarted.push(`request ${id} started`)
        await new Promise(resolve => setTimeout(resolve, 1500))
        requestsCompleted.push(`request ${id} completed`)
      }
      
      // Start interval that fires every 1000ms
      const intervalId = setInterval(async () => {
        await slowFetch()
      }, 1000)
      
      // After 1000ms: first request starts
      await vi.advanceTimersByTimeAsync(1000)
      await Promise.resolve()
      expect(requestsStarted).toEqual(['request 1 started'])
      expect(requestsCompleted).toEqual([])
      
      // After 2000ms: second request starts (first still pending!)
      await vi.advanceTimersByTimeAsync(1000)
      await Promise.resolve()
      expect(requestsStarted).toEqual(['request 1 started', 'request 2 started'])
      expect(requestsCompleted).toEqual([]) // First request still not done
      
      // After 2500ms: first request completes
      await vi.advanceTimersByTimeAsync(500)
      await Promise.resolve()
      expect(requestsCompleted).toEqual(['request 1 completed'])
      
      // Clean up
      clearInterval(intervalId)
    })
    
    it('should demonstrate the fix using nested setTimeout for polling', async () => {
      // From lines 1532-1539: Schedule next AFTER completion
      const requestsStarted = []
      const requestsCompleted = []
      let requestCount = 0
      let isPolling = true
      
      // Simulate a slow fetch that takes 1500ms
      async function slowFetch() {
        const id = ++requestCount
        requestsStarted.push(`request ${id} started`)
        await new Promise(resolve => setTimeout(resolve, 1500))
        requestsCompleted.push(`request ${id} completed`)
      }
      
      // Fixed polling pattern
      async function poll() {
        await slowFetch()
        if (isPolling && requestCount < 3) {
          setTimeout(poll, 1000) // Schedule next AFTER completion
        }
      }
      
      poll()
      
      // Request 1 starts immediately
      await Promise.resolve()
      expect(requestsStarted).toEqual(['request 1 started'])
      
      // After 1500ms: request 1 completes, then waits 1000ms before next
      await vi.advanceTimersByTimeAsync(1500)
      await Promise.resolve()
      expect(requestsCompleted).toEqual(['request 1 completed'])
      expect(requestsStarted.length).toBe(1) // No overlapping request!
      
      // After 2500ms (1500 + 1000): request 2 starts
      await vi.advanceTimersByTimeAsync(1000)
      await Promise.resolve()
      expect(requestsStarted).toEqual(['request 1 started', 'request 2 started'])
      
      // After 4000ms (1500 + 1000 + 1500): request 2 completes
      await vi.advanceTimersByTimeAsync(1500)
      await Promise.resolve()
      expect(requestsCompleted).toEqual(['request 1 completed', 'request 2 completed'])
      
      isPolling = false
    })
  })
  
  // ============================================================
  // PROMISES AND MICROTASKS
  // ============================================================
  
  describe('Promises and Microtasks', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should run Promise.then() as a microtask', async () => {
      const order = []
      
      order.push('sync 1')
      Promise.resolve().then(() => order.push('promise'))
      order.push('sync 2')
      
      // Microtask hasn't run yet
      expect(order).toEqual(['sync 1', 'sync 2'])
      
      // Let microtasks drain
      await Promise.resolve()
      
      expect(order).toEqual(['sync 1', 'sync 2', 'promise'])
    })
    
    it('should run Promises BEFORE setTimeout (microtasks before macrotasks)', async () => {
      // From lines 391-401: Promises vs setTimeout
      const order = []
      
      order.push('1')
      
      setTimeout(() => order.push('2'), 0)
      
      Promise.resolve().then(() => order.push('3'))
      
      order.push('4')
      
      // Let microtasks drain first
      await Promise.resolve()
      
      // At this point: ['1', '4', '3']
      expect(order).toEqual(['1', '4', '3'])
      
      // Now let timers run
      await vi.advanceTimersByTimeAsync(0)
      
      // Output: 1, 4, 3, 2
      expect(order).toEqual(['1', '4', '3', '2'])
    })
    
    it('should drain entire microtask queue before any macrotask', async () => {
      // From lines 449-467: Nested Microtasks
      const order = []
      
      order.push('Start')
      
      Promise.resolve()
        .then(() => {
          order.push('Promise 1')
          Promise.resolve().then(() => order.push('Promise 2'))
        })
      
      setTimeout(() => order.push('Timeout'), 0)
      
      order.push('End')
      
      // Let all microtasks drain
      await Promise.resolve()
      await Promise.resolve() // Need two ticks for nested promise
      
      expect(order).toEqual(['Start', 'End', 'Promise 1', 'Promise 2'])
      
      // Now let timers run
      await vi.advanceTimersByTimeAsync(0)
      
      // Output: Start, End, Promise 1, Promise 2, Timeout
      expect(order).toEqual(['Start', 'End', 'Promise 1', 'Promise 2', 'Timeout'])
    })
    
    it('should process newly added microtasks during microtask processing', async () => {
      const order = []
      
      Promise.resolve().then(() => {
        order.push('first')
        Promise.resolve().then(() => {
          order.push('second')
          Promise.resolve().then(() => {
            order.push('third')
          })
        })
      })
      
      // Drain all microtasks - need multiple ticks for nested promises
      await Promise.resolve()
      await Promise.resolve()
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['first', 'second', 'third'])
    })
    
    it('should run queueMicrotask as a microtask', async () => {
      const order = []
      
      order.push('sync 1')
      queueMicrotask(() => order.push('microtask'))
      order.push('sync 2')
      
      await Promise.resolve()
      
      expect(order).toEqual(['sync 1', 'sync 2', 'microtask'])
    })
    
    it('should interleave Promise.resolve() and queueMicrotask in order', async () => {
      const order = []
      
      Promise.resolve().then(() => order.push('promise 1'))
      queueMicrotask(() => order.push('queueMicrotask 1'))
      Promise.resolve().then(() => order.push('promise 2'))
      queueMicrotask(() => order.push('queueMicrotask 2'))
      
      await Promise.resolve()
      await Promise.resolve()
      
      // Microtasks run in order they were queued
      expect(order).toEqual(['promise 1', 'queueMicrotask 1', 'promise 2', 'queueMicrotask 2'])
    })
    
    it('should demonstrate that Promise.resolve() creates a microtask, not synchronous execution', async () => {
      const order = []
      
      const promise = Promise.resolve('value')
      order.push('after Promise.resolve()')
      
      promise.then(value => order.push(`then: ${value}`))
      order.push('after .then()')
      
      await Promise.resolve()
      
      expect(order).toEqual([
        'after Promise.resolve()',
        'after .then()',
        'then: value'
      ])
    })
  })
  
  // ============================================================
  // setInterval
  // ============================================================
  
  describe('setInterval', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should run callback repeatedly at specified interval', async () => {
      // From lines 649-662: Basic setInterval usage
      let count = 0
      const results = []
      
      const intervalId = setInterval(() => {
        count++
        results.push(`Count: ${count}`)
        
        if (count >= 5) {
          clearInterval(intervalId)
          results.push('Done!')
        }
      }, 1000)
      
      // Advance through 5 intervals
      await vi.advanceTimersByTimeAsync(5000)
      
      expect(results).toEqual([
        'Count: 1',
        'Count: 2',
        'Count: 3',
        'Count: 4',
        'Count: 5',
        'Done!'
      ])
      expect(count).toBe(5)
    })
    
    it('should stop running when clearInterval is called', async () => {
      const callback = vi.fn()
      
      const intervalId = setInterval(callback, 100)
      
      await vi.advanceTimersByTimeAsync(250)
      expect(callback).toHaveBeenCalledTimes(2)
      
      clearInterval(intervalId)
      
      await vi.advanceTimersByTimeAsync(500)
      // Should still be 2, not more
      expect(callback).toHaveBeenCalledTimes(2)
    })
    
    it('should pass arguments to the interval callback', async () => {
      const results = []
      
      const intervalId = setInterval((prefix, suffix) => {
        results.push(`${prefix}test${suffix}`)
      }, 100, '[', ']')
      
      await vi.advanceTimersByTimeAsync(300)
      
      clearInterval(intervalId)
      
      expect(results).toEqual(['[test]', '[test]', '[test]'])
    })
  })
  
  // ============================================================
  // NESTED setTimeout (preciseInterval pattern)
  // ============================================================
  
  describe('Nested setTimeout (preciseInterval pattern)', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should implement preciseInterval with nested setTimeout', async () => {
      // From lines 695-706: Nested setTimeout guarantees delay BETWEEN executions
      const results = []
      let callCount = 0
      
      function preciseInterval(callback, delay) {
        function tick() {
          callback()
          if (callCount < 3) {
            setTimeout(tick, delay)
          }
        }
        setTimeout(tick, delay)
      }
      
      preciseInterval(() => {
        callCount++
        results.push(`tick ${callCount}`)
      }, 1000)
      
      await vi.advanceTimersByTimeAsync(3000)
      
      expect(results).toEqual(['tick 1', 'tick 2', 'tick 3'])
    })
    
    it('should schedule next timeout only after callback completes', async () => {
      const timestamps = []
      let count = 0
      
      function recursiveTimeout() {
        timestamps.push(Date.now())
        count++
        if (count < 3) {
          setTimeout(recursiveTimeout, 100)
        }
      }
      
      setTimeout(recursiveTimeout, 100)
      
      await vi.advanceTimersByTimeAsync(300)
      
      expect(timestamps.length).toBe(3)
      // Each timestamp should be 100ms apart
      expect(timestamps[1] - timestamps[0]).toBe(100)
      expect(timestamps[2] - timestamps[1]).toBe(100)
    })
  })
  
  // ============================================================
  // async/await
  // ============================================================
  
  describe('async/await', () => {
    it('should run code before await synchronously', async () => {
      // From lines 955-964: async/await ordering
      const order = []
      
      async function foo() {
        order.push('foo start')
        await Promise.resolve()
        order.push('foo end')
      }
      
      order.push('script start')
      foo()
      order.push('script end')
      
      // At this point, foo has paused at await
      expect(order).toEqual(['script start', 'foo start', 'script end'])
      
      // Let microtasks drain
      await Promise.resolve()
      
      // Output: script start, foo start, script end, foo end
      expect(order).toEqual(['script start', 'foo start', 'script end', 'foo end'])
    })
    
    it('should treat code after await as a microtask', async () => {
      const order = []
      
      async function asyncFn() {
        order.push('async start')
        await Promise.resolve()
        order.push('async after await')
      }
      
      order.push('before call')
      asyncFn()
      order.push('after call')
      
      // Await hasn't resolved yet
      expect(order).toEqual(['before call', 'async start', 'after call'])
      
      await Promise.resolve()
      
      expect(order).toEqual(['before call', 'async start', 'after call', 'async after await'])
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
    
    it('should handle async functions returning values', async () => {
      async function getValue() {
        await Promise.resolve()
        return 42
      }
      
      const result = await getValue()
      expect(result).toBe(42)
    })
    
    it('should handle async functions with try/catch', async () => {
      async function mightFail(shouldFail) {
        await Promise.resolve()
        if (shouldFail) {
          throw new Error('Failed!')
        }
        return 'Success'
      }
      
      await expect(mightFail(false)).resolves.toBe('Success')
      await expect(mightFail(true)).rejects.toThrow('Failed!')
    })
  })
  
  // ============================================================
  // INTERVIEW QUESTIONS
  // ============================================================
  
  describe('Interview Questions', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('Question 1: Basic Output Order - should output 1, 4, 3, 2', async () => {
      // From lines 900-918
      const order = []
      
      order.push('1')
      setTimeout(() => order.push('2'), 0)
      Promise.resolve().then(() => order.push('3'))
      order.push('4')
      
      // Drain microtasks
      await Promise.resolve()
      
      expect(order).toEqual(['1', '4', '3'])
      
      // Drain macrotasks
      await vi.advanceTimersByTimeAsync(0)
      
      expect(order).toEqual(['1', '4', '3', '2'])
    })
    
    it('Question 2: Nested Promises and Timeouts - should output sync, promise 1, promise 2, timeout 1, timeout 2', async () => {
      // From lines 921-951
      const order = []
      
      setTimeout(() => order.push('timeout 1'), 0)
      
      Promise.resolve().then(() => {
        order.push('promise 1')
        Promise.resolve().then(() => order.push('promise 2'))
      })
      
      setTimeout(() => order.push('timeout 2'), 0)
      
      order.push('sync')
      
      // Sync done
      expect(order).toEqual(['sync'])
      
      // Drain microtasks (including nested ones)
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['sync', 'promise 1', 'promise 2'])
      
      // Drain macrotasks
      await vi.advanceTimersByTimeAsync(0)
      
      expect(order).toEqual(['sync', 'promise 1', 'promise 2', 'timeout 1', 'timeout 2'])
    })
    
    it('Question 3: async/await Ordering - should output script start, foo start, script end, foo end', async () => {
      // From lines 953-981
      const order = []
      
      async function foo() {
        order.push('foo start')
        await Promise.resolve()
        order.push('foo end')
      }
      
      order.push('script start')
      foo()
      order.push('script end')
      
      await Promise.resolve()
      
      expect(order).toEqual(['script start', 'foo start', 'script end', 'foo end'])
    })
    
    it('Question 4a: setTimeout in a loop with var - should output 3, 3, 3', async () => {
      // From lines 985-997
      const order = []
      
      for (var i = 0; i < 3; i++) {
        setTimeout(() => order.push(i), 0)
      }
      
      await vi.advanceTimersByTimeAsync(0)
      
      // All callbacks see i = 3 because var is function-scoped
      expect(order).toEqual([3, 3, 3])
    })
    
    it('Question 4b: setTimeout in a loop with let - should output 0, 1, 2', async () => {
      // From lines 999-1004
      const order = []
      
      for (let i = 0; i < 3; i++) {
        setTimeout(() => order.push(i), 0)
      }
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Each callback has its own i because let is block-scoped
      expect(order).toEqual([0, 1, 2])
    })
    
    it('Question 4c: setTimeout in a loop with closure fix - should output 0, 1, 2', async () => {
      // From lines 1007-1015
      const order = []
      
      for (var i = 0; i < 3; i++) {
        ((j) => {
          setTimeout(() => order.push(j), 0)
        })(i)
      }
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Each IIFE captures the current value of i
      expect(order).toEqual([0, 1, 2])
    })
    
    it('Question 6: Microtask scheduling - microtask should run', async () => {
      // From lines 1051-1077 (simplified - not infinite)
      const order = []
      let count = 0
      
      function scheduleMicrotask() {
        Promise.resolve().then(() => {
          count++
          order.push(`microtask ${count}`)
          if (count < 3) {
            scheduleMicrotask()
          }
        })
      }
      
      scheduleMicrotask()
      
      // Drain all microtasks
      await Promise.resolve()
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['microtask 1', 'microtask 2', 'microtask 3'])
    })
    
    it('Misconception 1: setTimeout(fn, 0) does NOT run immediately - should output sync, promise, timeout', async () => {
      // From lines 1084-1096
      const order = []
      
      setTimeout(() => order.push('timeout'), 0)
      Promise.resolve().then(() => order.push('promise'))
      order.push('sync')
      
      await Promise.resolve()
      await vi.advanceTimersByTimeAsync(0)
      
      // Output: sync, promise, timeout (NOT sync, timeout, promise)
      expect(order).toEqual(['sync', 'promise', 'timeout'])
    })
    
    it('Test Your Knowledge Q3: Complex ordering - should output E, B, C, A, D', async () => {
      // From lines 1487-1504
      const order = []
      
      setTimeout(() => order.push('A'), 0)
      Promise.resolve().then(() => order.push('B'))
      Promise.resolve().then(() => {
        order.push('C')
        setTimeout(() => order.push('D'), 0)
      })
      order.push('E')
      
      // Drain microtasks
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['E', 'B', 'C'])
      
      // Drain macrotasks
      await vi.advanceTimersByTimeAsync(0)
      
      expect(order).toEqual(['E', 'B', 'C', 'A', 'D'])
    })
  })
  
  // ============================================================
  // COMMON PATTERNS
  // ============================================================
  
  describe('Common Patterns', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('this binding: regular function loses this context', async () => {
      // From lines 1354-1363
      const obj = {
        name: 'Alice',
        greet() {
          return new Promise(resolve => {
            setTimeout(function() {
              // 'this' is undefined in strict mode (or global in non-strict)
              resolve(this?.name)
            }, 100)
          })
        }
      }
      
      const resultPromise = obj.greet()
      await vi.advanceTimersByTimeAsync(100)
      const result = await resultPromise
      
      expect(result).toBeUndefined()
    })
    
    it('this binding: arrow function preserves this context', async () => {
      // From lines 1365-1373
      const obj = {
        name: 'Alice',
        greet() {
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(this.name)
            }, 100)
          })
        }
      }
      
      const resultPromise = obj.greet()
      await vi.advanceTimersByTimeAsync(100)
      const result = await resultPromise
      
      expect(result).toBe('Alice')
    })
    
    it('this binding: bind() preserves this context', async () => {
      // From lines 1375-1383
      const obj = {
        name: 'Alice',
        greet() {
          return new Promise(resolve => {
            setTimeout(function() {
              resolve(this.name)
            }.bind(this), 100)
          })
        }
      }
      
      const resultPromise = obj.greet()
      await vi.advanceTimersByTimeAsync(100)
      const result = await resultPromise
      
      expect(result).toBe('Alice')
    })
    
    it('closure in loop: var creates shared reference', async () => {
      // From lines 1388-1393
      const results = []
      
      for (var i = 0; i < 3; i++) {
        setTimeout(() => results.push(i), 100)
      }
      
      await vi.advanceTimersByTimeAsync(100)
      
      // Output: 3, 3, 3
      expect(results).toEqual([3, 3, 3])
    })
    
    it('closure in loop: let creates new binding per iteration', async () => {
      // From lines 1395-1399
      const results = []
      
      for (let i = 0; i < 3; i++) {
        setTimeout(() => results.push(i), 100)
      }
      
      await vi.advanceTimersByTimeAsync(100)
      
      // Output: 0, 1, 2
      expect(results).toEqual([0, 1, 2])
    })
    
    it('closure in loop: setTimeout third argument passes value', async () => {
      // From lines 1401-1405
      const results = []
      
      for (var i = 0; i < 3; i++) {
        setTimeout((j) => results.push(j), 100, i)
      }
      
      await vi.advanceTimersByTimeAsync(100)
      
      // Output: 0, 1, 2
      expect(results).toEqual([0, 1, 2])
    })
    
    it('should implement chunking with setTimeout', async () => {
      // From lines 1196-1215
      const processed = []
      const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      
      function processInChunks(items, process, chunkSize = 3) {
        let index = 0
        
        function doChunk() {
          const end = Math.min(index + chunkSize, items.length)
          
          for (; index < end; index++) {
            process(items[index])
          }
          
          if (index < items.length) {
            setTimeout(doChunk, 0)
          }
        }
        
        doChunk()
      }
      
      processInChunks(items, item => processed.push(item), 3)
      
      // First chunk runs synchronously
      expect(processed).toEqual([1, 2, 3])
      
      // Run all remaining timers
      await vi.runAllTimersAsync()
      
      expect(processed).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
    
    it('should implement async polling with nested setTimeout', async () => {
      // From lines 1532-1540
      const results = []
      let pollCount = 0
      
      async function poll() {
        // Simulate async fetch
        const data = await Promise.resolve(`data ${++pollCount}`)
        results.push(data)
        
        if (pollCount < 3) {
          setTimeout(poll, 1000)
        }
      }
      
      poll()
      
      // First poll completes immediately (Promise.resolve)
      await Promise.resolve()
      expect(results).toEqual(['data 1'])
      
      // Second poll after 1000ms
      await vi.advanceTimersByTimeAsync(1000)
      await Promise.resolve()
      expect(results).toEqual(['data 1', 'data 2'])
      
      // Third poll after another 1000ms
      await vi.advanceTimersByTimeAsync(1000)
      await Promise.resolve()
      expect(results).toEqual(['data 1', 'data 2', 'data 3'])
    })
  })
  
  // ============================================================
  // YIELDING TO EVENT LOOP
  // ============================================================
  
  describe('Yielding to Event Loop', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should yield with setTimeout(resolve, 0)', async () => {
      // From lines 1547-1548
      const order = []
      
      order.push('before yield')
      
      // Create the promise but don't await yet
      const yieldPromise = new Promise(resolve => setTimeout(resolve, 0))
      
      // Advance timers to resolve the setTimeout
      await vi.advanceTimersByTimeAsync(0)
      
      // Now await the resolved promise
      await yieldPromise
      
      order.push('after yield')
      
      expect(order).toEqual(['before yield', 'after yield'])
    })
    
    it('should yield with queueMicrotask', async () => {
      // From lines 1550-1551
      const order = []
      
      order.push('before yield')
      
      await new Promise(resolve => queueMicrotask(resolve))
      
      order.push('after yield')
      
      expect(order).toEqual(['before yield', 'after yield'])
    })
    
    it('should demonstrate difference between setTimeout and queueMicrotask yields', async () => {
      const order = []
      
      // Schedule a setTimeout callback
      setTimeout(() => order.push('timeout'), 0)
      
      // Yield with queueMicrotask - runs before timeout
      await new Promise(resolve => queueMicrotask(resolve))
      order.push('after queueMicrotask yield')
      
      // Timeout hasn't run yet
      expect(order).toEqual(['after queueMicrotask yield'])
      
      // Now let timeout run
      await vi.advanceTimersByTimeAsync(0)
      expect(order).toEqual(['after queueMicrotask yield', 'timeout'])
    })
  })
  
  // ============================================================
  // EDGE CASES
  // ============================================================
  
  describe('Edge Cases', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })
    
    afterEach(() => {
      vi.useRealTimers()
    })
    
    it('should handle Promise.resolve() vs new Promise()', async () => {
      const order = []
      
      // Both create microtasks
      Promise.resolve().then(() => order.push('Promise.resolve'))
      new Promise(resolve => resolve()).then(() => order.push('new Promise'))
      
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['Promise.resolve', 'new Promise'])
    })
    
    it('should handle setTimeout with 0 vs undefined delay', async () => {
      const order = []
      
      setTimeout(() => order.push('explicit 0'), 0)
      setTimeout(() => order.push('undefined delay'))
      
      await vi.advanceTimersByTimeAsync(0)
      
      // Both should run (undefined defaults to 0)
      expect(order).toEqual(['explicit 0', 'undefined delay'])
    })
    
    it('should handle clearTimeout with invalid ID', () => {
      // Should not throw
      expect(() => clearTimeout(undefined)).not.toThrow()
      expect(() => clearTimeout(null)).not.toThrow()
      expect(() => clearTimeout(999999)).not.toThrow()
    })
    
    it('should handle clearInterval with invalid ID', () => {
      // Should not throw
      expect(() => clearInterval(undefined)).not.toThrow()
      expect(() => clearInterval(null)).not.toThrow()
      expect(() => clearInterval(999999)).not.toThrow()
    })
    
    it('should handle promise rejection in microtask', async () => {
      const order = []
      
      Promise.resolve()
        .then(() => {
          order.push('then 1')
          throw new Error('error')
        })
        .catch(() => order.push('catch'))
        .then(() => order.push('then after catch'))
      
      await Promise.resolve()
      await Promise.resolve()
      await Promise.resolve()
      
      expect(order).toEqual(['then 1', 'catch', 'then after catch'])
    })
    
    it('should handle nested setTimeout with different delays', async () => {
      const order = []
      
      setTimeout(() => {
        order.push('outer')
        setTimeout(() => order.push('inner'), 50)
      }, 100)
      
      await vi.advanceTimersByTimeAsync(100)
      expect(order).toEqual(['outer'])
      
      await vi.advanceTimersByTimeAsync(50)
      expect(order).toEqual(['outer', 'inner'])
    })
    
    it('should handle multiple Promise.then chains', async () => {
      const order = []
      
      const p = Promise.resolve()
      
      p.then(() => order.push('chain 1'))
      p.then(() => order.push('chain 2'))
      p.then(() => order.push('chain 3'))
      
      await Promise.resolve()
      
      // All chains from same promise run in order
      expect(order).toEqual(['chain 1', 'chain 2', 'chain 3'])
    })
    
    it('should handle async function that returns immediately', async () => {
      const order = []
      
      async function immediate() {
        order.push('inside async')
        return 'result'
      }
      
      order.push('before')
      const promise = immediate()
      order.push('after')
      
      // async function body runs synchronously until first await
      expect(order).toEqual(['before', 'inside async', 'after'])
      
      const result = await promise
      expect(result).toBe('result')
    })
    
    it('should handle Promise.all with microtask ordering', async () => {
      const order = []
      
      Promise.all([
        Promise.resolve().then(() => order.push('p1')),
        Promise.resolve().then(() => order.push('p2')),
        Promise.resolve().then(() => order.push('p3'))
      ]).then(() => order.push('all done'))
      
      // First tick: individual promises resolve
      await Promise.resolve()
      expect(order).toEqual(['p1', 'p2', 'p3'])
      
      // Second tick: Promise.all sees all resolved
      await Promise.resolve()
      // Third tick: .then() callback runs
      await Promise.resolve()
      expect(order).toEqual(['p1', 'p2', 'p3', 'all done'])
    })
  })
})
