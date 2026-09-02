import { describe, it, expect } from 'vitest'

describe('Equality and Type Checking', () => {
  describe('Three Equality Operators Overview', () => {
    it('should demonstrate different results for same comparison', () => {
      const num = 1
      const str = "1"

      expect(num == str).toBe(true) // coerces string to number
      expect(num === str).toBe(false) // different types
      expect(Object.is(num, str)).toBe(false) // different types
    })
  })

  describe('Loose Equality (==)', () => {
    describe('Same Type Comparison', () => {
      it('should compare directly when same type', () => {
        expect(5 == 5).toBe(true)
        expect("hello" == "hello").toBe(true)
      })
    })

    describe('null and undefined', () => {
      it('should return true for null == undefined', () => {
        expect(null == undefined).toBe(true)
        expect(undefined == null).toBe(true)
      })
    })

    describe('Number and String', () => {
      it('should convert string to number', () => {
        expect(5 == "5").toBe(true)
        expect(0 == "").toBe(true)
        expect(100 == "1e2").toBe(true)
      })

      it('should return false for different string comparison', () => {
        expect("" == "0").toBe(false) // Both strings, different values
      })

      it('should handle NaN conversions', () => {
        expect(NaN == "NaN").toBe(false) // NaN ≠ anything
        expect(0 == "hello").toBe(false) // "hello" → NaN
      })
    })

    describe('BigInt and String', () => {
      it('should convert string to BigInt', () => {
        expect(10n == "10").toBe(true)
      })
    })

    describe('Boolean Coercion', () => {
      it('should convert boolean to number first', () => {
        expect(true == 1).toBe(true)
        expect(false == 0).toBe(true)
        expect(true == "1").toBe(true)
        expect(false == "").toBe(true)
      })

      it('should demonstrate confusing boolean comparisons', () => {
        expect(true == "true").toBe(false) // true → 1, "true" → NaN
        expect(false == "false").toBe(false) // false → 0, "false" → NaN
        expect(true == 2).toBe(false) // true → 1, 1 ≠ 2
        expect(true == "2").toBe(false) // true → 1, "2" → 2
      })
    })

    describe('Object to Primitive', () => {
      it('should convert object via ToPrimitive', () => {
        expect([1] == 1).toBe(true) // [1] → "1" → 1
        expect([""] == 0).toBe(true) // [""] → "" → 0
      })
    })

    describe('BigInt and Number', () => {
      it('should compare mathematical values', () => {
        expect(10n == 10).toBe(true)
        expect(10n == 10.5).toBe(false)
      })
    })

    describe('Special Cases', () => {
      it('should return false for null/undefined vs other values', () => {
        expect(null == 0).toBe(false)
        expect(undefined == 0).toBe(false)
        expect(Symbol() == Symbol()).toBe(false)
      })
    })

    describe('Surprising Results', () => {
      describe('String and Number', () => {
        it('should demonstrate string to number conversions', () => {
          expect(1 == "1").toBe(true)
          expect(0 == "").toBe(true)
          expect(0 == "0").toBe(true)
          expect(100 == "1e2").toBe(true)
        })
      })

      describe('null and undefined', () => {
        it('should demonstrate special null/undefined behavior', () => {
          expect(null == undefined).toBe(true)
          expect(null == 0).toBe(false)
          expect(null == false).toBe(false)
          expect(null == "").toBe(false)
          expect(undefined == 0).toBe(false)
          expect(undefined == false).toBe(false)
        })

        it('should catch both null and undefined with == null', () => {
          function greet(name) {
            if (name == null) {
              return "Hello, stranger!"
            }
            return `Hello, ${name}!`
          }

          expect(greet(null)).toBe("Hello, stranger!")
          expect(greet(undefined)).toBe("Hello, stranger!")
          expect(greet("Alice")).toBe("Hello, Alice!")
          expect(greet("")).toBe("Hello, !")
          expect(greet(0)).toBe("Hello, 0!")
        })
      })

      describe('Arrays and Objects', () => {
        it('should convert arrays via ToPrimitive', () => {
          expect([] == false).toBe(true)
          expect([] == 0).toBe(true)
          expect([] == "").toBe(true)
          expect([1] == 1).toBe(true)
          expect([1] == "1").toBe(true)
          expect([1, 2] == "1,2").toBe(true)
        })

        it('should use valueOf on objects with custom valueOf', () => {
          let obj = { valueOf: () => 42 }
          expect(obj == 42).toBe(true)
        })
      })
    })

    describe('Step-by-Step Trace: [] == ![]', () => {
      it('should demonstrate [] == ![] is true', () => {
        // Step 1: Evaluate ![]
        // [] is truthy, so ![] = false
        const step1 = ![]
        expect(step1).toBe(false)

        // Step 2: Now we have [] == false
        // Boolean → Number: false → 0
        // [] == 0

        // Step 3: Object → Primitive
        // [].toString() → ""
        // "" == 0

        // Step 4: String → Number
        // "" → 0
        // 0 == 0 → true

        const emptyArray = []
        expect(emptyArray == step1).toBe(true)
      })
    })
  })

  describe('Strict Equality (===)', () => {
    describe('Type Check', () => {
      it('should return false for different types immediately', () => {
        expect(1 === "1").toBe(false)
        expect(true === 1).toBe(false)
        expect(null === undefined).toBe(false)
      })
    })

    describe('Number Comparison', () => {
      it('should compare numeric values', () => {
        expect(42 === 42).toBe(true)
        expect(Infinity === Infinity).toBe(true)
      })

      it('should return false for NaN === NaN', () => {
        expect(NaN === NaN).toBe(false)
      })

      it('should return true for +0 === -0', () => {
        expect(+0 === -0).toBe(true)
      })
    })

    describe('String Comparison', () => {
      it('should compare string characters', () => {
        expect("hello" === "hello").toBe(true)
        expect("hello" === "Hello").toBe(false) // Case sensitive
        expect("hello" === "hello ").toBe(false) // Different length
      })
    })

    describe('Boolean Comparison', () => {
      it('should compare boolean values', () => {
        expect(true === true).toBe(true)
        expect(false === false).toBe(true)
        expect(true === false).toBe(false)
      })
    })

    describe('BigInt Comparison', () => {
      it('should compare BigInt values', () => {
        expect(10n === 10n).toBe(true)
        expect(10n === 20n).toBe(false)
      })
    })

    describe('Symbol Comparison', () => {
      it('should return false for different symbols', () => {
        const sym = Symbol("id")
        expect(sym === sym).toBe(true)
        expect(Symbol("id") === Symbol("id")).toBe(false)
      })
    })

    describe('Object Comparison (Reference)', () => {
      it('should compare by reference, not value', () => {
        const obj = { a: 1 }
        expect(obj === obj).toBe(true)
        
        const obj1 = { a: 1 }
        const obj2 = { a: 1 }
        expect(obj1 === obj2).toBe(false) // Different objects!
      })

      it('should return false for different arrays', () => {
        const arr1 = [1, 2, 3]
        const arr2 = [1, 2, 3]
        const arr3 = arr1
        
        expect(arr1 === arr2).toBe(false)
        expect(arr1 === arr3).toBe(true)
      })

      it('should return false for different functions', () => {
        const fn1 = () => {}
        const fn2 = () => {}
        const fn3 = fn1

        expect(fn1 === fn2).toBe(false)
        expect(fn1 === fn3).toBe(true)
      })
    })

    describe('null and undefined', () => {
      it('should compare null and undefined correctly', () => {
        expect(null === null).toBe(true)
        expect(undefined === undefined).toBe(true)
        expect(null === undefined).toBe(false)
      })
    })

    describe('Predictable Results', () => {
      it('should return false for different types', () => {
        expect(1 === "1").toBe(false)
        expect(0 === "").toBe(false)
        expect(true === 1).toBe(false)
        expect(false === 0).toBe(false)
        expect(null === undefined).toBe(false)
      })

      it('should return true for same type and value', () => {
        expect(1 === 1).toBe(true)
        expect("hello" === "hello").toBe(true)
        expect(true === true).toBe(true)
        expect(null === null).toBe(true)
        expect(undefined === undefined).toBe(true)
      })
    })

    describe('Special Cases: NaN and ±0', () => {
      it('should demonstrate NaN !== NaN', () => {
        expect(NaN === NaN).toBe(false)
        expect(Number.isNaN(NaN)).toBe(true)
        expect(isNaN(NaN)).toBe(true)
        expect(isNaN("hello")).toBe(true) // Converts to NaN first
        expect(Number.isNaN("hello")).toBe(false) // No conversion
      })

      it('should demonstrate +0 === -0', () => {
        expect(+0 === -0).toBe(true)
        expect(1 / +0).toBe(Infinity)
        expect(1 / -0).toBe(-Infinity)
        expect(Object.is(+0, -0)).toBe(false)
      })

      it('should detect -0', () => {
        expect(0 * -1).toBe(-0)
        expect(Object.is(0 * -1, -0)).toBe(true)
      })
    })
  })

  describe('Object.is()', () => {
    describe('Comparison with ===', () => {
      it('should behave like === for most cases', () => {
        expect(Object.is(1, 1)).toBe(true)
        expect(Object.is("a", "a")).toBe(true)
        expect(Object.is(null, null)).toBe(true)
        
        const obj1 = {}
        const obj2 = {}
        expect(Object.is(obj1, obj2)).toBe(false)
      })
    })

    describe('NaN Equality', () => {
      it('should return true for NaN === NaN', () => {
        expect(Object.is(NaN, NaN)).toBe(true)
      })
    })

    describe('±0 Distinction', () => {
      it('should distinguish +0 from -0', () => {
        expect(Object.is(+0, -0)).toBe(false)
        expect(Object.is(-0, 0)).toBe(false)
      })
    })

    describe('Practical Uses', () => {
      it('should check for NaN', () => {
        function isReallyNaN(value) {
          return Object.is(value, NaN)
        }
        expect(isReallyNaN(NaN)).toBe(true)
        expect(isReallyNaN("hello")).toBe(false)
      })

      it('should check for negative zero', () => {
        function isNegativeZero(value) {
          return Object.is(value, -0)
        }
        expect(isNegativeZero(-0)).toBe(true)
        expect(isNegativeZero(0)).toBe(false)
      })
    })

    describe('Complete Comparison Table', () => {
      it('should show differences between ==, ===, and Object.is()', () => {
        // 1, "1"
        expect(1 == "1").toBe(true)
        expect(1 === "1").toBe(false)
        expect(Object.is(1, "1")).toBe(false)

        // 0, false
        expect(0 == false).toBe(true)
        expect(0 === false).toBe(false)
        expect(Object.is(0, false)).toBe(false)

        // null, undefined
        expect(null == undefined).toBe(true)
        expect(null === undefined).toBe(false)
        expect(Object.is(null, undefined)).toBe(false)

        // NaN, NaN
        expect(NaN == NaN).toBe(false)
        expect(NaN === NaN).toBe(false)
        expect(Object.is(NaN, NaN)).toBe(true)

        // +0, -0
        expect(+0 == -0).toBe(true)
        expect(+0 === -0).toBe(true)
        expect(Object.is(+0, -0)).toBe(false)
      })
    })
  })

  describe('typeof Operator', () => {
    describe('Correct Results', () => {
      it('should return correct types for primitives', () => {
        expect(typeof "hello").toBe("string")
        expect(typeof 42).toBe("number")
        expect(typeof 42n).toBe("bigint")
        expect(typeof true).toBe("boolean")
        expect(typeof undefined).toBe("undefined")
        expect(typeof Symbol()).toBe("symbol")
      })

      it('should return "object" for objects and arrays', () => {
        expect(typeof {}).toBe("object")
        expect(typeof []).toBe("object")
        expect(typeof new Date()).toBe("object")
        expect(typeof /regex/).toBe("object")
      })

      it('should return "function" for functions', () => {
        expect(typeof function(){}).toBe("function")
        expect(typeof (() => {})).toBe("function")
        expect(typeof class {}).toBe("function")
        expect(typeof Math.sin).toBe("function")
      })
    })

    describe('Famous Quirks', () => {
      it('should return "object" for null (bug)', () => {
        expect(typeof null).toBe("object")
      })

      it('should return "object" for arrays', () => {
        expect(typeof []).toBe("object")
        expect(typeof [1, 2, 3]).toBe("object")
        expect(typeof new Array()).toBe("object")
      })

      it('should return "number" for NaN', () => {
        expect(typeof NaN).toBe("number")
      })

      it('should return "undefined" for undeclared variables', () => {
        expect(typeof undeclaredVariable).toBe("undefined")
      })
    })

    describe('Workarounds', () => {
      it('should check for null explicitly', () => {
        function getType(value) {
          if (value === null) return "null"
          return typeof value
        }

        expect(getType(null)).toBe("null")
        expect(getType(undefined)).toBe("undefined")
        expect(getType(42)).toBe("number")
      })

      it('should check for "real" objects', () => {
        function isRealObject(value) {
          return value !== null && typeof value === "object"
        }

        expect(isRealObject({})).toBe(true)
        expect(isRealObject([])).toBe(true)
        expect(isRealObject(null)).toBe(false)
      })
    })
  })

  describe('Better Type Checking Alternatives', () => {
    describe('Type-Specific Checks', () => {
      it('should use Array.isArray for arrays', () => {
        expect(Array.isArray([])).toBe(true)
        expect(Array.isArray([1, 2, 3])).toBe(true)
        expect(Array.isArray({})).toBe(false)
        expect(Array.isArray("hello")).toBe(false)
        expect(Array.isArray(null)).toBe(false)
      })

      it('should use Number.isNaN for NaN', () => {
        expect(Number.isNaN(NaN)).toBe(true)
        expect(Number.isNaN("hello")).toBe(false)
        expect(Number.isNaN(undefined)).toBe(false)
      })

      it('should use Number.isFinite for finite numbers', () => {
        expect(Number.isFinite(42)).toBe(true)
        expect(Number.isFinite(Infinity)).toBe(false)
        expect(Number.isFinite(NaN)).toBe(false)
      })

      it('should use Number.isInteger for integers', () => {
        expect(Number.isInteger(42)).toBe(true)
        expect(Number.isInteger(42.5)).toBe(false)
      })
    })

    describe('instanceof', () => {
      it('should check instance of constructor', () => {
        expect([] instanceof Array).toBe(true)
        expect({} instanceof Object).toBe(true)
        expect(new Date() instanceof Date).toBe(true)
        expect(/regex/ instanceof RegExp).toBe(true)
      })

      it('should work with custom classes', () => {
        class Person {}
        const p = new Person()
        expect(p instanceof Person).toBe(true)
      })
    })

    describe('Object.prototype.toString', () => {
      it('should return precise type information', () => {
        const getType = (value) => 
          Object.prototype.toString.call(value).slice(8, -1)

        expect(getType(null)).toBe("Null")
        expect(getType(undefined)).toBe("Undefined")
        expect(getType([])).toBe("Array")
        expect(getType({})).toBe("Object")
        expect(getType(new Date())).toBe("Date")
        expect(getType(/regex/)).toBe("RegExp")
        expect(getType(new Map())).toBe("Map")
        expect(getType(new Set())).toBe("Set")
        expect(getType(Promise.resolve())).toBe("Promise")
        expect(getType(function(){})).toBe("Function")
        expect(getType(42)).toBe("Number")
        expect(getType("hello")).toBe("String")
        expect(getType(Symbol())).toBe("Symbol")
        expect(getType(42n)).toBe("BigInt")
      })
    })

    describe('Custom Type Checker', () => {
      it('should create comprehensive type checker', () => {
        function getType(value) {
          if (value === null) return "null"
          
          const type = typeof value
          if (type !== "object" && type !== "function") {
            return type
          }
          
          const tag = Object.prototype.toString.call(value)
          return tag.slice(8, -1).toLowerCase()
        }

        expect(getType(null)).toBe("null")
        expect(getType([])).toBe("array")
        expect(getType({})).toBe("object")
        expect(getType(new Date())).toBe("date")
        expect(getType(/regex/)).toBe("regexp")
        expect(getType(new Map())).toBe("map")
        expect(getType(Promise.resolve())).toBe("promise")
      })
    })
  })

  describe('Common Gotchas and Mistakes', () => {
    describe('Comparing Objects by Value', () => {
      it('should demonstrate object reference comparison', () => {
        const user1 = { name: "Alice" }
        const user2 = { name: "Alice" }

        expect(user1 === user2).toBe(false) // Never runs as equal!

        // Option 1: Compare specific properties
        expect(user1.name === user2.name).toBe(true)

        // Option 2: JSON.stringify
        expect(JSON.stringify(user1) === JSON.stringify(user2)).toBe(true)
      })
    })

    describe('NaN Comparisons', () => {
      it('should never use === for NaN', () => {
        const result = parseInt("hello")
        
        expect(result === NaN).toBe(false) // Never works!
        expect(Number.isNaN(result)).toBe(true) // Correct way
        expect(Object.is(result, NaN)).toBe(true) // Also works
      })
    })

    describe('typeof null Trap', () => {
      it('should handle null separately from objects', () => {
        function processObject(obj) {
          if (obj !== null && typeof obj === "object") {
            return "real object"
          }
          return "not an object"
        }

        expect(processObject({})).toBe("real object")
        expect(processObject(null)).toBe("not an object")
      })
    })

    describe('String Comparison Gotchas', () => {
      it('should demonstrate string comparison issues', () => {
        // Strings compare lexicographically
        expect("10" > "9").toBe(false) // "1" < "9"

        // Convert to numbers for numeric comparison
        expect(Number("10") > Number("9")).toBe(true)
        expect(+"10" > +"9").toBe(true)
      })
    })

    describe('Empty Array Comparisons', () => {
      it('should demonstrate array truthiness vs equality', () => {
        const arr = []

        // These seem contradictory
        expect(arr == false).toBe(true)
        expect(arr ? true : false).toBe(true) // arr is truthy!

        // Check array length instead
        expect(arr.length === 0).toBe(true)
        expect(!arr.length).toBe(true)
      })
    })
  })

  describe('Decision Guide', () => {
    describe('Default to ===', () => {
      it('should use === for predictable comparisons', () => {
        expect(5 === 5).toBe(true)
        expect(5 === "5").toBe(false) // No surprise
      })
    })

    describe('Use == null for Nullish Checks', () => {
      it('should check for null or undefined', () => {
        function isNullish(value) {
          return value == null
        }

        expect(isNullish(null)).toBe(true)
        expect(isNullish(undefined)).toBe(true)
        expect(isNullish(0)).toBe(false)
        expect(isNullish("")).toBe(false)
        expect(isNullish(false)).toBe(false)
      })
    })

    describe('Use Number.isNaN for NaN', () => {
      it('should use Number.isNaN, not isNaN', () => {
        expect(Number.isNaN(NaN)).toBe(true)
        expect(Number.isNaN("hello")).toBe(false) // Correct
        expect(isNaN("hello")).toBe(true) // Wrong!
      })
    })

    describe('Use Array.isArray for Arrays', () => {
      it('should use Array.isArray, not typeof', () => {
        expect(Array.isArray([])).toBe(true)
        expect(typeof []).toBe("object") // Not helpful
      })
    })

    describe('Use Object.is for Edge Cases', () => {
      it('should use Object.is for NaN and ±0', () => {
        expect(Object.is(NaN, NaN)).toBe(true)
        expect(Object.is(+0, -0)).toBe(false)
      })
    })
  })

  describe('Additional Missing Examples', () => {
    describe('More Loose Equality Examples', () => {
      it('should coerce 42 == "42" to true', () => {
        expect(42 == "42").toBe(true)
      })

      it('should return false for undefined == ""', () => {
        expect(undefined == "").toBe(false)
      })
    })

    describe('More Strict Equality Examples', () => {
      it('should return false for array === string', () => {
        const arr = []
        const str = ""
        expect(arr === str).toBe(false)
      })

      it('should demonstrate -0 === 0 is true', () => {
        expect(-0 === 0).toBe(true)
        expect(0 === -0).toBe(true)
      })
    })

    describe('Negative Zero Edge Cases', () => {
      it('should demonstrate 1/+0 vs 1/-0', () => {
        expect(1 / +0).toBe(Infinity)
        expect(1 / -0).toBe(-Infinity)
        expect((1 / +0) === (1 / -0)).toBe(false)
      })

      it('should demonstrate Math.sign with -0', () => {
        expect(Object.is(Math.sign(-0), -0)).toBe(true)
        expect(Math.sign(-0) === 0).toBe(true) // But === says it equals 0
      })

      it('should parse -0 from JSON', () => {
        const negZero = JSON.parse("-0")
        expect(Object.is(negZero, -0)).toBe(true)
      })

      it('should create -0 through multiplication', () => {
        expect(Object.is(0 * -1, -0)).toBe(true)
        expect(Object.is(-0 * 1, -0)).toBe(true)
      })
    })

    describe('Map with NaN as Key', () => {
      it('should use NaN as a Map key', () => {
        const map = new Map()
        
        map.set(NaN, "value for NaN")
        
        // Map uses SameValueZero algorithm, which treats NaN === NaN
        expect(map.get(NaN)).toBe("value for NaN")
        expect(map.has(NaN)).toBe(true)
      })

      it('should only have one NaN key despite multiple sets', () => {
        const map = new Map()
        
        map.set(NaN, "first")
        map.set(NaN, "second")
        
        expect(map.size).toBe(1)
        expect(map.get(NaN)).toBe("second")
      })
    })

    describe('Number.isSafeInteger', () => {
      it('should identify safe integers', () => {
        expect(Number.isSafeInteger(3)).toBe(true)
        expect(Number.isSafeInteger(-3)).toBe(true)
        expect(Number.isSafeInteger(0)).toBe(true)
        expect(Number.isSafeInteger(Number.MAX_SAFE_INTEGER)).toBe(true)
        expect(Number.isSafeInteger(Number.MIN_SAFE_INTEGER)).toBe(true)
      })

      it('should return false for unsafe integers', () => {
        expect(Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1)).toBe(false)
        expect(Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1)).toBe(false)
      })

      it('should return false for non-integers', () => {
        expect(Number.isSafeInteger(3.1)).toBe(false)
        expect(Number.isSafeInteger(NaN)).toBe(false)
        expect(Number.isSafeInteger(Infinity)).toBe(false)
        expect(Number.isSafeInteger("3")).toBe(false)
      })
    })

    describe('NaN Creation Examples', () => {
      it('should create NaN from 0/0', () => {
        expect(Number.isNaN(0 / 0)).toBe(true)
      })

      it('should create NaN from Math.sqrt(-1)', () => {
        expect(Number.isNaN(Math.sqrt(-1))).toBe(true)
      })

      it('should create NaN from invalid math operations', () => {
        expect(Number.isNaN(Infinity - Infinity)).toBe(true)
        expect(Number.isNaN(Infinity / Infinity)).toBe(true)
        expect(Number.isNaN(0 * Infinity)).toBe(true)
      })
    })

    describe('Sorting Array of Number Strings', () => {
      it('should sort incorrectly with default sort', () => {
        const arr = ["10", "9", "2", "1", "100"]
        const sorted = [...arr].sort()

        // Lexicographic sort - NOT numeric order!
        expect(sorted).toEqual(["1", "10", "100", "2", "9"])
      })

      it('should sort correctly with numeric comparison', () => {
        const arr = ["10", "9", "2", "1", "100"]
        const sorted = [...arr].sort((a, b) => Number(a) - Number(b))

        expect(sorted).toEqual(["1", "2", "9", "10", "100"])
      })

      it('should sort correctly using + for conversion', () => {
        const arr = ["10", "9", "2", "1", "100"]
        const sorted = [...arr].sort((a, b) => +a - +b)

        expect(sorted).toEqual(["1", "2", "9", "10", "100"])
      })
    })
  })
})
