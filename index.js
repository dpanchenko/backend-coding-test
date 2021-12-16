const port = 8010;

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');
const { winstonLogger } = require('./src/logger');
const app = require('./src/app');

db.serialize(() => {
  buildSchemas(db);

  app.locals.db = db;

  app.listen(port, () => winstonLogger.info(`App started and listening on port ${port}`));
});
