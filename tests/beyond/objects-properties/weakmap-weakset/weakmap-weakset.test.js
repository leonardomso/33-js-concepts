import { describe, it, expect } from 'vitest'

describe('WeakMap & WeakSet', () => {
  // ============================================================
  // WEAKMAP BASICS
  // From weakmap-weakset.mdx lines 95-125
  // ============================================================
  
  describe('WeakMap Basics', () => {
    // From lines 101-119: Basic WeakMap operations
    it('should set and get values with object keys', () => {
      const weakMap = new WeakMap()
      
      const obj1 = { id: 1 }
      const obj2 = { id: 2 }
      
      weakMap.set(obj1, 'first')
      weakMap.set(obj2, 'second')
      
      expect(weakMap.get(obj1)).toBe('first')
      expect(weakMap.get(obj2)).toBe('second')
    })
    
    // From lines 112-116: has() and get() methods
    it('should check existence with has()', () => {
      const weakMap = new WeakMap()
      const obj1 = { id: 1 }
      
      weakMap.set(obj1, 'value')
      
      expect(weakMap.has(obj1)).toBe(true)
      expect(weakMap.has({ id: 3 })).toBe(false) // Different object reference
    })
    
    // From lines 117-119: delete() method
    it('should delete entries', () => {
      const weakMap = new WeakMap()
      const obj1 = { id: 1 }
      
      weakMap.set(obj1, 'value')
      expect(weakMap.has(obj1)).toBe(true)
      
      weakMap.delete(obj1)
      expect(weakMap.has(obj1)).toBe(false)
    })
    
    // From lines 121-136: Keys must be objects
    it('should only accept objects as keys', () => {
      const weakMap = new WeakMap()
      
      // These work - objects as keys
      expect(() => weakMap.set({}, 'empty object')).not.toThrow()
      expect(() => weakMap.set([], 'array')).not.toThrow()
      expect(() => weakMap.set(function() {}, 'function')).not.toThrow()
      expect(() => weakMap.set(new Date(), 'date')).not.toThrow()
    })
    
    // From lines 131-136: Primitives throw TypeError
    it('should throw TypeError for primitive keys', () => {
      const weakMap = new WeakMap()
      
      expect(() => weakMap.set('string', 'value')).toThrow(TypeError)
      expect(() => weakMap.set(123, 'value')).toThrow(TypeError)
      expect(() => weakMap.set(true, 'value')).toThrow(TypeError)
      expect(() => weakMap.set(null, 'value')).toThrow(TypeError)
      expect(() => weakMap.set(undefined, 'value')).toThrow(TypeError)
    })
    
    // From lines 147-156: Values can be anything
    it('should accept any value type', () => {
      const weakMap = new WeakMap()
      const key = { id: 1 }
      
      weakMap.set(key, 'string value')
      expect(weakMap.get(key)).toBe('string value')
      
      weakMap.set(key, 42)
      expect(weakMap.get(key)).toBe(42)
      
      weakMap.set(key, null)
      expect(weakMap.get(key)).toBe(null)
      
      weakMap.set(key, undefined)
      expect(weakMap.get(key)).toBe(undefined)
      
      weakMap.set(key, { nested: 'object' })
      expect(weakMap.get(key)).toEqual({ nested: 'object' })
      
      weakMap.set(key, [1, 2, 3])
      expect(weakMap.get(key)).toEqual([1, 2, 3])
    })
    
    // Test chaining on set()
    it('should return the WeakMap for chaining', () => {
      const weakMap = new WeakMap()
      const obj1 = { a: 1 }
      const obj2 = { b: 2 }
      
      const result = weakMap.set(obj1, 'value1')
      expect(result).toBe(weakMap)
      
      // Chaining
      weakMap.set(obj1, 'v1').set(obj2, 'v2')
      expect(weakMap.get(obj1)).toBe('v1')
      expect(weakMap.get(obj2)).toBe('v2')
    })
  })
  
  // ============================================================
  // WEAKMAP USE CASES
  // From weakmap-weakset.mdx lines 162-270
  // ============================================================
  
  describe('WeakMap Use Cases', () => {
    // From lines 164-207: Private data pattern
    describe('Private Data Pattern', () => {
      it('should store private data not accessible directly', () => {
        const privateData = new WeakMap()
        
        class User {
          constructor(name, password) {
            this.name = name
            privateData.set(this, {
              password,
              loginAttempts: 0
            })
          }
          
          checkPassword(input) {
            const data = privateData.get(this)
            
            if (data.password === input) {
              data.loginAttempts = 0
              return true
            }
            
            data.loginAttempts++
            return false
          }
          
          getLoginAttempts() {
            return privateData.get(this).loginAttempts
          }
        }
        
        const user = new User('Alice', 'secret123')
        
        // Public data is accessible
        expect(user.name).toBe('Alice')
        
        // Private data is NOT accessible
        expect(user.password).toBe(undefined)
        
        // Methods can use private data
        expect(user.checkPassword('wrong')).toBe(false)
        expect(user.checkPassword('secret123')).toBe(true)
        expect(user.getLoginAttempts()).toBe(0)
      })
      
      it('should track login attempts', () => {
        const privateData = new WeakMap()
        
        class User {
          constructor(name, password) {
            this.name = name
            privateData.set(this, { password, loginAttempts: 0 })
          }
          
          checkPassword(input) {
            const data = privateData.get(this)
            if (data.password === input) {
              data.loginAttempts = 0
              return true
            }
            data.loginAttempts++
            return false
          }
          
          getLoginAttempts() {
            return privateData.get(this).loginAttempts
          }
        }
        
        const user = new User('Alice', 'secret')
        
        user.checkPassword('wrong1')
        user.checkPassword('wrong2')
        user.checkPassword('wrong3')
        
        expect(user.getLoginAttempts()).toBe(3)
        
        user.checkPassword('secret')
        expect(user.getLoginAttempts()).toBe(0) // Reset on success
      })
    })
    
    // From lines 248-270: Object caching
    describe('Object Caching', () => {
      it('should cache computed results', () => {
        const cache = new WeakMap()
        let computeCount = 0
        
        function expensiveOperation(obj) {
          if (cache.has(obj)) {
            return cache.get(obj)
          }
          
          computeCount++
          const result = Object.keys(obj)
            .map(key => `${key}: ${obj[key]}`)
            .join(', ')
          
          cache.set(obj, result)
          return result
        }
        
        const user = { name: 'Alice', age: 30 }
        
        const result1 = expensiveOperation(user)
        expect(result1).toBe('name: Alice, age: 30')
        expect(computeCount).toBe(1)
        
        const result2 = expensiveOperation(user)
        expect(result2).toBe('name: Alice, age: 30')
        expect(computeCount).toBe(1) // Still 1, cache hit
      })
    })
    
    // From lines 272-298: Object-level memoization
    describe('Object-Level Memoization', () => {
      it('should memoize function results per object', () => {
        function memoizeForObjects(fn) {
          const cache = new WeakMap()
          
          return function(obj) {
            if (cache.has(obj)) {
              return cache.get(obj)
            }
            
            const result = fn(obj)
            cache.set(obj, result)
            return result
          }
        }
        
        let callCount = 0
        const getFullName = memoizeForObjects(user => {
          callCount++
          return `${user.firstName} ${user.lastName}`
        })
        
        const person = { firstName: 'John', lastName: 'Doe' }
        
        expect(getFullName(person)).toBe('John Doe')
        expect(callCount).toBe(1)
        
        expect(getFullName(person)).toBe('John Doe')
        expect(callCount).toBe(1) // Cached
        
        // Different object - not cached
        const person2 = { firstName: 'Jane', lastName: 'Smith' }
        expect(getFullName(person2)).toBe('Jane Smith')
        expect(callCount).toBe(2)
      })
    })
  })
  
  // ============================================================
  // WEAKSET BASICS
  // From weakmap-weakset.mdx lines 304-338
  // ============================================================
  
  describe('WeakSet Basics', () => {
    // From lines 320-333: Basic WeakSet operations
    it('should add and check objects', () => {
      const weakSet = new WeakSet()
      
      const obj1 = { id: 1 }
      const obj2 = { id: 2 }
      
      weakSet.add(obj1)
      weakSet.add(obj2)
      
      expect(weakSet.has(obj1)).toBe(true)
      expect(weakSet.has({ id: 1 })).toBe(false) // Different object
    })
    
    // From lines 333-335: delete() method
    it('should delete objects', () => {
      const weakSet = new WeakSet()
      const obj1 = { id: 1 }
      
      weakSet.add(obj1)
      expect(weakSet.has(obj1)).toBe(true)
      
      weakSet.delete(obj1)
      expect(weakSet.has(obj1)).toBe(false)
    })
    
    // From lines 326-328: Only objects allowed
    it('should only accept objects as values', () => {
      const weakSet = new WeakSet()
      
      expect(() => weakSet.add({})).not.toThrow()
      expect(() => weakSet.add([])).not.toThrow()
      expect(() => weakSet.add(function() {})).not.toThrow()
    })
    
    it('should throw TypeError for primitive values', () => {
      const weakSet = new WeakSet()
      
      expect(() => weakSet.add('string')).toThrow(TypeError)
      expect(() => weakSet.add(123)).toThrow(TypeError)
      expect(() => weakSet.add(true)).toThrow(TypeError)
      expect(() => weakSet.add(null)).toThrow(TypeError)
      expect(() => weakSet.add(undefined)).toThrow(TypeError)
    })
    
    // Test chaining on add()
    it('should return the WeakSet for chaining', () => {
      const weakSet = new WeakSet()
      const obj1 = { a: 1 }
      const obj2 = { b: 2 }
      
      const result = weakSet.add(obj1)
      expect(result).toBe(weakSet)
      
      // Chaining
      weakSet.add(obj1).add(obj2)
      expect(weakSet.has(obj1)).toBe(true)
      expect(weakSet.has(obj2)).toBe(true)
    })
  })
  
  // ============================================================
  // WEAKSET USE CASES
  // From weakmap-weakset.mdx lines 344-440
  // ============================================================
  
  describe('WeakSet Use Cases', () => {
    // From lines 346-366: Tracking processed objects
    describe('Tracking Processed Objects', () => {
      it('should prevent processing the same object twice', () => {
        const processed = new WeakSet()
        const processLog = []
        
        function processOnce(obj) {
          if (processed.has(obj)) {
            processLog.push('skipped')
            return null
          }
          
          processed.add(obj)
          processLog.push('processed')
          return { ...obj, processed: true }
        }
        
        const user = { name: 'Alice' }
        
        processOnce(user)
        processOnce(user)
        processOnce(user)
        
        expect(processLog).toEqual(['processed', 'skipped', 'skipped'])
      })
    })
    
    // From lines 368-408: Circular reference detection
    describe('Circular Reference Detection', () => {
      it('should detect circular references when cloning', () => {
        function deepClone(obj, seen = new WeakSet()) {
          if (obj === null || typeof obj !== 'object') {
            return obj
          }
          
          if (seen.has(obj)) {
            throw new Error('Circular reference detected!')
          }
          
          seen.add(obj)
          
          if (Array.isArray(obj)) {
            return obj.map(item => deepClone(item, seen))
          }
          
          const clone = {}
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              clone[key] = deepClone(obj[key], seen)
            }
          }
          
          return clone
        }
        
        // Test with circular reference
        const obj = { name: 'Alice' }
        obj.self = obj
        
        expect(() => deepClone(obj)).toThrow('Circular reference detected!')
        
        // Normal objects work fine
        const normal = { a: 1, b: { c: 2 } }
        expect(deepClone(normal)).toEqual({ a: 1, b: { c: 2 } })
      })
    })
    
    // From lines 410-440: Marking visited objects (graph traversal)
    describe('Graph Traversal', () => {
      it('should traverse graph without infinite loop', () => {
        function traverseGraph(node, visitor, visited = new WeakSet()) {
          if (!node || visited.has(node)) {
            return
          }
          
          visited.add(node)
          visitor(node)
          
          if (node.children) {
            for (const child of node.children) {
              traverseGraph(child, visitor, visited)
            }
          }
        }
        
        // Graph with cycles
        const nodeA = { value: 'A', children: [] }
        const nodeB = { value: 'B', children: [] }
        const nodeC = { value: 'C', children: [] }
        
        nodeA.children = [nodeB, nodeC]
        nodeB.children = [nodeC, nodeA] // Cycle back to A
        nodeC.children = [nodeA]         // Cycle back to A
        
        const visited = []
        traverseGraph(nodeA, node => visited.push(node.value))
        
        // Each visited only once despite cycles
        expect(visited).toEqual(['A', 'B', 'C'])
      })
    })
    
    // From lines 442-460: Brand checking
    describe('Brand Checking', () => {
      it('should verify object was created by specific constructor', () => {
        const validUsers = new WeakSet()
        
        class User {
          constructor(name) {
            this.name = name
            validUsers.add(this)
          }
          
          static isValid(obj) {
            return validUsers.has(obj)
          }
        }
        
        const realUser = new User('Alice')
        const fakeUser = { name: 'Bob' }
        
        expect(User.isValid(realUser)).toBe(true)
        expect(User.isValid(fakeUser)).toBe(false)
      })
    })
  })
  
  // ============================================================
  // NO ITERATION
  // From weakmap-weakset.mdx lines 488-510
  // ============================================================
  
  describe('No Iteration', () => {
    it('should not have size property on WeakMap', () => {
      const weakMap = new WeakMap()
      weakMap.set({}, 'value')
      
      expect(weakMap.size).toBe(undefined)
    })
    
    it('should not have size property on WeakSet', () => {
      const weakSet = new WeakSet()
      weakSet.add({})
      
      expect(weakSet.size).toBe(undefined)
    })
    
    it('should not have iteration methods on WeakMap', () => {
      const weakMap = new WeakMap()
      
      expect(weakMap.keys).toBe(undefined)
      expect(weakMap.values).toBe(undefined)
      expect(weakMap.entries).toBe(undefined)
      expect(weakMap.forEach).toBe(undefined)
    })
    
    it('should not have iteration methods on WeakSet', () => {
      const weakSet = new WeakSet()
      
      expect(weakSet.keys).toBe(undefined)
      expect(weakSet.values).toBe(undefined)
      expect(weakSet.forEach).toBe(undefined)
    })
    
    it('should not be iterable with for...of', () => {
      const weakMap = new WeakMap()
      weakMap.set({}, 'value')
      
      expect(() => {
        for (const entry of weakMap) {
          // Should not reach here
        }
      }).toThrow(TypeError)
    })
  })
  
  // ============================================================
  // SYMBOL KEYS (ES2023+)
  // From weakmap-weakset.mdx lines 536-558
  // ============================================================
  
  describe('Symbol Keys (ES2023+)', () => {
    it('should accept non-registered symbols as WeakMap keys', () => {
      const weakMap = new WeakMap()
      
      const mySymbol = Symbol('myKey')
      weakMap.set(mySymbol, 'value')
      
      expect(weakMap.get(mySymbol)).toBe('value')
      expect(weakMap.has(mySymbol)).toBe(true)
    })
    
    it('should reject registered symbols (Symbol.for) as WeakMap keys', () => {
      const weakMap = new WeakMap()
      
      const registeredSymbol = Symbol.for('registered')
      
      expect(() => {
        weakMap.set(registeredSymbol, 'value')
      }).toThrow(TypeError)
    })
    
    it('should accept non-registered symbols in WeakSet', () => {
      const weakSet = new WeakSet()
      
      const mySymbol = Symbol('myKey')
      weakSet.add(mySymbol)
      
      expect(weakSet.has(mySymbol)).toBe(true)
    })
    
    it('should reject registered symbols in WeakSet', () => {
      const weakSet = new WeakSet()
      
      const registeredSymbol = Symbol.for('registered')
      
      expect(() => {
        weakSet.add(registeredSymbol)
      }).toThrow(TypeError)
    })
  })
  
  // ============================================================
  // COMMON MISTAKES
  // From weakmap-weakset.mdx lines 572-614
  // ============================================================
  
  describe('Common Mistakes', () => {
    // From lines 582-590: Using primitives as keys
    describe('Using Primitives as Keys', () => {
      it('should throw for all primitive types', () => {
        const weakMap = new WeakMap()
        
        expect(() => weakMap.set('key', 'value')).toThrow(TypeError)
        expect(() => weakMap.set(123, 'value')).toThrow(TypeError)
        expect(() => weakMap.set(Symbol.for('key'), 'value')).toThrow(TypeError)
      })
      
      it('should work with objects and non-registered symbols', () => {
        const weakMap = new WeakMap()
        
        expect(() => weakMap.set({ key: true }, 'value')).not.toThrow()
        expect(() => weakMap.set(Symbol('key'), 'value')).not.toThrow()
      })
    })
    
    // Test undefined return for non-existent keys
    it('should return undefined for non-existent keys', () => {
      const weakMap = new WeakMap()
      const obj = { id: 1 }
      
      expect(weakMap.get(obj)).toBe(undefined)
      expect(weakMap.has(obj)).toBe(false)
    })
    
    // Test delete returns correct boolean
    it('should return correct boolean from delete', () => {
      const weakMap = new WeakMap()
      const obj = { id: 1 }
      
      // Delete non-existent
      expect(weakMap.delete(obj)).toBe(false)
      
      // Delete existing
      weakMap.set(obj, 'value')
      expect(weakMap.delete(obj)).toBe(true)
      
      // Delete again (now non-existent)
      expect(weakMap.delete(obj)).toBe(false)
    })
  })
  
  // ============================================================
  // MAP VS WEAKMAP COMPARISON
  // From weakmap-weakset.mdx lines 466-486
  // ============================================================
  
  describe('Map vs WeakMap Comparison', () => {
    it('Map should have size property, WeakMap should not', () => {
      const map = new Map()
      const weakMap = new WeakMap()
      
      const obj = {}
      map.set(obj, 'value')
      weakMap.set(obj, 'value')
      
      expect(map.size).toBe(1)
      expect(weakMap.size).toBe(undefined)
    })
    
    it('Map should accept primitives, WeakMap should not', () => {
      const map = new Map()
      const weakMap = new WeakMap()
      
      expect(() => map.set('string', 'value')).not.toThrow()
      expect(() => weakMap.set('string', 'value')).toThrow(TypeError)
    })
    
    it('Map should be iterable, WeakMap should not', () => {
      const map = new Map()
      const weakMap = new WeakMap()
      
      const obj = { id: 1 }
      map.set(obj, 'value')
      weakMap.set(obj, 'value')
      
      // Map is iterable
      const entries = []
      for (const [k, v] of map) {
        entries.push([k, v])
      }
      expect(entries.length).toBe(1)
      
      // WeakMap is not iterable
      expect(() => {
        for (const entry of weakMap) {}
      }).toThrow(TypeError)
    })
  })
  
  // ============================================================
  // SET VS WEAKSET COMPARISON
  // ============================================================
  
  describe('Set vs WeakSet Comparison', () => {
    it('Set should have size property, WeakSet should not', () => {
      const set = new Set()
      const weakSet = new WeakSet()
      
      const obj = {}
      set.add(obj)
      weakSet.add(obj)
      
      expect(set.size).toBe(1)
      expect(weakSet.size).toBe(undefined)
    })
    
    it('Set should accept primitives, WeakSet should not', () => {
      const set = new Set()
      const weakSet = new WeakSet()
      
      expect(() => set.add('string')).not.toThrow()
      expect(() => weakSet.add('string')).toThrow(TypeError)
    })
    
    it('Set should be iterable, WeakSet should not', () => {
      const set = new Set()
      const weakSet = new WeakSet()
      
      const obj = { id: 1 }
      set.add(obj)
      weakSet.add(obj)
      
      // Set is iterable
      const values = []
      for (const v of set) {
        values.push(v)
      }
      expect(values.length).toBe(1)
      
      // WeakSet is not iterable
      expect(() => {
        for (const v of weakSet) {}
      }).toThrow(TypeError)
    })
  })
  
  // ============================================================
  // EDGE CASES
  // ============================================================
  
  describe('Edge Cases', () => {
    it('should allow same object as key in multiple WeakMaps', () => {
      const weakMap1 = new WeakMap()
      const weakMap2 = new WeakMap()
      const obj = { shared: true }
      
      weakMap1.set(obj, 'value1')
      weakMap2.set(obj, 'value2')
      
      expect(weakMap1.get(obj)).toBe('value1')
      expect(weakMap2.get(obj)).toBe('value2')
    })
    
    it('should allow same object in multiple WeakSets', () => {
      const weakSet1 = new WeakSet()
      const weakSet2 = new WeakSet()
      const obj = { shared: true }
      
      weakSet1.add(obj)
      weakSet2.add(obj)
      
      expect(weakSet1.has(obj)).toBe(true)
      expect(weakSet2.has(obj)).toBe(true)
    })
    
    it('should distinguish similar-looking but different objects', () => {
      const weakMap = new WeakMap()
      
      const obj1 = { x: 1 }
      const obj2 = { x: 1 }
      
      weakMap.set(obj1, 'first')
      weakMap.set(obj2, 'second')
      
      expect(weakMap.get(obj1)).toBe('first')
      expect(weakMap.get(obj2)).toBe('second')
    })
    
    it('should handle WeakMap with function keys', () => {
      const weakMap = new WeakMap()
      
      const fn1 = function() { return 1 }
      const fn2 = function() { return 1 }
      
      weakMap.set(fn1, 'function1')
      weakMap.set(fn2, 'function2')
      
      expect(weakMap.get(fn1)).toBe('function1')
      expect(weakMap.get(fn2)).toBe('function2')
    })
    
    it('should handle WeakMap with array keys', () => {
      const weakMap = new WeakMap()
      
      const arr1 = [1, 2, 3]
      const arr2 = [1, 2, 3]
      
      weakMap.set(arr1, 'array1')
      weakMap.set(arr2, 'array2')
      
      expect(weakMap.get(arr1)).toBe('array1')
      expect(weakMap.get(arr2)).toBe('array2')
    })
    
    it('should handle updating existing keys', () => {
      const weakMap = new WeakMap()
      const obj = { id: 1 }
      
      weakMap.set(obj, 'initial')
      expect(weakMap.get(obj)).toBe('initial')
      
      weakMap.set(obj, 'updated')
      expect(weakMap.get(obj)).toBe('updated')
    })
    
    it('should handle adding same object to WeakSet multiple times', () => {
      const weakSet = new WeakSet()
      const obj = { id: 1 }
      
      weakSet.add(obj)
      weakSet.add(obj)
      weakSet.add(obj)
      
      // Still only one instance
      expect(weakSet.has(obj)).toBe(true)
      
      weakSet.delete(obj)
      expect(weakSet.has(obj)).toBe(false)
    })
  })
})
