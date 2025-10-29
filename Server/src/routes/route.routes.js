const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');
const authenticateToken = require('../middleware/authMiddleware');

// POST /api/routes/get-polyline
router.post("/get-polyline", routeController.getPolyLineByORM);

/* ========== TUYẾN ĐƯỜNG ========*/
router.get("/routes", routeController.getAllRoutes);
router.get("/routes/:MaTuyen", routeController.getRouteById);
router.post("/routes", routeController.addRoute);
router.put("/routes/:MaTuyen", routeController.updateRoute);
router.delete("/routes/:MaTuyen", routeController.deleteRoute);

/* ========== XE BUÝT ========*/
router.get("/buses", routeController.getAllBuses);
router.get("/buses/:SoXeBuyt", routeController.getBusById);
router.post("/buses", routeController.addBus);
router.put("/buses/:SoXeBuyt", routeController.updateBus);
router.delete("/buses/:SoXeBuyt", routeController.deleteBus);

/* ====== TRẠM DỪNG =======*/
router.get("/stations", routeController.getAllStations);
router.get("/stations/:MaTram", routeController.getStationById);
router.post("/stations", routeController.addStation);
router.put("/stations/:MaTram", routeController.updateStation);
router.delete("/stations/:MaTram", routeController.deleteStation);

module.exports = router;