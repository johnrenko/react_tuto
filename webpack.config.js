"use strict";

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

var nodeModulesPath = path.resolve(__dirname, 'node_modules');

var config = require('./make-webpack-config')({
  entry: {
    index: path.resolve(__dirname, 'app/index.js')
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/assets'
  },

  alias: {
    'myob-styles': nodeModulesPath + '/@myob/myob-styles/dist/styles/myob.css'
  },

  devServer: {
    colors: true,
    port: 8090,
    hot: true,
    inline: true
  },

  devtool: 'eval',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        SERVICE_API_URL: JSON.stringify(process.env.BUDGETING_API_URL || 'http://localhost:9292')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].css')
  ]
});

//prevents vendor minified js from being parsed everytime. This adds an alias as well.
config.addVendor('react', nodeModulesPath + '/react/dist/react.min.js');

module.exports = config;