const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true, index: true },
  employeeCode: { type: String, required: true, unique: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true },
  joiningDate: { type: Date, required: true },
  shift: { type: String, enum: ['Morning Shift', 'Afternoon Shift', 'Evening Shift', 'Night Shift', 'Custom Shift'], required: true },
  status: { type: String, enum: ['Active', 'Inactive', 'On Leave'], default: 'Active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
