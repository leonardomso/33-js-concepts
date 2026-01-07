---
name: test-writer
description: Generate comprehensive Vitest tests for code examples in JavaScript concept documentation pages, following project conventions and referencing source lines
---

# Skill: Test Writer for Concept Pages

Use this skill to generate comprehensive Vitest tests for all code examples in a concept documentation page. Tests verify that code examples in the documentation are accurate and work as described.

## When to Use

- After writing a new concept page
- When adding new code examples to existing pages
- When updating existing code examples
- To verify documentation accuracy through automated tests
- Before publishing to ensure all examples work correctly

## Test Writing Methodology

Follow these four phases to create comprehensive tests for a concept page.

### Phase 1: Code Example Extraction

Scan the concept page for all code examples and categorize them:

| Category | Characteristics | Action |
|----------|-----------------|--------|
| **Testable** | Has `console.log` with output comments, returns values | Write tests |
| **DOM-specific** | Uses `document`, `window`, DOM APIs, event handlers | Write DOM tests (separate file) |
| **Error examples** | Intentionally throws errors, demonstrates failures | Write tests with `toThrow` |
| **Conceptual** | ASCII diagrams, pseudo-code, incomplete snippets | Skip (document why) |
| **Browser-only** | Uses browser APIs not available in jsdom | Skip or mock |

### Phase 2: Determine Test File Structure

```
tests/
├── fundamentals/              # Concepts 1-6
├── functions-execution/       # Concepts 7-8
├── web-platform/             # Concepts 9-10
├── object-oriented/          # Concepts 11-15
├── functional-programming/   # Concepts 16-19
├── async-javascript/         # Concepts 20-22
├── advanced-topics/          # Concepts 23-31
└── beyond/                   # Extended concepts
    └── {subcategory}/
```

**File naming:**
- Standard tests: `{concept-name}.test.js`
- DOM tests: `{concept-name}.dom.test.js`

### Phase 3: Convert Examples to Tests

For each testable code example:

1. Identify the expected output (from `console.log` comments or documented behavior)
2. Convert to `expect` assertions
3. Add source line reference in comments
4. Group related tests in `describe` blocks matching documentation sections

### Phase 4: Handle Special Cases

| Case | Solution |
|------|----------|
| Browser-only APIs | Use jsdom environment or skip with note |
| Timing-dependent code | Use `vi.useFakeTimers()` or test the logic, not timing |
| Side effects | Capture output or test mutations |
| Intentional errors | Use `expect(() => {...}).toThrow()` |
| Async code | Use `async/await` with proper assertions |

---

## Project Test Conventions

### Import Pattern

```javascript
import { describe, it, expect } from 'vitest'
```

For DOM tests or tests needing mocks:

```javascript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
```

### DOM Test File Header

```javascript
/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
```

### Describe Block Organization

Match the structure of the documentation:

```javascript
describe('Concept Name', () => {
  describe('Section from Documentation', () => {
    describe('Subsection if needed', () => {
      it('should [specific behavior]', () => {
        // Test
      })
    })
  })
})
```

### Test Naming Convention

- Start with "should"
- Be descriptive and specific
- Match the documented behavior

```javascript
// Good
it('should return "object" for typeof null', () => {})
it('should throw TypeError when accessing property of undefined', () => {})
it('should resolve promises in order they were created', () => {})

// Bad
it('test typeof', () => {})
it('works correctly', () => {})
it('null test', () => {})
```

### Source Line References

Always reference the documentation source:

```javascript
// ============================================================
// SECTION NAME FROM DOCUMENTATION
// From {concept}.mdx lines XX-YY
// ============================================================

describe('Section Name', () => {
  // From lines 45-52: Basic typeof examples
  it('should return correct type strings', () => {
    // Test
  })
})
```

---

## Test Patterns Reference

### Pattern 1: Basic Value Assertion

**Documentation:**
```javascript
console.log(typeof "hello")  // "string"
console.log(typeof 42)       // "number"
```

**Test:**
```javascript
// From lines XX-YY: typeof examples
it('should return correct type for primitives', () => {
  expect(typeof "hello").toBe("string")
  expect(typeof 42).toBe("number")
})
```

