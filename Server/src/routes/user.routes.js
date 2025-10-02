const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/users
router.get('/',authenticateToken.authenticateToken ,userController.getAllUsers);

// POST /api/users/create
router.post('/create',authenticateToken.authenticateToken, userController.createUser);

// POST /api/users/login
router.post('/login', userController.login);

module.exports = router;
