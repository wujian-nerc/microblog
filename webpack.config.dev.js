var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      'react-hot-loader/patch',
      './client/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom'
    ]
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: '/',
  },

  resolve: {
    alias: {
      'client': path.resolve(__dirname, '../client'),
      'components': path.resolve(__dirname, '../client/components'),
      'containers': path.resolve(__dirname, '../client/containers'),
      'reducers': path.resolve(__dirname, '../client/reducers'),
      'sagas': path.resolve(__dirname, '../client/sagas'),
      'utils': path.resolve(__dirname, '../client/utils'),
    }
  },

  module: {
    rules: [
      {
        exclude: [/\.(html|ejs)$/, /\.(js|jsx)$/, /\.(css|less|scss|sass)$/, /\.json$/, /\.svg$/, /\.tsx?$/],
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
        use: [
          { loader: 'style-loader' },
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
        use: [
          { loader: 'style-loader' },
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
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ]
};
