import React, { useState, useEffect } from 'react';
import api from '../lib/api.js';
import { Search, Plus, Calendar } from 'lucide-react';
import LeadDetailsModal from '../components/LeadDetailsModal.jsx';
import AddLeadModal from '../components/AddLeadModal.jsx';
import { AnimatePresence } from 'motion/react';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchLeads = async () => {
    try {
      const res = await api.get('/leads');
      setLeads(res.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'new': return 'bg-[#dbeafe] text-[#1e40af]';
      case 'contacted': return 'bg-[#fef3c7] text-[#92400e]';
      case 'converted': return 'bg-[#d1fae5] text-[#065f46]';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-white p-4 rounded-lg border border-brand-border shadow-soft flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[300px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-muted" />
          <input 
            type="text" 
            placeholder="Search leads, sources or emails..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-brand-bg border-none rounded-md text-sm outline-none placeholder:text-brand-text-muted transition-all"
          />
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-brand-border rounded-md text-sm font-medium outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="converted">Converted</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-lg border border-brand-border shadow-soft overflow-hidden">
        <div className="p-5 border-b border-brand-border flex justify-between items-center">
          <span className="font-bold text-brand-text-main">Lead Database</span>
          <div className="text-xs text-brand-text-muted font-medium">Showing {filteredLeads.length} leads</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-[11px] font-semibold text-brand-text-muted uppercase tracking-wider border-b border-brand-border">Name / Contact</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-brand-text-muted uppercase tracking-wider border-b border-brand-border">Source</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-brand-text-muted uppercase tracking-wider border-b border-brand-border">Status</th>
                <th className="px-6 py-3 text-[11px] font-semibold text-brand-text-muted uppercase tracking-wider border-b border-brand-border">Last Updated</th>
                <th className="px-6 py-3 border-b border-brand-border text-right pr-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-brand-text-muted text-sm italic">Loading leads...</td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-10 text-center text-brand-text-muted text-sm italic">No records found.</td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr 
                    key={lead._id} 
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                    onClick={() => setSelectedLead(lead)}
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-bold text-brand-text-main text-sm">{lead.name}</p>
                        <p className="text-[12px] text-brand-text-muted">{lead.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-medium text-brand-text-main uppercase">{lead.source || 'Website'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-[11px] font-bold uppercase ${getStatusStyle(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs text-brand-text-muted font-medium">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(lead.updatedAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right pr-6">
                        <button className="text-[12px] font-bold text-brand-primary opacity-0 group-hover:opacity-100 transition-all">View Profile</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-[0.2em] text-center pt-4 italic opacity-50">
        System Node: CRM-TX-092 • End of Array
      </p>

      {/* Modals */}
      <AnimatePresence>
        {selectedLead && (
          <LeadDetailsModal 
            lead={selectedLead} 
            onClose={() => setSelectedLead(null)} 
            onUpdate={fetchLeads}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Leads;
