const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  action: { type: String, required: true },
  module: { type: String, required: true }, // e.g., 'Auth', 'Orders', 'Inventory'
  description: { type: String, required: true },
  ipAddress: { type: String, default: '' }
}, {
  timestamps: true
}); // Timestamp provides the 'timestamp' field

module.exports = mongoose.model('AuditLog', auditLogSchema);
