import forSeo from "@/server/services/news/seo";

import config from "../config";

export default async function sitemap() {

    const [news, categories, authors] = await Promise.all([
        forSeo.getNews(),
        forSeo.getCategories(),
        forSeo.getAuthors(),
    ]);

    return [

        {
        url: config.PORTAL,
        lastModified: new Date(),
        changeFrequency: "hourly",
        priority: 1,
        },

        ...news.map((article) => ({
        url: `${config.PORTAL}/news/news-details/${article.slug}`,
        lastModified: article.updated_at,
        changeFrequency: "daily",
        priority: 0.9,
        })),

        ...categories.map((category) => ({
        url: `${config.PORTAL}/news/section/${category.slug}`,
        changeFrequency: "daily",
        priority: 0.8,
        })),

        ...authors.map((author) => ({
        url: `${config.PORTAL}/news/author/${author.slug}`,
        changeFrequency: "weekly",
        priority: 0.7,
    })),
  ];
}