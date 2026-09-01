const userRepository = require('../repositories/UserRepository');
const bcrypt = require('bcrypt');
const { generateTokens } = require('../utils/jwtUtils');

class AuthService {
  async registerUser(userData) {
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    userData.password = hashedPassword;
    
    return await userRepository.create(userData);
  }

  async loginUser(email, password) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    const tokens = generateTokens(user);
    
    return {
      user: {
        userId: user._id,
        role: user.role,
        restaurantId: user.restaurantId,
        branchId: user.branchId,
        email: user.email
      },
      tokens
    };
  }

  async forgotPassword(email) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new Error('User not found');

    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const Token = require('../models/Token');
    
    await new Token({
      userId: user._id,
      token: resetToken,
      type: 'PasswordReset'
    }).save();

    // In a real app, send email via nodemailer here
    // e.g. await sendEmail(user.email, 'Password Reset', `Token: ${resetToken}`);

    return { message: 'Password reset link sent to email' };
  }

  async resetPassword(token, newPassword) {
    const Token = require('../models/Token');
    const resetTokenDoc = await Token.findOne({ token, type: 'PasswordReset' });
    
    if (!resetTokenDoc) throw new Error('Invalid or expired token');

    const user = await userRepository.findById(resetTokenDoc.userId);
    if (!user) throw new Error('User not found');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    // Bypass repository generic update to manually save user so mongoose hooks apply (if any)
    await user.save();
    await Token.findByIdAndDelete(resetTokenDoc._id);

    return { message: 'Password reset successfully' };
  }
}

module.exports = new AuthService();
