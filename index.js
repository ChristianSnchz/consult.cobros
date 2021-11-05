const dotenv = require('dotenv');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const winston = require('winston');

dotenv.config();

const config = require('./webpack.config.dev');

const { PORT } = process.env;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

return new WebpackDevServer(webpack(config), config.devServer).listen(PORT, '127.0.0.1', () =>
  logger.info(`DevServer started at port ${PORT}. Please wait to compilation ends...`)
);
