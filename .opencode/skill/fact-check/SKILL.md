---
name: fact-check
description: Verify technical accuracy of JavaScript concept pages by checking code examples, MDN/ECMAScript compliance, and external resources to prevent misinformation
---

# Skill: JavaScript Fact Checker

Use this skill to verify the technical accuracy of concept documentation pages for the 33 JavaScript Concepts project. This ensures we're not spreading misinformation about JavaScript.

## When to Use

- Before publishing a new concept page
- After significant edits to existing content
- When reviewing community contributions
- When updating pages with new JavaScript features
- Periodic accuracy audits of existing content

## What We're Protecting Against

- Incorrect JavaScript behavior claims
- Outdated information (pre-ES6 patterns presented as current)
- Code examples that don't produce stated outputs
- Broken or misleading external resource links
- Common misconceptions stated as fact
- Browser-specific behavior presented as universal
- Inaccurate API descriptions

---

## Fact-Checking Methodology

Follow these five phases in order for a complete fact check.

### Phase 1: Code Example Verification

Every code example in the concept page must be verified for accuracy.

#### Step-by-Step Process

1. **Identify all code blocks** in the document
2. **For each code block:**
   - Read the code and any output comments (e.g., `// "string"`)
   - Mentally execute the code or test in a JavaScript environment
   - Verify the output matches what's stated in comments
   - Check that variable names and logic are correct

3. **For "wrong" examples (marked with ❌):**
   - Verify they actually produce the wrong/unexpected behavior
   - Confirm the explanation of why it's wrong is accurate

4. **For "correct" examples (marked with ✓):**
   - Verify they work as stated
   - Confirm they follow current best practices

5. **Run project tests:**
   ```bash
   # Run all tests
   npm test
   
   # Run tests for a specific concept
   npm test -- tests/fundamentals/call-stack/
   npm test -- tests/fundamentals/primitive-types/
   ```

6. **Check test coverage:**
   - Look in `/tests/{category}/{concept-name}/`
   - Verify tests exist for major code examples
   - Flag examples without test coverage

#### Code Verification Checklist

| Check | How to Verify |
|-------|---------------|
| `console.log` outputs match comments | Run code or trace mentally |
| Variables are correctly named/used | Read through logic |
| Functions return expected values | Trace execution |
| Async code resolves in stated order | Understand event loop |
| Error examples actually throw | Test in try/catch |
| Array/object methods return correct types | Check MDN |
| `typeof` results are accurate | Test common cases |
| Strict mode behavior noted if relevant | Check if example depends on it |

#### Common Output Mistakes to Catch

```javascript
// Watch for these common mistakes:

// 1. typeof null
typeof null        // "object" (not "null"!)

// 2. Array methods that return new arrays vs mutate
const arr = [1, 2, 3]
arr.push(4)        // Returns 4 (length), not the array!
arr.map(x => x*2)  // Returns NEW array, doesn't mutate

// 3. Promise resolution order
Promise.resolve().then(() => console.log('micro'))
setTimeout(() => console.log('macro'), 0)
console.log('sync')
// Output: sync, micro, macro (NOT sync, macro, micro)

// 4. Comparison results
[] == false        // true
[] === false       // false
![]                // false (empty array is truthy!)

// 5. this binding
const obj = {
  name: 'Alice',
  greet: () => console.log(this.name)  // undefined! Arrow has no this
}
```

---

### Phase 2: MDN Documentation Verification

All claims about JavaScript APIs, methods, and behavior should align with MDN documentation.

#### Step-by-Step Process

1. **Check all MDN links:**
   - Click each MDN link in the document
   - Verify the link returns 200 (not 404)
   - Confirm the linked page matches what's being referenced

2. **Verify API descriptions:**
   - Compare method signatures with MDN
   - Check parameter names and types
   - Verify return types
   - Confirm edge case behavior

3. **Check for deprecated APIs:**
   - Look for deprecation warnings on MDN
   - Flag any deprecated methods being taught as current

