import { describe, it, expect, vi } from 'vitest'

/**
 * Tests for Custom Events concept page
 * Source: /docs/beyond/concepts/custom-events.mdx
 */

describe('Custom Events', () => {
  describe('Creating Custom Events', () => {
    // MDX lines ~70-90: The CustomEvent Constructor
    it('should create a simple custom event with just a name', () => {
      const event = new CustomEvent('hello')
      
      expect(event.type).toBe('hello')
      expect(event.detail).toBe(null)
      expect(event.bubbles).toBe(false)
      expect(event.cancelable).toBe(false)
    })

    it('should create a custom event with detail data', () => {
      const event = new CustomEvent('userAction', {
        detail: { action: 'click', target: 'button' }
      })
      
      expect(event.type).toBe('userAction')
      expect(event.detail.action).toBe('click')
      expect(event.detail.target).toBe('button')
    })

    it('should create a custom event with all options', () => {
      const event = new CustomEvent('formSubmit', {
        detail: { formId: 'login', data: { user: 'alice' } },
        bubbles: true,
        cancelable: true
      })
      
      expect(event.type).toBe('formSubmit')
      expect(event.detail.formId).toBe('login')
      expect(event.detail.data.user).toBe('alice')
      expect(event.bubbles).toBe(true)
      expect(event.cancelable).toBe(true)
    })

    // MDX lines ~95-105: Event Options Explained
    it('should have correct default options', () => {
      const event = new CustomEvent('test')
      
      expect(event.detail).toBe(null)
      expect(event.bubbles).toBe(false)
      expect(event.cancelable).toBe(false)
      expect(event.composed).toBe(false)
    })
  })

  describe('Passing Data with detail', () => {
    // MDX lines ~115-140: detail property examples
    it('should accept primitive values in detail', () => {
      const numberEvent = new CustomEvent('count', { detail: 42 })
      const stringEvent = new CustomEvent('message', { detail: 'Hello!' })
      
      expect(numberEvent.detail).toBe(42)
      expect(stringEvent.detail).toBe('Hello!')
    })

    it('should accept objects in detail', () => {
      const timestamp = Date.now()
      const event = new CustomEvent('userLoggedIn', {
        detail: {
          userId: 123,
          username: 'alice',
          timestamp
        }
      })
      
      expect(event.detail.userId).toBe(123)
      expect(event.detail.username).toBe('alice')
      expect(event.detail.timestamp).toBe(timestamp)
    })

    it('should accept arrays in detail', () => {
      const event = new CustomEvent('itemsSelected', {
        detail: ['item1', 'item2', 'item3']
      })
      
      expect(event.detail).toEqual(['item1', 'item2', 'item3'])
      expect(event.detail.length).toBe(3)
    })

    it('should accept functions in detail', () => {
      const getText = () => 'Hello World'
      const event = new CustomEvent('callback', {
        detail: { getText }
      })
      
      expect(typeof event.detail.getText).toBe('function')
      expect(event.detail.getText()).toBe('Hello World')
    })

    // MDX lines ~145-160: Accessing detail in listeners
    it('should provide read-only detail property (reference)', () => {
      const originalDetail = { username: 'alice', userId: 123 }
      const event = new CustomEvent('test', { detail: originalDetail })
      
      // detail property itself is read-only (can't reassign)
      // but the object reference is the same, so mutations affect it
      expect(event.detail.username).toBe('alice')
      
      // Mutating the object works (though not recommended)
      event.detail.username = 'bob'
      expect(event.detail.username).toBe('bob')
    })
  })

  describe('Custom Events vs Native Events', () => {
    // MDX lines ~295-310: The isTrusted Property
    it('should have isTrusted set to false for custom events', () => {
      const event = new CustomEvent('customClick')
      
      expect(event.isTrusted).toBe(false)
    })

    it('should inherit from Event', () => {
      const event = new CustomEvent('test', { detail: { value: 1 } })
      
      expect(event instanceof Event).toBe(true)
      expect(event instanceof CustomEvent).toBe(true)
    })
  })

  describe('Test Your Knowledge Examples', () => {
    // MDX Question 1
    it('Question 1: should show detail.value and isTrusted', () => {
      const event = new CustomEvent('test', {
        detail: { value: 42 }
      })
      
      expect(event.detail.value).toBe(42)
      expect(event.isTrusted).toBe(false)
    })
  })
})
