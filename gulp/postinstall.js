const { dest, parallel, src } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const noop = require('lodash/noop');

const config = require('./config.json');
const webpackConfig = require('../webpack.config.dev.deps');

const copyStaticDevFiles = () =>
  src(config.postinstall.copyStaticDevFiles.src, { nodir: true, sourcemaps: true }).pipe(
    dest(config.postinstall.copyStaticDevFiles.dest)
  );

copyStaticDevFiles.displayName = config.postinstall.copyStaticDevFiles.displayName;

const webpackDevTask = () =>
  src(config.postinstall.webpack.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .on('error', noop)
    .pipe(dest(config.postinstall.webpack.dest));

webpackDevTask.displayName = config.postinstall.webpack.displayName;

module.exports = parallel(copyStaticDevFiles, webpackDevTask);
