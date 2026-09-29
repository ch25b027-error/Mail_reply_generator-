import express from 'express';
import { fetchEmails, sendEmail } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, fetchEmails);
router.post('/send', protect, sendEmail);

export default router;