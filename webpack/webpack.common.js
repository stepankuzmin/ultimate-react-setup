const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const clientConfig = {
  entry: './src/index.js',
  output: {
    filename: devMode ? '[name].bundle.js' : '[name].[hash].bundle.js',
    path: path.resolve(__dirname, '../build/static'),
    publicPath: '/static'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
    })
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
  entry: {
    server: './src/server/index.js'
  },
  output: {
    path: path.join(__dirname, '../build'),
    filename: '[name].js',
    publicPath: '/'
  },
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  plugins: [new CleanWebpackPlugin()],
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

module.exports = { clientConfig, serverConfig };
