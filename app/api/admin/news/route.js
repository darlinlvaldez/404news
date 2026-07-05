import { NextResponse } from "next/server";
import newsController from "../../../../server/controllers/admin/news";
import { requireAuth } from "../../../../server/utils/auth";
import { handleError } from "../../../../server/errors/handleError";
import { news as newsSchema } from "../../../../server/schemas/admin/news"

export async function GET(request) {
  try {
    await requireAuth(request, ["superadmin", "admin", "editor"]);

    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") || 50;
    const offset = searchParams.get("offset") || 0;
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";

    const result = await newsController.newsTable({
      limit, offset, search, status});

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req) {
  try {
    const user = await requireAuth(req, ["superadmin", "admin", "editor"]);

    const body = await req.json();

    body.news = newsSchema.parse(body.news);

    const result = await newsController.create({...body, authorId: user.id});

    return NextResponse.json(result);

  } catch (error) {
    return handleError(error);
  }
}