const express = require('express');
const router = express.Router();
const routeController = require('../controllers/route.controller');
const authenticateToken = require('../middleware/authMiddleware');

// POST /api/routes/get-polyline
router.post("/get-polyline",authenticateToken.authenticateToken ,routeController.getPolyLineByORM);

/* ========= TUYẾN ĐƯỜNG ========= */
router.get("/tuyenduong/nextID", routeController.getNextRouteCode); 
router.get("/tuyenduong", routeController.getAllRoutes);
router.get("/tuyenduong/:MaTD", routeController.getRouteById);
router.post("/tuyenduong", routeController.addRoute);
router.put("/tuyenduong/:MaTD", routeController.updateRoute);
router.delete("/tuyenduong/:MaTD", routeController.deleteRoute);


/* ========= TRẠM DỪNG ========= */
router.get("/tram/nextID", routeController.getNextStationCode); 
router.get("/tram", routeController.getAllStations);
router.get("/tram/:MaTram", routeController.getStationById);
router.post("/tram", routeController.addStation);
router.put("/tram/:MaTram", routeController.updateStation);
router.delete("/tram/:MaTram", routeController.deleteStation);


/* ========= XE BUÝT ========= */
router.get("/xebuyt/nextID", routeController.getNextBusCode);
router.get("/xebuyt", routeController.getAllBuses);
router.get("/xebuyt/:SoXeBuyt", routeController.getBusById);
router.post("/xebuyt", routeController.addBus);
router.put("/xebuyt/:SoXeBuyt", routeController.updateBus);
router.delete("/xebuyt/:SoXeBuyt", routeController.deleteBus);

module.exports = router;