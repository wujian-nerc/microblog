import webpack from 'webpack';
import path from 'path';

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index.js'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[hash:8].js'
  },
  devTool: 'cheap-module-eval-source-map',
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
        use: [
          { loader: 'babel-loader' }
        ]
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
          { loader: 'babel' },
          {
            loader: 'awesome-typescript-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && ~module.context.indexOf('node_modules');
      }
    })
  ],
  resolve: {
    alias: {
      'client': path.resolve(__dirname, '../client'),
      'components': path.resolve(__dirname, '../client/components'),
      'containers': path.resolve(__dirname, '../client/containers'),
      'reducers': path.resolve(__dirname, '../client/reducers'),
      'sagas': path.resolve(__dirname, '../client/sagas'),
      'utils': path.resolve(__dirname, '../client/utils'),
    }
  }
};
