const express = require('express')

const app = express()

const coffee = null

app.get('/coffee', (req, resp) => {
  resp.write({ status: true })
  resp.end()
})

app.post('/coffee',  (req, resp) => {
  if (coffee) {
    resp.statusCode = 409
    resp.write({ status: false })
  }
  else {
    resp.statusCode = 200
    resp.write({ status: true })
  }
  resp.end()
})

app.delete('/coffee', (req, resp) => {
  if (coffee) {
    resp.statusCode = 409
    resp.write({ status: false })
  }
  else {
    resp.statusCode = 200
    resp.write({ status: true })
  }
  resp.end()
})

module.exports = app
