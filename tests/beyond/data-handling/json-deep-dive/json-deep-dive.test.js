import { describe, it, expect } from 'vitest'

describe('JSON Deep Dive', () => {
  // ============================================================
  // BASIC SERIALIZATION
  // From json-deep-dive.mdx lines 30-45
  // ============================================================

  describe('Basic JSON Operations', () => {
    // From lines 30-40: Parse and stringify basics
    it('should parse JSON string to JavaScript object', () => {
      const jsonString = '{"name":"Alice","age":30,"isAdmin":true}'
      const user = JSON.parse(jsonString)

      expect(user.name).toBe('Alice')
      expect(user.age).toBe(30)
      expect(user.isAdmin).toBe(true)
    })

    it('should stringify JavaScript object to JSON string', () => {
      const user = { name: 'Alice', age: 30, isAdmin: true }
      const json = JSON.stringify(user)

      expect(json).toBe('{"name":"Alice","age":30,"isAdmin":true}')
    })

    // From lines 100-110: Basic stringify examples
    it('should stringify various value types', () => {
      expect(JSON.stringify({ a: 1, b: 2 })).toBe('{"a":1,"b":2}')
      expect(JSON.stringify([1, 2, 3])).toBe('[1,2,3]')
      expect(JSON.stringify('hello')).toBe('"hello"')
      expect(JSON.stringify(42)).toBe('42')
      expect(JSON.stringify(true)).toBe('true')
      expect(JSON.stringify(null)).toBe('null')
    })
  })

  // ============================================================
  // WHAT GETS LOST IN SERIALIZATION
  // From json-deep-dive.mdx lines 115-140
  // ============================================================

  describe('Values Lost During Serialization', () => {
    // From lines 115-130: Values that don't survive stringify
    it('should omit functions, undefined, and symbols from objects', () => {
      const obj = {
        name: 'Alice',
        greet: function () {
          return 'Hi!'
        },
        age: undefined,
        id: Symbol('id'),
        nothing: null
      }

      const result = JSON.parse(JSON.stringify(obj))

      expect(result.name).toBe('Alice')
      expect(result.greet).toBeUndefined()
      expect(result.age).toBeUndefined()
      expect(result.id).toBeUndefined()
      expect(result.nothing).toBeNull()
    })

    it('should convert NaN and Infinity to null', () => {
      const obj = {
        nan: NaN,
        infinity: Infinity,
        negInfinity: -Infinity
      }

      const result = JSON.parse(JSON.stringify(obj))

      expect(result.nan).toBeNull()
      expect(result.infinity).toBeNull()
      expect(result.negInfinity).toBeNull()
    })

    // From lines 135-140: Arrays handle these differently
    it('should convert undefined, functions, and symbols to null in arrays', () => {
      const arr = [1, undefined, function () {}, Symbol('x'), 2]
      const result = JSON.parse(JSON.stringify(arr))

      expect(result).toEqual([1, null, null, null, 2])
    })
  })

  // ============================================================
  // REPLACER PARAMETER
  // From json-deep-dive.mdx lines 150-220
  // ============================================================

  describe('Replacer Parameter', () => {
    // From lines 155-175: Replacer as function
    it('should filter out properties using replacer function', () => {
      const data = {
        name: 'Alice',
        password: 'secret123',
        email: 'alice@example.com',
        age: 30
      }

      const safeJSON = JSON.stringify(data, (key, value) => {
        if (key === 'password') return undefined
        if (key === 'email') return '***hidden***'
        return value
      })

      const result = JSON.parse(safeJSON)

      expect(result.name).toBe('Alice')
      expect(result.password).toBeUndefined()
      expect(result.email).toBe('***hidden***')
      expect(result.age).toBe(30)
    })

    // From lines 180-195: Initial call with empty key
    it('should call replacer with empty key for root object', () => {
      const calls = []

      JSON.stringify({ a: 1 }, (key, value) => {
        calls.push({ key, isObject: typeof value === 'object' })
        return value
      })

      expect(calls[0]).toEqual({ key: '', isObject: true })
      expect(calls[1]).toEqual({ key: 'a', isObject: false })
    })

    // From lines 200-210: Replacer as array
    it('should include only specified properties when replacer is array', () => {
      const user = {
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
        password: 'secret',
        role: 'admin',
        createdAt: '2024-01-01'
      }

      const json = JSON.stringify(user, ['id', 'name', 'email'])

      expect(json).toBe('{"id":1,"name":"Alice","email":"alice@example.com"}')
    })
  })

  // ============================================================
  // SPACE PARAMETER
  // From json-deep-dive.mdx lines 225-265
  // ============================================================

  describe('Space Parameter', () => {
    // From lines 230-250: Different space options
    it('should format JSON with numeric space parameter', () => {
      const data = { name: 'Alice', age: 30 }

      const formatted = JSON.stringify(data, null, 2)

      expect(formatted).toBe('{\n  "name": "Alice",\n  "age": 30\n}')
    })

    it('should format JSON with string space parameter', () => {
      const data = { a: 1, b: 2 }

      const formatted = JSON.stringify(data, null, '\t')

      expect(formatted).toContain('\t"a"')
      expect(formatted).toContain('\t"b"')
    })

    it('should clamp space number to 10', () => {
      const data = { x: 1 }

      const with15 = JSON.stringify(data, null, 15)
      const with10 = JSON.stringify(data, null, 10)

      // Both should have same indentation (clamped to 10)
      expect(with15).toBe(with10)
    })
  })

  // ============================================================
  // JSON.PARSE BASICS
  // From json-deep-dive.mdx lines 275-310
  // ============================================================

  describe('JSON.parse() Basics', () => {
    // From lines 280-290: Basic parsing
    it('should parse various JSON value types', () => {
      expect(JSON.parse('{"name":"Alice","age":30}')).toEqual({
        name: 'Alice',
        age: 30
      })
      expect(JSON.parse('[1, 2, 3]')).toEqual([1, 2, 3])
      expect(JSON.parse('"hello"')).toBe('hello')
      expect(JSON.parse('42')).toBe(42)
      expect(JSON.parse('true')).toBe(true)
      expect(JSON.parse('null')).toBeNull()
    })

    // From lines 295-310: Invalid JSON throws
    it('should throw SyntaxError for invalid JSON', () => {
      // Missing quotes around keys
      expect(() => JSON.parse('{name: "Alice"}')).toThrow(SyntaxError)

      // Single quotes
      expect(() => JSON.parse("{'name': 'Alice'}")).toThrow(SyntaxError)

      // Trailing comma
      expect(() => JSON.parse('{"a": 1,}')).toThrow(SyntaxError)
    })
  })

  // ============================================================
  // REVIVER PARAMETER
  // From json-deep-dive.mdx lines 320-390
  // ============================================================

  describe('Reviver Parameter', () => {
    // From lines 330-355: Reviving dates
    it('should revive date strings to Date objects', () => {
      const json = '{"name":"Alice","createdAt":"2024-01-15T10:30:00.000Z"}'

      const obj = JSON.parse(json, (key, value) => {
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
          return new Date(value)
        }
        return value
      })

      expect(obj.name).toBe('Alice')
      expect(obj.createdAt instanceof Date).toBe(true)
      expect(obj.createdAt.toISOString()).toBe('2024-01-15T10:30:00.000Z')
    })

    // From lines 360-375: Processing order
    it('should process values from innermost to outermost', () => {
      const order = []

      JSON.parse('{"a":{"b":1},"c":2}', (key, value) => {
        order.push(key)
        return value
      })

      // Innermost first, then containing object, siblings, root last
      expect(order).toEqual(['b', 'a', 'c', ''])
    })

    // From lines 380-390: Filtering during parse
    it('should delete properties by returning undefined', () => {
      const json = '{"name":"Alice","__internal":true,"id":1}'

      const cleaned = JSON.parse(json, (key, value) => {
        if (key.startsWith('__')) return undefined
        return value
      })

      expect(cleaned).toEqual({ name: 'Alice', id: 1 })
      expect(cleaned.__internal).toBeUndefined()
    })
  })

  // ============================================================
  // CUSTOM toJSON() METHODS
  // From json-deep-dive.mdx lines 400-460
  // ============================================================

  describe('Custom toJSON() Methods', () => {
    // From lines 405-420: Basic toJSON
    it('should use toJSON() method for serialization', () => {
      const user = {
        name: 'Alice',
        password: 'secret123',
        toJSON() {
          return { name: this.name }
        }
      }

      const json = JSON.stringify(user)

      expect(json).toBe('{"name":"Alice"}')
    })

    // From lines 425-440: Built-in Date toJSON
    it('should serialize Date using its toJSON method', () => {
      const date = new Date('2024-01-15T10:30:00.000Z')

      const json = JSON.stringify(date)

      expect(json).toBe('"2024-01-15T10:30:00.000Z"')
    })

    // From lines 445-460: toJSON in classes
    it('should use toJSON in class instances', () => {
      class User {
        constructor(name, email, password) {
          this.name = name
          this.email = email
          this.password = password
          this.createdAt = new Date('2024-01-15T10:30:00.000Z')
        }

        toJSON() {
          return {
            name: this.name,
            email: this.email,
            createdAt: this.createdAt.toISOString()
          }
        }
      }

      const user = new User('Alice', 'alice@example.com', 'secret')
      const json = JSON.stringify(user)
      const parsed = JSON.parse(json)

      expect(parsed.name).toBe('Alice')
      expect(parsed.email).toBe('alice@example.com')
      expect(parsed.password).toBeUndefined()
      expect(parsed.createdAt).toBe('2024-01-15T10:30:00.000Z')
    })

    // From lines 465-480: toJSON receives key
    it('should pass property key to toJSON method', () => {
      const obj = {
        toJSON(key) {
          return key ? `Nested under "${key}"` : 'Root level'
        }
      }

      expect(JSON.stringify(obj)).toBe('"Root level"')
      expect(JSON.stringify({ data: obj })).toBe(
        '{"data":"Nested under \\"data\\""}'
      )
      expect(JSON.stringify([obj])).toBe('["Nested under \\"0\\""]')
    })
  })

  // ============================================================
  // CIRCULAR REFERENCES
  // From json-deep-dive.mdx lines 490-550
  // ============================================================

  describe('Circular References', () => {
    // From lines 495-505: Circular reference error
    it('should throw TypeError for circular references', () => {
      const obj = { name: 'Alice' }
      obj.self = obj

      expect(() => JSON.stringify(obj)).toThrow(TypeError)
    })

    // From lines 510-540: Safe stringify with WeakSet
    it('should handle circular references with custom replacer', () => {
      function safeStringify(obj) {
        const seen = new WeakSet()

        return JSON.stringify(obj, (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return '[Circular Reference]'
            }
            seen.add(value)
          }
          return value
        })
      }

      const obj = { name: 'Alice' }
      obj.self = obj

      const result = safeStringify(obj)

      expect(result).toBe('{"name":"Alice","self":"[Circular Reference]"}')
    })

    // More complex circular reference
    it('should detect nested circular references', () => {
      function safeStringify(obj) {
        const seen = new WeakSet()

        return JSON.stringify(obj, (key, value) => {
          if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
              return '[Circular]'
            }
            seen.add(value)
          }
          return value
        })
      }

      const a = { name: 'a' }
      const b = { name: 'b', ref: a }
      a.ref = b

      const result = JSON.parse(safeStringify(a))

      expect(result.name).toBe('a')
      expect(result.ref.name).toBe('b')
      expect(result.ref.ref).toBe('[Circular]')
    })
  })

  // ============================================================
  // SERIALIZING SPECIAL TYPES
  // From json-deep-dive.mdx lines 560-680
  // ============================================================

  describe('Serializing Special Types', () => {
    // From lines 565-580: Dates round-trip
    it('should serialize and revive dates', () => {
      const event = { name: 'Meeting', date: new Date('2024-06-15') }
      const json = JSON.stringify(event)

      const parsed = JSON.parse(json, (key, value) => {
        if (key === 'date') return new Date(value)
        return value
      })

      expect(parsed.name).toBe('Meeting')
      expect(parsed.date instanceof Date).toBe(true)
    })

    // From lines 585-595: Maps and Sets become empty
    it('should show Maps and Sets serialize as empty objects by default', () => {
      const map = new Map([
        ['a', 1],
        ['b', 2]
      ])
      const set = new Set([1, 2, 3])

      expect(JSON.stringify(map)).toBe('{}')
      expect(JSON.stringify(set)).toBe('{}')
    })

    // From lines 600-650: Custom Map/Set serialization
    it('should serialize and revive Maps with custom replacer/reviver', () => {
      function replacer(key, value) {
        if (value instanceof Map) {
          return {
            __type: 'Map',
            entries: Array.from(value.entries())
          }
        }
        if (value instanceof Set) {
          return {
            __type: 'Set',
            values: Array.from(value)
          }
        }
        return value
      }

      function reviver(key, value) {
        if (value && value.__type === 'Map') {
          return new Map(value.entries)
        }
        if (value && value.__type === 'Set') {
          return new Set(value.values)
        }
        return value
      }

      const data = {
        users: new Map([
          ['alice', { age: 30 }],
          ['bob', { age: 25 }]
        ]),
        tags: new Set(['javascript', 'tutorial'])
      }

      const json = JSON.stringify(data, replacer)
      const restored = JSON.parse(json, reviver)

      expect(restored.users instanceof Map).toBe(true)
      expect(restored.users.get('alice')).toEqual({ age: 30 })
      expect(restored.tags instanceof Set).toBe(true)
      expect(restored.tags.has('javascript')).toBe(true)
    })

    // From lines 655-680: BigInt handling
    it('should throw when stringifying BigInt by default', () => {
      const data = { bigNumber: 12345678901234567890n }

      expect(() => JSON.stringify(data)).toThrow(TypeError)
    })

    it('should serialize and revive BigInt with custom replacer/reviver', () => {
      function bigIntReplacer(key, value) {
        if (typeof value === 'bigint') {
          return { __type: 'BigInt', value: value.toString() }
        }
        return value
      }

      function bigIntReviver(key, value) {
        if (value && value.__type === 'BigInt') {
          return BigInt(value.value)
        }
        return value
      }

      const data = { id: 9007199254740993n }
      const json = JSON.stringify(data, bigIntReplacer)
      const restored = JSON.parse(json, bigIntReviver)

      expect(restored.id).toBe(9007199254740993n)
    })
  })

  // ============================================================
  // COMMON PATTERNS AND USE CASES
  // From json-deep-dive.mdx lines 690-790
  // ============================================================

  describe('Common Patterns', () => {
    // From lines 695-705: Deep clone
    it('should deep clone simple objects using JSON', () => {
      const original = { a: 1, b: { c: 2 } }
      const clone = JSON.parse(JSON.stringify(original))

      clone.b.c = 999

      expect(original.b.c).toBe(2)
      expect(clone.b.c).toBe(999)
    })

    // From lines 735-760: Logging with redaction
    it('should redact sensitive keys in logging', () => {
      function safeStringify(obj, sensitiveKeys = ['password', 'token', 'secret']) {
        return JSON.stringify(
          obj,
          (key, value) => {
            if (sensitiveKeys.includes(key.toLowerCase())) {
              return '[REDACTED]'
            }
            return value
          },
          2
        )
      }

      const data = {
        user: 'alice',
        password: 'secret123',
        data: { apiToken: 'abc123' }
      }

      const redacted = JSON.parse(safeStringify(data))

      expect(redacted.user).toBe('alice')
      expect(redacted.password).toBe('[REDACTED]')
    })
  })

  // ============================================================
  // TEST YOUR KNOWLEDGE - Q&A SECTION TESTS
  // From json-deep-dive.mdx lines 820-920
  // ============================================================

  describe('Test Your Knowledge', () => {
    // Q1: Functions omitted from objects
    it('should demonstrate functions being omitted from stringify', () => {
      const obj = {
        name: 'Alice',
        greet: function () {
          return 'Hi!'
        }
      }

      const json = JSON.stringify(obj)

      expect(json).toBe('{"name":"Alice"}')
    })

    // Q2: Excluding properties with array replacer
    it('should demonstrate array replacer for whitelisting', () => {
      const user = { id: 1, name: 'Alice', password: 'secret' }
      const json = JSON.stringify(user, ['id', 'name'])

      expect(json).toBe('{"id":1,"name":"Alice"}')
    })

    // Q3: Date parsing without reviver
    it('should show dates remain strings without reviver', () => {
      const original = { created: new Date('2024-01-15') }
      const json = JSON.stringify(original)
      const parsed = JSON.parse(json)

      expect(typeof parsed.created).toBe('string')
    })

    // Q4: Difference between replacer and toJSON
    it('should show toJSON runs before replacer', () => {
      const log = []

      const obj = {
        value: 1,
        toJSON() {
          log.push('toJSON called')
          return { converted: this.value }
        }
      }

      JSON.stringify(obj, (key, value) => {
        if (key !== '') log.push(`replacer: ${key}`)
        return value
      })

      expect(log[0]).toBe('toJSON called')
      expect(log[1]).toBe('replacer: converted')
    })

    // Q5: Circular reference handling
    it('should demonstrate WeakSet for circular reference detection', () => {
      const seen = new WeakSet()
      const obj = { name: 'test' }
      obj.self = obj

      const result = JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (seen.has(value)) {
            return '[Circular]'
          }
          seen.add(value)
        }
        return value
      })

      expect(result).toBe('{"name":"test","self":"[Circular]"}')
    })

    // Q6: Space parameter clamping
    it('should demonstrate space parameter formatting', () => {
      const data = { name: 'Alice', age: 30 }

      const with2 = JSON.stringify(data, null, 2)
      const with4 = JSON.stringify(data, null, 4)
      const withTab = JSON.stringify(data, null, '\t')

      expect(with2).toContain('  "name"')
      expect(with4).toContain('    "name"')
      expect(withTab).toContain('\t"name"')
    })
  })

  // ============================================================
  // EDGE CASES AND ERROR HANDLING
  // Additional tests for robustness
  // ============================================================

  describe('Edge Cases', () => {
    it('should handle empty objects and arrays', () => {
      expect(JSON.stringify({})).toBe('{}')
      expect(JSON.stringify([])).toBe('[]')
      expect(JSON.parse('{}')).toEqual({})
      expect(JSON.parse('[]')).toEqual([])
    })

    it('should handle nested objects', () => {
      const deep = { a: { b: { c: { d: 1 } } } }
      const json = JSON.stringify(deep)
      const parsed = JSON.parse(json)

      expect(parsed.a.b.c.d).toBe(1)
    })

    it('should handle arrays with objects', () => {
      const data = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]

      const json = JSON.stringify(data)
      const parsed = JSON.parse(json)

      expect(parsed).toEqual(data)
    })

    it('should handle unicode strings', () => {
      const data = { emoji: '😀', chinese: '中文' }
      const json = JSON.stringify(data)
      const parsed = JSON.parse(json)

      expect(parsed.emoji).toBe('😀')
      expect(parsed.chinese).toBe('中文')
    })

    it('should handle escaped characters in strings', () => {
      const data = { text: 'Line1\nLine2\tTabbed' }
      const json = JSON.stringify(data)
      const parsed = JSON.parse(json)

      expect(parsed.text).toBe('Line1\nLine2\tTabbed')
    })

    it('should stringify null prototype objects', () => {
      const obj = Object.create(null)
      obj.name = 'Alice'

      const json = JSON.stringify(obj)

      expect(json).toBe('{"name":"Alice"}')
    })

    it('should handle replacer that returns object wrapper', () => {
      const result = JSON.stringify({ x: 1 }, (key, value) => {
        if (key === '') {
          return { wrapper: value, meta: 'added' }
        }
        return value
      })

      const parsed = JSON.parse(result)
      expect(parsed.wrapper.x).toBe(1)
      expect(parsed.meta).toBe('added')
    })
  })
})
