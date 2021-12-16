import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import { healthRouter, ridesRouter } from './routes';
import { expressLogger, winstonLogger } from './logger';
import swaggerSpecification from './swagger';

require('./expressAsyncErrors');

const app = express();

app.use(expressLogger);
app.use(bodyParser.json());

app.use(healthRouter);
app.use(ridesRouter);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // eslint-disable-line
  winstonLogger.error(err.message, err.stack);

  return res.status(500).send({
    error_code: 'SERVER_ERROR',
    message: 'Unknown error',
  });
});

export default app;
