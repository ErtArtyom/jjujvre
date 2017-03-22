'use strict'

const request = require('request')
const WebSocket = require('ws')

// server address setup
const host = process.env.KADFE_HOST
const port = process.env.KADFE_PORT ? `:${process.env.KADFE_PORT}` : ''
const ssl = JSON.parse(process.env.KADFE_SSL) ? 's' : ''
const server = `http${ssl}://${host}${port}`

const parse = message => JSON.parse(message)['message']

const coffeeEP = `${server}/coffee`
const coffeeWS = `ws${ssl}://${host}`

// Returns promise of WebSockets to come
const openSocket = () => {
  return new Promise((resolve, error) => {
    var ws = new WebSocket(coffeeWS, {
      perMessageDeflate: false
    }).on('error', (err) => {
      console.log(`socket error: ${err}`)
      error(err)
    }).on('close', (code, reason) => {
      console.log(`socket closed. code: ${code} | reason: ${reason}`)
    }).on('open', () => {
      console.log('socket opened')
    })
    resolve(ws)
  })
}

// Interace
const coffeeStatus = () => {
  return new Promise((resolve, error) =>
    request.get(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(bod)
        else resolve(JSON.parse(bod))
      })
  )
}

const claimCoffee = () => {
  return new Promise((resolve, error) =>
    request.delete(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(bod)
        else resolve(JSON.parse(bod))
      })
  )
}

const makeCoffee = () => {
  return new Promise((resolve, error) =>
    request.post(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(bod)
        else resolve(JSON.parse(bod))
      })
  )
}

module.exports = { openSocket, coffeeStatus, claimCoffee, makeCoffee }
