const db = require('../config/db');

exports.getAllInvoices = (callback) => {
  db.query('SELECT * FROM hoadon', callback);
};

exports.getInvoiceStay = (callback) => {
  const sql = "SELECT * FROM hoadon AS t1 LEFT JOIN hoadonban AS t2 ON t1.MaHD = t2.MaHD WHERE NOT(t2.MaBan is NULL)";
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

exports.getInvoiceById = (id, callback) => {
  db.query('SELECT * FROM hoadon WHERE MaHD = ?', [id], (err, results) => {
    if (err) return callback(err);
    callback(null, results[0]);
  })
};

// Lấy mã cuối cùng
exports.getLastInvoiceId = (callback) => {
  db.query("SELECT MaHD FROM hoadon ORDER BY MaHD DESC LIMIT 1", (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0 ? results[0].MaHD : null);
  });
};

exports.addInvoice = (data, callback) => {
  const { MaHD, MaNV, MaKH, TongTien, NgayXuat } = data;
  const sql = "INSERT INTO hoadon (MaHD, MaNV, MaKH, TongTien, NgayXuat) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [MaHD, MaNV, MaKH, TongTien, NgayXuat], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

exports.getInvoiceTakeAway = (callback) => {
  const sql = "SELECT * FROM hoadon AS t1 LEFT JOIN hoadonban AS t2 ON t1.MaHD = t2.MaHD WHERE t2.MaBan is NULL";
  db.query(sql, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
}

// Lấy hóa đơn theo tháng và năm
exports.getInvoicesByMonth = (month, year, callback) => {
  const sql = `
    SELECT 
      DATE(NgayXuat) AS Ngay,
      COUNT(*) AS SoHoaDon,
      SUM(TongTien) AS TongTien
    FROM hoadon 
    WHERE MONTH(NgayXuat) = ? AND YEAR(NgayXuat) = ?
    GROUP BY DATE(NgayXuat)
    ORDER BY Ngay ASC
  `;
  db.query(sql, [month, year], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};
