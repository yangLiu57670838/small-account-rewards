"use strict";
const Q = require('q')
const log = require('../logs/Log').create()
const pgp = require('pg-promise')({
  promiseLib:Q
})
require('dotenv').config()

const CONNECTION = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user:  process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD
}

const create = this
const db = pgp(CONNECTION)
log.info('CreateConnection.create CONNECTION: %j, process.env.NODE_ENV: %s', CONNECTION, process.env.NODE_ENV)

exports.CreateConnection = (() => {

  create.db = () => {
    log.debug('CreateConnection.db ')
    return db
  }
  create.end = () => {
    pgp.end()
  }
  create.pgpHelper = () =>{
    return pgp.helpers
  }
})();

