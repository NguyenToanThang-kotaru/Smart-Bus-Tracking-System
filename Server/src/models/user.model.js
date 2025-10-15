const db = require('../config/db');

exports.getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

exports.createUser = (data, callback) => {
  db.query('INSERT INTO users SET ?', data, callback);
};

exports.Adminlogin = (username, password, callback) => {
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