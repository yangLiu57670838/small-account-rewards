"use strict";
const Q = require('q');
const log = require('../logs/Log').create();
const connection = require('../database/CreateConnection');
const orderFinder = require('../orders/FindOrders');
const userFinder = require('../user-details/FindUserDetails');
const tagFinder = require('../tags/FindTags');
const maxCounter = require('../orders/CountMaxOrderTags');
const settingsFinder = require('../tag-settings/FindTagSettings')

exports.FindUserProfile = (() => {
  const profileFinder = this
  const db = connection.db();

  profileFinder.findByEmail = (email) => {
    log.info('FindUserProfile.find : %s', email);
    const userProfile = {tagSettings: {}}
    return userFinder.findByEmail(email)
      .then((userDetails) => {
        log.info('FindUserProfile.find userProfile %j', userDetails);
        userProfile.details = userDetails;
        return orderFinder.findByEmail(email)
      })
      .then((orders) => {
        log.info('FindUserProfile.find orders: %j', orders.lenth);
        userProfile.tagOrders = orders
        return maxCounter.count(email);
      })
      .then((counts) => {
        log.info('FindUserProfile.find maxCounts: %j', counts);
        userProfile.maxCounts = counts
        return tagFinder.findByEmail(email);
      })
      .then((tags) => {
        log.info('FindUserProfile.find tags: %j', tags.lenth);
        userProfile.tags = tags
        return settingsFinder.find();
      })
      .then((settings) => {
        log.info('FindUserProfile.find settings: %j', settings.lenth);
        userProfile.tagSettings = settings
        return userProfile
      })
      .catch(function (error) {
        log.error('FindUserProfile.find catch: %j', error);
        return Q.reject(error);
      }).finally(function () {
        log.info('FindUserProfile.find finally...')
        connection.end()
      });
  };

})();