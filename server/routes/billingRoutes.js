const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), billingController.createBill);
router.get('/branch/:branchId', authenticateUser, billingController.getBills);
router.get('/:id', authenticateUser, billingController.getBillById);
router.post('/split', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), billingController.splitBill);
router.post('/merge', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), billingController.mergeBills);
router.post('/coupon', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), billingController.applyCoupon);

module.exports = router;
