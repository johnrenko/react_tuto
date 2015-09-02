"use strict";

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CompressionPlugin = require("compression-webpack-plugin");

var defaultLoaders = [
  {
    //tell webpack to use jsx-loader for all *.jsx files
    test: /\.js?$/,
    exclude: /node_modules/,
    loader: 'jsx-loader?insertPragma=React.DOM&harmony'
  },

  {
    test: /\.js?$/,
    exclude: /node_modules/,
    loader: 'babel'
  }
];

module.exports = function(options) {
  var entry = options.entry;
  var output = options.output;
  var devServer = options.devServer;
  var loaders = defaultLoaders;
  var plugins = options.plugins;

  if (options.separateStylesheet) {
    loaders = loaders.concat({test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!' + 'sass?sourceMap')});
    plugins = plugins.concat(new ExtractTextPlugin('[name].[contenthash].css'));
  } else {
    loaders = loaders.concat({test: /\.scss$/, exclude: /node_modules/, loader: 'style!css!sass'});
  }

  if (options.compress) {
    plugins = plugins.concat(new CompressionPlugin({
      asset: "{file}.gz",
      algorithm: "gzip",
      minRatio: 10
    }));
  }

  var module = {
    preLoaders: [
      {test: /\.js?$/, loader: 'eslint-loader', exclude: /node_modules/}
    ],

    loaders: loaders,

    noParse: /\.min\.js/
  };

  var resolve = {
    extensions: ['', '.js']
  };

  var devtool = options.devtool;


  return {
    entry: entry,
    output: output,
    devServer: devServer,
    module: module,
    resolve: resolve,
    devtool: devtool,
    plugins: plugins
  };
};