import { describe, it, expect } from 'vitest'

/**
 * Tests for Typed Arrays & ArrayBuffers concept
 * Source: /docs/beyond/concepts/typed-arrays-arraybuffers.mdx
 */

describe('Typed Arrays & ArrayBuffers', () => {
  // ============================================================
  // ARRAYBUFFER BASICS
  // From typed-arrays-arraybuffers.mdx lines ~10-20
  // ============================================================

  describe('ArrayBuffer Basics', () => {
    // From lines 10-20: Opening example
    it('should create a buffer with specified byte length', () => {
      const buffer = new ArrayBuffer(16)

      expect(buffer.byteLength).toBe(16)
    })

    // From lines 70-80: Cannot access ArrayBuffer directly
    it('should not allow direct access to ArrayBuffer bytes', () => {
      const buffer = new ArrayBuffer(16)

      expect(buffer[0]).toBe(undefined)  // Can't access directly!
    })

    // From lines 85-95: ArrayBuffer slice
    it('should slice a portion of the buffer to a new ArrayBuffer', () => {
      const original = new ArrayBuffer(16)
      const sliced = original.slice(4, 8)

      expect(sliced.byteLength).toBe(4)
      expect(original.byteLength).toBe(16)  // Original unchanged
    })
  })

  // ============================================================
  // TYPED ARRAY CREATION
  // From typed-arrays-arraybuffers.mdx lines ~120-180
  // ============================================================

  describe('Creating Typed Arrays', () => {
    describe('From Length', () => {
      // From lines 125-135: Create from length
      it('should create a typed array with specified element count', () => {
        const uint8 = new Uint8Array(4)

        expect(uint8.length).toBe(4)
        expect(uint8.byteLength).toBe(4)
        expect(uint8[0]).toBe(0)  // Initialized to zero
      })
    })

    describe('From Array', () => {
      // From lines 140-150: Create from regular array
      it('should create a typed array from a regular array', () => {
        const uint8 = new Uint8Array([10, 20, 30, 40])

        expect(uint8[0]).toBe(10)
        expect(uint8[1]).toBe(20)
        expect(uint8.length).toBe(4)
      })
    })

    describe('From Buffer', () => {
      // From lines 155-170: Create view over buffer
      it('should create a view over an existing buffer', () => {
        const buffer = new ArrayBuffer(8)
        const int32 = new Int32Array(buffer)

        expect(int32.length).toBe(2)  // 8 bytes / 4 bytes per int32
      })

      it('should create a partial view starting at an offset', () => {
        const buffer = new ArrayBuffer(8)
        const int16 = new Int16Array(buffer, 4)  // Start at byte 4

        expect(int16.length).toBe(2)  // 4 remaining bytes / 2 bytes per int16
      })
    })

    describe('From Another Typed Array', () => {
      // From lines 175-185: Copy with truncation
      it('should copy values with truncation when converting types', () => {
        const original = new Uint16Array([1000, 2000])
        const copy = new Uint8Array(original)

        // Values truncated to 8 bits
        expect(copy[0]).toBe(232)  // 1000 % 256 = 232
        expect(copy[1]).toBe(208)  // 2000 % 256 = 208
      })
    })
  })

  // ============================================================
  // USING TYPED ARRAYS
  // From typed-arrays-arraybuffers.mdx lines ~190-220
  // ============================================================

  describe('Using Typed Arrays', () => {
    // From lines 190-205: Array-like operations
    it('should support array-like access', () => {
      const numbers = new Float64Array([1.5, 2.5, 3.5, 4.5])

      expect(numbers[0]).toBe(1.5)
      expect(numbers.length).toBe(4)
    })

    it('should support iteration with for...of', () => {
      const numbers = new Float64Array([1.5, 2.5, 3.5, 4.5])
      const collected = []

      for (const num of numbers) {
        collected.push(num)
      }

      expect(collected).toEqual([1.5, 2.5, 3.5, 4.5])
    })

    it('should support map, filter, and reduce', () => {
      const numbers = new Float64Array([1.5, 2.5, 3.5, 4.5])

      const doubled = numbers.map(x => x * 2)
      expect([...doubled]).toEqual([3, 5, 7, 9])

      const sum = numbers.reduce((a, b) => a + b, 0)
      expect(sum).toBe(12)
    })
  })

  // ============================================================
  // MULTIPLE VIEWS ON SAME BUFFER
  // From typed-arrays-arraybuffers.mdx lines ~230-280
  // ============================================================

  describe('Multiple Views on Same Buffer', () => {
    // From lines 235-260: Different views of same data
    it('should allow multiple views of the same buffer', () => {
      const buffer = new ArrayBuffer(4)

      // View as 4 separate bytes
      const bytes = new Uint8Array(buffer)
      bytes[0] = 0x12
      bytes[1] = 0x34
      bytes[2] = 0x56
      bytes[3] = 0x78

      // View the same bytes as a single 32-bit integer
      const int32 = new Uint32Array(buffer)
      // Little-endian: least significant byte first
      expect(int32[0].toString(16)).toBe('78563412')

      // View as two 16-bit integers
      const int16 = new Uint16Array(buffer)
      expect(int16[0].toString(16)).toBe('3412')
      expect(int16[1].toString(16)).toBe('7856')
    })

    it('should reflect changes across all views of the same buffer', () => {
      const buffer = new ArrayBuffer(4)
      const uint8 = new Uint8Array(buffer)
      const uint32 = new Uint32Array(buffer)

      uint32[0] = 0x12345678
      
      // Changes visible in uint8 view (little-endian order)
      expect(uint8[0]).toBe(0x78)
      expect(uint8[1]).toBe(0x56)
      expect(uint8[2]).toBe(0x34)
      expect(uint8[3]).toBe(0x12)
    })
  })

  // ============================================================
  // DATAVIEW
  // From typed-arrays-arraybuffers.mdx lines ~290-360
  // ============================================================

  describe('DataView', () => {
    // From lines 295-320: DataView with different types
    it('should read and write different types at specific offsets', () => {
      const buffer = new ArrayBuffer(12)
      const view = new DataView(buffer)

      // Write different types at specific offsets
      view.setUint8(0, 255)           // 1 byte at offset 0
      view.setUint16(1, 1000, true)   // 2 bytes at offset 1 (little-endian)
      view.setFloat32(3, 3.14, true)  // 4 bytes at offset 3 (little-endian)
      view.setUint32(7, 42, true)     // 4 bytes at offset 7 (little-endian)

      // Read them back
      expect(view.getUint8(0)).toBe(255)
      expect(view.getUint16(1, true)).toBe(1000)
      expect(view.getFloat32(3, true)).toBeCloseTo(3.14, 2)
      expect(view.getUint32(7, true)).toBe(42)
    })

    // From lines 330-360: DataView methods
    it('should support all DataView getter/setter methods', () => {
      const dv = new DataView(new ArrayBuffer(24))

      // Int8
      dv.setInt8(0, -1)
      expect(dv.getInt8(0)).toBe(-1)

      // Uint8
      dv.setUint8(1, 255)
      expect(dv.getUint8(1)).toBe(255)

      // Int16 (little-endian)
      dv.setInt16(2, -1000, true)
      expect(dv.getInt16(2, true)).toBe(-1000)

      // Uint16 (little-endian)
      dv.setUint16(4, 65000, true)
      expect(dv.getUint16(4, true)).toBe(65000)

      // Float32 (little-endian)
      dv.setFloat32(6, 3.14, true)
      expect(dv.getFloat32(6, true)).toBeCloseTo(3.14, 2)

      // Float64 (little-endian)
      dv.setFloat64(10, 3.14159265, true)
      expect(dv.getFloat64(10, true)).toBeCloseTo(3.14159265, 8)
    })
  })

  // ============================================================
  // TEXT ENCODING/DECODING
  // From typed-arrays-arraybuffers.mdx lines ~440-470
  // ============================================================

  describe('Text Encoding and Decoding', () => {
    // From lines 445-460: TextEncoder and TextDecoder
    it('should convert string to bytes with TextEncoder', () => {
      const encoder = new TextEncoder()
      const bytes = encoder.encode("Hello 世界")

      expect(bytes).toBeInstanceOf(Uint8Array)
      expect(bytes[0]).toBe(72)   // 'H'
      expect(bytes[1]).toBe(101)  // 'e'
      expect(bytes[2]).toBe(108)  // 'l'
      expect(bytes.length).toBe(12)  // UTF-8: 6 ASCII + 6 for 2 Chinese chars
    })

    it('should convert bytes to string with TextDecoder', () => {
      const encoder = new TextEncoder()
      const bytes = encoder.encode("Hello 世界")

      const decoder = new TextDecoder('utf-8')
      const text = decoder.decode(bytes)

      expect(text).toBe("Hello 世界")
    })

    it('should decode ArrayBuffer directly', () => {
      const buffer = new ArrayBuffer(5)
      new Uint8Array(buffer).set([72, 101, 108, 108, 111])  // "Hello"

      const decoder = new TextDecoder('utf-8')
      expect(decoder.decode(buffer)).toBe("Hello")
    })
  })

  // ============================================================
  // PROPERTIES AND METHODS
  // From typed-arrays-arraybuffers.mdx lines ~480-530
  // ============================================================

  describe('Properties and Methods', () => {
    describe('Properties', () => {
      // From lines 485-500: Typed array properties
      it('should have correct properties', () => {
        const arr = new Int32Array([1, 2, 3, 4])

        expect(arr.length).toBe(4)              // Number of elements
        expect(arr.byteLength).toBe(16)         // Total bytes (4 elements × 4 bytes)
        expect(arr.byteOffset).toBe(0)          // Offset into buffer
        expect(arr.buffer).toBeInstanceOf(ArrayBuffer)
        expect(Int32Array.BYTES_PER_ELEMENT).toBe(4)
      })
    })

    describe('set() Method', () => {
      // From lines 505-520: set() method
      it('should copy values from another array', () => {
        const target = new Uint8Array(10)
        const source = new Uint8Array([1, 2, 3])

        target.set(source)        // Copy to start
        target.set(source, 5)     // Copy starting at index 5

        expect([...target]).toEqual([1, 2, 3, 0, 0, 1, 2, 3, 0, 0])
      })
    })

    describe('subarray() Method', () => {
      // From lines 525-535: subarray() shares buffer
      it('should create a view that shares the same buffer', () => {
        const original = new Uint8Array([1, 2, 3, 4, 5])
        const view = original.subarray(2, 4)

        expect([...view]).toEqual([3, 4])

        // Modifying the view affects the original
        view[0] = 99
        expect(original[2]).toBe(99)  // Original changed!
      })
    })
  })

  // ============================================================
  // COMMON MISTAKES
  // From typed-arrays-arraybuffers.mdx lines ~550-600
  // ============================================================

  describe('Common Mistakes', () => {
    describe('subarray() vs slice()', () => {
      // From lines 555-575: subarray vs slice
      it('should demonstrate that subarray shares the buffer', () => {
        const original = new Uint8Array([1, 2, 3, 4, 5])
        const section = original.subarray(1, 4)

        section[0] = 99
        expect(original[1]).toBe(99)  // Original changed!
      })

      it('should demonstrate that slice creates an independent copy', () => {
        const original = new Uint8Array([1, 2, 3, 4, 5])
        const copy = original.slice(1, 4)

        copy[0] = 99
        expect(original[1]).toBe(2)  // Original unchanged
      })
    })

    describe('Overflow Behavior', () => {
      // From lines 580-600: Overflow wrapping
      it('should wrap values that exceed range (Uint8Array)', () => {
        const bytes = new Uint8Array([250])
        bytes[0] += 10

        expect(bytes[0]).toBe(4)  // 260 - 256 = 4 (wraps around)
      })

      it('should clamp values with Uint8ClampedArray', () => {
        const clamped = new Uint8ClampedArray([250])
        clamped[0] += 10

        expect(clamped[0]).toBe(255)  // Clamped to max value
      })

      it('should clamp negative values to zero with Uint8ClampedArray', () => {
        const clamped = new Uint8ClampedArray([10])
        clamped[0] = -50

        expect(clamped[0]).toBe(0)  // Clamped to min value
      })

      it('should demonstrate integer overflow in Uint8Array', () => {
        const arr = new Uint8Array(1)
        arr[0] = 300

        expect(arr[0]).toBe(44)  // 300 % 256 = 44
      })
    })
  })

  // ============================================================
  // CONVERTING TO REGULAR ARRAYS
  // From typed-arrays-arraybuffers.mdx lines ~620-645
  // ============================================================

  describe('Converting to Regular Arrays', () => {
    // From lines 625-640: Array.from and spread
    it('should convert to regular array with Array.from', () => {
      const typed = new Uint8Array([1, 2, 3, 4, 5])
      const array = Array.from(typed)

      expect(array).toEqual([1, 2, 3, 4, 5])
      expect(Array.isArray(array)).toBe(true)
    })

    it('should convert to regular array with spread operator', () => {
      const typed = new Uint8Array([1, 2, 3, 4, 5])
      const array = [...typed]

      expect(array).toEqual([1, 2, 3, 4, 5])
      expect(Array.isArray(array)).toBe(true)
    })

    it('should convert regular array back to typed array', () => {
      const array = [1, 2, 3, 4, 5]
      const typed = new Uint8Array(array)

      expect(typed).toBeInstanceOf(Uint8Array)
      expect([...typed]).toEqual([1, 2, 3, 4, 5])
    })
  })

  // ============================================================
  // TYPED ARRAY TYPES
  // From typed-arrays-arraybuffers.mdx lines ~100-120
  // ============================================================

  describe('Typed Array Types', () => {
    it('should create Int8Array with correct range', () => {
      const arr = new Int8Array([127, -128, 200])

      expect(arr[0]).toBe(127)
      expect(arr[1]).toBe(-128)
      expect(arr[2]).toBe(-56)  // 200 wraps to -56 in signed 8-bit
    })

    it('should create Int16Array with correct range', () => {
      const arr = new Int16Array([32767, -32768])

      expect(arr[0]).toBe(32767)
      expect(arr[1]).toBe(-32768)
    })

    it('should create Int32Array with correct range', () => {
      const arr = new Int32Array([2147483647, -2147483648])

      expect(arr[0]).toBe(2147483647)
      expect(arr[1]).toBe(-2147483648)
    })

    it('should create Float32Array with floating point values', () => {
      const arr = new Float32Array([3.14, -2.5, 1000.5])

      expect(arr[0]).toBeCloseTo(3.14, 2)
      expect(arr[1]).toBeCloseTo(-2.5, 2)
      expect(arr[2]).toBeCloseTo(1000.5, 2)
    })

    it('should create Float64Array with high precision floating point', () => {
      const arr = new Float64Array([3.141592653589793])

      expect(arr[0]).toBe(3.141592653589793)
    })

    it('should create BigInt64Array with BigInt values', () => {
      const arr = new BigInt64Array([BigInt('9007199254740993')])

      expect(arr[0]).toBe(9007199254740993n)
    })

    it('should create BigUint64Array with unsigned BigInt values', () => {
      const arr = new BigUint64Array([BigInt('18446744073709551615')])

      expect(arr[0]).toBe(18446744073709551615n)
    })
  })

  // ============================================================
  // BYTES_PER_ELEMENT
  // ============================================================

  describe('BYTES_PER_ELEMENT', () => {
    it('should report correct bytes per element for each type', () => {
      expect(Int8Array.BYTES_PER_ELEMENT).toBe(1)
      expect(Uint8Array.BYTES_PER_ELEMENT).toBe(1)
      expect(Uint8ClampedArray.BYTES_PER_ELEMENT).toBe(1)
      expect(Int16Array.BYTES_PER_ELEMENT).toBe(2)
      expect(Uint16Array.BYTES_PER_ELEMENT).toBe(2)
      expect(Int32Array.BYTES_PER_ELEMENT).toBe(4)
      expect(Uint32Array.BYTES_PER_ELEMENT).toBe(4)
      expect(Float32Array.BYTES_PER_ELEMENT).toBe(4)
      expect(Float64Array.BYTES_PER_ELEMENT).toBe(8)
      expect(BigInt64Array.BYTES_PER_ELEMENT).toBe(8)
      expect(BigUint64Array.BYTES_PER_ELEMENT).toBe(8)
    })
  })

  // ============================================================
  // FIXED LENGTH BEHAVIOR
  // ============================================================

  describe('Fixed Length Behavior', () => {
    it('should not allow push, pop, or splice on typed arrays', () => {
      const arr = new Uint8Array([1, 2, 3])

      expect(arr.push).toBe(undefined)
      expect(arr.pop).toBe(undefined)
      expect(arr.splice).toBe(undefined)
      expect(arr.shift).toBe(undefined)
      expect(arr.unshift).toBe(undefined)
    })

    it('should not change length when setting out-of-bounds index', () => {
      const arr = new Uint8Array(3)
      arr[10] = 42  // Attempting to write beyond length

      expect(arr.length).toBe(3)  // Length unchanged
      expect(arr[10]).toBe(undefined)  // Value not stored
    })
  })

  // ============================================================
  // ARRAYBUFFER ISVIEW
  // ============================================================

  describe('ArrayBuffer.isView', () => {
    it('should return true for typed arrays', () => {
      expect(ArrayBuffer.isView(new Uint8Array(4))).toBe(true)
      expect(ArrayBuffer.isView(new Int32Array(4))).toBe(true)
      expect(ArrayBuffer.isView(new Float64Array(4))).toBe(true)
    })

    it('should return true for DataView', () => {
      const buffer = new ArrayBuffer(8)
      const view = new DataView(buffer)

      expect(ArrayBuffer.isView(view)).toBe(true)
    })

    it('should return false for ArrayBuffer itself', () => {
      const buffer = new ArrayBuffer(8)

      expect(ArrayBuffer.isView(buffer)).toBe(false)
    })

    it('should return false for regular arrays', () => {
      expect(ArrayBuffer.isView([1, 2, 3])).toBe(false)
    })
  })

  // ============================================================
  // BUFFER ACCESS
  // ============================================================

  describe('Buffer Access', () => {
    it('should access underlying buffer from typed array', () => {
      const uint8 = new Uint8Array([1, 2, 3, 4])
      const buffer = uint8.buffer

      expect(buffer).toBeInstanceOf(ArrayBuffer)
      expect(buffer.byteLength).toBe(4)

      // Create another view on the same buffer
      const uint32 = new Uint32Array(buffer)
      expect(uint32.length).toBe(1)
    })
  })

  // ============================================================
  // CONCATENATION PATTERN
  // ============================================================

  describe('Concatenating Typed Arrays', () => {
    it('should concatenate typed arrays manually', () => {
      const arr1 = new Uint8Array([1, 2, 3])
      const arr2 = new Uint8Array([4, 5, 6])

      // Create new array with combined length
      const combined = new Uint8Array(arr1.length + arr2.length)
      combined.set(arr1, 0)
      combined.set(arr2, arr1.length)

      expect([...combined]).toEqual([1, 2, 3, 4, 5, 6])
    })
  })

  // ============================================================
  // ENDIANNESS
  // ============================================================

  describe('Endianness', () => {
    it('should demonstrate little-endian byte order in typed arrays', () => {
      const buffer = new ArrayBuffer(4)
      const uint32 = new Uint32Array(buffer)
      const uint8 = new Uint8Array(buffer)

      uint32[0] = 0x01020304

      // Little-endian: least significant byte first
      expect(uint8[0]).toBe(0x04)  // Least significant byte
      expect(uint8[1]).toBe(0x03)
      expect(uint8[2]).toBe(0x02)
      expect(uint8[3]).toBe(0x01)  // Most significant byte
    })

    it('should allow explicit endianness control with DataView', () => {
      const buffer = new ArrayBuffer(4)
      const view = new DataView(buffer)

      // Write big-endian (false = big-endian)
      view.setUint32(0, 0x01020304, false)
      const uint8 = new Uint8Array(buffer)

      // Big-endian: most significant byte first
      expect(uint8[0]).toBe(0x01)  // Most significant byte
      expect(uint8[1]).toBe(0x02)
      expect(uint8[2]).toBe(0x03)
      expect(uint8[3]).toBe(0x04)  // Least significant byte
    })
  })
})
