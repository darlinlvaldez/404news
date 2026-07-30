import config from "@/config";

export async function generateAiMetadata({ news, blocks }) {
  const response = await fetch(config.N8N_AI_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-ai-secret": config.N8N_AI_SECRET,
    },
    body: JSON.stringify({ news, blocks }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("N8N ERROR:", errorText);

    throw new Error(
      `n8n respondió ${response.status}: ${errorText}`
    );
  }

  return response.json();
}