"use client";

import { ArrowLeft, Eye, Save } from 'lucide-react';

export const Header = ({ children, views, onSave, onBack }) => {
  return (
    <header className="sticky top-0 z-20 bg-gray-900/90 backdrop-blur-md px-8 py-4 border-b border-gray-700 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white transition p-2 hover:bg-gray-800 rounded-full">
          <ArrowLeft size={20}/>
        </button>
        <div>
          {children}
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700 mr-2">
          <Eye size={14} className="text-gray-400 mr-2" />
          <span className="text-xs font-mono text-gray-300">{views} vistas</span>
        </div>
        <button 
          onClick={onSave}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center transition shadow-lg shadow-green-900/20">
          <Save size={18} className="mr-2" /> Guardar Noticia
        </button>
      </div>
    </header>
  );
};

function HeaderTitle({ children }) {
  return (
    <h2 className="text-lg font-bold leading-none">{children}</h2>
  );
}

function HeaderSubtitle({ children }) {
  return (
    <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
      {children}
    </span>
  );
}

Header.Title = HeaderTitle;
Header.Subtitle = HeaderSubtitle;