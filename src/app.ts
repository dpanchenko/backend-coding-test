import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import swaggerUI from 'swagger-ui-express';

import { healthRouter, ridesRouter } from './modules';
import { expressLogger, winstonLogger } from './logger';
import swaggerSpecification from './swagger';
import { IErrorResponse } from './types';

require('./expressAsyncErrors');

const app = express();

app.use(expressLogger);
app.use(bodyParser.json());

app.use(healthRouter);
app.use(ridesRouter);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecification));

app.use((err: Error, req: Request, res: Response<IErrorResponse>, next: NextFunction) => { // eslint-disable-line
  winstonLogger.error(err.message, err.stack);

  return res.status(500).send({
    error_code: 'SERVER_ERROR',
    message: 'Unknown error',
  });
});

export default app;
