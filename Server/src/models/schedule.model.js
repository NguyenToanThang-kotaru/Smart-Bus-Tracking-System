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

exports.getAllAssignments = (callback) => {
  const sql = 'SELECT * FROM phancong WHERE TrangThaiXoa = 0';
  db.query(sql, callback);
};

exports.getAssignmentById = (id, callback) => {
  const sql = 'SELECT * FROM phancong WHERE MaPC = ? AND TrangThaiXoa = 0';
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

exports.searchAssignment = (keyword, callback) => {
  const sql = `
    SELECT * FROM phancong
    WHERE TrangThaiXoa = 0
      AND (
        MaPC LIKE ? 
        OR MaTX LIKE ? 
        OR SoXeBuyt LIKE ? 
        OR MaTD LIKE ?
      )
  `;
  const likeKeyword = `%${keyword}%`;
  db.query(sql, [likeKeyword, likeKeyword, likeKeyword, likeKeyword], (err, results) => {
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

exports.getNextAssignmentId = (callback) => {
  const sql = 'SELECT MaPC FROM phancong ORDER BY MaPC DESC LIMIT 1';
  db.query(sql, (err, results) => {
    if (err) return callback(err);

    let nextId = 'PC000001';
    if (results.length > 0 && results[0].MaPC) {
      const lastId = results[0].MaPC;
      const number = parseInt(lastId.replace('PC', ''), 10) + 1;
      nextId = 'PC' + number.toString().padStart(6, '0');
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

exports.addAssignment = (data, callback) => {
  const { MaPC, MaTX, SoXeBuyt, MaTD} = data;
  const sql = `
    INSERT INTO phancong (MaPC, MaTX, SoXeBuyt, MaTD, TrangThaiXoa)
    VALUES (?, ?, ?, ?, 0)
  `;
  db.query(sql, [MaPC, MaTX, SoXeBuyt, MaTD], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

exports.updateSchedule = (id, data, callback) => {
  const sql = 'UPDATE lichtrinh SET ? WHERE MaLT = ? AND TrangThaiXoa = 0';
  db.query(sql, [data, id], callback);
};

exports.deleteSchedule = (id, callback) => {
  const sql = 'UPDATE lichtrinh SET TrangThaiXoa = 1 WHERE MaLT = ?';
  db.query(sql, [id], callback);
};

exports.updateAssignment = (id, data, callback) => {
  const sql = 'UPDATE phancong SET ? WHERE MaPC = ? AND TrangThaiXoa = 0';
  db.query(sql, [data, id], callback);
};

exports.deleteAssignment = (id, callback) => {
  const sql = 'UPDATE phancong SET TrangThaiXoa = 1 WHERE MaPC = ?';
  db.query(sql, [id], callback);
};

exports.getAssignmentByDriverId = (driverId, callback) => {
  const sql = `
    SELECT MaTD
    FROM phancong
    WHERE MaTX = ? AND TrangThaiXoa = "0"
    LIMIT 1
  `;
  db.query(sql, [driverId], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]); // chứa MaTD
  });
};

exports.getStationByRouteId = (routeId, callback) => {
  const sql = 'SELECT * FROM tram WHERE MaTuyenDuong = ? AND TrangThaiXoa = "0"';
  db.query(sql, [routeId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.addStationSchedule = (data, callback) => {
  const { MaLT, MaTram } = data;
  const sql = `
    INSERT INTO tramlichtrinh (MaLT, MaTram, TrangThai)
    VALUES (?, ?, 0)
  `;
  db.query(sql, [MaLT, MaTram], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

exports.getStudentByStationId = (routeId, callback) => {
  const sql = 'SELECT * FROM hocsinh WHERE MaTram = ? AND TrangThaiXoa = "0"';
  db.query(sql, [routeId], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

exports.addCheckIn = (data, callback) => {
  const { MaLT, MaHS} = data;
  const sql = `
    INSERT INTO diemdanh (MaLT, MaHS, TrangThai, TrangThaiXoa)
    VALUES (?, ?, 0, 0)
  `;
  db.query(sql, [MaLT, MaHS], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
}

exports.getNameUserByDriverId = (driverId, callback) => {
  const sql = `
    SELECT nguoidung.*
    FROM taixe
    JOIN nguoidung ON nguoidung.MaND = taixe.MaTX
    WHERE taixe.MaTX = ? AND nguoidung.TrangThaiXoa = 0
  `;
  
  db.query(sql, [driverId], (err, results) => {
    if (err) return callback(err);
    callback(null, results.length > 0 ? results[0] : null);
  });
};