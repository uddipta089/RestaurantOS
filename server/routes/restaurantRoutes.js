const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const { authenticateUser, authorizeRoles } = require('../middleware/authMiddleware');

router.post('/', authenticateUser, authorizeRoles('Administrator'), restaurantController.createRestaurant);
router.get('/', authenticateUser, restaurantController.getRestaurants);
router.get('/:id', authenticateUser, restaurantController.getRestaurantById);
router.put('/:id', authenticateUser, authorizeRoles('Administrator', 'Restaurant Owner'), restaurantController.updateRestaurant);
router.delete('/:id', authenticateUser, authorizeRoles('Administrator'), restaurantController.deleteRestaurant);

module.exports = router;
