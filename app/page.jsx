import Link from "next/link";
import { formatDateRelative } from '@/utils/formatDate'
import MoreNews from "@/components/MoreNews";
import LatestWeekNews from "@/components/LatestWeekNews";
import ListNews from "@/components/ListNews";
import newsController from "@/controllers/news/news";

export default async function Principal() {
  
  const { latestNews, latestWeekNews } = await newsController.latestNews();

  const weekIds = new Set(latestWeekNews.map(n => n.id))

  const cleanLatestNews = latestNews.filter( n => !weekIds.has(n.id))

  const mainNews = cleanLatestNews.slice(0, 3);
  const listNews = cleanLatestNews.slice(3, 9);   
  const moreNews = cleanLatestNews.slice(9, 26);

  return (
  <>
    <div className="flex-1 min-h-screen flex flex-col">
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-10">
          <aside className="lg:col-span-1">
          <h3 className="text-xl font-semibold uppercase text-gray-800">Ultimas Tendencias</h3>
      
          <ListNews listNews={listNews}/>

          <LatestWeekNews latestWeekNews={latestWeekNews}/>
        </aside>

        {mainNews.length > 0 && (
          <section className="lg:col-span-2 flex flex-col">
            {mainNews.map((item) => (
            <article key={item.id} className="mb-10 relative group">
              <Link href={`/news-details/${item.slug}`}>
              <img className="w-full h-96 object-cover rounded"
                src={item.cover_image} alt={item.title} width={160} height={80}/>
              <div className="absolute w-full top-0 text-right bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
                <time className="block  text-white text-right font-bold p-4">
                  {formatDateRelative(item.created_at)}
              </time>
              </div>
              <div className="absolute w-full bottom-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
                <h2 className=" text-white font-bold p-4">
                  {item.title}
                </h2>
              </div></Link>
            </article>
            ))} 
          </section>
          )}
          <div className="lg:col-span-1">
        <div className=" bg-gray-100 rounded p-4">
          Publicidad / extra
        </div>
      </div>
    </main>

    <MoreNews moreNews={moreNews}/>
    
  </div>
  </>
  );
}