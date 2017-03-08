'use strict'

const request = require('request')

const server = process.env.KADFE_SERVER

const parse = message => JSON.parse(message)['message']

const coffeeEP = `${server}/coffee`

const status = () => {
  return new Promise((resolve, error) => 
    request.get(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(body)
        else resolve(body) 
      })
  )
}

const claim = () => {
  return new Promise((resolve, error) =>
    request.post(coffeeEP,
      (err, resp, bod) => {
        if (err) error(err)
        else if (resp.statusCode !== 200) error(body)
        else resolve(body)
      })
  )
}

module.export = { status, claim }
