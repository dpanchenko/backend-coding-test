import request from 'supertest';
import app from '../../src/app';
import { initializeDb } from '../../src/db';

import { validRidePayload, invalidRidePayload1 } from '../fixtures';

describe('API rides tests', () => {
  before(async () => initializeDb());

  describe('POST /rides', () => {
    it('should create rides', (done) => {
      request(app)
        .post('/rides')
        .send(validRidePayload)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with 400 with invalid payload', (done) => {
      request(app)
        .post('/rides')
        .send(invalidRidePayload1)
        .expect('Content-Type', /json/)
        .expect(400, done);
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

  describe('GET /rides/{id}', () => {
    it('should return ride with id 1', (done) => {
      request(app)
        .get('/rides/1')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });

    it('should respond with 404 for not exist ride', (done) => {
      request(app)
        .get('/rides/10')
        .expect('Content-Type', /json/)
        .expect(404, done);
    });
  });
});
