import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiRobot2Line, RiSendPlane2Fill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import api from '../api'; // Use your centralized API instance

export default function AkosuaAgent() {
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(
    "Hi, I'm Akosua, Kwesi's proxy. I can help you navigate his project archives or discuss his software engineering expertise. What's on your mind?"
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const userQuery = input;
    setInput("");

    try {
      // Use the 'api' instance
      const response = await api.post('/api/agent/chat', { message: userQuery });
      let reply = response.data.reply;

      // Handle Component Scents (Scroll Logic)
      const scrollTargets = {
        "[SCROLL_PROJECTS]": 'projects-section',
        "[SCROLL_CONTACT]": 'contact-section',
        "[SCROLL_ABOUT]": 'about-container'
      };

      Object.entries(scrollTargets).forEach(([tag, id]) => {
        if (reply.includes(tag)) {
          setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
          reply = reply.replace(tag, "");
        }
      });

      // Handle Automated Message Logging
      if (reply.includes("[SAVE_MESSAGE]")) {
        await api.post('/api/send_message', {
          name: "Akosua Proxy",
          email: "proxy@neural.link",
          message: `Inquiry captured: ${userQuery}`,
          subject: "AI Agent Log"
        });
        reply = reply.replace("[SAVE_MESSAGE]", " ✓");
      }

      setDisplayMessage(reply.trim());
    } catch (error) {
      setDisplayMessage("Neural link unstable. Please re-initiate transmission.");
      console.error("Agent Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 50, opacity: 0, x: "-50%" }}
          animate={{ y: 0, opacity: 1, x: "-50%" }}
          className="fixed bottom-6 left-1/2 z-[100] w-[92%] max-w-xl md:max-w-2xl"
        >
          <div className="bg-[#0a0a0a]/80 backdrop-blur-3xl border border-cyan-500/30 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-6 shadow-[0_0_50px_-12px_rgba(6,182,212,0.3)]">
            <div className="flex items-start gap-4">
              {/* Agent Avatar */}
              <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-500/10 rounded-full flex items-center justify-center border border-cyan-500/30 shrink-0">
                <RiRobot2Line className={`text-cyan-400 text-xl md:text-2xl ${loading ? 'animate-spin-slow' : ''}`} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-3">
                  <p className="text-[9px] font-mono text-cyan-500 uppercase tracking-widest mb-1">Akosua_v1.0 // Neural_Proxy</p>
                  
                  <div className="max-h-[150px] md:max-h-[200px] overflow-y-auto pr-2 custom-scrollbar transition-all">
                    <div className="text-sm text-gray-300 leading-relaxed font-light">
                      {loading ? (
                        <div className="flex gap-1 items-center">
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1 h-1 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      ) : (
                        <ReactMarkdown 
                          components={{ p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} /> }}
                        >
                          {displayMessage}
                        </ReactMarkdown>
                      )}
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    placeholder="Query the proxy..." 
                    className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 pr-12 text-sm outline-none focus:border-cyan-500/50 transition-all text-white placeholder:text-gray-600 font-mono"
                  />
                  <button 
                    type="submit" 
                    disabled={loading || !input.trim()} 
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-600 rounded-lg md:rounded-xl text-white hover:bg-cyan-500 disabled:bg-gray-800 disabled:text-gray-600 transition-all"
                  >
                    <RiSendPlane2Fill size={18} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}