/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// ============================================================
// MUTATIONOBSERVER TESTS
// From mutation-observer.mdx
// ============================================================

describe('MutationObserver', () => {
  let container
  let observer

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    document.body.innerHTML = ''
    vi.restoreAllMocks()
  })

  // ============================================================
  // CREATING A MUTATIONOBSERVER
  // From mutation-observer.mdx lines 75-120
  // ============================================================

  describe('Creating a MutationObserver', () => {
    // From lines 75-85: Basic observer creation
    it('should create observer with callback', () => {
      const callback = vi.fn()
      observer = new MutationObserver(callback)
      
      expect(observer).toBeInstanceOf(MutationObserver)
    })

    // From lines 90-98: Observer receives mutations array
    it('should call callback with mutations array when changes occur', async () => {
      const mutations = []
      
      observer = new MutationObserver((mutationList) => {
        mutations.push(...mutationList)
      })
      
      observer.observe(container, { childList: true })
      
      container.appendChild(document.createElement('span'))
      
      // Wait for microtask
      await Promise.resolve()
      
      expect(mutations.length).toBe(1)
      expect(mutations[0].type).toBe('childList')
    })

    // From lines 100-115: Processing mutation types
    it('should report correct mutation type for childList changes', async () => {
      let mutationType = null
      
      observer = new MutationObserver((mutations) => {
        mutationType = mutations[0].type
      })
      
      observer.observe(container, { childList: true })
      container.appendChild(document.createElement('div'))
      
      await Promise.resolve()
      
      expect(mutationType).toBe('childList')
    })

    it('should report correct mutation type for attribute changes', async () => {
      let mutationType = null
      let attributeName = null
      
      observer = new MutationObserver((mutations) => {
        mutationType = mutations[0].type
        attributeName = mutations[0].attributeName
      })
      
      observer.observe(container, { attributes: true })
      container.setAttribute('data-test', 'value')
      
      await Promise.resolve()
      
      expect(mutationType).toBe('attributes')
      expect(attributeName).toBe('data-test')
    })
  })

  // ============================================================
  // CONFIGURATION OPTIONS
  // From mutation-observer.mdx lines 130-220
  // ============================================================

  describe('Configuration Options', () => {
    // From lines 140-155: childList option
    describe('childList option', () => {
      it('should detect added nodes', async () => {
        const addedNodes = []
        
        observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            addedNodes.push(...mutation.addedNodes)
          }
        })
        
        observer.observe(container, { childList: true })
        
        const newElement = document.createElement('span')
        container.appendChild(newElement)
        
        await Promise.resolve()
        
        expect(addedNodes).toContain(newElement)
      })

      it('should detect removed nodes', async () => {
        const child = document.createElement('span')
        container.appendChild(child)
        
        const removedNodes = []
        
        observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            removedNodes.push(...mutation.removedNodes)
          }
        })
        
        observer.observe(container, { childList: true })
        container.removeChild(child)
        
        await Promise.resolve()
        
        expect(removedNodes).toContain(child)
      })

      it('should detect innerHTML changes', async () => {
        let mutationCount = 0
        
        observer = new MutationObserver((mutations) => {
          mutationCount = mutations.length
        })
        
        observer.observe(container, { childList: true })
        container.innerHTML = '<p>New content</p>'
        
        await Promise.resolve()
        
        expect(mutationCount).toBeGreaterThan(0)
      })
    })

    // From lines 160-180: attributes option
    describe('attributes option', () => {
      it('should detect setAttribute changes', async () => {
        let changedAttribute = null
        
        observer = new MutationObserver((mutations) => {
          changedAttribute = mutations[0].attributeName
        })
        
        observer.observe(container, { attributes: true })
        container.setAttribute('data-active', 'true')
        
        await Promise.resolve()
        
        expect(changedAttribute).toBe('data-active')
      })

      it('should detect classList changes', async () => {
        let changedAttribute = null
        
        observer = new MutationObserver((mutations) => {
          changedAttribute = mutations[0].attributeName
        })
        
        observer.observe(container, { attributes: true })
        container.classList.add('highlight')
        
        await Promise.resolve()
        
        expect(changedAttribute).toBe('class')
      })

      it('should detect id changes', async () => {
        let changedAttribute = null
        
        observer = new MutationObserver((mutations) => {
          changedAttribute = mutations[0].attributeName
        })
        
        observer.observe(container, { attributes: true })
        container.id = 'new-id'
        
        await Promise.resolve()
        
        expect(changedAttribute).toBe('id')
      })
    })

    // From lines 185-200: attributeFilter option
    describe('attributeFilter option', () => {
      it('should only observe specified attributes', async () => {
        const observedAttributes = []
        
        observer = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            observedAttributes.push(mutation.attributeName)
          }
        })
        
        observer.observe(container, {
          attributes: true,
          attributeFilter: ['class', 'data-state']
        })
        
        container.classList.toggle('active')
        container.dataset.state = 'loading'
        container.setAttribute('title', 'Hello') // Should NOT be observed
        
        await Promise.resolve()
        
        expect(observedAttributes).toContain('class')
        expect(observedAttributes).toContain('data-state')
        expect(observedAttributes).not.toContain('title')
      })
    })

    // From lines 205-220: attributeOldValue option
    describe('attributeOldValue option', () => {
      it('should include old value when attributeOldValue is true', async () => {
        container.setAttribute('data-value', 'original')
        
        let oldValue = null
        let newValue = null
        
        observer = new MutationObserver((mutations) => {
          oldValue = mutations[0].oldValue
          newValue = mutations[0].target.getAttribute(mutations[0].attributeName)
        })
        
        observer.observe(container, {
          attributes: true,
          attributeOldValue: true
        })
        
        container.setAttribute('data-value', 'updated')
        
        await Promise.resolve()
        
        expect(oldValue).toBe('original')
        expect(newValue).toBe('updated')
      })
    })
  })

  // ============================================================
  // SUBTREE OPTION
  // From mutation-observer.mdx lines 280-320
  // ============================================================

  describe('Subtree Option', () => {
    // From lines 285-300: Without subtree
    it('should only observe direct children without subtree option', async () => {
      const child = document.createElement('div')
      const grandchild = document.createElement('span')
      child.appendChild(grandchild)
      container.appendChild(child)
      
      const mutations = []
      
      observer = new MutationObserver((mutationList) => {
        mutations.push(...mutationList)
      })
      
      // Observe WITHOUT subtree
      observer.observe(container, { childList: true })
      
      // Add to grandchild - should NOT trigger
      grandchild.appendChild(document.createElement('p'))
      
      await Promise.resolve()
      
      // No mutations expected since we're not watching subtree
      expect(mutations.length).toBe(0)
    })

    // From lines 305-320: With subtree
    it('should observe all descendants with subtree option', async () => {
      const child = document.createElement('div')
      const grandchild = document.createElement('span')
      child.appendChild(grandchild)
      container.appendChild(child)
      
      const mutations = []
      
      observer = new MutationObserver((mutationList) => {
        mutations.push(...mutationList)
      })
      
      // Observe WITH subtree
      observer.observe(container, { childList: true, subtree: true })
      
      // Add to grandchild - SHOULD trigger
      grandchild.appendChild(document.createElement('p'))
      
      await Promise.resolve()
      
      expect(mutations.length).toBe(1)
      expect(mutations[0].target).toBe(grandchild)
    })
  })

  // ============================================================
  // MUTATIONRECORD PROPERTIES
  // From mutation-observer.mdx lines 230-275
  // ============================================================

  describe('MutationRecord Properties', () => {
    // From lines 240-260: addedNodes and removedNodes
    it('should provide addedNodes in mutation record', async () => {
      let record = null
      
      observer = new MutationObserver((mutations) => {
        record = mutations[0]
      })
      
      observer.observe(container, { childList: true })
      
      const newElement = document.createElement('p')
      container.appendChild(newElement)
      
      await Promise.resolve()
      
      expect(record.addedNodes.length).toBe(1)
      expect(record.addedNodes[0]).toBe(newElement)
      expect(record.removedNodes.length).toBe(0)
    })

    it('should provide removedNodes in mutation record', async () => {
      const child = document.createElement('p')
      container.appendChild(child)
      
      let record = null
      
      observer = new MutationObserver((mutations) => {
        record = mutations[0]
      })
      
      observer.observe(container, { childList: true })
      container.removeChild(child)
      
      await Promise.resolve()
      
      expect(record.removedNodes.length).toBe(1)
      expect(record.removedNodes[0]).toBe(child)
      expect(record.addedNodes.length).toBe(0)
    })

    // From lines 265-275: target property
    it('should provide target element in mutation record', async () => {
      let target = null
      
      observer = new MutationObserver((mutations) => {
        target = mutations[0].target
      })
      
      observer.observe(container, { attributes: true })
      container.setAttribute('data-test', 'value')
      
      await Promise.resolve()
      
      expect(target).toBe(container)
    })
  })

  // ============================================================
  // DISCONNECTING AND CLEANUP
  // From mutation-observer.mdx lines 330-380
  // ============================================================

  describe('Disconnecting and Cleanup', () => {
    // From lines 335-345: disconnect() method
    it('should stop observing after disconnect()', async () => {
      let mutationCount = 0
      
      observer = new MutationObserver(() => {
        mutationCount++
      })
      
      observer.observe(container, { childList: true })
      
      // First change - should be observed
      container.appendChild(document.createElement('span'))
      await Promise.resolve()
      expect(mutationCount).toBe(1)
      
      // Disconnect
      observer.disconnect()
      
      // Second change - should NOT be observed
      container.appendChild(document.createElement('span'))
      await Promise.resolve()
      expect(mutationCount).toBe(1) // Still 1, not 2
    })

    // From lines 350-365: takeRecords() method
    it('should return pending mutations with takeRecords()', async () => {
      const callbackMutations = []
      
      observer = new MutationObserver((mutations) => {
        callbackMutations.push(...mutations)
      })
      
      observer.observe(container, { childList: true })
      
      // Make changes
      container.appendChild(document.createElement('span'))
      container.appendChild(document.createElement('div'))
      
      // Get pending mutations before they're delivered to callback
      const pendingMutations = observer.takeRecords()
      
      // These mutations are now "taken" and won't be delivered to callback
      await Promise.resolve()
      
      expect(pendingMutations.length).toBe(2)
      expect(callbackMutations.length).toBe(0) // Callback never received them
    })
  })

  // ============================================================
  // FILTERING NODE TYPES
  // From mutation-observer.mdx lines 440-470 (Common Mistakes)
  // ============================================================

  describe('Filtering Node Types', () => {
    // From lines 445-465: Filter for elements only
    it('should include text nodes in addedNodes', async () => {
      const addedNodes = []
      
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          addedNodes.push(...mutation.addedNodes)
        }
      })
      
      observer.observe(container, { childList: true })
      
      // This adds a text node, not an element
      container.textContent = 'Hello'
      
      await Promise.resolve()
      
      // Should have a text node
      const hasTextNode = addedNodes.some(node => node.nodeType === Node.TEXT_NODE)
      expect(hasTextNode).toBe(true)
    })

    it('should be able to filter for elements only', async () => {
      const addedElements = []
      
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
              addedElements.push(node)
            }
          }
        }
      })
      
      observer.observe(container, { childList: true })
      
      // Add text node (should be ignored)
      container.appendChild(document.createTextNode('Hello'))
      // Add element (should be captured)
      const elem = document.createElement('span')
      container.appendChild(elem)
      
      await Promise.resolve()
      
      expect(addedElements.length).toBe(1)
      expect(addedElements[0]).toBe(elem)
    })
  })

  // ============================================================
  // CHARACTERDATA MUTATIONS
  // From mutation-observer.mdx lines 110-115
  // ============================================================

  describe('characterData Mutations', () => {
    it('should detect text content changes in text nodes', async () => {
      const textNode = document.createTextNode('Initial text')
      container.appendChild(textNode)
      
      let mutationType = null
      let oldValue = null
      
      observer = new MutationObserver((mutations) => {
        mutationType = mutations[0].type
        oldValue = mutations[0].oldValue
      })
      
      observer.observe(container, {
        characterData: true,
        subtree: true,
        characterDataOldValue: true
      })
      
      textNode.textContent = 'Updated text'
      
      await Promise.resolve()
      
      expect(mutationType).toBe('characterData')
      expect(oldValue).toBe('Initial text')
    })
  })

  // ============================================================
  // REAL-WORLD USE CASES
  // From mutation-observer.mdx lines 400-440
  // ============================================================

  describe('Real-World Use Cases', () => {
    // From lines 405-420: Lazy loading images pattern
    it('should detect images added to DOM for lazy loading', async () => {
      const loadedImages = []
      
      function loadImage(img) {
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.removeAttribute('data-src')
          loadedImages.push(img)
        }
      }
      
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue
            
            if (node.matches && node.matches('img[data-src]')) {
              loadImage(node)
            }
            
            if (node.querySelectorAll) {
              node.querySelectorAll('img[data-src]').forEach(loadImage)
            }
          }
        }
      })
      
      observer.observe(container, { childList: true, subtree: true })
      
      // Add image with data-src
      const img = document.createElement('img')
      img.dataset.src = 'https://example.com/image.jpg'
      container.appendChild(img)
      
      await Promise.resolve()
      
      expect(loadedImages.length).toBe(1)
      expect(img.src).toBe('https://example.com/image.jpg')
      expect(img.dataset.src).toBeUndefined()
    })

    // From lines 430-445: Removing unwanted elements
    it('should detect and remove unwanted elements', async () => {
      const removedElements = []
      
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== Node.ELEMENT_NODE) continue
            
            if (node.matches && node.matches('.ad-banner')) {
              node.remove()
              removedElements.push(node)
            }
          }
        }
      })
      
      observer.observe(container, { childList: true, subtree: true })
      
      // Simulate ad being injected
      const ad = document.createElement('div')
      ad.className = 'ad-banner'
      container.appendChild(ad)
      
      await Promise.resolve()
      
      expect(removedElements.length).toBe(1)
      expect(container.querySelector('.ad-banner')).toBeNull()
    })

    // From lines 450-465: Tracking class changes
    it('should detect class changes on elements', async () => {
      const element = document.createElement('div')
      element.id = 'panel'
      container.appendChild(element)
      
      let isExpanded = false
      
      observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.attributeName === 'class') {
            isExpanded = mutation.target.classList.contains('expanded')
          }
        }
      })
      
      observer.observe(element, {
        attributes: true,
        attributeFilter: ['class']
      })
      
      element.classList.add('expanded')
      
      await Promise.resolve()
      
      expect(isExpanded).toBe(true)
    })
  })

  // ============================================================
  // MICROTASK TIMING
  // From mutation-observer.mdx lines 385-400
  // ============================================================

  describe('Microtask Timing', () => {
    it('should batch multiple changes into single callback', async () => {
      let callbackCount = 0
      let totalMutations = 0
      
      observer = new MutationObserver((mutations) => {
        callbackCount++
        totalMutations += mutations.length
      })
      
      observer.observe(container, { childList: true })
      
      // Make multiple changes synchronously
      container.appendChild(document.createElement('div'))
      container.appendChild(document.createElement('span'))
      container.appendChild(document.createElement('p'))
      
      await Promise.resolve()
      
      // Should be batched into single callback
      expect(callbackCount).toBe(1)
      expect(totalMutations).toBe(3)
    })
  })
})
