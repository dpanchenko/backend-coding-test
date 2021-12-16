import request from 'supertest';
import DB from 'sqlite3';
import { app }  from '../src/app';
import { buildSchemas } from '../src/schemas';

const sqlite = DB.verbose();
const db = new sqlite.Database(':memory:');

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
