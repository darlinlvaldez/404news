import { NextResponse } from "next/server";
import { handleError } from "../../../../../server/errors/handleError";
import newsController from "../../../../../server/controllers/admin/news";

export async function POST(req) {
  try {
    const { news, blocks } = await req.json();

    const result = await newsController.generateAiMetadata({
      news,
      blocks,
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error("GENERATE AI METADATA ERROR:", error);
    return handleError(error);
  }
}