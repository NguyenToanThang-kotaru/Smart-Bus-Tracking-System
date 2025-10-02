const db = require('../config/db');

exports.countProduct = (callback) => {
  db.query('SELECT ct.MaSP, sp.TenSP, SUM(ct.SoLuongSP) AS TongSoLuong, SUM(ct.ThanhTien) AS TongDoanhThu FROM chitiethd ct INNER JOIN sanpham sp ON ct.MaSP = sp.MaSP GROUP BY ct.MaSP, sp.TenSP ORDER BY TongSoLuong DESC;', callback);
};

exports.getAllProducts = (callback) => {
  db.query('SELECT * FROM sanpham WHERE IsDeleted = 0', callback);
};

exports.getProductById = (id, callback) => {
  db.query('SELECT * FROM sanpham WHERE MaSP = ? AND IsDeleted = 0', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  })
};

exports.searchProduct = (keyword, callback) => {
  const sql = `
    SELECT * FROM sanpham 
    WHERE IsDeleted = 0
      AND (
        MaSP LIKE ? 
        OR TenSP LIKE ? 
        OR GiaSP LIKE ? 
        OR MoTaSP LIKE ?
        OR AnhSP LIKE ?
      )
  `;
  const likeKeyword = `%${keyword}%`;
  db.query(sql, [likeKeyword, likeKeyword, likeKeyword, likeKeyword, likeKeyword], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};


// Lấy mã cuối cùng
exports.getLastProductId = (callback) => {
  db.query("SELECT MaSP FROM sanpham ORDER BY MaSP DESC LIMIT 1", (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0 ? results[0].MaSP : null);
  });
};


// Thêm
exports.addProduct = (data, callback) => {
  const {MaSP, TenSP, GiaSP, MoTaSP, AnhSP} = data;
  const sql = "INSERT INTO sanpham (MaSP, TenSP, GiaSP, MoTaSP, AnhSP) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [MaSP, TenSP, GiaSP, MoTaSP, AnhSP], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

// Update sản phẩm
exports.updateProduct = (id, data, callback) => {
  db.query("UPDATE sanpham SET ? WHERE MaSP = ? AND IsDeleted = 0", [data, id], callback);
};

// Soft delete
exports.deleteProduct = (id, callback) => {
  db.query("UPDATE sanpham SET IsDeleted = 1 WHERE MaSP = ?", [id], callback);
};