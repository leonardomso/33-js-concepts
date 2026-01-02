import { describe, it, expect } from 'vitest'

describe('Data Structures', () => {
  describe('Arrays', () => {
    it('should access elements by index in O(1)', () => {
      const arr = ['a', 'b', 'c', 'd', 'e']
      
      expect(arr[0]).toBe('a')
      expect(arr[2]).toBe('c')
      expect(arr[4]).toBe('e')
    })

    it('should add and remove from end with push/pop in O(1)', () => {
      const arr = [1, 2, 3]
      
      arr.push(4)
      expect(arr).toEqual([1, 2, 3, 4])
      
      const popped = arr.pop()
      expect(popped).toBe(4)
      expect(arr).toEqual([1, 2, 3])
    })

    it('should add and remove from beginning with unshift/shift (O(n))', () => {
      const arr = [1, 2, 3]
      
      arr.unshift(0)
      expect(arr).toEqual([0, 1, 2, 3])
      
      const shifted = arr.shift()
      expect(shifted).toBe(0)
      expect(arr).toEqual([1, 2, 3])
    })

    it('should search with indexOf and includes in O(n)', () => {
      const arr = ['apple', 'banana', 'cherry']
      
      expect(arr.indexOf('banana')).toBe(1)
      expect(arr.indexOf('mango')).toBe(-1)
      expect(arr.includes('cherry')).toBe(true)
      expect(arr.includes('grape')).toBe(false)
    })

    it('should insert in middle with splice in O(n)', () => {
      const arr = [1, 2, 4, 5]
      
      // Insert 3 at index 2
      arr.splice(2, 0, 3)
      expect(arr).toEqual([1, 2, 3, 4, 5])
      
      // Remove element at index 2
      arr.splice(2, 1)
      expect(arr).toEqual([1, 2, 4, 5])
    })
  })

  describe('Objects', () => {
    it('should access, add, and delete properties in O(1)', () => {
      const user = { name: 'Alice', age: 30 }
      
      // Access
      expect(user.name).toBe('Alice')
      expect(user['age']).toBe(30)
      
      // Add
      user.email = 'alice@example.com'
      expect(user.email).toBe('alice@example.com')
      
      // Delete
      delete user.email
      expect(user.email).toBe(undefined)
    })

    it('should check for key existence', () => {
      const user = { name: 'Alice' }
      
      expect('name' in user).toBe(true)
      expect('age' in user).toBe(false)
      expect(user.hasOwnProperty('name')).toBe(true)
    })

    it('should convert numeric keys to strings', () => {
      const obj = {}
      obj[1] = 'one'
      obj['1'] = 'one as string'
      
      // Both are the same key!
      expect(Object.keys(obj)).toEqual(['1'])
      expect(obj[1]).toBe('one as string')
      expect(obj['1']).toBe('one as string')
    })
  })

  describe('Map', () => {
    it('should use any value type as key', () => {
      const map = new Map()
      
      const objKey = { id: 1 }
      const funcKey = () => {}
      
      map.set('string', 'string key')
      map.set(123, 'number key')
      map.set(objKey, 'object key')
      map.set(funcKey, 'function key')
      map.set(true, 'boolean key')
      
      expect(map.get('string')).toBe('string key')
      expect(map.get(123)).toBe('number key')
      expect(map.get(objKey)).toBe('object key')
      expect(map.get(funcKey)).toBe('function key')
      expect(map.get(true)).toBe('boolean key')
    })

    it('should have a size property', () => {
      const map = new Map()
      map.set('a', 1)
      map.set('b', 2)
      map.set('c', 3)
      
      expect(map.size).toBe(3)
    })

    it('should check existence with has()', () => {
      const map = new Map([['key', 'value']])
      
      expect(map.has('key')).toBe(true)
      expect(map.has('nonexistent')).toBe(false)
    })

    it('should delete entries', () => {
      const map = new Map([['a', 1], ['b', 2]])
      
      map.delete('a')
      expect(map.has('a')).toBe(false)
      expect(map.size).toBe(1)
    })

    it('should maintain insertion order', () => {
      const map = new Map()
      map.set('first', 1)
      map.set('second', 2)
      map.set('third', 3)
      
      const keys = [...map.keys()]
      expect(keys).toEqual(['first', 'second', 'third'])
    })

    it('should iterate with for...of', () => {
      const map = new Map([['a', 1], ['b', 2]])
      const entries = []
      
      for (const [key, value] of map) {
        entries.push([key, value])
      }
      
      expect(entries).toEqual([['a', 1], ['b', 2]])
    })

    it('should be useful for counting occurrences', () => {
      function countWords(text) {
        const words = text.toLowerCase().split(/\s+/)
        const counts = new Map()
        
        for (const word of words) {
          counts.set(word, (counts.get(word) || 0) + 1)
        }
        
        return counts
      }
      
      const result = countWords('the cat and the dog')
      expect(result.get('the')).toBe(2)
      expect(result.get('cat')).toBe(1)
      expect(result.get('and')).toBe(1)
    })
  })

  describe('Set', () => {
    it('should store only unique values', () => {
      const set = new Set()
      
      set.add(1)
      set.add(2)
      set.add(2)  // Duplicate - ignored
      set.add(3)
      set.add(3)  // Duplicate - ignored
      
      expect(set.size).toBe(3)
      expect([...set]).toEqual([1, 2, 3])
    })

    it('should check existence with has()', () => {
      const set = new Set([1, 2, 3])
      
      expect(set.has(2)).toBe(true)
      expect(set.has(5)).toBe(false)
    })

    it('should remove duplicates from array', () => {
      const numbers = [1, 2, 2, 3, 3, 3, 4]
      const unique = [...new Set(numbers)]
      
      expect(unique).toEqual([1, 2, 3, 4])
    })

    it('should delete values', () => {
      const set = new Set([1, 2, 3])
      
      set.delete(2)
      expect(set.has(2)).toBe(false)
      expect(set.size).toBe(2)
    })

    it('should iterate in insertion order', () => {
      const set = new Set()
      set.add('first')
      set.add('second')
      set.add('third')
      
      expect([...set]).toEqual(['first', 'second', 'third'])
    })

    it('should perform set operations (ES2024+)', () => {
      const a = new Set([1, 2, 3])
      const b = new Set([2, 3, 4])
      
      // Skip if ES2024 Set methods not available
      if (typeof a.union !== 'function') {
        // Manual implementation for older environments
        const union = new Set([...a, ...b])
        expect([...union].sort()).toEqual([1, 2, 3, 4])
        
        const intersection = new Set([...a].filter(x => b.has(x)))
        expect([...intersection].sort()).toEqual([2, 3])
        
        const difference = new Set([...a].filter(x => !b.has(x)))
        expect([...difference]).toEqual([1])
        
        return
      }
      
      // Union: elements in either set
      expect([...a.union(b)].sort()).toEqual([1, 2, 3, 4])
      
      // Intersection: elements in both sets
      expect([...a.intersection(b)].sort()).toEqual([2, 3])
      
      // Difference: elements in a but not in b
      expect([...a.difference(b)]).toEqual([1])
      
      // Symmetric difference: elements in either but not both
      expect([...a.symmetricDifference(b)].sort()).toEqual([1, 4])
    })

    it('should check subset relationships (ES2024+)', () => {
      const small = new Set([1, 2])
      const large = new Set([1, 2, 3, 4])
      
      // Skip if ES2024 Set methods not available
      if (typeof small.isSubsetOf !== 'function') {
        // Manual implementation for older environments
        const isSubset = [...small].every(x => large.has(x))
        expect(isSubset).toBe(true)
        
        const isSuperset = [...small].every(x => large.has(x))
        expect(isSuperset).toBe(true)
        
        const largeIsSubsetOfSmall = [...large].every(x => small.has(x))
        expect(largeIsSubsetOfSmall).toBe(false)
        
        return
      }
      
      expect(small.isSubsetOf(large)).toBe(true)
      expect(large.isSupersetOf(small)).toBe(true)
      expect(large.isSubsetOf(small)).toBe(false)
    })
  })

  describe('WeakMap', () => {
    it('should only accept objects as keys', () => {
      const weakMap = new WeakMap()
      const obj = { id: 1 }
      
      weakMap.set(obj, 'value')
      expect(weakMap.get(obj)).toBe('value')
      
      // Cannot use primitives as keys
      expect(() => weakMap.set('string', 'value')).toThrow(TypeError)
    })

    it('should support get, set, has, delete operations', () => {
      const weakMap = new WeakMap()
      const obj = { id: 1 }
      
      weakMap.set(obj, 'data')
      expect(weakMap.has(obj)).toBe(true)
      expect(weakMap.get(obj)).toBe('data')
      
      weakMap.delete(obj)
      expect(weakMap.has(obj)).toBe(false)
    })

    it('should be useful for private data pattern', () => {
      const privateData = new WeakMap()
      
      class User {
        constructor(name, password) {
          this.name = name
          privateData.set(this, { password })
        }
        
        checkPassword(input) {
          return privateData.get(this).password === input
        }
      }
      
      const user = new User('Alice', 'secret123')
      expect(user.name).toBe('Alice')
      expect(user.password).toBe(undefined)  // Not accessible
      expect(user.checkPassword('secret123')).toBe(true)
      expect(user.checkPassword('wrong')).toBe(false)
    })
  })

  describe('WeakSet', () => {
    it('should only accept objects as values', () => {
      const weakSet = new WeakSet()
      const obj = { id: 1 }
      
      weakSet.add(obj)
      expect(weakSet.has(obj)).toBe(true)
      
      // Cannot use primitives
      expect(() => weakSet.add('string')).toThrow(TypeError)
    })

    it('should be useful for tracking processed objects', () => {
      const processed = new WeakSet()
      
      function processOnce(obj) {
        if (processed.has(obj)) {
          return 'already processed'
        }
        processed.add(obj)
        return 'processed'
      }
      
      const obj = { data: 'test' }
      expect(processOnce(obj)).toBe('processed')
      expect(processOnce(obj)).toBe('already processed')
    })
  })

  describe('Stack Implementation', () => {
    class Stack {
      constructor() {
        this.items = []
      }
      
      push(item) {
        this.items.push(item)
      }
      
      pop() {
        return this.items.pop()
      }
      
      peek() {
        return this.items[this.items.length - 1]
      }
      
      isEmpty() {
        return this.items.length === 0
      }
      
      size() {
        return this.items.length
      }
    }

    it('should follow LIFO (Last In, First Out)', () => {
      const stack = new Stack()
      
      stack.push(1)
      stack.push(2)
      stack.push(3)
      
      expect(stack.pop()).toBe(3)  // Last in
      expect(stack.pop()).toBe(2)
      expect(stack.pop()).toBe(1)  // First in
    })

    it('should peek without removing', () => {
      const stack = new Stack()
      stack.push('a')
      stack.push('b')
      
      expect(stack.peek()).toBe('b')
      expect(stack.size()).toBe(2)  // Still 2 items
    })

    it('should report isEmpty correctly', () => {
      const stack = new Stack()
      
      expect(stack.isEmpty()).toBe(true)
      
      stack.push(1)
      expect(stack.isEmpty()).toBe(false)
      
      stack.pop()
      expect(stack.isEmpty()).toBe(true)
    })

    it('should handle pop and peek on empty stack', () => {
      const stack = new Stack()
      
      expect(stack.pop()).toBe(undefined)
      expect(stack.peek()).toBe(undefined)
      expect(stack.size()).toBe(0)
    })

    it('should solve valid parentheses problem', () => {
      function isValid(s) {
        const stack = []
        const pairs = { ')': '(', ']': '[', '}': '{' }
        
        for (const char of s) {
          if (char in pairs) {
            if (stack.pop() !== pairs[char]) {
              return false
            }
          } else {
            stack.push(char)
          }
        }
        
        return stack.length === 0
      }
      
      expect(isValid('()')).toBe(true)
      expect(isValid('()[]{}')).toBe(true)
      expect(isValid('([{}])')).toBe(true)
      expect(isValid('(]')).toBe(false)
      expect(isValid('([)]')).toBe(false)
      expect(isValid('(((')).toBe(false)
    })
  })

  describe('Queue Implementation', () => {
    class Queue {
      constructor() {
        this.items = []
      }
      
      enqueue(item) {
        this.items.push(item)
      }
      
      dequeue() {
        return this.items.shift()
      }
      
      front() {
        return this.items[0]
      }
      
      isEmpty() {
        return this.items.length === 0
      }
      
      size() {
        return this.items.length
      }
    }

    it('should follow FIFO (First In, First Out)', () => {
      const queue = new Queue()
      
      queue.enqueue(1)
      queue.enqueue(2)
      queue.enqueue(3)
      
      expect(queue.dequeue()).toBe(1)  // First in
      expect(queue.dequeue()).toBe(2)
      expect(queue.dequeue()).toBe(3)  // Last in
    })

    it('should peek at front without removing', () => {
      const queue = new Queue()
      queue.enqueue('first')
      queue.enqueue('second')
      
      expect(queue.front()).toBe('first')
      expect(queue.size()).toBe(2)  // Still 2 items
    })

    it('should report isEmpty correctly', () => {
      const queue = new Queue()
      
      expect(queue.isEmpty()).toBe(true)
      
      queue.enqueue(1)
      expect(queue.isEmpty()).toBe(false)
      
      queue.dequeue()
      expect(queue.isEmpty()).toBe(true)
    })

    it('should handle dequeue and front on empty queue', () => {
      const queue = new Queue()
      
      expect(queue.dequeue()).toBe(undefined)
      expect(queue.front()).toBe(undefined)
      expect(queue.size()).toBe(0)
    })
  })

  describe('Linked List Implementation', () => {
    class Node {
      constructor(value) {
        this.value = value
        this.next = null
      }
    }

    class LinkedList {
      constructor() {
        this.head = null
        this.size = 0
      }
      
      prepend(value) {
        const node = new Node(value)
        node.next = this.head
        this.head = node
        this.size++
      }
      
      append(value) {
        const node = new Node(value)
        
        if (!this.head) {
          this.head = node
        } else {
          let current = this.head
          while (current.next) {
            current = current.next
          }
          current.next = node
        }
        this.size++
      }
      
      find(value) {
        let current = this.head
        while (current) {
          if (current.value === value) {
            return current
          }
          current = current.next
        }
        return null
      }
      
      toArray() {
        const result = []
        let current = this.head
        while (current) {
          result.push(current.value)
          current = current.next
        }
        return result
      }
    }

    it('should prepend elements in O(1)', () => {
      const list = new LinkedList()
      
      list.prepend(3)
      list.prepend(2)
      list.prepend(1)
      
      expect(list.toArray()).toEqual([1, 2, 3])
    })

    it('should append elements', () => {
      const list = new LinkedList()
      
      list.append(1)
      list.append(2)
      list.append(3)
      
      expect(list.toArray()).toEqual([1, 2, 3])
    })

    it('should find elements', () => {
      const list = new LinkedList()
      list.append(1)
      list.append(2)
      list.append(3)
      
      const found = list.find(2)
      expect(found.value).toBe(2)
      expect(found.next.value).toBe(3)
      
      expect(list.find(5)).toBe(null)
    })

    it('should track size correctly', () => {
      const list = new LinkedList()
      
      expect(list.size).toBe(0)
      
      list.append(1)
      list.append(2)
      list.prepend(0)
      
      expect(list.size).toBe(3)
    })

    it('should handle operations on empty list', () => {
      const list = new LinkedList()
      
      expect(list.head).toBe(null)
      expect(list.find(1)).toBe(null)
      expect(list.toArray()).toEqual([])
    })

    it('should reverse a linked list', () => {
      function reverseList(head) {
        let prev = null
        let current = head
        
        while (current) {
          const next = current.next
          current.next = prev
          prev = current
          current = next
        }
        
        return prev
      }
      
      const list = new LinkedList()
      list.append(1)
      list.append(2)
      list.append(3)
      
      list.head = reverseList(list.head)
      expect(list.toArray()).toEqual([3, 2, 1])
    })
  })

  describe('Binary Search Tree Implementation', () => {
    class TreeNode {
      constructor(value) {
        this.value = value
        this.left = null
        this.right = null
      }
    }

    class BinarySearchTree {
      constructor() {
        this.root = null
      }
      
      insert(value) {
        const node = new TreeNode(value)
        
        if (!this.root) {
          this.root = node
          return
        }
        
        let current = this.root
        while (true) {
          if (value < current.value) {
            if (!current.left) {
              current.left = node
              return
            }
            current = current.left
          } else {
            if (!current.right) {
              current.right = node
              return
            }
            current = current.right
          }
        }
      }
      
      search(value) {
        let current = this.root
        
        while (current) {
          if (value === current.value) {
            return current
          }
          current = value < current.value ? current.left : current.right
        }
        
        return null
      }
      
      inOrder(node = this.root, result = []) {
        if (node) {
          this.inOrder(node.left, result)
          result.push(node.value)
          this.inOrder(node.right, result)
        }
        return result
      }
    }

    it('should insert values following BST property', () => {
      const bst = new BinarySearchTree()
      bst.insert(10)
      bst.insert(5)
      bst.insert(15)
      
      expect(bst.root.value).toBe(10)
      expect(bst.root.left.value).toBe(5)
      expect(bst.root.right.value).toBe(15)
    })

    it('should search for values', () => {
      const bst = new BinarySearchTree()
      bst.insert(10)
      bst.insert(5)
      bst.insert(15)
      bst.insert(3)
      bst.insert(7)
      
      expect(bst.search(7).value).toBe(7)
      expect(bst.search(15).value).toBe(15)
      expect(bst.search(100)).toBe(null)
    })

    it('should return sorted values with in-order traversal', () => {
      const bst = new BinarySearchTree()
      bst.insert(10)
      bst.insert(5)
      bst.insert(15)
      bst.insert(3)
      bst.insert(7)
      bst.insert(20)
      
      expect(bst.inOrder()).toEqual([3, 5, 7, 10, 15, 20])
    })

    it('should find max depth of tree', () => {
      function maxDepth(root) {
        if (!root) return 0
        
        const leftDepth = maxDepth(root.left)
        const rightDepth = maxDepth(root.right)
        
        return Math.max(leftDepth, rightDepth) + 1
      }
      
      const bst = new BinarySearchTree()
      bst.insert(10)
      bst.insert(5)
      bst.insert(15)
      bst.insert(3)
      
      expect(maxDepth(bst.root)).toBe(3)
    })

    it('should handle empty tree operations', () => {
      const bst = new BinarySearchTree()
      
      expect(bst.root).toBe(null)
      expect(bst.search(10)).toBe(null)
      expect(bst.inOrder()).toEqual([])
    })

    it('should handle duplicate values (goes to right subtree)', () => {
      const bst = new BinarySearchTree()
      bst.insert(10)
      bst.insert(10)  // Duplicate
      bst.insert(10)  // Another duplicate
      
      // Duplicates go to the right (based on our implementation: else branch)
      expect(bst.root.value).toBe(10)
      expect(bst.root.right.value).toBe(10)
      expect(bst.root.right.right.value).toBe(10)
      expect(bst.inOrder()).toEqual([10, 10, 10])
    })
  })

  describe('Graph Implementation', () => {
    class Graph {
      constructor() {
        this.adjacencyList = new Map()
      }
      
      addVertex(vertex) {
        if (!this.adjacencyList.has(vertex)) {
          this.adjacencyList.set(vertex, [])
        }
      }
      
      addEdge(v1, v2) {
        this.adjacencyList.get(v1).push(v2)
        this.adjacencyList.get(v2).push(v1)
      }
      
      bfs(start) {
        const visited = new Set()
        const queue = [start]
        const result = []
        
        while (queue.length) {
          const vertex = queue.shift()
          if (visited.has(vertex)) continue
          
          visited.add(vertex)
          result.push(vertex)
          
          for (const neighbor of this.adjacencyList.get(vertex)) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor)
            }
          }
        }
        
        return result
      }
      
      dfs(start, visited = new Set(), result = []) {
        if (visited.has(start)) return result
        
        visited.add(start)
        result.push(start)
        
        for (const neighbor of this.adjacencyList.get(start)) {
          this.dfs(neighbor, visited, result)
        }
        
        return result
      }
    }

    it('should add vertices and edges', () => {
      const graph = new Graph()
      graph.addVertex('A')
      graph.addVertex('B')
      graph.addVertex('C')
      graph.addEdge('A', 'B')
      graph.addEdge('A', 'C')
      
      expect(graph.adjacencyList.get('A')).toContain('B')
      expect(graph.adjacencyList.get('A')).toContain('C')
      expect(graph.adjacencyList.get('B')).toContain('A')
    })

    it('should perform breadth-first search', () => {
      const graph = new Graph()
      graph.addVertex('A')
      graph.addVertex('B')
      graph.addVertex('C')
      graph.addVertex('D')
      graph.addEdge('A', 'B')
      graph.addEdge('A', 'C')
      graph.addEdge('B', 'D')
      
      const result = graph.bfs('A')
      
      // BFS visits level by level
      expect(result[0]).toBe('A')
      expect(result.includes('B')).toBe(true)
      expect(result.includes('C')).toBe(true)
      expect(result.includes('D')).toBe(true)
    })

    it('should perform depth-first search', () => {
      const graph = new Graph()
      graph.addVertex('A')
      graph.addVertex('B')
      graph.addVertex('C')
      graph.addVertex('D')
      graph.addEdge('A', 'B')
      graph.addEdge('A', 'C')
      graph.addEdge('B', 'D')
      
      const result = graph.dfs('A')
      
      // DFS goes deep before wide
      expect(result[0]).toBe('A')
      expect(result.length).toBe(4)
    })
  })

  describe('Common Interview Patterns', () => {
    it('Two Sum - using Map for O(n) lookup', () => {
      function twoSum(nums, target) {
        const seen = new Map()
        
        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i]
          
          if (seen.has(complement)) {
            return [seen.get(complement), i]
          }
          
          seen.set(nums[i], i)
        }
        
        return []
      }
      
      expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1])
      expect(twoSum([3, 2, 4], 6)).toEqual([1, 2])
      expect(twoSum([3, 3], 6)).toEqual([0, 1])
    })

    it('Detect cycle in linked list - Floyd\'s algorithm', () => {
      function hasCycle(head) {
        let slow = head
        let fast = head
        
        while (fast && fast.next) {
          slow = slow.next
          fast = fast.next.next
          
          if (slow === fast) {
            return true
          }
        }
        
        return false
      }
      
      // Create a list with cycle
      const node1 = { val: 1, next: null }
      const node2 = { val: 2, next: null }
      const node3 = { val: 3, next: null }
      node1.next = node2
      node2.next = node3
      node3.next = node1  // Cycle back to node1
      
      expect(hasCycle(node1)).toBe(true)
      
      // List without cycle
      const a = { val: 1, next: null }
      const b = { val: 2, next: null }
      a.next = b
      
      expect(hasCycle(a)).toBe(false)
    })

    it('Queue using two stacks', () => {
      class QueueFromStacks {
        constructor() {
          this.stack1 = []
          this.stack2 = []
        }
        
        enqueue(item) {
          this.stack1.push(item)
        }
        
        dequeue() {
          if (this.stack2.length === 0) {
            while (this.stack1.length) {
              this.stack2.push(this.stack1.pop())
            }
          }
          return this.stack2.pop()
        }
      }
      
      const queue = new QueueFromStacks()
      queue.enqueue(1)
      queue.enqueue(2)
      queue.enqueue(3)
      
      expect(queue.dequeue()).toBe(1)  // FIFO
      expect(queue.dequeue()).toBe(2)
      
      queue.enqueue(4)
      expect(queue.dequeue()).toBe(3)
      expect(queue.dequeue()).toBe(4)
    })
  })

  describe('Choosing the Right Data Structure', () => {
    it('should use Array for ordered data with index access', () => {
      const todos = ['Buy milk', 'Walk dog', 'Write code']
      
      // O(1) access by index
      expect(todos[1]).toBe('Walk dog')
      
      // Easy to iterate
      expect(todos.map(t => t.toUpperCase())).toEqual([
        'BUY MILK', 'WALK DOG', 'WRITE CODE'
      ])
    })

    it('should use Set for unique values and fast lookup', () => {
      const visited = new Set()
      
      // Track unique visitors
      visited.add('user1')
      visited.add('user2')
      visited.add('user1')  // Duplicate ignored
      
      expect(visited.size).toBe(2)
      expect(visited.has('user1')).toBe(true)  // O(1) lookup
    })

    it('should use Map for non-string keys or frequent updates', () => {
      // Using objects as keys
      const cache = new Map()
      const request1 = { url: '/api/users', method: 'GET' }
      const request2 = { url: '/api/posts', method: 'GET' }
      
      cache.set(request1, { data: ['user1', 'user2'] })
      cache.set(request2, { data: ['post1', 'post2'] })
      
      expect(cache.get(request1).data).toEqual(['user1', 'user2'])
    })

    it('should use Stack for undo/redo or backtracking', () => {
      const history = []
      
      // Record actions
      history.push('action1')
      history.push('action2')
      history.push('action3')
      
      // Undo - pop most recent
      const undone = history.pop()
      expect(undone).toBe('action3')
    })

    it('should use Queue for task scheduling', () => {
      const taskQueue = []
      
      // Add tasks
      taskQueue.push('task1')
      taskQueue.push('task2')
      taskQueue.push('task3')
      
      // Process in order
      expect(taskQueue.shift()).toBe('task1')  // First added
      expect(taskQueue.shift()).toBe('task2')
    })
  })
})
