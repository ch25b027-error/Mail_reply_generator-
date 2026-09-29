import mongoose from 'mongoose';

const draftSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, default: 'AI Drafted' },
  context: { type: String },
  time: { type: String }
}, { timestamps: true });

export default mongoose.model('Draft', draftSchema);
