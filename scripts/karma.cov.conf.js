/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

module.exports = function(config) {
  config.set(require('./make-karma-config')({
    coverage: true,
    thresholdReporter: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    }
  }));
};
