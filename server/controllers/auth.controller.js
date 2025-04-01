import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../utils/emailService.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const saltRounds = 10;

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check existing user
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).json({success:false, message: 'Email already exists' });
    }

  // Check ubique username
  const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({success:false, message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Send registration success email
    const emailHtml = `
      <h1>Registration Successful</h1>
      <p>Welcome to YouTube Clone, ${username}!</p>
      <p>Your account has been successfully created with email: ${email}</p>
      <p>You can now login using your credentials.</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Registration Successful',
      html: emailHtml
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Welcome email sent.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({success:false ,message: 'Server error during registration' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({success:false, message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({success:false, message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
      secure: process.env.NODE_ENV === 'production'
    });

    // Remove password from response
    const { password: _, ...userData } = user._doc;

    res.status(200).json({
      success:true,
      message: 'Login successful',
      user: userData,
   
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({success:false, message: 'Server error during login' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ message: 'Please login' });
    }
    
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error during logout' });
  }
};

export const sendPasswordResetOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

    // Save OTP to user document
    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    // Send OTP email
    const emailHtml = `
      <h1>Password Reset Request</h1>
      <p>Your OTP for password reset is: <strong>${otp}</strong></p>
      <p>This OTP is valid for 10 minutes.</p>
    `;

    await sendEmail({
      to: email,
      subject: 'Password Reset OTP',
      html: emailHtml
    });

    res.status(200).json({ 
      message: 'OTP sent successfully',
      email: email // Optional: confirm email received
    });
    
  } catch (error) {
    console.error('OTP sending error:', error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

export const verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify OTP
    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check OTP expiration
    if (Date.now() > user.otpExpiration) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    
    // Update password and clear OTP fields
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiration = undefined;
    
    await user.save();

    res.status(200).json({
      message: 'Password reset successfully. Please login with your new password.'
    });

  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};

