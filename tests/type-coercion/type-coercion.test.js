import { describe, it, expect } from 'vitest'

describe('Type Coercion', () => {
  describe('Explicit vs Implicit Coercion', () => {
    describe('Explicit Coercion', () => {
      it('should convert to number explicitly', () => {
        expect(Number("42")).toBe(42)
        expect(parseInt("42px")).toBe(42)
        expect(parseFloat("3.14")).toBe(3.14)
      })

      it('should convert to string explicitly', () => {
        expect(String(42)).toBe("42")
        expect((123).toString()).toBe("123")
      })

      it('should convert to boolean explicitly', () => {
        expect(Boolean(1)).toBe(true)
        expect(Boolean(0)).toBe(false)
      })
    })

    describe('Implicit Coercion', () => {
      it('should demonstrate implicit string coercion with +', () => {
        expect("5" + 3).toBe("53")
        expect("5" - 3).toBe(2)
      })

      it('should demonstrate implicit boolean coercion in conditions', () => {
        let result = null
        if ("hello") {
          result = "truthy"
        }
        expect(result).toBe("truthy")
      })

      it('should demonstrate loose equality coercion', () => {
        expect(5 == "5").toBe(true)
      })
    })
  })

  describe('String Conversion', () => {
    it('should convert various types to string explicitly', () => {
      expect(String(123)).toBe("123")
      expect(String(true)).toBe("true")
      expect(String(false)).toBe("false")
      expect(String(null)).toBe("null")
      expect(String(undefined)).toBe("undefined")
    })

    it('should convert to string implicitly with + and empty string', () => {
      expect(123 + "").toBe("123")
      expect(`Value: ${123}`).toBe("Value: 123")
      expect("Hello " + 123).toBe("Hello 123")
    })

    it('should convert arrays to comma-separated strings', () => {
      expect([1, 2, 3].toString()).toBe("1,2,3")
      expect([1, 2, 3] + "").toBe("1,2,3")
      expect([].toString()).toBe("")
    })

    it('should convert objects to [object Object]', () => {
      expect({}.toString()).toBe("[object Object]")
      expect({} + "").toBe("[object Object]")
    })

    describe('The + Operator Split Personality', () => {
      it('should add two numbers', () => {
        expect(5 + 3).toBe(8)
      })

      it('should concatenate with any string involved', () => {
        expect("5" + 3).toBe("53")
        expect(5 + "3").toBe("53")
        expect("Hello" + " World").toBe("Hello World")
      })

      it('should evaluate left to right with multiple operands', () => {
        expect(1 + 2 + "3").toBe("33") // (1+2)=3, then 3+"3"="33"
        expect("1" + 2 + 3).toBe("123") // all become strings left-to-right
      })
    })

    describe('User Input Gotcha', () => {
      it('should demonstrate string concatenation instead of addition', () => {
        const userInput = "5"
        const wrongResult = userInput + 10
        expect(wrongResult).toBe("510")

        const correctResult = Number(userInput) + 10
        expect(correctResult).toBe(15)
      })
    })
  })

  describe('Number Conversion', () => {
    it('should convert strings to numbers', () => {
      expect(Number("42")).toBe(42)
      expect(Number("  123  ")).toBe(123) // Whitespace trimmed
      expect(Number.isNaN(Number("123abc"))).toBe(true) // NaN
      expect(Number("")).toBe(0) // Empty string → 0
      expect(Number("  ")).toBe(0) // Whitespace-only → 0
    })

    it('should convert booleans to numbers', () => {
      expect(Number(true)).toBe(1)
      expect(Number(false)).toBe(0)
    })

    it('should demonstrate null vs undefined conversion difference', () => {
      expect(Number(null)).toBe(0)
      expect(Number.isNaN(Number(undefined))).toBe(true)
      expect(null + 5).toBe(5)
      expect(Number.isNaN(undefined + 5)).toBe(true)
    })

    it('should convert arrays to numbers', () => {
      expect(Number([])).toBe(0) // [] → "" → 0
      expect(Number([1])).toBe(1) // [1] → "1" → 1
      expect(Number.isNaN(Number([1, 2]))).toBe(true) // [1,2] → "1,2" → NaN
    })

    it('should return NaN for objects', () => {
      expect(Number.isNaN(Number({}))).toBe(true)
    })

    describe('Math Operators Always Convert to Numbers', () => {
      it('should convert operands to numbers for -, *, /, %', () => {
        expect("6" - "2").toBe(4)
        expect("6" * "2").toBe(12)
        expect("6" / "2").toBe(3)
        expect("10" % "3").toBe(1)
      })

      it('should show why - and + behave differently', () => {
        expect("5" + 3).toBe("53") // concatenation
        expect("5" - 3).toBe(2) // math
      })
    })

    describe('Unary + Trick', () => {
      it('should convert to number with unary +', () => {
        expect(+"42").toBe(42)
        expect(+true).toBe(1)
        expect(+false).toBe(0)
        expect(+null).toBe(0)
        expect(Number.isNaN(+undefined)).toBe(true)
        expect(Number.isNaN(+"hello")).toBe(true)
        expect(+"").toBe(0)
      })
    })
  })

  describe('Boolean Conversion', () => {
    describe('The 8 Falsy Values', () => {
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
        expect(Boolean("0")).toBe(true) // Non-empty string!
        expect(Boolean("false")).toBe(true) // Non-empty string!
        expect(Boolean([])).toBe(true) // Empty array!
        expect(Boolean({})).toBe(true) // Empty object!
        expect(Boolean(function(){})).toBe(true)
        expect(Boolean(new Date())).toBe(true)
        expect(Boolean(Infinity)).toBe(true)
        expect(Boolean(-Infinity)).toBe(true)
      })
    })

    describe('Common Gotchas', () => {
      it('should demonstrate empty array checking', () => {
        const arr = []
        expect(Boolean(arr)).toBe(true) // Array itself is truthy
        expect(arr.length > 0).toBe(false) // Check length instead
      })
    })

    describe('Logical Operators Return Original Values', () => {
      it('should return first truthy value with ||', () => {
        expect("hello" || "world").toBe("hello")
        expect("" || "world").toBe("world")
        expect("" || 0 || null || "yes").toBe("yes")
      })

      it('should return first falsy value with &&', () => {
        expect("hello" && "world").toBe("world")
        expect("" && "world").toBe("")
        expect(1 && 2 && 3).toBe(3)
      })

      it('should use || for defaults', () => {
        const userInput = ""
        const name = userInput || "Anonymous"
        expect(name).toBe("Anonymous")
      })
    })
  })

  describe('Object to Primitive Conversion', () => {
    describe('Built-in Object Conversion', () => {
      it('should convert arrays via toString', () => {
        expect([1, 2, 3].toString()).toBe("1,2,3")
        expect([1, 2, 3] + "").toBe("1,2,3")
        expect(Number.isNaN([1, 2, 3] - 0)).toBe(true) // "1,2,3" → NaN

        expect([].toString()).toBe("")
        expect([] + "").toBe("")
        expect([] - 0).toBe(0) // "" → 0

        expect([1].toString()).toBe("1")
        expect([1] - 0).toBe(1)
      })

      it('should convert plain objects to [object Object]', () => {
        expect({}.toString()).toBe("[object Object]")
        expect({} + "").toBe("[object Object]")
      })
    })

    describe('Custom valueOf and toString', () => {
      it('should use valueOf for number conversion', () => {
        const price = {
          amount: 99.99,
          currency: "USD",
          valueOf() {
            return this.amount
          },
          toString() {
            return `${this.currency} ${this.amount}`
          }
        }

        expect(price - 0).toBe(99.99)
        expect(price * 2).toBe(199.98)
        expect(+price).toBe(99.99)
      })

      it('should use toString for string conversion', () => {
        const price = {
          amount: 99.99,
          currency: "USD",
          valueOf() {
            return this.amount
          },
          toString() {
            return `${this.currency} ${this.amount}`
          }
        }

        expect(String(price)).toBe("USD 99.99")
        expect(`Price: ${price}`).toBe("Price: USD 99.99")
      })
    })

    describe('Symbol.toPrimitive', () => {
      it('should use Symbol.toPrimitive for conversion hints', () => {
        const obj = {
          [Symbol.toPrimitive](hint) {
            if (hint === "number") {
              return 42
            }
            if (hint === "string") {
              return "forty-two"
            }
            return "default value"
          }
        }

        expect(+obj).toBe(42) // hint: "number"
        expect(`${obj}`).toBe("forty-two") // hint: "string"
        expect(obj + "").toBe("default value") // hint: "default"
      })
    })
  })

  describe('The == Algorithm', () => {
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

      it('should return false for null/undefined vs other values', () => {
        expect(null == 0).toBe(false)
        expect(null == "").toBe(false)
        expect(undefined == 0).toBe(false)
        expect(undefined == "").toBe(false)
      })
    })

    describe('Number and String', () => {
      it('should convert string to number', () => {
        expect(5 == "5").toBe(true)
        expect(0 == "").toBe(true)
        expect(42 == "42").toBe(true)
      })
    })

    describe('Boolean Conversion', () => {
      it('should convert boolean to number first', () => {
        expect(true == 1).toBe(true)
        expect(false == 0).toBe(true)
        expect(true == "1").toBe(true)
      })

      it('should demonstrate confusing boolean comparisons', () => {
        expect(true == "true").toBe(false) // true → 1, "true" → NaN
        expect(false == "false").toBe(false) // false → 0, "false" → NaN
        expect(true == 2).toBe(false) // true → 1, 1 ≠ 2
      })
    })

    describe('Object to Primitive', () => {
      it('should convert object to primitive', () => {
        expect([1] == 1).toBe(true) // [1] → "1" → 1
        expect([""] == 0).toBe(true) // [""] → "" → 0
      })
    })

    describe('Step-by-Step Examples', () => {
      it('should trace "5" == 5', () => {
        // String vs Number → convert string to number
        // 5 == 5 → true
        expect("5" == 5).toBe(true)
      })

      it('should trace true == "1"', () => {
        // Boolean → number: 1 == "1"
        // Number vs String → 1 == 1
        // true
        expect(true == "1").toBe(true)
      })

      it('should trace [] == false', () => {
        // Boolean → number: [] == 0
        // Object → primitive: "" == 0
        // String → number: 0 == 0
        // true
        expect([] == false).toBe(true)
      })

      it('should trace [] == ![]', () => {
        // First, evaluate ![] → false (arrays are truthy)
        // [] == false
        // Boolean → number: [] == 0
        // Object → primitive: "" == 0
        // String → number: 0 == 0
        // true!
        expect([] == ![]).toBe(true)
      })
    })
  })

  describe('JavaScript WAT Moments', () => {
    describe('+ Operator Split Personality', () => {
      it('should show string vs number behavior', () => {
        expect("5" + 3).toBe("53")
        expect("5" - 3).toBe(2)
      })
    })

    describe('Empty Array Weirdness', () => {
      it('should demonstrate [] + [] behavior', () => {
        expect([] + []).toBe("") // Both → "", then "" + "" = ""
      })

      it('should demonstrate [] + {} behavior', () => {
        expect([] + {}).toBe("[object Object]")
      })
    })

    describe('Boolean Math', () => {
      it('should add booleans as numbers', () => {
        expect(true + true).toBe(2)
        expect(true + false).toBe(1)
        expect(true - true).toBe(0)
      })
    })

    describe('The Infamous [] == ![]', () => {
      it('should return true for [] == ![]', () => {
        const emptyArr = []
        const negatedArr = ![]
        expect(emptyArr == negatedArr).toBe(true)
        expect(emptyArr === negatedArr).toBe(false)
      })
    })

    describe('"foo" + + "bar"', () => {
      it('should return "fooNaN"', () => {
        // +"bar" is evaluated first → NaN
        // "foo" + NaN → "fooNaN"
        expect("foo" + + "bar").toBe("fooNaN")
      })
    })

    describe('NaN Equality', () => {
      it('should never equal itself', () => {
        expect(NaN === NaN).toBe(false)
        expect(NaN == NaN).toBe(false)
      })

      it('should use Number.isNaN to check', () => {
        expect(Number.isNaN(NaN)).toBe(true)
        expect(isNaN(NaN)).toBe(true)
        expect(isNaN("hello")).toBe(true) // Quirk: converts first
        expect(Number.isNaN("hello")).toBe(false) // Correct
      })
    })

    describe('typeof Quirks', () => {
      it('should demonstrate typeof oddities', () => {
        expect(typeof NaN).toBe("number") // "Not a Number" is a number
        expect(typeof null).toBe("object") // Historical bug
        expect(typeof []).toBe("object") // Arrays are objects
        expect(typeof function(){}).toBe("function") // Special case
      })
    })

    describe('Adding Arrays', () => {
      it('should concatenate arrays as strings', () => {
        expect([1, 2] + [3, 4]).toBe("1,23,4")
        // [1, 2] → "1,2"
        // [3, 4] → "3,4"
        // "1,2" + "3,4" → "1,23,4"
      })

      it('should use spread or concat to combine arrays', () => {
        expect([...[1, 2], ...[3, 4]]).toEqual([1, 2, 3, 4])
        expect([1, 2].concat([3, 4])).toEqual([1, 2, 3, 4])
      })
    })
  })

  describe('Best Practices', () => {
    describe('Use === instead of ==', () => {
      it('should show predictable strict equality', () => {
        expect(5 === "5").toBe(false) // No coercion
        expect(5 == "5").toBe(true) // Coerced
      })
    })

    describe('When == IS Useful', () => {
      it('should check for null or undefined in one shot', () => {
        function checkNullish(value) {
          return value == null
        }

        expect(checkNullish(null)).toBe(true)
        expect(checkNullish(undefined)).toBe(true)
        expect(checkNullish(0)).toBe(false)
        expect(checkNullish("")).toBe(false)
      })
    })

    describe('Be Explicit with Conversions', () => {
      it('should convert explicitly for clarity', () => {
        const str = "42"
        
        // Quick string conversion
        expect(str + "").toBe("42")
        expect(String(42)).toBe("42")
        
        // Quick number conversion
        expect(+str).toBe(42)
        expect(Number(str)).toBe(42)
      })
    })
  })

  describe('Test Your Knowledge Examples', () => {
    it('should return "53" for "5" + 3', () => {
      expect("5" + 3).toBe("53")
    })

    it('should return "1hello" for true + false + "hello"', () => {
      // true + false = 1 + 0 = 1
      // 1 + "hello" = "1hello"
      expect(true + false + "hello").toBe("1hello")
    })
  })
})
