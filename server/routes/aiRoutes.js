import express from 'express';
import { generateReply } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/reply', protect, generateReply);

export default router;
