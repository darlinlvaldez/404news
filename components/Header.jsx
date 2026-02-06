"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const linkClass = (path) =>
  `px-2 py-2 transition ${
    pathname === path
      ? "border-b-2 border-white"
      : "hover:border-b-2 hover:border-white"
  }`;

  return (
    <header className="w-full p-4 bg-green-800 border-b border-green-900">
      <div className="flex flex-col gap-4 items-center lg:flex-row lg:justify-between">
    
        <Link href="/" className="cursor-pointer">
          <Image className="w-32 lg:w-40 object-contain" width={160} height={80} 
          src="/images/404news-logo.png" alt="404 News"/>
        </Link>
    
        <nav className="text-white font-bold">
          <ul className="flex flex-col gap-3 items-center lg:flex-row lg:gap-6 uppercase">
            <li><Link className={linkClass("/")} href="/">Inicio</Link></li>
            <li><Link className={linkClass("/section")} href="section.html">Tendencias</Link></li>
            <li><Link className={linkClass("/section/ia-inteligencia-artificial")} href="/section/ia-inteligencia-artificial" >IA</Link></li>
            <li><Link className={linkClass("/section/computadoras-pc")} href="/section/computadoras-pc">PC</Link></li>
            <li><Link className={linkClass("/section/dispositivos-moviles")} href="/section/dispositivos-moviles">Móviles</Link></li>
            <li><Link className={linkClass("/section/desarrollo-software-app")} href="/section/desarrollo-software-app">Software</Link></li>
            <li><Link className={linkClass("/section/tecnologia-tecnology")} href="/section/tecnologia-tecnology">Tecnología General</Link></li>
          </ul>
        </nav>
    
          <button className="p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"
              stroke="currentColor" className="size-6 cursor-pointer text-white">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
    </header>
  );
}