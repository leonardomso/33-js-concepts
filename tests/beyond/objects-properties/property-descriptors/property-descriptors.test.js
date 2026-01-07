import { describe, it, expect, beforeEach } from 'vitest'

describe('Property Descriptors', () => {
  
  describe('Basic Descriptor Structure', () => {
    it('should have all four attributes for a normal property', () => {
      const obj = { name: 'Alice' }
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'name')
      
      expect(descriptor).toEqual({
        value: 'Alice',
        writable: true,
        enumerable: true,
        configurable: true
      })
    })
    
    it('should default all flags to true when using normal assignment', () => {
      const obj = {}
      obj.prop = 'value'
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop')
      
      expect(descriptor.writable).toBe(true)
      expect(descriptor.enumerable).toBe(true)
      expect(descriptor.configurable).toBe(true)
    })
    
    it('should default flags to false when using defineProperty', () => {
      const obj = {}
      Object.defineProperty(obj, 'prop', { value: 'test' })
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop')
      
      expect(descriptor.writable).toBe(false)
      expect(descriptor.enumerable).toBe(false)
      expect(descriptor.configurable).toBe(false)
    })
  })
  
  describe('Writable Flag', () => {
    it('should allow modification when writable is true', () => {
      const obj = {}
      Object.defineProperty(obj, 'name', {
        value: 'Alice',
        writable: true,
        enumerable: true,
        configurable: true
      })
      
      obj.name = 'Bob'
      expect(obj.name).toBe('Bob')
    })
    
    it('should prevent modification when writable is false (throws in strict mode)', () => {
      const obj = {}
      Object.defineProperty(obj, 'name', {
        value: 'Alice',
        writable: false,
        enumerable: true,
        configurable: true
      })
      
      // In strict mode (which ES modules use), this throws
      expect(() => {
        obj.name = 'Bob'
      }).toThrow(TypeError)
      expect(obj.name).toBe('Alice')
    })
    
    it('should throw in strict mode when writing to non-writable property', () => {
      'use strict'
      
      const obj = {}
      Object.defineProperty(obj, 'name', {
        value: 'Alice',
        writable: false,
        enumerable: true,
        configurable: true
      })
      
      expect(() => {
        obj.name = 'Bob'
      }).toThrow(TypeError)
    })
    
    it('should demonstrate Math.PI is non-writable', () => {
      const descriptor = Object.getOwnPropertyDescriptor(Math, 'PI')
      
      expect(descriptor.writable).toBe(false)
      expect(descriptor.value).toBe(3.141592653589793)
      
      // In strict mode, attempting to change it throws
      expect(() => {
        Math.PI = 3
      }).toThrow(TypeError)
      expect(Math.PI).toBe(3.141592653589793)
    })
  })
  
  describe('Enumerable Flag', () => {
    it('should include enumerable properties in Object.keys()', () => {
      const obj = {}
      Object.defineProperty(obj, 'visible', {
        value: 1,
        enumerable: true
      })
      Object.defineProperty(obj, 'hidden', {
        value: 2,
        enumerable: false
      })
      
      expect(Object.keys(obj)).toEqual(['visible'])
      expect(Object.keys(obj)).not.toContain('hidden')
    })
    
    it('should include enumerable properties in for...in loops', () => {
      const obj = {}
      Object.defineProperty(obj, 'visible', {
        value: 1,
        enumerable: true
      })
      Object.defineProperty(obj, 'hidden', {
        value: 2,
        enumerable: false
      })
      
      const keys = []
      for (const key in obj) {
        keys.push(key)
      }
      
      expect(keys).toEqual(['visible'])
    })
    
    it('should exclude non-enumerable properties from spread operator', () => {
      const obj = { visible: 1 }
      Object.defineProperty(obj, 'hidden', {
        value: 2,
        enumerable: false
      })
      
      const copy = { ...obj }
      
      expect(copy).toEqual({ visible: 1 })
      expect(copy.hidden).toBeUndefined()
    })
    
    it('should exclude non-enumerable properties from JSON.stringify()', () => {
      const obj = { visible: 1 }
      Object.defineProperty(obj, 'hidden', {
        value: 2,
        enumerable: false
      })
      
      const json = JSON.stringify(obj)
      
      expect(json).toBe('{"visible":1}')
    })
    
    it('should still allow direct access to non-enumerable properties', () => {
      const obj = {}
      Object.defineProperty(obj, 'hidden', {
        value: 'secret',
        enumerable: false
      })
      
      expect(obj.hidden).toBe('secret')
    })
    
    it('should demonstrate Array.length is non-enumerable', () => {
      const arr = [1, 2, 3]
      const descriptor = Object.getOwnPropertyDescriptor(arr, 'length')
      
      expect(descriptor.enumerable).toBe(false)
      expect(Object.keys(arr)).toEqual(['0', '1', '2'])
      expect(Object.keys(arr)).not.toContain('length')
    })
  })
  
  describe('Configurable Flag', () => {
    it('should allow deletion when configurable is true', () => {
      const obj = {}
      Object.defineProperty(obj, 'deletable', {
        value: 1,
        configurable: true
      })
      
      expect(delete obj.deletable).toBe(true)
      expect(obj.deletable).toBeUndefined()
    })
    
    it('should prevent deletion when configurable is false (throws in strict mode)', () => {
      const obj = {}
      Object.defineProperty(obj, 'permanent', {
        value: 1,
        configurable: false
      })
      
      // In strict mode, this throws
      expect(() => {
        delete obj.permanent
      }).toThrow(TypeError)
      expect(obj.permanent).toBe(1)
    })
    
    it('should allow reconfiguration when configurable is true', () => {
      const obj = {}
      Object.defineProperty(obj, 'prop', {
        value: 1,
        enumerable: false,
        configurable: true
      })
      
      // Change enumerable flag
      Object.defineProperty(obj, 'prop', {
        enumerable: true
      })
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop')
      expect(descriptor.enumerable).toBe(true)
    })
    
    it('should prevent reconfiguration when configurable is false', () => {
      const obj = {}
      Object.defineProperty(obj, 'prop', {
        value: 1,
        enumerable: false,
        configurable: false
      })
      
      expect(() => {
        Object.defineProperty(obj, 'prop', {
          enumerable: true
        })
      }).toThrow(TypeError)
    })
    
    it('should still allow writable true -> false even when non-configurable', () => {
      const obj = {}
      Object.defineProperty(obj, 'prop', {
        value: 1,
        writable: true,
        configurable: false
      })
      
      // This should work
      Object.defineProperty(obj, 'prop', {
        writable: false
      })
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop')
      expect(descriptor.writable).toBe(false)
    })
    
    it('should NOT allow writable false -> true when non-configurable', () => {
      const obj = {}
      Object.defineProperty(obj, 'prop', {
        value: 1,
        writable: false,
        configurable: false
      })
      
      expect(() => {
        Object.defineProperty(obj, 'prop', {
          writable: true
        })
      }).toThrow(TypeError)
    })
  })
  
  describe('Object.defineProperties()', () => {
    it('should define multiple properties at once', () => {
      const obj = {}
      
      Object.defineProperties(obj, {
        name: {
          value: 'Alice',
          writable: true,
          enumerable: true,
          configurable: true
        },
        age: {
          value: 30,
          writable: false,
          enumerable: true,
          configurable: false
        }
      })
      
      expect(obj.name).toBe('Alice')
      expect(obj.age).toBe(30)
      
      obj.name = 'Bob'
      expect(obj.name).toBe('Bob')
      
      // In strict mode, writing to non-writable throws
      expect(() => {
        obj.age = 40
      }).toThrow(TypeError)
      expect(obj.age).toBe(30) // Unchanged
    })
  })
  
  describe('Object.getOwnPropertyDescriptors()', () => {
    it('should return descriptors for all own properties', () => {
      const obj = { a: 1 }
      Object.defineProperty(obj, 'b', {
        value: 2,
        writable: false,
        enumerable: false,
        configurable: false
      })
      
      const descriptors = Object.getOwnPropertyDescriptors(obj)
      
      expect(descriptors.a).toEqual({
        value: 1,
        writable: true,
        enumerable: true,
        configurable: true
      })
      
      expect(descriptors.b).toEqual({
        value: 2,
        writable: false,
        enumerable: false,
        configurable: false
      })
    })
    
    it('should enable proper object cloning with descriptors', () => {
      const original = {}
      Object.defineProperty(original, 'id', {
        value: 1,
        writable: false,
        enumerable: true,
        configurable: false
      })
      
      // Clone preserving descriptors
      const clone = Object.defineProperties(
        {},
        Object.getOwnPropertyDescriptors(original)
      )
      
      const cloneDescriptor = Object.getOwnPropertyDescriptor(clone, 'id')
      expect(cloneDescriptor.writable).toBe(false)
      expect(cloneDescriptor.configurable).toBe(false)
    })
    
    it('should demonstrate that spread does not preserve descriptors', () => {
      const original = {}
      Object.defineProperty(original, 'id', {
        value: 1,
        writable: false,
        enumerable: true,
        configurable: false
      })
      
      // Spread loses descriptors
      const copy = { ...original }
      
      const copyDescriptor = Object.getOwnPropertyDescriptor(copy, 'id')
      expect(copyDescriptor.writable).toBe(true) // Lost!
      expect(copyDescriptor.configurable).toBe(true) // Lost!
    })
  })
  
  describe('Accessor Descriptors (Getters/Setters)', () => {
    it('should define a property with getter and setter', () => {
      const user = { _name: 'Alice' }
      
      Object.defineProperty(user, 'name', {
        get() {
          return this._name.toUpperCase()
        },
        set(value) {
          this._name = value
        },
        enumerable: true,
        configurable: true
      })
      
      expect(user.name).toBe('ALICE')
      
      user.name = 'Bob'
      expect(user.name).toBe('BOB')
    })
    
    it('should create a read-only property with getter only (throws in strict mode)', () => {
      const circle = { radius: 5 }
      
      Object.defineProperty(circle, 'area', {
        get() {
          return Math.PI * this.radius ** 2
        },
        enumerable: true,
        configurable: true
      })
      
      expect(circle.area).toBeCloseTo(78.54, 1)
      
      // In strict mode, assignment to getter-only throws
      expect(() => {
        circle.area = 100
      }).toThrow(TypeError)
      expect(circle.area).toBeCloseTo(78.54, 1)
    })
    
    it('should throw when mixing value and get in a descriptor', () => {
      expect(() => {
        Object.defineProperty({}, 'prop', {
          value: 42,
          get() { return 42 }
        })
      }).toThrow(TypeError)
    })
    
    it('should throw when mixing writable and get in a descriptor', () => {
      expect(() => {
        Object.defineProperty({}, 'prop', {
          writable: true,
          get() { return 42 }
        })
      }).toThrow(TypeError)
    })
    
    it('should have get/set instead of value/writable in accessor descriptor', () => {
      const obj = {}
      
      Object.defineProperty(obj, 'prop', {
        get() { return 'hello' },
        set(v) { },
        enumerable: true,
        configurable: true
      })
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop')
      
      expect(descriptor.get).toBeDefined()
      expect(descriptor.set).toBeDefined()
      expect(descriptor.value).toBeUndefined()
      expect(descriptor.writable).toBeUndefined()
    })
  })
  
  describe('Object.preventExtensions()', () => {
    it('should prevent adding new properties (throws in strict mode)', () => {
      const obj = { existing: 1 }
      Object.preventExtensions(obj)
      
      expect(() => {
        obj.newProp = 2
      }).toThrow(TypeError)
      expect(obj.newProp).toBeUndefined()
    })
    
    it('should still allow modifying existing properties', () => {
      const obj = { existing: 1 }
      Object.preventExtensions(obj)
      
      obj.existing = 2
      expect(obj.existing).toBe(2)
    })
    
    it('should still allow deleting existing properties', () => {
      const obj = { existing: 1 }
      Object.preventExtensions(obj)
      
      delete obj.existing
      expect(obj.existing).toBeUndefined()
    })
    
    it('should return false for Object.isExtensible()', () => {
      const obj = {}
      Object.preventExtensions(obj)
      
      expect(Object.isExtensible(obj)).toBe(false)
    })
  })
  
  describe('Object.seal()', () => {
    it('should prevent adding new properties (throws in strict mode)', () => {
      const obj = { existing: 1 }
      Object.seal(obj)
      
      expect(() => {
        obj.newProp = 2
      }).toThrow(TypeError)
      expect(obj.newProp).toBeUndefined()
    })
    
    it('should prevent deleting existing properties (throws in strict mode)', () => {
      const obj = { existing: 1 }
      Object.seal(obj)
      
      expect(() => {
        delete obj.existing
      }).toThrow(TypeError)
      expect(obj.existing).toBe(1)
    })
    
    it('should still allow modifying existing values', () => {
      const obj = { existing: 1 }
      Object.seal(obj)
      
      obj.existing = 2
      expect(obj.existing).toBe(2)
    })
    
    it('should set configurable to false on all properties', () => {
      const obj = { prop: 1 }
      Object.seal(obj)
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop')
      expect(descriptor.configurable).toBe(false)
    })
    
    it('should return true for Object.isSealed()', () => {
      const obj = { prop: 1 }
      Object.seal(obj)
      
      expect(Object.isSealed(obj)).toBe(true)
    })
  })
  
  describe('Object.freeze()', () => {
    it('should prevent adding new properties (throws in strict mode)', () => {
      const obj = { existing: 1 }
      Object.freeze(obj)
      
      expect(() => {
        obj.newProp = 2
      }).toThrow(TypeError)
      expect(obj.newProp).toBeUndefined()
    })
    
    it('should prevent deleting existing properties (throws in strict mode)', () => {
      const obj = { existing: 1 }
      Object.freeze(obj)
      
      expect(() => {
        delete obj.existing
      }).toThrow(TypeError)
      expect(obj.existing).toBe(1)
    })
    
    it('should prevent modifying existing values (throws in strict mode)', () => {
      const obj = { existing: 1 }
      Object.freeze(obj)
      
      expect(() => {
        obj.existing = 2
      }).toThrow(TypeError)
      expect(obj.existing).toBe(1) // Unchanged
    })
    
    it('should set configurable and writable to false on all properties', () => {
      const obj = { prop: 1 }
      Object.freeze(obj)
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'prop')
      expect(descriptor.configurable).toBe(false)
      expect(descriptor.writable).toBe(false)
    })
    
    it('should return true for Object.isFrozen()', () => {
      const obj = { prop: 1 }
      Object.freeze(obj)
      
      expect(Object.isFrozen(obj)).toBe(true)
    })
    
    it('should NOT freeze nested objects (shallow freeze)', () => {
      const obj = {
        outer: 1,
        nested: { inner: 2 }
      }
      Object.freeze(obj)
      
      // Outer property is frozen (throws in strict mode)
      expect(() => {
        obj.outer = 100
      }).toThrow(TypeError)
      expect(obj.outer).toBe(1) // Frozen
      
      // But nested object is NOT frozen
      obj.nested.inner = 200
      expect(obj.nested.inner).toBe(200) // NOT frozen!
    })
  })
  
  describe('Real-World Use Cases', () => {
    it('should create a constant configuration object (throws in strict mode)', () => {
      const Config = {}
      
      Object.defineProperties(Config, {
        API_URL: {
          value: 'https://api.example.com',
          writable: false,
          enumerable: true,
          configurable: false
        },
        TIMEOUT: {
          value: 5000,
          writable: false,
          enumerable: true,
          configurable: false
        }
      })
      
      expect(() => {
        Config.API_URL = 'https://evil.com'
      }).toThrow(TypeError)
      expect(Config.API_URL).toBe('https://api.example.com')
      
      expect(() => {
        delete Config.TIMEOUT
      }).toThrow(TypeError)
      expect(Config.TIMEOUT).toBe(5000)
    })
    
    it('should hide internal properties from serialization', () => {
      const user = { name: 'Alice' }
      
      Object.defineProperty(user, '_secret', {
        value: 'password123',
        enumerable: false
      })
      
      const json = JSON.stringify(user)
      expect(json).toBe('{"name":"Alice"}')
      expect(JSON.parse(json)._secret).toBeUndefined()
      
      // But the property still exists
      expect(user._secret).toBe('password123')
    })
    
    it('should create computed properties that auto-update', () => {
      const rectangle = { width: 10, height: 5 }
      
      Object.defineProperty(rectangle, 'area', {
        get() {
          return this.width * this.height
        },
        enumerable: true,
        configurable: true
      })
      
      expect(rectangle.area).toBe(50)
      
      rectangle.width = 20
      expect(rectangle.area).toBe(100) // Auto-updated!
    })
    
    it('should create properties with validation', () => {
      const person = { _age: 0 }
      
      Object.defineProperty(person, 'age', {
        get() {
          return this._age
        },
        set(value) {
          if (typeof value !== 'number' || value < 0) {
            throw new TypeError('Age must be a positive number')
          }
          this._age = value
        },
        enumerable: true,
        configurable: true
      })
      
      person.age = 25
      expect(person.age).toBe(25)
      
      expect(() => {
        person.age = -5
      }).toThrow(TypeError)
      
      expect(() => {
        person.age = 'old'
      }).toThrow(TypeError)
    })
  })
  
  describe('Edge Cases', () => {
    it('should return undefined for non-existent property descriptors', () => {
      const obj = { a: 1 }
      const descriptor = Object.getOwnPropertyDescriptor(obj, 'nonexistent')
      
      expect(descriptor).toBeUndefined()
    })
    
    it('should work with Symbol property keys', () => {
      const secretKey = Symbol('secret')
      const obj = {}
      
      Object.defineProperty(obj, secretKey, {
        value: 'hidden',
        enumerable: false
      })
      
      expect(obj[secretKey]).toBe('hidden')
      expect(Object.keys(obj)).toEqual([])
      expect(Object.getOwnPropertySymbols(obj)).toEqual([secretKey])
    })
    
    it('should allow changing value via defineProperty even when writable is false but configurable is true', () => {
      const obj = {}
      Object.defineProperty(obj, 'prop', {
        value: 1,
        writable: false,
        configurable: true
      })
      
      // Assignment throws in strict mode
      expect(() => {
        obj.prop = 2
      }).toThrow(TypeError)
      expect(obj.prop).toBe(1)
      
      // But defineProperty works!
      Object.defineProperty(obj, 'prop', {
        value: 2
      })
      expect(obj.prop).toBe(2)
    })
  })
})
