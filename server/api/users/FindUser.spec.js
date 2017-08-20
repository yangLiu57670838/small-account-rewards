'use strict';
const app = require('../app');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;
const assert = chai.assert;
const log = require('../logs/Log').create()
const data = require('./UserData')

describe('FindUserProfile', function() {
  const email = data.test6Id()

  it('should userProfile for email ' + email, function(done) {
    const token = require('../auth0/GenerateTestToken')
    request(app)
      .get('/fishers/user-profiles/' + email)
      .set('authorization', 'Bearer ' + token)
      .then((res) => {
        const found = res.body;

        log.info('found: %j', found)

        expect(found).to.be.ok

        expect(found.details.email).to.equal(email)

        done()
      }).catch((errors) => {
      log.error('failed catch %s', errors)
      done(errors)
    })

  });

});