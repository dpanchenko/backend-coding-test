'use strict';

const express = require('express');

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
router.get('/health', (req, res) => res.send('Healthy'));

module.exports = router;
