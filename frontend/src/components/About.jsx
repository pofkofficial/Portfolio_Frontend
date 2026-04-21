import { motion } from 'framer-motion';

export default function About() {
  const stats = [
    { label: 'Experience', value: '3+ Years' },
    { label: 'Specialization', value: 'Software Engineering' },
    { label: 'Location', value: 'Accra, Ghana' },
  ];

  const modules = [
    { name: "Engineering", icon: "⚙️", desc: "Building scalable applications and efficient database architectures." },
    { name: "Analysis", icon: "📊", desc: "Translating data into actionable intelligence and strategic proposals." },
    { name: "Operations", icon: "🚀", desc: "Optimizing workflows through technical precision and project management." }
  ];

  const techStack = [
    'Python', 'Django', 'Flask', 'React', 'Node.js', 
    'PostgreSQL', 'MongoDB', 'Figma', 'Tableau', 'Excel'
  ];

  return (
    <section className="about-container min-h-screen py-20 md:py-32 px-6 flex items-center justify-center relative overflow-hidden">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Main Bio - Large Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 bg-white/[0.03] backdrop-blur-3xl p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Text */}
          <div className="absolute -right-6 -top-6 text-9xl font-bold text-white/[0.02] select-none pointer-events-none italic hidden md:block">
            BIO
          </div>

          <h2 className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em] mb-6">
            Identity // Prince Fabrice Kwesi Opoku
          </h2>
          
          <h3 className="text-3xl md:text-5xl font-bold italic mb-8 leading-tight text-white">
            Engineering digital solutions with <span className="text-cyan-500 underline decoration-white/10 underline-offset-8">intent</span>.
          </h3>
          
          <p className="text-gray-400 leading-relaxed font-poppins text-base md:text-lg mb-10 max-w-2xl">
            I am a Software Engineer dedicated to building high-performance systems and managing technical complexity. 
            My approach merges hands-on full-stack development with strategic project analysis—specializing in 
            transforming conceptual logic into robust, scalable infrastructure.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/5">
            {stats.map((stat, i) => (
              <div key={i}>
                <p className="text-[9px] uppercase tracking-widest text-gray-500 mb-1 font-mono">{stat.label}</p>
                <p className="text-base md:text-lg font-bold text-white italic">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Modules - Side Column */}
        <div className="md:col-span-4 flex flex-col gap-6">
          
          {/* Module: Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-cyan-500/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-cyan-500/20"
          >
            <h4 className="text-white font-bold mb-6 uppercase tracking-tighter flex items-center gap-2 text-sm">
              <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" /> Tech Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-mono text-cyan-400 hover:border-cyan-500/50 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Module: System Capability */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 flex-1"
          >
            <h4 className="text-white font-bold mb-6 uppercase tracking-tighter text-sm">System Capability</h4>
            <div className="space-y-6">
              {modules.map((mod, i) => (
                <div key={i} className="group">
                  <p className="text-xs font-bold text-gray-300 flex items-center gap-2 group-hover:text-cyan-400 transition-colors">
                    <span className="text-xs">{mod.icon}</span> {mod.name}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}