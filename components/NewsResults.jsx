import Link from "next/link";
import { formatDateAbsolute } from "@/utils/formatDate";

function newsStyles () {
    const articleNews = "bg-white mb-6 rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:border-indigo-200 transition-colors"

    const spanNews = "text-xs font-medium text-gray-500 uppercase tracking-wider"

    return {articleNews, spanNews}
}

export default function NewsResults({
    results,
    total,
    page,
    limit,
    basePath,
    queryParams = "",
}) {

    if (!results?.length) {
        return <p>No se encontraron resultados.</p>;
    }

    const start = (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);
    const totalPages = Math.ceil(total / limit);

    const { articleNews, spanNews } = newsStyles();

    return (
        <section>
        <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
            <span className={spanNews}>
            Mostrando del {start} al {end} de {total} resultados
            </span>
        </div>

        <div className="space-y">
            {results.map((news) => (
            <Link key={news.id} href={`/news-details/${news.slug}`}>
                <article className={articleNews}>
                <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-32 shrink-0 bg-gray-200">
                    <img className="w-full h-full object-cover"
                        src={news.cover_image} alt="Portada"/>
                    </div>
                    <div className="p-4 flex flex-col justify-center grow">
                    <time className="text-[11px] text-gray-400 font-medium">
                        {formatDateAbsolute(news.created_at)}
                    </time>
                    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                        {news.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-1">
                        {news.excerpt}
                    </p>
                    </div>
                </div>
                </article>
            </Link>
            ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">

            {page > 1 && (
            <Link
                href={`${basePath}?${queryParams}&page=${page - 1}`}
                className="px-4 py-2 bg-gray-200 rounded">
                Anterior
            </Link>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
                key={p}
                href={`${basePath}?${queryParams}&page=${p}`}
                className={`px-4 py-2 rounded ${
                p === page ? "bg-green-800 text-white" : "bg-gray-200"
                }`}>
                {p}
            </Link>
            ))}

            {page < totalPages && (
            <Link
                href={`${basePath}?${queryParams}&page=${page + 1}`}
                className="px-4 py-2 bg-gray-200 rounded">
                Siguiente
            </Link>
            )}
        </div>
    </section>
  );
}