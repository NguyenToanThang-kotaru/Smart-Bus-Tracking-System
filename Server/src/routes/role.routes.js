const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/role/nextid
router.get('/nextid', authenticateToken.authenticateToken, roleController.getNextRoleId);

// GET /api/role
router.get('/', authenticateToken.authenticateToken, roleController.getAllRoles);

// GET /api/role/:id
router.get('/:id', authenticateToken.authenticateToken, roleController.getRoleById);

// PUT /api/role/delete/:id
router.put('/delete/:id', authenticateToken.authenticateToken, roleController.deleteRole);

// POST /api/role
router.post('/', authenticateToken.authenticateToken, roleController.addRole);

// PUT /api/role/update/:id
router.put('/update/:id', authenticateToken.authenticateToken, roleController.updateRole);


module.exports = router;