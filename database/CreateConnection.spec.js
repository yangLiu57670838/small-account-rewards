'use strict';
const chai = require('chai');
const expect = chai.expect;

var promise = require('bluebird'); // or any other Promise/A+ compatible library;

var options = {
  promiseLib: promise // overriding the default (ES6 Promise);
};

var pgp = require('pg-promise')(options);

require('dotenv').config()

const cn = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  user:  process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000
}

if(!db) {
  var db = pgp(cn); // database instance
}

describe('register_user table tests', function() {
  it('should return register user', function(done) {

    const promise = db.any("select * from register_user")
      .then((data) => {
        console.log("DATA!:", data);
        expect(data).to.be.ok
        return data
      })
      .catch((error) => {
        console.log("ERROR:", error);
        expect(false).to.be.ok
      })
      .finally(() => {
        console.log('finally...')
        pgp.end();
        done()
      });

    promise.then(function (data) {
    }).catch((err) => {
      console.log('ERROR!!!!!!!!!!!!!!!!!!!!!! ', err)
    })
  })
})
