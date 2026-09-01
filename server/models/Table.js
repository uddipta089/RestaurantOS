const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true, index: true },
  tableNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  tableType: { type: String, enum: ['Indoor', 'Outdoor', 'VIP', 'Private Dining', 'Bar'], default: 'Indoor' },
  status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'Cleaning', 'Out of Service'], default: 'Available' },
  qrCode: { type: String, required: true, unique: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Table', tableSchema);
