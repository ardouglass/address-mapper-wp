const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './frontend/address-mapper.js',
  output: {
    filename: 'address-mapper.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './frontend/address-mapper.html',
      filename: 'address-mapper.html',
      inject: false,
    }),
  ],
};
