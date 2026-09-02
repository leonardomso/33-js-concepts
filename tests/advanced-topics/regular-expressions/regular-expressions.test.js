import { describe, it, expect } from 'vitest'

describe('Regular Expressions', () => {
  describe('Creating Regex', () => {
    it('should create regex with literal syntax', () => {
      const pattern = /hello/
      expect(pattern.test('hello world')).toBe(true)
      expect(pattern.test('world')).toBe(false)
    })

    it('should create regex with RegExp constructor', () => {
      const pattern = new RegExp('hello')
      expect(pattern.test('hello world')).toBe(true)
      expect(pattern.test('world')).toBe(false)
    })

    it('should create dynamic patterns with RegExp constructor', () => {
      const searchTerm = 'cat'
      const pattern = new RegExp(searchTerm, 'gi')
      expect('Cat CAT cat'.match(pattern)).toEqual(['Cat', 'CAT', 'cat'])
    })
  })

  describe('Character Classes', () => {
    it('should match digits with \\d', () => {
      const pattern = /\d+/
      expect(pattern.test('123')).toBe(true)
      expect(pattern.test('abc')).toBe(false)
      expect('abc123def'.match(pattern)[0]).toBe('123')
    })

    it('should match word characters with \\w', () => {
      const pattern = /\w+/g
      expect('hello_world 123'.match(pattern)).toEqual(['hello_world', '123'])
    })

    it('should match whitespace with \\s', () => {
      const pattern = /\s+/
      expect(pattern.test('hello world')).toBe(true)
      expect(pattern.test('helloworld')).toBe(false)
    })

    it('should match any character with .', () => {
      const pattern = /a.c/
      expect(pattern.test('abc')).toBe(true)
      expect(pattern.test('a1c')).toBe(true)
      expect(pattern.test('ac')).toBe(false)
    })

    it('should match character sets with []', () => {
      const vowelPattern = /[aeiou]/g
      expect('hello'.match(vowelPattern)).toEqual(['e', 'o'])
    })

    it('should match negated character sets with [^]', () => {
      const nonDigitPattern = /[^0-9]+/g
      expect('abc123def'.match(nonDigitPattern)).toEqual(['abc', 'def'])
    })

    it('should match character ranges', () => {
      const lowercasePattern = /[a-z]+/g
      expect('Hello World'.match(lowercasePattern)).toEqual(['ello', 'orld'])
    })
  })

  describe('Quantifiers', () => {
    it('should match 0 or more with *', () => {
      const pattern = /ab*c/
      expect(pattern.test('ac')).toBe(true)
      expect(pattern.test('abc')).toBe(true)
      expect(pattern.test('abbbbc')).toBe(true)
    })

    it('should match 1 or more with +', () => {
      const pattern = /ab+c/
      expect(pattern.test('ac')).toBe(false)
      expect(pattern.test('abc')).toBe(true)
      expect(pattern.test('abbbbc')).toBe(true)
    })

    it('should match 0 or 1 with ?', () => {
      const pattern = /colou?r/
      expect(pattern.test('color')).toBe(true)
      expect(pattern.test('colour')).toBe(true)
      expect(pattern.test('colouur')).toBe(false)
    })

    it('should match exact count with {n}', () => {
      const pattern = /\d{4}/
      expect(pattern.test('2024')).toBe(true)
      expect(pattern.test('123')).toBe(false)
    })

    it('should match range with {n,m}', () => {
      const pattern = /\d{2,4}/
      expect('1'.match(pattern)).toBe(null)
      expect('12'.match(pattern)[0]).toBe('12')
      expect('12345'.match(pattern)[0]).toBe('1234')
    })

    it('should match n or more with {n,}', () => {
      const pattern = /\d{2,}/
      expect(pattern.test('1')).toBe(false)
      expect(pattern.test('12')).toBe(true)
      expect(pattern.test('12345')).toBe(true)
    })
  })

  describe('Anchors', () => {
    it('should match start of string with ^', () => {
      const pattern = /^Hello/
      expect(pattern.test('Hello World')).toBe(true)
      expect(pattern.test('Say Hello')).toBe(false)
    })

    it('should match end of string with $', () => {
      const pattern = /World$/
      expect(pattern.test('Hello World')).toBe(true)
      expect(pattern.test('World Hello')).toBe(false)
    })

    it('should match entire string with ^ and $', () => {
      const pattern = /^\d+$/
      expect(pattern.test('12345')).toBe(true)
      expect(pattern.test('123abc')).toBe(false)
      expect(pattern.test('abc123')).toBe(false)
    })

    it('should match word boundaries with \\b', () => {
      const pattern = /\bcat\b/
      expect(pattern.test('cat')).toBe(true)
      expect(pattern.test('the cat sat')).toBe(true)
      expect(pattern.test('category')).toBe(false)
      expect(pattern.test('concatenate')).toBe(false)
    })
  })

  describe('Methods', () => {
    describe('test()', () => {
      it('should return true for matches', () => {
        expect(/\d+/.test('123')).toBe(true)
      })

      it('should return false for non-matches', () => {
        expect(/\d+/.test('abc')).toBe(false)
      })
    })

    describe('match()', () => {
      it('should return first match without g flag', () => {
        const result = 'cat and cat'.match(/cat/)
        expect(result[0]).toBe('cat')
        expect(result.index).toBe(0)
      })

      it('should return all matches with g flag', () => {
        const result = 'cat and cat'.match(/cat/g)
        expect(result).toEqual(['cat', 'cat'])
      })

      it('should return null when no match', () => {
        expect('hello'.match(/\d+/)).toBe(null)
      })
    })

    describe('replace()', () => {
      it('should replace first match without g flag', () => {
        expect('hello world'.replace(/o/, '0')).toBe('hell0 world')
      })

      it('should replace all matches with g flag', () => {
        expect('hello world'.replace(/o/g, '0')).toBe('hell0 w0rld')
      })

      it('should use captured groups in replacement', () => {
        expect('John Smith'.replace(/(\w+) (\w+)/, '$2, $1')).toBe('Smith, John')
      })
    })

    describe('split()', () => {
      it('should split by regex pattern', () => {
        expect('a, b, c'.split(/,\s*/)).toEqual(['a', 'b', 'c'])
      })

      it('should split on whitespace', () => {
        expect('hello   world  foo'.split(/\s+/)).toEqual(['hello', 'world', 'foo'])
      })
    })

    describe('exec()', () => {
      it('should return match with details', () => {
        const result = /\d+/.exec('abc123def')
        expect(result[0]).toBe('123')
        expect(result.index).toBe(3)
      })

      it('should return null for no match', () => {
        expect(/\d+/.exec('abc')).toBe(null)
      })
    })
  })

  describe('Flags', () => {
    it('should match case-insensitively with i flag', () => {
      const pattern = /hello/i
      expect(pattern.test('HELLO')).toBe(true)
      expect(pattern.test('Hello')).toBe(true)
      expect(pattern.test('hello')).toBe(true)
    })

    it('should find all matches with g flag', () => {
      const pattern = /a/g
      expect('banana'.match(pattern)).toEqual(['a', 'a', 'a'])
    })

    it('should match line boundaries with m flag', () => {
      const text = 'line1\nline2\nline3'
      const pattern = /^line\d/gm
      expect(text.match(pattern)).toEqual(['line1', 'line2', 'line3'])
    })

    it('should combine multiple flags', () => {
      const pattern = /hello/gi
      expect('Hello HELLO hello'.match(pattern)).toEqual(['Hello', 'HELLO', 'hello'])
    })
  })

  describe('Capturing Groups', () => {
    it('should capture groups with parentheses', () => {
      const pattern = /(\d{3})-(\d{4})/
      const match = '555-1234'.match(pattern)
      expect(match[0]).toBe('555-1234')
      expect(match[1]).toBe('555')
      expect(match[2]).toBe('1234')
    })

    it('should support named groups', () => {
      const pattern = /(?<area>\d{3})-(?<number>\d{4})/
      const match = '555-1234'.match(pattern)
      expect(match.groups.area).toBe('555')
      expect(match.groups.number).toBe('1234')
    })

    it('should use groups in replace with $n', () => {
      const result = '12-25-2024'.replace(
        /(\d{2})-(\d{2})-(\d{4})/,
        '$3/$1/$2'
      )
      expect(result).toBe('2024/12/25')
    })

    it('should use named groups in replace', () => {
      const result = '12-25-2024'.replace(
        /(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/,
        '$<year>/$<month>/$<day>'
      )
      expect(result).toBe('2024/12/25')
    })

    it('should support non-capturing groups with (?:)', () => {
      const pattern = /(?:ab)+/
      const match = 'ababab'.match(pattern)
      expect(match[0]).toBe('ababab')
      expect(match[1]).toBeUndefined()
    })
  })

  describe('Greedy vs Lazy', () => {
    it('should match greedily by default', () => {
      const html = '<div>Hello</div><div>World</div>'
      const greedy = /<div>.*<\/div>/
      expect(html.match(greedy)[0]).toBe('<div>Hello</div><div>World</div>')
    })

    it('should match lazily with ?', () => {
      const html = '<div>Hello</div><div>World</div>'
      const lazy = /<div>.*?<\/div>/
      expect(html.match(lazy)[0]).toBe('<div>Hello</div>')
    })

    it('should find all lazy matches with g flag', () => {
      const html = '<div>Hello</div><div>World</div>'
      const lazy = /<div>.*?<\/div>/g
      expect(html.match(lazy)).toEqual(['<div>Hello</div>', '<div>World</div>'])
    })
  })

  describe('Common Patterns', () => {
    it('should validate basic email format', () => {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      expect(email.test('user@example.com')).toBe(true)
      expect(email.test('user.name@example.co.uk')).toBe(true)
      expect(email.test('invalid-email')).toBe(false)
      expect(email.test('missing@domain')).toBe(false)
      expect(email.test('@missing-local.com')).toBe(false)
    })

    it('should validate URL format', () => {
      const url = /^https?:\/\/[^\s]+$/
      expect(url.test('https://example.com')).toBe(true)
      expect(url.test('http://example.com/path')).toBe(true)
      expect(url.test('ftp://example.com')).toBe(false)
      expect(url.test('not a url')).toBe(false)
    })

    it('should validate US phone number formats', () => {
      const phone = /^(\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/
      expect(phone.test('555-123-4567')).toBe(true)
      expect(phone.test('(555) 123-4567')).toBe(true)
      expect(phone.test('555.123.4567')).toBe(true)
      expect(phone.test('5551234567')).toBe(true)
      expect(phone.test('55-123-4567')).toBe(false)
    })

    it('should validate username format', () => {
      const username = /^[a-zA-Z0-9_]{3,16}$/
      expect(username.test('john_doe')).toBe(true)
      expect(username.test('user123')).toBe(true)
      expect(username.test('ab')).toBe(false) // too short
      expect(username.test('this_is_way_too_long_username')).toBe(false) // too long
      expect(username.test('invalid-user')).toBe(false) // hyphen not allowed
    })

    it('should extract hashtags from text', () => {
      const hashtags = /#\w+/g
      const text = 'Learning #JavaScript and #regex is fun! #coding'
      expect(text.match(hashtags)).toEqual(['#JavaScript', '#regex', '#coding'])
    })

    it('should extract numbers from text', () => {
      const numbers = /\d+/g
      const text = 'I have 42 apples and 7 oranges'
      expect(text.match(numbers)).toEqual(['42', '7'])
    })
  })

  describe('Edge Cases', () => {
    it('should escape special characters in RegExp constructor', () => {
      const searchTerm = 'hello.world'
      const escaped = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const pattern = new RegExp(escaped)
      expect(pattern.test('hello.world')).toBe(true)
      expect(pattern.test('helloXworld')).toBe(false)
    })

    it('should handle empty strings', () => {
      expect(/.*/.test('')).toBe(true)
      expect(/.+/.test('')).toBe(false)
      const emptyMatch = ''.match(/\d*/)
      expect(emptyMatch[0]).toBe('')
    })

    it('should handle alternation with |', () => {
      const pattern = /cat|dog|bird/
      expect(pattern.test('I have a cat')).toBe(true)
      expect(pattern.test('I have a dog')).toBe(true)
      expect(pattern.test('I have a fish')).toBe(false)
    })

    it('should handle backreferences', () => {
      const pattern = /(\w+)\s+\1/
      expect(pattern.test('hello hello')).toBe(true)
      expect(pattern.test('hello world')).toBe(false)
    })
  })
})
