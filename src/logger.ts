import expressWinston from 'express-winston';
import winston from 'winston';

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

export const expressLogger = expressWinston.logger(loggerOptions);
export const winstonLogger = winston.createLogger(loggerOptions);
