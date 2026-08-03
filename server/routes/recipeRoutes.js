const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipeController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Restaurant Owner', 'Administrator'), recipeController.createRecipe);
router.get('/menu/:menuItemId', authenticateUser, recipeController.getRecipeByMenuItem);

module.exports = router;
