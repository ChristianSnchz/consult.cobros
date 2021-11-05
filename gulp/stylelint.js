const { src } = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');

const config = require('./config.json');

const plugins = gulpLoadPlugins();

const stylelint = () =>
  src(config.stylelint.src).pipe(
    plugins.stylelint({
      fix: true,
      reporters: [{ formatter: 'verbose', console: true }]
    })
  );

stylelint.displayName = config.stylelint.displayName;

module.exports = stylelint;
