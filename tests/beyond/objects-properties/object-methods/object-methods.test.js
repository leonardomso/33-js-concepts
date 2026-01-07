import { describe, it, expect } from 'vitest'

describe('Object Methods', () => {
  // ============================================================
  // ITERATION METHODS: keys, values, entries
  // From object-methods.mdx lines 60-120
  // ============================================================

  describe('Iteration Methods', () => {
    describe('Object.keys()', () => {
      // From lines 65-74: Basic Object.keys() usage
      it('should return an array of property names', () => {
        const user = { name: 'Alice', age: 30, city: 'NYC' }
        const keys = Object.keys(user)
        
        expect(keys).toEqual(['name', 'age', 'city'])
      })

      // From lines 76-79: Looping through keys
      it('should allow iteration over keys', () => {
        const user = { name: 'Alice', age: 30, city: 'NYC' }
        const collectedKeys = []
        
        for (const key of Object.keys(user)) {
          collectedKeys.push(key)
        }
        
        expect(collectedKeys).toEqual(['name', 'age', 'city'])
      })
    })

    describe('Object.values()', () => {
      // From lines 83-89: Basic Object.values() usage
      it('should return an array of property values', () => {
        const user = { name: 'Alice', age: 30, city: 'NYC' }
        const values = Object.values(user)
        
        expect(values).toEqual(['Alice', 30, 'NYC'])
      })

      // From lines 91-95: Sum values with reduce
      it('should allow summing numeric values', () => {
        const scores = { math: 95, science: 88, history: 92 }
        const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
        
        expect(total).toBe(275)
      })
    })

    describe('Object.entries()', () => {
      // From lines 99-106: Basic Object.entries() usage
      it('should return an array of [key, value] pairs', () => {
        const user = { name: 'Alice', age: 30, city: 'NYC' }
        const entries = Object.entries(user)
        
        expect(entries).toEqual([
          ['name', 'Alice'],
          ['age', 30],
          ['city', 'NYC']
        ])
      })

      // From lines 108-115: Destructuring in a loop
      it('should allow destructured iteration', () => {
        const user = { name: 'Alice', age: 30, city: 'NYC' }
        const output = []
        
        for (const [key, value] of Object.entries(user)) {
          output.push(`${key}: ${value}`)
        }
        
        expect(output).toEqual(['name: Alice', 'age: 30', 'city: NYC'])
      })
    })

    // From note about enumerable properties
    describe('Enumerable Properties Only', () => {
      it('should only return enumerable own properties', () => {
        const obj = {}
        Object.defineProperty(obj, 'hidden', {
          value: 'secret',
          enumerable: false
        })
        obj.visible = 'public'
        
        expect(Object.keys(obj)).toEqual(['visible'])
        expect(Object.values(obj)).toEqual(['public'])
        expect(Object.entries(obj)).toEqual([['visible', 'public']])
      })
    })
  })

  // ============================================================
  // TRANSFORMING OBJECTS WITH fromEntries()
  // From object-methods.mdx lines 130-180
  // ============================================================

  describe('Object.fromEntries()', () => {
    // From lines 135-138: Basic fromEntries usage
    it('should create an object from entries array', () => {
      const entries = [['name', 'Alice'], ['age', 30]]
      const user = Object.fromEntries(entries)
      
      expect(user).toEqual({ name: 'Alice', age: 30 })
    })

    // From lines 143-150: Transform object keys to uppercase
    it('should transform object keys to uppercase', () => {
      const user = { name: 'Alice', age: 30, city: 'NYC' }
      
      const upperCased = Object.fromEntries(
        Object.entries(user).map(([key, value]) => [key.toUpperCase(), value])
      )
      
      expect(upperCased).toEqual({ NAME: 'Alice', AGE: 30, CITY: 'NYC' })
    })

    // From lines 154-161: Filter object properties
    it('should filter object properties by value type', () => {
      const product = { name: 'Laptop', price: 999, inStock: true, sku: 'LP001' }
      
      const stringsOnly = Object.fromEntries(
        Object.entries(product).filter(([key, value]) => typeof value === 'string')
      )
      
      expect(stringsOnly).toEqual({ name: 'Laptop', sku: 'LP001' })
    })

    // From lines 165-172: Convert Map to object
    it('should convert a Map to an object', () => {
      const map = new Map([
        ['name', 'Alice'],
        ['role', 'Admin']
      ])
      
      const obj = Object.fromEntries(map)
      
      expect(obj).toEqual({ name: 'Alice', role: 'Admin' })
    })
  })

  // ============================================================
  // CLONING AND MERGING OBJECTS
  // From object-methods.mdx lines 185-270
  // ============================================================

  describe('Cloning and Merging', () => {
    describe('Object.assign()', () => {
      // From lines 192-197: Basic assign usage
      it('should copy properties from source to target', () => {
        const target = { a: 1 }
        const source = { b: 2 }
        
        Object.assign(target, source)
        
        expect(target).toEqual({ a: 1, b: 2 })
      })

      // From lines 199-205: Clone using empty target
      it('should clone an object using empty target', () => {
        const original = { name: 'Alice', age: 30 }
        const clone = Object.assign({}, original)
        
        clone.name = 'Bob'
        
        expect(original.name).toBe('Alice')
        expect(clone.name).toBe('Bob')
      })

      // From lines 207-213: Merge multiple objects
      it('should merge multiple objects with later sources overriding', () => {
        const defaults = { theme: 'light', fontSize: 14 }
        const userPrefs = { theme: 'dark' }
        
        const settings = Object.assign({}, defaults, userPrefs)
        
        expect(settings).toEqual({ theme: 'dark', fontSize: 14 })
      })

      // From lines 217-228: Shallow copy warning
      it('should only shallow copy nested objects', () => {
        const original = { 
          name: 'Alice', 
          address: { city: 'NYC' } 
        }
        
        const clone = Object.assign({}, original)
        clone.address.city = 'LA'
        
        // Both changed because nested object is shared!
        expect(original.address.city).toBe('LA')
        expect(clone.address.city).toBe('LA')
      })
    })

    describe('structuredClone()', () => {
      // From lines 233-244: Deep clone with structuredClone
      it('should deep clone nested objects', () => {
        const original = { 
          name: 'Alice', 
          address: { city: 'NYC' } 
        }
        
        const clone = structuredClone(original)
        clone.address.city = 'LA'
        
        expect(original.address.city).toBe('NYC')
        expect(clone.address.city).toBe('LA')
      })

      // From lines 248-256: structuredClone handles built-in types
      it('should handle Date and Set objects', () => {
        const data = {
          date: new Date('2024-01-01'),
          items: new Set([1, 2, 3])
        }
        
        const clone = structuredClone(data)
        
        expect(clone.date instanceof Date).toBe(true)
        expect(clone.items instanceof Set).toBe(true)
        expect(clone.date.getTime()).toBe(data.date.getTime())
        expect([...clone.items]).toEqual([1, 2, 3])
      })

      // From lines 261-268: structuredClone cannot clone functions
      it('should throw DataCloneError when cloning functions', () => {
        const obj = { 
          greet: () => 'Hello'
        }
        
        expect(() => structuredClone(obj)).toThrow()
      })

      // Additional: Handle circular references
      it('should handle circular references', () => {
        const obj = { name: 'circular' }
        obj.self = obj
        
        const clone = structuredClone(obj)
        
        expect(clone.name).toBe('circular')
        expect(clone.self).toBe(clone) // Points to itself
        expect(clone.self).not.toBe(obj) // But not original
      })
    })
  })

  // ============================================================
  // OBJECT.hasOwn() - SAFE PROPERTY CHECKING
  // From object-methods.mdx lines 280-330
  // ============================================================

  describe('Object.hasOwn()', () => {
    // From lines 287-292: Basic hasOwn usage
    it('should check for own properties', () => {
      const user = { name: 'Alice', age: 30 }
      
      expect(Object.hasOwn(user, 'name')).toBe(true)
      expect(Object.hasOwn(user, 'toString')).toBe(false) // inherited
      expect(Object.hasOwn(user, 'email')).toBe(false)    // doesn't exist
    })

    // From lines 296-305: Works with null prototype objects
    it('should work with null prototype objects', () => {
      const nullProto = Object.create(null)
      nullProto.id = 1
      
      // hasOwnProperty doesn't exist on null-prototype objects
      expect(nullProto.hasOwnProperty).toBeUndefined()
      
      // Object.hasOwn works fine
      expect(Object.hasOwn(nullProto, 'id')).toBe(true)
    })

    // From lines 309-315: Works when hasOwnProperty is overridden
    it('should work when hasOwnProperty is overridden', () => {
      const sneaky = {
        hasOwnProperty: () => false
      }
      
      expect(sneaky.hasOwnProperty('hasOwnProperty')).toBe(false) // wrong!
      expect(Object.hasOwn(sneaky, 'hasOwnProperty')).toBe(true)  // correct!
    })
  })

  // ============================================================
  // OBJECT.is() - PRECISE EQUALITY
  // From object-methods.mdx lines 335-380
  // ============================================================

  describe('Object.is()', () => {
    // From lines 340-347: Same as === for normal values
    it('should behave like === for normal values', () => {
      expect(Object.is(5, 5)).toBe(true)
      expect(Object.is('hello', 'hello')).toBe(true)
      expect(Object.is({}, {})).toBe(false) // different references
    })

    // From lines 349-352: Different from === for NaN
    it('should return true for NaN === NaN', () => {
      expect(NaN === NaN).toBe(false)           // === returns false
      expect(Object.is(NaN, NaN)).toBe(true)    // Object.is returns true
    })

    // From lines 349-352: Different from === for -0
    it('should distinguish +0 from -0', () => {
      expect(0 === -0).toBe(true)               // === returns true
      expect(Object.is(0, -0)).toBe(false)      // Object.is returns false
    })

    // From lines 356-367: NaN comparison example
    it('should detect NaN values correctly', () => {
      const value = NaN
      
      expect(value === NaN).toBe(false)
      expect(Object.is(value, NaN)).toBe(true)
      expect(Number.isNaN(value)).toBe(true)
    })

    // From lines 369-376: Zero comparison example
    it('should compare zeros correctly', () => {
      const positiveZero = 0
      const negativeZero = -0
      
      expect(positiveZero === negativeZero).toBe(true)
      expect(Object.is(positiveZero, negativeZero)).toBe(false)
    })
  })

  // ============================================================
  // OBJECT.groupBy() - GROUPING DATA (ES2024)
  // From object-methods.mdx lines 385-450
  // ============================================================

  describe('Object.groupBy()', () => {
    // From lines 392-412: Basic groupBy usage
    it('should group array elements by callback result', () => {
      const inventory = [
        { name: 'apples', type: 'fruit', quantity: 5 },
        { name: 'bananas', type: 'fruit', quantity: 3 },
        { name: 'carrots', type: 'vegetable', quantity: 10 },
        { name: 'broccoli', type: 'vegetable', quantity: 7 }
      ]
      
      const byType = Object.groupBy(inventory, item => item.type)
      
      expect(Object.keys(byType).sort()).toEqual(['fruit', 'vegetable'])
      expect(byType.fruit).toHaveLength(2)
      expect(byType.vegetable).toHaveLength(2)
      expect(byType.fruit[0].name).toBe('apples')
      expect(byType.vegetable[0].name).toBe('carrots')
    })

    // From lines 416-434: Custom grouping logic
    it('should support custom grouping logic', () => {
      const products = [
        { name: 'Laptop', price: 999 },
        { name: 'Mouse', price: 29 },
        { name: 'Monitor', price: 399 },
        { name: 'Keyboard', price: 89 }
      ]
      
      const byPriceRange = Object.groupBy(products, product => {
        if (product.price < 50) return 'budget'
        if (product.price < 200) return 'mid-range'
        return 'premium'
      })
      
      expect(byPriceRange.budget).toEqual([{ name: 'Mouse', price: 29 }])
      expect(byPriceRange['mid-range']).toEqual([{ name: 'Keyboard', price: 89 }])
      expect(byPriceRange.premium).toHaveLength(2)
    })

    // Additional: Empty array handling
    it('should handle empty arrays', () => {
      const empty = []
      const grouped = Object.groupBy(empty, item => item.type)
      
      expect(Object.keys(grouped)).toEqual([])
    })

    // Additional: Returns null-prototype object
    it('should return a null-prototype object', () => {
      const items = [{ type: 'a' }]
      const grouped = Object.groupBy(items, item => item.type)
      
      // Null prototype means no inherited properties
      expect(Object.getPrototypeOf(grouped)).toBe(null)
    })
  })

  // ============================================================
  // INSPECTION METHODS
  // From object-methods.mdx lines 455-480
  // ============================================================

  describe('Inspection Methods', () => {
    describe('Object.getOwnPropertyNames()', () => {
      // From lines 460-464: Returns all own properties including non-enumerable
      it('should include non-enumerable properties', () => {
        const arr = [1, 2, 3]
        
        expect(Object.keys(arr)).toEqual(['0', '1', '2'])
        expect(Object.getOwnPropertyNames(arr)).toEqual(['0', '1', '2', 'length'])
      })
    })

    describe('Object.getOwnPropertySymbols()', () => {
      // From lines 468-476: Returns Symbol-keyed properties
      it('should return Symbol-keyed properties', () => {
        const id = Symbol('id')
        const obj = { 
          name: 'Alice',
          [id]: 12345 
        }
        
        expect(Object.keys(obj)).toEqual(['name'])
        expect(Object.getOwnPropertySymbols(obj)).toEqual([id])
      })
    })
  })

  // ============================================================
  // OBJECT PROTECTION METHODS (BRIEF)
  // From object-methods.mdx lines 485-510
  // ============================================================

  describe('Object Protection Methods', () => {
    // From lines 497-503: Object.freeze example
    // Note: In strict mode (which Vitest uses), these throw TypeError instead of silently failing
    it('should prevent modifications when frozen', () => {
      const config = { apiUrl: 'https://api.example.com' }
      
      Object.freeze(config)
      
      // In strict mode, this throws TypeError
      expect(() => {
        config.apiUrl = 'https://evil.com'
      }).toThrow(TypeError)
      
      expect(config.apiUrl).toBe('https://api.example.com')
    })

    // Additional: Object.seal
    it('should allow modifications but not additions when sealed', () => {
      const obj = { existing: 'value' }
      
      Object.seal(obj)
      obj.existing = 'modified'  // This works
      
      // Adding new property throws in strict mode
      expect(() => {
        obj.newProp = 'new'
      }).toThrow(TypeError)
      
      expect(obj.existing).toBe('modified')
      expect(obj.newProp).toBeUndefined()
    })

    // Additional: Object.preventExtensions
    it('should prevent new properties when extensions prevented', () => {
      const obj = { a: 1 }
      
      Object.preventExtensions(obj)
      
      // Adding new property throws in strict mode
      expect(() => {
        obj.b = 2
      }).toThrow(TypeError)
      
      obj.a = 10  // Modifying existing property still works
      
      expect(obj.a).toBe(10)
      expect(obj.b).toBeUndefined()
    })
  })

  // ============================================================
  // COMMON PATTERNS
  // From object-methods.mdx lines 520-560
  // ============================================================

  describe('Common Patterns', () => {
    // From lines 525-533: Normalize API response
    it('should normalize array to lookup object', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
      
      const usersById = Object.fromEntries(
        users.map(user => [user.id, user])
      )
      
      expect(usersById).toEqual({
        1: { id: 1, name: 'Alice' },
        2: { id: 2, name: 'Bob' }
      })
      expect(usersById[1].name).toBe('Alice')
    })

    // From lines 537-548: Configuration merging
    it('should merge configuration with defaults', () => {
      function createClient(userOptions = {}) {
        const defaults = {
          timeout: 5000,
          retries: 3,
          baseUrl: 'https://api.example.com'
        }
        
        return Object.assign({}, defaults, userOptions)
      }
      
      const options = createClient({ timeout: 10000 })
      
      expect(options.timeout).toBe(10000)
      expect(options.retries).toBe(3)
      expect(options.baseUrl).toBe('https://api.example.com')
    })

    // From lines 552-557: Safe property access
    it('should safely check for properties in data', () => {
      function processData(data) {
        if (Object.hasOwn(data, 'userId')) {
          return data.userId
        }
        return null
      }
      
      expect(processData({ userId: 123 })).toBe(123)
      expect(processData({ name: 'Alice' })).toBe(null)
      expect(processData({})).toBe(null)
    })
  })

  // ============================================================
  // OPENING EXAMPLE FROM DOCUMENTATION
  // From object-methods.mdx lines 10-25
  // ============================================================

  describe('Opening Example', () => {
    // From lines 10-20: Main demonstration
    it('should demonstrate the iteration trio and transformation', () => {
      const user = { name: 'Alice', age: 30, city: 'NYC' }

      expect(Object.keys(user)).toEqual(['name', 'age', 'city'])
      expect(Object.values(user)).toEqual(['Alice', 30, 'NYC'])
      expect(Object.entries(user)).toEqual([
        ['name', 'Alice'], 
        ['age', 30], 
        ['city', 'NYC']
      ])

      const upperKeys = Object.fromEntries(
        Object.entries(user).map(([key, value]) => [key.toUpperCase(), value])
      )
      
      expect(upperKeys).toEqual({ NAME: 'Alice', AGE: 30, CITY: 'NYC' })
    })
  })
})
