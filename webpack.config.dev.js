const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/index.js',
  output: {
    filename: 'address-mapper.min.js',
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