4. **Verify browser compatibility claims:**
   - Cross-reference with MDN compatibility tables
   - Check Can I Use for broader support data

#### MDN Link Patterns

| Content Type | MDN URL Pattern |
|--------------|-----------------|
| Web APIs | `https://developer.mozilla.org/en-US/docs/Web/API/{APIName}` |
| Global Objects | `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/{Object}` |
| Statements | `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/{Statement}` |
| Operators | `https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/{Operator}` |
| HTTP | `https://developer.mozilla.org/en-US/docs/Web/HTTP` |

#### What to Verify Against MDN

| Claim Type | What to Check |
|------------|---------------|
| Method signature | Parameters, optional params, return type |
| Return value | Exact type and possible values |
| Side effects | Does it mutate? What does it affect? |
| Exceptions | What errors can it throw? |
| Browser support | Compatibility tables |
| Deprecation status | Any deprecation warnings? |

---

### Phase 3: ECMAScript Specification Compliance

For nuanced JavaScript behavior, verify against the ECMAScript specification.

#### When to Check the Spec

- Edge cases and unusual behavior
- Claims about "how JavaScript works internally"
- Type coercion rules
- Operator precedence
- Execution order guarantees
- Claims using words like "always", "never", "guaranteed"

#### How to Navigate the Spec

The ECMAScript specification is at: https://tc39.es/ecma262/

| Concept | Spec Section |
|---------|--------------|
| Type coercion | Abstract Operations (7.1) |
| Equality | Abstract Equality Comparison (7.2.14), Strict Equality (7.2.15) |
| typeof | The typeof Operator (13.5.3) |
| Objects | Ordinary and Exotic Objects' Behaviours (10) |
| Functions | ECMAScript Function Objects (10.2) |
| this binding | ResolveThisBinding (9.4.4) |
| Promises | Promise Objects (27.2) |
| Iteration | Iteration (27.1) |

#### Spec Verification Examples

```javascript
// Claim: "typeof null returns 'object' due to a bug"
// Spec says: typeof null → "object" (Table 41)
// Historical context: This is a known quirk from JS 1.0
// Verdict: ✓ Correct, though calling it a "bug" is slightly informal

// Claim: "Promises always resolve asynchronously"
// Spec says: Promise reaction jobs are enqueued (27.2.1.3.2)
// Verdict: ✓ Correct - even resolved promises schedule microtasks

// Claim: "=== is faster than =="
// Spec says: Nothing about performance
// Verdict: ⚠️ Needs nuance - this is implementation-dependent
```

---

### Phase 4: External Resource Verification

All external links (articles, videos, courses) must be verified.

#### Step-by-Step Process

1. **Check link accessibility:**
   - Click each external link
   - Verify it loads (not 404, not paywalled)
   - Note any redirects to different URLs

2. **Verify content accuracy:**
   - Skim the resource for obvious errors
   - Check it's JavaScript-focused (not C#, Python, Java)
   - Verify it's not teaching anti-patterns

3. **Check publication date:**
   - For time-sensitive topics (async, modules, etc.), prefer recent content
   - Flag resources from before 2015 for ES6+ topics

4. **Verify description accuracy:**
   - Does our description match what the resource actually covers?
   - Is the description specific (not generic)?

#### External Resource Checklist

| Check | Pass Criteria |
|-------|---------------|
| Link works | Returns 200, content loads |
| Not paywalled | Free to access (or clearly marked) |
| JavaScript-focused | Not primarily about other languages |
| Not outdated | Post-2015 for modern JS topics |
| Accurate description | Our description matches actual content |
| No anti-patterns | Doesn't teach bad practices |
| Reputable source | From known/trusted creators |

#### Red Flags in External Resources

- Uses `var` everywhere for ES6+ topics
- Uses callbacks for content about Promises/async
- Teaches jQuery as modern DOM manipulation
- Contains factual errors about JavaScript
- Video is >2 hours without timestamp links
- Content is primarily about another language
- Uses deprecated APIs without noting deprecation

