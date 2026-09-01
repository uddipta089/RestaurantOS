const express = require('express');
const router = express.Router();
const kitchenController = require('../controllers/kitchenController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.get('/orders', authenticateUser, authorizeRoles('Chef', 'Restaurant Manager'), kitchenController.getKitchenOrders);
router.put('/orders/:id/status', authenticateUser, authorizeRoles('Chef', 'Restaurant Manager'), kitchenController.updateItemStatus);

module.exports = router;
