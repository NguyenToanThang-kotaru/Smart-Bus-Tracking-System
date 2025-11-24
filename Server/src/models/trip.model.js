const db = require('../config/db');

exports.getAllTrip = (callback) => {
    db.query('SELECT * FROM phancong AS pc JOIN lichtrinh AS lt ON lt.MaTX = pc.MaTX JOIN tramlichtrinh AS tlt ON tlt.MaLT = lt.MaLT JOIN tram ON tlt.MaTram = tram.MaTram;', callback)
}
exports.getLichTrinhByMa = (MaLT, callback) => {
    const sql = `
        SELECT *
        FROM phancong AS pc
        JOIN lichtrinh AS lt ON lt.MaTX = pc.MaTX
        JOIN tramlichtrinh AS tlt ON tlt.MaLT = lt.MaLT
        JOIN tram ON tlt.MaTram = tram.MaTram
        WHERE lt.MaLT = ?;
    `;

    db.query(sql, [MaLT], callback);
};

exports.updateStatus = (MaLT, TrangThai, callback) => {
    const sql = `
        UPDATE lichtrinh 
        SET TrangThai = ? 
        WHERE MaLT = ?;
    `;

    db.query(sql, [TrangThai, MaLT], callback);
};

exports.getLichTrinhByPhuHuynh = (TenDangNhap, callback) => {
    const sql = `
        SELECT 
            ph.TenPH,
            hs.TenHS,
            lt.MaLT,
            lt.NgayHanhTrinh,
            lt.CaHanhTrinh,
            lt.TrangThai
        FROM PhuHuynh ph
        JOIN HocSinh hs ON ph.TenDangNhap = hs.MaPH
        JOIN DiemDanh dd ON hs.MaHS = dd.MaHS
        JOIN LichTrinh lt ON dd.MaLT = lt.MaLT
        WHERE ph.TenDangNhap = ? 
        AND DATE(lt.NgayHanhTrinh) = CURDATE();  
    `;

    db.query(sql, [TenDangNhap], callback);
};
