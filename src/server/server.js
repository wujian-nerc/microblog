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
import { matchRoutes, renderRoutes } from 'react-router-config';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';

// webpack requirements
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../../webpack.config.dev';

// import App from '../client/containers/App/App';
import routes from '../client/routes';
import configureStore from '../client/store';
import apiRoutes from './routes';
import renderTemplate from './render';
import serverConfig from './config';
import stats from '../../dist/react-loadable.json';

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

// Server Side Rendering
app.use(handleRender);

app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));
app.use(Express.static(path.join(__dirname, '../dist/client')));
app.use('/api', apiRoutes);


function handleRender (req, res, next) {
  if (req.url.startsWith('/api/')) {
    return next();
  }

  const store = configureStore();
  const initialState = store.getState();

  const loadBranchData = () => {
    const promises = [];
    // Extract all promises to execute before rendering the app
    matchRoutes(routes, req.url).forEach(({ route, match }) => {
      if (route.loadData) {
        promises.push(route.loadData(customStore, match.params));
      }
    });

    // Return promises of promises array to escape the failed condition
    // If a promise failed other promises will also failed.
    // So, we are wrapping every promise inside a promise.
    // Whenever inner promise failed, we can still resolve outer promise
    // And we can proceed further for the other promises.
    // Note: If it fails we cannot render the actual html which should be rendered from react
    return promises.map((promise) => (
      new Promise((resolve) => {
        promise.then(resolve).catch(resolve);
      })
    ));
  };

  const render = () => {
    const context = {};
    const modules = [];

    const initialView = ReactDOMServer.renderToString(
      <Provider store={store}>
        <Loadable.Capture report={(moduleName) => modules.push(moduleName)}>
          <StaticRouter location={req.url} context={context}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Loadable.Capture>
      </Provider>
    );

    // convert modules to bundles
    const bundles = getBundles(stats, modules);
    console.log('modules', req.url, req.path, modules);

    if (context.url) {
      res.redirect(301, context.url);
    } else {
      res
        .set('Content-Type', 'text/html')
        .status(200)
        .end(renderTemplate(initialView, initialState, bundles));
    }
  };

  // Resolve all promises before calling the render method.
  // Call render method even some promises rejected.
  Promise.all(loadBranchData()).then(render).catch(render);
}

mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, function (err) {
  if (err) {
    console.error('Please make sure Mongodb is installed and running!\n', err);
    process.exit(1);
  }

  Loadable.preloadAll().then(() => {
    app.listen(serverConfig.port, function (err) {
      if (!err) {
        console.log(`Express server is running on port: ${serverConfig.port}!`);
      }
    });
  });
});
