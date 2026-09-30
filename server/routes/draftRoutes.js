import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import Draft from '../models/Draft.js';

const router = express.Router();

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

// Mock POST for legacy /schedule if any exist (optional)
router.post('/schedule', protect, async (req, res) => {
  res.json({ success: true, message: 'Draft scheduled successfully' });
});

// Schedule Draft Endpoint
router.patch('/:id/schedule', protect, async (req, res) => {
  try {
    const draft = await Draft.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!draft) return res.status(404).json({ error: 'Draft not found' });
    
    draft.status = 'Scheduled';
    draft.time = `Scheduled - ${req.body.scheduledTime}`; // Quick mock for UI
    // For a real app, save req.body.scheduledTime explicitly to a field
    
    await draft.save();
    res.json({ success: true, draft });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete Draft Endpoint
router.delete('/:id', protect, async (req, res) => {
  try {
    const draft = await Draft.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!draft) return res.status(404).json({ error: 'Draft not found' });
    
    res.json({ success: true, message: 'Draft deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
