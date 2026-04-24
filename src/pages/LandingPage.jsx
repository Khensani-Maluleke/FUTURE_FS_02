import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Users, BarChart3, ShieldCheck, Zap, ArrowRight, Briefcase } from 'lucide-react';
import LandingNav from '../components/LandingNav.jsx';

const LandingPage = () => {
  const features = [
    {
      icon: Users,
      title: "Lead Intelligence",
      description: "Capture and categorize every inquiry with precision. Never lose track of a potential conversion again."
    },
    {
      icon: BarChart3,
      title: "Actionable Analytics",
      description: "Real-time dashboard insights that show your team exactly where growth is happening."
    },
    {
      icon: ShieldCheck,
      title: "Standardized Intake",
      description: "Our dedicated public forms ensure that data enters your CRM clean, validated, and ready for action."
    },
    {
      icon: Zap,
      title: "Instant Response",
      description: "Speed is the currency of sales. Get notifications and manage leads with lightning fast efficiency."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg font-sans selection:bg-brand-primary selection:text-white">
      <LandingNav />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            Next-Gen CRM Solution
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-brand-text-main max-w-4xl tracking-tight leading-[1.1]"
          >
            Manage every lead with <span className="text-brand-primary italic">LeadFlow</span> CRM
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-lg text-brand-text-muted max-w-2xl leading-relaxed"
          >
            The professional tool designed to bridge the gap between initial client inquiry and successful conversion. Clean design, powerful analytics, and effortless lead management.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link 
              to="/login" 
              className="w-full sm:w-auto bg-brand-sidebar text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:bg-brand-sidebar/90 transition-all flex items-center justify-center gap-2"
            >
              Start Admin Console <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/form" 
              className="w-full sm:w-auto bg-white border border-brand-border text-brand-text-main px-8 py-4 rounded-xl font-bold hover:bg-brand-bg transition-all flex items-center justify-center gap-2"
            >
              Preview Client Form
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-white border-y border-brand-border">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, i) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-bg flex items-center justify-center text-brand-primary shadow-sm border border-brand-border">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-brand-text-main">{feature.title}</h3>
              <p className="text-brand-text-muted text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Branding Message */}
      <section className="py-24 px-6 bg-brand-sidebar text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Built for professionals who value <span className="text-brand-primary">operational clarity</span>.</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-12">
              LeadFlow isn't just about spreadsheets and numbers. It's about the narrative of your business growth. We provide the visual and structural framework that lets you focus on building client relationships while we handle the data architecture.
            </p>
            <div className="flex items-center gap-8 border-t border-white/10 pt-12">
               <div>
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Data Integrity</p>
               </div>
               <div>
                  <p className="text-2xl font-bold text-white">Real-time</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Sync Engine</p>
               </div>
               <div>
                  <p className="text-2xl font-bold text-white">Private</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mt-1">Admin Layer</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-brand-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 font-bold text-brand-primary">
                <Briefcase className="w-6 h-6" />
                <span className="tracking-tight">LeadFlow CRM</span>
            </div>
            <p className="text-xs text-brand-text-muted font-semibold uppercase tracking-widest">
                © 2026 Professional Lead Management Architecture
            </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
