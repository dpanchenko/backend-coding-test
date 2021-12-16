import sqlite3 from 'sqlite3';
import config from './config';
import app from './app';
import buildSchemas from './schemas';
import { winstonLogger } from './logger';

const db = new (sqlite3.verbose()).Database(':memory:');

db.serialize(() => {
  app.locals.db = buildSchemas(db);

  app.listen(config.port, () => winstonLogger.info(`App started and listening on port ${config.port}`));
});
