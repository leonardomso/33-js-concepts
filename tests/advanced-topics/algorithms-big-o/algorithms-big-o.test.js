import { describe, it, expect } from 'vitest'

// ============================================
// SEARCHING ALGORITHMS
// ============================================

// Linear Search - O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i
  }
  return -1
}

// Binary Search - O(log n)
function binarySearch(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    if (arr[mid] === target) return mid
    if (arr[mid] < target) left = mid + 1
    else right = mid - 1
  }

  return -1
}

// ============================================
// SORTING ALGORITHMS
// ============================================

// Bubble Sort - O(n²) average/worst, O(n) best with early termination
function bubbleSort(arr) {
  const result = [...arr]
  const n = result.length

  for (let i = 0; i < n; i++) {
    let swapped = false

    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]]
        swapped = true
      }
    }

    // If no swaps occurred, array is sorted
    if (!swapped) break
  }

  return result
}

// Merge Sort - O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr

  const mid = Math.floor(arr.length / 2)
  const left = mergeSort(arr.slice(0, mid))
  const right = mergeSort(arr.slice(mid))

  return merge(left, right)
}

function merge(left, right) {
  const result = []
  let i = 0
  let j = 0

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i])
      i++
    } else {
      result.push(right[j])
      j++
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j))
}

// ============================================
// INTERVIEW PATTERNS
// ============================================

// Two Pointers - Find pair that sums to target
function twoSum(arr, target) {
  let left = 0
  let right = arr.length - 1

  while (left < right) {
    const sum = arr[left] + arr[right]

    if (sum === target) return [left, right]
    if (sum < target) left++
    else right--
  }

  return null
}

// Sliding Window - Maximum sum of k consecutive elements
function maxSumSubarray(arr, k) {
  if (arr.length < k) return null

  let windowSum = 0
  for (let i = 0; i < k; i++) {
    windowSum += arr[i]
  }

  let maxSum = windowSum

  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i]
    maxSum = Math.max(maxSum, windowSum)
  }

  return maxSum
}

// Frequency Counter - Check anagrams
function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false

  const freq = {}

  for (const char of str1) {
    freq[char] = (freq[char] || 0) + 1
  }

  for (const char of str2) {
    if (!freq[char]) return false
    freq[char]--
  }

  return true
}

// Has Duplicates - O(n) with Set
function hasDuplicates(arr) {
  const seen = new Set()
  for (const item of arr) {
    if (seen.has(item)) return true
    seen.add(item)
  }
  return false
}

// Longest Unique Substring - Sliding Window
function longestUniqueSubstring(s) {
  const seen = new Set()
  let maxLen = 0
  let left = 0

  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left])
      left++
    }
    seen.add(s[right])
    maxLen = Math.max(maxLen, right - left + 1)
  }

  return maxLen
}

// ============================================
// TESTS
// ============================================

