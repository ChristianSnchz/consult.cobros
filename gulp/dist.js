const { dest, src } = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const noop = require('lodash/noop');

const config = require('./config.json');
const webpackConfig = require('../webpack.config.build.js');

const webpackTask = () =>
  src(config.webpack.dist.src)
    .pipe(webpackStream(webpackConfig, webpack))
    .on('error', noop)
    .pipe(dest(config.webpack.dist.dest));

webpackTask.displayName = config.webpack.dist.displayName;

module.exports = webpackTask;
