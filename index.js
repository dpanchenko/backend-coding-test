const sqlite3 = require('sqlite3').verbose();

const config = require('./src/config');
const buildSchemas = require('./src/schemas');
const { winstonLogger } = require('./src/logger');
const app = require('./src/app');

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  buildSchemas(db);

  app.locals.db = db;

  app.listen(config.port, () => winstonLogger.info(`App started and listening on port ${config.port}`));
});
