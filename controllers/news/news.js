import news from "../../models/news/news";

const newsController = {};

newsController.searchNews = async function (term) {
  try {
    if (!term || !term.trim()) {
      return { ok: false, message: "Término de búsqueda vacío" };
    }

    const results = await news.getNewsSearch(term.trim());

    return { ok: true, results };

  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al buscar noticias" };
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

newsController.newsAuthor = async function (slug) {
  try {
    const data = await news.getNewsAuthor(slug);

    if (!data || data.length === 0) {
      return { ok: false, message: "Autor no encontrado" };
    }

    return { ok: true, data };

  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener autor" };
  }
};

export default newsController;