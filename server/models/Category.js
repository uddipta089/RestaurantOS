const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true, index: true },
  categoryName: { type: String, required: true },
  description: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 },
  status: { type: String, enum: ['Active', 'Inactive', 'Hidden'], default: 'Active' },
  image: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
