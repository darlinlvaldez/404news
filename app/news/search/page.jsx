import newsController from "@/server/controllers/news/news";
import NewsResults from "@/components/NewsResults";

export default async function SearchPage({ searchParams }) {

  const params = await searchParams;

  const q = params.q || "";
  const page = parseInt(params.page) || 1;

  const response = await newsController.searchNews(q, page);

  if (!response.ok) {
    return <p>Error al buscar noticias</p>;
  }

  const { results, total, limit } = response;

  return ( 
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Resultados para: "{q}"
      </h1>

      <NewsResults  
        results={results}
        total={total}
        page={page}
        limit={limit}
        basePath="/search"
        queryParams={`q=${q}`}
      />
    </div>
  );
}