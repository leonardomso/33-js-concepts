import { describe, it, expect } from 'vitest'

describe('Garbage Collection', () => {
  // ============================================================
  // REACHABILITY AND REFERENCES
  // From garbage-collection.mdx lines 51-62
  // ============================================================
  
  describe('Reachability and References', () => {
    // From lines 51-62: Basic reachability example
    it('should demonstrate object reachability through variables', () => {
      // 'user' references the object
      let user = { name: 'Alice' }
      
      // The object is reachable through 'user'
      expect(user).toEqual({ name: 'Alice' })
      
      // After nullifying, the reference is gone
      user = null
      
      // Now 'user' is null (object is unreachable, eligible for GC)
      expect(user).toBe(null)
    })
    
    // From lines 97-119: Family example with circular references
    it('should create objects with circular references', () => {
      function createFamily() {
        let father = { name: 'John' }
        let mother = { name: 'Jane' }
        
        // Create references between objects
        father.spouse = mother
        mother.spouse = father
        
        return { father, mother }
      }
      
      let family = createFamily()
      
      // Both father and mother are reachable through 'family'
      expect(family.father.name).toBe('John')
      expect(family.mother.name).toBe('Jane')
      
      // Circular references exist
      expect(family.father.spouse).toBe(family.mother)
      expect(family.mother.spouse).toBe(family.father)
      expect(family.father.spouse.spouse).toBe(family.father)
      
      // After nullifying family, objects become unreachable
      family = null
      expect(family).toBe(null)
      // Both objects (including their circular refs) are now eligible for GC
    })
  })
  
  // ============================================================
  // MARK-AND-SWEEP AND CIRCULAR REFERENCES
  // From garbage-collection.mdx lines 181-192
  // ============================================================
  
  describe('Circular References', () => {
    // From lines 181-192: Circular reference with family
    it('should handle circular references between objects', () => {
      let family = { father: { name: 'John' }, mother: { name: 'Jane' } }
      family.father.spouse = family.mother
      family.mother.spouse = family.father
      
      // Circular reference: father ↔ mother
      expect(family.father.spouse.name).toBe('Jane')
      expect(family.mother.spouse.name).toBe('John')
      
      // Objects reference each other
      expect(family.father.spouse.spouse.name).toBe('John')
      
      family = null
      // Mark phase would start from roots, can't reach father or mother
      // Neither gets marked, both get swept
      // Circular reference doesn't prevent GC in mark-and-sweep!
      expect(family).toBe(null)
    })
    
    // From lines 212-229: createCycle function demonstrating circular refs
    it('should create circular references that do not leak in mark-and-sweep', () => {
      function createCycle() {
        let objA = {}
        let objB = {}
        
        objA.ref = objB
        objB.ref = objA
        
        // Circular reference exists inside function
        expect(objA.ref).toBe(objB)
        expect(objB.ref).toBe(objA)
        expect(objA.ref.ref).toBe(objA)
        
        // Return nothing - objects become unreachable after function returns
      }
      
      createCycle()
      // With mark-and-sweep: Both collected (unreachable from roots)
      // No leak!
    })
  })
  
  // ============================================================
  // REFERENCE TRACKING
  // From garbage-collection.mdx lines 646-659
  // ============================================================
  
  describe('Reference Tracking (Test Your Knowledge Q1)', () => {
    // From lines 646-659: Multiple references to same object
    it('should keep object alive while any reference exists', () => {
      let user = { name: 'Alice' }
      let admin = user
      
      // Both variables reference the same object
      expect(user).toBe(admin)
      expect(user.name).toBe('Alice')
      expect(admin.name).toBe('Alice')
      
      user = null
      
      // Object still exists through 'admin'
      expect(user).toBe(null)
      expect(admin).toEqual({ name: 'Alice' })
      
      // Only when all references are gone can it be collected
      admin = null
      expect(admin).toBe(null)
    })
  })
  
  // ============================================================
  // GC-FRIENDLY CODE PATTERNS
  // From garbage-collection.mdx lines 320-334
  // ============================================================
  
  describe('GC-Friendly Code Patterns', () => {
    // From lines 320-334: Variables going out of scope
    it('should allow variables to go out of scope naturally', () => {
      function processData() {
        const largeArray = new Array(100).fill('data')
        
        // Process the array...
        const result = largeArray.reduce((sum, item) => sum + item.length, 0)
        
        return result
        // largeArray goes out of scope here
      }
      
      const result = processData()
      // largeArray is already unreachable
      expect(result).toBe(400) // 100 items * 4 chars each
    })
    
    // From lines 340-351: Nullifying references to large objects
    it('should allow early nullification for large objects', () => {
      function longRunningTask() {
        let hugeData = new Array(1000).fill('x')
        
        const summary = hugeData.length
        
        hugeData = null  // Allow GC to reclaim memory now
        
        // Can still use summary
        expect(hugeData).toBe(null)
        
        return summary
      }
      
      const result = longRunningTask()
      expect(result).toBe(1000)
    })
  })
  
  // ============================================================
  // CLOSURE MEMORY PATTERNS
  // From garbage-collection.mdx lines 382-408
  // ============================================================
  
  describe('Closure Memory Patterns', () => {
    // From lines 399-408: Better closure pattern
    it('should only capture what is needed in closures', () => {
      function createBetterHandler() {
        const hugeData = new Array(1000000).fill('x')
        const summary = hugeData.length  // Extract what you need
        
        return function handler() {
          return `Data size was: ${summary}`
        }
        // hugeData goes out of scope, only 'summary' is captured
      }
      
      const handler = createBetterHandler()
      expect(handler()).toBe('Data size was: 1000000')
      // Only 'summary' (a number) is captured, not the huge array
    })
    
    // From lines 382-396: Closure capturing more than needed
    it('should demonstrate closure capturing outer scope', () => {
      function createHandler() {
        const hugeData = new Array(100).fill('x')
        
        return function handler() {
          // This closure captures the outer scope
          // In some engines, hugeData may be kept alive
          return 'Handler called'
        }
      }
      
      const handler = createHandler()
      expect(handler()).toBe('Handler called')
    })
  })
  
  // ============================================================
  // TIMER CLEANUP PATTERNS
  // From garbage-collection.mdx lines 448-465
  // ============================================================
  
  describe('Timer Cleanup', () => {
    // From lines 457-464: Clearing intervals
    it('should clear intervals to allow GC', () => {
      let callCount = 0
      const data = { value: 'test' }
      
      const intervalId = setInterval(() => {
        callCount++
      }, 10)
      
      // Wait a bit then clear
      return new Promise((resolve) => {
        setTimeout(() => {
          clearInterval(intervalId)
          const countBeforeClear = callCount
          
          // After clearing, no more calls should happen
          setTimeout(() => {
            // Count should not have increased significantly
            expect(callCount).toBe(countBeforeClear)
            resolve()
          }, 50)
        }, 50)
      })
    })
  })
  
  // ============================================================
  // WEAKREF BASICS
  // From garbage-collection.mdx lines 477-488
  // ============================================================
  
  describe('WeakRef Basics', () => {
    // From lines 477-488: WeakRef usage
    it('should create a WeakRef and deref it', () => {
      const someObject = { data: 'important' }
      const weakRef = new WeakRef(someObject)
      
      // Object still exists, deref returns it
      const obj = weakRef.deref()
      expect(obj).toBe(someObject)
      expect(obj.data).toBe('important')
    })
    
    it('should demonstrate WeakRef API', () => {
      let target = { value: 42 }
      const ref = new WeakRef(target)
      
      // While target exists, deref returns it
      expect(ref.deref()).toBe(target)
      expect(ref.deref().value).toBe(42)
      
      // Note: We cannot test GC actually collecting the object
      // because GC timing is non-deterministic
    })
  })
  
  // ============================================================
  // WEAKMAP FOR CACHING
  // From garbage-collection.mdx lines 555-564
  // ============================================================
  
  describe('WeakMap for Caching', () => {
    // From lines 555-564: WeakMap cache pattern
    it('should use WeakMap for object-keyed caching', () => {
      const cache = new WeakMap()
      
      function expensiveComputation(obj) {
        return Object.keys(obj).length * 100
      }
      
      function getCached(obj) {
        if (!cache.has(obj)) {
          cache.set(obj, expensiveComputation(obj))
        }
        return cache.get(obj)
      }
      
      const myObj = { a: 1, b: 2, c: 3 }
      
      // First call computes
      expect(getCached(myObj)).toBe(300)
      
      // Second call returns cached value
      expect(getCached(myObj)).toBe(300)
      expect(cache.has(myObj)).toBe(true)
      
      // Different object, different computation
      const anotherObj = { x: 1 }
      expect(getCached(anotherObj)).toBe(100)
    })
    
    // Test that WeakMap keys can be garbage collected
    it('should allow WeakMap keys to be GC eligible', () => {
      const cache = new WeakMap()
      
      let key = { id: 1 }
      cache.set(key, 'cached value')
      
      expect(cache.has(key)).toBe(true)
      expect(cache.get(key)).toBe('cached value')
      
      // If we lose the reference to key, the entry becomes GC eligible
      // We can't test actual GC, but we can verify the API works
      key = null
      // The WeakMap entry is now eligible for garbage collection
    })
  })
  
  // ============================================================
  // DELETE OPERATOR BEHAVIOR
  // From garbage-collection.mdx lines 500-510
  // ============================================================
  
  describe('Delete Operator', () => {
    // From lines 500-510: delete vs undefined
    it('should remove property with delete', () => {
      const obj = { data: new Array(100) }
      
      expect('data' in obj).toBe(true)
      expect(obj.data).toBeDefined()
      
      delete obj.data
      
      // Property is removed
      expect('data' in obj).toBe(false)
      expect(obj.data).toBe(undefined)
    })
    
    it('should compare delete vs setting undefined', () => {
      const obj1 = { data: [1, 2, 3] }
      const obj2 = { data: [1, 2, 3] }
      
      // Using delete
      delete obj1.data
      expect('data' in obj1).toBe(false)
      expect(Object.keys(obj1)).toEqual([])
      
      // Using undefined
      obj2.data = undefined
      expect('data' in obj2).toBe(true) // Property still exists!
      expect(Object.keys(obj2)).toEqual(['data'])
      expect(obj2.data).toBe(undefined)
    })
  })
  
  // ============================================================
  // OBJECT CACHING WITHOUT WEAKMAP (LEAK PATTERN)
  // From garbage-collection.mdx lines 544-553
  // ============================================================
  
  describe('Cache Patterns', () => {
    // From lines 544-553: Regular object cache (leak pattern)
    it('should demonstrate unbounded cache growth', () => {
      const cache = {}
      
      function getCached(key) {
        if (!cache[key]) {
          cache[key] = `computed_${key}`
        }
        return cache[key]
      }
      
      // Cache grows with each unique key
      getCached('key1')
      getCached('key2')
      getCached('key3')
      
      expect(Object.keys(cache).length).toBe(3)
      expect(cache['key1']).toBe('computed_key1')
      
      // This pattern can lead to memory leaks if keys keep growing
      // and old entries are never removed
    })
  })
  
  // ============================================================
  // CIRCULAR REFERENCE DETECTION PATTERNS
  // ============================================================
  
  describe('Circular Reference Patterns', () => {
    it('should create deeply nested circular references', () => {
      const a = { name: 'a' }
      const b = { name: 'b' }
      const c = { name: 'c' }
      
      a.next = b
      b.next = c
      c.next = a  // Circular!
      
      // Can traverse the circle
      expect(a.next.next.next.name).toBe('a')
      expect(a.next.next.next.next.name).toBe('b')
    })
    
    it('should create self-referencing objects', () => {
      const obj = { name: 'self' }
      obj.self = obj
      
      // Self-reference
      expect(obj.self).toBe(obj)
      expect(obj.self.self.self.name).toBe('self')
      
      // When obj is unreachable, the self-reference doesn't prevent GC
    })
  })
  
  // ============================================================
  // TEST YOUR KNOWLEDGE - Q2 from lines 667-679
  // ============================================================
  
  describe('Test Your Knowledge Examples', () => {
    // From lines 667-679: createCycle function
    it('should demonstrate circular reference in function scope', () => {
      let cycleCreated = false
      
      function createCycle() {
        let a = {}
        let b = {}
        a.ref = b
        b.ref = a
        cycleCreated = true
      }
      
      createCycle()
      // Both objects are collected after the function returns
      // The circular reference doesn't keep them alive
      expect(cycleCreated).toBe(true)
    })
  })
  
  // ============================================================
  // REFERENCE COUNTING CONCEPTUAL EXAMPLE
  // From garbage-collection.mdx lines 202-208
  // ============================================================
  
  describe('Reference Counting (Conceptual)', () => {
    // From lines 202-208: Reference counting example
    it('should demonstrate multiple references to same object', () => {
      // Reference counting (conceptual, not real JS)
      let obj = { data: 'hello' }  // refcount would be: 1
      let ref = obj                 // refcount would be: 2
      
      expect(obj).toBe(ref)
      expect(obj.data).toBe('hello')
      
      ref = null                    // refcount would go to: 1
      expect(ref).toBe(null)
      expect(obj.data).toBe('hello') // Object still exists
      
      obj = null                    // refcount would go to: 0
      expect(obj).toBe(null)
      // Object would now be freed in reference counting
    })
  })
  
  // ============================================================
  // EDGE CASES
  // ============================================================
  
  describe('Edge Cases', () => {
    it('should handle null and undefined references', () => {
      let obj = { value: 1 }
      
      // Setting to null
      obj = null
      expect(obj).toBe(null)
      
      // Creating new object
      obj = { value: 2 }
      expect(obj.value).toBe(2)
      
      // Setting to undefined
      obj = undefined
      expect(obj).toBe(undefined)
    })
    
    it('should handle reassignment in loops', () => {
      let holder = null
      
      for (let i = 0; i < 5; i++) {
        // Each iteration creates a new object
        // Previous object becomes unreachable (eligible for GC)
        holder = { iteration: i }
      }
      
      // Only the last object is reachable
      expect(holder.iteration).toBe(4)
    })
    
    it('should handle objects in arrays', () => {
      const arr = [{ id: 1 }, { id: 2 }, { id: 3 }]
      
      // All objects reachable through array
      expect(arr[0].id).toBe(1)
      
      // Remove reference from array
      arr[0] = null
      expect(arr[0]).toBe(null)
      // Original { id: 1 } is now eligible for GC
      
      // Clear array
      arr.length = 0
      expect(arr.length).toBe(0)
      // All objects now eligible for GC
    })
    
    it('should handle nested object structures', () => {
      let root = {
        level1: {
          level2: {
            level3: {
              value: 'deep'
            }
          }
        }
      }
      
      // All levels reachable through root
      expect(root.level1.level2.level3.value).toBe('deep')
      
      // Nullify intermediate reference
      root.level1.level2 = null
      
      // level3 is now unreachable (eligible for GC)
      expect(root.level1.level2).toBe(null)
      
      root = null
      // Entire structure now eligible for GC
    })
  })
})
