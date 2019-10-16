const merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const common = require('./webpack.common.js');

const clientConfig = merge(common.clientConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: common.clientConfig.plugins.concat([
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production'
    }),
    new StatsWriterPlugin()
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