---

### Pattern 2: Multiple Related Assertions

**Documentation:**
```javascript
let a = "hello"
let b = "hello"
console.log(a === b)  // true

let obj1 = { x: 1 }
let obj2 = { x: 1 }
console.log(obj1 === obj2)  // false
```

**Test:**
```javascript
// From lines XX-YY: Primitive vs object comparison
it('should compare primitives by value', () => {
  let a = "hello"
  let b = "hello"
  expect(a === b).toBe(true)
})

it('should compare objects by reference', () => {
  let obj1 = { x: 1 }
  let obj2 = { x: 1 }
  expect(obj1 === obj2).toBe(false)
})
```

---

### Pattern 3: Function Return Values

**Documentation:**
```javascript
function greet(name) {
  return "Hello, " + name + "!"
}

console.log(greet("Alice"))  // "Hello, Alice!"
```

**Test:**
```javascript
// From lines XX-YY: greet function example
it('should return greeting with name', () => {
  function greet(name) {
    return "Hello, " + name + "!"
  }
  
  expect(greet("Alice")).toBe("Hello, Alice!")
})
```

---

### Pattern 4: Error Testing

**Documentation:**
```javascript
// This throws an error!
const obj = null
console.log(obj.property)  // TypeError: Cannot read property of null
```

**Test:**
```javascript
// From lines XX-YY: Accessing property of null
it('should throw TypeError when accessing property of null', () => {
  const obj = null
  
  expect(() => {
    obj.property
  }).toThrow(TypeError)
})
```

---

### Pattern 5: Specific Error Messages

**Documentation:**
```javascript
function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero")
  return a / b
}
```

**Test:**
```javascript
// From lines XX-YY: divide function with error
it('should throw error when dividing by zero', () => {
  function divide(a, b) {
    if (b === 0) throw new Error("Cannot divide by zero")
    return a / b
  }
  
  expect(() => divide(10, 0)).toThrow("Cannot divide by zero")
  expect(divide(10, 2)).toBe(5)
})
```

---

### Pattern 6: Async/Await Testing

**Documentation:**
```javascript
async function fetchUser(id) {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}
```

**Test:**
```javascript
// From lines XX-YY: async fetchUser function
it('should fetch user data asynchronously', async () => {
  // Mock fetch for testing
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ id: 1, name: 'Alice' })
    })
  )
  
  async function fetchUser(id) {
    const response = await fetch(`/api/users/${id}`)
    return response.json()
  }
  
  const user = await fetchUser(1)
  expect(user).toEqual({ id: 1, name: 'Alice' })
})
```

---

### Pattern 7: Promise Testing

**Documentation:**
```javascript
const promise = new Promise((resolve) => {
  resolve("done")
})

promise.then(result => console.log(result))  // "done"
```

**Test:**
```javascript
// From lines XX-YY: Basic Promise resolution
it('should resolve with correct value', async () => {
  const promise = new Promise((resolve) => {
    resolve("done")
  })
  
  await expect(promise).resolves.toBe("done")
})
```

---

### Pattern 8: Promise Rejection

**Documentation:**
```javascript
const promise = new Promise((resolve, reject) => {
  reject(new Error("Something went wrong"))
})
```

**Test:**
```javascript
// From lines XX-YY: Promise rejection
it('should reject with error', async () => {
  const promise = new Promise((resolve, reject) => {
    reject(new Error("Something went wrong"))
  })
  
  await expect(promise).rejects.toThrow("Something went wrong")
})
```

---

### Pattern 9: Floating Point Comparison

**Documentation:**
```javascript
console.log(0.1 + 0.2)         // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3) // false
```

**Test:**
```javascript
// From lines XX-YY: Floating point precision
it('should demonstrate floating point imprecision', () => {
  expect(0.1 + 0.2).not.toBe(0.3)
  expect(0.1 + 0.2).toBeCloseTo(0.3)
  expect(0.1 + 0.2 === 0.3).toBe(false)
})
```

---

### Pattern 10: Array Method Testing