---

### Phase 5: Technical Claims Audit

Review all prose claims about JavaScript behavior.

#### Claims That Need Verification

| Claim Type | How to Verify |
|------------|---------------|
| Performance claims | Need benchmarks or caveats |
| Browser behavior | Specify which browsers, check MDN |
| Historical claims | Verify dates/versions |
| "Always" or "never" statements | Check for exceptions |
| Comparisons (X vs Y) | Verify both sides accurately |

#### Red Flags in Technical Claims

- "Always" or "never" without exceptions noted
- Performance claims without benchmarks
- Browser behavior claims without specifying browsers
- Comparisons that oversimplify differences
- Historical claims without dates
- Claims about "how JavaScript works" without spec reference

#### Examples of Claims to Verify

```markdown
❌ "async/await is always better than Promises"
→ Verify: Not always - Promise.all() is better for parallel operations

❌ "JavaScript is an interpreted language"
→ Verify: Modern JS engines use JIT compilation

❌ "Objects are passed by reference"
→ Verify: Technically "passed by sharing" - the reference is passed by value

❌ "=== is faster than =="
→ Verify: Implementation-dependent, not guaranteed by spec

✓ "JavaScript is single-threaded"
→ Verify: Correct for the main thread (Web Workers are separate)

✓ "Promises always resolve asynchronously"
→ Verify: Correct per ECMAScript spec
```

---

## Common JavaScript Misconceptions

Watch for these misconceptions being stated as fact.

### Type System Misconceptions

| Misconception | Reality | How to Verify |
|---------------|---------|---------------|
| `typeof null === "object"` is intentional | It's a bug from JS 1.0 that can't be fixed for compatibility | Historical context, TC39 discussions |
| JavaScript has no types | JS is dynamically typed, not untyped | ECMAScript spec defines types |
| `==` is always wrong | `== null` checks both null and undefined, has valid uses | Many style guides allow this pattern |
| `NaN === NaN` is false "by mistake" | It's intentional per IEEE 754 floating point spec | IEEE 754 standard |

### Function Misconceptions

| Misconception | Reality | How to Verify |
|---------------|---------|---------------|
| Arrow functions are just shorter syntax | They have no `this`, `arguments`, `super`, or `new.target` | MDN, ECMAScript spec |
| `var` is hoisted to function scope with its value | Only declaration is hoisted, not initialization | Code test, MDN |
| Closures are a special opt-in feature | All functions in JS are closures | ECMAScript spec |
| IIFEs are obsolete | Still useful for one-time initialization | Modern codebases still use them |

### Async Misconceptions

| Misconception | Reality | How to Verify |
|---------------|---------|---------------|
| Promises run in parallel | JS is single-threaded; Promises are async, not parallel | Event loop explanation |
| `async/await` is different from Promises | It's syntactic sugar over Promises | MDN, can await any thenable |
| `setTimeout(fn, 0)` runs immediately | Runs after current execution + microtasks | Event loop, code test |
| `await` pauses the entire program | Only pauses the async function, not the event loop | Code test |

### Object Misconceptions

| Misconception | Reality | How to Verify |
|---------------|---------|---------------|
| Objects are "passed by reference" | References are passed by value ("pass by sharing") | Reassignment test |
| `const` makes objects immutable | `const` prevents reassignment, not mutation | Code test |
| Everything in JavaScript is an object | Primitives are not objects (though they have wrappers) | `typeof` tests, MDN |
| `Object.freeze()` creates deep immutability | It's shallow - nested objects can still be mutated | Code test |

### Performance Misconceptions

