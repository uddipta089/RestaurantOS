const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');
const auditLogger = require('../middleware/auditMiddleware');

router.post('/generate/table/:tableId', authenticateUser, authorizeRoles('Administrator', 'Restaurant Manager'), auditLogger('Table QR'), qrController.generateTableQR);

module.exports = router;
