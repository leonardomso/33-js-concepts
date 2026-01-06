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
├── .claude/                 # Claude configuration
│   ├── CLAUDE.md           # Project context and guidelines
│   └── skills/             # Custom skills for content creation
│       ├── write-concept/  # Skill for writing concept documentation
│       ├── fact-check/     # Skill for verifying technical accuracy
│       ├── seo-review/     # Skill for SEO audits
│       ├── test-writer/    # Skill for generating Vitest tests
│       ├── resource-curator/ # Skill for curating external resources
│       └── concept-workflow/ # Skill for end-to-end concept creation
├── .opencode/               # OpenCode configuration
│   └── skill/              # Custom skills (mirrored from .claude/skills)
│       ├── write-concept/  # Skill for writing concept documentation
│       ├── fact-check/     # Skill for verifying technical accuracy
│       ├── seo-review/     # Skill for SEO audits
│       ├── test-writer/    # Skill for generating Vitest tests
│       ├── resource-curator/ # Skill for curating external resources
│       └── concept-workflow/ # Skill for end-to-end concept creation
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
├── opencode.jsonc          # OpenCode AI assistant configuration
└── github-image.png        # Project banner image
```

## The 31 Concepts (32nd and 33rd coming soon)

### Fundamentals (1-6)
1. Primitive Types
2. Value Types and Reference Types
3. Type Coercion (Implicit, Explicit, Nominal, Structuring and Duck Typing)
4. Equality Operators (== vs === vs typeof)
5. Scope & Closures
6. Call Stack

### Functions & Execution (7-8)
7. Event Loop (Message Queue)
8. IIFE, Modules and Namespaces

### Web Platform (9-10)
9. DOM and Layout Trees
10. HTTP & Fetch

### Object-Oriented JS (11-15)
11. Factories and Classes
12. this, call, apply and bind
13. new, Constructor, instanceof and Instances
14. Prototype Inheritance and Prototype Chain
15. Object.create and Object.assign

### Functional Programming (16-19)
16. map, reduce, filter
17. Pure Functions, Side Effects, State Mutation and Event Propagation
18. Higher-Order Functions
19. Recursion

### Async JavaScript (20-22)
20. Collections and Generators
21. Promises
22. async/await

### Advanced Topics (23-31)
23. JavaScript Engines
24. Data Structures
25. Big O Notation (Expensive Operations)
26. Algorithms
27. Inheritance, Polymorphism and Code Reuse
28. Design Patterns
29. Partial Applications, Currying, Compose and Pipe
30. Clean Code

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
| Functions & Execution | Event Loop | 56 |
| Functions & Execution | IIFE & Modules | 61 |
| Web Platform | DOM | 85 |
| Web Platform | HTTP & Fetch | 72 |
| **Total** | | **628** |

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
- **Fundamentals**: Concepts 1-6 (Primitive Types through Call Stack)
- **Functions & Execution**: Concepts 7-8 (Event Loop through IIFE/Modules)
- **Web Platform**: Concepts 9-10 (DOM and HTTP & Fetch)
- **Object-Oriented JS**: Concepts 11-15 (Factories through Object.create/assign)
- **Functional Programming**: Concepts 16-19 (map/reduce/filter through Recursion)
- **Async JavaScript**: Concepts 20-22 (Collections/Generators through async/await)
- **Advanced Topics**: Concepts 23-31 (JavaScript Engines through Clean Code)

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

## Custom Skills

### write-concept Skill

Use the `/write-concept` skill when writing or improving concept documentation pages. This skill provides comprehensive guidelines for:

- **Page Structure**: Exact template for concept pages (frontmatter, opening hook, code examples, sections)
- **SEO Optimization**: Critical guidelines for ranking in search results
- **Writing Style**: Voice, tone, and how to make content accessible to beginners
- **Code Examples**: Best practices for clear, educational code
- **Quality Checklists**: Verification steps before publishing

**When to invoke:**
- Creating a new concept page in `/docs/concepts/`
- Rewriting or significantly improving an existing concept page
- Reviewing an existing concept page for quality

**SEO is Critical:** Each concept page should rank for searches like:
- "what is [concept] in JavaScript"
- "how does [concept] work in JavaScript"
- "[concept] JavaScript explained"

The skill includes detailed guidance on title optimization (50-60 chars), meta descriptions (150-160 chars), keyword placement, and featured snippet optimization.

**Location:** `.claude/skills/write-concept/SKILL.md`

### fact-check Skill

Use the `/fact-check` skill when verifying the technical accuracy of concept documentation. This skill provides comprehensive methodology for:

- **Code Verification**: Verify all code examples produce stated outputs, run project tests
- **MDN/Spec Compliance**: Check claims against official MDN documentation and ECMAScript specification
- **External Resource Checks**: Verify all links work and descriptions accurately represent content
- **Misconception Detection**: Common JavaScript misconceptions to watch for (type coercion, async behavior, etc.)
- **Test Integration**: Instructions for running `npm test` to verify code examples
- **Report Template**: Structured format for documenting findings with severity levels

**When to invoke:**
- Before publishing a new concept page
- After significant edits to existing pages
- When reviewing community contributions
- Periodic accuracy audits of existing content

**What gets checked:**
- Every code example for correct output
- All MDN links for validity (not 404)
- API descriptions match current MDN documentation
- External resources (articles, videos) are accessible and accurate
- Technical claims are correct and properly nuanced
- No common JavaScript misconceptions stated as fact

**Location:** `.claude/skills/fact-check/SKILL.md`

### seo-review Skill

Use the `/seo-review` skill when auditing concept pages for search engine optimization. This skill provides a focused audit checklist:

- **27-Point Scoring System**: Systematic audit across 6 categories
- **Title & Meta Optimization**: Character counts, keyword placement, compelling hooks
- **Keyword Strategy**: Pre-built keyword clusters for all JavaScript concepts
- **Featured Snippet Optimization**: Patterns for winning position zero in search results
- **Internal Linking**: Audit of concept interconnections and anchor text quality
- **Report Template**: Structured SEO audit report with prioritized fixes

**When to invoke:**
- Before publishing a new concept page
- When optimizing underperforming pages
- Periodic content audits
- After major content updates

**Scoring Categories (30 points total):**
- Title Tag (4 points)
- Meta Description (4 points)
- Keyword Placement (5 points)
- Content Structure (6 points)
- Featured Snippets (4 points)
- Internal Linking (4 points)
- Technical SEO (3 points) — Single H1, keyword in slug, no orphan pages

**Score Interpretation:**
- 90-100% (27-30): Ready to publish
- 75-89% (23-26): Minor optimizations needed
- 55-74% (17-22): Several improvements needed
- Below 55% (<17): Significant work required

**Location:** `.claude/skills/seo-review/SKILL.md`

### test-writer Skill

Use the `/test-writer` skill when generating Vitest tests for code examples in concept documentation. This skill provides comprehensive methodology for:

- **Code Extraction**: Identify and categorize all code examples (testable, DOM, error, conceptual)
- **Test Patterns**: 16 patterns for converting different types of code examples to tests
- **DOM Testing**: Separate file structure with jsdom environment for browser-specific code
- **Source References**: Line number references linking tests to documentation
- **Project Conventions**: File naming, describe block organization, assertion patterns
- **Report Template**: Test coverage report documenting what was tested and skipped

**When to invoke:**
- After writing a new concept page
- When adding new code examples to existing pages
- When updating existing code examples
- To verify documentation accuracy through automated tests

**Test Categories:**
- Basic value assertions (`console.log` → `expect`)
- Error testing (`toThrow` patterns)
- Async testing (Promises, async/await)
- DOM testing (jsdom environment, events)
- Floating point (toBeCloseTo)
- Object/Array comparisons (toEqual)

**File Structure:**
```
tests/{category}/{concept-name}/{concept-name}.test.js
tests/{category}/{concept-name}/{concept-name}.dom.test.js  (if DOM examples)
```

**Location:** `.claude/skills/test-writer/SKILL.md`

### resource-curator Skill

Use the `/resource-curator` skill when finding, evaluating, or maintaining external resources (articles, videos, courses) for concept pages. This skill provides:

- **Audit Process**: Check existing links for accessibility, accuracy, and relevance
- **Trusted Sources**: Prioritized lists of reputable article, video, and course sources
- **Quality Criteria**: Must-have, should-have, and red flag checklists
- **Description Writing**: Formula and examples for specific, valuable descriptions
- **Publication Guidelines**: Date thresholds for different topic categories
- **Report Template**: Audit report for documenting broken, outdated, and missing resources

**When to invoke:**
- Adding resources to a new concept page
- Refreshing resources on existing pages
- Auditing for broken or outdated links
- Reviewing community-contributed resources
- Periodic link maintenance

**Resource Targets:**
- Reference: 2-4 MDN links
- Articles: 4-6 quality articles
- Videos: 3-4 quality videos
- Courses: 1-3 (optional)

**Trusted Sources Include:**
- Articles: javascript.info, MDN Guides, freeCodeCamp, 2ality, CSS-Tricks, dev.to
- Videos: Fireship, Web Dev Simplified, Fun Fun Function, Traversy Media, JSConf
- Courses: javascript.info, Piccalilli, freeCodeCamp, Frontend Masters

**Location:** `.claude/skills/resource-curator/SKILL.md`

### concept-workflow Skill

Use the `/concept-workflow` skill for end-to-end creation of a complete concept page. This orchestrator skill coordinates all five specialized skills in optimal order:

```
Phase 1: resource-curator  →  Find quality external resources
Phase 2: write-concept     →  Write the documentation page
Phase 3: test-writer       →  Generate tests for code examples
Phase 4: fact-check        →  Verify technical accuracy
Phase 5: seo-review        →  Optimize for search visibility
```

**When to invoke:**
- Creating a brand new concept page from scratch
- Completely rewriting an existing concept page
- When you want the full end-to-end workflow with all quality checks

**What it orchestrates:**
- Resource curation (2-4 MDN refs, 4-6 articles, 3-4 videos)
- Complete concept page writing (1,500+ words)
- Comprehensive test generation for all code examples
- Technical accuracy verification with test execution
- SEO audit targeting 90%+ score (24+/27)

**Deliverables:**
- `/docs/concepts/{concept-name}.mdx` — Complete documentation page
- `/tests/{category}/{concept-name}/{concept-name}.test.js` — Test file
- Updated `docs.json` navigation (if new concept)
- Fact-check report
- SEO audit report (score 24+/27)

**Estimated Time:** 2-5 hours depending on concept complexity

**Example prompt:**
> "Create a complete concept page for 'hoisting' using the concept-workflow skill"

**Location:** `.claude/skills/concept-workflow/SKILL.md`

## Maintainer

**Leonardo Maldonado** - [@leonardomso](https://github.com/leonardomso)

## Links

- Repository: https://github.com/leonardomso/33-js-concepts
- Issues: https://github.com/leonardomso/33-js-concepts/issues
- Original Article: [33 Fundamentals Every JavaScript Developer Should Know](https://medium.com/@stephenthecurt/33-fundamentals-every-javascript-developer-should-know-13dd720a90d1) by Stephen Curtis
