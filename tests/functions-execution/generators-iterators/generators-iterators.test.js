import { describe, it, expect } from 'vitest'

describe('Generators & Iterators', () => {
  describe('Basic Iterator Protocol', () => {
    it('should follow the iterator protocol with { value, done }', () => {
      function createIterator(arr) {
        let index = 0
        return {
          next() {
            if (index < arr.length) {
              return { value: arr[index++], done: false }
            }
            return { value: undefined, done: true }
          }
        }
      }

      const iterator = createIterator([1, 2, 3])

      expect(iterator.next()).toEqual({ value: 1, done: false })
      expect(iterator.next()).toEqual({ value: 2, done: false })
      expect(iterator.next()).toEqual({ value: 3, done: false })
      expect(iterator.next()).toEqual({ value: undefined, done: true })
    })

    it('should allow accessing array iterator via Symbol.iterator', () => {
      const arr = [10, 20, 30]
      const iterator = arr[Symbol.iterator]()

      expect(iterator.next()).toEqual({ value: 10, done: false })
      expect(iterator.next()).toEqual({ value: 20, done: false })
      expect(iterator.next()).toEqual({ value: 30, done: false })
      expect(iterator.next()).toEqual({ value: undefined, done: true })
    })
  })

  describe('Basic Generator Syntax', () => {
    it('should create a generator function with function*', () => {
      function* simpleGenerator() {
        yield 1
        yield 2
        yield 3
      }

      const gen = simpleGenerator()

      expect(gen.next()).toEqual({ value: 1, done: false })
      expect(gen.next()).toEqual({ value: 2, done: false })
      expect(gen.next()).toEqual({ value: 3, done: false })
      expect(gen.next()).toEqual({ value: undefined, done: true })
    })

    it('should not execute until .next() is called', () => {
      let executed = false

      function* trackExecution() {
        executed = true
        yield 'done'
      }

      const gen = trackExecution()
      expect(executed).toBe(false) // Not executed yet!

      gen.next()
      expect(executed).toBe(true) // Now it's executed
    })

    it('should work with for...of loops', () => {
      function* colors() {
        yield 'red'
        yield 'green'
        yield 'blue'
      }

      const result = []
      for (const color of colors()) {
        result.push(color)
      }

      expect(result).toEqual(['red', 'green', 'blue'])
    })

    it('should work with spread operator', () => {
      function* numbers() {
        yield 1
        yield 2
        yield 3
      }

      expect([...numbers()]).toEqual([1, 2, 3])
    })
  })

  describe('yield vs return', () => {
    it('should pause execution at yield and allow resuming', () => {
      const executionOrder = []

      function* trackOrder() {
        executionOrder.push('before first yield')
        yield 'A'
        executionOrder.push('after first yield')
        yield 'B'
        executionOrder.push('after second yield')
      }

      const gen = trackOrder()

      expect(executionOrder).toEqual([])

      gen.next()
      expect(executionOrder).toEqual(['before first yield'])

      gen.next()
      expect(executionOrder).toEqual(['before first yield', 'after first yield'])

      gen.next()
      expect(executionOrder).toEqual([
        'before first yield',
        'after first yield',
        'after second yield'
      ])
    })

    it('should mark done: true on return', () => {
      function* withReturn() {
        yield 'A'
        return 'B'
        yield 'C' // This never executes
      }

      const gen = withReturn()

      expect(gen.next()).toEqual({ value: 'A', done: false })
      expect(gen.next()).toEqual({ value: 'B', done: true })
      expect(gen.next()).toEqual({ value: undefined, done: true })
    })

    it('should NOT include return value in for...of', () => {
      function* withReturn() {
        yield 'A'
        yield 'B'
        return 'C' // Not included in iteration!
      }

      expect([...withReturn()]).toEqual(['A', 'B']) // No 'C'!
    })
  })

  describe('yield* delegation', () => {
    it('should delegate to another iterable', () => {
      function* inner() {
        yield 'a'
        yield 'b'
      }

      function* outer() {
        yield 1
        yield* inner()
        yield 2
      }

      expect([...outer()]).toEqual([1, 'a', 'b', 2])
    })

    it('should delegate to arrays', () => {
      function* withArray() {
        yield 'start'
        yield* [1, 2, 3]
        yield 'end'
      }

      expect([...withArray()]).toEqual(['start', 1, 2, 3, 'end'])
    })

    it('should flatten nested arrays recursively', () => {
      function* flatten(arr) {
        for (const item of arr) {
          if (Array.isArray(item)) {
            yield* flatten(item)
          } else {
            yield item
          }
        }
      }

      const nested = [1, [2, 3, [4, 5]], 6]
      expect([...flatten(nested)]).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  describe('Passing values to generators', () => {
    it('should receive values via .next(value)', () => {
      function* adder() {
        const a = yield 'Enter first number'
        const b = yield 'Enter second number'
        yield a + b
      }

      const gen = adder()

      expect(gen.next().value).toBe('Enter first number')
      expect(gen.next(10).value).toBe('Enter second number')
      expect(gen.next(5).value).toBe(15)
    })

    it('should ignore value passed to first .next()', () => {
      function* capture() {
        const first = yield 'ready'
        yield first
      }

      const gen = capture()

      // First .next() value is ignored because no yield is waiting
      gen.next('IGNORED')
      expect(gen.next('captured').value).toBe('captured')
    })
  })

  describe('Symbol.iterator - Custom Iterables', () => {
    it('should make object iterable with Symbol.iterator', () => {
      const myCollection = {
        items: ['apple', 'banana', 'cherry'],
        [Symbol.iterator]() {
          let index = 0
          const items = this.items
          return {
            next() {
              if (index < items.length) {
                return { value: items[index++], done: false }
              }
              return { value: undefined, done: true }
            }
          }
        }
      }

      expect([...myCollection]).toEqual(['apple', 'banana', 'cherry'])
    })

    it('should make object iterable with generator', () => {
      const myCollection = {
        items: [1, 2, 3],
        *[Symbol.iterator]() {
          yield* this.items
        }
      }

      const result = []
      for (const item of myCollection) {
        result.push(item)
      }

      expect(result).toEqual([1, 2, 3])
    })

    it('should create an iterable Range class', () => {
      class Range {
        constructor(start, end, step = 1) {
          this.start = start
          this.end = end
          this.step = step
        }

        *[Symbol.iterator]() {
          for (let i = this.start; i <= this.end; i += this.step) {
            yield i
          }
        }
      }

      expect([...new Range(1, 5)]).toEqual([1, 2, 3, 4, 5])
      expect([...new Range(0, 10, 2)]).toEqual([0, 2, 4, 6, 8, 10])
      expect([...new Range(5, 1)]).toEqual([]) // Empty when start > end
    })
  })

  describe('Lazy Evaluation', () => {
    it('should compute values on demand', () => {
      let computeCount = 0

      function* lazyComputation() {
        while (true) {
          computeCount++
          yield computeCount
        }
      }

      const gen = lazyComputation()

      expect(computeCount).toBe(0) // Nothing computed yet

      gen.next()
      expect(computeCount).toBe(1)

      gen.next()
      expect(computeCount).toBe(2)

      // Only computed twice, not infinitely
    })

    it('should handle infinite sequences safely with take()', () => {
      function* naturalNumbers() {
        let n = 1
        while (true) {
          yield n++
        }
      }

      function* take(n, iterable) {
        let count = 0
        for (const item of iterable) {
          if (count >= n) return
          yield item
          count++
        }
      }

      expect([...take(5, naturalNumbers())]).toEqual([1, 2, 3, 4, 5])
    })

    it('should generate Fibonacci sequence lazily', () => {
      function* fibonacci() {
        let prev = 0
        let curr = 1

        while (true) {
          yield curr
          const next = prev + curr
          prev = curr
          curr = next
        }
      }

      function* take(n, iterable) {
        let count = 0
        for (const item of iterable) {
          if (count >= n) return
          yield item
          count++
        }
      }

      expect([...take(10, fibonacci())]).toEqual([
        1, 1, 2, 3, 5, 8, 13, 21, 34, 55
      ])
    })
  })

  describe('Common Patterns', () => {
    it('should create a unique ID generator', () => {
      function* createIdGenerator(prefix = 'id') {
        let id = 1
        while (true) {
          yield `${prefix}_${id++}`
        }
      }

      const userIds = createIdGenerator('user')
      const orderIds = createIdGenerator('order')

      expect(userIds.next().value).toBe('user_1')
      expect(userIds.next().value).toBe('user_2')
      expect(orderIds.next().value).toBe('order_1')
      expect(userIds.next().value).toBe('user_3')
      expect(orderIds.next().value).toBe('order_2')
    })

    it('should chunk arrays into batches', () => {
      function* chunk(array, size) {
        for (let i = 0; i < array.length; i += size) {
          yield array.slice(i, i + size)
        }
      }

      const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

      expect([...chunk(data, 3)]).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10]
      ])
    })

    it('should implement filter and map with generators', () => {
      function* filter(iterable, predicate) {
        for (const item of iterable) {
          if (predicate(item)) {
            yield item
          }
        }
      }

      function* map(iterable, transform) {
        for (const item of iterable) {
          yield transform(item)
        }
      }

      function* range(start, end) {
        for (let i = start; i <= end; i++) {
          yield i
        }
      }

      // Pipeline: 1-10 -> filter evens -> double them
      const result = map(
        filter(range(1, 10), n => n % 2 === 0),
        n => n * 2
      )

      expect([...result]).toEqual([4, 8, 12, 16, 20])
    })

    it('should implement a simple state machine', () => {
      function* trafficLight() {
        while (true) {
          yield 'green'
          yield 'yellow'
          yield 'red'
        }
      }

      const light = trafficLight()

      expect(light.next().value).toBe('green')
      expect(light.next().value).toBe('yellow')
      expect(light.next().value).toBe('red')
      expect(light.next().value).toBe('green') // Cycles back
      expect(light.next().value).toBe('yellow')
    })

    it('should traverse a tree structure', () => {
      function* traverseTree(node) {
        yield node.value

        if (node.children) {
          for (const child of node.children) {
            yield* traverseTree(child)
          }
        }
      }

      const tree = {
        value: 'root',
        children: [
          {
            value: 'child1',
            children: [{ value: 'grandchild1' }, { value: 'grandchild2' }]
          },
          {
            value: 'child2',
            children: [{ value: 'grandchild3' }]
          }
        ]
      }

      expect([...traverseTree(tree)]).toEqual([
        'root',
        'child1',
        'grandchild1',
        'grandchild2',
        'child2',
        'grandchild3'
      ])
    })
  })

  describe('Async Generators', () => {
    it('should create async generators with async function*', async () => {
      async function* asyncNumbers() {
        yield await Promise.resolve(1)
        yield await Promise.resolve(2)
        yield await Promise.resolve(3)
      }

      const results = []
      for await (const num of asyncNumbers()) {
        results.push(num)
      }

      expect(results).toEqual([1, 2, 3])
    })

    it('should handle delayed async values', async () => {
      const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

      async function* delayedNumbers() {
        await delay(10)
        yield 1
        await delay(10)
        yield 2
        await delay(10)
        yield 3
      }

      const results = []
      for await (const num of delayedNumbers()) {
        results.push(num)
      }

      expect(results).toEqual([1, 2, 3])
    })

    it('should simulate paginated API fetching', async () => {
      // Mock paginated data
      const mockPages = [
        { items: ['a', 'b'], hasNextPage: true },
        { items: ['c', 'd'], hasNextPage: true },
        { items: ['e'], hasNextPage: false }
      ]

      async function* fetchAllPages() {
        let page = 0
        let hasMore = true

        while (hasMore) {
          // Simulate API call
          const data = await Promise.resolve(mockPages[page])
          yield data.items
          hasMore = data.hasNextPage
          page++
        }
      }

      const allItems = []
      for await (const pageItems of fetchAllPages()) {
        allItems.push(...pageItems)
      }

      expect(allItems).toEqual(['a', 'b', 'c', 'd', 'e'])
    })
  })

  describe('Generator Exhaustion', () => {
    it('should only be iterable once', () => {
      function* nums() {
        yield 1
        yield 2
      }

      const gen = nums()

      expect([...gen]).toEqual([1, 2])
      expect([...gen]).toEqual([]) // Exhausted!
    })

    it('should create fresh generator for each iteration', () => {
      function* nums() {
        yield 1
        yield 2
      }

      expect([...nums()]).toEqual([1, 2])
      expect([...nums()]).toEqual([1, 2]) // Fresh generator each time
    })
  })

  describe('Error Handling', () => {
    it('should allow throwing errors into generator with .throw()', () => {
      function* gen() {
        try {
          yield 'A'
          yield 'B'
        } catch (e) {
          yield `Error: ${e.message}`
        }
      }

      const g = gen()

      expect(g.next().value).toBe('A')
      expect(g.throw(new Error('Something went wrong')).value).toBe(
        'Error: Something went wrong'
      )
    })

    it('should allow early termination with .return()', () => {
      function* gen() {
        yield 1
        yield 2
        yield 3
      }

      const g = gen()

      expect(g.next().value).toBe(1)
      expect(g.return('early exit')).toEqual({ value: 'early exit', done: true })
      expect(g.next()).toEqual({ value: undefined, done: true })
    })
  })
})
