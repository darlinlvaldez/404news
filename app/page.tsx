import Head from "next/head";

export default function Principal() {
  return (
    <>
  <Head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/image/news-logo.png"/>
    <title>404 News</title>
  </Head>

  <div className="flex-1 font-sans min-h-screen flex flex-col">
    <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-10">
        <aside className="lg:col-span-1">
        <h3 className="font-bold text-neutral-700">Ultimas Tendencias</h3>
    
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 1</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 2</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 3</h4>
        </a>
        <a href="" className="block hover:underline border-t border-gray-300 pt-1">
          <h4 className="text-sm leading-snug wrap-break-words">Noticia 3</h4>
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
            <div className="absolute w-full top-0 text-right bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
              <time className="block font-sans text-white text-right font-bold p-4">
                02/2/2026
            </time>
            </div>
            <div className="absolute w-full bottom-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
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
            <div className="absolute w-full top-0 text-right bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
              <time className="block font-sans text-white text-right p-4 font-bold">
                02/2/2026
            </time>
            </div>
            <div className="absolute w-full bottom-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
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
            <div className="absolute w-full top-0 text-right bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
              <time className="block font-sans text-white text-right p-4 font-bold">
                02/2/2026
            </time>
            </div>
            <div className="absolute w-full bottom-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
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
        <img className="w-60 h-40 object-cover rounded"
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
        <img className="w-60 h-40 object-cover rounded"
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
        <img className="w-60 h-40 object-cover rounded"
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
        <img className="w-60 h-40 object-cover rounded"
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
</div>
</>
  );
}
