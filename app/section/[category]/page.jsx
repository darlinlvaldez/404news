import Link from "next/link"
import { formatDateAbsolute, formatDateRelative } from '@/utils/formatDate'

export const metadata = {
  title: "Section - 404 News",
  icons: {
    icon: "/images/news-logo.png",
  },
};

async function getNewsByCategory(slug) {
  const res = await fetch(
    `http://localhost:3000/api/news/category/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Error al cargar la categoría");
  }

  return res.json();
}

export default async function SectionCategory({ params }) {
  const { category } = await params;

  const data = await getNewsByCategory(category);

  if (!data.ok) return <p>Error cargando noticias</p>;

  const news = data.news;

  const mainNews = news[0];              
  const secondaryNews = news.slice(1, 3); 
  const sideNews = news.slice(3, 5);     
  const listNews = news.slice(5, 10);     
  const moreNews = news.slice(10, 14);    

  return (
    <>
      <div className="flex-1  min-h-screen flex flex-col">
        <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-10">
          <header className="lg:col-span-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {news[0]?.category}
            </h1>
          </header>

          <section className="lg:col-span-2 flex flex-col">
            {mainNews && (
              <article className="mb-10 relative">
                <Link href={`/news-details/${mainNews.slug}`}>
                  <img className="w-full object-cover rounded"
                    src={mainNews.cover_image} alt={mainNews.title}/>
                  <h2 className=" text-gray-800 font-bold mt-1 hover:underline">
                    {mainNews.title}
                  </h2>
                  <time className="block text-right text-sm text-gray-400 right font-bold">
                    {formatDateRelative(mainNews.created_at)}
                  </time>
                </Link>
              </article>
            )}

            {secondaryNews.length > 0 && (
              <section className="flex flex-col justify-center items-center lg:flex-row lg:gap-4">
                {secondaryNews.map((item) => (
                  <article key={item.id} className="mb-10 relative">
                    <Link href={`/news-details/${item.slug}`}>
                      <img className="h-50 w-80 object-cover rounded"
                        src={item.cover_image} alt={item.title}/>
                      <h2 className=" w-60 mt-1 text-sm text-gray-800 hover:underline">
                        {item.title}
                      </h2>
                      <time className="block  text-gray-400 text-right text-sm font-bold">
                        {formatDateRelative(item.created_at)}
                      </time>
                    </Link>
                  </article>
                ))}
              </section>
            )}
          </section>

          {sideNews.length > 0 && (
            <section className="lg:col-span-1 flex flex-col">
              {sideNews.map((item) => (
                <article key={item.id} className="mb-10 relative">
                  <Link href={`/news-details/${item.slug}`}>
                    <img className="w-full h-72 object-cover rounded"
                      src={item.cover_image} alt={item.title}/>
                    <h2 className=" text-gray-800 text-sm font-bold mt-1 hover:underline">
                      {item.title}
                    </h2>
                    <time className="block text-right text-sm text-gray-400 font-bold">
                      {formatDateRelative(item.created_at)}
                    </time>
                  </Link>
                </article>
              ))}
            </section>
          )}

          {listNews.length > 0 && (
            <aside className="lg:col-span-1">
              {listNews.map((item) => (
                <Link key={item.id} href={`/news-details/${item.slug}`}
                  className="block hover:underline border-t border-gray-300 pt-1">
                  <h4 className="text-sm leading-snug wrap-break-words">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </aside>
          )}
        </main>

        <h2 className="mx-auto w-fit m-2 text-xl font-semibold uppercase text-neutral-800 lg:w-[calc(15rem*4+3rem)]">
          Más noticias
        </h2>
        {moreNews.length > 0 && (
          <section className="flex flex-col justify-center text-xs items-center lg:flex-row lg:gap-4">
            {moreNews.map((item) => (
            <article key={item.id} className="mb-10 relative">
              <Link href={`/news-details/${item.slug}`}>
                <img className="h-40 object-cover rounded"
                  src={item.cover_image} alt={item.title}/>
                <h2 className="w-60 text-sm p-2 mt-1 hover:underline">
                  {item.title}
                </h2>
                <time className="block text-gray-400 text-right text-sm font-bold">
                  {formatDateAbsolute(item.created_at)}
                </time>
              </Link>
            </article>
            ))}
          </section>
        )}
      </div>

      <div className="">
        <h2 className="mx-auto w-fit m-2 text-xl uppercase lg:w-[calc(15rem*4+3rem)]">
          VIDEOS
        </h2>
        <section className="flex flex-col justify-center text-xs items-center lg:flex-row lg:gap-4">
          <article className="mb-10 relative">
            <iframe
              className="w-60 h-40 object-cover rounded"
              src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <Link href="">
              <h2 className=" w-60 p-2 hover:underline">
                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                amenazas de Trump sobre Groenlandia.
              </h2>
              <time className="block  text-gray-400 text-right  text-xs font-bold">
                02/2/2026
              </time>
            </Link>
          </article>

          <article className="mb-10 relative">
            <iframe
              className="w-60 h-40 object-cover rounded"
              src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi"
              title="YouTube video player" frame-border="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <Link href="">
              <h2 className=" w-60 p-2 hover:underline">
                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                amenazas de Trump sobre Groenlandia.
              </h2>
              <time className="block  text-gray-400 text-right  text-xs font-bold">
                02/2/2026
              </time>
            </Link>
          </article>

          <article className="mb-10 relative">
            <iframe
              className="w-60 h-40 object-cover rounded"
              src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi"
              title="YouTube video player"
              frame-border="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen></iframe>
            <Link href="">
              <h2 className=" w-60 p-2 hover:underline">
                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                amenazas de Trump sobre Groenlandia.
              </h2>
              <time className="block  text-gray-400 text-right  text-xs font-bold">
                02/2/2026
              </time>
            </Link>
          </article>

          <article className="mb-10 relative">
            <iframe
              className="w-60 h-40 object-cover rounded"
              src="https://www.youtube.com/embed/0-cIJAPSYaY?si=yTuEGxI1WhTJPuVi"
              title="YouTube video player"
              frame-border="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <Link href="">
              <h2 className=" w-60 p-2 hover:underline">
                Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                amenazas de Trump sobre Groenlandia.
              </h2>
              <time className="block  text-gray-400 text-right  text-xs font-bold">
                02/2/2026
              </time>
            </Link>
          </article>
        </section>
      </div>
    </>
  );
}