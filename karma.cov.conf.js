"use strict";

module.exports = function(config) {
  config.set(require('./make-karma-config')({coverage: true}));
};
