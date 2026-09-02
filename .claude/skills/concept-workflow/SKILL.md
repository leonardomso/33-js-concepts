---
name: concept-workflow
description: End-to-end workflow for creating complete JavaScript concept documentation, orchestrating all skills from research to final review
---

# Skill: Complete Concept Workflow

Use this skill to create a complete, high-quality concept page from start to finish. This skill orchestrates all five specialized skills in the optimal order:

1. **Resource Curation** — Find quality learning resources
2. **Concept Writing** — Write the documentation page
3. **Test Writing** — Create tests for code examples
4. **Fact Checking** — Verify technical accuracy
5. **SEO Review** — Optimize for search visibility

## When to Use

- Creating a brand new concept page from scratch
- Completely rewriting an existing concept page
- When you want a full end-to-end workflow with all quality checks

**For partial tasks, use individual skills instead:**
- Just adding resources? Use `resource-curator`
- Just writing content? Use `write-concept`
- Just adding tests? Use `test-writer`
- Just verifying accuracy? Use `fact-check`
- Just optimizing SEO? Use `seo-review`

---

## Workflow Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     COMPLETE CONCEPT WORKFLOW                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  INPUT: Concept name (e.g., "hoisting", "event-loop", "promises")           │
│                                                                              │
│  ┌──────────────────┐                                                        │
│  │ PHASE 1: RESEARCH │                                                       │
│  │ resource-curator  │  Find MDN refs, articles, videos                      │
│  └────────┬─────────┘                                                        │
│           ▼                                                                  │
│  ┌──────────────────┐                                                        │
│  │ PHASE 2: WRITE   │                                                        │
│  │ write-concept    │  Create the documentation page                         │
│  └────────┬─────────┘                                                        │
│           ▼                                                                  │
│  ┌──────────────────┐                                                        │
│  │ PHASE 3: TEST    │                                                        │
│  │ test-writer      │  Generate tests for all code examples                  │
│  └────────┬─────────┘                                                        │
│           ▼                                                                  │
│  ┌──────────────────┐                                                        │
│  │ PHASE 4: VERIFY  │                                                        │
│  │ fact-check       │  Verify accuracy, run tests, check links               │
│  └────────┬─────────┘                                                        │
│           ▼                                                                  │
│  ┌──────────────────┐                                                        │
│  │ PHASE 5: OPTIMIZE│                                                        │
│  │ seo-review       │  SEO audit and final optimizations                     │
│  └────────┬─────────┘                                                        │
│           ▼                                                                  │
│  OUTPUT: Complete, tested, verified, SEO-optimized concept page              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Resource Curation

**Skill:** `resource-curator`
**Goal:** Gather high-quality external resources before writing

### What to Do

1. **Identify the concept category** (fundamentals, async, OOP, etc.)
2. **Search for MDN references** — Official documentation
3. **Find quality articles** — Target 4-6 from trusted sources
4. **Find quality videos** — Target 3-4 from trusted creators
5. **Evaluate each resource** — Check quality criteria
6. **Write specific descriptions** — 2 sentences each
7. **Format as Card components** — Ready to paste into the page

### Deliverables

- List of 2-4 MDN/reference links with descriptions
- List of 4-6 article links with descriptions
- List of 3-4 video links with descriptions
- Optional: 1-2 courses or books

### Quality Gates

Before moving to Phase 2:
- [ ] All links verified working (200 response)
- [ ] All resources are JavaScript-focused
- [ ] Descriptions are specific, not generic
- [ ] Mix of beginner and advanced content

---

## Phase 2: Concept Writing

**Skill:** `write-concept`
**Goal:** Create the full documentation page

### What to Do

1. **Determine the category** for file organization
2. **Create the frontmatter** (title, sidebarTitle, description)
3. **Write the opening hook** — Question that draws readers in
4. **Add opening code example** — Simple example in first 200 words
5. **Write "What you'll learn" box** — 5-7 bullet points
6. **Write main content sections:**
   - What is [concept]? (with 40-60 word definition for featured snippet)
   - Real-world analogy
   - How it works (with diagrams)
   - Code examples (multiple, progressive complexity)
   - Common mistakes
   - Edge cases
7. **Add Key Takeaways** — 8-10 numbered points
8. **Add Test Your Knowledge** — 5-6 Q&A accordions
9. **Add Related Concepts** — 4 Cards linking to related topics
10. **Add Resources** — Paste resources from Phase 1

### Deliverables

- Complete `.mdx` file at `/docs/concepts/{concept-name}.mdx`
- File added to `docs.json` navigation (if new)

### Quality Gates

Before moving to Phase 3:
- [ ] Frontmatter complete (title, sidebarTitle, description)
- [ ] Opens with question hook
- [ ] Code example in first 200 words
- [ ] "What you'll learn" Info box present
- [ ] All required sections present
- [ ] Resources section complete
- [ ] 1,500+ words

---

