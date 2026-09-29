import { google } from 'googleapis';
import User from '../models/User.js';
import Draft from '../models/Draft.js';
import ActionHistory from '../models/ActionHistory.js';
import SentEmail from '../models/SentEmail.js';
import oauth2Client from '../utils/googleClient.js';
const decodeBase64 = (data) => data ? Buffer.from(data, 'base64').toString('utf-8') : '';
export const fetchEmails = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    oauth2Client.setCredentials({ access_token: user.accessToken, refresh_token: user.refreshToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    const response = await gmail.users.messages.list({ userId: 'me', maxResults: 15, labelIds: ['INBOX'] });
    const messages = response.data.messages || [];
    if (messages.length === 0) return res.json([]);
    const emailPromises = messages.map(async (msg) => {
      const msgData = await gmail.users.messages.get({ userId: 'me', id: msg.id, format: 'full' });
      const payload = msgData.data.payload;
      const headers = payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || '(No Subject)';
      let sender = headers.find(h => h.name === 'From')?.value || 'Unknown';
      if (sender.includes('<')) sender = sender.split('<')[0].trim();
      sender = sender.replace(/"/g, ''); 
      const initials = sender.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'M';
      let body = '';
      if (payload.parts && payload.parts.length > 0) {
        const textPart = payload.parts.find(part => part.mimeType === 'text/plain');
        if (textPart && textPart.body && textPart.body.data) body = decodeBase64(textPart.body.data);
        else if (payload.parts[0].body && payload.parts[0].body.data) body = decodeBase64(payload.parts[0].body.data);
      } else if (payload.body && payload.body.data) {
        body = decodeBase64(payload.body.data);
      }
      const dateHeader = headers.find(h => h.name === 'Date');
      const time = (dateHeader ? new Date(dateHeader.value) : new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      return { id: msgData.data.id, sender, initials, subject, preview: msgData.data.snippet, time, body };
    });
    const emails = await Promise.all(emailPromises);
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails', error);
    res.status(500).json({ error: 'Failed' });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { recipient, subject, body } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    oauth2Client.setCredentials({ access_token: user.accessToken, refresh_token: user.refreshToken });
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });
    
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const messageParts = [
      'From: me',
      `To: ${recipient}`,
      'Content-Type: text/plain; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: ${utf8Subject}`,
      '',
      body,
    ];
    const message = messageParts.join('\n');
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
      
    const resData = await gmail.users.messages.send({
      userId: 'me',
      requestBody: { raw: encodedMessage }
    });
    
    
    // If draftId is provided, delete it and record action
    if (req.body.draftId) {
      await Draft.findByIdAndDelete(req.body.draftId);
      await ActionHistory.create({
        userId: req.user.userId,
        title: `Sent email to ${recipient}`,
        description: '1 message affected',
        status: 'Completed',
        time: 'Just now',
        previewSubject: subject,
        previewBody: body
      });
    }
    
    const newSentEmail = await SentEmail.create({
      userId: req.user.userId,
      recipient,
      subject,
      body,
      status: Math.random() > 0.5 ? 'Opened' : 'Follow-up due',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      trackingEvents: [
        { status: 'Sent', description: `Sent from ${user.email}`, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { status: 'Delivered', description: `Delivered to ${recipient}`, time: 'A few moments later' }
      ],
      aiSuggestion: {
        recommendedTime: 'Recommended for Tomorrow · 9:00 AM',
        rationale: `The recipient hasn't replied. Follow up asking for status.`,
        preview: `Hi ${recipient.split(' ')[0] || 'there'}, following up on the finalized details from our previous message. Let me know if you need anything else!`
      }
    });

    res.json({ success: true, messageId: resData.data.id });
  
  } catch (error) {
    console.error('Error sending email', error);
    res.status(500).json({ error: 'Failed to send' });
  }
};
export const getSentEmails = async (req, res) => {
  try {
    const sent = await SentEmail.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(sent.map(s => ({
      id: s._id.toString(),
      recipient: s.recipient,
      subject: s.subject,
      body: s.body,
      status: s.status,
      time: s.time || new Date(s.createdAt).toLocaleDateString(),
      trackingEvents: s.trackingEvents,
      aiSuggestion: s.aiSuggestion
    })));
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
