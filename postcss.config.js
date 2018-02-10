var autoprefixer = require('autoprefixer');
var postcssReporter = require('postcss-reporter');

module.exports = {
  plugins: [
    autoprefixer,
    postcssReporter({
      clearMessages: true
    })
  ]
};
