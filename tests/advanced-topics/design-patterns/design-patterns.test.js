import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('Design Patterns', () => {
  describe('Module Pattern', () => {
    it('should encapsulate private state using closures', () => {
      // IIFE-based module pattern
      const Counter = (function () {
        let count = 0 // Private variable

        return {
          increment() {
            count++
            return count
          },
          decrement() {
            count--
            return count
          },
          getCount() {
            return count
          }
        }
      })()

      expect(Counter.getCount()).toBe(0)
      expect(Counter.increment()).toBe(1)
      expect(Counter.increment()).toBe(2)
      expect(Counter.decrement()).toBe(1)

      // Private variable is not accessible
      expect(Counter.count).toBeUndefined()
    })

    it('should only expose public methods', () => {
      const Module = (function () {
        // Private function
        function privateHelper(value) {
          return value * 2
        }

        // Public API
        return {
          publicMethod(value) {
            return privateHelper(value) + 10
          }
        }
      })()

      expect(Module.publicMethod(5)).toBe(20) // (5 * 2) + 10
      expect(Module.privateHelper).toBeUndefined()
    })
  })

  describe('Singleton Pattern', () => {
    it('should return the same instance when created multiple times', () => {
      let instance = null

      class Singleton {
        constructor() {
          if (instance) {
            return instance
          }
          this.timestamp = Date.now()
          instance = this
        }
      }

      const instance1 = new Singleton()
      const instance2 = new Singleton()

      expect(instance1).toBe(instance2)
      expect(instance1.timestamp).toBe(instance2.timestamp)
    })

    it('should prevent modification with Object.freeze', () => {
      const Config = {
        apiUrl: 'https://api.example.com',
        timeout: 5000
      }

      Object.freeze(Config)

      // In strict mode (which Vitest uses), this throws an error
      expect(() => {
        Config.apiUrl = 'https://evil.com'
      }).toThrow(TypeError)

      expect(() => {
        Config.newProperty = 'test'
      }).toThrow(TypeError)

      // Original values remain unchanged
      expect(Config.apiUrl).toBe('https://api.example.com')
      expect(Config.newProperty).toBeUndefined()
    })

    it('should demonstrate that ES modules behave like singletons', () => {
      // Simulating ES module behavior
      const createModule = () => {
        const cache = new Map()

        return function getModule(name) {
          if (!cache.has(name)) {
            cache.set(name, { name, timestamp: Date.now() })
          }
          return cache.get(name)
        }
      }

      const requireModule = createModule()

      const module1 = requireModule('config')
      const module2 = requireModule('config')

      expect(module1).toBe(module2)
    })
  })

  describe('Factory Pattern', () => {
    it('should create objects without using the new keyword', () => {
      function createUser(name, role) {
        return {
          name,
          role,
          greet() {
            return `Hi, I'm ${this.name}`
          }
        }
      }

      const user = createUser('Alice', 'admin')

      expect(user.name).toBe('Alice')
      expect(user.role).toBe('admin')
      expect(user.greet()).toBe("Hi, I'm Alice")
    })

    it('should return different object instances', () => {
      function createProduct(name) {
        return { name, id: Math.random() }
      }

      const product1 = createProduct('Widget')
      const product2 = createProduct('Widget')

      expect(product1).not.toBe(product2)
      expect(product1.id).not.toBe(product2.id)
    })

    it('should create different types based on input', () => {
      function createNotification(type, message) {
        const base = { message, timestamp: Date.now() }

        switch (type) {
          case 'error':
            return { ...base, type: 'error', color: 'red', icon: '❌' }
          case 'success':
            return { ...base, type: 'success', color: 'green', icon: '✓' }
          case 'warning':
            return { ...base, type: 'warning', color: 'yellow', icon: '⚠' }
          default:
            return { ...base, type: 'info', color: 'blue', icon: 'ℹ' }
        }
      }

      const error = createNotification('error', 'Failed!')
      const success = createNotification('success', 'Done!')
      const info = createNotification('unknown', 'Info')

      expect(error.color).toBe('red')
      expect(success.color).toBe('green')
      expect(info.type).toBe('info')
    })
  })

  describe('Observer Pattern', () => {
    let observable

    beforeEach(() => {
      observable = {
        observers: [],

        subscribe(fn) {
          this.observers.push(fn)
          return () => {
            this.observers = this.observers.filter((o) => o !== fn)
          }
        },

        notify(data) {
          this.observers.forEach((fn) => fn(data))
        }
      }
    })

    it('should allow subscribing to events', () => {
      const callback = vi.fn()

      observable.subscribe(callback)
      observable.notify('test data')

      expect(callback).toHaveBeenCalledWith('test data')
      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should notify all subscribers', () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()
      const callback3 = vi.fn()

      observable.subscribe(callback1)
      observable.subscribe(callback2)
      observable.subscribe(callback3)

      observable.notify('event data')

      expect(callback1).toHaveBeenCalledWith('event data')
      expect(callback2).toHaveBeenCalledWith('event data')
      expect(callback3).toHaveBeenCalledWith('event data')
    })

    it('should allow unsubscribing', () => {
      const callback = vi.fn()

      const unsubscribe = observable.subscribe(callback)

      observable.notify('first')
      expect(callback).toHaveBeenCalledTimes(1)

      unsubscribe()

      observable.notify('second')
      expect(callback).toHaveBeenCalledTimes(1) // Still 1, not called again
    })

    it('should handle multiple subscriptions and unsubscriptions', () => {
      const callback1 = vi.fn()
      const callback2 = vi.fn()

      const unsub1 = observable.subscribe(callback1)
      observable.subscribe(callback2)

      observable.notify('test')
      expect(callback1).toHaveBeenCalledTimes(1)
      expect(callback2).toHaveBeenCalledTimes(1)

      unsub1()

      observable.notify('test2')
      expect(callback1).toHaveBeenCalledTimes(1) // Not called again
      expect(callback2).toHaveBeenCalledTimes(2) // Called again
    })
  })

  describe('Proxy Pattern', () => {
    it('should intercept property access (get)', () => {
      const target = { name: 'Alice', age: 25 }
      const accessLog = []

      const proxy = new Proxy(target, {
        get(obj, prop) {
          accessLog.push(prop)
          return obj[prop]
        }
      })

      expect(proxy.name).toBe('Alice')
      expect(proxy.age).toBe(25)
      expect(accessLog).toEqual(['name', 'age'])
    })

    it('should intercept property assignment (set)', () => {
      const target = { count: 0 }
      const setLog = []

      const proxy = new Proxy(target, {
        set(obj, prop, value) {
          setLog.push({ prop, value })
          obj[prop] = value
          return true
        }
      })

      proxy.count = 5
      proxy.newProp = 'hello'

      expect(target.count).toBe(5)
      expect(target.newProp).toBe('hello')
      expect(setLog).toEqual([
        { prop: 'count', value: 5 },
        { prop: 'newProp', value: 'hello' }
      ])
    })

    it('should validate values on set', () => {
      const user = { name: 'Alice', age: 25 }

      const validatedUser = new Proxy(user, {
        set(obj, prop, value) {
          if (prop === 'age') {
            if (typeof value !== 'number') {
              throw new TypeError('Age must be a number')
            }
            if (value < 0 || value > 150) {
              throw new RangeError('Age must be between 0 and 150')
            }
          }
          obj[prop] = value
          return true
        }
      })

      // Valid assignment
      validatedUser.age = 30
      expect(validatedUser.age).toBe(30)

      // Invalid assignments
      expect(() => {
        validatedUser.age = 'thirty'
      }).toThrow(TypeError)

      expect(() => {
        validatedUser.age = -5
      }).toThrow(RangeError)

      expect(() => {
        validatedUser.age = 200
      }).toThrow(RangeError)
    })

    it('should provide default values for missing properties', () => {
      const target = { name: 'Alice' }

      const withDefaults = new Proxy(target, {
        get(obj, prop) {
          if (prop in obj) {
            return obj[prop]
          }
          return `Default value for ${prop}`
        }
      })

      expect(withDefaults.name).toBe('Alice')
      expect(withDefaults.missing).toBe('Default value for missing')
    })
  })

  describe('Decorator Pattern', () => {
    it('should add new methods to objects', () => {
      const createBird = (name) => ({
        name,
        chirp() {
          return `${this.name} says chirp!`
        }
      })

      const withFlying = (bird) => ({
        ...bird,
        fly() {
          return `${bird.name} is flying!`
        }
      })

      const sparrow = withFlying(createBird('Sparrow'))

      expect(sparrow.chirp()).toBe('Sparrow says chirp!')
      expect(sparrow.fly()).toBe('Sparrow is flying!')
    })

    it('should preserve original object properties', () => {
      const original = {
        name: 'Widget',
        price: 100,
        getInfo() {
          return `${this.name}: $${this.price}`
        }
      }

      const withDiscount = (product, discountPercent) => ({
        ...product,
        discount: discountPercent,
        getDiscountedPrice() {
          return product.price * (1 - discountPercent / 100)
        }
      })

      const discounted = withDiscount(original, 20)

      expect(discounted.name).toBe('Widget')
      expect(discounted.price).toBe(100)
      expect(discounted.discount).toBe(20)
      expect(discounted.getDiscountedPrice()).toBe(80)
    })

    it('should allow composing multiple decorators', () => {
      const createCharacter = (name) => ({
        name,
        abilities: [],
        describe() {
          return `${this.name} can: ${this.abilities.join(', ') || 'nothing yet'}`
        }
      })

      const withSwimming = (character) => ({
        ...character,
        abilities: [...character.abilities, 'swim'],
        swim() {
          return `${character.name} swims!`
        }
      })

      const withFlying = (character) => ({
        ...character,
        abilities: [...character.abilities, 'fly'],
        fly() {
          return `${character.name} flies!`
        }
      })

      const withFireBreathing = (character) => ({
        ...character,
        abilities: [...character.abilities, 'breathe fire'],
        breatheFire() {
          return `${character.name} breathes fire!`
        }
      })

      // Compose decorators
      const dragon = withFireBreathing(withFlying(createCharacter('Dragon')))

      expect(dragon.abilities).toEqual(['fly', 'breathe fire'])
      expect(dragon.fly()).toBe('Dragon flies!')
      expect(dragon.breatheFire()).toBe('Dragon breathes fire!')

      // Different composition
      const duck = withSwimming(withFlying(createCharacter('Duck')))

      expect(duck.abilities).toEqual(['fly', 'swim'])
      expect(duck.fly()).toBe('Duck flies!')
      expect(duck.swim()).toBe('Duck swims!')
    })

    it('should work with function decorators', () => {
      // Logging decorator
      const withLogging = (fn) => {
        return function (...args) {
          const result = fn.apply(this, args)
          return result
        }
      }

      // Timing decorator
      const withTiming = (fn) => {
        return function (...args) {
          const start = Date.now()
          const result = fn.apply(this, args)
          const end = Date.now()
          return { result, duration: end - start }
        }
      }

      const add = (a, b) => a + b
      const timedAdd = withTiming(withLogging(add))

      const output = timedAdd(2, 3)

      expect(output.result).toBe(5)
      expect(typeof output.duration).toBe('number')
      expect(output.duration).toBeGreaterThanOrEqual(0)
    })

    it('should implement memoization decorator', () => {
      const withMemoization = (fn) => {
        const cache = new Map()

        return function (...args) {
          const key = JSON.stringify(args)

          if (cache.has(key)) {
            return { value: cache.get(key), cached: true }
          }

          const result = fn.apply(this, args)
          cache.set(key, result)
          return { value: result, cached: false }
        }
      }

      let callCount = 0
      const expensiveOperation = (n) => {
        callCount++
        return n * n
      }

      const memoized = withMemoization(expensiveOperation)

      const result1 = memoized(5)
      expect(result1).toEqual({ value: 25, cached: false })
      expect(callCount).toBe(1)

      const result2 = memoized(5)
      expect(result2).toEqual({ value: 25, cached: true })
      expect(callCount).toBe(1) // Not called again

      const result3 = memoized(10)
      expect(result3).toEqual({ value: 100, cached: false })
      expect(callCount).toBe(2) // Called for new argument
    })
  })

  describe('Pattern Integration', () => {
    it('should combine Observer and Singleton for a global event bus', () => {
      // Singleton event bus using module pattern
      const EventBus = (function () {
        const events = new Map()

        return Object.freeze({
          on(event, callback) {
            if (!events.has(event)) {
              events.set(event, [])
            }
            events.get(event).push(callback)
          },

          off(event, callback) {
            if (events.has(event)) {
              const callbacks = events.get(event).filter((cb) => cb !== callback)
              events.set(event, callbacks)
            }
          },

          emit(event, data) {
            if (events.has(event)) {
              events.get(event).forEach((callback) => callback(data))
            }
          }
        })
      })()

      const handler1 = vi.fn()
      const handler2 = vi.fn()

      EventBus.on('user:login', handler1)
      EventBus.on('user:login', handler2)

      EventBus.emit('user:login', { userId: 123 })

      expect(handler1).toHaveBeenCalledWith({ userId: 123 })
      expect(handler2).toHaveBeenCalledWith({ userId: 123 })

      EventBus.off('user:login', handler1)
      EventBus.emit('user:login', { userId: 456 })

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(2)
    })

    it('should combine Factory and Decorator patterns', () => {
      // Factory for creating base enemies
      const createEnemy = (type) => {
        const enemies = {
          goblin: { name: 'Goblin', health: 50, damage: 10 },
          orc: { name: 'Orc', health: 100, damage: 20 },
          troll: { name: 'Troll', health: 200, damage: 30 }
        }
        return { ...enemies[type] }
      }

      // Decorators for enemy modifiers
      const withArmor = (enemy, armor) => ({
        ...enemy,
        armor,
        takeDamage(amount) {
          return Math.max(0, amount - armor)
        }
      })

      const withPoison = (enemy) => ({
        ...enemy,
        poisonDamage: 5,
        attack() {
          return `${enemy.name} attacks for ${enemy.damage} + ${this.poisonDamage} poison!`
        }
      })

      // Create decorated enemies
      const armoredOrc = withArmor(createEnemy('orc'), 15)
      const poisonGoblin = withPoison(createEnemy('goblin'))
      const armoredPoisonTroll = withPoison(withArmor(createEnemy('troll'), 25))

      expect(armoredOrc.armor).toBe(15)
      expect(armoredOrc.takeDamage(30)).toBe(15)

      expect(poisonGoblin.attack()).toBe('Goblin attacks for 10 + 5 poison!')

      expect(armoredPoisonTroll.armor).toBe(25)
      expect(armoredPoisonTroll.attack()).toBe('Troll attacks for 30 + 5 poison!')
    })
  })
})
