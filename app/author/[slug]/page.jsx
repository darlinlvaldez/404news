import Link from "next/link"
import newsController from "@/controllers/news/news";
import {formatDateAbsolute} from "@/utils/formatDate"

function authorStyles () {
    
    const headerAuthor = "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12"

    const imageAuthor = "w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-50 shadow-inner"

    const articleNews = "bg-white mb-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-indigo-200 transition-colors"

    const spanNews = "text-xs font-medium text-gray-500 uppercase tracking-wider"

    return {articleNews, headerAuthor, imageAuthor, spanNews}
}

export default async function AuthorPage({ params }) {

    const { slug } = await params;

    const response = await newsController.newsAuthor(slug);

    if (!response.ok || !response.data || response.data.length === 0) {
    return <div>Autor no encontrado</div>;
    }

    const data = response.data;

    const author = {
        id: data[0].author_id,
        name: data[0].name,
        bio: data[0].bio,
        avatar: data[0].avatar,
        slug: data[0].author_slug
    };

    const news = data.filter(item => item.news_id).map(item => ({
        id: item.news_id,
        title: item.title,
        slug: item.news_slug,
        excerpt: item.excerpt,
        cover_image: item.cover_image,
        created_at: item.created_at
    }));

    const { articleNews, headerAuthor, imageAuthor, spanNews } = authorStyles();

    return ( 

    <div className="max-w-4xl mx-auto px-4 py-12">
        <header className={headerAuthor}>
            <div className="md:flex items-center p-8 md:p-10 gap-8">
                <div className="shrink-0 mb-6 md:mb-0">
                    <img className={imageAuthor} src={author.avatar || "/images/notfoundimage.jpg"} alt={author.name} />
                </div>
                
                <div className="grow text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                        <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
                    </div>
                    
                    <p className="text-lg text-gray-600 mb-4 max-w-2xl">
                        {author.bio}
                    </p>
                    
                    <div className="text-sm text-gray-400 font-mono">
                        {author.slug}
                    </div>
                </div>
            </div>
        </header>

        <section>
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
                <h2 className="text-xl font-bold text-gray-800">Publicaciones Recientes</h2>
                <span className={spanNews}>{news.length} Noticias totales</span>
            </div>

            <div className="space-y">
                {news.map((item) => (
                <Link key={item.id} href={`/news-details/${item.slug}`}>
                <article className={articleNews}>
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-48 h-32 shrink-0 bg-gray-200">
                            <img className="w-full h-full object-cover" src={item.cover_image} alt="Portada"/>
                        </div>
                        <div className="p-4 flex flex-col justify-center grow">
                            <div className="flex items-center gap-3 mb-1">
                                <time className="text-[11px] text-gray-400 font-medium">{formatDateAbsolute(item.created_at)}</time>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight line-clamp-1">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-1">
                                {item.excerpt}
                            </p>
                            <div className="mt-2 text-[10px] text-gray-400 font-mono">
                                {item.slug}
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