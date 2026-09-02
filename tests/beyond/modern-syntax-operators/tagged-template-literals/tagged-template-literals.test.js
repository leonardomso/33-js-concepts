import { describe, it, expect } from 'vitest'

describe('Tagged Template Literals', () => {
  // ============================================================
  // OPENING EXAMPLE
  // From tagged-template-literals.mdx lines 9-20
  // ============================================================

  describe('Opening Example', () => {
    // From lines 9-20: highlight tag function
    it('should wrap interpolated values in <mark> tags', () => {
      function highlight(strings, ...values) {
        return strings.reduce((result, str, i) => {
          const value = values[i] !== undefined ? `<mark>${values[i]}</mark>` : ''
          return result + str + value
        }, '')
      }

      const name = 'Alice'
      const age = 30

      const result = highlight`User ${name} is ${age} years old`
      expect(result).toBe('User <mark>Alice</mark> is <mark>30</mark> years old')
    })
  })

  // ============================================================
  // WHAT ARE TAGGED TEMPLATE LITERALS
  // From tagged-template-literals.mdx lines 41-51
  // ============================================================

  describe('What are Tagged Template Literals', () => {
    // From lines 45-51: Basic tag function call
    it('should call tag function with template literal', () => {
      let called = false
      function myTag(strings, ...values) {
        called = true
        return 'processed'
      }

      const result = myTag`Hello ${'World'}`
      expect(called).toBe(true)
      expect(result).toBe('processed')
    })
  })

  // ============================================================
  // HOW TAG FUNCTIONS WORK
  // From tagged-template-literals.mdx lines 80-140
  // ============================================================

  describe('How Tag Functions Work', () => {
    describe('The Basic Signature', () => {
      // From lines 95-107: inspect function
      it('should receive strings and values as separate arguments', () => {
        let capturedStrings = null
        let capturedValues = null

        function inspect(strings, ...values) {
          capturedStrings = strings
          capturedValues = values
        }

        const fruit = 'apple'
        const count = 5

        inspect`I have ${count} ${fruit}s`

        expect(capturedStrings).toEqual(['I have ', ' ', 's'])
        expect(capturedValues).toEqual([5, 'apple'])
        expect(capturedStrings.length).toBe(3)
        expect(capturedValues.length).toBe(2)
      })
    })

    describe('The Golden Rule', () => {
      // From lines 113-125: strings.length === values.length + 1
      it('should always have one more string than values', () => {
        function countParts(strings, ...values) {
          return `${strings.length} strings, ${values.length} values`
        }

        expect(countParts`${1}`).toBe('2 strings, 1 values')
        expect(countParts`x${1}`).toBe('2 strings, 1 values')
        expect(countParts`${1}y`).toBe('2 strings, 1 values')
        expect(countParts`x${1}y`).toBe('2 strings, 1 values')
        expect(countParts`x${1}y${2}z`).toBe('3 strings, 2 values')
      })

      // From lines 127-135: interleave function
      it('should correctly interleave strings and values', () => {
        function interleave(strings, ...values) {
          let result = ''
          for (let i = 0; i < values.length; i++) {
            result += strings[i] + values[i]
          }
          result += strings[strings.length - 1]
          return result
        }

        const name = 'World'
        expect(interleave`Hello, ${name}!`).toBe('Hello, World!')
      })
    })

    describe('A Cleaner Pattern with reduce', () => {
      // From lines 139-145: reduce pattern
      it('should interleave using reduce', () => {
        function simple(strings, ...values) {
          return strings.reduce((result, str, i) => {
            const value = values[i] !== undefined ? values[i] : ''
            return result + str + value
          }, '')
        }

        expect(simple`Hello, ${'World'}!`).toBe('Hello, World!')
        expect(simple`No interpolations`).toBe('No interpolations')
        expect(simple`${1}${2}${3}`).toBe('123')
      })
    })
  })

  // ============================================================
  // THE RAW STRINGS PROPERTY
  // From tagged-template-literals.mdx lines 151-195
  // ============================================================

  describe('The Raw Strings Property', () => {
    describe('Cooked vs Raw', () => {
      // From lines 159-170: showBoth function
      it('should provide both cooked and raw strings', () => {
        let cookedValue = null
        let rawValue = null

        function showBoth(strings) {
          cookedValue = strings[0]
          rawValue = strings.raw[0]
        }

        showBoth`Line1\nLine2`

        // Cooked: escape sequence is processed
        expect(cookedValue).toBe('Line1\nLine2')
        expect(cookedValue.includes('\n')).toBe(true) // actual newline

        // Raw: escape sequence is preserved
        expect(rawValue).toBe('Line1\\nLine2')
        expect(rawValue.includes('\\n')).toBe(true) // literal backslash-n
      })
    })
  })

  // ============================================================
  // STRING.RAW: THE BUILT-IN TAG
  // From tagged-template-literals.mdx lines 201-250
  // ============================================================

  describe('String.raw', () => {
    describe('Basic Usage', () => {
      // From lines 207-215: String.raw basic example
      it('should preserve escape sequences as literal characters', () => {
        // Normal template literal - escape sequences processed
        const normal = `Line1\nLine2`
        expect(normal).toBe('Line1\nLine2')
        expect(normal.length).toBe(11) // 5 + 1 + 5

        // String.raw - escape sequences stay as literals
        const raw = String.raw`Line1\nLine2`
        expect(raw).toBe('Line1\\nLine2')
        expect(raw.length).toBe(12) // 5 + 2 + 5
      })
    })

    describe('Perfect for File Paths', () => {
      // From lines 219-226: Windows file paths
      it('should handle Windows file paths cleanly', () => {
        const path1 = 'C:\\Users\\Alice\\Documents\\file.txt'
        const path2 = String.raw`C:\Users\Alice\Documents\file.txt`

        expect(path1).toBe(path2)
      })
    })

    describe('Perfect for Regular Expressions', () => {
      // From lines 230-239: Regex patterns
      it('should simplify regex patterns', () => {
        const pattern1 = new RegExp('\\d+\\.\\d+')
        const pattern2 = new RegExp(String.raw`\d+\.\d+`)

        expect(pattern1.test('3.14')).toBe(true)
        expect(pattern2.test('3.14')).toBe(true)
        expect(pattern1.source).toBe(pattern2.source)
      })
    })

    describe('How String.raw Works Under the Hood', () => {
      // From lines 243-249: String.raw as function
      it('should work as both tag and regular function', () => {
        const tagged = String.raw`Hi\n${2 + 3}!`
        const functional = String.raw({ raw: ['Hi\\n', '!'] }, 5)

        expect(tagged).toBe('Hi\\n5!')
        expect(functional).toBe('Hi\\n5!')
      })
    })
  })

  // ============================================================
  // BUILDING CUSTOM TAG FUNCTIONS
  // From tagged-template-literals.mdx lines 256-340
  // ============================================================

  describe('Building Custom Tag Functions', () => {
    describe('Example 1: HTML Escaping', () => {
      // From lines 262-282: html tag function
      it('should escape HTML entities in interpolated values', () => {
        function escapeHTML(str) {
          return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }

        function html(strings, ...values) {
          return strings.reduce((result, str, i) => {
            const value = values[i] !== undefined ? escapeHTML(String(values[i])) : ''
            return result + str + value
          }, '')
        }

        const userInput = '<script>alert("XSS")</script>'
        const safe = html`<div>User said: ${userInput}</div>`

        expect(safe).toBe('<div>User said: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;</div>')
        expect(safe.includes('<script>')).toBe(false)
      })
    })

    describe('Example 2: Highlighting Values', () => {
      // From lines 288-302: highlight tag
      it('should wrap all interpolated values in mark tags', () => {
        function highlight(strings, ...values) {
          return strings.reduce((result, str, i) => {
            const value = values[i] !== undefined ? `<mark>${values[i]}</mark>` : ''
            return result + str + value
          }, '')
        }

        const product = 'Widget'
        const price = 29.99

        const message = highlight`The ${product} costs $${price}`
        expect(message).toBe('The <mark>Widget</mark> costs $<mark>29.99</mark>')
      })
    })

    describe('Example 3: Currency Formatting', () => {
      // From lines 306-325: currency tag
      it('should format numbers as currency', () => {
        function currency(strings, ...values) {
          const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          })

          return strings.reduce((result, str, i) => {
            let value = values[i]
            if (typeof value === 'number') {
              value = formatter.format(value)
            }
            return result + str + (value ?? '')
          }, '')
        }

        const item = 'Coffee'
        const price = 4.5
        const tax = 0.36

        const result = currency`${item}: ${price} + ${tax} tax`
        expect(result).toBe('Coffee: $4.50 + $0.36 tax')
      })
    })

    describe('Example 4: Debug Logging', () => {
      // From lines 329-345: debug tag
      it('should show types and JSON values', () => {
        function debug(strings, ...values) {
          let output = ''
          strings.forEach((str, i) => {
            output += str
            if (i < values.length) {
              const type = typeof values[i]
              const val = JSON.stringify(values[i])
              output += `[${type}: ${val}]`
            }
          })
          return output
        }

        const user = { name: 'Alice', age: 30 }
        const items = ['apple', 'banana']

        const result = debug`User: ${user}, Items: ${items}`
        expect(result).toBe('User: [object: {"name":"Alice","age":30}], Items: [object: ["apple","banana"]]')
      })
    })
  })

  // ============================================================
  // ADVANCED PATTERNS
  // From tagged-template-literals.mdx lines 350-420
  // ============================================================

  describe('Advanced Patterns', () => {
    describe('Returning Non-Strings', () => {
      // From lines 356-372: toArray and toObject
      it('should return an array of values', () => {
        function toArray(strings, ...values) {
          return values
        }

        const result = toArray`${1} and ${2} and ${3}`
        expect(result).toEqual([1, 2, 3])
      })

      it('should return an object from template', () => {
        function toObject(strings, ...values) {
          // More robust key extraction - handles the actual string splitting
          const keys = strings.slice(0, -1).map(s => {
            // Extract the key name from strings like "name: " or ", age: "
            const match = s.match(/(\w+)\s*:\s*$/)
            return match ? match[1] : ''
          })
          const obj = {}
          keys.forEach((key, i) => {
            if (key) obj[key] = values[i]
          })
          return obj
        }

        const name = 'Alice'
        const age = 30
        const result = toObject`name: ${name}, age: ${age},`
        expect(result).toEqual({ name: 'Alice', age: 30 })
      })
    })

    describe('Reusable Template Factories', () => {
      // From lines 376-395: template factory
      it('should create reusable templates', () => {
        function template(strings, ...keys) {
          return function (data) {
            return strings.reduce((result, str, i) => {
              const key = keys[i]
              const value = key !== undefined ? data[key] : ''
              return result + str + value
            }, '')
          }
        }

        const greeting = template`Hello, ${'name'}! You have ${'count'} messages.`

        expect(greeting({ name: 'Alice', count: 5 })).toBe('Hello, Alice! You have 5 messages.')
        expect(greeting({ name: 'Bob', count: 0 })).toBe('Hello, Bob! You have 0 messages.')
      })
    })

    describe('Building an Identity Tag', () => {
      // From lines 399-415: identity tag
      it('should process escapes like an untagged template', () => {
        function identity(strings, ...values) {
          return String.raw({ raw: strings }, ...values)
        }

        const result = identity`Line1\nLine2`
        expect(result).toBe('Line1\nLine2')
        expect(result.includes('\n')).toBe(true) // actual newline
      })
    })
  })

  // ============================================================
  // REAL-WORLD USE CASES
  // From tagged-template-literals.mdx lines 425-500
  // ============================================================

  describe('Real-World Use Cases', () => {
    describe('SQL Query Builders', () => {
      // From lines 430-455: sql tag
      it('should create parameterized query object', () => {
        function sql(strings, ...values) {
          const query = strings.reduce((result, str, i) => {
            return result + str + (i < values.length ? `$${i + 1}` : '')
          }, '')

          return {
            text: query,
            values: values
          }
        }

        const userId = 123
        const status = 'active'

        const query = sql`
  SELECT * FROM users 
  WHERE id = ${userId} 
  AND status = ${status}
`

        expect(query.text).toContain('$1')
        expect(query.text).toContain('$2')
        expect(query.values).toEqual([123, 'active'])
      })
    })

    describe('CSS-in-JS Patterns', () => {
      // From lines 475-490: css tag
      it('should interpolate values into CSS', () => {
        function css(strings, ...values) {
          return strings.reduce((result, str, i) => {
            return result + str + (values[i] ?? '')
          }, '')
        }

        const primaryColor = '#007bff'
        const styles = css`
  .button {
    background-color: ${primaryColor};
    padding: 10px 20px;
  }
`

        expect(styles).toContain('#007bff')
        expect(styles).toContain('.button')
      })
    })
  })

  // ============================================================
  // COMMON MISTAKES
  // From tagged-template-literals.mdx lines 505-555
  // ============================================================

  describe('Common Mistakes', () => {
    describe('Forgetting the Last String', () => {
      // From lines 510-535: broken vs fixed
      it('should demonstrate the broken version', () => {
        function broken(strings, ...values) {
          return strings.reduce((result, str, i) => {
            return result + str + values[i] // values[last] is undefined!
          }, '')
        }

        const name = 'Alice'
        const result = broken`Hello ${name}!`
        // The bug: strings[2] is "!" but values[1] is undefined
        expect(result).toBe('Hello Alice!undefined') // Bug!
      })

      it('should demonstrate the fixed version', () => {
        function fixed(strings, ...values) {
          return strings.reduce((result, str, i) => {
            const value = values[i] !== undefined ? values[i] : ''
            return result + str + value
          }, '')
        }

        const name = 'Alice'
        const result = fixed`Hello ${name}!`
        expect(result).toBe('Hello Alice!') // Correct
      })
    })
  })

  // ============================================================
  // TEST YOUR KNOWLEDGE
  // From tagged-template-literals.mdx Test Your Knowledge section
  // ============================================================

  describe('Test Your Knowledge Examples', () => {
    // Question 1: Tag function arguments
    it('Q1: should receive correct strings and values', () => {
      let receivedStrings = null
      let receivedValues = null

      function tag(strings, ...values) {
        receivedStrings = [...strings]
        receivedValues = values
      }

      const name = 'Alice'
      const age = 30
      tag`Hello ${name}, you are ${age} years old`

      expect(receivedStrings).toEqual(['Hello ', ', you are ', ' years old'])
      expect(receivedValues).toEqual(['Alice', 30])
    })

    // Question 2: strings.length vs values.length
    it('Q2: should always have one more string than values', () => {
      function count(strings, ...values) {
        return `${strings.length} strings, ${values.length} values`
      }

      expect(count`${1}`).toBe('2 strings, 1 values')
      expect(count`x${1}y${2}z`).toBe('3 strings, 2 values')
      expect(count`no values`).toBe('1 strings, 0 values')
    })

    // Question 3: strings vs strings.raw
    it('Q3: should show difference between cooked and raw', () => {
      let cooked = null
      let raw = null

      function compare(strings) {
        cooked = strings[0]
        raw = strings.raw[0]
      }

      compare`Line1\nLine2`

      expect(cooked).toBe('Line1\nLine2') // processed newline
      expect(raw).toBe('Line1\\nLine2') // literal \n
    })

    // Question 4: String.raw use cases
    it('Q4: should preserve backslashes with String.raw', () => {
      const path = String.raw`C:\Users\Alice\Documents`
      expect(path).toBe('C:\\Users\\Alice\\Documents')
      expect(path.includes('\\')).toBe(true)
    })

    // Question 5: Returning non-strings
    it('Q5: should allow returning any type', () => {
      function values(strings, ...vals) {
        return vals
      }
      expect(values`${1}, ${2}, ${3}`).toEqual([1, 2, 3])

      function sql(strings, ...vals) {
        return { query: strings.join('?'), params: vals }
      }
      const result = sql`SELECT * WHERE id = ${1} AND name = ${'test'}`
      expect(result.params).toEqual([1, 'test'])
    })

    // Question 6: HTML escaping importance
    it('Q6: should escape HTML to prevent XSS', () => {
      function escapeHTML(str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
      }

      function safeHtml(strings, ...values) {
        return strings.reduce((result, str, i) => {
          const value = values[i] !== undefined
            ? escapeHTML(String(values[i]))
            : ''
          return result + str + value
        }, '')
      }

      const userInput = '<script>stealCookies()</script>'
      const safe = safeHtml`<div>${userInput}</div>`

      expect(safe).toBe('<div>&lt;script&gt;stealCookies()&lt;/script&gt;</div>')
      expect(safe.includes('<script>')).toBe(false)
    })
  })

  // ============================================================
  // EDGE CASES
  // ============================================================

  describe('Edge Cases', () => {
    it('should handle empty template literal', () => {
      function tag(strings, ...values) {
        return { strings: [...strings], values }
      }

      const result = tag``
      expect(result.strings).toEqual([''])
      expect(result.values).toEqual([])
    })

    it('should handle template with only interpolation', () => {
      function tag(strings, ...values) {
        return { strings: [...strings], values }
      }

      const result = tag`${42}`
      expect(result.strings).toEqual(['', ''])
      expect(result.values).toEqual([42])
    })

    it('should handle nested tagged templates', () => {
      function outer(strings, ...values) {
        // Interleave strings and values properly
        return '[' + strings.reduce((acc, str, i) => {
          return acc + str + (values[i] !== undefined ? values[i] : '')
        }, '') + ']'
      }

      function inner(strings, ...values) {
        return '(' + strings.reduce((acc, str, i) => {
          return acc + str + (values[i] !== undefined ? values[i] : '')
        }, '') + ')'
      }

      const result = outer`start ${inner`nested ${1}`} end`
      expect(result).toBe('[start (nested 1) end]')
    })

    it('should handle undefined and null values', () => {
      function tag(strings, ...values) {
        return strings.reduce((result, str, i) => {
          const value = values[i] !== undefined ? String(values[i]) : ''
          return result + str + value
        }, '')
      }

      expect(tag`Value: ${undefined}`).toBe('Value: ')
      expect(tag`Value: ${null}`).toBe('Value: null')
    })

    it('should handle function values', () => {
      function tag(strings, ...values) {
        return strings.reduce((result, str, i) => {
          let value = values[i]
          if (typeof value === 'function') {
            value = value()
          }
          return result + str + (value ?? '')
        }, '')
      }

      const result = tag`Result: ${() => 42}`
      expect(result).toBe('Result: 42')
    })

    it('should preserve the strings array between calls', () => {
      const callHistory = []

      function tag(strings, ...values) {
        callHistory.push(strings)
        return {}
      }

      function evaluateLiteral() {
        return tag`Hello, ${'world'}!`
      }

      evaluateLiteral()
      evaluateLiteral()

      // Same strings array is passed each time
      expect(callHistory[0]).toBe(callHistory[1])
    })
  })
})
