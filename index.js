'use strict'

const request = require('request')

const server = process.env.KADFE_SERVER

const parse = message => JSON.parse(message)['message']

const getStatus = cb => {
  request.get(`${server}/status`).
    on('response', resp => {
      if (resp.statusCode == 200)
        cb(parse(message.statusMessage))
      else
        cb('Could not get coffee data at this time')
    }).
    on('error', err => {
      console.log(err)
      cb(err)
    })
}

const claim = (user, cb) => {
  request.post(`${server}/claim?user=${user}`).
    on('response', resp => {
      if (resp.statusCode == 200)
        cb(parse(message.statusMessage))
      else
        cb(`Could not claim coffee for ${user}`)
    }).
    on('error', err => {
      console.log(err)
      cb(err)
    })
}

const release = (user, cb) => {
  request.post(`${server}/release?user=${user}`).
    on('response', resp => {
      if (resp.statusCode == 200)
        cb(parse(message.statusMessage))
      else
        cb(`Could not release coffee for ${user}`)
    }).
    on('error', err => {
      console.log(err)
      cb(err)
    })
}

module.exports = { getStatus, claim, release }
