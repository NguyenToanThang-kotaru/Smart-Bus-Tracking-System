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

exports.getAllAssignments = (callback) => {
  scheduleModel.getAllAssignments(callback);
};

exports.getAssignmentById = (id, callback) => {
  scheduleModel.getAssignmentById(id, callback);
};

exports.searchAssignment = (keyword, callback) => {
  scheduleModel.searchAssignment(keyword, callback);
};

exports.getScheduleByDriverId = (driverId, callback) => {
  scheduleModel.getScheduleByDriverId(driverId, callback);
};

exports.getNextScheduleId = (callback) => {
  scheduleModel.getNextScheduleId(callback);
};

exports.getNextAssignmentId = (callback) => {
  scheduleModel.getNextAssignmentId(callback);
};

exports.addSchedule = (data, callback) => {
  const { MaLT, MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai } = data;

  if (!MaLT || !MaTX || !NgayHanhTrinh || !CaHanhTrinh || typeof TrangThai !== "number") {
    return callback({ status: 400, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  // Lấy MaTD dựa vào tài xế
  scheduleModel.getAssignmentByDriverId(MaTX, (err, assignment) => {
    if (err) return callback({ status: 500, message: err.message });
    if (!assignment || !assignment.MaTD) {
      return callback({ status: 404, message: "Không tìm thấy tuyến đường cho tài xế này" });
    }

    const MaTD = assignment.MaTD;
    const scheduleData = { MaLT, MaTX, NgayHanhTrinh, CaHanhTrinh, TrangThai };

    // Thêm lịch trình mới
    scheduleModel.addSchedule(scheduleData, (err, result) => {
      if (err) return callback({ status: 500, message: err.message });

      // Lấy danh sách trạm theo tuyến
      scheduleModel.getStationByRouteId(MaTD, (err, stations) => {
        if (err) return callback({ status: 500, message: err.message });
        if (!stations || stations.length === 0) {
          return callback(null, {
            status: 200,
            message: "Thêm lịch trình thành công (không có trạm trong tuyến)",
            data: scheduleData
          });
        }

        // Thêm từng trạm vào bảng tramlichtrinh
        const addStations = stations.map(
          (station) =>
            new Promise((resolve, reject) => {
              scheduleModel.addStationSchedule(
                { MaLT, MaTram: station.MaTram },
                (err, result) => {
                  if (err) return reject(err);

                  // Lấy danh sách học sinh tại trạm
                  scheduleModel.getStudentByStationId(station.MaTram, (err, students) => {
                    if (err) return reject(err);

                    if (students && students.length > 0) {
                      // Thêm học sinh vào bảng diemdanh
                      const addCheckins = students.map(
                        (student) =>
                          new Promise((resolve2, reject2) => {
                            scheduleModel.addCheckIn(
                              { MaLT, MaHS: student.MaHS },
                              (err, result) => {
                                if (err) return reject2(err);
                                resolve2(result);
                              }
                            );
                          })
                      );

                      Promise.all(addCheckins)
                        .then(resolve)
                        .catch(reject);
                    } else {
                      resolve();
                    }
                  });
                }
              );
            })
        );

        // Chờ tất cả xong
        Promise.all(addStations)
          .then(() => {
            callback(null, {
              status: 200,
              message: "Thêm lịch trình, trạm và danh sách điểm danh học sinh thành công",
              data: scheduleData
            });
          })
          .catch((err) => {
            callback({ status: 500, message: "Lỗi khi thêm dữ liệu: " + err.message });
          });
      });
    });
  });
};

exports.addAssignment = (data, callback) => {
  const { MaPC, MaTX, SoXeBuyt, MaTD } = data;

  if (!MaTX || !SoXeBuyt || !MaTD) {
    return callback({ status: 400, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  const assignmentData = { MaPC, MaTX, SoXeBuyt, MaTD };
  scheduleModel.addAssignment(assignmentData, (err, result) => {
    if (err) return callback({ status: 500, message: err.message });
    callback(null, assignmentData);
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

exports.updateAssignment = (id, data, callback) => {
  const { MaPC, MaTX, SoXeBuyt, MaTD } = data;

  if (!MaTX || !SoXeBuyt || !MaTD) {
    return callback({ status: 400, message: "Vui lòng nhập đầy đủ thông tin" });
  }

  const assignmentData = { MaPC, MaTX, SoXeBuyt, MaTD };
  scheduleModel.updateAssignment(id, assignmentData, (err, result) => {
    if (err) return callback({ status: 500, message: err.message });
    if (result.affectedRows === 0) {
      return callback({ status: 404, message: "Không tìm thấy phân công" });
    }

    callback(null, {
      status: 200,
      message: "Cập nhật phân công thành công",
      data: { MaPC: id, ...assignmentData }
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

exports.deleteAssignment = (id, callback) => {
  scheduleModel.deleteAssignment(id, (err, result) => {
    if (err) return callback(err);
    if (result.affectedRows === 0) {
      return callback(null, null); // Không tìm thấy
    }

    callback(null, {
      success: true,
      message: "Xóa phân công thành công"
    });
  });
};
