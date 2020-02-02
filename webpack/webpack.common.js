const path = require('path');
const nodeExternals = require('webpack-node-externals');
const LoadablePlugin = require('@loadable/webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const distPath = path.join(__dirname, '../dist');

const clientConfig = {
  target: 'web',
  entry: './src/index.js',
  stats: 'errors-warnings',
  bail: true,
  output: {
    filename: devMode ? '[name].bundle.js' : '[name].[hash].bundle.js',
    path: path.resolve(distPath, 'static'),
    publicPath: '/static'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    }),
    new LoadablePlugin({ filename: 'stats.json', writeToDisk: true })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          }
        ]
      }
    ]
  }
};

const serverConfig = {
  target: 'node',
  entry: './src/server/index.js',
  stats: 'errors-warnings',
  bail: true,
  output: {
    path: path.resolve(distPath),
    filename: 'server.js',
    publicPath: '/'
  },
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  plugins: [],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true,
              onlyLocals: true,
              importLoaders: 1
            }
          }
        ]
      }
    ]
  }
};

module.exports = { clientConfig, serverConfig, distPath };
