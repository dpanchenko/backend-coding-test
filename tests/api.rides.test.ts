import request from 'supertest';
import sqlite3 from 'sqlite3';
import app from '../src/app';
import { initializeDb } from '../src/db';

const db = new (sqlite3.verbose()).Database(':memory:');

app.locals.db = db;

describe('API rides tests', () => {
  before(async () => initializeDb());

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
