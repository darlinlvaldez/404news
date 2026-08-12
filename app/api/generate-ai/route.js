import { NextResponse } from "next/server";
import { handleError } from "../../../server/errors/handleError";
import { generateAiMetadata } from "../../../server/controllers/generateMetada";

export async function POST(req) {
  try {
    const { news, blocks } = await req.json();

    const result = await generateAiMetadata({
      news, blocks,
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error("GENERATE AI METADATA ERROR:", error);
    return handleError(error);
  }
}