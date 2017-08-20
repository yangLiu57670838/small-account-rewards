'use strict';
const app = require('../../../app');
const chai = require('chai');
const request = require('supertest');
const expect = chai.expect;
const log = require('../../../logs/Log').create()
describe('Find user tests', function () {
  it('should return user details for id 1', function (done) {

    request(app)
      .get('/users/find/1')
      .expect(200)
      .end(function (err, res) {
        const found = res.body;
        log.info('Test User Details find')
        expect(res.statusCode).to.equal(200);
        expect(found).to.be.ok;
        expect(found.rewards).to.be.ok;
        expect(found.id).to.equal(1);
        done();
      });
  });
});