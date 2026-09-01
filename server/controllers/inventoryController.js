const Inventory = require('../models/Inventory');

const createInventoryItem = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    const dummyId = new mongoose.Types.ObjectId();
    const payload = {
      branchId: dummyId,
      category: 'General',
      minimumStock: 5,
      maximumStock: 100,
      reorderLevel: 10,
      costPerUnit: 0,
      ...req.body
    };
    const inventoryItem = new Inventory(payload);
    await inventoryItem.save();
    res.status(201).json({ success: true, data: inventoryItem });
  } catch (error) {
    next(error);
  }
};

const getInventory = async (req, res, next) => {
  try {
    const filter = {};
    if (req.params.branchId || req.body.branchId) {
      filter.branchId = req.params.branchId || req.body.branchId;
    }
    const inventory = await Inventory.find(filter).lean();
    const mapped = inventory.map(item => ({
      ...item,
      ingredient: item.itemName,
      qty: item.currentStock
    }));
    res.status(200).json({ success: true, data: mapped });
  } catch (error) {
    next(error);
  }
};

const getInventoryById = async (req, res, next) => {
  try {
    const item = await Inventory.findById(req.params.id).populate('supplierId');
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const updateInventoryItem = async (req, res, next) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const deleteInventoryItem = async (req, res, next) => {
  try {
    const item = await Inventory.findByIdAndUpdate(req.params.id, { status: 'Expired' }, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Item marked as expired/deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInventoryItem,
  getInventory,
  getInventoryById,
  updateInventoryItem,
  deleteInventoryItem
};
