const express = require('express');
const router = express.Router();
const shiftController = require('../controllers/shiftController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Restaurant Manager', 'Administrator'), shiftController.createShift);
router.get('/branch/:branchId', authenticateUser, shiftController.getShifts);

module.exports = router;
