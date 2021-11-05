const { parallel, series } = require('gulp');

const clean = require('./gulp/clean');
const config = require('./gulp/config');
const dist = require('./gulp/dist');
const eslint = require('./gulp/eslint');
const postinstall = require('./gulp/postinstall');
const stylelint = require('./gulp/stylelint');

exports.lint = series(eslint, stylelint);

exports.build = series(parallel(clean, config), dist);

exports.postinstall = series(postinstall);
