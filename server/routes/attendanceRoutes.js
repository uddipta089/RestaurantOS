const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticateUser } = require('../middleware/authMiddleware');

router.post('/clock-in', authenticateUser, attendanceController.clockIn);
router.post('/clock-out', authenticateUser, attendanceController.clockOut);

module.exports = router;
