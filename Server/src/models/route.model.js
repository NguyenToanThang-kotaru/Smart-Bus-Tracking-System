// tuyến đường
const db = require('../config/db');

/* ==== TUYẾN ĐƯỜNG ====*/
exports.getAllRoutes = (callback) => {
  const sql = 'SELECT * FROM tuyenduong WHERE TrangThaiXoa = 0';
  db.query(sql, callback);
};

exports.getRouteById = (MaTD, callback) => {
  const sql = 'SELECT * FROM tuyenduong WHERE MaTD = ? AND TrangThaiXoa = 0';
  db.query(sql, [MaTD], callback);
};

exports.addRoute = (data, callback) => {
  const sql = 'INSERT INTO tuyenduong (MaTD, TenTD, TrangThaiXoa) VALUES (?, ?, 0)';
  db.query(sql, [data.MaTD, data.TenTD], callback);
};

exports.updateRoute = (MaTD, data, callback) => {
  const sql = 'UPDATE tuyenduong SET TenTD = ? WHERE MaTD = ? AND TrangThaiXoa = 0';
  db.query(sql, [data.TenTD, MaTD], callback);
};

exports.deleteRoute = (MaTD, callback) => {
  const sql = 'UPDATE tuyenduong SET TrangThaiXoa = 1 WHERE MaTD = ?';
  db.query(sql, [MaTD], callback);
};

/* ==== TRẠM ===*/
exports.getAllStations = (callback) => {
  const sql = 'SELECT * FROM tram WHERE TrangThaiXoa = 0';
  db.query(sql, callback);
};

exports.getStationById = (MaTram, callback) => {
  const sql = 'SELECT * FROM tram WHERE MaTram = ? AND TrangThaiXoa = 0';
  db.query(sql, [MaTram], callback);
};

exports.addStation = (data, callback) => {
  const sql = 'INSERT INTO tram (MaTram, MaTuyenDuong, TenTram, x, y, TrangThaiXoa) VALUES (?, ?, ?, ?, ?, 0)';
  db.query(sql, [data.MaTram, data.MaTuyenDuong, data.TenTram, data.x, data.y], callback);
};

exports.updateStation = (MaTram, data, callback) => {
  const sql = `
    UPDATE tram 
    SET MaTuyenDuong = ?, TenTram = ?, x = ?, y = ? 
    WHERE MaTram = ? AND TrangThaiXoa = 0
  `;
  db.query(sql, [data.MaTuyenDuong, data.TenTram, data.x, data.y, MaTram], callback);
};

exports.deleteStation = (MaTram, callback) => {
  const sql = 'UPDATE tram SET TrangThaiXoa = 1 WHERE MaTram = ?';
  db.query(sql, [MaTram], callback);
};

/*==== XE BUÝT =====*/
exports.getAllBuses = (callback) => {
  const sql = 'SELECT * FROM xebuyt WHERE TrangThaiXoa = 0';
  db.query(sql, callback);
};

exports.getBusById = (SoXeBuyt, callback) => {
  const sql = 'SELECT * FROM xebuyt WHERE SoXeBuyt = ? AND TrangThaiXoa = 0';
  db.query(sql, [SoXeBuyt], callback);
};

exports.addBus = (data, callback) => {
  const sql = `
    INSERT INTO xebuyt (SoXeBuyt, BienSoXe, SucChua, TrangThaiXe, TrangThaiXoa)
    VALUES (?, ?, ?, ?, 0)
  `;
  db.query(sql, [data.SoXeBuyt, data.BienSoXe, data.SucChua, data.TrangThaiXe], callback);
};

exports.updateBus = (SoXeBuyt, data, callback) => {
  const sql = `
    UPDATE xebuyt 
    SET BienSoXe = ?, SucChua = ?, TrangThaiXe = ? 
    WHERE SoXeBuyt = ? AND TrangThaiXoa = 0
  `;
  db.query(sql, [data.BienSoXe, data.SucChua, data.TrangThaiXe, SoXeBuyt], callback);
};

exports.deleteBus = (SoXeBuyt, callback) => {
  const sql = 'UPDATE xebuyt SET TrangThaiXoa = 1 WHERE SoXeBuyt = ?';
  db.query(sql, [SoXeBuyt], callback);
};



