import fs from 'fs';
import path from 'path';
import isObject from 'is-object';

const normalizeAssets = (assets) => {
  if (isObject(assets)) {
    return Object.values(assets).reduce((acc, arr) => acc.concat(arr), []);
  }

  return Array.isArray(assets) ? assets : [assets];
};

let prodAssets = [];
const statsPath = path.join(__dirname, '../../public/stats.json');
if (fs.existsSync(statsPath)) {
  const { assetsByChunkName } = JSON.parse(fs.readFileSync(statsPath));
  prodAssets = normalizeAssets(assetsByChunkName);
}

const prodMiddleware = (req, res, next) => {
  res.locals.assets = prodAssets;
  next();
};

const devMiddleware = (req, res, next) => {
  const { assetsByChunkName } = res.locals.webpackStats.toJson();
  res.locals.assets = normalizeAssets(assetsByChunkName);
  next();
};

const assetsMiddleware =
  process.env.NODE_ENV !== 'production' ? devMiddleware : prodMiddleware;

export default assetsMiddleware;
