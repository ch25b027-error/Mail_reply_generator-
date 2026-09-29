import express from 'express';
import { googleLogin, googleCallback, getMe, logout } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();
router.get('/google', googleLogin);
router.get('/google/callback', googleCallback);
router.get('/me', protect, getMe);
router.post('/logout', logout);
export default router;
