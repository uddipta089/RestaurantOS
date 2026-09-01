const mongoose = require('mongoose');

const grnSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  purchaseOrderId: { type: mongoose.Schema.Types.ObjectId, ref: 'PurchaseOrder' },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true },
  itemsReceived: [{
    inventoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory' },
    quantityReceived: { type: Number, required: true },
    unitPrice: { type: Number },
    expiryDate: { type: Date }
  }],
  receivedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'Completed', 'Disputed'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('GRN', grnSchema);
