var path = require('path');
var webpack = require('webpack');
var WebpackExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: './src/server/server.js',

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
    libraryTarget: "commonjs2"
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: false,
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
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:5]'
            }
          },
        ]
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loader: 'css-loader/locals',
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
