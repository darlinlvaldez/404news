import Link from "next/link";
import newsController from "@/server/controllers/news/news";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { formatDateRelative } from '@/utils/formatDate'
import MoreNews from "@/components/MoreNews";
import LatestWeekNews from "@/components/LatestWeekNews";
import ListNews from "@/components/ListNews";

export const metadata = {
  title: "404News",
  icons: {
    icon: "/images/404logo.png",
  },
};

export default async function Principal() {
  
  const { latestNews, latestWeekNews, trendingNews } = await newsController.latestNews();

  const weekIds = new Set(latestWeekNews.map(n => n.id))
  const cleanLatestNews = latestNews.filter( n => !weekIds.has(n.id))

  
  const mainNews = cleanLatestNews.slice(0, 3);
  const listNewsLeft = cleanLatestNews.slice(3, 9);
  const listNewsRight = cleanLatestNews.slice(9, 15);
  const moreNews = cleanLatestNews.slice(15, 31);

  const latestWeekLeft = latestWeekNews.slice(0, 3)
  const latestWeekRight = latestWeekNews.slice(3, 6)

  return (
  <>
  <Header />
    <div className="flex-1 max-w-7xl mx-auto px-6">
      <main className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-16">

        <h1 className="sr-only">
          404 News – Noticias de tecnología y tendencias
        </h1>
        
          <aside className="lg:col-span-1">      
          <ListNews listNews={listNewsLeft}/>
          <div className="mt-10">
            <LatestWeekNews latestWeekNews={latestWeekLeft}/>
          </div>
        </aside>

        {mainNews.length > 0 && (
          <section className="lg:col-span-2 flex flex-col">
            {mainNews.map((item) => (
            <article key={item.id} className="mb-10 relative rounded overflow-hidden">
              <Link href={`/news/news-details/${item.slug}`}>
              <img className="w-full h-96 object-cover"
                src={item.cover_image} alt={item.title} width={160} height={80}/>

              <div className="absolute w-full top-0 text-right bg-linear-to-b from-black via-black/40 to-transparent">
                <time className="block text-white text-right font-bold p-4">
                  {formatDateRelative(item.created_at)}
                </time>
              </div>

              <div className="absolute w-full bottom-0 p-4 bg-linear-to-t from-black via-black/40 
              to-transparent hover:decoration-gray-200 hover:underline">
                <h3 className="text-2xl text-white md:text-2xl font-bold mb-2 leading-tight">
                  {item.title}
                </h3>
              </div></Link>
            </article>
            ))} 
          </section>
          )}
          <div className="lg:col-span-1">
            <LatestWeekNews latestWeekNews={latestWeekRight}/>
          <div className="mt-6">
            <ListNews listNews={listNewsRight}/>
          </div>
      </div>
    </main>

    {trendingNews && trendingNews.length > 0 && (
        <div className="text-gray-900 mt-4">
          <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-8 bg-red-600 rounded-full"></span>
              <h3 className="text-3xl font-bold tracking-tight">Tendencias</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 lg:row-span-2 group cursor-pointer relative overflow-hidden rounded-lg">
              {trendingNews[0] && (
                <Link href={`/news/news-details/${trendingNews[0].slug}`}>
                  <div className="aspect-video lg:aspect-auto lg:h-full relative">
                    <img className="w-full h-full object-cover"
                      src={trendingNews[0].cover_image} alt={trendingNews[0].title} />
                    <div className="absolute w-full top-0 text-right bg-linear-to-b from-black via-black/40 to-transparent">
                      <time className="block text-white text-right font-bold p-4">
                        {formatDateRelative(trendingNews[0].created_at)}
                      </time>
                    </div>
                    <div className="absolute bottom-0 p-6 text-white bg-linear-to-t from-black via-black/40 to-transparent hover:decoration-gray-200 hover:underline">
                      <h4 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">{trendingNews[0].title}</h4>
                      <p className="text-gray-200 line-clamp-2 text-sm md:text-base">{trendingNews[0].excerpt}</p>
                    </div>
                  </div>
                </Link>
              )}
            </div>

            {trendingNews.slice(1, 3).map((item) => (
              <div key={item.id} className="overflow-hidden group cursor-pointer">
                <Link href={`/news/news-details/${item.slug}`}>
                  <div className="relative h-48">
                    <img className="w-full h-full rounded object-cover" src={item.cover_image} alt={item.title}/>
                  </div>
                  <div className="py-2 hover:underline">
                    <h4 className="font-bold text-lg leading-snug">{item.title}</h4>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">{item.excerpt}</p>
                    <div className="block text-gray-400 text-right text-sm font-bold">{formatDateRelative(item.created_at)}</div>
                  </div>
                </Link>
              </div>
            ))}

            <div className="lg:col-span-2 p-1">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2M12 4a8 8 0 100 16 8 8 0 000-16z" />
                </svg>
                Última hora
              </h4>

              <ListNews listNews={trendingNews.slice(3, 6)} clamp="line-clamp-1"/>
            </div>
          </div>
        </div>
        )}
      <div className="mt-30">
        <MoreNews moreNews={moreNews}/>
      </div>
    </div>
    <Footer />
    </>
  );
}