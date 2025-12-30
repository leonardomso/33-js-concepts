/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeEach } from 'vitest'

// =============================================================================
// DOM AND LAYOUT TREES - TEST SUITE
// Tests for code examples from docs/concepts/dom.mdx
// =============================================================================

describe('DOM and Layout Trees', () => {
  // Reset document body before each test
  beforeEach(() => {
    document.body.innerHTML = ''
    document.head.innerHTML = ''
  })

  // ===========================================================================
  // NODE TYPES AND STRUCTURE
  // ===========================================================================
  describe('Node Types and Structure', () => {
    it('should identify element node type', () => {
      const div = document.createElement('div')
      expect(div.nodeType).toBe(1)
      expect(div.nodeType).toBe(Node.ELEMENT_NODE)
      expect(div.nodeName).toBe('DIV')
    })

    it('should identify text node type', () => {
      const text = document.createTextNode('Hello')
      expect(text.nodeType).toBe(3)
      expect(text.nodeType).toBe(Node.TEXT_NODE)
      expect(text.nodeName).toBe('#text')
    })

    it('should identify comment node type', () => {
      const comment = document.createComment('This is a comment')
      expect(comment.nodeType).toBe(8)
      expect(comment.nodeType).toBe(Node.COMMENT_NODE)
      expect(comment.nodeName).toBe('#comment')
    })

    it('should identify document node type', () => {
      expect(document.nodeType).toBe(9)
      expect(document.nodeType).toBe(Node.DOCUMENT_NODE)
      expect(document.nodeName).toBe('#document')
    })

    it('should identify document fragment node type', () => {
      const fragment = document.createDocumentFragment()
      expect(fragment.nodeType).toBe(11)
      expect(fragment.nodeType).toBe(Node.DOCUMENT_FRAGMENT_NODE)
      expect(fragment.nodeName).toBe('#document-fragment')
    })

    it('should have correct node type constants', () => {
      expect(Node.ELEMENT_NODE).toBe(1)
      expect(Node.TEXT_NODE).toBe(3)
      expect(Node.COMMENT_NODE).toBe(8)
      expect(Node.DOCUMENT_NODE).toBe(9)
      expect(Node.DOCUMENT_FRAGMENT_NODE).toBe(11)
    })

    it('should access document properties', () => {
      expect(document.documentElement.tagName).toBe('HTML')
      expect(document.head).toBeTruthy()
      expect(document.body).toBeTruthy()
    })

    it('should be able to set document title', () => {
      document.title = 'New Title'
      expect(document.title).toBe('New Title')
    })
  })

  // ===========================================================================
  // SELECTING ELEMENTS
  // ===========================================================================
  describe('Selecting Elements', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="hero">Welcome!</div>
        <p class="intro">First</p>
        <p class="intro">Second</p>
        <p>Third</p>
        <nav>
          <a href="#" class="active">Home</a>
          <a href="#">About</a>
        </nav>
        <input type="text" data-id="123">
      `
    })

    describe('getElementById', () => {
      it('should select element by id', () => {
        const hero = document.getElementById('hero')
        expect(hero).toBeTruthy()
        expect(hero.textContent).toBe('Welcome!')
      })

      it('should return null for non-existent id', () => {
        const ghost = document.getElementById('nonexistent')
        expect(ghost).toBeNull()
      })
    })

    describe('getElementsByClassName', () => {
      it('should select elements by class name', () => {
        const intros = document.getElementsByClassName('intro')
        expect(intros.length).toBe(2)
        expect(intros[0].textContent).toBe('First')
      })

      it('should return empty collection for non-existent class', () => {
        const ghosts = document.getElementsByClassName('nonexistent')
        expect(ghosts.length).toBe(0)
      })
    })

    describe('getElementsByTagName', () => {
      it('should select elements by tag name', () => {
        const allParagraphs = document.getElementsByTagName('p')
        expect(allParagraphs.length).toBe(3)
      })
    })

    describe('querySelector', () => {
      it('should select first matching element', () => {
        const firstButton = document.querySelector('a')
        expect(firstButton.textContent).toBe('Home')
      })

      it('should select by id', () => {
        const hero = document.querySelector('#hero')
        expect(hero.textContent).toBe('Welcome!')
      })

      it('should select by class', () => {
        const firstIntro = document.querySelector('.intro')
        expect(firstIntro.textContent).toBe('First')
      })

      it('should select by complex selector', () => {
        const navLink = document.querySelector('nav a.active')
        expect(navLink.textContent).toBe('Home')
      })

      it('should select by attribute', () => {
        const dataItem = document.querySelector('[data-id="123"]')
        expect(dataItem.tagName).toBe('INPUT')
      })

      it('should return null for no match', () => {
        const ghost = document.querySelector('.nonexistent')
        expect(ghost).toBeNull()
      })
    })

    describe('querySelectorAll', () => {
      it('should select all matching elements', () => {
        const allCards = document.querySelectorAll('.intro')
        expect(allCards.length).toBe(2)
      })

      it('should return empty NodeList for no matches', () => {
        const ghosts = document.querySelectorAll('.nonexistent')
        expect(ghosts.length).toBe(0)
      })

      it('should support complex selectors', () => {
        const links = document.querySelectorAll('nav a')
        expect(links.length).toBe(2)
      })
    })

    describe('Scoped Selection', () => {
      it('should select within a parent element', () => {
        const nav = document.querySelector('nav')
        const navLinks = nav.querySelectorAll('a')
        expect(navLinks.length).toBe(2)
      })

      it('should find specific child in parent', () => {
        const nav = document.querySelector('nav')
        const activeLink = nav.querySelector('.active')
        expect(activeLink.textContent).toBe('Home')
      })
    })
  })

  // ===========================================================================
  // LIVE VS STATIC COLLECTIONS
  // ===========================================================================
  describe('Live vs Static Collections', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div class="item">One</div>
        <div class="item">Two</div>
        <div class="item">Three</div>
      `
    })

    it('should demonstrate live HTMLCollection updates', () => {
      const liveList = document.getElementsByClassName('item')
      expect(liveList.length).toBe(3)

      // Add a new item
      const newItem = document.createElement('div')
      newItem.className = 'item'
      document.body.appendChild(newItem)

      // Live collection is automatically updated
      expect(liveList.length).toBe(4)
    })

    it('should demonstrate static NodeList does not update', () => {
      const staticList = document.querySelectorAll('.item')
      expect(staticList.length).toBe(3)

      // Add a new item
      const newItem = document.createElement('div')
      newItem.className = 'item'
      document.body.appendChild(newItem)

      // Static list is still the old snapshot
      expect(staticList.length).toBe(3)
    })
  })

  // ===========================================================================
  // DOM TRAVERSAL
  // ===========================================================================
  describe('DOM Traversal', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <ul id="list">
          <li id="first">One</li>
          <li id="second">Two</li>
          <li id="third">Three</li>
        </ul>
      `
    })

    describe('Traversing Downwards', () => {
      it('should get child nodes including text nodes', () => {
        const ul = document.querySelector('ul')
        // childNodes includes text nodes from whitespace
        expect(ul.childNodes.length).toBeGreaterThan(3)
      })

      it('should get only element children', () => {
        const ul = document.querySelector('ul')
        expect(ul.children.length).toBe(3)
        expect(ul.children[0].textContent).toBe('One')
      })

      it('should get first and last element children', () => {
        const ul = document.querySelector('ul')
        expect(ul.firstElementChild.textContent).toBe('One')
        expect(ul.lastElementChild.textContent).toBe('Three')
      })

      it('should demonstrate firstChild vs firstElementChild', () => {
        const ul = document.querySelector('ul')
        // firstChild might be a text node (whitespace)
        const firstChild = ul.firstChild
        const firstElementChild = ul.firstElementChild

        // firstElementChild is always an element
        expect(firstElementChild.tagName).toBe('LI')
        // firstChild might be text node
        expect(firstChild.nodeType === Node.TEXT_NODE || firstChild.nodeType === Node.ELEMENT_NODE).toBe(true)
      })
    })

    describe('Traversing Upwards', () => {
      it('should get parent node', () => {
        const li = document.querySelector('li')
        expect(li.parentNode.tagName).toBe('UL')
      })

      it('should get parent element', () => {
        const li = document.querySelector('li')
        expect(li.parentElement.tagName).toBe('UL')
      })

      it('should find ancestor with closest()', () => {
        const li = document.querySelector('li')
        const ul = li.closest('ul')
        expect(ul.id).toBe('list')
      })

      it('should return element itself if it matches closest()', () => {
        const li = document.querySelector('li')
        const self = li.closest('li')
        expect(self).toBe(li)
      })

      it('should return null if no ancestor matches closest()', () => {
        const li = document.querySelector('li')
        const result = li.closest('.nonexistent')
        expect(result).toBeNull()
      })
    })

    describe('Traversing Sideways', () => {
      it('should get next element sibling', () => {
        const first = document.querySelector('#first')
        const second = first.nextElementSibling
        expect(second.id).toBe('second')
      })

      it('should get previous element sibling', () => {
        const second = document.querySelector('#second')
        const first = second.previousElementSibling
        expect(first.id).toBe('first')
      })

      it('should return null at boundaries', () => {
        const first = document.querySelector('#first')
        const third = document.querySelector('#third')
        expect(first.previousElementSibling).toBeNull()
        expect(third.nextElementSibling).toBeNull()
      })
    })

    describe('Building Ancestor Trail', () => {
      it('should get all ancestors of an element', () => {
        document.body.innerHTML = `
          <main>
            <section>
              <div class="deeply-nested">Content</div>
            </section>
          </main>
        `

        function getAncestors(element) {
          const ancestors = []
          let current = element.parentElement

          while (current && current !== document.body) {
            ancestors.push(current)
            current = current.parentElement
          }

          return ancestors
        }

        const deepElement = document.querySelector('.deeply-nested')
        const ancestors = getAncestors(deepElement)

        expect(ancestors.length).toBe(2)
        expect(ancestors[0].tagName).toBe('SECTION')
        expect(ancestors[1].tagName).toBe('MAIN')
      })
    })
  })

  // ===========================================================================
  // CREATING AND MANIPULATING ELEMENTS
  // ===========================================================================
  describe('Creating and Manipulating Elements', () => {
    describe('Creating Elements', () => {
      it('should create a new element', () => {
        const div = document.createElement('div')
        expect(div.tagName).toBe('DIV')
        expect(div.parentNode).toBeNull() // Not yet in DOM
      })

      it('should create a text node', () => {
        const text = document.createTextNode('Hello, world!')
        expect(text.nodeType).toBe(Node.TEXT_NODE)
        expect(text.textContent).toBe('Hello, world!')
      })

      it('should create a comment node', () => {
        const comment = document.createComment('This is a comment')
        expect(comment.nodeType).toBe(Node.COMMENT_NODE)
        expect(comment.textContent).toBe('This is a comment')
      })
    })

    describe('appendChild', () => {
      it('should add element as last child', () => {
        document.body.innerHTML = '<ul><li>Existing</li></ul>'
        const ul = document.querySelector('ul')
        const li = document.createElement('li')
        li.textContent = 'New item'

        ul.appendChild(li)

        expect(ul.lastElementChild.textContent).toBe('New item')
        expect(ul.children.length).toBe(2)
      })
    })

    describe('insertBefore', () => {
      it('should insert element before reference node', () => {
        document.body.innerHTML = '<ul><li>Existing</li></ul>'
        const ul = document.querySelector('ul')
        const existingLi = ul.querySelector('li')
        const newLi = document.createElement('li')
        newLi.textContent = 'First!'

        ul.insertBefore(newLi, existingLi)

        expect(ul.firstElementChild.textContent).toBe('First!')
        expect(ul.children.length).toBe(2)
      })
    })

    describe('append and prepend', () => {
      it('should append multiple items including strings', () => {
        const div = document.createElement('div')
        const span = document.createElement('span')

        div.append('Text', span, 'More text')

        expect(div.childNodes.length).toBe(3)
        expect(div.textContent).toBe('TextMore text')
      })

      it('should prepend element to start', () => {
        document.body.innerHTML = '<div>Existing</div>'
        const div = document.querySelector('div')
        const strong = document.createElement('strong')
        strong.textContent = 'New'

        div.prepend(strong)

        expect(div.firstElementChild.tagName).toBe('STRONG')
      })
    })

    describe('before and after', () => {
      it('should insert as previous sibling with before()', () => {
        document.body.innerHTML = '<h1>Title</h1>'
        const h1 = document.querySelector('h1')
        const nav = document.createElement('nav')

        h1.before(nav)

        expect(h1.previousElementSibling.tagName).toBe('NAV')
      })

      it('should insert as next sibling with after()', () => {
        document.body.innerHTML = '<h1>Title</h1>'
        const h1 = document.querySelector('h1')
        const p = document.createElement('p')

        h1.after(p)

        expect(h1.nextElementSibling.tagName).toBe('P')
      })
    })

    describe('insertAdjacentHTML', () => {
      it('should insert at all four positions', () => {
        document.body.innerHTML = '<div id="target">Content</div>'
        const div = document.querySelector('#target')

        div.insertAdjacentHTML('beforebegin', '<p id="before">Before</p>')
        div.insertAdjacentHTML('afterbegin', '<span id="first">First</span>')
        div.insertAdjacentHTML('beforeend', '<span id="last">Last</span>')
        div.insertAdjacentHTML('afterend', '<p id="after">After</p>')

        expect(div.previousElementSibling.id).toBe('before')
        expect(div.firstElementChild.id).toBe('first')
        expect(div.lastElementChild.id).toBe('last')
        expect(div.nextElementSibling.id).toBe('after')
      })
    })

    describe('Removing Elements', () => {
      it('should remove element with remove()', () => {
        document.body.innerHTML = '<div class="to-remove">Gone</div>'
        const element = document.querySelector('.to-remove')

        element.remove()

        expect(document.querySelector('.to-remove')).toBeNull()
      })

      it('should remove child with removeChild()', () => {
        document.body.innerHTML = '<ul><li>Keep</li><li class="remove">Remove</li></ul>'
        const ul = document.querySelector('ul')
        const toRemove = ul.querySelector('.remove')

        ul.removeChild(toRemove)

        expect(ul.children.length).toBe(1)
        expect(ul.querySelector('.remove')).toBeNull()
      })
    })

    describe('Cloning Elements', () => {
      it('should shallow clone element only', () => {
        document.body.innerHTML = '<div class="card"><p>Content</p></div>'
        const original = document.querySelector('.card')

        const shallow = original.cloneNode(false)

        expect(shallow.className).toBe('card')
        expect(shallow.children.length).toBe(0) // No children
      })

      it('should deep clone element with descendants', () => {
        document.body.innerHTML = '<div class="card"><p>Content</p></div>'
        const original = document.querySelector('.card')

        const deep = original.cloneNode(true)

        expect(deep.className).toBe('card')
        expect(deep.children.length).toBe(1)
        expect(deep.querySelector('p').textContent).toBe('Content')
      })

      it('should create detached clone', () => {
        document.body.innerHTML = '<div class="card">Content</div>'
        const original = document.querySelector('.card')

        const clone = original.cloneNode(true)

        expect(clone.parentNode).toBeNull()
      })
    })

    describe('DocumentFragment', () => {
      it('should batch add elements with fragment', () => {
        document.body.innerHTML = '<ul></ul>'
        const ul = document.querySelector('ul')
        const fragment = document.createDocumentFragment()

        for (let i = 0; i < 5; i++) {
          const li = document.createElement('li')
          li.textContent = `Item ${i}`
          fragment.appendChild(li)
        }

        ul.appendChild(fragment)

        expect(ul.children.length).toBe(5)
        expect(ul.firstElementChild.textContent).toBe('Item 0')
        expect(ul.lastElementChild.textContent).toBe('Item 4')
      })

      it('should have no parent', () => {
        const fragment = document.createDocumentFragment()
        expect(fragment.parentNode).toBeNull()
      })
    })
  })

  // ===========================================================================
  // MODIFYING CONTENT
  // ===========================================================================
  describe('Modifying Content', () => {
    describe('innerHTML', () => {
      it('should read HTML content', () => {
        document.body.innerHTML = '<div><p>Hello</p><span>World</span></div>'
        const div = document.querySelector('div')

        expect(div.innerHTML).toBe('<p>Hello</p><span>World</span>')
      })

      it('should set HTML content', () => {
        document.body.innerHTML = '<div></div>'
        const div = document.querySelector('div')

        div.innerHTML = '<h1>New Title</h1><p>New paragraph</p>'

        expect(div.children.length).toBe(2)
        expect(div.querySelector('h1').textContent).toBe('New Title')
      })

      it('should clear content with empty string', () => {
        document.body.innerHTML = '<div><p>Content</p></div>'
        const div = document.querySelector('div')

        div.innerHTML = ''

        expect(div.children.length).toBe(0)
      })
    })

    describe('textContent', () => {
      it('should read text content ignoring HTML', () => {
        document.body.innerHTML = '<div><p>Hello</p><span>World</span></div>'
        const div = document.querySelector('div')

        expect(div.textContent).toBe('HelloWorld')
      })

      it('should set text content escaping HTML', () => {
        document.body.innerHTML = '<div></div>'
        const div = document.querySelector('div')

        div.textContent = '<script>alert("XSS")</script>'

        // HTML is escaped, not parsed
        expect(div.children.length).toBe(0)
        expect(div.textContent).toBe('<script>alert("XSS")</script>')
      })
    })

    describe('innerText vs textContent', () => {
      it('textContent includes hidden text, innerText may not', () => {
        document.body.innerHTML = '<div>Hello <span style="display:none">Hidden</span> World</div>'
        const div = document.querySelector('div')

        // textContent includes all text
        expect(div.textContent).toContain('Hidden')

        // Note: In jsdom, innerText may behave like textContent
        // In real browsers, innerText would exclude display:none text
      })
    })
  })

  // ===========================================================================
  // WORKING WITH ATTRIBUTES
  // ===========================================================================
  describe('Working with Attributes', () => {
    describe('Standard Attribute Methods', () => {
      it('should get attribute value', () => {
        document.body.innerHTML = '<a href="https://example.com" target="_blank">Link</a>'
        const link = document.querySelector('a')

        expect(link.getAttribute('href')).toBe('https://example.com')
        expect(link.getAttribute('target')).toBe('_blank')
      })

      it('should set attribute value', () => {
        document.body.innerHTML = '<a href="#">Link</a>'
        const link = document.querySelector('a')

        link.setAttribute('href', 'https://newurl.com')
        link.setAttribute('target', '_blank')

        expect(link.getAttribute('href')).toBe('https://newurl.com')
        expect(link.getAttribute('target')).toBe('_blank')
      })

      it('should check if attribute exists', () => {
        document.body.innerHTML = '<a href="#" target="_blank">Link</a>'
        const link = document.querySelector('a')

        expect(link.hasAttribute('target')).toBe(true)
        expect(link.hasAttribute('rel')).toBe(false)
      })

      it('should remove attribute', () => {
        document.body.innerHTML = '<a href="#" target="_blank">Link</a>'
        const link = document.querySelector('a')

        link.removeAttribute('target')

        expect(link.hasAttribute('target')).toBe(false)
      })
    })

    describe('Properties vs Attributes', () => {
      it('should show difference between attribute and property', () => {
        document.body.innerHTML = '<input type="text" value="initial">'
        const input = document.querySelector('input')

        // Both start the same
        expect(input.getAttribute('value')).toBe('initial')
        expect(input.value).toBe('initial')

        // Change the property (simulating user input)
        input.value = 'new text'

        // Attribute stays the same, property changes
        expect(input.getAttribute('value')).toBe('initial')
        expect(input.value).toBe('new text')
      })

      it('should show checkbox property vs attribute', () => {
        document.body.innerHTML = '<input type="checkbox" checked>'
        const checkbox = document.querySelector('input')

        // Attribute is string or null
        expect(checkbox.getAttribute('checked')).toBe('')

        // Property is boolean
        expect(checkbox.checked).toBe(true)

        // Toggle the property
        checkbox.checked = false
        expect(checkbox.checked).toBe(false)
        // Attribute may still exist
      })
    })

    describe('Data Attributes and dataset API', () => {
      it('should read data attributes via dataset', () => {
        document.body.innerHTML = '<div id="user" data-user-id="123" data-role="admin"></div>'
        const user = document.querySelector('#user')

        expect(user.dataset.userId).toBe('123')
        expect(user.dataset.role).toBe('admin')
      })

      it('should write data attributes via dataset', () => {
        document.body.innerHTML = '<div id="user"></div>'
        const user = document.querySelector('#user')

        user.dataset.lastLogin = '2024-01-15'

        expect(user.getAttribute('data-last-login')).toBe('2024-01-15')
      })

      it('should delete data attributes', () => {
        document.body.innerHTML = '<div data-role="admin"></div>'
        const div = document.querySelector('div')

        delete div.dataset.role

        expect(div.hasAttribute('data-role')).toBe(false)
      })

      it('should check if data attribute exists', () => {
        document.body.innerHTML = '<div data-user-id="123"></div>'
        const div = document.querySelector('div')

        expect('userId' in div.dataset).toBe(true)
        expect('role' in div.dataset).toBe(false)
      })
    })
  })

  // ===========================================================================
  // STYLING ELEMENTS
  // ===========================================================================
  describe('Styling Elements', () => {
    describe('style Property', () => {
      it('should set inline styles', () => {
        document.body.innerHTML = '<div></div>'
        const box = document.querySelector('div')

        box.style.backgroundColor = 'blue'
        box.style.fontSize = '20px'

        expect(box.style.backgroundColor).toBe('blue')
        expect(box.style.fontSize).toBe('20px')
      })

      it('should remove inline style with empty string', () => {
        document.body.innerHTML = '<div style="color: red;"></div>'
        const box = document.querySelector('div')

        box.style.color = ''

        expect(box.style.color).toBe('')
      })

      it('should set multiple styles with cssText', () => {
        document.body.innerHTML = '<div></div>'
        const box = document.querySelector('div')

        box.style.cssText = 'background: red; font-size: 16px; padding: 10px;'

        expect(box.style.background).toContain('red')
        expect(box.style.fontSize).toBe('16px')
        expect(box.style.padding).toBe('10px')
      })
    })

    describe('getComputedStyle', () => {
      it('should get computed styles', () => {
        document.body.innerHTML = '<div style="display: block;"></div>'
        const box = document.querySelector('div')

        const styles = getComputedStyle(box)

        expect(styles.display).toBe('block')
      })
    })

    describe('classList API', () => {
      it('should add classes', () => {
        document.body.innerHTML = '<button></button>'
        const button = document.querySelector('button')

        button.classList.add('active')
        button.classList.add('btn', 'btn-primary')

        expect(button.classList.contains('active')).toBe(true)
        expect(button.classList.contains('btn')).toBe(true)
        expect(button.classList.contains('btn-primary')).toBe(true)
      })

      it('should remove classes', () => {
        document.body.innerHTML = '<button class="active btn btn-primary"></button>'
        const button = document.querySelector('button')

        button.classList.remove('active')
        button.classList.remove('btn', 'btn-primary')

        expect(button.classList.contains('active')).toBe(false)
        expect(button.classList.contains('btn')).toBe(false)
      })

      it('should toggle classes', () => {
        document.body.innerHTML = '<button></button>'
        const button = document.querySelector('button')

        button.classList.toggle('active')
        expect(button.classList.contains('active')).toBe(true)

        button.classList.toggle('active')
        expect(button.classList.contains('active')).toBe(false)
      })

      it('should toggle with condition', () => {
        document.body.innerHTML = '<button></button>'
        const button = document.querySelector('button')

        button.classList.toggle('active', true)
        expect(button.classList.contains('active')).toBe(true)

        button.classList.toggle('active', false)
        expect(button.classList.contains('active')).toBe(false)
      })

      it('should replace class', () => {
        document.body.innerHTML = '<button class="btn-primary"></button>'
        const button = document.querySelector('button')

        button.classList.replace('btn-primary', 'btn-secondary')

        expect(button.classList.contains('btn-primary')).toBe(false)
        expect(button.classList.contains('btn-secondary')).toBe(true)
      })

      it('should get class count', () => {
        document.body.innerHTML = '<button class="btn btn-primary active"></button>'
        const button = document.querySelector('button')

        expect(button.classList.length).toBe(3)
      })
    })
  })

  // ===========================================================================
  // COMMON PATTERNS
  // ===========================================================================
  describe('Common Patterns', () => {
    describe('Checking Element Existence', () => {
      it('should check if element exists with querySelector', () => {
        document.body.innerHTML = '<div class="exists">Found</div>'

        const element = document.querySelector('.exists')
        if (element) {
          element.textContent = 'Updated!'
        }

        expect(document.querySelector('.exists').textContent).toBe('Updated!')
      })

      it('should handle non-existent element safely', () => {
        document.body.innerHTML = ''

        const element = document.querySelector('.maybe-exists')

        // Using optional chaining (no error)
        element?.classList.add('active')

        expect(element).toBeNull()
      })
    })

    describe('Event Delegation Pattern', () => {
      it('should use closest() for event delegation', () => {
        document.body.innerHTML = `
          <div class="card-container">
            <div class="card">
              <button class="btn">Click</button>
            </div>
          </div>
        `

        let clickedCard = null
        const container = document.querySelector('.card-container')

        // Simulate event delegation
        const btn = document.querySelector('.btn')
        const card = btn.closest('.card')

        if (card) {
          clickedCard = card
        }

        expect(clickedCard).not.toBeNull()
        expect(clickedCard.classList.contains('card')).toBe(true)
      })
    })

    describe('Security Patterns - XSS Prevention', () => {
      it('should demonstrate innerHTML vulnerability with script-like content', () => {
        document.body.innerHTML = '<div id="output"></div>'
        const output = document.getElementById('output')

        // innerHTML can render HTML - potential XSS vector
        const maliciousInput = '<img src="x" onerror="alert(1)">'
        output.innerHTML = maliciousInput

        // The img tag is actually created
        const img = output.querySelector('img')
        expect(img).not.toBeNull()
        expect(img.getAttribute('onerror')).toBe('alert(1)')
      })

      it('should use textContent to safely render user input', () => {
        document.body.innerHTML = '<div id="output"></div>'
        const output = document.getElementById('output')

        // textContent escapes HTML - safe from XSS
        const maliciousInput = '<img src="x" onerror="alert(1)">'
        output.textContent = maliciousInput

        // No img tag created - text is escaped
        const img = output.querySelector('img')
        expect(img).toBeNull()
        expect(output.textContent).toBe('<img src="x" onerror="alert(1)">')
      })

      it('should show difference between innerHTML and textContent with HTML entities', () => {
        document.body.innerHTML = '<div id="html-output"></div><div id="text-output"></div>'

        const htmlOutput = document.getElementById('html-output')
        const textOutput = document.getElementById('text-output')

        const userInput = '<script>steal(cookies)</script>'

        htmlOutput.innerHTML = userInput
        textOutput.textContent = userInput

        // innerHTML parses the HTML (script won't execute in modern browsers but DOM is modified)
        expect(htmlOutput.children.length).toBeGreaterThanOrEqual(0)

        // textContent treats it as plain text
        expect(textOutput.textContent).toBe('<script>steal(cookies)</script>')
        expect(textOutput.children.length).toBe(0)
      })
    })

    describe('Attribute Shortcuts', () => {
      it('should access id directly on element', () => {
        document.body.innerHTML = '<div id="myElement"></div>'
        const element = document.getElementById('myElement')

        expect(element.id).toBe('myElement')

        element.id = 'newId'
        expect(element.id).toBe('newId')
        expect(document.getElementById('newId')).toBe(element)
      })

      it('should access className directly on element', () => {
        document.body.innerHTML = '<div class="box large"></div>'
        const element = document.querySelector('.box')

        expect(element.className).toBe('box large')

        element.className = 'container small'
        expect(element.className).toBe('container small')
      })

      it('should access href directly on anchor elements', () => {
        document.body.innerHTML = '<a href="https://example.com">Link</a>'
        const link = document.querySelector('a')

        expect(link.href).toBe('https://example.com/')

        link.href = 'https://test.com'
        expect(link.href).toBe('https://test.com/')
      })

      it('should access src directly on image elements', () => {
        document.body.innerHTML = '<img src="photo.jpg" alt="Photo">'
        const img = document.querySelector('img')

        expect(img.src).toContain('photo.jpg')

        img.src = 'newphoto.png'
        expect(img.src).toContain('newphoto.png')
      })

      it('should access title directly on elements', () => {
        document.body.innerHTML = '<button title="Click me">Button</button>'
        const button = document.querySelector('button')

        expect(button.title).toBe('Click me')

        button.title = 'New tooltip'
        expect(button.title).toBe('New tooltip')
      })
    })

    describe('className vs classList Comparison', () => {
      it('should replace all classes when using className', () => {
        document.body.innerHTML = '<div class="one two three"></div>'
        const element = document.querySelector('div')

        // className replaces everything
        element.className = 'four'

        expect(element.className).toBe('four')
        expect(element.classList.contains('one')).toBe(false)
        expect(element.classList.contains('four')).toBe(true)
      })

      it('should add single class without affecting others using classList', () => {
        document.body.innerHTML = '<div class="one two three"></div>'
        const element = document.querySelector('div')

        // classList.add preserves existing classes
        element.classList.add('four')

        expect(element.classList.contains('one')).toBe(true)
        expect(element.classList.contains('two')).toBe(true)
        expect(element.classList.contains('three')).toBe(true)
        expect(element.classList.contains('four')).toBe(true)
      })

      it('should toggle class on and off with classList', () => {
        document.body.innerHTML = '<div class="active"></div>'
        const element = document.querySelector('div')

        expect(element.classList.contains('active')).toBe(true)

        element.classList.toggle('active')
        expect(element.classList.contains('active')).toBe(false)

        element.classList.toggle('active')
        expect(element.classList.contains('active')).toBe(true)
      })
    })

    describe('Performance Patterns', () => {
      it('should cache DOM references instead of repeated queries', () => {
        document.body.innerHTML = '<div id="target">Content</div>'

        // Bad: querying multiple times (we just demonstrate the pattern)
        const query1 = document.getElementById('target')
        const query2 = document.getElementById('target')
        const query3 = document.getElementById('target')

        // Good: cache the reference
        const cached = document.getElementById('target')
        const ref1 = cached
        const ref2 = cached
        const ref3 = cached

        // All references point to same element
        expect(ref1).toBe(ref2)
        expect(ref2).toBe(ref3)
        expect(cached).toBe(query1)
      })

      it('should batch DOM updates using documentFragment', () => {
        document.body.innerHTML = '<ul id="list"></ul>'
        const list = document.getElementById('list')

        // Use fragment to batch insertions
        const fragment = document.createDocumentFragment()

        for (let i = 0; i < 5; i++) {
          const li = document.createElement('li')
          li.textContent = `Item ${i}`
          fragment.appendChild(li)
        }

        // Single DOM update
        list.appendChild(fragment)

        expect(list.children.length).toBe(5)
        expect(list.children[0].textContent).toBe('Item 0')
        expect(list.children[4].textContent).toBe('Item 4')
      })

      it('should avoid layout thrashing by batching reads and writes', () => {
        document.body.innerHTML = `
          <div class="box" style="width: 100px; height: 100px;"></div>
          <div class="box" style="width: 100px; height: 100px;"></div>
        `
        const boxes = document.querySelectorAll('.box')

        // Good pattern: read all first, then write all
        const heights = []

        // Batch reads - get heights from style (JSDOM doesn't compute offsetHeight)
        boxes.forEach(box => {
          heights.push(parseInt(box.style.height, 10))
        })

        // Batch writes
        boxes.forEach((box, i) => {
          box.style.height = `${heights[i] + 10}px`
        })

        expect(boxes[0].style.height).toBe('110px')
        expect(boxes[1].style.height).toBe('110px')
      })

      it('should use textContent for better performance than innerHTML for text', () => {
        document.body.innerHTML = '<div id="target"></div>'
        const target = document.getElementById('target')

        // textContent is faster for plain text (no HTML parsing)
        target.textContent = 'Plain text content'

        expect(target.textContent).toBe('Plain text content')
        expect(target.innerHTML).toBe('Plain text content')
        expect(target.children.length).toBe(0)
      })
    })

    describe('Properties vs Attributes Extended', () => {
      it('should handle maxLength property on input', () => {
        document.body.innerHTML = '<input type="text" maxlength="10">'
        const input = document.querySelector('input')

        // Property returns number
        expect(input.maxLength).toBe(10)
        expect(typeof input.maxLength).toBe('number')

        // Attribute returns string
        expect(input.getAttribute('maxlength')).toBe('10')
        expect(typeof input.getAttribute('maxlength')).toBe('string')
      })

      it('should handle checked property on different input types', () => {
        document.body.innerHTML = `
          <input type="checkbox" id="cb" checked>
          <input type="radio" id="rb" name="group" checked>
        `

        const checkbox = document.getElementById('cb')
        const radio = document.getElementById('rb')

        // Both have boolean checked property
        expect(checkbox.checked).toBe(true)
        expect(radio.checked).toBe(true)

        // Toggle checkbox
        checkbox.checked = false
        expect(checkbox.checked).toBe(false)

        // Attribute still shows original
        expect(checkbox.hasAttribute('checked')).toBe(true)
      })
    })

    describe('Clone ID Collision Prevention', () => {
      it('should demonstrate ID collision issue with cloneNode', () => {
        document.body.innerHTML = '<div id="original">Content</div>'
        const original = document.getElementById('original')

        // Clone keeps the same ID - causes collision!
        const clone = original.cloneNode(true)
        document.body.appendChild(clone)

        // Now we have two elements with same ID
        const allWithId = document.querySelectorAll('#original')
        expect(allWithId.length).toBe(2)

        // getElementById returns only first one
        expect(document.getElementById('original')).toBe(original)
      })

      it('should fix ID collision by changing cloned element ID', () => {
        document.body.innerHTML = '<div id="original">Content</div>'
        const original = document.getElementById('original')

        const clone = original.cloneNode(true)

        // Fix: change ID before appending
        clone.id = 'clone-1'
        document.body.appendChild(clone)

        // No collision - both accessible
        expect(document.getElementById('original')).toBe(original)
        expect(document.getElementById('clone-1')).toBe(clone)
        expect(document.getElementById('clone-1').textContent).toBe('Content')
      })
    })

    describe('Complex Selectors', () => {
      it('should select elements using :not() pseudo-selector', () => {
        document.body.innerHTML = `
          <button class="btn">Normal</button>
          <button class="btn disabled">Disabled</button>
          <button class="btn">Another</button>
        `

        // Select buttons that are NOT disabled
        const activeButtons = document.querySelectorAll('.btn:not(.disabled)')

        expect(activeButtons.length).toBe(2)
        expect(activeButtons[0].textContent).toBe('Normal')
        expect(activeButtons[1].textContent).toBe('Another')
      })

      it('should select elements using :first-of-type pseudo-selector', () => {
        document.body.innerHTML = `
          <div class="container">
            <span>First span</span>
            <p>First paragraph</p>
            <span>Second span</span>
            <p>Second paragraph</p>
          </div>
        `

        const firstSpan = document.querySelector('.container span:first-of-type')
        const firstP = document.querySelector('.container p:first-of-type')

        expect(firstSpan.textContent).toBe('First span')
        expect(firstP.textContent).toBe('First paragraph')
      })
    })
  })
})
