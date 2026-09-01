const Shift = require('../models/Shift');

const createShift = async (req, res, next) => {
  try {
    const shift = new Shift(req.body);
    await shift.save();
    res.status(201).json({ success: true, data: shift });
  } catch (error) {
    next(error);
  }
};

const getShifts = async (req, res, next) => {
  try {
    const shifts = await Shift.find({ branchId: req.params.branchId });
    res.status(200).json({ success: true, count: shifts.length, data: shifts });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShift,
  getShifts
};
