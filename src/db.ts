import sqlite3, { Database, RunResult } from 'sqlite3';

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

const db = new (sqlite3.verbose()).Database(':memory:');

export const dbRunAsync = (sql: string, params: any): Promise<RunResult> => new Promise((resolve, reject) => {
  db.run(sql, params, function callback(err: Error) {
    if (err) {
      return reject(err);
    }

    return resolve(this as RunResult);
  });
});

export const dbAllAsync = (sql: string, params?: any): Promise<any[]> => new Promise((resolve, reject) => {
  db.all(sql, params, (err: Error, rows: any[]) => {
    if (err) {
      return reject(err);
    }

    return resolve(rows);
  });
});

export const initializeDb = async (): Promise<Database> => new Promise((resolve, reject) => {
  db.serialize(() => {
    db.run(createRideTableSchema, (err: Error) => {
      if (err) {
        return reject(err);
      }

      return resolve(db);
    });
  });
});

export default db;
