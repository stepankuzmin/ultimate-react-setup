import express from 'express';
import fs from 'fs';
import path from 'path';
import normalizeAssets from './normalizeAssets';
import { clientConfig } from '../../webpack/webpack.common';

let assets = [];
const statsPath = path.join(clientConfig.output.path, 'stats.json');

if (fs.existsSync(statsPath)) {
  const { assetsByChunkName } = JSON.parse(fs.readFileSync(statsPath));
  assets = normalizeAssets(assetsByChunkName);
}

const assetsMiddleware = (req, res, next) => {
  res.locals.assets = assets;
  next();
};

const app = express();
app.use(assetsMiddleware);

const staticPath = clientConfig.output.path;
app.use(clientConfig.output.publicPath, express.static(staticPath));

export default app;
