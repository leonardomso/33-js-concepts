import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

describe('Blob & File API', () => {
  // ============================================================
  // WHAT IS A BLOB IN JAVASCRIPT?
  // From blob-file-api.mdx lines 32-42
  // ============================================================

  describe('What is a Blob', () => {
    // From lines 32-40: Creating Blobs from different data types
    it('should create a Blob from a string', () => {
      const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' })
      
      expect(textBlob.size).toBe(13)
      expect(textBlob.type).toBe('text/plain')
    })

    it('should create Blobs with different MIME types', () => {
      const jsonBlob = new Blob([JSON.stringify({ name: 'Alice' })], { type: 'application/json' })
      const htmlBlob = new Blob(['<h1>Title</h1>'], { type: 'text/html' })
      
      expect(jsonBlob.type).toBe('application/json')
      expect(htmlBlob.type).toBe('text/html')
    })
  })

  // ============================================================
  // CREATING BLOBS
  // From blob-file-api.mdx lines 72-110
  // ============================================================

  describe('Creating Blobs', () => {
    describe('Basic Blob Creation', () => {
      // From lines 77-96: Basic Blob creation examples
      it('should create Blob from a single string', () => {
        const textBlob = new Blob(['Hello, World!'], { type: 'text/plain' })
        
        expect(textBlob.size).toBe(13)
        expect(textBlob.type).toBe('text/plain')
      })

      it('should concatenate multiple strings in Blob', async () => {
        const multiBlob = new Blob(['Hello, ', 'World!'], { type: 'text/plain' })
        
        expect(multiBlob.size).toBe(13)
        const text = await multiBlob.text()
        expect(text).toBe('Hello, World!')
      })

      it('should create Blob from JSON data', async () => {
        const user = { name: 'Alice', age: 30 }
        const jsonBlob = new Blob(
          [JSON.stringify(user, null, 2)], 
          { type: 'application/json' }
        )
        
        expect(jsonBlob.type).toBe('application/json')
        const text = await jsonBlob.text()
        expect(JSON.parse(text)).toEqual(user)
      })

      it('should create Blob from HTML', async () => {
        const htmlBlob = new Blob(
          ['<!DOCTYPE html><html><body><h1>Hello</h1></body></html>'],
          { type: 'text/html' }
        )
        
        expect(htmlBlob.type).toBe('text/html')
        const text = await htmlBlob.text()
        expect(text).toContain('<h1>Hello</h1>')
      })
    })

    describe('From Typed Arrays and ArrayBuffers', () => {
      // From lines 100-120: Binary data Blob creation
      it('should create Blob from Uint8Array', async () => {
        const bytes = new Uint8Array([72, 101, 108, 108, 111])  // "Hello" in ASCII
        const binaryBlob = new Blob([bytes], { type: 'application/octet-stream' })
        
        expect(binaryBlob.size).toBe(5)
        const text = await binaryBlob.text()
        expect(text).toBe('Hello')
      })

      it('should create Blob from ArrayBuffer', () => {
        const buffer = new ArrayBuffer(8)
        const view = new DataView(buffer)
        view.setFloat64(0, Math.PI)
        const bufferBlob = new Blob([buffer])
        
        expect(bufferBlob.size).toBe(8)
      })

      it('should combine different data types in a Blob', async () => {
        const bytes = new Uint8Array([72, 101, 108, 108, 111])  // "Hello"
        const mixedBlob = new Blob([
          'Header: ',
          bytes,
          '\nFooter'
        ], { type: 'text/plain' })
        
        const text = await mixedBlob.text()
        expect(text).toBe('Header: Hello\nFooter')
      })
    })

    describe('Blob Properties', () => {
      // From lines 122-132: Blob properties
      it('should have size and type properties', () => {
        const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
        
        expect(blob.size).toBe(13)
        expect(blob.type).toBe('text/plain')
      })

      it('should have empty type if not specified', () => {
        const blob = new Blob(['data'])
        
        expect(blob.type).toBe('')
      })
    })
  })

  // ============================================================
  // THE FILE INTERFACE
  // From blob-file-api.mdx lines 135-200
  // ============================================================

  describe('The File Interface', () => {
    // From lines 175-190: Creating File objects programmatically
    it('should create File from content array', () => {
      const file = new File(
        ['Hello, World!'],
        'greeting.txt',
        { 
          type: 'text/plain',
          lastModified: Date.now()
        }
      )
      
      expect(file.name).toBe('greeting.txt')
      expect(file.size).toBe(13)
      expect(file.type).toBe('text/plain')
    })

    it('should have File inherit from Blob', () => {
      const file = new File(['content'], 'test.txt', { type: 'text/plain' })
      
      expect(file instanceof Blob).toBe(true)
    })

    it('should have lastModified property', () => {
      const now = Date.now()
      const file = new File(['content'], 'test.txt', { lastModified: now })
      
      expect(file.lastModified).toBe(now)
    })

    it('should allow reading File as text (inherited from Blob)', async () => {
      const file = new File(['Hello from File'], 'test.txt', { type: 'text/plain' })
      
      const text = await file.text()
      expect(text).toBe('Hello from File')
    })
  })

  // ============================================================
  // MODERN BLOB METHODS
  // From blob-file-api.mdx lines 290-315
  // ============================================================

  describe('Modern Blob Methods', () => {
    // From lines 294-302: Promise-based methods
    it('should read as text with blob.text()', async () => {
      const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
      
      const text = await blob.text()
      expect(text).toBe('Hello, World!')
    })

    it('should read as ArrayBuffer with blob.arrayBuffer()', async () => {
      const blob = new Blob(['Hello'], { type: 'text/plain' })
      
      const buffer = await blob.arrayBuffer()
      const bytes = new Uint8Array(buffer)
      
      expect(bytes[0]).toBe(72)  // 'H'
      expect(bytes[1]).toBe(101) // 'e'
      expect(bytes[2]).toBe(108) // 'l'
      expect(bytes[3]).toBe(108) // 'l'
      expect(bytes[4]).toBe(111) // 'o'
    })

    it('should provide readable stream with blob.stream()', async () => {
      const blob = new Blob(['Hello'], { type: 'text/plain' })
      
      const stream = blob.stream()
      const reader = stream.getReader()
      
      const { done, value } = await reader.read()
      
      expect(done).toBe(false)
      expect(value).toBeInstanceOf(Uint8Array)
      expect(value[0]).toBe(72)  // 'H'
    })
  })

  // ============================================================
  // SLICING BLOBS
  // From blob-file-api.mdx lines 430-465
  // ============================================================

  describe('Slicing Blobs', () => {
    // From lines 432-448: slice() method examples
    it('should slice first five bytes', async () => {
      const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
      
      const firstFive = blob.slice(0, 5)
      const text = await firstFive.text()
      
      expect(text).toBe('Hello')
    })

    it('should slice using negative index', async () => {
      const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
      
      const lastSix = blob.slice(-6)
      const text = await lastSix.text()
      
      expect(text).toBe('World!')
    })

    it('should slice middle portion', async () => {
      const blob = new Blob(['Hello, World!'], { type: 'text/plain' })
      
      const middle = blob.slice(7, 12)
      const text = await middle.text()
      
      expect(text).toBe('World')
    })

    it('should allow changing MIME type when slicing', () => {
      const blob = new Blob(['Hello'], { type: 'text/plain' })
      
      const withNewType = blob.slice(0, 5, 'text/html')
      
      expect(withNewType.type).toBe('text/html')
    })

    it('should not modify original blob when slicing', async () => {
      const original = new Blob(['Hello, World!'], { type: 'text/plain' })
      const originalSize = original.size
      
      original.slice(0, 5)
      
      expect(original.size).toBe(originalSize)
      expect(await original.text()).toBe('Hello, World!')
    })
  })

  // ============================================================
  // CONVERTING BETWEEN FORMATS
  // From blob-file-api.mdx lines 520-570
  // ============================================================

  describe('Converting Between Formats', () => {
    describe('Blob to ArrayBuffer and Back', () => {
      // From lines 560-565: Blob to ArrayBuffer conversion
      it('should convert Blob to ArrayBuffer', async () => {
        const blob = new Blob(['Hello'])
        const buffer = await blob.arrayBuffer()
        
        expect(buffer).toBeInstanceOf(ArrayBuffer)
        expect(buffer.byteLength).toBe(5)
      })

      it('should convert ArrayBuffer back to Blob', async () => {
        const original = new Blob(['Hello'])
        const buffer = await original.arrayBuffer()
        
        const newBlob = new Blob([buffer])
        
        expect(newBlob.size).toBe(5)
        expect(await newBlob.text()).toBe('Hello')
      })
    })
  })

  // ============================================================
  // ERROR HANDLING AND EDGE CASES
  // From blob-file-api.mdx (Common Mistakes section)
  // ============================================================

  describe('Edge Cases', () => {
    it('should handle empty Blob', async () => {
      const emptyBlob = new Blob([])
      
      expect(emptyBlob.size).toBe(0)
      expect(await emptyBlob.text()).toBe('')
    })

    it('should handle Blob with empty string', async () => {
      const blob = new Blob([''])
      
      expect(blob.size).toBe(0)
      expect(await blob.text()).toBe('')
    })

    it('should handle Blob with whitespace', async () => {
      const blob = new Blob(['   '])
      
      expect(blob.size).toBe(3)
      expect(await blob.text()).toBe('   ')
    })

    it('should handle multiple empty parts', async () => {
      const blob = new Blob(['', '', ''])
      
      expect(blob.size).toBe(0)
      expect(await blob.text()).toBe('')
    })

    it('should handle Unicode content', async () => {
      const blob = new Blob(['Hello, World! 🌍'], { type: 'text/plain' })
      
      const text = await blob.text()
      expect(text).toBe('Hello, World! 🌍')
    })

    it('should handle Chinese characters', async () => {
      const blob = new Blob(['你好世界'], { type: 'text/plain' })
      
      const text = await blob.text()
      expect(text).toBe('你好世界')
    })
  })

  // ============================================================
  // COMBINING BLOBS
  // ============================================================

  describe('Combining Blobs', () => {
    it('should combine multiple Blobs into one', async () => {
      const blob1 = new Blob(['Hello, '])
      const blob2 = new Blob(['World!'])
      
      const combined = new Blob([blob1, blob2])
      
      expect(await combined.text()).toBe('Hello, World!')
    })

    it('should combine Blob with string', async () => {
      const blob = new Blob(['Hello'])
      
      const combined = new Blob([blob, ', ', 'World!'])
      
      expect(await combined.text()).toBe('Hello, World!')
    })

    it('should combine Blob with Uint8Array', async () => {
      const blob = new Blob(['Hello'])
      const bytes = new Uint8Array([33])  // '!'
      
      const combined = new Blob([blob, bytes])
      
      expect(await combined.text()).toBe('Hello!')
    })
  })

  // ============================================================
  // FILE SPECIFIC TESTS
  // ============================================================

  describe('File-specific behavior', () => {
    it('should have default lastModified if not specified', () => {
      const before = Date.now()
      const file = new File(['content'], 'test.txt')
      const after = Date.now()
      
      expect(file.lastModified).toBeGreaterThanOrEqual(before)
      expect(file.lastModified).toBeLessThanOrEqual(after)
    })

    it('should preserve filename with special characters', () => {
      const file = new File(['content'], 'my file (1).txt')
      
      expect(file.name).toBe('my file (1).txt')
    })

    it('should handle filename with extension correctly', () => {
      const file = new File(['content'], 'document.pdf', { type: 'application/pdf' })
      
      expect(file.name).toBe('document.pdf')
      expect(file.type).toBe('application/pdf')
    })
  })
})
