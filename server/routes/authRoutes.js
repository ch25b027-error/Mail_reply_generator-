import express from 'express';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const client = new OAuth2Client(process.env.CLIENT_ID, process.env.CLIENT_SECRET, 'postmessage');

router.post('/google', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    // Exchange authorization code for tokens
    const { tokens } = await client.getToken(code);
    client.setCredentials(tokens);

    // Get user info
    const oauth2 = google.oauth2({ version: 'v2', auth: client });
    const userInfo = await oauth2.userinfo.get();
    
    // In a real app, you would find or create the user in MongoDB here
    
    const user = {
      email: userInfo.data.email,
      name: userInfo.data.name,
      picture: userInfo.data.picture,
      initials: userInfo.data.name?.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'AM'
    };

    const jwtToken = jwt.sign(
      { email: user.email, name: user.name },
      process.env.JWT_TOKEN || 'secret',
      { expiresIn: '7d' }
    );

    res.json({ token: jwtToken, user });
  } catch (error) {
    console.error('Error during Google Auth:', error);
    res.status(500).json({ error: 'Failed to authenticate with Google' });
  }
});

export default router;
