import express from 'express';
import { generateReply, processCommand } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/reply', protect, generateReply);
router.post('/command', protect, processCommand);

export default router;
