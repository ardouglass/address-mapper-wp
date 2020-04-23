const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
  output: {
    filename: 'address-mapper.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, 'frontend/pages/'),
      components: path.resolve(__dirname, 'frontend/components/'),
      hooks: path.resolve(__dirname, 'frontend/hooks/'),
      utils: path.resolve(__dirname, 'frontend/utils/'),
      store: path.resolve(__dirname, 'frontend/store/'),
    },
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'frontend'),
              },
            },
          },
        ],
      },
    ],
  },
};
