'use strict';
const app = require('../../../app');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;
const log = require('../../../logs/Log').create()
const data = require('./UserData')

describe('CreateUser', function () {
  it('should return user details', function (done) {
     let userDetails = data.create()
    request(app)
      .post('/users/create')
      .send(userDetails)
      .expect(200)
      .end(function (err, res) {
        log.info('created %j', res)

        const created = JSON.parse(res.text)

        log.info('created text %j', created)

        expect(created).to.be.ok;
        expect(created.user_name).to.be.ok;

        done()
      });

  });


});