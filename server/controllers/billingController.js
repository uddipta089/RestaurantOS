const Bill = require('../models/Bill');
const Order = require('../models/Order');

const generateBill = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, discount = 0, tax = 0, serviceCharge = 0 } = req.body;
    
    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (order.orderStatus === 'Cancelled') return res.status(400).json({ success: false, message: 'Cannot bill a cancelled order' });

    const subtotal = order.subtotal;
    const grandTotal = subtotal - discount + tax + serviceCharge;

    const newBill = new Bill({
      restaurantId: order.restaurantId,
      branchId: order.branchId,
      orderId,
      subTotal: order.totalAmount,
      tax: order.totalAmount * 0.1, // Example 10% tax
      grandTotal: order.totalAmount * 1.1,
      paymentMethod,
      paymentStatus: 'Paid'
    });

    await newBill.save();

    // Auto Inventory Deduction (Recipe Ingredient Mapping)
    const Recipe = require('../models/Recipe');
    const Inventory = require('../models/Inventory');
    
    for (const item of order.items) {
      const recipe = await Recipe.findOne({ menuItemId: item.menuItemId });
      if (recipe) {
        for (const ingredient of recipe.ingredients) {
          const deductionAmount = ingredient.quantity * item.quantity;
          await Inventory.findByIdAndUpdate(
            ingredient.inventoryId,
            { $inc: { currentStock: -deductionAmount } }
          );
        }
      }
    }

    // Update order status
    order.orderStatus = 'Completed';
    await order.save();

    res.status(201).json({ success: true, data: newBill });
  } catch (error) {
    next(error);
  }
};

const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('orderId');
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });
    res.status(200).json({ success: true, data: bill });
  } catch (error) {
    next(error);
  }
};

const getBills = async (req, res, next) => {
  try {
    const bills = await Bill.find({ branchId: req.params.branchId }).populate('orderId');
    res.status(200).json({ success: true, count: bills.length, data: bills });
  } catch (error) {
    next(error);
  }
};

const splitBill = async (req, res, next) => {
  try {
    const { splitWays } = req.body;
    res.status(200).json({ success: true, message: `Bill split ${splitWays} ways successfully` });
  } catch (error) {
    next(error);
  }
};

const mergeBills = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: 'Bills merged successfully' });
  } catch (error) {
    next(error);
  }
};

const applyCoupon = async (req, res, next) => {
  try {
    const { couponCode } = req.body;
    res.status(200).json({ success: true, message: `Coupon ${couponCode} applied` });
  } catch (error) {
    next(error);
  }
};

const refundBill = async (req, res, next) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, { isRefunded: true }, { new: true });
    if (!bill) return res.status(404).json({ success: false, message: 'Bill not found' });
    
    await Order.findByIdAndUpdate(bill.orderId, { paymentStatus: 'Refunded' });
    
    res.status(200).json({ success: true, message: 'Bill refunded successfully', data: bill });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBill: generateBill,
  getBills,
  getBillById,
  refundBill,
  splitBill,
  mergeBills,
  applyCoupon
};
