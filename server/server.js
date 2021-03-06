import Express from 'express';
import compression from 'compression';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

// React And React Router
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// webpack requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.config.dev';

import App from '../client/containers/App';
import apiRoutes from './routes';
import renderTemplate from './render';
import serverConfig from './config';

const app = new Express();

// Set Development modes checks
const isDevMode = process.env.NODE_ENV === 'development' || false;
const isProdMode = process.env.NODE_ENV === 'production' || false;

// Run webpack dev server in development mode
if (isDevMode) {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

// Setup gzip
app.use(compression());
// Apply body Parser and server public assets and routes
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.join(__dirname, '../dist/client')));
app.use('/api', apiRoutes);

// Server Side Rendering
app.use((req, res, next) => {
  const context = {};

  const appWithRouter = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  const html = ReactDOMServer.renderToString(appWithRouter);

  const helmet = Helmet.renderStatic();

  res
    .set('Content-Type', 'text/html')
    .status(200)
    .end(renderTemplate(html, helmet));
});

app.listen(serverConfig.port, function () {
  console.log(`Express server is running on port: ${serverConfig.port}!`);
});
