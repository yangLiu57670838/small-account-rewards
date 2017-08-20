'use strict';
const log = require('../../../logs/Log').create()
const extend = require('util')._extend
const empty = require('is-empty')
exports.UserData = (() => {
  const data = this
  let base = {
    "user_name": "Brain"
  };

  data.genericToken = () => {
    return 'sjd1HfkjU83ksdsm3802k';
  }

  data.create = () => {
    return base
  }

})();