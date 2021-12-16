'use strict';

/**
 * @swagger
 *  tags:
 *   name: Rides
 *   description: rides
 */

module.exports = (app, db) => {
    /**
     * @swagger
     * /health:
     *   get:
     *     description: Healthcheck
     *     responses:
     *       200:
     *         description: Returns a "Healthy" message.
     */
     app.get('/health', (req, res) => res.send('Healthy'));

    /**
     * @swagger
     * /rides:
     *   post:
     *     summary: Create a ride
     *     tags: [Rides]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - start_lat
     *               - start_long
     *               - end_lat
     *               - end_long
     *               - rider_name
     *               - driver_name
     *               - driver_vehicle
     *             properties:
     *               start_lat:
     *                 type: integer
     *                 description: Start lat of the ride
     *               start_long:
     *                 type: integer
     *                 description: Start long of the ride
     *               end_lat:
     *                 type: integer
     *                 description: End lat of the ride
     *               end_long:
     *                 type: integer
     *                 description: End long of the ride
     *               rider_name:
     *                 type: string
     *                 description: Rider's name
     *               driver_name:
     *                 type: string
     *                 description: Driver's name
     *               driver_vehicle:
     *                 type: string
     *                 description: Driver's vehicle
     *             example:
     *               start_lat: 10.123
     *               start_long: 10.123
     *               end_lat: 11.123
     *               end_long: 11.123
     *               rider_name: Rider
     *               driver_name: Driver
     *               driver_vehicle: Vehicle
     *     responses:
     *       200:
     *         description: Returns a created ride object.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Ride'
     */
    app.post('/rides', (req, res) => {
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
                message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively'
            });
        }

        if (typeof riderName !== 'string' || riderName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverName !== 'string' || driverName.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
            return res.send({
                error_code: 'VALIDATION_ERROR',
                message: 'Rider name must be a non empty string'
            });
        }

        var values = [req.body.start_lat, req.body.start_long, req.body.end_lat, req.body.end_long, req.body.rider_name, req.body.driver_name, req.body.driver_vehicle];
        
        const result = db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values, function (err) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            db.all('SELECT * FROM Rides WHERE rideID = ?', this.lastID, function (err, rows) {
                if (err) {
                    return res.send({
                        error_code: 'SERVER_ERROR',
                        message: 'Unknown error'
                    });
                }

                res.send(rows);
            });
        });
    });

    /**
     * @swagger
     * /rides:
     *   get:
     *     summary: All rides list
     *     tags: [Rides]
     *     responses:
     *       200:
     *         description: list of rides
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Ride'
     *       404:
     *         description: no rides found
     */
    app.get('/rides', (req, res) => {
        db.all('SELECT * FROM Rides', function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            res.send(rows);
        });
    });

    /**
     * @swagger
     * /rides/{id}:
     *   get:
     *     summary: Ride data by id
     *     tags: [Rides]
     *     parameters:
     *       - in : path
     *         name: id
     *         description: id of ride
     *         schema:
     *           type: integer
     *         required: true
     *     responses:
     *       200:
     *         description: rides by its id
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Ride'
     *       404:
     *         description: ride can not be found
     */
    app.get('/rides/:id', (req, res) => {
        db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, function (err, rows) {
            if (err) {
                return res.send({
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                });
            }

            if (rows.length === 0) {
                return res.send({
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                });
            }

            res.send(rows);
        });
    });

    return app;
};
