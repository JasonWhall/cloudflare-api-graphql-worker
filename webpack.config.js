const path = require('path')

module.exports = {
  target: 'webworker',
  resolve: {
    alias: {
      fs: path.resolve(__dirname, './null.js'),
      module: path.resolve(__dirname, './null.js'),
      'apollo-engine-reporting': path.resolve(__dirname, './null.js'),
      busyboy: path.resolve(__dirname, './null.js')
    },
  },
  mode: 'production',
  optimization: {
    usedExports: true
  },
}