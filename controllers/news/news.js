import news from "../../models/news/news";

const newsController = {};

newsController.fetchLatestNews = async function() {
  try {
    const latestNews = await news.getLatestNews(15);
    const newsWeek = await news.getLastWeekNews(3);
    return { ok: true, latestNews, latestWeekNews: newsWeek };
  } catch (error) {
    console.error(error);
    return { ok: false, message: "Error al obtener noticias" };
  }
}

export default newsController;