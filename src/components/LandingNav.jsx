import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';

const LandingNav = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 font-bold text-xl text-brand-primary">
          <Briefcase className="w-8 h-8" />
          <span className="tracking-tight">LeadFlow <span className="text-brand-text-main font-normal">CRM</span></span>
        </Link>
        <div className="flex items-center gap-6">
          <Link to="/form" className="text-sm font-semibold text-brand-text-muted hover:text-brand-primary transition-colors">
            Public Form
          </Link>
          <Link to="/login" className="text-sm font-semibold text-brand-text-main hover:text-brand-primary transition-colors">
            Sign In
          </Link>
          <Link 
            to="/login" 
            className="bg-brand-primary text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-soft hover:opacity-90 transition-all active:scale-95"
          >
            Admin Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
