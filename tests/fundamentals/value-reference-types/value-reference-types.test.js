import { describe, it, expect } from 'vitest'

describe('Value Types and Reference Types', () => {
  describe('Copying Primitives', () => {
    it('should create independent copies when copying primitives', () => {
      let a = 10
      let b = a // b gets a COPY of the value 10

      b = 20 // changing b has NO effect on a

      expect(a).toBe(10) // unchanged!
      expect(b).toBe(20)
    })

    it('should demonstrate string variables are independent copies', () => {
      let name = "Alice"
      let age = 25
      let user = { name: "Alice" } // Reference on stack, object on heap
      let scores = [95, 87, 92] // Reference on stack, array on heap

      expect(name).toBe("Alice")
      expect(age).toBe(25)
      expect(user).toEqual({ name: "Alice" })
      expect(scores).toEqual([95, 87, 92])
    })
  })

  describe('Copying Objects', () => {
    it('should share reference when copying objects', () => {
      let obj1 = { name: "Alice" }
      let obj2 = obj1 // obj2 gets a COPY of the REFERENCE

      obj2.name = "Bob" // modifies the SAME object!

      expect(obj1.name).toBe("Bob") // changed!
      expect(obj2.name).toBe("Bob")
    })

    it('should share reference when copying arrays', () => {
      let arr1 = [1, 2, 3]
      let arr2 = arr1 // arr2 points to the SAME array

      arr2.push(4) // modifies the shared array

      expect(arr1).toEqual([1, 2, 3, 4]) // changed!
      expect(arr2).toEqual([1, 2, 3, 4])
    })
  })

  describe('Comparison Behavior', () => {
    describe('Primitives: Compared by Value', () => {
      it('should return true for equal primitive values', () => {
        let a = "hello"
        let b = "hello"
        expect(a === b).toBe(true)

        let x = 42
        let y = 42
        expect(x === y).toBe(true)
      })
    })

    describe('Objects: Compared by Reference', () => {
      it('should return false for different objects with same content', () => {
        let obj1 = { name: "Alice" }
        let obj2 = { name: "Alice" }
        expect(obj1 === obj2).toBe(false) // different objects!
      })

      it('should return true for same reference', () => {
        let obj1 = { name: "Alice" }
        let obj3 = obj1
        expect(obj1 === obj3).toBe(true) // same reference
      })

      it('should return false for empty objects/arrays compared', () => {
        // These tests intentionally demonstrate that objects compare by reference
        const emptyObj1 = {}
        const emptyObj2 = {}
        expect(emptyObj1 === emptyObj2).toBe(false)
        
        const emptyArr1 = []
        const emptyArr2 = []
        expect(emptyArr1 === emptyArr2).toBe(false)
        
        const arr1 = [1, 2]
        const arr2 = [1, 2]
        expect(arr1 === arr2).toBe(false)
      })
    })

    describe('Comparing Objects by Content', () => {
      it('should use JSON.stringify for simple comparison', () => {
        let obj1 = { name: "Alice" }
        let obj2 = { name: "Alice" }
        expect(JSON.stringify(obj1) === JSON.stringify(obj2)).toBe(true)
      })

      it('should compare arrays of primitives with every()', () => {
        let arr1 = [1, 2, 3]
        let arr2 = [1, 2, 3]
        expect(arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i])).toBe(true)
      })
    })
  })

  describe('Functions and Parameters', () => {
    describe('Passing Primitives', () => {
      it('should not modify original when passing primitive to function', () => {
        function double(num) {
          num = num * 2
          return num
        }

        let x = 10
        let result = double(x)

        expect(x).toBe(10) // unchanged!
        expect(result).toBe(20)
      })
    })

    describe('Passing Objects', () => {
      it('should modify original object when mutating through function parameter', () => {
        function rename(person) {
          person.name = "Bob"
        }

        let user = { name: "Alice" }
        rename(user)

        expect(user.name).toBe("Bob") // changed!
      })

      it('should not modify original when reassigning parameter', () => {
        function replace(person) {
          person = { name: "Charlie" } // creates NEW local object
        }

        let user = { name: "Alice" }
        replace(user)

        expect(user.name).toBe("Alice") // unchanged!
      })
    })
  })

  describe('Mutation vs Reassignment', () => {
    describe('Mutation', () => {
      it('should modify array with mutating methods', () => {
        const arr = [1, 2, 3]

        arr.push(4)
        expect(arr).toEqual([1, 2, 3, 4])

        arr[0] = 99
        expect(arr).toEqual([99, 2, 3, 4])

        arr.pop()
        expect(arr).toEqual([99, 2, 3])
      })

      it('should modify object properties', () => {
        const obj = { name: "Alice" }

        obj.name = "Bob"
        expect(obj.name).toBe("Bob")

        obj.age = 25
        expect(obj.age).toBe(25)

        delete obj.age
        expect(obj.age).toBe(undefined)
      })
    })

    describe('Reassignment', () => {
      it('should point to new value after reassignment', () => {
        let arr = [1, 2, 3]
        arr = [4, 5, 6]
        expect(arr).toEqual([4, 5, 6])

        let obj = { name: "Alice" }
        obj = { name: "Bob" }
        expect(obj).toEqual({ name: "Bob" })
      })
    })

    describe('const with Objects', () => {
      it('should allow mutations on const objects', () => {
        const arr = [1, 2, 3]

        arr.push(4)
        expect(arr).toEqual([1, 2, 3, 4])

        arr[0] = 99
        expect(arr).toEqual([99, 2, 3, 4])
      })

      it('should allow mutations on const object properties', () => {
        const obj = { name: "Alice" }

        obj.name = "Bob"
        expect(obj.name).toBe("Bob")

        obj.age = 25
        expect(obj.age).toBe(25)
      })

      it('should throw TypeError when reassigning const', () => {
        expect(() => {
          eval('const x = 1; x = 2') // Using eval to test const reassignment
        }).toThrow()
      })
    })
  })

  describe('Object.freeze()', () => {
    it('should throw TypeError when modifying frozen object in strict mode', () => {
      const user = Object.freeze({ name: "Alice", age: 25 })

      // In strict mode (which Vitest uses), modifications throw TypeError
      expect(() => { user.name = "Bob" }).toThrow(TypeError)
      expect(() => { user.email = "a@b.com" }).toThrow(TypeError)
      expect(() => { delete user.age }).toThrow(TypeError)

      expect(user).toEqual({ name: "Alice", age: 25 }) // unchanged!
    })

    it('should check if object is frozen', () => {
      const frozen = Object.freeze({ a: 1 })
      const normal = { a: 1 }

      expect(Object.isFrozen(frozen)).toBe(true)
      expect(Object.isFrozen(normal)).toBe(false)
    })

    it('should only freeze shallow - nested objects can still be modified', () => {
      const user = Object.freeze({
        name: "Alice",
        address: { city: "NYC" }
      })

      // In strict mode, modifying frozen property throws TypeError
      expect(() => { user.name = "Bob" }).toThrow(TypeError)
      // But nested object is not frozen, so this works
      user.address.city = "LA"

      expect(user.name).toBe("Alice") // unchanged
      expect(user.address.city).toBe("LA") // changed!
    })
  })

  describe('Deep Freeze', () => {
    it('should freeze nested objects with deep freeze function', () => {
      function deepFreeze(obj, seen = new WeakSet()) {
        // Prevent infinite loops from circular references
        if (seen.has(obj)) return obj
        seen.add(obj)
        
        const propNames = Reflect.ownKeys(obj)
        
        for (const name of propNames) {
          const value = obj[name]
          if (value && typeof value === "object") {
            deepFreeze(value, seen)
          }
        }
        
        return Object.freeze(obj)
      }

      const user = deepFreeze({
        name: "Alice",
        address: { city: "NYC" }
      })

      // In strict mode, this throws TypeError since nested object is now frozen
      expect(() => { user.address.city = "LA" }).toThrow(TypeError)
      expect(user.address.city).toBe("NYC") // Now blocked!
    })

    it('should handle circular references without infinite loop', () => {
      function deepFreeze(obj, seen = new WeakSet()) {
        if (seen.has(obj)) return obj
        seen.add(obj)
        
        const propNames = Reflect.ownKeys(obj)
        
        for (const name of propNames) {
          const value = obj[name]
          if (value && typeof value === "object") {
            deepFreeze(value, seen)
          }
        }
        
        return Object.freeze(obj)
      }

      // Create object with circular reference
      const obj = { name: "test" }
      obj.self = obj  // Circular reference

      // Should not throw or hang - handles circular reference
      const frozen = deepFreeze(obj)
      
      expect(Object.isFrozen(frozen)).toBe(true)
      expect(frozen.self).toBe(frozen) // Circular reference preserved
      expect(() => { frozen.name = "changed" }).toThrow(TypeError)
    })
  })

  describe('Object.seal() and Object.preventExtensions()', () => {
    it('should allow value changes but prevent add/delete with seal()', () => {
      const sealed = Object.seal({ name: "Alice" })
      
      sealed.name = "Bob"
      expect(sealed.name).toBe("Bob") // Works!
      
      // In strict mode, these throw TypeError instead of failing silently
      expect(() => { sealed.age = 25 }).toThrow(TypeError)
      expect(sealed.age).toBe(undefined)
      
      expect(() => { delete sealed.name }).toThrow(TypeError)
      expect(sealed.name).toBe("Bob")
    })

    it('should allow change/delete but prevent add with preventExtensions()', () => {
      const noExtend = Object.preventExtensions({ name: "Alice" })
      
      noExtend.name = "Bob"
      expect(noExtend.name).toBe("Bob") // Works!
      
      delete noExtend.name
      expect(noExtend.name).toBe(undefined) // Works!
      
      // In strict mode, adding properties throws TypeError
      expect(() => { noExtend.age = 25 }).toThrow(TypeError)
      expect(noExtend.age).toBe(undefined)
    })
  })

  describe('Shallow Copy', () => {
    it('should create shallow copy with spread operator', () => {
      const original = { 
        name: "Alice",
        scores: [95, 87, 92],
        address: { city: "NYC" }
      }

      const copy1 = { ...original }

      expect(copy1.name).toBe("Alice")
      expect(copy1).not.toBe(original) // Different objects
    })

    it('should create shallow copy with Object.assign', () => {
      const original = { name: "Alice" }
      const copy2 = Object.assign({}, original)

      expect(copy2.name).toBe("Alice")
      expect(copy2).not.toBe(original)
    })

    it('should share nested objects in shallow copy', () => {
      const original = { 
        name: "Alice",
        address: { city: "NYC" }
      }

      const shallow = { ...original }

      // Top-level changes are independent
      shallow.name = "Bob"
      expect(original.name).toBe("Alice")

      // But nested objects are SHARED
      shallow.address.city = "LA"
      expect(original.address.city).toBe("LA") // Original changed!
    })

    it('should create shallow copy of arrays', () => {
      const originalArray = [1, 2, 3]
      
      const arrCopy1 = [...originalArray]
      const arrCopy2 = originalArray.slice()
      const arrCopy3 = Array.from(originalArray)

      expect(arrCopy1).toEqual([1, 2, 3])
      expect(arrCopy2).toEqual([1, 2, 3])
      expect(arrCopy3).toEqual([1, 2, 3])
      
      expect(arrCopy1).not.toBe(originalArray)
      expect(arrCopy2).not.toBe(originalArray)
      expect(arrCopy3).not.toBe(originalArray)
    })
  })

  describe('Deep Copy', () => {
    it('should create deep copy with structuredClone', () => {
      const original = { 
        name: "Alice",
        scores: [95, 87, 92],
        address: { city: "NYC" },
        date: new Date()
      }

      const deep = structuredClone(original)

      // Everything is independent
      deep.address.city = "LA"
      expect(original.address.city).toBe("NYC") // unchanged!

      deep.scores.push(100)
      expect(original.scores).toEqual([95, 87, 92]) // unchanged!
    })

    it('should create deep copy with JSON trick (with limitations)', () => {
      const original = { 
        name: "Alice",
        address: { city: "NYC" }
      }

      const deep = JSON.parse(JSON.stringify(original))

      deep.address.city = "LA"
      expect(original.address.city).toBe("NYC") // unchanged!
    })

    it('should demonstrate JSON trick limitations', () => {
      const obj = {
        fn: () => {},
        date: new Date('2025-01-01'),
        undef: undefined,
        set: new Set([1, 2])
      }

      const clone = JSON.parse(JSON.stringify(obj))

      expect(clone.fn).toBe(undefined) // Functions lost
      expect(typeof clone.date).toBe('string') // Date becomes string
      expect(clone.undef).toBe(undefined) // Property removed
      expect(clone.set).toEqual({}) // Set becomes empty object
    })
  })

  describe('Array Methods: Mutating vs Non-Mutating', () => {
    describe('Mutating Methods', () => {
      it('should mutate array with push, pop, shift, unshift', () => {
        const arr = [1, 2, 3]
        
        arr.push(4)
        expect(arr).toEqual([1, 2, 3, 4])
        
        arr.pop()
        expect(arr).toEqual([1, 2, 3])
        
        arr.shift()
        expect(arr).toEqual([2, 3])
        
        arr.unshift(1)
        expect(arr).toEqual([1, 2, 3])
      })

      it('should mutate array with sort and reverse', () => {
        const nums = [3, 1, 2]
        nums.sort()
        expect(nums).toEqual([1, 2, 3]) // Original mutated!
        
        nums.reverse()
        expect(nums).toEqual([3, 2, 1]) // Original mutated!
      })

      it('should mutate array with splice', () => {
        const arr = [1, 2, 3, 4, 5]
        arr.splice(2, 1) // Remove 1 element at index 2
        expect(arr).toEqual([1, 2, 4, 5])
      })
    })

    describe('Non-Mutating Methods', () => {
      it('should not mutate with map, filter, slice, concat', () => {
        const original = [1, 2, 3]
        
        const mapped = original.map(x => x * 2)
        expect(original).toEqual([1, 2, 3])
        expect(mapped).toEqual([2, 4, 6])
        
        const filtered = original.filter(x => x > 1)
        expect(original).toEqual([1, 2, 3])
        expect(filtered).toEqual([2, 3])
        
        const sliced = original.slice(1)
        expect(original).toEqual([1, 2, 3])
        expect(sliced).toEqual([2, 3])
        
        const concatenated = original.concat([4, 5])
        expect(original).toEqual([1, 2, 3])
        expect(concatenated).toEqual([1, 2, 3, 4, 5])
      })

      it('should use toSorted and toReversed for non-mutating sort/reverse (ES2023)', () => {
        const nums = [3, 1, 2]
        
        const sorted = nums.toSorted()
        expect(nums).toEqual([3, 1, 2]) // Original unchanged
        expect(sorted).toEqual([1, 2, 3])
        
        const reversed = nums.toReversed()
        expect(nums).toEqual([3, 1, 2]) // Original unchanged
        expect(reversed).toEqual([2, 1, 3])
      })
    })

    describe('Safe Sorting Pattern', () => {
      it('should copy array before sorting to avoid mutation', () => {
        const nums = [3, 1, 2]
        const sorted = [...nums].sort()
        
        expect(nums).toEqual([3, 1, 2]) // Original unchanged
        expect(sorted).toEqual([1, 2, 3])
      })
    })
  })

  describe('Common Pitfalls', () => {
    it('should demonstrate accidental array mutation in function', () => {
      function processUsers(users) {
        const copy = [...users]
        copy.push({ name: "New User" })
        return copy
      }

      const myUsers = [{ name: "Alice" }]
      const result = processUsers(myUsers)
      
      expect(myUsers).toEqual([{ name: "Alice" }]) // Original unchanged
      expect(result).toEqual([{ name: "Alice" }, { name: "New User" }])
    })

    it('should demonstrate backup pattern failure', () => {
      const original = [1, 2, 3]
      const notABackup = original // NOT a backup!

      original.push(4)
      expect(notABackup).toEqual([1, 2, 3, 4]) // "backup" changed!

      // Correct backup
      const original2 = [1, 2, 3]
      const backup = [...original2]
      
      original2.push(4)
      expect(backup).toEqual([1, 2, 3]) // Real backup unchanged
    })

    it('should demonstrate deep equality comparison', () => {
      function deepEqual(a, b) {
        return JSON.stringify(a) === JSON.stringify(b)
      }

      const obj1 = { name: "Alice", age: 25 }
      const obj2 = { name: "Alice", age: 25 }
      
      expect(obj1 === obj2).toBe(false)
      expect(deepEqual(obj1, obj2)).toBe(true)
    })
  })

  describe('Best Practices: Immutable Patterns', () => {
    it('should create new object instead of mutating', () => {
      const user = { name: "Alice", age: 25 }
      
      // Instead of: user.name = "Bob"
      const updatedUser = { ...user, name: "Bob" }
      
      expect(user.name).toBe("Alice") // Original unchanged
      expect(updatedUser.name).toBe("Bob")
    })

    it('should use non-mutating array methods', () => {
      const numbers = [3, 1, 2]
      
      // Instead of: numbers.sort()
      const sorted = [...numbers].sort((a, b) => a - b)
      
      expect(numbers).toEqual([3, 1, 2]) // Original unchanged
      expect(sorted).toEqual([1, 2, 3])
    })
  })

  describe('structuredClone with Special Types', () => {
    it('should deep clone objects with Map', () => {
      const original = {
        name: "Alice",
        data: new Map([["key1", "value1"], ["key2", "value2"]])
      }

      const clone = structuredClone(original)
      
      // Modify the clone's Map
      clone.data.set("key1", "modified")
      clone.data.set("key3", "new value")

      // Original should be unchanged
      expect(original.data.get("key1")).toBe("value1")
      expect(original.data.has("key3")).toBe(false)
      expect(clone.data.get("key1")).toBe("modified")
    })

    it('should deep clone objects with Set', () => {
      const original = {
        name: "Alice",
        tags: new Set([1, 2, 3])
      }

      const clone = structuredClone(original)
      
      // Modify the clone's Set
      clone.tags.add(4)
      clone.tags.delete(1)

      // Original should be unchanged
      expect(original.tags.has(1)).toBe(true)
      expect(original.tags.has(4)).toBe(false)
      expect(clone.tags.has(1)).toBe(false)
      expect(clone.tags.has(4)).toBe(true)
    })

    it('should deep clone objects with Date', () => {
      const original = {
        name: "Event",
        date: new Date("2025-01-01")
      }

      const clone = structuredClone(original)
      
      expect(clone.date instanceof Date).toBe(true)
      expect(clone.date.getTime()).toBe(original.date.getTime())
      expect(clone.date).not.toBe(original.date) // Different reference
    })
  })

  describe('Shared Default Object Reference Pitfall', () => {
    it('should demonstrate shared default array problem', () => {
      const defaultList = []
      
      function addItem(item, list = defaultList) {
        list.push(item)
        return list
      }

      const result1 = addItem("a")
      const result2 = addItem("b")

      // Both calls modified the same defaultList!
      expect(result1).toEqual(["a", "b"])
      expect(result2).toEqual(["a", "b"])
      expect(result1).toBe(result2) // Same reference!
    })

    it('should fix shared default with new array creation', () => {
      function addItem(item, list = []) {
        list.push(item)
        return list
      }

      const result1 = addItem("a")
      const result2 = addItem("b")

      // Each call gets its own array
      expect(result1).toEqual(["a"])
      expect(result2).toEqual(["b"])
      expect(result1).not.toBe(result2)
    })
  })

  describe('WeakMap vs Map Memory Behavior', () => {
    it('should demonstrate Map holds strong references', () => {
      const cache = new Map()
      let user = { id: 1, name: "Alice" }
      
      cache.set(user.id, user)
      
      // Even if we clear user, the Map still holds the reference
      const cachedUser = cache.get(1)
      expect(cachedUser.name).toBe("Alice")
    })

    it('should demonstrate WeakMap allows garbage collection', () => {
      const cache = new WeakMap()
      let user = { id: 1, name: "Alice" }
      
      cache.set(user, { computed: "expensive data" })
      
      // WeakMap uses the object itself as key
      expect(cache.get(user)).toEqual({ computed: "expensive data" })
      
      // WeakMap keys must be objects
      expect(() => cache.set("string-key", "value")).toThrow(TypeError)
    })

    it('should show WeakMap cannot be iterated', () => {
      const weakMap = new WeakMap()
      const obj = { id: 1 }
      weakMap.set(obj, "value")

      // WeakMap has no size property
      expect(weakMap.size).toBe(undefined)
      
      // WeakMap is not iterable
      expect(typeof weakMap[Symbol.iterator]).toBe("undefined")
    })
  })

  describe('Clone Function Parameters Pattern', () => {
    it('should clone parameters before modification', () => {
      function processData(data) {
        // Clone to avoid modifying original
        const copy = structuredClone(data)
        copy.processed = true
        copy.items.push("new item")
        return copy
      }

      const original = { 
        name: "data", 
        items: ["item1", "item2"] 
      }
      
      const result = processData(original)

      // Original is unchanged
      expect(original.processed).toBe(undefined)
      expect(original.items).toEqual(["item1", "item2"])
      
      // Result has modifications
      expect(result.processed).toBe(true)
      expect(result.items).toEqual(["item1", "item2", "new item"])
    })
  })

  describe('let with Object.freeze()', () => {
    it('should allow reassignment of let variable holding frozen object', () => {
      let obj = Object.freeze({ a: 1 })
      
      // Cannot modify the frozen object
      expect(() => { obj.a = 2 }).toThrow(TypeError)
      
      // But CAN reassign the variable to a new object
      obj = { a: 2 }
      expect(obj.a).toBe(2)
    })

    it('should demonstrate const + freeze for true immutability', () => {
      const obj = Object.freeze({ a: 1 })
      
      // Cannot modify the frozen object
      expect(() => { obj.a = 2 }).toThrow(TypeError)
      
      // Cannot reassign const
      // obj = { a: 2 } // Would throw TypeError
      expect(obj.a).toBe(1)
    })
  })
})
