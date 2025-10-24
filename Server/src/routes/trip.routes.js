const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const authenticateToken = require('../middleware/authMiddleware');