const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/users
// router.get('/',authenticateToken.authenticateToken ,userController.getAllUsers);

// // POST /api/users/create
// router.post('/create',authenticateToken.authenticateToken, userController.createUser);

// POST /api/users/login
router.post('/admin/login', userController.Adminlogin);
router.post('/user/login', userController.Userlogin);
module.exports = router;
