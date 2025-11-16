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

exports.getLastRouteCode = (callback) => {
  const sql = "SELECT MaTD FROM tuyenduong ORDER BY MaTD DESC LIMIT 1";
  db.query(sql, callback);
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

exports.getLastStationCode = (callback) => {
  const sql = "SELECT MaTram FROM tram ORDER BY MaTram DESC LIMIT 1";
  db.query(sql, callback);
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

exports.getLastBusCode = (callback) => {
  const sql = "SELECT SoXeBuyt FROM xebuyt ORDER BY SoXeBuyt DESC LIMIT 1";
  db.query(sql, callback);
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

exports.deleteRoute = (MaTD, callback) => {
  // 1. Reset MaTuyenDuong cho các trạm thuộc tuyến này
  const sqlReset = "UPDATE tram SET MaTuyenDuong = NULL WHERE MaTuyenDuong = ?";
  db.query(sqlReset, [MaTD], (err) => {
    if (err) return callback(err);

    // 2. Xóa tuyến khỏi bảng tuyến
    const sqlDelete = "UPDATE tuyenduong SET TrangThaiXoa = 1 WHERE MaTD = ?";
    db.query(sqlDelete, [MaTD], callback);
  });
};

exports.assignStationsToRoute = (MaTD, stations, callback) => {
  const sql = `UPDATE tram SET MaTuyenDuong = ? WHERE MaTram IN (${stations.map(() => "?").join(",")})`;
  db.query(sql, [MaTD, ...stations], callback);
};

// Cập nhật trạm cho một tuyến
exports.updateStationsForRoute = (MaTD, newStations, callback) => {
  // 1. Xóa tuyến khỏi các trạm cũ (trừ các trạm vẫn thuộc tuyến mới)
  const sqlReset = `UPDATE tram SET MaTuyenDuong = NULL WHERE MaTuyenDuong = ? AND MaTram NOT IN (${newStations.map(() => "?").join(",")})`;
  db.query(sqlReset, [MaTD, ...newStations], (err) => {
    if (err) return callback(err);

    if (newStations.length === 0) return callback(null); // nếu không còn trạm nào, kết thúc

    // 2. Gán tuyến cho các trạm mới (hoặc giữ nguyên trạm cũ)
    const sqlSet = `UPDATE tram SET MaTuyenDuong = ? WHERE MaTram IN (${newStations.map(() => "?").join(",")})`;
    db.query(sqlSet, [MaTD, ...newStations], callback);
  });
};

