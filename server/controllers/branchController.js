const Branch = require('../models/Branch');

const createBranch = async (req, res, next) => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    res.status(201).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

const getBranches = async (req, res, next) => {
  try {
    const branches = await Branch.find({ status: { $ne: 'Closed' } });
    res.status(200).json({ success: true, data: branches });
  } catch (error) {
    next(error);
  }
};

const getBranchById = async (req, res, next) => {
  try {
    const branch = await Branch.findById(req.params.id);
    if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

const updateBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
    res.status(200).json({ success: true, data: branch });
  } catch (error) {
    next(error);
  }
};

const deleteBranch = async (req, res, next) => {
  try {
    const branch = await Branch.findByIdAndUpdate(req.params.id, { status: 'Closed' }, { new: true });
    if (!branch) return res.status(404).json({ success: false, message: 'Branch not found' });
    res.status(200).json({ success: true, message: 'Branch deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBranch,
  getBranches,
  getBranchById,
  updateBranch,
  deleteBranch
};
