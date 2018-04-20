var path = require('path');
var webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
var WebpackExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
  name: 'server',

  target: 'node',

  externals: [nodeExternals()],

  node: {
    __filename: true,
    __dirname: false,
  },

  devtool: 'cheap-module-eval-source-map',

  entry: [
    './src/server/server.js',
  ],

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
    publicPath: '/',
    libraryTarget: "commonjs2"
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'src',
      'node_modules'
    ]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'react',
            'stage-3'
          ],
          plugins: [
            'react-loadable/babel',

          ]
        }
      }
    ]
  },

  plugins: [
    new WebpackExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, './node_modules/'),
    }),

    new webpack.DefinePlugin({
      'process.env': {
        SERVER: JSON.stringify(true),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      }
    }),
  ],
};
