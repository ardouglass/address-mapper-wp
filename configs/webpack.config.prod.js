const path = require('path');

module.exports = {
  mode: 'production',
  entry: './frontend/index.js',
  output: {
    filename: 'address-mapper.min.js',
    path: path.resolve(__dirname, '../dist'),
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
                localIdentName: '[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },
};
