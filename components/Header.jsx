import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="w-full p-4 bg-green-800 border-b border-green-900">
      <div className="flex flex-col gap-4 items-center lg:flex-row lg:justify-between">
    
        <Link href="/" className="cursor-pointer">
          <Image className="w-32 lg:w-40 object-contain" width={160} height={80} 
          src="/images/404news-logo.png" alt="404 News"/>
        </Link>
    
        <nav className="text-white font-bold">
          <ul className="flex flex-col gap-3 items-center lg:flex-row lg:gap-6 uppercase">
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/">Inicio</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">Tendencias</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/ia-inteligencia-artificial">IA</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/computadoras-pc">PC</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/dispositivos-moviles">Móviles</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/desarrollo-software-app">Software</Link></li>
            <li><Link className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="/section/tecnologia-tecnology">Tecnología General</Link></li>
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