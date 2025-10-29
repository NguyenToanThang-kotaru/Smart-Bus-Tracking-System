const scheduleService = require("../services/schedule.service");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Lấy mã lịch tiếp theo
exports.getNextScheduleId = (req, res) => {
  scheduleService.getNextScheduleId((err, nextId) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ nextId });
  });
};

// Lấy tất cả lịch
exports.getAllSchedules = (req, res) => {
  scheduleService.getAllSchedules((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Lấy lịch theo ID
exports.getScheduleById = (req, res) => {
  const id = req.params.id;

  scheduleService.getScheduleById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy lịch" });
    res.json(result);
  });
};

// Tìm kiếm lịch theo từ khóa
exports.searchSchedule = (req, res) => {
  const keyword = req.query.keyword || '';
  scheduleService.searchSchedule(keyword, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Lấy lịch theo mã tài xế (driverId)
exports.getScheduleByDriverId = (req, res) => {
  const driverId = req.query.id;
  if (!driverId) {
    return res.status(400).json({ message: "Thiếu mã tài xế (id)" });
  }

  scheduleService.getScheduleByDriverId(driverId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (!results || results.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy lịch cho tài xế này" });
    }
    res.json(results);
  });
};

// Thêm mới lịch
exports.addSchedule = (req, res) => {
  const scheduleData = req.body;

  scheduleService.addSchedule(scheduleData, (err, result) => {
    if (err) {
      if (err.status === 400) {
        return res.json({ success: false, message: err.message });
      }
      const status = err.status || 500;
      return res.status(status).json({ error: { message: err.message } });
    }

    res.status(201).json({ success: true, message: "Thêm lịch thành công", schedule: result });
  });
};

// Cập nhật lịch
exports.updateSchedule = (req, res) => {
  const id = req.params.id;
  const scheduleData = req.body;

  scheduleService.updateSchedule(id, scheduleData, (err, result) => {
    if (err) {
      if (err.status === 400) {
        return res.json({ success: false, message: err.message });
      }
      const status = err.status || 500;
      return res.status(status).json({ error: { message: err.message } });
    }

    res.status(200).json({ success: true, message: "Cập nhật lịch thành công", schedule: result });
  });
};

// Xóa lịch (soft delete hoặc hard delete tùy service)
exports.deleteSchedule = (req, res) => {
  const id = req.params.id;

  scheduleService.deleteSchedule(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy lịch" });

    res.json({ message: "Xóa lịch thành công" });
  });
};
