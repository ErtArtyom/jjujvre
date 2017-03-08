'use strict'

const request = require('request')

// server address setup
const host = process.env.KADFE_HOST
const port = process.env.KADFE_PORT ? `:${process.env.KADFE_PORT}` : ''
const ssl = JSON.parse(process.env.KADFE_SSL)
const prefix = ssl ? 'https' : 'http'
const server = `${prefix}://${host}${port}`

const parse = message => JSON.parse(message)['message']

const coffeeEP = `${server}/coffee`

// Interace
const coffeeStatus = () => {
  return new Promise((resolve, error) => 
    request.get(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(body)
        else resolve(body) 
      })
  )
}

const claimCoffee = () => {
  return new Promise((resolve, error) =>
    request.post(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(body)
        else resolve(body)
      })
  )
}

module.exports = { coffeeStatus, claimCoffee }
