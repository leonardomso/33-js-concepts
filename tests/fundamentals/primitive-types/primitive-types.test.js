import { describe, it, expect } from 'vitest'

describe('Primitive Types', () => {
  describe('String', () => {
    it('should create strings with single quotes, double quotes, and backticks', () => {
      let single = 'Hello'
      let double = "World"
      let backtick = `Hello World`

      expect(single).toBe('Hello')
      expect(double).toBe('World')
      expect(backtick).toBe('Hello World')
    })

    it('should support template literal interpolation', () => {
      let name = "Alice"
      let age = 25

      let greeting = `Hello, ${name}! You are ${age} years old.`
      expect(greeting).toBe("Hello, Alice! You are 25 years old.")
    })

    it('should support multi-line strings with template literals', () => {
      let multiLine = `
  This is line 1
  This is line 2
`
      expect(multiLine).toContain('This is line 1')
      expect(multiLine).toContain('This is line 2')
    })

    it('should demonstrate string immutability - cannot change characters', () => {
      let str = "hello"
      // In strict mode, this throws TypeError
      // In non-strict mode, it silently fails
      expect(() => {
        "use strict"
        str[0] = "H"
      }).toThrow(TypeError)
      expect(str).toBe("hello") // Still "hello"
    })

    it('should create new string when "changing" with concatenation', () => {
      let str = "hello"
      str = "H" + str.slice(1)
      expect(str).toBe("Hello")
    })

    it('should not modify original string with toUpperCase', () => {
      let name = "Alice"
      name.toUpperCase() // Creates "ALICE" but doesn't change 'name'
      expect(name).toBe("Alice") // Still "Alice"
    })
  })

  describe('Number', () => {
    it('should handle integers, decimals, negatives, and scientific notation', () => {
      let integer = 42
      let decimal = 3.14
      let negative = -10
      let scientific = 2.5e6

      expect(integer).toBe(42)
      expect(decimal).toBe(3.14)
      expect(negative).toBe(-10)
      expect(scientific).toBe(2500000)
    })

    it('should return Infinity for division by zero', () => {
      expect(1 / 0).toBe(Infinity)
      expect(-1 / 0).toBe(-Infinity)
    })

    it('should return NaN for invalid operations', () => {
      expect(Number.isNaN("hello" * 2)).toBe(true)
    })

    it('should demonstrate floating-point precision problem', () => {
      expect(0.1 + 0.2).not.toBe(0.3)
      expect(0.1 + 0.2).toBeCloseTo(0.3)
      expect(0.1 + 0.2 === 0.3).toBe(false)
    })

    it('should have MAX_SAFE_INTEGER and MIN_SAFE_INTEGER', () => {
      expect(Number.MAX_SAFE_INTEGER).toBe(9007199254740991)
      expect(Number.MIN_SAFE_INTEGER).toBe(-9007199254740991)
    })

    it('should lose precision beyond safe integer range', () => {
      // This demonstrates the precision loss
      expect(9007199254740992 === 9007199254740993).toBe(true) // Wrong but expected
    })
  })

  describe('BigInt', () => {
    it('should create BigInt with n suffix', () => {
      let big = 9007199254740993n
      expect(big).toBe(9007199254740993n)
    })

    it('should create BigInt from string', () => {
      let alsoBig = BigInt("9007199254740993")
      expect(alsoBig).toBe(9007199254740993n)
    })

    it('should perform accurate math with BigInt', () => {
      let big = 9007199254740993n
      expect(big + 1n).toBe(9007199254740994n)
    })

    it('should require explicit conversion between BigInt and Number', () => {
      let big = 10n
      let regular = 5

      expect(big + BigInt(regular)).toBe(15n)
      expect(Number(big) + regular).toBe(15)
    })

    it('should throw TypeError when mixing BigInt and Number without conversion', () => {
      let big = 10n
      let regular = 5

      expect(() => big + regular).toThrow(TypeError)
    })
  })

  describe('Boolean', () => {
    it('should have only two values: true and false', () => {
      let isLoggedIn = true
      let hasPermission = false

      expect(isLoggedIn).toBe(true)
      expect(hasPermission).toBe(false)
    })

    it('should create boolean from comparisons', () => {
      let age = 25
      let name = "Alice"

      let isAdult = age >= 18
      let isEqual = name === "Alice"

      expect(isAdult).toBe(true)
      expect(isEqual).toBe(true)
    })

    describe('Falsy Values', () => {
      it('should identify all 8 falsy values', () => {
        expect(Boolean(false)).toBe(false)
        expect(Boolean(0)).toBe(false)
        expect(Boolean(-0)).toBe(false)
        expect(Boolean(0n)).toBe(false)
        expect(Boolean("")).toBe(false)
        expect(Boolean(null)).toBe(false)
        expect(Boolean(undefined)).toBe(false)
        expect(Boolean(NaN)).toBe(false)
      })
    })

    describe('Truthy Values', () => {
      it('should identify truthy values including surprises', () => {
        expect(Boolean(true)).toBe(true)
        expect(Boolean(1)).toBe(true)
        expect(Boolean(-1)).toBe(true)
        expect(Boolean("hello")).toBe(true)
        expect(Boolean("0")).toBe(true) // Non-empty string is truthy!
        expect(Boolean("false")).toBe(true) // Non-empty string is truthy!
        expect(Boolean([])).toBe(true) // Empty array is truthy!
        expect(Boolean({})).toBe(true) // Empty object is truthy!
        expect(Boolean(function(){})).toBe(true)
        expect(Boolean(Infinity)).toBe(true)
        expect(Boolean(-Infinity)).toBe(true)
      })
    })

    it('should convert to boolean using Boolean() and double negation', () => {
      let value = "hello"
      let bool = Boolean(value)
      let shortcut = !!value

      expect(bool).toBe(true)
      expect(shortcut).toBe(true)
    })
  })

  describe('undefined', () => {
    it('should be the default value for uninitialized variables', () => {
      let x
      expect(x).toBe(undefined)
    })

    it('should be the value for missing function parameters', () => {
      function greet(name) {
        return name
      }
      expect(greet()).toBe(undefined)
    })

    it('should be the return value of functions without return statement', () => {
      function doNothing() {
        // no return
      }
      expect(doNothing()).toBe(undefined)
    })

    it('should be the value for non-existent object properties', () => {
      let person = { name: "Alice" }
      expect(person.age).toBe(undefined)
    })
  })

  describe('null', () => {
    it('should represent intentional absence of value', () => {
      let user = { name: "Alice" }
      user = null
      expect(user).toBe(null)
    })

    it('should be used to indicate no result from functions', () => {
      function findUser(id) {
        // Simulating user not found
        return null
      }
      expect(findUser(999)).toBe(null)
    })

    it('should have typeof return "object" (famous bug)', () => {
      expect(typeof null).toBe("object")
    })

    it('should be checked with strict equality', () => {
      let value = null
      expect(value === null).toBe(true)
    })
  })

  describe('Symbol', () => {
    it('should create unique symbols even with same description', () => {
      let id1 = Symbol("id")
      let id2 = Symbol("id")

      expect(id1 === id2).toBe(false)
    })

    it('should have accessible description', () => {
      let id1 = Symbol("id")
      expect(id1.description).toBe("id")
    })

    it('should work as unique object keys', () => {
      const ID = Symbol("id")
      const user = {
        name: "Alice",
        [ID]: 12345
      }

      expect(user.name).toBe("Alice")
      expect(user[ID]).toBe(12345)
    })

    it('should not appear in Object.keys', () => {
      const ID = Symbol("id")
      const user = {
        name: "Alice",
        [ID]: 12345
      }

      expect(Object.keys(user)).toEqual(["name"])
    })
  })

  describe('typeof Operator', () => {
    it('should return correct types for primitives', () => {
      expect(typeof "hello").toBe("string")
      expect(typeof 42).toBe("number")
      expect(typeof 42n).toBe("bigint")
      expect(typeof true).toBe("boolean")
      expect(typeof undefined).toBe("undefined")
      expect(typeof Symbol()).toBe("symbol")
    })

    it('should return "object" for null (bug)', () => {
      expect(typeof null).toBe("object")
    })

    it('should return "object" for objects and arrays', () => {
      expect(typeof {}).toBe("object")
      expect(typeof []).toBe("object")
    })

    it('should return "function" for functions', () => {
      expect(typeof function(){}).toBe("function")
    })
  })

  describe('Immutability', () => {
    it('should not modify original string with methods', () => {
      let str = "hello"

      str.toUpperCase() // Returns "HELLO"
      expect(str).toBe("hello") // Still "hello"!
    })

    it('should require reassignment to capture new value', () => {
      let str = "hello"
      str = str.toUpperCase()
      expect(str).toBe("HELLO")
    })
  })

  describe('const vs Immutability', () => {
    it('should prevent reassignment with const', () => {
      const name = "Alice"
      // name = "Bob" would throw TypeError
      expect(name).toBe("Alice")
    })

    it('should allow mutation of const objects', () => {
      const person = { name: "Alice" }
      person.name = "Bob" // Works!
      person.age = 25 // Works!

      expect(person.name).toBe("Bob")
      expect(person.age).toBe(25)
    })

    it('should demonstrate primitives are immutable regardless of const/let', () => {
      let str = "hello"
      // In strict mode (which Vitest uses), this throws TypeError
      // In non-strict mode, it silently fails
      expect(() => {
        str[0] = "H"
      }).toThrow(TypeError)
      expect(str).toBe("hello")
    })
  })

  describe('Autoboxing', () => {
    it('should allow calling methods on primitive strings', () => {
      expect("hello".toUpperCase()).toBe("HELLO")
    })

    it('should not modify the original primitive when calling methods', () => {
      let str = "hello"
      str.toUpperCase()
      expect(str).toBe("hello")
    })

    it('should demonstrate wrapper objects are different from primitives', () => {
      let strObj = new String("hello")
      expect(typeof strObj).toBe("object") // Not "string"!
      expect(strObj === "hello").toBe(false) // Object vs primitive
    })

    it('should create primitive strings, not wrapper objects', () => {
      let str = "hello"
      expect(typeof str).toBe("string")
    })
  })

  describe('null vs undefined Comparison', () => {
    it('should show loose equality between null and undefined', () => {
      expect(null == undefined).toBe(true)
    })

    it('should show strict inequality between null and undefined', () => {
      expect(null === undefined).toBe(false)
    })

    it('should demonstrate checking for nullish values', () => {
      let value = null
      expect(value == null).toBe(true)
      
      value = undefined
      expect(value == null).toBe(true)
    })

    it('should check for specific null', () => {
      let value = null
      expect(value === null).toBe(true)
    })

    it('should check for specific undefined', () => {
      let value = undefined
      expect(value === undefined).toBe(true)
    })

    it('should check for "has a value" (not null/undefined)', () => {
      let value = "hello"
      expect(value != null).toBe(true)
      
      value = 0 // 0 is a value, not nullish
      expect(value != null).toBe(true)
    })
  })

  describe('JavaScript Quirks', () => {
    it('should demonstrate NaN is not equal to itself', () => {
      expect(NaN === NaN).toBe(false)
      expect(NaN !== NaN).toBe(true)
    })

    it('should use Number.isNaN to check for NaN', () => {
      expect(Number.isNaN(NaN)).toBe(true)
      expect(Number.isNaN("hello")).toBe(false)
      expect(isNaN("hello")).toBe(true) // Has quirks
    })

    it('should demonstrate empty string is falsy but whitespace is truthy', () => {
      expect(Boolean("")).toBe(false)
      expect(Boolean(" ")).toBe(true)
      expect(Boolean("0")).toBe(true)
    })

    it('should demonstrate + operator string concatenation', () => {
      expect(1 + 2).toBe(3)
      expect("1" + "2").toBe("12")
      expect(1 + "2").toBe("12")
      expect("1" + 2).toBe("12")
      expect(1 + 2 + "3").toBe("33")
      expect("1" + 2 + 3).toBe("123")
    })

    it('should force number addition with explicit conversion', () => {
      expect(Number("1") + Number("2")).toBe(3)
      expect(parseInt("1") + parseInt("2")).toBe(3)
    })

    it('should force string concatenation with explicit conversion', () => {
      expect(String(1) + String(2)).toBe("12")
      expect(`${1}${2}`).toBe("12")
    })
  })

  describe('Type Checking Best Practices', () => {
    it('should check for null explicitly', () => {
      let value = null
      expect(value === null).toBe(true)
    })

    it('should use Array.isArray for arrays', () => {
      expect(Array.isArray([1, 2, 3])).toBe(true)
      expect(Array.isArray("hello")).toBe(false)
    })

    it('should use Object.prototype.toString for precise type', () => {
      expect(Object.prototype.toString.call(null)).toBe("[object Null]")
      expect(Object.prototype.toString.call([])).toBe("[object Array]")
      expect(Object.prototype.toString.call(new Date())).toBe("[object Date]")
    })
  })

  describe('Intl.NumberFormat for Currency', () => {
    it('should format currency correctly with Intl.NumberFormat', () => {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      })

      expect(formatter.format(0.30)).toBe("$0.30")
      expect(formatter.format(19.99)).toBe("$19.99")
      expect(formatter.format(1000)).toBe("$1,000.00")
    })

    it('should handle different locales', () => {
      const euroFormatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
      })

      // German locale uses comma for decimal and period for thousands
      expect(euroFormatter.format(1234.56)).toContain("1.234,56")
    })
  })

  describe('Floating-Point Solutions', () => {
    it('should use Number.EPSILON for floating-point comparison', () => {
      const result = 0.1 + 0.2
      const expected = 0.3

      // Using epsilon comparison for floating-point
      expect(Math.abs(result - expected) < Number.EPSILON).toBe(true)
    })

    it('should use toFixed for rounding display', () => {
      expect((0.1 + 0.2).toFixed(2)).toBe("0.30")
      expect((0.1 + 0.2).toFixed(1)).toBe("0.3")
    })

    it('should use integers (cents) for precise money calculations', () => {
      // Instead of 0.1 + 0.2, use cents
      const price1 = 10 // 10 cents
      const price2 = 20 // 20 cents
      const total = price1 + price2

      expect(total).toBe(30) // Exactly 30 cents
      expect(total / 100).toBe(0.3) // $0.30
    })
  })

  describe('Array Holes', () => {
    it('should return undefined for array holes', () => {
      let arr = [1, , 3] // Sparse array with hole at index 1

      expect(arr[0]).toBe(1)
      expect(arr[1]).toBe(undefined)
      expect(arr[2]).toBe(3)
      expect(arr.length).toBe(3)
    })

    it('should skip holes in forEach but include in map', () => {
      let arr = [1, , 3]
      let forEachCount = 0
      let mapResult

      arr.forEach(() => forEachCount++)
      mapResult = arr.map(x => x * 2)

      expect(forEachCount).toBe(2) // Holes are skipped
      expect(mapResult).toEqual([2, undefined, 6]) // Hole becomes undefined in map result
    })
  })

  describe('String Trim for Empty/Whitespace Check', () => {
    it('should use trim to check for empty or whitespace-only strings', () => {
      expect("".trim() === "").toBe(true)
      expect("   ".trim() === "").toBe(true)
      expect("\t\n".trim() === "").toBe(true)
      expect("hello".trim() === "").toBe(false)
      expect("  hello  ".trim() === "").toBe(false)
    })

    it('should use trim with length check for validation', () => {
      function isEmptyOrWhitespace(str) {
        return str.trim().length === 0
      }

      expect(isEmptyOrWhitespace("")).toBe(true)
      expect(isEmptyOrWhitespace("   ")).toBe(true)
      expect(isEmptyOrWhitespace("hello")).toBe(false)
    })
  })

  describe('null vs undefined Patterns', () => {
    it('should demonstrate clearing with null vs undefined', () => {
      let user = { name: "Alice" }
      
      // Clear intentionally with null
      user = null
      expect(user).toBe(null)
    })

    it('should show function returning null for no result', () => {
      function findUser(id) {
        const users = [{ id: 1, name: "Alice" }]
        return users.find(u => u.id === id) || null
      }

      expect(findUser(1)).toEqual({ id: 1, name: "Alice" })
      expect(findUser(999)).toBe(null)
    })
  })
})
