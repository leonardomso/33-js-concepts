import { describe, it, expect, vi } from 'vitest'

describe('ES Modules', () => {
  // ===========================================
  // Part 1: Live Bindings
  // ===========================================

  describe('Part 1: Live Bindings', () => {
    describe('ESM Live Bindings vs CommonJS Value Copies', () => {
      it('should demonstrate CommonJS-style value copy behavior', () => {
        // CommonJS exports copies of primitive values at require time
        // Simulating: module.exports = { count, increment, getCount }
        
        function createCommonJSModule() {
          let count = 0
          function increment() { count++ }
          function getCount() { return count }
          
          // CommonJS exports a snapshot (copy) of the value
          return { count, increment, getCount }
        }
        
        const { count, increment, getCount } = createCommonJSModule()
        
        expect(count).toBe(0)
        increment()
        expect(count).toBe(0)        // Still 0! It's a copy from export time
        expect(getCount()).toBe(1)   // Function reads the real internal value
      })

      it('should demonstrate ESM-style live binding behavior', () => {
        // ESM exports live references - changes are visible to importers
        // Simulating with an object that acts as a module namespace
        
        function createESMModule() {
          const moduleNamespace = {
            count: 0,
            increment() { 
              moduleNamespace.count++ 
            }
          }
          return moduleNamespace
        }
        
        const mod = createESMModule()
        
        expect(mod.count).toBe(0)
        mod.increment()
        expect(mod.count).toBe(1)  // Live binding reflects the change!
        mod.increment()
        expect(mod.count).toBe(2)  // Still updating
      })

      it('should show live bindings work with objects', () => {
        // Even with objects, ESM bindings are live references
        const moduleState = {
          user: null,
          setUser(u) { moduleState.user = u },
          getUser() { return moduleState.user }
        }
        
        expect(moduleState.user).toBe(null)
        
        moduleState.setUser({ name: 'Alice' })
        expect(moduleState.user).toEqual({ name: 'Alice' })  // Live!
        
        moduleState.setUser({ name: 'Bob' })
        expect(moduleState.user).toEqual({ name: 'Bob' })    // Updated!
      })

      it('should demonstrate singleton state via live bindings', () => {
        // All importers share the same module state
        const sharedModule = (() => {
          let state = { count: 0 }
          return {
            getState: () => state,
            increment: () => { state.count++ }
          }
        })()
        
        // Simulate two different "importers"
        const importer1 = sharedModule
        const importer2 = sharedModule
        
        importer1.increment()
        expect(importer1.getState().count).toBe(1)
        expect(importer2.getState().count).toBe(1)  // Same state!
        
        importer2.increment()
        expect(importer1.getState().count).toBe(2)  // Both see the update
        expect(importer2.getState().count).toBe(2)
      })
    })

    describe('Why Live Bindings Matter', () => {
      it('should enable proper state management across module boundaries', () => {
        // Auth module that multiple parts of an app might import
        const authModule = (() => {
          let currentUser = null
          let isAuthenticated = false
          
          return {
            get currentUser() { return currentUser },
            get isAuthenticated() { return isAuthenticated },
            login(user) {
              currentUser = user
              isAuthenticated = true
            },
            logout() {
              currentUser = null
              isAuthenticated = false
            }
          }
        })()
        
        // Header component checks auth
        expect(authModule.isAuthenticated).toBe(false)
        
        // Login form logs in
        authModule.login({ name: 'Alice', email: 'alice@test.com' })
        
        // Header immediately sees the change (live binding)
        expect(authModule.isAuthenticated).toBe(true)
        expect(authModule.currentUser.name).toBe('Alice')
        
        // Logout button logs out
        authModule.logout()
        
        // All components see the change
        expect(authModule.isAuthenticated).toBe(false)
        expect(authModule.currentUser).toBe(null)
      })
    })
  })

  // ===========================================
  // Part 2: Read-Only Imports
  // ===========================================

  describe('Part 2: Read-Only Imports', () => {
    describe('Imported bindings cannot be reassigned', () => {
      it('should demonstrate that imports are read-only (simulated with Object.defineProperty)', () => {
        // ESM imports are read-only - you can't reassign them
        // We simulate this with a frozen/non-writable property
        
        const moduleExports = {}
        Object.defineProperty(moduleExports, 'count', {
          value: 0,
          writable: false,
          enumerable: true
        })
        
        expect(moduleExports.count).toBe(0)
        
        // Attempting to reassign throws in strict mode
        expect(() => {
          'use strict'
          moduleExports.count = 10
        }).toThrow(TypeError)
      })

      it('should show that const-like behavior applies to all imports', () => {
        // Even if the source uses `let`, importers can't reassign
        const createModule = () => {
          let value = 'original'  // let in source module
          return {
            get value() { return value },
            setValue(v) { value = v }  // only module can change it
          }
        }
        
        const mod = createModule()
        
        // Importer can read
        expect(mod.value).toBe('original')
        
        // Importer can call methods that modify (module modifies itself)
        mod.setValue('updated')
        expect(mod.value).toBe('updated')
        
        // But direct assignment to the binding would fail in real ESM
        // import { value } from './mod.js'
        // value = 'hack'  // TypeError: Assignment to constant variable
      })

      it('should allow modification of imported object properties', () => {
        // You can't reassign the import, but you CAN modify object properties
        const configModule = {
          config: {
            theme: 'light',
            debug: false
          }
        }
        
        // Can't do: config = newObject (would throw)
        // But CAN do: config.theme = 'dark'
        
        configModule.config.theme = 'dark'
        expect(configModule.config.theme).toBe('dark')
        
        configModule.config.debug = true
        expect(configModule.config.debug).toBe(true)
      })
    })
  })

  // ===========================================
  // Part 3: Circular Dependencies and TDZ
  // ===========================================

  describe('Part 3: Circular Dependencies and TDZ', () => {
    describe('Temporal Dead Zone (TDZ) with const/let', () => {
      it('should throw ReferenceError when accessing const before initialization', () => {
        expect(() => {
          // This simulates what happens in a circular dependency
          // when module B tries to access a const from module A
          // before A has finished executing
          
          const accessBeforeInit = () => {
            console.log(value)  // Accessing before declaration
            const value = 'initialized'
          }
          accessBeforeInit()
        }).toThrow(ReferenceError)
      })

      it('should throw ReferenceError when accessing let before initialization', () => {
        expect(() => {
          const accessBeforeInit = () => {
            console.log(value)  // TDZ - ReferenceError
            let value = 'initialized'
          }
          accessBeforeInit()
        }).toThrow(ReferenceError)
      })

      it('should NOT throw with var (hoisted with undefined)', () => {
        // var is hoisted and initialized to undefined
        // This is why old circular dependency examples showed 'undefined'
        let result
        
        const accessVarBeforeInit = () => {
          result = value  // undefined, not an error
          var value = 'initialized'
        }
        
        accessVarBeforeInit()
        expect(result).toBe(undefined)  // var is hoisted as undefined
      })
    })

    describe('Circular Dependency Patterns', () => {
      it('should demonstrate safe circular dependency with deferred access', () => {
        // Safe pattern: export functions that access values at call time
        
        const moduleA = {
          value: null,
          getValue: () => moduleA.value,
          init: () => { moduleA.value = 'A initialized' }
        }
        
        const moduleB = {
          value: null,
          getValue: () => moduleB.value,
          getAValue: () => moduleA.getValue(),  // Deferred access
          init: () => { moduleB.value = 'B initialized' }
        }
        
        // Simulate circular initialization
        // B tries to access A.value before A.init() runs
        expect(moduleB.getAValue()).toBe(null)  // A not initialized yet
        
        moduleA.init()
        expect(moduleB.getAValue()).toBe('A initialized')  // Now it works
        
        moduleB.init()
        expect(moduleB.getValue()).toBe('B initialized')
      })

      it('should show how to restructure to avoid circular deps', () => {
        // Instead of A importing B and B importing A,
        // create a shared module C that both import
        
        const sharedModule = {
          sharedConfig: { apiUrl: 'https://api.example.com' },
          sharedUtil: (x) => x.toUpperCase()
        }
        
        const moduleA = {
          config: sharedModule.sharedConfig,
          formatName: (name) => sharedModule.sharedUtil(name)
        }
        
        const moduleB = {
          config: sharedModule.sharedConfig,
          formatTitle: (title) => sharedModule.sharedUtil(title)
        }
        
        // No circular dependency - both depend on shared module
        expect(moduleA.formatName('alice')).toBe('ALICE')
        expect(moduleB.formatTitle('hello')).toBe('HELLO')
        expect(moduleA.config).toBe(moduleB.config)  // Same reference
      })
    })
  })

  // ===========================================
  // Part 4: Module Singleton Behavior
  // ===========================================

  describe('Part 4: Module Singleton Behavior', () => {
    describe('Module code executes exactly once', () => {
      it('should only run initialization code once', () => {
        let initCount = 0
        
        // Simulating a module that runs initialization code
        const createSingletonModule = (() => {
          initCount++  // This runs once when module loads
          
          return {
            getValue: () => 'module value',
            getInitCount: () => initCount
          }
        })()
        
        // Multiple "imports" all get the same instance
        const import1 = createSingletonModule
        const import2 = createSingletonModule
        const import3 = createSingletonModule
        
        expect(initCount).toBe(1)  // Only ran once
        expect(import1).toBe(import2)
        expect(import2).toBe(import3)
      })

      it('should share state across all importers', () => {
        const cacheModule = (() => {
          const cache = new Map()
          console.log('Cache module initialized')  // Runs once
          
          return {
            set: (key, value) => cache.set(key, value),
            get: (key) => cache.get(key),
            size: () => cache.size
          }
        })()
        
        // Different "files" using the cache
        // file1.js
        cacheModule.set('user', { id: 1 })
        
        // file2.js - sees the same cache
        expect(cacheModule.get('user')).toEqual({ id: 1 })
        
        // file3.js - also same cache
        cacheModule.set('token', 'abc123')
        
        expect(cacheModule.size()).toBe(2)
      })

      it('should maintain singleton even with different import styles', () => {
        // Whether you use named imports, default import, or namespace import,
        // you get the same module instance
        
        const mathModule = (() => {
          const moduleId = Math.random()  // Generated once
          
          return {
            moduleId,
            PI: 3.14159,
            add: (a, b) => a + b,
            default: function Calculator() {
              this.result = 0
            }
          }
        })()
        
        // import { add, PI } from './math.js'
        const { add, PI } = mathModule
        
        // import * as math from './math.js'
        const math = mathModule
        
        // import Calculator from './math.js'
        const Calculator = mathModule.default
        
        // All reference the same module
        expect(math.PI).toBe(PI)
        expect(math.add).toBe(add)
        expect(math.moduleId).toBe(mathModule.moduleId)
      })
    })
  })

  // ===========================================
  // Part 5: Dynamic Imports
  // ===========================================

  describe('Part 5: Dynamic Imports', () => {
    describe('import() returns a Promise', () => {
      it('should resolve to module namespace object', async () => {
        // Simulating dynamic import behavior
        const mockModule = {
          namedExport: 'named value',
          anotherExport: 42,
          default: function DefaultExport() { return 'default' }
        }
        
        const dynamicImport = () => Promise.resolve(mockModule)
        
        const module = await dynamicImport()
        
        expect(module.namedExport).toBe('named value')
        expect(module.anotherExport).toBe(42)
        expect(module.default()).toBe('default')
      })

      it('should allow destructuring named exports', async () => {
        const mockDateModule = {
          formatDate: (d) => d.toISOString(),
          parseDate: (s) => new Date(s)
        }
        
        const dynamicImport = () => Promise.resolve(mockDateModule)
        
        // Destructure directly from await
        const { formatDate, parseDate } = await dynamicImport()
        
        expect(typeof formatDate).toBe('function')
        expect(typeof parseDate).toBe('function')
      })

      it('should access default export via .default property', async () => {
        const mockModule = {
          default: class Logger {
            log(msg) { return `[LOG] ${msg}` }
          }
        }
        
        const dynamicImport = () => Promise.resolve(mockModule)
        
        // Method 1: Destructure with rename
        const { default: Logger } = await dynamicImport()
        const logger1 = new Logger()
        expect(logger1.log('test')).toBe('[LOG] test')
        
        // Method 2: Access .default property
        const module = await dynamicImport()
        const Logger2 = module.default
        const logger2 = new Logger2()
        expect(logger2.log('hello')).toBe('[LOG] hello')
      })
    })

    describe('Dynamic Import Use Cases', () => {
      it('should enable conditional module loading', async () => {
        const modules = {
          light: { theme: 'light', bg: '#fff', text: '#000' },
          dark: { theme: 'dark', bg: '#000', text: '#fff' }
        }
        
        async function loadTheme(themeName) {
          // Simulating: const theme = await import(`./themes/${themeName}.js`)
          return Promise.resolve(modules[themeName])
        }
        
        const lightTheme = await loadTheme('light')
        expect(lightTheme.bg).toBe('#fff')
        
        const darkTheme = await loadTheme('dark')
        expect(darkTheme.bg).toBe('#000')
      })

      it('should enable route-based code splitting', async () => {
        const pageModules = {
          home: { default: () => 'Home Page Content' },
          about: { default: () => 'About Page Content' },
          contact: { default: () => 'Contact Page Content' }
        }
        
        async function loadPage(pageName) {
          // Simulating route-based dynamic import
          const pageModule = await Promise.resolve(pageModules[pageName])
          return pageModule.default
        }
        
        const HomePage = await loadPage('home')
        expect(HomePage()).toBe('Home Page Content')
        
        const AboutPage = await loadPage('about')
        expect(AboutPage()).toBe('About Page Content')
      })

      it('should enable lazy loading of heavy features', async () => {
        let chartLibraryLoaded = false
        
        const heavyChartLibrary = {
          Chart: class {
            constructor(data) {
              chartLibraryLoaded = true
              this.data = data
            }
            render() {
              return `Chart with ${this.data.length} points`
            }
          }
        }
        
        async function showChart(data) {
          // Only load chart library when actually needed
          const { Chart } = await Promise.resolve(heavyChartLibrary)
          const chart = new Chart(data)
          return chart.render()
        }
        
        expect(chartLibraryLoaded).toBe(false)  // Not loaded yet
        
        const result = await showChart([1, 2, 3, 4, 5])
        
        expect(chartLibraryLoaded).toBe(true)   // Now loaded
        expect(result).toBe('Chart with 5 points')
      })

      it('should work with Promise.all for parallel loading', async () => {
        const modules = {
          header: { render: () => '<header>Header</header>' },
          footer: { render: () => '<footer>Footer</footer>' },
          sidebar: { render: () => '<aside>Sidebar</aside>' }
        }
        
        async function loadComponents() {
          const [header, footer, sidebar] = await Promise.all([
            Promise.resolve(modules.header),
            Promise.resolve(modules.footer),
            Promise.resolve(modules.sidebar)
          ])
          
          return { header, footer, sidebar }
        }
        
        const components = await loadComponents()
        
        expect(components.header.render()).toBe('<header>Header</header>')
        expect(components.footer.render()).toBe('<footer>Footer</footer>')
        expect(components.sidebar.render()).toBe('<aside>Sidebar</aside>')
      })
    })

    describe('Error Handling with Dynamic Imports', () => {
      it('should handle module not found errors', async () => {
        const loadModule = (name) => {
          if (name === 'nonexistent') {
            return Promise.reject(new Error('Module not found'))
          }
          return Promise.resolve({ value: 'found' })
        }
        
        // Successful load
        const mod = await loadModule('existing')
        expect(mod.value).toBe('found')
        
        // Failed load
        await expect(loadModule('nonexistent')).rejects.toThrow('Module not found')
      })

      it('should use try-catch for error handling', async () => {
        const loadModule = () => Promise.reject(new Error('Network error'))
        
        let errorHandled = false
        let fallbackUsed = false
        
        try {
          await loadModule()
        } catch (error) {
          errorHandled = true
          // Use fallback
          fallbackUsed = true
        }
        
        expect(errorHandled).toBe(true)
        expect(fallbackUsed).toBe(true)
      })
    })
  })

  // ===========================================
  // Part 6: Export and Import Syntax Variations
  // ===========================================

  describe('Part 6: Export and Import Syntax Variations', () => {
    describe('Named Exports', () => {
      it('should support inline named exports', () => {
        // export const PI = 3.14159
        // export function square(x) { return x * x }
        // export class Circle { }
        
        const moduleExports = {}
        
        moduleExports.PI = 3.14159
        moduleExports.square = function(x) { return x * x }
        moduleExports.Circle = class {
          constructor(radius) { this.radius = radius }
          area() { return moduleExports.PI * this.radius ** 2 }
        }
        
        expect(moduleExports.PI).toBe(3.14159)
        expect(moduleExports.square(4)).toBe(16)
        
        const circle = new moduleExports.Circle(5)
        expect(circle.area()).toBeCloseTo(78.54, 1)
      })

      it('should support grouped exports at bottom', () => {
        // const PI = 3.14159
        // function square(x) { return x * x }
        // export { PI, square }
        
        const PI = 3.14159
        function square(x) { return x * x }
        
        const exports = { PI, square }
        
        expect(exports.PI).toBe(3.14159)
        expect(exports.square(5)).toBe(25)
      })

      it('should support renaming exports with as', () => {
        // function internalHelper() { }
        // export { internalHelper as helper }
        
        function internalHelper() { return 'helped' }
        function _privateUtil() { return 'util' }
        
        const exports = {
          helper: internalHelper,
          publicUtil: _privateUtil
        }
        
        expect(exports.helper()).toBe('helped')
        expect(exports.publicUtil()).toBe('util')
        expect(exports.internalHelper).toBe(undefined)  // Not exported under original name
      })
    })

    describe('Default Exports', () => {
      it('should support default export of function', () => {
        // export default function greet(name) { }
        
        function greet(name) { return `Hello, ${name}!` }
        const moduleExports = { default: greet }
        
        // import greet from './greet.js'
        const importedGreet = moduleExports.default
        expect(importedGreet('World')).toBe('Hello, World!')
      })

      it('should support default export of class', () => {
        // export default class User { }
        
        class User {
          constructor(name) { this.name = name }
          greet() { return `Hi, I'm ${this.name}` }
        }
        
        const moduleExports = { default: User }
        
        // import User from './user.js'
        const ImportedUser = moduleExports.default
        const user = new ImportedUser('Alice')
        expect(user.greet()).toBe("Hi, I'm Alice")
      })

      it('should support default export of object/value', () => {
        // export default { name: 'Config', version: '1.0' }
        
        const moduleExports = {
          default: {
            name: 'Config',
            version: '1.0.0',
            debug: false
          }
        }
        
        // import config from './config.js'
        const config = moduleExports.default
        expect(config.name).toBe('Config')
        expect(config.version).toBe('1.0.0')
      })
    })

    describe('Mixed Named and Default Exports', () => {
      it('should support both default and named exports', () => {
        // export default function React() { }
        // export function useState() { }
        // export function useEffect() { }
        
        function React() { return 'React' }
        function useState(initial) { return [initial, () => {}] }
        function useEffect(fn) { fn() }
        
        const moduleExports = {
          default: React,
          useState,
          useEffect
        }
        
        // import React, { useState, useEffect } from 'react'
        const ImportedReact = moduleExports.default
        const { useState: importedUseState, useEffect: importedUseEffect } = moduleExports
        
        expect(ImportedReact()).toBe('React')
        expect(importedUseState(0)).toEqual([0, expect.any(Function)])
      })
    })

    describe('Import Variations', () => {
      it('should support named imports with exact names', () => {
        // import { PI, square } from './math.js'
        
        const mathModule = {
          PI: 3.14159,
          square: (x) => x * x,
          cube: (x) => x * x * x
        }
        
        const { PI, square } = mathModule
        
        expect(PI).toBe(3.14159)
        expect(square(3)).toBe(9)
      })

      it('should support renaming imports with as', () => {
        // import { formatDate as formatDateISO } from './date.js'
        
        const dateModule = {
          formatDate: (d) => d.toISOString()
        }
        
        const dateUSModule = {
          formatDate: (d) => d.toLocaleDateString('en-US')
        }
        
        const { formatDate: formatDateISO } = dateModule
        const { formatDate: formatDateUS } = dateUSModule
        
        const date = new Date('2024-01-15')
        expect(formatDateISO(date)).toContain('2024-01-15')
        expect(typeof formatDateUS(date)).toBe('string')
      })

      it('should support namespace imports (import * as)', () => {
        // import * as math from './math.js'
        
        const mathModule = {
          PI: 3.14159,
          E: 2.71828,
          add: (a, b) => a + b,
          multiply: (a, b) => a * b,
          default: { name: 'Math Utils' }
        }
        
        // Namespace import gets all exports as properties
        const math = mathModule
        
        expect(math.PI).toBe(3.14159)
        expect(math.E).toBe(2.71828)
        expect(math.add(2, 3)).toBe(5)
        expect(math.multiply(4, 5)).toBe(20)
        expect(math.default.name).toBe('Math Utils')  // default is also accessible
      })

      it('should support side-effect only imports', () => {
        // import './polyfills.js'
        // import './analytics.js'
        
        let polyfillsLoaded = false
        let analyticsInitialized = false
        
        // Simulating side-effect modules
        const loadPolyfills = () => { polyfillsLoaded = true }
        const initAnalytics = () => { analyticsInitialized = true }
        
        loadPolyfills()
        initAnalytics()
        
        expect(polyfillsLoaded).toBe(true)
        expect(analyticsInitialized).toBe(true)
      })
    })

    describe('Re-exports (Barrel Files)', () => {
      it('should support re-exporting named exports', () => {
        // date.js
        const dateModule = {
          formatDate: (d) => d.toISOString(),
          parseDate: (s) => new Date(s)
        }
        
        // currency.js
        const currencyModule = {
          formatCurrency: (n) => `$${n.toFixed(2)}`
        }
        
        // utils/index.js (barrel file)
        // export { formatDate, parseDate } from './date.js'
        // export { formatCurrency } from './currency.js'
        const utilsBarrel = {
          ...dateModule,
          ...currencyModule
        }
        
        // Consumer imports from barrel
        const { formatDate, formatCurrency } = utilsBarrel
        
        expect(formatCurrency(19.99)).toBe('$19.99')
        expect(typeof formatDate(new Date())).toBe('string')
      })

      it('should support re-exporting default as named', () => {
        // logger.js
        // export default class Logger { }
        const loggerModule = {
          default: class Logger {
            log(msg) { return msg }
          }
        }
        
        // utils/index.js
        // export { default as Logger } from './logger.js'
        const utilsBarrel = {
          Logger: loggerModule.default
        }
        
        const { Logger } = utilsBarrel
        const logger = new Logger()
        expect(logger.log('test')).toBe('test')
      })

      it('should support re-exporting all (export *)', () => {
        // math.js exports multiple functions
        const mathModule = {
          add: (a, b) => a + b,
          subtract: (a, b) => a - b,
          multiply: (a, b) => a * b
        }
        
        // utils/index.js
        // export * from './math.js'
        const utilsBarrel = { ...mathModule }
        
        expect(utilsBarrel.add(1, 2)).toBe(3)
        expect(utilsBarrel.subtract(5, 3)).toBe(2)
        expect(utilsBarrel.multiply(4, 5)).toBe(20)
      })
    })
  })

  // ===========================================
  // Part 7: Module Characteristics
  // ===========================================

  describe('Part 7: Module Characteristics', () => {
    describe('Automatic Strict Mode', () => {
      it('should demonstrate strict mode behaviors', () => {
        // ES Modules are always in strict mode
        
        // Assigning to undeclared variable throws
        expect(() => {
          'use strict'
          undeclaredVar = 'oops'
        }).toThrow(ReferenceError)
      })

      it('should prevent duplicate parameters in strict mode', () => {
        // In strict mode, duplicate parameter names are syntax errors
        // This would be caught at parse time in a real module:
        // function f(a, a) { }  // SyntaxError
        
        // We can test that strict mode is enforced
        expect(() => {
          'use strict'
          eval('function f(a, a) {}')
        }).toThrow(SyntaxError)
      })

      it('should make this undefined in functions called without context', () => {
        'use strict'
        
        function getThis() {
          return this
        }
        
        expect(getThis()).toBe(undefined)
      })
    })

    describe('Module Scope (not global)', () => {
      it('should keep module variables private by default', () => {
        // In a module, top-level variables are scoped to the module
        const createModule = () => {
          const privateValue = 'secret'
          const publicValue = 'visible'
          
          return {
            publicValue,
            getPrivate: () => privateValue
          }
        }
        
        const mod = createModule()
        
        expect(mod.publicValue).toBe('visible')
        expect(mod.getPrivate()).toBe('secret')
        expect(mod.privateValue).toBe(undefined)  // Not exposed
      })

      it('should not leak var to global scope in modules', () => {
        // In regular scripts, var leaks to window
        // In modules, var is module-scoped
        
        const createModule = () => {
          var moduleVar = 'module scoped'
          return { getVar: () => moduleVar }
        }
        
        const mod = createModule()
        expect(mod.getVar()).toBe('module scoped')
        expect(typeof moduleVar).toBe('undefined')  // Not in outer scope
      })
    })

    describe('Top-level this is undefined', () => {
      it('should have undefined this at module top level', () => {
        // In ES Modules, top-level this is undefined
        // (not window or global)
        
        // Regular function in strict mode has undefined this when called without context
        function getThisInStrictMode() {
          'use strict'
          return this
        }
        
        // Called without context, this is undefined (like module top-level)
        expect(getThisInStrictMode()).toBe(undefined)
        
        // Arrow functions capture this from enclosing scope
        // In a real ES module, this would be undefined at the top level
        const arrowThis = (() => this)()
        
        // Note: In test environment, the outer `this` may not be undefined
        // but in a real ES module file, top-level `this` IS undefined
        // This test demonstrates the concept via strict mode function
      })
    })

    describe('Import Hoisting', () => {
      it('should demonstrate that imports are hoisted', () => {
        // In ES Modules, import declarations are hoisted
        // The imported bindings are available throughout the module
        
        // This would work in a real module:
        // console.log(helper())  // Works! Imports are hoisted
        // import { helper } from './utils.js'
        
        // We simulate by showing the concept
        const moduleCode = () => {
          // Imports are processed first, before any code runs
          const imports = { helper: () => 'helped' }
          
          // Then code runs, with imports already available
          const result = imports.helper()  // Can use before "import line"
          return result
        }
        
        expect(moduleCode()).toBe('helped')
      })
    })
  })

  // ===========================================
  // Part 8: Common Mistakes
  // ===========================================

  describe('Part 8: Common Mistakes', () => {
    describe('Mistake #1: Named vs Default Import Confusion', () => {
      it('should demonstrate the difference between named and default imports', () => {
        const moduleWithBoth = {
          default: function Logger() { return 'default' },
          format: () => 'named format'
        }
        
        // CORRECT: No braces for default
        // import Logger from './logger.js'
        const Logger = moduleWithBoth.default
        
        // CORRECT: Braces for named
        // import { format } from './logger.js'
        const { format } = moduleWithBoth
        
        expect(Logger()).toBe('default')
        expect(format()).toBe('named format')
        
        // WRONG would be:
        // import { Logger } from './logger.js'  // Error: no named export 'Logger'
        expect(moduleWithBoth.Logger).toBe(undefined)  // Not a named export!
      })

      it('should show the curly brace rule', () => {
        /*
          export default X      →  import X from '...'      (no braces)
          export { Y }          →  import { Y } from '...'  (braces)
          export { Z as W }     →  import { W } from '...'  (braces)
        */
        
        const modA = { default: 'X value' }
        const modB = { Y: 'Y value' }
        const modC = { W: 'Z exported as W' }
        
        const X = modA.default       // No braces
        const { Y } = modB           // Braces
        const { W } = modC           // Braces (renamed)
        
        expect(X).toBe('X value')
        expect(Y).toBe('Y value')
        expect(W).toBe('Z exported as W')
      })
    })

    describe('Mistake #2: Missing File Extensions', () => {
      it('should demonstrate that extensions are required', () => {
        // In browsers and Node.js ESM, file extensions are required
        
        const validPaths = [
          './utils.js',           // Correct
          './components/Button.js', // Correct
          '../helpers.mjs',       // Correct
        ]
        
        const invalidPaths = [
          './utils',              // Missing extension - 404 in browser
          './components/Button',  // Missing extension - ERR_MODULE_NOT_FOUND
        ]
        
        // All valid paths have extensions
        validPaths.forEach(path => {
          expect(path).toMatch(/\.(js|mjs|cjs)$/)
        })
        
        // Invalid paths lack extensions
        invalidPaths.forEach(path => {
          expect(path).not.toMatch(/\.(js|mjs|cjs)$/)
        })
      })
    })

    describe('Mistake #3: Using require in ESM', () => {
      it('should show that require is not available in ESM', () => {
        // In ESM files, require() is not defined
        // This would throw: ReferenceError: require is not defined
        
        const esmEnvironment = {
          require: undefined,  // Not available
          import: () => Promise.resolve({}),  // Use this instead
          importMeta: { url: 'file:///path/to/module.js' }
        }
        
        expect(esmEnvironment.require).toBe(undefined)
        expect(typeof esmEnvironment.import).toBe('function')
      })

      it('should show createRequire workaround', () => {
        // If you need require in ESM (for CommonJS packages):
        // import { createRequire } from 'module'
        // const require = createRequire(import.meta.url)
        
        // Simulating createRequire
        const createRequire = (url) => {
          return (moduleName) => {
            // This would actually load CommonJS modules
            return { loaded: moduleName, from: url }
          }
        }
        
        const require = createRequire('file:///app/main.js')
        const legacyModule = require('some-commonjs-package')
        
        expect(legacyModule.loaded).toBe('some-commonjs-package')
      })
    })
  })

  // ===========================================
  // Part 9: Test Your Knowledge (from docs)
  // ===========================================

  describe('Part 9: Test Your Knowledge', () => {
    describe('Q1: Static vs Dynamic - Why tree-shaking works', () => {
      it('should show ESM imports are statically analyzable', () => {
        // ESM imports are declarations, not function calls
        // Bundlers can see exactly what's imported without running code
        
        const moduleExports = {
          add: (a, b) => a + b,
          subtract: (a, b) => a - b,
          multiply: (a, b) => a * b,
          divide: (a, b) => a / b
        }
        
        // Static import - bundler knows only 'add' is used
        const { add } = moduleExports
        
        // The other functions can be tree-shaken out
        const usedExports = ['add']
        const unusedExports = ['subtract', 'multiply', 'divide']
        
        expect(usedExports).toContain('add')
        expect(unusedExports).not.toContain('add')
      })
    })

    describe('Q2: Live bindings vs copies', () => {
      it('should demonstrate the key difference', () => {
        // ESM: live binding (reference)
        const esmModule = { count: 0, increment() { this.count++ } }
        
        expect(esmModule.count).toBe(0)
        esmModule.increment()
        expect(esmModule.count).toBe(1)  // Live - sees the change
        
        // CommonJS simulation: value copy
        let cjsCount = 0
        const cjsExport = { 
          count: cjsCount,  // Copy at export time
          increment() { cjsCount++ }
        }
        
        expect(cjsExport.count).toBe(0)
        cjsExport.increment()
        expect(cjsExport.count).toBe(0)  // Still 0 - it's a copy
      })
    })

    describe('Q3: When to use dynamic imports', () => {
      it('should use dynamic imports for conditional loading', async () => {
        const features = {
          charts: { render: () => 'chart' },
          maps: { render: () => 'map' }
        }
        
        async function loadFeature(name) {
          // Only loads when called, not at module load time
          return Promise.resolve(features[name])
        }
        
        // Feature loaded on demand
        const charts = await loadFeature('charts')
        expect(charts.render()).toBe('chart')
      })
    })

    describe('Q4: Why extensions are required', () => {
      it('should explain browser vs Node resolution', () => {
        // Browsers make HTTP requests - can't try multiple extensions
        // Node ESM matches browser behavior for consistency
        
        const browserRequest = (path) => {
          // Browser requests exactly what you ask for
          // Check for common JS extensions
          const hasExtension = /\.(js|mjs|cjs|json)$/.test(path)
          if (!hasExtension) {
            return { status: 404, error: 'Not Found' }
          }
          return { status: 200, content: 'module code' }
        }
        
        expect(browserRequest('./utils').status).toBe(404)
        expect(browserRequest('./utils.js').status).toBe(200)
        expect(browserRequest('./module.mjs').status).toBe(200)
      })
    })

    describe('Q5: What happens with circular dependencies', () => {
      it('should show TDZ error with const/let', () => {
        // With const/let, accessing before init throws ReferenceError
        expect(() => {
          const fn = () => {
            console.log(x)  // TDZ
            const x = 1
          }
          fn()
        }).toThrow(ReferenceError)
      })

      it('should show deferred access pattern works', () => {
        const moduleA = { value: null }
        const moduleB = {
          getValue: () => moduleA.value  // Deferred - reads at call time
        }
        
        expect(moduleB.getValue()).toBe(null)  // A not initialized
        
        moduleA.value = 'initialized'
        expect(moduleB.getValue()).toBe('initialized')  // Works now
      })
    })
  })
})
