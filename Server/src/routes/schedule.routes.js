const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');
const authenticateToken = require('../middleware/authMiddleware');
const e = require('express');

// GET /api/schedule/nextid (lấy mã tiếp theo)
router.get('/nextid', authenticateToken.authenticateToken, scheduleController.getNextScheduleId);

// GET /api/schedule/assignment/nextid (lấy mã phân công tiếp theo)
router.get('/assignment/nextid', authenticateToken.authenticateToken, scheduleController.getNextAssignmentId);

// GET /api/schedule/search?keyword=abc (tìm kiếm)
router.get('/search', authenticateToken.authenticateToken, scheduleController.searchSchedule);

// GET /api/schedule/assignment/search?keyword=abc (tìm kiếm phân công)
router.get('/assignment/search', authenticateToken.authenticateToken, scheduleController.searchAssignment);

// GET /api/schedule (lấy tất cả)
router.get('/', authenticateToken.authenticateToken, scheduleController.getAllSchedules);

// GET /api/schedule/assignment (lấy tất cả phân công)
router.get('/assignment', authenticateToken.authenticateToken, scheduleController.getAllAssignments);

// GET /api/schedule/driverId?id=ND000001 (lấy theo mã tx)
router.get('/driverId', authenticateToken.authenticateToken, scheduleController.getScheduleByDriverId) //==========================

// GET /api/schedule/driver/user?id=ND000001 (lấy thông tin người dùng từ tài xế)
router.get('/driver/user',scheduleController.getNameUserByDriverId);

// PUT /api/schedule/update/:id (cập nhật)
router.put('/update/:id', authenticateToken.authenticateToken, scheduleController.updateSchedule);

// PUT /api/schedule/assignment/update/:id (cập nhật phân công)
router.put('/assignment/update/:id', authenticateToken.authenticateToken, scheduleController.updateAssignment);

// PUT /api/schedule/delete/:id (xóa lt)
router.put('/delete/:id', authenticateToken.authenticateToken, scheduleController.deleteSchedule);

// PUT /api/schedule/assignment/delete/:id (xóa pc)
router.put('/assignment/delete/:id', authenticateToken.authenticateToken, scheduleController.deleteAssignment);

router.get("/stops/:MaLT", scheduleController.getStopsByMaLT);

// GET /api/schedule/:id (lấy theo id)
router.get('/:id', authenticateToken.authenticateToken, scheduleController.getScheduleById);

// GET /api/schedule/assignment/:id (lấy theo mã pc)
router.get('/assignment/:id', authenticateToken.authenticateToken, scheduleController.getAssignmentById);

// POST /api/schedule (thêm mới lt)
router.post('/', scheduleController.addSchedule);

// POST /api/schedule/assignment (thêm mới pc)
router.post('/assignment', authenticateToken.authenticateToken, scheduleController.addAssignment);

router.post("/update-student-status", scheduleController.updateStudentStatus);

exports = module.exports = router;