**Documentation:**
```javascript
const numbers = [1, 2, 3, 4, 5]
const doubled = numbers.map(n => n * 2)
console.log(doubled)  // [2, 4, 6, 8, 10]
```

**Test:**
```javascript
// From lines XX-YY: Array map example
it('should double all numbers in array', () => {
  const numbers = [1, 2, 3, 4, 5]
  const doubled = numbers.map(n => n * 2)
  
  expect(doubled).toEqual([2, 4, 6, 8, 10])
  expect(numbers).toEqual([1, 2, 3, 4, 5]) // Original unchanged
})
```

---

### Pattern 11: Object Mutation Testing

**Documentation:**
```javascript
const obj = { a: 1 }
obj.b = 2
console.log(obj)  // { a: 1, b: 2 }
```

**Test:**
```javascript
// From lines XX-YY: Object mutation
it('should allow adding properties to objects', () => {
  const obj = { a: 1 }
  obj.b = 2
  
  expect(obj).toEqual({ a: 1, b: 2 })
})
```

---

### Pattern 12: Closure Testing

**Documentation:**
```javascript
function counter() {
  let count = 0
  return function() {
    count++
    return count
  }
}

const increment = counter()
console.log(increment())  // 1
console.log(increment())  // 2
console.log(increment())  // 3
```

**Test:**
```javascript
// From lines XX-YY: Closure counter example
it('should maintain state across calls via closure', () => {
  function counter() {
    let count = 0
    return function() {
      count++
      return count
    }
  }
  
  const increment = counter()
  expect(increment()).toBe(1)
  expect(increment()).toBe(2)
  expect(increment()).toBe(3)
})

it('should create independent counters', () => {
  function counter() {
    let count = 0
    return function() {
      count++
      return count
    }
  }
  
  const counter1 = counter()
  const counter2 = counter()
  
  expect(counter1()).toBe(1)
  expect(counter1()).toBe(2)
  expect(counter2()).toBe(1) // Independent
})
```

---

### Pattern 13: DOM Event Testing

**Documentation:**
```javascript
const button = document.getElementById('myButton')
button.addEventListener('click', function(event) {
  console.log('Button clicked!')
  console.log(event.type)  // "click"
})
```

**Test (in .dom.test.js file):**
```javascript
/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('DOM Event Handlers', () => {
  let button
  
  beforeEach(() => {
    button = document.createElement('button')
    button.id = 'myButton'
    document.body.appendChild(button)
  })
  
  afterEach(() => {
    document.body.innerHTML = ''
  })
  
  // From lines XX-YY: Button click event
  it('should fire click event handler', () => {
    const output = []
    
    button.addEventListener('click', function(event) {
      output.push('Button clicked!')
      output.push(event.type)
    })
    
    button.click()
    
    expect(output).toEqual(['Button clicked!', 'click'])
  })
})
```

---

### Pattern 14: DOM Manipulation Testing

**Documentation:**
```javascript
const div = document.createElement('div')
div.textContent = 'Hello'
div.classList.add('greeting')
document.body.appendChild(div)
```

**Test:**
```javascript
// From lines XX-YY: Creating and appending elements
it('should create element with text and class', () => {
  const div = document.createElement('div')
  div.textContent = 'Hello'
  div.classList.add('greeting')
  document.body.appendChild(div)
  
  const element = document.querySelector('.greeting')
  expect(element).not.toBeNull()
  expect(element.textContent).toBe('Hello')
  expect(element.classList.contains('greeting')).toBe(true)
})
```

---

### Pattern 15: Timer Testing

**Documentation:**
```javascript
console.log('First')
setTimeout(() => console.log('Second'), 0)
console.log('Third')
// Output: First, Third, Second
```

**Test:**
```javascript
// From lines XX-YY: setTimeout execution order
it('should execute setTimeout callback after synchronous code', async () => {
  const output = []
  
  output.push('First')
  setTimeout(() => output.push('Second'), 0)
  output.push('Third')
  
  // Wait for setTimeout to execute
  await new Promise(resolve => setTimeout(resolve, 10))
  
  expect(output).toEqual(['First', 'Third', 'Second'])
})
```

