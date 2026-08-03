const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  phone: { type: String, required: true, index: true },
  role: { 
    type: String, 
    enum: ['Administrator', 'Restaurant Owner', 'Restaurant Manager', 'Cashier', 'Chef', 'Waiter', 'Inventory Manager', 'Customer'], 
    required: true 
  },
  profileImage: { type: String, default: '' },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', index: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', index: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
