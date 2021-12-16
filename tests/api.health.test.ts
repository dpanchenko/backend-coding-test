import request from 'supertest';
import sqlite3 from 'sqlite3';
import app from '../src/app';
import buildSchemas from '../src/schemas';

const db = new (sqlite3.verbose()).Database(':memory:');

app.locals.db = db;

describe('API health tests', () => {
  before((done) => {
    db.serialize(() => {
      buildSchemas(db);

      done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });
});
