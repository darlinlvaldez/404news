import { NextResponse } from "next/server";
import config from "../../../../../config";
import newsController from "../../../../../server/controllers/admin/news";
import { ApiError } from "../../../../../server/errors/apiError";
import { handleError } from "../../../../../server/errors/handleError";

export async function PATCH(req) {
  try {
    const secret = req.headers.get("x-ai-secret");

    if (secret !== config.N8N_AI_SECRET) {
      throw new ApiError(401, null, "No autorizado");
    }

    const { newsId, title, slug, excerpt } = await req.json();

    const result = await newsController.updateFieldsAi({
      newsId,
      title,
      slug,
      excerpt,
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error("PATCH EXCERPT ERROR:", error);
    return handleError(error);
  }
}