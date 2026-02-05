import news from "../../models/news/news";

const newsController = {};

newsController.fetchLatestNews = async function() {
  try {
    const latestNews = await news.getLatestNews(20, 0);
    const newsWeek = await news.getLastWeekNews(3)

    return { ok: true, latestNews, latestWeekNews: newsWeek };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener noticias" };
  }
}

newsController.fetchByCategory = async function (slug) {
  try {
    const newsByCategory = await news.getByCategorySlug(slug);
    return { ok: true, news: newsByCategory };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener noticias" };
  }
};

newsController.fetchDetailNews = async function (slug) {
  try {
    const detailNews = await news.getDetailNews(slug);

    if (!detailNews) {
      return { ok: false, message: "Noticia no encontrada" };
    }

    return { ok: true, detailNews };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener la noticia" };
  }
};

export default newsController;