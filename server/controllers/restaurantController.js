const restaurantService = require('../services/RestaurantService');

const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body);
    res.status(201).json({ success: true, data: restaurant });
  } catch (error) {
    next(error);
  }
};

const getRestaurants = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.getRestaurants(req.query);
    res.status(200).json({ success: true, count: restaurants.length, data: restaurants });
  } catch (error) {
    next(error);
  }
};

const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.updateRestaurant(req.params.id, req.body);
    res.status(200).json({ success: true, data: restaurant });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    await restaurantService.deleteRestaurant(req.params.id);
    res.status(200).json({ success: true, message: 'Restaurant deleted' });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
};
