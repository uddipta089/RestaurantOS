const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

const createOrder = async (req, res, next) => {
  try {
    const mongoose = require('mongoose');
    const dummyId = new mongoose.Types.ObjectId();
    const { branchId, tableId, items, totalAmount, ...orderData } = req.body;
    
    // First, save all order items
    const savedItems = await Promise.all((items || []).map(async (item) => {
      const orderItem = new OrderItem({ ...item, orderId: null });
      return orderItem;
    }));

    const newOrder = new Order({
      ...orderData,
      branchId: branchId || dummyId,
      tableId,
      orderNumber: `ORD-${Date.now()}`,
      subtotal: totalAmount || 0,
      tax: (totalAmount || 0) * 0.1,
      grandTotal: (totalAmount || 0) * 1.1,
      items: []
    });
    
    const savedOrder = await newOrder.save();
    
    // Link items to order and save
    const itemIds = [];
    for (let item of savedItems) {
      item.orderId = savedOrder._id;
      await item.save();
      itemIds.push(item._id);
    }
    
    savedOrder.items = itemIds;
    await savedOrder.save();

    res.status(201).json({ success: true, data: savedOrder });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.branchId) filter.branchId = req.query.branchId;
    if (req.query.status) filter.orderStatus = req.query.status;

    const orders = await Order.find(filter).populate('items');
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('items tableId waiterId');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: 'Cancelled' }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, message: 'Order cancelled' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};
