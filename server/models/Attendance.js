const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  shiftId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shift' },
  date: { type: Date, required: true },
  clockInTime: { type: Date },
  clockOutTime: { type: Date },
  status: { type: String, enum: ['Present', 'Absent', 'Late', 'Half-Day'], default: 'Present' }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
