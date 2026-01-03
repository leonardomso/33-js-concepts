import { describe, it, expect } from 'vitest'

describe('JavaScript Engines', () => {
  describe('Basic Examples from Documentation', () => {
    it('should demonstrate basic function execution (opening example)', () => {
      // From the opening of the documentation
      function greet(name) {
        return "Hello, " + name + "!"
      }

      expect(greet("World")).toBe("Hello, World!")
      expect(greet("JavaScript")).toBe("Hello, JavaScript!")
      expect(greet("V8")).toBe("Hello, V8!")
    })
  })

  describe('Object Shape Consistency', () => {
    it('should create objects with consistent property order', () => {
      // Objects with same properties in same order share hidden classes
      const point1 = { x: 1, y: 2 }
      const point2 = { x: 5, y: 10 }
      
      // Both should have same property keys in same order
      expect(Object.keys(point1)).toEqual(['x', 'y'])
      expect(Object.keys(point2)).toEqual(['x', 'y'])
      expect(Object.keys(point1)).toEqual(Object.keys(point2))
    })

    it('should show different key order for differently created objects', () => {
      // Property order matters for hidden classes
      const a = { x: 1, y: 2 }
      const b = { y: 2, x: 1 }
      
      // Keys are in different order
      expect(Object.keys(a)).toEqual(['x', 'y'])
      expect(Object.keys(b)).toEqual(['y', 'x'])
      
      // These have DIFFERENT hidden classes in V8!
      expect(Object.keys(a)).not.toEqual(Object.keys(b))
    })

    it('should maintain consistent shapes with factory functions', () => {
      // Factory functions create consistent shapes (engine-friendly)
      function createPoint(x, y) {
        return { x, y }
      }
      
      const p1 = createPoint(1, 2)
      const p2 = createPoint(3, 4)
      const p3 = createPoint(5, 6)
      
      // All have identical structure
      expect(Object.keys(p1)).toEqual(Object.keys(p2))
      expect(Object.keys(p2)).toEqual(Object.keys(p3))
    })

    it('should demonstrate transition chains when adding properties', () => {
      const obj = {}
      expect(Object.keys(obj)).toEqual([])
      
      obj.x = 1
      expect(Object.keys(obj)).toEqual(['x'])
      
      obj.y = 2
      expect(Object.keys(obj)).toEqual(['x', 'y'])
      
      // Each step creates a new hidden class (transition chain)
    })

    it('should compare Pattern A (object literal) vs Pattern B (empty object + properties)', () => {
      // Pattern A: Object literal - creates shape immediately
      function createPointA(x, y) {
        return { x: x, y: y }
      }
      
      // Pattern B: Empty object + property additions - goes through transitions
      function createPointB(x, y) {
        const point = {}
        point.x = x
        point.y = y
        return point
      }
      
      const pointA = createPointA(1, 2)
      const pointB = createPointB(3, 4)
      
      // Both produce same final shape
      expect(Object.keys(pointA)).toEqual(['x', 'y'])
      expect(Object.keys(pointB)).toEqual(['x', 'y'])
      
      // Both work correctly
      expect(pointA.x).toBe(1)
      expect(pointA.y).toBe(2)
      expect(pointB.x).toBe(3)
      expect(pointB.y).toBe(4)
      
      // Pattern A is more engine-friendly because:
      // - V8 can optimize object literals with known properties
      // - Pattern B goes through 3 hidden class transitions: {} -> {x} -> {x,y}
    })
  })

  describe('Type Consistency', () => {
    it('should demonstrate consistent number operations', () => {
      // V8 optimizes for consistent types
      function add(a, b) {
        return a + b
      }
      
      // Consistent number usage (monomorphic, fast)
      expect(add(1, 2)).toBe(3)
      expect(add(3, 4)).toBe(7)
      expect(add(5, 6)).toBe(11)
    })

    it('should handle type changes (triggers deoptimization)', () => {
      function process(x) {
        return x + x
      }
      
      // Numbers
      expect(process(5)).toBe(10)
      expect(process(10)).toBe(20)
      
      // Strings (type change - would trigger deoptimization in V8)
      expect(process("hello")).toBe("hellohello")
      
      // Mixed usage works but is slower due to deoptimization
    })

    it('should demonstrate dynamic object shapes with process function', () => {
      // From JIT compilation section - shows why JS needs JIT
      function process(x) {
        return x.value * 2
      }
      
      // Object with number value
      expect(process({ value: 10 })).toBe(20)
      
      // Object with string value (NaN result)
      expect(process({ value: "hello" })).toBeNaN()
      
      // Different shape (extra property) - still works
      expect(process({ value: 10, extra: 5 })).toBe(20)
      
      // Even more different shape
      expect(process({ value: 5, a: 1, b: 2 })).toBe(10)
      
      // This demonstrates why JavaScript needs JIT:
      // - x could be any object shape
      // - x.value could be any type
      // - AOT compilation can't optimize for all possibilities
    })

    it('should show typeof consistency', () => {
      let num = 42
      expect(typeof num).toBe('number')
      
      // Changing types is valid JS but can cause deoptimization
      // let num = "forty-two" // Would change type
      
      // Better: use separate variables
      const numValue = 42
      const strValue = "forty-two"
      
      expect(typeof numValue).toBe('number')
      expect(typeof strValue).toBe('string')
    })
  })

  describe('Array Optimization', () => {
    it('should create dense arrays (engine-friendly)', () => {
      // Dense array - all indices filled, same type
      const dense = [1, 2, 3, 4, 5]
      
      expect(dense.length).toBe(5)
      expect(dense[0]).toBe(1)
      expect(dense[4]).toBe(5)
      
      // V8 can use optimized "packed" array representation
    })

    it('should demonstrate sparse arrays (slower)', () => {
      // Sparse array with holes - V8 uses slower dictionary mode
      const sparse = []
      sparse[0] = 1
      sparse[100] = 2
      
      expect(sparse.length).toBe(101)
      expect(sparse[0]).toBe(1)
      expect(sparse[50]).toBe(undefined) // Hole
      expect(sparse[100]).toBe(2)
      
      // This creates 99 "holes" - less efficient
    })

    it('should show typed array benefits', () => {
      // Typed arrays are always optimized (single type, no holes)
      const int32Array = new Int32Array([1, 2, 3, 4, 5])
      
      expect(int32Array.length).toBe(5)
      expect(int32Array[0]).toBe(1)
      
      // All elements guaranteed to be 32-bit integers
    })

    it('should demonstrate mixed-type arrays (polymorphic)', () => {
      // Mixed types require more generic handling
      const mixed = [1, "two", 3, null, { four: 4 }]
      
      expect(typeof mixed[0]).toBe('number')
      expect(typeof mixed[1]).toBe('string')
      expect(typeof mixed[3]).toBe('object')
      expect(typeof mixed[4]).toBe('object')
      
      // V8 can't assume element types - slower operations
    })

    it('should preserve array type with consistent operations', () => {
      const numbers = [1, 2, 3, 4, 5]
      
      // map preserves array structure
      const doubled = numbers.map(n => n * 2)
      expect(doubled).toEqual([2, 4, 6, 8, 10])
      
      // filter preserves type consistency
      const filtered = numbers.filter(n => n > 2)
      expect(filtered).toEqual([3, 4, 5])
    })
  })

  describe('Property Access Patterns', () => {
    it('should demonstrate monomorphic property access', () => {
      // Monomorphic: always same object shape
      function getX(obj) {
        return obj.x
      }
      
      // All objects have same shape - fastest IC state
      expect(getX({ x: 1, y: 2 })).toBe(1)
      expect(getX({ x: 3, y: 4 })).toBe(3)
      expect(getX({ x: 5, y: 6 })).toBe(5)
    })

    it('should show polymorphic access (multiple shapes)', () => {
      function getX(obj) {
        return obj.x
      }
      
      // Different shapes - polymorphic IC
      expect(getX({ x: 1 })).toBe(1)                    // Shape A
      expect(getX({ x: 2, y: 3 })).toBe(2)              // Shape B
      expect(getX({ x: 4, y: 5, z: 6 })).toBe(4)        // Shape C
      
      // Still works, but inline cache has multiple entries
    })

    it('should demonstrate computed property access', () => {
      const obj = { a: 1, b: 2, c: 3 }
      
      // Direct property access (faster)
      expect(obj.a).toBe(1)
      
      // Computed property access (slightly slower but necessary for dynamic keys)
      const key = 'b'
      expect(obj[key]).toBe(2)
    })

    it('should demonstrate megamorphic access (many different shapes)', () => {
      function getX(obj) {
        return obj.x
      }
      
      // Every call has a completely different shape
      // This would cause megamorphic IC state in V8
      expect(getX({ x: 1 })).toBe(1)
      expect(getX({ x: 2, a: 1 })).toBe(2)
      expect(getX({ x: 3, b: 2 })).toBe(3)
      expect(getX({ x: 4, c: 3 })).toBe(4)
      expect(getX({ x: 5, d: 4 })).toBe(5)
      expect(getX({ x: 6, e: 5 })).toBe(6)
      expect(getX({ x: 7, f: 6 })).toBe(7)
      
      // IC gives up after too many shapes - falls back to generic lookup
      // Still works correctly, just slower than monomorphic/polymorphic
    })
  })

  describe('Class vs Object Literal Shapes', () => {
    it('should create consistent shapes with classes', () => {
      class Point {
        constructor(x, y) {
          this.x = x
          this.y = y
        }
      }
      
      const p1 = new Point(1, 2)
      const p2 = new Point(3, 4)
      const p3 = new Point(5, 6)
      
      // All instances have identical shape
      expect(Object.keys(p1)).toEqual(['x', 'y'])
      expect(Object.keys(p2)).toEqual(['x', 'y'])
      expect(Object.keys(p3)).toEqual(['x', 'y'])
    })

    it('should show prototype chain optimization', () => {
      class Animal {
        speak() {
          return 'sound'
        }
      }
      
      class Dog extends Animal {
        speak() {
          return 'woof'
        }
      }
      
      const dog = new Dog()
      
      // Method lookup follows prototype chain
      expect(dog.speak()).toBe('woof')
      expect(dog instanceof Dog).toBe(true)
      expect(dog instanceof Animal).toBe(true)
    })
  })

  describe('Avoiding Deoptimization Patterns', () => {
    it('should show delete causing shape change', () => {
      const user = { name: 'Alice', age: 30, temp: true }
      
      expect(Object.keys(user)).toEqual(['name', 'age', 'temp'])
      
      // delete changes hidden class (bad for performance)
      delete user.temp
      
      expect(Object.keys(user)).toEqual(['name', 'age'])
      expect(user.temp).toBe(undefined)
      
      // Better alternative: set to undefined
      const user2 = { name: 'Bob', age: 25, temp: true }
      user2.temp = undefined  // Hidden class stays the same
      
      expect('temp' in user2).toBe(true)  // Property still exists
      expect(user2.temp).toBe(undefined)
    })

    it('should demonstrate object spread for immutable updates', () => {
      const original = { x: 1, y: 2, z: 3 }
      
      // Instead of mutating, create new object
      const updated = { ...original, z: 10 }
      
      expect(original.z).toBe(3)  // Original unchanged
      expect(updated.z).toBe(10)  // New object with update
      
      // Both have consistent shapes
      expect(Object.keys(original)).toEqual(['x', 'y', 'z'])
      expect(Object.keys(updated)).toEqual(['x', 'y', 'z'])
    })

    it('should show inconsistent shapes with conditional property assignment', () => {
      // Bad pattern: conditional property assignment creates different shapes
      function createUserBad(name, age) {
        const user = {}
        if (name) user.name = name
        if (age) user.age = age
        return user
      }
      
      const user1 = createUserBad('Alice', 30)
      const user2 = createUserBad('Bob', null)      // Only name
      const user3 = createUserBad(null, 25)         // Only age
      const user4 = createUserBad(null, null)       // Empty
      
      // All have different shapes!
      expect(Object.keys(user1)).toEqual(['name', 'age'])
      expect(Object.keys(user2)).toEqual(['name'])
      expect(Object.keys(user3)).toEqual(['age'])
      expect(Object.keys(user4)).toEqual([])
      
      // Compare with good pattern
      function createUserGood(name, age) {
        return { name, age }  // Always same shape
      }
      
      const goodUser1 = createUserGood('Alice', 30)
      const goodUser2 = createUserGood('Bob', null)
      const goodUser3 = createUserGood(null, 25)
      
      // Same shape regardless of values (nulls are still properties)
      expect(Object.keys(goodUser1)).toEqual(['name', 'age'])
      expect(Object.keys(goodUser2)).toEqual(['name', 'age'])
      expect(Object.keys(goodUser3)).toEqual(['name', 'age'])
    })
  })

  describe('Function Optimization Patterns', () => {
    it('should demonstrate consistent function signatures', () => {
      function multiply(a, b) {
        return a * b
      }
      
      // Consistent argument types enable optimization
      expect(multiply(2, 3)).toBe(6)
      expect(multiply(4, 5)).toBe(20)
      expect(multiply(6, 7)).toBe(42)
    })

    it('should show inlining with small functions', () => {
      // Small functions are candidates for inlining
      function square(x) {
        return x * x
      }
      
      function sumOfSquares(a, b) {
        return square(a) + square(b)
      }
      
      // V8 may inline square() into sumOfSquares()
      expect(sumOfSquares(3, 4)).toBe(25)  // 9 + 16
    })

    it('should demonstrate closure optimization', () => {
      function createAdder(x) {
        // Closure captures x
        return function(y) {
          return x + y
        }
      }
      
      const add5 = createAdder(5)
      const add10 = createAdder(10)
      
      // Closures with consistent captured values can be optimized
      expect(add5(3)).toBe(8)
      expect(add10(3)).toBe(13)
    })
  })

  describe('Garbage Collection Concepts', () => {
    it('should demonstrate object references', () => {
      let obj = { data: 'important' }
      const ref = obj
      
      // Both point to same object
      expect(ref.data).toBe('important')
      
      // Setting obj to null doesn't GC the object
      // because ref still holds a reference
      obj = null
      expect(ref.data).toBe('important')
    })

    it('should show circular references', () => {
      const a = { name: 'a' }
      const b = { name: 'b' }
      
      // Circular reference
      a.ref = b
      b.ref = a
      
      expect(a.ref.name).toBe('b')
      expect(b.ref.name).toBe('a')
      expect(a.ref.ref.name).toBe('a')
      
      // Modern GC can handle circular references
      // (mark-and-sweep doesn't rely on reference counting)
    })

    it('should demonstrate WeakRef for GC-friendly references', () => {
      // WeakRef allows object to be garbage collected
      let obj = { data: 'temporary' }
      const weakRef = new WeakRef(obj)
      
      // Can access while object exists
      expect(weakRef.deref()?.data).toBe('temporary')
      
      // Note: We can't force GC in tests, but WeakRef
      // allows the referenced object to be collected
    })

    it('should show Map vs WeakMap for memory management', () => {
      // Regular Map holds strong references
      const map = new Map()
      let key = { id: 1 }
      map.set(key, 'value')
      
      expect(map.get(key)).toBe('value')
      
      // WeakMap allows keys to be garbage collected
      const weakMap = new WeakMap()
      let weakKey = { id: 2 }
      weakMap.set(weakKey, 'value')
      
      expect(weakMap.get(weakKey)).toBe('value')
      
      // If weakKey is set to null and no other references exist,
      // the entry can be garbage collected
    })
  })

  describe('JIT Compilation Observable Behavior', () => {
    it('should handle hot function calls', () => {
      function hotFunction(n) {
        return n * 2
      }
      
      // Simulating many calls (would trigger JIT in real V8)
      let result = 0
      for (let i = 0; i < 1000; i++) {
        result = hotFunction(i)
      }
      
      expect(result).toBe(1998)  // Last iteration: 999 * 2
    })

    it('should demonstrate deoptimization scenario', () => {
      function add(a, b) {
        return a + b
      }
      
      // Many calls with numbers (would be optimized for numbers)
      for (let i = 0; i < 100; i++) {
        add(i, i + 1)
      }
      
      // Then a call with strings (triggers deoptimization)
      const result = add('hello', 'world')
      
      // Still produces correct result despite deoptimization
      expect(result).toBe('helloworld')
    })

    it('should show consistent returns for optimization', () => {
      // Always returns same type (optimizer-friendly)
      function maybeDouble(n, shouldDouble) {
        if (shouldDouble) {
          return n * 2
        }
        return n  // Always returns number
      }
      
      expect(maybeDouble(5, true)).toBe(10)
      expect(maybeDouble(5, false)).toBe(5)
      expect(typeof maybeDouble(5, true)).toBe('number')
      expect(typeof maybeDouble(5, false)).toBe('number')
    })
  })

  describe('Hidden Class Interview Questions', () => {
    it('should explain why object literal order matters', () => {
      // Creating objects with different property orders
      function createA() {
        return { first: 1, second: 2 }
      }
      
      function createB() {
        return { second: 2, first: 1 }
      }
      
      const objA = createA()
      const objB = createB()
      
      // Same values, but different hidden classes
      expect(objA.first).toBe(objB.first)
      expect(objA.second).toBe(objB.second)
      
      // Property order is different
      expect(Object.keys(objA)[0]).toBe('first')
      expect(Object.keys(objB)[0]).toBe('second')
    })

    it('should demonstrate best practice with constructor pattern', () => {
      // Constructor ensures consistent shape
      function User(name, email, age) {
        this.name = name
        this.email = email
        this.age = age
      }
      
      const user1 = new User('Alice', 'alice@example.com', 30)
      const user2 = new User('Bob', 'bob@example.com', 25)
      
      // Guaranteed same property order
      expect(Object.keys(user1)).toEqual(['name', 'email', 'age'])
      expect(Object.keys(user2)).toEqual(['name', 'email', 'age'])
    })
  })
})
