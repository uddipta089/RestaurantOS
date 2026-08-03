const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), categoryController.createCategory);
router.get('/', categoryController.getCategories); // Public or semi-public
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), categoryController.updateCategory);
router.delete('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), categoryController.deleteCategory);

module.exports = router;
