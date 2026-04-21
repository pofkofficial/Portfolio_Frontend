import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProjectMatrix() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Assuming your Flask/Node backend is running on 5000
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Archive connection failed:", err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 p-4 max-w-7xl mx-auto auto-rows-[300px]">
      {projects.map((p, i) => {
        // Dynamic grid spans for that 'Bento' feel
        // Large cards for every 1st and 4th item
        const isLarge = i % 3 === 0; 
        
        return (
          <motion.div
            key={p.id || i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={`relative group p-8 flex flex-col justify-between overflow-hidden
              bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem]
              hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all duration-500
              ${isLarge ? 'md:col-span-4' : 'md:col-span-2'}`}
          >
            {/* Background Glow Effect */}
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10 transition-colors" />

            <div>
              <div className="flex justify-between items-start">
                <span className="text-cyan-500 font-mono text-[10px] tracking-[0.3em] uppercase">
                  {p.category || 'System Module'}
                </span>
                {/* Tech Badge */}
                <div className="px-2 py-1 rounded-md border border-white/5 bg-white/5 text-[9px] font-mono text-gray-500">
                  v2.0.4
                </div>
              </div>

              <h3 className={`font-bold mt-4 tracking-tight italic text-white group-hover:text-cyan-400 transition-colors
                ${isLarge ? 'text-4xl' : 'text-2xl'}`}>
                {p.title}
              </h3>
              
              <p className="text-gray-400 mt-4 leading-relaxed text-sm line-clamp-3 font-poppins">
                {p.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-8">
              <a 
                href={p.link} 
                className="group/btn flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-500/80 hover:text-cyan-400 transition-colors"
              >
                Execute Protocol 
                <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
              </a>
              
              {/* Decorative data indicator */}
              <div className="flex gap-1">
                {[1, 2, 3].map(dot => (
                  <div key={dot} className="w-1 h-1 rounded-full bg-white/10 group-hover:bg-cyan-500/40 transition-colors" />
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}