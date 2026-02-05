"use client";

import { useState } from "react";

export default function ShareMenu() {
  const [open, setOpen] = useState(false);

  const shareUrl = "https://404news.com";

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 text-white">
      <button onClick={() => setOpen(!open)}
        className="bg-green-700 w-12 h-12 px-2.5 py-3 rounded-full hover:bg-green-800 transition-colors z-10 relative cursor-pointer"
        aria-label="Abrir menú de compartir">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <circle cx="7" cy="12" r="2" stroke="currentColor" strokeLinejoin="round"></circle>
          <circle cx="17" cy="6" r="2" stroke="currentColor" strokeLinejoin="round"></circle>
          <circle cx="17" cy="18" r="2" stroke="currentColor" strokeLinejoin="round"></circle>
          <path d="M15 7L8.5 11" stroke="currentColor"></path>
          <path d="M8.5 13.5L15 17" stroke="currentColor"></path>
        </svg>
      </button>

      <div className={`grid absolute top-full right-0 mt-2 gap-2 transition-all duration-300 ease-in-out 
            ${open  ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none" }`}>
        <a href={`https://twitter.com/intent/tweet?url=${shareUrl}`} target="_blank" rel="noopener noreferrer"
          className={`block bg-green-700 px-3.5 py-3.5 w-12 h-12 transition-all duration-300 ease-out delay-75 rounded-full hover:bg-green-600 
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2" }`} aria-label="Compartir en X">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-6.2L6 22H2.9l7.3-8.4L1 2h6.6l4.6 5.6L18.9 2z" />
          </svg>
        </a>

        <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer"
          className={`block bg-green-700 px-3 py-3 w-12 h-12 transition-all duration-300 ease-out delay-150 rounded-full hover:bg-green-600 
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2" }`} aria-label="Compartir en Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .1 2 .1v2.3h-1.2c-1.2 0-1.6.8-1.6 1.5V12H16l-.4 3h-2.4v7A10 10 0 0 0 22 12z" />
          </svg>
        </a>

        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"
          className={`block bg-green-700 px-3.5 py-3.5 w-12 h-12 transition-all duration-300 ease-out delay-200 rounded-full hover:bg-green-600 
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          aria-label="Compartir en Instagram">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="18" cy="6" r="1" />
          </svg>
        </a>

        <a href={`mailto:?subject=Noticia Interesante&body=${shareUrl}`}
          className={`block bg-green-700 px-3.5 py-3.5 w-12 h-12 transition-all duration-300 ease-out delay-300 rounded-full hover:bg-green-600 
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2" }`}
          aria-label="Compartir por email">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M4 4h16v16H4z" />
            <path d="M22 6 12 13 2 6" />
          </svg>
        </a>

        <button onClick={() => { navigator.clipboard.writeText(shareUrl);
            alert("¡Enlace copiado!");
          }}
          className={`block bg-green-700 px-3.5 py-3.5 w-12 h-12 transition-all duration-300 ease-out delay-[400ms] rounded-full hover:bg-green-600 
            ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          aria-label="Copiar enlace">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <path d="M10 13a5 5 0 0 1 0-7l2-2a5 5 0 0 1 7 7l-1 1" />
            <path d="M14 11a5 5 0 0 1 0 7l-2 2a5 5 0 0 1-7-7l1-1" />
          </svg>
        </button>
      </div>
    </div>
  );
}