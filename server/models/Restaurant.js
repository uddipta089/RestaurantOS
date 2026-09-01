const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  restaurantName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  GSTNumber: { type: String, required: true },
  logo: { type: String, default: '' },
  description: { type: String, default: '' },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  subscriptionPlan: { type: String, enum: ['Basic', 'Premium', 'Enterprise'], default: 'Basic' },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
