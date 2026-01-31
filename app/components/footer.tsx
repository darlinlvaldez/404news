export default function Footer() {
  return (
    <footer className="w-full mt-10">
      <div className="bg-green-800 border-b border-green-900">
        <div className="mx-auto lg:w-[calc(15rem*4+3rem)] p-4">
          <a href="/news.html" className="cursor-pointer">
            <img className="w-44 max-h-24 object-contain" src="/404news-logo.png" alt="404 News"/>
          </a>
        </div>
      </div>

      <div className="bg-gray-800"> 
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-24 p-6 justify-center text-white font-bold">
          <div className="">
            <ul className="space-y-2">
              <li><a className="hover:underline" href="news.html">Inicio</a></li>
              <li><a className="hover:underline" href="#">Lo Nuevo</a></li>
              <li><a className="hover:underline" href="#">Tendencias</a></li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-xl font-bold mb-2">Categorías</h3>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="news.html">IA</a></li>
              <li><a className="hover:underline" href="#">PCs</a></li>
              <li><a className="hover:underline" href="#">Moviles</a></li>
              <li><a className="hover:underline" href="#">Otros</a></li>
            </ul>
          </div>
          <div className="">
            <h3 className="text-xl font-bold mb-2">Información</h3>
            <ul className="space-y-2">
              <li><a className="hover:underline" href="news.html">Términos de uso</a></li>
              <li><a className="hover:underline" href="#">Política de privacidad</a></li>
              <li><a className="hover:underline" href="#">Contactanos</a></li>
              <li><a className="hover:underline" href="#">Sobre Nosotros</a></li>
            </ul>
          </div>
        </div>
        <p className="text-center text-white py-4">© 2026 404 NEWS</p>
      </div>
    </footer>
  );
}