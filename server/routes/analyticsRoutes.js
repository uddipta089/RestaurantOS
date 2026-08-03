const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/dashboard', authenticateUser, authorizeRoles('Restaurant Owner', 'Restaurant Manager', 'Administrator'), analyticsController.getDashboardMetrics);
router.get('/sales', authenticateUser, authorizeRoles('Restaurant Owner', 'Restaurant Manager', 'Administrator'), analyticsController.getSalesChartData);
router.get('/export/csv', authenticateUser, authorizeRoles('Restaurant Owner', 'Administrator'), analyticsController.exportDashboardCSV);
router.get('/export/pdf', authenticateUser, authorizeRoles('Restaurant Owner', 'Administrator'), analyticsController.exportDashboardPDF);
router.get('/export/excel', authenticateUser, authorizeRoles('Restaurant Owner', 'Administrator'), analyticsController.exportDashboardExcel);
router.get('/customers/segmentation', authenticateUser, authorizeRoles('Restaurant Owner', 'Restaurant Manager', 'Administrator'), analyticsController.getCustomerSegmentation);

module.exports = router;
