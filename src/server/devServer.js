import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import normalizeAssets from './normalizeAssets';
import config from '../../webpack/webpack.dev';

const compiler = webpack(config.clientConfig);

export const hotMiddleware = webpackHotMiddleware(compiler);

export const devMiddleware = webpackDevMiddleware(compiler, {
  logLevel: 'warn',
  serverSideRender: true,
  publicPath: config.clientConfig.output.publicPath
});

const assetsMiddleware = (req, res, next) => {
  const { assetsByChunkName } = res.locals.webpackStats.toJson();
  res.locals.assets = normalizeAssets(assetsByChunkName);
  next();
};

const app = express();

app
  .use(devMiddleware)
  .use(hotMiddleware)
  .use(assetsMiddleware);

export default app;
