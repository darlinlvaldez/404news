import { NextResponse } from "next/server";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";
import { news as newsSchema } from "../../../../server/schemas/admin/news"
import { newsBlocks } from "../../../../server/schemas/admin/newsBlocks"
import newsController from "../../../../server/controllers/authors/news";

export async function GET(request) {
  try {
    await requireAuth(request, ["author"]);

    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const result = await newsController.authorNews({
      userId: user.id, limit, offset, search, status
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function POST(req) {
  try {
    const user = await requireAuth(req, [
      "superadmin", "admin", "editor"
    ]);

    const body = await req.json();

    body.news = newsSchema.parse(body.news);
    body.blocks = newsBlocks.parse(body.blocks);

    const result = await newsController.create({
      ...body, authorId: user.id
    });

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}