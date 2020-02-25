const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
  output: {
    filename: 'address-mapper.min.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, '../frontend/pages/'),
      components: path.resolve(__dirname, '../frontend/components/'),
    },
  },
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
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                context: path.resolve(__dirname, 'frontend'),
              },
            },
          },
        ],
      },
    ],
  },
};