## Phase 3: Test Writing

**Skill:** `test-writer`
**Goal:** Create comprehensive tests for all code examples

### What to Do

1. **Scan the concept page** for all code examples
2. **Categorize examples:**
   - Testable (console.log, return values)
   - DOM-specific (needs jsdom)
   - Error examples (toThrow)
   - Conceptual (skip)
3. **Create test file** at `tests/{category}/{concept}/{concept}.test.js`
4. **Create DOM test file** (if needed) at `tests/{category}/{concept}/{concept}.dom.test.js`
5. **Write tests** for each code example with source line references
6. **Run tests** to verify all pass

### Deliverables

- Test file: `tests/{category}/{concept-name}/{concept-name}.test.js`
- DOM test file (if applicable): `tests/{category}/{concept-name}/{concept-name}.dom.test.js`
- All tests passing

### Quality Gates

Before moving to Phase 4:
- [ ] All testable code examples have tests
- [ ] Source line references in comments
- [ ] Tests pass: `npm test -- tests/{category}/{concept}/`
- [ ] DOM tests in separate file with jsdom directive

---

## Phase 4: Fact Checking

**Skill:** `fact-check`
**Goal:** Verify technical accuracy of all content

### What to Do

1. **Verify code examples:**
   - Run tests: `npm test -- tests/{category}/{concept}/`
   - Check any untested examples manually
   - Verify output comments match actual outputs

2. **Verify MDN/spec claims:**
   - Click all MDN links — verify they work
   - Compare API descriptions to MDN
   - Check ECMAScript spec for nuanced claims

3. **Verify external resources:**
   - Check all article/video links work
   - Skim content for accuracy
   - Verify descriptions match content

4. **Audit technical claims:**
   - Look for "always/never" statements
   - Verify performance claims
   - Check for common misconceptions

5. **Generate fact-check report**

### Deliverables

- Fact-check report documenting:
  - Code verification results
  - Link check results
  - Any issues found and fixes made

### Quality Gates

Before moving to Phase 5:
- [ ] All tests passing
- [ ] All MDN links valid
- [ ] All external resources accessible
- [ ] No technical inaccuracies found
- [ ] No common misconceptions

---

## Phase 5: SEO Review

**Skill:** `seo-review`
**Goal:** Optimize for search visibility

### What to Do

1. **Audit title tag:**
   - 50-60 characters
   - Primary keyword in first half
   - Ends with "in JavaScript"
   - Contains compelling hook

2. **Audit meta description:**
   - 150-160 characters
   - Starts with action word (Learn, Understand, Discover)
   - Contains primary keyword
   - Promises specific value

3. **Audit keyword placement:**
   - Keyword in title
   - Keyword in description
   - Keyword in first 100 words
   - Keyword in at least one H2

4. **Audit content structure:**
   - Question hook opening
   - Code in first 200 words
   - "What you'll learn" box
   - Short paragraphs

5. **Audit featured snippet optimization:**
   - 40-60 word definition after "What is" H2
   - Question-format H2s
   - Numbered steps for how-to content

6. **Audit internal linking:**
   - 3-5 related concepts linked
   - Descriptive anchor text
   - Related Concepts section complete

7. **Calculate score** and fix any issues

### Deliverables

- SEO audit report with score (X/27)
- All high-priority fixes implemented

### Quality Gates

Before marking complete:
- [ ] Score 24+ out of 27 (90%+)
- [ ] Title optimized
- [ ] Meta description optimized
- [ ] Keywords placed naturally
- [ ] Featured snippet optimized
- [ ] Internal links complete

---

## Complete Workflow Checklist

Use this master checklist to track progress through all phases.

```markdown
# Concept Workflow: [Concept Name]

**Started:** YYYY-MM-DD
**Target Category:** {category}
**File Path:** `/docs/concepts/{concept-name}.mdx`
**Test Path:** `/tests/{category}/{concept-name}/`

---

## Phase 1: Resource Curation
- [ ] MDN references found (2-4)
- [ ] Articles found (4-6)
- [ ] Videos found (3-4)
- [ ] All links verified working
- [ ] Descriptions written (specific, 2 sentences)
- [ ] Resources formatted as Cards

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## Phase 2: Concept Writing
- [ ] Frontmatter complete
- [ ] Opening hook written
- [ ] Opening code example added
- [ ] "What you'll learn" box added
- [ ] Main content sections written
- [ ] Key Takeaways added
- [ ] Test Your Knowledge added
- [ ] Related Concepts added
- [ ] Resources pasted from Phase 1
- [ ] Added to docs.json (if new)

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## Phase 3: Test Writing
- [ ] Code examples extracted and categorized
- [ ] Test file created
- [ ] DOM test file created (if needed)
- [ ] All testable examples have tests
- [ ] Source line references added
- [ ] Tests run and passing

**Test Results:** X passing, X failing

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## Phase 4: Fact Checking
- [ ] All tests passing
- [ ] Code examples verified accurate
- [ ] MDN links checked (X/X valid)
- [ ] External resources checked (X/X valid)
- [ ] Technical claims audited
- [ ] No misconceptions found
- [ ] Issues fixed

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## Phase 5: SEO Review
- [ ] Title tag optimized (50-60 chars)
- [ ] Meta description optimized (150-160 chars)
- [ ] Keywords placed correctly
- [ ] Content structure verified
- [ ] Featured snippet optimized
- [ ] Internal links complete

**SEO Score:** X/27 (X%)

**Status:** ⬜ Not Started | 🟡 In Progress | ✅ Complete

---

## Final Status

**All Phases Complete:** ⬜ No | ✅ Yes
**Ready to Publish:** ⬜ No | ✅ Yes
**Completed:** YYYY-MM-DD
```

