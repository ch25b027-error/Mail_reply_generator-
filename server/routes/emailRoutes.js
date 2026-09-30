import express from 'express';
import { fetchEmails, sendEmail, fetchSentEmails, markAsRead, bulkDelete, deleteEmail } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, fetchEmails);
router.post('/send', protect, sendEmail);
router.get('/sent', protect, fetchSentEmails);

export default router;
router.post('/mark-read', protect, markAsRead);
router.delete('/bulk-delete', protect, bulkDelete);
router.delete('/:id', protect, deleteEmail);