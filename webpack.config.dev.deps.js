const { dependencies } = require('./polyfill');

module.exports = {
  name: 'deps',
  mode: 'development',
  target: 'web',
  entry: {
    deps: [
      ...dependencies,
      'import-map-overrides',
      'systemjs/dist/system',
      'systemjs/dist/extras/amd',
      'systemjs/dist/extras/named-exports'
    ]
  },
  output: {
    filename: 'deps.bundle.js',
    publicPath: '/'
  }
};
