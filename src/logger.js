const expressWinston = require('express-winston');
const winston = require('winston');

const loggerOptions = {
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/../logs/app.log`,
    }),
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
  ),
};

module.exports = {
  expressLogger: expressWinston.logger(loggerOptions),
  winstonLogger: winston.createLogger(loggerOptions),
};
