const jwt = require('jsonwebtoken');

const generateTokens = (user) => {
  const payload = {
    userId: user._id,
    restaurantId: user.restaurantId,
    branchId: user.branchId,
    role: user.role,
    email: user.email
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'refresh_secret', { expiresIn: '7d' });

  return { accessToken, refreshToken };
};

const verifyToken = (token, isRefresh = false) => {
  const secret = isRefresh ? (process.env.JWT_REFRESH_SECRET || 'refresh_secret') : (process.env.JWT_SECRET || 'secret');
  return jwt.verify(token, secret);
};

module.exports = {
  generateTokens,
  verifyToken
};
