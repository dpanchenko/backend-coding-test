import { dbAllAsync, dbRunAsync } from '../../db';
import { IRideDto, IRideEntity } from './types';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from './constants';
import { IValidationResult } from '../../types';

export const getRideById = async (id: number): Promise<IRideEntity> => {
  const rows = await dbAllAsync('SELECT * FROM Rides WHERE rideID = ?', id);

  return rows[0] as IRideEntity;
};

export const getRides = async (page?: number | string, count?: number | string): Promise<IRideEntity[]> => {
  let parsedPage = parseInt(page as string, 10);
  let parsedCount = parseInt(count as string, 10);

  if (Number.isNaN(parsedPage) || parsedPage < 1) {
    parsedPage = 1;
  }
  if (Number.isNaN(parsedCount) || parsedCount < 1) {
    parsedCount = DEFAULT_PAGE_SIZE;
  }
  if (parsedCount > MAX_PAGE_SIZE) {
    parsedCount = MAX_PAGE_SIZE;
  }

  const limit = (parsedPage - 1) * parsedCount;
  const rows = await dbAllAsync(`SELECT * FROM Rides LIMIT ${limit},${parsedCount}`);

  return rows as IRideEntity[];
};

export const createRide = async (data: IRideDto): Promise<IRideEntity> => {
  const { start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle } = data; // eslint-disable-line
  const values = [start_lat, start_long, end_lat, end_long, rider_name, driver_name, driver_vehicle];
  const result = await dbRunAsync('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);
  const createdRide = await getRideById(result.lastID);

  return createdRide;
};

export const validatePayload = (payload: IRideDto): IValidationResult => {
  let message;

  if (payload.start_lat < -90 || payload.start_lat > 90 || payload.start_long < -180 || payload.start_long > 180) {
    message = 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively';
  }

  if (payload.end_lat < -90 || payload.end_lat > 90 || payload.end_long < -180 || payload.end_long > 180) {
    message = 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively';
  }

  if (typeof payload.rider_name !== 'string' || payload.rider_name.length < 1) {
    message = 'Rider name must be a non empty string';
  }

  if (typeof payload.driver_name !== 'string' || payload.driver_name.length < 1) {
    message = 'Driver name must be a non empty string';
  }

  if (typeof payload.driver_vehicle !== 'string' || payload.driver_vehicle.length < 1) {
    message = 'Driver vehicle must be a non empty string';
  }

  return {
    valid: typeof message === 'undefined',
    message,
  };
};
