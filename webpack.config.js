module.exports =
  process.env.NODE_ENV === 'production'
    ? require('./configs/webpack.config.prod.js')
    : require('./configs/webpack.config.dev.js');
