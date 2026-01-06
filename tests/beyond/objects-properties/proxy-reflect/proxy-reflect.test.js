import { describe, it, expect } from 'vitest'

describe('Proxy and Reflect', () => {
  // ============================================================
  // WHAT IS A PROXY?
  // From proxy-reflect.mdx lines 30-45
  // ============================================================

  describe('What is a Proxy?', () => {
    // From lines 30-40: Basic Proxy with get trap
    it('should return custom value for missing properties', () => {
      const target = { message: 'hello' }

      const handler = {
        get(target, prop) {
          return prop in target ? target[prop] : 'Property not found'
        }
      }

      const proxy = new Proxy(target, handler)

      expect(proxy.message).toBe('hello')
      expect(proxy.missing).toBe('Property not found')
    })

    // From lines 42-48: Empty handler pass-through
    it('should forward operations to target with empty handler', () => {
      const target = { x: 10 }
      const proxy = new Proxy(target, {})

      proxy.y = 20
      expect(target.y).toBe(20)
    })
  })

  // ============================================================
  // THE GET TRAP: INTERCEPTING PROPERTY ACCESS
  // From proxy-reflect.mdx lines 95-140
  // ============================================================

  describe('The get Trap', () => {
    // From lines 95-105: Basic get trap logging
    it('should intercept property reads', () => {
      const logs = []
      const handler = {
        get(target, prop, receiver) {
          logs.push(`Accessing: ${prop}`)
          return target[prop]
        }
      }

      const user = new Proxy({ name: 'Alice' }, handler)
      const name = user.name

      expect(name).toBe('Alice')
      expect(logs).toContain('Accessing: name')
    })

    // From lines 115-122: Default values pattern
    it('should return default value for missing properties', () => {
      const defaults = new Proxy({}, {
        get(target, prop) {
          return prop in target ? target[prop] : 0
        }
      })

      defaults.x = 10
      expect(defaults.x).toBe(10)
      expect(defaults.missing).toBe(0)
    })

    // From lines 126-140: Negative array indices
    it('should allow negative array indices', () => {
      function createNegativeArray(arr) {
        return new Proxy(arr, {
          get(target, prop, receiver) {
            const index = Number(prop)
            if (index < 0) {
              return target[target.length + index]
            }
            return Reflect.get(target, prop, receiver)
          }
        })
      }

      const arr = createNegativeArray([1, 2, 3, 4, 5])
      expect(arr[-1]).toBe(5)
      expect(arr[-2]).toBe(4)
      expect(arr[0]).toBe(1)
    })
  })

  // ============================================================
  // THE SET TRAP: INTERCEPTING PROPERTY ASSIGNMENT
  // From proxy-reflect.mdx lines 145-195
  // ============================================================

  describe('The set Trap', () => {
    // From lines 145-155: Basic set trap
    it('should intercept property writes', () => {
      const logs = []
      const handler = {
        set(target, prop, value, receiver) {
          logs.push(`Setting ${prop} to ${value}`)
          target[prop] = value
          return true
        }
      }

      const obj = new Proxy({}, handler)
      obj.x = 10

      expect(logs).toContain('Setting x to 10')
      expect(obj.x).toBe(10)
    })

    // From lines 165-185: Validation pattern
    it('should validate property values', () => {
      const validator = {
        set(target, prop, value) {
          if (prop === 'age') {
            if (typeof value !== 'number') {
              throw new TypeError('Age must be a number')
            }
            if (value < 0 || value > 150) {
              throw new RangeError('Age must be between 0 and 150')
            }
          }
          target[prop] = value
          return true
        }
      }

      const person = new Proxy({}, validator)

      // Valid assignments
      person.name = 'Alice'
      expect(person.name).toBe('Alice')

      person.age = 30
      expect(person.age).toBe(30)

      // Invalid assignments
      expect(() => {
        person.age = -5
      }).toThrow(RangeError)

      expect(() => {
        person.age = 'thirty'
      }).toThrow(TypeError)
    })

    // From lines 155-160: set must return true
    it('should throw TypeError if set returns false in strict mode', () => {
      const proxy = new Proxy({}, {
        set() {
          return false
        }
      })

      expect(() => {
        'use strict'
        proxy.x = 10
      }).toThrow(TypeError)
    })
  })

  // ============================================================
  // THE HAS TRAP: INTERCEPTING IN OPERATOR
  // From proxy-reflect.mdx lines 200-215
  // ============================================================

  describe('The has Trap', () => {
    // From lines 200-210: Range checking with in operator
    it('should intercept the in operator', () => {
      const range = new Proxy({ start: 1, end: 10 }, {
        has(target, prop) {
          const num = Number(prop)
          return num >= target.start && num <= target.end
        }
      })

      expect(5 in range).toBe(true)
      expect(15 in range).toBe(false)
      expect(1 in range).toBe(true)
      expect(10 in range).toBe(true)
      expect(0 in range).toBe(false)
    })
  })

  // ============================================================
  // THE DELETEPROPERTY TRAP
  // From proxy-reflect.mdx lines 220-235
  // ============================================================

  describe('The deleteProperty Trap', () => {
    // From lines 220-232: Protected properties
    it('should prevent deletion of protected properties', () => {
      const protectedObj = new Proxy({ id: 1, name: 'Alice' }, {
        deleteProperty(target, prop) {
          if (prop === 'id') {
            throw new Error('Cannot delete id property')
          }
          delete target[prop]
          return true
        }
      })

      delete protectedObj.name
      expect(protectedObj.name).toBeUndefined()

      expect(() => {
        delete protectedObj.id
      }).toThrow('Cannot delete id property')
    })
  })

  // ============================================================
  // THE APPLY AND CONSTRUCT TRAPS
  // From proxy-reflect.mdx lines 240-275
  // ============================================================

  describe('The apply and construct Traps', () => {
    // From lines 240-252: Apply trap for function calls
    it('should intercept function calls with apply trap', () => {
      function sum(a, b) {
        return a + b
      }

      const logs = []
      const loggedSum = new Proxy(sum, {
        apply(target, thisArg, args) {
          logs.push(`Called with: ${args}`)
          return target.apply(thisArg, args)
        }
      })

      const result = loggedSum(1, 2)
      expect(result).toBe(3)
      expect(logs).toContain('Called with: 1,2')
    })

    // From lines 256-270: Construct trap for new operator
    it('should intercept new operator with construct trap', () => {
      class User {
        constructor(name) {
          this.name = name
        }
      }

      const logs = []
      const TrackedUser = new Proxy(User, {
        construct(target, args) {
          logs.push(`Creating user: ${args[0]}`)
          return new target(...args)
        }
      })

      const user = new TrackedUser('Alice')
      expect(user.name).toBe('Alice')
      expect(logs).toContain('Creating user: Alice')
    })
  })

  // ============================================================
  // THE OWNKEYS TRAP
  // From proxy-reflect.mdx lines 280-295
  // ============================================================

  describe('The ownKeys Trap', () => {
    // From lines 280-292: Filtering properties
    it('should filter out private properties from Object.keys', () => {
      const user = {
        name: 'Alice',
        age: 30,
        _password: 'secret123'
      }

      const safeUser = new Proxy(user, {
        ownKeys(target) {
          return Object.keys(target).filter(key => !key.startsWith('_'))
        }
      })

      expect(Object.keys(safeUser)).toEqual(['name', 'age'])
      expect(Object.keys(safeUser)).not.toContain('_password')
    })
  })

  // ============================================================
  // WHY REFLECT EXISTS
  // From proxy-reflect.mdx lines 300-350
  // ============================================================

  describe('Reflect', () => {
    // From lines 300-320: Basic Reflect methods
    it('should provide equivalent operations to object methods', () => {
      const obj = { x: 1 }

      // Reflect.get vs obj[prop]
      expect(Reflect.get(obj, 'x')).toBe(1)
      expect(Reflect.get(obj, 'x')).toBe(obj.x)

      // Reflect.set vs obj[prop] = value
      expect(Reflect.set(obj, 'y', 2)).toBe(true)
      expect(obj.y).toBe(2)

      // Reflect.has vs 'prop' in obj
      expect(Reflect.has(obj, 'x')).toBe(true)
      expect(Reflect.has(obj, 'z')).toBe(false)

      // Reflect.deleteProperty vs delete obj[prop]
      expect(Reflect.deleteProperty(obj, 'y')).toBe(true)
      expect(obj.y).toBeUndefined()
    })

    // From lines 325-340: Receiver importance with getters
    it('should properly forward receiver for getters', () => {
      const user = {
        _name: 'Alice',
        get name() {
          return this._name
        }
      }

      const proxy = new Proxy(user, {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver)
        }
      })

      expect(proxy.name).toBe('Alice')
    })
  })

  // ============================================================
  // PRACTICAL PATTERNS
  // From proxy-reflect.mdx lines 355-430
  // ============================================================

  describe('Practical Patterns', () => {
    // From lines 355-375: Observable objects
    it('should create observable objects that notify on change', () => {
      const changes = []

      function observable(target, onChange) {
        return new Proxy(target, {
          set(target, prop, value, receiver) {
            const oldValue = target[prop]
            const result = Reflect.set(target, prop, value, receiver)
            if (result && oldValue !== value) {
              onChange(prop, oldValue, value)
            }
            return result
          }
        })
      }

      const state = observable({ count: 0 }, (prop, oldVal, newVal) => {
        changes.push(`${prop} changed from ${oldVal} to ${newVal}`)
      })

      state.count = 1
      state.count = 2

      expect(changes).toContain('count changed from 0 to 1')
      expect(changes).toContain('count changed from 1 to 2')
    })

    // From lines 380-410: Access control pattern
    it('should implement access control for private properties', () => {
      const privateHandler = {
        get(target, prop) {
          if (prop.startsWith('_')) {
            throw new Error(`Access denied: ${prop} is private`)
          }
          return Reflect.get(...arguments)
        },
        set(target, prop, value) {
          if (prop.startsWith('_')) {
            throw new Error(`Access denied: ${prop} is private`)
          }
          return Reflect.set(...arguments)
        },
        ownKeys(target) {
          return Object.keys(target).filter(key => !key.startsWith('_'))
        }
      }

      const user = new Proxy({ name: 'Alice', _password: 'secret' }, privateHandler)

      expect(user.name).toBe('Alice')
      expect(Object.keys(user)).toEqual(['name'])

      expect(() => {
        user._password
      }).toThrow('Access denied: _password is private')
    })

    // From lines 415-430: Logging/debugging pattern
    it('should log all property access', () => {
      const logs = []

      function createLogged(target, name = 'Object') {
        return new Proxy(target, {
          get(target, prop, receiver) {
            logs.push(`[${name}] GET ${String(prop)}`)
            return Reflect.get(target, prop, receiver)
          },
          set(target, prop, value, receiver) {
            logs.push(`[${name}] SET ${String(prop)} = ${value}`)
            return Reflect.set(target, prop, value, receiver)
          }
        })
      }

      const user = createLogged({ name: 'Alice' }, 'User')
      const name = user.name
      user.age = 30

      expect(logs).toContain('[User] GET name')
      expect(logs).toContain('[User] SET age = 30')
    })
  })

  // ============================================================
  // REVOCABLE PROXIES
  // From proxy-reflect.mdx lines 435-455
  // ============================================================

  describe('Revocable Proxies', () => {
    // From lines 435-450: Proxy.revocable()
    it('should create a proxy that can be disabled', () => {
      const target = { secret: 'classified info' }
      const { proxy, revoke } = Proxy.revocable(target, {})

      expect(proxy.secret).toBe('classified info')

      revoke()

      expect(() => {
        proxy.secret
      }).toThrow(TypeError)
    })
  })

  // ============================================================
  // LIMITATIONS AND GOTCHAS
  // From proxy-reflect.mdx lines 460-510
  // ============================================================

  describe('Limitations and Gotchas', () => {
    // From lines 470-490: Built-in objects workaround
    it('should work with Map using method binding workaround', () => {
      const map = new Map()
      const proxy = new Proxy(map, {
        get(target, prop, receiver) {
          const value = Reflect.get(target, prop, receiver)
          return typeof value === 'function' ? value.bind(target) : value
        }
      })

      proxy.set('key', 'value')
      expect(proxy.get('key')).toBe('value')
    })

    // From lines 495-505: Proxy identity
    it('should demonstrate that proxy is a different object from target', () => {
      const target = {}
      const proxy = new Proxy(target, {})

      expect(proxy === target).toBe(false)

      const set = new Set([target])
      expect(set.has(proxy)).toBe(false)
    })
  })

  // ============================================================
  // TEST YOUR KNOWLEDGE - Q&A SECTION TESTS
  // From proxy-reflect.mdx lines 530-620
  // ============================================================

  describe('Test Your Knowledge', () => {
    // Q1: set trap returning false
    it('should demonstrate set trap returning false behavior', () => {
      const proxy = new Proxy({}, {
        set() {
          return false
        }
      })

      expect(() => {
        proxy.x = 10
      }).toThrow(TypeError)
    })

    // Q5: Revocable proxy
    it('should demonstrate revocable proxy pattern', () => {
      const { proxy, revoke } = Proxy.revocable({ data: 'sensitive' }, {})

      expect(proxy.data).toBe('sensitive')

      revoke()

      expect(() => {
        proxy.data
      }).toThrow(TypeError)
    })
  })
})
