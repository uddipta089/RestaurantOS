const BaseRepository = require('./BaseRepository');
const Restaurant = require('../models/Restaurant');

class RestaurantRepository extends BaseRepository {
  constructor() {
    super(Restaurant);
  }
}

module.exports = new RestaurantRepository();
