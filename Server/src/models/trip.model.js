const db = require('../config/db');

exports.getAllTrip = (callback) => {
    db.query('SELECT * FROM phancong AS pc JOIN lichtrinh AS lt ON lt.MaTX = pc.MaTX JOIN tramlichtrinh AS tlt ON tlt.MaLT = lt.MaLT JOIN tram ON tlt.MaTram = tram.MaTram;',callback)
}

exports.updateStatus = (MaLT, TrangThai, callback) => {
    const sql = `
        UPDATE lichtrinh 
        SET TrangThai = ? 
        WHERE MaLT = ?;
    `;

    db.query(sql, [TrangThai, MaLT], callback);
};
