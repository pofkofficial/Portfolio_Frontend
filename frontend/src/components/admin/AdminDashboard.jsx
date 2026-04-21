import { useEffect, useState, useCallback } from 'react';
import api from '/src/api';
import { RiDeleteBinLine, RiRefreshLine, RiAddLine, RiEditLine, RiFilter3Line } from 'react-icons/ri';
import toast from 'react-hot-toast';
import ProjectModal from './ProjectModal';
import MessageModal from './MessageModal';

const CATEGORIES = [
  { id: 'all', label: 'All_Archive' },
  { id: 'software', label: 'Systems_Dev' },
  { id: 'ui', label: 'Interface_Design' },
  { id: 'analytics', label: 'Data_Intelligence' }
];

export default function AdminDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMetrics = useCallback(async () => {
    try {
      const res = await api.get('/api/admin/metrics');
      setMetrics(res.data);
    } catch (err) {
      toast.error("Handshake failed. System Offline.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMetrics(); }, [fetchMetrics]);

  // Filtering Logic
  const filteredProjects = activeTab === 'all' 
    ? metrics?.all_projects 
    : metrics?.all_projects?.filter(p => p.category === activeTab);

  const deleteItem = async (type, id, e) => {
    e.stopPropagation();
    if (isProcessing) return;
    if (!window.confirm(`Purge this ${type} permanently?`)) return;
    
    setIsProcessing(true);
    try {
      await api.delete(`/api/admin/${type === 'message' ? 'messages' : 'projects'}/${id}`);
      toast.success(`${type} Purged.`);
      await fetchMetrics();
    } catch (err) {
      toast.error("Purge Failed.");
    } finally { setIsProcessing(false); }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#050505] font-mono text-cyan-500 animate-pulse tracking-[0.3em] text-[10px]">
      ESTABLISHING SECURE CONNECTION...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] p-6 lg:p-16 text-white font-poppins">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Console */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-2 w-2 bg-red-500 rounded-full animate-ping" />
              <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em]">Auth_Level: Administrator</span>
            </div>
            <h1 className="text-4xl font-bold italic uppercase tracking-tighter">System <span className="text-cyan-500">Command</span></h1>
          </div>
          
          <button onClick={() => { setLoading(true); fetchMetrics(); }} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:text-cyan-400 hover:border-cyan-500/30 transition-all font-mono text-[10px] uppercase tracking-widest flex items-center gap-2">
            <RiRefreshLine className={loading ? "animate-spin" : ""} /> Refresh_Archives
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <MetricBlock label="Total Visits" value={metrics?.total_visits || 0} color="text-cyan-500" />
          <MetricBlock label="Signal Inbox" value={metrics?.total_messages || 0} color="text-white" />
          <MetricBlock label="Filtered Nodes" value={filteredProjects?.length || 0} color="text-cyan-500" />
          <MetricBlock label="System Latency" value="24ms" color="text-green-500" />
        </div>

        {/* Project Registry Section */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-12 shadow-2xl">
          
          {/* Internal Dashboard Tabs */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
            <div className="flex items-center gap-4">
              <RiFilter3Line className="text-cyan-500" size={20} />
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-4 py-2 rounded-xl text-[9px] font-mono uppercase tracking-widest transition-all ${
                      activeTab === cat.id 
                        ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]" 
                        : "text-gray-500 hover:text-gray-300 bg-white/5 border border-transparent"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setShowProjectModal(true)}
              className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center gap-2"
            >
              <RiAddLine size={16} /> New_Project_Node
            </button>
          </div>

          {/* Filtered Project List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects?.map((proj) => (
              <div key={proj.id} className="bg-white/[0.01] border border-white/5 p-8 rounded-[2.5rem] group hover:border-cyan-500/30 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[8px] font-mono text-cyan-500/50 uppercase tracking-[0.2em] px-2 py-1 bg-cyan-500/5 rounded border border-cyan-500/10">
                    {proj.category}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingProject(proj); setShowProjectModal(true); }} className="p-2 text-gray-600 hover:text-cyan-400">
                      <RiEditLine size={18} />
                    </button>
                    <button onClick={(e) => deleteItem('project', proj.id, e)} className="p-2 text-gray-600 hover:text-red-500">
                      <RiDeleteBinLine size={18} />
                    </button>
                  </div>
                </div>
                <h4 className="text-xl font-bold italic uppercase tracking-tighter group-hover:text-cyan-400 transition-colors">{proj.title}</h4>
                <p className="text-gray-500 text-xs line-clamp-2 font-light mt-2">{proj.description}</p>
              </div>
            ))}
            {filteredProjects?.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-[2.5rem]">
                <p className="text-gray-600 font-mono text-[10px] uppercase tracking-[0.4em]">No archive nodes found in this sector.</p>
              </div>
            )}
          </div>
        </div>

        {/* Signals Section (Bottom) */}
        <div className="mt-12 bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 backdrop-blur-xl">
           <h3 className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.3em] mb-8">Incoming_Signal_Logs</h3>
           <div className="space-y-3">
              {metrics?.recent_messages?.map((m) => (
                <div key={m.id} onClick={() => setSelectedMessage(m)} className="flex items-center justify-between p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.03] cursor-pointer transition-all">
                  <div className="flex items-center gap-6">
                    <span className="text-[8px] font-mono text-gray-700">{m.created_at}</span>
                    <h5 className="text-sm font-bold italic text-gray-200">{m.name}</h5>
                  </div>
                  <button onClick={(e) => deleteItem('message', m.id, e)} className="text-gray-600 hover:text-red-500">
                    <RiDeleteBinLine size={16} />
                  </button>
                </div>
              ))}
           </div>
        </div>

      </div>

      <ProjectModal isOpen={showProjectModal} onClose={() => { setShowProjectModal(false); setEditingProject(null); }} refreshData={fetchMetrics} editData={editingProject} />
      <MessageModal message={selectedMessage} onClose={() => setSelectedMessage(null)} />
    </div>
  );
}

function MetricBlock({ label, value, color }) {
  return (
    <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-white/10 transition-all group">
      <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest mb-2 group-hover:text-cyan-500 transition-colors">{label}</p>
      <p className={`text-3xl font-bold italic tracking-tighter ${color}`}>{value}</p>
    </div>
  );
}