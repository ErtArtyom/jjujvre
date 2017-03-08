const chai = require('chai')
const chaiPromised = require('chai-as-promised')
const server = require('./server.js')
const client = require('../index.js')
const expect = chai.expect

chai.use(chaiPromised)

describe('GET /coffee', function() {
  describe('success', function() {
    before(function() {
      this.server = server.listen(3000)
    })

    after(function() {
      this.server.close()
    })

    it('should return coffee status information', function() {
      expect(client.coffeeStatus().catch(e => console.log(e))).
        to.eventually.become({ status: true })
    })
  })

  describe('error code', function() {
    it('should return coffee error information', function() {
      expect(client.coffeeStatus().catch(e => console.log(e))).
        to.eventually.be.rejected
    })
  })
})
