import { expect } from 'chai';
import { initializeDb } from '../../src/db';
import { createRide } from '../../src/modules';

import { validRidePayloadWithSqlInjection } from '../fixtures';

describe('Security tests', () => {
  before(async () => initializeDb());

  describe('SQL injection tests', () => {
    it('should create ride', async () => {
      const result = await createRide(validRidePayloadWithSqlInjection);

      expect(result.riderName).to.equal(validRidePayloadWithSqlInjection.rider_name);
      expect(result.driverName).to.equal(validRidePayloadWithSqlInjection.driver_name);
    });
  });
});
