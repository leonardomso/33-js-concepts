import { describe, it, expect } from 'vitest'

describe('Modern JavaScript Syntax (ES6+)', () => {
  
  // ===========================================
  // ARROW FUNCTIONS
  // ===========================================
  describe('Arrow Functions', () => {
    it('should have concise syntax for single expressions', () => {
      const add = (a, b) => a + b
      const square = x => x * x
      const greet = () => 'Hello!'

      expect(add(2, 3)).toBe(5)
      expect(square(4)).toBe(16)
      expect(greet()).toBe('Hello!')
    })

    it('should require explicit return in block body', () => {
      const withBlock = (a, b) => { return a + b }
      const withoutReturn = (a, b) => { a + b }  // Returns undefined

      expect(withBlock(2, 3)).toBe(5)
      expect(withoutReturn(2, 3)).toBe(undefined)
    })

    it('should require parentheses when returning object literal', () => {
      // Without parentheses, braces are interpreted as function body (labeled statement)
      const wrong = name => { name: name }  // This is a labeled statement, returns undefined
      const correct = name => ({ name: name })  // Parentheses make it an object literal

      expect(wrong('Alice')).toBe(undefined)
      expect(correct('Alice')).toEqual({ name: 'Alice' })
      
      // Note: Adding a comma like { name: name, active: true } would be a SyntaxError
    })

    it('should inherit this from enclosing scope', () => {
      const obj = {
        value: 42,
        getValueArrow: function() {
          const arrow = () => this.value
          return arrow()
        },
        getValueRegular: function() {
          // In strict mode, 'this' inside a plain function call is undefined
          // This would throw an error if we try to access this.value
          const regular = function() { return this }
          return regular()
        }
      }

      expect(obj.getValueArrow()).toBe(42)
      // Arrow function correctly inherits 'this' from getValueArrow
      // Regular function loses 'this' binding (undefined in strict mode)
      expect(obj.getValueRegular()).toBe(undefined)
    })
  })

  // ===========================================
  // DESTRUCTURING
  // ===========================================
  describe('Destructuring', () => {
    describe('Array Destructuring', () => {
      it('should extract values by position', () => {
        const colors = ['red', 'green', 'blue']
        const [first, second, third] = colors

        expect(first).toBe('red')
        expect(second).toBe('green')
        expect(third).toBe('blue')
      })

      it('should skip elements with empty slots', () => {
        const numbers = [1, 2, 3, 4, 5]
        const [first, , third, , fifth] = numbers

        expect(first).toBe(1)
        expect(third).toBe(3)
        expect(fifth).toBe(5)
      })

      it('should support default values', () => {
        const [a, b, c = 'default'] = [1, 2]

        expect(a).toBe(1)
        expect(b).toBe(2)
        expect(c).toBe('default')
      })

      it('should support rest pattern', () => {
        const [head, ...tail] = [1, 2, 3, 4, 5]

        expect(head).toBe(1)
        expect(tail).toEqual([2, 3, 4, 5])
      })

      it('should swap variables without temp', () => {
        let x = 1
        let y = 2

        ;[x, y] = [y, x]

        expect(x).toBe(2)
        expect(y).toBe(1)
      })
    })

    describe('Object Destructuring', () => {
      it('should extract properties by name', () => {
        const user = { name: 'Alice', age: 25 }
        const { name, age } = user

        expect(name).toBe('Alice')
        expect(age).toBe(25)
      })

      it('should support renaming', () => {
        const user = { name: 'Alice', age: 25 }
        const { name: userName, age: userAge } = user

        expect(userName).toBe('Alice')
        expect(userAge).toBe(25)
      })

      it('should support default values', () => {
        const user = { name: 'Alice' }
        const { name, role = 'guest' } = user

        expect(name).toBe('Alice')
        expect(role).toBe('guest')
      })

      it('should support nested destructuring', () => {
        const user = {
          name: 'Alice',
          address: { city: 'Portland', country: 'USA' }
        }
        const { address: { city } } = user

        expect(city).toBe('Portland')
      })

      it('should support rest pattern', () => {
        const user = { id: 1, name: 'Alice', age: 25 }
        const { id, ...rest } = user

        expect(id).toBe(1)
        expect(rest).toEqual({ name: 'Alice', age: 25 })
      })
    })

    describe('Function Parameter Destructuring', () => {
      it('should destructure parameters', () => {
        function greet({ name, greeting = 'Hello' }) {
          return `${greeting}, ${name}!`
        }

        expect(greet({ name: 'Alice' })).toBe('Hello, Alice!')
        expect(greet({ name: 'Bob', greeting: 'Hi' })).toBe('Hi, Bob!')
      })

      it('should handle empty parameter with default', () => {
        function greet({ name = 'Guest' } = {}) {
          return `Hello, ${name}!`
        }

        expect(greet()).toBe('Hello, Guest!')
        expect(greet({})).toBe('Hello, Guest!')
        expect(greet({ name: 'Alice' })).toBe('Hello, Alice!')
      })
    })
  })

  // ===========================================
  // SPREAD AND REST OPERATORS
  // ===========================================
  describe('Spread and Rest Operators', () => {
    describe('Spread Operator', () => {
      it('should spread arrays', () => {
        const arr1 = [1, 2, 3]
        const arr2 = [4, 5, 6]

        expect([...arr1, ...arr2]).toEqual([1, 2, 3, 4, 5, 6])
        expect([0, ...arr1, 4]).toEqual([0, 1, 2, 3, 4])
      })

      it('should copy arrays (shallow)', () => {
        const original = [1, 2, 3]
        const copy = [...original]

        expect(copy).toEqual(original)
        expect(copy).not.toBe(original)
      })

      it('should spread objects', () => {
        const defaults = { theme: 'light', fontSize: 14 }
        const userPrefs = { theme: 'dark' }

        const merged = { ...defaults, ...userPrefs }

        expect(merged).toEqual({ theme: 'dark', fontSize: 14 })
      })

      it('should spread function arguments', () => {
        const numbers = [1, 5, 3, 9, 2]

        expect(Math.max(...numbers)).toBe(9)
        expect(Math.min(...numbers)).toBe(1)
      })

      it('should create shallow copies only', () => {
        const original = { nested: { value: 1 } }
        const copy = { ...original }

        copy.nested.value = 2

        // Both are affected because nested object is shared
        expect(original.nested.value).toBe(2)
        expect(copy.nested.value).toBe(2)
      })
    })

    describe('Rest Parameters', () => {
      it('should collect remaining arguments', () => {
        function sum(...numbers) {
          return numbers.reduce((total, n) => total + n, 0)
        }

        expect(sum(1, 2, 3)).toBe(6)
        expect(sum(1, 2, 3, 4, 5)).toBe(15)
        expect(sum()).toBe(0)
      })

      it('should work with named parameters', () => {
        function log(first, ...rest) {
          return { first, rest }
        }

        expect(log('a', 'b', 'c', 'd')).toEqual({
          first: 'a',
          rest: ['b', 'c', 'd']
        })
      })
    })
  })

  // ===========================================
  // TEMPLATE LITERALS
  // ===========================================
  describe('Template Literals', () => {
    it('should interpolate expressions', () => {
      const name = 'Alice'
      const age = 25

      expect(`Hello, ${name}!`).toBe('Hello, Alice!')
      expect(`Age: ${age}`).toBe('Age: 25')
      expect(`Next year: ${age + 1}`).toBe('Next year: 26')
    })

    it('should support multi-line strings', () => {
      const multiLine = `line 1
line 2
line 3`

      expect(multiLine).toContain('line 1')
      expect(multiLine).toContain('\n')
      expect(multiLine.split('\n').length).toBe(3)
    })

    it('should work with tagged templates', () => {
      function upper(strings, ...values) {
        return strings.reduce((result, str, i) => {
          const value = values[i] ? values[i].toString().toUpperCase() : ''
          return result + str + value
        }, '')
      }

      const name = 'alice'
      expect(upper`Hello, ${name}!`).toBe('Hello, ALICE!')
    })
  })

  // ===========================================
  // OPTIONAL CHAINING
  // ===========================================
  describe('Optional Chaining', () => {
    it('should safely access nested properties', () => {
      const user = { name: 'Alice' }
      const userWithAddress = { name: 'Bob', address: { city: 'Portland' } }

      expect(user?.address?.city).toBe(undefined)
      expect(userWithAddress?.address?.city).toBe('Portland')
    })

    it('should short-circuit on null/undefined', () => {
      const user = null

      expect(user?.name).toBe(undefined)
      expect(user?.address?.city).toBe(undefined)
    })

    it('should work with bracket notation', () => {
      const user = { profile: { name: 'Alice' } }
      const prop = 'profile'

      expect(user?.[prop]?.name).toBe('Alice')
      expect(user?.['nonexistent']?.name).toBe(undefined)
    })

    it('should work with function calls', () => {
      const obj = {
        greet: () => 'Hello!'
      }

      expect(obj.greet?.()).toBe('Hello!')
      expect(obj.nonexistent?.()).toBe(undefined)
    })
  })

  // ===========================================
  // NULLISH COALESCING
  // ===========================================
  describe('Nullish Coalescing', () => {
    it('should return right side only for null/undefined', () => {
      expect(null ?? 'default').toBe('default')
      expect(undefined ?? 'default').toBe('default')
      expect(0 ?? 'default').toBe(0)
      expect('' ?? 'default').toBe('')
      expect(false ?? 'default').toBe(false)
      expect(NaN ?? 'default').toBeNaN()
    })

    it('should differ from logical OR', () => {
      // || returns right side for any falsy value
      expect(0 || 'default').toBe('default')
      expect('' || 'default').toBe('default')
      expect(false || 'default').toBe('default')

      // ?? only returns right side for null/undefined
      expect(0 ?? 'default').toBe(0)
      expect('' ?? 'default').toBe('')
      expect(false ?? 'default').toBe(false)
    })

    it('should combine with optional chaining', () => {
      const user = null

      expect(user?.name ?? 'Anonymous').toBe('Anonymous')
      
      const userWithName = { name: 'Alice' }
      expect(userWithName?.name ?? 'Anonymous').toBe('Alice')
    })
  })

  // ===========================================
  // LOGICAL ASSIGNMENT OPERATORS
  // ===========================================
  describe('Logical Assignment Operators', () => {
    it('should support nullish coalescing assignment (??=)', () => {
      let a = null
      let b = 'value'
      let c = 0

      a ??= 'default'
      b ??= 'default'
      c ??= 'default'

      expect(a).toBe('default')
      expect(b).toBe('value')
      expect(c).toBe(0)
    })

    it('should support logical OR assignment (||=)', () => {
      let a = null
      let b = 'value'
      let c = 0

      a ||= 'default'
      b ||= 'default'
      c ||= 'default'

      expect(a).toBe('default')
      expect(b).toBe('value')
      expect(c).toBe('default')  // 0 is falsy
    })

    it('should support logical AND assignment (&&=)', () => {
      let a = null
      let b = 'value'

      a &&= 'updated'
      b &&= 'updated'

      expect(a).toBe(null)      // null is falsy, so no assignment
      expect(b).toBe('updated') // 'value' is truthy, so assign
    })
  })

  // ===========================================
  // DEFAULT PARAMETERS
  // ===========================================
  describe('Default Parameters', () => {
    it('should provide default values', () => {
      function greet(name = 'Guest', greeting = 'Hello') {
        return `${greeting}, ${name}!`
      }

      expect(greet()).toBe('Hello, Guest!')
      expect(greet('Alice')).toBe('Hello, Alice!')
      expect(greet('Bob', 'Hi')).toBe('Hi, Bob!')
    })

    it('should only trigger on undefined, not null', () => {
      function example(value = 'default') {
        return value
      }

      expect(example(undefined)).toBe('default')
      expect(example(null)).toBe(null)
      expect(example(0)).toBe(0)
      expect(example('')).toBe('')
      expect(example(false)).toBe(false)
    })

    it('should allow earlier parameters as defaults', () => {
      function createRect(width, height = width) {
        return { width, height }
      }

      expect(createRect(10)).toEqual({ width: 10, height: 10 })
      expect(createRect(10, 20)).toEqual({ width: 10, height: 20 })
    })

    it('should evaluate default expressions each time', () => {
      let counter = 0
      function getDefault() { return ++counter }
      
      function example(value = getDefault()) {
        return value
      }

      expect(example()).toBe(1)
      expect(example()).toBe(2)
      expect(example()).toBe(3)
      expect(example(100)).toBe(100)  // getDefault not called
      expect(example()).toBe(4)
    })
  })

  // ===========================================
  // ENHANCED OBJECT LITERALS
  // ===========================================
  describe('Enhanced Object Literals', () => {
    it('should support property shorthand', () => {
      const name = 'Alice'
      const age = 25

      const user = { name, age }

      expect(user).toEqual({ name: 'Alice', age: 25 })
    })

    it('should support method shorthand', () => {
      const calculator = {
        add(a, b) { return a + b },
        subtract(a, b) { return a - b }
      }

      expect(calculator.add(5, 3)).toBe(8)
      expect(calculator.subtract(5, 3)).toBe(2)
    })

    it('should support computed property names', () => {
      const key = 'dynamicKey'
      const index = 0

      const obj = {
        [key]: 'value',
        [`item_${index}`]: 'first'
      }

      expect(obj.dynamicKey).toBe('value')
      expect(obj.item_0).toBe('first')
    })
  })

  // ===========================================
  // MAP, SET, AND SYMBOL
  // ===========================================
  describe('Map', () => {
    it('should store key-value pairs with any key type', () => {
      const map = new Map()
      const objKey = { id: 1 }

      map.set('string', 'value1')
      map.set(42, 'value2')
      map.set(objKey, 'value3')

      expect(map.get('string')).toBe('value1')
      expect(map.get(42)).toBe('value2')
      expect(map.get(objKey)).toBe('value3')
      expect(map.size).toBe(3)
    })

    it('should maintain insertion order', () => {
      const map = new Map([['c', 3], ['a', 1], ['b', 2]])
      const keys = [...map.keys()]

      expect(keys).toEqual(['c', 'a', 'b'])
    })

    it('should be iterable', () => {
      const map = new Map([['a', 1], ['b', 2]])
      const entries = []

      for (const [key, value] of map) {
        entries.push([key, value])
      }

      expect(entries).toEqual([['a', 1], ['b', 2]])
    })
  })

  describe('Set', () => {
    it('should store unique values', () => {
      const set = new Set([1, 2, 2, 3, 3, 3])

      expect(set.size).toBe(3)
      expect([...set]).toEqual([1, 2, 3])
    })

    it('should remove duplicates from arrays', () => {
      const numbers = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
      const unique = [...new Set(numbers)]

      expect(unique).toEqual([1, 2, 3, 4])
    })

    it('should support set operations', () => {
      const a = new Set([1, 2, 3])
      const b = new Set([2, 3, 4])

      const union = new Set([...a, ...b])
      const intersection = [...a].filter(x => b.has(x))
      const difference = [...a].filter(x => !b.has(x))

      expect([...union]).toEqual([1, 2, 3, 4])
      expect(intersection).toEqual([2, 3])
      expect(difference).toEqual([1])
    })
  })

  describe('Symbol', () => {
    it('should create unique values', () => {
      const sym1 = Symbol('description')
      const sym2 = Symbol('description')

      expect(sym1).not.toBe(sym2)
    })

    it('should work as object keys', () => {
      const ID = Symbol('id')
      const user = {
        name: 'Alice',
        [ID]: 12345
      }

      expect(user[ID]).toBe(12345)
      expect(Object.keys(user)).toEqual(['name'])  // Symbol not included
    })

    it('should support global registry with Symbol.for', () => {
      const sym1 = Symbol.for('shared')
      const sym2 = Symbol.for('shared')

      expect(sym1).toBe(sym2)
      expect(Symbol.keyFor(sym1)).toBe('shared')
    })
  })

  // ===========================================
  // FOR...OF LOOP
  // ===========================================
  describe('for...of Loop', () => {
    it('should iterate over array values', () => {
      const arr = ['a', 'b', 'c']
      const values = []

      for (const value of arr) {
        values.push(value)
      }

      expect(values).toEqual(['a', 'b', 'c'])
    })

    it('should iterate over string characters', () => {
      const chars = []

      for (const char of 'hello') {
        chars.push(char)
      }

      expect(chars).toEqual(['h', 'e', 'l', 'l', 'o'])
    })

    it('should iterate over Map entries', () => {
      const map = new Map([['a', 1], ['b', 2]])
      const entries = []

      for (const [key, value] of map) {
        entries.push({ key, value })
      }

      expect(entries).toEqual([
        { key: 'a', value: 1 },
        { key: 'b', value: 2 }
      ])
    })

    it('should iterate over Set values', () => {
      const set = new Set([1, 2, 3])
      const values = []

      for (const value of set) {
        values.push(value)
      }

      expect(values).toEqual([1, 2, 3])
    })

    it('should work with destructuring', () => {
      const users = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 }
      ]
      const names = []

      for (const { name } of users) {
        names.push(name)
      }

      expect(names).toEqual(['Alice', 'Bob'])
    })
  })
})
