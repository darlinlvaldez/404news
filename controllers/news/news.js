import news from "../../models/news/news";

const newsController = {};

newsController.searchNews = async function (term, page) {
  try {
    if (!term || !term.trim()) {
      return { ok: false, message: "Término vacío" };
    }

    const limit = 9;

    const data = await news.getNewsSearch(term.trim(), page, limit);

    return {ok: true, results: data.results, total: data.total, limit};

  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al buscar" };
  }
};

newsController.latestNews = async function() {
  try {
    const latestNews = await news.getLatestNews(20, 0);
    const newsWeek = await news.getLastWeekNews(3)

    return { ok: true, latestNews, latestWeekNews: newsWeek };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener noticias" };
  }
}

newsController.newsByCategory = async function (slug) {
  try {
    const category = await news.getByCategorySlug(slug);
    return { ok: true, news: category };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener noticias" };
  }
};

newsController.detailsNews = async function (slug) {
  try {
    const detailNews = await news.getDetailsNews(slug);

    if (!detailNews) {
      return { ok: false, message: "Noticia no encontrada" };
    }

    const relatedNews = await news.getRelatedNews(
      detailNews.categoryId,
      { excludeId: detailNews.id, limit: 4 }
    );

    return { ok: true, detailNews, relatedNews };

  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener la noticia" };
  }
};

newsController.newsAuthor = async function (slug, page) {
  try {

    const limit = 9;

    const data = await news.getNewsAuthor(slug, page, limit);

    if (!data) {
      return { ok: false, message: "Autor no encontrado" };
    }

    return {
      ok: true, author: data.author, news: data.news,
      total: data.total, limit };

  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener autor" };
  }
};

export default newsController;