---

### Pattern 16: Strict Mode Behavior

**Documentation:**
```javascript
// In strict mode, this throws
"use strict"
x = 10  // ReferenceError: x is not defined
```

**Test:**
```javascript
// From lines XX-YY: Strict mode variable declaration
it('should throw ReferenceError in strict mode for undeclared variables', () => {
  // Vitest runs in strict mode by default
  expect(() => {
    // Using eval to test strict mode behavior
    "use strict"
    eval('undeclaredVar = 10')
  }).toThrow()
})
```

---

## Complete Test File Template

```javascript
import { describe, it, expect } from 'vitest'

describe('[Concept Name]', () => {
  // ============================================================
  // [FIRST SECTION NAME FROM DOCUMENTATION]
  // From [concept].mdx lines XX-YY
  // ============================================================
  
  describe('[First Section]', () => {
    // From lines XX-YY: [Brief description of example]
    it('should [expected behavior]', () => {
      // Code from documentation
      
      expect(result).toBe(expected)
    })
    
    // From lines XX-YY: [Brief description of next example]
    it('should [another expected behavior]', () => {
      // Code from documentation
      
      expect(result).toEqual(expected)
    })
  })
  
  // ============================================================
  // [SECOND SECTION NAME FROM DOCUMENTATION]
  // From [concept].mdx lines XX-YY
  // ============================================================
  
  describe('[Second Section]', () => {
    // From lines XX-YY: [Description]
    it('should [behavior]', () => {
      // Test
    })
  })
  
  // ============================================================
  // EDGE CASES AND COMMON MISTAKES
  // From [concept].mdx lines XX-YY
  // ============================================================
  
  describe('Edge Cases', () => {
    // From lines XX-YY: [Edge case description]
    it('should handle [edge case]', () => {
      // Test
    })
  })
  
  describe('Common Mistakes', () => {
    // From lines XX-YY: Wrong way example
    it('should demonstrate the incorrect behavior', () => {
      // Test showing why the "wrong" way fails
    })
    
    // From lines XX-YY: Correct way example
    it('should demonstrate the correct behavior', () => {
      // Test showing the right approach
    })
  })
})
```

---

## Complete DOM Test File Template

```javascript
/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ============================================================
// DOM EXAMPLES FROM [CONCEPT NAME]
// From [concept].mdx lines XX-YY
// ============================================================

describe('[Concept Name] - DOM', () => {
  // Shared setup
  let container
  
  beforeEach(() => {
    // Create a fresh container for each test
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })
  
  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })
  
  // ============================================================
  // [SECTION NAME]
  // From lines XX-YY
  // ============================================================
  
  describe('[Section Name]', () => {
    // From lines XX-YY: [Example description]
    it('should [expected DOM behavior]', () => {
      // Setup
      const element = document.createElement('div')
      container.appendChild(element)
      
      // Action
      element.textContent = 'Hello'
      
      // Assert
      expect(element.textContent).toBe('Hello')
    })
  })
  
  // ============================================================
  // EVENT HANDLING
  // From lines XX-YY
  // ============================================================
  
  describe('Event Handling', () => {
    // From lines XX-YY: Click event example
    it('should handle click events', () => {
      const button = document.createElement('button')
      container.appendChild(button)
      
      let clicked = false
      button.addEventListener('click', () => {
        clicked = true
      })
      
      button.click()
      
      expect(clicked).toBe(true)
    })
  })
})
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests for specific concept
npm test -- tests/fundamentals/primitive-types/

# Run tests for specific file
npm test -- tests/fundamentals/primitive-types/primitive-types.test.js

# Run DOM tests only
npm test -- tests/fundamentals/primitive-types/primitive-types.dom.test.js

# Run with watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run with verbose output
npm test -- --reporter=verbose
```

---

## Quality Checklist

### Completeness
- [ ] All testable code examples have corresponding tests
- [ ] Tests organized by documentation sections
- [ ] Source line references included in comments (From lines XX-YY)
- [ ] DOM tests in separate `.dom.test.js` file
- [ ] Edge cases and error examples tested

