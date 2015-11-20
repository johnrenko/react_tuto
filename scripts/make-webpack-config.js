/**
 * Copyright (C) MYOB - 2015
 */

'use strict';

const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  TransferWebpackPlugin = require('transfer-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  autoprefixer = require('autoprefixer'),
  processLibs = require('./webpack-libs'),
  path = require('path');

const rootPath = path.join(__dirname, '..'),
  modulesPath = path.join(rootPath, 'node_modules'),
  srcPath = path.join(rootPath, 'src'),
  stylesPath = path.join(rootPath, 'styles'),
  myobPath = path.join(rootPath, 'node_modules/@myob');

module.exports = function(options) {
  const env = options.env || 'development';

  const defaultLoaders = [
    {test: /\.js?$/, include: [srcPath], loader: 'babel?cacheDirectory&externalHelpers'},
    {test: /\.(png|jp(e)?g|gif|svg|cur)/, loader: 'url?limit=8192&name=/fonts/[name].[ext]'},
    {test: /\.(ico|ttf|eot|woff(2)?)/, loader: 'file?name=/images/[name].[ext]'}
  ];

  const defaultPlugins = [
    new webpack.DefinePlugin({
      'process.env': {
        // This has an effect on the react lib size
        NODE_ENV: JSON.stringify(env)
      }
    }),
    // Prevent moment.js to auto-require all the locales
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ];

  const config = {
    target: 'web',
    cache: true,
    resolve: {
      root: [srcPath, stylesPath, myobPath],
      extensions: ['', '.js'],
      modulesDirectories: ['node_modules'],
      // Babel
      alias: {
        'babel-core/polyfill': 'babel-core/browser-polyfill.min.js',
        'babel-core/external-helpers': 'babel-core/external-helpers.min.js'
      }
    },
    output: {
      publicPath: 'http://localhost:8080/',
      filename: '[name].js'
    },

    module: {
      preLoaders: [],
      loaders: []
    },
    postcss: [autoprefixer({browsers: ['last 2 versions', 'ie >= 10']})],
    plugins: []
  };

  // Merge in default config with options
  Object.assign(config, options || {});

  // Minimum loaders and plugins
  config.module.loaders = config.module.loaders.concat(defaultLoaders);
  config.plugins = config.plugins.concat(defaultPlugins);

  // Enable linting
  if (options.lint) {
    config.module.preLoaders.push({test: /\.js?$/, include: [srcPath], loader: 'eslint'});
    config.eslint = {
      quiet: true
    };
  }

  // Extract styles in a separate file
  if (options.separateStylesheet) {
    config.module.loaders.push({test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss?sourceMap!sass?sourceMap')});
    config.module.loaders.push({test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss?sourceMap')});
    config.plugins.push(new ExtractTextPlugin('[name].[contenthash].css'));
  }
  // Embedded styles
  else {
    config.module.loaders.push({test: /\.scss$/, loader: 'style!css!postcss!sass'});
    config.module.loaders.push({test: /\.css$/, loader: 'style!css!postcss'});
  }

  // Compress the package
  if (options.compress) {
    config.plugins.push(new CompressionPlugin({
      asset: '{file}.gz',
      algorithm: 'gzip',
      minRatio: 10
    }));
  }

  // Copy the precompiled myob styles assets to speed up build (and avoid reprocessing)
  if (options.myob_styles) {
    config.plugins.push(new TransferWebpackPlugin([
      {from: '@myob/myob-styles/dist', to: ''}
    ], modulesPath));
  }

  processLibs(config);

  // Environment specific rules
  if (env === 'production') {
    config.debug = false;
    config.devtool = false;
    config.output.path = config.output.path || path.join(rootPath, 'dist');
    config.output.pathInfo = config.output.pathInfo || false;

    config.plugins.push(new webpack.optimize.DedupePlugin());
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin(true));
  }
  else {
    config.debug = true;
    config.devtool = config.devtool || 'cheap-module-eval-source-map';
    config.output.path = config.output.path || path.join(rootPath, 'tmp');
    config.output.pathInfo = config.output.pathInfo || true;

    config.plugins.push(new HtmlWebpackPlugin({
      inject: true,
      template: options.templateHTML || 'src/index.html'
    }));
  }

  return config;
};
