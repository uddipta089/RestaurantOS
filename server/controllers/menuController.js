const MenuItem = require('../models/MenuItem');

const createMenuItem = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    const dummyId = new mongoose.Types.ObjectId();
    const payload = {
      restaurantId: dummyId,
      categoryId: dummyId,
      itemName: req.body.name || req.body.itemName || 'New Item',
      price: req.body.price || 0,
      costPrice: (req.body.price || 0) * 0.5,
      foodType: 'Veg',
      preparationTime: 15,
      ...req.body
    };
    const menuItem = new MenuItem(payload);
    await menuItem.save();
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

const getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find({ isDeleted: false, status: { $ne: 'Hidden' } }).lean();
    const mapped = menuItems.map(item => ({
      ...item,
      name: item.itemName,
      category: 'Mains',
      isAvailable: item.status === 'Available'
    }));
    res.status(200).json({ success: true, data: mapped });
  } catch (error) {
    next(error);
  }
};

const getMenuItemById = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id).populate('categoryId');
    if (!menuItem) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!menuItem) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.status(200).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    // Soft delete
    const menuItem = await MenuItem.findByIdAndUpdate(req.params.id, { isDeleted: true }, { new: true });
    if (!menuItem) return res.status(404).json({ success: false, message: 'Menu item not found' });
    res.status(200).json({ success: true, message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMenuItem,
  getMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem
};
