const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', index: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  itemName: { type: String, required: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  foodType: { type: String, enum: ['Veg', 'Non-Veg', 'Egg', 'Vegan', 'Jain'], required: true },
  image: { type: String, default: '' },
  preparationTime: { type: Number, required: true }, // in minutes
  calories: { type: Number, default: 0 },
  status: { type: String, enum: ['Available', 'Unavailable', 'Out of Stock', 'Hidden'], default: 'Available' },
  tags: [{ type: String }],
  isDeleted: { type: Boolean, default: false }, // For soft delete
  
  // Advanced Menu Fields
  variants: [{
    name: String, // e.g., 'Small', 'Medium', 'Large'
    price: Number // Override price
  }],
  addons: [{
    name: String, // e.g., 'Extra Cheese'
    price: Number
  }],
  isCombo: { type: Boolean, default: false },
  comboItems: [{
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
    quantity: Number
  }],
  dietaryInfo: [{
    type: String,
    enum: ['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Nut-Free', 'Dairy-Free']
  }],
  availabilitySchedule: {
    days: [{ type: String, enum: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] }],
    startTime: String, // e.g., 09:00
    endTime: String // e.g., 12:00 (for breakfast items)
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
