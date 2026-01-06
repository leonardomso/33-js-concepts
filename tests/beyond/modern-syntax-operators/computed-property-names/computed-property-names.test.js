import { describe, it, expect } from 'vitest'

describe('Computed Property Names', () => {

  describe('Basic Syntax', () => {
    // Source: computed-property-names.mdx lines 7-15 (Opening code example)
    it('should demonstrate ES6 computed property vs ES5 two-step pattern', () => {
      // Before ES6 - two steps required
      const key = 'status'
      const obj = {}
      obj[key] = 'active'

      // ES6 computed property names - single expression
      const key2 = 'status'
      const obj2 = { [key2]: 'active' }

      expect(obj).toEqual({ status: 'active' })
      expect(obj2).toEqual({ status: 'active' })
    })

    // Source: computed-property-names.mdx lines 36-45 (What are Computed Property Names)
    it('should evaluate expression in brackets to determine property name', () => {
      const field = 'email'
      const value = 'alice@example.com'

      const formData = {
        [field]: value,
        [`${field}_verified`]: true
      }

      expect(formData).toEqual({
        email: 'alice@example.com',
        email_verified: true
      })
    })

    // Source: computed-property-names.mdx lines 86-96 (Variable as Key)
    it('should use variable value as property name', () => {
      const propName = 'score'
      const player = {
        name: 'Alice',
        [propName]: 100
      }

      expect(player).toEqual({ name: 'Alice', score: 100 })
      expect(player.score).toBe(100)
    })

    // Source: computed-property-names.mdx lines 98-109 (Template Literal as Key)
    it('should support template literals as computed keys', () => {
      const prefix = 'user'
      const id = 42

      const data = {
        [`${prefix}_${id}`]: 'Alice',
        [`${prefix}_${id}_role`]: 'admin'
      }

      expect(data).toEqual({
        user_42: 'Alice',
        user_42_role: 'admin'
      })
    })

    // Source: computed-property-names.mdx lines 111-122 (Expression as Key)
    it('should support expressions as computed keys', () => {
      const i = 0

      const obj = {
        ['prop' + (i + 1)]: 'first',
        ['prop' + (i + 2)]: 'second',
        [1 + 1]: 'number key'
      }

      expect(obj['2']).toBe('number key')
      expect(obj.prop1).toBe('first')
      expect(obj.prop2).toBe('second')
    })

    // Source: computed-property-names.mdx lines 124-133 (Function Call as Key)
    it('should support function calls as computed keys', () => {
      function getKey(type) {
        return `data_${type}_test`
      }

      const cache = {
        [getKey('user')]: { name: 'Alice' }
      }

      expect(cache.data_user_test).toEqual({ name: 'Alice' })
      expect(Object.keys(cache)[0]).toBe('data_user_test')
    })
  })

  describe('Order of Evaluation', () => {
    // Source: computed-property-names.mdx lines 141-153 (Key Before Value)
    it('should evaluate key expression before value expression', () => {
      let counter = 0

      const obj = {
        [++counter]: counter,  // key: 1, value: 1
        [++counter]: counter,  // key: 2, value: 2
        [++counter]: counter   // key: 3, value: 3
      }

      expect(obj).toEqual({ '1': 1, '2': 2, '3': 3 })
    })

    it('should process properties left-to-right in source order', () => {
      const order = []

      const obj = {
        [(order.push('key1'), 'a')]: (order.push('val1'), 1),
        [(order.push('key2'), 'b')]: (order.push('val2'), 2)
      }

      expect(order).toEqual(['key1', 'val1', 'key2', 'val2'])
      expect(obj).toEqual({ a: 1, b: 2 })
    })
  })

  describe('Type Coercion (ToPropertyKey)', () => {
    // Source: computed-property-names.mdx lines 167-178 (Type Coercion examples)
    it('should coerce various types to strings', () => {
      const obj = {
        [42]: 'number',
        [true]: 'boolean',
        [null]: 'null',
        [[1, 2, 3]]: 'array'
      }

      expect(obj).toEqual({
        '42': 'number',
        'true': 'boolean',
        'null': 'null',
        '1,2,3': 'array'
      })
    })

    // Source: computed-property-names.mdx lines 180-183 (Number/string collision)
    it('should treat number and string keys as the same property', () => {
      const obj = {
        [42]: 'number key'
      }

      expect(obj[42]).toBe('number key')
      expect(obj['42']).toBe('number key')  // Same property!
    })

    it('should convert undefined to string', () => {
      const obj = {
        [undefined]: 'undefined value'
      }

      expect(obj['undefined']).toBe('undefined value')
    })

    it('should convert objects using toString()', () => {
      const customObj = {
        toString() {
          return 'customKey'
        }
      }

      const obj = {
        [customObj]: 'custom object key'
      }

      expect(obj.customKey).toBe('custom object key')
    })

    it('should convert plain objects to [object Object]', () => {
      const plainObj = { id: 1 }

      const obj = {
        [plainObj]: 'plain object key'
      }

      expect(obj['[object Object]']).toBe('plain object key')
    })
  })

  describe('Pre-ES6 Comparison', () => {
    // Source: computed-property-names.mdx lines 191-201 (ES5 pattern)
    it('should show ES5 two-step pattern equivalence', () => {
      function createUserES5(role, name) {
        const obj = {}
        obj[role] = name
        return obj
      }

      const admin = createUserES5('admin', 'Alice')
      expect(admin).toEqual({ admin: 'Alice' })
    })

    // Source: computed-property-names.mdx lines 213-227 (ES6 patterns)
    it('should enable elegant reduce patterns with computed properties', () => {
      const fields = ['name', 'email', 'age']
      const defaults = fields.reduce(
        (acc, field) => ({ ...acc, [field]: '' }),
        {}
      )

      expect(defaults).toEqual({ name: '', email: '', age: '' })
    })
  })

  describe('Symbol Keys', () => {
    // Source: computed-property-names.mdx lines 235-244 (Symbol syntax requirement)
    it('should require computed syntax for Symbol keys', () => {
      const mySymbol = Symbol('id')

      // This creates a string key "mySymbol", NOT a Symbol key!
      const wrong = { mySymbol: 'value' }
      expect(Object.keys(wrong)).toEqual(['mySymbol'])

      // This uses the Symbol as the key
      const correct = { [mySymbol]: 'value' }
      expect(Object.keys(correct)).toEqual([])  // Symbols don't appear in keys!
      expect(Object.getOwnPropertySymbols(correct)).toEqual([mySymbol])
    })

    // Source: computed-property-names.mdx lines 248-262 (Symbol keys are hidden)
    it('should hide Symbol keys from iteration methods', () => {
      const secret = Symbol('secret')

      const user = {
        name: 'Alice',
        [secret]: 'classified information'
      }

      // Symbol keys are hidden from these:
      expect(Object.keys(user)).toEqual(['name'])
      expect(JSON.stringify(user)).toBe('{"name":"Alice"}')

      const keysFromForIn = []
      for (const key in user) {
        keysFromForIn.push(key)
      }
      expect(keysFromForIn).toEqual(['name'])

      // But you can still access them:
      expect(user[secret]).toBe('classified information')
      expect(Object.getOwnPropertySymbols(user)).toEqual([secret])
    })

    // Source: computed-property-names.mdx lines 268-287 (Symbol.iterator)
    it('should make objects iterable with Symbol.iterator', () => {
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

      expect([...range]).toEqual([1, 2, 3, 4, 5])

      const collected = []
      for (const num of range) {
        collected.push(num)
      }
      expect(collected).toEqual([1, 2, 3, 4, 5])
    })

    // Source: computed-property-names.mdx lines 291-301 (Symbol.toStringTag)
    it('should customize type string with Symbol.toStringTag', () => {
      const myCollection = {
        items: [],
        [Symbol.toStringTag]: 'MyCollection'
      }

      expect(Object.prototype.toString.call(myCollection)).toBe('[object MyCollection]')
      expect(Object.prototype.toString.call({})).toBe('[object Object]')
    })

    // Source: computed-property-names.mdx lines 305-322 (Symbol.toPrimitive)
    it('should enable custom type coercion with Symbol.toPrimitive', () => {
      const temperature = {
        celsius: 20,

        [Symbol.toPrimitive](hint) {
          switch (hint) {
            case 'number':
              return this.celsius
            case 'string':
              return `${this.celsius}°C`
            default:
              return this.celsius
          }
        }
      }

      expect(+temperature).toBe(20)  // number hint
      expect(`${temperature}`).toBe('20°C')  // string hint
      expect(temperature + 10).toBe(30)  // default hint
    })

    // Source: computed-property-names.mdx lines 326-347 (Privacy patterns)
    it('should provide encapsulation with module-scoped Symbols', () => {
      const _balance = Symbol('balance')

      class BankAccount {
        constructor(initial) {
          this[_balance] = initial
        }

        deposit(amount) {
          this[_balance] += amount
        }

        getBalance() {
          return this[_balance]
        }
      }

      const account = new BankAccount(100)
      expect(Object.keys(account)).toEqual([])
      expect(JSON.stringify(account)).toBe('{}')
      expect(account.getBalance()).toBe(100)

      account.deposit(50)
      expect(account.getBalance()).toBe(150)

      // Still accessible if you know about Symbols:
      const symbols = Object.getOwnPropertySymbols(account)
      expect(symbols.length).toBe(1)
      expect(account[symbols[0]]).toBe(150)
    })
  })

  describe('Computed Method Names', () => {
    // Source: computed-property-names.mdx lines 355-368 (Basic computed methods)
    it('should support computed method names', () => {
      const action = 'greet'

      const obj = {
        [action]() {
          return 'Hello!'
        },
        [`${action}Loudly`]() {
          return 'HELLO!'
        }
      }

      expect(obj.greet()).toBe('Hello!')
      expect(obj.greetLoudly()).toBe('HELLO!')
    })

    // Source: computed-property-names.mdx lines 372-386 (Computed generator methods)
    it('should support computed generator methods', () => {
      const iteratorName = 'values'

      const collection = {
        items: [1, 2, 3],

        *[iteratorName]() {
          for (const item of this.items) {
            yield item * 2
          }
        }
      }

      expect([...collection.values()]).toEqual([2, 4, 6])
    })

    it('should support computed async methods', () => {
      const fetchName = 'fetchData'

      const api = {
        async [fetchName]() {
          return Promise.resolve('data')
        }
      }

      expect(typeof api.fetchData).toBe('function')
      expect(api.fetchData()).toBeInstanceOf(Promise)
    })
  })

  describe('Computed Getters and Setters', () => {
    // Source: computed-property-names.mdx lines 401-422 (Getters and setters)
    it('should support computed getters and setters', () => {
      const prop = 'fullName'

      const person = {
        firstName: 'Alice',
        lastName: 'Smith',

        get [prop]() {
          return `${this.firstName} ${this.lastName}`
        },

        set [prop](value) {
          const parts = value.split(' ')
          this.firstName = parts[0]
          this.lastName = parts[1]
        }
      }

      expect(person.fullName).toBe('Alice Smith')

      person.fullName = 'Bob Jones'
      expect(person.firstName).toBe('Bob')
      expect(person.lastName).toBe('Jones')
    })

    it('should support Symbol-keyed accessors', () => {
      const _value = Symbol('value')

      const validated = {
        [_value]: 0,

        get [Symbol.for('value')]() {
          return this[_value]
        },

        set [Symbol.for('value')](v) {
          if (typeof v !== 'number') {
            throw new TypeError('Value must be a number')
          }
          this[_value] = v
        }
      }

      validated[Symbol.for('value')] = 42
      expect(validated[Symbol.for('value')]).toBe(42)

      expect(() => {
        validated[Symbol.for('value')] = 'not a number'
      }).toThrow(TypeError)
    })
  })

  describe('Real-World Use Cases', () => {
    // Source: computed-property-names.mdx lines 451-465 (Form field handling)
    it('should handle form field state updates', () => {
      function handleInputChange(fieldName, value) {
        return {
          [fieldName]: value,
          [`${fieldName}Touched`]: true,
          [`${fieldName}Error`]: null
        }
      }

      const updates = handleInputChange('email', 'alice@example.com')
      expect(updates).toEqual({
        email: 'alice@example.com',
        emailTouched: true,
        emailError: null
      })
    })

    // Source: computed-property-names.mdx lines 469-483 (Redux-style state)
    it('should handle Redux-style state updates', () => {
      function updateField(state, field, value) {
        return {
          ...state,
          [field]: value,
          lastModified: 'now'
        }
      }

      const state = { name: 'Alice', email: '' }
      const newState = updateField(state, 'email', 'alice@example.com')

      expect(newState.name).toBe('Alice')
      expect(newState.email).toBe('alice@example.com')
      expect(newState.lastModified).toBe('now')
    })

    // Source: computed-property-names.mdx lines 487-500 (i18n)
    it('should create internationalization translation objects', () => {
      function createTranslations(locale, translations) {
        return {
          [`messages_${locale}`]: translations,
          [`${locale}_loaded`]: true
        }
      }

      const spanish = createTranslations('es', { hello: 'hola' })
      expect(spanish.messages_es).toEqual({ hello: 'hola' })
      expect(spanish.es_loaded).toBe(true)
    })

    // Source: computed-property-names.mdx lines 504-521 (API response mapping)
    it('should normalize API responses with dynamic keys', () => {
      function normalizeResponse(entityType, items) {
        return items.reduce((acc, item) => ({
          ...acc,
          [`${entityType}_${item.id}`]: item
        }), {})
      }

      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]

      const normalized = normalizeResponse('user', users)
      expect(normalized).toEqual({
        user_1: { id: 1, name: 'Alice' },
        user_2: { id: 2, name: 'Bob' }
      })
    })
  })

  describe('Edge Cases and Gotchas', () => {
    // Source: computed-property-names.mdx lines 527-537 (Duplicate keys)
    it('should let last duplicate key win', () => {
      const key = 'same'

      const obj = {
        [key]: 'first',
        ['sa' + 'me']: 'second',
        same: 'third'  // Static key, same string
      }

      expect(obj).toEqual({ same: 'third' })
    })

    // Source: computed-property-names.mdx lines 541-552 (Keys that throw)
    it('should abort object creation if key expression throws', () => {
      function badKey() {
        throw new Error('Key evaluation failed')
      }

      expect(() => {
        const obj = {
          valid: 'ok',
          [badKey()]: 'never reached'
        }
      }).toThrow('Key evaluation failed')
    })

    // Source: computed-property-names.mdx lines 556-565 (Object toString collisions)
    it('should cause collisions when objects toString to same value', () => {
      const objA = { toString: () => 'key' }
      const objB = { toString: () => 'key' }

      const data = {
        [objA]: 'first',
        [objB]: 'second'  // Overwrites! Both → 'key'
      }

      expect(data).toEqual({ key: 'second' })
    })

    // Source: computed-property-names.mdx lines 569-582 (__proto__ special case)
    it('should treat __proto__ differently in computed vs non-computed form', () => {
      // Non-computed: Sets the prototype!
      const obj1 = { __proto__: Array.prototype }
      expect(obj1 instanceof Array).toBe(true)
      expect(Object.hasOwn(obj1, '__proto__')).toBe(false)

      // Computed: Creates a normal property
      const obj2 = { ['__proto__']: Array.prototype }
      expect(obj2 instanceof Array).toBe(false)
      expect(Object.hasOwn(obj2, '__proto__')).toBe(true)

      // Shorthand: Also creates a normal property
      const __proto__ = 'just a string'
      const obj3 = { __proto__ }
      expect(obj3.__proto__).toBe('just a string')
      expect(Object.hasOwn(obj3, '__proto__')).toBe(true)
    })

    it('should handle empty string as key', () => {
      const obj = {
        ['']: 'empty key'
      }

      expect(obj['']).toBe('empty key')
      expect(Object.keys(obj)).toEqual([''])
    })

    it('should handle whitespace-only keys', () => {
      const obj = {
        [' ']: 'space',
        ['\t']: 'tab',
        ['\n']: 'newline'
      }

      expect(obj[' ']).toBe('space')
      expect(obj['\t']).toBe('tab')
      expect(obj['\n']).toBe('newline')
    })

    it('should allow reserved words as computed keys', () => {
      const reserved = 'class'

      const obj = {
        [reserved]: 'value',
        ['for']: 'another',
        ['return']: 'yet another'
      }

      expect(obj.class).toBe('value')
      expect(obj.for).toBe('another')
      expect(obj.return).toBe('yet another')
    })
  })

  describe('Comparison with Regular Assignment', () => {
    it('should be equivalent to bracket notation assignment', () => {
      const key = 'dynamic'
      const value = 'test'

      // These are semantically equivalent
      const obj1 = { [key]: value }

      const obj2 = {}
      obj2[key] = value

      expect(obj1).toEqual(obj2)
      expect(obj1).toEqual({ dynamic: 'test' })
    })

    it('should allow mixing computed and static properties', () => {
      const dynamicKey = 'computed'

      const obj = {
        staticKey: 'static value',
        [dynamicKey]: 'computed value',
        anotherStatic: 'another value',
        [`${dynamicKey}_suffix`]: 'suffixed value'
      }

      expect(obj).toEqual({
        staticKey: 'static value',
        computed: 'computed value',
        anotherStatic: 'another value',
        computed_suffix: 'suffixed value'
      })
    })
  })

  describe('Integration with Object Methods', () => {
    it('should work with Object.fromEntries pattern', () => {
      const entries = [
        ['a', 1],
        ['b', 2],
        ['c', 3]
      ]

      // Object.fromEntries is essentially computed properties under the hood
      const obj = Object.fromEntries(entries)
      expect(obj).toEqual({ a: 1, b: 2, c: 3 })

      // Equivalent with reduce and computed properties
      const obj2 = entries.reduce(
        (acc, [key, value]) => ({ ...acc, [key]: value }),
        {}
      )
      expect(obj2).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('should work with Object.entries for round-trip', () => {
      const original = { a: 1, b: 2, c: 3 }
      const entries = Object.entries(original)

      // Transform and recreate
      const doubled = entries.reduce(
        (acc, [key, value]) => ({ ...acc, [`${key}_doubled`]: value * 2 }),
        {}
      )

      expect(doubled).toEqual({
        a_doubled: 2,
        b_doubled: 4,
        c_doubled: 6
      })
    })
  })
})
