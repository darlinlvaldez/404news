import Link from "next/link"
import newsController from "@/controllers/news/news";
import {formatDateAbsolute} from "@/utils/formatDate"

function newsStyles () {
    
    const articleNews = "bg-white mb-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-indigo-200 transition-colors"

    const spanNews = "text-xs font-medium text-gray-500 uppercase tracking-wider"

    return {articleNews, spanNews}
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const q = params.q || "";

  const response = await newsController.searchNews(q);

  if (!response.ok || response.length === 0) {
    return <p>Error al buscar noticias</p>;
  }

  const results = response.results;

  const { articleNews, spanNews } = newsStyles();

  return ( 
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6">Resultados para: "{q}" </h1>
      <section>
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <span className={spanNews}>{results.length} Noticias totales</span>
        </div>
        
          {results.length === 0 && <p>No se encontraron resultados.</p>}
        
            <div className="space-y">
              {results.map((news) => (
              <Link key={news.id} href={`/news-details/${news.slug}`}>
              <article className={articleNews}>
                  <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-48 h-32 shrink-0 bg-gray-200">
                          <img className="w-full h-full object-cover" src={news.cover_image} alt="Portada"/>
                      </div>
                      <div className="p-4 flex flex-col justify-center grow">
                          <div className="flex items-center gap-3 mb-1">
                              <time className="text-[11px] text-gray-400 font-medium">{formatDateAbsolute(news.created_at)}</time>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-1">
                              {news.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-1">
                              {news.excerpt}
                          </p>
                          <div className="mt-2 text-[10px] text-gray-400 font-mono">
                              {news.slug}
                          </div>
                      </div>
                  </div>
              </article></Link>
              ))}
          </div>
      </section>
    </div>
  );
}