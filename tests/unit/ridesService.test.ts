import { expect } from 'chai';
import sinon from 'sinon';
import * as db from '../../src/db';

import {
  validatePayload,
  getRideById,
  getRides,
  createRide,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
} from '../../src/modules';
import {
  validRidePayload,
  invalidRidePayload1,
  invalidRidePayload2,
  invalidRidePayload3,
  invalidRidePayload4,
  invalidRidePayload5,
  ridesList,
} from '../fixtures';

describe('rides service tests', () => {
  describe('validatePayload method', () => {
    it('valid payload', () => {
      const validateResult = validatePayload(validRidePayload);

      expect(validateResult.valid).to.equal(true);
      expect(validateResult.message).to.be.undefined;  // eslint-disable-line 
    });

    it('invalid start coordinates', () => {
      const validateResult = validatePayload(invalidRidePayload1);

      expect(validateResult.valid).to.equal(false);
      expect(validateResult.message).to.equal('Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
    });

    it('invalid end coordinates', () => {
      const validateResult = validatePayload(invalidRidePayload2);

      expect(validateResult.valid).to.equal(false);
      expect(validateResult.message).to.equal('End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively');
    });

    it('invalid rider name', () => {
      const validateResult = validatePayload(invalidRidePayload3);

      expect(validateResult.valid).to.equal(false);
      expect(validateResult.message).to.equal('Rider name must be a non empty string');
    });

    it('invalid driver name', () => {
      const validateResult = validatePayload(invalidRidePayload4);

      expect(validateResult.valid).to.equal(false);
      expect(validateResult.message).to.equal('Driver name must be a non empty string');
    });

    it('invalid rider name', () => {
      const validateResult = validatePayload(invalidRidePayload5);

      expect(validateResult.valid).to.equal(false);
      expect(validateResult.message).to.equal('Driver vehicle must be a non empty string');
    });
  });

  describe('getRideById method', () => {
    let stubAllAsync;

    before(() => {
      stubAllAsync = sinon.stub(db, 'dbAllAsync').returns(Promise.resolve(ridesList));
    });
    after(() => {
      stubAllAsync.restore();
    });

    it('return ride info', async () => {
      const rideId = 1;

      const result = await getRideById(rideId);

      expect(stubAllAsync.callCount).to.equal(1);
      expect(result).to.deep.equal(ridesList[0]);
    });
  });

  describe('getRides method', () => {
    let stubAllAsync;

    before(() => {
      stubAllAsync = sinon.stub(db, 'dbAllAsync');
    });
    after(() => {
      stubAllAsync.restore();
    });
    afterEach(() => {
      stubAllAsync.reset();
    });

    it('return rides info without pagination params', async () => {
      stubAllAsync.returns(Promise.resolve(ridesList));

      const result = await getRides();

      expect(stubAllAsync.callCount).to.equal(1);
      expect(stubAllAsync.withArgs('SELECT * FROM Rides LIMIT ?,?', [0, DEFAULT_PAGE_SIZE]).callCount).to.equal(1);
      expect(result).to.deep.equal(ridesList);
    });

    it('return rides info with wrong page number and without count on pages param', async () => {
      stubAllAsync.returns(Promise.resolve(ridesList));

      const page = 'a';
      const result = await getRides(page);

      expect(stubAllAsync.callCount).to.equal(1);
      expect(stubAllAsync.withArgs('SELECT * FROM Rides LIMIT ?,?', [0, DEFAULT_PAGE_SIZE]).callCount).to.equal(1);
      expect(result).to.deep.equal(ridesList);
    });

    it('return rides info without count on pages param', async () => {
      stubAllAsync.returns(Promise.resolve(ridesList));

      const page = 3;
      const result = await getRides(page);

      expect(stubAllAsync.callCount).to.equal(1);
      expect(stubAllAsync.withArgs('SELECT * FROM Rides LIMIT ?,?', [DEFAULT_PAGE_SIZE * (page - 1), DEFAULT_PAGE_SIZE]).callCount).to.equal(1);
      expect(result).to.deep.equal(ridesList);
    });

    it('return rides info with wrong count on pages param', async () => {
      stubAllAsync.returns(Promise.resolve(ridesList));

      const page = 3;
      const count = 3000;
      const result = await getRides(page, count);

      expect(stubAllAsync.callCount).to.equal(1);
      expect(stubAllAsync.withArgs('SELECT * FROM Rides LIMIT ?,?', [MAX_PAGE_SIZE * (page - 1), MAX_PAGE_SIZE]).callCount).to.equal(1);
      expect(result).to.deep.equal(ridesList);
    });

    it('return rides info with incorrect count on pages param', async () => {
      stubAllAsync.returns(Promise.resolve(ridesList));

      const page = 2;
      const count = 'qwe';
      const result = await getRides(page, count);

      expect(stubAllAsync.callCount).to.equal(1);
      expect(stubAllAsync.withArgs('SELECT * FROM Rides LIMIT ?,?', [DEFAULT_PAGE_SIZE * (page - 1), DEFAULT_PAGE_SIZE]).callCount).to.equal(1);
      expect(result).to.deep.equal(ridesList);
    });
  });

  describe('createRide method', () => {
    let stubRunAsync;
    let stubAllAsync;

    before(() => {
      stubRunAsync = sinon.stub(db, 'dbRunAsync');
      stubAllAsync = sinon.stub(db, 'dbAllAsync').returns(Promise.resolve(ridesList));
    });
    after(() => {
      stubRunAsync.restore();
      stubAllAsync.restore();
    });

    it('create ride and return ride info', async () => {
      const lastID = 1;
      const { start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle } = validRidePayload; // eslint-disable-line
      const values = [start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle];

      stubRunAsync.returns(Promise.resolve({ lastID }));

      const result = await createRide(validRidePayload);

      expect(stubRunAsync.callCount).to.equal(1);
      expect(stubRunAsync.withArgs('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values).callCount).to.equal(1);
      expect(stubAllAsync.callCount).to.equal(1);
      expect(stubAllAsync.withArgs('SELECT * FROM Rides WHERE rideID = ?', lastID).callCount).to.equal(1);
      expect(result).to.deep.equal(ridesList[0]);
    });
  });
});
