const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'inject.js',
    path: path.resolve(__dirname, 'dist/src/inject'),
  },
};