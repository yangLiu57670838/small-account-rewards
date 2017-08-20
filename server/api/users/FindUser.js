"use strict";
const Q = require('q')
const log = require('../../../logs/Log').create()
const connection = require('../../../database/CreateConnection')

exports.FindUser = (() => {
  const finder = this
  const db = connection.db()

  finder.findById = (id) => {

    log.info('FindUser.findById %s', id);

    return db.one("select * from register_user where id=$1", [id])
      .then(function (data) {
        log.debug('FindUser.findById found: %j', data);
        return data;
      }, (err) => {
        log.info('err in find one: %s ', err)
        return Q.reject({statusCode: 404, text: 'Not found'});
      })
      .catch(function (error) {
        log.error('FindUser.findById catch: %j', error);
        return Q.reject(error);
      })
      .finally(function () {
        log.debug('FindUser.findById finally...')
        connection.end()
      });

  };


})();
