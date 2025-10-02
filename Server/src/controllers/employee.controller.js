const employeeService = require("../services/employee.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllEmployees = (req, res) => {
    employeeService.getAllEmployees((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getEmployeeById = (req, res) => {
  const id = req.params.id;

  employeeService.getEmployeeById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy nhân viên" });
    res.json(result);
  });
};

exports.searchEmployee = (req, res) => {
  const keyword = req.query.keyword || "";
  employeeService.searchEmployee(keyword, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getNextEmployeeId = (req, res) => {
  employeeService.getNextEmployeeId((err, nextId) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ nextId });
  });
};

exports.addEmployee = (req, res) => {
  const employeeData = req.body;

  employeeService.addEmployee(employeeData, (err, result) => {
    if (err) {
      if (err.status === 400) {
        // Validation lỗi → trả 200, success=false
        return res.json({ success: false, message: err.message });
      }
      // Lỗi khác vẫn throw status
      const status = err.status || 500;
      return res.status(status).json({ error: { message: err.message } });
    }
    res.status(201).json({ success: true, message: "Thêm nhân viên thành công", employee: result });
  });
};

exports.updateEmployee = (req, res) => {
  const id = req.params.id;
  const employeeData = req.body;

  employeeService.updateEmployee(id, employeeData, (err, result) => {
    if (err) {
      if (err.status === 400) {
        // Validation lỗi → trả 200, success=false
        return res.json({ success: false, message: err.message });
      }
      const status = err.status || 500;
      return res.status(status).json({ error: { message: err.message } });
    }

    res.status(200).json({ success: true, message: "Sửa nhân viên thành công", employee: result });
  });
};

exports.deleteEmployee = (req, res) => {
  const id = req.params.id;

  employeeService.deleteEmployee(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy nhân viên" });

    res.json({ message: "Xóa nhân viên thành công" });
  });
};