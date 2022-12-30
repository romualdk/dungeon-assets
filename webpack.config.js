const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    port: 5000,
    static: path.resolve(__dirname, 'dist')
  },
  mode: 'development'
}
