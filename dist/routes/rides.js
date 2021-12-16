"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ridesRouter = void 0;
const express_1 = __importDefault(require("express"));
const constants_1 = require("../constants");
exports.ridesRouter = express_1.default.Router();
exports.ridesRouter.post('/rides', (req, res) => {
    const startLatitude = Number(req.body.start_lat);
    const startLongitude = Number(req.body.start_long);
    const endLatitude = Number(req.body.end_lat);
    const endLongitude = Number(req.body.end_long);
    const riderName = req.body.rider_name;
    const driverName = req.body.driver_name;
    const driverVehicle = req.body.driver_vehicle;
    if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
        });
    }
    if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
        });
    }
    if (typeof riderName !== 'string' || riderName.length < 1) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string',
        });
    }
    if (typeof driverName !== 'string' || driverName.length < 1) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string',
        });
    }
    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        return res.send({
            error_code: 'VALIDATION_ERROR',
            message: 'Rider name must be a non empty string',
        });
    }
    const values = [
        req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long,
        req.body.rider_name, req.body.driver_name, req.body.driver_vehicle,
    ];
    req.app.locals.db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function callback(err) {
        if (err) {
            return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error',
            });
        }
        req.app.locals.db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, (err, rows) => {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error',
                });
            }
            res.send(rows);
        });
    });
});
exports.ridesRouter.get('/rides', (req, res) => {
    const { page, count } = req.query;
    let parsedPage = parseInt(page, 10);
    if (Number.isNaN(parsedPage) || parsedPage < 1) {
        parsedPage = 1;
    }
    let parsedCount = parseInt(count, 10);
    if (Number.isNaN(parsedCount) || parsedCount < 1) {
        parsedCount = constants_1.DEFAULT_PAGE_SIZE;
    }
    if (parsedCount > constants_1.MAX_PAGE_SIZE) {
        parsedCount = constants_1.MAX_PAGE_SIZE;
    }
    const limit = (parsedPage - 1) * parsedCount;
    req.app.locals.db.all(`SELECT * FROM Rides LIMIT ${limit},${parsedCount}`, (err, rows) => {
        if (err) {
            return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error',
            });
        }
        if (rows.length === 0) {
            return res.send({
                error_code: 'RIDES_NOT_FOUND_ERROR',
                message: 'Could not find any rides',
            });
        }
        res.send(rows);
    });
});
exports.ridesRouter.get('/rides/:id', (req, res) => {
    req.app.locals.db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, (err, rows) => {
        if (err) {
            return res.send({
                error_code: 'SERVER_ERROR',
                message: 'Unknown error',
            });
        }
        if (rows.length === 0) {
            return res.send({
                error_code: 'RIDES_NOT_FOUND_ERROR',
                message: 'Could not find any rides',
            });
        }
        res.send(rows);
    });
});
//# sourceMappingURL=rides.js.map