const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true, index: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true, index: true },
  tableId: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', required: true },
  reservationDate: { type: Date, required: true, index: true },
  reservationTime: { type: String, required: true },
  guestCount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Checked In', 'Completed', 'Cancelled', 'No Show'], default: 'Pending' },
  specialRequests: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reservation', reservationSchema);
