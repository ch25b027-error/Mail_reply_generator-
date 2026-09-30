import express from 'express';
import { generateReply, processCommand, getHistory, generateSummary } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/reply', protect, generateReply);
router.post('/command', protect, processCommand);

router.get('/history', protect, getHistory);

export default router;
router.post('/summary', protect, generateSummary);