const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Cashier', 'Waiter', 'Restaurant Manager'), orderController.createOrder);
router.get('/', authenticateUser, orderController.getOrders);
router.get('/:id', authenticateUser, orderController.getOrderById);
router.put('/:id', authenticateUser, authorizeRoles('Cashier', 'Waiter', 'Restaurant Manager'), orderController.updateOrder);
router.delete('/:id', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager'), orderController.deleteOrder);

module.exports = router;
