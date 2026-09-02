import { describe, it, expect } from 'vitest'

/**
 * Tests for Memory Management concept
 * Source: /docs/beyond/concepts/memory-management.mdx
 */

describe('Memory Management', () => {
  describe('Memory Allocation', () => {
    // Source: memory-management.mdx lines ~115-125
    it('should allocate memory for primitives', () => {
      const n = 123
      const s = "hello"
      const b = true
      
      expect(typeof n).toBe('number')
      expect(typeof s).toBe('string')
      expect(typeof b).toBe('boolean')
    })

    // Source: memory-management.mdx lines ~115-125
    it('should allocate memory for objects and arrays', () => {
      const obj = { a: 1, b: 2 }
      const arr = [1, 2, 3]
      const fn = function() { return 'hello' }
      
      expect(obj).toEqual({ a: 1, b: 2 })
      expect(arr).toEqual([1, 2, 3])
      expect(fn()).toBe('hello')
    })

    // Source: memory-management.mdx lines ~127-131
    it('should allocate new memory for string operations', () => {
      const s = "hello"
      const s2 = s.substring(0, 3)
      
      expect(s2).toBe('hel')
      expect(s).toBe('hello')  // Original unchanged
    })

    // Source: memory-management.mdx lines ~127-131
    it('should allocate new memory for array concatenation', () => {
      const arr = [1, 2, 3]
      const arr2 = arr.concat([4, 5])
      
      expect(arr2).toEqual([1, 2, 3, 4, 5])
      expect(arr).toEqual([1, 2, 3])  // Original unchanged
    })

    // Source: memory-management.mdx lines ~127-131
    it('should allocate new memory for object spread', () => {
      const obj = { a: 1 }
      const obj2 = { ...obj, c: 3 }
      
      expect(obj2).toEqual({ a: 1, c: 3 })
      expect(obj).toEqual({ a: 1 })  // Original unchanged
    })

    // Source: memory-management.mdx lines ~135-139
    it('should allocate memory via constructor calls', () => {
      const date = new Date()
      const regex = new RegExp("pattern")
      const map = new Map()
      const set = new Set([1, 2, 3])
      
      expect(date instanceof Date).toBe(true)
      expect(regex instanceof RegExp).toBe(true)
      expect(map instanceof Map).toBe(true)
      expect(set instanceof Set).toBe(true)
      expect(set.size).toBe(3)
    })
  })

  describe('Stack vs Heap: Reference Behavior', () => {
    // Source: memory-management.mdx lines ~185-195
    it('should demonstrate that primitives are copied by value (stack)', () => {
      let a = 10
      let b = a  // Copy of value
      
      b = 20
      
      expect(a).toBe(10)  // Original unchanged
      expect(b).toBe(20)
    })

    // Source: memory-management.mdx lines ~185-195
    it('should demonstrate that objects are passed by reference (heap)', () => {
      const original = { value: 1 }
      const copy = original  // Same reference!
      
      copy.value = 2
      
      expect(original.value).toBe(2)  // Both point to same object
      expect(copy.value).toBe(2)
    })

    // Source: memory-management.mdx lines ~185-195
    it('should create independent copy using spread operator', () => {
      const original = { value: 1 }
      const independent = { ...original }
      
      independent.value = 3
      
      expect(original.value).toBe(1)  // Original unchanged
      expect(independent.value).toBe(3)
    })

    // Source: memory-management.mdx lines ~170-182
    it('should demonstrate stack allocation for primitives in function', () => {
      function calculateTotal(price, quantity) {
        const tax = 0.08
        const subtotal = price * quantity
        const total = subtotal + (subtotal * tax)
        return total
      }
      
      const result = calculateTotal(100, 2)
      expect(result).toBe(216)  // 200 + (200 * 0.08) = 216
    })
  })

  describe('Reachability and Garbage Collection', () => {
    // Source: memory-management.mdx lines ~210-220
    it('should demonstrate single reference becoming null', () => {
      let user = { name: "John" }
      
      // Object is reachable via 'user'
      expect(user.name).toBe("John")
      
      user = null  // Now the object has no references
      expect(user).toBe(null)
      // The original object can now be garbage collected
    })

    // Source: memory-management.mdx lines ~223-230
    it('should demonstrate multiple references to same object', () => {
      let user = { name: "John" }
      let admin = user  // Two references to same object
      
      user = null  // Object still reachable via 'admin'
      expect(admin.name).toBe("John")
      
      admin = null  // Now the object is unreachable
      expect(admin).toBe(null)
    })

    // Source: memory-management.mdx lines ~233-250
    it('should demonstrate interlinked objects', () => {
      function marry(man, woman) {
        man.wife = woman
        woman.husband = man
        return { father: man, mother: woman }
      }
      
      let family = marry({ name: "John" }, { name: "Ann" })
      
      expect(family.father.wife.name).toBe("Ann")
      expect(family.mother.husband.name).toBe("John")
      
      family = null  // The entire structure becomes unreachable
      // Even though John and Ann reference each other,
      // they're unreachable from any root — so they're freed
    })
  })

  describe('WeakMap and WeakSet', () => {
    // Source: memory-management.mdx lines ~380-400
    it('should store metadata with WeakMap', () => {
      const metadata = new WeakMap()
      
      const element = { id: 1, type: 'button' }
      metadata.set(element, {
        processedAt: Date.now(),
        clickCount: 0
      })
      
      expect(metadata.has(element)).toBe(true)
      expect(metadata.get(element).clickCount).toBe(0)
    })

    it('should not allow iteration over WeakMap', () => {
      const wm = new WeakMap()
      const key = {}
      wm.set(key, 'value')
      
      // WeakMap is not iterable
      expect(typeof wm[Symbol.iterator]).toBe('undefined')
    })

    it('should only accept objects as WeakMap keys', () => {
      const wm = new WeakMap()
      const obj = {}
      
      wm.set(obj, 'value')
      expect(wm.get(obj)).toBe('value')
      
      // Primitives throw TypeError
      expect(() => wm.set('string', 'value')).toThrow(TypeError)
      expect(() => wm.set(123, 'value')).toThrow(TypeError)
    })

    it('should work with WeakSet for unique objects', () => {
      const ws = new WeakSet()
      const obj1 = { id: 1 }
      const obj2 = { id: 2 }
      
      ws.add(obj1)
      ws.add(obj2)
      
      expect(ws.has(obj1)).toBe(true)
      expect(ws.has(obj2)).toBe(true)
      expect(ws.has({ id: 1 })).toBe(false)  // Different object
    })
  })

  describe('Common Memory Leak Patterns', () => {
    describe('Accidental Global Variables', () => {
      // Source: memory-management.mdx lines ~290-300
      it('should demonstrate proper variable declaration', () => {
        function processData() {
          const localData = [1, 2, 3, 4, 5]
          return localData.length
        }
        
        const result = processData()
        expect(result).toBe(5)
        // localData is freed when function returns
      })
    })

    describe('Closures Holding References', () => {
      // Source: memory-management.mdx lines ~350-370
      it('should demonstrate closure capturing only needed value', () => {
        function createHandler() {
          const hugeData = new Array(100).fill('x')
          const length = hugeData.length  // Extract needed value
          
          return function handler() {
            return length  // Only captures 'length', not hugeData
          }
        }
        
        const handler = createHandler()
        expect(handler()).toBe(100)
      })

      it('should demonstrate closure capturing entire object', () => {
        function createCounter() {
          let count = 0
          
          return {
            increment: () => ++count,
            getCount: () => count
          }
        }
        
        const counter = createCounter()
        counter.increment()
        counter.increment()
        expect(counter.getCount()).toBe(2)
      })
    })

    describe('Growing Collections (Unbounded Caches)', () => {
      // Source: memory-management.mdx lines ~375-410
      it('should demonstrate bounded LRU cache', () => {
        class LRUCache {
          constructor(maxSize = 100) {
            this.cache = new Map()
            this.maxSize = maxSize
          }
          
          get(key) {
            if (this.cache.has(key)) {
              const value = this.cache.get(key)
              this.cache.delete(key)
              this.cache.set(key, value)
              return value
            }
            return undefined
          }
          
          set(key, value) {
            if (this.cache.has(key)) {
              this.cache.delete(key)
            } else if (this.cache.size >= this.maxSize) {
              const firstKey = this.cache.keys().next().value
              this.cache.delete(firstKey)
            }
            this.cache.set(key, value)
          }
          
          get size() {
            return this.cache.size
          }
        }
        
        const cache = new LRUCache(3)
        
        cache.set('a', 1)
        cache.set('b', 2)
        cache.set('c', 3)
        expect(cache.size).toBe(3)
        
        cache.set('d', 4)  // Should evict 'a'
        expect(cache.size).toBe(3)
        expect(cache.get('a')).toBe(undefined)
        expect(cache.get('d')).toBe(4)
      })

      it('should demonstrate WeakMap for object key caching', () => {
        const cache = new WeakMap()
        
        function getData(obj) {
          if (!cache.has(obj)) {
            cache.set(obj, { computed: obj.id * 2 })
          }
          return cache.get(obj)
        }
        
        const obj1 = { id: 5 }
        const obj2 = { id: 10 }
        
        expect(getData(obj1).computed).toBe(10)
        expect(getData(obj2).computed).toBe(20)
        
        // Same object returns cached value
        expect(getData(obj1).computed).toBe(10)
      })
    })
  })

  describe('Object Pools', () => {
    // Source: memory-management.mdx lines ~500-520
    it('should reuse objects from pool instead of creating new ones', () => {
      class ParticlePool {
        constructor(size) {
          this.pool = Array.from({ length: size }, () => ({
            x: 0, y: 0, vx: 0, vy: 0, active: false
          }))
        }
        
        acquire() {
          const particle = this.pool.find(p => !p.active)
          if (particle) {
            particle.active = true
          }
          return particle
        }
        
        release(particle) {
          particle.active = false
          particle.x = 0
          particle.y = 0
          particle.vx = 0
          particle.vy = 0
        }
        
        getActiveCount() {
          return this.pool.filter(p => p.active).length
        }
      }
      
      const pool = new ParticlePool(5)
      
      expect(pool.getActiveCount()).toBe(0)
      
      const p1 = pool.acquire()
      const p2 = pool.acquire()
      expect(pool.getActiveCount()).toBe(2)
      
      p1.x = 100
      p1.y = 200
      
      pool.release(p1)
      expect(pool.getActiveCount()).toBe(1)
      expect(p1.x).toBe(0)  // Reset on release
      
      // Acquiring again should reuse the released particle
      const p3 = pool.acquire()
      expect(pool.getActiveCount()).toBe(2)
    })
  })

  describe('String Concatenation Efficiency', () => {
    // Source: memory-management.mdx lines ~535-550
    it('should build strings efficiently using array join', () => {
      const iterations = 1000
      
      // Build array, join once
      const parts = []
      for (let i = 0; i < iterations; i++) {
        parts.push(`item ${i}`)
      }
      const result = parts.join(', ')
      
      expect(result.startsWith('item 0')).toBe(true)
      expect(result.endsWith('item 999')).toBe(true)
      expect(parts.length).toBe(iterations)
    })
  })

  describe('WeakRef (Advanced)', () => {
    // Source: memory-management.mdx lines ~415-430
    it('should create weak reference to object', () => {
      let target = { name: 'test' }
      const ref = new WeakRef(target)
      
      // deref() returns the target if it still exists
      expect(ref.deref()?.name).toBe('test')
      
      // While target is still referenced, deref() works
      expect(ref.deref()).toBe(target)
    })

    it('should demonstrate WeakRef API', () => {
      const obj = { value: 42 }
      const weakRef = new WeakRef(obj)
      
      // deref() returns the object
      const dereferenced = weakRef.deref()
      expect(dereferenced?.value).toBe(42)
    })
  })

  describe('Memory Lifecycle Phases', () => {
    // Source: memory-management.mdx lines ~65-95
    it('should demonstrate allocation phase', () => {
      // Allocation happens automatically
      const name = "Alice"
      const user = { id: 1, name: "Alice" }
      const items = [1, 2, 3]
      
      expect(name).toBe("Alice")
      expect(user.id).toBe(1)
      expect(items.length).toBe(3)
    })

    it('should demonstrate use phase', () => {
      const user = { name: "Alice", age: 25 }
      
      // Read from memory
      const name = user.name
      expect(name).toBe("Alice")
      
      // Write to memory
      user.age = 30
      expect(user.age).toBe(30)
    })

    it('should demonstrate how function scope enables release', () => {
      function processData() {
        const tempData = { huge: new Array(100).fill('x') }
        return tempData.huge.length
      }
      
      // After processData() returns, tempData is unreachable
      const result = processData()
      expect(result).toBe(100)
      // tempData can now be garbage collected
    })
  })

  describe('Multiple References', () => {
    it('should track objects with multiple references', () => {
      let a = { value: 1 }
      let b = a  // Same object
      let c = a  // Same object
      
      expect(a).toBe(b)
      expect(b).toBe(c)
      
      a.value = 2
      expect(b.value).toBe(2)
      expect(c.value).toBe(2)
    })

    it('should demonstrate reference independence after reassignment', () => {
      let a = { value: 1 }
      let b = a
      
      // Now b points to new object
      b = { value: 2 }
      
      expect(a.value).toBe(1)
      expect(b.value).toBe(2)
      expect(a).not.toBe(b)
    })
  })

  describe('Cleanup Patterns', () => {
    it('should demonstrate nullifying references', () => {
      let data = { large: new Array(100).fill('data') }
      
      // Use the data
      const length = data.large.length
      expect(length).toBe(100)
      
      // Nullify to allow GC
      data = null
      expect(data).toBe(null)
    })

    it('should demonstrate clearing collections', () => {
      const items = [1, 2, 3, 4, 5]
      
      expect(items.length).toBe(5)
      
      // Clear array
      items.length = 0
      expect(items.length).toBe(0)
    })

    it('should demonstrate Map/Set cleanup', () => {
      const map = new Map()
      map.set('a', 1)
      map.set('b', 2)
      
      expect(map.size).toBe(2)
      
      map.clear()
      expect(map.size).toBe(0)
    })
  })
})
