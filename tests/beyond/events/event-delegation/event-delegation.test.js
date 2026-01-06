/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * Tests for Event Delegation concept page
 * Source: docs/beyond/concepts/event-delegation.mdx
 */

describe('Event Delegation', () => {
  let container

  beforeEach(() => {
    // Set up a fresh DOM container for each test
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    // Clean up after each test
    document.body.removeChild(container)
    container = null
  })

  describe('event.target vs event.currentTarget', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:78-85
    it('should demonstrate target vs currentTarget difference', () => {
      // Set up nested structure
      container.innerHTML = `
        <ul id="menu">
          <li>
            <button id="test-button">Click</button>
          </li>
        </ul>
      `

      const menu = document.getElementById('menu')
      const button = document.getElementById('test-button')
      
      let capturedTarget = null
      let capturedCurrentTarget = null

      menu.addEventListener('click', (event) => {
        capturedTarget = event.target
        capturedCurrentTarget = event.currentTarget
      })

      // Simulate click on the button
      button.click()

      // target is the button (what was clicked)
      expect(capturedTarget).toBe(button)
      expect(capturedTarget.tagName).toBe('BUTTON')
      
      // currentTarget is the ul (where listener is attached)
      expect(capturedCurrentTarget).toBe(menu)
      expect(capturedCurrentTarget.tagName).toBe('UL')
    })

    // Source: docs/beyond/concepts/event-delegation.mdx:87-102
    it('should show target changes based on click location while currentTarget stays constant', () => {
      container.innerHTML = `
        <div id="outer">
          <p id="para">
            <span id="inner">Click me</span>
          </p>
        </div>
      `

      const outer = document.getElementById('outer')
      const span = document.getElementById('inner')
      const para = document.getElementById('para')
      
      const targets = []
      const currentTargets = []

      outer.addEventListener('click', (event) => {
        targets.push(event.target)
        currentTargets.push(event.currentTarget)
      })

      // Click the span
      span.click()
      expect(targets[0]).toBe(span)
      expect(currentTargets[0]).toBe(outer)

      // Click the paragraph
      para.click()
      expect(targets[1]).toBe(para)
      expect(currentTargets[1]).toBe(outer) // Always outer
    })
  })

  describe('Element.matches() for filtering', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:104-130
    it('should filter events using matches()', () => {
      container.innerHTML = `
        <div class="container">
          <button class="btn">Regular</button>
          <button class="btn delete-btn">Delete</button>
          <button class="btn primary" disabled>Disabled Primary</button>
          <button class="btn primary">Enabled Primary</button>
          <span data-action="test">Not a button</span>
        </div>
      `

      const containerEl = container.querySelector('.container')
      const results = []

      containerEl.addEventListener('click', (event) => {
        if (event.target.matches('button')) {
          results.push('button')
        }
        if (event.target.matches('.delete-btn')) {
          results.push('delete')
        }
        if (event.target.matches('[data-action]')) {
          results.push('action: ' + event.target.dataset.action)
        }
        if (event.target.matches('button.primary:not(:disabled)')) {
          results.push('enabled-primary')
        }
      })

      // Click delete button
      container.querySelector('.delete-btn').click()
      expect(results).toContain('button')
      expect(results).toContain('delete')

      // Reset and click span with data-action
      results.length = 0
      container.querySelector('[data-action]').click()
      expect(results).toContain('action: test')
      expect(results).not.toContain('button')

      // Reset and click enabled primary button
      results.length = 0
      container.querySelector('button.primary:not(:disabled)').click()
      expect(results).toContain('button')
      expect(results).toContain('enabled-primary')
    })
  })

  describe('Element.closest() for nested elements', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:132-162
    it('should find ancestor elements using closest()', () => {
      container.innerHTML = `
        <div class="container">
          <button class="action-btn">
            <i class="icon" id="icon-element">icon</i>
            <span id="span-element">Delete</span>
          </button>
        </div>
      `

      const containerEl = container.querySelector('.container')
      const icon = document.getElementById('icon-element')
      const span = document.getElementById('span-element')
      const button = container.querySelector('.action-btn')
      
      let foundButton = null

      containerEl.addEventListener('click', (event) => {
        // Use closest to find the button, regardless of what was clicked
        foundButton = event.target.closest('.action-btn')
      })

      // Click the icon inside the button
      icon.click()
      expect(foundButton).toBe(button)

      // Click the span inside the button
      foundButton = null
      span.click()
      expect(foundButton).toBe(button)

      // Click the button itself
      foundButton = null
      button.click()
      expect(foundButton).toBe(button)
    })

    it('should return null when no ancestor matches', () => {
      container.innerHTML = `
        <div class="container">
          <span class="outside">Outside</span>
          <button class="action-btn">Inside</button>
        </div>
      `

      const containerEl = container.querySelector('.container')
      const outside = container.querySelector('.outside')
      
      let foundButton = null

      containerEl.addEventListener('click', (event) => {
        foundButton = event.target.closest('.action-btn')
      })

      outside.click()
      expect(foundButton).toBeNull()
    })
  })

  describe('Basic event delegation pattern', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:188-215
    it('should handle clicks on list items with delegation', () => {
      container.innerHTML = `
        <ul id="todo-list">
          <li data-id="1">Buy groceries</li>
          <li data-id="2">Walk the dog</li>
          <li data-id="3">Finish report</li>
        </ul>
      `

      const todoList = document.getElementById('todo-list')
      const clickedIds = []

      todoList.addEventListener('click', (event) => {
        const item = event.target.closest('li')
        if (item) {
          clickedIds.push(item.dataset.id)
          item.classList.toggle('completed')
        }
      })

      // Click first item
      container.querySelector('li[data-id="1"]').click()
      expect(clickedIds).toContain('1')
      expect(container.querySelector('li[data-id="1"]').classList.contains('completed')).toBe(true)

      // Click second item
      container.querySelector('li[data-id="2"]').click()
      expect(clickedIds).toContain('2')

      // Click first item again to toggle off
      container.querySelector('li[data-id="1"]').click()
      expect(container.querySelector('li[data-id="1"]').classList.contains('completed')).toBe(false)
    })
  })

  describe('Handling dynamic elements', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:221-262
    it('should automatically handle dynamically added elements', () => {
      container.innerHTML = `<ul id="todo-list"></ul>`

      const todoList = document.getElementById('todo-list')
      const clickedTexts = []

      // Set up delegation BEFORE adding items
      todoList.addEventListener('click', (event) => {
        if (event.target.matches('li')) {
          clickedTexts.push(event.target.textContent)
          event.target.classList.toggle('completed')
        }
      })

      // Add items dynamically
      function addTodo(text) {
        const li = document.createElement('li')
        li.textContent = text
        todoList.appendChild(li)
      }

      addTodo('First task')
      addTodo('Second task')
      addTodo('Third task')

      // Click dynamically added items - they should work!
      const items = todoList.querySelectorAll('li')
      items[0].click()
      items[1].click()

      expect(clickedTexts).toEqual(['First task', 'Second task'])
      expect(items[0].classList.contains('completed')).toBe(true)
      expect(items[1].classList.contains('completed')).toBe(true)
      expect(items[2].classList.contains('completed')).toBe(false)
    })
  })

  describe('Action buttons with data-action pattern', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:308-334
    it('should dispatch to correct action based on data-action attribute', () => {
      container.innerHTML = `
        <div id="toolbar">
          <button data-action="save">Save</button>
          <button data-action="load">Load</button>
          <button data-action="delete">Delete</button>
        </div>
      `

      const executedActions = []
      const actions = {
        save() { executedActions.push('save') },
        load() { executedActions.push('load') },
        delete() { executedActions.push('delete') }
      }

      const toolbar = document.getElementById('toolbar')
      toolbar.addEventListener('click', (event) => {
        const action = event.target.dataset.action
        if (action && actions[action]) {
          actions[action]()
        }
      })

      // Click save button
      container.querySelector('[data-action="save"]').click()
      expect(executedActions).toEqual(['save'])

      // Click delete button
      container.querySelector('[data-action="delete"]').click()
      expect(executedActions).toEqual(['save', 'delete'])

      // Click load button
      container.querySelector('[data-action="load"]').click()
      expect(executedActions).toEqual(['save', 'delete', 'load'])
    })
  })

  describe('Tab interface pattern', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:336-361
    it('should switch tabs using delegation', () => {
      container.innerHTML = `
        <div class="tabs">
          <button class="tab" data-tab="home">Home</button>
          <button class="tab" data-tab="profile">Profile</button>
          <button class="tab" data-tab="settings">Settings</button>
        </div>
        <div class="tab-content" id="home">Home content</div>
        <div class="tab-content" id="profile" hidden>Profile content</div>
        <div class="tab-content" id="settings" hidden>Settings content</div>
      `

      const tabsContainer = container.querySelector('.tabs')
      
      tabsContainer.addEventListener('click', (event) => {
        const tab = event.target.closest('.tab')
        if (!tab) return

        // Remove active class from all tabs
        container.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
        tab.classList.add('active')

        // Hide all content, show selected
        const tabId = tab.dataset.tab
        container.querySelectorAll('.tab-content').forEach(content => {
          content.hidden = content.id !== tabId
        })
      })

      // Click profile tab
      container.querySelector('[data-tab="profile"]').click()
      
      expect(container.querySelector('[data-tab="profile"]').classList.contains('active')).toBe(true)
      expect(container.querySelector('[data-tab="home"]').classList.contains('active')).toBe(false)
      expect(document.getElementById('profile').hidden).toBe(false)
      expect(document.getElementById('home').hidden).toBe(true)
      expect(document.getElementById('settings').hidden).toBe(true)

      // Click settings tab
      container.querySelector('[data-tab="settings"]').click()
      
      expect(container.querySelector('[data-tab="settings"]').classList.contains('active')).toBe(true)
      expect(container.querySelector('[data-tab="profile"]').classList.contains('active')).toBe(false)
      expect(document.getElementById('settings').hidden).toBe(false)
      expect(document.getElementById('profile').hidden).toBe(true)
    })
  })

  describe('Container boundary verification', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:468-482
    it('should verify element is within container using contains()', () => {
      container.innerHTML = `
        <table id="outer-table">
          <tr>
            <td>
              Outer cell
              <table id="inner-table">
                <tr><td id="inner-cell">Inner cell</td></tr>
              </table>
            </td>
          </tr>
          <tr><td id="outer-cell">Real outer cell</td></tr>
        </table>
      `

      const outerTable = document.getElementById('outer-table')
      const innerCell = document.getElementById('inner-cell')
      const outerCell = document.getElementById('outer-cell')
      
      const handledCells = []

      outerTable.addEventListener('click', (event) => {
        const td = event.target.closest('td')
        
        // Only handle cells that are direct children of outer table
        // Using a more specific check
        if (td && td.closest('table') === outerTable) {
          handledCells.push(td.id || 'unnamed')
        }
      })

      // Click inner cell - should NOT be handled (belongs to inner table)
      innerCell.click()
      expect(handledCells).not.toContain('inner-cell')

      // Click outer cell - should be handled
      outerCell.click()
      expect(handledCells).toContain('outer-cell')
    })
  })

  describe('focusin/focusout delegation (bubbling alternatives)', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:444-461
    it('should delegate focus events using focusin/focusout', () => {
      container.innerHTML = `
        <form class="form">
          <input type="text" id="input1" />
          <input type="email" id="input2" />
        </form>
      `

      const form = container.querySelector('.form')
      const input1 = document.getElementById('input1')
      const input2 = document.getElementById('input2')
      
      const focusedInputs = []
      const blurredInputs = []

      // focusin and focusout bubble, unlike focus and blur
      form.addEventListener('focusin', (event) => {
        if (event.target.matches('input')) {
          event.target.classList.add('focused')
          focusedInputs.push(event.target.id)
        }
      })

      form.addEventListener('focusout', (event) => {
        if (event.target.matches('input')) {
          event.target.classList.remove('focused')
          blurredInputs.push(event.target.id)
        }
      })

      // Focus first input
      input1.focus()
      expect(focusedInputs).toContain('input1')
      expect(input1.classList.contains('focused')).toBe(true)

      // Focus second input (should blur first)
      input2.focus()
      expect(focusedInputs).toContain('input2')
      expect(blurredInputs).toContain('input1')
      expect(input2.classList.contains('focused')).toBe(true)
      expect(input1.classList.contains('focused')).toBe(false)
    })
  })

  describe('Common mistakes', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:519-530
    describe('Mistake 1: Not using closest() for nested elements', () => {
      it('should demonstrate why matches() alone fails with nested elements', () => {
        container.innerHTML = `
          <div class="container">
            <button class="btn">
              <span class="icon">X</span>
              <span class="text">Delete</span>
            </button>
          </div>
        `

        const containerEl = container.querySelector('.container')
        const icon = container.querySelector('.icon')
        
        let matchesFound = false
        let closestFound = null

        containerEl.addEventListener('click', (event) => {
          // Wrong way - matches() returns false for child elements
          matchesFound = event.target.matches('.btn')
          
          // Right way - closest() finds the button ancestor
          closestFound = event.target.closest('.btn')
        })

        // Click on the icon inside the button
        icon.click()

        // matches() fails because icon is not .btn
        expect(matchesFound).toBe(false)
        
        // closest() succeeds by traversing up to find .btn
        expect(closestFound).not.toBeNull()
        expect(closestFound.classList.contains('btn')).toBe(true)
      })
    })
  })

  describe('Performance comparison', () => {
    // Source: docs/beyond/concepts/event-delegation.mdx:409-425
    it('should handle many elements with single listener', () => {
      // Create 100 items
      container.innerHTML = '<ul class="list"></ul>'
      const list = container.querySelector('.list')
      
      for (let i = 0; i < 100; i++) {
        const li = document.createElement('li')
        li.className = 'item'
        li.dataset.id = i.toString()
        li.textContent = `Item ${i}`
        list.appendChild(li)
      }

      const clickedItems = []

      // Single delegated listener handles all items
      list.addEventListener('click', (event) => {
        if (event.target.matches('.item')) {
          clickedItems.push(event.target.dataset.id)
        }
      })

      // Click various items
      list.querySelector('[data-id="0"]').click()
      list.querySelector('[data-id="50"]').click()
      list.querySelector('[data-id="99"]').click()

      expect(clickedItems).toEqual(['0', '50', '99'])
    })
  })
})
