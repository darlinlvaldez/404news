import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full mt-10">
      <div className="bg-green-800 border-b border-green-900">
        <div className="mx-auto lg:w-[calc(15rem*4+3rem)] p-4">
          <Link href="/" className="inline-block">
            <Image className="w-44 max-h-24 object-contain" width={160} height={80}  
            src="/images/404news-logo.png" alt="404 News"/>
          </Link>
        </div>
      </div>

      <div className="bg-gray-800"> 
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-24 p-6 justify-center text-white font-bold">
          <div className="">
            <h3 className="text-xl font-bold mb-2 uppercase">Categorías</h3>
            <ul className="space-y-2">
              <li><Link className="hover:underline" href="news.html">Tendencias</Link></li>
              <li><Link className="hover:underline" href="/section/ia-inteligencia-artificial">IA</Link></li>
              <li><Link className="hover:underline" href="/section/computadoras-pc">PCs</Link></li>
              <li><Link className="hover:underline" href="/section/desarrollo-software-app">Software</Link></li>
              <li><Link className="hover:underline" href="/section/dispositivos-moviles">Móviles</Link></li>
              <li><Link className="hover:underline" href="/section/tecnologia-tecnology">Tecnología General</Link></li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-xl font-bold mb-2 uppercase">Información</h3>
            <ul className="space-y-2">
              <li><Link className="hover:underline" href="news.html">Términos de Uso</Link></li>
              <li><Link className="hover:underline" href="#">Política de Privacidad</Link></li>
              <li><Link className="hover:underline" href="/contact">Contactanos</Link></li>
              <li><Link className="hover:underline" href="#">Sobre Nosotros</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-center font-normal text-white py-4">© 2026 404 NEWS</p>
      </div>
    </footer>
  );
}