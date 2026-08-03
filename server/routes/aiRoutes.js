const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/menu-recommendations', authenticateUser, aiController.getMenuRecommendations);
router.get('/sales-forecast', authenticateUser, authorizeRoles('Restaurant Owner', 'Administrator'), aiController.getSalesForecast);
router.get('/inventory-recommendations', authenticateUser, authorizeRoles('Restaurant Owner', 'Restaurant Manager', 'Administrator'), aiController.getInventoryRecommendations);
router.get('/peak-hour-prediction', authenticateUser, aiController.getPeakHourPrediction);
router.post('/voice-order', authenticateUser, aiController.processVoiceOrder);

module.exports = router;
