import path from 'path';
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';

import App from '../components/App';
import assetsMiddleware from './assetsMiddleware';

const app = express();
app.use('/static', express.static(path.join(__dirname, '../../public')));

if (process.env.NODE_ENV !== 'production') {
  const { devMiddleware, hotMiddleware } = require('./devMiddleware');
  app.use(devMiddleware).use(hotMiddleware);
}

app.use(assetsMiddleware);

/* eslint-disable implicit-arrow-linebreak */
const injectStyleTags = (assets) =>
  assets
    .filter((path) => path.endsWith('.css'))
    .map((path) => `<link href="/static/${path}" rel="stylesheet">`)
    .join('\n');

const injectScriptTags = (assets) =>
  assets
    .filter((path) => path.endsWith('.js'))
    .map((path) => `<script src="/static/${path}"></script>`)
    .join('\n');

app.use('/*', (req, res) => {
  const { assets } = res.locals;

  res.send(`
    <html>
      <head>
        <title>App</title>
        ${injectStyleTags(assets)}
      </head>
      <body>
        <div id="root">${renderToString(<App />)}</div>
        ${injectScriptTags(assets)}
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  process.stdout.write(`app listening on ${port}\n`);
});
