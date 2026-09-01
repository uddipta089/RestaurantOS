const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true, unique: true, index: true },
  billNumber: { type: String, required: true, unique: true },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  tax: { type: Number, required: true },
  serviceCharge: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Wallet', 'Net Banking', 'Multiple'], required: true },
  invoiceUrl: { type: String, default: '' },
  isRefunded: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bill', billSchema);
