/* eslint-disable implicit-arrow-linebreak */

import React from 'react';
import serialize from 'serialize-javascript';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';

import reducer from '../modules';
import App from '../components/App';

const devMode = process.env.NODE_ENV !== 'production';

const app = devMode
  ? require('./devServer').default
  : require('./prodServer').default;

const injectStyleTags = (styles) =>
  styles.map((path) => `<link href="${path}" rel="stylesheet">`).join();

const injectScriptTags = (scripts) =>
  scripts.map((path) => `<script src="${path}"></script>`).join();

const renderPage = ({ assets, html, preloadedState }) => `
    <!doctype html>
    <html>
      <head>
        <title>App</title>
        ${injectStyleTags(assets.styles)}
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(preloadedState)}
        </script>
        ${injectScriptTags(assets.scripts)}
      </body>
    </html>
    `;

app.use('/*', (req, res) => {
  const store = createStore(reducer);
  const preloadedState = store.getState();

  const context = {};
  const { assets } = res.locals;

  const html = renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  if (context.url) {
    res.writeHead(301, { Location: context.url });
    res.end();
  } else {
    res.send(renderPage({ assets, html, preloadedState }));
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.stdout.write(`app listening on ${port}\n`);
});
