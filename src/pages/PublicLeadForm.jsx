import React, { useState } from 'react';
import { CheckCircle, Loader2, Sparkles, Send } from 'lucide-react';
import api from '../lib/api.js';
import { motion, AnimatePresence } from 'motion/react';

const PublicLeadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    source: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.source) {
      setError('Please tell us how you heard about us');
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      await api.post('/leads/public', formData);
      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-2xl shadow-soft text-center max-w-md w-full border border-brand-border"
        >
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-brand-text-main mb-2">Thank You!</h2>
          <p className="text-brand-text-muted mb-8">We've received your inquiry and our team will be in touch shortly.</p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', source: '', message: '' });
            }}
            className="text-brand-primary font-bold text-sm uppercase tracking-widest hover:underline"
          >
            Submit Another Request
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-soft border border-brand-border overflow-hidden">
        <div className="p-10">
          <div className="mb-10 flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-text-main">Get in Touch</h1>
              <p className="text-brand-text-muted text-xs font-semibold uppercase tracking-wider">Inquiry Form</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-wider mb-2 px-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none transition-all text-sm font-medium"
                  placeholder="Sarah Jenkins"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-wider mb-2 px-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none transition-all text-sm font-medium"
                  placeholder="sarah@example.com"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-wider mb-2 px-1">How did you hear about us?</label>
                <select
                  required
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none transition-all text-sm font-medium appearance-none"
                >
                  <option value="" disabled>Select an option</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Referral">Referral</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-wider mb-2 px-1">Message (Optional)</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-brand-bg border border-brand-border rounded-xl focus:border-brand-primary outline-none transition-all text-sm font-medium min-h-[100px]"
                  placeholder="How can we help you?"
                />
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold px-1">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary hover:opacity-90 text-white font-bold py-4 rounded-xl shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  <span>Send Request</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
        <div className="bg-slate-50 p-6 text-center border-t border-brand-border">
          <p className="text-[10px] text-brand-text-muted font-bold uppercase tracking-widest">
            Privacy Protected • Secure Submission
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicLeadForm;
