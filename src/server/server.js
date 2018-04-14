import Express from 'express';
import compression from 'compression';
import mongoose from 'mongoose';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

// React And React Router
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

// webpack requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';

import App from '../client/containers/App/App';
import configureStore from '../client/store';
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
app.use(handleRender);

function handleRender (req, res, next) {
  if (req.url.startsWith('/api/')) {
    return next();
  }

  const context = {};

  const store = configureStore();
  const initialState = store.getState();

  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const initialView = ReactDOMServer.renderToString(appWithRouter);

  if (context.url) {
    res.redirect(301, context.url);
  } else {
    res
      .set('Content-Type', 'text/html')
      .status(200)
      .end(renderTemplate(initialView, initialState));
  }
}

mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, function (err) {
  if (err) {
    console.error('Please make sure Mongodb is installed and running!\n', err);
    process.exit(1);
  }

  app.listen(serverConfig.port, function (err) {
    if (!err) {
      console.log(`Express server is running on port: ${serverConfig.port}!`);
    }
  });
});
// const db = mongoose.connection;
// db.on('error', (err) => {
//   console.error('Please make sure Mongodb is installed and running!');
//   throw err;
// });
