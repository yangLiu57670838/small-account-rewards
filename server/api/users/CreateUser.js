"use strict";
const Q = require('q')
const log = require('../../../logs/Log').create()
const connection = require('../../../database/CreateConnection')
const profileFinder = require('./FindUser')

exports.CreateUserDetails = (() => {
  const create = this
  const db = connection.db()
  const pgHelper = connection.pgpHelper()

  create.create = (userDetails) => {
    log.info('CreateUser.create register_user: %s', userDetails)
    const params = transform(userDetails)

    let query = pgHelper.insert(params, null, 'register_user') + ' returning id';

    return db.one(query)
      .then((data) => {
        log.info('CreateUser.create created new user: %j ', data.id);
        // return profileFinder.findByEmail(data.email)
        return true
      })
      .then((found) => {
        log.info('CreateUserDetails.create loaded userProfile: %j ', found);
        return found
      })
      .catch((error) => {
        log.error('CreateUserDetails.create error: %j, params: %j, userDetails: %j', error, params, userDetails);
        return Q.reject({statusCode: 500, text: 'There is a database error'});
      })
      .finally(function () {
        log.info('CreateUserDetails.create finally...')
        connection.end()
      });
  }

  const transform = (userDetails) => {
    log.info('CreateUser.transform userDetails: %j', userDetails)

    const initRewards = 100;
    return {
      "user_name": userDetails.user_name,
      "create_on": new Date().toISOString(),
      "rewards": initRewards
    }

  }

})();

