const Employee = require('../models/Employee');

const createEmployee = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    const dummyId = new mongoose.Types.ObjectId();
    const payload = {
      userId: dummyId,
      branchId: dummyId,
      employeeCode: `EMP-${Date.now()}`,
      designation: req.body.role || 'Staff',
      salary: 0,
      joiningDate: new Date(),
      shift: 'Morning Shift',
      ...req.body
    };
    const employee = new Employee(payload);
    await employee.save();
    res.status(201).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

const getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ status: { $ne: 'Inactive' } }).lean();
    const mapped = employees.map(emp => ({
      ...emp,
      firstName: emp.employeeCode,
      lastName: '',
      role: emp.designation,
      email: 'staff@restaurant.com'
    }));
    res.status(200).json({ success: true, data: mapped });
  } catch (error) {
    next(error);
  }
};

const getEmployeeById = async (req, res, next) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('userId');
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { status: 'Inactive' }, { new: true });
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.status(200).json({ success: true, message: 'Employee deleted' });
  } catch (error) {
    next(error);
  }
};

const assignShift = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { shift: req.body.shift }, { new: true });
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

const transferEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, { branchId: req.body.branchId }, { new: true });
    if (!employee) return res.status(404).json({ success: false, message: 'Employee not found' });
    res.status(200).json({ success: true, data: employee });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  assignShift,
  transferEmployee
};
