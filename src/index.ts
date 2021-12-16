import config from './config';
import app from './app';
import { initializeDb } from './db';
import { winstonLogger } from './logger';

initializeDb().then(() => {
  app.listen(config.port, () => winstonLogger.info(`App started and listening on port ${config.port}`));
});
