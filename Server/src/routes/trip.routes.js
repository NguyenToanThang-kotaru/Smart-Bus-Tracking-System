const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const authenticateToken = require('../middleware/authMiddleware');

router.get("/getAllTrip",authenticateToken.authenticateToken,tripController.getAllTrip)

router.get("/GETALLTRIPs", tripController.getAllTrip)

module.exports = router;