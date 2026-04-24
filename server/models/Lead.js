import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  source: { type: String },
  status: { 
    type: String, 
    enum: ['new', 'contacted', 'converted'], 
    default: 'new' 
  },
  notes: [NoteSchema]
}, { timestamps: true });

export const Lead = mongoose.model('Lead', LeadSchema);
