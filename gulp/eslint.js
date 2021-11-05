const { dest, series, src } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const isNil = require('lodash/isNil');

const config = require('./config.json');

const plugins = gulpLoadPlugins();

const isFixed = file => !isNil(file.eslint) && file.eslint.fixed;

const getEslintTask = taskConfig => () =>
  src(taskConfig.src)
    .pipe(plugins.eslint({ fix: true }))
    .pipe(plugins.eslint.format())
    .pipe(plugins.if(isFixed, dest(taskConfig.dest)))
    .pipe(plugins.eslint.failAfterError());

const eslintSrc = getEslintTask(config.eslintSrc);

eslintSrc.displayName = config.eslintSrc.displayName;

const eslintTest = getEslintTask(config.eslintTest);

eslintTest.displayName = config.eslintTest.displayName;

module.exports = series(eslintSrc, eslintTest);
