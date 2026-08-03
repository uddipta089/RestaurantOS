const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { authenticateUser, authorizeRoles, authorizeRestaurant } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner'), branchController.createBranch);
router.get('/', authenticateUser, branchController.getBranches);
router.get('/:id', authenticateUser, branchController.getBranchById);
router.put('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner'), branchController.updateBranch);
router.delete('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner'), branchController.deleteBranch);

module.exports = router;
