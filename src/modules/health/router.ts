import express, { Request, Response } from 'express';

const router = express.Router();

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
router.get('/health', (req: Request, res: Response) => res.send('Healthy'));

export default router;
