/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

const path = require('path'),
  processLibs = require('./webpack-libs'),
  rootPath = path.join(__dirname, '..'),
  srcPath = path.join(rootPath, 'src'),
  testsPath = path.join(rootPath, 'tests'),
  stylesPath = path.join(rootPath, 'styles'),
  myobPath = path.join(rootPath, 'node_modules/@myob');

module.exports = function(options) {
  var module = {
    loaders: [
      {test: /\.js?$/, include: [srcPath, testsPath], loader: 'babel?cacheDirectory&externalHelpers'},
      {test: /\.scss$/, loader: 'style!css!sass'},
      {test: /\.css$/, loader: 'style!css'}
    ]
  };

  const config = {
    browsers: ['PhantomJS'],

    files: [
      '../tests/index.js'
      // Each file acts as entry point for the webpack configuration
    ],

    frameworks: [
      'jasmine-ajax',
      'jasmine',
      'phantomjs-shim'
    ],

    preprocessors: {
      // Add webpack as preprocessor
      '../tests/index.js': ['webpack', 'sourcemap']
    },

    webpack: {
      cache: true,
      resolve: {
        root: [srcPath, testsPath, stylesPath, myobPath],
        extensions: ['', '.js'],
        modulesDirectories: ['node_modules'],
        // Babel
        alias: {
          'babel-core/polyfill': 'babel-core/browser-polyfill.min.js',
          'babel-core/external-helpers': 'babel-core/external-helpers.min.js'
        }
      },

      module: module,
      devtool: 'cheap-module-eval-source-map',
      watch: true
    },
    reporters: ['progress'],
    colors: true,

    coverageReporter: {
      dir: '../coverage/',
      reporters: [
        {type: 'text', subdir: 'report-text'},
        {type: 'html', subdir: 'report-html'}
      ]
    },

    thresholdReporter: options.thresholdReporter || {},

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    plugins: [
      'karma-jasmine',
      'karma-phantomjs-shim',
      'karma-phantomjs-launcher',
      'karma-webpack',
      'karma-chrome-launcher',
      'karma-jasmine-ajax',
      'karma-sourcemap-loader',
      'karma-coverage',
      'karma-threshold-reporter'
    ]
  };

  if (options.logLevel) config.logLevel = options.logLevel;
  if (options.libs) config.webpack.libs = options.libs;

  if (options.coverage) {
    config.webpack.module.preLoaders = [
      {test: /\.js$/, include: /src/, exclude: /(node_modules|tests)/, loader: 'isparta'}
    ];

    config.reporters = config.reporters.concat(['coverage', 'threshold']);
  }

  processLibs(config.webpack);
  return config;
};
