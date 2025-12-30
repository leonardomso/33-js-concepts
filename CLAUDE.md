# 33 JavaScript Concepts - Project Context

## Overview

This repository is a curated collection of **33 essential JavaScript concepts** that every JavaScript developer should know. It serves as a comprehensive learning resource and study guide for developers at all levels, from beginners to advanced practitioners.

The project was recognized by GitHub as one of the **top open source projects of 2018** and has been translated into 40+ languages by the community.

## Project Purpose

- Help developers master fundamental and advanced JavaScript concepts
- Provide curated resources (articles, videos, books) for each concept
- Serve as a reference guide for interview preparation
- Foster community contributions through translations and resource additions

## Repository Structure

```
33-js-concepts/
├── docs/                    # Mintlify documentation site
│   ├── docs.json           # Mintlify configuration
│   ├── index.mdx           # Homepage
│   ├── introduction.mdx    # Getting started guide
│   ├── contributing.mdx    # Contribution guidelines
│   ├── translations.mdx    # Community translations
│   └── concepts/           # 33 concept pages
│       ├── call-stack.mdx
│       ├── primitive-types.mdx
│       └── ... (all 33 concepts)
├── tests/                   # Vitest test suites
│   └── fundamentals/       # Tests for fundamental concepts (1-6)
│       ├── call-stack/
│       ├── primitive-types/
│       ├── value-reference-types/
│       ├── type-coercion/
│       ├── equality-operators/
│       └── scope-and-closures/
├── vitest.config.js        # Vitest configuration
├── README.md               # Main GitHub README
├── CONTRIBUTING.md         # Guidelines for contributors
├── CODE_OF_CONDUCT.md      # Community standards
├── LICENSE                 # MIT License
├── package.json            # Project metadata
├── opencode.json           # OpenCode AI assistant configuration
└── github-image.png        # Project banner image
```

## The 32 Concepts (33rd coming soon)

### Fundamentals (1-6)
1. Primitive Types
2. Value Types and Reference Types
3. Type Coercion (Implicit, Explicit, Nominal, Structuring and Duck Typing)
4. Equality Operators (== vs === vs typeof)
5. Scope & Closures
6. Call Stack

### Functions & Execution (7-10)
7. Expression vs Statement
8. IIFE, Modules and Namespaces
9. Event Loop (Message Queue)
10. Timers (setTimeout, setInterval, requestAnimationFrame)

### Under the Hood (11-13)
11. JavaScript Engines
12. Bitwise Operators, Type Arrays and Array Buffers
13. DOM and Layout Trees

### Object-Oriented JS (14-18)
14. Factories and Classes
15. this, call, apply and bind
16. new, Constructor, instanceof and Instances
17. Prototype Inheritance and Prototype Chain
18. Object.create and Object.assign

### Functional Programming (19-22)
19. map, reduce, filter
20. Pure Functions, Side Effects, State Mutation and Event Propagation
21. Higher-Order Functions
22. Recursion

### Async JavaScript (23-25)
23. Collections and Generators
24. Promises
25. async/await

### Advanced Topics (26-32)
26. Data Structures
27. Big O Notation (Expensive Operations)
28. Algorithms
29. Inheritance, Polymorphism and Code Reuse
30. Design Patterns
31. Partial Applications, Currying, Compose and Pipe
32. Clean Code

## Content Format

Each concept page in `/docs/concepts/` follows this structure:

### 1. Frontmatter
```mdx
---
title: "Concept Name"
description: "Brief description of the concept"
---
```

### 2. Real-World Analogy
Start with an engaging analogy that makes the concept relatable. Include ASCII art diagrams when helpful.

### 3. Info Box (What You'll Learn)
```mdx
<Info>
**What you'll learn in this guide:**
- Key point 1
- Key point 2
- Key point 3
</Info>
```

### 4. Main Content Sections
- Use clear headings (`##`, `###`) to organize topics
- Include code examples with explanations
- Use Mintlify components (`<AccordionGroup>`, `<Steps>`, `<Tabs>`, etc.)
- Add diagrams and visualizations where helpful

### 5. Related Concepts
```mdx
<CardGroup cols={2}>
  <Card title="Related Concept" icon="icon-name" href="/concepts/concept-slug">
    Brief description of how it relates
  </Card>
</CardGroup>
```

### 6. Reference
```mdx
<Card title="Topic — MDN" icon="book" href="https://developer.mozilla.org/...">
  Official MDN documentation
</Card>
```

### 7. Articles
Curated blog posts and tutorials using `<CardGroup>` with `icon="newspaper"`.

### 8. Courses (optional)
Educational courses using `<Card>` with `icon="graduation-cap"`.

### 9. Videos
YouTube tutorials and conference talks using `<CardGroup>` with `icon="video"`.

## Contributing Guidelines

### Adding Resources
- Resources should be high-quality and educational
- Follow the existing Card format for consistency
- Include a brief description of what the resource covers

### Resource Format
```mdx
<Card title="Resource Title" icon="newspaper" href="https://...">
  Brief description of what the reader will learn from this resource.
</Card>
```

## Git Commit Conventions

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification. All commits must adhere to this format for consistency and automated changelog generation.

### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

