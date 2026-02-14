import { headers } from "next/headers";
import Link from "next/link" 
import ShareMenu from "@/components/ShareMenu";
import newsControllers from "@/controllers/news/news";
import MoreNews from "@/components/MoreNews";
import { formatDateAbsolute } from '@/utils/formatDate'

export const metadata = {
  title: "Details - 404 News",
  icons: {
    icon: "/image/news-logo.png",
  },
};

export default async function DetailNews({ params }) {
    const { slug } = await params;

    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] ||
      headersList.get("x-real-ip") || "unknown";

    const data = await newsControllers.detailsNews(slug, ip);

    if (!data.ok) {
        return <p>Error cargando la noticia</p>;
    }

    const news = data.detailNews;
    const moreNews = data.relatedNews;

    return (
    <>
    <div className="max-w-7xl mx-auto flex-1 min-h-screen flex flex-col">

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-6 py-10 px-6">

            <article className="lg:col-span-3">

                <header className="mb-6">
                    <h1 className="font-bold text-5xl leading-tight text-gray-700">
                        {news.title}
                    </h1>

                    <p className="text-sm mt-4 text-gray-500">
                        Por <Link href={`/author/${news.author_slug}`}>{news.author}</Link>
                    </p>

                    <div className="relative mt-6">
                        <div className="flex justify-center gap-1 text-gray-500 text-sm">
                            <span>Publicado:</span>
                            <time>{formatDateAbsolute(news.created_at)}</time>
                        </div>
                    
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                        <ShareMenu/>
                    </div>
                </div>

                </header>

                <figure className="mb-4">
                    <img className="w-full max-w-3x1 max-h-[30rem] object-cover rounded"
                        src={news.cover_image} alt={news.title}/>
                </figure>
                
                <div className="prose max-w-none">
                {news.blocks.map(block => {
                    if (block.block_type === "paragraph") {
                    return (
                        <p key={block.id}>
                        {block.content}
                        </p>
                    );
                    }

                    if (block.block_type === "image") {
                    return (
                        <figure key={block.id} className="mb-4">
                        <img className="object-cover rounded w-full"
                            src={block.image_url} alt={block.alt_text || news.title}/>
                        </figure>
                    );
                    }

                    if (block.block_type === "heading") {
                    return (
                        <h2 key={block.id}>
                        {block.content}
                        </h2>
                    );
                    }

                    return null;
                })}
                </div>

            </article>

            <aside className="lg:col-span-2 space-y-1">
                <Link href="" className="block hover:underline border-t border-gray-300 pt-1">
                    <h4 className="text-sm leading-snug break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
                <Link href="" className="block hover:underline border-t border-gray-300 pt-1">
                    <h4 className="text-sm leading-snug break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
                <Link href="" className="block hover:underline border-t border-gray-300 pt-1">
                    <h4 className="text-sm leading-snug break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
                <Link href="" className="block hover:underline border-t border-gray-300 pt-1">
                    <h4 className="text-sm leading-snug break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
                <Link href="" className="block hover:underline border-t border-gray-300 pt-1">
                    <h4 className="text-sm leading-snug break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>
                <Link href="" className="block hover:underline border-t border-gray-300 pt-1 py-10">
                    <h4 className="text-sm leading-snug break-words">Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.</h4>
                </Link>

                <div className="bg-gray-100 rounded p-4">
                    Publicidad / extra
                </div>

                <section className="flex flex-col text-xs items-center lg:flex-row lg:flex-wrap lg:gap-4 py-10">
                    <article className="mb-10 relative">
                    <Link href="">
                    <img className="w-full max-w-xs h-40 object-cover rounded"
                        src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                        alt="Reunión de líderes de la Unión Europea"/>
                        <h2 className=" w-60 mt-1 hover:underline">
                            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.
                        </h2>
                        <time className="block  text-gray-400 text-right text-xs font-bold">
                            02/2/2026
                        </time></Link>
                    </article>

                    <article className="mb-10 relative">
                    <Link href="">
                    <img className="w-full max-w-xs h-40 object-cover rounded"
                        src="https://dims.apnews.com/dims4/default/2f34a09/2147483647/strip/true/crop/6019x4011+0+1/resize/980x653!/format/webp/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F28%2F9f%2F93d5e092f51bc2bb2771224ed2b2%2F0d35f6187e7a449a9a99924b9a427420"
                        alt="Reunión de líderes de la Unión Europea"/>
                        <h2 className=" w-60 mt-1 hover:underline">
                            Líderes de la UE se reúnen para trazar un nuevo rumbo tras
                            amenazas de Trump sobre Groenlandia.
                        </h2>
                        <time className="block  text-gray-400 text-right text-xs font-bold">
                            02/2/2026
                        </time></Link>
                    </article>
                </section>
            </aside>
        </main>
        <MoreNews moreNews={moreNews} />
    </div>
    </>
    );
}