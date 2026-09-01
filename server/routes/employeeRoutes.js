const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticateUser, authorizeRoles, authorizeBranch } = require('../middleware/authMiddleware');

// Protect all employee routes at minimum
router.use(authenticateUser);

router.post('/', authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), employeeController.createEmployee);
router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.put('/:id', authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), employeeController.updateEmployee);
router.delete('/:id', authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), employeeController.deleteEmployee);
router.put('/assign-shift/:id', authorizeRoles('Administrator', 'Restaurant Owner', 'Restaurant Manager'), employeeController.assignShift);
router.put('/transfer/:id', authorizeRoles('Administrator', 'Restaurant Owner'), employeeController.transferEmployee);

module.exports = router;
