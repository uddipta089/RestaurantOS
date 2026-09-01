const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), tableController.createTable);
router.get('/branch/:branchId', tableController.getTables); 
router.get('/:id', authenticateUser, tableController.getTableById);
router.put('/:id', authenticateUser, authorizeRoles('Restaurant Owner', 'Restaurant Manager', 'Administrator'), tableController.updateTable);
router.delete('/:id', authenticateUser, authorizeRoles('Restaurant Owner', 'Administrator'), tableController.deleteTable);
router.post('/merge', authenticateUser, authorizeRoles('Restaurant Manager', 'Waiter', 'Administrator'), tableController.mergeTables);
router.post('/split', authenticateUser, authorizeRoles('Restaurant Manager', 'Waiter', 'Administrator'), tableController.splitTable);

module.exports = router;
