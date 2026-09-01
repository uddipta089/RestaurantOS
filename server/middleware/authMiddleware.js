const { verifyToken } = require('../utils/jwtUtils');

const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Authentication required' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access forbidden: insufficient permissions' });
    }
    next();
  };
};

const authorizeBranch = (req, res, next) => {
  const branchId = req.params.branchId || req.body.branchId;
  
  // Admin and Restaurant Owner can bypass branch check if they have access to the restaurant
  if (['Administrator', 'Restaurant Owner'].includes(req.user.role)) {
    return next();
  }

  if (req.user.branchId !== branchId) {
    return res.status(403).json({ success: false, message: 'Access forbidden: branch mismatch' });
  }
  next();
};

const authorizeRestaurant = (req, res, next) => {
  const restaurantId = req.params.restaurantId || req.body.restaurantId;
  
  if (req.user.role === 'Administrator') {
    return next();
  }

  if (req.user.restaurantId !== restaurantId) {
    return res.status(403).json({ success: false, message: 'Access forbidden: restaurant mismatch' });
  }
  next();
};

module.exports = {
  authenticateUser,
  authorizeRoles,
  authorizeBranch,
  authorizeRestaurant
};
