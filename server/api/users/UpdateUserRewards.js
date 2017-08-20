"use strict";
const Q = require('q')
const log = require('../../../logs/Log').create()
const connection = require('../../../database/CreateConnection')

exports.UpdateUserRewards = (() => {
  const updater = this;
  const db = connection.db();
  const pgpHelper = connection.pgpHelper();

  updater.update = (userDetails) => {
    log.info('UpdateUserRewards.update  %s ',userDetails);
    let transformedUserDetails = {};
    populateBasicData(userDetails, transformedUserDetails);
    return updateDatabase(userDetails, transformedUserDetails);

  };

  const updateDatabase = (userDetails, transformedUserDetails) => {
    let query = pgpHelper.update(transformedUserDetails, null, 'register_user') + ' WHERE user_name = \'' + userDetails.user_name + '\'';
    log.debug('\n\nUpdateUserRewards.update params %j query %j', transformedUserDetails, query);
    log.info('UpdateUserRewards.update userDetails %s ', userDetails);

    return db.none(query)
      .catch((error) => {
        log.error('UpdateUserRewards.update error: %j, params: %j, userDetails: %j', error, transformedUserDetails, userDetails);
        return Q.reject({statusCode: 500, text: 'There is a database error'});
      })
      .finally(function () {
        log.debug('UpdateUserRewards.update finally...');
        connection.end();
      });
  };

  const populateBasicData = (userDetails , transformedUserDetails) => {
    log.debug('UpdateUserRewards.update.transformBasicData');

    transformedUserDetails.rewards = userDetails.rewards;

    log.debug('UpdateUserRewards.update.transformBasicData %j',transformedUserDetails);
    return transformedUserDetails;
  }

})();