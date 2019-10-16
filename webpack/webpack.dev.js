const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const clientConfig = merge(common.clientConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    common.clientConfig.entry
  ],
  plugins: common.clientConfig.plugins.concat([
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]),
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  }
});

const serverConfig = merge(common.serverConfig, {
  mode: 'development',
  plugins: common.serverConfig.plugins.concat([
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ])
});

module.exports = [clientConfig, serverConfig];
module.exports.clientConfig = clientConfig;
