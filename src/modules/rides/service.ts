import { dbAllAsync, dbRunAsync } from '../../db';
import { IRideDto, IRideEntity } from './types';
import { DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from './constants';

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

export const createRide = async (values: IRideDto): Promise<IRideEntity> => {
  const result = await dbRunAsync('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);
  const createdRide = await getRideById(result.lastID);

  return createdRide;
};
