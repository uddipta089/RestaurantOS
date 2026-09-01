const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), inventoryController.createInventoryItem);
router.get('/', inventoryController.getInventory);
router.get('/branch/:branchId', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager', 'Restaurant Owner', 'Administrator'), inventoryController.getInventory);
router.get('/:id', authenticateUser, inventoryController.getInventoryById);
router.put('/:id', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), inventoryController.updateInventoryItem);
router.delete('/:id', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), inventoryController.deleteInventoryItem);

module.exports = router;
