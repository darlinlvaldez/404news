"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

function NavLinks({ vertical = false, linkClass }) {
  return (
    <ul
      className={`uppercase ${
        vertical ? "flex flex-col gap-3" : "flex items-center gap-6"
      }`}
    >
      {links.map((link) => (
        <li key={link.href}>
          <Link className={linkClass(link.href)} href={link.href}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

const links = [
  { href: "/", label: "Inicio" },
  { href: "/news/section/ia-inteligencia-artificial", label: "IA" },
  { href: "/news/section/computadoras-pc", label: "PC" },
  { href: "/news/section/dispositivos-moviles", label: "Móviles" },
  { href: "/news/section/desarrollo-software-app", label: "Software" },
  { href: "/news/section/tecnologia-tecnology", label: "Tecnología General" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/news/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
    }
  };

  const linkClass = (path) =>
    `px-2 py-2 transition ${
      pathname === path ? "border-b-4 border-white" : "hover:border-b-4 hover:border-white"
    }`;

  return (
    <header className="w-full p-4 bg-green-800 border-b border-green-900">
      <div className="flex items-center justify-between">
        <Link href="/" className="cursor-pointer">
          <Image className="w-32 lg:w-40 object-contain" width={160} height={80}
            src="/images/404news-logo.png" alt="404 News"/>
        </Link>

        <nav className="hidden lg:block text-white font-bold">
          <NavLinks linkClass={linkClass} />
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded hover:bg-green-700 cursor-pointer transition-colors">
            <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/>
            </svg>
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}
           className="lg:hidden p-2 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="2.5" stroke="currentColor" className="size-7">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="w-full mt-4 flex flex-col items-center animate-in fade-in slide-in-from-top-1">
          
          {/* Buscador */}
          <div className="relative w-3/4 md:w-1/2">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
              className="w-full p-3 pr-12 bg-green-700 text-white border border-green-600 
                rounded-md focus:outline-none focus:border-white transition-all"
              type="text"
              placeholder="Buscar 404 News"
              autoFocus
            />

            <svg
              className="w-5 h-5 text-white absolute right-3 top-1/2 
                -translate-y-1/2 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>

          <div className="mt-4 flex flex-col items-center">
            <span className="text-sm font-bold uppercase text-gray-200 mb-2">
              Síguenos
            </span>

            <div className="flex gap-4">
              {/* X */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en X"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-6.2L6 22H2.9l7.3-8.4L1 2h6.6l4.6 5.6L18.9 2z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .1 2 .1v2.3h-1.2c-1.2 0-1.6.8-1.6 1.5V12H16l-.4 3h-2.4v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-5 h-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <nav className="lg:hidden mt-4 text-white font-bold">
          <NavLinks vertical linkClass={linkClass} />
        </nav>
      )}

    </header>
  );
}