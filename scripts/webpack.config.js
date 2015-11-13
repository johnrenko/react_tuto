/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

var path = require('path');

module.exports = require('./make-webpack-config')({
  entry: {
    module: [
      path.join(__dirname, '../src/index.js')
    ]
  },
  lint: true,
  myob_styles: true,
  // OPTIONAL: This can optimise your build a lot at the expense of sourcemaps for third party libraries (look at scripts/webpack-libs)
  // Libraries listed here are no parsed by Webpack unless set otherwise
  libs: [
    // Core libraries
    {react: {
      path: 'react/dist/react.min.js',
      loader: true
    }},
    {'react-dom': {
      path: 'react-dom/dist/react-dom.min.js',
      loader: true
    }},
    {'react-bootstrap': {
      path: 'react-bootstrap/dist/react-bootstrap.min.js',
      loader: true
    }},
    {'alt/utils': 'alt/utils'},
    {alt: {
      path: 'alt/dist/alt.min.js',
      loader: true
    }},
    // More third parties
    {moment: {
      path: 'moment/min/moment.min.js',
      loader: true
    }}
  ]
});
