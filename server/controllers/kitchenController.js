const OrderItem = require('../models/OrderItem');
const Order = require('../models/Order');

const getKitchenOrders = async (req, res, next) => {
  try {
    const { status } = req.query; // e.g., 'Pending', 'Preparing', 'Ready'
    const filter = { itemStatus: { $in: ['Pending', 'Preparing', 'Ready'] } };
    if (status) filter.itemStatus = status;

    const items = await OrderItem.find(filter).populate({
      path: 'orderId',
      select: 'orderNumber tableId orderType orderStatus'
    });
    
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

const updateItemStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Accepted', 'Preparing', 'Ready', 'Served'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status update' });
    }

    const item = await OrderItem.findByIdAndUpdate(id, { itemStatus: status }, { new: true });
    if (!item) return res.status(404).json({ success: false, message: 'Order item not found' });
    
    // In a full implementation, if all items in an Order are 'Ready', update the main Order status
    // socket.io events will also be emitted here.

    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getKitchenOrders,
  updateItemStatus
};
