import { describe, it, expect } from 'vitest'

/**
 * Tests for JavaScript Type Nuances concept page
 * Source: /docs/beyond/concepts/javascript-type-nuances.mdx
 */

describe('JavaScript Type Nuances', () => {
  describe('Opening Hook Code Example (lines 9-22)', () => {
    it('should demonstrate undefined vs null declaration', () => {
      // Source: lines 11-12
      let user              // undefined — not initialized
      let data = null       // null — intentionally empty

      expect(user).toBe(undefined)
      expect(data).toBe(null)
    })

    it('should show typeof quirk for null', () => {
      // Source: lines 14-15
      expect(typeof null).toBe('object')       // a famous bug!
      expect(typeof undefined).toBe('undefined')
    })

    it('should demonstrate || vs ?? with falsy values', () => {
      // Source: lines 17-18
      expect(0 || 'fallback').toBe('fallback')  // but 0 is valid!
      expect(0 ?? 'fallback').toBe(0)           // nullish coalescing saves the day
    })

    it('should create unique Symbol and BigInt', () => {
      // Source: lines 20-21
      const id = Symbol('id')
      const huge = 9007199254740993n

      expect(typeof id).toBe('symbol')
      expect(huge).toBe(9007199254740993n)
    })
  })

  describe('null vs undefined: When JavaScript Returns undefined (lines 90-115)', () => {
    it('should return undefined for uninitialized variables', () => {
      // Source: lines 92-93
      let name
      expect(name).toBe(undefined)
    })

    it('should return undefined for missing object properties', () => {
      // Source: lines 96-97
      const user = { name: 'Alice' }
      expect(user.age).toBe(undefined)
    })

    it('should return undefined for functions without return', () => {
      // Source: lines 100-104
      function greet() {
        // no return statement
      }
      expect(greet()).toBe(undefined)
    })

    it('should return undefined for missing function parameters', () => {
      // Source: lines 107-110
      function sayHi(name) {
        return name
      }
      expect(sayHi()).toBe(undefined)
    })

    it('should return undefined for array holes', () => {
      // Source: lines 113-114
      const sparse = [1, , 3]
      expect(sparse[1]).toBe(undefined)
    })
  })

  describe('null vs undefined: When to Use null (lines 117-142)', () => {
    it('should use null to intentionally clear a value', () => {
      // Source: lines 123-124
      let currentUser = { name: 'Alice' }
      currentUser = null  // User logged out
      expect(currentUser).toBe(null)
    })

    it('should use null in API responses for missing data', () => {
      // Source: lines 127-130
      const response = {
        user: null,   // User not found, but the field exists
        error: null   // No error occurred
      }
      expect(response.user).toBe(null)
      expect(response.error).toBe(null)
    })

    it('should return null for end of prototype chain', () => {
      // Source: line 136
      expect(Object.getPrototypeOf(Object.prototype)).toBe(null)
    })

    it('should use null for optional parameters with default values', () => {
      // Source: lines 139-141
      function createUser(name, email = null) {
        return { name, email }
      }
      const user = createUser('Alice')
      expect(user.email).toBe(null)
    })
  })

  describe('null vs undefined: Comparing behavior (lines 158-174)', () => {
    it('should show equality quirks between null and undefined', () => {
      // Source: lines 160-161
      expect(null == undefined).toBe(true)    // loose equality
      expect(null === undefined).toBe(false)  // strict equality
    })

    it('should show type checking differences', () => {
      // Source: lines 164-165
      expect(typeof null).toBe('object')       // historical bug!
      expect(typeof undefined).toBe('undefined')
    })

    it('should show numeric coercion differences', () => {
      // Source: lines 168-169
      expect(null + 1).toBe(1)         // null becomes 0
      expect(Number.isNaN(undefined + 1)).toBe(true)  // undefined becomes NaN
    })

    it('should omit undefined properties in JSON serialization', () => {
      // Source: lines 172-173
      const result = JSON.stringify({ a: null, b: undefined })
      expect(result).toBe('{"a":null}')  // undefined properties are skipped!
    })
  })

  describe('null vs undefined: Checking for Both (lines 178-195)', () => {
    it('should check for both using loose equality', () => {
      // Source: lines 184-186
      const checkValue = (value) => {
        if (value == null) {
          return 'No value'
        }
        return 'Has value'
      }

      expect(checkValue(null)).toBe('No value')
      expect(checkValue(undefined)).toBe('No value')
      expect(checkValue(0)).toBe('Has value')
      expect(checkValue('')).toBe('Has value')
    })

    it('should provide default with nullish coalescing', () => {
      // Source: line 194
      const getValue = (value) => value ?? 'default'

      expect(getValue(null)).toBe('default')
      expect(getValue(undefined)).toBe('default')
      expect(getValue(0)).toBe(0)
      expect(getValue('')).toBe('')
    })
  })

  describe('Short-Circuit: Logical OR || (lines 207-232)', () => {
    it('should return first truthy value', () => {
      // Source: lines 212-217
      expect('hello' || 'default').toBe('hello')
      expect('' || 'default').toBe('default')        // empty string is falsy
      expect(0 || 42).toBe(42)                        // 0 is falsy!
      expect(null || 'fallback').toBe('fallback')
      expect(undefined || 'fallback').toBe('fallback')
    })

    it('should show the problem with || treating all falsy values as triggers', () => {
      // Source: lines 229-231
      const userCount = 0
      const userName = ''

      expect(userCount || 10).toBe(10)        // If userCount is 0, you get 10!
      expect(userName || 'Guest').toBe('Guest')  // If userName is '', you get 'Guest'!
    })
  })

  describe('Short-Circuit: Logical AND && (lines 234-248)', () => {
    it('should return first falsy value or last value if all truthy', () => {
      // Source: lines 239-243
      expect(true && 'hello').toBe('hello')   // both truthy, returns last
      expect('hello' && 42).toBe(42)
      expect(null && 'hello').toBe(null)      // first falsy
      expect(0 && 'hello').toBe(0)            // first falsy
    })

    it('should enable conditional execution pattern', () => {
      // Source: lines 246-247
      const user = { name: 'Alice' }
      expect(user && user.name).toBe('Alice')

      const noUser = null
      expect(noUser && noUser.name).toBe(null)
    })
  })

  describe('Short-Circuit: Nullish Coalescing ?? (lines 250-265)', () => {
    it('should only fall back on null/undefined, not other falsy values', () => {
      // Source: lines 256-260
      expect(0 ?? 42).toBe(0)                     // 0 is NOT nullish!
      expect('' ?? 'default').toBe('')            // empty string is NOT nullish!
      expect(false ?? true).toBe(false)
      expect(null ?? 'fallback').toBe('fallback')
      expect(undefined ?? 'fallback').toBe('fallback')
    })

    it('should safely handle 0 and empty string as valid values', () => {
      // Source: lines 263-264
      const userCount = 0
      const userName = ''

      expect(userCount ?? 10).toBe(0)          // 0 stays as 0
      expect(userName ?? 'Guest').toBe('')     // '' stays as ''
    })
  })

  describe('Short-Circuit: Optional Chaining ?. (lines 302-336)', () => {
    it('should safely access nested properties', () => {
      // Source: lines 307-318
      const user = {
        name: 'Alice',
        address: {
          city: 'Wonderland'
        }
      }

      expect(user?.address?.city).toBe('Wonderland')
    })

    it('should return undefined for null/undefined instead of throwing', () => {
      // Source: lines 321-323
      const nullUser = null
      expect(nullUser?.name).toBe(undefined)           // no error!
      expect(nullUser?.address?.city).toBe(undefined)  // no error!
    })

    it('should work with arrays', () => {
      // Source: lines 326-328
      const users = [{ name: 'Alice' }]
      expect(users?.[0]?.name).toBe('Alice')
      expect(users?.[99]?.name).toBe(undefined)
    })

    it('should work with function calls', () => {
      // Source: lines 331-335
      const api = {
        getUser: () => ({ name: 'Alice' })
      }
      expect(api.getUser?.()).toEqual({ name: 'Alice' })
      expect(api.nonexistent?.()).toBe(undefined)  // no error!
    })
  })

  describe('Short-Circuit: Combining ?? and ?. (lines 339-361)', () => {
    it('should get deeply nested value with a default', () => {
      // Source: line 344
      const user = { settings: { theme: 'dark' } }
      expect(user?.settings?.theme ?? 'light').toBe('dark')

      const userNoSettings = {}
      expect(userNoSettings?.settings?.theme ?? 'light').toBe('light')
    })

    it('should provide safe function call with default return', () => {
      // Source: line 347
      const api = {
        getData: () => [1, 2, 3]
      }
      expect(api.getData?.() ?? []).toEqual([1, 2, 3])

      const noApi = {}
      expect(noApi.getData?.() ?? []).toEqual([])
    })

    it('should respect explicit 0 when using ?? with ?.', () => {
      // Source: lines 350-360
      const config = {
        api: {}
      }

      expect(config?.api?.timeout ?? 5000).toBe(5000)  // no timeout set

      config.api.timeout = 0
      expect(config?.api?.timeout ?? 5000).toBe(0)    // respects the explicit 0
    })
  })

  describe('typeof Operator: Basic Usage (lines 369-387)', () => {
    it('should return correct type strings for primitives', () => {
      // Source: lines 372-378
      expect(typeof 'hello').toBe('string')
      expect(typeof 42).toBe('number')
      expect(typeof 42n).toBe('bigint')
      expect(typeof true).toBe('boolean')
      expect(typeof undefined).toBe('undefined')
      expect(typeof Symbol('id')).toBe('symbol')
    })

    it('should return object or function for non-primitives', () => {
      // Source: lines 381-386
      expect(typeof {}).toBe('object')
      expect(typeof []).toBe('object')           // arrays are objects!
      expect(typeof new Date()).toBe('object')
      expect(typeof /regex/).toBe('object')
      expect(typeof function(){}).toBe('function')  // special case
      expect(typeof class {}).toBe('function')      // classes are functions
    })
  })

  describe('typeof Operator: The null Bug (lines 389-410)', () => {
    it('should demonstrate typeof null returns object', () => {
      // Source: line 394
      expect(typeof null).toBe('object')  // NOT 'null'!
    })

    it('should show correct way to check for null', () => {
      // Source: lines 402-409
      const value = null

      // ❌ Wrong — typeof doesn't work for null
      expect(typeof value === 'null').toBe(false)  // Never true!

      // ✓ Correct — direct comparison
      expect(value === null).toBe(true)

      // ✓ Also correct — check both null and undefined
      expect(value == null).toBe(true)
    })
  })

  describe('typeof Operator: Undeclared Variables (lines 412-431)', () => {
    it('should return undefined for undeclared variables safely', () => {
      // Source: lines 420-421
      expect(typeof undeclaredVar).toBe('undefined')
    })

    it('should enable feature detection', () => {
      // Source: lines 424-429 (testing in Node.js environment)
      expect(typeof process !== 'undefined').toBe(true)  // Running in Node.js
    })
  })

  describe('typeof Operator: Better Type Checking (lines 460-489)', () => {
    it('should use Array.isArray for arrays', () => {
      // Source: lines 465-467
      expect(Array.isArray([1, 2, 3])).toBe(true)
      expect(Array.isArray('hello')).toBe(false)
    })

    it('should use Object.prototype.toString for precise type checking', () => {
      // Source: lines 473-477
      expect(Object.prototype.toString.call({})).toBe('[object Object]')
      expect(Object.prototype.toString.call([])).toBe('[object Array]')
      expect(Object.prototype.toString.call(null)).toBe('[object Null]')
      expect(Object.prototype.toString.call(undefined)).toBe('[object Undefined]')
      expect(Object.prototype.toString.call(new Date())).toBe('[object Date]')
    })

    it('should use helper function for precise type checking', () => {
      // Source: lines 480-488
      function getType(value) {
        return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
      }

      expect(getType(null)).toBe('null')
      expect(getType([])).toBe('array')
      expect(getType({})).toBe('object')
      expect(getType(new Date())).toBe('date')
      expect(getType(/regex/)).toBe('regexp')
    })
  })

  describe('instanceof Operator (lines 493-543)', () => {
    it('should check prototype chain for class instances', () => {
      // Source: lines 500-508
      class Animal {}
      class Dog extends Animal {}

      const buddy = new Dog()

      expect(buddy instanceof Dog).toBe(true)
      expect(buddy instanceof Animal).toBe(true)     // inheritance chain
      expect(buddy instanceof Object).toBe(true)     // everything inherits from Object
      expect(buddy instanceof Array).toBe(false)
    })

    it('should work with built-in constructors', () => {
      // Source: lines 511-515
      expect([] instanceof Array).toBe(true)
      expect({} instanceof Object).toBe(true)
      expect(new Date() instanceof Date).toBe(true)
      expect(/regex/ instanceof RegExp).toBe(true)
    })

    it('should return false for primitives', () => {
      // Source: lines 517-518
      expect('hello' instanceof String).toBe(false)  // primitive, not String object
      expect(42 instanceof Number).toBe(false)       // primitive, not Number object
    })

    it('should check prototype chain using isPrototypeOf', () => {
      // Source: lines 526-539
      class Animal {
        speak() { return 'Some sound' }
      }

      class Dog extends Animal {
        speak() { return 'Woof!' }
      }

      const buddy = new Dog()

      expect(Dog.prototype.isPrototypeOf(buddy)).toBe(true)
      expect(Animal.prototype.isPrototypeOf(buddy)).toBe(true)
    })
  })

  describe('instanceof with Symbol.hasInstance (lines 545-578)', () => {
    it('should customize instanceof behavior with Symbol.hasInstance', () => {
      // Source: lines 551-561
      class Duck {
        static [Symbol.hasInstance](instance) {
          return instance?.quack !== undefined
        }
      }

      const mallard = { quack: () => 'Quack!' }
      const dog = { bark: () => 'Woof!' }

      expect(mallard instanceof Duck).toBe(true)   // has quack method
      expect(dog instanceof Duck).toBe(false)      // no quack method
    })

    it('should validate data shapes with Symbol.hasInstance', () => {
      // Source: lines 564-577
      class ValidUser {
        static [Symbol.hasInstance](obj) {
          return obj !== null &&
                 typeof obj === 'object' &&
                 typeof obj.id === 'number' &&
                 typeof obj.email === 'string'
        }
      }

      const user = { id: 1, email: 'alice@example.com' }
      const invalid = { name: 'Bob' }

      expect(user instanceof ValidUser).toBe(true)
      expect(invalid instanceof ValidUser).toBe(false)
    })
  })

  describe('Symbols: Creating and Using (lines 592-639)', () => {
    it('should create unique symbols even with same description', () => {
      // Source: lines 600-605
      const id = Symbol('id')
      const anotherId = Symbol('id')

      expect(id === anotherId).toBe(false)  // different symbols
      expect(id === id).toBe(true)          // same symbol
    })

    it('should have accessible description', () => {
      // Source: lines 608-609
      const id = Symbol('id')
      expect(id.description).toBe('id')
    })

    it('should solve property name collision problem', () => {
      // Source: lines 616-631
      const user = {
        id: 123,
        name: 'Alice'
      }

      const internalId = Symbol('internal-id')
      user[internalId] = 'library-internal-id'

      expect(user.id).toBe(123)                         // original preserved
      expect(user[internalId]).toBe('library-internal-id')
    })

    it('should hide symbols from normal iteration', () => {
      // Source: lines 634-638
      const secret = Symbol('secret')
      const user = {
        id: 123,
        name: 'Alice',
        [secret]: 'hidden'
      }

      expect(Object.keys(user)).toEqual(['id', 'name'])  // no symbol!
      expect(JSON.stringify(user)).toBe('{"id":123,"name":"Alice"}')  // no symbol!
    })

    it('should access symbols with Object.getOwnPropertySymbols', () => {
      // Source: line 638
      const secret = Symbol('secret')
      const user = {
        visible: 'hello',
        [secret]: 'hidden'
      }

      const symbols = Object.getOwnPropertySymbols(user)
      expect(symbols.length).toBe(1)
      expect(user[symbols[0]]).toBe('hidden')
    })
  })

  describe('Symbols: Global Registry (lines 641-659)', () => {
    it('should create/retrieve global symbols with Symbol.for', () => {
      // Source: lines 646-651
      const globalId = Symbol.for('app.userId')
      const sameId = Symbol.for('app.userId')

      expect(globalId === sameId).toBe(true)
    })

    it('should get key from global symbol with Symbol.keyFor', () => {
      // Source: lines 654-658
      const globalId = Symbol.for('app.userId')
      expect(Symbol.keyFor(globalId)).toBe('app.userId')

      const localId = Symbol('local')
      expect(Symbol.keyFor(localId)).toBe(undefined)
    })
  })

  describe('Symbols: Well-Known Symbols (lines 661-710)', () => {
    it('should customize iteration with Symbol.iterator', () => {
      // Source: lines 667-686
      const range = {
        start: 1,
        end: 5,
        [Symbol.iterator]() {
          let current = this.start
          const end = this.end
          return {
            next() {
              if (current <= end) {
                return { value: current++, done: false }
              }
              return { done: true }
            }
          }
        }
      }

      const values = [...range]
      expect(values).toEqual([1, 2, 3, 4, 5])
    })

    it('should customize toString tag with Symbol.toStringTag', () => {
      // Source: lines 689-695
      class MyClass {
        get [Symbol.toStringTag]() {
          return 'MyClass'
        }
      }

      expect(Object.prototype.toString.call(new MyClass())).toBe('[object MyClass]')
    })

    it('should customize type conversion with Symbol.toPrimitive', () => {
      // Source: lines 698-709
      const money = {
        amount: 100,
        currency: 'USD',
        [Symbol.toPrimitive](hint) {
          if (hint === 'number') return this.amount
          if (hint === 'string') return `${this.currency} ${this.amount}`
          return this.amount
        }
      }

      expect(+money).toBe(100)              // hint: 'number'
      expect(`${money}`).toBe('USD 100')    // hint: 'string'
    })
  })

  describe('BigInt: Precision Problem (lines 726-743)', () => {
    it('should show MAX_SAFE_INTEGER limit', () => {
      // Source: line 735
      expect(Number.MAX_SAFE_INTEGER).toBe(9007199254740991)
    })

    it('should demonstrate precision loss beyond safe integer', () => {
      // Source: line 738
      expect(9007199254740992 === 9007199254740993).toBe(true)  // they're the same to JS!
    })
  })

  describe('BigInt: Creating Values (lines 745-758)', () => {
    it('should create BigInt with n suffix', () => {
      // Source: lines 749-750
      const big = 9007199254740993n
      expect(big).toBe(9007199254740993n)
    })

    it('should create BigInt from string', () => {
      // Source: lines 753-754
      const alsoBig = BigInt('9007199254740993')
      const fromNumber = BigInt(42)

      expect(alsoBig).toBe(9007199254740993n)
      expect(fromNumber).toBe(42n)
    })

    it('should preserve precision with BigInt', () => {
      // Source: line 757
      expect(9007199254740992n === 9007199254740993n).toBe(false)  // correctly different!
    })
  })

  describe('BigInt: Operations (lines 760-781)', () => {
    it('should perform arithmetic operations', () => {
      // Source: lines 763-772
      const a = 10n
      const b = 3n

      expect(a + b).toBe(13n)
      expect(a - b).toBe(7n)
      expect(a * b).toBe(30n)
      expect(a ** b).toBe(1000n)
    })

    it('should truncate division (no decimals)', () => {
      // Source: line 774
      expect(10n / 3n).toBe(3n)  // not 3.333...
    })

    it('should support remainder operation', () => {
      // Source: line 777
      expect(10n % 3n).toBe(1n)
    })

    it('should support comparison operations', () => {
      // Source: lines 780-781
      expect(10n > 3n).toBe(true)
      expect(10n === 10n).toBe(true)
    })
  })

  describe('BigInt: Limitations (lines 783-810)', () => {
    it('should throw TypeError when mixing BigInt and Number', () => {
      // Source: line 787
      expect(() => 10n + 5).toThrow(TypeError)
    })

    it('should require explicit conversion between BigInt and Number', () => {
      // Source: lines 790-791
      expect(10n + BigInt(5)).toBe(15n)
      expect(Number(10n) + 5).toBe(15)
    })

    it('should throw TypeError with Math methods', () => {
      // Source: line 794
      expect(() => Math.max(1n, 2n)).toThrow(TypeError)
    })

    it('should use comparison operators instead of Math methods', () => {
      // Source: line 797
      expect(1n > 2n ? 1n : 2n).toBe(2n)
    })

    it('should throw TypeError with unary +', () => {
      // Source: line 800
      expect(() => +10n).toThrow(TypeError)
    })

    it('should throw TypeError when serializing BigInt to JSON', () => {
      // Source: line 806
      expect(() => JSON.stringify({ id: 10n })).toThrow(TypeError)
    })

    it('should convert BigInt to string for JSON serialization', () => {
      // Source: line 809
      expect(JSON.stringify({ id: 10n.toString() })).toBe('{"id":"10"}')
    })
  })

  describe('BigInt: Use Cases (lines 812-831)', () => {
    it('should handle large IDs without precision loss', () => {
      // Source: line 816
      const tweetId = 1234567890123456789n
      expect(tweetId).toBe(1234567890123456789n)
    })

    it('should handle cryptographic-scale numbers', () => {
      // Source: line 819
      const largeKey = 2n ** 256n
      expect(largeKey > Number.MAX_SAFE_INTEGER).toBe(true)
    })

    it('should compute factorial without precision loss', () => {
      // Source: lines 826-829
      function factorial(n) {
        if (n <= 1n) return 1n
        return n * factorial(n - 1n)
      }

      expect(factorial(20n)).toBe(2432902008176640000n)
    })
  })

  describe('Common Mistakes (lines 839-941)', () => {
    it('should show mistake of using || when ?? is needed', () => {
      // Source: lines 846-853
      const userCount = 0
      const userName = ''

      // ❌ Wrong — loses valid values
      expect(userCount || 10).toBe(10)
      expect(userName || 'Guest').toBe('Guest')

      // ✓ Correct — only fallback on null/undefined
      expect(userCount ?? 10).toBe(0)
      expect(userName ?? 'Guest').toBe('')
    })

    it('should show mistake of using typeof to check for null', () => {
      // Source: lines 858-869
      const value = null

      // ❌ Wrong — never works
      expect(typeof value === 'null').toBe(false)

      // ✓ Correct — direct comparison
      expect(value === null).toBe(true)
    })

    it('should show mistake of not handling both null and undefined', () => {
      // Source: lines 901-918
      const checkValue = (value) => {
        if (value == null) {  // Loose equality catches both
          return 'No value'
        }
        return 'Has value'
      }

      expect(checkValue(null)).toBe('No value')
      expect(checkValue(undefined)).toBe('No value')
    })

    it('should show that Symbol properties are hidden from iteration', () => {
      // Source: lines 925-939
      const secret = Symbol('secret')
      const obj = {
        visible: 'hello',
        [secret]: 'hidden'
      }

      // ❌ Symbol properties are invisible here
      expect(Object.keys(obj)).toEqual(['visible'])
      expect(JSON.stringify(obj)).toBe('{"visible":"hello"}')

      // ✓ Use these to access Symbol properties
      expect(Object.getOwnPropertySymbols(obj)).toHaveLength(1)
      expect(Reflect.ownKeys(obj)).toEqual(['visible', secret])
    })
  })

  describe('Test Your Knowledge Q&A (lines 973-1080)', () => {
    it('Q1: should demonstrate difference between null and undefined', () => {
      // Source: lines 983-992
      let x          // undefined (uninitialized)
      let y = null   // null (intentionally empty)

      expect(typeof x).toBe('undefined')
      expect(typeof y).toBe('object')  // bug!

      expect(x == y).toBe(true)    // loose equality
      expect(x === y).toBe(false)  // strict equality
    })

    it('Q2: should show output of || vs ?? expressions', () => {
      // Source: lines 1006-1010
      expect(0 || 'fallback').toBe('fallback')   // 0 is falsy
      expect(0 ?? 'fallback').toBe(0)            // 0 is not nullish
      expect('' || 'fallback').toBe('fallback')  // '' is falsy
      expect('' ?? 'fallback').toBe('')          // '' is not nullish
    })

    it('Q4: should check for null OR undefined in one condition', () => {
      // Source: lines 1029-1032
      const checkNull = (value) => value == null
      
      expect(checkNull(null)).toBe(true)
      expect(checkNull(undefined)).toBe(true)
      expect(checkNull(0)).toBe(false)
      expect(checkNull('')).toBe(false)
    })

    it('Q5: should show difference between Symbol() and Symbol.for()', () => {
      // Source: lines 1050-1057
      expect(Symbol('id') === Symbol('id')).toBe(false)
      expect(Symbol.for('id') === Symbol.for('id')).toBe(true)
    })

    it('Q6: should demonstrate why BigInt and Number cannot be mixed', () => {
      // Source: lines 1067-1073
      expect(() => 10n + 5).toThrow(TypeError)

      // Fix by converting to same type
      expect(10n + BigInt(5)).toBe(15n)
      expect(Number(10n) + 5).toBe(15)
    })
  })
})
