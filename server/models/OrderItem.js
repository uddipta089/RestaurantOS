const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, index: true },
  menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  specialInstructions: { type: String, default: '' },
  itemStatus: { type: String, enum: ['Pending', 'Accepted', 'Preparing', 'Ready', 'Served', 'Cancelled'], default: 'Pending' }
}, {
  timestamps: true
});

module.exports = mongoose.model('OrderItem', orderItemSchema);
