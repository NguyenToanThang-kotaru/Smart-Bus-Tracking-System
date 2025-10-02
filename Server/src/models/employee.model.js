const db = require('../config/db');

exports.getAllEmployees = (callback) => {
  db.query('SELECT * FROM nhanvien WHERE IsDeleted = 0', callback);
};

exports.getEmployeeById = (id, callback) => {
  db.query('SELECT * FROM nhanvien WHERE MaNV = ? AND IsDeleted = 0', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  })
};

exports.searchEmployee = (keyword, callback) => {
  const sql = `
    SELECT * FROM nhanvien 
    WHERE IsDeleted = 0
      AND (
        MaNV LIKE ? 
        OR TenNV LIKE ? 
        OR DiaChi LIKE ? 
        OR SDT LIKE ?
        OR MaVT LIKE ?
      )
  `;
  const likeKeyword = `%${keyword}%`;
  db.query(sql, [likeKeyword, likeKeyword, likeKeyword, likeKeyword, likeKeyword], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};


// Lấy mã cuối cùng
exports.getLastEmployeeId = (callback) => {
  db.query("SELECT MaNV FROM nhanvien ORDER BY MaNV DESC LIMIT 1", (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0 ? results[0].MaNV : null);
  });
};


// Thêm
exports.addEmployee = (data, callback) => {
  const {MaNV, TenNV, DiaChi, SDT, MaVT} = data;
  const sql = "INSERT INTO nhanvien (MaNV, TenNV, DiaChi, SDT, MaVT) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [MaNV, TenNV, DiaChi, SDT, MaVT], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Kiểm tra số điện thoại đã tồn tại chưa
exports.checkPhoneExists = (SDT, callback) => {
  const query = "SELECT COUNT(*) AS count FROM nhanvien WHERE SDT = ? AND IsDeleted = 0";
  db.query(query, [SDT], (err, results) => {
    if (err) return callback(err);
    const exists = results[0].count > 0;
    callback(null, exists);
  });
};

// Kiểm tra số điện thoại trùng khi update (trừ chính mình)
exports.checkPhoneExistsForUpdate = (phone, id, callback) => {
  db.query(
    "SELECT MaNV FROM nhanvien WHERE SDT = ? AND MaNV != ? AND IsDeleted = 0",
    [phone, id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.length > 0);
    }
  );
};

// Update nhân viên
exports.updateEmployee = (id, data, callback) => {
  db.query("UPDATE nhanvien SET ? WHERE MaNV = ? AND IsDeleted = 0", [data, id], callback);
};

// Soft delete
exports.deleteEmployee = (id, callback) => {
  db.query("UPDATE nhanvien SET IsDeleted = 1 WHERE MaNV = ?", [id], callback);
};