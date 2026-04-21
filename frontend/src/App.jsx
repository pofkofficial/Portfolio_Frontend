import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import ProjectMatrix from './components/ProjectMatrix';
import Contact from './components/Contact';
import NeuralScene from './components/NeuralScene';
import AIAgent from './components/AIAgent'; 
import AdminDashboard from './components/admin/AdminDashboard'; 
import AdminLogin from './components/admin/AdminLogin';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import BentoGrid from './components/BentoGrid';

axios.defaults.withCredentials = true;
export default function App() {
  // 1. Core Auth State: This controls which branch of the app is visible
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* === ADMIN NODE: Protected via State === */}
        <Route 
          path="/admin" 
          element={
            isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin/login" replace />
          } 
        />
        
        <Route 
          path="/admin/login" 
          element={
            isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin setAuth={setIsAuthenticated} />
          } 
        />

        {/* === VISITOR NODE: The Public Interface === */}
        <Route path="/" element={
          <div className="bg-transparent min-h-screen text-white overflow-hidden relative selection:bg-cyan-500/30">
            
            <Toaster 
              position="top-center" 
              toastOptions={{
                duration: 5000,
                style: {
                  background: 'rgba(8, 51, 68, 0.8)',
                  color: '#22d3ee',
                  border: '1px solid rgba(22, 78, 99, 0.5)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '12px',
                  backdropFilter: 'blur(12px)'
                },
              }}
            />

            <NeuralScene /> 
            <Sidebar />
            
            <main 
              id="main-viewport" 
              className="snap-y snap-mandatory overflow-y-auto h-screen no-scrollbar relative z-10"
            >
              <section id="home" className="snap-start">
                  <Hero />
              </section>

              <section id="about" className="snap-start">
                  <About />
              </section>
              
              <section id="projects" className="snap-start min-h-screen py-24 flex flex-col justify-center bg-transparent">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-10 mb-12">
                    <div className="inline-block px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[10px] uppercase tracking-widest mb-4 font-mono">
                      Status: Active // Fetching_Data
                    </div>
                    <h2 className="text-4xl md:text-6xl font-mono text-white tracking-tighter uppercase font-bold italic">
                      Protocol <span className="text-cyan-500">Archive</span>
                    </h2>
                </div>
                  
                <BentoGrid />
              </section>

              <section id="contact" className="snap-start">
                  <Contact />
                  
              </section>
              
            </main>

            {/* Akosua is only rendered on the visitor side */}
            <AIAgent />
          </div>
        } />
      </Routes>
    </Router>
  );
}