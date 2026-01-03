import { describe, it, expect } from 'vitest'

describe('Object Creation & Prototypes', () => {
  describe('Opening Hook - Inherited Methods', () => {
    it('should have inherited methods from Object.prototype', () => {
      // You create a simple object
      const player = { name: 'Alice', health: 100 }

      // But it has methods you never defined!
      expect(typeof player.toString).toBe('function')
      expect(player.toString()).toBe('[object Object]')
      expect(player.hasOwnProperty('name')).toBe(true)

      // Where do these come from?
      expect(Object.getPrototypeOf(player)).toBe(Object.prototype)
    })
  })

  describe('Prototype Chain', () => {
    it('should look up properties through the prototype chain', () => {
      const grandparent = { familyName: 'Smith' }
      const parent = Object.create(grandparent)
      parent.job = 'Engineer'
      const child = Object.create(parent)
      child.name = 'Alice'

      // Property lookup walks the chain
      expect(child.name).toBe('Alice') // found on child
      expect(child.job).toBe('Engineer') // found on parent
      expect(child.familyName).toBe('Smith') // found on grandparent
    })

    it('should inherit methods from prototype (wizard/apprentice example)', () => {
      // Create a simple object
      const wizard = {
        name: 'Gandalf',
        castSpell() {
          return `${this.name} casts a spell!`
        }
      }

      // Create another object that inherits from wizard
      const apprentice = Object.create(wizard)
      apprentice.name = 'Harry'

      // apprentice has its own 'name' property
      expect(apprentice.name).toBe('Harry')

      // But castSpell comes from the prototype (wizard)
      expect(apprentice.castSpell()).toBe('Harry casts a spell!')

      // The prototype chain:
      // apprentice → wizard → Object.prototype → null
      expect(Object.getPrototypeOf(apprentice)).toBe(wizard)
      expect(Object.getPrototypeOf(wizard)).toBe(Object.prototype)
      expect(Object.getPrototypeOf(Object.prototype)).toBeNull()
    })

    it('should return undefined when property is not found in chain', () => {
      const obj = { name: 'test' }
      expect(obj.nonexistent).toBeUndefined()
    })

    it('should end the chain at null', () => {
      const obj = {}
      expect(Object.getPrototypeOf(Object.prototype)).toBeNull()
    })

    it('should shadow inherited properties when set on object', () => {
      const prototype = { greeting: 'Hello', count: 0 }
      const obj = Object.create(prototype)

      // Before shadowing
      expect(obj.greeting).toBe('Hello')

      // Shadow the property
      obj.greeting = 'Hi'

      // obj has its own property now
      expect(obj.greeting).toBe('Hi')
      // Prototype is unchanged
      expect(prototype.greeting).toBe('Hello')
      expect(obj.hasOwnProperty('greeting')).toBe(true)
    })
  })

  describe('[[Prototype]], __proto__, and .prototype', () => {
    it('should have Object.prototype as prototype for plain objects', () => {
      const obj = {}
      expect(Object.getPrototypeOf(obj)).toBe(Object.prototype)
    })

    it('should have .prototype property only on functions', () => {
      function Player(name) {
        this.name = name
      }
      const alice = new Player('Alice')

      // Functions have .prototype
      expect(Player.prototype).toBeDefined()
      expect(typeof Player.prototype).toBe('object')

      // Instances don't have .prototype
      expect(alice.prototype).toBeUndefined()

      // Instance's [[Prototype]] is the constructor's .prototype
      expect(Object.getPrototypeOf(alice)).toBe(Player.prototype)
    })
  })

  describe('Object Literals', () => {
    it('should have Object.prototype as prototype', () => {
      // Object literal — prototype is automatically Object.prototype
      const player = {
        name: 'Alice',
        health: 100,
        attack() {
          return `${this.name} attacks!`
        }
      }

      expect(Object.getPrototypeOf(player)).toBe(Object.prototype)
      expect(player.attack()).toBe('Alice attacks!')
    })
  })

  describe('Object.create()', () => {
    it('should create object with specified prototype', () => {
      const animalProto = {
        speak() {
          return `${this.name} makes a sound.`
        }
      }

      const dog = Object.create(animalProto)
      dog.name = 'Rex'

      expect(Object.getPrototypeOf(dog)).toBe(animalProto)
      expect(dog.speak()).toBe('Rex makes a sound.')
    })

    it('should create object with null prototype', () => {
      const dict = Object.create(null)

      // No inherited properties
      expect(dict.toString).toBeUndefined()
      expect(dict.hasOwnProperty).toBeUndefined()
      expect(Object.getPrototypeOf(dict)).toBeNull()

      // Can use any key without collision
      dict['hasOwnProperty'] = 'safe!'
      expect(dict['hasOwnProperty']).toBe('safe!')
    })

    it('should create object with property descriptors', () => {
      const person = Object.create(Object.prototype, {
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

      expect(person.name).toBe('Alice')
      expect(person.age).toBe(30)

      // Can modify writable property
      person.name = 'Bob'
      expect(person.name).toBe('Bob')

      // Cannot modify non-writable property (throws in strict mode)
      expect(() => {
        person.age = 25
      }).toThrow(TypeError)
      expect(person.age).toBe(30) // unchanged
    })
  })

  describe('new operator', () => {
    it('should create object with correct prototype', () => {
      function Player(name) {
        this.name = name
      }
      Player.prototype.greet = function () {
        return `Hello, ${this.name}!`
      }

      const alice = new Player('Alice')

      expect(Object.getPrototypeOf(alice)).toBe(Player.prototype)
      expect(alice.greet()).toBe('Hello, Alice!')
    })

    it('should bind this to the new object', () => {
      function Counter() {
        this.count = 0
        this.increment = function () {
          this.count++
        }
      }

      const counter = new Counter()
      expect(counter.count).toBe(0)
      counter.increment()
      expect(counter.count).toBe(1)
    })

    it('should return the object unless constructor returns an object', () => {
      function ReturnsNothing(name) {
        this.name = name
        // Implicitly returns the new object
      }

      function ReturnsPrimitive(name) {
        this.name = name
        return 42 // Primitive is ignored
      }

      function ReturnsObject(name) {
        this.name = name
        return { different: true } // Object is returned instead
      }

      const obj1 = new ReturnsNothing('test')
      expect(obj1.name).toBe('test')

      const obj2 = new ReturnsPrimitive('test')
      expect(obj2.name).toBe('test') // Primitive return ignored

      const obj3 = new ReturnsObject('test')
      expect(obj3.different).toBe(true)
      expect(obj3.name).toBeUndefined() // Original object not returned
    })

    it('can be simulated with Object.create and apply', () => {
      function myNew(Constructor, ...args) {
        const obj = Object.create(Constructor.prototype)
        const result = Constructor.apply(obj, args)
        return result !== null && typeof result === 'object' ? result : obj
      }

      function Player(name, health) {
        this.name = name
        this.health = health
      }
      Player.prototype.attack = function () {
        return `${this.name} attacks!`
      }

      const player1 = new Player('Alice', 100)
      const player2 = myNew(Player, 'Bob', 100)

      expect(player1.name).toBe('Alice')
      expect(player2.name).toBe('Bob')
      expect(player1.attack()).toBe('Alice attacks!')
      expect(player2.attack()).toBe('Bob attacks!')
      expect(player1 instanceof Player).toBe(true)
      expect(player2 instanceof Player).toBe(true)
    })
  })

  describe('Object.assign()', () => {
    it('should copy enumerable own properties', () => {
      const target = { a: 1 }
      const source = { b: 2, c: 3 }

      const result = Object.assign(target, source)

      expect(result).toEqual({ a: 1, b: 2, c: 3 })
      expect(result).toBe(target) // Returns the target
    })

    it('should merge multiple objects (later sources overwrite)', () => {
      const defaults = { theme: 'light', fontSize: 14 }
      const userPrefs = { theme: 'dark' }
      const session = { fontSize: 18 }

      const settings = Object.assign({}, defaults, userPrefs, session)

      expect(settings.theme).toBe('dark')
      expect(settings.fontSize).toBe(18)
    })

    it('should perform shallow copy only', () => {
      const original = {
        name: 'Alice',
        scores: [90, 85]
      }

      const clone = Object.assign({}, original)

      // Primitive is copied by value
      clone.name = 'Bob'
      expect(original.name).toBe('Alice')

      // Array is copied by reference
      clone.scores.push(100)
      expect(original.scores).toEqual([90, 85, 100]) // Modified!
    })

    it('should not copy inherited or non-enumerable properties', () => {
      const proto = { inherited: 'from prototype' }
      const source = Object.create(proto)
      source.own = 'my own property'

      Object.defineProperty(source, 'hidden', {
        value: 'non-enumerable',
        enumerable: false
      })

      const target = {}
      Object.assign(target, source)

      expect(target.own).toBe('my own property')
      expect(target.inherited).toBeUndefined() // Not copied
      expect(target.hidden).toBeUndefined() // Not copied
    })
  })

  describe('Prototype inspection', () => {
    it('Object.getPrototypeOf should return the prototype', () => {
      const proto = { test: true }
      const obj = Object.create(proto)

      expect(Object.getPrototypeOf(obj)).toBe(proto)
    })

    it('Object.setPrototypeOf should change the prototype', () => {
      const swimmer = { swim: () => 'swimming' }
      const flyer = { fly: () => 'flying' }

      const duck = { name: 'Donald' }
      Object.setPrototypeOf(duck, swimmer)

      expect(duck.swim()).toBe('swimming')

      Object.setPrototypeOf(duck, flyer)
      expect(duck.fly()).toBe('flying')
      expect(duck.swim).toBeUndefined()
    })

    it('instanceof should check the prototype chain', () => {
      function Animal(name) {
        this.name = name
      }
      function Dog(name) {
        Animal.call(this, name)
      }
      Dog.prototype = Object.create(Animal.prototype)
      Dog.prototype.constructor = Dog

      const rex = new Dog('Rex')

      expect(rex instanceof Dog).toBe(true)
      expect(rex instanceof Animal).toBe(true)
      expect(rex instanceof Object).toBe(true)
      expect(rex instanceof Array).toBe(false)
    })

    it('isPrototypeOf should check if object is in prototype chain', () => {
      const animal = { eats: true }
      const dog = Object.create(animal)

      expect(animal.isPrototypeOf(dog)).toBe(true)
      expect(Object.prototype.isPrototypeOf(dog)).toBe(true)
      expect(Array.prototype.isPrototypeOf(dog)).toBe(false)
    })
  })

  describe('Common prototype methods', () => {
    it('hasOwnProperty should check only own properties', () => {
      const proto = { inherited: true }
      const obj = Object.create(proto)
      obj.own = true

      expect(obj.hasOwnProperty('own')).toBe(true)
      expect(obj.hasOwnProperty('inherited')).toBe(false)

      // 'in' checks the whole chain
      expect('own' in obj).toBe(true)
      expect('inherited' in obj).toBe(true)
    })

    it('Object.keys should return only own enumerable properties', () => {
      const proto = { inherited: 'value' }
      const obj = Object.create(proto)
      obj.own1 = 'a'
      obj.own2 = 'b'

      expect(Object.keys(obj)).toEqual(['own1', 'own2'])
      expect(Object.keys(obj)).not.toContain('inherited')
    })

    it('Object.getOwnPropertyNames should return all own properties', () => {
      const obj = { visible: true }
      Object.defineProperty(obj, 'hidden', {
        value: 'secret',
        enumerable: false
      })

      expect(Object.keys(obj)).toEqual(['visible'])
      expect(Object.getOwnPropertyNames(obj)).toEqual(['visible', 'hidden'])
    })
  })

  describe('Common mistakes', () => {
    it('should not share reference types on prototype', () => {
      // Wrong way - array on prototype is shared
      function BadPlayer(name) {
        this.name = name
      }
      BadPlayer.prototype.inventory = []

      const alice = new BadPlayer('Alice')
      const bob = new BadPlayer('Bob')

      alice.inventory.push('sword')
      expect(bob.inventory).toContain('sword') // Bob has Alice's sword!

      // Correct way - array in constructor
      function GoodPlayer(name) {
        this.name = name
        this.inventory = []
      }

      const charlie = new GoodPlayer('Charlie')
      const dave = new GoodPlayer('Dave')

      charlie.inventory.push('shield')
      expect(dave.inventory).not.toContain('shield') // Dave's inventory is separate
    })
  })
})
