const restaurantRepository = require('../repositories/RestaurantRepository');
const APIFeatures = require('../utils/apiFeatures');
const Restaurant = require('../models/Restaurant');

class RestaurantService {
  async createRestaurant(data) {
    return await restaurantRepository.create(data);
  }

  async getRestaurants(queryString) {
    // Inject APIFeatures for filtering, sorting, pagination
    const features = new APIFeatures(Restaurant.find(), queryString)
      .filter()
      .search(['name', 'cuisineType'])
      .sort()
      .paginate();
      
    return await features.query;
  }

  async getRestaurantById(id) {
    const restaurant = await restaurantRepository.findById(id);
    if (!restaurant) throw new Error('Restaurant not found');
    return restaurant;
  }

  async updateRestaurant(id, data) {
    const restaurant = await restaurantRepository.updateById(id, data);
    if (!restaurant) throw new Error('Restaurant not found');
    return restaurant;
  }

  async deleteRestaurant(id) {
    const restaurant = await restaurantRepository.deleteById(id);
    if (!restaurant) throw new Error('Restaurant not found');
    return restaurant;
  }
}

module.exports = new RestaurantService();
