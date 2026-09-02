import { describe, it, expect, vi } from 'vitest'

describe('Promises', () => {
  describe('Basic Promise Creation', () => {
    it('should create a fulfilled Promise with resolve()', async () => {
      const promise = new Promise((resolve) => {
        resolve('success')
      })
      
      const result = await promise
      expect(result).toBe('success')
    })
    
    it('should create a rejected Promise with reject()', async () => {
      const promise = new Promise((_, reject) => {
        reject(new Error('failure'))
      })
      
      await expect(promise).rejects.toThrow('failure')
    })
    
    it('should execute the executor function synchronously', () => {
      const order = []
      
      order.push('before')
      
      new Promise((resolve) => {
        order.push('inside executor')
        resolve('done')
      })
      
      order.push('after')
      
      expect(order).toEqual(['before', 'inside executor', 'after'])
    })
    
    it('should ignore subsequent resolve/reject calls after first settlement', async () => {
      const promise = new Promise((resolve, reject) => {
        resolve('first')
        resolve('second')  // Ignored
        reject(new Error('error'))  // Ignored
      })
      
      const result = await promise
      expect(result).toBe('first')
    })
    
    it('should automatically reject if executor throws', async () => {
      const promise = new Promise(() => {
        throw new Error('thrown error')
      })
      
      await expect(promise).rejects.toThrow('thrown error')
    })
  })
  
  describe('Promise.resolve() and Promise.reject()', () => {
    it('should create fulfilled Promise with Promise.resolve()', async () => {
      const promise = Promise.resolve(42)
      expect(await promise).toBe(42)
    })
    
    it('should create rejected Promise with Promise.reject()', async () => {
      const promise = Promise.reject(new Error('rejected'))
      await expect(promise).rejects.toThrow('rejected')
    })
    
    it('should return the same Promise if resolving with a Promise', async () => {
      const original = Promise.resolve('original')
      const wrapped = Promise.resolve(original)
      
      // Promise.resolve returns the same Promise if given a native Promise
      expect(wrapped).toBe(original)
    })
  })
  
  describe('.then() method', () => {
    it('should receive the fulfilled value', async () => {
      const result = await Promise.resolve(10).then(x => x * 2)
      expect(result).toBe(20)
    })
    
    it('should return a new Promise', () => {
      const p1 = Promise.resolve(1)
      const p2 = p1.then(x => x)
      
      expect(p2).toBeInstanceOf(Promise)
      expect(p1).not.toBe(p2)
    })
    
    it('should chain values through multiple .then() calls', async () => {
      const result = await Promise.resolve(1)
        .then(x => x + 1)
        .then(x => x * 2)
        .then(x => x + 10)
      
      expect(result).toBe(14)  // ((1 + 1) * 2) + 10
    })
    
    it('should unwrap returned Promises', async () => {
      const result = await Promise.resolve(1)
        .then(x => Promise.resolve(x + 1))
        .then(x => x * 2)
      
      expect(result).toBe(4)  // (1 + 1) * 2
    })
    
    it('should skip .then() when Promise is rejected', async () => {
      const thenCallback = vi.fn()
      
      await Promise.reject(new Error('error'))
        .then(thenCallback)
        .catch(() => {})  // Handle the rejection
      
      expect(thenCallback).not.toHaveBeenCalled()
    })
  })
  
  describe('.catch() method', () => {
    it('should catch rejected Promises', async () => {
      const result = await Promise.reject(new Error('error'))
        .catch(error => `caught: ${error.message}`)
      
      expect(result).toBe('caught: error')
    })
    
    it('should catch errors thrown in .then()', async () => {
      const result = await Promise.resolve('ok')
        .then(() => {
          throw new Error('thrown')
        })
        .catch(error => `caught: ${error.message}`)
      
      expect(result).toBe('caught: thrown')
    })
    
    it('should allow chain to continue after catching', async () => {
      const result = await Promise.reject(new Error('error'))
        .catch(() => 'recovered')
        .then(value => value.toUpperCase())
      
      expect(result).toBe('RECOVERED')
    })
    
    it('should propagate errors through the chain until caught', async () => {
      const thenCallback1 = vi.fn()
      const thenCallback2 = vi.fn()
      const catchCallback = vi.fn(e => e.message)
      
      await Promise.reject(new Error('original error'))
        .then(thenCallback1)
        .then(thenCallback2)
        .catch(catchCallback)
      
      expect(thenCallback1).not.toHaveBeenCalled()
      expect(thenCallback2).not.toHaveBeenCalled()
      expect(catchCallback).toHaveBeenCalledWith(expect.any(Error))
    })
  })
  
  describe('.finally() method', () => {
    it('should run on fulfillment', async () => {
      const finallyCallback = vi.fn()
      
      await Promise.resolve('value').finally(finallyCallback)
      
      expect(finallyCallback).toHaveBeenCalled()
    })
    
    it('should run on rejection', async () => {
      const finallyCallback = vi.fn()
      
      await Promise.reject(new Error('error'))
        .catch(() => {})  // Handle rejection
        .finally(finallyCallback)
      
      expect(finallyCallback).toHaveBeenCalled()
    })
    
    it('should not receive any arguments', async () => {
      const finallyCallback = vi.fn()
      
      await Promise.resolve('value').finally(finallyCallback)
      
      expect(finallyCallback).toHaveBeenCalledWith()  // No arguments
    })
    
    it('should pass through the original value', async () => {
      const result = await Promise.resolve('original')
        .finally(() => 'ignored')
      
      expect(result).toBe('original')
    })
    
    it('should pass through the original error', async () => {
      await expect(
        Promise.reject(new Error('original'))
          .finally(() => 'ignored')
      ).rejects.toThrow('original')
    })
  })
  
  describe('Promise Chaining', () => {
    it('should maintain chain with undefined return', async () => {
      const result = await Promise.resolve('start')
        .then(() => {
          // No explicit return = undefined
        })
        .then(value => value)
      
      expect(result).toBeUndefined()
    })
    
    it('should handle async operations in sequence', async () => {
      const delay = (ms, value) => 
        new Promise(resolve => setTimeout(() => resolve(value), ms))
      
      const result = await delay(10, 'first')
        .then(value => delay(10, value + ' second'))
        .then(value => delay(10, value + ' third'))
      
      expect(result).toBe('first second third')
    })
  })
  
  describe('Promise.all()', () => {
    it('should resolve with array of values when all fulfill', async () => {
      const result = await Promise.all([
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3)
      ])
      
      expect(result).toEqual([1, 2, 3])
    })
    
    it('should maintain order regardless of resolution order', async () => {
      const result = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve('slow'), 30)),
        new Promise(resolve => setTimeout(() => resolve('fast'), 10)),
        Promise.resolve('instant')
      ])
      
      expect(result).toEqual(['slow', 'fast', 'instant'])
    })
    
    it('should reject immediately if any Promise rejects', async () => {
      await expect(
        Promise.all([
          Promise.resolve('A'),
          Promise.reject(new Error('B failed')),
          Promise.resolve('C')
        ])
      ).rejects.toThrow('B failed')
    })
    
    it('should work with non-Promise values', async () => {
      const result = await Promise.all([1, 'two', Promise.resolve(3)])
      expect(result).toEqual([1, 'two', 3])
    })
    
    it('should resolve immediately with empty array', async () => {
      const result = await Promise.all([])
      expect(result).toEqual([])
    })
  })
  
  describe('Promise.allSettled()', () => {
    it('should return status objects for all Promises', async () => {
      const results = await Promise.allSettled([
        Promise.resolve('success'),
        Promise.reject(new Error('failure')),
        Promise.resolve(42)
      ])
      
      expect(results).toEqual([
        { status: 'fulfilled', value: 'success' },
        { status: 'rejected', reason: expect.any(Error) },
        { status: 'fulfilled', value: 42 }
      ])
    })
    
    it('should never reject', async () => {
      const results = await Promise.allSettled([
        Promise.reject(new Error('error 1')),
        Promise.reject(new Error('error 2'))
      ])
      
      expect(results).toHaveLength(2)
      expect(results[0].status).toBe('rejected')
      expect(results[1].status).toBe('rejected')
    })
    
    it('should wait for all to settle', async () => {
      const start = Date.now()
      
      await Promise.allSettled([
        new Promise(resolve => setTimeout(resolve, 50)),
        new Promise((_, reject) => setTimeout(() => reject(new Error()), 30)),
        new Promise(resolve => setTimeout(resolve, 40))
      ])
      
      const elapsed = Date.now() - start
      expect(elapsed).toBeGreaterThanOrEqual(45)  // Waited for slowest
    })
  })
  
  describe('Promise.race()', () => {
    it('should resolve with first settled value', async () => {
      const result = await Promise.race([
        new Promise(resolve => setTimeout(() => resolve('slow'), 50)),
        new Promise(resolve => setTimeout(() => resolve('fast'), 10))
      ])
      
      expect(result).toBe('fast')
    })
    
    it('should reject if first settled is rejection', async () => {
      await expect(
        Promise.race([
          new Promise((_, reject) => setTimeout(() => reject(new Error('fast error')), 10)),
          new Promise(resolve => setTimeout(() => resolve('slow success'), 50))
        ])
      ).rejects.toThrow('fast error')
    })
    
    it('should never settle with empty array', () => {
      // Promise.race([]) returns a forever-pending Promise
      const promise = Promise.race([])
      
      // We can't really test this without timing out, 
      // but we can verify it returns a Promise
      expect(promise).toBeInstanceOf(Promise)
    })
  })
  
  describe('Promise.any()', () => {
    it('should resolve with first fulfilled value', async () => {
      const result = await Promise.any([
        Promise.reject(new Error('error 1')),
        Promise.resolve('success'),
        Promise.reject(new Error('error 2'))
      ])
      
      expect(result).toBe('success')
    })
    
    it('should wait for first fulfillment, ignoring rejections', async () => {
      const result = await Promise.any([
        new Promise((_, reject) => setTimeout(() => reject(new Error()), 10)),
        new Promise(resolve => setTimeout(() => resolve('winner'), 30)),
        new Promise((_, reject) => setTimeout(() => reject(new Error()), 20))
      ])
      
      expect(result).toBe('winner')
    })
    
    it('should reject with AggregateError if all reject', async () => {
      try {
        await Promise.any([
          Promise.reject(new Error('error 1')),
          Promise.reject(new Error('error 2')),
          Promise.reject(new Error('error 3'))
        ])
        expect.fail('Should have rejected')
      } catch (error) {
        expect(error.name).toBe('AggregateError')
        expect(error.errors).toHaveLength(3)
      }
    })
  })
  
  describe('Microtask Queue Timing', () => {
    it('should run .then() callbacks asynchronously', () => {
      const order = []
      
      order.push('1')
      
      Promise.resolve().then(() => {
        order.push('3')
      })
      
      order.push('2')
      
      // Synchronously, only 1 and 2 are in the array
      expect(order).toEqual(['1', '2'])
    })
    
    it('should demonstrate microtask priority over macrotasks', async () => {
      const order = []
      
      // Macrotask (setTimeout)
      setTimeout(() => order.push('timeout'), 0)
      
      // Microtask (Promise)
      Promise.resolve().then(() => order.push('promise'))
      
      // Wait for both to complete
      await new Promise(resolve => setTimeout(resolve, 10))
      
      // Promise (microtask) runs before setTimeout (macrotask)
      expect(order).toEqual(['promise', 'timeout'])
    })
    
    it('should process nested microtasks before macrotasks', async () => {
      const order = []
      
      setTimeout(() => order.push('timeout'), 0)
      
      Promise.resolve().then(() => {
        order.push('promise 1')
        Promise.resolve().then(() => {
          order.push('promise 2')
        })
      })
      
      await new Promise(resolve => setTimeout(resolve, 10))
      
      expect(order).toEqual(['promise 1', 'promise 2', 'timeout'])
    })
  })
  
  describe('Common Patterns', () => {
    it('should wrap setTimeout in a Promise (delay pattern)', async () => {
      const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
      
      const start = Date.now()
      await delay(50)
      const elapsed = Date.now() - start
      
      expect(elapsed).toBeGreaterThanOrEqual(45)
    })
    
    it('should handle sequential execution', async () => {
      const results = []
      const items = [1, 2, 3]
      
      for (const item of items) {
        const result = await Promise.resolve(item * 2)
        results.push(result)
      }
      
      expect(results).toEqual([2, 4, 6])
    })
    
    it('should handle parallel execution', async () => {
      const items = [1, 2, 3]
      const results = await Promise.all(
        items.map(item => Promise.resolve(item * 2))
      )
      
      expect(results).toEqual([2, 4, 6])
    })
  })
  
  describe('Common Mistakes', () => {
    it('should demonstrate forgotten return issue', async () => {
      // This is what happens when you forget to return
      const result = await Promise.resolve('start')
        .then(value => {
          Promise.resolve(value + ' middle')  // Forgot return!
        })
        .then(value => value)
      
      expect(result).toBeUndefined()  // Lost the value!
    })
    
    it('should demonstrate correct return', async () => {
      const result = await Promise.resolve('start')
        .then(value => {
          return Promise.resolve(value + ' middle')  // Correct!
        })
        .then(value => value)
      
      expect(result).toBe('start middle')
    })
    
    it('should demonstrate Promise constructor anti-pattern', async () => {
      // Anti-pattern: unnecessary wrapper
      const antiPattern = () => {
        return new Promise((resolve, reject) => {
          Promise.resolve('data')
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
      }
      
      // Correct: just return the Promise
      const correct = () => {
        return Promise.resolve('data')
      }
      
      // Both work, but correct is cleaner
      expect(await antiPattern()).toBe('data')
      expect(await correct()).toBe('data')
    })
  })
  
  describe('Error Handling Patterns', () => {
    it('should catch errors anywhere in the chain', async () => {
      const error = await Promise.resolve('start')
        .then(() => {
          throw new Error('middle error')
        })
        .then(() => 'never reached')
        .catch(e => e.message)
      
      expect(error).toBe('middle error')
    })
    
    it('should allow recovery from errors', async () => {
      const result = await Promise.reject(new Error('initial error'))
        .catch(() => 'recovered value')
        .then(value => value.toUpperCase())
      
      expect(result).toBe('RECOVERED VALUE')
    })
    
    it('should allow re-throwing errors', async () => {
      await expect(
        Promise.reject(new Error('original'))
          .catch(error => {
            // Log it, then re-throw
            throw error
          })
      ).rejects.toThrow('original')
    })
  })
})
