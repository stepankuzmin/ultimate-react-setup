const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const plugins = () => [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
  })
];

const rules = [
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
          importLoaders: 1,
          modules: true
        }
      }
    ]
  }
];

const clientConfig = {
  entry: './src/index.js',
  output: {
    filename: devMode ? '[name].bundle.js' : '[name].[hash].bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  plugins: plugins(),
  module: {
    rules
  }
};

const serverConfig = {
  target: 'node',
  entry: {
    server: './src/server/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  node: {
    __dirname: true
  },
  externals: [nodeExternals()],
  plugins: plugins(),
  module: {
    rules
  }
};

module.exports = { clientConfig, serverConfig };
