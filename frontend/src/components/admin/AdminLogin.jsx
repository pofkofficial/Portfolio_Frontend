import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '/src/api'; // Swapped to standardized instance
import toast from 'react-hot-toast';
import { RiShieldKeyholeLine, RiLoader4Line } from 'react-icons/ri';

export default function AdminLogin({ setAuth }) {
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Using the central API instance ensures withCredentials and baseURL are consistent
      const res = await api.post('/api/admin/login', creds);

      if (res.data.success) {
        toast.success(res.data.message || "Protocol Verified. Access Granted.", {
          style: {
            borderRadius: '1rem',
            background: '#083344',
            color: '#22d3ee',
            border: '1px solid #164e63',
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px'
          },
        });
        
        setAuth(true); 
        navigate('/admin'); 
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Connection Protocol Failed.";
      toast.error(errorMsg, {
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
      setIsProcessing(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#050505] p-6 relative overflow-hidden">
      {/* Background Security Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-white/[0.01] border border-white/5 p-10 lg:p-14 rounded-[3rem] backdrop-blur-3xl shadow-2xl relative z-10">
        
        {/* Security Badge */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
            <div className="relative p-5 bg-black border border-white/10 rounded-[2rem] text-cyan-500 shadow-inner">
              <RiShieldKeyholeLine size={40} />
            </div>
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold italic uppercase tracking-tighter text-white">System <span className="text-cyan-500">Auth</span></h2>
          <p className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.5em] mt-3">Node_Accra // Secure_Gateway_v2.0</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-cyan-500/50 ml-2 font-mono">Operator_Identity</label>
            <input 
              required
              type="text" 
              autoComplete="username"
              value={creds.username}
              placeholder="Username" 
              className="w-full bg-white/[0.02] border border-white/10 p-4 rounded-2xl focus:border-cyan-500/30 focus:bg-white/[0.04] outline-none text-white transition-all placeholder:text-gray-800 text-sm font-mono"
              onChange={e => setCreds({...creds, username: e.target.value})}
            />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-widest text-cyan-500/50 ml-2 font-mono">Access_Cipher</label>
            <input 
              required
              type="password" 
              autoComplete="current-password"
              value={creds.password}
              placeholder="••••••••" 
              className="w-full bg-white/[0.02] border border-white/10 p-4 rounded-2xl focus:border-cyan-500/30 focus:bg-white/[0.04] outline-none text-white transition-all placeholder:text-gray-800 text-sm font-mono"
              onChange={e => setCreds({...creds, password: e.target.value})}
            />
          </div>
          
          <button 
            type="submit"
            disabled={isProcessing}
            className="w-full bg-cyan-600/90 hover:bg-cyan-500 text-white py-5 rounded-2xl font-mono font-bold uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg shadow-cyan-900/20 disabled:opacity-50 flex items-center justify-center gap-3 mt-8"
          >
            {isProcessing ? (
              <>
                <RiLoader4Line size={18} className="animate-spin" />
                Validating...
              </>
            ) : (
              "Initialize Session"
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-[8px] font-mono text-gray-700 uppercase tracking-widest">
            Authorized Personnel Only // Encrypted via TLS 1.3
          </p>
        </div>
      </div>
    </div>
  );
}