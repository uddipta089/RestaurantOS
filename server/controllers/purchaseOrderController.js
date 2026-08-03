const PurchaseOrder = require('../models/PurchaseOrder');

const createPurchaseOrder = async (req, res, next) => {
  try {
    const poNumber = `PO-${Date.now()}`;
    const po = new PurchaseOrder({ ...req.body, poNumber });
    await po.save();
    res.status(201).json({ success: true, data: po });
  } catch (error) {
    next(error);
  }
};

const getPurchaseOrders = async (req, res, next) => {
  try {
    const pos = await PurchaseOrder.find({ branchId: req.params.branchId || req.body.branchId }).populate('supplierId');
    res.status(200).json({ success: true, data: pos });
  } catch (error) {
    next(error);
  }
};

const getPurchaseOrderById = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id).populate('supplierId');
    if (!po) return res.status(404).json({ success: false, message: 'PO not found' });
    res.status(200).json({ success: true, data: po });
  } catch (error) {
    next(error);
  }
};

const updatePurchaseOrder = async (req, res, next) => {
  try {
    const po = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!po) return res.status(404).json({ success: false, message: 'PO not found' });
    res.status(200).json({ success: true, data: po });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
  getPurchaseOrderById,
  updatePurchaseOrder
};
