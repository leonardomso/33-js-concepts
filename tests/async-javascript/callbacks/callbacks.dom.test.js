/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ============================================================
// DOM EVENT HANDLER CALLBACKS
// From callbacks.mdx lines 401-434
// Pattern 1: Event Handlers
// ============================================================

describe('DOM Event Handler Callbacks', () => {
  let button
  
  beforeEach(() => {
    // Create a fresh button element for each test
    button = document.createElement('button')
    button.id = 'myButton'
    document.body.appendChild(button)
  })
  
  afterEach(() => {
    // Clean up
    document.body.innerHTML = ''
  })
  
  // From lines 405-416: DOM events with addEventListener
  it('should execute callback when button is clicked', () => {
    const output = []
    
    // DOM events
    const button = document.getElementById('myButton')
    
    button.addEventListener('click', function handleClick(event) {
      output.push('Button clicked!')
      output.push(`Event type: ${event.type}`)      // "click"
      output.push(`Target id: ${event.target.id}`)  // "myButton"
    })
    
    // The callback receives an Event object with details about what happened
    
    // Simulate click
    button.click()
    
    expect(output).toEqual([
      'Button clicked!',
      'Event type: click',
      'Target id: myButton'
    ])
  })
  
  // From lines 420-434: Named functions for reusability and removal
  it('should use named functions for reusability', () => {
    const output = []
    
    function handleClick(event) {
      output.push(`Clicked: ${event.target.id}`)
    }
    
    function handleMouseOver(event) {
      output.push(`Mouseover: ${event.target.id}`)
    }
    
    button.addEventListener('click', handleClick)
    button.addEventListener('mouseover', handleMouseOver)
    
    // Simulate events
    button.click()
    button.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }))
    
    expect(output).toEqual([
      'Clicked: myButton',
      'Mouseover: myButton'
    ])
  })
  
  it('should remove event listeners with removeEventListener', () => {
    const output = []
    
    function handleClick(event) {
      output.push('Clicked!')
    }
    
    button.addEventListener('click', handleClick)
    
    // First click - handler is attached
    button.click()
    expect(output).toEqual(['Clicked!'])
    
    // Later, you can remove them:
    button.removeEventListener('click', handleClick)
    
    // Second click - handler is removed
    button.click()
    expect(output).toEqual(['Clicked!'])  // Still just one, handler was removed
  })
  
  it('should demonstrate multiple event listeners on same element', () => {
    const output = []
    
    button.addEventListener('click', () => output.push('Handler 1'))
    button.addEventListener('click', () => output.push('Handler 2'))
    button.addEventListener('click', () => output.push('Handler 3'))
    
    button.click()
    
    // All handlers execute in order of registration
    expect(output).toEqual(['Handler 1', 'Handler 2', 'Handler 3'])
  })
  
  it('should demonstrate event object properties in callback', () => {
    const eventData = {}
    
    button.addEventListener('click', function(event) {
      eventData.type = event.type
      eventData.target = event.target
      eventData.currentTarget = event.currentTarget
      eventData.bubbles = event.bubbles
      eventData.cancelable = event.cancelable
    })
    
    button.click()
    
    expect(eventData.type).toBe('click')
    expect(eventData.target).toBe(button)
    expect(eventData.currentTarget).toBe(button)
    expect(eventData.bubbles).toBe(true)
    expect(eventData.cancelable).toBe(true)
  })
  
  it('should demonstrate event delegation pattern with callbacks', () => {
    // Create a list with items
    const list = document.createElement('ul')
    list.id = 'myList'
    
    const item1 = document.createElement('li')
    item1.textContent = 'Item 1'
    item1.dataset.id = '1'
    
    const item2 = document.createElement('li')
    item2.textContent = 'Item 2'
    item2.dataset.id = '2'
    
    list.appendChild(item1)
    list.appendChild(item2)
    document.body.appendChild(list)
    
    const clickedItems = []
    
    // Event delegation - single handler on parent
    list.addEventListener('click', function(event) {
      if (event.target.tagName === 'LI') {
        clickedItems.push(event.target.dataset.id)
      }
    })
    
    item1.click()
    item2.click()
    
    expect(clickedItems).toEqual(['1', '2'])
  })
  
  it('should demonstrate this context in event handler callbacks', () => {
    const results = []
    
    // Regular function - 'this' is the element
    button.addEventListener('click', function(event) {
      results.push(`Regular: ${this.id}`)
    })
    
    // Arrow function - 'this' is NOT the element (inherited from outer scope)
    button.addEventListener('click', (event) => {
      // In this context, 'this' would be the module/global scope
      results.push(`Arrow target: ${event.target.id}`)
    })
    
    button.click()
    
    expect(results).toEqual([
      'Regular: myButton',
      'Arrow target: myButton'
    ])
  })
  
  it('should demonstrate once option for single-fire callbacks', () => {
    const output = []
    
    button.addEventListener('click', () => {
      output.push('Clicked!')
    }, { once: true })
    
    button.click()
    button.click()
    button.click()
    
    // Handler only fires once
    expect(output).toEqual(['Clicked!'])
  })
  
  it('should demonstrate preventing default with callbacks', () => {
    const form = document.createElement('form')
    const submitEvents = []
    let defaultPrevented = false
    
    form.addEventListener('submit', function(event) {
      event.preventDefault()
      defaultPrevented = event.defaultPrevented
      submitEvents.push('Form submitted')
    })
    
    // Dispatch a submit event
    const submitEvent = new Event('submit', { cancelable: true })
    form.dispatchEvent(submitEvent)
    
    expect(submitEvents).toEqual(['Form submitted'])
    expect(defaultPrevented).toBe(true)
  })
  
  it('should demonstrate stopping propagation in callbacks', () => {
    const output = []
    
    // Create nested elements
    const outer = document.createElement('div')
    const inner = document.createElement('div')
    outer.appendChild(inner)
    document.body.appendChild(outer)
    
    outer.addEventListener('click', () => output.push('Outer clicked'))
    inner.addEventListener('click', (event) => {
      event.stopPropagation()
      output.push('Inner clicked')
    })
    
    inner.click()
    
    // Only inner handler fires due to stopPropagation
    expect(output).toEqual(['Inner clicked'])
  })
})
