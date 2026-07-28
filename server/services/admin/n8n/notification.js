import config from "@/config";

export async function sendNewsNotification(newsId, news) {
  try {
    await fetch(config.N8N_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newsId,
        title: news.title,
        excerpt: news.excerpt,
        slug: news.slug,
        cover_image: news.cover_image,
      }),
    });

  } catch (error) {
    console.error("Error enviando notificación:", error);
  }
}