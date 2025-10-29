const { fetchPolyline } = require("../services/osrm.service");
require('dotenv').config();
const axios = require("axios");
const routeService = require("../services/route.service");

exports.getPolyLineByORM = async (req, res) => {
  try {
    const { coords } = req.body;
    const result = await fetchPolyline(coords);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("OSRM API error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

/* ========= TUYẾN ĐƯỜNG =======*/

exports.getAllRoutes = (req, res) => {
  routeService.getAllRoutes((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getRouteById = (req, res) => {
  const MaTuyen = req.params.MaTuyen;
  routeService.getRouteById(MaTuyen, (err, route) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!route) return res.status(404).json({ message: "Không tìm thấy tuyến đường" });
    res.status(200).json(route);
  });
};

exports.addRoute = (req, res) => {
  const data = req.body;
  routeService.addRoute(data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Thêm tuyến đường thành công", result });
  });
};

exports.updateRoute = (req, res) => {
  const MaTuyen = req.params.MaTuyen;
  const data = req.body;
  routeService.updateRoute(MaTuyen, data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(200).json({ message: "Cập nhật tuyến đường thành công", result });
  });
};

exports.deleteRoute = (req, res) => {
  const MaTuyen = req.params.MaTuyen;
  routeService.deleteRoute(MaTuyen, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Xóa tuyến đường thành công", result });
  });
};

/* ======== XE BUÝT =========*/

exports.getAllBuses = (req, res) => {
  routeService.getAllBuses((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getBusById = (req, res) => {
  const SoXeBuyt = req.params.SoXeBuyt;
  routeService.getBusById(SoXeBuyt, (err, bus) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!bus) return res.status(404).json({ message: "Không tìm thấy xe buýt" });
    res.status(200).json(bus);
  });
};

exports.addBus = (req, res) => {
  const data = req.body;
  routeService.addBus(data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Thêm xe buýt thành công", result });
  });
};

exports.updateBus = (req, res) => {
  const SoXeBuyt = req.params.SoXeBuyt;
  const data = req.body;
  routeService.updateBus(SoXeBuyt, data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(200).json({ message: "Cập nhật xe buýt thành công", result });
  });
};

exports.deleteBus = (req, res) => {
  const SoXeBuyt = req.params.SoXeBuyt;
  routeService.deleteBus(SoXeBuyt, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Xóa xe buýt thành công", result });
  });
};

/* ========== TRẠM DỪNG ========*/

exports.getAllStations = (req, res) => {
  routeService.getAllStations((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(result);
  });
};

exports.getStationById = (req, res) => {
  const MaTram = req.params.MaTram;
  routeService.getStationById(MaTram, (err, station) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!station) return res.status(404).json({ message: "Không tìm thấy trạm" });
    res.status(200).json(station);
  });
};

exports.addStation = (req, res) => {
  const data = req.body;
  routeService.addStation(data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(201).json({ message: "Thêm trạm thành công", result });
  });
};

exports.updateStation = (req, res) => {
  const MaTram = req.params.MaTram;
  const data = req.body;
  routeService.updateStation(MaTram, data, (err, result) => {
    if (err) return res.status(400).json({ error: err.message });
    res.status(200).json({ message: "Cập nhật trạm thành công", result });
  });
};

exports.deleteStation = (req, res) => {
  const MaTram = req.params.MaTram;
  routeService.deleteStation(MaTram, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Xóa trạm thành công", result });
  });
};