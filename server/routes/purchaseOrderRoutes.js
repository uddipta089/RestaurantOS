const express = require('express');
const router = express.Router();
const purchaseOrderController = require('../controllers/purchaseOrderController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), purchaseOrderController.createPurchaseOrder);
router.get('/branch/:branchId', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager', 'Restaurant Owner', 'Administrator'), purchaseOrderController.getPurchaseOrders);
router.get('/:id', authenticateUser, purchaseOrderController.getPurchaseOrderById);
router.put('/:id', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), purchaseOrderController.updatePurchaseOrder);

module.exports = router;
