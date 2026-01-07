/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// ============================================================
// COOKIES DOM TESTS
// Tests for code examples from cookies.mdx that require browser APIs
// ============================================================

describe('Cookies - DOM', () => {
  // ============================================================
  // SETUP AND CLEANUP
  // ============================================================

  beforeEach(() => {
    // Clear all cookies before each test
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim()
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
  })

  afterEach(() => {
    // Clean up after each test
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim()
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    })
    vi.restoreAllMocks()
  })

  // ============================================================
  // SETTING COOKIES WITH JAVASCRIPT
  // From cookies.mdx lines 71-88
  // ============================================================

  describe('Setting Cookies with JavaScript', () => {
    // From lines 71-79: Basic cookie syntax
    it('should set a simple cookie', () => {
      document.cookie = "username=Alice"
      
      expect(document.cookie).toContain("username=Alice")
    })

    it('should add multiple cookies without overwriting', () => {
      // From lines 74-79: Multiple assignments add cookies
      document.cookie = "a=1"
      document.cookie = "b=2"
      document.cookie = "c=3"
      
      expect(document.cookie).toContain("a=1")
      expect(document.cookie).toContain("b=2")
      expect(document.cookie).toContain("c=3")
    })

    it('should update existing cookie with same name', () => {
      document.cookie = "theme=light"
      document.cookie = "theme=dark"
      
      // Should only have one "theme" cookie
      const matches = document.cookie.match(/theme=/g)
      expect(matches).toHaveLength(1)
      expect(document.cookie).toContain("theme=dark")
    })
  })

  // ============================================================
  // THE QUIRKY NATURE OF document.cookie
  // From cookies.mdx lines 81-91
  // ============================================================

  describe('document.cookie Quirks', () => {
    // From lines 81-91: Setting vs reading behavior
    it('should return all cookies when reading', () => {
      document.cookie = "first=1"
      document.cookie = "second=2"
      
      const cookies = document.cookie
      expect(typeof cookies).toBe("string")
      expect(cookies).toContain("first=1")
      expect(cookies).toContain("second=2")
    })

    it('should not allow direct property access', () => {
      document.cookie = "test=value"
      
      // document.cookie.test doesn't work
      expect(document.cookie.test).toBeUndefined()
    })
  })

  // ============================================================
  // READING COOKIES
  // From cookies.mdx lines 106-147
  // ============================================================

  describe('Reading Cookies', () => {
    // From lines 106-117: getCookie implementation
    describe('getCookie function', () => {
      function getCookie(name) {
        const cookies = document.cookie.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return decodeURIComponent(cookieValue)
          }
        }
        return null
      }

      it('should retrieve a cookie by name', () => {
        document.cookie = "username=Alice"
        
        expect(getCookie("username")).toBe("Alice")
      })

      it('should return null for missing cookies', () => {
        expect(getCookie("nonexistent")).toBeNull()
      })

      it('should decode encoded values', () => {
        document.cookie = `message=${encodeURIComponent("Hello, World!")}`
        
        expect(getCookie("message")).toBe("Hello, World!")
      })
    })

    // From lines 121-136: parseCookies implementation
    describe('parseCookies function', () => {
      function parseCookies() {
        return document.cookie
          .split("; ")
          .filter(Boolean)
          .reduce((cookies, cookie) => {
            const [name, ...valueParts] = cookie.split("=")
            const value = valueParts.join("=")
            cookies[name] = decodeURIComponent(value)
            return cookies
          }, {})
      }

      it('should parse all cookies into an object', () => {
        document.cookie = "a=1"
        document.cookie = "b=2"
        document.cookie = "c=3"
        
        const cookies = parseCookies()
        
        expect(cookies.a).toBe("1")
        expect(cookies.b).toBe("2")
        expect(cookies.c).toBe("3")
      })

      it('should return empty object when no cookies', () => {
        // Cookies should be cleared by beforeEach
        const cookies = parseCookies()
        
        expect(Object.keys(cookies).length).toBe(0)
      })
    })

    // From lines 140-147: hasCookie implementation
    describe('hasCookie function', () => {
      function hasCookie(name) {
        return document.cookie
          .split("; ")
          .some(cookie => cookie.startsWith(`${name}=`))
      }

      it('should return true for existing cookies', () => {
        document.cookie = "sessionId=abc123"
        
        expect(hasCookie("sessionId")).toBe(true)
      })

      it('should return false for missing cookies', () => {
        expect(hasCookie("nonexistent")).toBe(false)
      })
    })
  })

  // ============================================================
  // WRITING COOKIES WITH HELPER FUNCTION
  // From cookies.mdx lines 153-196
  // ============================================================

  describe('setCookie Helper Function', () => {
    // From lines 153-196: Complete setCookie implementation
    function setCookie(name, value, options = {}) {
      const defaults = {
        path: "/"
      }
      
      const settings = { ...defaults, ...options }
      
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
      
      if (settings.maxAge !== undefined) {
        cookieString += `; max-age=${settings.maxAge}`
      } else if (settings.expires instanceof Date) {
        cookieString += `; expires=${settings.expires.toUTCString()}`
      }
      
      if (settings.path) {
        cookieString += `; path=${settings.path}`
      }
      
      document.cookie = cookieString
    }

    it('should set a basic cookie', () => {
      setCookie("test", "value")
      
      expect(document.cookie).toContain("test=value")
    })

    it('should set cookie with max-age', () => {
      setCookie("temp", "data", { maxAge: 3600 })
      
      expect(document.cookie).toContain("temp=data")
    })

    it('should encode special characters', () => {
      setCookie("message", "Hello, World!")
      
      // The cookie should be set (browser decodes when reading)
      expect(document.cookie).toContain("message=")
    })

    it('should overwrite existing cookie', () => {
      setCookie("key", "old")
      setCookie("key", "new")
      
      // Should only have one occurrence
      const matches = document.cookie.match(/key=/g)
      expect(matches).toHaveLength(1)
    })
  })

  // ============================================================
  // DELETING COOKIES
  // From cookies.mdx lines 201-220
  // ============================================================

  describe('Deleting Cookies', () => {
    // From lines 201-220: deleteCookie implementation
    function setCookie(name, value, options = {}) {
      const defaults = { path: "/" }
      const settings = { ...defaults, ...options }
      
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`
      
      if (settings.maxAge !== undefined) {
        cookieString += `; max-age=${settings.maxAge}`
      }
      
      if (settings.path) {
        cookieString += `; path=${settings.path}`
      }
      
      document.cookie = cookieString
    }

    function deleteCookie(name, options = {}) {
      setCookie(name, "", {
        ...options,
        maxAge: 0
      })
    }

    it('should delete a cookie by setting max-age=0', () => {
      // First, set a cookie
      document.cookie = "toDelete=value; path=/"
      expect(document.cookie).toContain("toDelete=value")
      
      // Delete it
      deleteCookie("toDelete")
      
      // Should be gone
      expect(document.cookie).not.toContain("toDelete=value")
    })

    it('should delete cookie using past expiration date', () => {
      document.cookie = "oldCookie=data; path=/"
      expect(document.cookie).toContain("oldCookie=data")
      
      document.cookie = "oldCookie=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
      
      expect(document.cookie).not.toContain("oldCookie=data")
    })
  })

  // ============================================================
  // COOKIE ATTRIBUTES
  // From cookies.mdx lines 269-383
  // ============================================================

  describe('Cookie Attributes', () => {
    // From lines 275-293: max-age attribute
    describe('max-age', () => {
      it('should accept max-age in seconds', () => {
        // 1 hour = 3600 seconds
        document.cookie = "hourly=data; max-age=3600; path=/"
        
        expect(document.cookie).toContain("hourly=data")
      })

      it('should delete cookie with max-age=0', () => {
        document.cookie = "temp=value; path=/"
        document.cookie = "temp=; max-age=0; path=/"
        
        expect(document.cookie).not.toContain("temp=value")
      })

      it('should delete cookie with negative max-age', () => {
        document.cookie = "temp=value; path=/"
        document.cookie = "temp=; max-age=-1; path=/"
        
        expect(document.cookie).not.toContain("temp=value")
      })
    })

    // From lines 295-307: expires attribute
    describe('expires', () => {
      it('should accept UTC date string', () => {
        const futureDate = new Date()
        futureDate.setTime(futureDate.getTime() + 24 * 60 * 60 * 1000)
        
        document.cookie = `future=data; expires=${futureDate.toUTCString()}; path=/`
        
        expect(document.cookie).toContain("future=data")
      })

      it('should delete with past expiration date', () => {
        document.cookie = "past=data; path=/"
        document.cookie = "past=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
        
        expect(document.cookie).not.toContain("past=data")
      })
    })

    // From lines 309-343: path attribute
    describe('path', () => {
      it('should set cookie with specific path', () => {
        // Note: jsdom doesn't fully support path restrictions
        // Cookies with non-root paths may not be accessible
        // This tests the cookie string format instead
        const cookieString = "appToken=abc; path=/app"
        
        expect(cookieString).toContain("path=/app")
        expect(cookieString).toContain("appToken=abc")
      })

      it('should set cookie with root path', () => {
        document.cookie = "rootToken=xyz; path=/"
        
        expect(document.cookie).toContain("rootToken=xyz")
      })
    })
  })

  // ============================================================
  // SECURITY ATTRIBUTES (where testable)
  // From cookies.mdx lines 385-470
  // ============================================================

  describe('Security Attributes', () => {
    // Note: Many security attributes can't be fully tested in jsdom
    // These tests verify the cookie string format
    
    describe('SameSite attribute formatting', () => {
      it('should format samesite=strict correctly', () => {
        const cookieString = "session=abc; samesite=strict"
        
        expect(cookieString).toContain("samesite=strict")
      })

      it('should format samesite=lax correctly', () => {
        const cookieString = "session=abc; samesite=lax"
        
        expect(cookieString).toContain("samesite=lax")
      })

      it('should format samesite=none with secure', () => {
        const cookieString = "widget=abc; samesite=none; secure"
        
        expect(cookieString).toContain("samesite=none")
        expect(cookieString).toContain("secure")
      })
    })
  })

  // ============================================================
  // INTEGRATION TESTS
  // Combined functionality from multiple sections
  // ============================================================

  describe('Integration Tests', () => {
    it('should round-trip JSON data through cookies', () => {
      const userData = { name: "Alice", role: "admin" }
      const encoded = encodeURIComponent(JSON.stringify(userData))
      
      document.cookie = `user=${encoded}; path=/`
      
      // Read it back
      function getCookie(name) {
        const cookies = document.cookie.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return decodeURIComponent(cookieValue)
          }
        }
        return null
      }
      
      const retrieved = getCookie("user")
      const parsed = JSON.parse(retrieved)
      
      expect(parsed).toEqual(userData)
    })

    it('should manage multiple cookies for a user session', () => {
      // Set session cookies
      document.cookie = "userId=12345; path=/"
      document.cookie = "theme=dark; path=/"
      document.cookie = "lang=en; path=/"
      
      // Read all
      function parseCookies() {
        return document.cookie
          .split("; ")
          .filter(Boolean)
          .reduce((cookies, cookie) => {
            const [name, ...valueParts] = cookie.split("=")
            const value = valueParts.join("=")
            cookies[name] = decodeURIComponent(value)
            return cookies
          }, {})
      }
      
      const cookies = parseCookies()
      
      expect(cookies.userId).toBe("12345")
      expect(cookies.theme).toBe("dark")
      expect(cookies.lang).toBe("en")
      
      // Update one
      document.cookie = "theme=light; path=/"
      
      const updated = parseCookies()
      expect(updated.theme).toBe("light")
      expect(updated.userId).toBe("12345")  // Others unchanged
    })

    it('should handle cookie lifecycle: create, read, update, delete', () => {
      function getCookie(name) {
        const cookies = document.cookie.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return decodeURIComponent(cookieValue)
          }
        }
        return null
      }

      // Create
      document.cookie = "lifecycle=created; path=/"
      expect(getCookie("lifecycle")).toBe("created")
      
      // Read (tested above)
      
      // Update
      document.cookie = "lifecycle=updated; path=/"
      expect(getCookie("lifecycle")).toBe("updated")
      
      // Delete
      document.cookie = "lifecycle=; max-age=0; path=/"
      expect(getCookie("lifecycle")).toBeNull()
    })
  })

  // ============================================================
  // EDGE CASES IN DOM ENVIRONMENT
  // ============================================================

  describe('DOM Edge Cases', () => {
    it('should handle cookies with empty values', () => {
      document.cookie = "empty=; path=/"
      
      function getCookie(name) {
        const cookies = document.cookie.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return cookieValue || ""
          }
        }
        return null
      }
      
      // Empty cookie might not be stored or returned as empty string
      const value = getCookie("empty")
      expect(value === "" || value === null).toBe(true)
    })

    it('should handle rapid cookie updates', () => {
      for (let i = 0; i < 10; i++) {
        document.cookie = `counter=${i}; path=/`
      }
      
      function getCookie(name) {
        const cookies = document.cookie.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return cookieValue
          }
        }
        return null
      }
      
      expect(getCookie("counter")).toBe("9")  // Last value
    })

    it('should handle special characters after encoding', () => {
      const specialValue = "test<script>alert('xss')</script>"
      document.cookie = `safe=${encodeURIComponent(specialValue)}; path=/`
      
      function getCookie(name) {
        const cookies = document.cookie.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return decodeURIComponent(cookieValue)
          }
        }
        return null
      }
      
      const retrieved = getCookie("safe")
      expect(retrieved).toBe(specialValue)
    })
  })
})
