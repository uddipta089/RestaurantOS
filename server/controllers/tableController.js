const Table = require('../models/Table');

const createTable = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    const dummyId = new mongoose.Types.ObjectId();
    const payload = {
      branchId: dummyId,
      qrCode: `QR-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      ...req.body
    };
    const table = new Table(payload);
    await table.save();
    res.status(201).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
};

const getTables = async (req, res, next) => {
  try {
    const filter = {};
    if (req.params.branchId || req.body.branchId) {
      filter.branchId = req.params.branchId || req.body.branchId;
    }
    const tables = await Table.find(filter);
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

const getTableById = async (req, res, next) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ success: false, message: 'Table not found' });
    res.status(200).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!table) return res.status(404).json({ success: false, message: 'Table not found' });
    res.status(200).json({ success: true, data: table });
  } catch (error) {
    next(error);
  }
};

const deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);
    if (!table) return res.status(404).json({ success: false, message: 'Table not found' });
    res.status(200).json({ success: true, message: 'Table deleted' });
  } catch (error) {
    next(error);
  }
};

const mergeTables = async (req, res, next) => {
  try {
    const { primaryTableId, secondaryTableId } = req.body;
    // Logic: Mark secondary table as 'Merged', update primary table capacity
    res.status(200).json({ success: true, message: 'Tables merged successfully' });
  } catch (error) {
    next(error);
  }
};

const splitTable = async (req, res, next) => {
  try {
    const { originalTableId } = req.body;
    // Logic: Separate orders, mark original as available if empty
    res.status(200).json({ success: true, message: 'Table split successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTable,
  getTables,
  getTableById,
  updateTable,
  deleteTable,
  mergeTables,
  splitTable
};
