/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * DOM-specific tests for Custom Events concept page
 * Source: /docs/beyond/concepts/custom-events.mdx
 * 
 * These tests require jsdom for DOM element interactions
 */

describe('Custom Events (DOM)', () => {
  let element
  let parent
  let child

  beforeEach(() => {
    // Create fresh DOM elements for each test
    element = document.createElement('div')
    element.id = 'testElement'
    document.body.appendChild(element)

    parent = document.createElement('div')
    parent.id = 'parent'
    child = document.createElement('button')
    child.id = 'child'
    parent.appendChild(child)
    document.body.appendChild(parent)
  })

  afterEach(() => {
    // Clean up DOM
    document.body.innerHTML = ''
  })

  describe('Dispatching Events', () => {
    // MDX lines ~170-185: The dispatchEvent() Method
    it('should dispatch custom events on elements', () => {
      const handler = vi.fn()
      element.addEventListener('customClick', handler)

      const event = new CustomEvent('customClick', {
        detail: { clickCount: 5 }
      })
      element.dispatchEvent(event)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0].detail.clickCount).toBe(5)
    })

    // MDX lines ~190-210: Dispatching on Different Targets
    it('should dispatch events on document', () => {
      const handler = vi.fn()
      document.addEventListener('globalEvent', handler)

      document.dispatchEvent(new CustomEvent('globalEvent', {
        detail: { message: 'hello' }
      }))

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0].detail.message).toBe('hello')

      // Cleanup
      document.removeEventListener('globalEvent', handler)
    })

    it('should dispatch events on window', () => {
      const handler = vi.fn()
      window.addEventListener('windowEvent', handler)

      window.dispatchEvent(new CustomEvent('windowEvent', {
        detail: { source: 'window' }
      }))

      expect(handler).toHaveBeenCalledTimes(1)

      // Cleanup
      window.removeEventListener('windowEvent', handler)
    })

    // MDX lines ~235-255: Important: dispatchEvent is Synchronous
    it('should execute event handlers synchronously', () => {
      const order = []

      order.push('1: Before dispatch')

      element.addEventListener('myEvent', () => {
        order.push('2: Inside listener')
      })

      element.dispatchEvent(new CustomEvent('myEvent'))

      order.push('3: After dispatch')

      expect(order).toEqual([
        '1: Before dispatch',
        '2: Inside listener',
        '3: After dispatch'
      ])
    })
  })

  describe('Listening for Custom Events', () => {
    // MDX lines ~265-285: Use addEventListener
    it('should receive events via addEventListener', () => {
      const handler = vi.fn()
      element.addEventListener('myCustomEvent', handler)

      const event = new CustomEvent('myCustomEvent', {
        detail: { value: 'test' }
      })
      element.dispatchEvent(event)

      expect(handler).toHaveBeenCalledTimes(1)
      expect(handler.mock.calls[0][0].detail.value).toBe('test')
    })

    it('should support multiple listeners for the same event', () => {
      const handler1 = vi.fn()
      const handler2 = vi.fn()

      element.addEventListener('myCustomEvent', handler1)
      element.addEventListener('myCustomEvent', handler2)

      element.dispatchEvent(new CustomEvent('myCustomEvent'))

      expect(handler1).toHaveBeenCalledTimes(1)
      expect(handler2).toHaveBeenCalledTimes(1)
    })

    it('should allow removing listeners', () => {
      const handler = vi.fn()

      element.addEventListener('myCustomEvent', handler)
      element.dispatchEvent(new CustomEvent('myCustomEvent'))
      expect(handler).toHaveBeenCalledTimes(1)

      element.removeEventListener('myCustomEvent', handler)
      element.dispatchEvent(new CustomEvent('myCustomEvent'))
      expect(handler).toHaveBeenCalledTimes(1) // Still 1, not called again
    })

    // MDX lines ~290-300: Don't use on* properties
    it('should NOT work with on* properties for custom events', () => {
      const handler = vi.fn()

      // This doesn't work - custom events don't have on* properties
      element.onmyCustomEvent = handler

      element.dispatchEvent(new CustomEvent('myCustomEvent'))

      // Handler was never called because onmyCustomEvent isn't a real property
      expect(handler).not.toHaveBeenCalled()
    })
  })

  describe('Event Bubbling with Custom Events', () => {
    // MDX lines ~305-340: Bubbling Example
    it('should NOT bubble by default', () => {
      const parentHandler = vi.fn()
      parent.addEventListener('customClick', parentHandler)

      // Dispatch WITHOUT bubbles
      child.dispatchEvent(new CustomEvent('customClick', {
        detail: { message: 'no bubbles' }
      }))

      // Parent should NOT hear it
      expect(parentHandler).not.toHaveBeenCalled()
    })

    it('should bubble when bubbles: true', () => {
      const parentHandler = vi.fn()
      parent.addEventListener('customClick', parentHandler)

      // Dispatch WITH bubbles
      child.dispatchEvent(new CustomEvent('customClick', {
        detail: { message: 'with bubbles' },
        bubbles: true
      }))

      // Parent SHOULD hear it
      expect(parentHandler).toHaveBeenCalledTimes(1)
      expect(parentHandler.mock.calls[0][0].detail.message).toBe('with bubbles')
    })

    it('should set correct target and currentTarget during bubbling', () => {
      let capturedTarget = null
      let capturedCurrentTarget = null

      parent.addEventListener('test', (e) => {
        capturedTarget = e.target
        capturedCurrentTarget = e.currentTarget
      })

      child.dispatchEvent(new CustomEvent('test', { bubbles: true }))

      expect(capturedTarget).toBe(child) // Original dispatcher
      expect(capturedCurrentTarget).toBe(parent) // Element handling the event
    })

    // MDX Question 2: Will the parent hear this event?
    it('Question 2: parent should NOT hear non-bubbling event', () => {
      const parentHandler = vi.fn()
      parent.addEventListener('notify', parentHandler)

      child.dispatchEvent(new CustomEvent('notify', {
        detail: { message: 'hello' }
      }))

      expect(parentHandler).not.toHaveBeenCalled()
    })
  })

  describe('Canceling Custom Events', () => {
    // MDX lines ~350-390: Canceling Custom Events
    it('should return true when event is not canceled', () => {
      element.addEventListener('action', () => {
        // Don't call preventDefault
      })

      const event = new CustomEvent('action', { cancelable: true })
      const result = element.dispatchEvent(event)

      expect(result).toBe(true)
    })

    it('should return false when preventDefault is called', () => {
      element.addEventListener('action', (e) => {
        e.preventDefault()
      })

      const event = new CustomEvent('action', { cancelable: true })
      const result = element.dispatchEvent(event)

      expect(result).toBe(false)
    })

    it('should ignore preventDefault when cancelable is false', () => {
      element.addEventListener('action', (e) => {
        e.preventDefault()
      })

      // Without cancelable: true
      const event = new CustomEvent('action')
      const result = element.dispatchEvent(event)

      // Returns true even though preventDefault was called
      expect(result).toBe(true)
    })

    // MDX Question 3: What does dispatchEvent return here?
    it('Question 3: dispatchEvent returns false when canceled', () => {
      const event = new CustomEvent('action', { cancelable: true })

      element.addEventListener('action', (e) => {
        e.preventDefault()
      })

      const result = element.dispatchEvent(event)
      expect(result).toBe(false)
    })

    it('should allow checking defaultPrevented property', () => {
      element.addEventListener('test', (e) => {
        e.preventDefault()
      })

      const event = new CustomEvent('test', { cancelable: true })
      element.dispatchEvent(event)

      expect(event.defaultPrevented).toBe(true)
    })
  })

  describe('Component Communication Pattern', () => {
    // MDX lines ~400-450: Shopping Cart Example
    it('should enable decoupled component communication', () => {
      // Simulate ShoppingCart class
      const cartElement = document.createElement('div')
      cartElement.id = 'shopping-cart'
      document.body.appendChild(cartElement)

      const items = []
      
      function addItem(item) {
        items.push(item)
        cartElement.dispatchEvent(new CustomEvent('cart:itemAdded', {
          detail: { item, totalItems: items.length },
          bubbles: true
        }))
      }

      // Simulate CartBadge listener
      const badgeUpdates = []
      document.addEventListener('cart:itemAdded', (e) => {
        badgeUpdates.push(e.detail.totalItems)
      })

      // Add items
      addItem({ id: 1, name: 'Apple' })
      addItem({ id: 2, name: 'Banana' })

      expect(badgeUpdates).toEqual([1, 2])
    })
  })

  describe('Common Mistakes', () => {
    // MDX Common Mistakes section
    it('Mistake 1: forgetting bubbles: true', () => {
      const parentHandler = vi.fn()
      parent.addEventListener('notify', parentHandler)

      // Without bubbles - parent won't hear it
      child.dispatchEvent(new CustomEvent('notify', {
        detail: { message: 'hello' }
      }))

      expect(parentHandler).not.toHaveBeenCalled()

      // With bubbles - parent will hear it
      child.dispatchEvent(new CustomEvent('notify', {
        detail: { message: 'hello' },
        bubbles: true
      }))

      expect(parentHandler).toHaveBeenCalledTimes(1)
    })

    // MDX Question 4: Why doesn't this work?
    it('Question 4: on* properties do not work for custom events', () => {
      const handler = vi.fn()

      // This doesn't work
      element.oncustomEvent = handler
      element.dispatchEvent(new CustomEvent('customEvent'))

      expect(handler).not.toHaveBeenCalled()

      // This works
      element.addEventListener('customEvent', handler)
      element.dispatchEvent(new CustomEvent('customEvent'))

      expect(handler).toHaveBeenCalledTimes(1)
    })

    it('Mistake 3: dispatching on wrong element', () => {
      const sidebar = document.createElement('div')
      sidebar.id = 'sidebar'
      const header = document.createElement('div')
      header.id = 'header'
      document.body.appendChild(sidebar)
      document.body.appendChild(header)

      const sidebarHandler = vi.fn()
      sidebar.addEventListener('update', sidebarHandler)

      // Dispatching on header - sidebar won't hear it
      header.dispatchEvent(new CustomEvent('update'))

      expect(sidebarHandler).not.toHaveBeenCalled()

      // Dispatch on document for global events
      const globalHandler = vi.fn()
      document.addEventListener('update', globalHandler)
      document.dispatchEvent(new CustomEvent('update'))

      expect(globalHandler).toHaveBeenCalledTimes(1)

      // Cleanup
      document.removeEventListener('update', globalHandler)
    })

    it('Mistake 4: forgetting cancelable: true', () => {
      element.addEventListener('submit', e => e.preventDefault())

      // Without cancelable - returns true even with preventDefault
      const eventWithoutCancelable = new CustomEvent('submit')
      const result1 = element.dispatchEvent(eventWithoutCancelable)
      expect(result1).toBe(true)

      // With cancelable - returns false when preventDefault is called
      const eventWithCancelable = new CustomEvent('submit', { cancelable: true })
      const result2 = element.dispatchEvent(eventWithCancelable)
      expect(result2).toBe(false)
    })

    // MDX Question 5: synchronous execution
    it('Question 5: dispatchEvent is synchronous', () => {
      let value = 'before'

      element.addEventListener('sync', () => {
        value = 'inside'
      })

      element.dispatchEvent(new CustomEvent('sync'))

      // Value is 'inside' immediately - not 'before'!
      expect(value).toBe('inside')
    })
  })

  describe('Opening Example', () => {
    // MDX lines ~10-20: Opening code example
    it('should demonstrate userLoggedIn custom event', () => {
      const messages = []

      // Listen for the event
      document.addEventListener('userLoggedIn', (e) => {
        messages.push(`Welcome, ${e.detail.username}!`)
      })

      // Create and dispatch the event
      const event = new CustomEvent('userLoggedIn', {
        detail: { username: 'alice', timestamp: Date.now() }
      })
      document.dispatchEvent(event)

      expect(messages).toEqual(['Welcome, alice!'])

      // Cleanup
      document.removeEventListener('userLoggedIn', () => {})
    })
  })

  describe('Real-world Patterns', () => {
    it('should support namespaced event names', () => {
      const events = []

      document.addEventListener('cart:updated', (e) => events.push('cart:updated'))
      document.addEventListener('modal:opened', (e) => events.push('modal:opened'))
      document.addEventListener('user:loggedIn', (e) => events.push('user:loggedIn'))

      document.dispatchEvent(new CustomEvent('cart:updated'))
      document.dispatchEvent(new CustomEvent('modal:opened'))
      document.dispatchEvent(new CustomEvent('user:loggedIn'))

      expect(events).toEqual(['cart:updated', 'modal:opened', 'user:loggedIn'])
    })

    it('should work with delegation pattern', () => {
      const list = document.createElement('ul')
      const item1 = document.createElement('li')
      const item2 = document.createElement('li')
      list.appendChild(item1)
      list.appendChild(item2)
      document.body.appendChild(list)

      const selectedItems = []

      // Single listener on parent using delegation
      list.addEventListener('item:selected', (e) => {
        selectedItems.push(e.detail.itemId)
      })

      // Dispatch from children with bubbles
      item1.dispatchEvent(new CustomEvent('item:selected', {
        detail: { itemId: 1 },
        bubbles: true
      }))

      item2.dispatchEvent(new CustomEvent('item:selected', {
        detail: { itemId: 2 },
        bubbles: true
      }))

      expect(selectedItems).toEqual([1, 2])
    })
  })
})
