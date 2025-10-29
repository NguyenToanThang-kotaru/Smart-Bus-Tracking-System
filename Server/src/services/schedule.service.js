const scheduleModel = require('../models/schedule.model');

exports.getAllSchedules = (callback) => {
  scheduleModel.getAllSchedules(callback);
};

exports.getScheduleById = (id, callback) => {
  scheduleModel.getScheduleById(id, callback);
};

exports.searchSchedule = (keyword, callback) => {
  scheduleModel.searchSchedule(keyword, callback);
};

exports.getScheduleByDriverId = (driverId, callback) => {
  scheduleModel.getScheduleByDriverId(driverId, callback);
};

exports.getNextScheduleId = (callback) => {
  scheduleModel.getLastScheduleId((err, lastId) => {
    if (err) return callback(err);

    let newId = "LT000001";
    if (lastId) {
      const num = parseInt(lastId.replace("LT", ""), 10) + 1;
      newId = "LT" + num.toString().padStart(6, "0");
    }
    callback(null, newId);
  });
};

exports.addSchedule = (data, callback) => {
  const { MaLT, MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai } = data;

  if (!MaLT || !MaTX || !NgayHanhTrinh || !CaHanhTrinh || !TrangThai) {
    return callback({ status: 400, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  const scheduleData = { MaLT, MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai };
  scheduleModel.addSchedule(scheduleData, (err, result) => {
    if (err) return callback({ status: 500, message: err.message });
    callback(null, scheduleData);
  });
};

exports.updateSchedule = (id, data, callback) => {
  const { MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai } = data;

  if (!MaTX || !NgayHanhTrinh || !CaHanhTrinh || !TrangThai) {
    return callback({ status: 400, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  const scheduleData = { MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai };
  scheduleModel.updateSchedule(id, scheduleData, (err, result) => {
    if (err) return callback({ status: 500, message: err.message });
    if (result.affectedRows === 0) {
      return callback({ status: 404, message: "Không tìm thấy lịch trình" });
    }

    callback(null, {
      status: 200,
      message: "Cập nhật lịch trình thành công",
      data: { MaLT: id, ...scheduleData }
    });
  });
};

exports.deleteSchedule = (id, callback) => {
  scheduleModel.deleteSchedule(id, (err, result) => {
    if (err) return callback(err);
    if (result.affectedRows === 0) {
      return callback(null, null); // Không tìm thấy
    }

    callback(null, {
      success: true,
      message: "Xóa lịch trình thành công"
    });
  });
};
