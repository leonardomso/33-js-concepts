import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * Tests for Debouncing & Throttling concept page
 * Source: docs/beyond/concepts/debouncing-throttling.mdx
 */

describe('Debouncing & Throttling', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Basic Debounce Implementation', () => {
    // Source: docs/beyond/concepts/debouncing-throttling.mdx:47-60
    function debounce(fn, delay) {
      let timeoutId
      
      return function(...args) {
        // Clear any existing timer
        clearTimeout(timeoutId)
        
        // Set a new timer
        timeoutId = setTimeout(() => {
          fn.apply(this, args)
        }, delay)
      }
    }

    it('should delay function execution', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 300)
      
      debouncedFn('test')
      
      // Function should not be called immediately
      expect(fn).not.toHaveBeenCalled()
      
      // Advance time by 300ms
      vi.advanceTimersByTime(300)
      
      // Now it should be called
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('test')
    })

    it('should reset timer on subsequent calls', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 300)
      
      // Simulate user typing "hello" quickly
      debouncedFn('h')
      vi.advanceTimersByTime(50)
      
      debouncedFn('he')
      vi.advanceTimersByTime(50)
      
      debouncedFn('hel')
      vi.advanceTimersByTime(50)
      
      debouncedFn('hell')
      vi.advanceTimersByTime(50)
      
      debouncedFn('hello')
      
      // Function should not be called yet (timer keeps resetting)
      expect(fn).not.toHaveBeenCalled()
      
      // Wait for 300ms after last call
      vi.advanceTimersByTime(300)
      
      // Should only be called once with final value
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('hello')
    })

    it('should preserve this context', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)
      
      const obj = {
        value: 42,
        method: debouncedFn
      }
      
      obj.method()
      vi.advanceTimersByTime(100)
      
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should pass all arguments to the original function', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)
      
      debouncedFn('arg1', 'arg2', { key: 'value' })
      vi.advanceTimersByTime(100)
      
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2', { key: 'value' })
    })
  })

  describe('Basic Throttle Implementation', () => {
    // Source: docs/beyond/concepts/debouncing-throttling.mdx:95-109
    function throttle(fn, interval) {
      let lastTime = 0
      
      return function(...args) {
        const now = Date.now()
        
        // Only execute if enough time has passed
        if (now - lastTime >= interval) {
          lastTime = now
          fn.apply(this, args)
        }
      }
    }

    it('should execute immediately on first call', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)
      
      throttledFn('first')
      
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('first')
    })

    it('should ignore calls within the interval', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)
      
      throttledFn('call1')
      expect(fn).toHaveBeenCalledTimes(1)
      
      // Calls within 100ms should be ignored
      vi.advanceTimersByTime(30)
      throttledFn('call2')
      expect(fn).toHaveBeenCalledTimes(1)
      
      vi.advanceTimersByTime(30)
      throttledFn('call3')
      expect(fn).toHaveBeenCalledTimes(1)
      
      vi.advanceTimersByTime(30)
      throttledFn('call4')
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should execute again after interval passes', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)
      
      throttledFn('first')
      expect(fn).toHaveBeenCalledTimes(1)
      
      vi.advanceTimersByTime(100)
      throttledFn('second')
      expect(fn).toHaveBeenCalledTimes(2)
      expect(fn).toHaveBeenLastCalledWith('second')
    })

    it('should maintain regular execution rate during continuous calls', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)
      
      // Simulate continuous scroll events every 10ms for 350ms
      for (let i = 0; i < 35; i++) {
        throttledFn(`event${i}`)
        vi.advanceTimersByTime(10)
      }
      
      // Should have executed approximately 4 times (at 0, 100, 200, 300ms)
      expect(fn.mock.calls.length).toBeGreaterThanOrEqual(3)
      expect(fn.mock.calls.length).toBeLessThanOrEqual(5)
    })
  })

  describe('Leading Edge Debounce', () => {
    // Source: docs/beyond/concepts/debouncing-throttling.mdx:181-199
    function debounceLeading(fn, delay) {
      let timeoutId
      
      return function(...args) {
        // Execute immediately if no pending timeout
        if (!timeoutId) {
          fn.apply(this, args)
        }
        
        // Clear and reset the timeout
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          timeoutId = null  // Allow next leading call
        }, delay)
      }
    }

    it('should execute immediately on first call', () => {
      const fn = vi.fn()
      const debouncedFn = debounceLeading(fn, 300)
      
      debouncedFn('first')
      
      // Should be called immediately
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('first')
    })

    it('should ignore rapid subsequent calls', () => {
      const fn = vi.fn()
      const debouncedFn = debounceLeading(fn, 300)
      
      // First call executes immediately
      debouncedFn('call1')
      expect(fn).toHaveBeenCalledTimes(1)
      
      // Rapid calls are ignored
      debouncedFn('call2')
      debouncedFn('call3')
      debouncedFn('call4')
      
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should allow new leading call after delay expires', () => {
      const fn = vi.fn()
      const debouncedFn = debounceLeading(fn, 300)
      
      debouncedFn('first')
      expect(fn).toHaveBeenCalledTimes(1)
      
      vi.advanceTimersByTime(300)
      
      debouncedFn('second')
      expect(fn).toHaveBeenCalledTimes(2)
      expect(fn).toHaveBeenLastCalledWith('second')
    })
  })

  describe('Enhanced Debounce with Cancel', () => {
    // Source: docs/beyond/concepts/debouncing-throttling.mdx:222-261
    function debounce(fn, delay, options = {}) {
      let timeoutId
      let lastArgs
      let lastThis
      
      const { leading = false, trailing = true } = options
      
      function debounced(...args) {
        lastArgs = args
        lastThis = this
        
        const invokeLeading = leading && !timeoutId
        
        clearTimeout(timeoutId)
        
        timeoutId = setTimeout(() => {
          timeoutId = null
          if (trailing && lastArgs) {
            fn.apply(lastThis, lastArgs)
            lastArgs = null
            lastThis = null
          }
        }, delay)
        
        if (invokeLeading) {
          fn.apply(this, args)
        }
      }
      
      debounced.cancel = function() {
        clearTimeout(timeoutId)
        timeoutId = null
        lastArgs = null
        lastThis = null
      }
      
      debounced.flush = function() {
        if (timeoutId && lastArgs) {
          fn.apply(lastThis, lastArgs)
          debounced.cancel()
        }
      }
      
      return debounced
    }

    it('should support trailing option (default behavior)', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100, { trailing: true })
      
      debouncedFn('test')
      expect(fn).not.toHaveBeenCalled()
      
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1)
    })

    it('should support leading option', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100, { leading: true, trailing: false })
      
      debouncedFn('first')
      expect(fn).toHaveBeenCalledTimes(1)
      
      debouncedFn('second')
      expect(fn).toHaveBeenCalledTimes(1) // Still 1, second call ignored
      
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(1) // No trailing call
    })

    it('should support both leading and trailing', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100, { leading: true, trailing: true })
      
      debouncedFn('first')
      expect(fn).toHaveBeenCalledTimes(1) // Leading call
      expect(fn).toHaveBeenCalledWith('first')
      
      debouncedFn('second')
      expect(fn).toHaveBeenCalledTimes(1) // Still 1
      
      vi.advanceTimersByTime(100)
      expect(fn).toHaveBeenCalledTimes(2) // Trailing call
      expect(fn).toHaveBeenLastCalledWith('second')
    })

    it('should cancel pending execution', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)
      
      debouncedFn('test')
      expect(fn).not.toHaveBeenCalled()
      
      debouncedFn.cancel()
      
      vi.advanceTimersByTime(100)
      expect(fn).not.toHaveBeenCalled() // Cancelled, never executed
    })

    it('should flush pending execution immediately', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)
      
      debouncedFn('test')
      expect(fn).not.toHaveBeenCalled()
      
      debouncedFn.flush()
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('test')
    })
  })

  describe('Debounce vs Throttle Behavior Comparison', () => {
    function debounce(fn, delay) {
      let timeoutId
      return function(...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), delay)
      }
    }

    function throttle(fn, interval) {
      let lastTime = 0
      return function(...args) {
        const now = Date.now()
        if (now - lastTime >= interval) {
          lastTime = now
          fn.apply(this, args)
        }
      }
    }

    it('debounce should only fire once after burst of events', () => {
      const fn = vi.fn()
      const debouncedFn = debounce(fn, 100)
      
      // Simulate burst of 10 events over 100ms
      for (let i = 0; i < 10; i++) {
        debouncedFn(`event${i}`)
        vi.advanceTimersByTime(10)
      }
      
      expect(fn).not.toHaveBeenCalled() // Not yet, timer keeps resetting
      
      vi.advanceTimersByTime(100) // Wait for debounce delay
      
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('event9') // Last event value
    })

    it('throttle should fire multiple times during burst of events', () => {
      const fn = vi.fn()
      const throttledFn = throttle(fn, 100)
      
      // Simulate burst of events over 350ms (event every 10ms)
      for (let i = 0; i <= 35; i++) {
        throttledFn(`event${i}`)
        vi.advanceTimersByTime(10)
      }
      
      // Should have fired approximately 4 times (at 0, 100, 200, 300ms)
      expect(fn.mock.calls.length).toBeGreaterThanOrEqual(3)
    })
  })

  describe('Common Pitfalls', () => {
    function debounce(fn, delay) {
      let timeoutId
      return function(...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), delay)
      }
    }

    it('should demonstrate why debounced function must be created once', () => {
      const fn = vi.fn()
      
      // ❌ WRONG: Creating new debounced function each call
      // This doesn't actually debounce because each call gets a new timer
      const wrongWay = () => {
        const newDebounced = debounce(fn, 100)
        newDebounced('test')
      }
      
      wrongWay()
      wrongWay()
      wrongWay()
      
      vi.advanceTimersByTime(100)
      
      // All 3 calls went through because each had its own timer
      expect(fn).toHaveBeenCalledTimes(3)
    })

    it('should demonstrate correct way - create debounced function once', () => {
      const fn = vi.fn()
      
      // ✓ CORRECT: Create once, reuse
      const debouncedFn = debounce(fn, 100)
      
      debouncedFn('test1')
      debouncedFn('test2')
      debouncedFn('test3')
      
      vi.advanceTimersByTime(100)
      
      // Only 1 call went through (proper debouncing)
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('test3')
    })
  })

  describe('Real-World Use Case: Search Autocomplete', () => {
    function debounce(fn, delay) {
      let timeoutId
      return function(...args) {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn.apply(this, args), delay)
      }
    }

    it('should only search after user stops typing', () => {
      const mockSearch = vi.fn()
      const debouncedSearch = debounce(mockSearch, 300)
      
      // Simulate user typing "react" character by character
      debouncedSearch('r')
      vi.advanceTimersByTime(100)
      expect(mockSearch).not.toHaveBeenCalled()
      
      debouncedSearch('re')
      vi.advanceTimersByTime(100)
      expect(mockSearch).not.toHaveBeenCalled()
      
      debouncedSearch('rea')
      vi.advanceTimersByTime(100)
      expect(mockSearch).not.toHaveBeenCalled()
      
      debouncedSearch('reac')
      vi.advanceTimersByTime(100)
      expect(mockSearch).not.toHaveBeenCalled()
      
      debouncedSearch('react')
      // User stops typing, wait for debounce
      vi.advanceTimersByTime(300)
      
      expect(mockSearch).toHaveBeenCalledTimes(1)
      expect(mockSearch).toHaveBeenCalledWith('react')
    })
  })

  describe('Real-World Use Case: Scroll Position Tracking', () => {
    function throttle(fn, interval) {
      let lastTime = 0
      return function(...args) {
        const now = Date.now()
        if (now - lastTime >= interval) {
          lastTime = now
          fn.apply(this, args)
        }
      }
    }

    it('should update scroll position at regular intervals', () => {
      const mockUpdatePosition = vi.fn()
      const throttledUpdate = throttle(mockUpdatePosition, 100)
      
      // Simulate 500ms of scrolling (event every 16ms, like 60fps)
      for (let i = 0; i < 31; i++) {
        throttledUpdate({ scrollY: i * 10 })
        vi.advanceTimersByTime(16)
      }
      
      // Should have updated approximately 5 times (every 100ms)
      expect(mockUpdatePosition.mock.calls.length).toBeGreaterThanOrEqual(4)
      expect(mockUpdatePosition.mock.calls.length).toBeLessThanOrEqual(6)
      
      // First call should be the first scroll event
      expect(mockUpdatePosition.mock.calls[0][0]).toEqual({ scrollY: 0 })
    })
  })

  describe('Real-World Use Case: Prevent Double Submit', () => {
    function debounceLeading(fn, delay) {
      let timeoutId
      return function(...args) {
        if (!timeoutId) {
          fn.apply(this, args)
        }
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          timeoutId = null
        }, delay)
      }
    }

    it('should only submit once on double-click', () => {
      const mockSubmit = vi.fn()
      const safeSubmit = debounceLeading(mockSubmit, 1000)
      
      // User double-clicks rapidly
      safeSubmit({ formData: 'order123' })
      safeSubmit({ formData: 'order123' })
      safeSubmit({ formData: 'order123' })
      
      // Only first submit should go through
      expect(mockSubmit).toHaveBeenCalledTimes(1)
      expect(mockSubmit).toHaveBeenCalledWith({ formData: 'order123' })
      
      // After 1 second, can submit again
      vi.advanceTimersByTime(1000)
      
      safeSubmit({ formData: 'order456' })
      expect(mockSubmit).toHaveBeenCalledTimes(2)
      expect(mockSubmit).toHaveBeenLastCalledWith({ formData: 'order456' })
    })
  })

  describe('requestAnimationFrame Throttle Alternative', () => {
    // Note: jsdom doesn't have a real rAF, but we can test the pattern
    function throttleWithRAF(fn) {
      let ticking = false
      let lastArgs
      
      return function(...args) {
        lastArgs = args
        
        if (!ticking) {
          ticking = true
          
          // Using setTimeout to simulate rAF behavior in tests
          setTimeout(() => {
            fn.apply(this, lastArgs)
            ticking = false
          }, 16) // ~60fps
        }
      }
    }

    it('should batch rapid calls into animation frames', () => {
      const fn = vi.fn()
      const throttledFn = throttleWithRAF(fn)
      
      // Multiple calls before frame executes
      throttledFn('call1')
      throttledFn('call2')
      throttledFn('call3')
      
      expect(fn).not.toHaveBeenCalled()
      
      vi.advanceTimersByTime(16)
      
      // Only last args should be used
      expect(fn).toHaveBeenCalledTimes(1)
      expect(fn).toHaveBeenCalledWith('call3')
    })
  })
})
