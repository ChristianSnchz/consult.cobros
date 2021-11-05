const dotenv = require('dotenv');

const config = cb => {
  dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
  cb();
};

config.displayName = `load ${process.env.ENVIRONMENT} build config`;

module.exports = config;
