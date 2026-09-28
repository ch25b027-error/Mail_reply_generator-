import { google } from 'googleapis';
import User from '../models/User.js';
import oauth2Client from '../utils/googleClient.js';

// Helper to decode base64 strings from Gmail API
const decodeBase64 = (data) => {
  if (!data) return '';
  return Buffer.from(data, 'base64').toString('utf-8');
};

export const fetchEmails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Set credentials for the user
    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    // Fetch recent messages
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 15,
      labelIds: ['INBOX']
    });

    const messages = response.data.messages || [];
    
    if (messages.length === 0) {
      return res.json([]);
    }

    // Fetch full details for each message
    const emailPromises = messages.map(async (msg) => {
      const msgData = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
        format: 'full'
      });
      
      const payload = msgData.data.payload;
      const headers = payload.headers;
      
      const subjectHeader = headers.find(h => h.name === 'Subject');
      const fromHeader = headers.find(h => h.name === 'From');
      const dateHeader = headers.find(h => h.name === 'Date');
      
      const subject = subjectHeader ? subjectHeader.value : '(No Subject)';
      let sender = fromHeader ? fromHeader.value : 'Unknown';
      
      // Clean up sender (e.g. "Maya Chen <maya@example.com>" -> "Maya Chen")
      if (sender.includes('<')) {
        sender = sender.split('<')[0].trim();
      }
      sender = sender.replace(/"/g, ''); // Remove quotes if present
      
      const initials = sender.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'M';
      
      // Extract body
      let body = '';
      if (payload.parts && payload.parts.length > 0) {
        // Try to find plain text part
        const textPart = payload.parts.find(part => part.mimeType === 'text/plain');
        if (textPart && textPart.body && textPart.body.data) {
          body = decodeBase64(textPart.body.data);
        } else if (payload.parts[0].body && payload.parts[0].body.data) {
          body = decodeBase64(payload.parts[0].body.data);
        }
      } else if (payload.body && payload.body.data) {
        body = decodeBase64(payload.body.data);
      }
      
      // Format time
      const date = dateHeader ? new Date(dateHeader.value) : new Date();
      const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return {
        id: msgData.data.id,
        sender,
        initials,
        subject,
        preview: msgData.data.snippet,
        time,
        body
      };
    });

    const emails = await Promise.all(emailPromises);
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
};
