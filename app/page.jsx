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

  <div className="text-gray-900">
    <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
                <span className="w-3 h-8 bg-red-600 rounded-full"></span>
                <h2 className="text-3xl font-bold tracking-tight">Tendencias de Hoy</h2>
            </div>
            <a href="#" className="text-red-600 font-semibold hover:underline flex items-center gap-1">
                Ver todo
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" />
                </svg>
            </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-2 lg:row-span-2 group cursor-pointer relative overflow-hidden rounded-lg">
                <div className="aspect-video lg:aspect-auto lg:h-full relative">
                    <img className="w-full h-full object-cover"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAcFIgmR11sR4m14xJF66rEgodDIUp8vgAzQ&s" 
                    alt="Noticia Principal" />

                    <div className="absolute bottom-0 p-6 text-white bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 leading-tight">La revolución de la inteligencia artificial transforma el mercado laboral global</h3>
                        <p className="text-gray-200 line-clamp-2 text-sm md:text-base">Nuevos informes sugieren un cambio de paradigma en la productividad empresarial y la necesidad de nuevas habilidades técnicas.</p>
                        <div className="mt-4 flex items-center gap-3 text-xs text-gray-300">
                            <span>Hace 2 horas</span>
                            <span>•</span>
                            <span>Por Elena García</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="overflow-hidden group cursor-pointer">
                <div className="relative h-48">
                    <img className="w-full h-full rounded-lg object-cover group-hover:opacity-90"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" 
                    alt="Tecnología"/>
                </div>
                <div className="py-2">
                    <h4 className="font-bold text-lg leading-snug">Nuevos avances en energía de fusión nuclear</h4>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">Científicos logran un récord de temperatura en el reactor experimental...</p>
                    <div className="mt-4 text-xs text-gray-400">Hace 4 horas</div>
                </div>
            </div>

            <div className="overflow-hidden group cursor-pointer">
                <div className="relative h-48">
                    <img className="w-full h-full rounded-lg object-cover group-hover:opacity-90"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600" 
                    alt="Tecnología"/>
                </div>
                <div className="py-2">
                    <h4 className="font-bold text-lg leading-snug">Nuevos avances en energía de fusión nuclear</h4>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">Científicos logran un récord de temperatura en el reactor experimental...</p>
                    <div className="mt-4 text-xs text-gray-400">Hace 4 horas</div>
                </div>
            </div>

            <div className="lg:col-span-2 p-1">
              <h4 className="text-xl font-bold mb-2 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2M12 4a8 8 0 100 16 8 8 0 000-16z" />
                </svg>
                Última hora
              </h4>

                <Link href="" className="block hover:underline border-t border-gray-300 mt-1">
                    <h4 className="text-sm leading-snug wrap-break-words pt-1 line-clamp-2">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
                <Link href="" className="block hover:underline border-t border-gray-300 mt-1 ">
                    <h4 className="text-sm leading-snug pt-1 wrap-break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
                <Link href="" className="block hover:underline border-t border-gray-300 mt-1">
                    <h4 className="text-sm leading-snug pt-1 wrap-break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
            </div>
        </div>
        </div>
    </div>

  </>
  );
}