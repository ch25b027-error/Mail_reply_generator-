import mongoose from 'mongoose';

const trackingEventSchema = new mongoose.Schema({
  status: String,
  description: String,
  time: String
});

const aiSuggestionSchema = new mongoose.Schema({
  recommendedTime: String,
  rationale: String,
  preview: String
});

const sentEmailSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, default: 'Delivered' },
  time: { type: String },
  trackingEvents: [trackingEventSchema],
  aiSuggestion: aiSuggestionSchema
}, { timestamps: true });

export default mongoose.model('SentEmail', sentEmailSchema);
