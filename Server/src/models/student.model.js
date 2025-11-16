// học sinh
const db = require('../config/db');

exports.getAllStudents = (callback) => {
  db.query('SELECT * FROM hocsinh WHERE TrangThaiXoa = 0', (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.getStudentById = (id, callback) => {
  db.query('SELECT * FROM hocsinh WHERE MaHS = ? AND TrangThaiXoa = 0', [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.addStudent = (data, callback) => {
  const { MaHS, MaPH, MaTram, TenHS, Lop } = data;
  db.query(`INSERT INTO hocsinh (MaHS, MaPH, MaTram, TenHS, Lop, TrangThaiXoa) VALUES (?, ?, ?, ?, ?, 0)`, [MaHS, MaPH, MaTram, TenHS, Lop], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.updateStudent = (id, data, callback) => {
  db.query('UPDATE hocsinh SET ? WHERE MaHS = ? AND TrangThaiXoa = 0', [data, id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.deleteStudent = (id, callback) => {
  db.query('UPDATE hocsinh SET TrangThaiXoa = 1 WHERE MaHS = ?', [id], (err, result) => {
    if (err) return callback(err, null);
    callback(null, result);
  });
};

exports.getLastStudentId = (callback) => {
  db.query('SELECT MaHS FROM hocsinh ORDER BY MaHS DESC LIMIT 1', (err, result) => {
    if (err) return callback(err, null);
    const lastId = result[0] ? result[0].MaHS : null;
    callback(null, lastId);
  });
};
