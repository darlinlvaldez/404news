import { NextResponse } from "next/server";
import newsController from "../../../../../server/controllers/authors/news";
import { requireAuth } from "../../../../../server/utils/auth";
import { handleError } from "../../../../../server/errors/handleError";

export async function GET(request) {
  try {
    await requireAuth(request, ["author"]);

    const result = await newsController.getFormData();

    return NextResponse.json(result);

  } catch (error) {
    console.error(error)
    return handleError(error);
  }
}