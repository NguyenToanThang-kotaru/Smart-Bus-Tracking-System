const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');

router.get('/admin/nextid', studentController.getNextStudentId);

router.get('/admin', studentController.getAllStudents);

router.get('/admin/search', studentController.searchStudent);

router.get('/admin/:id', studentController.getStudentById);

router.post('/admin', studentController.addStudent);

router.put('/admin/update/:id', studentController.updateStudent);

router.put('/admin/delete/:id', studentController.deleteStudent);




module.exports = router;  