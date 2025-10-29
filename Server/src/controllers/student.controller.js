const studentService = require("../services/student.service");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.getAllStudents = (req, res) => {
  studentService.getAllStudents((err, students) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(students);
  });
};

exports.getStudentById = (req, res) => {
  const id = req.params.id;
  studentService.getStudentById(id, (err, student) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!student) {
      return res.status(404).json({ error: 'Không tìm thấy học sinh' });
    }
    res.status(200).json(student);
  });
};

exports.addStudent = (req, res) => {
  const data = req.body;
  studentService.addStudent(data, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(201).json(result);
  });
};

exports.updateStudent = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  studentService.updateStudent(id, data, (err, result) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

exports.deleteStudent = (req, res) => {
  const id = req.params.id;
  studentService.deleteStudent(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
};

exports.getNextStudentId = (req, res) => {
  studentService.getNextStudentId((err, nextId) => {
    if (err) return res.status(500).json({ error: err.message || err });
    res.json({ nextId });
  });
};
