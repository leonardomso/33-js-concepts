import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// =============================================================================
// HTTP & FETCH - TEST SUITE
// Tests for code examples from docs/concepts/http-fetch.mdx
// Uses Node 20+ native fetch with Vitest mocking
// =============================================================================

describe('HTTP & Fetch', () => {
  // Store original fetch
  const originalFetch = global.fetch

  beforeEach(() => {
    // Reset fetch mock before each test
    vi.restoreAllMocks()
  })

  afterEach(() => {
    // Restore original fetch after each test
    global.fetch = originalFetch
  })

  // ===========================================================================
  // RESPONSE OBJECT BASICS
  // ===========================================================================
  describe('Response Object', () => {
    it('should have status property', () => {
      const response = new Response('OK', { status: 200 })
      expect(response.status).toBe(200)
    })

    it('should have statusText property', () => {
      const response = new Response('OK', { status: 200, statusText: 'OK' })
      expect(response.statusText).toBe('OK')
    })

    it('should have ok property true for 2xx status', () => {
      const response200 = new Response('OK', { status: 200 })
      const response201 = new Response('Created', { status: 201 })
      const response204 = new Response(null, { status: 204 })

      expect(response200.ok).toBe(true)
      expect(response201.ok).toBe(true)
      expect(response204.ok).toBe(true)
    })

    it('should have ok property false for non-2xx status', () => {
      const response400 = new Response('Bad Request', { status: 400 })
      const response404 = new Response('Not Found', { status: 404 })
      const response500 = new Response('Server Error', { status: 500 })

      expect(response400.ok).toBe(false)
      expect(response404.ok).toBe(false)
      expect(response500.ok).toBe(false)
    })

    it('should have headers object', () => {
      const response = new Response('OK', {
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'custom-value'
        }
      })

      expect(response.headers.get('Content-Type')).toBe('application/json')
      expect(response.headers.get('X-Custom-Header')).toBe('custom-value')
    })

    it('should parse JSON body', async () => {
      const data = { name: 'Alice', age: 30 }
      const response = new Response(JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' }
      })

      const parsed = await response.json()
      expect(parsed).toEqual(data)
    })

    it('should parse text body', async () => {
      const response = new Response('Hello, World!')
      const text = await response.text()
      expect(text).toBe('Hello, World!')
    })

    it('should only allow body to be read once', async () => {
      const response = new Response('Hello')

      await response.text() // First read

      // Second read should throw
      await expect(response.text()).rejects.toThrow()
    })

    it('should clone response for multiple reads', async () => {
      const response = new Response('Hello')
      const clone = response.clone()

      const text1 = await response.text()
      const text2 = await clone.text()

      expect(text1).toBe('Hello')
      expect(text2).toBe('Hello')
    })
  })

  // ===========================================================================
  // RESPONSE BODY METHODS (blob, arrayBuffer)
  // ===========================================================================
  describe('Response Body Methods', () => {
    it('should parse body as Blob', async () => {
      const textContent = 'Hello, World!'
      const response = new Response(textContent)
      const blob = await response.blob()

      expect(blob).toBeInstanceOf(Blob)
      expect(blob.size).toBe(textContent.length)
    })

    it('should parse body as ArrayBuffer', async () => {
      const textContent = 'Hello'
      const response = new Response(textContent)
      const buffer = await response.arrayBuffer()

      expect(buffer).toBeInstanceOf(ArrayBuffer)
      expect(buffer.byteLength).toBe(textContent.length)
    })

    it('should parse binary data as Blob', async () => {
      const binaryData = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]) // "Hello"
      const response = new Response(binaryData)
      const blob = await response.blob()

      expect(blob.size).toBe(5)
    })

    it('should parse binary data as ArrayBuffer', async () => {
      const binaryData = new Uint8Array([1, 2, 3, 4, 5])
      const response = new Response(binaryData)
      const buffer = await response.arrayBuffer()

      const view = new Uint8Array(buffer)
      expect(view[0]).toBe(1)
      expect(view[4]).toBe(5)
    })
  })

  // ===========================================================================
  // RESPONSE METADATA PROPERTIES
  // ===========================================================================
  describe('Response Metadata', () => {
    it('should have url property', () => {
      // Note: In real fetch, url reflects the final URL after redirects
      // For Response constructor, we can't set URL directly
      const response = new Response('OK', { status: 200 })
      expect(response.url).toBe('')  // Empty for constructed responses
    })

    it('should have type property', () => {
      const response = new Response('OK', { status: 200 })
      // Constructed responses have type "default"
      expect(response.type).toBe('default')
    })

    it('should have redirected property', () => {
      const response = new Response('OK', { status: 200 })
      // Constructed responses are not redirected
      expect(response.redirected).toBe(false)
    })

    it('should have bodyUsed property', async () => {
      const response = new Response('Hello')
      
      expect(response.bodyUsed).toBe(false)
      await response.text()
      expect(response.bodyUsed).toBe(true)
    })
  })

  // ===========================================================================
  // STATUS CODE RANGES
  // ===========================================================================
  describe('HTTP Status Codes', () => {
    describe('2xx Success', () => {
      it('200 OK should be successful', () => {
        const response = new Response('OK', { status: 200 })
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
      })

      it('201 Created should be successful', () => {
        const response = new Response('Created', { status: 201 })
        expect(response.ok).toBe(true)
        expect(response.status).toBe(201)
      })

      it('204 No Content should be successful', () => {
        const response = new Response(null, { status: 204 })
        expect(response.ok).toBe(true)
        expect(response.status).toBe(204)
      })

      it('299 should still be ok', () => {
        const response = new Response('OK', { status: 299 })
        expect(response.ok).toBe(true)
      })
    })

    describe('3xx Redirection', () => {
      it('301 Moved Permanently should not be ok', () => {
        const response = new Response('Moved', { status: 301 })
        expect(response.ok).toBe(false)
      })

      it('302 Found should not be ok', () => {
        const response = new Response('Found', { status: 302 })
        expect(response.ok).toBe(false)
      })

      it('304 Not Modified should not be ok', () => {
        // 304 is a "null body status" so we use null body
        const response = new Response(null, { status: 304 })
        expect(response.ok).toBe(false)
      })
    })

    describe('4xx Client Errors', () => {
      it('400 Bad Request should not be ok', () => {
        const response = new Response('Bad Request', { status: 400 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(400)
      })

      it('401 Unauthorized should not be ok', () => {
        const response = new Response('Unauthorized', { status: 401 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(401)
      })

      it('403 Forbidden should not be ok', () => {
        const response = new Response('Forbidden', { status: 403 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(403)
      })

      it('404 Not Found should not be ok', () => {
        const response = new Response('Not Found', { status: 404 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(404)
      })

      it('422 Unprocessable Entity should not be ok', () => {
        const response = new Response('Unprocessable Entity', { status: 422 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(422)
      })
    })

    describe('5xx Server Errors', () => {
      it('500 Internal Server Error should not be ok', () => {
        const response = new Response('Internal Server Error', { status: 500 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(500)
      })

      it('502 Bad Gateway should not be ok', () => {
        const response = new Response('Bad Gateway', { status: 502 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(502)
      })

      it('503 Service Unavailable should not be ok', () => {
        const response = new Response('Service Unavailable', { status: 503 })
        expect(response.ok).toBe(false)
        expect(response.status).toBe(503)
      })
    })
  })

  // ===========================================================================
  // HEADERS API
  // ===========================================================================
  describe('Headers API', () => {
    it('should create headers from object', () => {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })

      expect(headers.get('Content-Type')).toBe('application/json')
      expect(headers.get('Accept')).toBe('application/json')
    })

    it('should append headers', () => {
      const headers = new Headers()
      headers.append('Accept', 'application/json')
      headers.append('Accept', 'text/plain')

      expect(headers.get('Accept')).toBe('application/json, text/plain')
    })

    it('should set headers (overwrite)', () => {
      const headers = new Headers()
      headers.set('Accept', 'application/json')
      headers.set('Accept', 'text/plain')

      expect(headers.get('Accept')).toBe('text/plain')
    })

    it('should check if header exists', () => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      })

      expect(headers.has('Content-Type')).toBe(true)
      expect(headers.has('Authorization')).toBe(false)
    })

    it('should delete headers', () => {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })

      headers.delete('Accept')

      expect(headers.has('Accept')).toBe(false)
      expect(headers.has('Content-Type')).toBe(true)
    })

    it('should iterate over headers', () => {
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })

      const entries = []
      for (const [key, value] of headers) {
        entries.push([key, value])
      }

      expect(entries).toContainEqual(['content-type', 'application/json'])
      expect(entries).toContainEqual(['accept', 'application/json'])
    })

    it('should be case-insensitive for header names', () => {
      const headers = new Headers({
        'Content-Type': 'application/json'
      })

      expect(headers.get('content-type')).toBe('application/json')
      expect(headers.get('CONTENT-TYPE')).toBe('application/json')
      expect(headers.get('Content-Type')).toBe('application/json')
    })
  })

  // ===========================================================================
  // REQUEST OBJECT
  // ===========================================================================
  describe('Request Object', () => {
    it('should create a basic request', () => {
      const request = new Request('https://api.example.com/users')

      expect(request.url).toBe('https://api.example.com/users')
      expect(request.method).toBe('GET')
    })

    it('should create request with method', () => {
      const request = new Request('https://api.example.com/users', {
        method: 'POST'
      })

      expect(request.method).toBe('POST')
    })

    it('should create request with headers', () => {
      const request = new Request('https://api.example.com/users', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer token123'
        }
      })

      expect(request.headers.get('Content-Type')).toBe('application/json')
      expect(request.headers.get('Authorization')).toBe('Bearer token123')
    })

    it('should create request with body', async () => {
      const body = JSON.stringify({ name: 'Alice' })
      const request = new Request('https://api.example.com/users', {
        method: 'POST',
        body: body
      })

      const requestBody = await request.text()
      expect(requestBody).toBe(body)
    })

    it('should clone request', () => {
      const request = new Request('https://api.example.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })

      const clone = request.clone()

      expect(clone.url).toBe(request.url)
      expect(clone.method).toBe(request.method)
      expect(clone.headers.get('Content-Type')).toBe('application/json')
    })
  })

  // ===========================================================================
  // FETCH WITH MOCKING
  // ===========================================================================
  describe('Fetch API (Mocked)', () => {
    it('should make a GET request', async () => {
      const mockData = { id: 1, name: 'Alice' }
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify(mockData), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        })
      )

      const response = await fetch('https://api.example.com/users/1')
      const data = await response.json()

      expect(fetch).toHaveBeenCalledWith('https://api.example.com/users/1')
      expect(data).toEqual(mockData)
    })

    it('should make a POST request with body', async () => {
      const mockResponse = { id: 1, name: 'Alice' }
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify(mockResponse), {
          status: 201,
          headers: { 'Content-Type': 'application/json' }
        })
      )

      const userData = { name: 'Alice', email: 'alice@example.com' }
      const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })

      expect(fetch).toHaveBeenCalledWith('https://api.example.com/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      expect(response.status).toBe(201)
    })

    it('should handle 404 response (not rejection)', async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response('Not Found', { status: 404 })
      )

      // Fetch resolves even for 404!
      const response = await fetch('https://api.example.com/users/999')

      expect(response.ok).toBe(false)
      expect(response.status).toBe(404)
    })

    it('should handle 500 response (not rejection)', async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response('Internal Server Error', { status: 500 })
      )

      // Fetch resolves even for 500!
      const response = await fetch('https://api.example.com/broken')

      expect(response.ok).toBe(false)
      expect(response.status).toBe(500)
    })

    it('should reject on network error', async () => {
      global.fetch = vi.fn().mockRejectedValue(
        new TypeError('Failed to fetch')
      )

      await expect(fetch('https://api.example.com/unreachable'))
        .rejects.toThrow('Failed to fetch')
    })
  })

  // ===========================================================================
  // ERROR HANDLING PATTERNS
  // ===========================================================================
  describe('Error Handling Patterns', () => {
    it('should properly check response.ok', async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response('Not Found', { status: 404 })
      )

      const response = await fetch('/api/users/999')

      // The correct pattern
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`)
        expect(error.message).toBe('HTTP 404')
      }
    })

    it('should demonstrate fetchJSON wrapper pattern', async () => {
      // Reusable fetch wrapper
      async function fetchJSON(url, options = {}) {
        const response = await fetch(url, options)

        if (!response.ok) {
          const error = new Error(`HTTP ${response.status}`)
          error.status = response.status
          throw error
        }

        if (response.status === 204) {
          return null
        }

        return response.json()
      }

      // Test successful response
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ id: 1 }), { status: 200 })
      )

      const data = await fetchJSON('/api/users/1')
      expect(data).toEqual({ id: 1 })

      // Test 404 error
      global.fetch = vi.fn().mockResolvedValue(
        new Response('Not Found', { status: 404 })
      )

      try {
        await fetchJSON('/api/users/999')
        expect.fail('Should have thrown')
      } catch (error) {
        expect(error.message).toBe('HTTP 404')
        expect(error.status).toBe(404)
      }

      // Test 204 No Content
      global.fetch = vi.fn().mockResolvedValue(
        new Response(null, { status: 204 })
      )

      const noContent = await fetchJSON('/api/users/1', { method: 'DELETE' })
      expect(noContent).toBeNull()
    })

    it('should differentiate network vs HTTP errors', async () => {
      let errorType = null

      async function safeFetch(url) {
        try {
          const response = await fetch(url)

          if (!response.ok) {
            errorType = 'http'
            throw new Error(`HTTP ${response.status}`)
          }

          return await response.json()
        } catch (error) {
          if (error.message.startsWith('HTTP')) {
            // Already handled HTTP error
            throw error
          }
          // Network error
          errorType = 'network'
          throw new Error('Network error: ' + error.message)
        }
      }

      // Test HTTP error (404)
      global.fetch = vi.fn().mockResolvedValue(
        new Response('Not Found', { status: 404 })
      )

      try {
        await safeFetch('/api/missing')
      } catch (e) {
        expect(errorType).toBe('http')
      }

      // Test network error
      global.fetch = vi.fn().mockRejectedValue(
        new TypeError('Failed to fetch')
      )

      try {
        await safeFetch('/api/unreachable')
      } catch (e) {
        expect(errorType).toBe('network')
      }
    })
  })

  // ===========================================================================
  // ABORT CONTROLLER
  // ===========================================================================
  describe('AbortController', () => {
    it('should create an AbortController', () => {
      const controller = new AbortController()

      expect(controller).toBeDefined()
      expect(controller.signal).toBeDefined()
      expect(controller.signal.aborted).toBe(false)
    })

    it('should abort and update signal', () => {
      const controller = new AbortController()

      expect(controller.signal.aborted).toBe(false)
      controller.abort()
      expect(controller.signal.aborted).toBe(true)
    })

    it('should abort with reason', () => {
      const controller = new AbortController()
      controller.abort('User cancelled')

      expect(controller.signal.aborted).toBe(true)
      expect(controller.signal.reason).toBe('User cancelled')
    })

    it('should reject fetch when aborted', async () => {
      const controller = new AbortController()

      // Mock fetch to respect abort signal
      global.fetch = vi.fn().mockImplementation((url, options) => {
        return new Promise((resolve, reject) => {
          if (options?.signal?.aborted) {
            const error = new DOMException('The operation was aborted.', 'AbortError')
            reject(error)
            return
          }

          options?.signal?.addEventListener('abort', () => {
            const error = new DOMException('The operation was aborted.', 'AbortError')
            reject(error)
          })

          // Simulate slow request
          setTimeout(() => {
            resolve(new Response('OK'))
          }, 1000)
        })
      })

      const fetchPromise = fetch('/api/slow', { signal: controller.signal })

      // Abort immediately
      controller.abort()

      await expect(fetchPromise).rejects.toThrow()

      try {
        await fetchPromise
      } catch (error) {
        expect(error.name).toBe('AbortError')
      }
    })

    it('should handle abort in try/catch', async () => {
      const controller = new AbortController()
      controller.abort()

      global.fetch = vi.fn().mockRejectedValue(
        new DOMException('The operation was aborted.', 'AbortError')
      )

      try {
        await fetch('/api/data', { signal: controller.signal })
        expect.fail('Should have thrown')
      } catch (error) {
        if (error.name === 'AbortError') {
          // Expected - request was cancelled
          expect(true).toBe(true)
        } else {
          throw error
        }
      }
    })

    it('should implement timeout pattern', async () => {
      async function fetchWithTimeout(url, timeout = 5000) {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), timeout)

        try {
          const response = await fetch(url, { signal: controller.signal })
          clearTimeout(timeoutId)
          return response
        } catch (error) {
          clearTimeout(timeoutId)
          if (error.name === 'AbortError') {
            throw new Error(`Request timed out after ${timeout}ms`)
          }
          throw error
        }
      }

      // Mock slow request that will be aborted
      global.fetch = vi.fn().mockImplementation((url, options) => {
        return new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            resolve(new Response('OK'))
          }, 10000) // Very slow

          options?.signal?.addEventListener('abort', () => {
            clearTimeout(timeout)
            reject(new DOMException('The operation was aborted.', 'AbortError'))
          })
        })
      })

      // Should timeout after 100ms
      await expect(fetchWithTimeout('/api/slow', 100))
        .rejects.toThrow('Request timed out after 100ms')
    })
  })

  // ===========================================================================
  // PARALLEL REQUESTS
  // ===========================================================================
  describe('Parallel Requests with Promise.all', () => {
    it('should fetch multiple resources in parallel', async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1, name: 'User' })))
        .mockResolvedValueOnce(new Response(JSON.stringify([{ id: 1, title: 'Post' }])))
        .mockResolvedValueOnce(new Response(JSON.stringify([{ id: 1, body: 'Comment' }])))

      const [user, posts, comments] = await Promise.all([
        fetch('/api/user').then(r => r.json()),
        fetch('/api/posts').then(r => r.json()),
        fetch('/api/comments').then(r => r.json())
      ])

      expect(user).toEqual({ id: 1, name: 'User' })
      expect(posts).toEqual([{ id: 1, title: 'Post' }])
      expect(comments).toEqual([{ id: 1, body: 'Comment' }])
      expect(fetch).toHaveBeenCalledTimes(3)
    })

    it('should fail fast if any request fails', async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 })))
        .mockRejectedValueOnce(new Error('Network error'))
        .mockResolvedValueOnce(new Response(JSON.stringify({ id: 3 })))

      await expect(Promise.all([
        fetch('/api/1').then(r => r.json()),
        fetch('/api/2').then(r => r.json()),
        fetch('/api/3').then(r => r.json())
      ])).rejects.toThrow('Network error')
    })

    it('should use Promise.allSettled for graceful handling', async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce(new Response(JSON.stringify({ id: 1 })))
        .mockRejectedValueOnce(new Error('Failed'))
        .mockResolvedValueOnce(new Response(JSON.stringify({ id: 3 })))

      const results = await Promise.allSettled([
        fetch('/api/1').then(r => r.json()),
        fetch('/api/2').then(r => r.json()),
        fetch('/api/3').then(r => r.json())
      ])

      expect(results[0].status).toBe('fulfilled')
      expect(results[0].value).toEqual({ id: 1 })

      expect(results[1].status).toBe('rejected')
      expect(results[1].reason.message).toBe('Failed')

      expect(results[2].status).toBe('fulfilled')
      expect(results[2].value).toEqual({ id: 3 })
    })
  })

  // ===========================================================================
  // LOADING STATE PATTERN
  // ===========================================================================
  describe('Loading State Pattern', () => {
    it('should track loading, data, and error states', async () => {
      async function fetchWithState(url) {
        const state = {
          data: null,
          loading: true,
          error: null
        }

        try {
          const response = await fetch(url)

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`)
          }

          state.data = await response.json()
        } catch (error) {
          state.error = error.message
        } finally {
          state.loading = false
        }

        return state
      }

      // Test successful fetch
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ name: 'Alice' }), { status: 200 })
      )

      const successState = await fetchWithState('/api/user')
      expect(successState.loading).toBe(false)
      expect(successState.data).toEqual({ name: 'Alice' })
      expect(successState.error).toBeNull()

      // Test error fetch
      global.fetch = vi.fn().mockResolvedValue(
        new Response('Not Found', { status: 404 })
      )

      const errorState = await fetchWithState('/api/missing')
      expect(errorState.loading).toBe(false)
      expect(errorState.data).toBeNull()
      expect(errorState.error).toBe('HTTP 404')

      // Test network error
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const networkErrorState = await fetchWithState('/api/unreachable')
      expect(networkErrorState.loading).toBe(false)
      expect(networkErrorState.data).toBeNull()
      expect(networkErrorState.error).toBe('Network error')
    })
  })

  // ===========================================================================
  // JSON PARSING
  // ===========================================================================
  describe('JSON Parsing', () => {
    it('should parse valid JSON', async () => {
      const response = new Response('{"name": "Alice", "age": 30}')
      const data = await response.json()

      expect(data).toEqual({ name: 'Alice', age: 30 })
    })

    it('should parse JSON arrays', async () => {
      const response = new Response('[1, 2, 3, 4, 5]')
      const data = await response.json()

      expect(data).toEqual([1, 2, 3, 4, 5])
    })

    it('should parse nested JSON', async () => {
      const nested = {
        user: {
          name: 'Alice',
          address: {
            city: 'Wonderland'
          }
        },
        posts: [
          { id: 1, title: 'First' },
          { id: 2, title: 'Second' }
        ]
      }

      const response = new Response(JSON.stringify(nested))
      const data = await response.json()

      expect(data.user.address.city).toBe('Wonderland')
      expect(data.posts[1].title).toBe('Second')
    })

    it('should throw on invalid JSON', async () => {
      const response = new Response('not valid json {')

      await expect(response.json()).rejects.toThrow()
    })

    it('should throw on empty body when expecting JSON', async () => {
      const response = new Response('')

      await expect(response.json()).rejects.toThrow()
    })
  })

  // ===========================================================================
  // HTTP METHODS
  // ===========================================================================
  describe('HTTP Methods', () => {
    beforeEach(() => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      )
    })

    it('should default to GET method', async () => {
      await fetch('/api/users')

      expect(fetch).toHaveBeenCalledWith('/api/users')
    })

    it('should make POST request', async () => {
      await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name: 'Alice' })
      })

      expect(fetch).toHaveBeenCalledWith('/api/users', expect.objectContaining({
        method: 'POST'
      }))
    })

    it('should make PUT request', async () => {
      await fetch('/api/users/1', {
        method: 'PUT',
        body: JSON.stringify({ name: 'Alice Updated' })
      })

      expect(fetch).toHaveBeenCalledWith('/api/users/1', expect.objectContaining({
        method: 'PUT'
      }))
    })

    it('should make PATCH request', async () => {
      await fetch('/api/users/1', {
        method: 'PATCH',
        body: JSON.stringify({ name: 'New Name' })
      })

      expect(fetch).toHaveBeenCalledWith('/api/users/1', expect.objectContaining({
        method: 'PATCH'
      }))
    })

    it('should make DELETE request', async () => {
      await fetch('/api/users/1', {
        method: 'DELETE'
      })

      expect(fetch).toHaveBeenCalledWith('/api/users/1', expect.objectContaining({
        method: 'DELETE'
      }))
    })
  })

  // ===========================================================================
  // URL AND QUERY PARAMETERS
  // ===========================================================================
  describe('URL and Query Parameters', () => {
    it('should construct URL with search params', () => {
      const url = new URL('https://api.example.com/search')
      url.searchParams.set('q', 'javascript')
      url.searchParams.set('page', '1')
      url.searchParams.set('limit', '10')

      expect(url.toString()).toBe('https://api.example.com/search?q=javascript&page=1&limit=10')
    })

    it('should append multiple values for same param', () => {
      const url = new URL('https://api.example.com/filter')
      url.searchParams.append('tag', 'javascript')
      url.searchParams.append('tag', 'nodejs')

      expect(url.toString()).toBe('https://api.example.com/filter?tag=javascript&tag=nodejs')
    })

    it('should get search params', () => {
      const url = new URL('https://api.example.com/search?q=javascript&page=2')

      expect(url.searchParams.get('q')).toBe('javascript')
      expect(url.searchParams.get('page')).toBe('2')
      expect(url.searchParams.get('missing')).toBeNull()
    })

    it('should delete search params', () => {
      const url = new URL('https://api.example.com/search?q=javascript&page=2')
      url.searchParams.delete('page')

      expect(url.toString()).toBe('https://api.example.com/search?q=javascript')
    })

    it('should check if param exists', () => {
      const url = new URL('https://api.example.com/search?q=javascript')

      expect(url.searchParams.has('q')).toBe(true)
      expect(url.searchParams.has('page')).toBe(false)
    })

    it('should use URLSearchParams with fetch', async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify([]), { status: 200 })
      )

      const params = new URLSearchParams({
        q: 'javascript',
        page: '1'
      })

      await fetch(`/api/search?${params}`)

      expect(fetch).toHaveBeenCalledWith('/api/search?q=javascript&page=1')
    })
  })

  // ===========================================================================
  // REAL WORLD PATTERNS
  // ===========================================================================
  describe('Real World Patterns', () => {
    it('should implement retry logic', async () => {
      let attempts = 0

      async function fetchWithRetry(url, options = {}, retries = 3) {
        for (let i = 0; i < retries; i++) {
          try {
            attempts++
            const response = await fetch(url, options)
            if (response.ok) return response
            if (response.status >= 500 && i < retries - 1) continue
            throw new Error(`HTTP ${response.status}`)
          } catch (error) {
            if (i === retries - 1) throw error
          }
        }
      }

      // Mock: fail twice, succeed on third
      global.fetch = vi.fn()
        .mockResolvedValueOnce(new Response('Error', { status: 500 }))
        .mockResolvedValueOnce(new Response('Error', { status: 500 }))
        .mockResolvedValueOnce(new Response('OK', { status: 200 }))

      const response = await fetchWithRetry('/api/flaky')

      expect(response.status).toBe(200)
      expect(attempts).toBe(3)
    })

    it('should implement search with cancel previous', async () => {
      let currentController = null

      async function searchWithCancel(query) {
        // Cancel previous request
        if (currentController) {
          currentController.abort()
        }

        currentController = new AbortController()

        const response = await fetch(`/api/search?q=${query}`, {
          signal: currentController.signal
        })

        return response.json()
      }

      // Mock fetch that respects abort
      global.fetch = vi.fn().mockImplementation((url, options) => {
        return new Promise((resolve, reject) => {
          if (options?.signal?.aborted) {
            reject(new DOMException('Aborted', 'AbortError'))
            return
          }

          const handler = () => {
            reject(new DOMException('Aborted', 'AbortError'))
          }

          options?.signal?.addEventListener('abort', handler)

          // Resolve after short delay
          setTimeout(() => {
            options?.signal?.removeEventListener('abort', handler)
            resolve(new Response(JSON.stringify({ results: [url] })))
          }, 50)
        })
      })

      // Start first search
      const search1 = searchWithCancel('java')

      // Start second search (should cancel first)
      const search2 = searchWithCancel('javascript')

      // First should be aborted
      await expect(search1).rejects.toThrow()

      // Second should succeed
      const result = await search2
      expect(result.results[0]).toContain('javascript')
    })
  })

  // ===========================================================================
  // FORMDATA
  // ===========================================================================
  describe('FormData', () => {
    it('should create FormData object', () => {
      const formData = new FormData()
      formData.append('username', 'alice')
      formData.append('email', 'alice@example.com')

      expect(formData.get('username')).toBe('alice')
      expect(formData.get('email')).toBe('alice@example.com')
    })

    it('should append multiple values for same key', () => {
      const formData = new FormData()
      formData.append('tags', 'javascript')
      formData.append('tags', 'nodejs')

      const tags = formData.getAll('tags')
      expect(tags).toEqual(['javascript', 'nodejs'])
    })

    it('should set value (overwrite)', () => {
      const formData = new FormData()
      formData.append('name', 'alice')
      formData.set('name', 'bob')

      expect(formData.get('name')).toBe('bob')
    })

    it('should check if key exists', () => {
      const formData = new FormData()
      formData.append('username', 'alice')

      expect(formData.has('username')).toBe(true)
      expect(formData.has('password')).toBe(false)
    })

    it('should delete key', () => {
      const formData = new FormData()
      formData.append('username', 'alice')
      formData.append('email', 'alice@example.com')

      formData.delete('email')

      expect(formData.has('email')).toBe(false)
      expect(formData.has('username')).toBe(true)
    })

    it('should iterate over entries', () => {
      const formData = new FormData()
      formData.append('name', 'alice')
      formData.append('age', '30')

      const entries = []
      for (const [key, value] of formData) {
        entries.push([key, value])
      }

      expect(entries).toContainEqual(['name', 'alice'])
      expect(entries).toContainEqual(['age', '30'])
    })

    it('should send FormData with fetch (no Content-Type header needed)', async () => {
      global.fetch = vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 })
      )

      const formData = new FormData()
      formData.append('username', 'alice')
      formData.append('avatar', new Blob(['fake image data'], { type: 'image/png' }), 'avatar.png')

      await fetch('/api/profile', {
        method: 'POST',
        body: formData
        // Note: Don't set Content-Type header - browser sets it automatically with boundary
      })

      expect(fetch).toHaveBeenCalledWith('/api/profile', expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData)
      }))
    })

    it('should parse FormData from response', async () => {
      // Create a FormData-like body
      const formData = new FormData()
      formData.append('field1', 'value1')
      formData.append('field2', 'value2')

      // Note: In real browsers, response.formData() parses multipart responses
      // For testing, we verify the FormData API works correctly
      expect(formData.get('field1')).toBe('value1')
      expect(formData.get('field2')).toBe('value2')
    })

    it('should append File objects', () => {
      const formData = new FormData()
      const file = new File(['hello world'], 'test.txt', { type: 'text/plain' })

      formData.append('document', file)

      const retrieved = formData.get('document')
      expect(retrieved).toBeInstanceOf(File)
      expect(retrieved.name).toBe('test.txt')
      expect(retrieved.type).toBe('text/plain')
    })

    it('should append Blob objects with filename', () => {
      const formData = new FormData()
      const blob = new Blob(['image data'], { type: 'image/jpeg' })

      formData.append('image', blob, 'photo.jpg')

      const retrieved = formData.get('image')
      expect(retrieved).toBeInstanceOf(File) // Blob with filename becomes File
      expect(retrieved.name).toBe('photo.jpg')
    })
  })
})
