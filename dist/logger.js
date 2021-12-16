"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = exports.expressLogger = void 0;
const expressWinston = require('express-winston');
const winston = require('winston');
const loggerOptions = {
    transports: [
        new winston.transports.File({
            filename: `${__dirname}/../logs/app.log`,
        }),
        new winston.transports.Console(),
    ],
    format: winston.format.combine(winston.format.colorize(), winston.format.json()),
};
exports.expressLogger = expressWinston.logger(loggerOptions);
exports.winstonLogger = winston.createLogger(loggerOptions);
//# sourceMappingURL=logger.js.map