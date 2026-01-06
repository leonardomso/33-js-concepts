/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Blob & File API - DOM', () => {
  let container

  beforeEach(() => {
    container = document.createElement('div')
    container.id = 'test-container'
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.innerHTML = ''
    vi.restoreAllMocks()
    
    if (global.URL.revokeObjectURL.mockRestore) {
      global.URL.revokeObjectURL.mockRestore()
    }
  })

  describe('URL.createObjectURL and revokeObjectURL', () => {
    it('should create object URL from Blob', () => {
      const blob = new Blob(['Hello'], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      expect(url).toMatch(/^blob:/)
      
      URL.revokeObjectURL(url)
    })

    it('should create object URL from File', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      const url = URL.createObjectURL(file)
      
      expect(url).toMatch(/^blob:/)
      
      URL.revokeObjectURL(url)
    })
  })

  describe('Download functionality pattern', () => {
    it('should create downloadable link with Blob', () => {
      const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = 'greeting.txt'
      
      expect(link.href).toMatch(/^blob:/)
      expect(link.download).toBe('greeting.txt')
      
      URL.revokeObjectURL(url)
    })

    it('should support download attribute on anchor', () => {
      const link = document.createElement('a')
      link.download = 'test-file.json'
      
      expect(link.download).toBe('test-file.json')
    })
  })

  describe('File Input handling', () => {
    it('should create file input element', () => {
      const input = document.createElement('input')
      input.type = 'file'
      container.appendChild(input)
      
      expect(input.type).toBe('file')
      expect(input.files.length).toBe(0)
    })

    it('should support multiple file selection attribute', () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.multiple = true
      
      expect(input.multiple).toBe(true)
    })

    it('should support accept attribute for file types', () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*,.pdf'
      
      expect(input.accept).toBe('image/*,.pdf')
    })
  })

  describe('FileReader in DOM context', () => {
    it('should read Blob as text using FileReader', async () => {
      const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
      
      const result = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsText(blob)
      })
      
      expect(result).toBe('Hello, World!')
    })

    it('should read File as data URL', async () => {
      const file = new File(['test content'], 'test.txt', { type: 'text/plain' })
      
      const result = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
      })
      
      expect(result).toMatch(/^data:text\/plain;base64,/)
    })

    it('should read Blob as ArrayBuffer', async () => {
      const blob = new Blob([new Uint8Array([1, 2, 3, 4])])
      
      const result = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result)
        reader.onerror = () => reject(reader.error)
        reader.readAsArrayBuffer(blob)
      })
      
      expect(result).toBeInstanceOf(ArrayBuffer)
      expect(result.byteLength).toBe(4)
    })

    it('should have correct readyState values', async () => {
      const blob = new Blob(['test'])
      const reader = new FileReader()
      
      expect(reader.readyState).toBe(0)
      
      const promise = new Promise((resolve) => {
        reader.onloadstart = () => {
          expect(reader.readyState).toBe(1)
        }
        reader.onload = () => {
          expect(reader.readyState).toBe(2)
          resolve()
        }
      })
      
      reader.readAsText(blob)
      await promise
    })
  })

  describe('Drag and drop events', () => {
    it('should fire dragover event on element', () => {
      const dropZone = document.createElement('div')
      container.appendChild(dropZone)
      
      let dragOverFired = false
      dropZone.addEventListener('dragover', () => {
        dragOverFired = true
      })
      
      const event = new Event('dragover', { bubbles: true })
      dropZone.dispatchEvent(event)
      
      expect(dragOverFired).toBe(true)
    })

    it('should fire drop event on element', () => {
      const dropZone = document.createElement('div')
      container.appendChild(dropZone)
      
      let dropFired = false
      dropZone.addEventListener('drop', () => {
        dropFired = true
      })
      
      const event = new Event('drop', { bubbles: true })
      dropZone.dispatchEvent(event)
      
      expect(dropFired).toBe(true)
    })
  })

  describe('FormData with files', () => {
    it('should append File to FormData', () => {
      const formData = new FormData()
      const file = new File(['content'], 'upload.txt', { type: 'text/plain' })
      
      formData.append('file', file)
      
      expect(formData.has('file')).toBe(true)
      expect(formData.get('file')).toBe(file)
    })

    it('should append Blob to FormData with filename', () => {
      const formData = new FormData()
      const blob = new Blob(['content'], { type: 'text/plain' })
      
      formData.append('file', blob, 'custom-name.txt')
      
      const retrieved = formData.get('file')
      expect(retrieved.name).toBe('custom-name.txt')
    })

    it('should append multiple files with same key', () => {
      const formData = new FormData()
      
      formData.append('files', new File(['a'], 'file1.txt'))
      formData.append('files', new File(['b'], 'file2.txt'))
      
      const files = formData.getAll('files')
      expect(files.length).toBe(2)
    })
  })

  describe('Image preview pattern', () => {
    it('should set image src from blob URL', () => {
      const blob = new Blob(['fake image data'], { type: 'image/png' })
      const url = URL.createObjectURL(blob)
      
      const img = document.createElement('img')
      img.src = url
      container.appendChild(img)
      
      expect(img.src).toBe(url)
      
      URL.revokeObjectURL(url)
    })
  })

  describe('Memory management', () => {
    it('should call revokeObjectURL without error', () => {
      const blob = new Blob(['test'])
      const url = URL.createObjectURL(blob)
      
      expect(() => URL.revokeObjectURL(url)).not.toThrow()
    })

    it('should handle revoking non-existent URL', () => {
      expect(() => URL.revokeObjectURL('blob:fake-url')).not.toThrow()
    })
  })
})
