"use strict";

module.exports = function(options) {
  var module = {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!sass'}
    ]
  };

  var reporters = [ 'progress'];

  if (options.coverage) {
    module['preLoaders'] = [
      {test: /\.(js|jsx)$/, include: /\.\/src\/.+\/__tests__\//, loader: 'babel'},
      {test: /\.(js|jsx)$/, exclude: /(__tests__|node_modules)/, loader: 'isparta'}
    ];

    reporters = reporters.concat(['coverage', 'threshold']);
  }

  return {
    browsers: [
      'PhantomJS'
    ],

    files: [
      'app/test-index.js'
      // each file acts as entry point for the webpack configuration
    ],

    frameworks: [
      'jasmine-ajax',
      'jasmine',
      'phantomjs-shim'
    ],

    preprocessors: {
      // add webpack as preprocessor
      'app/test-index.js': ['webpack', 'sourcemap']
    },

    webpack: {
      devtool: 'inline-source-map',

      module: module,
      watch: true
    },
    reporters: reporters,

    coverageReporter: {
      dir: './coverage/',
      reporters: [
        { type: 'text', subdir: 'report-text'},
        { type: 'html', subdir: 'report-html' }
      ]
    },

    thresholdReporter: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100
    },

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
};