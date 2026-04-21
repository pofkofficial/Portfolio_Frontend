import { useState, useEffect } from "react";
import { IoHomeOutline, IoLayersOutline, IoMailOutline, IoPersonOutline } from "react-icons/io5";

const NAV_ITEMS = [
  { id: "home", icon: IoHomeOutline, size: 26 },
  { id: "about", icon: IoPersonOutline, size: 24 },
  { id: "projects", icon: IoLayersOutline, size: 26 },
  { id: "contact", icon: IoMailOutline, size: 26 },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");

  const navTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // We observe when sections enter the middle of the screen
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-40% 0px -40% 0px", // triggers when section hits the center 20% of screen
      threshold: 0,
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    NAV_ITEMS.forEach((item) => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="fixed left-0 top-0 h-screen w-[80px] lg:w-[100px] hidden md:flex items-center justify-center z-50 pointer-events-none">
      <div className="flex flex-col gap-8 bg-[#020617]/40 backdrop-blur-2xl py-8 px-3 rounded-full border border-white/5 pointer-events-auto shadow-2xl shadow-black/50">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => navTo(item.id)}
              className="relative group flex items-center justify-center"
            >
              {/* Tooltip */}
              <span className="absolute left-16 bg-cyan-950 text-cyan-400 text-[10px] font-mono px-3 py-1 rounded border border-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest">
                {item.id}
              </span>

              {/* Active Indicator Dot */}
              {isActive && (
                <div className="absolute -left-1 w-1 h-1 bg-cyan-400 rounded-full blur-[2px] shadow-[0_0_8px_#22d3ee]" />
              )}

              <div className={`transition-all duration-500 p-3 rounded-xl ${
                isActive 
                  ? "text-cyan-400 scale-110 bg-cyan-500/10 shadow-[inset_0_0_10px_rgba(34,211,238,0.1)]" 
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
              }`}>
                <Icon size={item.size} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}