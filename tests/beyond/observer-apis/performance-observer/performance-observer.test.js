import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

/**
 * Tests for Performance Observer concept page
 * Source: docs/beyond/concepts/performance-observer.mdx
 * 
 * PerformanceObserver is a browser API - these tests mock the API
 * to verify the patterns and logic demonstrated in the documentation.
 */

describe('Performance Observer', () => {
  let mockObservers
  let mockEntries

  function simulateEntry(entry) {
    mockEntries.push(entry)
    mockObservers.forEach(observer => {
      if (
        (observer.options.type && observer.options.type === entry.entryType) ||
        (observer.options.entryTypes && observer.options.entryTypes.includes(entry.entryType))
      ) {
        observer.callback({
          getEntries: () => [entry]
        }, observer)
      }
    })
  }

  beforeEach(() => {
    mockObservers = []
    mockEntries = []

    class MockPerformanceObserver {
      constructor(callback) {
        this.callback = callback
        this.options = null
      }

      observe(options) {
        this.options = options
        mockObservers.push(this)
        if (options.buffered && mockEntries.length > 0) {
          const entries = mockEntries.filter(e => 
            options.type === e.entryType || 
            (options.entryTypes && options.entryTypes.includes(e.entryType))
          )
          if (entries.length > 0) {
            setTimeout(() => {
              this.callback({ getEntries: () => [...entries] }, this)
            }, 0)
          }
        }
      }

      disconnect() {
        const index = mockObservers.indexOf(this)
        if (index > -1) {
          mockObservers.splice(index, 1)
        }
      }

      takeRecords() {
        const records = [...mockEntries]
        mockEntries.length = 0
        return records
      }

      static supportedEntryTypes = [
        'element', 'event', 'first-input', 'largest-contentful-paint',
        'layout-shift', 'longtask', 'mark', 'measure', 'navigation',
        'paint', 'resource', 'visibility-state'
      ]
    }

    vi.stubGlobal('PerformanceObserver', MockPerformanceObserver)

    vi.stubGlobal('performance', {
      mark: vi.fn((name) => ({ name, startTime: Date.now() })),
      measure: vi.fn((name, startMark, endMark) => ({
        name,
        startTime: 0,
        duration: 100
      })),
      getEntries: vi.fn(() => mockEntries),
      getEntriesByType: vi.fn((type) => mockEntries.filter(e => e.entryType === type)),
      getEntriesByName: vi.fn((name) => mockEntries.filter(e => e.name === name))
    })

    vi.stubGlobal('window', { PerformanceObserver: MockPerformanceObserver })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  describe('Basic PerformanceObserver Usage', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:79-96
    it('should create an observer and receive entries', () => {
      const receivedEntries = []
      
      const observer = new PerformanceObserver((list) => {
        receivedEntries.push(...list.getEntries())
      })
      
      observer.observe({ type: 'resource', buffered: true })
      
      simulateEntry({
        entryType: 'resource',
        name: 'https://example.com/app.js',
        duration: 245.30
      })
      
      expect(receivedEntries.length).toBe(1)
      expect(receivedEntries[0].name).toBe('https://example.com/app.js')
    })

    it('should handle multiple entry types with entryTypes option', () => {
      const receivedEntries = []
      
      const observer = new PerformanceObserver((list) => {
        receivedEntries.push(...list.getEntries())
      })
      
      observer.observe({ entryTypes: ['resource', 'navigation'] })
      
      simulateEntry({ entryType: 'resource', name: 'script.js' })
      simulateEntry({ entryType: 'navigation', name: 'page' })
      simulateEntry({ entryType: 'paint', name: 'first-paint' })
      
      expect(receivedEntries.length).toBe(2)
    })
  })

  describe('Checking Supported Entry Types', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:120-126
    it('should expose supportedEntryTypes static property', () => {
      const supportedTypes = PerformanceObserver.supportedEntryTypes
      
      expect(Array.isArray(supportedTypes)).toBe(true)
      expect(supportedTypes).toContain('resource')
      expect(supportedTypes).toContain('navigation')
      expect(supportedTypes).toContain('paint')
      expect(supportedTypes).toContain('largest-contentful-paint')
      expect(supportedTypes).toContain('layout-shift')
      expect(supportedTypes).toContain('longtask')
    })
  })

  describe('Resource Timing', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:148-169
    it('should observe resource timing entries with detailed breakdown', () => {
      const results = []
      
      const resourceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          results.push({
            name: entry.name,
            duration: entry.duration,
            dns: entry.domainLookupEnd - entry.domainLookupStart,
            tcp: entry.connectEnd - entry.connectStart,
            ttfb: entry.responseStart - entry.requestStart,
            download: entry.responseEnd - entry.responseStart
          })
        })
      })
      
      resourceObserver.observe({ type: 'resource', buffered: true })
      
      simulateEntry({
        entryType: 'resource',
        name: 'https://example.com/app.js',
        startTime: 100,
        duration: 245.30,
        domainLookupStart: 100,
        domainLookupEnd: 120,
        connectStart: 120,
        connectEnd: 150,
        requestStart: 150,
        responseStart: 200,
        responseEnd: 345.30
      })
      
      expect(results.length).toBe(1)
      expect(results[0].name).toBe('https://example.com/app.js')
      expect(results[0].dns).toBe(20)
      expect(results[0].tcp).toBe(30)
      expect(results[0].ttfb).toBe(50)
      expect(results[0].download).toBeCloseTo(145.30)
    })
  })

  describe('Navigation Timing', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:173-194
    it('should observe navigation timing entries', () => {
      const metrics = {}
      
      const navObserver = new PerformanceObserver((list) => {
        const entry = list.getEntries()[0]
        
        metrics.dns = entry.domainLookupEnd - entry.domainLookupStart
        metrics.tcp = entry.connectEnd - entry.connectStart
        metrics.ttfb = entry.responseStart - entry.startTime
        metrics.domParsing = entry.domInteractive - entry.responseEnd
        metrics.domComplete = entry.domComplete - entry.startTime
        metrics.loadComplete = entry.loadEventEnd - entry.startTime
      })
      
      navObserver.observe({ type: 'navigation', buffered: true })
      
      simulateEntry({
        entryType: 'navigation',
        name: 'https://example.com/',
        startTime: 0,
        domainLookupStart: 10,
        domainLookupEnd: 30,
        connectStart: 30,
        connectEnd: 60,
        responseStart: 100,
        responseEnd: 200,
        domInteractive: 400,
        domComplete: 800,
        loadEventEnd: 1000
      })
      
      expect(metrics.dns).toBe(20)
      expect(metrics.tcp).toBe(30)
      expect(metrics.ttfb).toBe(100)
      expect(metrics.domParsing).toBe(200)
      expect(metrics.domComplete).toBe(800)
      expect(metrics.loadComplete).toBe(1000)
    })
  })

  describe('Paint Timing', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:198-210
    it('should observe paint timing entries', () => {
      const paintEvents = []
      
      const paintObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          paintEvents.push({
            name: entry.name,
            startTime: entry.startTime
          })
        })
      })
      
      paintObserver.observe({ type: 'paint', buffered: true })
      
      simulateEntry({
        entryType: 'paint',
        name: 'first-paint',
        startTime: 245.5
      })
      
      simulateEntry({
        entryType: 'paint',
        name: 'first-contentful-paint',
        startTime: 312.8
      })
      
      expect(paintEvents.length).toBe(2)
      expect(paintEvents[0].name).toBe('first-paint')
      expect(paintEvents[0].startTime).toBe(245.5)
      expect(paintEvents[1].name).toBe('first-contentful-paint')
      expect(paintEvents[1].startTime).toBe(312.8)
    })
  })

  describe('Core Web Vitals - LCP', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:220-242
    it('should measure Largest Contentful Paint and rate as Good', () => {
      let lcpValue = null
      let lcpRating = null
      
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        
        lcpValue = lastEntry.startTime
        
        if (lastEntry.startTime <= 2500) {
          lcpRating = 'Good'
        } else if (lastEntry.startTime <= 4000) {
          lcpRating = 'Needs Improvement'
        } else {
          lcpRating = 'Poor'
        }
      })
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      
      simulateEntry({
        entryType: 'largest-contentful-paint',
        startTime: 1500,
        size: 50000
      })
      
      expect(lcpValue).toBe(1500)
      expect(lcpRating).toBe('Good')
    })

    it('should rate LCP as Needs Improvement between 2.5s and 4s', () => {
      let lcpRating = null
      
      const lcpObserver = new PerformanceObserver((list) => {
        const lastEntry = list.getEntries()[list.getEntries().length - 1]
        
        if (lastEntry.startTime <= 2500) {
          lcpRating = 'Good'
        } else if (lastEntry.startTime <= 4000) {
          lcpRating = 'Needs Improvement'
        } else {
          lcpRating = 'Poor'
        }
      })
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      
      simulateEntry({
        entryType: 'largest-contentful-paint',
        startTime: 3000
      })
      
      expect(lcpRating).toBe('Needs Improvement')
    })

    it('should rate LCP as Poor above 4s', () => {
      let lcpRating = null
      
      const lcpObserver = new PerformanceObserver((list) => {
        const lastEntry = list.getEntries()[list.getEntries().length - 1]
        
        if (lastEntry.startTime <= 2500) {
          lcpRating = 'Good'
        } else if (lastEntry.startTime <= 4000) {
          lcpRating = 'Needs Improvement'
        } else {
          lcpRating = 'Poor'
        }
      })
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })
      
      simulateEntry({
        entryType: 'largest-contentful-paint',
        startTime: 5000
      })
      
      expect(lcpRating).toBe('Poor')
    })
  })

  describe('Core Web Vitals - CLS', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:246-267
    it('should measure Cumulative Layout Shift', () => {
      let clsValue = 0
      
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
      })
      
      clsObserver.observe({ type: 'layout-shift', buffered: true })
      
      simulateEntry({
        entryType: 'layout-shift',
        value: 0.05,
        hadRecentInput: false
      })
      
      simulateEntry({
        entryType: 'layout-shift',
        value: 0.03,
        hadRecentInput: false
      })
      
      expect(clsValue).toBeCloseTo(0.08)
    })

    it('should ignore layout shifts with recent user input', () => {
      let clsValue = 0
      
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
      })
      
      clsObserver.observe({ type: 'layout-shift', buffered: true })
      
      simulateEntry({
        entryType: 'layout-shift',
        value: 0.05,
        hadRecentInput: false
      })
      
      simulateEntry({
        entryType: 'layout-shift',
        value: 0.10,
        hadRecentInput: true
      })
      
      expect(clsValue).toBeCloseTo(0.05)
    })
  })

  describe('Core Web Vitals - INP', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:271-291
    it('should measure Interaction to Next Paint (worst interaction)', () => {
      let maxINP = 0
      
      const inpObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > maxINP) {
            maxINP = entry.duration
          }
        })
      })
      
      inpObserver.observe({ type: 'event', buffered: true, durationThreshold: 40 })
      
      simulateEntry({ entryType: 'event', name: 'click', duration: 80 })
      simulateEntry({ entryType: 'event', name: 'keydown', duration: 150 })
      simulateEntry({ entryType: 'event', name: 'click', duration: 50 })
      
      expect(maxINP).toBe(150)
    })
  })

  describe('Core Web Vitals - FCP', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:295-316
    it('should measure First Contentful Paint', () => {
      let fcpValue = null
      let fcpRating = null
      
      const fcpObserver = new PerformanceObserver((list) => {
        const fcp = list.getEntries().find(entry => entry.name === 'first-contentful-paint')
        
        if (fcp) {
          fcpValue = fcp.startTime
          
          if (fcp.startTime <= 1800) {
            fcpRating = 'Good'
          } else if (fcp.startTime <= 3000) {
            fcpRating = 'Needs Improvement'
          } else {
            fcpRating = 'Poor'
          }
        }
      })
      
      fcpObserver.observe({ type: 'paint', buffered: true })
      
      simulateEntry({
        entryType: 'paint',
        name: 'first-contentful-paint',
        startTime: 1200
      })
      
      expect(fcpValue).toBe(1200)
      expect(fcpRating).toBe('Good')
    })
  })

  describe('Core Web Vitals - TTFB', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:320-342
    it('should measure Time to First Byte with breakdown', () => {
      let ttfb = null
      let breakdown = {}
      
      const ttfbObserver = new PerformanceObserver((list) => {
        const entry = list.getEntries()[0]
        ttfb = entry.responseStart - entry.startTime
        
        breakdown = {
          dns: entry.domainLookupEnd - entry.domainLookupStart,
          connection: entry.connectEnd - entry.connectStart,
          waiting: entry.responseStart - entry.requestStart
        }
      })
      
      ttfbObserver.observe({ type: 'navigation', buffered: true })
      
      simulateEntry({
        entryType: 'navigation',
        startTime: 0,
        domainLookupStart: 10,
        domainLookupEnd: 50,
        connectStart: 50,
        connectEnd: 100,
        requestStart: 100,
        responseStart: 300
      })
      
      expect(ttfb).toBe(300)
      expect(breakdown.dns).toBe(40)
      expect(breakdown.connection).toBe(50)
      expect(breakdown.waiting).toBe(200)
    })
  })

  describe('Custom Performance Marks and Measures', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:376-393
    it('should create custom marks and measures', () => {
      performance.mark('api-call-start')
      performance.mark('api-call-end')
      performance.measure('api-call', 'api-call-start', 'api-call-end')
      
      expect(performance.mark).toHaveBeenCalledWith('api-call-start')
      expect(performance.mark).toHaveBeenCalledWith('api-call-end')
      expect(performance.measure).toHaveBeenCalledWith('api-call', 'api-call-start', 'api-call-end')
    })

    it('should observe custom measures', () => {
      const customMetrics = []
      
      const customObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          customMetrics.push({ name: entry.name, duration: entry.duration })
        })
      })
      
      customObserver.observe({ type: 'measure', buffered: true })
      
      simulateEntry({
        entryType: 'measure',
        name: 'api-call',
        startTime: 0,
        duration: 245.3
      })
      
      expect(customMetrics.length).toBe(1)
      expect(customMetrics[0].name).toBe('api-call')
      expect(customMetrics[0].duration).toBe(245.3)
    })
  })

  describe('Long Tasks', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:426-445
    it('should detect long tasks blocking the main thread (>50ms)', () => {
      const longTasks = []
      
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          longTasks.push({ duration: entry.duration, startTime: entry.startTime })
        })
      })
      
      longTaskObserver.observe({ type: 'longtask', buffered: true })
      
      simulateEntry({
        entryType: 'longtask',
        startTime: 1000,
        duration: 150
      })
      
      expect(longTasks.length).toBe(1)
      expect(longTasks[0].duration).toBe(150)
    })
  })

  describe('Observer Methods', () => {
    describe('disconnect()', () => {
      // Source: docs/beyond/concepts/performance-observer.mdx:553-567
      it('should stop receiving entries after disconnect', () => {
        const receivedEntries = []
        
        const observer = new PerformanceObserver((list) => {
          receivedEntries.push(...list.getEntries())
        })
        
        observer.observe({ type: 'resource', buffered: true })
        
        simulateEntry({ entryType: 'resource', name: 'before.js' })
        expect(receivedEntries.length).toBe(1)
        
        observer.disconnect()
        
        simulateEntry({ entryType: 'resource', name: 'after.js' })
        expect(receivedEntries.length).toBe(1)
      })
    })

    describe('takeRecords()', () => {
      // Source: docs/beyond/concepts/performance-observer.mdx:571-583
      it('should return pending entries and clear buffer', () => {
        mockEntries = [
          { entryType: 'resource', name: 'script.js', duration: 100 },
          { entryType: 'resource', name: 'style.css', duration: 50 }
        ]
        
        const observer = new PerformanceObserver(() => {})
        observer.observe({ type: 'resource', buffered: true })
        
        const pending = observer.takeRecords()
        
        expect(pending.length).toBe(2)
        expect(observer.takeRecords().length).toBe(0)
      })
    })
  })

  describe('Browser Support Check', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:622-635
    it('should check for PerformanceObserver support before using', () => {
      const safeObserve = (type, callback) => {
        if ('PerformanceObserver' in window) {
          if (PerformanceObserver.supportedEntryTypes.includes(type)) {
            const observer = new PerformanceObserver(callback)
            observer.observe({ type, buffered: true })
            return observer
          }
        }
        return null
      }
      
      const observer = safeObserve('largest-contentful-paint', vi.fn())
      expect(observer).not.toBeNull()
    })

    it('should return null for unsupported entry types', () => {
      const safeObserve = (type, callback) => {
        if ('PerformanceObserver' in window) {
          if (PerformanceObserver.supportedEntryTypes.includes(type)) {
            const observer = new PerformanceObserver(callback)
            observer.observe({ type, buffered: true })
            return observer
          }
        }
        return null
      }
      
      const observer = safeObserve('unsupported-type', vi.fn())
      expect(observer).toBeNull()
    })
  })

  describe('Simple RUM Implementation', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:464-524
    it('should collect multiple metrics into a single object', () => {
      class PerformanceMonitor {
        constructor() {
          this.metrics = {}
          this.observers = []
        }
        
        observe(type, callback) {
          const observer = new PerformanceObserver((list) => {
            callback(list.getEntries())
          })
          observer.observe({ type, buffered: true })
          this.observers.push(observer)
        }
        
        disconnect() {
          this.observers.forEach(obs => obs.disconnect())
        }
      }
      
      const monitor = new PerformanceMonitor()
      
      monitor.observe('largest-contentful-paint', (entries) => {
        const lastEntry = entries[entries.length - 1]
        monitor.metrics.lcp = lastEntry.startTime
      })
      
      monitor.observe('paint', (entries) => {
        const fcp = entries.find(e => e.name === 'first-contentful-paint')
        if (fcp) {
          monitor.metrics.fcp = fcp.startTime
        }
      })
      
      simulateEntry({ entryType: 'largest-contentful-paint', startTime: 2000 })
      simulateEntry({ entryType: 'paint', name: 'first-contentful-paint', startTime: 800 })
      
      expect(monitor.metrics.lcp).toBe(2000)
      expect(monitor.metrics.fcp).toBe(800)
      
      monitor.disconnect()
    })
  })

  describe('Sampling Pattern', () => {
    // Source: docs/beyond/concepts/performance-observer.mdx:637-650
    it('should demonstrate sampling pattern for production', () => {
      let observerCreated = false
      const shouldSample = true
      
      if (shouldSample) {
        const observer = new PerformanceObserver(() => {})
        observer.observe({ type: 'resource', buffered: true })
        observerCreated = true
      }
      
      expect(observerCreated).toBe(true)
    })

    it('should skip observer creation when not sampled', () => {
      let observerCreated = false
      const shouldSample = false
      
      if (shouldSample) {
        const observer = new PerformanceObserver(() => {})
        observer.observe({ type: 'resource', buffered: true })
        observerCreated = true
      }
      
      expect(observerCreated).toBe(false)
    })
  })
})
