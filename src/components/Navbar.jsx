import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed left-0 top-0 h-screen w-60 bg-brand-sidebar text-white flex flex-col py-6 z-50">
      <div className="flex items-center gap-3 mb-10 px-6 font-bold text-lg text-brand-primary">
        <Briefcase className="w-6 h-6" />
        <h1 className="tracking-tight">LeadFlow <span className="text-white/50 font-normal">CRM</span></h1>
      </div>

      <div className="flex-1">
        <NavLink 
          to="/admin" 
          end
          className={({ isActive }) => 
            `flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-4 ${isActive ? 'bg-[#1e293b] text-white border-brand-primary' : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'}`
          }
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink 
          to="/admin/leads" 
          className={({ isActive }) => 
            `flex items-center gap-3 px-6 py-3 text-sm transition-all border-l-4 ${isActive ? 'bg-[#1e293b] text-white border-brand-primary' : 'text-slate-400 border-transparent hover:text-white hover:bg-white/5'}`
          }
        >
          <Users className="w-4 h-4" />
          <span>Leads Database</span>
        </NavLink>
      </div>

      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-6 py-3 text-sm text-slate-400 hover:text-white hover:bg-white/5 mt-auto transition-all"
      >
        <LogOut className="w-4 h-4" />
        <span>Admin Logout</span>
      </button>
    </nav>
  );
};

export default Navbar;
