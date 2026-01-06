import { describe, it, expect } from 'vitest'

// ============================================================
// COOKIES CONCEPT TESTS
// Tests for code examples from cookies.mdx
// Note: Most cookie operations require a browser environment.
// These tests focus on the helper functions and logic that can
// be tested without document.cookie.
// ============================================================

describe('Cookies', () => {
  // ============================================================
  // ENCODING SPECIAL CHARACTERS
  // From cookies.mdx lines 93-101
  // ============================================================

  describe('Encoding Special Characters', () => {
    // From lines 93-101: encodeURIComponent for cookie values
    it('should encode special characters in cookie values', () => {
      const value = "Hello, World!"
      const encoded = encodeURIComponent(value)
      
      expect(encoded).toBe("Hello%2C%20World!")
    })

    it('should decode encoded cookie values', () => {
      const encoded = "Hello%2C%20World!"
      const decoded = decodeURIComponent(encoded)
      
      expect(decoded).toBe("Hello, World!")
    })

    it('should handle values with semicolons', () => {
      const value = "key=value;another=test"
      const encoded = encodeURIComponent(value)
      
      expect(encoded).toBe("key%3Dvalue%3Banother%3Dtest")
      expect(decodeURIComponent(encoded)).toBe(value)
    })

    it('should handle values with spaces', () => {
      const value = "hello world"
      const encoded = encodeURIComponent(value)
      
      expect(encoded).toBe("hello%20world")
    })

    it('should handle empty strings', () => {
      expect(encodeURIComponent("")).toBe("")
      expect(decodeURIComponent("")).toBe("")
    })

    it('should handle unicode characters', () => {
      const value = "Hello, "
      const encoded = encodeURIComponent(value)
      
      expect(encoded).not.toBe(value)
      expect(decodeURIComponent(encoded)).toBe(value)
    })
  })

  // ============================================================
  // READING COOKIES - PARSER FUNCTIONS
  // From cookies.mdx lines 106-138
  // ============================================================

  describe('Cookie Parser Functions', () => {
    // From lines 106-117: getCookie function
    describe('getCookie', () => {
      function getCookie(cookieString, name) {
        const cookies = cookieString.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return decodeURIComponent(cookieValue)
          }
        }
        return null
      }

      it('should return the value of an existing cookie', () => {
        const cookieString = "username=Alice; theme=dark; lang=en"
        
        expect(getCookie(cookieString, "username")).toBe("Alice")
        expect(getCookie(cookieString, "theme")).toBe("dark")
        expect(getCookie(cookieString, "lang")).toBe("en")
      })

      it('should return null for non-existent cookie', () => {
        const cookieString = "username=Alice; theme=dark"
        
        expect(getCookie(cookieString, "nonexistent")).toBeNull()
      })

      it('should handle empty cookie string', () => {
        expect(getCookie("", "username")).toBeNull()
      })

      it('should decode encoded cookie values', () => {
        const cookieString = "message=Hello%2C%20World!"
        
        expect(getCookie(cookieString, "message")).toBe("Hello, World!")
      })

      it('should handle single cookie', () => {
        const cookieString = "only=one"
        
        expect(getCookie(cookieString, "only")).toBe("one")
      })
    })

    // From lines 121-136: parseCookies function
    describe('parseCookies', () => {
      function parseCookies(cookieString) {
        return cookieString
          .split("; ")
          .filter(Boolean)
          .reduce((cookies, cookie) => {
            const [name, ...valueParts] = cookie.split("=")
            const value = valueParts.join("=")
            cookies[name] = decodeURIComponent(value)
            return cookies
          }, {})
      }

      it('should parse multiple cookies into an object', () => {
        const cookieString = "username=Alice; theme=dark; lang=en"
        const cookies = parseCookies(cookieString)
        
        expect(cookies).toEqual({
          username: "Alice",
          theme: "dark",
          lang: "en"
        })
      })

      it('should handle empty cookie string', () => {
        expect(parseCookies("")).toEqual({})
      })

      it('should handle values containing equals signs', () => {
        const cookieString = "data=a=1&b=2"
        const cookies = parseCookies(cookieString)
        
        expect(cookies.data).toBe("a=1&b=2")
      })

      it('should decode encoded values', () => {
        const cookieString = "message=Hello%2C%20World!"
        const cookies = parseCookies(cookieString)
        
        expect(cookies.message).toBe("Hello, World!")
      })

      it('should handle single cookie', () => {
        const cookieString = "single=value"
        const cookies = parseCookies(cookieString)
        
        expect(cookies).toEqual({ single: "value" })
      })
    })

    // From lines 140-147: hasCookie function
    describe('hasCookie', () => {
      function hasCookie(cookieString, name) {
        return cookieString
          .split("; ")
          .some(cookie => cookie.startsWith(`${name}=`))
      }

      it('should return true if cookie exists', () => {
        const cookieString = "username=Alice; theme=dark"
        
        expect(hasCookie(cookieString, "username")).toBe(true)
        expect(hasCookie(cookieString, "theme")).toBe(true)
      })

      it('should return false if cookie does not exist', () => {
        const cookieString = "username=Alice; theme=dark"
        
        expect(hasCookie(cookieString, "nonexistent")).toBe(false)
      })

      it('should not match partial cookie names', () => {
        const cookieString = "username=Alice"
        
        expect(hasCookie(cookieString, "user")).toBe(false)
      })

      it('should handle empty cookie string', () => {
        expect(hasCookie("", "username")).toBe(false)
      })
    })
  })

  // ============================================================
  // COOKIE STRING BUILDING
  // From cookies.mdx lines 153-196
  // ============================================================

  describe('Cookie String Building', () => {
    // From lines 153-196: setCookie function (without document.cookie)
    describe('buildCookieString helper', () => {
      function buildCookieString(name, value, options = {}) {
        const defaults = {
          path: "/",
          secure: true,
          sameSite: "lax"
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
        
        if (settings.domain) {
          cookieString += `; domain=${settings.domain}`
        }
        
        if (settings.secure) {
          cookieString += "; secure"
        }
        
        if (settings.sameSite) {
          cookieString += `; samesite=${settings.sameSite}`
        }
        
        return cookieString
      }

      it('should build a basic cookie string with defaults', () => {
        const result = buildCookieString("username", "Alice")
        
        expect(result).toContain("username=Alice")
        expect(result).toContain("path=/")
        expect(result).toContain("secure")
        expect(result).toContain("samesite=lax")
      })

      it('should include max-age when specified', () => {
        const result = buildCookieString("token", "abc", { maxAge: 86400 })
        
        expect(result).toContain("max-age=86400")
      })

      it('should include expires date when specified', () => {
        const expDate = new Date("2025-12-31T00:00:00Z")
        const result = buildCookieString("token", "abc", { expires: expDate })
        
        expect(result).toContain("expires=")
        expect(result).toContain("Wed, 31 Dec 2025")
      })

      it('should prefer max-age over expires when both provided', () => {
        const expDate = new Date("2025-12-31T00:00:00Z")
        const result = buildCookieString("token", "abc", { 
          maxAge: 86400, 
          expires: expDate 
        })
        
        expect(result).toContain("max-age=86400")
        expect(result).not.toContain("expires=")
      })

      it('should include domain when specified', () => {
        const result = buildCookieString("token", "abc", { domain: "example.com" })
        
        expect(result).toContain("domain=example.com")
      })

      it('should allow overriding path', () => {
        const result = buildCookieString("token", "abc", { path: "/app" })
        
        expect(result).toContain("path=/app")
        expect(result).not.toContain("path=/;")
      })

      it('should omit secure flag when set to false', () => {
        const result = buildCookieString("token", "abc", { secure: false })
        
        expect(result).not.toContain("secure")
      })

      it('should encode special characters in name and value', () => {
        const result = buildCookieString("user name", "Hello, World!")
        
        expect(result).toContain("user%20name=Hello%2C%20World!")
      })

      it('should handle sameSite=strict', () => {
        const result = buildCookieString("token", "abc", { sameSite: "strict" })
        
        expect(result).toContain("samesite=strict")
      })

      it('should handle sameSite=none', () => {
        const result = buildCookieString("token", "abc", { sameSite: "none" })
        
        expect(result).toContain("samesite=none")
      })

      it('should handle deletion (max-age=0)', () => {
        const result = buildCookieString("token", "", { maxAge: 0 })
        
        expect(result).toContain("max-age=0")
      })
    })
  })

  // ============================================================
  // DATE FORMATTING FOR EXPIRES
  // From cookies.mdx lines 282-301
  // ============================================================

  describe('Expiration Date Handling', () => {
    // From lines 282-301: expires date formatting
    it('should format date correctly for cookies', () => {
      const date = new Date("2025-01-15T12:00:00Z")
      const formatted = date.toUTCString()
      
      expect(formatted).toBe("Wed, 15 Jan 2025 12:00:00 GMT")
    })

    it('should calculate date 7 days from now', () => {
      const now = new Date("2025-01-01T00:00:00Z")
      const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
      
      expect(sevenDaysLater.toISOString()).toBe("2025-01-08T00:00:00.000Z")
    })

    it('should handle past dates for deletion', () => {
      const pastDate = new Date("1970-01-01T00:00:00Z")
      const formatted = pastDate.toUTCString()
      
      expect(formatted).toBe("Thu, 01 Jan 1970 00:00:00 GMT")
    })

    it('should calculate max-age in seconds', () => {
      const oneHour = 60 * 60        // 3600 seconds
      const oneDay = 24 * 60 * 60    // 86400 seconds
      const oneWeek = 7 * 24 * 60 * 60  // 604800 seconds
      const oneYear = 365 * 24 * 60 * 60  // 31536000 seconds
      
      expect(oneHour).toBe(3600)
      expect(oneDay).toBe(86400)
      expect(oneWeek).toBe(604800)
      expect(oneYear).toBe(31536000)
    })
  })

  // ============================================================
  // PATH MATCHING LOGIC
  // From cookies.mdx lines 315-340
  // ============================================================

  describe('Path Matching', () => {
    // From lines 315-340: Path attribute behavior
    function pathMatches(cookiePath, requestPath) {
      // Normalize paths
      if (!cookiePath.endsWith('/')) {
        cookiePath = cookiePath + '/'
      }
      if (!requestPath.endsWith('/')) {
        requestPath = requestPath + '/'
      }
      
      return requestPath.startsWith(cookiePath)
    }

    it('should match exact path', () => {
      expect(pathMatches("/app", "/app")).toBe(true)
      expect(pathMatches("/app", "/app/")).toBe(true)
    })

    it('should match subpaths', () => {
      expect(pathMatches("/app", "/app/dashboard")).toBe(true)
      expect(pathMatches("/app", "/app/settings")).toBe(true)
      expect(pathMatches("/app", "/app/users/123")).toBe(true)
    })

    it('should not match different paths', () => {
      expect(pathMatches("/app", "/about")).toBe(false)
      expect(pathMatches("/app", "/")).toBe(false)
    })

    it('should not match partial path names', () => {
      // /application is NOT a subpath of /app
      expect(pathMatches("/app", "/application")).toBe(false)
    })

    it('should match root path to all paths', () => {
      expect(pathMatches("/", "/")).toBe(true)
      expect(pathMatches("/", "/app")).toBe(true)
      expect(pathMatches("/", "/app/dashboard")).toBe(true)
    })
  })

  // ============================================================
  // JSON STORAGE IN COOKIES
  // From cookies.mdx lines 189-191
  // ============================================================

  describe('JSON Storage in Cookies', () => {
    // From lines 189-191: Storing objects as JSON
    it('should stringify objects for cookie storage', () => {
      const preferences = { theme: "dark", fontSize: 14 }
      const encoded = encodeURIComponent(JSON.stringify(preferences))
      
      expect(typeof encoded).toBe("string")
      expect(encoded).not.toContain("{")  // Should be encoded
    })

    it('should parse JSON from cookie value', () => {
      const encoded = "%7B%22theme%22%3A%22dark%22%2C%22fontSize%22%3A14%7D"
      const decoded = decodeURIComponent(encoded)
      const parsed = JSON.parse(decoded)
      
      expect(parsed).toEqual({ theme: "dark", fontSize: 14 })
    })

    it('should handle arrays in JSON', () => {
      const items = [1, 2, 3]
      const encoded = encodeURIComponent(JSON.stringify(items))
      const decoded = JSON.parse(decodeURIComponent(encoded))
      
      expect(decoded).toEqual([1, 2, 3])
    })

    it('should handle nested objects', () => {
      const data = {
        user: { name: "Alice", age: 30 },
        settings: { darkMode: true }
      }
      const encoded = encodeURIComponent(JSON.stringify(data))
      const decoded = JSON.parse(decodeURIComponent(encoded))
      
      expect(decoded).toEqual(data)
    })
  })

  // ============================================================
  // COOKIE SIZE LIMITS
  // From cookies.mdx lines 553-558
  // ============================================================

  describe('Cookie Size Considerations', () => {
    // From lines 553-558: 4KB limit
    it('should demonstrate 4KB is approximately 4096 bytes', () => {
      const fourKB = 4 * 1024
      
      expect(fourKB).toBe(4096)
    })

    it('should calculate string byte size', () => {
      // Note: This is simplified - actual byte count varies with encoding
      const str = "a".repeat(4096)
      
      expect(str.length).toBe(4096)
    })

    it('should show encoding increases size', () => {
      const original = "Hello, World!"
      const encoded = encodeURIComponent(original)
      
      expect(encoded.length).toBeGreaterThan(original.length)
    })
  })

  // ============================================================
  // COMMON MISTAKES TESTS
  // From cookies.mdx lines 502-560
  // ============================================================

  describe('Common Mistakes', () => {
    // From lines 505-511: Forgetting to encode values
    describe('Encoding mistakes', () => {
      it('should demonstrate that spaces need encoding', () => {
        const value = "search term with spaces"
        const encoded = encodeURIComponent(value)
        
        expect(encoded).not.toContain(" ")
        expect(encoded).toBe("search%20term%20with%20spaces")
      })

      it('should demonstrate that semicolons need encoding', () => {
        const value = "key=value; other=test"
        const encoded = encodeURIComponent(value)
        
        expect(encoded).not.toContain(";")
      })
    })

    // From lines 513-523: Wrong path when deleting
    describe('Path matching for deletion', () => {
      it('should require matching path to delete', () => {
        // This tests the concept - actual deletion requires document.cookie
        const originalPath = "/app"
        const deletePath = "/"
        
        expect(originalPath).not.toBe(deletePath)
        // In practice, these would need to match for deletion to work
      })
    })
  })

  // ============================================================
  // TEST YOUR KNOWLEDGE - VERIFICATION TESTS
  // From cookies.mdx lines 601-680
  // ============================================================

  describe('Test Your Knowledge Verification', () => {
    // Question 1: Session vs persistent cookies
    describe('Session vs Persistent Cookies', () => {
      it('should understand session cookies have no expiration', () => {
        const sessionCookie = "tempId=abc"
        const persistentCookie = "remember=true; max-age=604800"
        
        expect(sessionCookie).not.toContain("max-age")
        expect(sessionCookie).not.toContain("expires")
        expect(persistentCookie).toContain("max-age")
      })
    })

    // Question 4: Deleting cookies
    describe('Cookie Deletion', () => {
      it('should understand max-age=0 deletes cookies', () => {
        const deleteCookieString = "username=; max-age=0; path=/"
        
        expect(deleteCookieString).toContain("max-age=0")
      })

      it('should understand past date deletes cookies', () => {
        const deleteCookieString = "username=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
        
        expect(deleteCookieString).toContain("1970")
      })
    })
  })

  // ============================================================
  // EDGE CASES
  // ============================================================

  describe('Edge Cases', () => {
    it('should handle cookie names with numbers', () => {
      const cookieString = "user123=value"
      
      function getCookie(cookieString, name) {
        const cookies = cookieString.split("; ")
        for (const cookie of cookies) {
          const [cookieName, cookieValue] = cookie.split("=")
          if (cookieName === name) {
            return decodeURIComponent(cookieValue)
          }
        }
        return null
      }
      
      expect(getCookie(cookieString, "user123")).toBe("value")
    })

    it('should handle empty cookie values', () => {
      const cookieString = "empty=; other=value"
      
      function parseCookies(cookieString) {
        return cookieString
          .split("; ")
          .filter(Boolean)
          .reduce((cookies, cookie) => {
            const [name, ...valueParts] = cookie.split("=")
            const value = valueParts.join("=")
            cookies[name] = decodeURIComponent(value)
            return cookies
          }, {})
      }
      
      const cookies = parseCookies(cookieString)
      expect(cookies.empty).toBe("")
      expect(cookies.other).toBe("value")
    })

    it('should handle very long cookie values', () => {
      const longValue = "a".repeat(3000)
      const encoded = encodeURIComponent(longValue)
      
      expect(encoded.length).toBe(3000)  // ASCII doesn't expand
    })

    it('should handle special characters in cookie names', () => {
      // Cookie names should be alphanumeric + some special chars
      const validName = "my_cookie-name"
      const encoded = encodeURIComponent(validName)
      
      // Underscores and hyphens don't need encoding
      expect(encoded).toBe(validName)
    })
  })
})
