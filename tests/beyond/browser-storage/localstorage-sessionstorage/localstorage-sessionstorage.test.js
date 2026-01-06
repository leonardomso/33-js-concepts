/**
 * Tests for localStorage & sessionStorage concept page
 * @see /docs/beyond/concepts/localstorage-sessionstorage.mdx
 * 
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('localStorage & sessionStorage', () => {
  // Clear storage before and after each test
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('Basic localStorage Operations', () => {
    // Tests for MDX lines ~10-18 (opening code example)
    it('should store and retrieve string values with setItem/getItem', () => {
      localStorage.setItem("theme", "dark")
      const theme = localStorage.getItem("theme")
      
      expect(theme).toBe("dark")
    })

    it('should return null for non-existent keys', () => {
      const missing = localStorage.getItem("nonexistent")
      
      expect(missing).toBeNull()
    })

    it('should update existing values with setItem', () => {
      localStorage.setItem("username", "alice")
      localStorage.setItem("username", "bob")
      
      expect(localStorage.getItem("username")).toBe("bob")
    })

    it('should remove items with removeItem', () => {
      localStorage.setItem("toRemove", "value")
      localStorage.removeItem("toRemove")
      
      expect(localStorage.getItem("toRemove")).toBeNull()
    })

    it('should clear all items with clear()', () => {
      localStorage.setItem("a", "1")
      localStorage.setItem("b", "2")
      localStorage.setItem("c", "3")
      
      localStorage.clear()
      
      expect(localStorage.length).toBe(0)
    })

    it('should return key at index with key()', () => {
      localStorage.setItem("a", "1")
      localStorage.setItem("b", "2")
      
      // Note: order is not guaranteed, but both keys should exist
      const keys = [localStorage.key(0), localStorage.key(1)]
      expect(keys).toContain("a")
      expect(keys).toContain("b")
    })

    it('should return null for out of bounds key index', () => {
      localStorage.setItem("a", "1")
      
      expect(localStorage.key(99)).toBeNull()
    })

    it('should track length property correctly', () => {
      expect(localStorage.length).toBe(0)
      
      localStorage.setItem("x", "1")
      expect(localStorage.length).toBe(1)
      
      localStorage.setItem("y", "2")
      expect(localStorage.length).toBe(2)
      
      localStorage.removeItem("x")
      expect(localStorage.length).toBe(1)
    })
  })

  describe('Basic sessionStorage Operations', () => {
    it('should store and retrieve values like localStorage', () => {
      sessionStorage.setItem("formDraft", "Hello...")
      
      expect(sessionStorage.getItem("formDraft")).toBe("Hello...")
    })

    it('should maintain separate storage from localStorage', () => {
      localStorage.setItem("key", "local")
      sessionStorage.setItem("key", "session")
      
      expect(localStorage.getItem("key")).toBe("local")
      expect(sessionStorage.getItem("key")).toBe("session")
    })

    it('should support all the same API methods', () => {
      sessionStorage.setItem("a", "1")
      sessionStorage.setItem("b", "2")
      
      expect(sessionStorage.length).toBe(2)
      expect(sessionStorage.key(0)).not.toBeNull()
      
      sessionStorage.removeItem("a")
      expect(sessionStorage.length).toBe(1)
      
      sessionStorage.clear()
      expect(sessionStorage.length).toBe(0)
    })
  })

  describe('Storing Complex Data with JSON', () => {
    // Tests for MDX lines ~280-340 (JSON section)
    describe('Automatic string conversion problems', () => {
      it('should convert numbers to strings', () => {
        localStorage.setItem("count", 42)
        
        expect(typeof localStorage.getItem("count")).toBe("string")
        expect(localStorage.getItem("count")).toBe("42")
      })

      it('should convert booleans to strings', () => {
        localStorage.setItem("isActive", true)
        
        expect(localStorage.getItem("isActive")).toBe("true")
        expect(localStorage.getItem("isActive")).not.toBe(true)
      })

      it('should lose object data without JSON.stringify', () => {
        localStorage.setItem("user", { name: "Alice" })
        
        expect(localStorage.getItem("user")).toBe("[object Object]")
      })

      it('should convert arrays to comma-separated strings', () => {
        localStorage.setItem("items", [1, 2, 3])
        
        expect(localStorage.getItem("items")).toBe("1,2,3")
      })
    })

    describe('JSON.stringify and JSON.parse solution', () => {
      it('should properly store and retrieve objects', () => {
        const user = { name: "Alice", age: 30, roles: ["admin", "user"] }
        localStorage.setItem("user", JSON.stringify(user))
        
        const storedUser = JSON.parse(localStorage.getItem("user"))
        
        expect(storedUser.name).toBe("Alice")
        expect(storedUser.age).toBe(30)
        expect(storedUser.roles).toEqual(["admin", "user"])
      })

      it('should properly store and retrieve arrays', () => {
        const favorites = ["item1", "item2", "item3"]
        localStorage.setItem("favorites", JSON.stringify(favorites))
        
        const storedFavorites = JSON.parse(localStorage.getItem("favorites"))
        
        expect(storedFavorites).toEqual(favorites)
        expect(storedFavorites[0]).toBe("item1")
      })

      it('should handle nested objects', () => {
        const data = {
          user: {
            profile: {
              name: "Bob",
              settings: { theme: "dark" }
            }
          }
        }
        localStorage.setItem("data", JSON.stringify(data))
        
        const stored = JSON.parse(localStorage.getItem("data"))
        
        expect(stored.user.profile.name).toBe("Bob")
        expect(stored.user.profile.settings.theme).toBe("dark")
      })
    })

    describe('JSON Gotchas', () => {
      it('should convert Date objects to strings', () => {
        const now = new Date("2024-01-15T12:00:00Z")
        const data = { created: now }
        localStorage.setItem("data", JSON.stringify(data))
        
        const parsed = JSON.parse(localStorage.getItem("data"))
        
        expect(typeof parsed.created).toBe("string")
        // Can be parsed back to Date
        const restoredDate = new Date(parsed.created)
        expect(restoredDate.getTime()).toBe(now.getTime())
      })

      it('should lose undefined values in objects', () => {
        const obj = { a: 1, b: undefined }
        const stringified = JSON.stringify(obj)
        
        expect(stringified).toBe('{"a":1}')
        expect(JSON.parse(stringified).b).toBeUndefined()
      })

      it('should lose function properties', () => {
        const withFunction = { greet: () => "hello", name: "test" }
        const stringified = JSON.stringify(withFunction)
        
        expect(stringified).toBe('{"name":"test"}')
      })

      it('should throw on circular references', () => {
        const circular = { name: "test" }
        circular.self = circular
        
        expect(() => JSON.stringify(circular)).toThrow(TypeError)
      })
    })
  })

  describe('Storage Wrapper Utility', () => {
    // Tests for the storage wrapper from MDX lines ~340-375
    const storage = {
      set(key, value) {
        try {
          localStorage.setItem(key, JSON.stringify(value))
          return true
        } catch (error) {
          return false
        }
      },
      
      get(key, defaultValue = null) {
        try {
          const item = localStorage.getItem(key)
          return item ? JSON.parse(item) : defaultValue
        } catch (error) {
          return defaultValue
        }
      },
      
      remove(key) {
        localStorage.removeItem(key)
      },
      
      clear() {
        localStorage.clear()
      }
    }

    it('should store objects without manual stringify', () => {
      storage.set("user", { name: "Alice", premium: true })
      
      const user = storage.get("user")
      
      expect(user).toEqual({ name: "Alice", premium: true })
    })

    it('should return default value for missing keys', () => {
      const missing = storage.get("nonexistent", { guest: true })
      
      expect(missing).toEqual({ guest: true })
    })

    it('should return null by default for missing keys', () => {
      const missing = storage.get("nonexistent")
      
      expect(missing).toBeNull()
    })

    it('should handle remove and clear operations', () => {
      storage.set("a", 1)
      storage.set("b", 2)
      
      storage.remove("a")
      expect(storage.get("a")).toBeNull()
      expect(storage.get("b")).toBe(2)
      
      storage.clear()
      expect(storage.get("b")).toBeNull()
    })

    it('should return default on invalid JSON', () => {
      localStorage.setItem("invalid", "not-json{")
      
      const result = storage.get("invalid", "fallback")
      
      expect(result).toBe("fallback")
    })
  })

  describe('Storage API Demo Function', () => {
    // Test for the complete demonstrateStorageAPI example (MDX lines ~240-270)
    it('should correctly demonstrate all storage operations', () => {
      // Clear previous data
      localStorage.clear()
      
      // Store some items
      localStorage.setItem("name", "Alice")
      localStorage.setItem("role", "Developer")
      localStorage.setItem("level", "Senior")
      
      expect(localStorage.length).toBe(3)
      expect(localStorage.getItem("name")).toBe("Alice")
      
      // Update an item
      localStorage.setItem("level", "Lead")
      expect(localStorage.getItem("level")).toBe("Lead")
      
      // Collect all items
      const items = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        items[key] = localStorage.getItem(key)
      }
      
      expect(items.name).toBe("Alice")
      expect(items.role).toBe("Developer")
      expect(items.level).toBe("Lead")
      
      // Remove one item
      localStorage.removeItem("role")
      expect(localStorage.length).toBe(2)
      
      // Clear everything
      localStorage.clear()
      expect(localStorage.length).toBe(0)
    })
  })

  describe('Feature Detection', () => {
    // Tests for the storageAvailable function (MDX lines ~520-545)
    function storageAvailable(type) {
      try {
        const storage = window[type]
        const testKey = "__storage_test__"
        storage.setItem(testKey, testKey)
        storage.removeItem(testKey)
        return true
      } catch (error) {
        return false
      }
    }

    it('should return true when localStorage is available', () => {
      expect(storageAvailable("localStorage")).toBe(true)
    })

    it('should return true when sessionStorage is available', () => {
      expect(storageAvailable("sessionStorage")).toBe(true)
    })

    it('should return false for invalid storage type', () => {
      expect(storageAvailable("invalidStorage")).toBe(false)
    })
  })

  describe('Common Patterns', () => {
    describe('Theme/Dark Mode Preference', () => {
      // Tests for MDX lines ~640-665
      function setTheme(theme) {
        return localStorage.setItem("theme", theme)
      }

      function loadTheme() {
        const savedTheme = localStorage.getItem("theme")
        return savedTheme || "light"
      }

      function toggleTheme() {
        const current = localStorage.getItem("theme") || "light"
        const newTheme = current === "light" ? "dark" : "light"
        localStorage.setItem("theme", newTheme)
        return newTheme
      }

      it('should save and load theme preference', () => {
        setTheme("dark")
        expect(loadTheme()).toBe("dark")
        
        setTheme("light")
        expect(loadTheme()).toBe("light")
      })

      it('should default to light theme when none saved', () => {
        localStorage.clear()
        expect(loadTheme()).toBe("light")
      })

      it('should toggle between light and dark', () => {
        localStorage.clear()
        
        expect(toggleTheme()).toBe("dark")
        expect(toggleTheme()).toBe("light")
        expect(toggleTheme()).toBe("dark")
      })
    })

    describe('Multi-Step Form Wizard', () => {
      // Tests for MDX lines ~670-695
      function saveFormProgress(step, data) {
        const progress = JSON.parse(sessionStorage.getItem("formProgress") || "{}")
        progress[step] = data
        progress.currentStep = step
        sessionStorage.setItem("formProgress", JSON.stringify(progress))
      }

      function loadFormProgress() {
        return JSON.parse(sessionStorage.getItem("formProgress") || "{}")
      }

      function clearFormProgress() {
        sessionStorage.removeItem("formProgress")
      }

      it('should save and load form progress', () => {
        saveFormProgress(1, { name: "Alice" })
        saveFormProgress(2, { email: "alice@example.com" })
        
        const progress = loadFormProgress()
        
        expect(progress.currentStep).toBe(2)
        expect(progress[1]).toEqual({ name: "Alice" })
        expect(progress[2]).toEqual({ email: "alice@example.com" })
      })

      it('should clear form progress', () => {
        saveFormProgress(1, { name: "Test" })
        clearFormProgress()
        
        expect(loadFormProgress()).toEqual({})
      })
    })

    describe('Recently Viewed Items', () => {
      // Tests for MDX lines ~700-720
      function addToRecentlyViewed(item, maxItems = 10) {
        const recent = JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
        const filtered = recent.filter((i) => i.id !== item.id)
        filtered.unshift(item)
        const trimmed = filtered.slice(0, maxItems)
        localStorage.setItem("recentlyViewed", JSON.stringify(trimmed))
      }

      function getRecentlyViewed() {
        return JSON.parse(localStorage.getItem("recentlyViewed") || "[]")
      }

      it('should add items to recently viewed', () => {
        addToRecentlyViewed({ id: 1, name: "Item 1" })
        addToRecentlyViewed({ id: 2, name: "Item 2" })
        
        const recent = getRecentlyViewed()
        
        expect(recent.length).toBe(2)
        expect(recent[0].id).toBe(2)  // Most recent first
        expect(recent[1].id).toBe(1)
      })

      it('should move duplicate items to front', () => {
        addToRecentlyViewed({ id: 1, name: "Item 1" })
        addToRecentlyViewed({ id: 2, name: "Item 2" })
        addToRecentlyViewed({ id: 1, name: "Item 1 Updated" })
        
        const recent = getRecentlyViewed()
        
        expect(recent.length).toBe(2)
        expect(recent[0].id).toBe(1)
        expect(recent[0].name).toBe("Item 1 Updated")
      })

      it('should limit to maxItems', () => {
        for (let i = 1; i <= 15; i++) {
          addToRecentlyViewed({ id: i, name: `Item ${i}` }, 10)
        }
        
        const recent = getRecentlyViewed()
        
        expect(recent.length).toBe(10)
        expect(recent[0].id).toBe(15)  // Most recent
        expect(recent[9].id).toBe(6)   // Oldest kept
      })

      it('should return empty array when nothing stored', () => {
        localStorage.clear()
        expect(getRecentlyViewed()).toEqual([])
      })
    })
  })

  describe('Common Mistakes', () => {
    describe('Null handling from getItem', () => {
      // Tests for MDX lines ~735-745
      it('should demonstrate the null handling issue', () => {
        // Dangerous pattern
        const settings = JSON.parse(localStorage.getItem("settings"))
        
        expect(settings).toBeNull()
        expect(() => settings.theme).toThrow(TypeError)
      })

      it('should safely handle missing values with default', () => {
        const settings = JSON.parse(localStorage.getItem("settings")) || {}
        const theme = settings.theme || "light"
        
        expect(theme).toBe("light")
      })
    })

    describe('Default value pattern', () => {
      it('should provide default for getItem with OR operator', () => {
        const theme = localStorage.getItem("theme") || "light"
        
        expect(theme).toBe("light")
      })

      it('should not use default when value exists', () => {
        localStorage.setItem("theme", "dark")
        const theme = localStorage.getItem("theme") || "light"
        
        expect(theme).toBe("dark")
      })
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty string keys', () => {
      localStorage.setItem("", "empty key")
      
      expect(localStorage.getItem("")).toBe("empty key")
    })

    it('should handle empty string values', () => {
      localStorage.setItem("key", "")
      
      expect(localStorage.getItem("key")).toBe("")
      expect(localStorage.getItem("key")).not.toBeNull()
    })

    it('should handle special characters in keys', () => {
      localStorage.setItem("key with spaces", "value")
      localStorage.setItem("key.with.dots", "value")
      localStorage.setItem("key-with-dashes", "value")
      
      expect(localStorage.getItem("key with spaces")).toBe("value")
      expect(localStorage.getItem("key.with.dots")).toBe("value")
      expect(localStorage.getItem("key-with-dashes")).toBe("value")
    })

    it('should handle unicode in keys and values', () => {
      localStorage.setItem("emoji", "Hello")
      localStorage.setItem("greeting", "Hello World")
      
      expect(localStorage.getItem("emoji")).toBe("Hello")
      expect(localStorage.getItem("greeting")).toBe("Hello World")
    })

    it('should handle very long strings', () => {
      const longString = "x".repeat(1000000)  // 1MB string
      localStorage.setItem("long", longString)
      
      expect(localStorage.getItem("long")).toBe(longString)
      expect(localStorage.getItem("long").length).toBe(1000000)
    })

    it('should distinguish between null stored as string and actual null', () => {
      localStorage.setItem("nullString", "null")
      
      expect(localStorage.getItem("nullString")).toBe("null")
      expect(localStorage.getItem("nonexistent")).toBeNull()
    })

    it('should handle removing non-existent keys without error', () => {
      expect(() => {
        localStorage.removeItem("does-not-exist")
      }).not.toThrow()
    })

    it('should handle clearing already empty storage', () => {
      localStorage.clear()
      
      expect(() => {
        localStorage.clear()
      }).not.toThrow()
      
      expect(localStorage.length).toBe(0)
    })
  })

  describe('Iteration Patterns', () => {
    it('should iterate using for loop with key()', () => {
      localStorage.setItem("a", "1")
      localStorage.setItem("b", "2")
      localStorage.setItem("c", "3")
      
      const items = {}
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        items[key] = localStorage.getItem(key)
      }
      
      expect(items).toEqual({ a: "1", b: "2", c: "3" })
    })

    it('should iterate using Object.keys', () => {
      localStorage.setItem("x", "10")
      localStorage.setItem("y", "20")
      
      const keys = Object.keys(localStorage)
      
      expect(keys).toContain("x")
      expect(keys).toContain("y")
    })
  })

  describe('Test Your Knowledge Examples', () => {
    describe('Question 2: JSON.stringify necessity', () => {
      it('should demonstrate data loss without stringify', () => {
        localStorage.setItem("user", { name: "Alice" })
        
        expect(localStorage.getItem("user")).toBe("[object Object]")
      })

      it('should preserve data with stringify', () => {
        localStorage.setItem("user", JSON.stringify({ name: "Alice" }))
        
        const stored = localStorage.getItem("user")
        expect(stored).toBe('{"name":"Alice"}')
        
        const parsed = JSON.parse(stored)
        expect(parsed.name).toBe("Alice")
      })
    })

    describe('Question 6: Feature detection', () => {
      it('should detect localStorage availability', () => {
        function storageAvailable(type) {
          try {
            const storage = window[type]
            const testKey = "__test__"
            storage.setItem(testKey, testKey)
            storage.removeItem(testKey)
            return true
          } catch (e) {
            return false
          }
        }
        
        // In jsdom, localStorage is available
        expect(storageAvailable("localStorage")).toBe(true)
      })
    })
  })
})

describe('SafeSetItem with QuotaExceededError handling', () => {
  // Tests for MDX lines ~490-515
  function safeSetItem(key, value) {
    try {
      localStorage.setItem(key, value)
      return true
    } catch (error) {
      if (error.name === "QuotaExceededError") {
        return false
      }
      throw error
    }
  }

  beforeEach(() => {
    localStorage.clear()
  })

  it('should return true on successful storage', () => {
    const result = safeSetItem("test", "value")
    
    expect(result).toBe(true)
    expect(localStorage.getItem("test")).toBe("value")
  })

  // Note: It's difficult to test QuotaExceededError in jsdom
  // as it typically doesn't enforce storage limits
  it('should handle normal operations', () => {
    safeSetItem("a", "1")
    safeSetItem("b", "2")
    
    expect(localStorage.getItem("a")).toBe("1")
    expect(localStorage.getItem("b")).toBe("2")
  })
})
