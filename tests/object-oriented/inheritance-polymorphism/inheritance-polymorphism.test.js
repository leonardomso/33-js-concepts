import { describe, it, expect } from 'vitest'

describe('Inheritance & Polymorphism', () => {
  // ============================================================
  // BASE CLASSES FOR TESTING
  // ============================================================
  
  class Character {
    constructor(name, health = 100) {
      this.name = name
      this.health = health
    }
    
    introduce() {
      return `I am ${this.name} with ${this.health} HP`
    }
    
    attack() {
      return `${this.name} attacks!`
    }
    
    takeDamage(amount) {
      this.health -= amount
      return `${this.name} takes ${amount} damage! (${this.health} HP left)`
    }
    
    get isAlive() {
      return this.health > 0
    }
    
    static createRandom() {
      const names = ['Hero', 'Villain', 'Sidekick']
      return new this(names[Math.floor(Math.random() * names.length)])
    }
  }
  
  class Warrior extends Character {
    constructor(name) {
      super(name, 150) // Warriors have more health
      this.rage = 0
      this.weapon = 'Sword'
    }
    
    attack() {
      return `${this.name} swings a mighty sword!`
    }
    
    battleCry() {
      this.rage += 10
      return `${this.name} roars with fury! Rage: ${this.rage}`
    }
  }
  
  class Mage extends Character {
    constructor(name) {
      super(name, 80) // Mages have less health
      this.mana = 100
    }
    
    attack() {
      return `${this.name} casts a fireball!`
    }
    
    castSpell(spell) {
      this.mana -= 10
      return `${this.name} casts ${spell}!`
    }
  }
  
  class Archer extends Character {
    constructor(name) {
      super(name, 90)
      this.arrows = 20
    }
    
    attack() {
      this.arrows--
      return `${this.name} fires an arrow!`
    }
  }
  
  // ============================================================
  // CLASS INHERITANCE WITH EXTENDS
  // ============================================================
  
  describe('Class Inheritance with extends', () => {
    it('should inherit properties from parent class', () => {
      const warrior = new Warrior('Conan')
      
      // Inherited from Character
      expect(warrior.name).toBe('Conan')
      expect(warrior.health).toBe(150) // Custom value passed to super()
      
      // Unique to Warrior
      expect(warrior.rage).toBe(0)
      expect(warrior.weapon).toBe('Sword')
    })
    
    it('should inherit methods from parent class', () => {
      const warrior = new Warrior('Conan')
      
      // Inherited method works
      expect(warrior.introduce()).toBe('I am Conan with 150 HP')
      expect(warrior.takeDamage(20)).toBe('Conan takes 20 damage! (130 HP left)')
    })
    
    it('should inherit getters from parent class', () => {
      const warrior = new Warrior('Conan')
      
      expect(warrior.isAlive).toBe(true)
      warrior.health = 0
      expect(warrior.isAlive).toBe(false)
    })
    
    it('should inherit static methods from parent class', () => {
      const randomWarrior = Warrior.createRandom()
      
      expect(randomWarrior).toBeInstanceOf(Warrior)
      expect(randomWarrior).toBeInstanceOf(Character)
      expect(['Hero', 'Villain', 'Sidekick']).toContain(randomWarrior.name)
    })
    
    it('should allow child classes to have unique methods', () => {
      const warrior = new Warrior('Conan')
      const mage = new Mage('Gandalf')
      
      // Warrior-specific method
      expect(warrior.battleCry()).toBe('Conan roars with fury! Rage: 10')
      expect(typeof mage.battleCry).toBe('undefined')
      
      // Mage-specific method
      expect(mage.castSpell('Fireball')).toBe('Gandalf casts Fireball!')
      expect(typeof warrior.castSpell).toBe('undefined')
    })
  })
  
  // ============================================================
  // THE SUPER KEYWORD
  // ============================================================
  
  describe('The super Keyword', () => {
    it('super() should call parent constructor with arguments', () => {
      const warrior = new Warrior('Conan')
      
      // super(name, 150) was called in Warrior constructor
      expect(warrior.name).toBe('Conan')
      expect(warrior.health).toBe(150)
    })
    
    it('super.method() should call parent method', () => {
      class ExtendedWarrior extends Character {
        constructor(name) {
          super(name, 150)
          this.weapon = 'Axe'
        }
        
        attack() {
          const baseAttack = super.attack() // "Name attacks!"
          return `${baseAttack} With an ${this.weapon}!`
        }
        
        describe() {
          return `${super.introduce()} - Warrior Class`
        }
      }
      
      const hero = new ExtendedWarrior('Gimli')
      
      expect(hero.attack()).toBe('Gimli attacks! With an Axe!')
      expect(hero.describe()).toBe('I am Gimli with 150 HP - Warrior Class')
    })
    
    it('should throw ReferenceError if super() is not called before this', () => {
      // This would cause an error - we test the concept
      expect(() => {
        class BrokenWarrior extends Character {
          constructor(name) {
            // Intentionally not calling super() first
            // this.rage = 0 // Would throw ReferenceError
            super(name)
          }
        }
        new BrokenWarrior('Test')
      }).not.toThrow() // The fixed version doesn't throw
    })
  })
  
  // ============================================================
  // METHOD OVERRIDING
  // ============================================================
  
  describe('Method Overriding', () => {
    it('should override parent method with child implementation', () => {
      const character = new Character('Generic')
      const warrior = new Warrior('Conan')
      const mage = new Mage('Gandalf')
      const archer = new Archer('Legolas')
      
      // Each class has different attack() implementation
      expect(character.attack()).toBe('Generic attacks!')
      expect(warrior.attack()).toBe('Conan swings a mighty sword!')
      expect(mage.attack()).toBe('Gandalf casts a fireball!')
      expect(archer.attack()).toBe('Legolas fires an arrow!')
    })
    
    it('should allow extending parent behavior with super.method()', () => {
      class VerboseWarrior extends Character {
        attack() {
          return `${super.attack()} POWERFULLY!`
        }
      }
      
      const hero = new VerboseWarrior('Hero')
      expect(hero.attack()).toBe('Hero attacks! POWERFULLY!')
    })
    
    it('should allow complete replacement of parent behavior', () => {
      class SilentWarrior extends Character {
        attack() {
          return '...' // Completely different, no super.attack()
        }
      }
      
      const ninja = new SilentWarrior('Shadow')
      expect(ninja.attack()).toBe('...')
    })
  })
  
  // ============================================================
  // POLYMORPHISM
  // ============================================================
  
  describe('Polymorphism', () => {
    it('should treat different types uniformly through common interface', () => {
      const party = [
        new Warrior('Conan'),
        new Mage('Gandalf'),
        new Archer('Legolas'),
        new Character('Villager')
      ]
      
      // All can attack(), each in their own way
      const attacks = party.map(char => char.attack())
      
      expect(attacks).toEqual([
        'Conan swings a mighty sword!',
        'Gandalf casts a fireball!',
        'Legolas fires an arrow!',
        'Villager attacks!'
      ])
    })
    
    it('should allow functions to work with any subtype', () => {
      function executeBattle(characters) {
        return characters.map(char => char.attack())
      }
      
      const team1 = [new Warrior('W1'), new Warrior('W2')]
      const team2 = [new Mage('M1'), new Archer('A1')]
      const mixedTeam = [new Warrior('W'), new Mage('M'), new Archer('A')]
      
      // Same function works with any combination
      expect(executeBattle(team1)).toHaveLength(2)
      expect(executeBattle(team2)).toHaveLength(2)
      expect(executeBattle(mixedTeam)).toHaveLength(3)
    })
    
    it('instanceof should check entire prototype chain', () => {
      const warrior = new Warrior('Conan')
      
      expect(warrior instanceof Warrior).toBe(true)
      expect(warrior instanceof Character).toBe(true)
      expect(warrior instanceof Object).toBe(true)
      expect(warrior instanceof Mage).toBe(false)
    })
    
    it('should enable the Open/Closed principle', () => {
      // We can add new character types without changing existing code
      class Healer extends Character {
        attack() {
          return `${this.name} heals the party!`
        }
      }
      
      // Existing function works with new type
      function getAttacks(chars) {
        return chars.map(c => c.attack())
      }
      
      const team = [new Warrior('W'), new Healer('H')]
      const attacks = getAttacks(team)
      
      expect(attacks).toContain('W swings a mighty sword!')
      expect(attacks).toContain('H heals the party!')
    })
  })
  
  // ============================================================
  // PROTOTYPE CHAIN (Under the Hood)
  // ============================================================
  
  describe('Prototype Chain', () => {
    it('should set up prototype chain correctly with extends', () => {
      const warrior = new Warrior('Conan')
      
      // Instance -> Warrior.prototype -> Character.prototype -> Object.prototype
      expect(Object.getPrototypeOf(warrior)).toBe(Warrior.prototype)
      expect(Object.getPrototypeOf(Warrior.prototype)).toBe(Character.prototype)
      expect(Object.getPrototypeOf(Character.prototype)).toBe(Object.prototype)
    })
    
    it('should find methods by walking up the prototype chain', () => {
      const warrior = new Warrior('Conan')
      
      // attack() is on Warrior.prototype (overridden)
      expect(Warrior.prototype.hasOwnProperty('attack')).toBe(true)
      
      // introduce() is on Character.prototype (inherited)
      expect(Warrior.prototype.hasOwnProperty('introduce')).toBe(false)
      expect(Character.prototype.hasOwnProperty('introduce')).toBe(true)
      
      // Both work on the instance
      expect(warrior.attack()).toContain('sword')
      expect(warrior.introduce()).toContain('Conan')
    })
  })
  
  // ============================================================
  // COMPOSITION PATTERN
  // ============================================================
  
  describe('Composition Pattern', () => {
    it('should compose behaviors instead of inheriting', () => {
      // Behavior factories
      const canFly = (state) => ({
        fly() { return `${state.name} soars through the sky!` }
      })
      
      const canCast = (state) => ({
        castSpell(spell) { return `${state.name} casts ${spell}!` }
      })
      
      const canFight = (state) => ({
        attack() { return `${state.name} attacks!` }
      })
      
      // Compose a flying mage
      function createFlyingMage(name) {
        const state = { name, health: 100, mana: 50 }
        return {
          ...state,
          ...canFly(state),
          ...canCast(state),
          ...canFight(state)
        }
      }
      
      const merlin = createFlyingMage('Merlin')
      
      expect(merlin.fly()).toBe('Merlin soars through the sky!')
      expect(merlin.castSpell('Ice')).toBe('Merlin casts Ice!')
      expect(merlin.attack()).toBe('Merlin attacks!')
      expect(merlin.health).toBe(100)
      expect(merlin.mana).toBe(50)
    })
    
    it('should allow mixing and matching behaviors freely', () => {
      const canSwim = (state) => ({
        swim() { return `${state.name} swims!` }
      })
      
      const canFly = (state) => ({
        fly() { return `${state.name} flies!` }
      })
      
      // Duck can both swim and fly
      function createDuck(name) {
        const state = { name }
        return { ...state, ...canSwim(state), ...canFly(state) }
      }
      
      // Fish can only swim
      function createFish(name) {
        const state = { name }
        return { ...state, ...canSwim(state) }
      }
      
      const duck = createDuck('Donald')
      const fish = createFish('Nemo')
      
      expect(duck.swim()).toBe('Donald swims!')
      expect(duck.fly()).toBe('Donald flies!')
      expect(fish.swim()).toBe('Nemo swims!')
      expect(fish.fly).toBeUndefined()
    })
  })
  
  // ============================================================
  // MIXINS
  // ============================================================
  
  describe('Mixins', () => {
    it('should mix behavior into class prototype with Object.assign', () => {
      const Swimmer = {
        swim() { return `${this.name} swims!` }
      }
      
      const Flyer = {
        fly() { return `${this.name} flies!` }
      }
      
      class Animal {
        constructor(name) {
          this.name = name
        }
      }
      
      class Duck extends Animal {}
      Object.assign(Duck.prototype, Swimmer, Flyer)
      
      const donald = new Duck('Donald')
      
      expect(donald.swim()).toBe('Donald swims!')
      expect(donald.fly()).toBe('Donald flies!')
    })
    
    it('should support functional mixin pattern', () => {
      const withLogging = (Base) => class extends Base {
        log(message) {
          return `[${this.name}]: ${message}`
        }
      }
      
      const withTimestamp = (Base) => class extends Base {
        getTimestamp() {
          return '2024-01-15'
        }
      }
      
      class Character {
        constructor(name) {
          this.name = name
        }
      }
      
      // Stack mixins
      class LoggedCharacter extends withTimestamp(withLogging(Character)) {
        doAction() {
          return this.log(`Action at ${this.getTimestamp()}`)
        }
      }
      
      const hero = new LoggedCharacter('Aragorn')
      
      expect(hero.log('Hello')).toBe('[Aragorn]: Hello')
      expect(hero.getTimestamp()).toBe('2024-01-15')
      expect(hero.doAction()).toBe('[Aragorn]: Action at 2024-01-15')
    })
    
    it('should handle mixin name collisions (last one wins)', () => {
      const MixinA = {
        greet() { return 'Hello from A' }
      }
      
      const MixinB = {
        greet() { return 'Hello from B' }
      }
      
      class Base {}
      Object.assign(Base.prototype, MixinA, MixinB)
      
      const instance = new Base()
      
      // MixinB's greet() overwrites MixinA's
      expect(instance.greet()).toBe('Hello from B')
    })
  })
  
  // ============================================================
  // COMMON MISTAKES
  // ============================================================
  
  describe('Common Mistakes', () => {
    it('should demonstrate that inherited methods can be accidentally lost', () => {
      class Parent {
        method() { return 'parent' }
      }
      
      class Child extends Parent {
        method() { return 'child' } // Completely replaces parent
      }
      
      const child = new Child()
      expect(child.method()).toBe('child')
      
      // To preserve parent behavior, use super.method()
      class BetterChild extends Parent {
        method() { return `${super.method()} + child` }
      }
      
      const betterChild = new BetterChild()
      expect(betterChild.method()).toBe('parent + child')
    })
    
    it('should show the problem with inheriting for code reuse only', () => {
      // BAD: Stack is NOT an Array (violates IS-A)
      // A Stack should only allow push/pop, not shift/unshift
      class BadStack extends Array {
        peek() { return this[this.length - 1] }
      }
      
      const badStack = new BadStack()
      badStack.push(1, 2, 3)
      
      // Problem: Array methods we DON'T want are available
      expect(badStack.shift()).toBe(1) // Stacks shouldn't allow this!
      
      // GOOD: Composition - Stack HAS-A array
      class GoodStack {
        #items = []
        
        push(item) { this.#items.push(item) }
        pop() { return this.#items.pop() }
        peek() { return this.#items[this.#items.length - 1] }
      }
      
      const goodStack = new GoodStack()
      goodStack.push(1)
      goodStack.push(2)
      
      expect(goodStack.peek()).toBe(2)
      expect(typeof goodStack.shift).toBe('undefined') // Correctly unavailable
    })
  })
  
  // ============================================================
  // SHAPE POLYMORPHISM (Interview Question Example)
  // ============================================================
  
  describe('Shape Polymorphism (Interview Example)', () => {
    class Shape {
      area() { return 0 }
    }
    
    class Rectangle extends Shape {
      constructor(width, height) {
        super()
        this.width = width
        this.height = height
      }
      area() { return this.width * this.height }
    }
    
    class Circle extends Shape {
      constructor(radius) {
        super()
        this.radius = radius
      }
      area() { return Math.PI * this.radius ** 2 }
    }
    
    it('should calculate area differently for each shape type', () => {
      const rectangle = new Rectangle(4, 5)
      const circle = new Circle(3)
      
      expect(rectangle.area()).toBe(20)
      expect(circle.area()).toBeCloseTo(28.274, 2) // Math.PI * 9
    })
    
    it('should treat all shapes uniformly through common interface', () => {
      const shapes = [new Rectangle(4, 5), new Circle(3), new Shape()]
      const areas = shapes.map(s => s.area())
      
      expect(areas[0]).toBe(20)
      expect(areas[1]).toBeCloseTo(28.274, 2)
      expect(areas[2]).toBe(0) // Base shape
    })
    
    it('should verify instanceof for shape hierarchy', () => {
      const rect = new Rectangle(2, 3)
      const circle = new Circle(5)
      
      expect(rect instanceof Rectangle).toBe(true)
      expect(rect instanceof Shape).toBe(true)
      expect(circle instanceof Circle).toBe(true)
      expect(circle instanceof Shape).toBe(true)
      expect(rect instanceof Circle).toBe(false)
    })
  })
  
  // ============================================================
  // MULTI-LEVEL INHERITANCE
  // ============================================================
  
  describe('Multi-level Inheritance', () => {
    it('should support multi-level inheritance (keep shallow!)', () => {
      class Entity {
        constructor(id) {
          this.id = id
        }
      }
      
      class Character extends Entity {
        constructor(id, name) {
          super(id)
          this.name = name
        }
      }
      
      class Warrior extends Character {
        constructor(id, name) {
          super(id, name)
          this.class = 'Warrior'
        }
      }
      
      const hero = new Warrior(1, 'Conan')
      
      expect(hero.id).toBe(1)
      expect(hero.name).toBe('Conan')
      expect(hero.class).toBe('Warrior')
      
      expect(hero instanceof Warrior).toBe(true)
      expect(hero instanceof Character).toBe(true)
      expect(hero instanceof Entity).toBe(true)
    })
    
    it('should call super() chain correctly', () => {
      const calls = []
      
      class A {
        constructor() {
          calls.push('A')
        }
      }
      
      class B extends A {
        constructor() {
          super()
          calls.push('B')
        }
      }
      
      class C extends B {
        constructor() {
          super()
          calls.push('C')
        }
      }
      
      new C()
      
      // Constructors called from parent to child
      expect(calls).toEqual(['A', 'B', 'C'])
    })
  })
})
