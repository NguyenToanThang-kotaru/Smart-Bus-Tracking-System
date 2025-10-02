const db = require('../config/db');

exports.getAllUsers = (callback) => {
  db.query('SELECT * FROM users', callback);
};

exports.createUser = (data, callback) => {
  db.query('INSERT INTO users SET ?', data, callback);
};

exports.login = (username, password, callback) => {
  db.query('SELECT `TenDangNhap`, `MatKhau`, `MaNV`, `MaQuyen` FROM `taikhoan` WHERE `MatKhau`= ? AND `TenDangNhap` = ?', [username, password], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
}