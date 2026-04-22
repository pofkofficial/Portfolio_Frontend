import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import api from '../api'; // Centralized API instance
import { RiUserSharedLine } from 'react-icons/ri';
import KwesiLogo from './logo';
export default function Hero() {
  const [visitCount, setVisitCount] = useState('---');

  useEffect(() => {
    // 1. Track visit & Fetch stats using the new api instance
    const initializeStats = async () => {
      try {
        // We use the shorthand because api.js already has the base URL
        await api.post('/api/track_visit');
        const res = await api.get('/api/visit_stats');
        setVisitCount(res.data.total_visitors);
      } catch (err) {
        console.error("Neural Link Offline:", err);
        setVisitCount('OFFLINE');
      }
    };
    
    initializeStats();
  }, []);

  return (
    <section className="home-container h-screen w-full relative overflow-hidden flex flex-col items-center justify-center px-6">
      
      {/* Top Left: KwesiCoder Neural Proxy Logo */}
      <div className="absolute top-6 left-6 md:top-10 md:left-12 group cursor-pointer">
        <KwesiLogo className="w-10 h-10 md:w-14 md:h-14 transition-all duration-500 group-hover:scale-110" />
        
        {/* Optional: Label that appears on hover */}
        <span className="absolute left-full ml-4 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.2em] text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase font-mono">
          Kwesi_Coder
        </span>
      </div>

      {/* Top Right: Visitor Counter */}
      <div className="absolute top-6 right-6 md:top-10 md:right-10 flex flex-col items-end">
        <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-white/[0.03] border border-white/10 rounded-full backdrop-blur-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
          {/* Label updated to reflect unique users */}
          <span className="font-mono text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest">Unique_Nodes:</span>
          <span className="font-mono text-xs text-white font-bold">{visitCount}</span>
          <RiUserSharedLine className="text-cyan-500/50 hidden md:block" size={14} />
        </div>
        <p className="text-[8px] font-mono text-gray-600 mt-1 uppercase tracking-tighter">Verified_Visitors_Sync</p>
      </div>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10"
      >
        {/* Responsive Typography: text-5xl for mobile, text-7xl for tablet, text-[10rem] for desktop */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none select-none">
          KWESI<span className="text-cyan-500">CODER</span>
        </h1>
        
        <div className="flex items-center justify-center gap-4 md:gap-6 mt-4 md:mt-6">
            <div className="h-px w-8 md:w-16 bg-white/20"></div>
            {/* UPDATED TITLE */}
            <p className="font-mono text-cyan-400 uppercase tracking-[0.2em] md:tracking-[0.4em] text-[10px] md:text-sm">
              Software Engineer
            </p>
            <div className="h-px w-8 md:w-16 bg-white/20"></div>
        </div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-mono text-gray-600 uppercase tracking-[0.3em]">Initiate_Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent"></div>
      </motion.div>

    </section>
  );
}