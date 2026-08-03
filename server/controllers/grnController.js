const GRN = require('../models/GRN');
const Inventory = require('../models/Inventory');

const createGRN = async (req, res, next) => {
  try {
    const grn = new GRN({
      ...req.body,
      receivedBy: req.user.userId
    });
    
    // Automatically increment inventory if status is completed
    if (grn.status === 'Completed') {
      for (const item of grn.itemsReceived) {
        await Inventory.findByIdAndUpdate(item.inventoryId, {
          $inc: { currentStock: item.quantityReceived }
        });
      }
    }
    
    await grn.save();
    res.status(201).json({ success: true, data: grn });
  } catch (error) {
    next(error);
  }
};

const getGRNs = async (req, res, next) => {
  try {
    const grns = await GRN.find({ branchId: req.params.branchId }).populate('supplierId').populate('itemsReceived.inventoryId');
    res.status(200).json({ success: true, count: grns.length, data: grns });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createGRN,
  getGRNs
};
