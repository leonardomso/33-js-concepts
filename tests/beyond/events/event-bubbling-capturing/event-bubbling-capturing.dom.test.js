/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ============================================================
// EVENT BUBBLING & CAPTURING TESTS
// From event-bubbling-capturing.mdx
// ============================================================

describe('Event Bubbling & Capturing', () => {
  let container

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  // ============================================================
  // EVENT BUBBLING IN ACTION
  // From lines ~95-120
  // ============================================================

  describe('Event Bubbling in Action', () => {
    // From lines ~95-115: Nested element click bubbling
    it('should bubble events from child to parent to grandparent', () => {
      // Setup HTML structure
      const grandparent = document.createElement('div')
      grandparent.className = 'grandparent'
      
      const parent = document.createElement('div')
      parent.className = 'parent'
      
      const child = document.createElement('button')
      child.className = 'child'
      child.textContent = 'Click me'
      
      parent.appendChild(child)
      grandparent.appendChild(parent)
      container.appendChild(grandparent)

      // Track order of handler calls
      const output = []

      grandparent.addEventListener('click', () => {
        output.push('Grandparent clicked')
      })

      parent.addEventListener('click', () => {
        output.push('Parent clicked')
      })

      child.addEventListener('click', () => {
        output.push('Child clicked')
      })

      // Click the child button
      child.click()

      // Events bubble from child → parent → grandparent
      expect(output).toEqual([
        'Child clicked',
        'Parent clicked',
        'Grandparent clicked'
      ])
    })

    // From lines ~120-140: Event delegation pattern
    it('should enable event delegation via bubbling', () => {
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'button-container'
      
      const btn1 = document.createElement('button')
      btn1.className = 'btn'
      btn1.textContent = 'Button 1'
      
      const btn2 = document.createElement('button')
      btn2.className = 'btn'
      btn2.textContent = 'Button 2'
      
      buttonContainer.appendChild(btn1)
      buttonContainer.appendChild(btn2)
      container.appendChild(buttonContainer)

      const clicks = []

      // Single listener on parent (event delegation)
      buttonContainer.addEventListener('click', (e) => {
        if (e.target.matches('.btn')) {
          clicks.push(e.target.textContent)
        }
      })

      btn1.click()
      btn2.click()

      expect(clicks).toEqual(['Button 1', 'Button 2'])
    })
  })

  // ============================================================
  // LISTENING DURING CAPTURING PHASE
  // From lines ~145-185
  // ============================================================

  describe('Listening During Capturing Phase', () => {
    // From lines ~170-185: Capture vs bubble order
    it('should fire capturing handlers before bubbling handlers', () => {
      const parent = document.createElement('div')
      parent.className = 'parent'
      
      const child = document.createElement('button')
      child.className = 'child'
      
      parent.appendChild(child)
      container.appendChild(parent)

      const output = []

      // Capturing handler (fires first, on way down)
      parent.addEventListener('click', () => {
        output.push('Parent - capturing')
      }, true)

      // Target handler
      child.addEventListener('click', () => {
        output.push('Child - target')
      })

      // Bubbling handler (fires last, on way up)
      parent.addEventListener('click', () => {
        output.push('Parent - bubbling')
      })

      child.click()

      expect(output).toEqual([
        'Parent - capturing',
        'Child - target',
        'Parent - bubbling'
      ])
    })

    // From lines ~155-160: Different ways to specify capture
    it('should accept different capture option formats', () => {
      const element = document.createElement('div')
      container.appendChild(element)
      
      const handlers = []
      
      // All these are equivalent for capture: true
      const handler1 = () => handlers.push(1)
      const handler2 = () => handlers.push(2)
      
      element.addEventListener('click', handler1, true)
      element.addEventListener('click', handler2, { capture: true })
      
      element.click()
      
      // Both handlers should fire
      expect(handlers).toContain(1)
      expect(handlers).toContain(2)
    })
  })

  // ============================================================
  // THE eventPhase PROPERTY
  // From lines ~190-230
  // ============================================================

  describe('The eventPhase Property', () => {
    // From lines ~195-205: eventPhase values
    it('should return correct eventPhase values during propagation', () => {
      const parent = document.createElement('div')
      parent.className = 'parent'
      
      const child = document.createElement('button')
      child.className = 'child'
      
      parent.appendChild(child)
      container.appendChild(parent)

      const phases = []

      // Capture phase listener on parent
      parent.addEventListener('click', (e) => {
        phases.push({ element: 'parent-capture', phase: e.eventPhase })
      }, true)

      // Bubble phase listener on parent
      parent.addEventListener('click', (e) => {
        phases.push({ element: 'parent-bubble', phase: e.eventPhase })
      })

      // Target listener on child
      child.addEventListener('click', (e) => {
        phases.push({ element: 'child', phase: e.eventPhase })
      })

      child.click()

      // eventPhase: 1 = CAPTURING, 2 = AT_TARGET, 3 = BUBBLING
      expect(phases).toEqual([
        { element: 'parent-capture', phase: 1 },  // CAPTURING_PHASE
        { element: 'child', phase: 2 },           // AT_TARGET
        { element: 'parent-bubble', phase: 3 }    // BUBBLING_PHASE
      ])
    })

    // From lines ~220-230: Both handlers fire at target when clicking directly
    it('should report AT_TARGET phase for both capture and bubble on clicked element', () => {
      const element = document.createElement('div')
      element.className = 'parent'
      container.appendChild(element)

      const phases = []

      element.addEventListener('click', (e) => {
        phases.push({ handler: 'capture', phase: e.eventPhase })
      }, true)

      element.addEventListener('click', (e) => {
        phases.push({ handler: 'bubble', phase: e.eventPhase })
      })

      // Click the element directly (not a child)
      element.click()

      // Both are AT_TARGET (2) when clicking the element itself
      expect(phases).toEqual([
        { handler: 'capture', phase: 2 },
        { handler: 'bubble', phase: 2 }
      ])
    })
  })

  // ============================================================
  // event.target vs event.currentTarget
  // From lines ~235-275
  // ============================================================

  describe('event.target vs event.currentTarget', () => {
    // From lines ~240-255: target vs currentTarget difference
    it('should distinguish target from currentTarget during bubbling', () => {
      const parent = document.createElement('div')
      parent.className = 'parent'
      
      const child = document.createElement('button')
      child.className = 'child'
      
      parent.appendChild(child)
      container.appendChild(parent)

      let capturedTarget = null
      let capturedCurrentTarget = null

      parent.addEventListener('click', (e) => {
        capturedTarget = e.target.className
        capturedCurrentTarget = e.currentTarget.className
      })

      // Click the child, handler is on parent
      child.click()

      expect(capturedTarget).toBe('child')         // What was clicked
      expect(capturedCurrentTarget).toBe('parent') // Where listener is
    })

    // From lines ~260-275: Using closest() for delegation
    it('should find correct element using closest() in delegated handler', () => {
      const list = document.createElement('ul')
      list.className = 'list'
      
      const item1 = document.createElement('li')
      item1.innerHTML = '<span>Item 1</span>'
      
      const item2 = document.createElement('li')
      item2.innerHTML = '<span>Item 2</span>'
      
      list.appendChild(item1)
      list.appendChild(item2)
      container.appendChild(list)

      const clickedItems = []

      list.addEventListener('click', (e) => {
        const listItem = e.target.closest('li')
        if (listItem) {
          clickedItems.push(listItem.textContent)
        }
      })

      // Click the span inside item1 (not the li directly)
      item1.querySelector('span').click()

      expect(clickedItems).toEqual(['Item 1'])
    })
  })

  // ============================================================
  // STOPPING EVENT PROPAGATION
  // From lines ~280-360
  // ============================================================

  describe('Stopping Event Propagation', () => {
    // From lines ~285-310: stopPropagation allows same-element handlers
    it('should stop propagation but allow other handlers on same element', () => {
      const parent = document.createElement('div')
      parent.className = 'parent'
      
      const child = document.createElement('button')
      child.className = 'child'
      
      parent.appendChild(child)
      container.appendChild(parent)

      const output = []

      parent.addEventListener('click', () => {
        output.push('Parent handler')
      })

      child.addEventListener('click', (e) => {
        output.push('Child handler 1')
        e.stopPropagation()
      })

      child.addEventListener('click', () => {
        output.push('Child handler 2')
      })

      child.click()

      // stopPropagation stops parent but not other child handlers
      expect(output).toEqual([
        'Child handler 1',
        'Child handler 2'
      ])
      expect(output).not.toContain('Parent handler')
    })

    // From lines ~315-335: stopImmediatePropagation stops everything
    it('should stop all handlers including same element with stopImmediatePropagation', () => {
      const child = document.createElement('button')
      child.className = 'child'
      container.appendChild(child)

      const output = []

      child.addEventListener('click', (e) => {
        output.push('Child handler 1')
        e.stopImmediatePropagation()
      })

      child.addEventListener('click', () => {
        output.push('Child handler 2')
      })

      child.click()

      expect(output).toEqual(['Child handler 1'])
      expect(output).not.toContain('Child handler 2')
    })

    // From lines ~340-360: stopPropagation vs preventDefault
    it('should distinguish stopPropagation from preventDefault', () => {
      const parent = document.createElement('div')
      const link = document.createElement('a')
      link.href = 'https://example.com'
      link.textContent = 'Click me'
      
      parent.appendChild(link)
      container.appendChild(parent)

      let parentHandlerFired = false
      let defaultPrevented = false

      parent.addEventListener('click', () => {
        parentHandlerFired = true
      })

      link.addEventListener('click', (e) => {
        e.preventDefault()  // Stop navigation
        defaultPrevented = e.defaultPrevented
        // NOT calling stopPropagation - event should still bubble
      })

      link.click()

      // preventDefault stops default action, not bubbling
      expect(defaultPrevented).toBe(true)
      expect(parentHandlerFired).toBe(true)  // Event still bubbled
    })

    it('should stop bubbling with stopPropagation but not prevent default', () => {
      const parent = document.createElement('div')
      const link = document.createElement('a')
      link.href = 'https://example.com'
      
      parent.appendChild(link)
      container.appendChild(parent)

      let parentHandlerFired = false

      parent.addEventListener('click', () => {
        parentHandlerFired = true
      })

      link.addEventListener('click', (e) => {
        e.stopPropagation()  // Stop bubbling
        // NOT calling preventDefault - default would happen (if not jsdom)
      })

      link.click()

      // stopPropagation stops bubbling
      expect(parentHandlerFired).toBe(false)
    })
  })

  // ============================================================
  // EVENTS THAT DON'T BUBBLE
  // From lines ~380-420
  // ============================================================

  describe('Events That Don\'t Bubble', () => {
    // From lines ~385-395: focus doesn't bubble
    it('should not bubble focus events', () => {
      const form = document.createElement('form')
      const input = document.createElement('input')
      input.type = 'text'
      
      form.appendChild(input)
      container.appendChild(form)

      let formFocusFired = false

      form.addEventListener('focus', () => {
        formFocusFired = true
      })

      input.focus()

      // focus doesn't bubble
      expect(formFocusFired).toBe(false)
    })

    // From lines ~395-405: focusin does bubble
    it('should bubble focusin events (alternative to focus)', () => {
      const form = document.createElement('form')
      const input = document.createElement('input')
      input.type = 'text'
      
      form.appendChild(input)
      container.appendChild(form)

      let formFocusinFired = false

      form.addEventListener('focusin', () => {
        formFocusinFired = true
      })

      input.focus()

      // focusin DOES bubble
      expect(formFocusinFired).toBe(true)
    })

    // From lines ~410-420: checking bubbles property
    it('should allow checking if event bubbles via bubbles property', () => {
      // Use an input element since it's focusable
      const input = document.createElement('input')
      input.type = 'text'
      container.appendChild(input)

      let clickBubbles = null
      let focusBubbles = null

      input.addEventListener('click', (e) => {
        clickBubbles = e.bubbles
      })

      input.addEventListener('focus', (e) => {
        focusBubbles = e.bubbles
      })

      input.click()
      input.focus()

      expect(clickBubbles).toBe(true)
      expect(focusBubbles).toBe(false)
    })
  })

  // ============================================================
  // WHEN TO USE CAPTURING
  // From lines ~425-470
  // ============================================================

  describe('When to Use Capturing', () => {
    // From lines ~430-440: Intercepting events before target
    it('should intercept events before they reach target using capture', () => {
      const output = []
      
      const button = document.createElement('button')
      container.appendChild(button)

      // Capture listener on document logs first
      document.addEventListener('click', () => {
        output.push('Document captured click')
      }, true)

      button.addEventListener('click', () => {
        output.push('Button clicked')
      })

      button.click()

      expect(output[0]).toBe('Document captured click')
      expect(output[1]).toBe('Button clicked')
      
      // Cleanup
      document.removeEventListener('click', () => {}, true)
    })

    // From lines ~445-460: Cancel all clicks pattern
    it('should block events using capture phase', () => {
      let disableClicks = true
      const output = []

      const button = document.createElement('button')
      container.appendChild(button)

      // Capture handler that can block
      const blocker = (e) => {
        if (disableClicks) {
          e.stopPropagation()
          output.push('Click blocked!')
        }
      }
      
      container.addEventListener('click', blocker, true)

      button.addEventListener('click', () => {
        output.push('Button clicked')
      })

      // With disableClicks = true, click is blocked
      button.click()
      expect(output).toEqual(['Click blocked!'])

      // Enable clicks
      disableClicks = false
      output.length = 0
      button.click()
      expect(output).toEqual(['Button clicked'])
    })
  })

  // ============================================================
  // COMMON MISTAKES
  // From lines ~475-530
  // ============================================================

  describe('Common Mistakes', () => {
    // From lines ~480-495: Forgetting capture when removing listeners
    it('should fail to remove listener if capture flag mismatches', () => {
      const element = document.createElement('button')
      container.appendChild(element)

      let callCount = 0
      const handler = () => callCount++

      // Add with capture: true
      element.addEventListener('click', handler, true)
      
      // Try to remove without capture (wrong!)
      element.removeEventListener('click', handler)
      
      // Handler still attached
      element.click()
      expect(callCount).toBe(1)

      // Correct removal with matching capture flag
      element.removeEventListener('click', handler, true)
      element.click()
      expect(callCount).toBe(1)  // No additional calls
    })

    // From lines ~510-530: Using correct property (target vs currentTarget)
    it('should use closest() instead of just target for delegation', () => {
      const list = document.createElement('ul')
      
      const item = document.createElement('li')
      const span = document.createElement('span')
      span.textContent = 'Click me'
      span.className = 'inner'
      item.className = 'item'
      
      item.appendChild(span)
      list.appendChild(item)
      container.appendChild(list)

      let wrongSelection = null
      let correctSelection = null

      list.addEventListener('click', (e) => {
        // Wrong: might select the span, not the li
        wrongSelection = e.target.className
        
        // Correct: find the actual list item
        const listItem = e.target.closest('li')
        correctSelection = listItem ? listItem.className : null
      })

      // Click the span inside the li
      span.click()

      expect(wrongSelection).toBe('inner')      // Got the span
      expect(correctSelection).toBe('item')     // Got the li
    })
  })

  // ============================================================
  // MULTIPLE HANDLERS ORDER
  // ============================================================

  describe('Handler Execution Order', () => {
    it('should execute same-element handlers in registration order', () => {
      const element = document.createElement('div')
      container.appendChild(element)

      const output = []

      element.addEventListener('click', () => output.push(1))
      element.addEventListener('click', () => output.push(2))
      element.addEventListener('click', () => output.push(3))

      element.click()

      expect(output).toEqual([1, 2, 3])
    })

    it('should execute capturing handlers before bubbling handlers at any level', () => {
      const grandparent = document.createElement('div')
      const parent = document.createElement('div')
      const child = document.createElement('button')

      parent.appendChild(child)
      grandparent.appendChild(parent)
      container.appendChild(grandparent)

      const output = []

      // Mix of capture and bubble handlers
      grandparent.addEventListener('click', () => output.push('GP-capture'), true)
      parent.addEventListener('click', () => output.push('P-capture'), true)
      grandparent.addEventListener('click', () => output.push('GP-bubble'))
      parent.addEventListener('click', () => output.push('P-bubble'))
      child.addEventListener('click', () => output.push('Child'))

      child.click()

      // Capture phase (down): GP → P
      // Target phase: Child
      // Bubble phase (up): P → GP
      expect(output).toEqual([
        'GP-capture',
        'P-capture',
        'Child',
        'P-bubble',
        'GP-bubble'
      ])
    })
  })
})
