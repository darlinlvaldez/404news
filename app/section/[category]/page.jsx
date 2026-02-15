import Link from "next/link"
import { formatDateRelative } from '@/utils/formatDate'
import MoreNews from "@/components/MoreNews";
import ListNews from "@/components/ListNews";
import newsController from "@/controllers/news/news";

export const metadata = {
  title: "Section - 404 News",
  icons: {
    icon: "/images/news-logo.png",
  },
};

export default async function SectionCategory({ params }) {
  const { category } = await params;

  const data = await newsController.newsByCategory(category);

  if (!data.ok) return <p>Error cargando noticias</p>;

  const news = data.news;
  const mostRead = data.mostRead;

  const shownIds = new Set(news.slice(0, 11).map(n => n.id));

  const filteredMostRead = mostRead.filter(n => !shownIds.has(n.id));

  const mainNews = news[0];              
  const secondaryNews = news.slice(1, 3); 
  const sideNews = news.slice(3, 5);     
  const listNews = news.slice(5, 11);     
  const moreNews = news.slice(11, 27);    

  return (
    <>
      <div className="max-w-7xl mx-auto flex-1 min-h-screen flex flex-col">
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-10">
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
                      <h2 className=" w-60 mt-1 text-sm text-gray-800 hover:underline line-clamp-2">
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
                    <h2 className="text-gray-800 text-sm font-bold mt-1 hover:underline line-clamp-2">
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

          <ListNews listNews={listNews}/>
        </main>
        
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
                <span className="w-3 h-8 bg-orange-600 rounded-full"></span>
                <h3 className="text-3xl font-bold tracking-tight text-gray-900">Más Leídas</h3>
            </div>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {filteredMostRead.map((news, index) => (
            <article key={news.id} className="mb-10 relative">
                <Link href={`/news-details/${news.slug}`} className="group block">
                    <div className="relative">
                        <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded backdrop-blur-sm z-10">
                            <span className="text-xs font-bold">{index + 1}</span>
                        </div>
                        <img className="w-full h-48 object-cover rounded" src={news.cover_image} alt={news.title}/>
                    </div>

                    <h3 className="w-full text-base mt-2 text-gray-800 group-hover:underline line-clamp-2 font-medium">
                        {news.title}
                    </h3>

                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-sm font-bold">{news.views?.toLocaleString()}</span>
                        </div>
                        <time className="text-gray-400 text-sm font-bold">{formatDateRelative(news.created_at)}</time>
                    </div>
                </Link>
            </article>
            ))}
        </section>
        
      <div className="mt-12 flex justify-center">
        <button 
          className="group flex items-center gap-2 px-10 py-3 border-2 border-gray-900 text-gray-900 font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all active:scale-95 tracking-wide text-sm">
          VER MÁS NOTICIAS
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>

        <div className="mt-20">
          <MoreNews moreNews={moreNews} />
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
    </div>
    </>
  );
}