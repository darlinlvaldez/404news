import { formatDateAbsolute, formatDateRelative } from '@/utils/formatDate'

export const metadata = {
  title: "404 News",
  icons: {
    icon: "/images/news-logo.png",
  },
};

async function getNews() {
  const res = await fetch("http://localhost:3000/api/news", {
    cache: "no-store"
  });
  const data = await res.json();
  return data;
}

export default async function Principal() {
  const { latestNews, latestWeekNews } = await getNews();

  const weekIds = new Set(latestWeekNews.map(n => n.id))

  const cleanLatestNews = latestNews.filter(
    n => !weekIds.has(n.id)
  )

  const mainNews = cleanLatestNews.slice(0, 3);
  const moreNews = cleanLatestNews.slice(3, 7);
  const listNews = cleanLatestNews.slice(7, 12);     

  return (
    <>
  <div className="flex-1 font-sans min-h-screen flex flex-col">
    <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 px-6 py-10">
        <aside className="lg:col-span-1">
        <h3 className="font-bold text-neutral-700">Ultimas Tendencias</h3>
    
        {listNews.map((item) => (
          <a key={item.id} href={`/news/${item.slug}`}
            className="block hover:underline border-t border-gray-300 pt-1">
            <h4 className="text-sm leading-snug break-words">
              {item.title}
            </h4>
          </a>
        ))}

        {latestWeekNews.length > 0 && (
        <>
          <h2 className="m-2 text-xl font-semibold uppercase mt-8">
            La semana pasada
          </h2>

          <section className="flex flex-col text-xs items-center lg:flex-row lg:flex-wrap lg:gap-4">
            {latestWeekNews.map(item => (
              <article key={item.id} className="mb-10 relative">
                <a href={`/news/${item.slug}`}>
                  <img className="w-60 max-w-xs h-40 object-cover rounded"
                    src={item.cover_image} alt={item.title} />

                  <h2 className="font-sans w-60 mt-1 hover:underline">
                    {item.title}
                  </h2>

                  <time className="block font-sans text-gray-400 text-right text-xs font-bold">
                    {formatDateAbsolute(item.created_at)}
                  </time>
                </a>
              </article>
            ))}
          </section>
        </>
      )}
      </aside>

      {mainNews.length > 0 && (
        <section className="lg:col-span-2 flex flex-col">
          {mainNews.map((item) => (
          <article key={item.id} className="mb-10 relative group">
            <a href={`/news/${item.slug}`}>
            <img className="w-full h-96 object-cover rounded"
              src={item.cover_image}  alt={item.title}/>
            <div className="absolute w-full top-0 text-right bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
              <time className="block font-sans text-white text-right font-bold p-4">
                {formatDateRelative(item.created_at)}
            </time>
            </div>
            <div className="absolute w-full bottom-0 bg-black/20 opacity-0 group-hover:opacity-100 duration-200">
              <h2 className="font-sans text-white font-bold p-4">
                {item.title}
              </h2>
            </div></a>
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

  <h2 className="mx-auto w-fit m-2 text-xl uppercase lg:w-[calc(15rem*4+3rem)]">
    Más noticias
  </h2>

  <section className="flex flex-col justify-center text-xs items-center lg:flex-row lg:flex-wrap lg:gap-4">
    {moreNews.map(item => (
      <article key={item.id} className="mb-10 relative">
        <a href={`/news/${item.slug}`}>
          <img
            className="w-60 h-40 object-cover rounded"
            src={item.cover_image} alt={item.title}/>

          <h2 className="font-sans w-60 mt-1 hover:underline">
            {item.title}
          </h2>

          <time className="block font-sans text-gray-400 text-right text-xs font-bold">
            {formatDateAbsolute(item.created_at)}
          </time>
        </a>
      </article>
    ))}
  </section>
</div>
</>
  );
}
