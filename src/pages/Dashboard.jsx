import React, { useEffect, useState } from 'react';
import api from '../lib/api.js';
import { TrendingUp, Users, CheckCircle, AlertCircle, Download, FileText, PieChart as PieIcon, BarChart as BarIcon, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    converted: 0
  });
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await api.get('/leads');
        const data = res.data;
        setLeads(data);
        
        // Status counts
        const statusCounts = {
          new: data.filter((l) => l.status === 'new').length,
          contacted: data.filter((l) => l.status === 'contacted').length,
          converted: data.filter((l) => l.status === 'converted').length
        };

        setStats({
          total: data.length,
          ...statusCounts
        });

        // Chart Data (Status)
        setChartData([
          { name: 'New', value: statusCounts.new, color: '#3b82f6' },
          { name: 'Contacted', value: statusCounts.contacted, color: '#f59e0b' },
          { name: 'Converted', value: statusCounts.converted, color: '#10b981' }
        ]);

        // Source Data
        const sources = data.reduce((acc, lead) => {
          const source = lead.source || 'Unknown';
          acc[source] = (acc[source] || 0) + 1;
          return acc;
        }, {});

        setSourceData(Object.entries(sources).map(([name, value]) => ({ name, value })));

      } catch (err) {
        console.error('Error fetching leads:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeads();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(30, 41, 59); // brand-text-main
    doc.text('LeadFlow CRM: Performance Report', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // brand-text-muted
    doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 30);
    
    // Summary Stats
    doc.setFontSize(14);
    doc.setTextColor(30, 41, 59);
    doc.text('Executive Summary', 14, 45);
    
    const summaryData = [
      ['Metric', 'Value'],
      ['Total Leads', stats.total.toString()],
      ['New Leads', stats.new.toString()],
      ['Contacted', stats.contacted.toString()],
      ['Converted', stats.converted.toString()],
      ['Conversion Rate', stats.total > 0 ? `${((stats.converted / stats.total) * 100).toFixed(1)}%` : '0%']
    ];

    doc.autoTable({
      startY: 50,
      head: [summaryData[0]],
      body: summaryData.slice(1),
      theme: 'grid',
      headStyles: { fillColor: '#3b82f6' }
    });

    // Lead Table
    doc.text('Recent Lead Catalog', 14, doc.lastAutoTable.finalY + 15);
    
    const leadTableData = leads.map(l => [
      l.name,
      l.email,
      l.source || 'N/A',
      l.status.toUpperCase(),
      new Date(l.createdAt).toLocaleDateString()
    ]);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 20,
      head: [['Name', 'Email', 'Source', 'Status', 'Date']],
      body: leadTableData,
      theme: 'striped'
    });

    doc.save(`LeadFlow_Report_${Date.now()}.pdf`);
  };

  const generateCSV = () => {
    const headers = ['Name', 'Email', 'Source', 'Status', 'Created At'];
    const rows = leads.map(l => [
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.source || 'N/A'}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `LeadFlow_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6'];

  const statCards = [
    { label: 'Total Leads', value: stats.total, icon: Users, color: 'text-brand-primary' },
    { label: 'New This Week', value: stats.new, icon: AlertCircle, color: 'text-brand-primary' },
    { label: 'Conversion Rate', value: stats.total > 0 ? `${((stats.converted / stats.total) * 100).toFixed(1)}%` : '0%', icon: CheckCircle, color: 'text-brand-primary' },
    { label: 'Active Pipeline', value: stats.contacted, icon: TrendingUp, color: 'text-brand-primary' },
  ];

  if (loading) return <div className="flex items-center justify-center min-h-[400px] text-brand-text-muted text-sm font-medium">Synchronizing CRM Data...</div>;

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => (
          <motion.div 
            key={card.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 rounded-lg border border-brand-border shadow-soft"
          >
            <div className="flex justify-between items-start mb-2">
                <p className="text-[11px] font-bold text-brand-text-muted uppercase tracking-wider">{card.label}</p>
                <card.icon className={`w-4 h-4 ${card.color} opacity-40`} />
            </div>
            <h3 className="text-2xl font-bold text-brand-text-main tabular-nums">{card.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
        {/* Status Distribution (Bar Chart) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-brand-border shadow-soft flex flex-col">
            <div className="p-5 border-b border-brand-border flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <BarIcon className="w-4 h-4 text-brand-primary" />
                    <span className="font-bold text-brand-text-main text-sm">Lead Status Distribution</span>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={generatePDF}
                        className="flex items-center gap-2 bg-brand-primary text-white text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded shadow-sm hover:opacity-90 transition-all active:scale-95"
                    >
                        <FileText className="w-3.5 h-3.5" /> PDF Report
                    </button>
                    <button 
                        onClick={generateCSV}
                        className="flex items-center gap-2 bg-white border border-brand-border text-brand-text-main text-[11px] font-bold uppercase tracking-wider px-4 py-2 rounded shadow-sm hover:bg-slate-50 transition-all active:scale-95"
                    >
                        <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                </div>
            </div>
            <div className="p-6 flex-1">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} 
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fontSize: 11, fontWeight: 600, fill: '#64748b' }} 
                        />
                        <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{ fill: '#f8fafc' }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        
        {/* Source Distribution (Pie Chart) */}
        <div className="bg-white rounded-lg border border-brand-border shadow-soft flex flex-col">
            <div className="p-5 border-b border-brand-border">
                <div className="flex items-center gap-2">
                    <PieIcon className="w-4 h-4 text-brand-primary" />
                    <span className="font-bold text-brand-text-main text-sm">Traffic Source</span>
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex-1">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={sourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {sourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-4 space-y-2">
                    {sourceData.map((data, i) => (
                        <div key={data.name} className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                                <span className="font-medium text-brand-text-muted">{data.name}</span>
                            </div>
                            <span className="font-bold text-brand-text-main">{data.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* Activity Log (Simplified) */}
      <div className="bg-white rounded-lg border border-brand-border shadow-soft p-6">
          <h4 className="font-bold text-brand-text-main text-sm mb-6 border-b border-brand-border pb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-primary" /> System Intelligence
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 italic transition-all hover:shadow-sm">
                  <p className="text-[13px] text-brand-text-main leading-relaxed">
                      "Leads contacted within the first hour are 7x more likely to be qualified. Optimize your response workflow today."
                  </p>
              </div>
              <div className="p-4 bg-brand-bg rounded-lg border border-brand-border transition-all hover:shadow-sm">
                  <p className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-2">Efficiency Rating</p>
                  <p className="text-lg font-bold text-brand-text-main">A+ Stable</p>
              </div>
              <div className="p-4 bg-brand-bg rounded-lg border border-brand-border transition-all hover:shadow-sm">
                  <p className="text-xs font-bold text-brand-text-muted uppercase tracking-widest mb-2">Sync Status</p>
                  <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <p className="text-sm font-bold text-brand-text-main uppercase tracking-tighter text-[10px]">Live Connection</p>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;
