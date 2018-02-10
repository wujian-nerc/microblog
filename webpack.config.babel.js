var cssModulesIdentName = '[local]___[hash:base64:5]';
if (process.env.NODE_ENV === 'production') {
  cssModulesIdentName = '[hash:base64]';
}

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    module: [
      'client',
      'node_modules',
    ]
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              localIdentName: cssModulesIdentName,
            }
          },
          { loader: 'postcss-loader' }
        ]
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  }
}
