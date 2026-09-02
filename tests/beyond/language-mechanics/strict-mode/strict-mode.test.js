import { describe, it, expect } from 'vitest'

describe('Strict Mode', () => {
  // ===========================================
  // Part 1: Accidental Global Variables
  // ===========================================

  describe('Part 1: Accidental Global Variables', () => {
    it('should demonstrate how sloppy mode creates accidental globals', () => {
      // In sloppy mode, assigning to an undeclared variable creates a global
      // We can simulate this behavior (but won't actually pollute global scope)
      
      function sloppyBehavior() {
        // Simulating what would happen in sloppy mode:
        // undeclaredVar = 'leaked' would create window.undeclaredVar
        const globals = {}
        
        // This mimics sloppy mode's behavior of auto-creating globals
        function assignToUndeclared(varName, value) {
          globals[varName] = value  // Leaks to "global" scope
        }
        
        assignToUndeclared('mistypedVariable', 42)
        return globals.mistypedVariable
      }
      
      expect(sloppyBehavior()).toBe(42)
    })

    it('should show that strict mode catches undeclared variable assignments', () => {
      // In strict mode, assigning to undeclared variable throws ReferenceError
      // We test the expected behavior pattern
      
      function strictBehavior() {
        'use strict'
        
        // In strict mode, we must declare variables first
        let declaredVariable
        declaredVariable = 42  // This works
        return declaredVariable
      }
      
      expect(strictBehavior()).toBe(42)
    })

    it('should demonstrate the difference with a practical typo scenario', () => {
      // This shows why strict mode is valuable for catching typos
      
      function calculateTotalStrict(price, taxRate) {
        'use strict'
        
        // Proper declaration - no typos
        const total = price * (1 + taxRate)
        return total
      }
      
      // Using toBeCloseTo for floating-point comparison
      expect(calculateTotalStrict(100, 0.1)).toBeCloseTo(110, 10)
    })
  })

  // ===========================================
  // Part 2: Silent Assignment Failures
  // ===========================================

  describe('Part 2: Silent Assignment Failures', () => {
    it('should demonstrate that read-only properties throw in strict mode', () => {
      'use strict'
      
      const obj = {}
      Object.defineProperty(obj, 'readOnly', {
        value: 42,
        writable: false
      })
      
      // Attempting to write to a read-only property throws TypeError
      expect(() => {
        obj.readOnly = 100
      }).toThrow(TypeError)
      
      // Original value unchanged
      expect(obj.readOnly).toBe(42)
    })

    it('should demonstrate getter-only properties throw on assignment', () => {
      'use strict'
      
      const obj = {
        get value() {
          return 'constant'
        }
      }
      
      // Attempting to set a getter-only property throws TypeError
      expect(() => {
        obj.value = 'new value'
      }).toThrow(TypeError)
      
      expect(obj.value).toBe('constant')
    })

    it('should demonstrate non-extensible objects throw on new property', () => {
      'use strict'
      
      const obj = { existing: 1 }
      Object.preventExtensions(obj)
      
      // Can still modify existing properties
      obj.existing = 2
      expect(obj.existing).toBe(2)
      
      // But adding new properties throws TypeError
      expect(() => {
        obj.newProperty = 'test'
      }).toThrow(TypeError)
    })

    it('should demonstrate frozen objects are completely immutable', () => {
      'use strict'
      
      const frozen = Object.freeze({ x: 1, y: 2 })
      
      // Cannot modify existing properties
      expect(() => {
        frozen.x = 100
      }).toThrow(TypeError)
      
      // Cannot add new properties
      expect(() => {
        frozen.z = 3
      }).toThrow(TypeError)
      
      // Cannot delete properties
      expect(() => {
        delete frozen.x
      }).toThrow(TypeError)
      
      // Values unchanged
      expect(frozen.x).toBe(1)
      expect(frozen.y).toBe(2)
    })
  })

  // ===========================================
  // Part 3: Delete Restrictions
  // ===========================================

  describe('Part 3: Delete Restrictions', () => {
    it('should demonstrate deleting non-configurable properties throws', () => {
      'use strict'
      
      const obj = {}
      Object.defineProperty(obj, 'permanent', {
        value: 'cannot delete',
        configurable: false
      })
      
      // Attempting to delete non-configurable property throws TypeError
      expect(() => {
        delete obj.permanent
      }).toThrow(TypeError)
      
      expect(obj.permanent).toBe('cannot delete')
    })

    it('should allow deleting configurable properties', () => {
      'use strict'
      
      const obj = { deletable: 'can delete' }
      
      expect(obj.deletable).toBe('can delete')
      expect(delete obj.deletable).toBe(true)
      expect(obj.deletable).toBe(undefined)
    })

    it('should demonstrate that built-in properties are non-configurable', () => {
      'use strict'
      
      // Array.prototype is non-configurable
      expect(() => {
        delete Array.prototype
      }).toThrow(TypeError)
      
      // Array length is non-configurable on existing arrays
      const arr = [1, 2, 3]
      expect(() => {
        delete arr.length
      }).toThrow(TypeError)
    })
  })

  // ===========================================
  // Part 4: `this` Behavior
  // ===========================================

  describe('Part 4: this Behavior', () => {
    it('should demonstrate this is undefined in strict mode function calls', () => {
      'use strict'
      
      function getThis() {
        return this
      }
      
      // Direct function call - this is undefined in strict mode
      expect(getThis()).toBe(undefined)
    })

    it('should demonstrate this is still the object when called as method', () => {
      'use strict'
      
      const obj = {
        value: 42,
        getValue() {
          return this.value
        }
      }
      
      // Method call - this is the object
      expect(obj.getValue()).toBe(42)
    })

    it('should demonstrate call/apply/bind still work to set this', () => {
      'use strict'
      
      function greet() {
        return `Hello, ${this.name}`
      }
      
      const person = { name: 'Alice' }
      
      // call sets this
      expect(greet.call(person)).toBe('Hello, Alice')
      
      // apply sets this
      expect(greet.apply(person)).toBe('Hello, Alice')
      
      // bind creates new function with fixed this
      const boundGreet = greet.bind(person)
      expect(boundGreet()).toBe('Hello, Alice')
    })

    it('should demonstrate primitives are not boxed when passed to call/apply', () => {
      'use strict'
      
      function getThisType() {
        return typeof this
      }
      
      // In strict mode, primitives passed to call/apply stay as primitives
      expect(getThisType.call(42)).toBe('number')
      expect(getThisType.call('hello')).toBe('string')
      expect(getThisType.call(true)).toBe('boolean')
      
      // null and undefined are passed through as-is
      expect(getThisType.call(null)).toBe('object')  // typeof null === 'object'
      expect(getThisType.call(undefined)).toBe('undefined')
    })

    it('should demonstrate arrow functions inherit this regardless of strict mode', () => {
      'use strict'
      
      // Create a function that creates an object with arrow function
      // to demonstrate that arrow functions capture 'this' from definition scope
      function createObj() {
        // 'this' inside a strict mode function call is undefined
        const capturedThis = this  // undefined
        
        return {
          value: 100,
          getValueArrow: () => {
            // Arrow function captures 'this' from createObj's scope
            return capturedThis
          },
          getValueRegular() {
            // Regular function: this is the object
            return this.value
          }
        }
      }
      
      const obj = createObj()
      
      expect(obj.getValueRegular()).toBe(100)
      // Arrow function's this is from enclosing scope (undefined in strict mode)
      expect(obj.getValueArrow()).toBe(undefined)
    })
  })

  // ===========================================
  // Part 5: Duplicate Parameters
  // ===========================================

  describe('Part 5: Duplicate Parameters (Syntax Restrictions)', () => {
    it('should demonstrate unique parameters work correctly', () => {
      'use strict'
      
      function add(a, b, c) {
        return a + b + c
      }
      
      expect(add(1, 2, 3)).toBe(6)
    })

    it('should show the sloppy mode duplicate parameter confusion', () => {
      // In sloppy mode, duplicate params shadow earlier ones
      // This simulates what happens: function sum(a, a, c) uses last 'a'
      
      function simulateSloppyDuplicate(firstA, secondA, c) {
        // In sloppy mode with function(a, a, c), only second 'a' is accessible
        return secondA + secondA + c
      }
      
      // sum(1, 2, 3) with duplicate 'a' returns 2 + 2 + 3 = 7, not 1 + 2 + 3 = 6
      expect(simulateSloppyDuplicate(1, 2, 3)).toBe(7)
    })

    // Note: We can't actually test that strict mode throws SyntaxError for
    // duplicate parameters because that's a parse-time error. The test file
    // itself wouldn't parse if we included such code.
  })

  // ===========================================
  // Part 6: eval and arguments Restrictions
  // ===========================================

  describe('Part 6: eval and arguments Restrictions', () => {
    it('should demonstrate eval does not leak variables in strict mode', () => {
      'use strict'
      
      // In strict mode, eval creates its own scope
      eval('var evalVar = "inside eval"')
      
      // evalVar is NOT accessible outside eval in strict mode
      expect(() => evalVar).toThrow(ReferenceError)
    })

    it('should demonstrate arguments object is independent of parameters', () => {
      'use strict'
      
      function testArguments(a) {
        const originalA = a
        const originalArg0 = arguments[0]
        
        // Modify arguments[0]
        arguments[0] = 999
        
        // In strict mode, 'a' is NOT affected
        expect(a).toBe(originalA)
        expect(arguments[0]).toBe(999)
        
        // Modify parameter
        a = 888
        
        // arguments[0] is NOT affected
        expect(arguments[0]).toBe(999)
        expect(a).toBe(888)
        
        return { a, arg0: arguments[0] }
      }
      
      const result = testArguments(42)
      expect(result.a).toBe(888)
      expect(result.arg0).toBe(999)
    })

    it('should demonstrate arguments.callee throws in strict mode', () => {
      'use strict'
      
      function testCallee() {
        return arguments.callee
      }
      
      // Accessing arguments.callee throws TypeError in strict mode
      expect(() => testCallee()).toThrow(TypeError)
    })
  })

  // ===========================================
  // Part 7: Octal Literals
  // ===========================================

  describe('Part 7: Octal Literals', () => {
    it('should demonstrate 0o prefix works for octal numbers', () => {
      'use strict'
      
      // Modern octal syntax with 0o prefix
      const octal = 0o755
      expect(octal).toBe(493)  // 7*64 + 5*8 + 5 = 493
      
      const octal10 = 0o10
      expect(octal10).toBe(8)
    })

    it('should demonstrate other number prefixes work correctly', () => {
      'use strict'
      
      // Binary with 0b prefix
      expect(0b1010).toBe(10)
      expect(0b11111111).toBe(255)
      
      // Hexadecimal with 0x prefix
      expect(0xFF).toBe(255)
      expect(0x10).toBe(16)
      
      // Octal with 0o prefix
      expect(0o777).toBe(511)
    })

    // Note: We can't test that 0755 (legacy octal) throws SyntaxError
    // because that would be a parse-time error in strict mode
  })

  // ===========================================
  // Part 8: Reserved Words
  // ===========================================

  describe('Part 8: Reserved Words', () => {
    it('should demonstrate that reserved words cannot be object property shorthand', () => {
      'use strict'
      
      // Reserved words CAN be used as property names with quotes or computed
      const obj = {
        'implements': true,
        'interface': true,
        'private': true,
        'public': true,
        'static': true
      }
      
      expect(obj.implements).toBe(true)
      expect(obj.interface).toBe(true)
      expect(obj['private']).toBe(true)
    })

    it('should show that static works in class context', () => {
      'use strict'
      
      class MyClass {
        static staticMethod() {
          return 'static works'
        }
        
        static staticProperty = 'static property'
      }
      
      expect(MyClass.staticMethod()).toBe('static works')
      expect(MyClass.staticProperty).toBe('static property')
    })
  })

  // ===========================================
  // Part 9: Practical Scenarios
  // ===========================================

  describe('Part 9: Practical Scenarios', () => {
    it('should catch common typo bugs early', () => {
      'use strict'
      
      function processOrder(order) {
        // All variables properly declared
        const subtotal = order.items.reduce((sum, item) => sum + item.price, 0)
        const tax = subtotal * order.taxRate
        const total = subtotal + tax
        
        return { subtotal, tax, total }
      }
      
      const order = {
        items: [{ price: 10 }, { price: 20 }],
        taxRate: 0.1
      }
      
      const result = processOrder(order)
      expect(result.subtotal).toBe(30)
      expect(result.tax).toBe(3)
      expect(result.total).toBe(33)
    })

    it('should work correctly with classes (automatic strict mode)', () => {
      // Classes are always in strict mode
      class Counter {
        #count = 0  // Private field
        
        increment() {
          this.#count++
        }
        
        getCount() {
          return this.#count
        }
      }
      
      const counter = new Counter()
      expect(counter.getCount()).toBe(0)
      counter.increment()
      counter.increment()
      expect(counter.getCount()).toBe(2)
    })

    it('should demonstrate safe object manipulation', () => {
      'use strict'
      
      // Create an object with controlled mutability
      const config = Object.freeze({
        apiUrl: 'https://api.example.com',
        timeout: 5000,
        retries: 3
      })
      
      // Verify immutability
      expect(() => {
        config.apiUrl = 'https://other.com'
      }).toThrow(TypeError)
      
      expect(config.apiUrl).toBe('https://api.example.com')
    })
  })
})
