'use strict'

const request = require('request')
const WebSocket = require('ws')

// server address setup
const host = process.env.KADFE_HOST
const port = process.env.KADFE_PORT ? `:${process.env.KADFE_PORT}` : ''
const ssl = process.env.KADFE_SSL &&
  (JSON.parse(process.env.KADFE_SSL) ? 's' : '')

// validate our environment variables
if (!host || !ssl) {
  throw(Error("Please provide the KADFE_HOST and KADFE_SSL environment variables"))
}

// construct our server url
const server = `http${ssl}://${host}${port}`

const parse = message => JSON.parse(message)['message']
const coffeeEP = `${server}/coffee`
const coffeeWS = `ws${ssl}://${host}`


// Interface
/* Fetch the current coffee status from the server */
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

/* "Clear" the current coffee status from the server */
const clearCoffee = () => {
  return new Promise((resolve, error) =>
    request.delete(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(bod)
        else resolve(JSON.parse(bod))
      })
  )
}

/* Update the server to know that coffee exists */
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

/* Return a promise that will contain a websocket connection
 * to the server if one can be created.
 */
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

module.exports = { openSocket, coffeeStatus, clearCoffee, makeCoffee }
