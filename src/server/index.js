const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const config = require('../../webpack.config');
const compiler = webpack(config);

app
  .use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath
    })
  )
  .use(webpackHotMiddleware(compiler));

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log(`app listening on ${port}`);
});
