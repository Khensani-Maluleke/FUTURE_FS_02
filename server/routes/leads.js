import express from 'express';
import mongoose from 'mongoose';
import { Lead } from '../models/Lead.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Mock data for fallback
let mockLeads = [
  {
    _id: 'mock_1',
    name: 'Sarah Jenkins (Demo)',
    email: 'sarah.j@demo.com',
    source: 'LinkedIn',
    status: 'new',
    notes: [{ text: 'System running in Demo Mode - Database disconnected.', createdAt: new Date() }],
    updatedAt: new Date(),
    createdAt: new Date()
  }
];

const isDBConnected = () => mongoose.connection.readyState === 1;

// Public Lead Submission (No Auth)
router.post('/public', async (req, res) => {
  const { name, email, source, message } = req.body;
  try {
    const notes = message ? [{ text: message }] : [];
    
    if (isDBConnected()) {
      const newLead = new Lead({ name, email, source, notes });
      await newLead.save();
      return res.status(201).json(newLead);
    }
    
    const mockLead = {
      _id: `mock_${Date.now()}`,
      name,
      email,
      source: source || 'Public Form',
      status: 'new',
      notes: notes.map(n => ({ ...n, createdAt: new Date() })),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockLeads.push(mockLead);
    res.status(201).json(mockLead);
  } catch (err) {
    res.status(500).json({ message: 'Error creating lead' });
  }
});

// All routes protected (except those above)
router.use(authMiddleware);

// Get all leads
router.get('/', async (req, res) => {
  try {
    if (isDBConnected()) {
      const leads = await Lead.find().sort({ createdAt: -1 });
      return res.json(leads);
    }
    res.json(mockLeads.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leads' });
  }
});

// Create new lead (Admin)
router.post('/', async (req, res) => {
  const { name, email, source } = req.body;
  try {
    if (isDBConnected()) {
      const newLead = new Lead({ name, email, source });
      await newLead.save();
      return res.status(201).json(newLead);
    }
    
    const mockLead = {
      _id: `mock_${Date.now()}`,
      name,
      email,
      source,
      status: 'new',
      notes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    mockLeads.push(mockLead);
    res.status(201).json(mockLead);
  } catch (err) {
    res.status(500).json({ message: 'Error creating lead' });
  }
});

// Get single lead
router.get('/:id', async (req, res) => {
  try {
    if (isDBConnected() && !req.params.id.startsWith('mock_')) {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ message: 'Lead not found' });
      return res.json(lead);
    }
    
    const lead = mockLeads.find(l => l._id === req.params.id);
    if (!lead) return res.status(404).json({ message: 'Lead not found' });
    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching lead' });
  }
});

// Update lead status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    if (isDBConnected() && !req.params.id.startsWith('mock_')) {
      const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!lead) return res.status(404).json({ message: 'Lead not found' });
      return res.json(lead);
    }
    
    const index = mockLeads.findIndex(l => l._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Lead not found' });
    mockLeads[index].status = status;
    mockLeads[index].updatedAt = new Date();
    res.json(mockLeads[index]);
  } catch (err) {
    res.status(500).json({ message: 'Error updating status' });
  }
});

// Add note
router.post('/:id/notes', async (req, res) => {
  const { text } = req.body;
  try {
    if (isDBConnected() && !req.params.id.startsWith('mock_')) {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ message: 'Lead not found' });
      lead.notes.push({ text });
      await lead.save();
      return res.json(lead);
    }
    
    const index = mockLeads.findIndex(l => l._id === req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Lead not found' });
    mockLeads[index].notes.push({ text, createdAt: new Date() });
    mockLeads[index].updatedAt = new Date();
    res.json(mockLeads[index]);
  } catch (err) {
    res.status(500).json({ message: 'Error adding note' });
  }
});

// Delete lead
router.delete('/:id', async (req, res) => {
  try {
    if (isDBConnected() && !req.params.id.startsWith('mock_')) {
      await Lead.findByIdAndDelete(req.params.id);
      return res.json({ message: 'Lead deleted' });
    }
    mockLeads = mockLeads.filter(l => l._id !== req.params.id);
    res.json({ message: 'Lead deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting lead' });
  }
});

export default router;
