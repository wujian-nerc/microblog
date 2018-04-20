var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var { ReactLoadablePlugin } = require('react-loadable/webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './src/client/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },

  output: {
    path: __dirname + '/dist/',
    filename: 'app.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'src',
      'node_modules'
    ],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'client': path.resolve(__dirname, 'src', 'client'),
      'components': path.resolve(__dirname, 'src', 'client', 'components'),
      'containers': path.resolve(__dirname, 'src', 'client', 'containers'),
      'reducers': path.resolve(__dirname, 'src', 'client', 'reducers'),
      'sagas': path.resolve(__dirname, 'src', 'client', 'sagas'),
      'utils': path.resolve(__dirname, 'src', 'client', 'utils'),
    }
  },

  module: {
    rules: [
      {
        exclude: [/\.(html|ejs)$/, /\.(js|jsx)$/, /\.(css|less|scss|sass)$/, /\.json$/, /\.svg$/],
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_mnodules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                module: true,
                localIdentName: '[local]___[hash:base64:5]',
                importLoaders: 1
              }
            },
            { loader: 'postcss-loader' }
          ]
        })
      },
      {
        test: /\.css$/,
        include: /node_mnodules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                module: true,
                localIdentName: '[name]-[hash:base64:5]',
                importLoaders: 1
              }
            },
            { loader: 'postcss-loader' },
            { loader: 'less-loader' }
          ]
        })
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          },
        ]
      }
    ]
  },

  plugins: [
    new ReactLoadablePlugin({
      filename: __dirname + '/dist/react-loadable.json'
    }),

    new ExtractTextPlugin('styles.css', {
      allChunks: true
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: JSON.stringify(true),
        NODE_ENV: JSON.stringify('development'),
      }
    })
  ]
};
