"use client";

import { useEffect } from "react";
import { MessageSquare, Loader2, Send, X } from "lucide-react";

const THEMES = {
  emerald: {
    name: 'Esmeralda',
    glow: 'shadow-emerald-500/10',
    borderFocus: 'focus:border-emerald-500/60 focus:ring-emerald-500/15',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    primaryBtn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-900/40',
    iconColor: 'text-green-400',
    topHighlight: 'from-emerald-500/20 via-emerald-500/5 to-transparent'
  },
  indigo: {
    name: 'Índigo',
    glow: 'shadow-indigo-500/10',
    borderFocus: 'focus:border-indigo-500/60 focus:ring-indigo-500/15',
    badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    primaryBtn: 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-900/40',
    iconColor: 'text-indigo-400',
    topHighlight: 'from-indigo-500/20 via-indigo-500/5 to-transparent'
  },
  cyan: {
    name: 'Cian',
    glow: 'shadow-cyan-500/10',
    borderFocus: 'focus:border-cyan-500/60 focus:ring-cyan-500/15',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    primaryBtn: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-900/40',
    iconColor: 'text-cyan-400',
    topHighlight: 'from-cyan-500/20 via-cyan-500/5 to-transparent'
  }
};

export default function FormModal({
  open,
  title,
  subtitle,
  icon: Icon = MessageSquare,
  onClose,
  onSubmit,
  children,
  submitText = "Guardar",
  cancelText = "Cancelar",
  loading = false,
  width = "max-w-xl",
  theme = "emerald",
  topContent = null,
  bottomContent = null,
}) {
  const activeTheme = THEMES[theme] || THEMES.emerald;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300 animate-in fade-in"
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className={`w-full ${width} relative bg-gray-900/95 border border-gray-800/80 rounded-2xl shadow-2xl ${activeTheme.glow} overflow-hidden flex flex-col max-h-[90vh] transition-all duration-200 transform scale-100 ring-1 ring-white/10`}
      >

        <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${activeTheme.topHighlight}`} />

        <header className="flex items-start justify-between p-6 border-b border-gray-800/70 bg-gray-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3.5">
            {Icon && (
              <div className={`p-2.5 rounded-xl border ${activeTheme.badgeBg} flex items-center justify-center shadow-inner`}>
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h2 className="text-lg font-semibold text-gray-100 tracking-tight flex items-center gap-2">
                {title}
              </h2>
              {subtitle && (
                <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-100 hover:bg-red-800/70 cursor-pointer rounded-xl border border-transparent hover:border-gray-700/50 transition-all duration-150 group"
            title="Cerrar (Esc)"
          >
            <X size={18} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </header>

        <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {topContent}
          {children}
          {bottomContent}
        </div>

        <footer className="border-t border-gray-800/70 p-5 px-6 bg-gray-950/40 flex items-center justify-between gap-3">
          <div className="text-xs text-gray-500 hidden sm:flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse"></span>
            Los cambios no guardados se perderán
          </div>

          <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none cursor-pointer px-5 py-2.5 rounded-xl bg-gray-800/80 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-700/60 text-sm font-medium transition-all duration-150 active:scale-[0.98]"
            >
              {cancelText}
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`flex-1 sm:flex-none px-6 py-2.5 cursor-pointer rounded-xl ${activeTheme.primaryBtn} text-white text-sm font-medium shadow-lg transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send size={15} className="opacity-90" />
                  <span>{submitText}</span>
                </>
              )}
            </button>
          </div>
        </footer>
      </form>
    </div>
  );
}