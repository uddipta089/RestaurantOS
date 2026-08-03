const express = require('express');
const router = express.Router();
const grnController = require('../controllers/grnController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Restaurant Manager', 'Administrator'), grnController.createGRN);
router.get('/branch/:branchId', authenticateUser, authorizeRoles('Restaurant Manager', 'Administrator'), grnController.getGRNs);

module.exports = router;
