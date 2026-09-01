const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, required: true, index: true },
  email: { type: String, index: true },
  address: { type: String, default: '' },
  loyaltyPoints: { type: Number, default: 0 },
  favoriteItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
  totalOrders: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false } // Soft delete
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);