### Correctness
- [ ] Tests verify the actual documented behavior
- [ ] Output comments in docs match test expectations
- [ ] Async tests properly use async/await
- [ ] Error tests use correct `toThrow` pattern
- [ ] Floating point comparisons use `toBeCloseTo`
- [ ] Object comparisons use `toEqual` (not `toBe`)

### Convention
- [ ] Uses explicit imports from vitest
- [ ] Follows describe/it nesting pattern
- [ ] Test names start with "should"
- [ ] Proper file naming (`{concept}.test.js`)
- [ ] DOM tests have jsdom environment directive

### Verification
- [ ] All tests pass: `npm test -- tests/{category}/{concept}/`
- [ ] No skipped tests without documented reason
- [ ] No false positives (tests that pass for wrong reasons)

---

## Test Report Template

Use this template to document test coverage for a concept page.

```markdown
# Test Coverage Report: [Concept Name]

**Concept Page:** `/docs/concepts/[slug].mdx`
**Test File:** `/tests/{category}/{concept}/{concept}.test.js`
**DOM Test File:** `/tests/{category}/{concept}/{concept}.dom.test.js` (if applicable)
**Date:** YYYY-MM-DD
**Author:** [Name/Claude]

## Summary

| Metric | Count |
|--------|-------|
| Total Code Examples in Doc | XX |
| Testable Examples | XX |
| Tests Written | XX |
| DOM Tests Written | XX |
| Skipped (with reason) | XX |

## Tests by Section

| Section | Line Range | Examples | Tests | Status |
|---------|------------|----------|-------|--------|
| [Section 1] | XX-YY | X | X | ✅ |
| [Section 2] | XX-YY | X | X | ✅ |
| [Section 3] | XX-YY | X | X | ⚠️ (1 skipped) |

## Skipped Examples

| Line | Example Description | Reason |
|------|---------------------|--------|
| XX | ASCII diagram of call stack | Conceptual, not executable |
| YY | Browser fetch example | Requires network, mocked instead |

## Test Execution

```bash
npm test -- tests/{category}/{concept}/
```

**Result:** ✅ XX passing | ❌ X failing | ⏭️ X skipped

## Notes

[Any special considerations, mock requirements, or issues encountered]
```

---

## Common Issues and Solutions

### Issue: Test passes but shouldn't

**Problem:** Test expectations don't match documentation output

**Solution:** Double-check the expected value matches the `console.log` comment exactly

```javascript
// Documentation says: console.log(result)  // [1, 2, 3]
// Make sure test uses:
expect(result).toEqual([1, 2, 3])  // NOT toBe for arrays
```

### Issue: Async test times out

**Problem:** Async test never resolves

**Solution:** Ensure all promises are awaited and async function is marked

```javascript
// Bad
it('should fetch data', () => {
  const data = fetchData()  // Missing await!
  expect(data).toBeDefined()
})

// Good
it('should fetch data', async () => {
  const data = await fetchData()
  expect(data).toBeDefined()
})
```

### Issue: DOM test fails with "document is not defined"

**Problem:** Missing jsdom environment

**Solution:** Add environment directive at top of file

```javascript
/**
 * @vitest-environment jsdom
 */
```

### Issue: Test isolation problems

**Problem:** Tests affect each other

**Solution:** Use beforeEach/afterEach for cleanup

```javascript
afterEach(() => {
  document.body.innerHTML = ''
  vi.restoreAllMocks()
})
```

---

## Summary

When writing tests for a concept page:

1. **Extract all code examples** from the documentation
2. **Categorize** as testable, DOM, error, or conceptual
3. **Create test file** in correct location with proper naming
4. **Convert each example** to test using appropriate pattern
5. **Reference source lines** in comments for traceability
6. **Run tests** to verify all pass
7. **Document coverage** using the report template

**Remember:** Tests serve two purposes:
1. Verify documentation is accurate
2. Catch regressions if code examples are updated

Every testable code example in the documentation should have a corresponding test. If an example can't be tested, document why.
