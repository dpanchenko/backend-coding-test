import request from 'supertest';
import app from '../../src/app';

describe('API health tests', () => {
  describe('GET /health', () => {
    it('should return health', (done) => {
      request(app)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });
});
