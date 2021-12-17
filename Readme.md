# Taxi Rides API service

Expose functionality for rides management:
 - create ride with geolocaiton validation;
 - list of rides;
 - ride details;

## Env vars
Copy `.env.example` to `.env` and modify values
```bash
PORT=8010
```

## Configure and run
1. Clone repository with command `git clone git@github.com:dpanchenko/backend-coding-test.git ./backend-coding-test`
2. Go to the project folder `cd backend-coding-test`
3. Run commands:
 -  `npm install` - installing deps
 -  `npm run build` - make prod build
 -  `npm run start:prod` - run in production mode
 -  `npm run start:dev` - run in development mode
 -  `npm run lint` - run eslint checker
 -  `npm run lint:fix` - run eslint checker with fixing possible issues
 -  `npm test` - run tests
 -  `npm test:cov` - run tests with coverage report
 -  `npm test:load` - run load tests with report
4. Hit the server to test health `curl localhost:PORT/health` and expect a `200` response 
5. Open in browser url `curl localhost:PORT/docs` and dicover API documentation
