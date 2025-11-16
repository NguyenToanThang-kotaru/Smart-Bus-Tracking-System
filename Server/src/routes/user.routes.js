const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middleware/authMiddleware');

// GET /api/users
// router.get('/',authenticateToken.authenticateToken ,userController.getAllUsers);

// // POST /api/users/create
// router.post('/create',authenticateToken.authenticateToken, userController.createUser);

/* ========= PHỤ HUYNH ========= */
router.get("/admin/parents", userController.getAllParents);

router.get("/admin/parents/:username", userController.getParentById);

router.post("/admin/parents", userController.addParent);

router.put("/admin/parents/:username", userController.updateParent);

router.delete("/admin/parents/:username", userController.deleteParent);

/* ========= QUẢN LÝ XE BUYT ========= */
router.get("/admin/busManager", userController.getAllBusManagers);

router.get("/admin/busManager/:id", userController.getBusManagerById);

router.post("/admin/busManager", userController.addBusManager);

router.put("/admin/busManager/:id", userController.updateBusManager);

router.delete("/admin/busManager/:id", userController.deleteBusManager);

/* ========= QUẢN TRỊ VIÊN ========= */
router.get("/admin/administrator", userController.getAllAdministrators);

router.get("/admin/administrator/:id", userController.getAdministratorById);

router.post("/admin/administrator", userController.addAdministrator);

router.put("/admin/administrator/:id", userController.updateAdministrator);

router.delete("/admin/administrator/:id", userController.deleteAdministrator);

// ==================== TÀI XẾ ====================
router.get("/admin/driver", userController.getAllDrivers);

router.get("/admin/driver/:id", userController.getDriverById);

router.post("/admin/driver", userController.addDriver);

router.put("/admin/driver/:id", userController.updateDriver);

router.delete("/admin/driver/:id", userController.deleteDriver);


// POST /api/users/login
router.post('/admin/login', userController.Adminlogin);

router.post('/user/login', userController.Userlogin);

module.exports = router;
