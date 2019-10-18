const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const clientConfig = merge(common.clientConfig, {
  mode: 'production',
  plugins: common.clientConfig.plugins.concat([
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ])
});

const serverConfig = merge(common.serverConfig, {
  mode: 'production',
  plugins: common.serverConfig.plugins.concat([
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    })
  ])
});

module.exports = [clientConfig, serverConfig];
