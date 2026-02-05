import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full p-4 bg-green-800 border-b border-green-900">
      <div className="flex flex-col gap-4 items-center lg:flex-row lg:justify-between">
    
        <a href="/" className="cursor-pointer">
          <img className="w-32 lg:w-40 object-contain" src="/images/404news-logo.png" alt="404 News"/>
        </a>
    
        <nav className="text-white font-bold">
          <ul className="flex flex-col gap-3 items-center lg:flex-row lg:gap-6">
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/">Inicio</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">Tendencias</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/inteligencia-artificial">IA</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">PCs</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/dispositivos-moviles">Moviles</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/software">Software</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">Tecnologia General</Link></li>
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
