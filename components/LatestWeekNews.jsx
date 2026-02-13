import Link from "next/link"
import {formatDateAbsolute} from "@/utils/formatDate";

export default function LatestWeekNews({latestWeekNews}) {
    if (!latestWeekNews || latestWeekNews.length === 0) return null;

    return (
        <>
        <h2 className="mb-2 text-xl font-semibold uppercase text-gray-800">
            La semana pasada
        </h2>

        <section className="flex flex-col items-center lg:flex-row lg:flex-wrap lg:gap-4">
            {latestWeekNews.map(item => (
            <article key={item.id} className="mb-10 relative">
                <Link href={`/news-details/${item.slug}`}>
                <img className="w-60 max-w-xs h-40 object-cover rounded"
                    src={item.cover_image} alt={item.title} width={160} height={80}/>

                <h2 className="text-base leading-snug neutral-800 w-60 mt-1 hover:underline line-clamp-3">
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