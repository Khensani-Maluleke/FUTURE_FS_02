import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import api from '../lib/api.js';
import { Lock, Mail, Loader2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('admin@minicrm.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg p-4 font-sans">
      <div className="w-full max-w-sm bg-white p-10 rounded-xl shadow-soft border border-brand-border">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-brand-primary rounded-lg flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-brand-text-main tracking-tight">LeadFlow CRM</h2>
          <p className="text-brand-text-muted mt-1 text-sm">Please sign in to continue</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 rounded text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-wider mb-2 px-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-brand-bg border border-brand-border rounded-md focus:border-brand-primary transition-all outline-none text-brand-text-main text-sm font-medium"
                placeholder="admin@leadflow.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-brand-text-muted uppercase tracking-wider mb-2 px-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-brand-bg border border-brand-border rounded-md focus:border-brand-primary transition-all outline-none text-brand-text-main text-sm font-medium"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-primary hover:opacity-90 text-white font-semibold py-2.5 rounded-md shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Log In'}
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-brand-text-muted font-semibold uppercase tracking-widest">
          Secure Admin Access
        </p>
      </div>
    </div>
  );
};

export default Login;
