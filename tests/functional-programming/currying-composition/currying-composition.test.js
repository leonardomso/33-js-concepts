import { describe, it, expect } from 'vitest'

describe('Currying & Composition', () => {
  describe('Basic Currying', () => {
    describe('Manual Currying with Arrow Functions', () => {
      it('should create a curried function with arrow syntax', () => {
        const add = a => b => c => a + b + c
        
        expect(add(1)(2)(3)).toBe(6)
      })

      it('should allow partial application at each step', () => {
        const add = a => b => c => a + b + c
        
        const add1 = add(1)       // Returns b => c => 1 + b + c
        const add1and2 = add1(2)  // Returns c => 1 + 2 + c
        const result = add1and2(3) // Returns 6
        
        expect(typeof add1).toBe('function')
        expect(typeof add1and2).toBe('function')
        expect(result).toBe(6)
      })

      it('should demonstrate closures preserving arguments', () => {
        const multiply = a => b => a * b
        
        const double = multiply(2)
        const triple = multiply(3)
        
        expect(double(5)).toBe(10)
        expect(triple(5)).toBe(15)
        expect(double(10)).toBe(20)
        expect(triple(10)).toBe(30)
      })
    })

    describe('Traditional Function Currying', () => {
      it('should work with traditional function syntax', () => {
        function curriedAdd(a) {
          return function(b) {
            return function(c) {
              return a + b + c
            }
          }
        }
        
        expect(curriedAdd(1)(2)(3)).toBe(6)
      })
    })

    describe('Pizza Restaurant Example', () => {
      it('should demonstrate the pizza ordering pattern', () => {
        const orderPizza = size => crust => topping => {
          return `${size} ${crust}-crust ${topping} pizza`
        }
        
        expect(orderPizza("Large")("Thin")("Pepperoni"))
          .toBe("Large Thin-crust Pepperoni pizza")
      })

      it('should allow creating reusable order templates', () => {
        const orderPizza = size => crust => topping => {
          return `${size} ${crust}-crust ${topping} pizza`
        }
        
        const orderLarge = orderPizza("Large")
        const orderLargeThin = orderLarge("Thin")
        
        expect(orderLargeThin("Mushroom")).toBe("Large Thin-crust Mushroom pizza")
        expect(orderLargeThin("Hawaiian")).toBe("Large Thin-crust Hawaiian pizza")
      })
    })
  })

  describe('Curry Helper Implementation', () => {
    describe('Basic Two-Argument Curry', () => {
      it('should curry a two-argument function', () => {
        function curry(fn) {
          return function(a) {
            return function(b) {
              return fn(a, b)
            }
          }
        }
        
        const add = (a, b) => a + b
        const curriedAdd = curry(add)
        
        expect(curriedAdd(1)(2)).toBe(3)
      })
    })

    describe('Advanced Curry (Any Number of Arguments)', () => {
      const curry = fn => {
        return function curried(...args) {
          if (args.length >= fn.length) {
            return fn.apply(this, args)
          }
          return (...nextArgs) => curried.apply(this, args.concat(nextArgs))
        }
      }

      it('should support full currying', () => {
        const sum = (a, b, c) => a + b + c
        const curriedSum = curry(sum)
        
        expect(curriedSum(1)(2)(3)).toBe(6)
      })

      it('should support normal function calls', () => {
        const sum = (a, b, c) => a + b + c
        const curriedSum = curry(sum)
        
        expect(curriedSum(1, 2, 3)).toBe(6)
      })

      it('should support mixed calling styles', () => {
        const sum = (a, b, c) => a + b + c
        const curriedSum = curry(sum)
        
        expect(curriedSum(1, 2)(3)).toBe(6)
        expect(curriedSum(1)(2, 3)).toBe(6)
      })

      it('should work with functions of different arities', () => {
        const add2 = (a, b) => a + b
        const add4 = (a, b, c, d) => a + b + c + d
        
        const curriedAdd2 = curry(add2)
        const curriedAdd4 = curry(add4)
        
        expect(curriedAdd2(1)(2)).toBe(3)
        expect(curriedAdd4(1)(2)(3)(4)).toBe(10)
        expect(curriedAdd4(1, 2)(3, 4)).toBe(10)
      })
    })

    describe('curryN (Explicit Arity)', () => {
      const curryN = (fn, arity) => {
        return function curried(...args) {
          if (args.length >= arity) {
            return fn(...args)
          }
          return (...nextArgs) => curried(...args, ...nextArgs)
        }
      }

      it('should curry variadic functions with explicit arity', () => {
        const sum = (...nums) => nums.reduce((a, b) => a + b, 0)
        
        const curriedSum3 = curryN(sum, 3)
        const curriedSum5 = curryN(sum, 5)
        
        expect(curriedSum3(1)(2)(3)).toBe(6)
        expect(curriedSum5(1)(2)(3)(4)(5)).toBe(15)
      })
    })
  })

  describe('Currying vs Partial Application', () => {
    describe('Currying (One Argument at a Time)', () => {
      it('should demonstrate currying with unary functions', () => {
        const curriedAdd = a => b => c => a + b + c
        
        // Each call takes exactly ONE argument
        const step1 = curriedAdd(1)  // Returns function
        const step2 = step1(2)       // Returns function
        const step3 = step2(3)       // Returns 6
        
        expect(typeof step1).toBe('function')
        expect(typeof step2).toBe('function')
        expect(step3).toBe(6)
      })
    })

    describe('Partial Application (Fix Some Args)', () => {
      const partial = (fn, ...presetArgs) => {
        return (...laterArgs) => fn(...presetArgs, ...laterArgs)
      }

      it('should fix some arguments upfront', () => {
        const greet = (greeting, punctuation, name) => {
          return `${greeting}, ${name}${punctuation}`
        }
        
        const greetExcitedly = partial(greet, "Hello", "!")
        
        expect(greetExcitedly("Alice")).toBe("Hello, Alice!")
        expect(greetExcitedly("Bob")).toBe("Hello, Bob!")
      })

      it('should take remaining arguments together, not one at a time', () => {
        const add = (a, b, c, d) => a + b + c + d
        
        const add10 = partial(add, 10)
        
        // Takes remaining 3 args at once
        expect(add10(1, 2, 3)).toBe(16)
      })

      it('should differ from currying in how arguments are collected', () => {
        const add = (a, b, c) => a + b + c
        
        // Curried: takes args one at a time
        const curriedAdd = a => b => c => a + b + c
        
        // Partial: fixes some args, takes rest together
        const add1 = partial(add, 1)
        
        // Curried needs 3 calls
        expect(curriedAdd(1)(2)(3)).toBe(6)
        
        // Partial takes remaining in one call
        expect(add1(2, 3)).toBe(6)
      })
    })
  })

  describe('Real-World Currying Patterns', () => {
    describe('Configurable Logger', () => {
      it('should create specialized loggers', () => {
        const logs = []
        
        const createLogger = level => prefix => message => {
          const logEntry = `[${level}] ${prefix}: ${message}`
          logs.push(logEntry)
          return logEntry
        }
        
        const infoLogger = createLogger('INFO')('App')
        const errorLogger = createLogger('ERROR')('App')
        
        expect(infoLogger('Started')).toBe('[INFO] App: Started')
        expect(errorLogger('Failed')).toBe('[ERROR] App: Failed')
      })
    })

    describe('API Client Factory', () => {
      it('should create specialized API clients', () => {
        const createApiUrl = baseUrl => endpoint => params => {
          const queryString = new URLSearchParams(params).toString()
          return `${baseUrl}${endpoint}${queryString ? '?' + queryString : ''}`
        }
        
        const githubApi = createApiUrl('https://api.github.com')
        const getUsers = githubApi('/users')
        
        expect(getUsers({})).toBe('https://api.github.com/users')
        expect(getUsers({ per_page: 10 })).toBe('https://api.github.com/users?per_page=10')
      })
    })

    describe('Validation Functions', () => {
      it('should create reusable validators', () => {
        const isGreaterThan = min => value => value > min
        const isLessThan = max => value => value < max
        const hasLength = length => str => str.length === length
        
        const isAdult = isGreaterThan(17)
        const isValidAge = isLessThan(120)
        const isValidZipCode = hasLength(5)
        
        expect(isAdult(18)).toBe(true)
        expect(isAdult(15)).toBe(false)
        expect(isValidAge(50)).toBe(true)
        expect(isValidAge(150)).toBe(false)
        expect(isValidZipCode('12345')).toBe(true)
        expect(isValidZipCode('1234')).toBe(false)
      })

      it('should work with array methods', () => {
        const isGreaterThan = min => value => value > min
        const isAdult = isGreaterThan(17)
        
        const ages = [15, 22, 45, 8, 67]
        const adults = ages.filter(isAdult)
        
        expect(adults).toEqual([22, 45, 67])
      })
    })

    describe('Discount Calculator', () => {
      it('should create specialized discount functions', () => {
        const applyDiscount = discountPercent => price => {
          return price * (1 - discountPercent / 100)
        }
        
        const tenPercentOff = applyDiscount(10)
        const twentyPercentOff = applyDiscount(20)
        const blackFridayDeal = applyDiscount(50)
        
        expect(tenPercentOff(100)).toBe(90)
        expect(twentyPercentOff(100)).toBe(80)
        expect(blackFridayDeal(100)).toBe(50)
      })

      it('should work with array map', () => {
        const applyDiscount = discountPercent => price => {
          return price * (1 - discountPercent / 100)
        }
        
        const tenPercentOff = applyDiscount(10)
        const prices = [100, 200, 50, 75]
        
        const discountedPrices = prices.map(tenPercentOff)
        
        expect(discountedPrices).toEqual([90, 180, 45, 67.5])
      })
    })

    describe('Event Handler Configuration', () => {
      it('should configure event handlers step by step', () => {
        const handlers = []
        
        const handleEvent = eventType => elementId => callback => {
          const handler = { eventType, elementId, callback }
          handlers.push(handler)
          return handler
        }
        
        const onClick = handleEvent('click')
        const onClickButton = onClick('myButton')
        
        const handler = onClickButton(() => 'clicked!')
        
        expect(handler.eventType).toBe('click')
        expect(handler.elementId).toBe('myButton')
        expect(handler.callback()).toBe('clicked!')
      })
    })
  })

  describe('Function Composition', () => {
    describe('pipe() Implementation', () => {
      const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

      it('should compose functions left-to-right', () => {
        const add1 = x => x + 1
        const double = x => x * 2
        const square = x => x * x
        
        const process = pipe(add1, double, square)
        
        // 5 → 6 → 12 → 144
        expect(process(5)).toBe(144)
      })

      it('should process single functions', () => {
        const double = x => x * 2
        const process = pipe(double)
        
        expect(process(5)).toBe(10)
      })

      it('should handle identity when empty', () => {
        const pipe = (...fns) => x => fns.length ? fns.reduce((acc, fn) => fn(acc), x) : x
        const identity = pipe()
        
        expect(identity(5)).toBe(5)
      })
    })

    describe('compose() Implementation', () => {
      const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

      it('should compose functions right-to-left', () => {
        const add1 = x => x + 1
        const double = x => x * 2
        const square = x => x * x
        
        // Functions listed in reverse execution order
        const process = compose(square, double, add1)
        
        // 5 → 6 → 12 → 144 (same result as pipe(add1, double, square))
        expect(process(5)).toBe(144)
      })

      it('should be equivalent to pipe with reversed arguments', () => {
        const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)
        const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)
        
        const add1 = x => x + 1
        const double = x => x * 2
        
        const piped = pipe(add1, double)
        const composed = compose(double, add1)
        
        expect(piped(5)).toBe(composed(5))
      })
    })

    describe('String Transformation Pipeline', () => {
      const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

      it('should transform strings through a pipeline', () => {
        const getName = obj => obj.name
        const trim = str => str.trim()
        const toUpperCase = str => str.toUpperCase()
        const addExclaim = str => str + '!'
        
        const shout = pipe(getName, trim, toUpperCase, addExclaim)
        
        expect(shout({ name: '  alice  ' })).toBe('ALICE!')
      })

      it('should convert to camelCase', () => {
        const trim = str => str.trim()
        const toLowerCase = str => str.toLowerCase()
        const splitWords = str => str.split(' ')
        const capitalizeFirst = words => words.map((w, i) => 
          i === 0 ? w : w[0].toUpperCase() + w.slice(1)
        )
        const joinWords = words => words.join('')
        
        const toCamelCase = pipe(
          trim,
          toLowerCase,
          splitWords,
          capitalizeFirst,
          joinWords
        )
        
        expect(toCamelCase('  HELLO WORLD  ')).toBe('helloWorld')
        expect(toCamelCase('my variable name')).toBe('myVariableName')
      })
    })

    describe('Data Transformation Pipeline', () => {
      const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

      it('should process array data through pipeline', () => {
        const users = [
          { name: 'Alice', age: 25, active: true },
          { name: 'Bob', age: 17, active: true },
          { name: 'Charlie', age: 30, active: false },
          { name: 'Diana', age: 22, active: true }
        ]
        
        const processUsers = pipe(
          users => users.filter(u => u.active),
          users => users.filter(u => u.age >= 18),
          users => users.map(u => u.name),
          names => names.sort()
        )
        
        expect(processUsers(users)).toEqual(['Alice', 'Diana'])
      })
    })
  })

  describe('Currying + Composition Together', () => {
    const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

    describe('Data-Last Parameter Order', () => {
      it('should enable composition with data-last curried functions', () => {
        const map = fn => arr => arr.map(fn)
        const filter = fn => arr => arr.filter(fn)
        
        const double = x => x * 2
        const isEven = x => x % 2 === 0
        
        const doubleEvens = pipe(
          filter(isEven),
          map(double)
        )
        
        expect(doubleEvens([1, 2, 3, 4, 5, 6])).toEqual([4, 8, 12])
      })

      it('should show why data-first is harder to compose', () => {
        // Data-first: harder to compose
        const mapFirst = (arr, fn) => arr.map(fn)
        const filterFirst = (arr, fn) => arr.filter(fn)
        
        // Can't easily pipe these without wrapping
        const double = x => x * 2
        const isEven = x => x % 2 === 0
        
        // Would need manual wrapping:
        const result = mapFirst(filterFirst([1, 2, 3, 4, 5, 6], isEven), double)
        expect(result).toEqual([4, 8, 12])
      })
    })

    describe('Curried Functions in Pipelines', () => {
      it('should compose curried arithmetic functions', () => {
        const add = a => b => a + b
        const multiply = a => b => a * b
        const subtract = a => b => b - a
        
        const add5 = add(5)
        const double = multiply(2)
        const subtract3 = subtract(3)
        
        const process = pipe(add5, double, subtract3)
        
        // 10 → 15 → 30 → 27
        expect(process(10)).toBe(27)
      })

      it('should demonstrate point-free style', () => {
        const prop = key => obj => obj[key]
        const toUpper = str => str.toUpperCase()
        
        // Point-free: no explicit data parameter
        const getUpperName = pipe(
          prop('name'),
          toUpper
        )
        
        expect(getUpperName({ name: 'alice' })).toBe('ALICE')
        expect(getUpperName({ name: 'bob' })).toBe('BOB')
      })
    })

    describe('Complex Pipeline with Currying', () => {
      it('should process user data through curried pipeline', () => {
        const prop = key => obj => obj[key]
        const map = fn => arr => arr.map(fn)
        const filter = pred => arr => arr.filter(pred)
        const sort = compareFn => arr => [...arr].sort(compareFn)
        const take = n => arr => arr.slice(0, n)
        
        const users = [
          { id: 1, name: 'Zara', score: 85 },
          { id: 2, name: 'Alice', score: 92 },
          { id: 3, name: 'Bob', score: 78 },
          { id: 4, name: 'Charlie', score: 95 }
        ]
        
        const getTopScorers = pipe(
          filter(u => u.score >= 80),
          sort((a, b) => b.score - a.score),
          take(2),
          map(prop('name'))
        )
        
        expect(getTopScorers(users)).toEqual(['Charlie', 'Alice'])
      })
    })
  })

  describe('Interview Questions', () => {
    describe('Implement sum(1)(2)(3)...(n)()', () => {
      it('should return sum when called with no arguments', () => {
        function sum(a) {
          return function next(b) {
            if (b === undefined) {
              return a
            }
            return sum(a + b)
          }
        }
        
        expect(sum(1)(2)(3)()).toBe(6)
        expect(sum(1)(2)(3)(4)(5)()).toBe(15)
        expect(sum(10)()).toBe(10)
      })
    })

    describe('Infinite Currying with valueOf', () => {
      it('should return sum when coerced to number', () => {
        function sum(a) {
          const fn = b => sum(a + b)
          fn.valueOf = () => a
          return fn
        }
        
        expect(+sum(1)(2)(3)).toBe(6)
        expect(+sum(1)(2)(3)(4)(5)).toBe(15)
      })
    })

    describe('Fix map + parseInt Issue', () => {
      it('should demonstrate the problem', () => {
        const result = ['1', '2', '3'].map(parseInt)
        // parseInt receives (value, index, array)
        // parseInt('1', 0) → 1
        // parseInt('2', 1) → NaN (base 1 is invalid)
        // parseInt('3', 2) → NaN (3 is not valid in base 2)
        expect(result).toEqual([1, NaN, NaN])
      })

      it('should fix with unary wrapper', () => {
        const unary = fn => arg => fn(arg)
        
        const result = ['1', '2', '3'].map(unary(parseInt))
        expect(result).toEqual([1, 2, 3])
      })
    })
  })

  describe('Common Mistakes', () => {
    describe('Forgetting Curried Functions Return Functions', () => {
      it('should demonstrate the mistake', () => {
        const add = a => b => a + b
        
        // Mistake: forgot second call
        const result = add(1)
        
        expect(typeof result).toBe('function')
        expect(result).not.toBe(1)  // Not a number!
        
        // Correct
        expect(add(1)(2)).toBe(3)
      })
    })

    describe('fn.length with Rest Parameters', () => {
      it('should show fn.length is 0 for rest parameters', () => {
        function withRest(...args) {
          return args.reduce((a, b) => a + b, 0)
        }
        
        function withDefault(a, b = 2) {
          return a + b
        }
        
        expect(withRest.length).toBe(0)
        expect(withDefault.length).toBe(1)  // Only counts params before default
      })
    })

    describe('Type Mismatches in Pipelines', () => {
      const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

      it('should show type mismatch issues', () => {
        const getAge = obj => obj.age    // Returns number
        const getLength = arr => arr.length  // Expects array
        
        // This would cause issues
        const broken = pipe(getAge, getLength)
        
        // Numbers have no .length property
        expect(broken({ age: 25 })).toBe(undefined)
      })
    })
  })

  describe('Vanilla JS Utility Functions', () => {
    describe('Complete Utility Set', () => {
      // Curry
      const curry = fn => {
        return function curried(...args) {
          return args.length >= fn.length
            ? fn(...args)
            : (...next) => curried(...args, ...next)
        }
      }

      // Pipe and Compose
      const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)
      const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

      // Partial Application
      const partial = (fn, ...presetArgs) => (...laterArgs) => fn(...presetArgs, ...laterArgs)

      // Data-last utilities
      const map = fn => arr => arr.map(fn)
      const filter = fn => arr => arr.filter(fn)
      const reduce = (fn, initial) => arr => arr.reduce(fn, initial)

      it('should demonstrate all utilities working together', () => {
        const sum = (a, b, c) => a + b + c
        const curriedSum = curry(sum)
        
        expect(curriedSum(1)(2)(3)).toBe(6)
        expect(curriedSum(1, 2)(3)).toBe(6)
        
        const double = x => x * 2
        const add1 = x => x + 1
        
        const process = pipe(add1, double)
        expect(process(5)).toBe(12)
        
        const processReverse = compose(add1, double)
        expect(processReverse(5)).toBe(11)  // double first, then add1
        
        const greet = (greeting, name) => `${greeting}, ${name}!`
        const sayHello = partial(greet, 'Hello')
        expect(sayHello('Alice')).toBe('Hello, Alice!')
        
        const nums = [1, 2, 3, 4, 5]
        const isEven = x => x % 2 === 0
        
        const sumOfDoubledEvens = pipe(
          filter(isEven),
          map(double),
          reduce((a, b) => a + b, 0)
        )
        
        expect(sumOfDoubledEvens(nums)).toBe(12)  // [2,4] → [4,8] → 12
      })
    })
  })

  describe('Practical Examples from Documentation', () => {
    const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)

    describe('Logging Factory', () => {
      it('should create specialized loggers from documentation example', () => {
        const logs = []
        
        const createLogger = level => withTimestamp => message => {
          const timestamp = withTimestamp ? '2024-01-15T10:30:00Z' : ''
          const logEntry = `[${level}]${timestamp ? ' ' + timestamp : ''} ${message}`
          logs.push(logEntry)
          return logEntry
        }
        
        const info = createLogger('INFO')(true)
        const quickLog = createLogger('LOG')(false)
        
        expect(info('Application started')).toBe('[INFO] 2024-01-15T10:30:00Z Application started')
        expect(quickLog('Quick debug')).toBe('[LOG] Quick debug')
      })
    })

    describe('Assembly Line Pipeline', () => {
      it('should transform user data as shown in documentation', () => {
        const getName = obj => obj.name
        const trim = str => str.trim()
        const toLowerCase = str => str.toLowerCase()
        
        const processUser = pipe(getName, trim, toLowerCase)
        
        expect(processUser({ name: '  ALICE  ' })).toBe('alice')
      })
    })
  })

  describe('Additional Documentation Examples', () => {
    const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x)
    const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x)

    describe('Real-World Pipeline: Processing API Data (doc lines 729-756)', () => {
      it('should process API response through complete pipeline', () => {
        // Mock API response matching documentation example
        const apiResponse = {
          data: [
            { id: 1, firstName: 'Charlie', lastName: 'Brown', email: 'charlie@test.com', isActive: true },
            { id: 2, firstName: 'Alice', lastName: 'Smith', email: 'alice@test.com', isActive: false },
            { id: 3, firstName: 'Bob', lastName: 'Jones', email: 'bob@test.com', isActive: true },
            { id: 4, firstName: 'Diana', lastName: 'Prince', email: 'diana@test.com', isActive: true },
            { id: 5, firstName: 'Eve', lastName: 'Wilson', email: 'eve@test.com', isActive: true },
            { id: 6, firstName: 'Frank', lastName: 'Miller', email: 'frank@test.com', isActive: true },
            { id: 7, firstName: 'Grace', lastName: 'Lee', email: 'grace@test.com', isActive: true },
            { id: 8, firstName: 'Henry', lastName: 'Taylor', email: 'henry@test.com', isActive: true },
            { id: 9, firstName: 'Ivy', lastName: 'Chen', email: 'ivy@test.com', isActive: true },
            { id: 10, firstName: 'Jack', lastName: 'Davis', email: 'jack@test.com', isActive: true },
            { id: 11, firstName: 'Kate', lastName: 'Moore', email: 'kate@test.com', isActive: true },
            { id: 12, firstName: 'Leo', lastName: 'Garcia', email: 'leo@test.com', isActive: true }
          ]
        }

        // Transform API response into display format (matching doc example)
        const processApiResponse = pipe(
          // Extract data from response
          response => response.data,
          
          // Filter active users only
          users => users.filter(u => u.isActive),
          
          // Sort by name (using lastName for sorting)
          users => users.sort((a, b) => a.firstName.localeCompare(b.firstName)),
          
          // Transform to display format
          users => users.map(u => ({
            id: u.id,
            displayName: `${u.firstName} ${u.lastName}`,
            email: u.email
          })),
          
          // Take first 10
          users => users.slice(0, 10)
        )

        const result = processApiResponse(apiResponse)
        
        // Verify pipeline worked correctly
        expect(result).toHaveLength(10)
        
        // Alice was filtered out (isActive: false)
        expect(result.find(u => u.displayName === 'Alice Smith')).toBeUndefined()
        
        // First user should be Bob (alphabetically first among active users)
        expect(result[0].displayName).toBe('Bob Jones')
        
        // Verify display format
        expect(result[0]).toHaveProperty('id')
        expect(result[0]).toHaveProperty('displayName')
        expect(result[0]).toHaveProperty('email')
        
        // Verify sorting (alphabetical by firstName)
        const names = result.map(u => u.displayName.split(' ')[0])
        const sortedNames = [...names].sort()
        expect(names).toEqual(sortedNames)
      })
    })

    describe('compose() Direction Example (doc lines 658-664)', () => {
      it('should process right-to-left with getName/toUpperCase/addExclaim', () => {
        const getName = obj => obj.name
        const toUpperCase = str => str.toUpperCase()
        const addExclaim = str => str + '!'

        // compose processes right-to-left
        const shout = compose(addExclaim, toUpperCase, getName)
        
        expect(shout({ name: 'alice' })).toBe('ALICE!')
        
        // This is equivalent to nested calls:
        const manualResult = addExclaim(toUpperCase(getName({ name: 'alice' })))
        expect(shout({ name: 'alice' })).toBe(manualResult)
      })
    })

    describe('pipe/compose Equivalence (doc lines 669-672)', () => {
      it('should produce same result: pipe(a, b, c)(x) === compose(c, b, a)(x)', () => {
        const a = x => x + 1
        const b = x => x * 2
        const c = x => x - 3
        
        const input = 10
        
        // pipe: a first, then b, then c
        const pipedResult = pipe(a, b, c)(input)
        
        // compose: c(b(a(x))) - reversed argument order
        const composedResult = compose(c, b, a)(input)
        
        expect(pipedResult).toBe(composedResult)
        
        // Verify the actual value: (10 + 1) * 2 - 3 = 19
        expect(pipedResult).toBe(19)
      })

      it('should demonstrate both directions with same functions', () => {
        const add5 = x => x + 5
        const double = x => x * 2
        const square = x => x * x
        
        const input = 3
        
        // pipe(add5, double, square)(3) = ((3 + 5) * 2)² = 256
        expect(pipe(add5, double, square)(input)).toBe(256)
        
        // compose(add5, double, square)(3) = (3² * 2) + 5 = 23
        expect(compose(add5, double, square)(input)).toBe(23)
        
        // To get same result with compose, reverse the order
        expect(compose(square, double, add5)(input)).toBe(256)
      })
    })

    describe('Why Multi-Argument Functions Do Not Compose (doc lines 769-775)', () => {
      it('should demonstrate NaN problem with non-curried functions', () => {
        const add = (a, b) => a + b
        const multiply = (a, b) => a * b

        // This doesn't work as expected!
        const addThenMultiply = pipe(add, multiply)
        
        // When called: add(1, 2) returns 3
        // Then multiply(3) is called with only one argument
        // multiply(3, undefined) = 3 * undefined = NaN
        const result = addThenMultiply(1, 2)
        
        expect(result).toBeNaN()
      })

      it('should work correctly with curried versions', () => {
        // Curried versions
        const add = a => b => a + b
        const multiply = a => b => a * b

        // Now we can compose!
        const add5 = add(5)         // x => 5 + x
        const double = multiply(2)  // x => 2 * x

        const add5ThenDouble = pipe(add5, double)
        
        // (10 + 5) * 2 = 30
        expect(add5ThenDouble(10)).toBe(30)
      })
    })

    describe('Data-First vs Data-Last Argument Order (doc lines 984-994)', () => {
      it('should show data-first makes composition harder', () => {
        // Data-first: hard to compose
        const multiplyFirst = (value, factor) => value * factor
        
        // Can't easily create a reusable "double" function for pipelines
        // Would need to wrap it:
        const doubleFirst = value => multiplyFirst(value, 2)
        const tripleFirst = value => multiplyFirst(value, 3)
        
        // Works, but requires manual wrapping each time
        expect(pipe(doubleFirst, tripleFirst)(5)).toBe(30)
      })

      it('should show data-last composes naturally', () => {
        // Data-last: composes well
        const multiply = factor => value => value * factor

        const double = multiply(2)
        const triple = multiply(3)

        // Composes naturally without any wrapping
        expect(pipe(double, triple)(5)).toBe(30)
        
        // Can easily create new specialized functions
        const quadruple = multiply(4)
        expect(pipe(double, quadruple)(5)).toBe(40)
      })
    })

    describe('Manual Composition with Nested Calls (doc lines 526-538)', () => {
      it('should work with nested function calls', () => {
        const add10 = x => x + 10
        const multiply2 = x => x * 2
        const subtract5 = x => x - 5

        // Manual composition (nested calls)
        // Step by step: 5 → 15 → 30 → 25
        const result = subtract5(multiply2(add10(5)))
        
        expect(result).toBe(25)
      })

      it('should produce same result with compose function', () => {
        const add10 = x => x + 10
        const multiply2 = x => x * 2
        const subtract5 = x => x - 5

        // With a compose function
        const composed = compose(subtract5, multiply2, add10)
        
        expect(composed(5)).toBe(25)
        
        // Verify it matches manual nesting
        const manual = subtract5(multiply2(add10(5)))
        expect(composed(5)).toBe(manual)
      })

      it('should be more readable with pipe', () => {
        const add10 = x => x + 10
        const multiply2 = x => x * 2
        const subtract5 = x => x - 5

        // With pipe (reads in execution order)
        const piped = pipe(add10, multiply2, subtract5)
        
        expect(piped(5)).toBe(25)
      })
    })

    describe('Opening Example from Documentation (doc lines 9-20)', () => {
      it('should demonstrate the opening currying example', () => {
        // Currying: one argument at a time
        const add = a => b => c => a + b + c
        expect(add(1)(2)(3)).toBe(6)
      })

      it('should demonstrate the opening composition example', () => {
        const getName = obj => obj.name
        const trim = str => str.trim()
        const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

        // Composition: chain functions together
        const process = pipe(
          getName,
          trim,
          capitalize
        )
        
        expect(process({ name: "  alice  " })).toBe("Alice")
      })
    })
  })
})
