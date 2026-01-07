/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * DOM-specific tests for Intersection Observer concept page
 * Source: /docs/beyond/concepts/intersection-observer.mdx
 * 
 * These tests use jsdom with a mocked IntersectionObserver
 */

class MockIntersectionObserver {
  constructor(callback, options = {}) {
    this.callback = callback
    this.options = options
    this.observedElements = []
    MockIntersectionObserver.instances.push(this)
  }

  observe(element) {
    this.observedElements.push(element)
    this.callback([{
      target: element,
      isIntersecting: false,
      intersectionRatio: 0,
      boundingClientRect: element.getBoundingClientRect(),
      intersectionRect: { top: 0, left: 0, width: 0, height: 0 },
      rootBounds: null,
      time: performance.now()
    }], this)
  }

  unobserve(element) {
    const index = this.observedElements.indexOf(element)
    if (index > -1) {
      this.observedElements.splice(index, 1)
    }
  }

  disconnect() {
    this.observedElements = []
  }

  takeRecords() {
    return []
  }

  triggerIntersection(entries) {
    this.callback(entries, this)
  }

  static instances = []
  static clearInstances() {
    this.instances = []
  }
}

describe('Intersection Observer (DOM)', () => {
  let originalIntersectionObserver

  beforeEach(() => {
    originalIntersectionObserver = global.IntersectionObserver
    global.IntersectionObserver = MockIntersectionObserver
    MockIntersectionObserver.clearInstances()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver
    document.body.innerHTML = ''
  })

  describe('Basic Observer Creation', () => {
    it('should create observer with callback and options', () => {
      const callback = vi.fn()
      const options = {
        root: null,
        rootMargin: '100px',
        threshold: 0.5
      }

      const observer = new IntersectionObserver(callback, options)

      expect(observer.options.rootMargin).toBe('100px')
      expect(observer.options.threshold).toBe(0.5)
    })

    it('should observe multiple elements with single observer', () => {
      const callback = vi.fn()
      const observer = new IntersectionObserver(callback)

      const el1 = document.createElement('div')
      const el2 = document.createElement('div')
      const el3 = document.createElement('div')

      observer.observe(el1)
      observer.observe(el2)
      observer.observe(el3)

      expect(observer.observedElements.length).toBe(3)
    })
  })

  describe('Lazy Loading Implementation', () => {
    it('should implement lazy loading pattern from MDX', () => {
      const img = document.createElement('img')
      img.dataset.src = 'real-image.jpg'
      img.classList.add('lazy')
      document.body.appendChild(img)

      const loadedImages = []

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imgEl = entry.target
            imgEl.src = imgEl.dataset.src
            imgEl.classList.remove('lazy')
            imgEl.classList.add('loaded')
            loadedImages.push(imgEl)
            obs.unobserve(imgEl)
          }
        })
      }, { rootMargin: '100px 0px', threshold: 0 })

      observer.observe(img)

      observer.triggerIntersection([{
        target: img,
        isIntersecting: true,
        intersectionRatio: 0.5
      }])

      expect(img.src).toContain('real-image.jpg')
      expect(img.classList.contains('loaded')).toBe(true)
      expect(img.classList.contains('lazy')).toBe(false)
      expect(loadedImages.length).toBe(1)
      expect(observer.observedElements.length).toBe(0)
    })
  })

  describe('Scroll Animation Implementation', () => {
    it('should add animated class when element intersects', () => {
      const element = document.createElement('div')
      element.classList.add('animate-on-scroll')
      document.body.appendChild(element)

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          }
        })
      }, { threshold: 0.2 })

      observer.observe(element)

      expect(element.classList.contains('animated')).toBe(false)

      observer.triggerIntersection([{
        target: element,
        isIntersecting: true,
        intersectionRatio: 0.5
      }])

      expect(element.classList.contains('animated')).toBe(true)
    })

    it('should toggle animation class when animateOnce is false', () => {
      const element = document.createElement('div')
      document.body.appendChild(element)

      const animateOnce = false

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated')
          } else if (!animateOnce) {
            entry.target.classList.remove('animated')
          }
        })
      })

      observer.observe(element)

      observer.triggerIntersection([{ target: element, isIntersecting: true }])
      expect(element.classList.contains('animated')).toBe(true)

      observer.triggerIntersection([{ target: element, isIntersecting: false }])
      expect(element.classList.contains('animated')).toBe(false)
    })
  })

  describe('Infinite Scroll Implementation', () => {
    it('should detect sentinel element for infinite scroll', () => {
      const content = document.createElement('div')
      content.id = 'content'
      const sentinel = document.createElement('div')
      sentinel.id = 'sentinel'
      document.body.appendChild(content)
      document.body.appendChild(sentinel)

      let loadMoreCalled = false

      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          loadMoreCalled = true
        }
      }, { rootMargin: '200px' })

      observer.observe(sentinel)

      observer.triggerIntersection([{
        target: sentinel,
        isIntersecting: true,
        intersectionRatio: 1
      }])

      expect(loadMoreCalled).toBe(true)
    })
  })

  describe('Observer Cleanup', () => {
    it('should unobserve element after handling', () => {
      const element = document.createElement('div')
      document.body.appendChild(element)

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            obs.unobserve(entry.target)
          }
        })
      })

      observer.observe(element)
      expect(observer.observedElements.length).toBe(1)

      observer.triggerIntersection([{
        target: element,
        isIntersecting: true
      }])

      expect(observer.observedElements.length).toBe(0)
    })

    it('should disconnect all observations', () => {
      const el1 = document.createElement('div')
      const el2 = document.createElement('div')
      document.body.appendChild(el1)
      document.body.appendChild(el2)

      const observer = new IntersectionObserver(vi.fn())

      observer.observe(el1)
      observer.observe(el2)
      expect(observer.observedElements.length).toBe(2)

      observer.disconnect()
      expect(observer.observedElements.length).toBe(0)
    })
  })

  describe('Callback Behavior', () => {
    it('should fire callback immediately when observe() is called', () => {
      const element = document.createElement('div')
      document.body.appendChild(element)

      const callback = vi.fn()
      const observer = new IntersectionObserver(callback)

      observer.observe(element)

      expect(callback).toHaveBeenCalledTimes(1)
    })

    it('should provide observer reference in callback', () => {
      const element = document.createElement('div')
      document.body.appendChild(element)

      let receivedObserver = null

      const observer = new IntersectionObserver((entries, obs) => {
        receivedObserver = obs
      })

      observer.observe(element)

      expect(receivedObserver).toBe(observer)
    })

    it('should provide entry with correct target', () => {
      const element = document.createElement('div')
      element.id = 'test-target'
      document.body.appendChild(element)

      let receivedTarget = null

      const observer = new IntersectionObserver((entries) => {
        receivedTarget = entries[0].target
      })

      observer.observe(element)

      expect(receivedTarget).toBe(element)
      expect(receivedTarget.id).toBe('test-target')
    })
  })

  describe('Section Navigation Pattern', () => {
    it('should highlight active nav link based on visible section', () => {
      const nav = document.createElement('nav')
      nav.innerHTML = `
        <a href="#section1">Section 1</a>
        <a href="#section2">Section 2</a>
        <a href="#section3">Section 3</a>
      `
      document.body.appendChild(nav)

      const section1 = document.createElement('section')
      section1.id = 'section1'
      const section2 = document.createElement('section')
      section2.id = 'section2'
      document.body.appendChild(section1)
      document.body.appendChild(section2)

      const navLinks = nav.querySelectorAll('a')

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'))
            const activeLink = nav.querySelector(`a[href="#${entry.target.id}"]`)
            if (activeLink) {
              activeLink.classList.add('active')
            }
          }
        })
      }, { threshold: 0.5 })

      observer.observe(section1)
      observer.observe(section2)

      observer.triggerIntersection([{
        target: section2,
        isIntersecting: true,
        intersectionRatio: 0.6
      }])

      const activeLink = nav.querySelector('a.active')
      expect(activeLink.getAttribute('href')).toBe('#section2')
    })
  })

  describe('Feature Detection', () => {
    it('should detect IntersectionObserver support', () => {
      expect('IntersectionObserver' in window).toBe(true)
    })

    it('should handle missing IntersectionObserver gracefully', () => {
      const originalIO = global.IntersectionObserver
      delete global.IntersectionObserver

      const hasSupport = 'IntersectionObserver' in global

      expect(hasSupport).toBe(false)

      global.IntersectionObserver = originalIO
    })
  })
})
