import swaggerJsdoc from 'swagger-jsdoc';

import config from './config';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Taxi',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Taxi Rides API',
      },
    ],
  },
  apis: [
    './src/app.ts',
    './src/schemas.ts',
    './src/modules/health/router.ts',
    './src/modules/rides/router.ts',
  ],
};

export default swaggerJsdoc(options);
