const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), supplierController.createSupplier);
router.get('/', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager', 'Restaurant Owner', 'Administrator'), supplierController.getSuppliers);
router.get('/:id', authenticateUser, supplierController.getSupplierById);
router.put('/:id', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), supplierController.updateSupplier);
router.delete('/:id', authenticateUser, authorizeRoles('Inventory Manager', 'Restaurant Manager'), supplierController.deleteSupplier);

module.exports = router;
