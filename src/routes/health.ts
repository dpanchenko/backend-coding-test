import express from 'express';

export const healthRouter = express.Router();

/**
 * @swagger
 *  tags:
 *   name: General
 *   description: general
 */

/**
 * @swagger
 * /health:
 *   get:
 *     description: Healthcheck
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Returns a "Healthy" message.
 */
healthRouter.get('/health', (req, res) => res.send('Healthy'));
