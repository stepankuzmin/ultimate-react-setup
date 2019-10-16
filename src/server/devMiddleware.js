import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack/webpack.dev';

const compiler = webpack(config.clientConfig);

export const hotMiddleware = webpackHotMiddleware(compiler);

export const devMiddleware = webpackDevMiddleware(compiler, {
  logLevel: 'warn',
  serverSideRender: true,
  publicPath: config.clientConfig.output.publicPath
});
