const db = require('../config/db');

// Lấy tất cả vai trò
exports.getAllRoles = (callback) => {
  db.query('SELECT * FROM vaitro WHERE IsDeleted = 0', callback);
};

// Lấy vai trò theo ID
exports.getRoleById = (id, callback) => {
  db.query('SELECT * FROM vaitro WHERE MaVT = ? AND IsDeleted = 0', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  });
};

// Lấy mã vai trò cuối cùng
exports.getLastRoleId = (callback) => {
  db.query("SELECT MaVT FROM vaitro WHERE IsDeleted = 0 ORDER BY MaVT DESC LIMIT 1", (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0 ? results[0].MaVT : null);
  });
};

// Thêm vai trò
exports.addRole = (data, callback) => {
  const { MaVT, TenVT, IsDeleted } = data;
  const sql = "INSERT INTO vaitro (MaVT, TenVT, IsDeleted) VALUES (?, ?, ?)";
  db.query(sql, [MaVT, TenVT, IsDeleted || 0], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Cập nhật vai trò
exports.updateRole = (id, data, callback) => {
  db.query("UPDATE vaitro SET ? WHERE MaVT = ? AND IsDeleted = 0", [data, id], callback);
};

// Xóa mềm vai trò
exports.deleteRole = (id, callback) => {
  db.query("UPDATE vaitro SET IsDeleted = 1 WHERE MaVT = ?", [id], callback);
};
