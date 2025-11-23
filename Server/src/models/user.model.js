const db = require('../config/db');

exports.getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

exports.createUser = (data, callback) => {
  db.query('INSERT INTO users SET ?', data, callback);
};

exports.Administratorlogin = (username, password, callback) => {
  db.query('SELECT * FROM `nguoidung` WHERE `MatKhau`= ? AND `TenDangNhap` = ? AND `TrangThaiXoa` = 0', [password, username], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
}
exports.Userlogin = (username, password, callback) => {
  db.query('SELECT * FROM `phuhuynh` WHERE `MatKhau`= ? AND `TenDangNhap` = ? AND `TrangThaiXoa` = 0', [password, username], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
}
/* ===================== PHỤ HUYNH ===================== */

exports.getAllParents = (callback) => {
  const sql = 'SELECT * FROM phuhuynh WHERE TrangThaiXoa = 0';
  db.query(sql, callback);
};

exports.getParentById = (TenDangNhap, callback) => {
  const sql = 'SELECT * FROM phuhuynh WHERE TenDangNhap = ? AND TrangThaiXoa = 0';
  db.query(sql, [TenDangNhap], callback);
};

exports.getLastParentId = (callback) => { 
  db.query('SELECT TenDangNhap FROM phuhuynh ORDER BY TenDangNhap DESC LIMIT 1', callback); };

exports.addParent = (data, callback) => {
  const sql = `INSERT INTO phuhuynh (TenDangNhap, SdtPH, TenPH, MatKhau, TrangThaiXoa)VALUES (?, ?, ?, ?, 0)`;
  db.query(sql, [data.TenDangNhap, data.SdtPH, data.TenPH, data.MatKhau], callback);
};

exports.updateParent = (TenDangNhap, data, callback) => {
  const sql = `
    UPDATE phuhuynh 
    SET SdtPH = ?, TenPH = ?, MatKhau = ? 
    WHERE TenDangNhap = ? AND TrangThaiXoa = 0
  `;
  db.query(sql, [data.SdtPH, data.TenPH, data.MatKhau, TenDangNhap], callback);
};

exports.deleteParent = (TenDangNhap, callback) => {
  const sql = 'UPDATE phuhuynh SET TrangThaiXoa = 1 WHERE TenDangNhap = ?';
  db.query(sql, [TenDangNhap], callback);
};

/* ===================== QUẢN LÝ TÀI XẾ ===================== */

exports.getAllBusManagers = (callback) => {
  const sql = "SELECT * FROM nguoidung WHERE MaVT = 'VT000002' AND TrangThaiXoa = 0";
  db.query(sql, callback);
};

exports.getBusManagerById = (MaND, callback) => {
  const sql = "SELECT * FROM nguoidung WHERE MaND = ? AND MaVT = 'VT000002' AND TrangThaiXoa = 0";
  db.query(sql, [MaND], callback);
};

exports.getLastBusManagerId = (callback) => {
  db.query("SELECT MaND FROM nguoidung ORDER BY MaND DESC LIMIT 1", callback);
};

exports.addBusManager = (data, callback) => {
  const sql = "INSERT INTO nguoidung (MaND, MaVT, TenND, TenDangNhap, MatKhau, TrangThaiXoa) VALUES (?, ?, ?, ?, ?, 0)";
  db.query(sql, [data.MaND, data.MaVT, data.TenND, data.TenDangNhap, data.MatKhau], callback);
};

exports.updateBusManager = (MaND, data, callback) => {
  const sql = "UPDATE nguoidung SET TenND = ?, TenDangNhap = ?, MatKhau = ? WHERE MaND = ? AND MaVT = 'VT000002' AND TrangThaiXoa = 0";
  db.query(sql, [data.TenND, data.TenDangNhap, data.MatKhau, MaND], callback);
};

exports.deleteBusManager = (MaND, callback) => {
  const sql = "UPDATE nguoidung SET TrangThaiXoa = 1 WHERE MaND = ? AND MaVT = 'VT000002'";
  db.query(sql, [MaND], callback);
};

/* ===================== QUẢN TRỊ VIÊN ===================== */

exports.getAllAdministrators = (callback) => {
  const sql = "SELECT * FROM nguoidung WHERE MaVT = 'VT000001' AND TrangThaiXoa = 0";
  db.query(sql, callback);
};

exports.getAdministratorById = (MaND, callback) => {
  const sql = "SELECT * FROM nguoidung WHERE MaND = ? AND MaVT = 'VT000001' AND TrangThaiXoa = 0";
  db.query(sql, [MaND], callback);
};

exports.getLastAdministratorId = (callback) => {
  const sql = "SELECT MaND FROM nguoidung ORDER BY MaND DESC LIMIT 1";
  db.query(sql, callback);
};

exports.addAdministrator = (data, callback) => {
  const sql = "INSERT INTO nguoidung (MaND, MaVT, TenND, TenDangNhap, MatKhau, TrangThaiXoa) VALUES (?, ?, ?, ?, ?, 0)";
  db.query(sql, [data.MaND, data.MaVT, data.TenND, data.TenDangNhap, data.MatKhau], callback);
};

exports.updateAdministrator = (MaND, data, callback) => {
  const sql = "UPDATE nguoidung SET TenND = ?, TenDangNhap = ?, MatKhau = ? WHERE MaND = ? AND MaVT = 'VT000001' AND TrangThaiXoa = 0";
  db.query(sql, [data.TenND, data.TenDangNhap, data.MatKhau, MaND], callback);
};

exports.deleteAdministrator = (MaND, callback) => {
  const sql = "UPDATE nguoidung SET TrangThaiXoa = 1 WHERE MaND = ? AND MaVT = 'VT000001'";
  db.query(sql, [MaND], callback);
};

/* ===================== TÀI XẾ ===================== */

exports.getAllDrivers = (callback) => {
  const sql = "SELECT * FROM taixe WHERE TrangThaiXoa = 0";
  db.query(sql, callback);
};

exports.getDriverById = (MaTX, callback) => {
  const sql = "SELECT * FROM taixe WHERE MaTX = ? AND TrangThaiXoa = 0";
  db.query(sql, [MaTX], callback);
};

exports.getLastDriverId = (callback) => {
  db.query("SELECT MaND FROM nguoidung ORDER BY MaND DESC LIMIT 1", callback);
};

exports.addDriverAccount = (data, callback) => {
  const sql = "INSERT INTO nguoidung (MaND, MaVT, TenND, TenDangNhap, MatKhau, TrangThaiXoa) VALUES (?, ?, ?, ?, ?, 0)";
  db.query(sql, [data.MaND, data.MaVT, data.TenND, data.TenDangNhap, data.MatKhau], callback);
};

exports.addDriverInfo = (data, callback) => {
  const sql = "INSERT INTO taixe (MaTX, SoCccd, SdtTX, BacBangLai, TrangThaiXoa) VALUES (?, ?, ?, ?, 0)";
  db.query(sql, [data.MaTX, data.SoCccd, data.SdtTX, data.BacBangLai], callback);
};

exports.updateDriver = (MaTX, data, callback) => {
  const sql = "UPDATE taixe SET SoCccd = ?, SdtTX = ?, BacBangLai = ? WHERE MaTX = ? AND TrangThaiXoa = 0";
  db.query(sql, [data.SoCccd, data.SdtTX, data.BacBangLai, MaTX], callback);
};

exports.deleteDriver = (MaTX, callback) => {
  const sql1 = "UPDATE taixe SET TrangThaiXoa = 1 WHERE MaTX = ?";
  const sql2 = "UPDATE nguoidung SET TrangThaiXoa = 1 WHERE MaND = ?";

  db.query(sql1, [MaTX], (err) => {
    if (err) return callback(err);
    db.query(sql2, [MaTX], callback);
  });
};
