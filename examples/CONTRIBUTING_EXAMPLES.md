# Contributing Examples to 33-js-concepts

Thank you for your interest in contributing code examples! This guide will help you add high-quality examples to this repository.

## What Makes a Good Example?

### 1. **Clear and Focused**
- Each example should demonstrate one specific aspect of the concept
- Use descriptive variable names and comments
- Keep examples concise but complete

### 2. **Well-Commented**
- Add a header comment explaining what the example demonstrates
- Include inline comments for complex logic
- Explain the expected output

### 3. **Multiple Examples Per Concept**
- Include basic, intermediate, and advanced examples
- Show common use cases and pitfalls
- Demonstrate best practices

### 4. **Runnable Code**
- Examples should run without errors
- Use `console.log()` to show output
- Avoid dependencies when possible

## File Structure

Each example file should follow this structure:

```javascript
/**
 * [Concept Name] Examples
 * Brief description of the concept
 */

// Example 1: [Description]
console.log('=== Example 1: [Description] ===');
// Your code here
console.log('Output');

// Example 2: [Description]
console.log('\n=== Example 2: [Description] ===');
// Your code here

// ... more examples
```

## Naming Convention

- Files: `##-concept-name.js` (e.g., `01-call-stack.js`)
- Use lowercase with hyphens
- Number files according to the main README

## Example Template

```javascript
/**
 * [Concept] Examples
 * [Brief explanation of the concept]
 */

// Example 1: Basic Usage
console.log('=== Example 1: Basic Usage ===');
// Demonstrate the simplest form of the concept
const example = 'basic';
console.log(example);

// Example 2: Common Use Case
console.log('\n=== Example 2: Common Use Case ===');
// Show how it's typically used in real applications
function commonPattern() {
  // Implementation
  return 'result';
}
console.log(commonPattern());

// Example 3: Advanced Pattern
console.log('\n=== Example 3: Advanced Pattern ===');
// Demonstrate more complex usage
// Include edge cases or gotchas

// Example 4: Best Practices
console.log('\n=== Example 4: Best Practices ===');
// Show the recommended way to use this concept
```

## Topics That Need Examples

Check the [examples README](./README.md) for a list of concepts. Priority areas:

### High Priority
- [ ] JavaScript Engines
- [ ] Bitwise Operators
- [ ] DOM and Layout Trees
- [ ] Factories and Classes
- [ ] this, call, apply, bind
- [ ] Prototype Inheritance
- [ ] map, reduce, filter
- [ ] Pure Functions
- [ ] High Order Functions
- [ ] Recursion
- [ ] Data Structures
- [ ] Design Patterns

### Medium Priority
- [ ] Collections and Generators
- [ ] Big O Notation
- [ ] Algorithms
- [ ] Currying and Compose
- [ ] Clean Code

## Code Style Guidelines

### JavaScript Style
```javascript
// Use const/let, not var
const immutable = 'value';
let mutable = 0;

// Use arrow functions when appropriate
const add = (a, b) => a + b;

// Use template literals
console.log(`Result: ${result}`);

// Use descriptive names
function calculateTotalPrice(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

### Comments
```javascript
// Good: Explains WHY
// Use memoization to avoid recalculating expensive operations
const memoized = memoize(expensiveFunction);

// Bad: Explains WHAT (code already shows this)
// Increment counter by 1
counter++;
```

## Testing Your Examples

Before submitting:

1. **Run the code**
   ```bash
   node examples/your-file.js
   ```

2. **Check for errors**
   - No syntax errors
   - No runtime errors
   - All examples produce expected output

3. **Verify clarity**
   - Can someone new to the concept understand it?
   - Are the examples progressive (simple to complex)?
   - Is the output clear and informative?

## Submission Process

### For Hacktoberfest Contributors

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/33-js-concepts.git
   cd 33-js-concepts
   ```

2. **Create a new branch**
   ```bash
   git checkout -b add-examples-[concept-name]
   ```

3. **Add your examples**
   - Create or update files in the `examples/` directory
   - Follow the guidelines above

4. **Test your code**
   ```bash
   node examples/your-file.js
   ```

5. **Commit your changes**
   ```bash
   git add examples/
   git commit -m "Add examples for [concept name]"
   ```

6. **Push to your fork**
   ```bash
   git push origin add-examples-[concept-name]
   ```

7. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template:
     - What concept does this cover?
     - How many examples are included?
     - Any special considerations?

### PR Title Format
```
Add examples for [Concept Name]
```

### PR Description Template
```markdown
## Description
Added code examples for [Concept Name]

## Examples Included
- Example 1: [Brief description]
- Example 2: [Brief description]
- Example 3: [Brief description]

## Checklist
- [ ] Code runs without errors
- [ ] Examples are well-commented
- [ ] Follows style guidelines
- [ ] Includes multiple examples (basic to advanced)
- [ ] Output is clear and informative

## Related Issue
Closes #618
```

## Common Pitfalls to Avoid

### ❌ Don't
```javascript
// Too simple, not informative
const x = 5;
console.log(x);

// No context or explanation
function foo(bar) {
  return bar * 2;
}

// Overly complex for beginners
const result = compose(
  partial(map, transform),
  filter(predicate),
  reduce(accumulator, initial)
)(data);
```

### ✅ Do
```javascript
// Clear, contextual, educational
console.log('=== Example: Variable Declaration ===');
const userName = 'Alice';
const userAge = 30;
console.log(`User ${userName} is ${userAge} years old`);

// Well-explained function
function calculateDiscount(price, discountPercent) {
  // Calculate discount amount
  const discount = price * (discountPercent / 100);
  return price - discount;
}

// Progressive complexity
// Basic example first
const double = x => x * 2;
console.log(double(5)); // 10

// Then more advanced
const createMultiplier = factor => x => x * factor;
const triple = createMultiplier(3);
console.log(triple(5)); // 15
```

## Questions?

- Open an issue with the label `question`
- Check existing examples for reference
- Review the main [CONTRIBUTING.md](../CONTRIBUTING.md)

## Recognition

All contributors will be acknowledged in the repository. Thank you for helping developers learn JavaScript!

---

**Happy Contributing! 🚀**
