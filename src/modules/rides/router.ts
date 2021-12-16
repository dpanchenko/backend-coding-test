import express, { Request, Response } from 'express';

import { createRide, getRideById, getRides } from './service';
import { IRideDto, IRideEntity } from './types';
import { IErrorResponse } from '../../types';

const router = express.Router();

/**
 * @swagger
 *  tags:
 *   name: Rides
 *   description: rides
 */

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
router.post('/rides', async (req: Request, res: Response<IRideEntity | IErrorResponse>) => {
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

  const data: IRideDto = {
    start_lat: req.body.start_lat,
    start_long: req.body.start_long,
    end_lat: req.body.end_lat,
    end_long: req.body.end_long,
    rider_name: req.body.rider_name,
    driver_name: req.body.driver_name,
    driver_vehicle: req.body.driver_vehicle,
  };

  const ride = await createRide(data);

  return res.send(ride);
});

/**
 * @swagger
 * /rides:
 *   get:
 *     summary: All rides list
 *     tags: [Rides]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Requested page
 *       - in: query
 *         name: count
 *         schema:
 *           type: integer
 *           default: 10
*         description: Count items on page
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
router.get('/rides', async (req: Request, res: Response<IRideEntity[] | IErrorResponse>) => {
  const { page, count } = req.query;
  const ridesList = await getRides(page as string, count as string);

  if (ridesList.length === 0) {
    return res.send({
      error_code: 'RIDES_NOT_FOUND_ERROR',
      message: 'Could not find any rides',
    });
  }

  return res.send(ridesList);
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
router.get('/rides/:id', async (req: Request, res: Response<IRideEntity | IErrorResponse>) => {
  const rider = await getRideById(parseInt(req.params.id, 10));

  if (!rider) {
    return res.send({
      error_code: 'RIDES_NOT_FOUND_ERROR',
      message: 'Could not find any rides',
    });
  }

  return res.send(rider);
});

export default router;
