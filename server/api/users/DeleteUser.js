"use strict";
const Q = require('q')
const log = require('../../../logs/Log').create()
const connection = require('../../../database/CreateConnection')

exports.DeleteUser = (() => {
  const deleter = this;
  const db = connection.db();
  const pgHelper = connection.pgpHelper();

  deleter.delete = (id) => {
    log.info('DeleteUser.delete id: %s ', id);

    return db.result('delete from register_user where id = ${id}', {id:id})
      .then((result) => {
        log.info('DeleteUser result.rowCount: %s', result.rowCount)
        return result.rowCount;
      })
      .catch((error) => {
        log.error('DeleteUser.delete error: %j', error);
        return Q.reject({statusCode: 500, text: 'There is a database error'});
      })
      .finally(function () {
        log.debug('DeleteUser.delete finally...');
        connection.end();
      });
  };

})();