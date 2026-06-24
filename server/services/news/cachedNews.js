import { cache } from "react";
import getNews from "@/server/models/news/news";

export const getCachedNews = cache(async (slug) => {
    return await getNews.getDetailsNews(slug);
});