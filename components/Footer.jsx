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
              <li><Link className="hover:underline" href="/news/section/ia-inteligencia-artificial">IA</Link></li>
              <li><Link className="hover:underline" href="/news/section/computadoras-pc">PCs</Link></li>
              <li><Link className="hover:underline" href="/news/section/desarrollo-software-app">Software</Link></li>
              <li><Link className="hover:underline" href="/news/section/dispositivos-moviles">Móviles</Link></li>
              <li><Link className="hover:underline" href="/news/section/tecnologia-tecnology">Tecnología General</Link></li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-xl font-bold mb-2 uppercase">Información</h3>
            <ul className="space-y-2">
              <li><Link className="hover:underline" href="news.html">Términos de Uso</Link></li>
              <li><Link className="hover:underline" href="#">Política de Privacidad</Link></li>
              <li><Link className="hover:underline" href="/news/contact">Contactanos</Link></li>
              <li><Link className="hover:underline" href="#">Sobre Nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 uppercase">Síguenos</h3>

            <div className="flex gap-4">
              {/* X */}
              <a
                href="https://twitter.com/404news"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en X"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-6.2L6 22H2.9l7.3-8.4L1 2h6.6l4.6 5.6L18.9 2z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/404news"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Facebook"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.5c0-2.4 1.4-3.8 3.6-3.8 1 0 2 .1 2 .1v2.3h-1.2c-1.2 0-1.6.8-1.6 1.5V12H16l-.4 3h-2.4v7A10 10 0 0 0 22 12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/404news"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Síguenos en Instagram"
                className="text-gray-300 hover:text-green-400 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="18" cy="6" r="1" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <p className="text-center font-normal text-white py-4">&copy; 2026 404 NEWS</p>
      </div>
    </footer>
  );
}