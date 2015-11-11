/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

var path = require('path');

module.exports = require('./make-webpack-config')({
  env: 'production',
  entry: {
    index: [
      path.resolve(__dirname, '../src/index.js')
    ]
  },
  output: {
    filename: '[name].js',
    library: 'MyLibrary'
  },
  lint: true
});
