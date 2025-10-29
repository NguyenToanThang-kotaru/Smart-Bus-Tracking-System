const db = require('../config/db');

exports.getAllSchedules = (callback) => {
  const sql = 'SELECT * FROM lichtrinh WHERE TrangThaiXoa = 0';
  db.query(sql, callback);
};

exports.getScheduleById = (id, callback) => {
  const sql = 'SELECT * FROM lichtrinh WHERE MaLT = ? AND TrangThaiXoa = 0';
  db.query(sql, [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

exports.searchSchedule = (keyword, callback) => {
  const sql = `
    SELECT * FROM lichtrinh
    WHERE TrangThaiXoa = 0
      AND (
        MaLT LIKE ? 
        OR MaTX LIKE ? 
        OR NgayHanhTrinh LIKE ? 
        OR CaHanhTrinh LIKE ?
        OR TrangThai LIKE ?
      )
  `;
  const likeKeyword = `%${keyword}%`;
  db.query(sql, [likeKeyword, likeKeyword, likeKeyword, likeKeyword, likeKeyword], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.getScheduleByDriverId = (driverId, callback) => {
  const sql = 'SELECT * FROM lichtrinh WHERE MaTX = ? AND TrangThaiXoa = "0"';
  db.query(sql, [driverId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.getLastScheduleId = (callback) => {
  const sql = 'SELECT MaLT FROM lichtrinh ORDER BY MaLT DESC LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0 ? results[0].MaLT : null);
  });
};

exports.getNextScheduleId = (callback) => {
  const sql = 'SELECT MaLT FROM lichtrinh ORDER BY MaLT DESC LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) return callback(err);

    let nextId = 'LT000001';
    if (results.length > 0 && results[0].MaLT) {
      const lastId = results[0].MaLT;
      const number = parseInt(lastId.replace('LT', ''), 10) + 1;
      nextId = 'LT' + number.toString().padStart(6, '0');
    }

    callback(null, nextId);
  });
};

exports.addSchedule = (data, callback) => {
  const { MaLT, MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai } = data;
  const sql = `
    INSERT INTO lichtrinh (MaLT, MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai, TrangThaiXoa)
    VALUES (?, ?, ?, ?, ?, 0)
  `;
  db.query(sql, [MaLT, MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

exports.updateSchedule = (id, data, callback) => {
  const sql = 'UPDATE lichtrinh SET ? WHERE MaLT = ? AND TrangThaiXoa = 0';
  db.query(sql, [data, id], callback);
};

exports.deleteSchedule = (id, callback) => {
  const sql = 'UPDATE lichtrinh SET TrangThaiXoa = 1 WHERE MaLT = ?';
  db.query(sql, [id], callback);
};
