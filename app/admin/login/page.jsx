"use client";

import { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  LogIn, 
  HelpCircle 
} from 'lucide-react';

export default function AdminLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error de login:", data.error);
        setIsLoading(false);
        return;
      }

      window.location.href = "/admin/dashboard";

    } catch (error) {
      console.error("Error de red:", error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0b0f1a] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[450px] relative z-10">
        
        <div className="flex flex-col items-center mb-10 group">
          <div className="bg-emerald-600 p-4 rounded-[2rem] shadow-2xl shadow-emerald-900/40 mb-6 transition-transform group-hover:scale-110 duration-500">
            <ShieldCheck size={40} className="text-white" />
          </div>
          
          <div className="bg-white/5 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <img src="/images/404news-logo.png" alt="404news" className="w-64 object-contain"/>
          </div>
          
          <div className="mt-4 flex items-center space-x-2">
            <div className="h-px w-4 bg-slate-800"></div>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Panel de Control</span>
            <div className="h-px w-4 bg-slate-800"></div>
          </div>
        </div>

        <div className="bg-[#161b2a] rounded-[2.5rem] border border-slate-800 p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-emerald-600 to-blue-600"></div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-2">Bienvenido</h2>
            <p className="text-sm text-slate-500">Introduce tus credenciales para acceder al sistema de gestión.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase ml-1 tracking-widest">Nombre de usuario</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-slate-600 group-focus-within:text-emerald-500 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  required
                  placeholder="admin_editor"
                  className="w-full bg-[#0b0f1a] border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50 transition-all text-white placeholder:text-slate-800"
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Contraseña</label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center text-slate-600 group-focus-within:text-emerald-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input type={showPassword ? "text" : "password"} required placeholder="••••••••••••"
                  className="w-full bg-[#0b0f1a] border border-slate-800 rounded-2xl pl-12 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600/50 transition-all text-white placeholder:text-slate-800"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}/>
                <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-slate-600 hover:text-slate-400 transition-colors" >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center px-1">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-10 h-5 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                </div>
                <span className="ml-3 text-xs font-bold text-slate-500 group-hover:text-slate-300 transition-colors">Mantener sesión activa</span>
              </label>
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-emerald-900/20 flex items-center justify-center group active:scale-[0.98]">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} className="mr-2 group-hover:translate-x-1 transition-transform"/>
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 flex justify-center items-center space-x-6">
          <button className="flex items-center text-xs font-bold text-slate-600 hover:text-emerald-500 transition group">
            <HelpCircle size={14} className="mr-2 group-hover:rotate-12 transition-transform" />
            Soporte Técnico
          </button>
          <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
          <button className="flex items-center text-xs font-bold text-slate-600 hover:text-emerald-500 transition">
            Política de Privacidad
          </button>
        </div>
      </div>
    </div>
  );
}