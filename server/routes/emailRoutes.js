import express from 'express';
import { fetchEmails } from '../controllers/emailController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/', protect, fetchEmails);
export default router;
