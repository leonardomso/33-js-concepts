import { describe, it, expect } from 'vitest'

describe('Web Workers', () => {
  describe('async vs CPU-bound work', () => {
    it('shows async does not make CPU loops parallel', async () => {
      const trace = []

      async function processLargeArray(data) {
        trace.push('loop-start')
        let sum = 0
        for (let i = 0; i < data.length; i++) {
          sum += data[i]
        }
        trace.push('loop-end')
        return sum
      }

      trace.push('before-call')
      const promise = processLargeArray([1, 2, 3, 4, 5])
      trace.push('after-call')

      const result = await promise

      expect(result).toBe(15)
      expect(trace).toEqual(['before-call', 'loop-start', 'loop-end', 'after-call'])
    })
  })

  describe('message-based worker model', () => {
    it('simulates postMessage/onmessage request-response flow', () => {
      function workerOnMessage(eventData) {
        const { numbers } = eventData
        const sum = numbers.reduce((a, b) => a + b, 0)
        return { sum }
      }

      const payload = { numbers: [1, 2, 3, 4, 5] }
      const response = workerOnMessage(payload)

      expect(response).toEqual({ sum: 15 })
    })
  })

  describe('transferable objects', () => {
    it('transfers ArrayBuffer ownership with structuredClone', () => {
      const buffer = new ArrayBuffer(8)
      const view = new Uint8Array(buffer)
      view[0] = 42

      const transferred = structuredClone(buffer, { transfer: [buffer] })
      const transferredView = new Uint8Array(transferred)

      expect(buffer.byteLength).toBe(0)
      expect(transferred.byteLength).toBe(8)
      expect(transferredView[0]).toBe(42)
    })
  })
})
