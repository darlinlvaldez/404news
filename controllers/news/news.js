import news from "../../models/news/news";

const newsController = {};

newsController.fetchLatestNews = async function() {
  try {
    const latestNews = await news.getLatestNews(3, 0);
    const newsWeek = await news.getLastWeekNews(3)
    const moreNews = await news.getLatestNews(16, 3);

    return { ok: true, latestNews, latestWeekNews: newsWeek, moreNews };
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

export default newsController;