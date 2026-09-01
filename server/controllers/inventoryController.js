const Inventory = require('../models/Inventory');

const createInventoryItem = async (req, res, next) => {
  try {
    const item = new Inventory(req.body);
    await item.save();
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

const getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find({ branchId: req.params.branchId || req.body.branchId }).populate('supplierId');
    res.status(200).json({ success: true, data: inventory });
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
