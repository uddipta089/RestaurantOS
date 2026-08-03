const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), customerController.createCustomer);
router.get('/', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), customerController.getCustomers);
router.get('/:id', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), customerController.getCustomerById);
router.put('/:id', authenticateUser, authorizeRoles('Cashier', 'Restaurant Manager', 'Administrator'), customerController.updateCustomer);
router.delete('/:id', authenticateUser, authorizeRoles('Restaurant Manager', 'Administrator'), customerController.deleteCustomer);

module.exports = router;
