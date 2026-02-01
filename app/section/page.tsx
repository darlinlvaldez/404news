import Head from "next/head";

export default function Section() {
    return (
    <>
    <Head>
    <meta charSet="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/png" href="/image/news-logo.png"/>
    <title>Section - 404 News</title>
    </Head>

    <div className="flex-1 font-sans min-h-screen flex flex-col">
        
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-10">
        
            <header className="lg:col-span-4 mb-6">
                <h1 className="text-3xl font-bold text-neutral-700">
                    Noticias específicas
                </h1>
            </header>

            <section className="lg:col-span-2 flex flex-col">
                <article className="mb-10 relative">
                    <a href="">
                        <img className="object-cover rounded"
                            src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                            alt="Reunión de líderes de la Unión Europea" />
                        <h2 className="font-sans text-gray-700 font-bold mt-1 hover:underline">
                            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.
                        </h2>
                        <time className="block text-right font-sans text-gray-400 right font-bold">
                            02/2/2026
                        </time>
                    </a>
                </article>
            
                <section className="flex flex-col justify-center text-xs items-center lg:flex-row lg:gap-4">
                    <article className="mb-10 relative">
                        <a href="">
                            <img className="h-40 object-cover rounded"
                                src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                                alt="Reunión de líderes de la Unión Europea"/>
                            <h2 className="font-sans w-60 mt-1 hover:underline">
                                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                                amenazas de Trump sobre Groenlandia.
                            </h2>
                            <time className="block font-sans text-gray-400 text-right text-xs font-bold">
                                02/2/2026
                            </time>
                        </a>
                    </article>
            
                    <article className="mb-10 relative">
                        <a href="">
                            <img className="h-40 object-cover rounded"
                                src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                                alt="Reunión de líderes de la Unión Europea" />
                            <h2 className="font-sans w-60 mt-1 hover:underline">
                                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                                amenazas de Trump sobre Groenlandia.
                            </h2>
                            <time className="block text-right font-sans text-gray-400 font-bold">
                                02/2/2026
                            </time>
                        </a>
                    </article>
                </section>
            </section>

            <section className="lg:col-span-1 flex flex-col">
                <article className="mb-10 relative">
                    <a href="">
                        <img className="w-full h-72 object-cover rounded"
                            src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                            alt="Reunión de líderes de la Unión Europea" />
                        <h2 className="font-sans text-gray-700 font-bold mt-1 hover:underline">
                            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.
                        </h2>
                        <time className="block text-right font-sans text-gray-400 font-bold">
                            02/2/2026
                        </time>
                    </a>
                </article>
            
                <article className="mb-10 relative">
                    <a href="">
                        <img className="w-full h-72 object-cover rounded"
                            src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                            alt="Reunión de líderes de la Unión Europea" />
                        <h2 className="font-sans text-gray-700 font-bold mt-1 hover:underline">
                            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.
                        </h2>
                        <time className="block text-right font-sans text-gray-400 font-bold">
                            02/2/2026
                        </time>
                    </a>
                </article>
            </section>
            
        <aside className="lg:col-span-1">
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
            <div className="bg-gray-100 rounded p-4 mt-10">
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
        <img className="h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 p-2 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <a href="">
        <img className="h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 p-2 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <a href="">
        <img className="h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 p-2 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <a href="">
        <img className="h-40 object-cover rounded"
          src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
          alt="Reunión de líderes de la Unión Europea"/>
          <h2 className="font-sans w-60 p-2 mt-1 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>
    </section>
</div>

<div className="">
  <h2 className="mx-auto w-fit m-2 text-xl uppercase lg:w-[calc(15rem*4+3rem)]">
    VIDEOS
  </h2>
    <section className="flex flex-col justify-center text-xs items-center lg:flex-row lg:gap-4">
      <article className="mb-10 relative">
        <iframe className="w-60 h-40 object-cover rounded" src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi" 
        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
           <a href=""><h2 className="font-sans w-60 p-2 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <iframe className="w-60 h-40 object-cover rounded" src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi" 
        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <a href=""><h2 className="font-sans w-60 p-2 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
       <iframe className="w-60 h-40 object-cover rounded" src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi" 
        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <a href=""><h2 className="font-sans w-60 p-2 hover:underline">
            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
            amenazas de Trump sobre Groenlandia.
          </h2>
          <time className="block font-sans text-gray-400 text-right  text-xs font-bold">
            02/2/2026
          </time></a>
      </article>

      <article className="mb-10 relative">
        <iframe className="w-60 h-40 object-cover rounded" src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi" 
        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <a href=""><h2 className="font-sans w-60 p-2 hover:underline">
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