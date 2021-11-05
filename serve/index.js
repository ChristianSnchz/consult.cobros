const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const winston = require('winston');

dotenv.config();

const { PORT } = process.env;

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

const app = express();

app.use(cors());
app.use(morgan('combined'));
app.use(express.static('./dist'));

http.createServer(app).listen(PORT, () => logger.info(`Server started at port ${PORT}`));
