const MenuItem = require('../models/MenuItem');

const createMenuItem = async (req, res, next) => {
  try {
    const menuItem = new MenuItem(req.body);
    await menuItem.save();
    res.status(201).json({ success: true, data: menuItem });
  } catch (error) {
    next(error);
  }
};

const getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await MenuItem.find({ isDeleted: false, status: { $ne: 'Hidden' } }).populate('categoryId');
    res.status(200).json({ success: true, data: menuItems });
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
