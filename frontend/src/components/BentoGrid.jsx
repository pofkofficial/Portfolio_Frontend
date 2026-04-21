import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const TABS = [
  { id: 'all', label: 'All_Units' },
  { id: 'software', label: 'Systems_Dev' },
  { id: 'ui', label: 'Interface_Design' },
  { id: 'analytics', label: 'Data_Intelligence' }
];

export default function BentoGrid() {
  const [projects, setProjects] = useState([]);
  const [selectedTab, setSelectedTab] = useState('all');
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/api/projects');
        setProjects(res.data);
      } catch (err) {
        console.error("Archive sync failed:", err);
      } finally {
        setIsSyncing(false);
      }
    };
    fetchData();
  }, []);

  const filteredProjects = selectedTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedTab);

  return (
    <div className="max-w-7xl mx-auto px-6 py-14" id="projects-section">
      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 bg-cyan-500 animate-pulse"></div>
            <h2 className="text-sm font-mono text-cyan-500 uppercase tracking-[0.5em]">Project_Archives</h2>
          </div>
          <p className="text-gray-500 text-[10px] font-mono max-w-sm leading-relaxed border-l border-white/10 pl-4 uppercase tracking-tighter">
            Scroll to navigate deep-storage archives. <br/>
            [Status: System_Functional]
          </p>
        </div>

        <div className="flex flex-wrap gap-2 bg-white/[0.02] p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`px-5 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all duration-500 relative ${
                selectedTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="relative z-10">{tab.label}</span>
              {selectedTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/30 rounded-xl z-0"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- INTERNAL SCROLL VIEWPORT --- */}
      <div className="h-[700px] overflow-y-auto pr-6 custom-scrollbar scroll-smooth relative">
        {isSyncing ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-cyan-500 font-mono text-[10px] animate-pulse tracking-[0.3em]">
              SYNCING_DATABASES...
            </span>
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20"
          >
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className={`group relative glow-card px-8 py-10 rounded-[2.5rem] min-h-[420px] flex flex-col justify-between border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-700
                    ${i % 4 === 0 ? 'lg:col-span-2' : 'lg:col-span-1'} 
                    ${i % 7 === 0 ? 'lg:col-span-2' : ''}`}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <span className="font-mono text-5xl italic font-black text-white tracking-tighter">0{p.id}</span>
                  </div>

                  <div>
                    <div className="mb-8">
                      <span className="text-cyan-500 text-[9px] font-mono uppercase tracking-[0.2em] px-3 py-1 bg-cyan-500/5 rounded border border-cyan-500/20">
                        {p.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tighter uppercase italic leading-tight text-gray-100 break-words hyphens-auto min-h-[3.5rem] flex items-center">
                      {p.title}
                    </h3>
                    
                    <p className="text-gray-400 mt-5 text-xs sm:text-sm leading-relaxed font-light line-clamp-3">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                      {p.technologies?.split(',').map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-[8px] font-mono text-cyan-400/50 border border-cyan-500/10 px-2.5 py-1 rounded bg-cyan-500/5 lowercase"
                        >
                          #{tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-12 pt-8 border-t border-white/5">
                    <a 
                      href={p.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group/btn text-[10px] font-mono uppercase tracking-widest text-gray-500 hover:text-cyan-400 transition-all flex items-center gap-4"
                    >
                      <div className="w-8 h-[1px] bg-gray-800 group-hover/btn:w-12 group-hover/btn:bg-cyan-500 transition-all duration-500"></div>
                      Open_Protocol
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}