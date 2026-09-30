import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Completed' },
  time: { type: String },
  previewSubject: { type: String },
  previewBody: { type: String },
  messagesAffected: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model('ActionHistory', actionSchema);