---

## Execution Instructions

When executing this workflow, follow these steps:

### Step 1: Initialize

```markdown
Starting concept workflow for: [CONCEPT NAME]

Category: [fundamentals/functions-execution/web-platform/etc.]
File: /docs/concepts/[concept-name].mdx
Tests: /tests/[category]/[concept-name]/
```

### Step 2: Execute Each Phase

For each phase:

1. **Announce the phase:**
   ```markdown
   ## Phase X: [Phase Name]
   Using skill: [skill-name]
   ```

2. **Load the skill** to get detailed instructions

3. **Execute the phase** following the skill's methodology

4. **Report completion:**
   ```markdown
   Phase X complete:
   - [Deliverable 1]
   - [Deliverable 2]
   - Quality gates: ✅ All passed
   ```

5. **Move to next phase** only after quality gates pass

### Step 3: Final Report

After all phases complete:

```markdown
# Workflow Complete: [Concept Name]

## Summary
- **Concept Page:** `/docs/concepts/[concept-name].mdx`
- **Test File:** `/tests/[category]/[concept-name]/[concept-name].test.js`
- **Word Count:** X,XXX words
- **Code Examples:** XX (XX tested)
- **Resources:** X MDN, X articles, X videos

## Quality Metrics
- **Tests:** XX passing
- **Fact Check:** ✅ All verified
- **SEO Score:** XX/27 (XX%)

## Files Created/Modified
1. `/docs/concepts/[concept-name].mdx` (created)
2. `/docs/docs.json` (updated navigation)
3. `/tests/[category]/[concept-name]/[concept-name].test.js` (created)

## Ready to Publish: ✅ Yes
```

---

## Phase Dependencies

Some phases can be partially parallelized, but the general flow should be:

```
Phase 1 (Resources) ──┐
                      ├──► Phase 2 (Writing) ──► Phase 3 (Tests) ──┐
                      │                                             │
                      │         ┌───────────────────────────────────┘
                      │         ▼
                      └──► Phase 4 (Fact Check) ──► Phase 5 (SEO)
```

- **Phase 1 before Phase 2:** Resources inform what to write
- **Phase 2 before Phase 3:** Need content before writing tests
- **Phase 3 before Phase 4:** Tests are part of fact-checking
- **Phase 4 before Phase 5:** Fix accuracy issues before SEO polish

---

## Skill Reference

| Phase | Skill | Purpose |
|-------|-------|---------|
| 1 | `resource-curator` | Find and evaluate external resources |
| 2 | `write-concept` | Write the documentation page |
| 3 | `test-writer` | Generate tests for code examples |
| 4 | `fact-check` | Verify technical accuracy |
| 5 | `seo-review` | Optimize for search visibility |

Each skill has detailed instructions in its own `SKILL.md` file. Load the appropriate skill at each phase for comprehensive guidance.

---

## Time Estimates

| Phase | Estimated Time | Notes |
|-------|---------------|-------|
| Phase 1: Resources | 15-30 min | Depends on availability of quality resources |
| Phase 2: Writing | 1-3 hours | Depends on concept complexity |
| Phase 3: Tests | 30-60 min | Depends on number of code examples |
| Phase 4: Fact Check | 15-30 min | Most automated via tests |
| Phase 5: SEO | 15-30 min | Mostly checklist verification |
| **Total** | **2-5 hours** | For a complete concept page |

---

## Quick Start

To start the workflow for a new concept:

```
1. Determine the concept name and category
2. Load this skill (concept-workflow)
3. Execute Phase 1: Load resource-curator, find resources
4. Execute Phase 2: Load write-concept, write the page
5. Execute Phase 3: Load test-writer, create tests
6. Execute Phase 4: Load fact-check, verify accuracy
7. Execute Phase 5: Load seo-review, optimize SEO
8. Generate final report
9. Commit changes
```

**Example prompt to start:**

> "Create a complete concept page for 'hoisting' using the concept-workflow skill"

This will trigger the full end-to-end workflow, creating a complete, tested, verified, and SEO-optimized concept page.
