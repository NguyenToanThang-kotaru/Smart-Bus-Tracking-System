const roleService = require("../services/role.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.getAllRoles = (req, res) => {
    roleService.getAllRoles((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.getRoleById = (req, res) => {
  const id = req.params.id;

  roleService.getRoleById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy vai trò" });
    res.json(result);
  });
};

exports.getNextRoleId = (req, res) => {
  roleService.getNextRoleId((err, nextId) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ nextId });
  });
};

exports.addRole = (req, res) => {
  const roleData = req.body;

  roleService.addRole(roleData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "Thêm vai trò thành công", role: result });
  });
};

exports.updateRole = (req, res) => {
  const id = req.params.id;              // lấy id từ URL
  const roleData = req.body;

  roleService.updateRole(id, roleData, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy vai trò" });

    res.status(200).json({ message: "Sửa vai trò thành công", role: result });
  });
};

exports.deleteRole = (req, res) => {
  const id = req.params.id;

  roleService.deleteRole(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "Không tìm thấy vai trò" });

    res.json({ message: "Xóa vai trò thành công" });
  });
};