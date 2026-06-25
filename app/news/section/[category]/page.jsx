import Link from "next/link"
import newsController from "@/server/controllers/news/news";
import { formatDateRelative } from '@/utils/formatDate'
import MoreNews from "@/components/MoreNews";
import ListNews from "@/components/ListNews";
import MostRead from "@/components/MostRead";

export const metadata = {
  title: "Section - 404 News"
};

export default async function SectionCategory({ params }) {
  const { category } = await params;

  const data = await newsController.newsByCategory(category);

  if (!data.ok) return <p>Error cargando noticias</p>;

  const news = data.news;
  const mostRead = data.mostRead;

  const mainNews = news[0];              
  const secondaryNews = news.slice(1, 3); 
  const sideNews = news.slice(3, 5);     
  const listNews = news.slice(5, 11);     
  const moreNews = news.slice(11, 27);    

  return (
    <>
      <div className="max-w-7xl mx-auto flex-1 min-h-screen flex flex-col px-6">
        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-10">
          <header className="lg:col-span-4 mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {news[0]?.category}
            </h1>
          </header>

          <section className="lg:col-span-2 flex flex-col">
            {mainNews && (
              <article className="mb-10 relative">
                <Link href={`/news/news-details/${mainNews.slug}`}>
                  <img className="w-full h-96 object-cover rounded"
                    src={mainNews.cover_image} alt={mainNews.title}/>
                  <h2 className="text-gray-800 font-bold mt-1 hover:underline">
                    {mainNews.title}
                  </h2>
                  <time className="block text-right text-sm text-gray-400 right font-bold">
                    {formatDateRelative(mainNews.created_at)}
                  </time>
                </Link>
              </article>
            )}

            {secondaryNews.length > 0 && (
              <section className="flex flex-col justify-center items-center lg:flex-col lg:gap-4">
                {secondaryNews.map((item) => (
                  <article key={item.id} className="mb-10 relative">
                    <Link href={`/news/news-details/${item.slug}`}>
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
                  <Link href={`/news/news-details/${item.slug}`}>
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
        
        <MostRead mostRead={mostRead}/>

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