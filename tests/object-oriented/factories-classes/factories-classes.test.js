import { describe, it, expect } from 'vitest'

describe('Factories and Classes', () => {
  // ===========================================
  // Part 1: The Problem — Manual Object Creation
  // ===========================================

  describe('Part 1: The Problem — Manual Object Creation', () => {
    it('should show manual object creation is repetitive', () => {
      const player1 = {
        name: 'Alice',
        health: 100,
        attack() {
          return `${this.name} attacks!`
        }
      }

      const player2 = {
        name: 'Bob',
        health: 100,
        attack() {
          return `${this.name} attacks!`
        }
      }

      expect(player1.attack()).toBe('Alice attacks!')
      expect(player2.attack()).toBe('Bob attacks!')

      // Each object has its own copy of the method
      expect(player1.attack).not.toBe(player2.attack)
    })
  })

  // ===========================================
  // Part 2: Factory Functions
  // ===========================================

  describe('Part 2: Factory Functions', () => {
    describe('Basic Factory Function', () => {
      it('should create objects with a factory function', () => {
        function createPlayer(name) {
          return {
            name,
            health: 100,
            level: 1,
            attack() {
              return `${this.name} attacks for ${10 + this.level * 2} damage!`
            }
          }
        }

        const alice = createPlayer('Alice')
        const bob = createPlayer('Bob')

        expect(alice.name).toBe('Alice')
        expect(bob.name).toBe('Bob')
        expect(alice.health).toBe(100)
        expect(alice.attack()).toBe('Alice attacks for 12 damage!')
      })

      it('should create independent objects', () => {
        function createCounter() {
          return {
            count: 0,
            increment() {
              this.count++
            }
          }
        }

        const counter1 = createCounter()
        const counter2 = createCounter()

        counter1.increment()
        counter1.increment()
        counter1.increment()
        counter2.increment()

        expect(counter1.count).toBe(3)
        expect(counter2.count).toBe(1)
      })
    })

    describe('Factory with Multiple Parameters', () => {
      it('should accept multiple parameters', () => {
        function createEnemy(name, health, attackPower) {
          return {
            name,
            health,
            attackPower,
            isAlive: true,
            attack(target) {
              return `${this.name} attacks ${target.name} for ${this.attackPower} damage!`
            },
            takeDamage(amount) {
              this.health -= amount
              if (this.health <= 0) {
                this.health = 0
                this.isAlive = false
              }
              return this.health
            }
          }
        }

        const goblin = createEnemy('Goblin', 50, 10)
        const dragon = createEnemy('Dragon', 500, 50)

        expect(goblin.health).toBe(50)
        expect(dragon.health).toBe(500)
        expect(goblin.attack(dragon)).toBe('Goblin attacks Dragon for 10 damage!')
      })
    })

    describe('Factory with Configuration Object', () => {
      it('should use defaults and merge with config', () => {
        function createCharacter(config = {}) {
          const defaults = {
            name: 'Unknown',
            health: 100,
            attackPower: 10,
            defense: 5
          }

          return { ...defaults, ...config }
        }

        const warrior = createCharacter({ name: 'Warrior', health: 150, defense: 20 })
        const mage = createCharacter({ name: 'Mage', attackPower: 30 })
        const villager = createCharacter()

        expect(warrior.name).toBe('Warrior')
        expect(warrior.health).toBe(150)
        expect(warrior.defense).toBe(20)
        expect(warrior.attackPower).toBe(10) // default

        expect(mage.attackPower).toBe(30)
        expect(mage.health).toBe(100) // default

        expect(villager.name).toBe('Unknown')
      })
    })

    describe('Factory with Private Variables (Closures)', () => {
      it('should create truly private variables', () => {
        function createBankAccount(initialBalance = 0) {
          let balance = initialBalance

          return {
            deposit(amount) {
              if (amount > 0) balance += amount
              return balance
            },
            withdraw(amount) {
              if (amount > 0 && amount <= balance) {
                balance -= amount
              }
              return balance
            },
            getBalance() {
              return balance
            }
          }
        }

        const account = createBankAccount(1000)

        expect(account.getBalance()).toBe(1000)
        expect(account.deposit(500)).toBe(1500)
        expect(account.withdraw(200)).toBe(1300)

        // Private variable is not accessible
        expect(account.balance).toBe(undefined)

        // Can't modify balance directly
        account.balance = 1000000
        expect(account.getBalance()).toBe(1300)
      })

      it('should keep transaction history private', () => {
        function createAccount() {
          let balance = 0
          const history = []

          return {
            deposit(amount) {
              balance += amount
              history.push({ type: 'deposit', amount })
              return balance
            },
            getHistory() {
              return [...history] // return copy
            }
          }
        }

        const account = createAccount()
        account.deposit(100)
        account.deposit(50)

        const history = account.getHistory()
        expect(history).toHaveLength(2)
        expect(history[0]).toEqual({ type: 'deposit', amount: 100 })

        // Modifying returned array doesn't affect internal state
        history.push({ type: 'fake', amount: 9999 })
        expect(account.getHistory()).toHaveLength(2)

        // Can't access history directly
        expect(account.history).toBe(undefined)
      })

      it('should have private functions', () => {
        function createCounter() {
          let count = 0

          function logChange(action) {
            return `[LOG] ${action}: count is now ${count}`
          }

          return {
            increment() {
              count++
              return logChange('increment')
            },
            getCount() {
              return count
            }
          }
        }

        const counter = createCounter()

        expect(counter.increment()).toBe('[LOG] increment: count is now 1')
        expect(counter.getCount()).toBe(1)

        // Private function is not accessible
        expect(counter.logChange).toBe(undefined)
      })
    })

    describe('Factory Creating Different Types', () => {
      it('should return different object types based on input', () => {
        function createWeapon(type) {
          const weapons = {
            sword: { name: 'Sword', damage: 25, type: 'melee' },
            bow: { name: 'Bow', damage: 20, type: 'ranged', range: 100 },
            staff: { name: 'Staff', damage: 35, type: 'magic', manaCost: 10 }
          }

          if (!weapons[type]) {
            throw new Error(`Unknown weapon: ${type}`)
          }

          return { ...weapons[type] }
        }

        const sword = createWeapon('sword')
        const bow = createWeapon('bow')
        const staff = createWeapon('staff')

        expect(sword.damage).toBe(25)
        expect(bow.range).toBe(100)
        expect(staff.manaCost).toBe(10)

        expect(() => createWeapon('laser')).toThrow('Unknown weapon: laser')
      })
    })
  })

  // ===========================================
  // Part 3: Constructor Functions
  // ===========================================

  describe('Part 3: Constructor Functions', () => {
    describe('Basic Constructor Function', () => {
      it('should create objects with new keyword', () => {
        function Player(name) {
          this.name = name
          this.health = 100
          this.level = 1
        }

        const alice = new Player('Alice')
        const bob = new Player('Bob')

        expect(alice.name).toBe('Alice')
        expect(bob.name).toBe('Bob')
        expect(alice.health).toBe(100)
      })

      it('should work with instanceof', () => {
        function Player(name) {
          this.name = name
        }

        function Enemy(name) {
          this.name = name
        }

        const alice = new Player('Alice')
        const goblin = new Enemy('Goblin')

        expect(alice instanceof Player).toBe(true)
        expect(alice instanceof Enemy).toBe(false)
        expect(goblin instanceof Enemy).toBe(true)
        expect(goblin instanceof Object).toBe(true)
      })
    })

    describe('The new Keyword', () => {
      it('should simulate what new does', () => {
        function myNew(Constructor, ...args) {
          const obj = Object.create(Constructor.prototype)
          const result = Constructor.apply(obj, args)
          return typeof result === 'object' && result !== null ? result : obj
        }

        function Player(name) {
          this.name = name
          this.health = 100
        }

        Player.prototype.attack = function () {
          return `${this.name} attacks!`
        }

        const player = myNew(Player, 'Alice')

        expect(player.name).toBe('Alice')
        expect(player.health).toBe(100)
        expect(player.attack()).toBe('Alice attacks!')
        expect(player instanceof Player).toBe(true)
      })

      it('should return custom object if constructor returns one', () => {
        function ReturnsObject() {
          this.value = 42
          return { custom: 'object' }
        }

        function ReturnsPrimitive() {
          this.value = 42
          return 'ignored'
        }

        const obj1 = new ReturnsObject()
        const obj2 = new ReturnsPrimitive()

        expect(obj1).toEqual({ custom: 'object' })
        expect(obj2.value).toBe(42) // primitive return is ignored
      })
    })

    describe('Prototype Methods', () => {
      it('should share methods via prototype', () => {
        function Player(name) {
          this.name = name
        }

        Player.prototype.attack = function () {
          return `${this.name} attacks!`
        }

        const p1 = new Player('Alice')
        const p2 = new Player('Bob')

        // Methods are shared
        expect(p1.attack).toBe(p2.attack)
        expect(p1.attack()).toBe('Alice attacks!')
        expect(p2.attack()).toBe('Bob attacks!')
      })

      it('should add multiple methods to prototype', () => {
        function Character(name, health) {
          this.name = name
          this.health = health
        }

        Character.prototype.attack = function () {
          return `${this.name} attacks!`
        }

        Character.prototype.takeDamage = function (amount) {
          this.health -= amount
          return this.health
        }

        Character.prototype.isAlive = function () {
          return this.health > 0
        }

        const hero = new Character('Hero', 100)

        expect(hero.attack()).toBe('Hero attacks!')
        expect(hero.takeDamage(30)).toBe(70)
        expect(hero.isAlive()).toBe(true)
        expect(hero.takeDamage(80)).toBe(-10)
        expect(hero.isAlive()).toBe(false)
      })
    })
  })

  // ===========================================
  // Part 4: ES6 Classes
  // ===========================================

  describe('Part 4: ES6 Classes', () => {
    describe('Basic Class Syntax', () => {
      it('should create objects with class syntax', () => {
        class Player {
          constructor(name) {
            this.name = name
            this.health = 100
            this.level = 1
          }

          attack() {
            return `${this.name} attacks for ${10 + this.level * 2} damage!`
          }
        }

        const alice = new Player('Alice')

        expect(alice.name).toBe('Alice')
        expect(alice.health).toBe(100)
        expect(alice.attack()).toBe('Alice attacks for 12 damage!')
        expect(alice instanceof Player).toBe(true)
      })

      it('should share methods via prototype (like constructors)', () => {
        class Player {
          constructor(name) {
            this.name = name
          }

          attack() {
            return `${this.name} attacks!`
          }
        }

        const p1 = new Player('Alice')
        const p2 = new Player('Bob')

        expect(p1.attack).toBe(p2.attack) // Shared via prototype
      })
    })

    describe('Class Fields', () => {
      it('should support class fields with default values', () => {
        class Character {
          level = 1
          experience = 0

          constructor(name) {
            this.name = name
          }
        }

        const hero = new Character('Hero')

        expect(hero.level).toBe(1)
        expect(hero.experience).toBe(0)
        expect(hero.name).toBe('Hero')
      })
    })

    describe('Static Methods and Properties', () => {
      it('should define static methods on class', () => {
        class MathUtils {
          static PI = 3.14159

          static square(x) {
            return x * x
          }

          static cube(x) {
            return x * x * x
          }
        }

        expect(MathUtils.PI).toBe(3.14159)
        expect(MathUtils.square(5)).toBe(25)
        expect(MathUtils.cube(3)).toBe(27)

        // Not available on instances
        const utils = new MathUtils()
        expect(utils.PI).toBe(undefined)
        expect(utils.square).toBe(undefined)
      })

      it('should use static factory methods', () => {
        class User {
          constructor(id, name) {
            this.id = id
            this.name = name
          }

          static createGuest() {
            return new User(0, 'Guest')
          }

          static fromData(data) {
            return new User(data.id, data.name)
          }
        }

        const guest = User.createGuest()
        const user = User.fromData({ id: 1, name: 'Alice' })

        expect(guest.id).toBe(0)
        expect(guest.name).toBe('Guest')
        expect(user.id).toBe(1)
        expect(user.name).toBe('Alice')
      })
    })

    describe('Getters and Setters', () => {
      it('should define getters and setters', () => {
        class Circle {
          constructor(radius) {
            this._radius = radius
          }

          get radius() {
            return this._radius
          }

          set radius(value) {
            if (value < 0) throw new Error('Radius cannot be negative')
            this._radius = value
          }

          get diameter() {
            return this._radius * 2
          }

          set diameter(value) {
            this._radius = value / 2
          }

          get area() {
            return Math.PI * this._radius ** 2
          }
        }

        const circle = new Circle(5)

        expect(circle.radius).toBe(5)
        expect(circle.diameter).toBe(10)
        expect(circle.area).toBeCloseTo(78.54, 1)

        circle.diameter = 20
        expect(circle.radius).toBe(10)

        expect(() => {
          circle.radius = -5
        }).toThrow('Radius cannot be negative')
      })
    })

    describe('Private Fields (#)', () => {
      it('should create truly private fields', () => {
        class BankAccount {
          #balance = 0

          constructor(initialBalance) {
            this.#balance = initialBalance
          }

          deposit(amount) {
            if (amount > 0) this.#balance += amount
            return this.#balance
          }

          getBalance() {
            return this.#balance
          }
        }

        const account = new BankAccount(1000)

        expect(account.getBalance()).toBe(1000)
        expect(account.deposit(500)).toBe(1500)

        // Private field is not accessible
        expect(account.balance).toBe(undefined)
        expect(account['#balance']).toBe(undefined)
      })

      it('should support private methods', () => {
        class Counter {
          #count = 0

          #log(action) {
            return `[${action}] count: ${this.#count}`
          }

          increment() {
            this.#count++
            return this.#log('increment')
          }

          getCount() {
            return this.#count
          }
        }

        const counter = new Counter()

        expect(counter.increment()).toBe('[increment] count: 1')
        expect(counter.getCount()).toBe(1)

        // Private method is not accessible
        expect(counter.log).toBe(undefined)
      })
    })

    describe('Classes are Syntactic Sugar', () => {
      it('should prove classes are functions', () => {
        class Player {
          constructor(name) {
            this.name = name
          }
        }

        expect(typeof Player).toBe('function')
      })

      it('should have same prototype behavior as constructor functions', () => {
        class Player {
          constructor(name) {
            this.name = name
          }

          attack() {
            return `${this.name} attacks!`
          }
        }

        const player = new Player('Alice')

        expect(player.constructor).toBe(Player)
        expect(Object.getPrototypeOf(player)).toBe(Player.prototype)
        expect(player.__proto__).toBe(Player.prototype)
      })
    })
  })

  // ===========================================
  // Part 5: Inheritance
  // ===========================================

  describe('Part 5: Inheritance', () => {
    describe('Class Inheritance with extends', () => {
      it('should inherit from parent class', () => {
        class Character {
          constructor(name, health) {
            this.name = name
            this.health = health
          }

          attack() {
            return `${this.name} attacks!`
          }

          takeDamage(amount) {
            this.health -= amount
            return this.health
          }
        }

        class Warrior extends Character {
          constructor(name) {
            super(name, 150) // Call parent constructor
            this.armor = 20
          }

          shieldBash() {
            return `${this.name} bashes with shield for ${this.armor} damage!`
          }
        }

        const conan = new Warrior('Conan')

        expect(conan.name).toBe('Conan')
        expect(conan.health).toBe(150)
        expect(conan.armor).toBe(20)
        expect(conan.attack()).toBe('Conan attacks!')
        expect(conan.shieldBash()).toBe('Conan bashes with shield for 20 damage!')
      })

      it('should work with instanceof through inheritance chain', () => {
        class Animal {}
        class Dog extends Animal {}

        const rex = new Dog()

        expect(rex instanceof Dog).toBe(true)
        expect(rex instanceof Animal).toBe(true)
        expect(rex instanceof Object).toBe(true)
      })
    })

    describe('Method Overriding', () => {
      it('should override parent methods', () => {
        class Animal {
          speak() {
            return 'Some sound'
          }
        }

        class Dog extends Animal {
          speak() {
            return 'Woof!'
          }
        }

        class Cat extends Animal {
          speak() {
            return 'Meow!'
          }
        }

        const animal = new Animal()
        const dog = new Dog()
        const cat = new Cat()

        expect(animal.speak()).toBe('Some sound')
        expect(dog.speak()).toBe('Woof!')
        expect(cat.speak()).toBe('Meow!')
      })

      it('should call parent method with super', () => {
        class Character {
          constructor(name) {
            this.name = name
          }

          attack() {
            return `${this.name} attacks!`
          }
        }

        class Warrior extends Character {
          attack() {
            return `${super.attack()} With great strength!`
          }
        }

        const warrior = new Warrior('Conan')

        expect(warrior.attack()).toBe('Conan attacks! With great strength!')
      })
    })

    describe('The super Keyword', () => {
      it('should require super() before using this in derived class', () => {
        class Parent {
          constructor(name) {
            this.name = name
          }
        }

        class Child extends Parent {
          constructor(name, age) {
            super(name) // Must call before using this
            this.age = age
          }
        }

        const child = new Child('Alice', 10)

        expect(child.name).toBe('Alice')
        expect(child.age).toBe(10)
      })
    })

    describe('Factory Composition', () => {
      it('should compose behaviors from multiple sources', () => {
        const canWalk = (state) => ({
          walk() {
            state.position += state.speed
            return `${state.name} walks to position ${state.position}`
          }
        })

        const canSwim = (state) => ({
          swim() {
            state.position += state.speed * 1.5
            return `${state.name} swims to position ${state.position}`
          }
        })

        const canFly = (state) => ({
          fly() {
            state.position += state.speed * 3
            return `${state.name} flies to position ${state.position}`
          }
        })

        function createDuck(name) {
          const state = { name, position: 0, speed: 2 }
          return {
            name: state.name,
            ...canWalk(state),
            ...canSwim(state),
            ...canFly(state),
            getPosition: () => state.position
          }
        }

        function createPenguin(name) {
          const state = { name, position: 0, speed: 1 }
          return {
            name: state.name,
            ...canWalk(state),
            ...canSwim(state),
            // No fly!
            getPosition: () => state.position
          }
        }

        const duck = createDuck('Donald')
        const penguin = createPenguin('Tux')

        expect(duck.walk()).toBe('Donald walks to position 2')
        expect(duck.swim()).toBe('Donald swims to position 5')
        expect(duck.fly()).toBe('Donald flies to position 11')

        expect(penguin.walk()).toBe('Tux walks to position 1')
        expect(penguin.swim()).toBe('Tux swims to position 2.5')
        expect(penguin.fly).toBe(undefined) // Penguins can't fly
      })

      it('should allow flexible behavior combinations', () => {
        const withHealth = (state) => ({
          takeDamage(amount) {
            state.health -= amount
            return state.health
          },
          heal(amount) {
            state.health = Math.min(state.maxHealth, state.health + amount)
            return state.health
          },
          getHealth: () => state.health,
          isAlive: () => state.health > 0
        })

        const withMana = (state) => ({
          useMana(amount) {
            if (state.mana >= amount) {
              state.mana -= amount
              return true
            }
            return false
          },
          getMana: () => state.mana
        })

        function createWarrior(name) {
          const state = { name, health: 150, maxHealth: 150 }
          return {
            name: state.name,
            ...withHealth(state)
            // No mana for warriors
          }
        }

        function createMage(name) {
          const state = { name, health: 80, maxHealth: 80, mana: 100 }
          return {
            name: state.name,
            ...withHealth(state),
            ...withMana(state)
          }
        }

        const warrior = createWarrior('Conan')
        const mage = createMage('Gandalf')

        expect(warrior.getHealth()).toBe(150)
        expect(warrior.takeDamage(50)).toBe(100)
        expect(warrior.getMana).toBe(undefined) // Warriors don't have mana

        expect(mage.getHealth()).toBe(80)
        expect(mage.getMana()).toBe(100)
        expect(mage.useMana(30)).toBe(true)
        expect(mage.getMana()).toBe(70)
      })
    })
  })

  // ===========================================
  // Part 6: Factory vs Class Comparison
  // ===========================================

  describe('Part 6: Factory vs Class Comparison', () => {
    describe('instanceof behavior', () => {
      it('should work with classes but not factories', () => {
        class ClassPlayer {
          constructor(name) {
            this.name = name
          }
        }

        function createPlayer(name) {
          return { name }
        }

        const classPlayer = new ClassPlayer('Alice')
        const factoryPlayer = createPlayer('Bob')

        expect(classPlayer instanceof ClassPlayer).toBe(true)
        expect(factoryPlayer instanceof Object).toBe(true)
        // Factory objects are just plain objects
      })
    })

    describe('Memory efficiency', () => {
      it('should show classes share prototype methods', () => {
        class ClassPlayer {
          attack() {
            return 'attack'
          }
        }

        const p1 = new ClassPlayer()
        const p2 = new ClassPlayer()

        expect(p1.attack).toBe(p2.attack) // Same function reference
      })

      it('should show factories create new methods for each instance', () => {
        function createPlayer() {
          return {
            attack() {
              return 'attack'
            }
          }
        }

        const p1 = createPlayer()
        const p2 = createPlayer()

        expect(p1.attack).not.toBe(p2.attack) // Different function references
      })
    })

    describe('Privacy comparison', () => {
      it('should show both can achieve true privacy', () => {
        // Class with private fields
        class ClassWallet {
          #balance = 0

          deposit(amount) {
            this.#balance += amount
          }
          getBalance() {
            return this.#balance
          }
        }

        // Factory with closures
        function createWallet() {
          let balance = 0
          return {
            deposit(amount) {
              balance += amount
            },
            getBalance() {
              return balance
            }
          }
        }

        const classWallet = new ClassWallet()
        const factoryWallet = createWallet()

        classWallet.deposit(100)
        factoryWallet.deposit(100)

        expect(classWallet.getBalance()).toBe(100)
        expect(factoryWallet.getBalance()).toBe(100)

        // Both are truly private
        expect(classWallet.balance).toBe(undefined)
        expect(factoryWallet.balance).toBe(undefined)
      })
    })
  })

  // ===========================================
  // Additional Edge Cases
  // ===========================================

  describe('Edge Cases', () => {
    describe('Class Expression', () => {
      it('should support class expressions', () => {
        const Player = class {
          constructor(name) {
            this.name = name
          }
        }

        const alice = new Player('Alice')
        expect(alice.name).toBe('Alice')
      })

      it('should support named class expressions', () => {
        const Player = class PlayerClass {
          constructor(name) {
            this.name = name
          }

          static getClassName() {
            return PlayerClass.name
          }
        }

        expect(Player.name).toBe('PlayerClass')
        expect(Player.getClassName()).toBe('PlayerClass')
      })
    })

    describe('Extending Built-in Objects', () => {
      it('should extend Array', () => {
        class ExtendedArray extends Array {
          get first() {
            return this[0]
          }

          get last() {
            return this[this.length - 1]
          }

          sum() {
            return this.reduce((a, b) => a + b, 0)
          }
        }

        const arr = new ExtendedArray(1, 2, 3, 4, 5)

        expect(arr.first).toBe(1)
        expect(arr.last).toBe(5)
        expect(arr.sum()).toBe(15)
        expect(arr instanceof Array).toBe(true)
        expect(arr instanceof ExtendedArray).toBe(true)

        // Array methods still work and return ExtendedArray
        const doubled = arr.map((x) => x * 2)
        expect(doubled instanceof ExtendedArray).toBe(true)
        expect(doubled.sum()).toBe(30)
      })
    })

    describe('Static Initialization Blocks', () => {
      it('should support static initialization blocks', () => {
        class Config {
          static values = {}

          static {
            Config.values.initialized = true
            Config.values.timestamp = Date.now()
          }
        }

        expect(Config.values.initialized).toBe(true)
        expect(typeof Config.values.timestamp).toBe('number')
      })
    })

    describe('Factory with Validation', () => {
      it('should validate input in factory', () => {
        function createUser(name, age) {
          if (typeof name !== 'string' || name.length === 0) {
            throw new Error('Name must be a non-empty string')
          }
          if (typeof age !== 'number' || age < 0) {
            throw new Error('Age must be a positive number')
          }

          return {
            name,
            age,
            isAdult: age >= 18
          }
        }

        const user = createUser('Alice', 25)
        expect(user.name).toBe('Alice')
        expect(user.isAdult).toBe(true)

        expect(() => createUser('', 25)).toThrow('Name must be a non-empty string')
        expect(() => createUser('Alice', -5)).toThrow('Age must be a positive number')
      })
    })

    describe('Method Chaining', () => {
      it('should support method chaining in class', () => {
        class Builder {
          constructor() {
            this.result = {}
          }

          setName(name) {
            this.result.name = name
            return this
          }

          setAge(age) {
            this.result.age = age
            return this
          }

          build() {
            return this.result
          }
        }

        const person = new Builder().setName('Alice').setAge(25).build()

        expect(person).toEqual({ name: 'Alice', age: 25 })
      })

      it('should support method chaining in factory', () => {
        function createBuilder() {
          const result = {}

          return {
            setName(name) {
              result.name = name
              return this
            },
            setAge(age) {
              result.age = age
              return this
            },
            build() {
              return { ...result }
            }
          }
        }

        const person = createBuilder().setName('Bob').setAge(30).build()

        expect(person).toEqual({ name: 'Bob', age: 30 })
      })
    })
  })
})
