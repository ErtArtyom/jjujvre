const chai = require('chai')
const chaiPromised = require('chai-as-promised')
const server = require('./server.js')
const client = require('../index.js')
const expect = chai.expect

chai.use(chaiPromised)

describe('POST /coffee', function() {
  describe('success', function() {
    before(function() {
      this.server = server.listen(3000)
    })

    after(function() {
      this.server.close()
    })

    it('should return coffee status information', function() {
      expect(client.claimCoffee().catch(console.log)).
        to.eventually.become({ status: true })
    })
  })

  describe('cannot claim', function() {
    before(function() {
      this.server = server.listen(3000)
    })

    after(function() {
      this.server.close()
    })

    it ('should return 409 if coffee is claimed', function() {
      expect(client.claimCoffee().then(_ =>
        client.claimCoffee()).catch(console.log)).
          to.eventually.be.rejected
    })
  })

  describe('error code', function() {
    it('should return coffee error information', function() {
      expect(client.claimCoffee().catch(console.log)).
        to.eventually.be.rejected
    })
  })
})
