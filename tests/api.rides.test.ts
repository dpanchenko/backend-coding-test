import request from 'supertest';
import DB from 'sqlite3';
import { app }  from '../src/app';
import { buildSchemas } from '../src/schemas';

const sqlite = DB.verbose();
const db = new sqlite.Database(':memory:');

app.locals.db = db;

describe('API rides tests', () => {
  before((done) => {
    db.serialize(() => {
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
