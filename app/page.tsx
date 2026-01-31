import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 News',
  description: 'Tu portal de noticias',
}

export default function Principal() {
  return (
    <>
  

    <header className="w-full p-4 bg-green-800 border-b border-green-900">
      <div className="flex flex-col gap-4 items-center lg:flex-row lg:justify-between">
    
        <a href="/index.html" className="cursor-pointer">
          <img className="w-32 lg:w-40 object-contain" src="/image/404news-logo.png" alt="404 News"/>
        </a>
    
        <nav className="text-white font-bold">
          <ul className="flex flex-col gap-3 items-center lg:flex-row lg:gap-6">
            <li><a className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="index.html">Inicio</a></li>
            <li><a className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">Lo Nuevo</a></li>
            <li><a className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">Tendencias</a></li>
            <li><a className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">IA</a></li>
            <li><a className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">PCs</a></li>
            <li><a className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">Moviles</a></li>
            <li><a className="px-2 py-2 hover:border-b-2 hover:border-white transition" href="section.html">Otros</a></li>
          </ul>
        </nav>
    
          <button className="p-2"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5"
              stroke="currentColor" className="size-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>
        </div>
    </header>

  <div className="flex-1 font-sans min-h-screen flex flex-col">
    <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-10">
        <aside className="lg:col-span-1">
        <h3 className="font-bold text-neutral-700">Ultimas Tendencias</h3>
    
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 1</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 2</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug break-words">Noticia 3</h4>
        </a>

        <h2 className="m-2 text-xl font-semibold uppercase mt-8">
          La semana pasada
        </h2>
          <section className="flex flex-col text-xs items-center lg:flex-row lg:flex-wrap lg:gap-4">
            <article className="mb-10 relative">
              <a href="">
              <img className="w-full max-w-xs h-40 object-cover rounded"
                src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                alt="Reunión de líderes de la Unión Europea"/>
                <h2 className="font-sans w-60 mt-1 hover:underline">
                  Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                  amenazas de Trump sobre Groenlandia.
                </h2>
                <time className="block font-sans text-gray-400 text-right text-xs font-bold">
                    02/2/2026
                </time></a>
            </article>

            <article className="mb-10 relative">
              <a href="">
              <img className="w-full max-w-xs h-40 object-cover rounded"
                src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                alt="Reunión de líderes de la Unión Europea"/>
                <h2 className="font-sans w-60 mt-1 hover:underline">
                  Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                  amenazas de Trump sobre Groenlandia.
                </h2>
                <time className="block font-sans text-gray-400 text-right text-xs font-bold">
                  02/2/2026
                </time></a>
            </article>
          </section>
        </aside>

        <section className="lg:col-span-2 flex flex-col">
          <article className="mb-10 relative group">
            <a href="">
            <img className="w-full h-96 object-cover rounded"
              src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
              alt="Reunión de líderes de la Unión Europea"/>
            <div className="absolute w-full top-0 text-right bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 duration-200">
              <time className="block font-sans text-white text-right font-bold p-4">
                02/2/2026
            </time>
            </div>
            <div className="absolute w-full bottom-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 duration-200">
              <h2 className="font-sans text-white font-bold p-4">
                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                amenazas de Trump sobre Groenlandia.
              </h2>
            </div></a>
          </article>

          <article className="mb-10 relative group">
            <a href="">
            <img className="w-full h-96 object-cover rounded"
              src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
              alt="Reunión de líderes de la Unión Europea"/>
            <div className="absolute w-full top-0 text-right bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 duration-200">
              <time className="block font-sans text-white text-right p-4 font-bold">
                02/2/2026
            </time>
            </div>
            <div className="absolute w-full bottom-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 duration-200">
              <h2 className="font-sans text-white font-bold p-4">
                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                amenazas de Trump sobre Groenlandia.
              </h2>
            </div></a>
          </article>

          <article className="mb-10 relative group ">
            <a href="">
            <img className="w-full h-96 object-cover rounded"
              src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
              alt="Reunión de líderes de la Unión Europea"/>
            <div className="absolute w-full top-0 text-right bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 duration-200">
              <time className="block font-sans text-white text-right p-4 font-bold">
                02/2/2026
            </time>
            </div>
            <div className="absolute w-full bottom-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 duration-200">
              <h2 className="font-sans text-white font-bold p-4">
                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                amenazas de Trump sobre Groenlandia.
              </h2>
            </div></a>
          </article>
        </section>
      <aside className="lg:col-span-1">
    <div className="bg-gray-100 rounded p-4">
      Publicidad / extra
    </div>
  </aside>
</main>

  <h2 className="mx-auto w-fit m-2 text-xl uppercase lg:w-[calc(15rem*4+3rem)]">
    Más noticias
  </h2>
    <section className="flex flex-col justify-center text-xs items-center lg:flex-row lg:gap-4">
      <article className="mb-10 relative">
        <a href="">
        <img className="w-30 h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right text-xs font-bold">
                02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <a href="">
        <img className="w-30 h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <a href="">
        <img className="w-30 h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <a href="">
        <img className="w-30 h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>
    </section>

     <footer className="w-full mt-10">
      <div className="bg-green-800 border-b border-green-900">
      <div className="mx-auto lg:w-[calc(15rem*4+3rem)] p-4">
        <a href="/news.html" className="cursor-pointer">
          <img className="w-44 max-h-24 object-contain" src="/404news-logo.png" alt="404 News"/>
        </a>
      </div>
    </div>

    <div className="bg-gray-800"/>
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
  </footer>
</div>
</>
  );
}
