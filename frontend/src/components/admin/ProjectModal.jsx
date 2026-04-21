import { useState, useEffect, useRef } from 'react';
import api from '/src/api'; // Standardized API instance
import toast from 'react-hot-toast';
import { RiCloseLine, RiArrowDownSLine, RiCheckboxCircleFill } from 'react-icons/ri';

export default function ProjectModal({ isOpen, onClose, refreshData, editData }) {
  const [isTechOpen, setIsTechOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    technologies: [],
    link: '',
  });

  const categories = [
    ["Software Engineering", 'software'],
    ["Data Science", 'analytics'],
    ["UI Design", 'ui']
  ];

  const techStack = [
    "python", "flask", "django", "react", "node.js", 
    "mongodb", "postgre", "tailwind", "javascript", 
    "excel", "tableau", "figma", "google sheet"
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTechOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (editData && isOpen) {
      setFormData({
        title: editData.title || '',
        category: editData.category || '',
        description: editData.description || '',
        technologies: typeof editData.technologies === 'string' 
          ? editData.technologies.split(',').map(t => t.trim()) 
          : editData.technologies || [],
        link: editData.link || '',
      });
    } else {
      setFormData({ title: '', category: '', description: '', technologies: [], link: '' });
    }
    setIsTechOpen(false);
  }, [editData, isOpen]);

  const toggleTech = (tech) => {
    setFormData(prev => {
      const isSelected = prev.technologies.includes(tech);
      return {
        ...prev,
        technologies: isSelected 
          ? prev.technologies.filter(t => t !== tech) 
          : [...prev.technologies, tech]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return toast.error("Select a protocol category.");

    try {
      // Sending as standard JSON if no image file is being uploaded
      // If you plan to add image uploads later, switch back to FormData
      const payload = {
        ...formData,
        technologies: formData.technologies.join(', ')
      };

      const url = editData 
        ? `/api/admin/projects/${editData.id}` 
        : '/api/admin/projects';
      
      const method = editData ? 'put' : 'post';

      await api[method](url, payload);

      toast.success(editData ? "Node Updated." : "Node Archived.", {
        style: { background: '#083344', color: '#22d3ee', fontFamily: 'Space Mono' }
      });
      
      refreshData();
      onClose();
    } catch (err) {
      toast.error("Handshake Refused.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
      <div className="bg-[#050505] border border-white/10 w-full max-w-2xl rounded-[3rem] overflow-hidden shadow-2xl relative">
        
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-center p-10 border-b border-white/5 bg-white/[0.01]">
            <div>
              <span className="text-[9px] font-mono text-cyan-500 uppercase tracking-[0.4em] mb-1 block">Protocol_Entry</span>
              <h2 className="text-2xl font-bold italic text-white uppercase tracking-tighter">
                {editData ? 'Edit' : 'Initialize'} <span className="text-cyan-500">Node</span>
              </h2>
            </div>
            <button onClick={onClose} className="p-2 text-gray-500 hover:text-white bg-white/5 rounded-xl"><RiCloseLine size={24} /></button>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-600 uppercase tracking-widest ml-1">Node_Title</label>
                <input required value={formData.title} className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-cyan-500/30 outline-none transition-all" onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-[10px] font-mono text-gray-600 uppercase tracking-widest ml-1">Sector_Category</label>
                <select required className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm text-white outline-none focus:border-cyan-500/30" onChange={e => setFormData({...formData, category: e.target.value})} value={formData.category}>
                  <option value="" disabled className="bg-[#0a0a0a]">Select Sector</option>
                  {categories.map(cat => <option key={cat[0]} value={cat[1]} className="bg-[#0a0a0a]">{cat[0]}</option>)}
                </select>
              </div>
            </div>

            {/* Tech Stack Multi-Select */}
            <div className="space-y-2" ref={dropdownRef}>
              <label className="text-[10px] font-mono text-gray-600 uppercase tracking-widest ml-1">Tech_Stack_Array</label>
              <div 
                onClick={() => setIsTechOpen(!isTechOpen)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 cursor-pointer flex justify-between items-center min-h-[56px] hover:bg-white/[0.04] transition-all"
              >
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.length > 0 
                    ? formData.technologies.map(t => (
                        <span key={t} className="bg-cyan-500/5 text-cyan-400 text-[10px] px-3 py-1 rounded-lg border border-cyan-500/10 font-mono">
                          {t}
                        </span>
                      ))
                    : <span className="text-gray-700 text-sm">Select Dependencies...</span>}
                </div>
                <RiArrowDownSLine className={`text-gray-600 transition-transform ${isTechOpen ? 'rotate-180' : ''}`} />
              </div>

              {isTechOpen && (
                <div className="absolute z-50 mt-2 w-[calc(100%-80px)] bg-[#0a0a0a] border border-white/10 rounded-3xl grid grid-cols-2 lg:grid-cols-3 p-6 gap-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-3xl">
                  {techStack.map(tech => (
                    <div 
                      key={tech} 
                      onClick={() => toggleTech(tech)}
                      className={`flex items-center gap-3 cursor-pointer p-3 rounded-xl transition-all border ${
                        formData.technologies.includes(tech) 
                          ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                          : 'border-transparent text-gray-500 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        formData.technologies.includes(tech) ? 'bg-cyan-400 border-cyan-400' : 'border-white/20'
                      }`}>
                        {formData.technologies.includes(tech) && <RiCheckboxCircleFill className="text-black text-xs" />}
                      </div>
                      <span className="text-[11px] font-mono lowercase">{tech}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* GitHub/Live Link */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-600 uppercase tracking-widest ml-1">Archive_Access_Link</label>
              <input
                value={formData.link}
                placeholder="https://github.com/KwesiCoder/..."
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-xs font-mono text-cyan-500 focus:border-cyan-500/30 outline-none transition-all placeholder:text-gray-800"
                onChange={e => setFormData({...formData, link: e.target.value})}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-gray-600 uppercase tracking-widest ml-1">Technical_Overview</label>
              <textarea required value={formData.description} rows="4" className="w-full bg-white/[0.02] border border-white/10 rounded-2xl p-4 text-sm text-gray-300 focus:border-cyan-500/30 outline-none transition-all leading-relaxed" onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <button className="w-full py-5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl font-bold uppercase text-[11px] tracking-[0.4em] transition-all shadow-xl shadow-cyan-900/10 active:scale-[0.98]">
              {editData ? "Push_System_Updates" : "Initialize_Deployment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}