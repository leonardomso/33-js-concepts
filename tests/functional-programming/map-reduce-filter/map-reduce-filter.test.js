import { describe, it, expect } from 'vitest'

describe('map, reduce, filter', () => {
  
  describe('map()', () => {
    it('should transform every element in the array', () => {
      const numbers = [1, 2, 3, 4]
      const doubled = numbers.map(n => n * 2)
      
      expect(doubled).toEqual([2, 4, 6, 8])
    })
    
    it('should not mutate the original array', () => {
      const original = [1, 2, 3]
      const mapped = original.map(n => n * 10)
      
      expect(original).toEqual([1, 2, 3])
      expect(mapped).toEqual([10, 20, 30])
    })
    
    it('should pass element, index, and array to callback', () => {
      const letters = ['a', 'b', 'c']
      const result = letters.map((letter, index, arr) => ({
        letter,
        index,
        arrayLength: arr.length
      }))
      
      expect(result).toEqual([
        { letter: 'a', index: 0, arrayLength: 3 },
        { letter: 'b', index: 1, arrayLength: 3 },
        { letter: 'c', index: 2, arrayLength: 3 }
      ])
    })
    
    it('should return undefined for elements when callback has no return', () => {
      const numbers = [1, 2, 3]
      const result = numbers.map(n => {
        n * 2  // No return statement
      })
      
      expect(result).toEqual([undefined, undefined, undefined])
    })
    
    it('demonstrates the parseInt pitfall', () => {
      const strings = ['1', '2', '3']
      
      // The pitfall: parseInt receives (element, index, array)
      // So it becomes parseInt('1', 0), parseInt('2', 1), parseInt('3', 2)
      const wrongResult = strings.map(parseInt)
      expect(wrongResult).toEqual([1, NaN, NaN])
      
      // The fix: wrap in arrow function or use Number
      const correctResult1 = strings.map(str => parseInt(str, 10))
      expect(correctResult1).toEqual([1, 2, 3])
      
      const correctResult2 = strings.map(Number)
      expect(correctResult2).toEqual([1, 2, 3])
    })
    
    it('should extract properties from objects', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
      
      const names = users.map(user => user.name)
      expect(names).toEqual(['Alice', 'Bob'])
    })
    
    it('should transform object shapes', () => {
      const users = [
        { firstName: 'Alice', lastName: 'Smith' },
        { firstName: 'Bob', lastName: 'Jones' }
      ]
      
      const fullNames = users.map(user => ({
        fullName: `${user.firstName} ${user.lastName}`
      }))
      
      expect(fullNames).toEqual([
        { fullName: 'Alice Smith' },
        { fullName: 'Bob Jones' }
      ])
    })
    
    it('should convert strings to uppercase', () => {
      const words = ['hello', 'world']
      const shouting = words.map(word => word.toUpperCase())
      
      expect(shouting).toEqual(['HELLO', 'WORLD'])
    })
    
    it('should square each number', () => {
      const numbers = [1, 2, 3, 4, 5]
      const squares = numbers.map(n => n * n)
      
      expect(squares).toEqual([1, 4, 9, 16, 25])
    })
    
    it('should add index prefix to each letter', () => {
      const letters = ['a', 'b', 'c', 'd']
      const indexed = letters.map((letter, index) => `${index}: ${letter}`)
      
      expect(indexed).toEqual(['0: a', '1: b', '2: c', '3: d'])
    })
    
    it('should create objects with sequential IDs from items', () => {
      const items = ['apple', 'banana', 'cherry']
      const products = items.map((name, index) => ({
        id: index + 1,
        name
      }))
      
      expect(products).toEqual([
        { id: 1, name: 'apple' },
        { id: 2, name: 'banana' },
        { id: 3, name: 'cherry' }
      ])
    })
  })
  
  describe('filter()', () => {
    it('should keep elements that pass the test', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      const evens = numbers.filter(n => n % 2 === 0)
      
      expect(evens).toEqual([2, 4, 6])
    })
    
    it('should return empty array when no elements match', () => {
      const numbers = [1, 3, 5, 7]
      const evens = numbers.filter(n => n % 2 === 0)
      
      expect(evens).toEqual([])
    })
    
    it('should not mutate the original array', () => {
      const original = [1, 2, 3, 4, 5]
      const filtered = original.filter(n => n > 3)
      
      expect(original).toEqual([1, 2, 3, 4, 5])
      expect(filtered).toEqual([4, 5])
    })
    
    it('should evaluate truthy/falsy values correctly', () => {
      const mixed = [0, 1, '', 'hello', null, undefined, false, true]
      const truthy = mixed.filter(Boolean)
      
      expect(truthy).toEqual([1, 'hello', true])
    })
    
    it('should filter objects by property', () => {
      const users = [
        { name: 'Alice', active: true },
        { name: 'Bob', active: false },
        { name: 'Charlie', active: true }
      ]
      
      const activeUsers = users.filter(user => user.active)
      
      expect(activeUsers).toEqual([
        { name: 'Alice', active: true },
        { name: 'Charlie', active: true }
      ])
    })
    
    it('demonstrates filter vs find', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      
      // filter returns ALL matches as an array
      const allEvens = numbers.filter(n => n % 2 === 0)
      expect(allEvens).toEqual([2, 4, 6])
      
      // find returns the FIRST match (not an array)
      const firstEven = numbers.find(n => n % 2 === 0)
      expect(firstEven).toBe(2)
    })
    
    it('should support multiple conditions', () => {
      const products = [
        { name: 'Laptop', price: 1000, inStock: true },
        { name: 'Phone', price: 500, inStock: false },
        { name: 'Tablet', price: 300, inStock: true }
      ]
      
      const affordableInStock = products.filter(
        p => p.inStock && p.price < 500
      )
      
      expect(affordableInStock).toEqual([
        { name: 'Tablet', price: 300, inStock: true }
      ])
    })
    
    it('should keep only odd numbers', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const odds = numbers.filter(n => n % 2 !== 0)
      
      expect(odds).toEqual([1, 3, 5, 7, 9])
    })
    
    it('should keep numbers greater than threshold', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const big = numbers.filter(n => n > 5)
      
      expect(big).toEqual([6, 7, 8, 9, 10])
    })
    
    it('should keep numbers in a range', () => {
      const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const middle = numbers.filter(n => n >= 3 && n <= 7)
      
      expect(middle).toEqual([3, 4, 5, 6, 7])
    })
    
    it('should search products by name case-insensitively', () => {
      const products = [
        { name: 'MacBook Pro', category: 'laptops', price: 2000 },
        { name: 'iPhone', category: 'phones', price: 1000 },
        { name: 'iPad', category: 'tablets', price: 800 },
        { name: 'Dell XPS', category: 'laptops', price: 1500 }
      ]
      
      const searchTerm = 'mac'
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      expect(results).toEqual([
        { name: 'MacBook Pro', category: 'laptops', price: 2000 }
      ])
    })
    
    it('should filter products by category', () => {
      const products = [
        { name: 'MacBook Pro', category: 'laptops', price: 2000 },
        { name: 'iPhone', category: 'phones', price: 1000 },
        { name: 'iPad', category: 'tablets', price: 800 },
        { name: 'Dell XPS', category: 'laptops', price: 1500 }
      ]
      
      const laptops = products.filter(p => p.category === 'laptops')
      
      expect(laptops).toEqual([
        { name: 'MacBook Pro', category: 'laptops', price: 2000 },
        { name: 'Dell XPS', category: 'laptops', price: 1500 }
      ])
    })
    
    it('should filter products by price range', () => {
      const products = [
        { name: 'MacBook Pro', category: 'laptops', price: 2000 },
        { name: 'iPhone', category: 'phones', price: 1000 },
        { name: 'iPad', category: 'tablets', price: 800 },
        { name: 'Dell XPS', category: 'laptops', price: 1500 }
      ]
      
      const affordable = products.filter(p => p.price <= 1000)
      
      expect(affordable).toEqual([
        { name: 'iPhone', category: 'phones', price: 1000 },
        { name: 'iPad', category: 'tablets', price: 800 }
      ])
    })
  })
  
  describe('reduce()', () => {
    it('should combine array elements into a single value', () => {
      const numbers = [1, 2, 3, 4, 5]
      const sum = numbers.reduce((acc, n) => acc + n, 0)
      
      expect(sum).toBe(15)
    })
    
    it('should use initial value as starting accumulator', () => {
      const numbers = [1, 2, 3]
      const sumStartingAt10 = numbers.reduce((acc, n) => acc + n, 10)
      
      expect(sumStartingAt10).toBe(16) // 10 + 1 + 2 + 3
    })
    
    it('should throw on empty array without initial value', () => {
      const empty = []
      
      expect(() => {
        empty.reduce((acc, n) => acc + n)
      }).toThrow(TypeError)
    })
    
    it('should return initial value for empty array', () => {
      const empty = []
      const result = empty.reduce((acc, n) => acc + n, 0)
      
      expect(result).toBe(0)
    })
    
    it('should count occurrences', () => {
      const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple']
      
      const count = fruits.reduce((acc, fruit) => {
        acc[fruit] = (acc[fruit] || 0) + 1
        return acc
      }, {})
      
      expect(count).toEqual({
        apple: 3,
        banana: 2,
        orange: 1
      })
    })
    
    it('should group by property', () => {
      const people = [
        { name: 'Alice', department: 'Engineering' },
        { name: 'Bob', department: 'Marketing' },
        { name: 'Charlie', department: 'Engineering' }
      ]
      
      const byDepartment = people.reduce((acc, person) => {
        const dept = person.department
        if (!acc[dept]) {
          acc[dept] = []
        }
        acc[dept].push(person.name)
        return acc
      }, {})
      
      expect(byDepartment).toEqual({
        Engineering: ['Alice', 'Charlie'],
        Marketing: ['Bob']
      })
    })
    
    it('should build objects from arrays', () => {
      const pairs = [['a', 1], ['b', 2], ['c', 3]]
      
      const obj = pairs.reduce((acc, [key, value]) => {
        acc[key] = value
        return acc
      }, {})
      
      expect(obj).toEqual({ a: 1, b: 2, c: 3 })
    })
    
    it('can implement map with reduce', () => {
      const numbers = [1, 2, 3, 4]
      
      const doubled = numbers.reduce((acc, n) => {
        acc.push(n * 2)
        return acc
      }, [])
      
      expect(doubled).toEqual([2, 4, 6, 8])
    })
    
    it('can implement filter with reduce', () => {
      const numbers = [1, 2, 3, 4, 5, 6]
      
      const evens = numbers.reduce((acc, n) => {
        if (n % 2 === 0) {
          acc.push(n)
        }
        return acc
      }, [])
      
      expect(evens).toEqual([2, 4, 6])
    })
    
    it('should calculate average', () => {
      const numbers = [10, 20, 30, 40, 50]
      
      const sum = numbers.reduce((acc, n) => acc + n, 0)
      const average = sum / numbers.length
      
      expect(average).toBe(30)
    })
    
    it('should find max value', () => {
      const numbers = [5, 2, 9, 1, 7]
      
      const max = numbers.reduce((acc, n) => n > acc ? n : acc, numbers[0])
      
      expect(max).toBe(9)
    })
    
    it('should find minimum value', () => {
      const numbers = [5, 2, 9, 1, 7]
      
      const min = numbers.reduce((acc, n) => n < acc ? n : acc, numbers[0])
      
      expect(min).toBe(1)
    })
    
    it('should flatten nested arrays with reduce', () => {
      const nested = [[1, 2], [3, 4], [5, 6]]
      
      const flat = nested.reduce((acc, arr) => acc.concat(arr), [])
      
      expect(flat).toEqual([1, 2, 3, 4, 5, 6])
    })
    
    it('should implement myMap using reduce inline', () => {
      const array = [1, 2, 3]
      const callback = n => n * 2
      
      // myMap implementation from concept page
      const result = array.reduce((acc, element, index) => {
        acc.push(callback(element, index, array))
        return acc
      }, [])
      
      expect(result).toEqual([2, 4, 6])
    })
  })
  
  describe('Method Chaining', () => {
    it('should chain filter → map → reduce', () => {
      const products = [
        { name: 'Laptop', price: 1000, inStock: true },
        { name: 'Phone', price: 500, inStock: false },
        { name: 'Tablet', price: 300, inStock: true },
        { name: 'Watch', price: 200, inStock: true }
      ]
      
      const totalInStock = products
        .filter(p => p.inStock)
        .map(p => p.price)
        .reduce((sum, price) => sum + price, 0)
      
      expect(totalInStock).toBe(1500)
    })
    
    it('demonstrates real-world data pipeline', () => {
      const transactions = [
        { type: 'sale', amount: 100 },
        { type: 'refund', amount: 30 },
        { type: 'sale', amount: 200 },
        { type: 'sale', amount: 150 },
        { type: 'refund', amount: 50 }
      ]
      
      // Calculate total sales (not refunds)
      const totalSales = transactions
        .filter(t => t.type === 'sale')
        .map(t => t.amount)
        .reduce((sum, amount) => sum + amount, 0)
      
      expect(totalSales).toBe(450)
      
      // Calculate net (sales - refunds)
      const net = transactions.reduce((acc, t) => {
        return t.type === 'sale' 
          ? acc + t.amount 
          : acc - t.amount
      }, 0)
      
      expect(net).toBe(370) // 450 - 80
    })
    
    it('should get active premium users emails', () => {
      const users = [
        { email: 'alice@example.com', active: true, plan: 'premium' },
        { email: 'bob@example.com', active: false, plan: 'premium' },
        { email: 'charlie@example.com', active: true, plan: 'free' },
        { email: 'diana@example.com', active: true, plan: 'premium' }
      ]
      
      const premiumEmails = users
        .filter(u => u.active)
        .filter(u => u.plan === 'premium')
        .map(u => u.email)
      
      expect(premiumEmails).toEqual([
        'alice@example.com',
        'diana@example.com'
      ])
    })
    
    it('should calculate cart total with discounts', () => {
      const cart = [
        { name: 'Laptop', price: 1000, quantity: 1, discountPercent: 10 },
        { name: 'Mouse', price: 50, quantity: 2, discountPercent: 0 },
        { name: 'Keyboard', price: 100, quantity: 1, discountPercent: 20 }
      ]

      const total = cart
        .map(item => {
          const subtotal = item.price * item.quantity
          const discount = subtotal * (item.discountPercent / 100)
          return subtotal - discount
        })
        .reduce((sum, price) => sum + price, 0)

      // Laptop: 1000 * 1 - 10% = 900
      // Mouse: 50 * 2 - 0% = 100
      // Keyboard: 100 * 1 - 20% = 80
      // Total: 900 + 100 + 80 = 1080
      expect(total).toBe(1080)
    })
    
    it('should get top 3 performers sorted by sales', () => {
      const salespeople = [
        { name: 'Alice', sales: 50000 },
        { name: 'Bob', sales: 75000 },
        { name: 'Charlie', sales: 45000 },
        { name: 'Diana', sales: 90000 },
        { name: 'Eve', sales: 60000 }
      ]

      const top3 = salespeople
        .filter(p => p.sales >= 50000)
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 3)
        .map(p => p.name)

      expect(top3).toEqual(['Diana', 'Bob', 'Eve'])
    })
  })
  
  describe('Other Array Methods', () => {
    it('find() returns first matching element', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ]
      
      const bob = users.find(u => u.id === 2)
      expect(bob).toEqual({ id: 2, name: 'Bob' })
      
      const notFound = users.find(u => u.id === 999)
      expect(notFound).toBeUndefined()
    })
    
    it('some() returns true if any element matches', () => {
      const numbers = [1, 2, 3, 4, 5]
      
      expect(numbers.some(n => n > 4)).toBe(true)
      expect(numbers.some(n => n > 10)).toBe(false)
    })
    
    it('every() returns true if all elements match', () => {
      const numbers = [2, 4, 6, 8]
      
      expect(numbers.every(n => n % 2 === 0)).toBe(true)
      expect(numbers.every(n => n > 5)).toBe(false)
    })
    
    it('includes() checks for value membership', () => {
      const fruits = ['apple', 'banana', 'orange']
      
      expect(fruits.includes('banana')).toBe(true)
      expect(fruits.includes('grape')).toBe(false)
    })
    
    it('findIndex() returns index of first match', () => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]
      
      const bobIndex = users.findIndex(u => u.name === 'Bob')
      expect(bobIndex).toBe(1)
      
      const notFoundIndex = users.findIndex(u => u.name === 'Eve')
      expect(notFoundIndex).toBe(-1)
    })
    
    it('flat() flattens nested arrays', () => {
      const nested = [[1, 2], [3, 4], [5, 6]]
      expect(nested.flat()).toEqual([1, 2, 3, 4, 5, 6])
      
      const deepNested = [1, [2, [3, [4]]]]
      expect(deepNested.flat(2)).toEqual([1, 2, 3, [4]])
      expect(deepNested.flat(Infinity)).toEqual([1, 2, 3, 4])
    })
    
    it('flatMap() maps then flattens', () => {
      const sentences = ['hello world', 'foo bar']
      const words = sentences.flatMap(s => s.split(' '))
      
      expect(words).toEqual(['hello', 'world', 'foo', 'bar'])
    })
  })
  
  describe('Common Mistakes', () => {
    it('demonstrates mutation issue in map', () => {
      const users = [
        { name: 'Alice', score: 85 },
        { name: 'Bob', score: 92 }
      ]
      
      // ❌ WRONG: This mutates the original objects
      const mutated = users.map(user => {
        user.score += 5  // Mutates original!
        return user
      })
      
      expect(users[0].score).toBe(90) // Original was mutated!
      
      // Reset for next test
      const users2 = [
        { name: 'Alice', score: 85 },
        { name: 'Bob', score: 92 }
      ]
      
      // ✓ CORRECT: Create new objects
      const notMutated = users2.map(user => ({
        ...user,
        score: user.score + 5
      }))
      
      expect(users2[0].score).toBe(85) // Original unchanged
      expect(notMutated[0].score).toBe(90)
    })
    
    it('demonstrates reduce without initial value type issues', () => {
      const products = [
        { name: 'Laptop', price: 1000 },
        { name: 'Phone', price: 500 }
      ]
      
      // ❌ WRONG: Without initial value, first element becomes accumulator
      // This would try to add 500 to an object, resulting in string concatenation
      const wrongTotal = products.reduce((acc, p) => acc + p.price)
      expect(typeof wrongTotal).toBe('string') // "[object Object]500"
      
      // ✓ CORRECT: Provide initial value
      const correctTotal = products.reduce((acc, p) => acc + p.price, 0)
      expect(correctTotal).toBe(1500)
    })
    
    it('demonstrates forgetting to return accumulator in reduce', () => {
      const numbers = [1, 2, 3, 4]
      
      // ❌ WRONG: No return
      const wrong = numbers.reduce((acc, n) => {
        acc + n  // Missing return!
      }, 0)
      expect(wrong).toBeUndefined()
      
      // ✓ CORRECT: Return accumulator
      const correct = numbers.reduce((acc, n) => {
        return acc + n
      }, 0)
      expect(correct).toBe(10)
    })
    
    it('shows filter+map is clearer than complex reduce', () => {
      const users = [
        { name: 'Alice', active: true },
        { name: 'Bob', active: false },
        { name: 'Charlie', active: true }
      ]

      // Complex reduce approach
      const resultReduce = users.reduce((acc, user) => {
        if (user.active) {
          acc.push(user.name.toUpperCase())
        }
        return acc
      }, [])

      // Clearer filter + map approach
      const resultFilterMap = users
        .filter(u => u.active)
        .map(u => u.name.toUpperCase())

      // Both should produce the same result
      expect(resultReduce).toEqual(['ALICE', 'CHARLIE'])
      expect(resultFilterMap).toEqual(['ALICE', 'CHARLIE'])
    })
  })
  
  describe('Test Your Knowledge Examples', () => {
    it('Q6: filter evens, triple, sum equals 18', () => {
      const result = [1, 2, 3, 4, 5]
        .filter(n => n % 2 === 0)
        .map(n => n * 3)
        .reduce((sum, n) => sum + n, 0)

      // filter: [2, 4]
      // map: [6, 12]
      // reduce: 6 + 12 = 18
      expect(result).toBe(18)
    })
  })
  
  describe('ES2023+ Array Methods', () => {
    it('reduceRight() reduces from right to left', () => {
      const letters = ['a', 'b', 'c']
      const result = letters.reduceRight((acc, s) => acc + s, '')
      
      expect(result).toBe('cba')
    })
    
    it('toSorted() returns sorted copy without mutating original', () => {
      const nums = [3, 1, 2]
      const sorted = nums.toSorted()
      
      expect(sorted).toEqual([1, 2, 3])
      expect(nums).toEqual([3, 1, 2]) // Original unchanged
    })
    
    it('toReversed() returns reversed copy without mutating original', () => {
      const nums = [1, 2, 3]
      const reversed = nums.toReversed()
      
      expect(reversed).toEqual([3, 2, 1])
      expect(nums).toEqual([1, 2, 3]) // Original unchanged
    })
    
    it('toSpliced() returns modified copy without mutating original', () => {
      const nums = [1, 2, 3, 4, 5]
      const spliced = nums.toSpliced(1, 2, 'a', 'b')
      
      expect(spliced).toEqual([1, 'a', 'b', 4, 5])
      expect(nums).toEqual([1, 2, 3, 4, 5]) // Original unchanged
    })
    
    it('Object.groupBy() groups elements by key (ES2024, Node 21+)', () => {
      // Skip test if Object.groupBy is not available (requires Node 21+)
      if (typeof Object.groupBy !== 'function') {
        console.log('Skipping: Object.groupBy not available in this Node version')
        return
      }
      
      const people = [
        { name: 'Alice', department: 'Engineering' },
        { name: 'Bob', department: 'Marketing' },
        { name: 'Charlie', department: 'Engineering' }
      ]
      
      const byDepartment = Object.groupBy(people, person => person.department)
      
      expect(byDepartment.Engineering).toEqual([
        { name: 'Alice', department: 'Engineering' },
        { name: 'Charlie', department: 'Engineering' }
      ])
      expect(byDepartment.Marketing).toEqual([
        { name: 'Bob', department: 'Marketing' }
      ])
    })
  })
  
  describe('Async Callbacks', () => {
    it('map with async returns array of Promises', async () => {
      const ids = [1, 2, 3]
      
      // Simulate async operation
      const asyncDouble = async (n) => n * 2
      
      // Without Promise.all, you get Promises
      const promiseArray = ids.map(id => asyncDouble(id))
      
      expect(promiseArray[0]).toBeInstanceOf(Promise)
      
      // With Promise.all, you get resolved values
      const results = await Promise.all(promiseArray)
      expect(results).toEqual([2, 4, 6])
    })
    
    it('async filter workaround using map then filter', async () => {
      const numbers = [1, 2, 3, 4, 5]
      
      // Simulate async predicate
      const asyncIsEven = async (n) => n % 2 === 0
      
      // Step 1: Get boolean results for each element
      const checks = await Promise.all(numbers.map(n => asyncIsEven(n)))
      
      // Step 2: Filter using the boolean results
      const evens = numbers.filter((_, index) => checks[index])
      
      expect(evens).toEqual([2, 4])
    })
  })
})
