const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
  branchName: { type: String, required: true },
  managerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  branchCode: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  openingTime: { type: String, required: true },
  closingTime: { type: String, required: true },
  status: { type: String, enum: ['Open', 'Closed', 'Maintenance', 'Holiday'], default: 'Open' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Branch', branchSchema);
