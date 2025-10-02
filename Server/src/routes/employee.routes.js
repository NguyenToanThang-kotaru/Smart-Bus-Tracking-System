const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/employee/nextid
router.get('/nextid', authenticateToken.authenticateToken, employeeController.getNextEmployeeId);

// GET /api/employee
router.get('/', authenticateToken.authenticateToken, employeeController.getAllEmployees);

// GET /api/employee/search?keyword=abc
router.get('/search', authenticateToken.authenticateToken, employeeController.searchEmployee);

// GET /api/employee/:id
router.get('/:id', authenticateToken.authenticateToken, employeeController.getEmployeeById);

// POST /api/employee
router.post('/', authenticateToken.authenticateToken, employeeController.addEmployee);

// PUT /api/employee/update/:id
router.put('/update/:id', authenticateToken.authenticateToken, employeeController.updateEmployee);

// PUT /api/employee/delete/:id
router.put('/delete/:id', authenticateToken.authenticateToken, employeeController.deleteEmployee);

module.exports = router;