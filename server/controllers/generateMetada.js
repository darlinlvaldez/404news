import { generateAiMetadata } from "@/server/services/admin/n8n/generateMetadata";

export const generateAiMetadata = async function ({ news, blocks }) {
  const hasContent = blocks?.some((b) => b.content?.trim());

  if (!hasContent) {
    return {
      ok: false,
      message: "No hay contenido para generar metadatos",
    };
  }

  const metadata = await generateAiMetadata({ news, blocks });

  return {
    ok: true,
    ...metadata,
  };
};
