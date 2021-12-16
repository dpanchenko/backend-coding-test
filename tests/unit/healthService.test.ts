import { expect } from 'chai';

import {
  healthcheck,
} from '../../src/modules';

describe('health service tests', () => {
  describe('healthcheck method', () => {
    it('return response', () => {
      const result = healthcheck();

      expect(result).to.equal('Healthy');
    });
  });
});
