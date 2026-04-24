import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-brand-bg font-sans">
      <Navbar />
      <main className="flex-1 ml-60 overflow-hidden flex flex-col">
        <div className="h-16 bg-white border-b border-brand-border flex items-center justify-between px-8">
            <div className="text-xs font-semibold text-brand-text-muted uppercase tracking-wider">LeadFlow Management System</div>
            <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-brand-text-main">Admin User</span>
                <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-[10px] font-bold">AD</div>
            </div>
        </div>
        <div className="p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
