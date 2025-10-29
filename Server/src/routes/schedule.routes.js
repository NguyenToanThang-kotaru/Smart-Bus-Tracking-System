const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.controller');
const authenticateToken = require('../middleware/authMiddleware');
const e = require('express');

// GET /api/schedule/nextid (lấy mã tiếp theo)
router.get('/nextid', authenticateToken.authenticateToken, scheduleController.getNextScheduleId);

// GET /api/schedule/search?keyword=abc (tìm kiếm)
router.get('/search', authenticateToken.authenticateToken, scheduleController.searchSchedule);

// GET /api/schedule (lấy tất cả)
router.get('/', authenticateToken.authenticateToken, scheduleController.getAllSchedules);

// GET /api/schedule/driverId?id=TX000001 (lấy theo mã tx)
router.get('/driverId', authenticateToken.authenticateToken, scheduleController.getScheduleByDriverId)

// PUT /api/schedule/update/:id (cập nhật)
router.put('/update/:id', authenticateToken.authenticateToken, scheduleController.updateSchedule);

// PUT /api/schedule/delete/:id (xóa)
router.put('/delete/:id', authenticateToken.authenticateToken, scheduleController.deleteSchedule);

// GET /api/schedule/:id (lấy theo id)
router.get('/:id', authenticateToken.authenticateToken, scheduleController.getScheduleById);

// POST /api/schedule (thêm mới)
router.post('/', authenticateToken.authenticateToken, scheduleController.addSchedule);

exports = module.exports = router;