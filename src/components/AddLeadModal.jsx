import React, { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import api from '../lib/api.js';
import { motion } from 'motion/react';

const AddLeadModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    try {
      await api.post('/leads', formData);
      onSuccess();
      onClose();
    } catch (err) {
      setErrors({ message: err.response?.data?.message || 'Failed to initialize entry' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#141414]/90 backdrop-blur-md"
      />
      
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative w-full max-w-md bg-white rounded-xl overflow-hidden shadow-2xl border border-brand-border text-brand-text-main"
      >
        <div className="p-8 space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-brand-text-main">Capture New Lead</h2>
              <p className="text-brand-text-muted text-xs font-medium mt-1 uppercase tracking-wider">Initialization Module</p>
            </div>
            <button onClick={onClose} className="text-brand-text-muted p-1 hover:bg-brand-bg rounded transition-all">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest block mb-2 px-1">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-brand-bg border border-brand-border px-4 py-2.5 rounded-md font-semibold text-sm outline-none focus:border-brand-primary placeholder:text-slate-300 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest block mb-2 px-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="name@company.com"
                    className="w-full bg-brand-bg border border-brand-border px-4 py-2.5 rounded-md font-semibold text-sm outline-none focus:border-brand-primary placeholder:text-slate-300 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-brand-text-muted uppercase tracking-widest block mb-2 px-1">Lead Source</label>
                  <input 
                    type="text" 
                    value={formData.source}
                    onChange={(e) => setFormData({...formData, source: e.target.value})}
                    placeholder="e.g. LinkedIn, Referral..."
                    className="w-full bg-brand-bg border border-brand-border px-4 py-2.5 rounded-md font-semibold text-sm outline-none focus:border-brand-primary placeholder:text-slate-300 transition-all"
                  />
                </div>
              </div>

            <div className="flex gap-3 pt-6 border-t border-brand-border">
              <button 
                type="button" 
                onClick={onClose}
                className="flex-1 py-2 rounded-md border border-brand-border font-bold text-brand-text-main text-xs uppercase tracking-widest hover:bg-brand-bg transition-all"
              >
                Abort
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="flex-1 bg-brand-primary text-white py-2 rounded-md font-bold text-xs uppercase tracking-widest shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Lead'}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddLeadModal;
