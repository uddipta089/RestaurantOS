const Reservation = require('../models/Reservation');

const createReservation = async (req, res, next) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find({ branchId: req.params.branchId || req.body.branchId }).populate('customerId tableId');
    res.status(200).json({ success: true, data: reservations });
  } catch (error) {
    next(error);
  }
};

const getReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate('customerId tableId');
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    res.status(200).json({ success: true, data: reservation });
  } catch (error) {
    next(error);
  }
};

const cancelReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: 'Cancelled' }, { new: true });
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    res.status(200).json({ success: true, message: 'Reservation cancelled successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createReservation,
  getReservations,
  getReservationById,
  updateReservation,
  cancelReservation
};
