import { describe, it, expect } from 'vitest'

describe('Getters and Setters', () => {
  
  describe('Basic Getter Syntax in Object Literals', () => {
    it('should return computed value from getter', () => {
      const user = {
        firstName: "Alice",
        lastName: "Smith",
        get fullName() {
          return `${this.firstName} ${this.lastName}`
        }
      }
      
      expect(user.fullName).toBe("Alice Smith")
    })
    
    it('should recalculate getter on each access', () => {
      const user = {
        firstName: "Alice",
        lastName: "Smith",
        get fullName() {
          return `${this.firstName} ${this.lastName}`
        }
      }
      
      expect(user.fullName).toBe("Alice Smith")
      
      user.firstName = "Bob"
      expect(user.fullName).toBe("Bob Smith")
    })
    
    it('should access getter without parentheses', () => {
      const obj = {
        get value() { return 42 }
      }
      
      expect(obj.value).toBe(42)
      expect(typeof obj.value).toBe("number")
    })
    
    it('should support computed property names for getters', () => {
      const propName = "status"
      const obj = {
        _status: "active",
        get [propName]() {
          return this._status.toUpperCase()
        }
      }
      
      expect(obj.status).toBe("ACTIVE")
    })
    
    it('should allow multiple getters on same object', () => {
      const rectangle = {
        width: 10,
        height: 5,
        get area() { return this.width * this.height },
        get perimeter() { return 2 * (this.width + this.height) }
      }
      
      expect(rectangle.area).toBe(50)
      expect(rectangle.perimeter).toBe(30)
    })
  })
  
  describe('Basic Setter Syntax in Object Literals', () => {
    it('should call setter on assignment', () => {
      const obj = {
        _value: 0,
        set value(v) {
          this._value = v * 2
        }
      }
      
      obj.value = 5
      expect(obj._value).toBe(10)
    })
    
    it('should support validation in setter', () => {
      const account = {
        _balance: 0,
        set balance(value) {
          if (value < 0) {
            throw new Error("Balance cannot be negative")
          }
          this._balance = value
        }
      }
      
      account.balance = 100
      expect(account._balance).toBe(100)
      
      expect(() => {
        account.balance = -50
      }).toThrow("Balance cannot be negative")
    })
    
    it('should update backing property', () => {
      const user = {
        _name: "",
        set name(value) {
          this._name = value.trim().toUpperCase()
        }
      }
      
      user.name = "  alice  "
      expect(user._name).toBe("ALICE")
    })
    
    it('should support side effects in setter', () => {
      const log = []
      const obj = {
        set action(value) {
          log.push(`Action: ${value}`)
        }
      }
      
      obj.action = "login"
      obj.action = "logout"
      
      expect(log).toEqual(["Action: login", "Action: logout"])
    })
    
    it('should support computed property names for setters', () => {
      const propName = "data"
      const obj = {
        _data: null,
        set [propName](value) {
          this._data = JSON.stringify(value)
        }
      }
      
      obj.data = { a: 1 }
      expect(obj._data).toBe('{"a":1}')
    })
  })
  
  describe('Getters in Classes', () => {
    it('should define getter in class', () => {
      class Circle {
        constructor(radius) {
          this.radius = radius
        }
        get area() {
          return Math.PI * this.radius ** 2
        }
      }
      
      const circle = new Circle(5)
      expect(circle.area).toBeCloseTo(78.54, 1)
    })
    
    it('should compute getter from instance properties', () => {
      class Temperature {
        constructor(celsius) {
          this._celsius = celsius
        }
        get fahrenheit() {
          return this._celsius * 9/5 + 32
        }
      }
      
      const temp = new Temperature(100)
      expect(temp.fahrenheit).toBe(212)
    })
    
    it('should support static getters', () => {
      class Config {
        static _version = "1.0.0"
        static get version() {
          return `v${this._version}`
        }
      }
      
      expect(Config.version).toBe("v1.0.0")
    })
    
    it('should inherit getters from parent class', () => {
      class Animal {
        constructor(name) {
          this._name = name
        }
        get name() {
          return this._name
        }
      }
      
      class Dog extends Animal {
        constructor(name, breed) {
          super(name)
          this.breed = breed
        }
      }
      
      const dog = new Dog("Rex", "German Shepherd")
      expect(dog.name).toBe("Rex")
    })
  })
  
  describe('Setters in Classes', () => {
    it('should define setter with validation in class', () => {
      class User {
        constructor() {
          this._age = 0
        }
        set age(value) {
          if (value < 0 || value > 150) {
            throw new Error("Invalid age")
          }
          this._age = value
        }
        get age() {
          return this._age
        }
      }
      
      const user = new User()
      user.age = 25
      expect(user.age).toBe(25)
      
      expect(() => {
        user.age = -5
      }).toThrow("Invalid age")
    })
    
    it('should support static setters', () => {
      class Config {
        static _debug = false
        static set debug(value) {
          this._debug = Boolean(value)
        }
        static get debug() {
          return this._debug
        }
      }
      
      Config.debug = 1
      expect(Config.debug).toBe(true)
      
      Config.debug = 0
      expect(Config.debug).toBe(false)
    })
    
    it('should override setter in subclass', () => {
      class Animal {
        constructor() {
          this._name = ""
        }
        set name(value) {
          this._name = value
        }
        get name() {
          return this._name
        }
      }
      
      class Dog extends Animal {
        set name(value) {
          super.name = `🐕 ${value}`
        }
        // Must also provide getter when overriding setter
        get name() {
          return super.name
        }
      }
      
      const dog = new Dog()
      dog.name = "Rex"
      expect(dog.name).toBe("🐕 Rex")
    })
  })
  
  describe('Object.defineProperty() Accessor Descriptors', () => {
    it('should define getter with defineProperty', () => {
      const obj = { _value: 42 }
      
      Object.defineProperty(obj, "value", {
        get() { return this._value * 2 },
        enumerable: true
      })
      
      expect(obj.value).toBe(84)
    })
    
    it('should define setter with defineProperty', () => {
      const obj = { _value: 0 }
      
      Object.defineProperty(obj, "value", {
        set(v) { this._value = v },
        enumerable: true
      })
      
      obj.value = 100
      expect(obj._value).toBe(100)
    })
    
    it('should define both getter and setter with defineProperty', () => {
      const user = { _name: "" }
      
      Object.defineProperty(user, "name", {
        get() { return this._name },
        set(value) { this._name = value.trim() },
        enumerable: true,
        configurable: true
      })
      
      user.name = "  Alice  "
      expect(user.name).toBe("Alice")
    })
    
    it('should throw when mixing value and get', () => {
      expect(() => {
        Object.defineProperty({}, "prop", {
          value: 42,
          get() { return 42 }
        })
      }).toThrow(TypeError)
    })
    
    it('should throw when mixing writable and set', () => {
      expect(() => {
        Object.defineProperty({}, "prop", {
          writable: true,
          set(v) { }
        })
      }).toThrow(TypeError)
    })
    
    it('should return correct descriptor for accessor property', () => {
      const obj = {
        get prop() { return "value" },
        set prop(v) { }
      }
      
      const descriptor = Object.getOwnPropertyDescriptor(obj, "prop")
      
      expect(typeof descriptor.get).toBe("function")
      expect(typeof descriptor.set).toBe("function")
      expect(descriptor.value).toBeUndefined()
      expect(descriptor.writable).toBeUndefined()
      expect(descriptor.enumerable).toBe(true)
      expect(descriptor.configurable).toBe(true)
    })
  })
  
  describe('Getter-Only Properties (Read-Only)', () => {
    it('should create read-only property with getter only', () => {
      const obj = {
        get readOnly() { return "constant" }
      }
      
      expect(obj.readOnly).toBe("constant")
    })
    
    it('should throw in strict mode when setting getter-only property', () => {
      "use strict"
      
      const obj = {
        get value() { return 42 }
      }
      
      expect(() => {
        obj.value = 100
      }).toThrow(TypeError)
    })
    
    it('should inherit getter-only as read-only', () => {
      const parent = {
        get constant() { return "immutable" }
      }
      
      const child = Object.create(parent)
      
      expect(child.constant).toBe("immutable")
      
      expect(() => {
        child.constant = "changed"
      }).toThrow(TypeError)
    })
    
    it('should allow computed read-only properties', () => {
      const circle = {
        radius: 5,
        get area() {
          return Math.PI * this.radius ** 2
        },
        get circumference() {
          return 2 * Math.PI * this.radius
        }
      }
      
      expect(circle.area).toBeCloseTo(78.54, 1)
      expect(circle.circumference).toBeCloseTo(31.42, 1)
    })
  })
  
  describe('Setter-Only Properties (Write-Only)', () => {
    it('should return undefined when reading setter-only property', () => {
      const obj = {
        _lastValue: null,
        set value(v) {
          this._lastValue = v
        }
      }
      
      obj.value = 42
      expect(obj.value).toBeUndefined()
      expect(obj._lastValue).toBe(42)
    })
    
    it('should allow write-only for logging', () => {
      const logs = []
      const logger = {
        set log(message) {
          logs.push(`[${Date.now()}] ${message}`)
        }
      }
      
      logger.log = "Event 1"
      logger.log = "Event 2"
      
      expect(logger.log).toBeUndefined()
      expect(logs.length).toBe(2)
      expect(logs[0]).toMatch(/Event 1/)
      expect(logs[1]).toMatch(/Event 2/)
    })
    
    it('should support setter-only with side effects', () => {
      const state = { count: 0 }
      const obj = {
        set increment(_) {
          state.count++
        }
      }
      
      obj.increment = null
      obj.increment = null
      obj.increment = null
      
      expect(state.count).toBe(3)
    })
  })
  
  describe('Infinite Recursion Prevention', () => {
    it('should avoid infinite loop with backing property', () => {
      const obj = {
        _name: "",
        get name() { return this._name },
        set name(value) { this._name = value }
      }
      
      obj.name = "Alice"
      expect(obj.name).toBe("Alice")
    })
    
    it('should work with private fields as backing store', () => {
      class User {
        #name = ""
        get name() { return this.#name }
        set name(value) { this.#name = value }
      }
      
      const user = new User()
      user.name = "Bob"
      expect(user.name).toBe("Bob")
    })
    
    it('should work with closure variable as backing store', () => {
      function createCounter() {
        let count = 0
        return {
          get value() { return count },
          set value(v) { count = v }
        }
      }
      
      const counter = createCounter()
      counter.value = 10
      expect(counter.value).toBe(10)
    })
  })
  
  describe('Inheritance of Getters and Setters', () => {
    it('should inherit getter from prototype', () => {
      const proto = {
        _value: 42,
        get value() { return this._value }
      }
      
      const obj = Object.create(proto)
      expect(obj.value).toBe(42)
    })
    
    it('should override getter in subclass', () => {
      class Parent {
        get greeting() { return "Hello" }
      }
      
      class Child extends Parent {
        get greeting() { return "Hi" }
      }
      
      const parent = new Parent()
      const child = new Child()
      
      expect(parent.greeting).toBe("Hello")
      expect(child.greeting).toBe("Hi")
    })
    
    it('should call parent getter with super', () => {
      class Parent {
        get value() { return 10 }
      }
      
      class Child extends Parent {
        get value() { return super.value * 2 }
      }
      
      const child = new Child()
      expect(child.value).toBe(20)
    })
    
    it('should reveal inherited getter after delete', () => {
      const parent = {
        get value() { return "parent" }
      }
      
      const child = Object.create(parent)
      Object.defineProperty(child, "value", {
        get() { return "child" },
        configurable: true
      })
      
      expect(child.value).toBe("child")
      
      delete child.value
      expect(child.value).toBe("parent")
    })
  })
  
  describe('JSON.stringify() and Enumeration', () => {
    it('should include getter value in JSON.stringify', () => {
      const obj = {
        a: 1,
        get b() { return 2 }
      }
      
      const json = JSON.stringify(obj)
      expect(json).toBe('{"a":1,"b":2}')
    })
    
    it('should not include setter-only properties in JSON', () => {
      const obj = {
        a: 1,
        set b(v) { }
      }
      
      const json = JSON.stringify(obj)
      expect(json).toBe('{"a":1}')
    })
    
    it('should include enumerable getters in for...in', () => {
      const obj = {
        a: 1,
        get b() { return 2 }
      }
      
      const keys = []
      for (const key in obj) {
        keys.push(key)
      }
      
      expect(keys).toContain("a")
      expect(keys).toContain("b")
    })
    
    it('should include enumerable getters in Object.keys()', () => {
      const obj = {
        a: 1,
        get b() { return 2 }
      }
      
      expect(Object.keys(obj)).toEqual(["a", "b"])
    })
    
    it('should exclude non-enumerable getters from Object.keys()', () => {
      const obj = { a: 1 }
      
      Object.defineProperty(obj, "hidden", {
        get() { return "secret" },
        enumerable: false
      })
      
      expect(Object.keys(obj)).toEqual(["a"])
      expect(obj.hidden).toBe("secret")
    })
  })
  
  describe('Performance Patterns', () => {
    it('should call getter on every access', () => {
      let callCount = 0
      const obj = {
        get value() {
          callCount++
          return 42
        }
      }
      
      obj.value
      obj.value
      obj.value
      
      expect(callCount).toBe(3)
    })
    
    it('should support memoization pattern', () => {
      let computeCount = 0
      const obj = {
        _cached: null,
        get expensive() {
          if (this._cached === null) {
            computeCount++
            this._cached = 42 // Simulate expensive computation
          }
          return this._cached
        }
      }
      
      obj.expensive
      obj.expensive
      obj.expensive
      
      expect(computeCount).toBe(1)
      expect(obj.expensive).toBe(42)
    })
    
    it('should support self-replacing lazy getter', () => {
      let computeCount = 0
      const obj = {
        get lazy() {
          computeCount++
          const value = Math.random()
          Object.defineProperty(this, "lazy", {
            value: value,
            writable: false,
            configurable: false
          })
          return value
        }
      }
      
      const first = obj.lazy
      const second = obj.lazy
      const third = obj.lazy
      
      expect(computeCount).toBe(1)
      expect(first).toBe(second)
      expect(second).toBe(third)
    })
  })
  
  describe('Edge Cases', () => {
    it('should allow getter and setter with different logic', () => {
      const obj = {
        _raw: "",
        get value() {
          return this._raw.toUpperCase()
        },
        set value(v) {
          this._raw = v.toLowerCase()
        }
      }
      
      obj.value = "HeLLo"
      expect(obj._raw).toBe("hello")
      expect(obj.value).toBe("HELLO")
    })
    
    it('should work with Symbol property names', () => {
      const sym = Symbol("secret")
      const obj = {
        _secret: 42,
        get [sym]() { return this._secret }
      }
      
      expect(obj[sym]).toBe(42)
    })
    
    it('should handle this correctly in nested objects', () => {
      const outer = {
        inner: {
          value: 10,
          get doubled() {
            return this.value * 2
          }
        }
      }
      
      expect(outer.inner.doubled).toBe(20)
    })
    
    it('should work with destructuring (getter is called)', () => {
      let callCount = 0
      const obj = {
        get value() {
          callCount++
          return 42
        }
      }
      
      const { value } = obj
      expect(value).toBe(42)
      expect(callCount).toBe(1)
    })
  })
})
