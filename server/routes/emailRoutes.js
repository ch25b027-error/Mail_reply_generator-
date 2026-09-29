import express from 'express';
import { fetchEmails, sendEmail, getSentEmails } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, fetchEmails);
router.post('/send', protect, sendEmail);
router.get('/sent', protect, getSentEmails);

export default router;