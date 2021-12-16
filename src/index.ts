const sqlite3 = require('sqlite3').verbose();

import config from './config';
import { app } from './app';
import { buildSchemas } from './schemas';
import { winstonLogger } from './logger';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  buildSchemas(db);

  app.locals.db = db;

  app.listen(config.port, () => winstonLogger.info(`App started and listening on port ${config.port}`));
});