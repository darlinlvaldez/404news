import Link from "next/link";
import { formatDateAbsolute } from "@/utils/formatDate";

export default function MoreNews({ moreNews }) {
    if (!moreNews || moreNews.length === 0) return null;
    
    const moreNewsTitle = "mx-auto w-fit m-2 text-xl font-semibold uppercase text-neutral-700 lg:w-[calc(15rem*4+3rem)]"
  
    const moreNewsSection = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
    
    return (
    <>
    <h2 className={moreNewsTitle}>
        Más noticias
    </h2>

    <section className={moreNewsSection}>
        {moreNews.map(item => (
            <article key={item.id} className="mb-10 relative">
                <Link href={`/news-details/${item.slug}`}>
                    <img className="w-60 h-40 object-cover rounded"
                    src={item.cover_image} alt={item.title} width={160} height={80}/>

                    <h2 className="w-60 text-sm mt-1 hover:underline line-clamp-2">
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