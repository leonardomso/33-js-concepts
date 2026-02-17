import { describe, it, expect } from 'vitest'

describe('Clean Code', () => {
  describe('descriptive names and explicit intent', () => {
    it('calculates active product totals with readable naming', () => {
      const PRODUCT_STATUS = {
        ACTIVE: 1,
        INACTIVE: 0,
      }

      function calculateActiveProductsTotal(products, taxRate) {
        let total = 0
        for (const product of products) {
          if (product.status === PRODUCT_STATUS.ACTIVE) {
            total += product.price * taxRate
          }
        }
        return total
      }

      const products = [
        { status: PRODUCT_STATUS.ACTIVE, price: 100 },
        { status: PRODUCT_STATUS.INACTIVE, price: 200 },
        { status: PRODUCT_STATUS.ACTIVE, price: 50 },
      ]

      expect(calculateActiveProductsTotal(products, 1.1)).toBeCloseTo(165, 10)
    })
  })

  describe('single responsibility and composition', () => {
    it('filters and emails only active clients through focused helpers', () => {
      const database = {
        lookup(client) {
          return {
            isActive() {
              return client.active
            },
          }
        },
      }

      const sent = []
      const email = (client) => sent.push(client.id)

      function isActiveClient(client) {
        const clientRecord = database.lookup(client)
        return clientRecord.isActive()
      }

      function emailActiveClients(clients) {
        clients.filter(isActiveClient).forEach(email)
      }

      emailActiveClients([
        { id: 'a', active: true },
        { id: 'b', active: false },
        { id: 'c', active: true },
      ])

      expect(sent).toEqual(['a', 'c'])
    })
  })

  describe('avoid boolean flag APIs', () => {
    it('uses two focused functions instead of one flag-based function', () => {
      const files = []

      function createFile(name) {
        files.push(name)
      }

      function createTempFile(name) {
        createFile(`./temp/${name}`)
      }

      createFile('report.txt')
      createTempFile('cache.json')

      expect(files).toEqual(['report.txt', './temp/cache.json'])
    })
  })
})
