# Contribution
This project would not be possible without your help and support, and we appreciate your willingness to contribute!

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

Tests are organized by concept in the `tests/` directory:

```
tests/
├── call-stack/
│   └── call-stack.test.js
├── primitive-types/
│   └── primitive-types.test.js
└── ...
```

### Writing Tests for Code Examples

When adding new code examples to concept documentation, please include corresponding tests:

1. **File naming**: Create `{concept-name}.test.js` in `tests/{concept-name}/`
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

### Creating a New Translation

To create a new translation, please follow these steps:

* Fork the [main repository](https://github.com/leonardomso/33-js-concepts).
* Add yourself to the watch list of the main repository to stay updated with any changes.
* Translate the repository on your forked copy.
* Go to the [main repository](https://github.com/leonardomso/33-js-concepts) and edit the README.md file to include a link to your translated repository.
* Inside the **Community** section, add a new line with the link to your translated repository in the following format:
  * [Your language in native form (English name)](link to your repository here) — Your Name
  * For example, `[日本語 (Japanese)](https://github.com/oimo23/33-js-concepts) — oimo23`
* Create a new Pull Request with the name "Add *your language here* translation."
* Now, just wait for the merge!

## License
By contributing, you agree that your contributions will be licensed under the [MIT license](./LICENSE).
