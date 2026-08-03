const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true, index: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', index: true },
  waiterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'OrderItem' }], // References to OrderItem collection
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, required: true },
  serviceCharge: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Wallet', 'Net Banking', 'Multiple'], default: 'Cash' },
  paymentStatus: { type: String, enum: ['Pending', 'Paid', 'Partially Paid', 'Refunded'], default: 'Pending' },
  orderStatus: { type: String, enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Served', 'Completed', 'Cancelled'], default: 'Pending', index: true },
  orderType: { type: String, enum: ['Dine-In', 'Takeaway', 'Delivery', 'QR Order'], default: 'Dine-In' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
