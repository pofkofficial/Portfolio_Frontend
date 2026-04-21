import { useEffect } from 'react';
import { RiCloseLine, RiMailSendLine, RiTimeLine } from 'react-icons/ri';

export default function MessageModal({ message, onClose }) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!message) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#050505] border border-white/10 w-full max-w-xl rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in-95 duration-300">
        
        {/* Decorative Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_2px,3px_100%]" />

        {/* Modal Header */}
        <div className="relative z-20 p-8 md:p-10 border-b border-white/5 bg-white/[0.01] flex justify-between items-start">
          <div className="flex gap-5">
            <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-500 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
               <RiMailSendLine size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />
                <h2 className="text-white font-bold italic text-xl tracking-tighter uppercase">{message.name}</h2>
              </div>
              <p className="text-cyan-500/50 text-[10px] font-mono tracking-widest uppercase">{message.email}</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 text-gray-600 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all"
          >
            <RiCloseLine size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="relative z-20 p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
             <div className="h-[1px] flex-1 bg-white/5" />
             <p className="text-gray-600 text-[9px] font-mono uppercase tracking-[0.4em]">Decrypted_Payload</p>
             <div className="h-[1px] flex-1 bg-white/5" />
          </div>

          <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] relative group">
            {/* Quote marks aesthetic */}
            <span className="absolute top-4 left-4 text-4xl text-white/5 font-serif select-none">“</span>
            <p className="text-gray-300 leading-relaxed font-light text-base relative z-10">
              {message.message}
            </p>
            <span className="absolute bottom-4 right-4 text-4xl text-white/5 font-serif select-none">”</span>
          </div>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-gray-600">
              <RiTimeLine size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest">{message.created_at}</span>
            </div>
            
            <a 
              href={`mailto:${message.email}`} 
              className="px-6 py-3 bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-widest rounded-xl border border-cyan-500/20 hover:bg-cyan-500 hover:text-white transition-all shadow-lg shadow-cyan-500/5"
            >
              Initialize Reply
            </a>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="p-4 bg-black/40 border-t border-white/5 text-center">
            <p className="text-[8px] font-mono text-gray-800 uppercase tracking-[0.8em]">End_Of_Transmission</p>
        </div>
      </div>
    </div>
  );
}