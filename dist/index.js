"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3 = require('sqlite3').verbose();
const config_1 = __importDefault(require("./config"));
const app_1 = require("./app");
const schemas_1 = require("./schemas");
const logger_1 = require("./logger");
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    (0, schemas_1.buildSchemas)(db);
    app_1.app.locals.db = db;
    app_1.app.listen(config_1.default.port, () => logger_1.winstonLogger.info(`App started and listening on port ${config_1.default.port}`));
});
//# sourceMappingURL=index.js.map