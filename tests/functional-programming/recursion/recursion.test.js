import { describe, it, expect } from 'vitest'
import { JSDOM } from 'jsdom'

describe('Recursion', () => {
  describe('Base Case Handling', () => {
    it('should return immediately when base case is met', () => {
      function countdown(n) {
        if (n <= 0) return 'done'
        return countdown(n - 1)
      }

      expect(countdown(0)).toBe('done')
      expect(countdown(-1)).toBe('done')
    })

    it('should demonstrate countdown pattern from MDX opening example', () => {
      // Exact implementation from MDX lines 9-17 (modified to collect output)
      // Original uses console.log, we collect to array for testing
      function countdown(n, output = []) {
        if (n === 0) {
          output.push('Done!')
          return output
        }
        output.push(n)
        return countdown(n - 1, output)
      }

      // MDX example: countdown(3) outputs 3, 2, 1, Done!
      expect(countdown(3)).toEqual([3, 2, 1, 'Done!'])
      expect(countdown(1)).toEqual([1, 'Done!'])
      expect(countdown(0)).toEqual(['Done!'])
    })

    it('should throw RangeError for infinite recursion (missing base case)', () => {
      function infiniteRecursion(n) {
        // No base case - will crash
        return infiniteRecursion(n - 1)
      }

      expect(() => infiniteRecursion(5)).toThrow(RangeError)
    })

    it('should handle base case that returns a value', () => {
      function sumTo(n) {
        if (n === 1) return 1
        return n + sumTo(n - 1)
      }

      expect(sumTo(1)).toBe(1)
    })
  })

  describe('Classic Algorithms', () => {
    describe('Factorial', () => {
      function factorial(n) {
        if (n <= 1) return 1
        return n * factorial(n - 1)
      }

      it('should calculate factorial correctly', () => {
        expect(factorial(5)).toBe(120)
        expect(factorial(4)).toBe(24)
        expect(factorial(3)).toBe(6)
      })

      it('should handle edge cases (0! = 1, 1! = 1)', () => {
        expect(factorial(0)).toBe(1)
        expect(factorial(1)).toBe(1)
      })

      it('should handle larger numbers', () => {
        expect(factorial(10)).toBe(3628800)
      })
    })

    describe('Fibonacci', () => {
      // Memoized version for efficiency
      function fibonacci(n, memo = {}) {
        if (n in memo) return memo[n]
        if (n <= 1) return n
        memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
        return memo[n]
      }

      it('should return correct Fibonacci numbers', () => {
        expect(fibonacci(6)).toBe(8)
        expect(fibonacci(7)).toBe(13)
        expect(fibonacci(10)).toBe(55)
      })

      it('should handle base cases (fib(0) = 0, fib(1) = 1)', () => {
        expect(fibonacci(0)).toBe(0)
        expect(fibonacci(1)).toBe(1)
      })

      it('should handle larger numbers efficiently with memoization', () => {
        expect(fibonacci(50)).toBe(12586269025)
      })

      it('should follow the Fibonacci sequence pattern', () => {
        // Each number is sum of two preceding ones
        const sequence = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
        sequence.forEach((expected, index) => {
          expect(fibonacci(index)).toBe(expected)
        })
      })
    })

    describe('Sum to N', () => {
      function sumTo(n) {
        if (n <= 1) return n
        return n + sumTo(n - 1)
      }

      it('should sum numbers from 1 to n', () => {
        expect(sumTo(5)).toBe(15) // 1+2+3+4+5
        expect(sumTo(10)).toBe(55)
        expect(sumTo(100)).toBe(5050)
      })

      it('should handle base cases', () => {
        expect(sumTo(1)).toBe(1)
        expect(sumTo(0)).toBe(0)
      })
    })

    describe('Power Function', () => {
      function power(x, n) {
        if (n === 0) return 1
        return x * power(x, n - 1)
      }

      it('should calculate x^n correctly', () => {
        expect(power(2, 3)).toBe(8)
        expect(power(2, 10)).toBe(1024)
        expect(power(3, 4)).toBe(81)
      })

      it('should handle power of 0', () => {
        expect(power(5, 0)).toBe(1)
        expect(power(100, 0)).toBe(1)
      })

      it('should handle power of 1', () => {
        expect(power(7, 1)).toBe(7)
      })
    })

    describe('Power Function (Optimized O(log n))', () => {
      function powerFast(x, n) {
        if (n === 0) return 1

        if (n % 2 === 0) {
          // Even exponent: x^n = (x^(n/2))^2
          const half = powerFast(x, n / 2)
          return half * half
        } else {
          // Odd exponent: x^n = x * x^(n-1)
          return x * powerFast(x, n - 1)
        }
      }

      it('should calculate x^n correctly with O(log n) complexity', () => {
        expect(powerFast(2, 10)).toBe(1024)
        expect(powerFast(3, 4)).toBe(81)
        expect(powerFast(2, 3)).toBe(8)
      })

      it('should handle even exponents efficiently', () => {
        expect(powerFast(2, 8)).toBe(256)
        expect(powerFast(2, 16)).toBe(65536)
        expect(powerFast(5, 4)).toBe(625)
      })

      it('should handle odd exponents', () => {
        expect(powerFast(3, 5)).toBe(243)
        expect(powerFast(2, 7)).toBe(128)
      })

      it('should handle edge cases', () => {
        expect(powerFast(5, 0)).toBe(1)
        expect(powerFast(7, 1)).toBe(7)
        expect(powerFast(100, 0)).toBe(1)
      })

      it('should produce same results as naive power function', () => {
        function powerNaive(x, n) {
          if (n === 0) return 1
          return x * powerNaive(x, n - 1)
        }

        // Test that both implementations produce identical results
        for (let x = 1; x <= 5; x++) {
          for (let n = 0; n <= 10; n++) {
            expect(powerFast(x, n)).toBe(powerNaive(x, n))
          }
        }
      })
    })

    describe('String Reversal', () => {
      function reverse(str) {
        if (str.length <= 1) return str
        return str[str.length - 1] + reverse(str.slice(0, -1))
      }

      it('should reverse a string', () => {
        expect(reverse('hello')).toBe('olleh')
        expect(reverse('world')).toBe('dlrow')
        expect(reverse('recursion')).toBe('noisrucer')
      })

      it('should handle edge cases', () => {
        expect(reverse('')).toBe('')
        expect(reverse('a')).toBe('a')
      })
    })
  })

  describe('Practical Patterns', () => {
    describe('Array Flattening', () => {
      function flatten(arr) {
        let result = []
        for (const item of arr) {
          if (Array.isArray(item)) {
            result = result.concat(flatten(item))
          } else {
            result.push(item)
          }
        }
        return result
      }

      it('should flatten nested arrays', () => {
        expect(flatten([1, [2, [3, 4]], 5])).toEqual([1, 2, 3, 4, 5])
        expect(flatten([1, [2, [3, [4, [5]]]]])).toEqual([1, 2, 3, 4, 5])
      })

      it('should handle already flat arrays', () => {
        expect(flatten([1, 2, 3])).toEqual([1, 2, 3])
      })

      it('should handle empty arrays', () => {
        expect(flatten([])).toEqual([])
        expect(flatten([[], []])).toEqual([])
      })
    })

    describe('Nested Object Traversal', () => {
      function findAllValues(obj, key) {
        let results = []
        for (const k in obj) {
          if (k === key) {
            results.push(obj[k])
          } else if (typeof obj[k] === 'object' && obj[k] !== null) {
            results = results.concat(findAllValues(obj[k], key))
          }
        }
        return results
      }

      it('should find all values for a given key in nested objects', () => {
        const data = {
          name: 'root',
          children: {
            a: { name: 'a', value: 1 },
            b: { name: 'b', value: 2 }
          }
        }

        expect(findAllValues(data, 'name')).toEqual(['root', 'a', 'b'])
        expect(findAllValues(data, 'value')).toEqual([1, 2])
      })

      it('should return empty array if key not found', () => {
        const data = { a: 1, b: 2 }
        expect(findAllValues(data, 'notfound')).toEqual([])
      })
    })

    describe('Finding All Counts (MDX Example)', () => {
      // Exact implementation from MDX lines 410-423
      function findAllCounts(obj) {
        let total = 0

        for (const key in obj) {
          if (key === 'count') {
            total += obj[key]
          } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recurse into nested objects
            total += findAllCounts(obj[key])
          }
        }

        return total
      }

      it('should find and sum all count values in nested object (MDX example)', () => {
        const data = {
          name: 'Company',
          departments: {
            engineering: {
              frontend: { count: 5 },
              backend: { count: 8 }
            },
            sales: { count: 12 }
          }
        }

        expect(findAllCounts(data)).toBe(25) // 5 + 8 + 12
      })

      it('should return 0 for empty object', () => {
        expect(findAllCounts({})).toBe(0)
      })

      it('should return 0 when no count keys exist', () => {
        const data = {
          name: 'Test',
          nested: {
            value: 10,
            deeper: { something: 'else' }
          }
        }
        expect(findAllCounts(data)).toBe(0)
      })

      it('should handle flat object with count', () => {
        expect(findAllCounts({ count: 42 })).toBe(42)
      })

      it('should handle deeply nested counts', () => {
        const data = {
          level1: {
            level2: {
              level3: {
                level4: {
                  count: 100
                }
              }
            }
          }
        }
        expect(findAllCounts(data)).toBe(100)
      })
    })

    describe('Linked List Operations', () => {
      function sumList(node) {
        if (node === null) return 0
        return node.value + sumList(node.next)
      }

      function listLength(node) {
        if (node === null) return 0
        return 1 + listLength(node.next)
      }

      // Modified version of MDX printReverse that collects results instead of console.log
      // MDX implementation (lines 505-509):
      // function printReverse(node) {
      //   if (node === null) return
      //   printReverse(node.next)  // First, go to the end
      //   console.log(node.value)  // Then print on the way back
      // }
      function collectReverse(node, results = []) {
        if (node === null) return results
        collectReverse(node.next, results) // First, go to the end
        results.push(node.value) // Then collect on the way back
        return results
      }

      const list = {
        value: 1,
        next: {
          value: 2,
          next: {
            value: 3,
            next: null
          }
        }
      }

      it('should sum all values in a linked list', () => {
        expect(sumList(list)).toBe(6)
      })

      it('should count nodes in a linked list', () => {
        expect(listLength(list)).toBe(3)
      })

      it('should handle empty list (null)', () => {
        expect(sumList(null)).toBe(0)
        expect(listLength(null)).toBe(0)
      })

      it('should handle single node list', () => {
        const single = { value: 5, next: null }
        expect(sumList(single)).toBe(5)
        expect(listLength(single)).toBe(1)
      })

      it('should collect values in reverse order (printReverse pattern)', () => {
        // MDX shows: printReverse(list) outputs 3, 2, 1
        expect(collectReverse(list)).toEqual([3, 2, 1])
      })

      it('should return empty array for null list (printReverse pattern)', () => {
        expect(collectReverse(null)).toEqual([])
      })

      it('should handle single node for reverse collection', () => {
        const single = { value: 42, next: null }
        expect(collectReverse(single)).toEqual([42])
      })
    })

    describe('Tree Node Counting', () => {
      function countNodes(node) {
        if (node === null) return 0
        return 1 + countNodes(node.left) + countNodes(node.right)
      }

      function sumTree(node) {
        if (node === null) return 0
        return node.value + sumTree(node.left) + sumTree(node.right)
      }

      const tree = {
        value: 1,
        left: {
          value: 2,
          left: { value: 4, left: null, right: null },
          right: { value: 5, left: null, right: null }
        },
        right: {
          value: 3,
          left: null,
          right: null
        }
      }

      it('should count all nodes in a tree', () => {
        expect(countNodes(tree)).toBe(5)
      })

      it('should sum all values in a tree', () => {
        expect(sumTree(tree)).toBe(15) // 1+2+3+4+5
      })

      it('should handle empty tree', () => {
        expect(countNodes(null)).toBe(0)
        expect(sumTree(null)).toBe(0)
      })
    })

    describe('File System Traversal (getTotalSize)', () => {
      // Exact implementation from MDX lines 539-550
      function getTotalSize(node) {
        if (node.type === 'file') {
          return node.size
        }

        // Folder: sum sizes of all children
        let total = 0
        for (const child of node.children) {
          total += getTotalSize(child)
        }
        return total
      }

      it('should calculate total size of file system (MDX example)', () => {
        // Exact data structure from MDX lines 522-537
        const fileSystem = {
          name: 'root',
          type: 'folder',
          children: [
            { name: 'file1.txt', type: 'file', size: 100 },
            {
              name: 'docs',
              type: 'folder',
              children: [
                { name: 'readme.md', type: 'file', size: 50 },
                { name: 'notes.txt', type: 'file', size: 25 }
              ]
            }
          ]
        }

        expect(getTotalSize(fileSystem)).toBe(175) // 100 + 50 + 25
      })

      it('should return size of single file', () => {
        const singleFile = { name: 'test.js', type: 'file', size: 42 }
        expect(getTotalSize(singleFile)).toBe(42)
      })

      it('should return 0 for empty folder', () => {
        const emptyFolder = { name: 'empty', type: 'folder', children: [] }
        expect(getTotalSize(emptyFolder)).toBe(0)
      })

      it('should handle deeply nested folders', () => {
        const deepStructure = {
          name: 'level0',
          type: 'folder',
          children: [
            {
              name: 'level1',
              type: 'folder',
              children: [
                {
                  name: 'level2',
                  type: 'folder',
                  children: [{ name: 'deep.txt', type: 'file', size: 999 }]
                }
              ]
            }
          ]
        }
        expect(getTotalSize(deepStructure)).toBe(999)
      })

      it('should sum files across multiple nested folders', () => {
        const multiFolder = {
          name: 'root',
          type: 'folder',
          children: [
            { name: 'a.txt', type: 'file', size: 10 },
            {
              name: 'sub1',
              type: 'folder',
              children: [
                { name: 'b.txt', type: 'file', size: 20 },
                { name: 'c.txt', type: 'file', size: 30 }
              ]
            },
            {
              name: 'sub2',
              type: 'folder',
              children: [{ name: 'd.txt', type: 'file', size: 40 }]
            }
          ]
        }
        expect(getTotalSize(multiFolder)).toBe(100) // 10 + 20 + 30 + 40
      })
    })

    describe('DOM Traversal (walkDOM)', () => {
      // Exact implementation from MDX lines 461-470
      function walkDOM(node, callback) {
        // Process this node
        callback(node)

        // Recurse into child nodes
        for (const child of node.children) {
          walkDOM(child, callback)
        }
      }

      it('should collect all tag names in document order (MDX example)', () => {
        const dom = new JSDOM(`
          <body>
            <div>
              <p></p>
              <span></span>
            </div>
            <footer></footer>
          </body>
        `)

        const tagNames = []
        walkDOM(dom.window.document.body, (node) => {
          tagNames.push(node.tagName)
        })

        expect(tagNames).toEqual(['BODY', 'DIV', 'P', 'SPAN', 'FOOTER'])
      })

      it('should handle single element with no children', () => {
        const dom = new JSDOM(`<body></body>`)

        const tagNames = []
        walkDOM(dom.window.document.body, (node) => {
          tagNames.push(node.tagName)
        })

        expect(tagNames).toEqual(['BODY'])
      })

      it('should handle deeply nested structure', () => {
        const dom = new JSDOM(`
          <body>
            <div>
              <div>
                <div>
                  <p></p>
                </div>
              </div>
            </div>
          </body>
        `)

        const tagNames = []
        walkDOM(dom.window.document.body, (node) => {
          tagNames.push(node.tagName)
        })

        expect(tagNames).toEqual(['BODY', 'DIV', 'DIV', 'DIV', 'P'])
      })

      it('should process nodes in depth-first order', () => {
        const dom = new JSDOM(`
          <body>
            <nav>
              <a></a>
            </nav>
            <main>
              <article>
                <h1></h1>
                <p></p>
              </article>
            </main>
          </body>
        `)

        const tagNames = []
        walkDOM(dom.window.document.body, (node) => {
          tagNames.push(node.tagName)
        })

        expect(tagNames).toEqual(['BODY', 'NAV', 'A', 'MAIN', 'ARTICLE', 'H1', 'P'])
      })

      it('should allow custom callbacks', () => {
        const dom = new JSDOM(`
          <body>
            <div id="first"></div>
            <div id="second"></div>
          </body>
        `)

        const ids = []
        walkDOM(dom.window.document.body, (node) => {
          if (node.id) {
            ids.push(node.id)
          }
        })

        expect(ids).toEqual(['first', 'second'])
      })
    })
  })

  describe('Common Mistakes', () => {
    it('should demonstrate stack overflow without proper base case', () => {
      function badRecursion(n) {
        // Base case uses === instead of <=, causing overflow for negative inputs
        if (n === 0) return 0
        return badRecursion(n - 2) // Skips 0 when starting with odd number
      }

      // Odd number will skip past 0 and cause stack overflow
      expect(() => badRecursion(5)).toThrow(RangeError)
    })

    it('should show difference between returning and not returning recursive call', () => {
      function withReturn(n) {
        if (n === 1) return 1
        return n + withReturn(n - 1)
      }

      function withoutReturn(n) {
        if (n === 1) return 1
        n + withoutReturn(n - 1) // Missing return!
      }

      expect(withReturn(5)).toBe(15)
      expect(withoutReturn(5)).toBeUndefined()
    })
  })

  describe('Optimization', () => {
    it('should demonstrate memoized fibonacci is much faster than naive', () => {
      // Naive implementation (would be very slow for large n)
      function fibNaive(n) {
        if (n <= 1) return n
        return fibNaive(n - 1) + fibNaive(n - 2)
      }

      // Memoized implementation
      function fibMemo(n, memo = {}) {
        if (n in memo) return memo[n]
        if (n <= 1) return n
        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo)
        return memo[n]
      }

      // Both should return the same result
      expect(fibNaive(10)).toBe(55)
      expect(fibMemo(10)).toBe(55)

      // But memoized can handle much larger numbers
      expect(fibMemo(50)).toBe(12586269025)
      // fibNaive(50) would take minutes or crash
    })

    it('should demonstrate tail recursive vs non-tail recursive', () => {
      // Non-tail recursive: multiplication happens AFTER recursive call returns
      function factorialNonTail(n) {
        if (n <= 1) return 1
        return n * factorialNonTail(n - 1)
      }

      // Tail recursive: recursive call is the LAST operation
      function factorialTail(n, acc = 1) {
        if (n <= 1) return acc
        return factorialTail(n - 1, acc * n)
      }

      // Both produce the same result
      expect(factorialNonTail(5)).toBe(120)
      expect(factorialTail(5)).toBe(120)
      expect(factorialNonTail(10)).toBe(3628800)
      expect(factorialTail(10)).toBe(3628800)
    })
  })

  describe('Edge Cases', () => {
    it('should handle recursive function with multiple base cases', () => {
      function fibonacci(n) {
        if (n === 0) return 0 // First base case
        if (n === 1) return 1 // Second base case
        return fibonacci(n - 1) + fibonacci(n - 2)
      }

      expect(fibonacci(0)).toBe(0)
      expect(fibonacci(1)).toBe(1)
      expect(fibonacci(2)).toBe(1)
    })

    it('should handle recursion with multiple recursive calls', () => {
      function sumTree(node) {
        if (node === null) return 0
        // Two recursive calls
        return node.value + sumTree(node.left) + sumTree(node.right)
      }

      const tree = {
        value: 10,
        left: { value: 5, left: null, right: null },
        right: { value: 15, left: null, right: null }
      }

      expect(sumTree(tree)).toBe(30)
    })

    it('should handle mutual recursion', () => {
      function isEven(n) {
        if (n === 0) return true
        return isOdd(n - 1)
      }

      function isOdd(n) {
        if (n === 0) return false
        return isEven(n - 1)
      }

      expect(isEven(4)).toBe(true)
      expect(isEven(5)).toBe(false)
      expect(isOdd(3)).toBe(true)
      expect(isOdd(4)).toBe(false)
    })
  })

  describe('Recursion vs Iteration', () => {
    describe('Factorial (Iterative vs Recursive)', () => {
      // Recursive version (from Classic Algorithms)
      function factorialRecursive(n) {
        if (n <= 1) return 1
        return n * factorialRecursive(n - 1)
      }

      // Exact iterative implementation from MDX lines 585-592
      function factorialIterative(n) {
        let result = 1
        for (let i = 2; i <= n; i++) {
          result *= i
        }
        return result
      }

      it('should produce same results as recursive version', () => {
        expect(factorialIterative(5)).toBe(factorialRecursive(5))
        expect(factorialIterative(10)).toBe(factorialRecursive(10))
      })

      it('should calculate factorial correctly', () => {
        expect(factorialIterative(5)).toBe(120)
        expect(factorialIterative(10)).toBe(3628800)
      })

      it('should handle edge cases (0! = 1, 1! = 1)', () => {
        expect(factorialIterative(0)).toBe(1)
        expect(factorialIterative(1)).toBe(1)
      })

      it('should handle larger numbers without stack overflow', () => {
        // Iterative can handle larger numbers without stack concerns
        expect(factorialIterative(20)).toBe(2432902008176640000)
      })
    })

    describe('Sum Tree (Iterative with Explicit Stack)', () => {
      // Recursive version
      function sumTreeRecursive(node) {
        if (node === null) return 0
        return node.value + sumTreeRecursive(node.left) + sumTreeRecursive(node.right)
      }

      // Exact iterative implementation from MDX lines 814-829
      function sumTreeIterative(root) {
        if (root === null) return 0

        let sum = 0
        const stack = [root]

        while (stack.length > 0) {
          const node = stack.pop()
          sum += node.value

          if (node.right) stack.push(node.right)
          if (node.left) stack.push(node.left)
        }

        return sum
      }

      const tree = {
        value: 1,
        left: {
          value: 2,
          left: { value: 4, left: null, right: null },
          right: { value: 5, left: null, right: null }
        },
        right: {
          value: 3,
          left: null,
          right: null
        }
      }

      it('should produce same results as recursive version', () => {
        expect(sumTreeIterative(tree)).toBe(sumTreeRecursive(tree))
      })

      it('should sum all values in a tree', () => {
        expect(sumTreeIterative(tree)).toBe(15) // 1+2+3+4+5
      })

      it('should handle empty tree (null)', () => {
        expect(sumTreeIterative(null)).toBe(0)
      })

      it('should handle single node tree', () => {
        const single = { value: 42, left: null, right: null }
        expect(sumTreeIterative(single)).toBe(42)
      })

      it('should handle left-only tree', () => {
        const leftOnly = {
          value: 1,
          left: {
            value: 2,
            left: { value: 3, left: null, right: null },
            right: null
          },
          right: null
        }
        expect(sumTreeIterative(leftOnly)).toBe(6)
      })

      it('should handle right-only tree', () => {
        const rightOnly = {
          value: 1,
          left: null,
          right: {
            value: 2,
            left: null,
            right: { value: 3, left: null, right: null }
          }
        }
        expect(sumTreeIterative(rightOnly)).toBe(6)
      })
    })
  })

  describe('Q&A Examples', () => {
    describe('Array Length (Recursive)', () => {
      // Exact implementation from MDX lines 899-910
      function arrayLength(arr) {
        // Base case: empty array has length 0
        if (arr.length === 0) return 0

        // Recursive case: 1 + length of the rest
        return 1 + arrayLength(arr.slice(1))
      }

      it('should calculate array length recursively (MDX example)', () => {
        expect(arrayLength([1, 2, 3, 4])).toBe(4)
      })

      it('should return 0 for empty array', () => {
        expect(arrayLength([])).toBe(0)
      })

      it('should handle single element array', () => {
        expect(arrayLength([42])).toBe(1)
      })

      it('should work with arrays of different types', () => {
        expect(arrayLength(['a', 'b', 'c'])).toBe(3)
        expect(arrayLength([{ a: 1 }, { b: 2 }])).toBe(2)
        expect(arrayLength([1, 'two', { three: 3 }, [4]])).toBe(4)
      })

      it('should handle longer arrays', () => {
        const longArray = Array.from({ length: 100 }, (_, i) => i)
        expect(arrayLength(longArray)).toBe(100)
      })
    })
  })
})
