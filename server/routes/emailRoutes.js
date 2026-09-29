import express from 'express';
import { fetchEmails, sendEmail, fetchSentEmails } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, fetchEmails);
router.post('/send', protect, sendEmail);
router.get('/sent', protect, fetchSentEmails);

export default router;