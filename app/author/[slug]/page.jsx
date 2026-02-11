import newsController from "@/controllers/news/news";
import NewsResults  from "@/components/NewsResults";

function authorStyles () {
    
    const headerAuthor = "bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-12"

    const imageAuthor = "w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-indigo-50 shadow-inner"

    return {headerAuthor, imageAuthor}
}

export default async function AuthorPage({ params, searchParams }) {

    const { slug } = await params;
    const { page } = await searchParams;

    const currentPage = parseInt(page) || 1;

    const response = await newsController.newsAuthor(slug, currentPage);

    if (!response.ok) {
        return <div>Autor no encontrado</div>;
    }

    const { author, news, total, limit } = response;

    const {headerAuthor, imageAuthor} = authorStyles();

    return ( 
    <div className="max-w-4xl mx-auto px-4 py-12">
        <header className={headerAuthor}>
            <div className="md:flex items-center p-8 md:p-10 gap-8">
                <div className="shrink-0 mb-6 md:mb-0 flex justify-center md:block">
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

        <NewsResults
            results={news}
            total={total}
            page={currentPage}
            limit={limit}
            basePath={`/author/${author.slug}`}
            queryParams=""/>
    </div>
  );
}