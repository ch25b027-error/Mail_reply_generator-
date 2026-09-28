import { google } from 'googleapis';
import dotenv from 'dotenv';
dotenv.config();
const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'http://localhost:5000/api/auth/google/callback'
);
export default oauth2Client;
