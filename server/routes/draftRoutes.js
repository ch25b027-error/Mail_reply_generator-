import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Draft from '../models/Draft.js';

const router = express.Router();

const mockDrafts = [
  { recipient: 'Maya Chen', subject: 'Re: Q4 launch plan — final review', body: 'Confirmed — the revised rollout dates look good...', status: 'AI Drafted', time: 'Edited 4 min ago', context: 'Q4 launch owner' },
  { recipient: 'Jordan Lee', subject: 'Partner launch brief and next steps', body: 'Sharing the updated co-marketing timeline...', status: 'In progress', time: 'Edited 38 min ago', context: 'Requested timeline' }
];

router.get('/', protect, async (req, res) => {
  try {
    let drafts = await Draft.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    

    
    // Map _id to id for the frontend
    const formattedDrafts = drafts.map(d => ({
      id: d._id.toString(),
      recipient: d.recipient,
      subject: d.subject,
      body: d.body,
      status: d.status,
      context: d.context,
      time: d.time || new Date(d.createdAt).toLocaleDateString()
    }));
    
    res.json(formattedDrafts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/schedule', protect, async (req, res) => {
  res.json({ success: true, message: 'Draft scheduled successfully' });
});

export default router;
