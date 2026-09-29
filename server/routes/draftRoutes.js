import express from 'express';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const mockDrafts = [
  {
    id: 'd1',
    recipient: 'Maya Chen',
    subject: 'Re: Q4 launch plan — final review',
    body: 'Confirmed — the revised rollout dates look good, including the October 14 beta announcement. I\'ll bring the final launch checklist and owner updates to our 3 PM sync.\n\nThanks for turning this around,\nAlex',
    status: 'AI Drafted',
    time: 'Edited 4 min ago',
    context: 'Q4 launch owner · 8-message thread · Needs confirmation before the 3 PM sync.'
  },
  {
    id: 'd2',
    recipient: 'Jordan Lee',
    subject: 'Partner launch brief and next steps',
    body: 'Sharing the updated co-marketing timeline and owner checklist.',
    status: 'In progress',
    time: 'Edited 38 min ago',
    context: 'Requested timeline for partner launch.'
  },
  {
    id: 'd3',
    recipient: 'Priya Shah',
    subject: 'Customer advisory board invitation',
    body: 'Would you be available to join our October product roundtable?',
    status: 'Scheduled',
    time: 'Yesterday',
    context: 'Follow up on Q3 advisory board.'
  },
  {
    id: 'd4',
    recipient: 'Daniel Kim',
    subject: 'Research follow-up: enterprise workflows',
    body: 'Thank you for the thoughtful notes on approval and routing needs.',
    status: 'AI Drafted',
    time: 'Sep 24',
    context: 'Post-interview synthesis.'
  },
  {
    id: 'd5',
    recipient: 'Nora Alvarez',
    subject: 'Q4 launch interview synthesis',
    body: 'Five customer interviews distilled into three actionable themes.',
    status: 'In progress',
    time: 'Sep 23',
    context: 'Synthesis of recent interviews.'
  }
];

router.get('/', protect, (req, res) => {
  res.json(mockDrafts);
});

router.post('/schedule', protect, (req, res) => {
  res.json({ success: true, message: 'Draft scheduled successfully' });
});

export default router;
