import news from "../../models/news/news";
import incrementView from "../news/redis";

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
    const latestNews = await news.getLatestNews(31, 0);
    const newsWeek = await news.getLastWeekNews(6)
    const trendingNews = await news.getTrendingNews(6);

    return { ok: true, latestNews, latestWeekNews: newsWeek, trendingNews };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener noticias" };
  }
}

newsController.newsByCategory = async function (slug) {
  try {

    const mostRead = await news.getMostReadByCategory(slug, 12);

    const mostReadIds = mostRead.map(n => n.id);

    const categoryNews = await news.getByCategorySlug(slug, mostReadIds);

    return { ok: true, news: categoryNews, mostRead };

  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener noticias" };
  }
};

newsController.detailsNews = async function (slug, ip) {
  try {
    const detailNews = await news.getDetailsNews(slug);

    if (!detailNews) {
      return { ok: false, message: "Noticia no encontrada" };
    }

    await incrementView(slug, ip);

    const relatedNews = await news.getRelatedNews(
      detailNews.categoryId,
      { excludeId: detailNews.id, limit: 8 }
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