describe('Algorithms & Big O', () => {
  describe('Searching Algorithms', () => {
    describe('Linear Search', () => {
      it('should find element at beginning', () => {
        expect(linearSearch([1, 2, 3, 4, 5], 1)).toBe(0)
      })

      it('should find element at end', () => {
        expect(linearSearch([1, 2, 3, 4, 5], 5)).toBe(4)
      })

      it('should find element in middle', () => {
        expect(linearSearch([3, 7, 1, 9, 4], 9)).toBe(3)
      })

      it('should return -1 when element not found', () => {
        expect(linearSearch([1, 2, 3, 4, 5], 10)).toBe(-1)
      })

      it('should handle empty array', () => {
        expect(linearSearch([], 1)).toBe(-1)
      })

      it('should find first occurrence of duplicates', () => {
        expect(linearSearch([1, 2, 3, 2, 5], 2)).toBe(1)
      })
    })

    describe('Binary Search', () => {
      it('should find element in sorted array', () => {
        expect(binarySearch([1, 3, 5, 7, 9, 11, 13], 9)).toBe(4)
      })

      it('should find first element', () => {
        expect(binarySearch([1, 3, 5, 7, 9], 1)).toBe(0)
      })

      it('should find last element', () => {
        expect(binarySearch([1, 3, 5, 7, 9], 9)).toBe(4)
      })

      it('should return -1 when element not found', () => {
        expect(binarySearch([1, 3, 5, 7, 9], 6)).toBe(-1)
      })

      it('should handle single element array - found', () => {
        expect(binarySearch([5], 5)).toBe(0)
      })

      it('should handle single element array - not found', () => {
        expect(binarySearch([5], 3)).toBe(-1)
      })

      it('should handle empty array', () => {
        expect(binarySearch([], 5)).toBe(-1)
      })

      it('should work with large sorted array', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i * 2) // [0, 2, 4, ..., 1998]
        expect(binarySearch(arr, 500)).toBe(250)
        expect(binarySearch(arr, 501)).toBe(-1)
      })
    })
  })

  describe('Sorting Algorithms', () => {
    describe('Bubble Sort', () => {
      it('should sort array in ascending order', () => {
        expect(bubbleSort([5, 3, 8, 4, 2])).toEqual([2, 3, 4, 5, 8])
      })

      it('should handle already sorted array', () => {
        expect(bubbleSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      })

      it('should handle reverse sorted array', () => {
        expect(bubbleSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
      })

      it('should handle array with duplicates', () => {
        expect(bubbleSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9])
      })

      it('should handle single element', () => {
        expect(bubbleSort([42])).toEqual([42])
      })

      it('should handle empty array', () => {
        expect(bubbleSort([])).toEqual([])
      })

      it('should not mutate original array', () => {
        const original = [3, 1, 4, 1, 5]
        bubbleSort(original)
        expect(original).toEqual([3, 1, 4, 1, 5])
      })

      it('should handle negative numbers', () => {
        expect(bubbleSort([-3, -1, -4, -1, -5])).toEqual([-5, -4, -3, -1, -1])
      })

      it('should terminate early on already sorted array (O(n) best case)', () => {
        // This test verifies the early termination optimization works
        // On an already sorted array, only one pass is needed
        const sorted = [1, 2, 3, 4, 5]
        expect(bubbleSort(sorted)).toEqual([1, 2, 3, 4, 5])
      })
    })

    describe('Merge Sort', () => {
      it('should sort array in ascending order', () => {
        expect(mergeSort([38, 27, 43, 3, 9, 82, 10])).toEqual([3, 9, 10, 27, 38, 43, 82])
      })

      it('should handle already sorted array', () => {
        expect(mergeSort([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5])
      })

      it('should handle reverse sorted array', () => {
        expect(mergeSort([5, 4, 3, 2, 1])).toEqual([1, 2, 3, 4, 5])
      })

      it('should handle array with duplicates', () => {
        expect(mergeSort([3, 1, 4, 1, 5, 9, 2, 6])).toEqual([1, 1, 2, 3, 4, 5, 6, 9])
      })

      it('should handle single element', () => {
        expect(mergeSort([42])).toEqual([42])
      })

      it('should handle empty array', () => {
        expect(mergeSort([])).toEqual([])
      })

      it('should handle negative numbers', () => {
        expect(mergeSort([-3, 1, -4, 1, -5, 9])).toEqual([-5, -4, -3, 1, 1, 9])
      })

      it('should maintain stability for equal elements', () => {
        // Merge sort is stable - equal elements maintain relative order
        const result = mergeSort([3, 1, 2, 1])
        expect(result).toEqual([1, 1, 2, 3])
      })
    })
  })

  describe('Interview Patterns', () => {
    describe('Two Pointers - Two Sum', () => {
      it('should find pair that sums to target', () => {
        expect(twoSum([1, 3, 5, 7, 9], 12)).toEqual([1, 4]) // 3 + 9 = 12
      })

      it('should find pair at extremes', () => {
        expect(twoSum([1, 2, 3, 4, 5], 6)).toEqual([0, 4]) // 1 + 5 = 6
      })

      it('should find adjacent pair', () => {
        expect(twoSum([1, 2, 3, 4, 5], 9)).toEqual([3, 4]) // 4 + 5 = 9
      })

      it('should return null when no pair exists', () => {
        expect(twoSum([1, 2, 3, 4, 5], 100)).toBe(null)
      })

      it('should handle minimum size array', () => {
        expect(twoSum([3, 7], 10)).toEqual([0, 1])
      })

      it('should return null for single element', () => {
        expect(twoSum([5], 10)).toBe(null)
      })
    })

    describe('Sliding Window - Max Sum Subarray', () => {
      it('should find maximum sum of k consecutive elements', () => {
        expect(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)).toBe(9) // 5 + 1 + 3
      })

      it('should handle window at beginning', () => {
        expect(maxSumSubarray([9, 1, 1, 1, 1, 1], 2)).toBe(10) // 9 + 1
      })

      it('should handle window at end', () => {
        expect(maxSumSubarray([1, 1, 1, 1, 9, 8], 2)).toBe(17) // 9 + 8
      })

      it('should handle k equal to array length', () => {
        expect(maxSumSubarray([1, 2, 3], 3)).toBe(6)
      })

      it('should return null if array shorter than k', () => {
        expect(maxSumSubarray([1, 2], 3)).toBe(null)
      })

      it('should handle negative numbers', () => {
        expect(maxSumSubarray([-1, -2, 5, 6, -3], 2)).toBe(11) // 5 + 6
      })

      it('should handle all negative numbers', () => {
        expect(maxSumSubarray([-5, -3, -8, -2], 2)).toBe(-8) // -5 + -3 = -8 is max
      })
    })

    describe('Frequency Counter - Anagram Check', () => {
      it('should return true for valid anagrams', () => {
        expect(isAnagram('listen', 'silent')).toBe(true)
      })

      it('should return true for same string', () => {
        expect(isAnagram('hello', 'hello')).toBe(true)
      })

      it('should return false for different lengths', () => {
        expect(isAnagram('hello', 'helloo')).toBe(false)
      })

      it('should return false for non-anagrams', () => {
        expect(isAnagram('hello', 'world')).toBe(false)
      })

      it('should handle empty strings', () => {
        expect(isAnagram('', '')).toBe(true)
      })

      it('should be case sensitive', () => {
        expect(isAnagram('Listen', 'Silent')).toBe(false)
      })

      it('should handle repeated characters', () => {
        expect(isAnagram('aab', 'baa')).toBe(true)
        expect(isAnagram('aab', 'bba')).toBe(false)
      })

      it('should handle single characters', () => {
        expect(isAnagram('a', 'a')).toBe(true)
        expect(isAnagram('a', 'b')).toBe(false)
      })
    })

    describe('Has Duplicates', () => {
      it('should return true when duplicates exist', () => {
        expect(hasDuplicates([1, 2, 3, 2, 5])).toBe(true)
      })

      it('should return false when no duplicates', () => {
        expect(hasDuplicates([1, 2, 3, 4, 5])).toBe(false)
      })

      it('should handle empty array', () => {
        expect(hasDuplicates([])).toBe(false)
      })

      it('should handle single element', () => {
        expect(hasDuplicates([1])).toBe(false)
      })

      it('should detect duplicates at beginning', () => {
        expect(hasDuplicates([1, 1, 2, 3, 4])).toBe(true)
      })

      it('should detect duplicates at end', () => {
        expect(hasDuplicates([1, 2, 3, 4, 4])).toBe(true)
      })

      it('should work with strings', () => {
        expect(hasDuplicates(['a', 'b', 'c', 'a'])).toBe(true)
        expect(hasDuplicates(['a', 'b', 'c', 'd'])).toBe(false)
      })
    })

    describe('Longest Unique Substring', () => {
      it('should find longest substring without repeating characters', () => {
        expect(longestUniqueSubstring('abcabcbb')).toBe(3) // "abc"
      })

      it('should handle all same characters', () => {
        expect(longestUniqueSubstring('bbbbb')).toBe(1)
      })

      it('should handle unique characters at end', () => {
        expect(longestUniqueSubstring('pwwkew')).toBe(3) // "wke"
      })

      it('should handle empty string', () => {
        expect(longestUniqueSubstring('')).toBe(0)
      })

      it('should handle single character', () => {
        expect(longestUniqueSubstring('a')).toBe(1)
      })

      it('should handle all unique characters', () => {
        expect(longestUniqueSubstring('abcdef')).toBe(6)
      })

      it('should handle repeating pattern', () => {
        expect(longestUniqueSubstring('abab')).toBe(2)
      })
    })
  })

  describe('Big O Concepts', () => {
    describe('Array operations complexity', () => {
      it('should demonstrate O(1) array access', () => {
        const arr = [1, 2, 3, 4, 5]
        // Direct index access is O(1)
        expect(arr[0]).toBe(1)
        expect(arr[4]).toBe(5)
        expect(arr[2]).toBe(3)
      })

      it('should demonstrate O(1) push and pop', () => {
        const arr = [1, 2, 3]
        arr.push(4) // O(1)
        expect(arr).toEqual([1, 2, 3, 4])
        const popped = arr.pop() // O(1)
        expect(popped).toBe(4)
        expect(arr).toEqual([1, 2, 3])
      })

      it('should demonstrate O(n) shift and unshift', () => {
        const arr = [1, 2, 3]
        // These are O(n) because they require re-indexing all elements
        arr.unshift(0)
        expect(arr).toEqual([0, 1, 2, 3])
        const shifted = arr.shift()
        expect(shifted).toBe(0)
        expect(arr).toEqual([1, 2, 3])
      })
    })

    describe('Set vs Array for lookups', () => {
      it('should demonstrate Set.has() is faster than Array.includes() for repeated lookups', () => {
        const arr = Array.from({ length: 1000 }, (_, i) => i)
        const set = new Set(arr)

        // Both find the element, but Set.has() is O(1) vs Array.includes() O(n)
        expect(arr.includes(500)).toBe(true)
        expect(set.has(500)).toBe(true)

        expect(arr.includes(999)).toBe(true)
        expect(set.has(999)).toBe(true)

        expect(arr.includes(1001)).toBe(false)
        expect(set.has(1001)).toBe(false)
      })
    })
  })
})
