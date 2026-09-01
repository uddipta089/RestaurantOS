const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  name: { type: String, required: true }, // e.g., 'Morning Shift', 'Night Shift'
  startTime: { type: String, required: true }, // e.g., '09:00'
  endTime: { type: String, required: true },   // e.g., '17:00'
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Shift', shiftSchema);
