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
├── README.md           # Main content with all 33 concepts and resources
├── CONTRIBUTING.md     # Guidelines for contributors
├── CODE_OF_CONDUCT.md  # Community standards
├── LICENSE             # MIT License
├── package.json        # Project metadata
├── opencode.json       # OpenCode AI assistant configuration
└── github-image.png    # Project banner image
```

## The 33 Concepts

1. Call Stack
2. Primitive Types
3. Value Types and Reference Types
4. Implicit, Explicit, Nominal, Structuring and Duck Typing
5. == vs === vs typeof
6. Function Scope, Block Scope and Lexical Scope
7. Expression vs Statement
8. IIFE, Modules and Namespaces
9. Message Queue and Event Loop
10. setTimeout, setInterval and requestAnimationFrame
11. JavaScript Engines
12. Bitwise Operators, Type Arrays and Array Buffers
13. DOM and Layout Trees
14. Factories and Classes
15. this, call, apply and bind
16. new, Constructor, instanceof and Instances
17. Prototype Inheritance and Prototype Chain
18. Object.create and Object.assign
19. map, reduce, filter
20. Pure Functions, Side Effects, State Mutation and Event Propagation
21. Closures
22. High Order Functions
23. Recursion
24. Collections and Generators
25. Promises
26. async/await
27. Data Structures
28. Expensive Operation and Big O Notation
29. Algorithms
30. Inheritance, Polymorphism and Code Reuse
31. Design Patterns
32. Partial Applications, Currying, Compose and Pipe
33. Clean Code

## Content Format

Each concept in the README follows this structure:

1. **Concept Title** - Numbered heading
2. **Description** - Brief ECMAScript-based explanation
3. **Reference** - MDN or official documentation links
4. **Articles** - Curated blog posts and tutorials
5. **Videos** - YouTube tutorials and conference talks
6. **Books** - Recommended reading (when applicable)

## Contributing Guidelines

### Adding Resources
- Resources should be high-quality and educational
- Include author name in the link text
- Follow the existing format for consistency

### Creating Translations
1. Fork the repository
2. Translate content in your fork
3. Add translation link to the Community section in README
4. Submit a PR with title "Add [language] translation"

### Resource Format
```markdown
- [Article/Video Title — Author Name](URL)
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

## Important Notes

- This is primarily a documentation/resource repository, not a code library
- The main content lives in `README.md`
- Translations are maintained in separate forked repositories
- Community contributions are welcome and encouraged
- MIT Licensed

## Maintainer

**Leonardo Maldonado** - [@leonardomso](https://github.com/leonardomso)

## Links

- Repository: https://github.com/leonardomso/33-js-concepts
- Issues: https://github.com/leonardomso/33-js-concepts/issues
- Original Article: [33 Fundamentals Every JavaScript Developer Should Know](https://medium.com/@stephenthecurt/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1) by Stephen Curtis
