const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/email');

class AuthController {
  // Register new user
  async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { firstName, lastName, email, password, university, studentId } = req.body;

      // Check if user exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }

      // Generate verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

      // Create user
      const user = new User({
        firstName,
        lastName,
        email,
        password,
        university,
        studentId,
        verificationCode,
        isVerified: false
      });

      await user.save();

      // Send verification email
      try {
        await sendVerificationEmail(email, verificationCode, 'verification');
      } catch (emailError) {
        console.error('Email sending failed:', emailError);
        // Continue with registration even if email fails
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'User registered successfully. Please check your email for verification code.',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          university: user.university,
          isVerified: user.isVerified,
          avatar: user.avatar,
          rating: user.rating,
          totalSwaps: user.totalSwaps,
          campusPoints: user.campusPoints
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          university: user.university,
          isVerified: user.isVerified,
          avatar: user.avatar,
          rating: user.rating,
          totalSwaps: user.totalSwaps,
          campusPoints: user.campusPoints
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error during login', error: error.message });
    }
  }

  // Verify email
  async verifyEmail(req, res) {
    try {
      const { email, code } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (user.verificationCode !== code) {
        return res.status(400).json({ message: 'Invalid verification code' });
      }

      // Update user verification status
      user.isVerified = true;
      user.verificationCode = undefined;
      user.campusPoints += 50; // Welcome bonus
      await user.save();

      // Generate new token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Email verified successfully',
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          university: user.university,
          isVerified: user.isVerified,
          avatar: user.avatar,
          rating: user.rating,
          totalSwaps: user.totalSwaps,
          campusPoints: user.campusPoints
        }
      });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ message: 'Server error during verification', error: error.message });
    }
  }

  // Resend verification code
  async resendVerification(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (user.isVerified) {
        return res.status(400).json({ message: 'Email already verified' });
      }

      // Generate new verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationCode = verificationCode;
      await user.save();

      // Send verification email
      await sendVerificationEmail(email, verificationCode, 'verification');

      res.json({ message: 'Verification code sent successfully' });
    } catch (error) {
      console.error('Resend verification error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Forgot password
  async forgotPassword(req, res) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found with this email' });
      }

      // Generate reset code
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
      user.verificationCode = resetCode;
      await user.save();

      // Send reset email
      await sendVerificationEmail(email, resetCode, 'reset');

      res.json({ message: 'Password reset code sent to your email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Reset password
  async resetPassword(req, res) {
    try {
      const { email, code, newPassword } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      if (user.verificationCode !== code) {
        return res.status(400).json({ message: 'Invalid reset code' });
      }

      // Update password
      user.password = newPassword;
      user.verificationCode = undefined;
      await user.save();

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Reset password error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Change password (authenticated)
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user._id;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verify current password
      const isMatch = await user.comparePassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Update password
      user.password = newPassword;
      await user.save();

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Refresh token
  async refreshToken(req, res) {
    try {
      const userId = req.user._id;
      
      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Generate new token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          university: user.university,
          isVerified: user.isVerified,
          avatar: user.avatar,
          rating: user.rating,
          totalSwaps: user.totalSwaps,
          campusPoints: user.campusPoints
        }
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Demo login
  async demoLogin(req, res) {
    try {
      let demoUser = await User.findOne({ email: 'demo@swapam.com' });
      
      if (!demoUser) {
        // Create demo user if doesn't exist
        demoUser = new User({
          firstName: 'Demo',
          lastName: 'User',
          email: 'demo@swapam.com',
          password: 'demo123456',
          university: 'Demo University',
          studentId: 'DEMO001',
          isVerified: true,
          rating: 4.5,
          totalSwaps: 15,
          campusPoints: 250,
          avatar: ''
        });
        await demoUser.save();
      }

      const token = jwt.sign(
        { userId: demoUser._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Demo login successful',
        token,
        user: {
          id: demoUser._id,
          firstName: demoUser.firstName,
          lastName: demoUser.lastName,
          email: demoUser.email,
          university: demoUser.university,
          isVerified: demoUser.isVerified,
          avatar: demoUser.avatar,
          rating: demoUser.rating,
          totalSwaps: demoUser.totalSwaps,
          campusPoints: demoUser.campusPoints
        }
      });
    } catch (error) {
      console.error('Demo login error:', error);
      res.status(500).json({ message: 'Demo login failed', error: error.message });
    }
  }
}

module.exports = new AuthController();