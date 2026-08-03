const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), menuController.createMenuItem);
router.get('/', menuController.getMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.put('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), menuController.updateMenuItem);
router.delete('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), menuController.deleteMenuItem);

module.exports = router;
