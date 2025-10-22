const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');
const authenticateToken = require('../middleware/authMiddleware');

// POST /api/routes/get-polyline
router.post("/get-polyline", routeController.getPolyLineByORM);
module.exports = router;