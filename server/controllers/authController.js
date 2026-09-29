import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import oauth2Client from '../utils/googleClient.js';
export const googleLogin = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/gmail.readonly', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/gmail.modify'],
    prompt: 'consent'
  });
  res.redirect(url);
};
export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) return res.status(400).send('No code');
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const userInfo = await oauth2.userinfo.get();
    const { id, email, name, picture } = userInfo.data;
    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = await User.create({ googleId: id, email, name, picture, accessToken: tokens.access_token, refreshToken: tokens.refresh_token });
    } else {
      user.accessToken = tokens.access_token;
      if (tokens.refresh_token) user.refreshToken = tokens.refresh_token;
      await user.save();
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN || 'secret', { expiresIn: '7d' });
    res.cookie('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    res.redirect('http://localhost:5173/dashboard');
  } catch (error) {
    res.redirect('http://localhost:5173/?error=auth_failed');
  }
};
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-accessToken -refreshToken');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ ...user.toObject(), initials: user.name?.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() || 'M' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
};
