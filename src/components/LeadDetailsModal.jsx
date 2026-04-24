import React, { useState } from 'react';
import { X } from 'lucide-react';
import api from '../lib/api.js';
import { motion } from 'motion/react';

const LeadDetailsModal = ({ lead, onClose, onUpdate }) => {
  const [newNote, setNewNote] = useState('');
  const [status, setStatus] = useState(lead.status);
  const [submitting, setSubmitting] = useState(false);

  const handleUpdateStatus = async (newStatus) => {
    try {
      await api.put(`/leads/${lead._id}/status`, { status: newStatus });
      setStatus(newStatus);
      onUpdate();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    
    setSubmitting(true);
    try {
      await api.post(`/leads/${lead._id}/notes`, { text: newNote });
      setNewNote('');
      onUpdate();
    } catch (err) {
      console.error('Error adding note:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        className="relative w-[400px] bg-white h-full shadow-2xl flex flex-col overflow-hidden border-l border-brand-border"
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-border">
          <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-brand-text-main">Lead Details</h3>
              <button onClick={onClose} className="p-2 hover:bg-brand-bg rounded-md transition-colors text-brand-text-muted">
                <X className="w-5 h-5" />
              </button>
          </div>
          <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div>
                  <p className="text-sm font-bold text-brand-text-main leading-none">{lead.name}</p>
                  <p className="text-[12px] text-brand-text-muted mt-1">ID: {lead._id.slice(-6).toUpperCase()}</p>
              </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-4">
                <div>
                    <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider block mb-2">Update Status</label>
                    <select 
                        value={status}
                        onChange={(e) => handleUpdateStatus(e.target.value)}
                        className="w-full p-2.5 bg-white border border-brand-border rounded-md text-sm font-medium outline-none text-brand-text-main"
                    >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="converted">Converted</option>
                    </select>
                </div>
            </div>

            <div className="space-y-4">
                <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider block">Activity Notes</label>
                
                <div className="space-y-3">
                  {lead.notes && lead.notes.length > 0 ? (
                    [...lead.notes].reverse().map((note, i) => (
                      <div key={i} className="p-3 bg-brand-bg rounded-md border border-brand-border">
                        <div className="text-[10px] font-semibold text-brand-text-muted mb-1 uppercase tracking-wider">
                          {new Date(note.createdAt).toLocaleString()}
                        </div>
                        <p className="text-[13px] text-brand-text-main leading-relaxed">{note.text}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-brand-text-muted text-[12px] italic">No activity recorded.</div>
                  )}
                </div>
            </div>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Add a new note..."
                className="w-full bg-white border border-brand-border p-3 rounded-md min-h-[80px] text-sm outline-none focus:border-brand-primary placeholder:text-brand-text-muted transition-all"
              />
              <button 
                type="submit"
                disabled={submitting || !newNote.trim()}
                className="w-full bg-brand-primary text-white text-sm font-semibold py-2.5 rounded-md shadow-sm hover:opacity-90 disabled:opacity-50 transition-all active:scale-95"
              >
                Save Note
              </button>
            </form>
        </div>
      </motion.div>
    </div>
  );
};

export default LeadDetailsModal;
