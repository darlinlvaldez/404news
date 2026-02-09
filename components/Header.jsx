"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  { href: "/section", label: "Tendencias" },
  { href: "/section/ia-inteligencia-artificial", label: "IA" },
  { href: "/section/computadoras-pc", label: "PC" },
  { href: "/section/dispositivos-moviles", label: "Móviles" },
  { href: "/section/desarrollo-software-app", label: "Software" },
  { href: "/section/tecnologia-tecnology", label: "Tecnología General" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const linkClass = (path) =>
    `px-2 py-2 transition ${
      pathname === path ? "border-b-2 border-white" : "hover:border-b-2 hover:border-white"
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
        <div className="w-full mt-4 flex justify-center animate-in fade-in slide-in-from-top-1">
          <div className="relative w-3/4 md:w-1/2">
            <input className="w-full p-3 pr-12 bg-green-700 text-white border border-green-600 
              rounded-md focus:outline-none focus:border-white transition-all"
              type="text" placeholder="Buscar 404 News" autoFocus/>

            <svg className="w-5 h-5 text-white absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
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