| Type | Description |
|------|-------------|
| `feat` | New features or content additions (e.g., new resources, new concepts) |
| `fix` | Bug fixes, broken link corrections, typo fixes |
| `docs` | Documentation changes (README updates, CONTRIBUTING updates) |
| `style` | Formatting changes (markdown formatting, whitespace) |
| `refactor` | Content restructuring without adding new resources |
| `chore` | Maintenance tasks (config updates, dependency updates) |
| `ci` | CI/CD configuration changes |
| `perf` | Performance improvements |
| `test` | Adding or updating tests |
| `build` | Build system or external dependency changes |
| `revert` | Reverting a previous commit |

### Examples

```bash
# Adding a new resource
feat: add article about closures by John Doe

# Fixing a broken link
fix: update broken MDN link in Promises section

# Documentation update
docs: update contributing guidelines for translations

# Maintenance task
chore: update opencode.json configuration

# Adding content to existing concept
feat(closures): add video tutorial by Fun Fun Function

# Multiple changes in body
feat: add new resources for async/await

- Add article by JavaScript Teacher
- Add video tutorial by Traversy Media
- Update reference links
```

### Rules

1. **Use lowercase** for the type and description
2. **No period** at the end of the description
3. **Use imperative mood** ("add" not "added", "fix" not "fixed")
4. **Keep the first line under 72 characters**
5. **Reference issues** in the footer when applicable (e.g., `Closes #123`)

## MCP Servers Available

This project has OpenCode configured with:

1. **Context7** - Documentation search (`use context7` in prompts)
2. **GitHub** - Repository management (`use github` in prompts)

## Testing

This project uses [Vitest](https://vitest.dev/) as the test runner to verify that code examples in the documentation work correctly.

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Structure

Tests are organized by concept category in the `tests/` directory:

```
tests/
└── fundamentals/           # Concepts 1-6
    ├── call-stack/
    │   └── call-stack.test.js
    ├── primitive-types/
    │   └── primitive-types.test.js
    ├── value-reference-types/
    │   └── value-reference-types.test.js
    ├── type-coercion/
    │   └── type-coercion.test.js
    ├── equality-operators/
    │   └── equality-operators.test.js
    └── scope-and-closures/
        └── scope-and-closures.test.js
```

### Writing Tests for Code Examples

When adding new code examples to concept documentation, please include corresponding tests:

1. **File naming**: Create `{concept-name}.test.js` in `tests/{category}/{concept-name}/`
2. **Use explicit imports**: 
   ```javascript
   import { describe, it, expect } from 'vitest'
   ```
3. **Convert console.log examples to assertions**:
   ```javascript
   // Documentation example:
   // console.log(typeof "hello") // "string"
   
   // Test:
   it('should return string type', () => {
     expect(typeof "hello").toBe("string")
   })
   ```
4. **Test error cases**: Use `expect(() => { ... }).toThrow()` for operations that should throw
5. **Skip browser-specific examples**: Tests run in Node.js, so skip DOM/window/document examples
6. **Note strict mode behavior**: Vitest runs in strict mode, so operations that "silently fail" in non-strict mode will throw `TypeError`

### Current Test Coverage

| Category | Concept | Tests |
|----------|---------|-------|
| Fundamentals | Call Stack | 20 |
| Fundamentals | Primitive Types | 73 |
| Fundamentals | Value vs Reference Types | 54 |
| Fundamentals | Type Coercion | 74 |
| Fundamentals | Equality Operators | 87 |
| Fundamentals | Scope and Closures | 46 |
| **Total** | | **354** |

## Documentation Site (Mintlify)

The project includes a Mintlify documentation site in the `/docs` directory.

### Local Development

```bash
# Using npm script
npm run docs

# Or install Mintlify CLI globally
npm i -g mint
cd docs
mint dev
```

The site will be available at `http://localhost:3000`.

### Documentation Structure

- **Getting Started**: Homepage and introduction
- **Fundamentals**: Concepts 1-6 (Call Stack through Scope & Closures)
- **Functions & Execution**: Concepts 7-10 (Expression/Statement through Timers)
- **Under the Hood**: Concepts 11-13 (JS Engines through DOM)
- **Object-Oriented JS**: Concepts 14-18 (Factories through Object.create/assign)
- **Functional Programming**: Concepts 19-22 (map/reduce/filter through Recursion)
- **Async JavaScript**: Concepts 23-25 (Collections/Generators through async/await)
- **Advanced Topics**: Concepts 26-32 (Data Structures through Clean Code)

### Adding/Editing Concept Pages

Each concept page is in `docs/concepts/` and follows this template:

```mdx
---
title: "Concept Name"
description: "Brief description"
---

## Overview
[Explanation of the concept]

## Reference
[MDN or official docs links]

## Articles
[Curated articles with CardGroup components]

## Videos
[Curated videos with CardGroup components]
```

## Important Notes

- This is primarily a documentation/resource repository, not a code library
- The main content lives in `README.md` and `/docs` (Mintlify site)
- Translations are maintained in separate forked repositories
- Community contributions are welcome and encouraged
- MIT Licensed

## Maintainer

**Leonardo Maldonado** - [@leonardomso](https://github.com/leonardomso)

## Links

- Repository: https://github.com/leonardomso/33-js-concepts
- Issues: https://github.com/leonardomso/33-js-concepts/issues
- Original Article: [33 Fundamentals Every JavaScript Developer Should Know](https://medium.com/@stephenthecurt/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1) by Stephen Curtis
