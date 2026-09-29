import React, { useState, useEffect } from 'react';
import { RegistrationRecord } from '../types';
import { 
  X, Search, Download, RefreshCw, ShieldCheck, UserCheck, 
  Calendar, Phone, Mail, GraduationCap, TrendingUp, Users, 
  CheckCircle2, Filter, PieChart, Activity
} from 'lucide-react';

interface AdminRegistrationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminRegistrationsModal: React.FC<AdminRegistrationsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('muthamizh_auth_token');
      const res = await fetch('/api/registrations', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.registrations) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchRegistrations();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = registrations.filter(r => {
    const matchesSearch = 
      r.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.program_interest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.phone.includes(searchTerm) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    return matchesSearch && r.program_interest.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const exportCSV = () => {
    if (registrations.length === 0) return;
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'Program Interest', 'Qualification', 'Timestamp'];
    const rows = registrations.map(r => [
      r.id,
      `"${r.full_name}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.program_interest}"`,
      `"${r.qualification}"`,
      `"${r.timestamp}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Muthamizh_Studios_Admissions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#050706]/90 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-[#0b100e] border border-[#16241f] rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(0,200,120,0.15)] overflow-hidden max-h-[92vh] flex flex-col font-sans">
        
        {/* Header */}
        <div className="p-4 sm:p-6 bg-[#050706] border-b border-[#16241f] flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#00c878]/15 border border-[#00c878]/30 flex items-center justify-center text-[#00c878] font-bold shadow-[0_0_20px_rgba(0,200,120,0.15)]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#f5f7f6]">
                  Admissions Control Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-[#00c878]/20 text-[#00c878] text-[10px] font-mono font-bold">
                  STUDIOS
                </span>
              </div>
              <p className="text-xs text-[#8a9690] font-mono mt-0.5">
                Muthamizh Academy • Real-Time Candidate Funnel & Telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchRegistrations}
              className="p-2.5 rounded-xl bg-[#121a17] hover:bg-[#16241f] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f] text-xs font-mono flex items-center gap-1.5 transition-all"
              title="Refresh Leads"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={exportCSV}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00c878] to-[#006b45] text-[#050706] font-mono font-bold text-xs shadow flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV Data</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#121a17] text-[#8a9690] hover:text-[#f5f7f6] border border-[#16241f]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Funnel Metrics Dashboard Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-[#0b100e] border-b border-[#16241f] text-xs font-mono">
          <div className="p-3 rounded-2xl bg-[#050706] border border-[#16241f]">
            <span className="text-[#8a9690] text-[10px] block">TOTAL APPLICANTS</span>
            <span className="text-xl font-bold text-[#f5f7f6] mt-0.5 block">{registrations.length}</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#050706] border border-[#16241f]">
            <span className="text-[#8a9690] text-[10px] block">PG DIPLOMA LEADS</span>
            <span className="text-xl font-bold text-[#00c878] mt-0.5 block">
              {registrations.filter(r => r.program_interest.includes('PG Diploma')).length}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#050706] border border-[#16241f]">
            <span className="text-[#8a9690] text-[10px] block">SHORT TERM & WEEKEND</span>
            <span className="text-xl font-bold text-[#e6ad54] mt-0.5 block">
              {registrations.filter(r => !r.program_interest.includes('PG Diploma')).length}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-[#050706] border border-[#16241f]">
            <span className="text-[#8a9690] text-[10px] block">STUDIO INTAKE STATUS</span>
            <span className="text-xs font-bold text-[#00c878] mt-1.5 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 animate-pulse" /> 148 SEATS ACTIVE
            </span>
          </div>
        </div>

        {/* Search & Filter Strip */}
        <div className="p-4 bg-[#050706] border-b border-[#16241f] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8a9690] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name, program, phone, email..."
              className="w-full bg-[#0b100e] text-[#f5f7f6] text-xs pl-10 pr-3 py-2.5 rounded-xl border border-[#16241f] focus:outline-none focus:border-[#00c878] placeholder:text-[#8a9690]"
            />
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-[#8a9690]">Showing: <strong className="text-[#00c878]">{filtered.length}</strong></span>
          </div>
        </div>

        {/* Candidate List Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filtered.length === 0 ? (
            <div className="py-20 text-center text-[#8a9690] text-xs font-mono">
              No candidate leads match the specified query.
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((record) => (
                <div
                  key={record.id}
                  className="p-4 rounded-2xl bg-[#050706] border border-[#16241f] hover:border-[#00c878]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-[#121a17] text-[#00c878] font-mono font-bold text-[10px] border border-[#16241f]">
                        {record.id}
                      </span>
                      <h3 className="font-bold text-[#f5f7f6] text-sm group-hover:text-[#00c878] transition-colors">
                        {record.full_name}
                      </h3>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-[#8a9690] font-sans">
                      <span className="flex items-center gap-1 text-[#e6ad54] font-medium">
                        <GraduationCap className="w-3.5 h-3.5" />
                        {record.program_interest}
                      </span>
                      <span>•</span>
                      <span className="text-[#8a9690]">{record.qualification}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-[#8a9690] font-mono text-[11px] pt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#8a9690]" />
                        {record.email}
                      </span>
                      <span className="flex items-center gap-1 text-[#00c878]">
                        <Phone className="w-3 h-3" />
                        {record.phone}
                      </span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-[#16241f] font-mono">
                    <span className="text-[10px] text-[#8a9690] flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3" />
                      {new Date(record.timestamp).toLocaleString()}
                    </span>
                    <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-[#00c878]/15 text-[#00c878] text-[10px] font-bold border border-[#00c878]/30">
                      LIVE ADMISSIONS LEAD
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
