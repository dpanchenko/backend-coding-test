const request = require('supertest');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const app = require('../src/app');
const buildSchemas = require('../src/schemas');

app.locals.db = db;

describe('API rides tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      done();
    });
  });

  describe('POST /rides', () => {
    it('should create rides', (done) => {
      request(app)
        .post('/rides')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /rides', () => {
    it('should return rides', (done) => {
      request(app)
        .get('/rides')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /rides/1', () => {
    it('should return ride with id 1', (done) => {
      request(app)
        .get('/rides/1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });
});
