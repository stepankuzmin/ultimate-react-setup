import React from 'react';
import express from 'express';
import { matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import routes from '../routes';
import App from '../components/App';
import assetsMiddleware from './assetsMiddleware';
import { clientConfig } from '../../webpack/webpack.common';

const devMode = process.env.NODE_ENV !== 'production';

const app = express();

if (devMode) {
  // eslint-disable-next-line
  const { devMiddleware, hotMiddleware } = require('./devMiddleware');
  app.use(devMiddleware).use(hotMiddleware);
} else {
  const staticPath = clientConfig.output.path;
  app.use(clientConfig.output.publicPath, express.static(staticPath));
}

app.use(assetsMiddleware);

/* eslint-disable implicit-arrow-linebreak */
const injectStyleTags = (assets) =>
  assets
    .filter((path) => path.endsWith('.css'))
    .map((path) => [clientConfig.output.publicPath, path].join('/'))
    .map((path) => `<link href="${path}" rel="stylesheet">`)
    .join('\n');

const injectScriptTags = (assets) =>
  assets
    .filter((path) => path.endsWith('.js'))
    .map((path) => [clientConfig.output.publicPath, path].join('/'))
    .map((path) => `<script src="${path}"></script>`)
    .join('\n');

app.use('/*', (req, res) => {
  const branch = matchRoutes(routes, req.originalUrl);
  console.log(branch);

  const context = {};
  const { assets } = res.locals;

  const html = renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  } else {
    res.send(`
      <html>
        <head>
          <title>App</title>
          ${injectStyleTags(assets)}
        </head>
        <body>
          <div id="root">${html}</div>
          ${injectScriptTags(assets)}
        </body>
      </html>
    `);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.stdout.write(`app listening on ${port}\n`);
});
