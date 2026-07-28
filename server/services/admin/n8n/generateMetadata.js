import config from "@/config";

export async function generateMetadata({ newsId, news, blocks }) {
  try {
    await fetch(config.N8N_AI_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        newsId,
        news,
        blocks,
      }),
    });

  } catch (error) {
    console.error("Error enviando noticia a IA:", error);
  }
}