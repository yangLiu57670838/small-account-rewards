'use strict';
const app = require('../../../app');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;
const log = require('../../../logs/Log').create()
describe('Update user rewards tests', function () {
  it('should update user rewards', function (done) {

    let userDetails = {
      "rewards": 500000000,
      "user_name": "Brain"
    };

    request(app)
      .put('/users/update')
      .send(userDetails)
      .end(function (err, res) {
        log.info('Test User Rewards update')
        expect(res.statusCode).to.equal(200);
        done();
      });

  });
});