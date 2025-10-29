const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/users
// router.get('/',authenticateToken.authenticateToken ,userController.getAllUsers);

// // POST /api/users/create
// router.post('/create',authenticateToken.authenticateToken, userController.createUser);

/* ========= PHỤ HUYNH ========= */
router.get("/phuhuynh", userController.getAllParents);
router.get("/phuhuynh/:TenDangNhap", userController.getParentById);
router.post("/phuhuynh", userController.addParent);
router.put("/phuhuynh/:TenDangNhap", userController.updateParent);
router.delete("/phuhuynh/:TenDangNhap", userController.deleteParent);


/* ========= QUẢN LÝ TÀI XẾ ========= */
router.get("/quanlytaixe", userController.getAllManagerDrivers);
router.get("/quanlytaixe/:MaND", userController.getManagerDriverById);
router.post("/quanlytaixe", userController.addManagerDriver);
router.put("/quanlytaixe/:MaND", userController.updateManagerDriver);
router.delete("/quanlytaixe/:MaND", userController.deleteManagerDriver);


/* ========= QUẢN TRỊ VIÊN ========= */
router.get("/admin", userController.getAllAdmins);
router.get("/admin/:MaND", userController.getAdminById);
router.post("/admin", userController.addAdmin);
router.put("/admin/:MaND", userController.updateAdmin);
router.delete("/admin/:MaND", userController.deleteAdmin);

// ==================== TÀI XẾ ====================
router.get("/taixe", userController.getAllDrivers);
router.get("/taixe/:MaTX", userController.getDriverById);
router.post("/taixe", userController.addDriver);
router.put("/taixe/:MaTX", userController.updateDriver);
router.delete("/taixe/:MaTX/:MaND", userController.deleteDriver);

// POST /api/users/login
router.post('/admin/THEM_TAI_XE', userController.Adminlogin);
router.post('/admin/login', userController.Adminlogin);
router.post('/user/login', userController.Userlogin);
module.exports = router;
