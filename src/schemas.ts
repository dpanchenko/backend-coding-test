import { Database } from 'sqlite3';

/**
 * @swagger
 * components:
 *   schemas:
 *     Ride:
 *       type: object
 *       properties:
 *         rideID:
 *           type: integer
 *           description: The auto-generated id of a ride
 *         startLat:
 *           type: integer
 *           description: Start lat of the ride
 *         startLong:
 *           type: integer
 *           description: Start long of the ride
 *         endLat:
 *           type: integer
 *           description: End lat of the ride
 *         endLong:
 *           type: integer
 *           description: End long of the ride
 *         riderName:
 *           type: string
 *           description: Rider's name
 *         driverName:
 *           type: string
 *           description: Driver's name
 *         driverVehicle:
 *           type: string
 *           description: Driver's vehicle
 *         created:
 *           type: date
 *           description: Created at timestamp
 *       example:
 *         rideID: 1
 *         startLat: 10.123
 *         startLong: 10.123
 *         endLat: 11.123
 *         endLong: 11.123
 *         riderName: Rider
 *         driverName: Driver
 *         driverVehicle: Vehicle
 *         created: 2021-12-15 00:00:00
 *
 */
export default (db: Database): Database => {
  const createRideTableSchema = `
        CREATE TABLE Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `;

  db.run(createRideTableSchema);

  return db;
};
