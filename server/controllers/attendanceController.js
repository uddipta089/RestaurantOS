const Attendance = require('../models/Attendance');

const clockIn = async (req, res, next) => {
  try {
    const attendance = new Attendance({
      userId: req.user.userId, // Authenticated user
      shiftId: req.body.shiftId,
      date: new Date(),
      clockInTime: new Date(),
      status: 'Present'
    });
    await attendance.save();
    res.status(201).json({ success: true, message: 'Clocked in successfully', data: attendance });
  } catch (error) {
    next(error);
  }
};

const clockOut = async (req, res, next) => {
  try {
    const attendance = await Attendance.findOne({ userId: req.user.userId, clockOutTime: null }).sort({ createdAt: -1 });
    if (!attendance) return res.status(404).json({ success: false, message: 'No active clock-in found' });

    attendance.clockOutTime = new Date();
    await attendance.save();
    res.status(200).json({ success: true, message: 'Clocked out successfully', data: attendance });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  clockIn,
  clockOut
};
