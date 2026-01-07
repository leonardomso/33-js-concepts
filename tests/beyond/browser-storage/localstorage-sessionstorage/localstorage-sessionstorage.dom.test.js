/**
 * DOM-specific tests for localStorage & sessionStorage concept page
 * Focuses on StorageEvent and cross-tab communication concepts
 * 
 * @see /docs/beyond/concepts/localstorage-sessionstorage.mdx
 * 
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

describe('StorageEvent and DOM Interactions', () => {
  beforeEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
    sessionStorage.clear()
  })

  describe('StorageEvent Interface', () => {
    // Tests for MDX lines ~400-430 (StorageEvent properties)
    it('should create StorageEvent with correct properties', () => {
      const event = new StorageEvent('storage', {
        key: 'theme',
        oldValue: 'light',
        newValue: 'dark',
        url: 'http://example.com',
        storageArea: localStorage
      })
      
      expect(event.key).toBe('theme')
      expect(event.oldValue).toBe('light')
      expect(event.newValue).toBe('dark')
      expect(event.url).toBe('http://example.com')
      expect(event.storageArea).toBe(localStorage)
    })

    it('should have null key when clear() is called', () => {
      const event = new StorageEvent('storage', {
        key: null,
        oldValue: null,
        newValue: null,
        storageArea: localStorage
      })
      
      expect(event.key).toBeNull()
    })

    it('should have null oldValue for new keys', () => {
      const event = new StorageEvent('storage', {
        key: 'newKey',
        oldValue: null,
        newValue: 'value',
        storageArea: localStorage
      })
      
      expect(event.oldValue).toBeNull()
      expect(event.newValue).toBe('value')
    })

    it('should have null newValue when key is removed', () => {
      const event = new StorageEvent('storage', {
        key: 'removedKey',
        oldValue: 'previousValue',
        newValue: null,
        storageArea: localStorage
      })
      
      expect(event.oldValue).toBe('previousValue')
      expect(event.newValue).toBeNull()
    })
  })

  describe('Storage Event Listener Pattern', () => {
    // Tests for MDX lines ~410-425 (event listener pattern)
    it('should be able to add storage event listener', () => {
      const handler = vi.fn()
      
      window.addEventListener('storage', handler)
      
      // Manually dispatch a storage event (simulating cross-tab change)
      const event = new StorageEvent('storage', {
        key: 'test',
        oldValue: null,
        newValue: 'value',
        url: 'http://localhost',
        storageArea: localStorage
      })
      
      window.dispatchEvent(event)
      
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0].key).toBe('test')
      
      window.removeEventListener('storage', handler)
    })

    it('should receive all StorageEvent properties in handler', () => {
      const receivedEvent = { key: null, oldValue: null, newValue: null, url: null }
      
      const handler = (event) => {
        receivedEvent.key = event.key
        receivedEvent.oldValue = event.oldValue
        receivedEvent.newValue = event.newValue
        receivedEvent.url = event.url
      }
      
      window.addEventListener('storage', handler)
      
      const event = new StorageEvent('storage', {
        key: 'theme',
        oldValue: 'light',
        newValue: 'dark',
        url: 'http://example.com/page',
        storageArea: localStorage
      })
      
      window.dispatchEvent(event)
      
      expect(receivedEvent.key).toBe('theme')
      expect(receivedEvent.oldValue).toBe('light')
      expect(receivedEvent.newValue).toBe('dark')
      expect(receivedEvent.url).toBe('http://example.com/page')
      
      window.removeEventListener('storage', handler)
    })

    it('should support addEventListener for storage events', () => {
      // Note: window.onstorage property may not work in jsdom
      // but addEventListener always works
      const handler = vi.fn()
      
      window.addEventListener('storage', handler)
      
      const event = new StorageEvent('storage', {
        key: 'data',
        newValue: 'updated'
      })
      
      window.dispatchEvent(event)
      
      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0].key).toBe('data')
      
      window.removeEventListener('storage', handler)
    })
  })

  describe('Auth Sync Pattern', () => {
    // Tests for MDX lines ~445-470 (auth sync pattern)
    it('should detect logout from another tab', () => {
      let redirectCalled = false
      let redirectUrl = ''
      
      // Mock the redirect
      const mockRedirect = (url) => {
        redirectCalled = true
        redirectUrl = url
      }
      
      const setupAuthSync = () => {
        window.addEventListener('storage', (event) => {
          if (event.key === 'authToken' && event.newValue === null) {
            mockRedirect('/login')
          }
        })
      }
      
      setupAuthSync()
      
      // Simulate logout from another tab
      const logoutEvent = new StorageEvent('storage', {
        key: 'authToken',
        oldValue: 'some-token',
        newValue: null,  // Token removed = logged out
        storageArea: localStorage
      })
      
      window.dispatchEvent(logoutEvent)
      
      expect(redirectCalled).toBe(true)
      expect(redirectUrl).toBe('/login')
    })

    it('should detect login from another tab', () => {
      let reloadCalled = false
      
      const handler = (event) => {
        if (event.key === 'authToken' && event.oldValue === null && event.newValue) {
          reloadCalled = true
        }
      }
      
      window.addEventListener('storage', handler)
      
      // Simulate login from another tab
      const loginEvent = new StorageEvent('storage', {
        key: 'authToken',
        oldValue: null,  // No previous token
        newValue: 'new-token',  // Now logged in
        storageArea: localStorage
      })
      
      window.dispatchEvent(loginEvent)
      
      expect(reloadCalled).toBe(true)
      
      window.removeEventListener('storage', handler)
    })

    it('should ignore non-auth storage changes', () => {
      let authActionTaken = false
      
      const handler = (event) => {
        if (event.key === 'authToken') {
          authActionTaken = true
        }
      }
      
      window.addEventListener('storage', handler)
      
      // Non-auth change
      const otherEvent = new StorageEvent('storage', {
        key: 'theme',
        oldValue: 'light',
        newValue: 'dark',
        storageArea: localStorage
      })
      
      window.dispatchEvent(otherEvent)
      
      expect(authActionTaken).toBe(false)
      
      window.removeEventListener('storage', handler)
    })
  })

  describe('Storage Event Filtering', () => {
    it('should filter events by key', () => {
      const themeChanges = []
      
      const handler = (event) => {
        if (event.key === 'theme') {
          themeChanges.push(event.newValue)
        }
      }
      
      window.addEventListener('storage', handler)
      
      // Theme change
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'theme',
        newValue: 'dark'
      }))
      
      // Other change (should be ignored)
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'language',
        newValue: 'en'
      }))
      
      // Another theme change
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'theme',
        newValue: 'light'
      }))
      
      expect(themeChanges).toEqual(['dark', 'light'])
      
      window.removeEventListener('storage', handler)
    })

    it('should detect clear() operation by null key', () => {
      let clearDetected = false
      
      const handler = (event) => {
        if (event.key === null) {
          clearDetected = true
        }
      }
      
      window.addEventListener('storage', handler)
      
      // Simulate clear() from another tab
      window.dispatchEvent(new StorageEvent('storage', {
        key: null,
        oldValue: null,
        newValue: null,
        storageArea: localStorage
      }))
      
      expect(clearDetected).toBe(true)
      
      window.removeEventListener('storage', handler)
    })
  })

  describe('Feature Detection Pattern', () => {
    // Tests for MDX lines ~520-545 (full feature detection)
    it('should correctly detect localStorage availability', () => {
      function storageAvailable(type) {
        try {
          const storage = window[type]
          const testKey = "__storage_test__"
          storage.setItem(testKey, testKey)
          storage.removeItem(testKey)
          return true
        } catch (error) {
          return (
            error instanceof DOMException &&
            error.name === "QuotaExceededError" &&
            storage && storage.length !== 0
          )
        }
      }
      
      // In jsdom environment, localStorage should be available
      expect(storageAvailable("localStorage")).toBe(true)
      expect(storageAvailable("sessionStorage")).toBe(true)
    })

    it('should handle non-existent storage types', () => {
      function storageAvailable(type) {
        try {
          const storage = window[type]
          if (!storage) return false
          const testKey = "__storage_test__"
          storage.setItem(testKey, testKey)
          storage.removeItem(testKey)
          return true
        } catch (error) {
          return false
        }
      }
      
      expect(storageAvailable("fakeStorage")).toBe(false)
    })
  })

  describe('Cross-Tab Data Synchronization Patterns', () => {
    it('should demonstrate cart sync pattern', () => {
      const carts = { tab1: [], tab2: [] }
      
      // Tab 1 handler
      const tab1Handler = (event) => {
        if (event.key === 'cart') {
          carts.tab1 = JSON.parse(event.newValue || '[]')
        }
      }
      
      // Tab 2 handler
      const tab2Handler = (event) => {
        if (event.key === 'cart') {
          carts.tab2 = JSON.parse(event.newValue || '[]')
        }
      }
      
      window.addEventListener('storage', tab1Handler)
      window.addEventListener('storage', tab2Handler)
      
      // Simulate cart update from another context
      const cartData = [
        { id: 1, name: "Product A", qty: 2 },
        { id: 2, name: "Product B", qty: 1 }
      ]
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'cart',
        oldValue: '[]',
        newValue: JSON.stringify(cartData),
        storageArea: localStorage
      }))
      
      expect(carts.tab1).toEqual(cartData)
      expect(carts.tab2).toEqual(cartData)
      
      window.removeEventListener('storage', tab1Handler)
      window.removeEventListener('storage', tab2Handler)
    })

    it('should handle settings sync across tabs', () => {
      const settings = {}
      
      const handler = (event) => {
        if (event.key && event.key.startsWith('setting_')) {
          const settingName = event.key.replace('setting_', '')
          settings[settingName] = event.newValue
        }
      }
      
      window.addEventListener('storage', handler)
      
      // Multiple settings changes
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'setting_theme',
        newValue: 'dark'
      }))
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'setting_fontSize',
        newValue: '16px'
      }))
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'setting_language',
        newValue: 'en'
      }))
      
      expect(settings).toEqual({
        theme: 'dark',
        fontSize: '16px',
        language: 'en'
      })
      
      window.removeEventListener('storage', handler)
    })
  })

  describe('StorageEvent with sessionStorage', () => {
    it('should work with sessionStorage area', () => {
      let eventReceived = null
      
      const handler = (event) => {
        if (event.storageArea === sessionStorage) {
          eventReceived = event
        }
      }
      
      window.addEventListener('storage', handler)
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'sessionKey',
        newValue: 'sessionValue',
        storageArea: sessionStorage
      }))
      
      expect(eventReceived).not.toBeNull()
      expect(eventReceived.key).toBe('sessionKey')
      expect(eventReceived.storageArea).toBe(sessionStorage)
      
      window.removeEventListener('storage', handler)
    })

    it('should distinguish between localStorage and sessionStorage events', () => {
      const localEvents = []
      const sessionEvents = []
      
      const handler = (event) => {
        if (event.storageArea === localStorage) {
          localEvents.push(event.key)
        } else if (event.storageArea === sessionStorage) {
          sessionEvents.push(event.key)
        }
      }
      
      window.addEventListener('storage', handler)
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'localKey',
        storageArea: localStorage
      }))
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'sessionKey',
        storageArea: sessionStorage
      }))
      
      expect(localEvents).toEqual(['localKey'])
      expect(sessionEvents).toEqual(['sessionKey'])
      
      window.removeEventListener('storage', handler)
    })
  })

  describe('Error Handling in Storage Events', () => {
    it('should handle JSON parse errors in event handlers gracefully', () => {
      let errorOccurred = false
      let parsedData = null
      
      const handler = (event) => {
        try {
          parsedData = JSON.parse(event.newValue)
        } catch (e) {
          errorOccurred = true
          parsedData = null
        }
      }
      
      window.addEventListener('storage', handler)
      
      // Invalid JSON in storage
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'data',
        newValue: 'not valid json {'
      }))
      
      expect(errorOccurred).toBe(true)
      expect(parsedData).toBeNull()
      
      window.removeEventListener('storage', handler)
    })

    it('should handle null newValue (key removal)', () => {
      let removed = false
      
      const handler = (event) => {
        if (event.newValue === null) {
          removed = true
        }
      }
      
      window.addEventListener('storage', handler)
      
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'deletedKey',
        oldValue: 'previousValue',
        newValue: null
      }))
      
      expect(removed).toBe(true)
      
      window.removeEventListener('storage', handler)
    })
  })
})
