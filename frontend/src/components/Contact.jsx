import { useState } from 'react';
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { BiLoaderAlt } from "react-icons/bi";
import toast from 'react-hot-toast';
import api from '../api'; // Centralized API instance

export default function Contact() {
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const socialLinks = [
    { icon: <FaGithub size={20} />, href: "https://github.com/pofkofficial", color: "hover:text-cyan-400", bg: "hover:bg-cyan-500/10" },
    { icon: <FaLinkedin size={20} />, href: "https://linkedin.com/in/pofkofficial", color: "hover:text-blue-400", bg: "hover:bg-blue-500/10" },
    { icon: <FaYoutube size={20} />, href: "https://youtube.com/@kwesiCoder", color: "hover:text-red-500", bg: "hover:bg-red-500/10" },
  ];

  const handleHandshake = async (e) => {
    e.preventDefault();
    setIsTransmitting(true);

    const payload = {
      ...formData,
      subject: `Inquiry from ${formData.name}`
    };

    try {
      const res = await api.post('/api/send_message', payload);

      if (res.data.status === 'success') {
        toast.success('Signal Received. Handshake Complete.', {
          style: {
            borderRadius: '1rem',
            background: '#083344',
            color: '#22d3ee',
            border: '1px solid #164e63',
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px'
          },
          iconTheme: { primary: '#22d3ee', secondary: '#083344' },
        });
        setFormData({ name: '', email: '', message: '' }); 
      }
    } catch (err) {
      console.error("Connection Interrupted:", err);
      toast.error('Transmission Failed. Protocol Offline.', {
        style: {
          borderRadius: '1rem',
          background: '#450a0a',
          color: '#f87171',
          border: '1px solid #7f1d1d',
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px'
        }
      });
    } finally {
      setIsTransmitting(false);
    }
  };

  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background Depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -z-10 animate-pulse" />

      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-5 bg-white/[0.02] backdrop-blur-3xl rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
        
        {/* Left Info Panel */}
        <div className="lg:col-span-2 p-10 md:p-14 bg-white/[0.01] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-500 text-[9px] uppercase tracking-[0.2em] font-mono">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
              Signal Protocol v2.0
            </div>
            <h2 className="text-4xl md:text-5xl font-bold italic text-white leading-tight tracking-tighter uppercase">
              Initiate <span className="text-cyan-500">Contact</span>
            </h2>
            <p className="text-gray-400 font-light leading-relaxed text-sm max-w-xs">
              Direct peer-to-peer communication for systems architecture, software engineering, and strategic data intelligence.
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.4em] text-gray-600 font-mono">External_Nodes</p>
            <div className="flex gap-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-12 h-12 flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 text-gray-400 transition-all duration-500 group ${link.bg} ${link.color}`}
                >
                  <div className="group-hover:scale-110 transition-transform">
                    {link.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <form onSubmit={handleHandshake} className="lg:col-span-3 p-10 md:p-14 flex flex-col gap-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-cyan-500/60 ml-1 font-mono">Identity_Module</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Full Name" 
                className="w-full bg-white/[0.02] border border-white/10 p-4 rounded-xl focus:border-cyan-500/40 focus:bg-white/[0.04] outline-none text-white transition-all placeholder:text-gray-700 text-sm font-mono" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] uppercase tracking-widest text-cyan-500/60 ml-1 font-mono">Encryption_Route</label>
              <input 
                required
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Email Address" 
                className="w-full bg-white/[0.02] border border-white/10 p-4 rounded-xl focus:border-cyan-500/40 focus:bg-white/[0.04] outline-none text-white transition-all placeholder:text-gray-700 text-sm font-mono" 
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-cyan-500/60 ml-1 font-mono">Data_Packet_Payload</label>
            <textarea 
              required
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="System specifications or project inquiry..." 
              rows="6" 
              className="w-full bg-white/[0.02] border border-white/10 p-4 rounded-xl focus:border-cyan-500/40 focus:bg-white/[0.04] outline-none text-white transition-all placeholder:text-gray-700 resize-none text-sm font-mono"
            ></textarea>
          </div>

          <button 
            type="submit"
            disabled={isTransmitting}
            className="group relative h-14 w-full sm:w-56 mt-4 bg-cyan-600/90 text-white rounded-xl font-mono text-xs uppercase tracking-widest transition-all hover:bg-cyan-500 disabled:opacity-50 overflow-hidden flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/10"
          >
            {isTransmitting ? (
              <BiLoaderAlt size={16} className="animate-spin" />
            ) : (
              <>
                <IoSend size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                Transmit_Signal
              </>
            )}
          </button>
        </form>
      </div>

      <footer className="mt-16 text-center text-[10px] tracking-[0.5em] text-gray-600 uppercase font-mono px-4 leading-relaxed">
        KwesiCoder // Systems_Architect // 05°36'N 00°11'W // Accra, GH
      </footer>
    </section>
  );
}