| Misconception | Reality | How to Verify |
|---------------|---------|---------------|
| `===` is always faster than `==` | Implementation-dependent, not spec-guaranteed | Benchmarks vary |
| `for` loops are faster than `forEach` | Modern engines optimize both; depends on use case | Benchmark |
| Arrow functions are faster | No performance difference, just different behavior | Benchmark |
| Avoiding DOM manipulation is always faster | Sometimes batch mutations are slower than individual | Depends on browser, use case |

---

## Test Integration

Running the project's test suite is a key part of fact-checking.

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for specific concept
npm test -- tests/fundamentals/call-stack/
npm test -- tests/fundamentals/primitive-types/
npm test -- tests/fundamentals/value-reference-types/
npm test -- tests/fundamentals/type-coercion/
npm test -- tests/fundamentals/equality-operators/
npm test -- tests/fundamentals/scope-and-closures/
```

### Test Directory Structure

```
tests/
├── fundamentals/              # Concepts 1-6
│   ├── call-stack/
│   ├── primitive-types/
│   ├── value-reference-types/
│   ├── type-coercion/
│   ├── equality-operators/
│   └── scope-and-closures/
├── functions-execution/       # Concepts 7-8
│   ├── event-loop/
│   └── iife-modules/
└── web-platform/              # Concepts 9-10
    ├── dom/
    └── http-fetch/
```

### When Tests Are Missing

If a concept doesn't have tests:
1. Flag this in the report as "needs test coverage"
2. Manually verify code examples are correct
3. Consider adding tests as a follow-up task

---

## Verification Resources

### Primary Sources

| Resource | URL | Use For |
|----------|-----|---------|
| MDN Web Docs | https://developer.mozilla.org | API docs, guides, compatibility |
| ECMAScript Spec | https://tc39.es/ecma262 | Authoritative behavior |
| TC39 Proposals | https://github.com/tc39/proposals | New features, stages |
| Can I Use | https://caniuse.com | Browser compatibility |
| Node.js Docs | https://nodejs.org/docs | Node-specific APIs |
| V8 Blog | https://v8.dev/blog | Engine internals |

### Project Resources

| Resource | Path | Use For |
|----------|------|---------|
| Test Suite | `/tests/` | Verify code examples |
| Concept Pages | `/docs/concepts/` | Current content |
| Run Tests | `npm test` | Execute all tests |

---

## Fact Check Report Template

Use this template to document your findings.

```markdown
# Fact Check Report: [Concept Name]

**File:** `/docs/concepts/[slug].mdx`
**Date:** YYYY-MM-DD
**Reviewer:** [Name/Claude]
**Overall Status:** ✅ Verified | ⚠️ Minor Issues | ❌ Major Issues

---

## Executive Summary

[2-3 sentence summary of findings. State whether the page is accurate overall and highlight any critical issues.]

**Tests Run:** Yes/No
**Test Results:** X passing, Y failing
**External Links Checked:** X/Y valid

---

## Phase 1: Code Example Verification

| # | Description | Line | Status | Notes |
|---|-------------|------|--------|-------|
| 1 | [Brief description] | XX | ✅/⚠️/❌ | [Notes] |
| 2 | [Brief description] | XX | ✅/⚠️/❌ | [Notes] |
| 3 | [Brief description] | XX | ✅/⚠️/❌ | [Notes] |

### Code Issues Found

#### Issue 1: [Title]

