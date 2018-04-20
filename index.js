if (process.env.NODE_ENV === 'production') {
  process.env.webpackAssets = JSON.stringify(require('./dist/client/manifest.json'));
  process.env.webpackChunkAssets = JSON.stringify(require('./dist/client/chunk-manifest.json'));

  require('./dist/server.bundle.js');
} else {
  require('babel-polyfill');
  require('babel-register')({
    plugins: [
      'syntax-dynamic-import',
      'dynamic-import-node',
      'react-loadable/babel'
    ]
  });

  // css require hook
  require('css-modules-require-hook')({
    extensions: ['.css'],
    generateScopedName: '[local]___[hash:base64:5]'
  });

  require('./src/server/server');
}