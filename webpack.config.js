var webpack = require('webpack');
var path = require('path');
module.exports = require('./make-webpack-config')({
  entry: {
    index: path.resolve(__dirname, 'app/index.js')
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/assets'
  },

  devServer: {
    colors: true,
    port: 8090,
    hot: true
    //inline: true
  },

  devtool: 'eval',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BUDGETING_API_URL: JSON.stringify(process.env.BUDGETING_API_URL || 'http://localhost:9292')
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});
