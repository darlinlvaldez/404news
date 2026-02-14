import Link from "next/link";
import { formatDateAbsolute } from "@/utils/formatDate";

export default function MoreNews({ moreNews }) {
    if (!moreNews || moreNews.length === 0) return null;
      
    const moreNewsSection = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"

    return (
    <>
    <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-4">
        <div className="flex items-center gap-2">
            <span className="w-3 h-8 bg-blue-600 rounded-full"></span>
            <h3 className="text-3xl font-bold tracking-tight">Más Noticias</h3>
        </div>
    </div>

    <section className={moreNewsSection}>
        {moreNews.map(item => (
            <article key={item.id} className="mb-10 relative">
                <Link href={`/news-details/${item.slug}`}>
                    <img className="w-full h-48 object-cover rounded"
                    src={item.cover_image} alt={item.title} width={160} height={80}/>

                    <h2 className="w-60 text-base mt-1 neutral-800 hover:underline line-clamp-2">
                        {item.title}
                    </h2>

                    <time className="block text-gray-400 text-right text-sm font-bold">
                    {formatDateAbsolute(item.created_at)}
                    </time>
                </Link>
            </article>
        ))}
    </section>
    </>
    );
}