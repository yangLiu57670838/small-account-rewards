'use strict';
const chai = require('chai')
const expect = chai.expect
const log = require('../../../logs/Log').create()
const deleter = require('./DeleteUser')

describe('Delete one account from id', function() {
  it('should get the count', function(done) {
      const id = 2

    deleter.delete(id)
      .then((res) => {
        const count = res;
        log.info('deleted %j',count);
        expect(count).to.be.at.least(0);
        done();
      }).catch((errors) => {
      log.error('failed catch %s', errors)
      done(errors)
    })

  });

});