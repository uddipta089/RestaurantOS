const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true, index: true },
  itemName: { type: String, required: true, index: true },
  category: { type: String, required: true },
  unit: { type: String, enum: ['Kg', 'Gram', 'Litre', 'Millilitre', 'Piece', 'Packet', 'Bottle', 'Box'], required: true },
  currentStock: { type: Number, required: true },
  minimumStock: { type: Number, required: true },
  maximumStock: { type: Number, required: true },
  reorderLevel: { type: Number, required: true },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', index: true },
  costPerUnit: { type: Number, required: true },
  expiryDate: { type: Date },
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock', 'Expired'], default: 'In Stock' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Inventory', inventorySchema);
