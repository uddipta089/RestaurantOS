const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  GSTNumber: { type: String, required: true },
  suppliedCategories: [{ type: String }],
  rating: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);
