/* eslint-disable implicit-arrow-linebreak */

import path from 'path';
import React from 'react';
import express from 'express';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from 'components/App';
import { getActiveRoute } from 'routes';
import { createStore, rootSaga } from 'modules/core';
import { clientConfig } from '../../webpack/webpack.common';

const devMode = process.env.NODE_ENV !== 'production';

const app = express();

if (devMode) {
  // eslint-disable-next-line global-require
  const { devMiddleware, hotMiddleware } = require('./devMiddleware');
  app.use(devMiddleware);
  app.use(hotMiddleware);
}

const staticPath = clientConfig.output.path;
app.use(clientConfig.output.publicPath, express.static(staticPath));

const renderPage = ({ extractor, html, preloadedState }) => `
  <!doctype html>
  <html>
    <head>
      <title>App</title>
      ${extractor.getStyleTags()}
    </head>
    <body>
      <div id="root">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
      </script>
      ${extractor.getScriptTags()}
    </body>
  </html>`;

const statsFile = path.join(clientConfig.output.path, 'stats.json');
const extractor = new ChunkExtractor({ statsFile });

app.use('/*', async (req, res) => {
  try {
    const activeRoute = getActiveRoute(req.originalUrl);
    if (!activeRoute) {
      res.status(404).send('Not found');
      return;
    }

    const store = createStore();
    await store.runSaga(rootSaga).toPromise();

    if (activeRoute.serverSideSaga) {
      await store.runSaga(activeRoute.serverSideSaga, req).toPromise();
    }

    const context = {};
    const preloadedState = store.getState();
    const jsx = extractor.collectChunks(
      <Provider store={store}>
        <StaticRouter location={req.originalUrl} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    );

    const html = renderToString(jsx);

    if (context.url) {
      res.writeHead(301, { Location: context.url });
      res.end();
    } else {
      res.send(renderPage({ extractor, html, preloadedState }));
    }

    store.close();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.stdout.write(`app listening on ${port}\n`);
});
