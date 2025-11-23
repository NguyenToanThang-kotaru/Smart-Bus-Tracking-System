const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const authenticateToken = require('../middleware/authMiddleware');


router.get("/GETALLTRIP", authenticateToken.authenticateToken,tripController.getAllTrip)

router.post("/updatestatus",tripController.updateStatus)
router.get("/getAllTrips",tripController.getAllTrip)
router.post("/getLichTrinhByPhuHuynh", tripController.getLichTrinhByPhuHuynh)
router.post("/getLichTrinhByMa", tripController.getLichTrinhByMa)

module.exports = router;