**Location:** Line XX
**Severity:** Critical/Major/Minor
**Current Code:**
```javascript
// The problematic code
```
**Problem:** [Explanation of what's wrong]
**Correct Code:**
```javascript
// The corrected code
```

---

## Phase 2: MDN/Specification Verification

| Claim | Location | Source | Status | Notes |
|-------|----------|--------|--------|-------|
| [Claim made] | Line XX | MDN/Spec | ✅/⚠️/❌ | [Notes] |

### MDN Link Status

| Link Text | URL | Status |
|-----------|-----|--------|
| [Text] | [URL] | ✅ 200 / ❌ 404 |

### Specification Discrepancies

[If any claims don't match the ECMAScript spec, detail them here]

---

## Phase 3: External Resource Verification

| Resource | Type | Link | Content | Notes |
|----------|------|------|---------|-------|
| [Title] | Article/Video | ✅/❌ | ✅/⚠️/❌ | [Notes] |

### Broken Links

1. **Line XX:** [URL] - 404 Not Found
2. **Line YY:** [URL] - Domain expired

### Content Concerns

1. **[Resource name]:** [Concern - e.g., outdated, wrong language, anti-patterns]

### Description Accuracy

| Resource | Description Accurate? | Notes |
|----------|----------------------|-------|
| [Title] | ✅/❌ | [Notes] |

---

## Phase 4: Technical Claims Audit

| Claim | Location | Verdict | Notes |
|-------|----------|---------|-------|
| "[Claim]" | Line XX | ✅/⚠️/❌ | [Notes] |

### Claims Needing Revision

1. **Line XX:** "[Current claim]"
   - **Issue:** [What's wrong]
   - **Suggested:** "[Revised claim]"

---

## Phase 5: Test Results

**Test File:** `/tests/[category]/[concept]/[concept].test.js`
**Tests Run:** XX
**Passing:** XX
**Failing:** XX

### Failing Tests

| Test Name | Expected | Actual | Related Doc Line |
|-----------|----------|--------|------------------|
| [Test] | [Expected] | [Actual] | Line XX |

### Coverage Gaps

Examples in documentation without corresponding tests:
- [ ] Line XX: [Description of untested example]
- [ ] Line YY: [Description of untested example]

---

## Issues Summary

### Critical (Must Fix Before Publishing)

1. **[Issue title]**
   - Location: Line XX
   - Problem: [Description]
   - Fix: [How to fix]

### Major (Should Fix)

1. **[Issue title]**
   - Location: Line XX
   - Problem: [Description]
   - Fix: [How to fix]

### Minor (Nice to Have)

1. **[Issue title]**
   - Location: Line XX
   - Suggestion: [Improvement]

---

## Recommendations

1. **[Priority 1]:** [Specific actionable recommendation]
2. **[Priority 2]:** [Specific actionable recommendation]
3. **[Priority 3]:** [Specific actionable recommendation]

---

## Verification Checklist

- [ ] All code examples verified for correct output
- [ ] All MDN links checked and valid
- [ ] API descriptions match MDN documentation
- [ ] ECMAScript compliance verified (if applicable)
- [ ] All external resource links accessible
- [ ] Resource descriptions accurately represent content
- [ ] No common JavaScript misconceptions found
- [ ] Technical claims are accurate and nuanced
- [ ] Project tests run and reviewed
- [ ] Report complete and ready for handoff

---

## Sign-off

**Verified by:** [Name/Claude]
**Date:** YYYY-MM-DD
**Recommendation:** ✅ Ready to publish | ⚠️ Fix issues first | ❌ Major revision needed
```

---

## Quick Reference: Verification Commands

```bash
# Run all tests
npm test

# Run specific concept tests
npm test -- tests/fundamentals/call-stack/

# Check for broken links (if you have a link checker)
# Install: npm install -g broken-link-checker
# Run: blc https://developer.mozilla.org/... -ro

# Quick JavaScript REPL for testing
node
> typeof null
'object'
> [1,2,3].map(x => x * 2)
[ 2, 4, 6 ]
```

---

## Summary

When fact-checking a concept page:

1. **Run tests first** — `npm test` catches code errors automatically
2. **Verify every code example** — Output comments must match reality
3. **Check all MDN links** — Broken links and incorrect descriptions hurt credibility
4. **Verify external resources** — Must be accessible, accurate, and JavaScript-focused
5. **Audit technical claims** — Watch for misconceptions and unsupported statements
6. **Document everything** — Use the report template for consistent, thorough reviews

**Remember:** Our readers trust us to teach them correct JavaScript. A single piece of misinformation can create confusion that takes years to unlearn. Take fact-checking seriously.
