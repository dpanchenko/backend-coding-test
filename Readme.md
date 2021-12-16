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
3. Run `npm install`
4. Run `npm test`
5. Run `npm start`
6. Hit the server to test health `curl localhost:PORT/health` and expect a `200` response 
7. Open in browser url `curl localhost:PORT/docs` and dicover API documentation
