const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

const clientConfig = merge(common.clientConfig, {
  target: 'web',
  mode: 'development',
  entry: './src/index.js',
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 3000,
    overlay: true,
    hotOnly: true,
    historyApiFallback: true,
    contentBase: common.distPath
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html')
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
});

module.exports = clientConfig;
