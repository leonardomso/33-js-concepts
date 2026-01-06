import { describe, it, expect } from 'vitest'

describe('Temporal Dead Zone', () => {
  describe('Basic TDZ Behavior', () => {
    describe('let declarations', () => {
      it('should throw ReferenceError when accessing let before declaration', () => {
        expect(() => {
          eval(`
            const value = x
            let x = 10
          `)
        }).toThrow(ReferenceError)
      })

      it('should work correctly when accessed after declaration', () => {
        let x = 10
        expect(x).toBe(10)
      })
    })

    describe('const declarations', () => {
      it('should throw ReferenceError when accessing const before declaration', () => {
        expect(() => {
          eval(`
            const value = y
            const y = 20
          `)
        }).toThrow(ReferenceError)
      })

      it('should work correctly when accessed after declaration', () => {
        const y = 20
        expect(y).toBe(20)
      })
    })

    describe('var declarations (no TDZ)', () => {
      it('should return undefined when accessing var before declaration', () => {
        function example() {
          const before = x
          var x = 10
          const after = x
          return { before, after }
        }

        const result = example()
        expect(result.before).toBe(undefined)
        expect(result.after).toBe(10)
      })

      it('should demonstrate var hoisting to function scope', () => {
        function example() {
          if (false) {
            var x = 10
          }
          return x // undefined, not ReferenceError
        }

        expect(example()).toBe(undefined)
      })
    })
  })

  describe('TDZ Boundaries', () => {
    it('should start TDZ at the beginning of the block', () => {
      expect(() => {
        eval(`
          {
            // TDZ starts here
            const value = name
            let name = "Alice"
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should end TDZ at the declaration line', () => {
      {
        // TDZ for 'name' exists here
        let name = "Alice" // TDZ ends here
        expect(name).toBe("Alice")
      }
    })

    it('should allow function definitions that reference TDZ variables', () => {
      // This is the key "temporal" aspect
      {
        const getX = () => x // Function defined before x is initialized
        let x = 42
        // Calling after initialization works!
        expect(getX()).toBe(42)
      }
    })

    it('should throw if function is called during TDZ', () => {
      expect(() => {
        eval(`
          {
            const getX = () => x
            getX() // Called before x is initialized
            let x = 42
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should have separate TDZ per block scope', () => {
      let x = "outer"
      
      {
        // New TDZ for inner x starts here
        // The outer x is shadowed but we can't access inner x yet
        expect(() => {
          eval(`
            {
              let outer = x // This x refers to inner, which is in TDZ
              let x = "inner"
            }
          `)
        }).toThrow(ReferenceError)
      }
      
      expect(x).toBe("outer")
    })
  })

  describe('TDZ with typeof', () => {
    it('should throw ReferenceError when using typeof on TDZ variable', () => {
      expect(() => {
        eval(`
          {
            typeof x // ReferenceError!
            let x = 10
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should return "undefined" for undeclared variables (no TDZ)', () => {
      // This is the key difference from undeclared variables
      expect(typeof undeclaredVariable).toBe("undefined")
    })

    it('should work after TDZ ends', () => {
      let x = 10
      expect(typeof x).toBe("number")
    })
  })

  describe('TDZ in Default Parameters', () => {
    it('should allow later parameters to reference earlier ones', () => {
      function test(a = 1, b = a + 1) {
        return { a, b }
      }

      expect(test()).toEqual({ a: 1, b: 2 })
      expect(test(5)).toEqual({ a: 5, b: 6 })
      expect(test(5, 10)).toEqual({ a: 5, b: 10 })
    })

    it('should throw when earlier parameters reference later ones', () => {
      expect(() => {
        eval(`
          function test(a = b, b = 2) {
            return a + b
          }
          test()
        `)
      }).toThrow(ReferenceError)
    })

    it('should throw on self-reference in default parameter', () => {
      expect(() => {
        eval(`
          function test(a = a) {
            return a
          }
          test()
        `)
      }).toThrow(ReferenceError)
    })

    it('should allow referencing outer scope variables in defaults', () => {
      const outer = 100

      function test(a = outer, b = a + 1) {
        return { a, b }
      }

      expect(test()).toEqual({ a: 100, b: 101 })
    })
  })

  describe('TDZ in Destructuring', () => {
    it('should throw on self-referencing destructuring', () => {
      expect(() => {
        eval(`
          let { x = x } = {}
        `)
      }).toThrow(ReferenceError)
    })

    it('should throw when later destructured variable references earlier in TDZ', () => {
      expect(() => {
        eval(`
          let { a = b, b = 1 } = {}
        `)
      }).toThrow(ReferenceError)
    })

    it('should allow earlier destructured variables to be used by later ones', () => {
      let { a = 1, b = a + 1 } = {}
      expect(a).toBe(1)
      expect(b).toBe(2)
    })

    it('should work with provided values', () => {
      let { a = 1, b = a + 1 } = { a: 10, b: 20 }
      expect(a).toBe(10)
      expect(b).toBe(20)
    })
  })

  describe('TDZ in Loops', () => {
    it('should throw for for...of header self-reference', () => {
      expect(() => {
        eval(`
          for (let n of n.values) {
            console.log(n)
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should create fresh binding per iteration with let', () => {
      const funcs = []

      for (let i = 0; i < 3; i++) {
        funcs.push(() => i)
      }

      // Each closure captures a different i
      expect(funcs[0]()).toBe(0)
      expect(funcs[1]()).toBe(1)
      expect(funcs[2]()).toBe(2)
    })

    it('should share binding across iterations with var (no TDZ)', () => {
      const funcs = []

      for (var i = 0; i < 3; i++) {
        funcs.push(() => i)
      }

      // All closures share the same i
      expect(funcs[0]()).toBe(3)
      expect(funcs[1]()).toBe(3)
      expect(funcs[2]()).toBe(3)
    })

    it('should have TDZ in for...in loop header', () => {
      expect(() => {
        eval(`
          for (let key in key.split('')) {
            console.log(key)
          }
        `)
      }).toThrow(ReferenceError)
    })
  })

  describe('TDZ with class Declarations', () => {
    it('should throw ReferenceError when accessing class before declaration', () => {
      expect(() => {
        eval(`
          const instance = new MyClass()
          class MyClass {
            constructor() {
              this.value = 42
            }
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should work when class is accessed after declaration', () => {
      class MyClass {
        constructor() {
          this.value = 42
        }
      }

      const instance = new MyClass()
      expect(instance.value).toBe(42)
    })

    it('should throw when class references itself in extends before declaration', () => {
      expect(() => {
        eval(`
          class A extends A {}
        `)
      }).toThrow(ReferenceError)
    })

    it('should allow class to reference itself inside methods', () => {
      class Counter {
        static count = 0
        
        constructor() {
          Counter.count++ // This works - class is initialized
        }
        
        static getCount() {
          return Counter.count
        }
      }

      new Counter()
      new Counter()
      expect(Counter.getCount()).toBe(2)
    })
  })

  describe('TDZ in Static Class Fields', () => {
    it('should return undefined for static fields referencing later fields', () => {
      // Note: This is NOT TDZ - it's property access returning undefined
      // because the property doesn't exist yet on the class object
      class Example {
        static a = Example.b // b not yet defined, returns undefined
        static b = 10
      }

      expect(Example.a).toBe(undefined) // Not TDZ, just undefined property
      expect(Example.b).toBe(10)
    })

    it('should allow static fields to reference earlier fields', () => {
      class Example {
        static a = 10
        static b = Example.a + 5
      }

      expect(Example.a).toBe(10)
      expect(Example.b).toBe(15)
    })

    it('should throw for static field self-reference before class exists', () => {
      // This DOES throw because the class itself is in TDZ
      expect(() => {
        eval(`
          const x = MyClass.value  // MyClass is in TDZ
          class MyClass {
            static value = 10
          }
        `)
      }).toThrow(ReferenceError)
    })
  })

  describe('TDZ vs Hoisting Comparison', () => {
    it('should demonstrate var is hoisted with undefined', () => {
      function example() {
        expect(x).toBe(undefined) // hoisted, initialized to undefined
        var x = 10
        expect(x).toBe(10)
      }

      example()
    })

    it('should demonstrate function declarations are fully hoisted', () => {
      // Can call before declaration
      expect(hoistedFn()).toBe("I work!")

      function hoistedFn() {
        return "I work!"
      }
    })

    it('should demonstrate function expressions are NOT hoisted', () => {
      expect(() => {
        eval(`
          notHoisted()
          var notHoisted = function() { return "Not hoisted" }
        `)
      }).toThrow(TypeError) // notHoisted is undefined, not a function
    })

    it('should demonstrate arrow functions are NOT hoisted', () => {
      expect(() => {
        eval(`
          arrowFn()
          const arrowFn = () => "Not hoisted"
        `)
      }).toThrow(ReferenceError) // TDZ for const
    })
  })

  describe('Practical TDZ Scenarios', () => {
    describe('Shadowing Trap', () => {
      it('should demonstrate the shadowing TDZ trap', () => {
        const x = 10

        expect(() => {
          eval(`
            function example() {
              const outer = x // Which x? The inner one (TDZ!)
              let x = 20
              return outer
            }
            example()
          `)
        }).toThrow(ReferenceError)
      })

      it('should show the correct way to handle shadowing', () => {
        const x = 10

        function example() {
          const outer = x // Refers to outer x (no shadowing yet)
          // Don't declare another x if you need the outer one!
          return outer
        }

        expect(example()).toBe(10)
      })
    })

    describe('Conditional Initialization', () => {
      it('should have TDZ regardless of conditional branches', () => {
        expect(() => {
          eval(`
            {
              const value = x // TDZ even though if is false
              if (false) {
                // This never runs, but x is still in TDZ
              }
              let x = 10
            }
          `)
        }).toThrow(ReferenceError)
      })
    })

    describe('Closure Over TDZ Variables', () => {
      it('should allow creating closures over TDZ variables', () => {
        function createAccessor() {
          // Function created before value is initialized
          const getValue = () => value
          const setValue = (v) => { value = v }
          
          let value = "initial"
          
          return { getValue, setValue }
        }

        const accessor = createAccessor()
        expect(accessor.getValue()).toBe("initial")
        
        accessor.setValue("updated")
        expect(accessor.getValue()).toBe("updated")
      })
    })
  })

  describe('Why TDZ Exists', () => {
    it('should catch use-before-initialization bugs', () => {
      // Without TDZ (var), this bug is silent
      function buggyWithVar() {
        var total = price * quantity // undefined * undefined = NaN
        var price = 10
        var quantity = 5
        return total
      }

      expect(buggyWithVar()).toBeNaN() // Silent bug!

      // With TDZ (let/const), the bug is caught immediately
      expect(() => {
        eval(`
          function buggyWithLet() {
            let total = price * quantity // ReferenceError!
            let price = 10
            let quantity = 5
            return total
          }
          buggyWithLet()
        `)
      }).toThrow(ReferenceError) // Bug caught!
    })

    it('should make const semantically meaningful', () => {
      // const should never have an "undefined" state
      // TDZ ensures you can't observe const before it has its value
      const PI = 3.14159

      // If there was no TDZ, const would briefly be undefined
      // which contradicts its purpose as a constant
      expect(PI).toBe(3.14159)
    })
  })

  describe('Edge Cases', () => {
    it('should handle nested blocks with same variable name', () => {
      let x = "outer"

      {
        let x = "middle"
        expect(x).toBe("middle")

        {
          let x = "inner"
          expect(x).toBe("inner")
        }

        expect(x).toBe("middle")
      }

      expect(x).toBe("outer")
    })

    it('should have TDZ in switch case blocks', () => {
      expect(() => {
        eval(`
          switch (1) {
            case 1:
              console.log(x) // TDZ!
              let x = 10
              break
          }
        `)
      }).toThrow(ReferenceError)
    })

    it('should avoid TDZ with block scoping in switch', () => {
      let result

      switch (1) {
        case 1: {
          let x = 10
          result = x
          break
        }
      }

      expect(result).toBe(10)
    })

    it('should have TDZ for let in try block visible in catch', () => {
      expect(() => {
        eval(`
          try {
            throw new Error()
          } catch (e) {
            console.log(x) // x is in TDZ
          }
          let x = 10
        `)
      }).toThrow(ReferenceError)
    })
  })
})
